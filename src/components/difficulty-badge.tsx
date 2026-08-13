import type { Difficulty } from "@/data";
import { cn } from "@/lib/utils";

const styles: Record<Difficulty, string> = {
  Easy: "border-easy/30 text-easy",
  Medium: "border-medium/30 text-medium",
  Hard: "border-hard/30 text-hard",
};

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-xs tracking-wide",
        styles[difficulty],
      )}
    >
      {difficulty}
    </span>
  );
}
