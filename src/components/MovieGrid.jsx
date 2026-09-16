import MovieCard from './MovieCard.jsx';

const GRID =
  'grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5';

export function MovieGridSkeleton({ count = 10 }) {
  return (
    <div className={GRID} aria-hidden="true">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse overflow-hidden rounded-frame border border-brass/15 bg-velvet-deep/50"
        >
          <div className="aspect-[2/3] bg-velvet-lift" />
          <div className="space-y-3 p-4">
            <div className="h-4 w-3/4 rounded bg-velvet-lift" />
            <div className="h-3 w-1/2 rounded bg-velvet-lift" />
            <div className="h-9 w-full rounded bg-velvet-lift" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function MovieGrid({ movies, onSeeDetails }) {
  return (
    <div className={GRID}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onSeeDetails={onSeeDetails} />
      ))}
    </div>
  );
}
