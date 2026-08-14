import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Ascent — Weekly Contest Series" },
      {
        name: "description",
        content:
          "Ascent is a weekly competitive programming contest with a published editorial for every question.",
      },
      { property: "og:title", content: "About Ascent — Weekly Contest Series" },
      {
        property: "og:description",
        content: "A weekly programming contest with a full editorial for every question.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell
      eyebrow="The series"
      title="About Ascent"
      description="A weekly programming contest built around one idea: the editorial matters as much as the round."
    >
      <div className="max-w-2xl space-y-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
        <p>
          Ascent runs every Saturday. Five questions, ninety minutes, an easy warm-up and a hard
          finisher — enough to be a real test without eating the whole weekend.
        </p>
        <p>
          Within hours of the round closing, a full editorial is published here. Each question gets
          the statement, the tags, the difficulty and acceptance rate from the live round, a written
          walkthrough of the approach with its complexity, and reference implementations in C++,
          Python and Java.
        </p>
        <p>
          Nothing is gated. The whole archive stays online so the contests double as a study set —
          filter by tag, work through a topic, compare your solution against the editorial.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          to="/solutions"
          className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          Browse solutions
        </Link>
        <Link
          to="/rules"
          className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
        >
          Read the rules
        </Link>
      </div>
    </PageShell>
  );
}
