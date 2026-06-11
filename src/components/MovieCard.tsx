import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { Movie } from '../data/movies'

interface Props {
  movie: Movie
}

/** A draggable / sortable poster card. */
export function MovieCard({ movie }: Props) {
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
      className="card"
      title={`${movie.title} (${movie.year})`}
      {...attributes}
      {...listeners}
    >
      {movie.poster ? (
        <img
          src={movie.poster}
          alt={movie.title}
          crossOrigin="anonymous"
          draggable={false}
          loading="lazy"
        />
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
export function MovieCardOverlay({ movie }: Props) {
  return (
    <div className="card card-overlay" style={{ cursor: 'grabbing' }}>
      {movie.poster ? (
        <img src={movie.poster} alt={movie.title} crossOrigin="anonymous" draggable={false} />
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
