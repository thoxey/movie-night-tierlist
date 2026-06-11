import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { PointerEvent } from 'react'
import type { Movie } from '../data/movies'

interface Props {
  movie: Movie
  held?: boolean
  onClick?: () => void
  onPointerDownCapture?: (e: PointerEvent) => void
}

/** A draggable / sortable poster card that also supports tap-to-pick-up. */
export function MovieCard({ movie, held, onClick, onPointerDownCapture }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: movie.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`card ${held ? 'held' : ''}`.trim()}
      title={`${movie.title} (${movie.year})`}
      onClick={onClick}
      onPointerDownCapture={onPointerDownCapture}
      {...attributes}
      {...listeners}
    >
      {held && <div className="held-badge" aria-hidden>✓</div>}
      {movie.poster ? (
        <img src={movie.poster} alt={movie.title} draggable={false} loading="lazy" />
      ) : (
        <div className="card-fallback">
          <span>{movie.title}</span>
          <small>{movie.year}</small>
        </div>
      )}
      <div className="card-caption">
        {movie.title} <span className="card-year">{movie.year}</span>
      </div>
    </div>
  )
}

/** Static (non-interactive) render used for the drag overlay. */
export function MovieCardOverlay({ movie }: { movie: Movie }) {
  return (
    <div className="card card-overlay" style={{ cursor: 'grabbing' }}>
      {movie.poster ? (
        <img src={movie.poster} alt={movie.title} draggable={false} />
      ) : (
        <div className="card-fallback">
          <span>{movie.title}</span>
          <small>{movie.year}</small>
        </div>
      )}
      <div className="card-caption">
        {movie.title} <span className="card-year">{movie.year}</span>
      </div>
    </div>
  )
}
