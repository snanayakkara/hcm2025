// Application constants

// Scroll and animation thresholds
export const SCROLL_THRESHOLD = 50;
export const SCROLL_SECTION_OFFSET = 100;
export const ANIMATION_DELAY_INCREMENT = 100;
export const SEARCH_DEBOUNCE_DELAY = 200;

// URLs and endpoints
export const TELEHEALTH_URL = 'https://doxy.me/hcm21';
export const MAIN_PHONE_NUMBER = '+61395081800';
export const EMAIL_ADDRESS = 'reception@heartclinicmelbourne.com.au';

// Doctor colors
export const DOCTOR_COLORS = {
  FREILICH: '#148792',
  NGU: '#4a787d', 
  VOSKOBOINIK: '#3bd7d6',
  NANAYAKKARA: '#2563eb',
  ROWE: '#059669'
} as const;

// Doctor mobile gradient colors
export const DOCTOR_MOBILE_COLORS = {
  FREILICH: 'from-primary-500 to-primary-600',
  NGU: 'from-slate-500 to-slate-600',
  VOSKOBOINIK: 'from-cyan-400 to-cyan-500', 
  NANAYAKKARA: 'from-blue-500 to-blue-600',
  ROWE: 'from-emerald-500 to-emerald-600'
} as const;

// Clinic locations
export const CLINIC_LOCATIONS = {
  MALVERN: {
    name: 'Malvern',
    address: '183 Wattletree Rd, Malvern VIC 3144',
    phone: '+61395081800',
    coordinates: { lat: -37.8569, lng: 145.0281 }
  },
  PAKENHAM: {
    name: 'Pakenham',
    address: 'Pakenham Specialist Centre',
    phone: '+61395081800',
    coordinates: { lat: -38.0708, lng: 145.4844 }
  },
  CLYDE: {
    name: 'Clyde',
    address: 'Clyde Medical Centre',
    phone: '+61395081800',
    coordinates: { lat: -38.1167, lng: 145.3167 }
  }
} as const;

// Animation durations (in milliseconds)
export const ANIMATION_DURATIONS = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
  VERY_SLOW: 1000
} as const;

// Search limits
export const SEARCH_RESULTS_LIMIT = 6;
export const SEARCH_MIN_QUERY_LENGTH = 2;

// Performance budgets
export const PERFORMANCE_BUDGETS = {
  RENDER_TIME_MS: 16, // 60fps budget
  SCROLL_RESPONSE_MS: 100,
  ANIMATION_COMPLETION_MS: 500,
  MEMORY_GROWTH_MB: 1
} as const;

// Z-index layers
export const Z_INDEX = {
  BACKGROUND: 0,
  CONTENT: 10,
  HEADER: 20,
  DROPDOWN: 30,
  MODAL: 40,
  TOAST: 50
} as const;

// Breakpoints (matches Tailwind defaults)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536
} as const;

// Form validation
export const VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^(\+61|0)[2-9]\d{8}$/,
  MEDICARE: /^\d{4}\s?\d{5}\s?\d{1}$/
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  PWA_INSTALL_DISMISSED: 'pwa-install-dismissed',
  USER_PREFERENCES: 'user-preferences',
  DRAFT_FORM_DATA: 'draft-form-data'
} as const;

// Error messages
export const ERROR_MESSAGES = {
  NAVIGATION_ERROR: 'Navigation error occurred',
  SEARCH_ERROR: 'Error performing search',
  FORM_VALIDATION_ERROR: 'Please check your form inputs',
  NETWORK_ERROR: 'Network connection error',
  PDF_GENERATION_ERROR: 'Failed to generate PDF'
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  FORM_SUBMITTED: 'Form submitted successfully',
  EMAIL_SENT: 'Email sent successfully',
  PDF_GENERATED: 'PDF generated successfully'
} as const;