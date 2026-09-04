import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Heart, 
  Shield, 
  User, 
  Play, 
  Pause,
  ArrowRight,
  Smile,
  Zap,
  Target,
  CheckCircle2,
  AlertCircle,
  Activity,
  Sliders,
  Database,
  Volume2,
  Wand2,
  RefreshCw,
  Gift,
  Maximize2,
  Minimize2,
  Lightbulb,
  Compass,
  Cpu,
  Calendar,
  Code2,
  BookOpen,
  Camera,
  Bookmark,
  Award,
  GraduationCap,
  Layers,
  CloudLightning,
  Lock,
  BrainCircuit,
  FileQuestion,
  HelpCircle,
  Flame,
  Rocket
} from "lucide-react";

interface Slide {
  id: number;
  category: "How It Works" | "My Journey" | "Cool Features" | "Live Demo & Vision";
  title: string;
  subtitle: string;
  description: string;
  highlight: string;
  icon: any;
  colorTheme: string;
  bulletPoints: string[];
  isDemoSlide?: boolean;
}

function getFullscreenSlideTheme(index: number) {
  const themes = [
    {
      // Slide 1 - Welcome & Mission (Sky / Indigo)
      bg: "from-slate-900 via-slate-950 to-indigo-950 border-sky-500/30 shadow-sky-950/50",
      accent: "text-sky-400",
      accentBg: "bg-sky-500/10 border-sky-500/25",
      bulletIcon: "✦",
      iconColor: "text-sky-400"
    },
    {
      // Slide 2 - The Real Classroom Problem (Rose / Red)
      bg: "from-slate-900 via-slate-950 to-rose-950/70 border-rose-500/30 shadow-rose-950/50",
      accent: "text-rose-400",
      accentBg: "bg-rose-500/10 border-rose-500/25",
      bulletIcon: "✦",
      iconColor: "text-rose-400"
    },
    {
      // Slide 3 - Why CleardoubtAI is Important (Amber / Gold / Warm)
      bg: "from-slate-900 via-slate-950 to-amber-950/80 border-amber-500/40 shadow-amber-950/60",
      accent: "text-amber-300",
      accentBg: "bg-amber-500/15 border-amber-500/30",
      bulletIcon: "★",
      iconColor: "text-amber-300"
    },
    {
      // Slide 4 - How It Works (Emerald / Teal)
      bg: "from-slate-900 via-slate-950 to-emerald-950/70 border-emerald-500/30 shadow-emerald-950/50",
      accent: "text-emerald-400",
      accentBg: "bg-emerald-500/10 border-emerald-500/25",
      bulletIcon: "✦",
      iconColor: "text-emerald-400"
    },
    {
      // Slide 5 - Why It Is Super Useful (Cyan / Blue)
      bg: "from-slate-900 via-slate-950 to-cyan-950/70 border-cyan-500/30 shadow-cyan-950/50",
      accent: "text-cyan-400",
      accentBg: "bg-cyan-500/10 border-cyan-500/25",
      bulletIcon: "✦",
      iconColor: "text-cyan-400"
    },
    {
      // Slide 6 - Built on Google AI Studio (Amber / Gold)
      bg: "from-slate-900 via-slate-950 to-amber-950/70 border-amber-500/30 shadow-amber-950/50",
      accent: "text-amber-400",
      accentBg: "bg-amber-500/10 border-amber-500/25",
      bulletIcon: "★",
      iconColor: "text-amber-400"
    },
    {
      // Slide 7 - The Summer Spark (Orange / Amber)
      bg: "from-slate-900 via-slate-950 to-orange-950/70 border-orange-500/30 shadow-orange-950/50",
      accent: "text-orange-400",
      accentBg: "bg-orange-500/10 border-orange-500/25",
      bulletIcon: "✦",
      iconColor: "text-orange-400"
    },
    {
      // Slide 8 - Father's Guidance & Starting (Violet / Purple)
      bg: "from-slate-900 via-slate-950 to-violet-950/70 border-violet-500/30 shadow-violet-950/50",
      accent: "text-violet-400",
      accentBg: "bg-violet-500/10 border-violet-500/25",
      bulletIcon: "✦",
      iconColor: "text-violet-400"
    },
    {
      // Slide 9 - Zero-Budget Challenge (Green / Lime)
      bg: "from-slate-900 via-slate-950 to-emerald-900/80 border-emerald-400/40 shadow-emerald-950/60",
      accent: "text-emerald-300",
      accentBg: "bg-emerald-400/15 border-emerald-400/30",
      bulletIcon: "✦",
      iconColor: "text-emerald-300"
    },
    {
      // Slide 10 - Time Management (Indigo / Navy)
      bg: "from-slate-900 via-slate-950 to-indigo-900/80 border-indigo-400/40 shadow-indigo-950/60",
      accent: "text-indigo-300",
      accentBg: "bg-indigo-400/15 border-indigo-400/30",
      bulletIcon: "✦",
      iconColor: "text-indigo-300"
    },
    {
      // Slide 11 - Vibe Coding & Skills (Fuchsia / Pink)
      bg: "from-slate-900 via-slate-950 to-fuchsia-950/70 border-fuchsia-500/30 shadow-fuchsia-950/50",
      accent: "text-fuchsia-400",
      accentBg: "bg-fuchsia-500/10 border-fuchsia-500/25",
      bulletIcon: "✦",
      iconColor: "text-fuchsia-400"
    },
    {
      // Slide 12 - 6 Learning Modes (Yellow / Amber)
      bg: "from-slate-900 via-slate-950 to-amber-900/75 border-yellow-400/40 shadow-amber-950/60",
      accent: "text-yellow-300",
      accentBg: "bg-yellow-400/15 border-yellow-400/30",
      bulletIcon: "✦",
      iconColor: "text-yellow-300"
    },
    {
      // Slide 13 - Photo & Voice Input (Teal / Sky)
      bg: "from-slate-900 via-slate-950 to-teal-950/70 border-teal-500/30 shadow-teal-950/50",
      accent: "text-teal-400",
      accentBg: "bg-teal-500/10 border-teal-500/25",
      bulletIcon: "✦",
      iconColor: "text-teal-400"
    },
    {
      // Slide 14 - Saved Vault & Diagrams (Purple / Rose)
      bg: "from-slate-900 via-slate-950 to-purple-900/70 border-purple-400/30 shadow-purple-950/50",
      accent: "text-purple-300",
      accentBg: "bg-purple-400/15 border-purple-400/25",
      bulletIcon: "✦",
      iconColor: "text-purple-300"
    },
    {
      // Slide 15 - Learning to Think (Blue / Cyan)
      bg: "from-slate-900 via-slate-950 to-blue-950/70 border-blue-500/30 shadow-blue-950/50",
      accent: "text-blue-400",
      accentBg: "bg-blue-500/10 border-blue-500/25",
      bulletIcon: "✦",
      iconColor: "text-blue-400"
    },
    {
      // Slide 16 - Live Demo Time & Accord Vision (Grand Gold Theme)
      bg: "from-slate-900 via-amber-950/90 to-orange-950/90 border-amber-400/60 shadow-amber-950/80",
      accent: "text-amber-300",
      accentBg: "bg-amber-400/20 border-amber-400/40",
      bulletIcon: "🚀",
      iconColor: "text-amber-300"
    }
  ];
  return themes[index] || themes[0];
}

interface ClearDoubtPresentationProps {
  onStartLiveDemo?: () => void;
}

export default function ClearDoubtPresentation({ onStartLiveDemo }: ClearDoubtPresentationProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [showTrick, setShowTrick] = useState(false);
  const [trickSlideIndex, setTrickSlideIndex] = useState(0);
  const [showTrickCelebration, setShowTrickCelebration] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [diagResults, setDiagResults] = useState<{
    camera: "unchecked" | "diagnosing" | "pass" | "fail";
    microphone: "unchecked" | "diagnosing" | "pass" | "fail";
    database: "unchecked" | "diagnosing" | "pass" | "fail";
    sound: "unchecked" | "diagnosing" | "pass" | "fail";
    deck: "unchecked" | "diagnosing" | "pass" | "fail";
  }>({
    camera: "unchecked",
    microphone: "unchecked",
    database: "unchecked",
    sound: "unchecked",
    deck: "unchecked",
  });

  const slides: Slide[] = [
    // PART 1: HOW THE PLATFORM WORKS & WHY IT HELPS STUDENTS (SLIDES 1-6)
    {
      id: 1,
      category: "How It Works",
      title: "Welcome to CleardoubtAI",
      subtitle: "A Friendly 24/7 Study Buddy Built by Shanmuka (Class 6, Accord School)",
      description: "CleardoubtAI is a kind and patient online study helper made specially for school students! Whether you are stuck on a difficult math problem, a confusing science concept, or homework late at night, you can ask anything without feeling shy or scared of being judged.",
      highlight: "Accord School Motto: 'Believe in Thyself' — Helping every student learn with confidence and zero fear!",
      icon: GraduationCap,
      colorTheme: "from-sky-50/80 via-indigo-50/50 to-slate-50/20 border-sky-200",
      bulletPoints: [
        "Ask Anything Freely: No question is too simple or silly. Ask without any fear!",
        "Available Day & Night: Ready to help 24/7 whenever you do homework or revise for exams.",
        "Built with Love: Created by a 6th grader to help all fellow classmates understand concepts easily."
      ]
    },
    {
      id: 2,
      category: "How It Works",
      title: "The Everyday Problem in School",
      subtitle: "Why We Hesitate to Ask Doubts in Class",
      description: "In regular classrooms, many students feel shy to raise their hand because they worry classmates might laugh. And when studying at home in the evening or during holidays, there is no teacher nearby to ask. When we get stuck on one question, we often feel frustrated and give up.",
      highlight: "CleardoubtAI solves this by giving you a private tutor that is always kind, patient, and happy to help.",
      icon: FileQuestion,
      colorTheme: "from-rose-50/80 via-pink-50/50 to-slate-50/20 border-rose-200",
      bulletPoints: [
        "Classroom Shyness: Fear of being judged stops us from asking simple questions.",
        "Late-Night Homework Blocks: No one is available to help when you are stuck at night.",
        "Frustration & Giving Up: Getting stuck on one math sum can ruin your whole study mood."
      ]
    },
    {
      id: 3,
      category: "How It Works",
      title: "Why CleardoubtAI is Important",
      subtitle: "Transforming Confusion into Instant Confidence & Real Understanding",
      description: "Doubts are a natural part of learning, but unattended doubts quickly pile up into fear and exam stress. CleardoubtAI is essential because it bridges this critical gap — giving every student immediate, personalized, and judgment-free explanations the exact moment a doubt arises.",
      highlight: "When students get instant answers without fear, learning becomes enjoyable, grades improve, and self-confidence skyrockets!",
      icon: Sparkles,
      colorTheme: "from-amber-50/80 via-orange-50/50 to-slate-50/20 border-amber-200",
      bulletPoints: [
        "Eliminates Learning Gaps: Solves doubts instantly before they turn into exam anxiety or confusion.",
        "Builds Lifelong Confidence: Empowers students to explore challenging topics freely at their own pace.",
        "24/7 Academic Safety Net: Always ready to assist during late-night homework, weekends, and holidays.",
        "Equal Learning for Everyone: Every student gets a dedicated, world-class personal mentor for free."
      ]
    },
    {
      id: 4,
      category: "How It Works",
      title: "How CleardoubtAI Works (In 3 Easy Steps)",
      subtitle: "As Simple as Asking Your Best Friend!",
      description: "Using CleardoubtAI is super simple and takes only a few seconds: \n1. Ask your question by typing, speaking into the mic, or taking a photo of your textbook. \n2. Choose how you want it explained (like an easy story, step-by-step math steps, or hints only). \n3. Read or listen to the answer until you understand it completely!",
      highlight: "You are in control: You choose how simple or detailed you want the explanation to be!",
      icon: CheckCircle2,
      colorTheme: "from-emerald-50/80 via-teal-50/50 to-slate-50/20 border-emerald-200",
      bulletPoints: [
        "Step 1: Ask Your Way — Type it, speak into the mic, or snap a textbook picture.",
        "Step 2: Pick Your Style — Choose easy analogies, full math steps, or clue-by-clue hints.",
        "Step 3: Understand Easily — Read the clean notes or listen to the friendly voice explanation."
      ]
    },
    {
      id: 5,
      category: "How It Works",
      title: "Why It Is Super Useful for Students",
      subtitle: "Your Personal Tutor That Never Gets Angry or Tired",
      description: "Unlike human tutors who might get tired after explaining something 5 times, CleardoubtAI is endlessly patient. It can explain the same idea in 10 different ways until it clicks! Plus, it gives you clues instead of direct answers so you actually learn how to solve it yourself in exams.",
      highlight: "It teaches you 'how to think', so you become confident and score great marks in real tests!",
      icon: Heart,
      colorTheme: "from-cyan-50/80 via-blue-50/50 to-slate-50/20 border-cyan-200",
      bulletPoints: [
        "Endless Patience: Ask the same doubt 10 times — it will explain in new fun ways cheerfully!",
        "Learn by Doing: Gives clues and formula hints so you understand the logic yourself.",
        "100% Private & Safe: No tracking, no scoreboards, and no one watching over your shoulder."
      ]
    },
    {
      id: 6,
      category: "How It Works",
      title: "Built on Google AI Studio for Free (₹0)",
      subtitle: "Powered by Google's Smart AI with Zero Money Spent",
      description: "CleardoubtAI was completely designed and built using Google AI Studio (ai.studio/build)! By using Google's super smart Gemini AI, this entire full-stack app was created without spending a single rupee. It proves that kids can use free Google tools to build amazing real-world software.",
      highlight: "Built entirely on Google AI Studio — showing the power of modern free AI tools for young students.",
      icon: CloudLightning,
      colorTheme: "from-amber-50/80 via-orange-50/50 to-slate-50/20 border-amber-200",
      bulletPoints: [
        "Powered by Google AI Studio: The powerful workspace where all the code and AI logic was created.",
        "Google Gemini Intelligence: Smart AI that understands school science, math, history, and languages.",
        "Zero Expense (₹0): Built 100% for free using open Google developer platforms."
      ]
    },

    // PART 2: THE 6TH GRADER CREATOR JOURNEY (SLIDES 7-11)
    {
      id: 7,
      category: "My Journey",
      title: "How the Idea Was Born",
      subtitle: "A Summer Vacation Chat with My Father",
      description: "During our summer break, I was talking to my father about how hard it is when you get stuck on a difficult homework problem alone at home. We thought: 'Wouldn't it be wonderful if every student had a kind AI helper that explains things step by step like a friendly teacher?'",
      highlight: "A simple family discussion during holidays sparked the entire idea for CleardoubtAI.",
      icon: Lightbulb,
      colorTheme: "from-orange-50/80 via-amber-50/50 to-slate-50/20 border-orange-200",
      bulletPoints: [
        "The Summer Chat: Discussing real student struggles with late-night homework blocks.",
        "The Big Dream: Creating an AI helper that is patient, friendly, and never makes you feel bad.",
        "The Mission: Help all my Accord School classmates study better and stress less."
      ]
    },
    {
      id: 8,
      category: "My Journey",
      title: "Starting Out with My Father's Help",
      subtitle: "Learning the Basics & Taking Charge on My Own",
      description: "My father introduced me to the exciting world of AI. He explained the basics of how code works and how to guide AI models with clear instructions. After that initial push, I took full responsibility — doing my own research, testing screens, and building out the app feature by feature.",
      highlight: "From guided curiosity to building real features independently through hands-on practice.",
      icon: Compass,
      colorTheme: "from-violet-50/80 via-purple-50/50 to-slate-50/20 border-violet-200",
      bulletPoints: [
        "Father's Initial Guidance: Showed me how AI understands instructions and prompts.",
        "Independent Research: Explored web pages, design layouts, and TypeScript code by myself.",
        "Designing the App: Created buttons, color cards, voice mic features, and slide presentations."
      ]
    },
    {
      id: 9,
      category: "My Journey",
      title: "The '₹0 Budget' Challenge",
      subtitle: "Testing Multiple AI Tools Without Spending Any Money",
      description: "My father gave me one strict rule: 'You must not spend a single rupee.' This made me research hard! I tried many AI platforms like Lovable, Emergent, and Replit. I struggled through many broken screens and errors, before finding Google AI Studio, which gave me everything for free!",
      highlight: "Proved that passion and persistence matter way more than having a big budget!",
      icon: Cpu,
      colorTheme: "from-emerald-50/80 via-teal-50/50 to-slate-50/20 border-emerald-200",
      bulletPoints: [
        "Strict Zero-Rupee Rule: Only used free tools, student tiers, and open developer resources.",
        "Tried Many Platforms: Tested tools like Lovable, Emergent, and Replit to see how they work.",
        "Victory with Google AI Studio: Found the perfect, completely free platform to build the whole app."
      ]
    },
    {
      id: 10,
      category: "My Journey",
      title: "Managing My Time as a 6th Grader",
      subtitle: "Schoolwork First, Coding on Weekends & Holidays!",
      description: "As a student at Accord School, my regular classes, daily homework, and unit tests always came first! I managed my schedule by finishing schoolwork first, then spending weekends, festival holidays, and free evenings to code, fix bugs, and test the app with real textbook questions.",
      highlight: "Good discipline and steady daily effort turned a summer idea into a working reality!",
      icon: Calendar,
      colorTheme: "from-indigo-50/80 via-blue-50/50 to-slate-50/20 border-indigo-200",
      bulletPoints: [
        "School First Always: Finished all school assignments and test preparation before coding.",
        "Weekend Coding Fun: Used Saturdays, Sundays, and holidays for designing and building.",
        "Never Giving Up: Kept trying again and again whenever a button or code broke!"
      ]
    },
    {
      id: 11,
      category: "My Journey",
      title: "What I Learned — 'Vibe Coding' & Future Tech",
      subtitle: "Talking with AI to Build Real Software",
      description: "This project taught me amazing skills for the future! I learned 'Vibe Coding' — the modern way of describing your ideas clearly to AI to build full web applications. I also learned prompt engineering, web voice synthesis, responsive design, and how AI can help education.",
      highlight: "AI is a superpower for young students: Even in 6th grade, we can build tools that help our friends.",
      icon: Code2,
      colorTheme: "from-fuchsia-50/80 via-pink-50/50 to-slate-50/20 border-fuchsia-200",
      bulletPoints: [
        "Vibe Coding: Describing what you want to AI in natural English to create full-stack apps.",
        "Prompt Writing: Teaching the AI to give gentle hints instead of just spitting out answers.",
        "Future-Ready Skills: Learning the real-world technologies that will shape tomorrow."
      ]
    },

    // PART 3: COOL FEATURES (SLIDES 12-15)
    {
      id: 12,
      category: "Cool Features",
      title: "6 Fun Ways to Learn (Study Modes)",
      subtitle: "Choose the Explanation Style That Matches Your Mood!",
      description: "Every student understands differently. That's why CleardoubtAI has 6 special modes: \n1. Explain Like I'm 5 (Easy stories & real-life examples). \n2. Step-by-Step Math (Every calculation clearly shown). \n3. Homework Clue Mode (Hints without spoilers). \n4. Exam Prep Sprint (Key formulas & common traps). \n5. Lazy Mode (Short & sweet when tired). \n6. Deep Study (Complete textbook breakdown).",
      highlight: "Custom learning: Switch from simple story examples to full math formulas with one click!",
      icon: Zap,
      colorTheme: "from-amber-50/80 via-yellow-50/50 to-orange-50/30 border-amber-300",
      bulletPoints: [
        "Story Mode (ELI5): Uses everyday examples (like pizzas or video games) to explain science.",
        "Clue Mode: Gives step-by-step hints so you can solve homework questions on your own.",
        "Exam Sprint: Shows quick formulas, memory tricks, and mistakes teachers look out for."
      ]
    },
    {
      id: 13,
      category: "Cool Features",
      title: "Ask by Photo, Voice, or Text",
      subtitle: "Take a Picture, Speak into the Mic, or Type!",
      description: "Asking a question is as easy as taking a photo! If a textbook math sum is too long to type, snap a photo with your phone camera. If you don't feel like typing, press the mic and speak your doubt. You can even click 'Listen' to hear the AI read the explanation aloud in a friendly voice.",
      highlight: "Super accessible: Perfect whether you like reading, listening, speaking, or snapping photos!",
      icon: Volume2,
      colorTheme: "from-teal-50/80 via-cyan-50/50 to-slate-50/20 border-teal-200",
      bulletPoints: [
        "Photo Question Scanner: Take a photo of your textbook question and get instant help.",
        "Voice Mic: Speak your question hands-free without typing long equations.",
        "Listen Aloud: Let the friendly voice reader speak the answer out loud to you."
      ]
    },
    {
      id: 14,
      category: "Cool Features",
      title: "Your Secret Saved Vault & Neat Drawings",
      subtitle: "Bookmark Important Questions & See Step-by-Step Diagrams",
      description: "Never lose a great explanation before exams! Click the bookmark icon to save solved doubts into your private Saved Vault on your device. You can filter by subject (Math, Science, English) and review them before tests. The app also draws clean diagrams for science and geometry!",
      highlight: "Everything stays saved safely on your own phone or laptop for quick test revision.",
      icon: Database,
      colorTheme: "from-rose-50/80 via-purple-50/50 to-slate-50/20 border-rose-200",
      bulletPoints: [
        "Private Saved Vault: Save important solved questions and search them anytime.",
        "Subject Filters: Organize notes by Math, Science, Social Studies, and English.",
        "Visual Diagrams: Generates neat geometric shapes and science diagrams right in the chat."
      ]
    },
    {
      id: 15,
      category: "Cool Features",
      title: "Learning to Think, Not Just Copying",
      subtitle: "Next Up: Live Classroom Demo with Real Questions!",
      description: "CleardoubtAI is built to make you smarter, not lazy! Instead of just giving away final answers to copy-paste, it reminds you of key formulas and guides you through the logic. Now that we have covered the full story and all features, get ready to test it live!",
      highlight: "Coming up in the next slide: We are starting our LIVE CLASSROOM DEMO!",
      icon: BrainCircuit,
      colorTheme: "from-blue-50/80 via-indigo-50/50 to-slate-50/20 border-blue-200",
      bulletPoints: [
        "Formula Reminders: Explains the 'why' behind each formula so you never forget it.",
        "Step-by-Step Thinking: Shows how to break big hard problems into small easy steps.",
        "Get Your Doubts Ready: In the next slide, we will solve real questions live together!"
      ]
    },

    // PART 4: THE BIG FINALE & LIVE CLASSROOM DEMO LAUNCH (SLIDE 16)
    {
      id: 16,
      category: "Live Demo & Vision",
      title: "🚀 Live Demo Time & 'Believe in Thyself'",
      subtitle: "Let's Test CleardoubtAI with Your Real Textbook Doubts!",
      description: "Thank you, classmates! If a 6th grader at Accord School can build an AI study platform during holidays with ₹0 using Google AI Studio, every single one of us can build amazing things! \n\nNow, let's start our LIVE DEMO! Who in our class has a tough math or science question to test right now?",
      highlight: "Accord School Motto: 'Believe in Thyself' — Click below to launch the live doubt solver!",
      icon: Rocket,
      colorTheme: "from-amber-50/90 via-orange-50/60 to-yellow-50/40 border-amber-400",
      bulletPoints: [
        "Live Classroom Test: Pick any difficult question from your 6th-grade math or science book!",
        "Try Different Modes: Watch the AI switch between Story Mode, Math Steps, and Clue Mode.",
        "Living the Accord Motto: 'Believe in Thyself' every single day in school and life!"
      ],
      isDemoSlide: true
    }
  ];

  // Standard autoplay effect
  useEffect(() => {
    if (!isPlaying || showTrick) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying, slides.length, showTrick]);

  // Audio synthesis chimer for trick/diagnostics
  const playSynthesizedChime = (type: "diagnostic" | "trick" | "success" | "click") => {
    try {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtxClass) return;
      const audioCtx = new AudioCtxClass();
      
      const playTone = (freq: number, start: number, duration: number, vol = 0.05) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime + start);
        gain.gain.setValueAtTime(vol, audioCtx.currentTime + start);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + start + duration - 0.03);
        osc.start(audioCtx.currentTime + start);
        osc.stop(audioCtx.currentTime + start + duration);
      };

      if (type === "click") {
        playTone(600, 0, 0.08, 0.03);
      } else if (type === "diagnostic") {
        playTone(440, 0, 0.15, 0.04);
        playTone(554.37, 0.1, 0.15, 0.04);
      } else if (type === "trick") {
        const freqs = [523.25, 587.33, 659.25, 698.46, 783.99, 880.00, 987.77, 1046.50, 1174.66, 1318.51];
        const index = Math.min(trickSlideIndex, freqs.length - 1);
        playTone(freqs[index], 0, 0.3, 0.05);
      } else if (type === "success") {
        playTone(523.25, 0, 0.2); // C5
        playTone(659.25, 0.1, 0.2); // E5
        playTone(783.99, 0.2, 0.2); // G5
        playTone(1046.50, 0.3, 0.6, 0.07); // C6 chord resolution
      }
    } catch (e) {
      console.warn("Audio Context blocked or unsupported:", e);
    }
  };

  // Run live hardware & software diagnostic system
  const runLiveDiagnostics = async () => {
    if (isDiagnosing) return;
    setIsDiagnosing(true);
    playSynthesizedChime("diagnostic");
    
    setDiagResults({
      camera: "diagnosing",
      microphone: "diagnosing",
      database: "diagnosing",
      sound: "diagnosing",
      deck: "diagnosing",
    });

    // 1. Camera capability probe
    await new Promise((resolve) => setTimeout(resolve, 500));
    const hasCamera = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    setDiagResults(prev => ({ ...prev, camera: hasCamera ? "pass" : "fail" }));
    playSynthesizedChime("click");

    // 2. Microphone capture probe
    await new Promise((resolve) => setTimeout(resolve, 450));
    const hasMic = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia || (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);
    setDiagResults(prev => ({ ...prev, microphone: hasMic ? "pass" : "fail" }));
    playSynthesizedChime("click");

    // 3. Database Cache persistence check
    await new Promise((resolve) => setTimeout(resolve, 350));
    let hasDb = false;
    try {
      localStorage.setItem("accord_diag_cache", "test");
      localStorage.removeItem("accord_diag_cache");
      hasDb = true;
    } catch (e) {
      hasDb = false;
    }
    setDiagResults(prev => ({ ...prev, database: hasDb ? "pass" : "fail" }));
    playSynthesizedChime("click");

    // 4. Web Audio Synthesizer check
    await new Promise((resolve) => setTimeout(resolve, 300));
    const hasAudio = !!(window.AudioContext || (window as any).webkitAudioContext);
    setDiagResults(prev => ({ ...prev, sound: hasAudio ? "pass" : "fail" }));
    playSynthesizedChime("click");

    // 5. Presentation slideshow validity check
    await new Promise((resolve) => setTimeout(resolve, 350));
    setDiagResults(prev => ({ ...prev, deck: slides.length >= 15 ? "pass" : "fail" }));

    setIsDiagnosing(false);
    playSynthesizedChime("success");
  };

  // Automated "Presentation Trick" sequence simulation
  useEffect(() => {
    if (!showTrick) return;
    setIsPlaying(false);
    
    const interval = setInterval(() => {
      setTrickSlideIndex((prev) => {
        const next = prev + 1;
        if (next >= slides.length) {
          clearInterval(interval);
          setShowTrick(false);
          setShowTrickCelebration(true);
          playSynthesizedChime("success");
          return 0;
        }
        setCurrentSlide(next);
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [showTrick, slides.length]);

  useEffect(() => {
    if (showTrick) {
      playSynthesizedChime("trick");
    }
  }, [trickSlideIndex, showTrick]);

  const triggerTrickShow = () => {
    playSynthesizedChime("click");
    setTrickSlideIndex(0);
    setCurrentSlide(0);
    setShowTrick(true);
  };

  const handleNext = () => {
    playSynthesizedChime("click");
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    playSynthesizedChime("click");
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleLaunchDemo = () => {
    playSynthesizedChime("success");
    setIsFullscreen(false);
    if (onStartLiveDemo) {
      onStartLiveDemo();
    }
  };

  // Fullscreen keyboard navigation controls (Arrow keys, Spacebar & Escape)
  useEffect(() => {
    if (!isFullscreen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        playSynthesizedChime("click");
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
        playSynthesizedChime("click");
      } else if (e.key === "Escape") {
        e.preventDefault();
        setIsFullscreen(false);
        playSynthesizedChime("click");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen, slides.length]);

  const ActiveIcon = slides[currentSlide].icon;

  return (
    <div className="space-y-6">
      {/* PPT Interactive Card Container */}
      <div 
        id="ppt-slide-deck" 
        className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 text-left flex flex-col justify-between min-h-[530px] hover:border-amber-700/20 transition-all relative overflow-hidden select-none"
      >
        {/* Floating sparkles when Trick Showcase is running */}
        {showTrick && (
          <div className="absolute inset-0 pointer-events-none bg-amber-500/5 z-40 flex items-center justify-center">
            <motion.div 
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="absolute text-amber-500 opacity-60"
            >
              <Sparkles className="w-16 h-16 animate-pulse" />
            </motion.div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/90 text-white text-[10px] font-mono px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg border border-amber-500/30">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-ping" />
              <span>TRICK MODE: AUTO-PRESENTING ALL {slides.length} SLIDES</span>
            </div>
          </div>
        )}

        {/* Slide Upper Section */}
        <div>
          {/* Top Bar: Categories & Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-slate-100 pb-3 mb-4 shrink-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] bg-purple-100 text-purple-800 font-extrabold px-2 py-0.5 rounded tracking-wide uppercase font-mono">
                Classroom Presentation Deck
              </span>
              <span className="text-xs font-mono text-slate-500 font-semibold">
                Slide {slides[currentSlide].id} of {slides.length}
              </span>
              <span className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full border ${
                slides[currentSlide].category === "How It Works" ? "bg-sky-50 text-sky-800 border-sky-200" :
                slides[currentSlide].category === "My Journey" ? "bg-amber-50 text-amber-800 border-amber-200" :
                slides[currentSlide].category === "Cool Features" ? "bg-emerald-50 text-emerald-800 border-emerald-200" :
                "bg-orange-50 text-orange-900 border-orange-300 font-extrabold animate-pulse"
              }`}>
                Part: {slides[currentSlide].category}
              </span>
            </div>
            
            <div className="flex items-center gap-1.5 self-end sm:self-auto">
              <button
                onClick={() => {
                  playSynthesizedChime("click");
                  setIsPlaying(!isPlaying);
                }}
                disabled={showTrick}
                className="p-1 px-2.5 text-[10px] border border-slate-200 rounded-md hover:bg-slate-50 transition-colors flex items-center gap-1 font-bold text-slate-600 focus:outline-none cursor-pointer disabled:opacity-40"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-amber-700 animate-spin" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>AutoPlay</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  playSynthesizedChime("click");
                  setIsFullscreen(true);
                }}
                className="p-1 px-3 text-[10px] bg-amber-50 hover:bg-amber-100/80 border border-amber-200 text-amber-950 font-extrabold rounded-md transition-all flex items-center gap-1 shadow-3xs cursor-pointer active:scale-97"
                title="Enter Fullscreen Presenter Mode"
              >
                <Maximize2 className="w-3 h-3 text-amber-700" />
                <span>Present Fullscreen</span>
              </button>
            </div>
          </div>

          {/* Dynamic content transition */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.22 }}
              className={`rounded-xl border p-4 sm:p-5 bg-gradient-to-br ${slides[currentSlide].colorTheme} transition-all relative overflow-hidden`}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white shadow-xs border border-slate-200/60 flex items-center justify-center shrink-0">
                  <ActiveIcon className="w-5.5 h-5.5 text-slate-700" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-sm sm:text-base font-black text-slate-900 leading-tight font-sans">
                    {slides[currentSlide].title}
                  </h4>
                  <p className="text-xs text-amber-900 font-bold tracking-tight">
                    {slides[currentSlide].subtitle}
                  </p>
                </div>
              </div>

              <p className="text-slate-700 text-xs mt-3.5 leading-relaxed font-sans font-medium whitespace-pre-line">
                {slides[currentSlide].description}
              </p>

              {/* Bullet Points */}
              <ul className="mt-4 space-y-1.5">
                {slides[currentSlide].bulletPoints.map((bp, i) => (
                  <li key={i} className="text-[11px] text-slate-600 flex items-start gap-1.5 font-medium leading-normal">
                    <span className="text-amber-700 mt-0.5 shrink-0 font-bold">✦</span>
                    <span>{bp}</span>
                  </li>
                ))}
              </ul>

              {/* Special Action Callout / Live Demo Button on Slide 15 */}
              {slides[currentSlide].isDemoSlide ? (
                <div className="mt-4 pt-3.5 border-t border-amber-300/60 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-[11px] font-bold text-amber-950 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{slides[currentSlide].highlight}</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleLaunchDemo}
                    className="w-full sm:w-auto bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-700 hover:to-orange-800 text-white text-xs font-black px-4 py-2 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 animate-bounce"
                  >
                    <Rocket className="w-4 h-4" />
                    <span>🚀 Launch Live Demo Now!</span>
                  </button>
                </div>
              ) : (
                <div className="mt-4 pt-3 border-t border-slate-300/40 font-medium text-[11px] text-slate-800 italic flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{slides[currentSlide].highlight}</span>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between shrink-0 mt-4">
          <div className="flex gap-1 flex-wrap max-w-[65%]">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => {
                  playSynthesizedChime("click");
                  setCurrentSlide(idx);
                }}
                disabled={showTrick}
                className={`h-2 rounded-full transition-all focus:outline-none cursor-pointer ${
                  currentSlide === idx ? "w-6 bg-slate-800" : "w-1.5 bg-slate-200 hover:bg-slate-400"
                } disabled:opacity-40`}
                title={`Slide ${s.id}: ${s.title}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              disabled={showTrick}
              className="p-1.5 px-2.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 hover:border-slate-300 rounded-lg text-slate-600 hover:text-slate-900 transition-colors cursor-pointer disabled:opacity-40 text-xs font-semibold flex items-center gap-1"
              title="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Prev</span>
            </button>
            
            <button
              type="button"
              onClick={handleNext}
              disabled={showTrick}
              className="p-1.5 px-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-1 cursor-pointer disabled:opacity-40 active:scale-97 shadow-xs"
              title="Next Slide"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* SYSTEM DIAGNOSTICS CHECK PANEL */}
      <div className="bg-white border border-slate-200/95 rounded-2xl shadow-xs p-5 text-left space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-amber-50 rounded-lg border border-amber-200 flex items-center justify-center text-amber-700">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider font-mono">
                Shanmuka's Presenter Engine & System Check
              </h3>
              <p className="text-[10px] text-slate-500 font-medium">Verify {slides.length} presentation slides & browser audio/camera support</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={triggerTrickShow}
              disabled={showTrick}
              className="bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-extrabold px-3 py-1.5 rounded-xl transition-colors shadow-xs hover:shadow-md cursor-pointer flex items-center gap-1 select-none disabled:opacity-40"
            >
              <Wand2 className="w-3 h-3 animate-bounce" />
              <span>Show Presentation Walkthrough</span>
            </button>

            <button
              type="button"
              onClick={runLiveDiagnostics}
              disabled={isDiagnosing}
              className="bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-extrabold px-3 py-1.5 rounded-xl transition-colors shadow-xs cursor-pointer flex items-center gap-1 select-none disabled:bg-slate-200"
            >
              <RefreshCw className={`w-3 h-3 ${isDiagnosing ? 'animate-spin' : ''}`} />
              <span>{isDiagnosing ? 'Diagnosing...' : 'Run Diagnostics'}</span>
            </button>
          </div>
        </div>

        {/* Live Status Checks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {/* CAMERA CHECK */}
          <div className="border border-slate-100 rounded-xl p-3 bg-slate-50/40 space-y-1.5">
            <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider">Photo Question Capture</span>
            <div className="flex items-center gap-1.5">
              {diagResults.camera === "unchecked" && <span className="text-slate-500 font-mono text-[11px] font-semibold">Unchecked</span>}
              {diagResults.camera === "diagnosing" && <span className="text-blue-600 font-mono text-[11px] font-semibold animate-pulse">Checking...</span>}
              {diagResults.camera === "pass" && (
                <div className="flex items-center gap-1 text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span className="font-mono text-[11px] font-bold">READY</span>
                </div>
              )}
              {diagResults.camera === "fail" && (
                <div className="flex items-center gap-1 text-slate-500">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span className="font-mono text-[11px] font-medium">PASSIVE</span>
                </div>
              )}
            </div>
            <p className="text-[9.5px] text-slate-500 leading-tight">Direct camera & photo upload for textbook problems.</p>
          </div>

          {/* MIC CHECK */}
          <div className="border border-slate-100 rounded-xl p-3 bg-slate-50/40 space-y-1.5">
            <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider">Voice Mic Input</span>
            <div className="flex items-center gap-1.5">
              {diagResults.microphone === "unchecked" && <span className="text-slate-500 font-mono text-[11px] font-semibold">Unchecked</span>}
              {diagResults.microphone === "diagnosing" && <span className="text-blue-600 font-mono text-[11px] font-semibold animate-pulse">Checking...</span>}
              {diagResults.microphone === "pass" && (
                <div className="flex items-center gap-1 text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span className="font-mono text-[11px] font-bold">READY</span>
                </div>
              )}
              {diagResults.microphone === "fail" && (
                <div className="flex items-center gap-1 text-amber-600">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span className="font-mono text-[11px] font-medium">NOT SUPPORTED</span>
                </div>
              )}
            </div>
            <p className="text-[9.5px] text-slate-500 leading-tight">Speak your questions directly into the browser mic.</p>
          </div>

          {/* DB CACHE CHECK */}
          <div className="border border-slate-100 rounded-xl p-3 bg-slate-50/40 space-y-1.5">
            <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider">Secret Saved Vault</span>
            <div className="flex items-center gap-1.5">
              {diagResults.database === "unchecked" && <span className="text-slate-500 font-mono text-[11px] font-semibold">Unchecked</span>}
              {diagResults.database === "diagnosing" && <span className="text-blue-600 font-mono text-[11px] font-semibold animate-pulse">Checking...</span>}
              {diagResults.database === "pass" && (
                <div className="flex items-center gap-1 text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span className="font-mono text-[11px] font-bold">PASSED</span>
                </div>
              )}
              {diagResults.database === "fail" && (
                <div className="flex items-center gap-1 text-red-600">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span className="font-mono text-[11px] font-bold">WIPE PROTECTION</span>
                </div>
              )}
            </div>
            <p className="text-[9.5px] text-slate-500 leading-tight">Private local storage for bookmarks and notes.</p>
          </div>

          {/* CHIME TEST */}
          <div className="border border-slate-100 rounded-xl p-3 bg-slate-50/40 space-y-1.5">
            <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider">Audio Reader & Synth</span>
            <div className="flex items-center gap-1.5">
              {diagResults.sound === "unchecked" && <span className="text-slate-500 font-mono text-[11px] font-semibold">Unchecked</span>}
              {diagResults.sound === "diagnosing" && <span className="text-blue-600 font-mono text-[11px] font-semibold animate-pulse">Checking...</span>}
              {diagResults.sound === "pass" && (
                <div className="flex items-center gap-1 text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span className="font-mono text-[11px] font-bold">SUPPORTED</span>
                </div>
              )}
              {diagResults.sound === "fail" && (
                <div className="flex items-center gap-1 text-amber-600">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span className="font-mono text-[11px] font-medium">MUTED</span>
                </div>
              )}
            </div>
            <p className="text-[9.5px] text-slate-500 leading-tight">Listen to answers read aloud in a warm voice.</p>
          </div>

          {/* SLIDES CHECK */}
          <div className="border border-slate-100 rounded-xl p-3 bg-slate-50/40 space-y-1.5">
            <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider">{slides.length} Slides Deck</span>
            <div className="flex items-center gap-1.5">
              {diagResults.deck === "unchecked" && <span className="text-slate-500 font-mono text-[11px] font-semibold">Unchecked</span>}
              {diagResults.deck === "diagnosing" && <span className="text-blue-600 font-mono text-[11px] font-semibold animate-pulse">Checking...</span>}
              {diagResults.deck === "pass" && (
                <div className="flex items-center gap-1 text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span className="font-mono text-[11px] font-bold">{slides.length}/{slides.length} SLIDES</span>
                </div>
              )}
              {diagResults.deck === "fail" && (
                <div className="flex items-center gap-1 text-red-600">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span className="font-mono text-[11px] font-bold">ERROR</span>
                </div>
              )}
            </div>
            <p className="text-[9.5px] text-slate-500 leading-tight">All {slides.length} slides loaded & live demo launcher ready.</p>
          </div>
        </div>
      </div>

      {/* POPUP MODAL FOR SHOWING THE PRESENTER TRICK CELEBRATION */}
      <AnimatePresence>
        {showTrickCelebration && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-[9999]">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl border border-amber-200 shadow-2xl p-6 max-w-md w-full text-center relative overflow-hidden select-none"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600" />
              
              <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 mx-auto mb-4 border border-amber-200">
                <Gift className="w-7 h-7 animate-bounce" />
              </div>

              <h3 className="text-base font-black text-slate-950 font-sans tracking-tight">
                🎓 {slides.length}-Slide Presentation Complete!
              </h3>
              
              <div className="mt-3.5 bg-amber-50/50 border border-amber-100 rounded-xl p-4 text-left space-y-2">
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  Now it is time for the live classroom demo! Click below to open the doubt solver and test live questions from your classmates.
                </p>
                <div className="flex flex-col border-t border-slate-200/60 pt-2.5 mt-1">
                  <span className="text-[10px] font-black uppercase text-amber-800 tracking-wider font-mono">
                    Accord School Motto:
                  </span>
                  <span className="text-sm font-extrabold text-slate-950 italic font-serif">
                    "Believe in Thyself"
                  </span>
                  <span className="text-[10.5px] text-slate-500 font-sans mt-0.5 font-medium">
                    Presented by Shanmuka · Class 6, Accord School, Tirupati
                  </span>
                </div>
              </div>

              <div className="mt-5 flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => {
                    playSynthesizedChime("click");
                    setShowTrickCelebration(false);
                  }}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold py-2.5 px-3.5 rounded-xl cursor-pointer transition-colors"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowTrickCelebration(false);
                    handleLaunchDemo();
                  }}
                  className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-black py-2.5 px-4 rounded-xl shadow-xs cursor-pointer transition-colors flex items-center gap-1.5"
                >
                  <Rocket className="w-3.5 h-3.5" />
                  <span>Start Live Demo</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FULLSCREEN PRESENTATION POPUP OVERLAY */}
      <AnimatePresence>
        {isFullscreen && (
          <div className="fixed inset-0 bg-slate-950 flex flex-col justify-between p-4 md:p-8 z-[9999] text-white select-none overflow-hidden font-sans">
            {/* Ambient Background Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-amber-500/8 blur-[120px] pointer-events-none" />

            {/* Top Navigation Bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-3 shrink-0 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <h3 className="text-xs md:text-sm font-black tracking-tight text-amber-400 uppercase flex items-center gap-2">
                    <span>CleardoubtAI Classroom Deck</span>
                    <span className="text-[9px] bg-amber-500/15 text-amber-300 font-mono px-2 py-0.5 rounded border border-amber-500/25 uppercase font-bold tracking-wider">
                      Accord School, Tirupati
                    </span>
                  </h3>
                  <p className="text-[10px] text-slate-400 font-mono font-medium">
                    Slide {slides[currentSlide].id} of {slides.length} ({slides[currentSlide].category}) · Use Arrow Keys (← / →) or Spacebar to navigate
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* AutoPlay Action */}
                <button
                  onClick={() => {
                    playSynthesizedChime("click");
                    setIsPlaying(!isPlaying);
                  }}
                  disabled={showTrick}
                  className="p-1.5 px-3 text-[10.5px] bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-1.5 font-bold text-slate-200 cursor-pointer disabled:opacity-40"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                      <span>Pause Auto</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 text-emerald-400" />
                      <span>AutoPlay</span>
                    </>
                  )}
                </button>

                {/* Close Overlay Mode */}
                <button
                  onClick={() => {
                    playSynthesizedChime("click");
                    setIsFullscreen(false);
                  }}
                  className="p-1.5 px-3.5 text-[11px] bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-all flex items-center gap-1.5 font-extrabold cursor-pointer shadow-md shadow-amber-900/30 active:scale-95"
                  title="Close Fullscreen"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                  <span>Exit Presenter</span>
                </button>
              </div>
            </div>

            {/* Immersive Center Stage: Beautiful Giant Slide Card */}
            <div className="flex-grow flex items-center justify-center p-2 md:p-6 overflow-hidden relative z-10">
              {(() => {
                const theme = getFullscreenSlideTheme(currentSlide);
                return (
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 0.96, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.96, x: -20 }}
                    transition={{ duration: 0.22 }}
                    className={`max-w-4xl w-full rounded-3xl border text-white bg-gradient-to-br ${theme.bg} p-6 md:p-10 shadow-2xl flex flex-col justify-between relative overflow-hidden text-left h-auto min-h-[420px] md:min-h-[460px] max-h-[75vh]`}
                  >
                    {/* Floating Large Background Watermark Icon */}
                    <div className={`absolute -right-16 -bottom-16 w-72 h-72 ${theme.iconColor} opacity-[0.04] pointer-events-none`}>
                      <ActiveIcon className="w-full h-full" />
                    </div>

                    <div className="flex-grow flex flex-col justify-between overflow-hidden">
                      {/* Slide Header: Icon & Titles */}
                      <div className="flex items-center gap-4 border-b border-white/10 pb-4 mb-4 shrink-0">
                        <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl ${theme.accentBg} border flex items-center justify-center shrink-0 shadow-lg`}>
                          <ActiveIcon className={`w-6 h-6 md:w-8 md:h-8 ${theme.iconColor}`} />
                        </div>
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-white/10 text-slate-300 font-bold">
                              {slides[currentSlide].category}
                            </span>
                          </div>
                          <h4 className="text-xl md:text-2xl lg:text-3xl font-black text-white leading-tight font-sans tracking-tight">
                            {slides[currentSlide].title}
                          </h4>
                          <p className={`text-xs md:text-sm font-extrabold tracking-tight ${theme.accent}`}>
                            {slides[currentSlide].subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Scrollable Body Content */}
                      <div className="flex-grow overflow-y-auto pr-1 md:pr-2 space-y-4 max-h-[220px] sm:max-h-[260px] md:max-h-[300px] scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                        <p className="text-slate-200 text-xs sm:text-sm md:text-base leading-relaxed font-sans font-medium whitespace-pre-line">
                          {slides[currentSlide].description}
                        </p>

                        {/* Bullet list styled beautifully */}
                        <ul className="space-y-2.5">
                          {slides[currentSlide].bulletPoints.map((bp, i) => (
                            <li key={i} className="text-xs md:text-sm text-slate-300 flex items-start gap-2.5 font-medium leading-relaxed">
                              <span className={`${theme.iconColor} mt-0.5 shrink-0 text-sm md:text-base font-sans`}>{theme.bulletIcon}</span>
                              <span>{bp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Footnote highlight / Live Demo Button on Slide 15 */}
                      {slides[currentSlide].isDemoSlide ? (
                        <div className="mt-5 pt-4 border-t border-amber-400/40 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
                          <div className="text-xs md:text-sm font-bold text-amber-300 italic flex items-center gap-2">
                            <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-amber-400 shrink-0" />
                            <span>{slides[currentSlide].highlight}</span>
                          </div>

                          <button
                            type="button"
                            onClick={handleLaunchDemo}
                            className="w-full sm:w-auto bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-600 hover:to-yellow-600 text-slate-950 text-xs md:text-sm font-black px-6 py-3 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 animate-bounce hover:shadow-amber-500/40"
                          >
                            <Rocket className="w-4 h-4 text-slate-950" />
                            <span>Launch Live Classroom Demo!</span>
                          </button>
                        </div>
                      ) : (
                        <div className="mt-5 pt-3.5 border-t border-white/10 font-bold text-xs md:text-sm text-slate-300 italic flex items-center gap-2 shrink-0">
                          <Sparkles className={`w-4 h-4 md:w-4.5 md:h-4.5 ${theme.iconColor} shrink-0`} />
                          <span>{slides[currentSlide].highlight}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })()}
            </div>

            {/* Slide Navigation Foot Controller */}
            <div className="border-t border-white/10 pt-4 flex items-center justify-between shrink-0 relative z-10">
              {/* Pagination indicators */}
              <div className="flex items-center gap-1.5 flex-wrap max-w-[65%]">
                {slides.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      playSynthesizedChime("click");
                      setCurrentSlide(idx);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${
                      currentSlide === idx ? "w-8 bg-amber-400" : "w-1.5 bg-white/20 hover:bg-white/40"
                    }`}
                    title={`Slide ${s.id}: ${s.title} (${s.category})`}
                  />
                ))}
              </div>

              {/* Action Navifiers */}
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="p-2 px-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-white transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold hover:border-white/20 active:scale-95"
                  title="Previous Slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Prev</span>
                </button>
                
                <button
                  type="button"
                  onClick={handleNext}
                  className="p-2 px-5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-lg hover:shadow-amber-500/20 active:scale-95"
                  title="Next Slide"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
