export interface IsoDocument {
  id: string;
  title: string;
  code: string; // e.g., ISO 9001:2015
  description: string;
  price: number; // 0 for free
  category: 'Quality' | 'Security' | 'Environment' | 'Safety';
  fileType: 'PDF' | 'DOCX' | 'XLSX';
  downloadUrl: string; // Mock URL
  paymentLink?: string; // URL for Stripe/PayPal payment
}

export enum PageView {
  HOME = 'HOME',
  DOCUMENTS = 'DOCUMENTS',
  ABOUT = 'ABOUT',
  CONTACT = 'CONTACT',
  ADMIN = 'ADMIN'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface UserState {
  purchasedDocIds: string[];
}

export interface SiteConfig {
  heroHeadline: string;
  heroHeadlineHighlight: string;
  heroSubtitle: string;
  heroImageUrl: string;
  heroImageOpacity?: number;
  heroButtonText: string;
  aboutTitle: string;
  aboutText: string;
}