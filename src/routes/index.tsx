/* eslint-disable prettier/prettier */
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { contests, SITE_NAME } from "@/data";
import { DifficultyBadge } from "@/components/difficulty-badge";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ascent — Weekly Contest Solutions & Editorials" },
      {
        name: "description",
        content:
          "Ascent is a weekly programming contest. Full editorials for every question with C++, Python and Java solutions.",
      },
      { property: "og:title", content: "Ascent — Weekly Contest Solutions & Editorials" },
      {
        property: "og:description",
        content: "Weekly programming contests with a full editorial for every question.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  const latest = contests[0]!;

  return (
    <div className="mx-auto max-w-5xl px-5">
      <section className="border-b border-border py-20 sm:py-28">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-accent-strong">
          Every Sunday · 19:00 IST
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-6xl">
          {SITE_NAME}
          <span className="block text-muted-foreground">weekly contest solutions.</span>
        </h1>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Three questions a week, and a written editorial for each of them — approach, complexity
          and reference code in C++, Python and Java.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/solutions"
            className="inline-flex items-center gap-2 rounded-md bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Browse solutions <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/about"
            className="rounded-md border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            About the series
          </Link>
        </div>
      </section>

      <section className="border-b border-border py-14">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Latest round
          </h2>
          <Link
            to="/solutions"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            All contests
          </Link>
        </div>
        <Link
          to="/solutions/$contestId"
          params={{ contestId: latest.id }}
          className="group block rounded-lg border border-border p-6 transition-colors hover:border-accent-strong/50 hover:bg-accent/40"
        >
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Round {String(latest.number).padStart(2, "0")}
          </p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
            {latest.title}
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {latest.summary}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {latest.questions.map((q) => (
              <DifficultyBadge key={q.slug} difficulty={q.difficulty} />
            ))}
            <span className="ml-1 inline-flex items-center gap-1 text-sm text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground">
              Read editorial <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </Link>
      </section>

      <section className="grid gap-8 py-14 sm:grid-cols-3">
        {[
          {
            title: "Written editorials",
            body: "Not just code — the reasoning that gets you there, plus time and space complexity.",
          },
          {
            title: "Three languages",
            body: "Every solution ships in C++, Python and Java so the idea reads in your language.",
          },
          {
            title: "Permanent archive",
            body: "Past rounds stay online and tagged, so the contests double as a topic-wise study set.",
          },
        ].map((f) => (
          <div key={f.title}>
            <h3 className="text-sm font-medium text-foreground">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
