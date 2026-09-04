import { SubjectOption, PresetDoubt } from "./types";

export const SUBJECTS: SubjectOption[] = [
  {
    id: "math",
    name: "Mathematics",
    icon: "Calculator",
    theme: "from-blue-500 to-indigo-600"
  },
  {
    id: "physics",
    name: "Physics",
    icon: "Zap",
    theme: "from-amber-500 to-orange-600"
  },
  {
    id: "chemistry",
    name: "Chemistry",
    icon: "Beaker",
    theme: "from-emerald-500 to-teal-600"
  },
  {
    id: "biology",
    name: "Biology",
    icon: "Dna",
    theme: "from-rose-500 to-pink-600"
  },
  {
    id: "cs",
    name: "Computer Science",
    icon: "Cpu",
    theme: "from-violet-500 to-purple-600"
  },
  {
    id: "history",
    name: "World History",
    icon: "BookOpen",
    theme: "from-cyan-500 to-blue-600"
  },
  {
    id: "eng",
    name: "English Literature",
    icon: "PenTool",
    theme: "from-fuchsia-500 to-pink-600"
  },
  {
    id: "space",
    name: "Astrophysics",
    icon: "Globe",
    theme: "from-indigo-600 to-slate-900"
  }
];

export const PRESET_DOUBTS: PresetDoubt[] = [
  {
    id: "d1",
    title: "Mitochondria's Secret",
    query: "Is mitochondria really the powerhouse of the cell? Explain why we call it that and how it actually produces ATP.",
    subjectId: "biology",
    description: "An introverted classic. Deeply covers cellular energy pathways without complex jargon."
  },
  {
    id: "d2",
    title: "Quantum Superposition",
    query: "Can you explain quantum superposition with an easy analogy? What is the difference between classic bits and qubits?",
    subjectId: "physics",
    description: "Analogies regarding multiple realities simplified for high school graduates."
  },
  {
    id: "d3",
    title: "Understanding Logarithms",
    query: "Why do logarithms exist and why do we use them? Bring in real-life cases like earthquakes or sound waves.",
    subjectId: "math",
    description: "Visualizes power equations as responsive real scales."
  },
  {
    id: "d4",
    title: "The Periodic Table Rules",
    query: "Why are noble gases so stable? Explain standard valence shells and electro-negativity.",
    subjectId: "chemistry",
    description: "Covers organic chemistry bonding laws gracefully."
  },
  {
    id: "d5",
    title: "Recursion Made Simple",
    query: "How does recursive code function without crashing? Draw or explain stack traces with a concrete example like factorial.",
    subjectId: "cs",
    description: "Learn recursive loops without causing memory leaks."
  },
  {
    id: "d6",
    title: "French Revolution Spark",
    query: "What was the absolute flashpoint that triggered the French Revolution? Why was the Bastille so symbolic?",
    subjectId: "history",
    description: "Historical timelines and social contexts parsed."
  }
];
