const BASE_URL = 'https://api.tvmaze.com';

async function request(path, { signal } = {}) {
  const response = await fetch(`${BASE_URL}${path}`, { signal });
  if (!response.ok) {
    throw new Error(`TVMaze responded with status ${response.status}`);
  }
  return response.json();
}

/**
 * TVMaze returns different envelopes per endpoint, so every show is flattened
 * into one shape before it reaches a component.
 */
export function normalizeShow(show) {
  return {
    id: show.id,
    title: show.name,
    poster: show.image?.medium ?? show.image?.original ?? null,
    backdrop: show.image?.original ?? show.image?.medium ?? null,
    rating: show.rating?.average ?? null,
    premiered: show.premiered ?? null,
    year: show.premiered ? show.premiered.slice(0, 4) : null,
    genres: show.genres ?? [],
    summary: show.summary ?? '',
    status: show.status ?? null,
    runtime: show.averageRuntime ?? show.runtime ?? null,
    language: show.language ?? null,
    network: show.network?.name ?? show.webChannel?.name ?? null,
    officialSite: show.officialSite ?? null,
  };
}

/** GET /shows — the full catalogue, used for the default browse grid. */
export async function fetchShows({ signal, limit = 60 } = {}) {
  const shows = await request('/shows?page=0', { signal });
  return shows
    .filter((show) => show.image)
    .sort((a, b) => (b.rating?.average ?? 0) - (a.rating?.average ?? 0))
    .slice(0, limit)
    .map(normalizeShow);
}

/** GET /search/shows?q= — title search. */
export async function searchShows(query, { signal } = {}) {
  const results = await request(`/search/shows?q=${encodeURIComponent(query)}`, {
    signal,
  });
  return results.map((result) => normalizeShow(result.show));
}

/** GET /shows/:id?embed[]=cast — everything the modal needs. */
export async function fetchShowDetails(id, { signal } = {}) {
  const show = await request(`/shows/${id}?embed[]=cast`, { signal });
  const cast = (show._embedded?.cast ?? []).slice(0, 6).map((credit) => ({
    id: credit.person.id,
    name: credit.person.name,
    character: credit.character?.name ?? null,
  }));
  return { ...normalizeShow(show), cast };
}
