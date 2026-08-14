/* eslint-disable prettier/prettier */
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { contests } from "@/data";
import { PageShell } from "@/components/page-shell";
import { DifficultyBadge } from "@/components/difficulty-badge";

export const Route = createFileRoute("/solutions/")({
  head: () => ({
    meta: [
      { title: "Contest Solutions — Ascent" },
      {
        name: "description",
        content:
          "Editorials for every Ascent weekly contest, with full problem statements and C++, Python and Java code.",
      },
      { property: "og:title", content: "Contest Solutions — Ascent" },
      {
        property: "og:description",
        content: "Editorials for every Ascent weekly contest, round by round.",
      },
      { property: "og:url", content: "/solutions" },
    ],
    links: [{ rel: "canonical", href: "/solutions" }],
  }),
  component: SolutionsIndex,
});

function SolutionsIndex() {
  return (
    <PageShell
      eyebrow="Archive"
      title="Contest solutions"
      description="Every round of Ascent with a full editorial: approach, complexity and reference implementations."
    >
      <ul className="space-y-3">
        {
          contests.length != 0 ? (
            contests.map((c) => (
              <li key={c.id}>
                <Link
                  to="/solutions/$contestId"
                  params={{ contestId: c.id }}
                  className="group block rounded-lg border border-border p-5 transition-colors hover:border-accent-strong/50 hover:bg-accent/40"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        Round {String(c.number).padStart(2, "0")} ·{" "}
                        {new Date(c.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                      <h2 className="mt-1.5 text-lg font-semibold tracking-tight text-foreground">
                        {c.title}
                      </h2>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
                  </div>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    {c.summary}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground">
                      {c.questions.length} questions
                    </span>
                    {c.questions.map((q) => (
                      <DifficultyBadge key={q.slug} difficulty={q.difficulty} />
                    ))}
                  </div>
                </Link>
              </li>
            ))
          ) : (
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              No contest available
            </p>
          )
        }
        
      </ul>
    </PageShell>
  );
}
