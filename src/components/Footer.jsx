export default function Footer() {
  return (
    <footer className="mt-24 border-t border-brass/25 bg-velvet-deep">
      <div className="container-page flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-lg font-semibold text-bone">
            <span aria-hidden="true" className="mr-2 text-brass">
              ✦
            </span>
            MovieExplorer
          </p>
          <p className="mt-2 max-w-sm text-sm text-dust">
            Show data comes from the TVMaze API, which is free to use and needs
            no key.
          </p>
        </div>

        <div className="flex flex-col gap-3 text-sm sm:items-end">
          <div className="flex gap-5">
            <a
              href="https://www.tvmaze.com/api"
              target="_blank"
              rel="noreferrer"
              className="text-dust transition-colors hover:text-brass-bright"
            >
              TVMaze API
            </a>
            <a
              href="https://github.com/Mushf1qur/movie-explorer"
              target="_blank"
              rel="noreferrer"
              className="text-dust transition-colors hover:text-brass-bright"
            >
              GitHub
            </a>
          </div>
          <p className="text-dust/70">© 2026 MovieExplorer</p>
        </div>
      </div>
    </footer>
  );
}
