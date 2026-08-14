/* eslint-disable prettier/prettier */
import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/rules")({
  head: () => ({
    meta: [
      { title: "Contest Rules — Ascent" },
      {
        name: "description",
        content: "Format, scoring, eligibility and conduct rules for the Ascent weekly contest series.",
      },
      { property: "og:title", content: "Contest Rules — Ascent" },
      {
        property: "og:description",
        content: "Format, scoring, eligibility and conduct rules for Ascent.",
      },
      { property: "og:url", content: "/rules" },
    ],
    links: [{ rel: "canonical", href: "/rules" }],
  }),
  component: RulesPage,
});

const sections = [
  {
    title: "Format",
    items: [
      "Every contest runs for 90 minutes and contains five questions of increasing difficulty.",
      "Contests start Saturday at 14:30 IST. Editorials go live the same evening.",
      "Any language supported by the judge is allowed; reference solutions are published in C++, Python and Java.",
    ],
  },
  {
    title: "Scoring",
    items: [
      "Questions are worth 10 -  50 points respectively.",
      "Ties are broken by total finish time, measured from contest start to the last accepted submission.",
      "Each rejected submission adds a 5-minute penalty to the finish time.",
    ],
  },
  {
    title: "Eligibility",
    items: [
      "Open to everyone. One account per participant.",
      "Team entries are not permitted during the live window.",
      "Upsolving after the contest is encouraged but is not ranked.",
    ],
  },
  {
    title: "Conduct",
    items: [
      "No sharing of code or hints during the live window.",
      "Generative tools are allowed only for upsolving, never during the contest.",
      "Violations lead to removal from the standings for that round.",
    ],
  },
];

function RulesPage() {
  return (
    <PageShell
      eyebrow="Handbook"
      title="Rules"
      description="Everything that governs a round of Ascent, from scoring to conduct."
    >
      <div className="space-y-10">
        {sections.map((s) => (
          <section key={s.title} className="border-t border-border pt-6">
            <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent-strong">
              {s.title}
            </h2>
            <ul className="space-y-2.5">
              {s.items.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-strong" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </PageShell>
  );
}
