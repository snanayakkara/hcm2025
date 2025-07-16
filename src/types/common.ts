import { ReactNode } from 'react';

// Service and procedure types
export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  keywords: string[];
  preparation?: string;
  locations?: string[];
  cost?: string;
}

export interface ProcedureItem {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  keywords: string[];
  preparation?: string;
  locations?: string[];
  cost?: string;
}

// Search related types
export interface SearchResult {
  type: 'service' | 'doctor' | 'location' | 'page' | 'condition' | 'procedure';
  title: string;
  description: string;
  section: string;
  keywords: string[];
  url?: string;
}

// Doctor and staff types
export interface Doctor {
  id: string;
  name: string;
  title: string;
  description: string;
  specializations: string[];
  image: string;
  color: string;
  mobileColor: string;
  bio?: string;
  qualifications?: string[];
  interests?: string[];
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
  specialties?: string[];
}

// Form and input types
export interface FormData {
  [key: string]: string | number | boolean;
}

export interface ContactFormData extends FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface PatientFormData extends FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  medicare: string;
  privateHealth: string;
  reason: string;
  urgency: 'routine' | 'urgent' | 'emergency';
}

// Component prop types
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

// Animation and UI types
export interface AnimationConfig {
  duration: number;
  easing: string;
  delay?: number;
}

export interface IntersectionObserverConfig {
  threshold: number;
  rootMargin: string;
}

// PDF generation types
export interface PDFGenerationOptions {
  font?: string;
  size?: number;
  color?: string;
  maxWidth?: number;
  margin?: number;
  pageSize?: 'A4' | 'letter';
}

// Mobile detection types
export interface MobileDetectionResult {
  isMobile: boolean;
  screenWidth: number;
  isTablet: boolean;
  orientation: 'portrait' | 'landscape';
}

// Navigation types
export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  section?: string;
  isActive?: boolean;
}

// Location and contact types
export interface LocationInfo {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  services: string[];
  coordinates?: {
    lat: number;
    lng: number;
  };
}

// FAQ types
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
}

// Error handling types
export interface ErrorInfo {
  message: string;
  code?: string;
  details?: string;
  timestamp?: Date;
}

// Event handler types
export type EventHandler<T = Event> = (event: T) => void;
export type ClickHandler = EventHandler<React.MouseEvent>;
export type ChangeHandler = EventHandler<React.ChangeEvent<HTMLInputElement>>;
export type FormHandler = EventHandler<React.FormEvent<HTMLFormElement>>;

// Generic utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequireOnly<T, K extends keyof T> = Pick<T, K> & Partial<Omit<T, K>>;