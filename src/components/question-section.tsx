import type { Question } from "@/data";
import { DifficultyBadge } from "./difficulty-badge";
import { CodeTabs } from "./code-tabs";

export function QuestionSection({ index, question }: { index: number; question: Question }) {
  return (
    <section id={question.slug} className="scroll-mt-24 border-t border-border pt-10">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="font-mono text-sm text-muted-foreground">
          Q{String(index).padStart(2, "0")}
        </span>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">{question.title}</h2>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <DifficultyBadge difficulty={question.difficulty} />
        {question.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border px-2.5 py-0.5 font-mono text-xs text-muted-foreground"
          >
            {tag}
          </span>
        ))}
        <span className="font-mono text-xs text-muted-foreground">
          Acceptance {question.acceptanceRate.toFixed(1)}%
        </span>
      </div>

      <Block title="Problem">
        {question.statement.map((p, i) => (
          <p key={i} className="text-sm leading-relaxed text-muted-foreground">
            {p}
          </p>
        ))}
        {question.examples && question.examples.length > 0 && (
          <div className="grid gap-3 sm:grid-cols-2">
            {question.examples.map((ex, i) => (
              <div key={i} className="rounded-lg border border-border bg-code p-4 font-mono text-xs">
                <p className="text-muted-foreground">
                  <span className="text-foreground">Input:</span> {ex.input}
                </p>
                <p className="mt-1 text-muted-foreground">
                  <span className="text-foreground">Output:</span> {ex.output}
                </p>
                {ex.explanation && (
                  <p className="mt-2 leading-relaxed text-muted-foreground">{ex.explanation}</p>
                )}
              </div>
            ))}
          </div>
        )}
        {question.constraints && question.constraints.length > 0 && (
          <ul className="space-y-1 font-mono text-xs text-muted-foreground">
            {question.constraints.map((c) => (
              <li key={c}>— {c}</li>
            ))}
          </ul>
        )}
      </Block>

      <Block title="Solution">
        {question.solution.map((p, i) => (
          <p key={i} className="text-sm leading-relaxed text-muted-foreground">
            {p}
          </p>
        ))}
        <div className="flex flex-wrap gap-x-6 gap-y-1 font-mono text-xs text-muted-foreground">
          <span>
            Time <span className="text-foreground">{question.timeComplexity}</span>
          </span>
          <span>
            Space <span className="text-foreground">{question.spaceComplexity}</span>
          </span>
        </div>
      </Block>

      {question.images && question.images.length > 0 && (
        <Block title="Illustration">
          <div className="grid gap-4 sm:grid-cols-2">
            {question.images.map((img) => (
              <figure key={img.src} className="overflow-hidden rounded-lg border border-border">
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="max-h-64 w-full bg-code object-contain p-3"
                />
                {img.caption && (
                  <figcaption className="border-t border-border px-3 py-2 text-xs text-muted-foreground">
                    {img.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </Block>
      )}

      <Block title="Code">
        <CodeTabs code={question.code} />
      </Block>
    </section>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-8">
      <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent-strong">
        {title}
      </h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}
