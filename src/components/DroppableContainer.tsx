import { useDroppable } from '@dnd-kit/core'
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable'
import type { ReactNode } from 'react'

interface Props {
  id: string
  items: number[]
  children: ReactNode
  className?: string
}

/** A drop target that also provides a sortable context for the cards inside it. */
export function DroppableContainer({ id, items, children, className }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id })

  return (
    <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
      <div
        ref={setNodeRef}
        className={`${className ?? ''} ${isOver ? 'is-over' : ''}`.trim()}
      >
        {children}
      </div>
    </SortableContext>
  )
}
