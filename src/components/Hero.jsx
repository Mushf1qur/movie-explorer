import { Link } from 'react-router-dom';

const starters = ['Breaking Bad', 'Girls', 'The Office', 'Fringe', 'Arrow'];

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Velvet-curtain ground: a warm pool of light against the dark house. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(120%_90%_at_18%_0%,#5a2129_0%,#2b0e14_52%,#180509_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brass/60 to-transparent"
      />

      <div className="container-page relative grid gap-12 py-20 md:grid-cols-[1.45fr_1fr] md:items-center md:gap-16 md:py-28">
        <div>
          <p className="font-display text-sm italic text-brass-bright">
            Now showing, everything ever made
          </p>

          <h1 className="mt-4 font-display text-5xl leading-[0.95] font-bold tracking-tight text-bone sm:text-6xl lg:text-7xl">
            Discover movies
            <br />
            worth your evening
          </h1>

          <p className="mt-6 max-w-[46ch] text-base leading-relaxed text-dust sm:text-lg">
            Search thousands of titles by name, compare ratings at a glance, and
            open any one of them to read the full story before you commit two
            hours to it.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              to="/movies"
              className="rounded-frame bg-brass px-7 py-3.5 text-base font-semibold text-velvet-deep transition-colors hover:bg-brass-bright"
            >
              Explore now
            </Link>
            <Link
              to="/movies?q=drama"
              className="text-base text-dust underline decoration-brass/50 underline-offset-4 transition-colors hover:text-bone"
            >
              Or jump straight to a search
            </Link>
          </div>
        </div>

        {/* Starter titles double as the fastest route into the catalogue. */}
        <div className="rounded-frame border border-brass/40 bg-velvet-deep/60 p-6">
          <h2 className="font-display text-lg font-semibold text-bone">
            Not sure where to start?
          </h2>
          <p className="mt-1 text-sm text-dust">
            Pick one of these and the search runs for you.
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {starters.map((title) => (
              <li key={title}>
                <Link
                  to={`/movies?q=${encodeURIComponent(title)}`}
                  className="inline-block rounded-frame border border-brass/35 px-3 py-1.5 text-sm text-bone transition-colors hover:border-brass hover:bg-brass hover:text-velvet-deep"
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div aria-hidden="true" className="marquee-bulbs relative" />
    </section>
  );
}
