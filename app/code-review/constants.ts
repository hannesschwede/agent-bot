import type { Language, Severity } from "./types";

export const LANGUAGES: { value: Language; label: string }[] = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "go", label: "Go" },
];

export const SEVERITY_CONFIG: Record<
  Severity,
  { label: string; color: string; bg: string; border: string }
> = {
  critical: {
    label: "KRITISCH",
    color: "#FF2D2D",
    bg: "rgba(255,45,45,0.08)",
    border: "rgba(255,45,45,0.3)",
  },
  high: {
    label: "HOCH",
    color: "#FF8C00",
    bg: "rgba(255,140,0,0.08)",
    border: "rgba(255,140,0,0.3)",
  },
  medium: {
    label: "MITTEL",
    color: "#FFD700",
    bg: "rgba(255,215,0,0.08)",
    border: "rgba(255,215,0,0.3)",
  },
  low: {
    label: "INFO",
    color: "#4FC3F7",
    bg: "rgba(79,195,247,0.08)",
    border: "rgba(79,195,247,0.3)",
  },
};

export const SAMPLE_CODE = `// ❌ Problematischer Code — zum Testen
const API_KEY = "sk-1234567890abcdef";

async function fetchData(userId) {
  const response = await fetch(\`https://api.example.com/users/\${userId}\`);
  const data = response.json();
  console.log("Data:", data);
  return data;
}

function processItems(items) {
  for (let i = 0; i < items.length; i++) {
    fetchData(items[i]);
  }
}

async function saveUser(userData) {
  try {
    const result = await fetch('/api/save', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
    return result.json();
  } catch (e) {}
}`;
