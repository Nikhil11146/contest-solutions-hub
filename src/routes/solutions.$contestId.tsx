import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { getContest } from "@/data";
import { PageShell } from "@/components/page-shell";
import { QuestionSection } from "@/components/question-section";

export const Route = createFileRoute("/solutions/$contestId")({
  head: ({ params }) => {
    const contest = getContest(params.contestId);
    if (!contest) {
      return {
        meta: [{ title: "Contest not found — Ascent" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${contest.title} — Solutions | Ascent`;
    return {
      meta: [
        { title },
        { name: "description", content: contest.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: contest.summary },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/solutions/${contest.id}` },
      ],
      links: [{ rel: "canonical", href: `/solutions/${contest.id}` }],
    };
  },
  component: ContestPage,
});

function ContestPage() {
  const { contestId } = Route.useParams();
  const contest = getContest(contestId);
  const [active, setActive] = useState(0);

  if (!contest) {
    return (
      <PageShell title="Contest not found" description="This round doesn't exist in the archive.">
        <Link
          to="/solutions"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to all contests
        </Link>
      </PageShell>
    );
  }

  return (
    <PageShell
      eyebrow={`Round ${String(contest.number).padStart(2, "0")} · ${new Date(
        contest.date,
      ).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`}
      title={contest.title}
      description={contest.summary}
    >
      <nav className="mb-10 flex flex-wrap gap-2">
        {contest.questions.map((q, i) => (
          <a
            key={q.slug}
            href={`#${q.slug}`}
            className="rounded-md border border-border px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-accent-strong/50 hover:text-foreground"
          >
            Q{String(i + 1).padStart(2, "0")} · {q.title}
          </a>
        ))}
      </nav>

      <div className="space-y-14">
        {contest.questions.map((q, i) => (
          <QuestionSection key={q.slug} index={i + 1} question={q} />
        ))}
      </div>

      <div className="mt-16 border-t border-border pt-8">
        <Link
          to="/solutions"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> All contests
        </Link>
      </div>
    </PageShell>
  );
}
