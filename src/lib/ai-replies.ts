import type { ChatCitation, Memory } from "@/lib/mock-data";

interface ReplyTemplate {
  keywords: string[];
  content: string;
  tag: string;
}

const templates: ReplyTemplate[] = [
  {
    keywords: ["roadmap", "plan", "quarter", "strategy", "road"],
    tag: "Planning",
    content:
      "Here's the strategic picture from your captures: your Q4 focus is anchored on the AI search beta, pricing, and onboarding. Your investor prep notes emphasize 3.2x MoM growth and 41% retention as headline metrics.\n\nSuggested next step: turn the roadmap items into a dated task list so nothing slips — want me to create those tasks?",
  },
  {
    keywords: ["read", "book", "article", "newsletter", "quantum", "learn"],
    tag: "Reading",
    content:
      "Pulling from your reading queue: 'The Design of Everyday Things' best supports your current product work, and the quantum computing article is flagged as trending — strong material for your newsletter draft.\n\nI'd suggest reading the quantum piece first while it's fresh, then pairing Atomic Habits with your morning routine experiment.",
  },
  {
    keywords: ["health", "sleep", "run", "gym", "routine", "habit", "focus"],
    tag: "Health",
    content:
      "Your health-related memories show a consistent pattern: deep-work hours improved 22% since the morning routine experiment started. Your capture velocity is also best between 9–11 AM.\n\nRecommendation: protect that morning block — it's your highest-leverage time based on 14 days of data.",
  },
  {
    keywords: ["code", "react", "dev", "api", "bug", "migrate", "refactor", "typescript"],
    tag: "Dev",
    content:
      "Your Dev memories point to an unfinished refactor of the dashboard module — three captures reference the same migration. The RSC patterns note is the technical reference you'll want handy.\n\nConsolidating these into one project note would reduce context switching; I can create that note if you'd like.",
  },
  {
    keywords: ["idea", "habit coach", "product", "startup", "market"],
    tag: "Idea",
    content:
      "Your habit coach idea has strong signals: a clear target market (busy professionals) and a proof point (the 22% focus improvement from your routine experiment).\n\nStrongest angle: micro-habits generated from journaling data, adapted to behavior — not generic reminders.",
  },
];

const genericReplies = [
  "I searched your second brain and found a few relevant threads. Your most recent captures cluster around work planning and learning — want me to summarize them into one note?",
  "Based on your memories, this connects to your Q4 roadmap and the morning routine experiment. I can draft a consolidated summary of both if that's helpful.",
  "Good question. Your memories suggest a pattern: focus peaks mid-morning and after reading sessions. I'd capture this insight so it's available the next time you ask.",
];

export function generateAiReply(input: string, memories: Memory[]): {
  content: string;
  citations: ChatCitation[];
} {
  const text = input.toLowerCase();
  const match = templates.find((t) => t.keywords.some((k) => text.includes(k)));

  const citationMemories = memories.filter((m) => {
    if (!match) return false;
    return m.tags.includes(match.tag) || m.title.toLowerCase().includes(match.tag.toLowerCase());
  });

  const citations = citationMemories.slice(0, 3).map((m) => ({
    title: m.title,
    memoryId: m.id,
  }));

  return {
    content: match?.content ?? genericReplies[Math.floor(Math.random() * genericReplies.length)],
    citations,
  };
}
