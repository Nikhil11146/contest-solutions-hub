import { useState } from "react";
import { Check, Copy } from "lucide-react";
import type { CodeSnippets } from "@/data/types";
import { cn } from "@/lib/utils";

const langs = [
  { key: "cpp", label: "C++" },
  { key: "python", label: "Python" },
  { key: "java", label: "Java" },
] as const;

type LangKey = (typeof langs)[number]["key"];

export function CodeTabs({ code }: { code: CodeSnippets }) {
  const [active, setActive] = useState<LangKey>("cpp");
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code[active]);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-code">
      <div className="flex items-center justify-between border-b border-border px-2">
        <div className="flex">
          {langs.map((l) => (
            <button
              key={l.key}
              type="button"
              onClick={() => setActive(l.key)}
              className={cn(
                "px-3 py-2.5 font-mono text-xs transition-colors",
                active === l.key
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {l.label}
              <span
                className={cn(
                  "mt-1.5 block h-px w-full",
                  active === l.key ? "bg-accent-strong" : "bg-transparent",
                )}
              />
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={copy}
          aria-label="Copy code"
          className="mr-1 inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-4 text-[13px] leading-relaxed">
        <code className="font-mono text-foreground">{code[active]}</code>
      </pre>
    </div>
  );
}
