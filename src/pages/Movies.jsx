import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar.jsx';
import MovieGrid, { MovieGridSkeleton } from '../components/MovieGrid.jsx';
import MovieModal from '../components/MovieModal.jsx';
import useDebouncedValue from '../hooks/useDebouncedValue.js';
import { fetchShows, searchShows } from '../api/tvmaze.js';

export default function Movies() {
  // The query lives in the URL so a search can be shared or reloaded.
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get('q') ?? '');
  const debouncedQuery = useDebouncedValue(query, 400);

  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | ready | error
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const next = debouncedQuery.trim();
    setSearchParams(next ? { q: next } : {}, { replace: true });
  }, [debouncedQuery, setSearchParams]);

  useEffect(() => {
    const controller = new AbortController();
    const trimmed = debouncedQuery.trim();

    setStatus('loading');

    const load = trimmed
      ? searchShows(trimmed, { signal: controller.signal })
      : fetchShows({ signal: controller.signal });

    load
      .then((results) => {
        setMovies(results);
        setStatus('ready');
      })
      .catch((error) => {
        if (error.name === 'AbortError') return;
        console.error(error);
        setStatus('error');
      });

    return () => controller.abort();
  }, [debouncedQuery]);

  const handleSeeDetails = useCallback((movie) => setSelectedMovie(movie), []);
  const handleClose = useCallback(() => setSelectedMovie(null), []);

  const trimmed = debouncedQuery.trim();

  return (
    <section className="container-page py-12 sm:py-16">
      <h1 className="font-display text-4xl leading-tight font-bold text-bone sm:text-5xl">
        Browse the catalogue
      </h1>
      <p className="mt-3 max-w-[52ch] text-dust">
        {trimmed
          ? `Showing matches for “${trimmed}”.`
          : 'Starting with the highest rated titles TVMaze has on file.'}
      </p>

      <div className="mt-8 max-w-2xl">
        <SearchBar value={query} onChange={setQuery} />
      </div>

      <div className="mt-12">
        {status === 'loading' && <MovieGridSkeleton />}

        {status === 'error' && (
          <div className="rounded-frame border border-brass/30 bg-velvet-deep/50 p-10 text-center">
            <h2 className="font-display text-2xl font-semibold text-bone">
              Couldn’t reach TVMaze
            </h2>
            <p className="mx-auto mt-3 max-w-[44ch] text-dust">
              The request didn’t go through. Check your connection, then search
              again.
            </p>
            <button
              type="button"
              onClick={() => setQuery((current) => `${current} `.trim())}
              className="mt-6 rounded-frame bg-brass px-6 py-2.5 text-sm font-semibold text-velvet-deep transition-colors hover:bg-brass-bright"
            >
              Try again
            </button>
          </div>
        )}

        {status === 'ready' && movies.length === 0 && (
          <div className="rounded-frame border border-brass/30 bg-velvet-deep/50 p-10 text-center">
            <h2 className="font-display text-2xl font-semibold text-bone">
              Nothing matches “{trimmed}”
            </h2>
            <p className="mx-auto mt-3 max-w-[44ch] text-dust">
              Try a shorter word, or clear the search to see the full
              catalogue.
            </p>
            <button
              type="button"
              onClick={() => setQuery('')}
              className="mt-6 rounded-frame border border-brass px-6 py-2.5 text-sm font-semibold text-brass-bright transition-colors hover:bg-brass hover:text-velvet-deep"
            >
              Clear search
            </button>
          </div>
        )}

        {status === 'ready' && movies.length > 0 && (
          <>
            <p className="mb-6 text-sm text-dust/80">
              {movies.length} {movies.length === 1 ? 'title' : 'titles'}
            </p>
            <MovieGrid movies={movies} onSeeDetails={handleSeeDetails} />
          </>
        )}
      </div>

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleClose} />
      )}
    </section>
  );
}
