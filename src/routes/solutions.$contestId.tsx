/* eslint-disable prettier/prettier */
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

  useEffect(() => {
    setActive(0);
  }, [contestId]);

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
      <nav className="mb-10 flex flex-wrap gap-2" aria-label="Questions">
        {contest.questions.map((q, i) => (
          <button
            key={q.slug}
            type="button"
            onClick={() => setActive(i)}
            aria-current={active === i}
            className={
              active === i
                ? "rounded-md border border-accent-strong/60 bg-code px-3 py-1.5 font-mono text-xs text-foreground transition-colors"
                : "rounded-md border border-border px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-accent-strong/50 hover:text-foreground"
            }
          >
            Q{String(i + 1).padStart(2, "0")} · {q.title}
          </button>
        ))}
      </nav>

      {contest.questions[active] && (
        <QuestionSection
          key={contest.questions[active].slug}
          index={active + 1}
          question={contest.questions[active]}
        />
      )}

      <div className="mt-10 flex items-center justify-between gap-3">
        <button
          type="button"
          disabled={active === 0}
          onClick={() => setActive((i) => Math.max(0, i - 1))}
          className="rounded-md border border-border px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
        >
          ← Previous
        </button>
        <button
          type="button"
          disabled={active === contest.questions.length - 1}
          onClick={() => setActive((i) => Math.min(contest.questions.length - 1, i + 1))}
          className="rounded-md border border-border px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
        >
          Next →
        </button>
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
