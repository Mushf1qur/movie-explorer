import { Link } from 'react-router-dom';
import Hero from '../components/Hero.jsx';

const highlights = [
  {
    title: 'Search by title',
    body: 'Type a few letters and the grid narrows as you go, straight from the TVMaze catalogue.',
  },
  {
    title: 'Ratings up front',
    body: 'Every card shows its average score and release year, so a shortlist takes seconds.',
  },
  {
    title: 'The full story',
    body: 'Open any title for the summary, genres, network and principal cast without leaving the page.',
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      <section className="container-page py-20">
        <h2 className="max-w-[24ch] font-display text-3xl leading-tight font-bold text-bone sm:text-4xl">
          A catalogue you can actually get through
        </h2>

        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-12">
          {highlights.map(({ title, body }) => (
            <div key={title} className="border-t border-brass/30 pt-5">
              <h3 className="font-display text-xl font-semibold text-bone">
                {title}
              </h3>
              <p className="mt-3 max-w-[40ch] leading-relaxed text-dust">
                {body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14">
          <Link
            to="/movies"
            className="inline-block rounded-frame border border-brass px-7 py-3.5 font-semibold text-brass-bright transition-colors hover:bg-brass hover:text-velvet-deep"
          >
            Browse all movies
          </Link>
        </div>
      </section>
    </>
  );
}
