import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
  closestCorners,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragOverEvent,
  type DragEndEvent,
  type UniqueIdentifier,
} from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { toPng } from 'html-to-image'
import { MOVIES, type Movie } from './data/movies'
import { TIERS, POOL, TIER_IDS } from './tiers'
import { DroppableContainer } from './components/DroppableContainer'
import { MovieCard, MovieCardOverlay } from './components/MovieCard'

type Items = Record<string, number[]>

const ALL_CONTAINERS = [...TIER_IDS, POOL]
const STORAGE_KEY = 'movie-tierlist-v1'

const MOVIE_BY_ID = new Map<number, Movie>(MOVIES.map((m) => [m.id, m]))

function emptyItems(): Items {
  const obj: Items = {}
  for (const c of ALL_CONTAINERS) obj[c] = []
  return obj
}

/** Default: every movie sits in the pool. */
function defaultItems(): Items {
  const obj = emptyItems()
  obj[POOL] = MOVIES.map((m) => m.id)
  return obj
}

/** Load saved layout, reconciling against the current movie list. */
function loadItems(): Items {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultItems()
    const parsed = JSON.parse(raw) as Items
    const obj = emptyItems()
    const seen = new Set<number>()
    for (const c of ALL_CONTAINERS) {
      for (const id of parsed[c] ?? []) {
        if (MOVIE_BY_ID.has(id) && !seen.has(id)) {
          obj[c].push(id)
          seen.add(id)
        }
      }
    }
    // Any movie not placed yet (e.g. newly added) goes back into the pool.
    for (const m of MOVIES) if (!seen.has(m.id)) obj[POOL].push(m.id)
    return obj
  } catch {
    return defaultItems()
  }
}

export default function App() {
  const [items, setItems] = useState<Items>(loadItems)
  const [activeId, setActiveId] = useState<number | null>(null)
  const [heldId, setHeldId] = useState<number | null>(null)
  const [exporting, setExporting] = useState(false)
  const boardRef = useRef<HTMLDivElement>(null)
  // True while a real drag is in progress, so the click that follows a drag
  // doesn't get treated as a tap-to-pick-up. Reset on each fresh pointer down.
  const didDragRef = useRef(false)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 120, tolerance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  const findContainer = useCallback(
    (id: UniqueIdentifier): string | undefined => {
      if (typeof id === 'string' && ALL_CONTAINERS.includes(id)) return id
      const numId = typeof id === 'number' ? id : Number(id)
      return ALL_CONTAINERS.find((c) => items[c].includes(numId))
    },
    [items],
  )

  function handleDragStart(event: DragStartEvent) {
    didDragRef.current = true
    setHeldId(null)
    setActiveId(event.active.id as number)
  }

  /** Move a movie into a container, optionally before another card; else append. */
  function moveItem(id: number, toContainer: string, beforeId: number | null = null) {
    setItems((prev) => {
      if (!ALL_CONTAINERS.some((c) => prev[c].includes(id))) return prev
      const next: Items = {}
      for (const c of ALL_CONTAINERS) next[c] = prev[c].filter((x) => x !== id)
      const target = next[toContainer]
      let idx = target.length
      if (beforeId != null) {
        const i = target.indexOf(beforeId)
        if (i >= 0) idx = i
      }
      target.splice(idx, 0, id)
      return next
    })
  }

  // Tap a card: pick it up, or — if already holding another — drop the held one
  // right before this card. Tapping the held card again puts it down.
  function handleCardTap(id: number) {
    if (didDragRef.current) {
      didDragRef.current = false
      return
    }
    if (heldId == null) {
      setHeldId(id)
    } else if (heldId === id) {
      setHeldId(null)
    } else {
      const dest = findContainer(id)
      if (dest) moveItem(heldId, dest, id)
      setHeldId(null)
    }
  }

  // Tap anywhere in a row (label or empty space) to drop the held movie there.
  function handleRowTap(containerId: string) {
    if (heldId == null) return
    moveItem(heldId, containerId)
    setHeldId(null)
  }

  // A fresh press clears the stale "did drag" flag before any drag can start.
  const onCardPointerDown = () => {
    didDragRef.current = false
  }

  const heldMovie = heldId != null ? MOVIE_BY_ID.get(heldId) : undefined

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event
    if (!over) return
    const activeContainer = findContainer(active.id)
    const overContainer = findContainer(over.id)
    if (!activeContainer || !overContainer || activeContainer === overContainer) return

    setItems((prev) => {
      const activeItems = prev[activeContainer]
      const overItems = prev[overContainer]
      const activeId = active.id as number
      const overIsContainer =
        typeof over.id === 'string' && ALL_CONTAINERS.includes(over.id)
      const overIndex = overIsContainer ? overItems.length : overItems.indexOf(over.id as number)
      const newIndex = overIndex >= 0 ? overIndex : overItems.length

      return {
        ...prev,
        [activeContainer]: activeItems.filter((i) => i !== activeId),
        [overContainer]: [
          ...overItems.slice(0, newIndex),
          activeId,
          ...overItems.slice(newIndex),
        ],
      }
    })
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    setActiveId(null)
    if (!over) return
    const activeContainer = findContainer(active.id)
    const overContainer = findContainer(over.id)
    if (!activeContainer || !overContainer || activeContainer !== overContainer) return

    const activeIndex = items[activeContainer].indexOf(active.id as number)
    const overIndex = items[overContainer].indexOf(over.id as number)
    if (overIndex !== -1 && activeIndex !== overIndex) {
      setItems((prev) => ({
        ...prev,
        [overContainer]: arrayMove(prev[overContainer], activeIndex, overIndex),
      }))
    }
  }

  const activeMovie = activeId != null ? MOVIE_BY_ID.get(activeId) : undefined
  const rankedCount = useMemo(
    () => TIER_IDS.reduce((n, c) => n + items[c].length, 0),
    [items],
  )

  async function handleExport() {
    if (!boardRef.current) return
    setExporting(true)
    try {
      // Let the "exporting" class apply before capture.
      await new Promise((r) => setTimeout(r, 50))
      const dataUrl = await toPng(boardRef.current, {
        pixelRatio: 2,
        backgroundColor: '#15151c',
        cacheBust: true,
      })
      const link = document.createElement('a')
      link.download = 'movie-tierlist.png'
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error(err)
      alert('Sorry — export failed. See the console for details.')
    } finally {
      setExporting(false)
    }
  }

  function handleReset() {
    if (confirm('Reset the board? All movies go back to the tray.')) {
      setItems(defaultItems())
    }
  }

  return (
    <div className="app">
      <header className="topbar">
        <div>
          <h1>🎬 Movie Tier List</h1>
          <p className="subtitle">
            Drag posters into the tiers. {rankedCount}/{MOVIES.length} ranked.
          </p>
        </div>
        <div className="actions">
          <button className="btn" onClick={handleReset}>
            Reset
          </button>
          <button className="btn btn-primary" onClick={handleExport} disabled={exporting}>
            {exporting ? 'Rendering…' : '⬇ Export PNG'}
          </button>
        </div>
      </header>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div
          className={`board ${exporting ? 'exporting' : ''} ${heldId != null ? 'armed' : ''}`.trim()}
          ref={boardRef}
        >
          {TIERS.map((tier) => (
            <div className="tier-row" key={tier.id} onClick={() => handleRowTap(tier.id)}>
              <div className="tier-label" style={{ background: tier.color }}>
                {tier.label}
              </div>
              <DroppableContainer id={tier.id} items={items[tier.id]} className="tier-drop">
                {items[tier.id].map((id) => (
                  <MovieCard
                    key={id}
                    movie={MOVIE_BY_ID.get(id)!}
                    held={heldId === id}
                    onClick={() => handleCardTap(id)}
                    onPointerDownCapture={onCardPointerDown}
                  />
                ))}
              </DroppableContainer>
            </div>
          ))}

          <div className="board-watermark">made with the movie tier list maker</div>
        </div>

        <section
          className={`pool-section ${heldId != null ? 'armed' : ''}`.trim()}
          onClick={() => handleRowTap(POOL)}
        >
          <h2 className="pool-title">
            Tray <span className="pool-count">{items[POOL].length} left</span>
          </h2>
          <DroppableContainer id={POOL} items={items[POOL]} className="pool-drop">
            {items[POOL].length === 0 ? (
              <p className="pool-empty">Everything's been ranked. 🎉</p>
            ) : (
              items[POOL].map((id) => (
                <MovieCard
                  key={id}
                  movie={MOVIE_BY_ID.get(id)!}
                  held={heldId === id}
                  onClick={() => handleCardTap(id)}
                  onPointerDownCapture={onCardPointerDown}
                />
              ))
            )}
          </DroppableContainer>
        </section>

        <DragOverlay>{activeMovie ? <MovieCardOverlay movie={activeMovie} /> : null}</DragOverlay>
      </DndContext>

      <footer className="footer">
        Tap a poster to pick it up, then tap a tier to place it — or drag.
        Posters via TMDB. Your board is saved in this browser automatically.
      </footer>

      {heldMovie && (
        <div className="hold-banner" role="status">
          <span className="hold-text">
            Placing <strong>{heldMovie.title}</strong> — tap a tier
          </span>
          <button className="hold-cancel" onClick={() => setHeldId(null)}>
            Cancel
          </button>
        </div>
      )}
    </div>
  )
}
