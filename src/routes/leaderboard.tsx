import { createFileRoute } from "@tanstack/react-router";
import { leaderboard } from "@/data";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/leaderboard")({
  head: () => ({
    meta: [
      { title: "Leaderboard — Ascent" },
      {
        name: "description",
        content: "Top performers across recent Ascent weekly contests, with problems solved and finish times.",
      },
      { property: "og:title", content: "Leaderboard — Ascent" },
      {
        property: "og:description",
        content: "Top performers across recent Ascent weekly contests.",
      },
      { property: "og:url", content: "/leaderboard" },
    ],
    links: [{ rel: "canonical", href: "/leaderboard" }],
  }),
  component: LeaderboardPage,
});

function LeaderboardPage() {
  return (
    <PageShell
      eyebrow="Standings"
      title="Leaderboard"
      description="Rolling results from the most recent rounds. Updated after each editorial is published."
    >
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead>
            <tr className="border-b border-border font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
              <th className="px-4 py-3 font-normal">#</th>
              <th className="px-4 py-3 font-normal">Handle</th>
              <th className="px-4 py-3 font-normal">Contest</th>
              <th className="px-4 py-3 font-normal">Solved</th>
              <th className="px-4 py-3 font-normal">Time</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((row) => (
              <tr key={`${row.handle}-${row.contest}`} className="border-b border-border/60 last:border-0">
                <td className="px-4 py-3 font-mono text-muted-foreground">{row.rank}</td>
                <td className="px-4 py-3 font-medium text-foreground">{row.handle}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.contest}</td>
                <td className="px-4 py-3 font-mono text-muted-foreground">{row.solved}</td>
                <td className="px-4 py-3 font-mono text-muted-foreground">{row.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageShell>
  );
}
