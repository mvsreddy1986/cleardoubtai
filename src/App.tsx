import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import founderImg from './assets/images/founder_shanmuka_portrait_1787484766498.jpg';
import { 
  Sparkles, 
  Send, 
  Trash2, 
  Copy, 
  Check, 
  BookOpen, 
  Clock, 
  Settings, 
  User, 
  Shield, 
  ShieldCheck,
  Volume2, 
  Maximize2, 
  Plus, 
  Camera, 
  FileText, 
  X, 
  Smile, 
  Zap, 
  RefreshCw, 
  ChevronRight, 
  Bell, 
  LogOut, 
  Sliders, 
  GraduationCap, 
  History, 
  Presentation, 
  Search, 
  Award, 
  TrendingUp, 
  Loader2, 
  AlertTriangle,
  Flame,
  HelpCircle,
  Compass,
  Lock,
  Printer,
  Mic,
  MicOff,
  Download,
  CheckCircle2,
  Paperclip,
  MessageSquare,
  Headphones,
  VolumeX,
  Volume1,
  Square,
  Play,
  Pause,
  Radio,
  ChevronDown
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { jsPDF } from "jspdf";

import { SUBJECTS, PRESET_DOUBTS } from "./presets";
import { SubjectOption, PresetDoubt, LearningMode, PastDoubt, ChatMessageItem, AppNotification, NotificationPreferences, StudentStats, CleardoubtModel } from "./types";
import ClearDoubtPresentation from "./components/ClearDoubtPresentation";

// Accord School branding - tree logo removed as requested by user
const AccordTreeLogo = () => null;

const DEFAULT_ANIMAL_AVATARS = [
  {
    id: "german_shepherd",
    name: "German Shepherd",
    url: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "golden_retriever",
    name: "Golden Retriever",
    url: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "cute_fox",
    name: "Cute Fox",
    url: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "fennec_fox",
    name: "Fennec Fox",
    url: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=200&h=200"
  }
];

const DEFAULT_STUDENT_AVATAR = "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=200&h=200";

export interface CleardoubtModelConfig {
  id: CleardoubtModel;
  name: string;
  shortName: string;
  version: string;
  badge: string;
  badgeColor: string;
  description: string;
  depthDetail: string;
  icon: typeof Zap;
  colorClass: string;
  activeBorderClass: string;
  activePillBg: string;
  activeCardBg: string;
  thinkingNotice?: string;
}

export type CleardotModelConfig = CleardoubtModelConfig;

export const CLEARDOUBT_MODELS: CleardoubtModelConfig[] = [
  {
    id: '2.0',
    name: 'ClearDoubtAI 2.0',
    shortName: '2.0 Normal',
    version: 'v2.0',
    badge: 'Normal Answers',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    description: 'Fast, clear, and direct standard student answers.',
    depthDetail: 'Instant answers · Everyday concepts & concise breakdowns',
    icon: Zap,
    colorClass: 'text-amber-600',
    activeBorderClass: 'border-amber-500 bg-amber-50/80 text-amber-950 shadow-xs',
    activePillBg: 'bg-amber-500 text-white',
    activeCardBg: 'bg-amber-50/70 border-amber-400 ring-2 ring-amber-400/20 text-amber-950',
  },
  {
    id: '3.0',
    name: 'ClearDoubtAI 3.0',
    shortName: '3.0 Deep',
    version: 'v3.0',
    badge: 'Deep Answers',
    badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
    description: 'Deep conceptual explanations & intuitive analogies.',
    depthDetail: 'Detailed breakdown · Step-by-step logic and real-world examples',
    icon: BookOpen,
    colorClass: 'text-blue-600',
    activeBorderClass: 'border-blue-500 bg-blue-50/80 text-blue-950 shadow-xs',
    activePillBg: 'bg-blue-600 text-white',
    activeCardBg: 'bg-blue-50/70 border-blue-400 ring-2 ring-blue-400/20 text-blue-950',
  },
  {
    id: '4.0',
    name: 'ClearDoubtAI 4.0',
    shortName: '4.0 Ultra Deep',
    version: 'v4.0',
    badge: 'More Deeper Answers',
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
    description: 'Masterclass academic depth, exhaustive theory & derivations.',
    depthDetail: 'Maximum depth · Exhaustive theory, proofs, and edge cases',
    icon: GraduationCap,
    colorClass: 'text-purple-600',
    activeBorderClass: 'border-purple-500 bg-purple-50/80 text-purple-950 shadow-xs',
    activePillBg: 'bg-purple-600 text-white',
    activeCardBg: 'bg-purple-50/70 border-purple-400 ring-2 ring-purple-400/20 text-purple-950',
  },
  {
    id: '5.0',
    name: 'ClearDoubtAI 5.0',
    shortName: '5.0 Thinking Engine',
    version: 'v5.0',
    badge: 'Deep Thinking (5-10s)',
    badgeColor: 'bg-emerald-100 text-emerald-950 border-emerald-300',
    description: 'Thinks deeply for 5-10 seconds before generating the solution.',
    depthDetail: '5-10s Thought Engine · Deep reasoning trace + masterclass solution',
    icon: Sparkles,
    colorClass: 'text-emerald-600',
    activeBorderClass: 'border-emerald-500 bg-emerald-50/80 text-emerald-950 shadow-xs',
    activePillBg: 'bg-emerald-600 text-white',
    activeCardBg: 'bg-emerald-50/70 border-emerald-400 ring-2 ring-emerald-400/20 text-emerald-950',
    thinkingNotice: 'Takes 5-10 seconds to think profoundly before replying',
  },
];

export const CLEARDOT_MODELS = CLEARDOUBT_MODELS;

interface AvatarSelectionProps {
  selectedAvatar: string;
  onSelectAvatar: (url: string) => void;
  triggerChime?: () => void;
}

function AvatarSelection({ selectedAvatar, onSelectAvatar, triggerChime }: AvatarSelectionProps) {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 300, height: 300, facingMode: "user" }
      });
      setMediaStream(stream);
      setIsCameraActive(true);
      
      // Delay slightly or use a ref hook to make sure video element exists before setting stream
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(e => console.error("Video play failed", e));
        }
      }, 100);
      
      if (triggerChime) triggerChime();
    } catch (err: any) {
      console.error("Camera access failed", err);
      setCameraError("Camera permission denied or camera device busy. Please grant permissions.");
    }
  };

  const stopCamera = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      setMediaStream(null);
    }
    setIsCameraActive(false);
  };

  useEffect(() => {
    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [mediaStream]);

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = 300;
      canvas.height = 300;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Mirror the canvas for standard user selfie
        ctx.translate(300, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(videoRef.current, 0, 0, 300, 300);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
        onSelectAvatar(dataUrl);
        stopCamera();
        if (triggerChime) triggerChime();
      }
    }
  };

  return (
    <div className="space-y-3 w-full bg-slate-50/70 p-3.5 rounded-2xl border border-slate-200">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest font-sans">
          Your Profile photo / Avatar
        </span>
        {isCameraActive && (
          <span className="text-[9px] text-red-600 bg-red-50 px-2 py-0.5 rounded-md font-mono animate-pulse flex items-center gap-1">
            <span className="w-1 h-1 bg-red-600 rounded-full" /> Camera active
          </span>
        )}
      </div>

      {isCameraActive ? (
        <div className="flex flex-col items-center gap-3 bg-slate-900 p-4 rounded-xl relative overflow-hidden">
          <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-slate-700 bg-slate-950 shadow-inner">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted 
              className="w-full h-full object-cover transform -scale-x-100"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={capturePhoto}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-extrabold uppercase px-4 py-2 rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <Camera className="w-4 h-4 text-white" />
              <span>Capture Selfie</span>
            </button>
            <button
              type="button"
              onClick={stopCamera}
              className="bg-slate-700 hover:bg-slate-600 text-white text-[11px] font-bold px-3 py-2 rounded-xl transition-all cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <input
            type="file"
            id="avatar-file-input"
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onloadend = () => {
                  const resultBase64 = reader.result as string;
                  onSelectAvatar(resultBase64);
                  if (triggerChime) triggerChime();
                };
                reader.readAsDataURL(file);
              }
            }}
          />

          <div className="relative group shrink-0">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xs">
              <img 
                src={selectedAvatar} 
                alt="Selected Student Avatar" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <button
              type="button"
              onClick={startCamera}
              className="absolute -bottom-1.5 -right-1.5 bg-blue-600 hover:bg-blue-700 text-white p-1 rounded-full shadow-md border border-white transition-all hover:scale-110 cursor-pointer"
              title="Activate Selfie Camera Mode"
            >
              <Camera className="w-3 h-3" />
            </button>

            <label
              htmlFor="avatar-file-input"
              className="absolute -bottom-1.5 -left-1.5 bg-emerald-600 hover:bg-emerald-700 text-white p-1 rounded-full shadow-md border border-white transition-all hover:scale-110 cursor-pointer"
              title="Upload Photo from File Manager"
            >
              <FileText className="w-3 h-3" />
            </label>
          </div>

          <div className="flex-grow text-left">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <p className="text-[10px] text-slate-500 font-medium font-sans leading-relaxed">
                Choose a real default animal avatar or use your camera/file manager:
              </p>
              {selectedAvatar !== DEFAULT_STUDENT_AVATAR && (
                <button
                  type="button"
                  onClick={() => {
                    onSelectAvatar(DEFAULT_STUDENT_AVATAR);
                    localStorage.removeItem("student_avatar");
                    if (triggerChime) triggerChime();
                  }}
                  className="text-[9px] text-slate-400 hover:text-red-600 font-bold underline shrink-0 cursor-pointer"
                  title="Reset to default avatar"
                >
                  Reset Photo
                </button>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2">
              {DEFAULT_ANIMAL_AVATARS.map((animal) => {
                const isSelected = selectedAvatar === animal.url;
                return (
                  <button
                    key={animal.id}
                    type="button"
                    onClick={() => {
                      onSelectAvatar(animal.url);
                      if (triggerChime) triggerChime();
                    }}
                    className={`relative p-0.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected 
                        ? "border-blue-600 ring-2 ring-blue-500/10 scale-102" 
                        : "border-slate-200 hover:border-slate-300 hover:scale-102"
                    }`}
                    title={animal.name}
                  >
                    <img 
                      src={animal.url} 
                      alt={animal.name} 
                      className="w-8 h-8 rounded-lg object-cover"
                      referrerPolicy="no-referrer"
                    />
                    {isSelected && (
                      <span className="absolute -top-1 -right-1 bg-blue-600 text-white rounded-full p-0.5 shadow-xs">
                        <Check className="w-1.5 h-1.5 text-white font-extrabold" />
                      </span>
                    )}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={startCamera}
                className="w-9 h-9 rounded-xl border border-dashed border-slate-300 hover:border-blue-500 flex flex-col items-center justify-center text-slate-500 hover:text-blue-600 transition-all cursor-pointer bg-white"
                title="Open Camera Session"
              >
                <Camera className="w-3.5 h-3.5" />
                <span className="text-[7.5px] font-black uppercase mt-0.5">Cam</span>
              </button>

              <label
                htmlFor="avatar-file-input"
                className="w-9 h-9 rounded-xl border border-dashed border-slate-300 hover:border-emerald-500 flex flex-col items-center justify-center text-slate-500 hover:text-emerald-600 transition-all cursor-pointer bg-white"
                title="Upload Custom Image File"
              >
                <FileText className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-[7.5px] font-black uppercase mt-0.5">File</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {cameraError && (
        <p className="text-[10px] text-red-600 font-medium font-sans bg-red-50 p-2 rounded-lg border border-red-100 flex items-center gap-1">
          <AlertTriangle className="w-3 h-3 text-red-600 shrink-0" />
          {cameraError}
        </p>
      )}
    </div>
  );
}

// Helper component to render markdown text and extract any embedded SVGs to render them natively
function MarkdownContentWithSvg({ content }: { content: string }) {
  if (!content) return null;

  // 1. Clean up triple-backtick fences enclosing SVG code blocks
  let cleaned = content.replace(/```(?:xml|html|svg|markdown)?\s*(<svg[\s\S]*?<\/svg>)\s*```/gi, '$1');

  // 2. Scan and split by SVG tag blocks
  const parts = [];
  let lastIndex = 0;
  const svgRegex = /(<svg[\s\S]*?<\/svg>)/gi;
  let match;

  while ((match = svgRegex.exec(cleaned)) !== null) {
    const index = match.index;
    if (index > lastIndex) {
      parts.push({
        type: "markdown" as const,
        content: cleaned.substring(lastIndex, index)
      });
    }
    parts.push({
      type: "svg" as const,
      content: match[0]
    });
    lastIndex = svgRegex.lastIndex;
  }

  if (lastIndex < cleaned.length) {
    parts.push({
      type: "markdown" as const,
      content: cleaned.substring(lastIndex)
    });
  }

  // If there are no SVGs, just render normally
  if (parts.length === 0) {
    return (
      <div className="markdown-body text-slate-800 leading-relaxed text-sm select-text">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {parts.map((part, idx) => {
        if (part.type === "svg") {
          return (
            <div 
              key={`svg-${idx}`}
              className="w-full my-4 overflow-x-auto bg-slate-50/50 p-4 border border-slate-200/60 rounded-2xl flex justify-center items-center shadow-xs select-none"
              dangerouslySetInnerHTML={{ __html: part.content }}
            />
          );
        } else {
          if (!part.content.trim()) return null;
          return (
            <div key={`md-${idx}`} className="markdown-body text-slate-800 leading-relaxed text-sm select-text">
              <ReactMarkdown>{part.content}</ReactMarkdown>
            </div>
          );
        }
      })}
    </div>
  );
}

// Helper to extract clean plain text suitable for natural speech synthesis
function cleanTextForSpeech(markdown: string): string {
  if (!markdown) return "";
  let text = markdown;
  // Remove XML / SVG blocks
  text = text.replace(/```(?:xml|html|svg|markdown)?[\s\S]*?```/gi, "");
  text = text.replace(/<svg[\s\S]*?<\/svg>/gi, "");
  text = text.replace(/<[^>]+>/g, "");
  // Remove markdown code blocks
  text = text.replace(/`([^`]+)`/g, "$1");
  // Remove images and links
  text = text.replace(/!\[.*?\]\(.*?\)/g, "");
  text = text.replace(/\[(.*?)\]\(.*?\)/g, "$1");
  // Remove markdown headers
  text = text.replace(/^#{1,6}\s+/gm, "");
  // Remove bold / italics
  text = text.replace(/(\*\*|__)(.*?)\1/g, "$2");
  text = text.replace(/(\*|_)(.*?)\1/g, "$2");
  // Remove bullet points / list numbers
  text = text.replace(/^\s*[-*+]\s+/gm, "");
  text = text.replace(/^\s*\d+\.\s+/gm, "");
  // Remove blockquotes
  text = text.replace(/^\s*>\s+/gm, "");
  // Remove math syntax
  text = text.replace(/\$\$[\s\S]*?\$\$/g, "");
  text = text.replace(/\$([^$]+)\$/g, "$1");
  // Remove gamified run prompts if any
  text = text.replace(/Runs are very late!/gi, "");
  text = text.replace(/Will you play a game\?/gi, "");
  // Clean double newlines and spaces
  text = text.replace(/\n+/g, ". ").replace(/\s{2,}/g, " ").trim();
  return text;
}

// Helper to extract just the direct, succinct bottom-line answer for quick reading when student doesn't want to study the full breakdown
function extractDirectAnswer(markdown: string): string {
  if (!markdown) return "";
  const cleaned = cleanTextForSpeech(markdown);
  // Split into sentences
  const sentences = cleaned.split(/(?<=[.?!])\s+/).filter(s => s.trim().length > 3);
  if (sentences.length <= 2) return cleaned;
  
  // Look for direct answer patterns or take first 2 most essential sentences
  const answerKeywords = ["the answer is", "in short", "simply put", "conclusion", "to summarize", "yes,", "no,", "therefore", "is because", "means that"];
  const matched = sentences.find(s => answerKeywords.some(k => s.toLowerCase().includes(k)));
  if (matched) {
    const idx = sentences.indexOf(matched);
    return sentences.slice(idx, Math.min(sentences.length, idx + 2)).join(" ");
  }
  // Return the first 2 sentences as the direct answer
  return sentences.slice(0, 2).join(" ");
}

export default function App() {
  const [isBlockedForever, setIsBlockedForever] = useState<boolean>(() => {
    const stored = localStorage.getItem("student_is_blocked_forever") === "true";
    const storedEmail = localStorage.getItem("student_email") || "";
    if (storedEmail.toLowerCase().includes("mvsreddy") || storedEmail.toLowerCase().includes("sap") || storedEmail.toLowerCase().includes("test")) {
      localStorage.removeItem("student_is_blocked_forever");
      return false;
    }
    return stored;
  });
  
  // Emergency unban form states
  const [emergencyEmail, setEmergencyEmail] = useState<string>("");
  const [emergencyPhone, setEmergencyPhone] = useState<string>("");
  const [emergencyStatus, setEmergencyStatus] = useState<string>("");

  // Subscription & ₹1 for 2 years transaction states
  const [isSubscribedVip, setIsSubscribedVip] = useState<boolean>(() => {
    const stored = localStorage.getItem("is_subscribed_vip");
    return stored === null ? true : stored === "true";
  });
  const [subscriptionDate, setSubscriptionDate] = useState<string>(() => localStorage.getItem("subscription_date") || new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }));
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
  const [creditingAccount, setCreditingAccount] = useState<string>(() => localStorage.getItem("crediting_account") || "swathi.her@okkicici.com");
  const [transactionRef, setTransactionRef] = useState<string>(() => localStorage.getItem("transaction_ref") || "");
  const [paymentMethod, setPaymentMethod] = useState<string>("upi");
  const [payError, setPayError] = useState<string>("");

  // Real-time Payment & Subscription Authorization States (for swathi.her@okkicici.com & 8691940838)
  const [isAuthDecisionModalOpen, setIsAuthDecisionModalOpen] = useState<boolean>(false);
  const [authCountdown, setAuthCountdown] = useState<number>(10);
  const [authDecisionState, setAuthDecisionState] = useState<'prompting' | 'approved' | 'auto_approved' | 'declined'>('prompting');
  const [authMessageText, setAuthMessageText] = useState<string>("Should I give this subscription to this guy?");
  const authTimerRef = useRef<any>(null);

  // Authentication & session variables (localStorage sync)
  const [email, setEmail] = useState<string>(() => localStorage.getItem("student_email") || "");
  const [phone, setPhone] = useState<string>(() => localStorage.getItem("student_phone") || "");
  const [name, setName] = useState<string>(() => localStorage.getItem("student_name") || "");
  const [avatar, setAvatar] = useState<string>(() => localStorage.getItem("student_avatar") || DEFAULT_STUDENT_AVATAR);
  const [motherLanguage, setMotherLanguage] = useState<string>(() => localStorage.getItem("student_lang") || "English");
  const [voiceSynced, setVoiceSynced] = useState<boolean>(() => localStorage.getItem("student_voice") === "true");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const stored = localStorage.getItem("student_is_logged");
    return stored === "true";
  });
  
  const [studentClass, setStudentClass] = useState<string>(() => localStorage.getItem("student_class") || "Primary School (Class 1-5)");
  
  // Local active values
  const [tempEmail, setTempEmail] = useState(email);
  const [tempPhone, setTempPhone] = useState(phone);
  const [tempName, setTempName] = useState(name);
  const [tempLang, setTempLang] = useState(motherLanguage);
  const [tempClass, setTempClass] = useState(studentClass);
  
  // Custom states
  const [isAttachmentMenuOpen, setIsAttachmentMenuOpen] = useState<boolean>(false);
  const [isAppCameraOpen, setIsAppCameraOpen] = useState<boolean>(false);
  const [appCameraMode, setAppCameraMode] = useState<"environment" | "user">("environment");
  const [appStream, setAppStream] = useState<MediaStream | null>(null);
  const [cameraHasError, setCameraHasError] = useState<boolean>(false);
  const appVideoRef = useRef<HTMLVideoElement | null>(null);

  const startAppCamera = async (mode: "environment" | "user") => {
    setCameraHasError(false);
    try {
      if (appStream) {
        appStream.getTracks().forEach(t => t.stop());
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: mode, width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      setAppStream(stream);
      if (appVideoRef.current) {
        appVideoRef.current.srcObject = stream;
        appVideoRef.current.play().catch(e => console.error("Video play failed:", e));
      }
    } catch (err: any) {
      console.error("Camera access failed", err);
      // Fallback
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setAppStream(stream);
        if (appVideoRef.current) {
          appVideoRef.current.srcObject = stream;
          appVideoRef.current.play().catch(e => console.error("Video play failed:", e));
        }
      } catch (e2) {
        setCameraHasError(true);
      }
    }
  };

  const stopAppCamera = () => {
    if (appStream) {
      appStream.getTracks().forEach(t => t.stop());
      setAppStream(null);
    }
    setCameraHasError(false);
    setIsAppCameraOpen(false);
  };

  const captureAppPhoto = () => {
    if (appVideoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = appVideoRef.current.videoWidth || 640;
      canvas.height = appVideoRef.current.videoHeight || 480;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Flip horizontally if using user (front) camera for natural view, otherwise draw normal
        if (appCameraMode === "user") {
          ctx.translate(canvas.width, 0);
          ctx.scale(-1, 1);
        }
        ctx.drawImage(appVideoRef.current, 0, 0, canvas.width, canvas.height);
        
        // Reset transform if set
        if (appCameraMode === "user") {
          ctx.setTransform(1, 0, 0, 1, 0, 0);
        }
        
        const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
        setAttachments(prev => [
          ...prev,
          {
            name: `cam_capture_${Date.now()}.jpg`,
            mimeType: "image/jpeg",
            data: dataUrl
          }
        ]);
        triggerAudioChime();
      }
    }
    stopAppCamera();
  };

  useEffect(() => {
    if (isAppCameraOpen) {
      startAppCamera(appCameraMode);
    } else {
      if (appStream) {
        appStream.getTracks().forEach(t => t.stop());
        setAppStream(null);
      }
    }
    return () => {
      if (appStream) {
        appStream.getTracks().forEach(t => t.stop());
      }
    };
  }, [isAppCameraOpen, appCameraMode]);
  
  // App primary tabs: 'ask' | 'vault' | 'presentation' | 'admin'
  const [activeTab, setActiveTab] = useState<'ask' | 'vault' | 'presentation' | 'admin'>('ask');
  
  // Space optimization states for collapsing massive headers and grids
  const [isSettingsExpanded, setIsSettingsExpanded] = useState<boolean>(false);
  const [isSchoolInfoExpanded, setIsSchoolInfoExpanded] = useState<boolean>(false);

  const [wrongAdminAttempts, setWrongAdminAttempts] = useState<number>(() => {
    const stored = localStorage.getItem("wrong_admin_attempts_shanmukasahith");
    return stored ? parseInt(stored, 10) : 0;
  });
  
  // Real-time server audit stats
  const [stats, setStats] = useState<StudentStats>({
    totalStudents: 3,
    totalDoubts: 12,
    activeOnline: 5
  });

  // Main active query parameters
  const [message, setMessage] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("physics");
  const [selectedMode, setSelectedMode] = useState<LearningMode>("normal");
  const [selectedAiModel, setSelectedAiModel] = useState<CleardoubtModel>(() => {
    try {
      const saved = localStorage.getItem("cleardoubt_selected_model");
      if (saved === '2.0' || saved === '3.0' || saved === '4.0' || saved === '5.0') return saved as CleardoubtModel;
    } catch {}
    return '2.0';
  });
  const [isInputModelMenuOpen, setIsInputModelMenuOpen] = useState<boolean>(false);
  const [thinkingStage, setThinkingStage] = useState<string>("");
  const [attachments, setAttachments] = useState<Array<{ name: string; mimeType: string; data: string }>>([]);
  const [isQuerying, setIsQuerying] = useState<boolean>(false);
  const [queryError, setQueryError] = useState<string | null>(null);
  const [currentResponse, setCurrentResponse] = useState<string | null>(null);

  // Read-Aloud & Voice Dictation States (For students who don't want to study and just want the answer dictated)
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [speakingDirectOnly, setSpeakingDirectOnly] = useState<boolean>(false);
  const [speechSpeed, setSpeechSpeed] = useState<number>(() => {
    try {
      const stored = localStorage.getItem("cleardoubt_speech_speed");
      return stored ? parseFloat(stored) : 1.0;
    } catch {
      return 1.0;
    }
  });
  const [speechVoiceGender, setSpeechVoiceGender] = useState<"girl" | "boy">(() => {
    try {
      const stored = localStorage.getItem("cleardoubt_speech_gender");
      return stored === "boy" ? "boy" : "girl";
    } catch {
      return "girl";
    }
  });

  // Continuous Conversation Chat Thread Persistence
  const [chatMessages, setChatMessages] = useState<ChatMessageItem[]>(() => {
    try {
      const stored = localStorage.getItem("cleardoubt_chat_messages");
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {}
    return [];
  });

  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem("cleardoubt_chat_messages", JSON.stringify(chatMessages));
    } catch {}
  }, [chatMessages]);

  // Saved Vault persistence
  const [vault, setVault] = useState<PastDoubt[]>(() => {
    try {
      const stored = localStorage.getItem("cleardoubt_vault");
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // fallback
    }
    return [
      {
        id: "p1",
        query: "Is mitochondria really the powerhouse of the cell? How does it actually synthesize ATP?",
        answer: "Yes, mitochondria is indeed termed the **powerhouse of the cell** because it generates most of the cell's supply of adenosine triphosphate (ATP), used as a source of chemical energy.\n\n### How ATP is Synthesized:\n1. **Glycolysis & Krebs Cycle**: Nutrients are broken down to produce electron carriers like NADH and FADH₂.\n2. **Electron Transport Chain (ETC)**: Electrons from NADH/FADH₂ pass through protein complexes in the inner mitochondrial membrane. This movement pumps protons into the intermembrane space, creating a steep chemical gradient.\n3. **ATP Synthase Turbines**: Protons flow back into the matrix through a special protein channel called **ATP Synthase**. This proton flow spins the molecular structure, physically binding Phosphate to ADP, producing **ATP** like a miniature hydroelectric dam!",
        subject: "biology",
        mode: "normal",
        timestamp: "10:30 AM"
      },
      {
        id: "p2",
        query: "Can you explain quantum superposition with an easy analogy?",
        answer: "Quantum superposition is the fundamental principle of quantum mechanics where a physical system exists in multiple states or configurations simultaneously until it is measured.\n\n### The Spinning Coin Analogy:\n- **Classical Bit**: A coin lying flat on a table. It can only be either **Heads (1)** or **Tails (0)**.\n- **Quantum Qubit**: A coin spinning rapidly on the table. While it is spinning, is it Heads or Tails? It is a **superposition of both** simultaneously! Only when you slap your hand down (performing a *measurement*) does it collapse into a single definite state (Heads or Tails).\n\nIn modern quantum computers, qubits exploit this spinning state to process complex calculations exponentially faster than classical transistors.",
        subject: "physics",
        mode: "deep",
        timestamp: "11:15 AM"
      },
      {
        id: "p3",
        query: "Why does ice float on water when most solids sink?",
        answer: "For almost all other substances, the solid phase is denser than the liquid phase because molecules pack closely together when cooled. Water is a beautiful anomaly!\n\n### The Hydrogen Bonding Lattice:\n- In liquid water, molecules are highly thermal and slide past each other, forming transient, compact bonds.\n- When cooled below 4°C, thermal energy drops. The water molecules form an elegant **hexagonal crystalline lattice** held by stable, rigid electrostatic hydrogen bonds.\n- This geometric lattice keeps water molecules *farther apart* than they were in liquid form, increasing the volume and making ice **9% less dense** than liquid water!\n\nThis unique property prevents oceans and lakes from freezing solid from the bottom up, preserving all marine life during harsh winters.",
        subject: "chemistry",
        mode: "mentor",
        timestamp: "12:05 PM"
      }
    ];
  });
  const [vaultSearch, setVaultSearch] = useState<string>("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Custom visual confirm modal state (replaces native window.confirm & alert inside browser iframes)
  const [appModal, setAppModal] = useState<{
    isOpen: boolean;
    type: "alert" | "confirm";
    title: string;
    message: string;
    onConfirm?: () => void;
  }>({
    isOpen: false,
    type: "alert",
    title: "",
    message: ""
  });

  const triggerAppConfirm = (title: string, message: string, onConfirm: () => void) => {
    setAppModal({
      isOpen: true,
      type: "confirm",
      title,
      message,
      onConfirm
    });
    triggerAudioChime();
  };

  const triggerAppAlert = (title: string, message: string) => {
    setAppModal({
      isOpen: true,
      type: "alert",
      title,
      message
    });
    triggerAudioChime();
  };

  // Presenter Monitor / Administrator states
  const [adminEmail, setAdminEmail] = useState<string>("");
  const [adminData, setAdminData] = useState<{ 
    users: any[]; 
    searches: any[]; 
    usersCount: number; 
    searchesCount: number; 
    blockedEmails?: string[];
    blockedPhones?: string[];
    securityViolations?: any[];
  } | null>(null);
  const [isLoadingAdmin, setIsLoadingAdmin] = useState<boolean>(false);
  const [adminError, setAdminError] = useState<string | null>(null);
  const [adminSuccessMessage, setAdminSuccessMessage] = useState<string | null>(null);

  const isUserAdmin = (userEmail: string) => {
    const normalized = userEmail.trim().toLowerCase();
    return normalized === "shannu@123";
  };

  const canSeeAdminTab = (userEmail: string) => {
    const normalized = userEmail.trim().toLowerCase();
    return normalized === "shannu@123" || normalized.includes("shanmukasahith.pgdm");
  };

  const handleSecurityViolation = async (attemptedCode: string) => {
    const hasAdminBypass = localStorage.getItem("admin_testing_bypass") === "true" ||
      (email || tempEmail || "").toLowerCase().includes("mvsreddy") ||
      (email || tempEmail || "").toLowerCase().includes("sap") ||
      (email || tempEmail || "").toLowerCase().includes("test");

    if (hasAdminBypass) {
      console.log("System administrative bypass active. Security block cancelled.");
      return;
    }

    localStorage.setItem("student_is_blocked_forever", "true");
    setIsBlockedForever(true);

    // Call server to persist the permanent block on this specific email/phone account
    try {
      await fetch("/api/admin/security-block", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email || tempEmail || "anonymous",
          phone: phone || tempPhone || "unknown",
          name: name || tempName || "Anonymous Intruder",
          attemptedCode: attemptedCode
        })
      });
    } catch (e) {
      console.error("Failed to sync security block state to the server:", e);
    }
  };

  // Speech-to-Text State and Voice dictaphone handlers
  const [isRecordingMic, setIsRecordingMic] = useState<boolean>(false);
  const recognitionRef = useRef<any>(null);

  // Reference to the main query input textarea
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Helper helper to focus and scroll smoothly to the search input bar
  const focusAndScrollToSearchInput = () => {
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 120);
  };

  // Helper to trigger clean, distraction-free document printing of solved answer
  const handlePrintAnswer = (queryText: string, answerText: string) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      window.print();
      return;
    }
    
    // Create a beautiful, printable document layout
    printWindow.document.write(`
      <html>
        <head>
          <title>CleardoubtAI - Printed Solved Answer</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
              line-height: 1.6;
              color: #0f172a;
              max-width: 800px;
              margin: 40px auto;
              padding: 20px;
              background-color: #ffffff;
            }
            .header-banner {
              border-bottom: 3px solid #c25e17;
              padding-bottom: 16px;
              margin-bottom: 24px;
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
            .title {
              font-size: 22px;
              font-weight: 800;
              color: #c25e17;
              margin: 0;
              letter-spacing: -0.02em;
            }
            .subtitle {
              font-size: 11px;
              color: #64748b;
              text-transform: uppercase;
              font-weight: 700;
              margin-top: 2px;
              font-family: monospace;
            }
            .meta {
              font-size: 11px;
              color: #94a3b8;
              text-align: right;
            }
            .question-container {
              background-color: #fffaf0;
              border: 1px solid #ffedd5;
              border-left: 5px solid #c25e17;
              padding: 16px;
              border-radius: 12px;
              margin-bottom: 28px;
            }
            .question-header {
              font-size: 10px;
              font-weight: 900;
              text-transform: uppercase;
              color: #ea580c;
              margin-bottom: 6px;
              letter-spacing: 0.05em;
              font-family: monospace;
            }
            .question-body {
              font-weight: 700;
              font-size: 15px;
              color: #1e293b;
              line-height: 1.5;
            }
            .answer-container {
              font-size: 14px;
              color: #334155;
            }
            .meta-stamp {
              background-color: #f8fafc;
              border: 1px solid #e2e8f0;
              padding: 8px 12px;
              border-radius: 8px;
              font-family: monospace;
              font-size: 11px;
              color: #64748b;
              margin-top: 24px;
              display: inline-block;
            }
            .footer-line {
              margin-top: 50px;
              border-top: 1px solid #e2e8f0;
              padding-top: 16px;
              font-size: 11px;
              color: #94a3b8;
              text-align: center;
            }
            p {
              margin-top: 0;
              margin-bottom: 12px;
            }
            h1, h2, h3, h4 {
              color: #0f172a;
              margin-top: 20px;
              margin-bottom: 8px;
              font-weight: 750;
            }
            h1 { font-size: 18px; color: #7c2d12; border-bottom: 1px solid #fed7aa; padding-bottom: 4px; }
            h2 { font-size: 16px; color: #c25e17; }
            h3 { font-size: 14px; color: #ea580c; }
            ul, ol {
              padding-left: 20px;
              margin-top: 0;
              margin-bottom: 12px;
            }
            li {
              margin-bottom: 4px;
            }
            code {
              font-family: monospace;
              background-color: #f1f5f9;
              padding: 2px 5px;
              border-radius: 4px;
              font-size: 90%;
            }
            pre {
              font-family: monospace;
              background-color: #0f172a;
              color: #e2e8f0;
              padding: 12px;
              border-radius: 8px;
              overflow-x: auto;
              font-size: 13px;
              line-height: 1.5;
              margin-top: 12px;
              margin-bottom: 12px;
            }
            pre code {
              background-color: transparent;
              color: inherit;
              padding: 0;
              font-size: inherit;
            }
          </style>
        </head>
        <body>
          <div class="header-banner">
            <div>
              <h1 class="title" style="border:0; padding:0; margin:0;">CleardoubtAI Secure Solved Doubt</h1>
              <div class="subtitle">Personalized Analogy Study Sheet</div>
            </div>
            <div class="meta">
              Date: ${new Date().toLocaleDateString()}<br>
              Time: ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
          
          <div class="question-container">
            <div class="question-header">Student Doubt Asked</div>
            <div class="question-body">"${queryText}"</div>
          </div>
          
          <div class="answer-container">
            ${answerText
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/`([^`]+)`/g, "<code>$1</code>")
              .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
              .replace(/\*([^*]+)\*/g, "<em>$1</em>")
              .replace(/\n\s*-\s*([^\n]+)/g, "<li>$1</li>")
              .replace(/(<li>.*<\/li>)/gs, "<ul>$1</ul>")
              .replace(/\n/g, "<br>")}
          </div>
          
          <div class="footer-line">
            Formulated via CleardoubtAI - Secure Learning Channel · Private & Self-destructing Sessions.
          </div>
          
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 800);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  // Helper to export all saved doubts into a beautiful local PDF document
  const handleExportPDF = () => {
    if (!vault || vault.length === 0) return;
    
    // Create new PDF document
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });

    let pageNum = 1;

    // Standard header and footer draw helper
    const drawPageBands = (p: number) => {
      // Header fill accent band
      doc.setFillColor(248, 250, 252); // soft off-white/slate
      doc.rect(0, 0, 210, 16, "F");
      
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(71, 85, 105);
      doc.text("CLEARDOUBTAI STUDY COMPANION - OFFLINE ACADEMIC VAULT", 15, 10);
      
      doc.setFont("Helvetica", "normal");
      doc.setTextColor(148, 163, 184);
      doc.text(`Page ${p}`, 195, 10, { align: "right" });

      // Footer divider line
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.2);
      doc.line(15, 280, 195, 280);
      
      doc.setFontSize(7);
      doc.setTextColor(148, 163, 184);
      doc.text("ClearDoubtAI - Verified Personalized Analogy & Explanation Logs. Keep for your studies.", 15, 285);
      doc.text("Secure Offline PDF Dispatch", 195, 285, { align: "right" });
    };

    // Draw initial page bands
    drawPageBands(pageNum);

    let y = 28;

    // Document Main Title
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(15, 23, 42); // deep slate/black
    doc.text("Academic Study Guide & Saved Vault", 15, y);
    y += 7;

    // Metadata lines
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(100, 116, 139);
    const dateStr = new Date().toLocaleString();
    doc.text(`Exported on: ${dateStr}`, 15, y);
    y += 4.5;

    if (name || email) {
      doc.text(`Student Account: ${name || "Anonymous User"} (${email || "no-associated-email"})`, 15, y);
      y += 5;
    }

    // Horizontal separator
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.4);
    doc.line(15, y, 195, y);
    y += 10;

    // Helper to request space safely with automated new page generation
    const requireYSpace = (needed: number) => {
      if (y + needed > 268) {
        doc.addPage();
        pageNum += 1;
        drawPageBands(pageNum);
        y = 25; // resetting top margin on a clean page
      }
    };

    // Loop through all elements in the Saved Vault
    vault.forEach((item, index) => {
      // 1. Draw Doubt Card title-header bar
      requireYSpace(25);

      // Card boundary box header
      doc.setFillColor(243, 244, 246); // clear neutral slate header block
      doc.rect(15, y, 180, 9, "F");

      doc.setFont("Helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(49, 46, 129); // dark royal violet text
      doc.text(`${index + 1}. SUBJECT CORE: ${item.subject.toUpperCase()}`, 18, y + 6);

      doc.setFont("Helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(100, 116, 139);
      doc.text(`Mode: ${item.mode}  |  Logged: ${item.timestamp}`, 192, y + 6, { align: "right" });
      
      y += 14;

      // 2. Draw Doubt query
      requireYSpace(15);
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setTextColor(15, 23, 42);
      doc.text("❓ Student's Stated Doubt:", 15, y);
      y += 4.5;

      doc.setFont("Helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(51, 65, 85);

      const queryLines = doc.splitTextToSize(`"${item.query}"`, 175);
      queryLines.forEach((line: string) => {
        requireYSpace(6);
        doc.text(line, 15, y);
        y += 4.5;
      });

      y += 4;

      // 3. Draw CleardoubtAI explanation
      requireYSpace(15);
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setTextColor(15, 23, 42);
      doc.text("💡 AI Explanation & Conceptual Analogy:", 15, y);
      y += 4.5;

      doc.setFont("Helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(30, 41, 59);

      // Flatten markdown-like styling patterns cleanly for standard PDF readers
      const plainAnswer = item.answer || "";
      const cleanedSections = plainAnswer.split("\n").map(rawLine => {
        let cl = rawLine.replace(/\*\*(.*?)\*\*/g, "$1");
        cl = cl.replace(/\*(.*?)\*/g, "$1");
        cl = cl.replace(/__(.*?)__/g, "$1");
        cl = cl.replace(/_(.*?)_/g, "$1");
        cl = cl.replace(/`(.*?)`/g, "$1");

        if (cl.startsWith("### ")) {
          return cl.replace("### ", "• ");
        } else if (cl.startsWith("## ")) {
          return cl.replace("## ", "• ");
        } else if (cl.startsWith("# ")) {
          return cl.replace("# ", "• ");
        }
        return cl;
      });

      cleanedSections.forEach(sectionLine => {
        if (!sectionLine.trim()) {
          y += 2.5; // empty gap line
          return;
        }

        const answerLines = doc.splitTextToSize(sectionLine, 175);
        answerLines.forEach((line: string) => {
          requireYSpace(5);
          doc.text(line, 15, y);
          y += 4.2;
        });
      });

      y += 6; // end-of-card padding

      // 4. Subtle separator line if there are more doubts remaining
      if (index < vault.length - 1) {
        requireYSpace(6);
        doc.setDrawColor(226, 232, 240);
        doc.setLineWidth(0.25);
        doc.line(15, y, 195, y);
        y += 7;
      }
    });

    // Save output securely to user system downloads
    doc.save("CleardoubtAI_Private_Academic_Vault.pdf");
  };

  // Client notifications system states
  const [notifications, setNotifications] = useState<AppNotification[]>([
    {
      id: "n1",
      type: "announcement",
      title: "🚀 Welcome to CleardoubtAI!",
      message: "Hey! Shanmuka created this space just for you. No pressure, no grading. Let's make learning fun with custom modes and SVG vector illustrations!",
      timestamp: "Just now",
      isRead: false
    },
    {
      id: "n2",
      type: "message",
      title: "💡 Pro Tip: Lazy Mode Activation",
      message: "Feeling fully tired or low energy? Select the 'Anti-Procrastination Lazy' mode for a quick motivational boost and an easily simplified sleepy brief summary!",
      timestamp: "5m ago",
      isRead: false
    }
  ]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [isPrefsOpen, setIsPrefsOpen] = useState<boolean>(false);
  const [notificationPreferences, setNotificationPreferences] = useState<NotificationPreferences>({
    allowMessages: true,
    allowFriendRequests: true,
    allowAnnouncements: true,
    soundAlert: true,
    toastInApp: true
  });

  // Client feedback chimes Sound alert player wrapper
  const triggerAudioChime = () => {
    if (!notificationPreferences.soundAlert) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5 note: clean school chime
      gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.45);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.5);
    } catch (e) {
      console.warn("Browser audio context blocked or unsupported:", e);
    }
  };

  // AI Voice Synthesis Handlers

  // Web Speech recognition controls
  const startMicDoubt = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not natively supported in your current browser session. We recommend testing in Google Chrome or Microsoft Edge!");
      return;
    }

    try {
      if (!recognitionRef.current) {
        const rec = new SpeechRecognition();
        rec.continuous = true;
        rec.interimResults = true;
        rec.lang = "en-US";

        rec.onstart = () => {
          setIsRecordingMic(true);
          triggerAudioChime();
        };

        rec.onresult = (event: any) => {
          let interimTranscript = "";
          let finalTranscript = "";

          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
            } else {
              interimTranscript += event.results[i][0].transcript;
            }
          }

          if (finalTranscript) {
            setMessage(prev => (prev ? prev.trim() + " " + finalTranscript : finalTranscript));
          }
        };

        rec.onerror = (event: any) => {
          console.warn("Speech recognition error hook:", event.error);
          setIsRecordingMic(false);
        };

        rec.onend = () => {
          setIsRecordingMic(false);
        };

        recognitionRef.current = rec;
      }

      recognitionRef.current.start();
    } catch (e) {
      console.warn("Speech recognition initialization caught error:", e);
    }
  };

  const stopMicDoubt = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        console.warn("Speech recognition stop error:", e);
      }
    }
    setIsRecordingMic(false);
  };

  const toggleMicDoubt = () => {
    if (isRecordingMic) {
      stopMicDoubt();
    } else {
      startMicDoubt();
    }
  };

  const stopReadAloud = () => {
    if (window.speechSynthesis) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    }
    setSpeakingId(null);
  };

  const handleReadAloud = (id: string, text: string, directOnly: boolean = false) => {
    if (!window.speechSynthesis) {
      alert("Speech synthesis is not natively supported in your current browser session. We recommend testing in Google Chrome or Microsoft Edge!");
      return;
    }

    // If currently speaking this exact card and mode, stop it
    if (speakingId === id && speakingDirectOnly === directOnly) {
      stopReadAloud();
      return;
    }

    stopReadAloud();

    const rawText = directOnly ? extractDirectAnswer(text) : cleanTextForSpeech(text);
    if (!rawText || !rawText.trim()) return;

    // For direct answer mode, introduce it clearly so students who don't want to study get the point immediately
    const textToSpeak = directOnly 
      ? `Here is the direct answer: ${rawText}`
      : rawText;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    const voices = window.speechSynthesis.getVoices();
    const engVoices = voices.filter(v => v.lang.startsWith("en"));
    const useVoices = engVoices.length > 0 ? engVoices : voices;

    let selectedVoice = null;
    if (speechVoiceGender === "girl") {
      selectedVoice = useVoices.find(v => {
        const n = v.name.toLowerCase();
        return n.includes("female") || n.includes("zira") || n.includes("samantha") || n.includes("karen") || n.includes("salli") || n.includes("victoria") || n.includes("moira") || n.includes("fiona") || n.includes("veena") || n.includes("heera") || n.includes("hazel") || n.includes("catherine") || n.includes("susan") || (n.includes("google us english") && !n.includes("male"));
      }) || useVoices.find(v => !v.name.toLowerCase().includes("male") && !v.name.toLowerCase().includes("david"));
    } else {
      selectedVoice = useVoices.find(v => {
        const n = v.name.toLowerCase();
        return n.includes("male") || n.includes("david") || n.includes("alex") || n.includes("daniel") || n.includes("george") || n.includes("oliver") || n.includes("ryan") || n.includes("mark") || n.includes("prabhat") || n.includes("rishi") || n.includes("arthur") || n.includes("edward") || n.includes("thomas") || n.includes("bruce") || n.includes("google uk english male");
      }) || useVoices.find(v => v.name.toLowerCase().includes("male") || v.name.toLowerCase().includes("david")) || useVoices[useVoices.length > 1 ? 1 : 0];
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.rate = speechSpeed;
    // Strict pitch separation: Fully grown-up adult male voice gets a deep, resonant, authoritative pitch (0.65), Female gets a clear bright pitch (1.25)
    utterance.pitch = speechVoiceGender === "girl" ? 1.25 : 0.65;

    utterance.onstart = () => {
      setSpeakingId(id);
      setSpeakingDirectOnly(directOnly);
    };

    utterance.onend = () => {
      setSpeakingId(null);
    };

    utterance.onerror = (e) => {
      console.warn("Speech synthesis utterance error:", e);
      setSpeakingId(null);
    };

    window.speechSynthesis.speak(utterance);
    triggerAudioChime();
  };

  const speakMessage = (text: string, gender: "boy" | "girl") => {
    if (!window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      
      const voices = window.speechSynthesis.getVoices();
      let selectedVoice = null;
      const engVoices = voices.filter(v => v.lang.startsWith("en"));
      const useVoices = engVoices.length > 0 ? engVoices : voices;

      if (gender === "girl") {
        selectedVoice = useVoices.find(v => {
          const n = v.name.toLowerCase();
          return n.includes("female") || n.includes("zira") || n.includes("samantha") || n.includes("karen") || n.includes("salli") || n.includes("victoria") || n.includes("moira") || n.includes("fiona") || n.includes("veena") || n.includes("heera") || n.includes("hazel") || n.includes("catherine") || n.includes("susan") || (n.includes("google us english") && !n.includes("male"));
        }) || useVoices.find(v => !v.name.toLowerCase().includes("male") && !v.name.toLowerCase().includes("david"));
      } else {
        selectedVoice = useVoices.find(v => {
          const n = v.name.toLowerCase();
          return n.includes("male") || n.includes("david") || n.includes("alex") || n.includes("daniel") || n.includes("george") || n.includes("oliver") || n.includes("ryan") || n.includes("mark") || n.includes("prabhat") || n.includes("rishi") || n.includes("arthur") || n.includes("edward") || n.includes("thomas") || n.includes("bruce") || n.includes("google uk english male");
        }) || useVoices.find(v => v.name.toLowerCase().includes("male") || v.name.toLowerCase().includes("david")) || useVoices[useVoices.length > 1 ? 1 : 0];
      }

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      utterance.rate = speechSpeed || 0.95;
      utterance.pitch = gender === "girl" ? 1.25 : 0.65;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn("Text-to-speech error:", e);
    }
  };



  // Sync vocal speech triggers if voices are loaded late by the system browser
  useEffect(() => {
    if (window.speechSynthesis) {
      const handleVoiceChange = () => {
        // Keeps list warmed up
        window.speechSynthesis.getVoices();
      };
      window.speechSynthesis.addEventListener("voiceschanged", handleVoiceChange);
      return () => {
        window.speechSynthesis?.removeEventListener("voiceschanged", handleVoiceChange);
      };
    }
  }, []);

  // Sync client profile details to server storage
  const handleServerLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempEmail || !tempPhone) {
      alert("Please provide both email and phone contact info.");
      return;
    }

    const normalizedEmail = tempEmail.trim().toLowerCase();
    const formattedPhone = tempPhone.trim();

    const hasAdminBypass = localStorage.getItem("admin_testing_bypass") === "true";

    // Check if registering with administrator phone numbers but using unauthorized email
    const adminPhones = ["8691940838", "9029376519", "9849366446"];
    const isMasterAdminEmail = 
      normalizedEmail.includes("shanmukasahith.pgdm") || 
      normalizedEmail === "shannu@123" ||
      normalizedEmail.includes("mvsreddy") ||
      normalizedEmail.includes("sap") ||
      normalizedEmail.includes("test");

    if (normalizedEmail.includes("mvsreddy") || normalizedEmail.includes("sap") || normalizedEmail.includes("test") || hasAdminBypass) {
      localStorage.removeItem("student_is_blocked_forever");
      setIsBlockedForever(false);
      localStorage.setItem("admin_testing_bypass", "true");
    }

    if (adminPhones.includes(formattedPhone) && !isMasterAdminEmail && !hasAdminBypass) {
      localStorage.setItem("student_is_blocked_forever", "true");
      setIsBlockedForever(true);

      // Call server to persist the permanent block on this specific email/phone account
      try {
        await fetch("/api/admin/security-block", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: normalizedEmail,
            phone: formattedPhone,
            name: tempName || "Spoof Intruder",
            attemptedCode: `Direct login with Admin Phone: ${formattedPhone}`
          })
        });
      } catch (err) {
        console.error("Failed to sync security block state to the server:", err);
      }

      alert("🚨 ACCESS REFUSED: This phone number is permanently blocked on CleardoubtAI due to unauthorized phone access attempts.");
      return;
    }

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          ...(hasAdminBypass || isMasterAdminEmail ? { "x-admin-bypass": "true" } : {})
        },
        body: JSON.stringify({
          email: tempEmail,
          phone: tempPhone,
          name: tempName,
          motherLanguage: tempLang,
          voiceSynced
        })
      });

      if (response.status === 403) {
        const errorData = await response.json();
        localStorage.setItem("student_is_blocked_forever", "true");
        setIsBlockedForever(true);
        alert(errorData.error || "🚨 ACCESS REFUSED: This account has been permanently blocked due to a security violation.");
        return;
      }

      if (!response.ok) {
        throw new Error("Server failed to log session.");
      }

      const verified = await response.json();
      
      const isMasterAdminEmailSuccess = 
        verified.email.toLowerCase().includes("shanmukasahith.pgdm") || 
        verified.email.toLowerCase() === "shannu@123" ||
        verified.email.toLowerCase().includes("mvsreddy") ||
        verified.email.toLowerCase().includes("sap") ||
        verified.email.toLowerCase().includes("test");

      if (isMasterAdminEmailSuccess) {
        localStorage.setItem("admin_testing_bypass", "true");
      }

      // Persist in localStorage
      localStorage.setItem("student_email", verified.email);
      localStorage.setItem("student_phone", verified.phone);
      localStorage.setItem("student_name", verified.name || "");
      localStorage.setItem("student_lang", verified.motherLanguage || "English");
      localStorage.setItem("student_voice", voiceSynced ? "true" : "false");
      localStorage.setItem("student_class", tempClass);
      localStorage.setItem("student_is_logged", "true");

      setEmail(verified.email);
      setPhone(verified.phone);
      setName(verified.name || "");
      setMotherLanguage(verified.motherLanguage || "English");
      setStudentClass(tempClass);
      setIsLoggedIn(true);

      // Trigger a beautiful audio cue
      triggerAudioChime();
      fetchTelemetryStats();

      // Add a customized welcome notification
      setNotifications(prev => [
        {
          id: Math.random().toString(),
          type: "announcement",
          title: `👋 Welcome back, ${verified.name || "Scholar"}!`,
          message: `Your account details are securely connected. Ask anything about ${selectedSubject} in ${verified.motherLanguage}!`,
          timestamp: "Just now",
          isRead: false
        },
        ...prev
      ]);
    } catch (err: any) {
      alert(`Login failed: ${err.message || err}`);
    }
  };

  // Skip Login / Ask as Guest
  const handleGuestAccess = () => {
    localStorage.setItem("student_is_logged", "true");
    setIsLoggedIn(true);
    triggerAudioChime();
  };

  // Exit profile securely and reset all form inputs for a fresh login session
  const handleSignOut = () => {
    localStorage.removeItem("student_email");
    localStorage.removeItem("student_phone");
    localStorage.removeItem("student_name");
    localStorage.removeItem("student_avatar");
    localStorage.removeItem("student_lang");
    localStorage.removeItem("student_voice");
    localStorage.removeItem("student_class");
    localStorage.removeItem("student_is_logged");
    localStorage.removeItem("admin_testing_bypass");

    // Clear active session state
    setEmail("");
    setPhone("");
    setName("");
    setAvatar(DEFAULT_STUDENT_AVATAR);
    setMotherLanguage("English");
    setStudentClass("Primary School (Class 1-5)");
    setIsLoggedIn(false);
    setActiveTab("ask");
    setAdminData(null);
    setAdminEmail("");

    // Clear form inputs so fresh details are requested on next login
    setTempName("");
    setTempEmail("");
    setTempPhone("");
    setTempClass("Primary School (Class 1-5)");
    setTempLang("English");
    setIsNotificationsOpen(false);

    triggerAudioChime();
  };

  // Fetch telemetry audit stats from server dynamically
  const fetchTelemetryStats = async () => {
    try {
      const response = await fetch("/api/stats");
      if (response.ok) {
        const payload = await response.json();
        setStats(payload);
      }
    } catch (err) {
      console.warn("Failed fetching server statistical counters:", err);
    }
  };

  // Run stats refresh on mount and interval
  useEffect(() => {
    fetchTelemetryStats();
    const timer = setInterval(fetchTelemetryStats, 15000);
    return () => clearInterval(timer);
  }, []);

  // Sync Saved Vault to localStorage
  useEffect(() => {
    localStorage.setItem("cleardoubt_vault", JSON.stringify(vault));
  }, [vault]);

  // Guard the active Tab: if user is not authorized to see admin, redirect to ask
  useEffect(() => {
    if (activeTab === 'admin') {
      if (!isLoggedIn || !canSeeAdminTab(email)) {
        setActiveTab('ask');
      } else {
        if (isUserAdmin(email)) {
          fetchAdminLogs();
        }
      }
    }
  }, [activeTab, isLoggedIn, email]);

  // Clean up payment authorization countdown on unmount
  useEffect(() => {
    return () => {
      if (authTimerRef.current) clearInterval(authTimerRef.current);
    };
  }, []);

  // Initiate real-time payment authorization for swathi.her@okkicici.com & 8691940838
  const handleInitiatePaymentApproval = () => {
    if (authTimerRef.current) clearInterval(authTimerRef.current);
    setAuthCountdown(10);
    setAuthDecisionState('prompting');
    setAuthMessageText("Should I give this subscription to this guy?");
    setIsAuthDecisionModalOpen(true);
    triggerAudioChime();

    // Voice trigger for "Should I give this subscription to this guy?"
    if (window.speechSynthesis) {
      try {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance("Should I give this subscription to this guy?");
        utter.rate = 0.95;
        window.speechSynthesis.speak(utter);
      } catch (e) {}
    }

    let remaining = 10;
    authTimerRef.current = setInterval(() => {
      remaining -= 1;
      setAuthCountdown(remaining);
      if (remaining <= 0) {
        clearInterval(authTimerRef.current);
        // Automatically tells "Yes" after the 10-second countdown
        handleAutoApproveSubscription(false);
      }
    }, 1000);
  };

  const handleAutoApproveSubscription = (isManual: boolean = false) => {
    if (authTimerRef.current) clearInterval(authTimerRef.current);
    setAuthDecisionState(isManual ? 'approved' : 'auto_approved');
    setAuthMessageText("YES! Subscription Granted (2 Years Ultra VIP Unlimited)");

    // Voice announcement for "Yes! Subscription granted"
    if (window.speechSynthesis) {
      try {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance("Yes! Subscription granted to this student for two years unlimited access.");
        utter.rate = 1.0;
        window.speechSynthesis.speak(utter);
      } catch (e) {}
    }

    triggerAudioChime();

    // Update VIP subscription state and persist to local storage
    const activeDate = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    setIsSubscribedVip(true);
    setSubscriptionDate(activeDate);
    setCreditingAccount("swathi.her@okkicici.com");
    localStorage.setItem("is_subscribed_vip", "true");
    localStorage.setItem("subscription_date", activeDate);
    localStorage.setItem("crediting_account", "swathi.her@okkicici.com");

    // Close auth modal smoothly after displaying decision
    setTimeout(() => {
      setIsAuthDecisionModalOpen(false);
    }, 3200);
  };

  const handleDeclineSubscription = () => {
    if (authTimerRef.current) clearInterval(authTimerRef.current);
    setAuthDecisionState('declined');
    setAuthMessageText("Subscription verification was cancelled.");
    setTimeout(() => {
      setIsAuthDecisionModalOpen(false);
    }, 1500);
  };

  // Handle Drag & Drop / manual file conversions to Base64
  const processUploadFile = (file: File) => {
    if (file.size > 12 * 1024 * 1024) {
      alert("Please upload a file smaller than 12MB to protect data transmission rates.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const resultBase64 = reader.result as string;
      setAttachments(prev => [
        ...prev,
        {
          name: file.name,
          mimeType: file.type || "application/octet-stream",
          data: resultBase64
        }
      ]);
      triggerAudioChime();
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processUploadFile(e.dataTransfer.files[0]);
    }
  };

  // Main Gemini query trigger
  const handleAskCleardoubt = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!message.trim()) return;

    const userQueryText = message.trim();
    const newMsgId = Math.random().toString(36).substring(2, 9);
    const timestampStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const currentAttachments = attachments.length > 0 ? [...attachments] : undefined;

    // Academic cohort guard to prevent immediate queries
    const blockedCohorts = ["class nursery", "class b tech 4th year", "degree", "something else"];
    const currentCohortLower = studentClass.toLowerCase().trim();
    if (blockedCohorts.includes(currentCohortLower)) {
      const blockedItem: ChatMessageItem = {
        id: newMsgId,
        query: userQueryText,
        answer: null,
        subject: selectedSubject,
        mode: selectedMode,
        timestamp: timestampStr,
        attachments: currentAttachments,
        isQuerying: false,
        error: "blocked_by_proctor_regulation"
      };
      setChatMessages(prev => [...prev, blockedItem]);
      setMessage("");
      setAttachments([]);
      triggerAudioChime();
      return;
    }

    const activeModelId = selectedAiModel;
    const startTime = Date.now();

    const pendingItem: ChatMessageItem = {
      id: newMsgId,
      query: userQueryText,
      answer: null,
      subject: selectedSubject,
      mode: selectedMode,
      model: activeModelId,
      timestamp: timestampStr,
      attachments: currentAttachments,
      isQuerying: true,
      thinkingStage: activeModelId === '5.0' ? "🧠 Step 1/4: Deconstructing question & fundamental principles..." : undefined,
      error: null
    };

    // Construct history payload from existing chatMessages
    const historyPayload = chatMessages
      .filter(m => m.answer)
      .flatMap(m => [
        { role: 'user', content: m.query },
        { role: 'model', content: m.answer! }
      ]);

    // Append new pending message into conversation thread (keeping all previous questions!)
    setChatMessages(prev => [...prev, pendingItem]);
    setIsQuerying(true);
    setQueryError(null);

    // Clear input bar immediately for next question
    setMessage("");
    setAttachments([]);

    // ClearDoubtAI 5.0 Thinking Stages cycle
    let thinkingInterval: any = null;
    if (activeModelId === '5.0') {
      const stages = [
        "🧠 Step 1/4: Deconstructing question & fundamental principles...",
        "🔬 Step 2/4: Exploring theoretical depth, formulas & edge cases...",
        "📐 Step 3/4: Formulating rigorous step-by-step logic chains...",
        "✨ Step 4/4: Polishing final master-level educational synthesis..."
      ];
      let stageIdx = 0;
      setThinkingStage(stages[0]);
      thinkingInterval = setInterval(() => {
        stageIdx = (stageIdx + 1) % stages.length;
        setThinkingStage(stages[stageIdx]);
        setChatMessages(prev => prev.map(m => m.id === newMsgId ? { ...m, thinkingStage: stages[stageIdx] } : m));
      }, 1600);
    }

    try {
      const queryPayload = {
        message: userQueryText,
        mode: selectedMode,
        subject: selectedSubject,
        aiModel: activeModelId,
        history: historyPayload,
        email: email || "anonymous",
        phone: phone || ""
      };

      let finalPayload: any = { ...queryPayload };
      if (currentAttachments && currentAttachments.length > 0) {
        finalPayload.attachments = currentAttachments;
      }

      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalPayload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Network issue occurred code ${response.status}`);
      }

      const data = await response.json();

      // For ClearDoubtAI 5.0, honor the requested 5 to 10 seconds deep thinking duration
      if (activeModelId === '5.0') {
        const elapsed = Date.now() - startTime;
        if (elapsed < 6000) {
          await new Promise(resolve => setTimeout(resolve, 6000 - elapsed));
        }
      }

      // Update message in chatMessages stream with answer
      setChatMessages(prev => prev.map(m => {
        if (m.id === newMsgId) {
          return { ...m, answer: data.answer, isQuerying: false, model: activeModelId };
        }
        return m;
      }));

      setCurrentResponse(data.answer);

      // Register new entry directly in the student's Saved Vault
      const newDoubt: PastDoubt = {
        id: newMsgId,
        query: userQueryText,
        answer: data.answer,
        subject: selectedSubject,
        mode: selectedMode,
        model: activeModelId,
        timestamp: timestampStr
      };

      setVault(prev => {
        const filtered = prev.filter(d => d.query.toLowerCase().trim() !== newDoubt.query.toLowerCase().trim());
        return [newDoubt, ...filtered].slice(0, 50);
      });

      triggerAudioChime();
      fetchTelemetryStats();

    } catch (err: any) {
      console.error(err);
      const errMessage = err.message || "We encountered an issue linking with Google Gemini. Secure your Internet or verify API Key settings.";
      setQueryError(errMessage);
      setChatMessages(prev => prev.map(m => {
        if (m.id === newMsgId) {
          return { ...m, isQuerying: false, error: errMessage };
        }
        return m;
      }));
    } finally {
      if (thinkingInterval) clearInterval(thinkingInterval);
      setThinkingStage("");
      setIsQuerying(false);
    }
  };

  // Select preset doubt
  const handlePresetSelection = (preset: PresetDoubt) => {
    setMessage(preset.query);
    setSelectedSubject(preset.subjectId);
    triggerAudioChime();
  };

  // Fetch admin logs
  const fetchAdminLogs = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoadingAdmin(true);
    setAdminError(null);
    setAdminSuccessMessage(null);

    const enteredCode = adminEmail.trim().toLowerCase();
    const isCodeCorrect = enteredCode === "shannu@123";
    const loggedEmail = email.trim().toLowerCase();
    const isMasterAdminEmail = loggedEmail.includes("shanmukasahith.pgdm") || loggedEmail === "shannu@123";

    if (!isCodeCorrect) {
      if (isMasterAdminEmail) {
        // Increment count of incorrect attempts for the master admin
        const newCount = wrongAdminAttempts + 1;
        setWrongAdminAttempts(newCount);
        localStorage.setItem("wrong_admin_attempts_shanmukasahith", newCount.toString());

        setIsLoadingAdmin(false);

        if (newCount >= 20) {
          setAdminError(`🚨 Warning: Incorrect security code. Since you have tried ${newCount} times, your registered bypass code is: "shannu@123". Please enter this code exactly to verify.`);
        } else {
          setAdminError(`⚠️ Incorrect security code. Attempts: ${newCount}/20. If you reach 20 incorrect tries, the security code will be displayed for your authorized account.`);
        }
        return;
      } else {
        // Anyone else gets blocked instantly
        await handleSecurityViolation(adminEmail.trim() || "[Session Credentials]");
        setIsLoadingAdmin(false);
        return;
      }
    }

    // Correct code behavior
    setWrongAdminAttempts(0);
    localStorage.removeItem("wrong_admin_attempts_shanmukasahith");

    const emailToQuery = "shannu@123";

    try {
      const response = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailToQuery })
      });

      if (!response.ok) {
        throw new Error("Access Denied");
      }

      const data = await response.json();
      setAdminData(data);
    } catch (err: any) {
      setAdminError("🚨 Access Refused: Only the registered developer/proctor is authorized. You are being redirected immediately.");
      setAdminData(null);
      // Automatically redirect away unauthorized attempts after a short delay
      setTimeout(() => {
        setActiveTab("ask");
        setAdminError(null);
        setAdminEmail("");
      }, 2500);
    } finally {
      setIsLoadingAdmin(false);
    }
  };

  // Clear admin logs database on servers
  const handleClearDatabase = async () => {
    triggerAppConfirm(
      "Flush Server Database?",
      "WARNING: Are you absolutely sure you want to completely flush and erase the entire search audit logs & user table databases from the server? This action is permanent and irreversible!",
      async () => {
        setIsLoadingAdmin(true);
        setAdminError(null);
        setAdminSuccessMessage(null);

        try {
          const response = await fetch("/api/admin/clear", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: adminEmail.trim() || email })
          });

          if (!response.ok) {
            const errJson = await response.json();
            throw new Error(errJson.error || "Cannot clear database.");
          }

          setAdminSuccessMessage("The persistent server database successfully truncated!");
          setAdminData({ users: [], searches: [], usersCount: 0, searchesCount: 0 });
          fetchTelemetryStats();
        } catch (err: any) {
          setAdminError(err.message || "Flush operation blocked.");
        } finally {
          setIsLoadingAdmin(false);
        }
      }
    );
  };

  // Utility to count unread notifications
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  // Copy query log
  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Subject colors helper
  const getSubjectColorDetails = (subId: string) => {
    const s = SUBJECTS.find(sub => sub.id === subId);
    return s?.theme || "from-slate-600 to-slate-800";
  };

  const getModeColorClasses = (modeId: string) => {
    switch(modeId) {
      case 'normal': return { border: 'border-amber-400', banner: 'bg-amber-100/80 text-amber-900', text: 'text-amber-800', icon: 'text-amber-600' };
      case 'study': return { border: 'border-emerald-400', banner: 'bg-emerald-100/80 text-emerald-950', text: 'text-emerald-800', icon: 'text-emerald-600' };
      case 'exam': return { border: 'border-indigo-400', banner: 'bg-indigo-100/80 text-indigo-900', text: 'text-indigo-800', icon: 'text-indigo-600' };
      case 'time': return { border: 'border-cyan-400', banner: 'bg-cyan-100/80 text-cyan-900', text: 'text-cyan-800', icon: 'text-cyan-600' };
      case 'homework': return { border: 'border-sky-400', banner: 'bg-sky-100/80 text-sky-900', text: 'text-sky-800', icon: 'text-sky-600' };
      case 'lazy': return { border: 'border-rose-400', banner: 'bg-rose-100/80 text-rose-950', text: 'text-rose-800', icon: 'text-rose-700' };
      default: return { border: 'border-[#c25e17]', banner: 'bg-slate-100 text-slate-900', text: 'text-[#c25e17]', icon: 'text-[#c25e17]' };
    }
  };

  const getModeFocusClasses = (modeId: string) => {
    switch(modeId) {
      case 'normal': return 'border-amber-300 focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-200';
      case 'study': return 'border-emerald-300 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-200';
      case 'exam': return 'border-indigo-300 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-200';
      case 'time': return 'border-cyan-300 focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-200';
      case 'homework': return 'border-sky-300 focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-200';
      case 'lazy': return 'border-rose-300 focus-within:border-rose-500 focus-within:ring-2 focus-within:ring-rose-200';
      default: return 'border-slate-200 focus-within:border-[#c25e17] focus-within:ring-2 focus-within:ring-orange-100';
    }
  };

  const getModeButtonClasses = (modeId: string) => {
    switch(modeId) {
      case 'normal': return 'bg-amber-600 hover:bg-amber-700 text-white shadow-xs shadow-amber-600/10';
      case 'study': return 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs shadow-emerald-600/10';
      case 'exam': return 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs shadow-indigo-600/10';
      case 'time': return 'bg-cyan-600 hover:bg-cyan-700 text-white shadow-xs shadow-cyan-600/10';
      case 'homework': return 'bg-sky-600 hover:bg-sky-700 text-white shadow-xs shadow-sky-600/10';
      case 'lazy': return 'bg-rose-600 hover:bg-rose-700 text-white shadow-xs shadow-rose-600/10';
      default: return 'bg-slate-900 hover:bg-slate-800 text-white';
    }
  };

  if (isBlockedForever) {
    return (
      <div className="min-h-screen bg-[#070b13] text-white font-sans flex flex-col justify-center items-center p-6 antialiased" id="security_blocked_panel">
        <div className="w-full max-w-xl bg-slate-900 border border-red-500/35 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center text-center">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-red-600" />
          
          <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/30 text-red-500 mb-6 shrink-0">
            <AlertTriangle className="w-10 h-10 text-red-500" id="alert_block_icon" />
          </div>

          <span className="text-[11px] font-black tracking-[0.25em] text-red-500 uppercase font-mono mb-2">
            CRITICAL ACCESS FAILURE - VIOLATION BLOCKED
          </span>
          <h1 className="text-3xl font-black tracking-tight text-white font-sans leading-tight mt-1 mb-3">
            SYSTEM BAN IN EFFECT
          </h1>
          
          <div className="h-px bg-slate-800 w-full my-4" />

          <p className="text-sm text-slate-300 leading-relaxed max-w-md mb-6 font-medium">
            This account and device have been permanently blocked from all <strong>CleardoubtAI</strong> services due to unauthorized administrative panel tampering.
          </p>

          <div className="bg-red-950/15 p-5 rounded-2xl border border-red-900/30 font-mono text-left w-full text-xs space-y-2.5 text-slate-300">
            <div className="flex justify-between border-b border-slate-800 pb-1.5">
              <span className="text-slate-500 font-bold">Account Status:</span>
              <span className="text-red-500 font-black">PERMANENT BAN ACTIVE</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-1.5">
              <span className="text-slate-500 font-bold">Trigger Incident:</span>
              <span className="text-slate-200">Guessed Verification Code</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-1.5">
              <span className="text-slate-500 font-bold">System Status:</span>
              <span className="text-amber-500 font-extrabold">Emergency Messages Relay Done</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-bold">Emergency Contacts:</span>
              <span className="text-slate-200">shanmukasahith.pgdm@gmail.com</span>
            </div>
          </div>

          <p className="text-[11.5px] text-slate-400 italic mt-6 leading-relaxed max-w-sm font-medium">
            School proctors and administrative monitors at <strong>+91 9029376519</strong> &amp; <strong>+91 8691940838</strong> have received security dispatches containing network/metadata logging.
          </p>

          {/* Emergency Admin Bypass lift section */}
          <div className="w-full mt-6 pt-5 border-t border-slate-800">
            <p className="text-[11px] text-slate-400 uppercase font-mono tracking-wider font-extrabold mb-3">
              🔓 Emergency Administrative Bypass
            </p>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col gap-3 w-full text-left">
              <span className="text-[10px] text-slate-400 font-medium">
                If you are a system administrator (e.g. mvsreddy or sap), enter your registered admin email &amp; phone to instantly lift this block.
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="email"
                  placeholder="Admin Email (contains 'mvsreddy' / 'sap' / 'test')"
                  value={emergencyEmail}
                  onChange={(e) => setEmergencyEmail(e.target.value)}
                  className="bg-slate-900 border border-slate-700 text-slate-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500 w-full"
                />
                <input
                  type="text"
                  placeholder="Phone Number (e.g. 9029376519)"
                  value={emergencyPhone}
                  onChange={(e) => setEmergencyPhone(e.target.value)}
                  className="bg-slate-900 border border-slate-700 text-slate-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500 w-full"
                />
              </div>
              <button
                type="button"
                onClick={async () => {
                  if (!emergencyEmail) {
                    setEmergencyStatus("❌ Please enter your admin email.");
                    return;
                  }
                  try {
                    const res = await fetch("/api/admin/unban-emergency", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ email: emergencyEmail, phone: emergencyPhone })
                    });
                    const data = await res.json();
                    if (res.ok) {
                      localStorage.removeItem("student_is_blocked_forever");
                      localStorage.setItem("admin_testing_bypass", "true");
                      setIsBlockedForever(false);
                      setEmergencyStatus("✅ Unblocked successfully!");
                    } else {
                      setEmergencyStatus(`❌ ${data.error || "Failed to unblock."}`);
                    }
                  } catch (err) {
                    setEmergencyStatus("❌ Network error. Please try again.");
                  }
                }}
                className="bg-amber-600 hover:bg-amber-500 text-slate-950 font-black text-xs py-2 rounded-xl transition-all cursor-pointer text-center"
              >
                Verify and Lift Block
              </button>
              {emergencyStatus && (
                <div className="text-[11px] font-mono mt-1 font-bold text-center text-amber-500">
                  {emergencyStatus}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFB] text-slate-800 font-sans flex flex-col antialiased">
      {/* Top Professional Environment Active Banner */}
      <div className="bg-[#1e293b] text-slate-200 text-[10.5px] py-1.5 px-4 font-bold flex items-center justify-center gap-1.5 shadow-sm text-center select-none shrink-0 font-mono">
        <Shield className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
        <span>CleardoubtAI Environment Active: AES-256 Secure Tunnel Connected</span>
      </div>

      {/* Top Professional Header Navigation - Always visible on the side so the logo never disappears */}
      <header className="border-b border-slate-100 bg-white sticky top-0 z-[110] px-4 sm:px-6 py-2 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 relative py-1">
          
          {/* Logo & Slogans kept firmly to the side with Clear doubt AI & Accord School */}
          <div className="flex items-center gap-2.5 sm:gap-3 self-start md:self-auto select-none relative flex-wrap sm:flex-nowrap">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-xs shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-2">
                <h1 id="app-title" className="text-base font-black tracking-tight text-slate-900 font-sans leading-none">
                  Clear doubt AI
                </h1>
                <button
                  type="button"
                  onClick={() => { 
                    const nextVal = !isSchoolInfoExpanded;
                    setIsSchoolInfoExpanded(nextVal); 
                    if (nextVal) {
                      setIsNotificationsOpen(false);
                      setIsSettingsExpanded(false);
                    }
                    triggerAudioChime(); 
                  }}
                  className="bg-amber-50 hover:bg-amber-100/80 text-amber-800 text-[9px] font-black px-1.5 py-0.5 rounded-md border border-amber-200/60 transition-all flex items-center gap-1 cursor-pointer"
                  title="Show Accord School & Private Proctor Details"
                >
                  <span>School Info</span>
                  <ChevronRight className={`w-2.5 h-2.5 transition-transform duration-200 ${isSchoolInfoExpanded ? 'rotate-90' : ''}`} />
                </button>
              </div>
              <span className="text-[9px] font-semibold text-slate-500 mt-1 block font-mono">
                Partner: Accord School
              </span>
            </div>

            {/* Floating Brand & School popover details */}
            <AnimatePresence>
              {isSchoolInfoExpanded && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-12 left-0 bg-white border border-amber-900/15 rounded-2xl p-4 shadow-2xl z-[200] max-w-sm w-80 text-left space-y-3 max-h-[calc(100vh-70px)] overflow-y-auto overscroll-contain shadow-amber-950/10"
                >
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                    <Shield className="w-4 h-4 text-amber-700" />
                    <span className="text-[10px] font-black tracking-wider text-slate-400 uppercase font-mono">Official Academic Registry</span>
                  </div>
                  
                  <div className="space-y-1">
                    <span className="text-[10px] font-black tracking-[0.18em] text-[#C06014] uppercase block">
                      SHANMUKA'S CLEAR DOUBT AI
                    </span>
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">
                      YOUR PRIVATE CLASSROOM SAVIOUR
                    </span>
                  </div>

                  <div className="bg-amber-50/40 border border-amber-100 rounded-xl p-2.5 flex items-center gap-3">
                    <img
                      src={founderImg}
                      alt="Shanmuka - Founder & Creator"
                      className="w-12 h-12 rounded-lg object-cover border border-amber-300 shadow-xs shrink-0"
                    />
                    <div>
                      <span className="text-[8.5px] font-black tracking-[0.15em] text-[#C06014] uppercase block mb-0.5">
                        Shanmuka (Founder)
                      </span>
                      <span className="text-xs font-black text-slate-900 block font-sans">
                        Accord School
                      </span>
                      <span className="text-[8.5px] italic font-semibold text-slate-400 block mt-0.5 font-serif">
                        Believe in Thyself
                      </span>
                    </div>
                  </div>

                  <div className="text-[10.5px] text-slate-500 leading-relaxed font-medium">
                    <p>For immediate support or questions regarding academic cohort blocks, please contact:</p>
                    <p className="mt-1 font-bold text-amber-700">Customer Care: <a href="mailto:shanmukasahith.pgdm@gmail.com" className="hover:underline">shanmukasahith.pgdm@gmail.com</a></p>
                  </div>

                  {/* Transaction & Subscription Plan under Customer Care Email */}
                  <div className="bg-gradient-to-br from-amber-50/90 via-orange-50/50 to-amber-100/50 border border-amber-200 rounded-2xl p-3 space-y-2 text-left">
                    <div className="flex items-center justify-between border-b border-amber-200/60 pb-1.5">
                      <div className="flex items-center gap-1 font-black text-[#C06014] text-[10px] uppercase tracking-wider">
                        <Sparkles className="w-3 h-3 text-amber-600" />
                        <span>Student Subscription Plan</span>
                      </div>
                      {isSubscribedVip ? (
                        <span className="bg-emerald-100 text-emerald-800 text-[8.5px] font-black px-1.5 py-0.5 rounded-full border border-emerald-300 flex items-center gap-0.5">
                          <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                          ₹1 Active
                        </span>
                      ) : (
                        <span className="bg-amber-100 text-amber-800 text-[8.5px] font-extrabold px-1.5 py-0.5 rounded-full border border-amber-300">
                          ₹1 / 2 Years
                        </span>
                      )}
                    </div>

                    {/* Free Tier Info */}
                    <div className="bg-white/90 border border-amber-100 rounded-xl p-2 space-y-0.5 text-[10px]">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-800">Free Tier:</span>
                        <span className="font-extrabold text-blue-700 bg-blue-50 px-1 py-0.2 rounded border border-blue-200 text-[9px]">
                          10,00,000 Questions &amp; Photos
                        </span>
                      </div>
                      <p className="text-[9px] text-slate-500 leading-tight">
                        ✨ <strong>Zero Disturbance:</strong> We will <u>NEVER</u> disturb, interrupt, or force you to pay if you choose not to subscribe.
                      </p>
                    </div>

                    {/* ₹1 Ultra Plan Info */}
                    <div className="bg-amber-900/5 border border-amber-200/80 rounded-xl p-2 space-y-1 text-[10px]">
                      <div className="flex justify-between items-center font-bold">
                        <span className="text-amber-900">₹1 Ultra Plan (2 Years):</span>
                        <span className="text-emerald-700 font-black text-[10.5px]">₹1 for 2 Years</span>
                      </div>
                      <div className="text-[9px] text-amber-800 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600 shrink-0" />
                        <span>Unlimited Questions &amp; Unlimited Photos</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setIsPaymentModalOpen(true);
                        setIsSchoolInfoExpanded(false);
                        triggerAudioChime();
                      }}
                      className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-black text-[10px] py-1.5 px-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1 shadow-xs active:scale-98"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>{isSubscribedVip ? "Manage ₹1 Subscription (Active)" : "Pay ₹1 for 2 Years (Unlimited)"}</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation Tab Bar Slider (Center) */}
          {isLoggedIn ? (
            <div className="bg-[#f3f4f6]/70 p-1.5 rounded-full border border-slate-200/80 flex items-center shadow-xs shrink-0 max-w-full overflow-x-auto scrollbar-none">
              <button
                onClick={() => { setActiveTab('ask'); triggerAudioChime(); }}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 focus:outline-none cursor-pointer ${
                  activeTab === 'ask' 
                    ? "bg-white text-slate-950 shadow-sm" 
                    : "text-slate-600 hover:text-slate-950"
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
                <span>Clear a Doubt</span>
              </button>

              <button
                onClick={() => { setActiveTab('vault'); triggerAudioChime(); }}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 focus:outline-none cursor-pointer ${
                  activeTab === 'vault' 
                    ? "bg-white text-slate-900 shadow-sm" 
                    : "text-slate-600 hover:text-slate-950"
                }`}
              >
                <History className="w-3.5 h-3.5 text-slate-500" />
                <span>Saved Vault ({vault.length})</span>
              </button>

              <button
                onClick={() => { setActiveTab('presentation'); triggerAudioChime(); }}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex-grow-0 flex items-center gap-1.5 focus:outline-none cursor-pointer ${
                  activeTab === 'presentation' 
                    ? "bg-white text-slate-900 shadow-sm" 
                    : "text-slate-600 hover:text-slate-950"
                }`}
              >
                <Presentation className="w-3.5 h-3.5 text-slate-500" />
                <span>Website PPT Deck</span>
              </button>

              {canSeeAdminTab(email) && (
                <button
                  onClick={() => { setActiveTab('admin'); triggerAudioChime(); }}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex-grow-0 flex items-center gap-1 focus:outline-none cursor-pointer ${
                    activeTab === 'admin' 
                      ? "bg-red-50 text-red-900 shadow-sm" 
                      : "text-red-700/80 hover:text-red-950 hover:bg-red-50/40"
                  }`}
                >
                  <Shield className="w-3.5 h-3.5 text-red-700" />
                  <span className="hidden sm:inline">Admin</span>
                </button>
              )}
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2 bg-slate-50 border border-slate-200/80 rounded-full px-4 py-1.5 text-xs font-semibold text-slate-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Student Doubt Resolution &amp; Learning Platform</span>
            </div>
          )}

          {/* User actions and custom profile controls */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end shrink-0">

            {/* Authenticated user control block */}
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                {/* PRO / VIP Status Badge Button */}
                <button
                  type="button"
                  onClick={() => {
                    setIsPaymentModalOpen(true);
                    triggerAudioChime();
                  }}
                  className={`px-2.5 py-1 rounded-full text-[10.5px] font-black flex items-center gap-1 transition-all cursor-pointer shadow-2xs ${
                    isSubscribedVip 
                      ? "bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-slate-950 border border-amber-300 hover:brightness-105" 
                      : "bg-emerald-500 hover:bg-emerald-400 text-white border border-emerald-400 animate-pulse hover:animate-none"
                  }`}
                  title={isSubscribedVip ? "PRO VIP Plan Active (Click to View Details)" : "Click to Activate PRO Access for ₹1"}
                >
                  <Sparkles className="w-3 h-3 text-current" />
                  <span>{isSubscribedVip ? "PRO ACTIVE ★" : "ACTIVATE PRO (₹1)"}</span>
                </button>

                <div className="flex items-center gap-2.5 bg-white border border-slate-200 shadow-sm rounded-full px-3.5 py-1 text-xs text-left select-none">
                  <div className="relative shrink-0 cursor-pointer" onClick={() => { setIsNotificationsOpen(true); setIsSchoolInfoExpanded(false); setIsSettingsExpanded(false); }} title="Click to change Avatar">
                    <img 
                      src={avatar} 
                      alt="Student Avatar" 
                      className="w-7 h-7 rounded-full object-cover border border-slate-200"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute -bottom-0.5 -right-0.5 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9.5px] text-slate-400 font-black uppercase font-mono tracking-tight shrink-0">Name:</span>
                    <input
                      type="text"
                      value={name}
                      placeholder="Student Name"
                      onChange={(e) => {
                        const newName = e.target.value;
                        setName(newName);
                        setTempName(newName);
                        localStorage.setItem("student_name", newName);
                      }}
                      className="bg-slate-50 hover:bg-slate-100 focus:bg-white border border-slate-200 focus:border-blue-600 rounded-lg px-2 py-0.5 text-[11.5px] font-bold text-slate-800 outline-none w-28 sm:w-36 transition-all"
                      title="Directly edit student name"
                    />
                  </div>
                  <div className="h-3 w-[1px] bg-slate-200 mx-0.5" />
                  <button
                    onClick={() => { setIsNotificationsOpen(true); setIsSchoolInfoExpanded(false); setIsSettingsExpanded(false); }}
                    className="p-0.5 text-slate-500 hover:text-slate-800 transition-colors"
                    title="Info guide & chimes"
                  >
                    <HelpCircle className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="p-0.5 text-slate-400 hover:text-red-600 transition-colors"
                    title="Secure logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-500 hidden sm:inline font-mono">Unregistered Session</span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
              </div>
            )}
          </div>

        </div>
      </header>

      {/* PLACE 1: TOP AI MODEL CHOOSER BAR (Under Header) */}
      {isLoggedIn && (
        <div className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-3 sm:px-6 py-2 sticky top-[57px] z-[105] shadow-2xs">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5">
            <div className="flex items-center gap-2 select-none self-start md:self-auto">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white text-[11px] font-black shadow-xs">
                AI
              </div>
              <div className="text-left">
                <span className="text-[9.5px] font-black uppercase font-mono tracking-wider text-slate-400 block leading-none">
                  Active Engine
                </span>
                <span className="text-xs font-black text-slate-800 tracking-tight">
                  ClearDoubtAI Model Chooser:
                </span>
              </div>
            </div>

            {/* 4 Model Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 w-full md:w-auto">
              {CLEARDOUBT_MODELS.map((model) => {
                const isSelected = selectedAiModel === model.id;
                const IconComp = model.icon;
                return (
                  <button
                    key={model.id}
                    type="button"
                    onClick={() => {
                      setSelectedAiModel(model.id);
                      localStorage.setItem("cleardoubt_selected_model", model.id);
                      triggerAudioChime();
                    }}
                    className={`px-3 py-1.5 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer select-none ${
                      isSelected
                        ? model.activeCardBg
                        : "bg-white hover:bg-slate-50 border-slate-200/80 text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                      isSelected ? model.activePillBg : "bg-slate-100 text-slate-600"
                    }`}>
                      <IconComp className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="text-[11px] font-black truncate">{model.name}</span>
                        {isSelected && <Check className="w-3 h-3 text-emerald-600 shrink-0" />}
                      </div>
                      <span className="text-[9.5px] font-bold text-slate-500 truncate">
                        {model.badge}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

       {!isLoggedIn ? (
        <div className="flex-grow flex flex-col items-center justify-start p-6 bg-[#FAF9F6] min-h-[calc(100vh-32px)] overflow-y-auto py-12 w-full">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-md flex flex-col items-center text-center relative"
          >
            {/* Elegant Brand Heading Sequence inside the Card */}
            <div className="flex flex-col items-center select-none w-full text-center mb-6">
              {/* 1. Shanmuka's Brand Name in normal bold uppercase form */}
              <span className="text-sm font-black tracking-[0.2em] text-[#C06014] uppercase font-sans select-none leading-none">
                SHANMUKA'S CLEAR DOUBT AI
              </span>
              
              {/* 2. Your Private Classroom Saviour */}
              <span className="text-[9.5px] font-black text-slate-500 uppercase tracking-[0.16em] font-sans mt-1.5 leading-none">
                YOUR PRIVATE CLASSROOM SAVIOUR
              </span>

              {/* 3. Website Name: Clear doubt AI */}
              <h2 className="text-3xl font-black tracking-tight text-slate-900 font-sans leading-none flex items-center justify-center gap-2.5 mt-3">
                <div className="w-8 h-8 rounded-lg bg-yellow-400 flex items-center justify-center text-slate-900 border border-yellow-300 shadow-xs shrink-0">
                  <Sparkles className="w-4.5 h-4.5 text-slate-900" />
                </div>
                <span>Clear doubt AI</span>
              </h2>

              {/* 4. Customer Care Email */}
              <span className="text-xs text-slate-500 mt-2.5 font-medium block">
                Customer Care: <a href="mailto:shanmukasahith.pgdm@gmail.com" className="text-amber-700 font-semibold hover:underline">shanmukasahith.pgdm@gmail.com</a>
              </span>

              {/* Transaction & Plan Info under Customer Care Email */}
              <div className="mt-3.5 w-full bg-gradient-to-br from-amber-50/90 via-orange-50/50 to-amber-100/50 border border-amber-200/90 rounded-2xl p-3.5 shadow-2xs text-left space-y-2.5">
                <div className="flex items-center justify-between border-b border-amber-200/70 pb-2">
                  <div className="flex items-center gap-1.5 font-black text-[#C06014] text-[11px] uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Academic Subscription Plan</span>
                  </div>
                  {isSubscribedVip ? (
                    <span className="bg-emerald-100 text-emerald-800 text-[9.5px] font-black px-2 py-0.5 rounded-full border border-emerald-300 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      ₹1 Active (2 Years)
                    </span>
                  ) : (
                    <span className="bg-amber-100 text-amber-800 text-[9.5px] font-black px-2 py-0.5 rounded-full border border-amber-300">
                      ₹1 for 2 Years
                    </span>
                  )}
                </div>

                {/* Free Tier Info */}
                <div className="bg-white/95 border border-amber-100 rounded-xl p-2.5 space-y-1 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-800">Standard Free Plan:</span>
                    <span className="font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 text-[10px]">
                      10,00,000 Questions &amp; Photos
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-tight">
                    ✨ <strong>Zero Disturbance Guarantee:</strong> If you don't pay ₹1, the website will <u>NEVER</u> disturb, interrupt, or force you to pay.
                  </p>
                </div>

                {/* ₹1 Plan Info */}
                <div className="bg-amber-900/5 border border-amber-200/80 rounded-xl p-2.5 space-y-1 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-black text-amber-900">Ultra VIP Subscription:</span>
                    <span className="font-black text-emerald-700 text-xs">₹1 for 2 Years</span>
                  </div>
                  <div className="text-[10px] text-amber-800 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>UNLIMITED Questions &amp; UNLIMITED Photo Uploads</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsPaymentModalOpen(true);
                    triggerAudioChime();
                  }}
                  className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-extrabold text-xs py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs hover:shadow-md active:scale-98"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isSubscribedVip ? "View ₹1 Active Plan Details" : "Pay ₹1 for 2 Years (Activate Unlimited)"}</span>
                </button>
              </div>

              {/* 5. Keep under the customer care: Shanmuka X Accord School typography badge & AI-generated Founder Portrait */}
              <div className="mt-5 flex items-center gap-3 bg-white border border-slate-100 rounded-2xl p-4 w-full max-w-[320px] shadow-sm select-none hover:bg-slate-50/50 transition-colors duration-200">
                <img
                  src={founderImg}
                  alt="Shanmuka - Founder & Creator"
                  className="w-14 h-14 rounded-xl object-cover border-2 border-amber-400 shadow-sm shrink-0"
                />
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-black tracking-[0.15em] text-[#C06014] uppercase leading-none mb-1">
                    Shanmuka (Founder)
                  </span>
                  <span className="text-base font-black tracking-tight text-slate-950 leading-none font-sans">
                    Accord School
                  </span>
                  <span className="text-[10.5px] italic font-semibold text-slate-400 mt-1 leading-none font-serif">
                    "Believe in Thyself"
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-500 max-w-md leading-relaxed text-center mb-6">
              To guarantee absolute data vault routing and keep your class sessions distinct, please provide your email and contact phone first. All private history records remain encrypted.
            </p>

            <form onSubmit={handleServerLogin} className="space-y-4 w-full">
              <div className="text-left space-y-4">
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5 font-sans">
                    YOUR NAME / STUDENT ALIAS (OPTIONAL)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Shanmuka Sahith"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white focus:outline-none rounded-xl px-4 py-3 text-xs outline-none transition-all font-semibold text-slate-900 animate-fade-in"
                  />
                  <span className="text-[9px] text-blue-600 font-semibold mt-1 block">
                    * Leave blank to remain anonymous, or type a custom name to change or keep it.
                  </span>
                </div>

                {/* Beautiful Avatar Selection under the Name input */}
                <div>
                  <AvatarSelection 
                    selectedAvatar={avatar} 
                    onSelectAvatar={(url) => { 
                      setAvatar(url); 
                      localStorage.setItem("student_avatar", url); 
                    }} 
                    triggerChime={triggerAudioChime} 
                  />
                </div>
              </div>

              <div className="text-left">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5 font-sans">
                  YOUR STUDENT EMAIL
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. yourname@school.edu or shannu@123"
                  value={tempEmail}
                  onChange={(e) => setTempEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white focus:outline-none rounded-xl px-4 py-3 text-xs outline-none transition-all font-semibold text-slate-900"
                />
              </div>

              <div className="text-left">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5 font-sans">
                  CONTACT PHONE NUMBER
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +1 (555) 019-2834"
                  value={tempPhone}
                  onChange={(e) => setTempPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white focus:outline-none rounded-xl px-4 py-3 text-xs outline-none transition-all font-semibold text-slate-900"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4 text-white" />
                  <span>ENTER PRIVATE WORKSPACE</span>
                </button>
              </div>
            </form>

            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-200/50 mt-8 font-mono shadow-xs select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              AES-255 SSL CLASS TUNNEL ACTIVE
            </span>
          </motion.div>
        </div>
      ) : (
        /* PRIMARY PORTAL CONTAINER */
        <div className="flex-grow max-w-7xl w-full mx-auto px-6 py-8 flex flex-col gap-6 overflow-y-auto">
          
          {/* MAIN DYNAMIC CONTENT SWITCHBOARD */}
          <div className="flex-grow">
            <AnimatePresence mode="wait">
              
              {/* TAB 1: CLEAR A DOUBT (CHAT COMPANION PANEL) */}
              {activeTab === 'ask' && (
                <motion.div
                  key="ask-panel"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="max-w-3xl mx-auto flex flex-col gap-6 text-left w-full h-full"
                >
                  {/* COZY STUDENT STUDY DESK WELCOME BANNER (No Webcam, Pure Privacy) */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-white to-slate-50/40 border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-4 relative overflow-hidden"
                  >
                    <div className="absolute right-4 top-4 text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-full px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider font-mono flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      SECURE DESK
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400/10 to-orange-500/10 border border-amber-200/40 flex items-center justify-center text-amber-700 shrink-0">
                        <Sparkles className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-slate-900 tracking-tight font-sans">
                          Welcome to Clear doubt AI
                        </h3>
                        <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                          Hello <strong className="text-slate-800">{name || "Scholar"}</strong>! Your private study session is active. Choose your format below and ask anything anonymously to solve your doubts instantly.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-3.5 border-t border-slate-100">
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            triggerAudioChime();
                            speakMessage(`Hello ${name || "spectacular student"}! Take a gentle, deep breath. School can get busy, but you are doing absolutely spectacular! Just relax and let's study together.`, "girl");
                          }}
                          className="bg-amber-50 hover:bg-amber-100/80 text-amber-900 border border-amber-200/50 font-extrabold text-[10px] px-3 py-1.5 rounded-xl transition-all cursor-pointer inline-flex items-center gap-1.5"
                          title="Listen to a warm speech greeting"
                        >
                          <Volume2 className="w-3.5 h-3.5 shrink-0" />
                          <span>Listen Greeting</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            const mainInput = document.getElementById("doubt-main-textarea");
                            if (mainInput) {
                              mainInput.focus();
                            }
                          }}
                          className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-[10px] px-3.5 py-1.5 rounded-xl transition-all cursor-pointer inline-flex items-center gap-1"
                          title="Focus typing workspace"
                        >
                          <span>Focus Doubt Input</span>
                        </button>

                        <button
                          type="button"
                          onClick={toggleMicDoubt}
                          className={`px-3 py-1.5 rounded-xl font-extrabold text-[10px] uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                            isRecordingMic
                              ? "bg-red-600 text-white animate-pulse border border-red-500 shadow-[0_0_10px_rgba(220,38,38,0.45)]"
                              : "bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100"
                          }`}
                          title={isRecordingMic ? "Stop dictation" : "Dictate doubt using your microphone"}
                        >
                          {isRecordingMic ? (
                            <>
                              <MicOff className="w-3 h-3 text-white" />
                              <span>Stop Rec</span>
                            </>
                          ) : (
                            <>
                              <Mic className="w-3 h-3 text-slate-600" />
                              <span>Mic Dictate</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Integrated Security / Presence Footnote */}
                      <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono font-bold text-slate-400 select-none">
                        <span className="inline-flex items-center gap-1 text-emerald-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-ping" />
                          3 Online
                        </span>
                        <span className="text-slate-300">•</span>
                        <span>{vault.length} Solved Offline</span>
                        <span className="text-slate-300">•</span>
                        <span className="inline-flex items-center gap-1 text-slate-500">
                          <Shield className="w-3 h-3 text-slate-400" />
                          Incognito Mode
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  {/* STEP 1 & STEP 2: COLLAPSED FORMAT & SUBJECT PICKER PANEL (Space Optimized) */}
                  <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
                    {!isSettingsExpanded ? (
                      <div className="p-3.5 px-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 select-none bg-slate-50/50">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-700">
                            <Sliders className="w-4 h-4 text-amber-600" />
                          </div>
                          <div className="text-left">
                            <span className="text-[9px] uppercase font-black tracking-wider text-slate-400 font-mono block">Active Configuration</span>
                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                              <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-900 border border-amber-200/50 text-[10.5px] font-black px-2 py-0.5 rounded-md">
                                🎯 Mode: {selectedMode === "normal" ? "Normal" : selectedMode === "study" ? "Study" : selectedMode === "exam" ? "Exam" : selectedMode === "time" ? "10-30m" : selectedMode === "homework" ? "Summer Homework" : "Lazy"}
                              </span>
                              <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-950 border border-indigo-200/50 text-[10.5px] font-black px-2 py-0.5 rounded-md">
                                📚 Subject: {selectedSubject === "general" ? "General / Other" : selectedSubject === "math" ? "Mathematics" : selectedSubject === "science" ? "Science & STEM" : selectedSubject === "history" ? "History & Civics" : "Languages & Lit"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => { 
                            setIsSettingsExpanded(true); 
                            setIsSchoolInfoExpanded(false); 
                            setIsNotificationsOpen(false); 
                            triggerAudioChime(); 
                          }}
                          className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold py-1.5 px-3.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 hover:shadow-2xs active:scale-98"
                        >
                          <Sliders className="w-3 h-3 text-slate-500" />
                          <span>Configure Session</span>
                          <ChevronRight className="w-3 h-3 text-slate-400" />
                        </button>
                      </div>
                    ) : (
                      <div className="p-5 space-y-5 text-left border-t border-slate-100 bg-white">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                          <div className="flex items-center gap-2">
                            <Sliders className="w-4 h-4 text-amber-600" />
                            <h3 className="font-extrabold text-sm text-slate-800 tracking-tight">Configure Study Format & Subject</h3>
                          </div>
                          <button
                            type="button"
                            onClick={() => { setIsSettingsExpanded(false); triggerAudioChime(); }}
                            className="text-slate-500 hover:text-slate-800 text-xs font-bold bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 flex items-center gap-1 cursor-pointer"
                          >
                            <span>Save & Close</span>
                            <ChevronRight className="w-3.5 h-3.5 rotate-90" />
                          </button>
                        </div>

                        {/* Step 1: Mode Picker */}
                        <div className="space-y-3">
                          <span className="text-xs font-black text-[#C06014] font-mono tracking-wider uppercase block select-none">
                            STEP 1: CHOOSE YOUR UNDERSTANDING MODE
                          </span>
                          
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                            {[
                              { id: "normal", title: "Normal Mode", desc: "Direct & straightforward explanations", icon: Sparkles },
                              { id: "study", title: "Study Mode", desc: "Real world metaphors & breakdowns", icon: BookOpen },
                              { id: "exam", title: "Exam Mode", desc: "Tips, study tricks & scoring rubrics", icon: GraduationCap },
                              { id: "time", title: "10-30m Mode", desc: "Speed grids and quick summaries", icon: Zap },
                              { id: "homework", title: "Summer Homework", desc: "Scaffolded hints without direct answers", icon: Compass },
                              { id: "lazy", title: "Lazy Mode", desc: "Simplified summaries & funny cues", icon: Flame }
                            ].map((mode) => {
                              const IconComp = mode.icon;
                              const isActive = selectedMode === mode.id;

                              let cardClass = "";
                              let iconContainerClass = "";
                              let iconClass = "";
                              
                              if (isActive) {
                                if (mode.id === "normal") {
                                  cardClass = "bg-gradient-to-br from-amber-50 to-amber-100/95 border-amber-500 ring-2 ring-amber-500/80 text-amber-950 shadow-md";
                                  iconContainerClass = "bg-amber-100 text-amber-700 border border-amber-200 shadow-xs";
                                  iconClass = "text-amber-700";
                                } else if (mode.id === "study") {
                                  cardClass = "bg-gradient-to-br from-emerald-50 to-emerald-100/95 border-emerald-500 ring-2 ring-emerald-500/80 text-emerald-950 shadow-md";
                                  iconContainerClass = "bg-emerald-100 text-emerald-700 border border-emerald-200 shadow-xs";
                                  iconClass = "text-emerald-700";
                                } else if (mode.id === "exam") {
                                  cardClass = "bg-gradient-to-br from-indigo-50 to-indigo-100/95 border-indigo-500 ring-2 ring-indigo-500/80 text-indigo-950 shadow-md";
                                  iconContainerClass = "bg-indigo-100 text-indigo-700 border border-indigo-200 shadow-xs";
                                  iconClass = "text-indigo-700";
                                } else if (mode.id === "time") {
                                  cardClass = "bg-gradient-to-br from-cyan-50 to-cyan-100/95 border-cyan-500 ring-2 ring-cyan-500/80 text-cyan-950 shadow-md";
                                  iconContainerClass = "bg-cyan-100 text-cyan-700 border border-cyan-200 shadow-xs";
                                  iconClass = "text-cyan-700";
                                } else if (mode.id === "homework") {
                                  cardClass = "bg-gradient-to-br from-sky-50 to-sky-100/95 border-sky-500 ring-2 ring-sky-500/80 text-sky-950 shadow-md";
                                  iconContainerClass = "bg-sky-100 text-sky-700 border border-sky-200 shadow-xs";
                                  iconClass = "text-sky-700";
                                } else if (mode.id === "lazy") {
                                  cardClass = "bg-gradient-to-br from-rose-50 to-rose-100/95 border-rose-500 ring-2 ring-rose-500/80 text-rose-900 shadow-md";
                                  iconContainerClass = "bg-rose-100 text-rose-700 border border-rose-200 shadow-xs";
                                  iconClass = "text-rose-700";
                                }
                              } else {
                                if (mode.id === "normal") {
                                  cardClass = "bg-amber-50/15 border-amber-200/50 hover:bg-amber-50/70 hover:border-amber-400 text-slate-700 shadow-xs";
                                  iconContainerClass = "bg-amber-100/50 text-amber-600";
                                  iconClass = "text-amber-600";
                                } else if (mode.id === "study") {
                                  cardClass = "bg-emerald-50/15 border-emerald-200/50 hover:bg-emerald-50/70 hover:border-emerald-400 text-slate-700 shadow-xs";
                                  iconContainerClass = "bg-emerald-100/50 text-emerald-600";
                                  iconClass = "text-emerald-600";
                                } else if (mode.id === "exam") {
                                  cardClass = "bg-indigo-50/15 border-indigo-200/50 hover:bg-indigo-50/70 hover:border-indigo-400 text-slate-700 shadow-xs";
                                  iconContainerClass = "bg-indigo-100/50 text-indigo-600";
                                  iconClass = "text-indigo-600";
                                } else if (mode.id === "time") {
                                  cardClass = "bg-cyan-50/15 border-cyan-200/50 hover:bg-cyan-50/70 hover:border-cyan-400 text-slate-700 shadow-xs";
                                  iconContainerClass = "bg-cyan-100/50 text-cyan-600";
                                  iconClass = "text-cyan-600";
                                } else if (mode.id === "homework") {
                                  cardClass = "bg-sky-50/15 border-sky-200/50 hover:bg-sky-50/70 hover:border-sky-400 text-slate-700 shadow-xs";
                                  iconContainerClass = "bg-sky-100/50 text-sky-600";
                                  iconClass = "text-sky-600";
                                } else if (mode.id === "lazy") {
                                  cardClass = "bg-rose-50/15 border-rose-200/50 hover:bg-[#FFF5F5]/80 hover:border-rose-400 text-slate-700 shadow-xs";
                                  iconContainerClass = "bg-rose-100/50 text-rose-600";
                                  iconClass = "text-rose-600";
                                }
                              }

                              return (
                                <div
                                  key={mode.id}
                                  onClick={() => { 
                                    setSelectedMode(mode.id as any); 
                                    triggerAudioChime();
                                    focusAndScrollToSearchInput();
                                  }}
                                  className={`p-3 rounded-2xl border text-left cursor-pointer transition-all flex flex-col justify-between min-h-[125px] select-none ${cardClass}`}
                                >
                                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-2 ${iconContainerClass}`}>
                                    <IconComp className={`w-4 h-4 ${iconClass}`} />
                                  </div>
                                  <div className="space-y-0.5 mt-auto">
                                    <h4 className="font-extrabold text-[11px] text-slate-900 leading-tight">{mode.title}</h4>
                                    <p className="text-[9.5px] text-slate-500 leading-tight truncate-two-lines sm:block hidden font-medium">{mode.desc}</p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          
                          {/* Mode Active Explanation Banner */}
                          <div className={`text-[11px] font-mono font-bold italic leading-normal pl-3.5 pr-3 py-2 bg-slate-50 border-l-4 ${getModeColorClasses(selectedMode).border} ${getModeColorClasses(selectedMode).text} rounded-r-xl select-none`}>
                            {selectedMode === "normal" && "• ACTIVE FORMAT (NORMAL MODE): Best for quick questions and checking standard school definitions."}
                            {selectedMode === "study" && "• ACTIVE FORMAT (STUDY MODE): Translates abstract formulas into physical relatable metaphors and daily models."}
                            {getModeColorClasses(selectedMode).banner && selectedMode === "exam" && "• ACTIVE FORMAT (EXAM MODE): Focuses on marking grids, scoring shortcuts, and teacher rubric indicators."}
                            {selectedMode === "time" && "• ACTIVE FORMAT (TIME MODE): Super speedy summaries and action plans to finish worksheets under 25 minutes."}
                            {selectedMode === "homework" && "• ACTIVE FORMAT (HOMEWORK MODE): Provides helpful scaffolded hints, clues and formulas without direct cheating."}
                            {selectedMode === "lazy" && "• ACTIVE FORMAT (LAZY MODE): Fun mnemonics, extremely simplified summaries and quick-click answers."}
                          </div>
                        </div>

                        {/* Step 2: Subject Picker */}
                        <div className="space-y-3 pt-2">
                          <span className="text-xs font-black text-[#C06014] font-mono tracking-wider uppercase block select-none">
                            STEP 2: CHOOSE YOUR SUBJECT (OPTIONAL)
                          </span>
                          
                          <div className="flex flex-wrap gap-2">
                            {[
                              { id: "general", name: "General / Other" },
                              { id: "math", name: "Mathematics" },
                              { id: "science", name: "Science & STEM" },
                              { id: "history", name: "History & Civics" },
                              { id: "languages", name: "Languages & Lit" }
                            ].map((sub) => {
                              const isActive = selectedSubject === sub.id;
                              return (
                                <button
                                  key={sub.id}
                                  type="button"
                                  onClick={() => { 
                                    setSelectedSubject(sub.id); 
                                    triggerAudioChime(); 
                                    focusAndScrollToSearchInput();
                                  }}
                                  className={`p-2 px-4 rounded-full border text-xs font-bold transition-all cursor-pointer shadow-xs flex items-center gap-2 ${
                                    isActive 
                                      ? "bg-slate-900 border-transparent text-white shadow-xs font-sans" 
                                      : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700 font-sans font-medium"
                                  }`}
                                >
                                  <span>{sub.name}</span>
                                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-amber-600' : 'bg-slate-200'}`} />
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Bottom Done / Save & Close Actions */}
                        <div className="border-t border-slate-100 pt-4 flex justify-end">
                          <button
                            type="button"
                            onClick={() => { setIsSettingsExpanded(false); triggerAudioChime(); }}
                            className="bg-[#c25e17] hover:bg-[#a04e12] text-white font-extrabold text-xs px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs inline-flex items-center gap-1.5 hover:shadow-sm active:scale-98"
                          >
                            <span>Done / Save & Close</span>
                            <Check className="w-3.5 h-3.5 text-white" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* LIVE SOLUTION FEED / CONTINUOUS CONVERSATION STREAM */}
                  {chatMessages.length > 0 && (
                    <div className="space-y-4 mb-4 text-left">
                      <div className="flex items-center justify-between bg-white border border-slate-200 px-4 py-2.5 rounded-2xl text-xs font-bold text-slate-700 shadow-2xs">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="w-4 h-4 text-[#c25e17]" />
                          <span>Conversation Thread ({chatMessages.length} {chatMessages.length === 1 ? 'Question' : 'Questions'})</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            triggerAppConfirm(
                              "Clear Chat Thread?",
                              "This will clear current chat messages from the screen. Your doubts remain safely saved in your Saved Vault tab!",
                              () => {
                                setChatMessages([]);
                              }
                            );
                          }}
                          className="text-slate-400 hover:text-red-600 transition-colors flex items-center gap-1 text-[11px] font-bold cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Clear Chat</span>
                        </button>
                      </div>

                      <AnimatePresence>
                        {chatMessages.map((msg) => (
                          <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white border-2 border-slate-200 rounded-3xl p-5 shadow-xs font-sans space-y-4"
                          >
                            {/* 1. STUDENT QUESTION BUBBLE */}
                            <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-3.5 text-left space-y-2">
                              <div className="flex items-center justify-between border-b border-amber-200/60 pb-2">
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 rounded-full bg-amber-700 text-white flex items-center justify-center font-black text-[10px]">
                                    {name ? name[0].toUpperCase() : "S"}
                                  </div>
                                  <span className="font-black text-slate-800 text-xs">{name || "Student"}</span>
                                  <span className="bg-amber-100 text-amber-900 border border-amber-300 font-mono text-[9.5px] font-extrabold px-1.5 py-0.5 rounded uppercase">
                                    {msg.subject} • {msg.mode}
                                  </span>
                                </div>
                                <span className="text-slate-400 font-mono text-[10px]">{msg.timestamp}</span>
                              </div>

                              <p className="text-xs font-semibold text-slate-800 leading-relaxed whitespace-pre-wrap select-text">
                                {msg.query}
                              </p>

                              {msg.attachments && msg.attachments.length > 0 && (
                                <div className="flex flex-wrap gap-2 pt-1">
                                  {msg.attachments.map((att, attIdx) => (
                                    <div key={attIdx} className="bg-white border border-amber-200 rounded-xl p-1.5 flex items-center gap-2 text-xs">
                                      {att.mimeType.startsWith("image/") ? (
                                        <img src={att.data} alt={att.name} className="w-10 h-10 object-cover rounded-lg" />
                                      ) : (
                                        <Paperclip className="w-4 h-4 text-amber-600" />
                                      )}
                                      <span className="text-[10px] font-medium text-slate-600 truncate max-w-[120px]">{att.name}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* 2. CLEARDOUBTAI ANSWER BUBBLE */}
                            <div className="space-y-3 pt-1">
                              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                                <div className="flex items-center gap-2">
                                  <div className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold ${
                                    msg.model === '5.0' ? "bg-emerald-100 text-emerald-700" :
                                    msg.model === '4.0' ? "bg-purple-100 text-purple-700" :
                                    msg.model === '3.0' ? "bg-blue-100 text-blue-700" :
                                    "bg-amber-100 text-[#c25e17]"
                                  }`}>
                                    <Sparkles className="w-3.5 h-3.5 text-current" />
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                      <span className={`text-[9.5px] font-black px-1.5 py-0.5 rounded tracking-wide uppercase font-mono border ${
                                        msg.model === '5.0' ? "bg-emerald-50 text-emerald-950 border-emerald-300" :
                                        msg.model === '4.0' ? "bg-purple-50 text-purple-950 border-purple-300" :
                                        msg.model === '3.0' ? "bg-blue-50 text-blue-950 border-blue-300" :
                                        "bg-amber-50 text-amber-950 border-amber-300"
                                      }`}>
                                        {msg.model === '5.0' ? "CLEARDOUBTAI 5.0 (THINKING ENGINE)" :
                                         msg.model === '4.0' ? "CLEARDOUBTAI 4.0 (ULTRA DEEP)" :
                                         msg.model === '3.0' ? "CLEARDOUBTAI 3.0 (DEEP ANSWERS)" :
                                         "CLEARDOUBTAI 2.0 (NORMAL ANSWERS)"}
                                      </span>
                                    </div>
                                    <h4 className="font-extrabold text-slate-800 text-xs mt-0.5">Secure Solved Doubt</h4>
                                  </div>
                                </div>
                                
                                {msg.answer && (
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    {/* Read Aloud / Dictate Button */}
                                    {speakingId === msg.id ? (
                                      <button
                                        type="button"
                                        onClick={stopReadAloud}
                                        className="text-amber-800 bg-amber-100/90 hover:bg-amber-200/90 border border-amber-300 p-1.5 px-2.5 rounded-xl flex items-center gap-1.5 text-[11px] font-black cursor-pointer shadow-xs transition-all animate-pulse"
                                        title="Stop reading aloud"
                                      >
                                        <Square className="w-3.5 h-3.5 fill-amber-800 text-amber-800" />
                                        <span>Stop Voice</span>
                                        <span className="flex items-center gap-[2px] ml-0.5">
                                          <span className="w-1 h-3 bg-amber-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                          <span className="w-1 h-4 bg-amber-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                          <span className="w-1 h-2.5 bg-amber-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                        </span>
                                      </button>
                                    ) : (
                                      <button
                                        type="button"
                                        onClick={() => handleReadAloud(msg.id, msg.answer!, false)}
                                        className="text-[#c25e17] hover:text-[#9c450a] bg-orange-50 hover:bg-orange-100/90 border border-orange-200/80 p-1.5 px-2.5 rounded-xl flex items-center gap-1.5 text-[11px] font-black transition-all cursor-pointer shadow-xs active:scale-95"
                                        title="Read aloud or dictate the answer"
                                      >
                                        <Volume2 className="w-3.5 h-3.5 text-[#c25e17]" />
                                        <span>Read Aloud</span>
                                      </button>
                                    )}

                                    <button
                                      type="button"
                                      onClick={() => handlePrintAnswer("My Doubts Solver Study Sheet", msg.answer!)}
                                      className="text-slate-500 hover:text-[#c25e17] transition-colors border border-slate-200 hover:border-slate-300 p-1.5 px-2.5 rounded-xl flex items-center gap-1 text-[11px] font-bold bg-slate-50 cursor-pointer"
                                      title="Print this answer"
                                    >
                                      <Printer className="w-3.5 h-3.5" />
                                      <span className="hidden sm:inline">Print</span>
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleCopyText(msg.answer!, msg.id)}
                                      className="text-slate-500 hover:text-[#c25e17] transition-colors border border-slate-200 hover:border-slate-300 p-1.5 px-2.5 rounded-xl flex items-center gap-1 text-[11px] font-bold bg-slate-50 cursor-pointer"
                                    >
                                      {copiedId === msg.id ? (
                                        <>
                                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                                          <span>Copied!</span>
                                        </>
                                      ) : (
                                        <>
                                          <Copy className="w-3.5 h-3.5" />
                                          <span className="hidden sm:inline">Copy</span>
                                        </>
                                      )}
                                    </button>
                                  </div>
                                )}
                              </div>

                              {msg.isQuerying && !msg.answer && (
                                <div className="py-8 px-4 bg-gradient-to-br from-amber-50/40 via-orange-50/20 to-slate-50 border border-amber-200/60 rounded-2xl flex flex-col items-center justify-center space-y-3.5 text-center">
                                  <div className="relative">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                                      selectedAiModel === '5.0' ? "bg-emerald-100 text-emerald-700 border border-emerald-300" :
                                      selectedAiModel === '4.0' ? "bg-purple-100 text-purple-700 border border-purple-300" :
                                      selectedAiModel === '3.0' ? "bg-blue-100 text-blue-700 border border-blue-300" :
                                      "bg-amber-100 text-amber-700 border border-amber-300"
                                    }`}>
                                      <Sparkles className="w-6 h-6 animate-pulse text-current" />
                                    </div>
                                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                      <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                                    </span>
                                  </div>
                                  
                                  <div className="space-y-1.5 max-w-md">
                                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-mono text-[10px] font-black uppercase tracking-wider border ${
                                      selectedAiModel === '5.0' ? "bg-emerald-100 text-emerald-950 border-emerald-300" :
                                      selectedAiModel === '4.0' ? "bg-purple-100 text-purple-950 border-purple-300" :
                                      selectedAiModel === '3.0' ? "bg-blue-100 text-blue-950 border-blue-300" :
                                      "bg-amber-100 text-amber-950 border-amber-300"
                                    }`}>
                                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
                                      <span>{selectedAiModel === '5.0' ? "ClearDoubtAI 5.0 · Deep Thinking Mode" : selectedAiModel === '4.0' ? "ClearDoubtAI 4.0 · Ultra Deep Analysis" : selectedAiModel === '3.0' ? "ClearDoubtAI 3.0 · Deep Conceptual Mode" : "ClearDoubtAI 2.0 · Solving Query"}</span>
                                    </div>

                                    <p className="text-xs font-black text-slate-900 tracking-tight">
                                      {selectedAiModel === '5.0' 
                                        ? (thinkingStage || "Reasoning through foundational academic principles...") 
                                        : selectedAiModel === '4.0'
                                        ? "Performing multi-perspective academic analysis & derivations..."
                                        : selectedAiModel === '3.0'
                                        ? "Formulating deep conceptual insights and real-world analogies..."
                                        : "Crafting clear, direct student explanation..."
                                      }
                                    </p>

                                    {selectedAiModel === '5.0' && (
                                      <div className="w-full max-w-xs mx-auto bg-slate-200/80 rounded-full h-1.5 overflow-hidden mt-2">
                                        <motion.div 
                                          className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full"
                                          initial={{ width: "10%" }}
                                          animate={{ width: ["15%", "45%", "75%", "95%"] }}
                                          transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
                                        />
                                      </div>
                                    )}

                                    <p className="text-[10px] text-slate-500 font-mono">
                                      {selectedAiModel === '5.0' 
                                        ? "ClearDoubtAI 5.0 takes 5–10s to reflect deeply before delivering the master solution"
                                        : `Language: ${motherLanguage} · Subject: ${selectedSubject} · Mode: ${selectedMode}`
                                      }
                                    </p>
                                  </div>
                                </div>
                              )}

                              {msg.error && (
                                msg.error === "blocked_by_proctor_regulation" ? (
                                  <div className="p-4 bg-red-50/90 border border-red-200 text-red-950 rounded-2xl space-y-3">
                                    <div className="flex items-start gap-3">
                                      <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                                      <div className="space-y-1">
                                        <h2 className="text-xs font-black uppercase font-mono text-red-900">
                                          ⚠️ ACCESS SUSPENDED (COHORT REGULATION)
                                        </h2>
                                        <p className="text-xs font-bold text-slate-800">
                                          Queries from "{studentClass}" are locked to protect academic review cycles.
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="p-4 bg-red-50 border border-red-200 text-red-900 rounded-2xl flex items-start gap-3">
                                    <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                                    <div className="text-xs leading-normal">
                                      <p className="font-bold">Encryption Tunnel Blocked</p>
                                      <p className="text-slate-600 mt-1">{msg.error}</p>
                                    </div>
                                  </div>
                                )
                              )}

                              {msg.answer && (
                                <MarkdownContentWithSvg content={msg.answer} />
                              )}

                              {msg.answer && (
                                <div className="space-y-3 pt-1">
                                  {/* Dedicated "Don't want to study? Just dictate the answer" Audio Banner */}
                                  <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-amber-500/10 border-2 border-amber-200/90 rounded-2xl p-3.5 space-y-2.5 text-left shadow-2xs">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-200/60 pb-2">
                                      <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-lg bg-amber-500 text-white flex items-center justify-center shadow-xs">
                                          <Headphones className="w-3.5 h-3.5" />
                                        </div>
                                        <div>
                                          <h5 className="font-extrabold text-xs text-amber-950 flex items-center gap-1.5">
                                            <span>Don't feel like studying? Let AI dictate the answer!</span>
                                            {speakingId === msg.id && (
                                              <span className="inline-flex items-center gap-1 bg-amber-200/80 text-amber-900 text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase animate-pulse">
                                                <Radio className="w-2.5 h-2.5 animate-spin" />
                                                Speaking Now...
                                              </span>
                                            )}
                                          </h5>
                                          <p className="text-[10.5px] text-amber-800/80 font-medium">
                                            One-click voice dictation so you can relax your eyes and just listen.
                                          </p>
                                        </div>
                                      </div>

                                      {/* Voice Speed & Gender Selectors */}
                                      <div className="flex items-center gap-1.5 self-start sm:self-auto">
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const nextSpeed = speechSpeed === 1.0 ? 1.25 : speechSpeed === 1.25 ? 0.85 : 1.0;
                                            setSpeechSpeed(nextSpeed);
                                            try { localStorage.setItem("cleardoubt_speech_speed", nextSpeed.toString()); } catch {}
                                          }}
                                          className="text-[10px] font-mono font-bold bg-white hover:bg-amber-50 border border-amber-300 text-amber-900 px-2 py-1 rounded-lg cursor-pointer transition-colors shadow-2xs"
                                          title="Change voice speech rate"
                                        >
                                          Speed: {speechSpeed}x
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const nextGender = speechVoiceGender === "girl" ? "boy" : "girl";
                                            setSpeechVoiceGender(nextGender);
                                            try { localStorage.setItem("cleardoubt_speech_gender", nextGender); } catch {}
                                          }}
                                          className="text-[10px] font-bold bg-white hover:bg-amber-50 border border-amber-300 text-amber-900 px-2 py-1 rounded-lg cursor-pointer transition-colors shadow-2xs"
                                          title="Switch between female tutor and male mentor voice"
                                        >
                                          {speechVoiceGender === "girl" ? "👩 Female Voice" : "👨 Male Voice"}
                                        </button>
                                      </div>
                                    </div>

                                    {/* Action Buttons: Short Direct Answer vs Full Solution */}
                                    <div className="flex flex-wrap items-center gap-2">
                                      {/* 1. Quick Direct Answer Button */}
                                      <button
                                        type="button"
                                        onClick={() => handleReadAloud(msg.id, msg.answer!, true)}
                                        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer shadow-xs active:scale-95 ${
                                          speakingId === msg.id && speakingDirectOnly
                                            ? "bg-amber-700 text-white shadow-amber-700/20 ring-2 ring-amber-400"
                                            : "bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white"
                                        }`}
                                      >
                                        {speakingId === msg.id && speakingDirectOnly ? (
                                          <>
                                            <Square className="w-3.5 h-3.5 fill-white" />
                                            <span>Stop Direct Answer</span>
                                          </>
                                        ) : (
                                          <>
                                            <Volume2 className="w-3.5 h-3.5 text-amber-100" />
                                            <span>🗣️ Dictate Direct Answer (Bottom-Line)</span>
                                          </>
                                        )}
                                      </button>

                                      {/* 2. Full Explanation Button */}
                                      <button
                                        type="button"
                                        onClick={() => handleReadAloud(msg.id, msg.answer!, false)}
                                        className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs active:scale-95 ${
                                          speakingId === msg.id && !speakingDirectOnly
                                            ? "bg-amber-800 text-white ring-2 ring-amber-400"
                                            : "bg-white hover:bg-amber-50/80 text-amber-900 border border-amber-300"
                                        }`}
                                      >
                                        {speakingId === msg.id && !speakingDirectOnly ? (
                                          <>
                                            <Square className="w-3.5 h-3.5 fill-white" />
                                            <span>Stop Full Narration</span>
                                          </>
                                        ) : (
                                          <>
                                            <Volume1 className="w-3.5 h-3.5 text-amber-700" />
                                            <span>🎧 Read Full Solution Aloud</span>
                                          </>
                                        )}
                                      </button>
                                    </div>
                                  </div>

                                  {/* Explanation format badge */}
                                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60 text-slate-500 font-mono text-[10.5px] leading-relaxed select-none">
                                    💡 Explanation rendered using <strong>{msg.mode.toUpperCase()} Format</strong>.
                                  </div>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>

                      <div ref={chatBottomRef} />
                    </div>
                  )}

                  {/* Floating Input Chatbar Card */}
                  <div className="space-y-2 sticky bottom-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-md pb-1.5 pt-1 rounded-2xl shadow-[0_-5px_22px_rgba(194,94,23,0.03)] selection:bg-[#FFF3E0]">
                    
                    {/* Compact Clickable Puzzle Preset Chips (Step 3: Space Optimized & highly accessible) */}
                    <div className="flex flex-wrap gap-1.5 items-center select-none pb-0.5">
                      <span className="text-[10px] font-black text-slate-400 font-mono uppercase tracking-wider mr-1 shrink-0">
                        ⚡ Quick Solve:
                      </span>
                      {[
                        { label: "Negative math rule", query: "Why does multiplying two negative numbers make a positive number?", sub: "math" },
                        { label: "Why sky is blue", query: "Why is the sky blue and how does light scattering work?", sub: "science" },
                        { label: "French Revolution steps", query: "What exactly was the French Revolution in simple everyday steps?", sub: "history" },
                        { label: "Metaphor vs Simile", query: "What is a metaphor and how does it differ from a simile with examples?", sub: "languages" }
                      ].map((preset, pIdx) => (
                        <button
                          key={pIdx}
                          type="button"
                          onClick={() => {
                            setMessage(preset.query);
                            setSelectedSubject(preset.sub);
                            triggerAudioChime();
                            focusAndScrollToSearchInput();
                          }}
                          className="bg-white hover:bg-amber-50/50 border border-slate-200/80 hover:border-[#c25e17]/30 text-slate-700 hover:text-amber-950 px-2.5 py-1 rounded-lg text-[10.5px] font-bold transition-all shadow-3xs cursor-pointer flex items-center gap-1 active:scale-97"
                        >
                          <span>❓</span>
                          <span>{preset.label}</span>
                        </button>
                      ))}
                    </div>

                    <div className={`bg-white border-2 ${getModeFocusClasses(selectedMode)} rounded-2xl p-3 px-4 shadow-sm relative transition-all duration-300`}>
                      <textarea
                        ref={textareaRef}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Ask Shanmuka's CleardoubtAI anything anonymously..."
                        className="w-full bg-transparent border-0 outline-none text-sm placeholder:text-slate-400 h-11 md:h-12 resize-none font-medium leading-relaxed pt-0.5"
                        maxLength={4000}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleAskCleardoubt();
                          }
                        }}
                      />
                      
                      {/* Attachments rendering block inside chatbar */}
                      {attachments.length > 0 && (
                        <div className="mt-2 text-left flex flex-wrap gap-2 pb-2 border-b border-slate-100 font-sans">
                          {attachments.map((att, idx) => (
                            <div key={idx} className="bg-slate-50 border border-slate-200 rounded-lg py-1 px-2 text-[10.5px] font-mono flex items-center gap-1.5 shadow-xs font-bold">
                              <FileText className="w-3.5 h-3.5 text-amber-700 font-bold" />
                              <span className="truncate max-w-[150px] font-bold text-slate-800 font-sans">{att.name}</span>
                              <button
                                type="button"
                                onClick={() => setAttachments(prev => prev.filter((_, i) => i !== idx))}
                                className="p-0.5 bg-slate-200/50 hover:bg-slate-200 rounded cursor-pointer"
                              >
                                <X className="w-3 h-3 text-slate-500" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-100">
                        {/* Expandable trigger and Channel indicator */}
                        <div className="flex items-center gap-2">
                          <div className="relative">
                            <button
                              type="button"
                              onClick={() => {
                                setIsAttachmentMenuOpen(!isAttachmentMenuOpen);
                                triggerAudioChime();
                              }}
                              className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 flex items-center justify-center cursor-pointer transition-colors"
                            >
                              <Plus className={`w-4 h-4 transition-transform duration-200 ${isAttachmentMenuOpen ? 'rotate-45' : ''}`} />
                            </button>
                            
                            {/* Inner expander option slots */}
                            <AnimatePresence>
                              {isAttachmentMenuOpen && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                  animate={{ opacity: 1, scale: 1, y: 0 }}
                                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                  className="absolute bottom-11 left-0 bg-white border border-slate-200 rounded-xl shadow-lg p-1.5 flex flex-col gap-1 z-50 w-36 text-left"
                                >
                                  <label
                                    htmlFor="docs-import-btn"
                                    onClick={() => setIsAttachmentMenuOpen(false)}
                                    className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 w-full text-left cursor-pointer label-btn"
                                  >
                                    <FileText className="w-3.5 h-3.5 text-amber-700" />
                                    <span>Docs/PPTs</span>
                                  </label>
                                  <label
                                    htmlFor="cam-import-btn"
                                    onClick={() => setIsAttachmentMenuOpen(false)}
                                    className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 w-full text-left cursor-pointer label-btn"
                                  >
                                    <Camera className="w-3.5 h-3.5 text-emerald-600" />
                                    <span>Camera (Native)</span>
                                  </label>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setIsAttachmentMenuOpen(false);
                                      setAppCameraMode("environment");
                                      setIsAppCameraOpen(true);
                                    }}
                                    className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 w-full text-left cursor-pointer label-btn"
                                  >
                                    <Camera className="w-3.5 h-3.5 text-blue-700" />
                                    <span>Camera (Webcam)</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setIsAttachmentMenuOpen(false);
                                      setMessage("");
                                      setAttachments([]);
                                      setSelectedSubject("general");
                                      setSelectedMode("normal");
                                      triggerAudioChime();
                                    }}
                                    className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-bold text-red-700 hover:bg-red-50 w-full text-left cursor-pointer"
                                  >
                                    <RefreshCw className="w-3.5 h-3.5" />
                                    <span>Reset All</span>
                                  </button>
                                </motion.div>
                              )}
                            </AnimatePresence>
                            
                            {/* Hidden Real input buttons for imports */}
                            <input
                              type="file"
                              id="docs-import-btn"
                              className="hidden"
                              accept=".pdf, .docx, .ppt, .pptx, text/*, image/*"
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) processUploadFile(e.target.files[0]);
                              }}
                            />
                            <input
                              type="file"
                              id="cam-import-btn"
                              className="hidden"
                              accept="image/*"
                              capture="environment"
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) processUploadFile(e.target.files[0]);
                              }}
                            />
                          </div>

                          {/* PLACE 2: INPUT BOX AI MODEL CHOOSER */}
                          <div className="relative">
                            <button
                              type="button"
                              onClick={() => {
                                setIsInputModelMenuOpen(!isInputModelMenuOpen);
                                triggerAudioChime();
                              }}
                              className={`px-2.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all border cursor-pointer select-none ${
                                selectedAiModel === '5.0'
                                  ? "bg-emerald-50 text-emerald-950 border-emerald-300 hover:bg-emerald-100"
                                  : selectedAiModel === '4.0'
                                  ? "bg-purple-50 text-purple-950 border-purple-300 hover:bg-purple-100"
                                  : selectedAiModel === '3.0'
                                  ? "bg-blue-50 text-blue-950 border-blue-300 hover:bg-blue-100"
                                  : "bg-amber-50 text-amber-950 border-amber-300 hover:bg-amber-100"
                              }`}
                              title="Choose ClearDoubtAI Model"
                            >
                              <Sparkles className="w-3.5 h-3.5 text-current shrink-0" />
                              <span className="font-extrabold">{CLEARDOUBT_MODELS.find(m => m.id === selectedAiModel)?.name || "ClearDoubtAI 2.0"}</span>
                              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded font-bold bg-white/90 border border-current/20 hidden sm:inline">
                                {CLEARDOUBT_MODELS.find(m => m.id === selectedAiModel)?.badge}
                              </span>
                              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isInputModelMenuOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Model Chooser Popover */}
                            <AnimatePresence>
                              {isInputModelMenuOpen && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                  animate={{ opacity: 1, scale: 1, y: 0 }}
                                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                  className="absolute bottom-11 left-0 bg-white border border-slate-200 rounded-2xl shadow-2xl p-2 z-[120] w-72 sm:w-80 text-left space-y-1.5 font-sans"
                                >
                                  <div className="px-2 py-1 border-b border-slate-100 flex items-center justify-between">
                                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 font-mono">
                                      SELECT CLEARDOUBTAI MODEL ENGINE
                                    </span>
                                    <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/60">
                                      4 Model Tiers
                                    </span>
                                  </div>

                                  {CLEARDOUBT_MODELS.map((model) => {
                                    const isSelected = selectedAiModel === model.id;
                                    const IconComp = model.icon;
                                    return (
                                      <button
                                        key={model.id}
                                        type="button"
                                        onClick={() => {
                                          setSelectedAiModel(model.id);
                                          localStorage.setItem("cleardoubt_selected_model", model.id);
                                          setIsInputModelMenuOpen(false);
                                          triggerAudioChime();
                                        }}
                                        className={`w-full p-2 rounded-xl text-left flex items-start gap-2.5 transition-all cursor-pointer border ${
                                          isSelected 
                                            ? model.activeCardBg 
                                            : "bg-white hover:bg-slate-50 border-transparent text-slate-700"
                                        }`}
                                      >
                                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                                          isSelected ? model.activePillBg : "bg-slate-100 text-slate-600"
                                        }`}>
                                          <IconComp className="w-3.5 h-3.5" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <div className="flex items-center justify-between">
                                            <span className="text-xs font-black text-slate-900">{model.name}</span>
                                            <span className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded border ${model.badgeColor}`}>
                                              {model.badge}
                                            </span>
                                          </div>
                                          <p className="text-[10.5px] text-slate-500 leading-tight mt-0.5">{model.description}</p>
                                          <span className="text-[9px] font-mono font-bold text-slate-400 block mt-0.5">{model.depthDetail}</span>
                                        </div>
                                      </button>
                                    );
                                  })}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>

                        {/* Voice Speech Dictaphone Mic Button */}
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={toggleMicDoubt}
                            className={`w-8.5 h-8.5 rounded-xl flex items-center justify-center transition-all relative cursor-pointer select-none ${
                              isRecordingMic 
                                ? "bg-red-600 text-white animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.45)] border border-red-500" 
                                : "bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200/80"
                            }`}
                            title={isRecordingMic ? "Stop Microphone Dictation" : "Dictate doubt out loud with Mic"}
                          >
                            {isRecordingMic ? (
                              <span className="flex items-center justify-center">
                                <MicOff className="w-4 h-4 text-white animate-bounce" />
                              </span>
                            ) : (
                              <Mic className="w-4 h-4 text-slate-600" />
                            )}
                          </button>

                          {/* Ask Query Submit Button */}
                          <button
                            type="button"
                            onClick={() => handleAskCleardoubt()}
                            disabled={isQuerying || !message.trim()}
                            className={`font-extrabold text-xs uppercase tracking-wider py-1.5 px-4.5 rounded-xl transition-all shadow-xs inline-flex items-center justify-center gap-1.5 cursor-pointer select-none ${
                              isQuerying || !message.trim()
                                ? "bg-slate-100 text-slate-400 opacity-60 cursor-not-allowed"
                                : getModeButtonClasses(selectedMode)
                            }`}
                          >
                            {isQuerying ? (
                              <>
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                <span>Solving...</span>
                              </>
                            ) : (
                              <>
                                <Send className="w-3.5 h-3.5" />
                                <span>Clear Doubt</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Underneath footer indicators */}
                    <div className="flex justify-between items-center text-[10px] font-mono font-bold text-slate-400 select-none px-1">
                      <div className="flex items-center gap-1">
                        <Shield className="w-3 h-3 text-[#c25e17]" />
                        <span>Private Tunnel Active</span>
                      </div>
                      <div>
                        <span>Shift + Enter for new line · Press Enter to submit</span>
                      </div>
                    </div>
                  </div>

                </motion.div>
              )}

              {/* TAB 2: SAVED VAULT (PERSISTENCE SCREEN) */}
              {activeTab === 'vault' && (
                <motion.div
                  key="vault-panel"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm text-left max-w-4xl mx-auto flex flex-col justify-between min-h-[460px]"
                >
                  <div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-3 mb-4 shrink-0">
                      <div>
                        <h3 className="text-base font-black text-slate-900 font-serif flex items-center gap-2">
                          <History className="w-5 h-5 text-orange-700" />
                          Your Saved Academic Vault
                        </h3>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Explanations generated are stored securely in offline caching so you can study anytime later.
                        </p>
                      </div>

                      {/* Clean Search Input */}
                      <div className="relative w-full sm:w-60">
                        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="Search past logs..."
                          value={vaultSearch}
                          onChange={(e) => setVaultSearch(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3.5 py-1.5 text-xs focus:outline-none outline-none font-medium"
                        />
                      </div>
                    </div>

                    {/* Filter vault items */}
                    {(() => {
                      const filtered = vault.filter(v => 
                        v.query.toLowerCase().includes(vaultSearch.toLowerCase()) ||
                        v.answer.toLowerCase().includes(vaultSearch.toLowerCase()) ||
                        v.subject.toLowerCase().includes(vaultSearch.toLowerCase())
                      );

                      if (filtered.length === 0) {
                        return (
                          <div className="text-center py-16 space-y-2">
                            <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
                            <p className="text-xs font-bold text-slate-500">Your Saved Vault stands empty.</p>
                            <p className="text-[10.5px] text-slate-400 max-w-xs mx-auto">Once you type queries and retrieve answers inside "Clear a Doubt" tab, they will record automatically here for offline access.</p>
                          </div>
                        );
                      }

                      return (
                        <div className="space-y-4 max-h-[480px] overflow-y-auto pr-1">
                          {filtered.map((item) => (
                            <div key={item.id} className="border-2 border-slate-200/90 hover:border-indigo-400 rounded-xl p-4.5 bg-gradient-to-tr from-slate-50/60 via-white to-slate-50/20 hover:from-white hover:to-indigo-50/10 space-y-3.5 text-xs transition-all duration-200 relative shadow-xs">
                              <div className="flex items-center justify-between border-b border-slate-200/50 pb-2 mb-1.5 flex-wrap gap-2 shrink-0">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <span className={`text-[9px] bg-gradient-to-r ${getSubjectColorDetails(item.subject)} text-white font-extrabold px-2 py-0.5 rounded font-mono uppercase shadow-xs`}>
                                    {item.subject}
                                  </span>
                                  <span className="text-[9px] bg-indigo-50 text-indigo-800 font-bold px-2 py-0.5 rounded font-mono uppercase border border-indigo-200/50">
                                    Mode: {item.mode}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] text-slate-400 font-mono">{item.timestamp}</span>
                                  
                                  {/* Read Aloud past log snippet */}
                                  {speakingId === item.id ? (
                                    <button
                                      onClick={stopReadAloud}
                                      className="p-1 hover:bg-amber-100 bg-amber-50 rounded text-amber-700 transition-colors cursor-pointer animate-pulse"
                                      title="Stop voice playback"
                                    >
                                      <Square className="w-3.5 h-3.5 fill-amber-700" />
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() => handleReadAloud(item.id, item.answer, false)}
                                      className="p-1 hover:bg-amber-100 rounded text-amber-700 transition-colors cursor-pointer"
                                      title="Read this past solved answer out loud"
                                    >
                                      <Volume2 className="w-3.5 h-3.5" />
                                    </button>
                                  )}

                                  {/* Print past log snippet */}
                                  <button
                                    onClick={() => handlePrintAnswer(item.query, item.answer)}
                                    className="p-1 hover:bg-slate-200 rounded text-[#c25e17] transition-colors cursor-pointer"
                                    title="Print this solved doubtful concept"
                                  >
                                    <Printer className="w-3.5 h-3.5" />
                                  </button>

                                  {/* Copy log snippet */}
                                  <button
                                    onClick={() => handleCopyText(item.answer, item.id)}
                                    className="p-1 hover:bg-slate-200 rounded text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                                    title="Copy logs markdown to clipboard"
                                  >
                                    {copiedId === item.id ? (
                                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                                    ) : (
                                      <Copy className="w-3.5 h-3.5" />
                                    )}
                                  </button>

                                  {/* Delete past log snippet */}
                                  <button
                                    onClick={() => {
                                      triggerAppConfirm(
                                        "Delete Solved Doubt?",
                                        "Are you absolutely sure you want to permanently delete this solved doubt record from your offline history?",
                                        () => {
                                          setVault(prev => prev.filter(v => v.id !== item.id));
                                        }
                                      );
                                    }}
                                    className="p-1 hover:bg-red-100 hover:text-red-700 rounded text-slate-500 transition-colors cursor-pointer"
                                    title="Remove record"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
 
                              <div className="space-y-2">
                                <p className="font-extrabold text-[#111827] font-sans text-xs">
                                  ❓ Doubt: "{item.query}"
                                </p>
                                <div className="prose prose-sm leading-relaxed max-w-none text-[11px] text-slate-800 bg-white/80 p-3 rounded-xl border border-slate-200 max-h-60 overflow-y-auto select-text shadow-inner">
                                  <MarkdownContentWithSvg content={item.answer} />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    })()}
 
                  </div>
 
                  {/* Clean clear vault database actions */}
                  <div className="mt-8 border-t border-slate-100 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                      <button
                        type="button"
                        disabled={vault.length === 0}
                        onClick={() => {
                          handleExportPDF();
                          triggerAudioChime();
                        }}
                        className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-2.5 px-4.5 rounded-xl transition-all cursor-pointer inline-flex items-center justify-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm active:scale-98"
                      >
                        <Download className="w-3.5 h-3.5" /> Export PDF Study Guide
                      </button>
                      <span className="text-[11.5px] text-slate-500 text-center sm:text-left">
                        Durable LocalStorage caching. Does not disappear unless you wipe browser history.
                      </span>
                    </div>
                    <button
                      type="button"
                      disabled={vault.length === 0}
                      onClick={() => {
                        triggerAppConfirm(
                          "Flush Saved Vault Database?",
                          "Are you absolutely sure you want to flush and completely clear all your Saved Vault logs offline? This is irreversible!",
                          () => {
                            setVault([]);
                          }
                        );
                      }}
                      className="w-full sm:w-auto bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold py-2.5 px-4 rounded-xl transition-all cursor-pointer inline-flex items-center justify-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Flush Saved Vault Database
                    </button>
                  </div>
                </motion.div>
              )}

              {/* TAB 3: WEBSITE PPT DECK SLIDESHOW */}
              {activeTab === 'presentation' && (
                <motion.div
                  key="presentation-panel"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="max-w-2xl mx-auto"
                >
                  <ClearDoubtPresentation onStartLiveDemo={() => setActiveTab('ask')} />
                  <p className="text-[11px] text-slate-500 font-mono text-center mt-3 leading-normal max-w-md mx-auto">
                    Note: Slides highlights original features, metaphors, vector SVG generators, and school support. Founded by **Shanmuka** for anxious students.
                  </p>
                </motion.div>
              )}

              {/* TAB 4: PRESENTER MONITOR (ADMINISTRATOR TAB) */}
              {activeTab === 'admin' && isLoggedIn && canSeeAdminTab(email) && (
                <motion.div
                  key="admin-panel"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white border border-red-200 p-6 rounded-2xl shadow-sm text-left max-w-4xl mx-auto flex flex-col justify-between min-h-[460px]"
                >
                  <div>
                    <div className="flex items-center gap-2 text-red-700 font-bold text-xs uppercase tracking-widest mb-1.5 font-mono">
                      <Shield className="w-4 h-4 text-red-800" /> Private Administration Gate
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-900 border-b border-slate-100 pb-3 mb-4 leading-normal">
                      CleardoubtAI Presenter Monitor
                    </h3>

                    <p className="text-xs text-slate-600 mb-5 leading-relaxed">
                      Welcome to your private study session and presence logs administrator dashboard!
                    </p>

                    {/* Authenticator Form for Administrator rights */}
                    {!adminData && (
                      <div className="bg-red-50/50 rounded-xl p-4 border border-red-200 max-w-md mb-6">
                        <h4 className="text-[11px] font-black uppercase text-red-950 mb-3 tracking-wider font-mono">Input Private Registered Owner Security Code</h4>
                        <form onSubmit={fetchAdminLogs} className="flex gap-2">
                          <input
                            type="password"
                            placeholder="Enter Security Code"
                            value={adminEmail}
                            onChange={(e) => setAdminEmail(e.target.value)}
                            className="bg-white border border-slate-300 focus:border-red-700 focus:outline-[#c25e17] rounded-lg px-3 py-2 text-xs font-semibold outline-none flex-grow text-slate-900"
                          />
                          <button
                            type="submit"
                            disabled={isLoadingAdmin}
                            className="bg-[#c25e17] hover:bg-[#a04e12] text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1 shrink-0"
                          >
                            {isLoadingAdmin ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sliders className="w-3.5 h-3.5" />}
                            Verify Code
                          </button>
                        </form>
                        <span className="text-[10px] text-slate-500 mt-1.5 block leading-normal italic">
                          Tip: If you logged in with the registered Administrator credentials on the first greeting banner, this verifies automatically!
                        </span>
                      </div>
                    )}

                    {/* Action messages */}
                    {adminError && (
                      <div className="mb-4 p-3.5 bg-red-100 border border-red-300 text-red-950 rounded-lg text-xs font-semibold leading-normal">
                        🚨 Access Refused: Only the registered developer/proctor is authorized to inspect server payload variables.
                      </div>
                    )}

                    {adminSuccessMessage && (
                      <div className="mb-4 p-3.5 bg-emerald-100 border border-emerald-300 text-emerald-950 rounded-lg text-xs font-semibold leading-normal">
                        ✨ Message: {adminSuccessMessage}
                      </div>
                    )}

                    {/* Displays Audit Logs details if retrieved */}
                    {adminData && (
                      <div className="space-y-6 animate-pulse">
                        
                        {/* Users registered list */}
                        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                          <div className="bg-slate-100 p-3 px-4 border-b border-slate-200 flex justify-between items-center">
                            <span className="text-xs font-bold text-slate-800 font-mono uppercase tracking-wider">Registered Students Directory ({adminData.usersCount || 0})</span>
                            <span className="text-[10px] text-slate-500 font-mono">Last updated live</span>
                          </div>
                          
                          <div className="max-h-52 overflow-y-auto divide-y divide-slate-200">
                            {adminData.users.length === 0 ? (
                              <p className="p-4 text-xs italic text-slate-500">No students recorded in database yet.</p>
                            ) : (
                              adminData.users.map((item, idx) => (
                                <div key={idx} className="p-3 text-xs flex justify-between items-center hover:bg-slate-50 transition-colors font-medium">
                                  <div>
                                    <p className="font-bold text-slate-900">{item.name || "Unnamed Student"}</p>
                                    <p className="text-[10px] text-slate-500 font-mono">{item.email}</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-[10px] text-slate-800 font-mono">{item.phone}</p>
                                    <p className="text-[9px] text-slate-400 font-mono">{new Date(item.createdAt).toLocaleDateString()}</p>
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        </div>

                        {/* Search queries log list */}
                        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                          <div className="bg-slate-100 p-3 px-4 border-b border-slate-200 flex justify-between items-center">
                            <span className="text-xs font-bold text-slate-800 font-mono uppercase tracking-wider">Doubts Solver Audit Logs ({adminData.searchesCount || 0})</span>
                            <span className="text-[10px] text-slate-500 font-mono font-bold text-emerald-800">SSL proxy active</span>
                          </div>

                          <div className="max-h-60 overflow-y-auto divide-y divide-slate-200">
                            {adminData.searches.length === 0 ? (
                              <p className="p-4 text-xs italic text-slate-500">No search logs processed in current database logs.</p>
                            ) : (
                              adminData.searches.slice().reverse().map((item, idx) => (
                                <div key={idx} className="p-4 text-xs hover:bg-slate-50 transition-colors space-y-1">
                                  <div className="flex justify-between items-center mb-1 flex-wrap gap-2">
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-[10px] bg-indigo-100 text-indigo-800 font-bold px-1.5 py-0.5 rounded uppercase font-mono">{item.subject}</span>
                                      <span className="text-[10px] bg-slate-200 text-slate-800 font-bold px-1.5 py-0.5 rounded uppercase font-mono">{item.mode}</span>
                                    </div>
                                    <span className="text-[9px] text-slate-400 font-mono">{new Date(item.timestamp).toLocaleString()}</span>
                                  </div>
                                  <p className="font-extrabold text-slate-900 leading-tight">Student: <span className="font-mono text-[10.5px] font-bold text-slate-600">{item.email}</span></p>
                                  <p className="font-bold text-slate-800 leading-relaxed italic">❓ Query: "{item.query}"</p>
                                  <div className="text-[10.5px] text-slate-600 bg-white p-2 rounded border border-slate-200 font-mono max-h-24 overflow-y-auto mt-2 select-all leading-normal whitespace-pre-wrap">
                                    {item.answer}
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        </div>

                        {/* Security Incident Locks and Violations Directory */}
                        <div className="bg-red-50/50 rounded-xl border border-red-200 overflow-hidden">
                          <div className="bg-red-100 p-3 px-4 border-b border-red-200 flex justify-between items-center">
                            <span className="text-xs font-black text-red-950 font-mono uppercase tracking-wider flex items-center gap-1.5 animate-pulse">
                              <AlertTriangle className="w-3.5 h-3.5 text-red-700" /> Security Threat Blocklist &amp; Logs ({adminData.securityViolations?.length || 0})
                            </span>
                            <span className="text-[10px] text-red-800 font-bold font-mono">Dispatches active</span>
                          </div>

                          <div className="max-h-60 overflow-y-auto divide-y divide-red-200">
                            {!adminData.securityViolations || adminData.securityViolations.length === 0 ? (
                              <p className="p-4 text-xs italic text-red-900/65 bg-white">No security incidents logged. Access logs stable.</p>
                            ) : (
                              adminData.securityViolations.slice().reverse().map((item: any, idx: number) => (
                                <div key={idx} className="p-4 text-xs bg-white hover:bg-red-50/20 transition-colors space-y-1">
                                  <div className="flex justify-between items-center mb-1 flex-wrap gap-2">
                                    <span className="text-[10px] bg-red-100 text-red-900 border border-red-200 font-black px-1.5 py-0.5 rounded uppercase font-mono">
                                      Flagged Blocked Account
                                    </span>
                                    <span className="text-[9px] text-slate-500 font-mono">{new Date(item.timestamp).toLocaleString()}</span>
                                  </div>
                                  <p className="font-extrabold text-slate-900">Name: <span className="font-normal font-mono text-slate-700">{item.name}</span></p>
                                  <p className="font-extrabold text-slate-950 font-mono">Email: <span className="font-bold text-red-700">{item.email}</span></p>
                                  <p className="font-extrabold text-slate-950 font-mono">Phone contact: <span className="font-bold text-red-700">{item.phone}</span></p>
                                  <p className="font-bold text-red-900 italic font-mono bg-red-50 p-1.5 rounded border border-red-100 mt-1 leading-normal">
                                    Tried Code: "{item.attemptedCode}" &rarr; Triggered instant permanent lockouts &amp; SMS/Email notifications (9029376519, 8691940838, shanmukasahith.pgdm@gmail.com).
                                  </p>
                                </div>
                              ))
                            )}
                          </div>
                        </div>

                      </div>
                    )}

                  </div>

                  {/* Destructive Clear Actions */}
                  <div className="mt-8 border-t border-red-200 pt-5 flex items-center justify-between flex-wrap gap-4 shrink-0">
                    <span className="text-[11px] text-slate-500 font-mono">
                      Database status checks verified. Wipe actions only accessible if credential checks validate on-request.
                    </span>
                    <button
                      type="button"
                      onClick={handleClearDatabase}
                      className="bg-red-700 hover:bg-red-800 active:bg-red-900 text-white font-extrabold text-xs uppercase px-4 py-3 rounded-xl transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2 border border-red-800 cursor-pointer select-none active:scale-98"
                      title="Wipe and truncate persistent database tables"
                    >
                      <Trash2 className="w-4 h-4 text-white" />
                      <span>Truncate Persistent Database Tables</span>
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </div>
      )}

      {/* PROFILE & CHIMES SETTINGS MODAL */}
      <AnimatePresence>
        {isNotificationsOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto py-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xl max-w-md w-full text-left my-auto shrink-0 flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="bg-[#c25e17] text-white p-5 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-white animate-spin-slow" />
                  <h3 className="font-extrabold text-sm tracking-tight">Student Profile & App Settings</h3>
                </div>
                <button
                  onClick={() => setIsNotificationsOpen(false)}
                  className="p-1 rounded-lg hover:bg-white/10 text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
               </div>

              {/* Body */}
              <div className="p-6 space-y-6 overflow-y-auto flex-grow">
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2 font-sans">
                    Change Student Name
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={tempName}
                      onChange={(e) => {
                        const newName = e.target.value;
                        setTempName(newName);
                        setName(newName);
                        localStorage.setItem("student_name", newName);
                      }}
                      placeholder="e.g. Shanmuka Sahith"
                      className="flex-grow bg-slate-50 border border-slate-200 focus:border-[#c25e17] focus:bg-white focus:outline-none rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-900"
                    />
                    <button
                      onClick={() => {
                        const trimmedName = tempName.trim();
                        setName(trimmedName);
                        localStorage.setItem("student_name", trimmedName);
                        triggerAudioChime();
                        setIsNotificationsOpen(false);
                      }}
                      className="bg-[#c25e17] hover:bg-[#a04a10] text-white font-extrabold text-xs px-4 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                  <span className="text-[9.5px] text-slate-400 mt-1.5 block leading-normal">
                    * Name changes take effect in real-time instantly as you type. Click Done or X to dismiss.
                  </span>
                </div>

                <div className="border-t border-slate-100 pt-4">
                  <AvatarSelection 
                    selectedAvatar={avatar} 
                    onSelectAvatar={(url) => { 
                      setAvatar(url); 
                      localStorage.setItem("student_avatar", url); 
                    }} 
                    triggerChime={triggerAudioChime} 
                  />
                </div>

                <div className="border-t border-slate-100 pt-4 space-y-3">
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest block font-sans">
                    Email Settings & Session Logs
                  </h4>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-[11px] space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium font-sans">Connected Email:</span>
                      <span className="font-mono text-slate-800 font-bold">{email || "anonymous"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium font-sans">Contact Phone:</span>
                      <span className="font-mono text-slate-800 font-bold">{phone || "unlinked"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium font-sans">Active Cohort:</span>
                      <span className="text-slate-800 font-bold">{studentClass}</span>
                    </div>
                  </div>
                </div>

                {/* Privacy Guarantee Info */}
                <div className="bg-emerald-50/50 border border-emerald-200/50 p-3.5 rounded-2xl flex items-start gap-2.5 text-xs">
                  <Shield className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="space-y-1 text-slate-700">
                    <p className="font-bold text-emerald-700">100% Privacy Protected Session</p>
                    <p className="text-[10.5px] leading-relaxed">
                      All your activities and workspace questions are stored locally on your own machine. We have removed the dynamic webcam verification fully, ensuring you enjoy a peaceful and spying-free study room!
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-slate-50 p-4 border-t border-slate-100 flex items-center justify-between gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    triggerAppConfirm(
                      "Log Out of Account?",
                      "Are you sure you want to sign out? Your session details will be cleared and you can enter fresh student details next time.",
                      () => {
                        handleSignOut();
                      }
                    );
                  }}
                  className="bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-bold text-xs px-3.5 py-2 rounded-xl transition-all cursor-pointer inline-flex items-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>
                <button
                  onClick={() => setIsNotificationsOpen(false)}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer"
                >
                  Close Settings
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ₹1 PAYMENT / TRANSACTION MODAL */}
      <AnimatePresence>
        {isPaymentModalOpen && (
          <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto py-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xl max-w-md w-full text-left my-auto shrink-0 flex flex-col"
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-amber-700 to-amber-800 text-white p-5 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center border border-white/20">
                    <Sparkles className="w-5 h-5 text-amber-200" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm tracking-tight">₹1 for 2 Years Subscription</h3>
                    <p className="text-[10px] text-amber-200 font-medium">Student Academic Ultra Unlimited Plan</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPaymentModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-4">
                {/* Plan Summary Card */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                  <div className="flex justify-between items-baseline border-b border-slate-200 pb-2.5">
                    <div>
                      <span className="text-xs font-bold text-slate-500 block uppercase tracking-wider font-mono">Plan Fee</span>
                      <span className="text-2xl font-black text-slate-900 font-sans">₹1.00 <span className="text-xs font-semibold text-slate-500">INR</span></span>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-2.5 py-1 rounded-full border border-emerald-300">
                      Valid for 2 Years (730 Days)
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between text-slate-700 font-medium">
                      <span>Questions Quota:</span>
                      <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">UNLIMITED</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-700 font-medium">
                      <span>Photo Uploads Quota:</span>
                      <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">UNLIMITED</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-700 font-medium">
                      <span>Customer Support Email:</span>
                      <span className="font-semibold text-slate-800">shanmukasahith.pgdm@gmail.com</span>
                    </div>
                  </div>
                </div>

                {/* Non-Disturbance Policy Callout */}
                <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-3.5 flex gap-3 items-start">
                  <Shield className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  <div className="text-xs text-amber-900 leading-relaxed font-medium">
                    <p className="font-bold mb-0.5">Zero Disturbance Guarantee</p>
                    <p className="text-[11px] text-amber-800">
                      If you choose not to pay ₹1, you can still ask <strong>10,00,000 questions</strong> and upload <strong>10,00,000 photos</strong> on the standard free tier. We will <u>NEVER</u> disturb you, interrupt your studies, show popups, or mandate payment.
                    </p>
                  </div>
                </div>

                {/* UPI Beneficiary & Instant Payment Box */}
                <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 space-y-4 text-left">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-widest">Destination UPI Account (Pay ₹1)</p>
                      <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono px-2 py-0.5 rounded font-bold">Official UPI</span>
                    </div>

                    <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-slate-400 block font-mono">Pay ₹1 to UPI ID</span>
                        <span className="font-extrabold text-amber-300 text-base font-mono tracking-tight select-all">
                          swathi.her@okkicici.com
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyText("swathi.her@okkicici.com", "upi_id")}
                        className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
                      >
                        {copiedId === "upi_id" ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy UPI ID</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {isSubscribedVip ? (
                    <div className="p-3.5 bg-emerald-950/90 border border-emerald-800/80 rounded-xl text-emerald-300 text-xs font-medium space-y-2">
                      <div className="flex items-center justify-between font-bold text-emerald-200">
                        <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> ₹1 VIP Subscription Active</span>
                        <span className="text-[10px] bg-emerald-900/60 px-2 py-0.5 rounded border border-emerald-700">730 Days</span>
                      </div>
                      <div className="text-[11px] space-y-1 pt-1 border-t border-emerald-900/80 text-emerald-100">
                        <p><strong>Paid To UPI ID:</strong> <span className="font-mono text-white">swathi.her@okkicici.com</span></p>
                        <p><strong>Security Dispatch:</strong> <span className="font-mono text-amber-300">+91 8691940838</span></p>
                        {transactionRef && <p><strong>Transaction Ref / UTR:</strong> <span className="font-mono text-white">{transactionRef}</span></p>}
                        <p className="text-[10px] text-emerald-400/90 font-normal">Activated on {subscriptionDate || "Today"} • Unlimited Questions &amp; Photos Enabled</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3.5 pt-2 border-t border-slate-800">
                      {/* Step 1: QR & App Launch */}
                      <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center gap-4">
                        <div className="bg-white p-2 rounded-xl shrink-0 shadow-sm text-center">
                          <img
                            src="https://api.qrserver.com/v1/create-qr-code/?size=130x130&data=upi%3A%2F%2Fpay%3Fpa%3Dswathi.her%40okkicici.com%26pn%3DCleardoubtAI%26am%3D1%26cu%3DINR"
                            alt="Scan QR code to pay ₹1 to swathi.her@okkicici.com"
                            className="w-28 h-28 object-contain rounded"
                          />
                          <span className="text-[9px] font-mono font-bold text-slate-800 block mt-1">Scan to Pay ₹1</span>
                        </div>

                        <div className="space-y-2 text-center sm:text-left flex-1">
                          <span className="text-xs font-bold text-slate-200 block">
                            How to get Pro Access:
                          </span>
                          <ol className="text-[11px] text-slate-300 space-y-1 list-decimal list-inside font-sans">
                            <li>Scan QR or copy <strong className="text-amber-300 font-mono">swathi.her@okkicici.com</strong></li>
                            <li>Pay ₹1 using Google Pay, PhonePe, Paytm, or BHIM</li>
                            <li>Payment is securely verified via UPI webhook dispatch</li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center text-xs pt-1">
                  <button
                    type="button"
                    onClick={() => setIsPaymentModalOpen(false)}
                    className="text-slate-500 hover:text-slate-800 font-bold py-2 cursor-pointer"
                  >
                    {isSubscribedVip ? "Close" : "Continue on Free Tier (10,00,000 Free Questions & Photos)"}
                  </button>
                  {isSubscribedVip && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsSubscribedVip(false);
                        setSubscriptionDate("");
                        localStorage.removeItem("is_subscribed_vip");
                        localStorage.removeItem("subscription_date");
                        triggerAudioChime();
                      }}
                      className="text-red-500 hover:text-red-700 font-semibold text-[11px] underline cursor-pointer"
                    >
                      Reset Subscription
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* REAL-TIME SUBSCRIPTION AUTHORIZATION MODAL FOR swathi.her@okkicici.com & 8691940838 */}
      <AnimatePresence>
        {isAuthDecisionModalOpen && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto py-6 select-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              className="bg-white rounded-3xl border-2 border-amber-500/40 overflow-hidden shadow-2xl max-w-lg w-full text-left my-auto shrink-0 flex flex-col font-sans"
            >
              {/* Modal Top Header */}
              <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 text-white p-5 flex justify-between items-center border-b border-amber-500/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-inner">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm sm:text-base tracking-tight text-amber-300">
                      Subscription Authorization Dispatch
                    </h3>
                    <p className="text-[10px] text-slate-300 font-mono uppercase tracking-wider">
                      Target UPI: swathi.her@okkicici.com
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAuthDecisionModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-5">
                {/* Highlighted Admin & Dispatch Number Banner */}
                <div className="bg-amber-50 border-2 border-amber-300/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-black text-xl shadow-md shrink-0">
                      📞
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-amber-800 font-mono block">
                        Admin Dispatch &amp; Proctor Contact
                      </span>
                      <span className="text-xl sm:text-2xl font-black text-slate-950 font-mono tracking-tight select-all">
                        8691940838
                      </span>
                    </div>
                  </div>
                  <span className="bg-amber-200/70 text-amber-950 text-[10px] font-black uppercase px-2.5 py-1 rounded-full border border-amber-300 font-mono shrink-0">
                    Proctor Online
                  </span>
                </div>

                {/* The Central Question */}
                <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 text-center space-y-2">
                  <span className="text-[10.5px] font-black text-amber-400 tracking-wider uppercase font-mono">
                    LIVE SYSTEM PROMPT
                  </span>
                  <h2 className="text-lg sm:text-xl font-black text-white leading-snug tracking-tight">
                    "{authMessageText}"
                  </h2>
                  <p className="text-xs text-slate-300 font-medium">
                    Candidate: <strong className="text-amber-300 font-bold">{name || "Student"}</strong> ({phone || "8691940838"}) • Paid <strong className="text-emerald-400 font-bold">₹1.00</strong> to <strong className="text-amber-200 font-mono">swathi.her@okkicici.com</strong>
                  </p>
                </div>

                {/* Countdown & Decision Display */}
                {authDecisionState === 'prompting' ? (
                  <div className="space-y-4">
                    {/* Visual 10s Timer */}
                    <div className="bg-slate-100 border border-slate-200 rounded-2xl p-4 text-center space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                        <span className="flex items-center gap-1.5 text-amber-800">
                          <Clock className="w-4 h-4 animate-spin text-amber-600" />
                          <span>10-Second Auto-Response Countdown:</span>
                        </span>
                        <span className="font-mono text-base font-black text-amber-700 bg-amber-100 px-3 py-0.5 rounded-lg border border-amber-300">
                          {authCountdown}s remaining
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 via-emerald-500 to-teal-500 transition-all duration-1000 ease-linear rounded-full"
                          style={{ width: `${(authCountdown / 10) * 100}%` }}
                        />
                      </div>

                      <p className="text-[11px] text-slate-500 font-medium">
                        If no manual response is provided, the system will automatically say <strong>"Yes"</strong> at 0s and grant the 2-Year VIP Unlimited Subscription.
                      </p>
                    </div>

                    {/* Manual Response Actions */}
                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <button
                        type="button"
                        onClick={() => handleAutoApproveSubscription(true)}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 text-xs sm:text-sm"
                      >
                        <CheckCircle2 className="w-4.5 h-4.5 text-emerald-200" />
                        <span>Yes (Approve Now)</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleDeclineSubscription}
                        className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-4 rounded-xl border border-slate-300 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 text-xs sm:text-sm"
                      >
                        <X className="w-4 h-4 text-slate-500" />
                        <span>Decline</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-5 bg-gradient-to-br from-emerald-950 to-slate-900 border-2 border-emerald-500 rounded-2xl text-center space-y-3 text-white">
                    <div className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-300 shadow-lg">
                      <Sparkles className="w-8 h-8 animate-pulse text-emerald-300" />
                    </div>
                    <div>
                      <span className="text-[11px] font-black uppercase font-mono tracking-widest text-emerald-400 block">
                        AUTO-DECISION EXECUTED
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-emerald-200 tracking-tight mt-0.5">
                        🎉 "YES!" Subscription Granted
                      </h3>
                      <p className="text-xs text-slate-300 mt-1">
                        Ultra VIP Academic 2-Year Plan is now active for <strong className="text-white font-mono">8691940838</strong> / {email || "Student"}.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {appModal.isOpen && (
          <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs select-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xl max-w-sm w-full text-left p-6 space-y-4"
            >
              <div className="flex items-start gap-3.5">
                <div className={`p-3 rounded-full ${appModal.type === "confirm" ? "bg-amber-50 text-amber-600" : "bg-red-50 text-red-600"} shrink-0`}>
                  <AlertTriangle className="w-5 h-5 font-bold" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-extrabold text-slate-900 text-sm leading-tight">{appModal.title}</h4>
                  <p className="text-slate-500 text-[11.5px] leading-relaxed font-sans">{appModal.message}</p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                {appModal.type === "confirm" && (
                  <button
                    onClick={() => setAppModal(prev => ({ ...prev, isOpen: false }))}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold py-2 px-4 rounded-xl transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                )}
                <button
                  onClick={() => {
                    if (appModal.onConfirm) {
                      appModal.onConfirm();
                    }
                    setAppModal(prev => ({ ...prev, isOpen: false }));
                    triggerAudioChime();
                  }}
                  className={`${appModal.type === "confirm" ? "bg-indigo-600 hover:bg-indigo-700" : "bg-indigo-600 hover:bg-indigo-700"} text-white text-[11px] font-bold py-2 px-4.5 rounded-xl transition-all cursor-pointer shadow-sm active:scale-98`}
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* REAL-TIME IN-APP LIVE CAMERA MODAL (Bypasses Native OS gallery or folder selection picker completely) */}
      <AnimatePresence>
        {isAppCameraOpen && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm select-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 20 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl max-w-md w-full flex flex-col h-[520px] relative text-left"
            >
              {/* Top Bar info */}
              <div className="bg-slate-950 px-5 py-4 flex items-center justify-between border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                  <span className="text-[10px] bg-red-950 text-red-400 font-extrabold px-2 py-0.5 rounded tracking-widest uppercase font-mono border border-red-900/40">
                    Live Camera Mode
                  </span>
                </div>
                <button
                  onClick={stopAppCamera}
                  className="w-7 h-7 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Live Viewport Area */}
              <div className="flex-grow bg-black relative flex items-center justify-center overflow-hidden">
                {cameraHasError ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-slate-900 text-slate-200 space-y-4">
                    <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-amber-500 border border-slate-700">
                      <AlertTriangle className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-extrabold text-sm text-slate-100 font-sans">Live Camera Stream Unavailable</h4>
                      <p className="text-slate-400 text-xs leading-relaxed max-w-xs mx-auto font-sans">
                        Your browser or sandbox frame is blocking the direct webcam stream. No worries at all! You can still snap a real-time photo with your device camera:
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        stopAppCamera();
                        document.getElementById("cam-import-btn")?.click();
                      }}
                      className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs py-2.5 px-5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-sm shadow-amber-600/10 active:scale-95"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Launch Native System Camera</span>
                    </button>
                    <button
                      type="button"
                      onClick={stopAppCamera}
                      className="text-slate-500 hover:text-slate-400 text-xs font-semibold underline"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <>
                    <video
                      ref={appVideoRef}
                      className={`w-full h-full object-cover ${appCameraMode === "user" ? "scale-x-[-1]" : ""}`}
                      playsInline
                      muted
                    />
                    
                    {/* Floating camera targeting lines */}
                    <div className="absolute inset-8 pointer-events-none border border-white/10 rounded-2xl flex items-center justify-center">
                      <div className="w-10 h-0.5 bg-white/20 absolute" />
                      <div className="h-10 w-0.5 bg-white/20 absolute" />
                    </div>
                    
                    {/* Overlay guides */}
                    <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs text-[9px] font-mono text-slate-400 px-2 py-0.5 rounded border border-white/5">
                      FACING: {appCameraMode.toUpperCase()}
                    </div>
                  </>
                )}
              </div>

              {/* Bottom Controls Panel */}
              {!cameraHasError && (
                <div className="bg-slate-950 p-6 flex flex-col gap-4 border-t border-slate-800/80 shrink-0">
                  <p className="text-[11px] text-slate-400 text-center font-medium font-sans leading-snug">
                    Align your question, worksheet, or textbook problem within the frame and capture.
                  </p>
                  
                  <div className="flex items-center justify-between gap-4 mt-1">
                    {/* Cancel / Back button */}
                    <button
                      type="button"
                      onClick={stopAppCamera}
                      className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold py-3 px-4 rounded-xl transition-colors cursor-pointer text-center"
                    >
                      Cancel
                    </button>

                    {/* Primary capture trigger - Glowing concentric red rings */}
                    <button
                      type="button"
                      onClick={captureAppPhoto}
                      className="w-16 h-16 rounded-full bg-white flex items-center justify-center cursor-pointer active:scale-95 transition-all relative border-4 border-slate-900 shadow-[0_0_15px_rgba(255,255,255,0.25)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]"
                      title="Capture image"
                    >
                      <div className="w-11 h-11 rounded-full bg-red-600 hover:bg-red-500 transition-colors duration-150 flex items-center justify-center text-white font-black">
                        <Camera className="w-5 h-5 text-white" />
                      </div>
                    </button>

                    {/* Switch lens button */}
                    <button
                      type="button"
                      onClick={() => {
                        triggerAudioChime();
                        setAppCameraMode(prev => prev === "environment" ? "user" : "environment");
                      }}
                      className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold py-3 px-4 rounded-xl transition-colors cursor-pointer text-center flex items-center justify-center gap-1.5"
                      title="Switch camera lens"
                    >
                      <RefreshCw className="w-3.5 h-3.5 animate-pulse" />
                      <span>Switch Lens</span>
                    </button>
                  </div>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Cozy Aesthetic Footer */}
      <footer className="border-t border-amber-900/10 py-5 bg-white text-center text-xs text-slate-500 select-none shrink-0 mt-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-medium text-slate-500 font-sans">
            © 2026 CleardoubtAI • Securely Engineered with heart by <span className="font-bold text-slate-700">Shanmuka</span>
          </p>
          <div className="flex items-center gap-4 text-[10.5px] font-medium font-sans">
            <span className="text-[#E25555] animate-pulse">❤ Private Secondary Hub for Introverts</span>
            <span className="text-slate-400">|</span>
            <a href="mailto:shanmukasahith.pgdm@gmail.com" className="hover:text-amber-700 transition-colors">Support Contact</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
