import { IsoDocument, SiteConfig } from './types';

export const MOCK_DOCUMENTS: IsoDocument[] = [
  {
    id: 'doc_1',
    title: 'ISO 9001:2015 Implementation Checklist',
    code: 'ISO 9001',
    description: 'A comprehensive step-by-step checklist to prepare for your Quality Management System audit.',
    price: 0,
    category: 'Quality',
    fileType: 'PDF',
    downloadUrl: '#'
  },
  {
    id: 'doc_2',
    title: 'ISO 27001:2022 ISMS Policy Template',
    code: 'ISO 27001',
    description: 'Complete Information Security Management System policy templates compliant with the latest 2022 standards.',
    price: 49.99,
    category: 'Security',
    fileType: 'DOCX',
    downloadUrl: '#',
    paymentLink: 'https://stripe.com/docs/payment-links' // Mock link
  },
  {
    id: 'doc_3',
    title: 'Internal Audit Plan - ISO 14001',
    code: 'ISO 14001',
    description: 'Templates and scheduling tools for Environmental Management System internal audits.',
    price: 29.99,
    category: 'Environment',
    fileType: 'XLSX',
    downloadUrl: '#',
    paymentLink: 'https://stripe.com/docs/payment-links'
  },
  {
    id: 'doc_4',
    title: 'Risk Assessment Matrix (ISO 31000 aligned)',
    code: 'ISO 31000',
    description: 'A free tool to categorize and visualize enterprise risks.',
    price: 0,
    category: 'Safety',
    fileType: 'XLSX',
    downloadUrl: '#'
  },
  {
    id: 'doc_5',
    title: 'GDPR & ISO 27701 Mapping Guide',
    code: 'ISO 27701',
    description: 'Cross-reference guide between General Data Protection Regulation and Privacy Information Management.',
    price: 15.00,
    category: 'Security',
    fileType: 'PDF',
    downloadUrl: '#',
    paymentLink: 'https://stripe.com/docs/payment-links'
  },
  {
    id: 'doc_6',
    title: 'OH&S Manual - ISO 45001',
    code: 'ISO 45001',
    description: 'Full operational manual for Occupational Health and Safety.',
    price: 89.99,
    category: 'Safety',
    fileType: 'DOCX',
    downloadUrl: '#',
    paymentLink: 'https://stripe.com/docs/payment-links'
  }
];

export const SYSTEM_INSTRUCTION = `You are an expert ISO Consultant for "ISO Nexus". 
Your goal is to assist users in understanding International Standards (like ISO 9001, 27001, 14001). 
Be professional, concise, and helpful. 
If asked about documents, refer to the "Documents" section of this website. 
If asked about implementation, provide high-level steps.
Do not provide full copyrighted standard text, but explain the clauses and requirements clearly.`;

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  heroHeadline: 'Standardize your success with',
  heroHeadlineHighlight: 'ISO Nexus',
  heroSubtitle: 'Your premier destination for ISO compliance. We combine expert knowledge, secure document management, and AI-driven consultation to streamline your certification journey.',
  heroImageUrl: 'https://picsum.photos/800/600',
  heroImageOpacity: 60,
  heroButtonText: 'Browse Documents',
  aboutTitle: 'About ISO Nexus',
  aboutText: `ISO Nexus was founded with a single mission: to demystify International Standards for small and medium-sized enterprises. We believe that achieving ISO certification shouldn't require an army of consultants.

Our platform combines high-quality, auditor-approved documentation with cutting-edge web technology. We focus on User Experience (UX) to ensure that finding the right document is intuitive, and we employ robust Content Management Systems (CMS) to keep our library up-to-date with the latest standard revisions.

Our Technology:
Built on a modern stack using React and Tailwind CSS, our platform is designed for performance and security. We utilize AI to provide real-time assistance, helping you interpret complex clauses instantly.`
};