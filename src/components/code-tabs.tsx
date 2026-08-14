/* eslint-disable prettier/prettier */
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import type { CodeSnippets } from "@/data/types";
import { cn } from "@/lib/utils";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { useEffect } from "react";
import {
  vscDarkPlus,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";

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

  const removeBackgrounds = (style: typeof vscDarkPlus) => {
    const result = { ...style };

    for (const key in result) {
      const rule = result[key];

      if (typeof rule === "object" && rule !== null) {
        const cleaned = { ...rule };
        delete cleaned.background;
        delete cleaned.backgroundColor;
        result[key] = cleaned;
      }
    }

    return result;
  };

  const darkCodeStyle = removeBackgrounds(vscDarkPlus);
  const lightCodeStyle = removeBackgrounds(oneLight);

  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark"),
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

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
      <SyntaxHighlighter
        language={active}
        style={isDark ? darkCodeStyle : lightCodeStyle}
        customStyle={{
          margin: 0,
          padding: "1rem",
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: "13px",
          lineHeight: "1.8",
          background: "transparent",
        }}
        codeTagProps={{
          style: {
            fontFamily: '"JetBrains Mono", monospace',
          },
        }}
      >
        {code[active]}
      </SyntaxHighlighter>
    </div>
  );
}
