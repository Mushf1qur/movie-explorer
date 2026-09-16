import { formatRating } from '../utils/format.js';

export default function MovieCard({ movie, onSeeDetails }) {
  const { title, poster, rating, year } = movie;

  return (
    <article className="group flex flex-col overflow-hidden rounded-frame border border-brass/20 bg-velvet-deep/60">
      <div className="relative aspect-[2/3] overflow-hidden bg-velvet-lift">
        {poster ? (
          <img
            src={poster}
            alt={`Poster for ${title}`}
            loading="lazy"
            className="h-full w-full object-cover transition-[filter,transform] duration-300 group-hover:scale-[1.03] group-hover:brightness-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center p-4 text-center font-display text-sm text-dust">
            No poster available
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3
          className="font-display text-lg leading-tight font-semibold text-bone"
          title={title}
        >
          {title}
        </h3>

        <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-dust">
          <span className="text-brass-bright">
            <span aria-hidden="true">⭐</span> {formatRating(rating)}
          </span>
          <span>
            <span aria-hidden="true">📅</span> {year ?? 'Unknown'}
          </span>
        </p>

        <button
          type="button"
          onClick={() => onSeeDetails(movie)}
          className="mt-auto w-full rounded-frame border border-brass/60 py-2.5 text-sm font-medium text-brass-bright transition-colors hover:bg-brass hover:text-velvet-deep"
        >
          See details
        </button>
      </div>
    </article>
  );
}
