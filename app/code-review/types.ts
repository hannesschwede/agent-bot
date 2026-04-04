export type Severity = "critical" | "high" | "medium" | "low";
export type Language = "javascript" | "typescript" | "python" | "go";

export interface Issue {
  id: string;
  severity: Severity;
  category: string;
  title: string;
  description: string;
  line: number | null;
  suggestion: string;
}

export interface ReviewResult {
  score: number;
  summary: string;
  issues: Issue[];
  optimizedCode: string;
}
