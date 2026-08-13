export type Difficulty = "Easy" | "Medium" | "Hard";

export interface CodeSnippets {
  cpp: string;
  python: string;
  java: string;
}

export interface QuestionImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface Question {
  slug: string;
  title: string;
  tags: string[];
  difficulty: Difficulty;
  acceptanceRate: number;
  /** Paragraphs of the problem statement. */
  statement: string[];
  examples?: { input: string; output: string; explanation?: string }[];
  constraints?: string[];
  /** Paragraphs of the editorial / approach. */
  solution: string[];
  timeComplexity: string;
  spaceComplexity: string;
  images?: QuestionImage[];
  code: CodeSnippets;
}

export interface Contest {
  id: string;
  number: number;
  title: string;
  date: string;
  summary: string;
  questions: Question[];
}

export interface LeaderboardRow {
  rank: number;
  handle: string;
  contest: string;
  solved: string;
  time: string;
}
