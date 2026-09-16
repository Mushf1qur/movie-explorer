export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <label htmlFor="movie-search" className="sr-only">
        Search for a movie by title
      </label>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-5 -translate-y-1/2 text-lg text-brass"
      >
        🔍
      </span>

      <input
        id="movie-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search for a movie..."
        autoComplete="off"
        className="w-full rounded-frame border border-brass/35 bg-velvet-deep/70 py-4 pr-12 pl-14 text-base text-bone placeholder:text-dust/70 transition-colors hover:border-brass/60 focus:border-brass focus:outline-none sm:text-lg"
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute top-1/2 right-4 -translate-y-1/2 px-1 text-xl leading-none text-dust transition-colors hover:text-bone"
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}
