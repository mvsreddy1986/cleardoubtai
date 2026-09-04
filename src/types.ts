import { User as FirebaseUser } from "firebase/auth";

export interface ClassroomUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export type LearningMode = 'normal' | 'study' | 'exam' | 'time' | 'homework' | 'lazy';

export type CleardoubtModel = '2.0' | '3.0' | '4.0' | '5.0';
export type CleardotModel = CleardoubtModel;

export interface PastDoubt {
  id: string;
  query: string;
  answer: string;
  subject: string;
  mode: LearningMode;
  model?: CleardoubtModel;
  timestamp: string;
}

export interface ChatMessageItem {
  id: string;
  query: string;
  answer: string | null;
  subject: string;
  mode: LearningMode;
  model?: CleardoubtModel;
  timestamp: string;
  attachments?: Array<{ name: string; mimeType: string; data: string }>;
  isQuerying?: boolean;
  thinkingStage?: string;
  thinkingSeconds?: number;
  error?: string | null;
}

export interface ChatHistoryItem {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}

export interface AppNotification {
  id: string;
  type: 'message' | 'friend_request' | 'announcement';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  sender?: string;
  status?: 'pending' | 'accepted' | 'declined' | 'replied';
  replyContent?: string;
}

export interface NotificationPreferences {
  allowMessages: boolean;
  allowFriendRequests: boolean;
  allowAnnouncements: boolean;
  soundAlert: boolean;
  toastInApp: boolean;
}

export interface SubjectOption {
  id: string;
  name: string;
  icon: string;
  theme: string;
}

export interface PresetDoubt {
  id: string;
  title: string;
  query: string;
  subjectId: string;
  description: string;
}

export interface StudentStats {
  totalStudents: number;
  totalDoubts: number;
  activeOnline: number;
}
