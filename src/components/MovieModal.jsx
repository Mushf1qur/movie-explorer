import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { fetchShowDetails } from '../api/tvmaze.js';
import {
  stripHtml,
  formatRating,
  formatDate,
  formatRuntime,
} from '../utils/format.js';

export default function MovieModal({ movie, onClose }) {
  // The card already carries most fields, so the panel renders instantly and
  // fills in cast and crew once the detail request lands.
  const [details, setDetails] = useState(movie);
  const [loadingExtras, setLoadingExtras] = useState(true);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    setDetails(movie);
    setLoadingExtras(true);

    const controller = new AbortController();
    fetchShowDetails(movie.id, { signal: controller.signal })
      .then((full) => setDetails(full))
      .catch((error) => {
        if (error.name !== 'AbortError') setDetails(movie);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoadingExtras(false);
      });

    return () => controller.abort();
  }, [movie]);

  // Escape closes, background stops scrolling, focus moves into the panel and
  // returns to whatever opened it.
  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = originalOverflow;
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [onClose]);

  const summary = stripHtml(details.summary);
  const runtime = formatRuntime(details.runtime);

  return createPortal(
    <div
      className="animate-backdrop-in fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-velvet-deep/85 p-4 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="movie-modal-title"
        onClick={(event) => event.stopPropagation()}
        className="animate-panel-in relative my-auto w-full max-w-3xl overflow-hidden rounded-frame border border-brass/40 bg-velvet shadow-2xl"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close details"
          className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-frame border border-brass/50 bg-velvet-deep/80 text-lg text-bone transition-colors hover:bg-brass hover:text-velvet-deep"
        >
          ✕
        </button>

        <div className="relative h-52 bg-velvet-lift sm:h-72">
          {details.backdrop && (
            <img
              src={details.backdrop}
              alt=""
              className="h-full w-full object-cover object-top"
            />
          )}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-velvet via-velvet/55 to-transparent"
          />
        </div>

        <div className="relative -mt-14 px-6 pb-8 sm:px-9">
          <h2
            id="movie-modal-title"
            className="font-display text-3xl leading-tight font-bold text-bone sm:text-4xl"
          >
            {details.title}
          </h2>

          <p className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-dust">
            <span className="text-brass-bright">
              <span aria-hidden="true">⭐</span> Rating:{' '}
              {formatRating(details.rating)}
            </span>
            <span>
              <span aria-hidden="true">📅</span> Release:{' '}
              {formatDate(details.premiered)}
            </span>
            {runtime && <span>{runtime} per episode</span>}
            {details.status && <span>{details.status}</span>}
          </p>

          {details.genres.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2">
              {details.genres.map((genre) => (
                <li
                  key={genre}
                  className="rounded-frame border border-sage/50 px-3 py-1 text-xs text-sage"
                >
                  {genre}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-7">
            <h3 className="font-display text-lg font-semibold text-bone">
              Overview
            </h3>
            <p className="mt-2 max-w-[68ch] leading-relaxed text-dust">
              {summary || 'TVMaze has no summary on file for this title yet.'}
            </p>
          </div>

          <dl className="mt-7 grid gap-5 sm:grid-cols-2">
            {details.network && (
              <div>
                <dt className="font-display text-base font-semibold text-bone">
                  Network
                </dt>
                <dd className="mt-1 text-sm text-dust">{details.network}</dd>
              </div>
            )}
            {details.language && (
              <div>
                <dt className="font-display text-base font-semibold text-bone">
                  Language
                </dt>
                <dd className="mt-1 text-sm text-dust">{details.language}</dd>
              </div>
            )}
            {details.cast?.length > 0 && (
              <div className="sm:col-span-2">
                <dt className="font-display text-base font-semibold text-bone">
                  Cast
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-dust">
                  {details.cast
                    .map((member) =>
                      member.character
                        ? `${member.name} as ${member.character}`
                        : member.name
                    )
                    .join(', ')}
                </dd>
              </div>
            )}
          </dl>

          {loadingExtras && (
            <p className="mt-5 text-sm text-dust/70">Loading cast and crew…</p>
          )}

          <div className="mt-9 flex flex-wrap items-center justify-end gap-4">
            {details.officialSite && (
              <a
                href={details.officialSite}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-dust underline decoration-brass/50 underline-offset-4 transition-colors hover:text-bone"
              >
                Visit official site
              </a>
            )}
            <button
              type="button"
              onClick={onClose}
              className="rounded-frame bg-brass px-6 py-2.5 text-sm font-semibold text-velvet-deep transition-colors hover:bg-brass-bright"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
