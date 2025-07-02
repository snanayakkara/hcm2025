import { z } from 'zod';

export const AddressSchema = z.object({
  line1: z.string().max(64, 'Address line 1 must be 64 characters or less'),
  suburb: z.string().max(32, 'Suburb must be 32 characters or less'),
  postcode: z.string().regex(/^\d{4}$/, 'Postcode must be 4 digits'),
  state: z.enum(['VIC', 'NSW', 'QLD', 'SA', 'WA', 'TAS', 'NT', 'ACT'])
});

export const MedicalHistorySchema = z.object({
  bp: z.boolean(),
  diabetes: z.boolean(),
  cholesterol: z.boolean(),
  af: z.boolean(),
  osa: z.boolean()
});

export const TestsSchema = z.object({
  echo: z.boolean(),
  holter: z.boolean(),
  angio: z.boolean(),
  surgery: z.boolean()
});

export const SmokingSchema = z.object({
  current: z.boolean(),
  past: z.boolean(),
  start: z.string().optional(),
  stop: z.string().optional()
});

export const NextOfKinSchema = z.object({
  name: z.string().optional(),
  relation: z.string().optional(),
  phone: z.string().regex(/^\+?[\d\s\-()]{10,15}$/, 'Please enter a valid phone number').optional().or(z.literal(''))
});

export const IntakeSchema = z.object({
  primarySymptom: z.string().optional(),
  medicalHistory: MedicalHistorySchema,
  medications: z.string().optional(),
  allergies: z.string().optional(),
  tests: TestsSchema,
  smoking: SmokingSchema,
  familyHistory: z.boolean(),
  nok: NextOfKinSchema,
  notes: z.string().optional()
});

export type Address = z.infer<typeof AddressSchema>;
export type MedicalHistory = z.infer<typeof MedicalHistorySchema>;
export type Tests = z.infer<typeof TestsSchema>;
export type Smoking = z.infer<typeof SmokingSchema>;
export type NextOfKin = z.infer<typeof NextOfKinSchema>;
export type IntakeForm = z.infer<typeof IntakeSchema>;

export interface IntakeState {
  data: Partial<IntakeForm>;
  currentStep: number;
  isValid: boolean;
  isDirty: boolean;
}

export type IntakeAction =
  | { type: 'UPDATE_DATA'; payload: Partial<IntakeForm> }
  | { type: 'SET_STEP'; payload: number }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'SET_VALID'; payload: boolean }
  | { type: 'RESET' }
  | { type: 'LOAD_DRAFT'; payload: Partial<IntakeForm> };

export interface WizardStep {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  isActive: boolean;
}

export const STORAGE_KEY = 'hcm2025_intake_draft';

export const CARD_TEST_DESCRIPTIONS = {
  echo: 'Echocardiogram - ultrasound of the heart to assess structure and function',
  holter: 'Holter monitor - 24-48 hour continuous heart rhythm monitoring',
  angio: 'Angiogram - X-ray imaging of blood vessels using contrast dye',
  surgery: 'Previous cardiac surgery including bypass, stents, or valve procedures'
} as const;