/* eslint-disable prettier/prettier */
import type { Contest, LeaderboardRow } from "./types";
import { contest001 } from "./contests/contest-001";

export const SITE_NAME = "Ascent";
export const SITE_TAGLINE = "Weekly competitive programming contests and editorials.";

/** Newest first. Add a new contest file and prepend it here. */
export const contests: Contest[] = [contest001];

export function getContest(id: string): Contest | undefined {
  return contests.find((c) => c.id === id);
}

export const leaderboard: LeaderboardRow[] = [
  { rank: 1, handle: "arcline", contest: "Ascent Weekly 2", solved: "3 / 3", time: "41:12" },
  { rank: 2, handle: "nullptr_ninja", contest: "Ascent Weekly 2", solved: "3 / 3", time: "48:07" },
  { rank: 3, handle: "mira.k", contest: "Ascent Weekly 2", solved: "2 / 3", time: "33:55" },
  { rank: 4, handle: "deltaqueue", contest: "Ascent Weekly 1", solved: "3 / 3", time: "39:20" },
  { rank: 5, handle: "hexwarden", contest: "Ascent Weekly 1", solved: "2 / 3", time: "29:44" },
  { rank: 6, handle: "sortof_fast", contest: "Ascent Weekly 1", solved: "2 / 3", time: "36:02" },
];

export type { Contest, Question, Difficulty, LeaderboardRow } from "./types";
