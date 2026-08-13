import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Ascent" },
      {
        name: "description",
        content: "Reach the Ascent organisers about editorials, problem proposals or contest issues.",
      },
      { property: "og:title", content: "Contact — Ascent" },
      {
        property: "og:description",
        content: "Reach the Ascent organisers about editorials or problem proposals.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const channels = [
  {
    label: "Email",
    value: "hello@ascent.contest",
    href: "mailto:hello@ascent.contest",
    note: "Editorial corrections, problem proposals, anything long-form.",
  },
  {
    label: "Discord",
    value: "discord.gg/ascent",
    href: "https://discord.gg",
    note: "Live discussion during the round and upsolving afterwards.",
  },
  {
    label: "GitHub",
    value: "github.com/ascent-contest",
    href: "https://github.com",
    note: "Reference solutions and test data for every past round.",
  },
];

function ContactPage() {
  return (
    <PageShell
      eyebrow="Get in touch"
      title="Contact"
      description="Found a bug in an editorial or want to set a problem? These reach us fastest."
    >
      <ul className="grid gap-3 sm:grid-cols-2">
        {channels.map((c) => (
          <li key={c.label}>
            <a
              href={c.href}
              target="_blank"
              rel="noreferrer"
              className="block h-full rounded-lg border border-border p-5 transition-colors hover:border-accent-strong/50 hover:bg-accent/40"
            >
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {c.label}
              </p>
              <p className="mt-2 text-base font-medium text-foreground">{c.value}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.note}</p>
            </a>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
