import GithubContributionsClient, { type ContributionDay } from "./GithubContributionsClient";

const GITHUB_USERNAME = "Allenize";

async function getContributions(): Promise<ContributionDay[] | null> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`,
      // Refresh once a day instead of re-fetching on every request.
      { next: { revalidate: 60 * 60 * 24 } }
    );
    if (!res.ok) return null;
    const json: { contributions: ContributionDay[] } = await res.json();
    return json.contributions ?? null;
  } catch {
    return null;
  }
}

// Server Component — the fetch happens on the server (build/request time),
// not in the browser, so it isn't subject to the API's CORS policy the way
// a client-side fetch would be.
export default async function GithubContributions() {
  const days = await getContributions();
  return <GithubContributionsClient days={days} error={days === null} />;
}