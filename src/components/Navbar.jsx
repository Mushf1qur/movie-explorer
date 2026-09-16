import { Link, NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/movies', label: 'Browse' },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-brass/25 bg-velvet/92 backdrop-blur-sm">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          to="/"
          className="font-display text-xl font-semibold tracking-tight text-bone sm:text-2xl"
        >
          <span aria-hidden="true" className="mr-2 text-brass">
            ✦
          </span>
          MovieExplorer
        </Link>

        <nav aria-label="Main" className="flex items-center gap-1 sm:gap-5">
          {links.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                [
                  'hidden px-2 py-1 text-sm transition-colors sm:block',
                  isActive ? 'text-brass-bright' : 'text-dust hover:text-bone',
                ].join(' ')
              }
            >
              {label}
            </NavLink>
          ))}

          <Link
            to="/movies"
            className="rounded-frame border border-brass px-4 py-2 text-sm font-medium text-brass-bright transition-colors hover:bg-brass hover:text-velvet-deep"
          >
            Movies
          </Link>
        </nav>
      </div>
    </header>
  );
}
