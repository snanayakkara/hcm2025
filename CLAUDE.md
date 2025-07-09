# CLAUDE.md - Heart Clinic Melbourne Development Guide

## Project Overview
Heart Clinic Melbourne is a comprehensive React/TypeScript medical website providing patient education, referral management, and professional services for cardiovascular care. The site features a modern, responsive design with advanced UI components and interactive elements.

## Recent Major Updates

### 1. Liquid Glass Button Implementation (December 2024)
**Enhanced UI with iOS 18-style liquid glass effect for improved readability**

#### Files Modified:
- `src/pages/LearningLibrary.tsx`
- `src/components/ReferralForm.tsx`

#### Implementation Details:
- **Separated layer architecture**: Background images moved to dedicated blur layers
- **CSS filters applied**: `filter: blur(2px)` for background images, `backdrop-filter: blur(4px)` for overlays
- **Cross-browser compatibility**: WebKit prefixes for Safari support
- **Image quality optimization**: Added `imageRendering: '-webkit-optimize-contrast'` for high-resolution scaling

#### Button Types Enhanced:
1. **Learning Library Buttons**:
   - General Patient Journey button
   - Diagnostic Tests procedure buttons
   - Therapeutic Procedures buttons

2. **Referral Form Buttons**:
   - Cardiology Consult
   - Resting Echo
   - Stress Echo
   - Holter Monitor
   - Device Review

#### Technical Implementation:
```typescript
// Layer structure for liquid glass effect
<button className="relative overflow-hidden">
  {/* Blurred background image */}
  <div 
    className="absolute inset-0 rounded-2xl"
    style={{
      backgroundImage: `url(${image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      imageRendering: '-webkit-optimize-contrast',
      filter: 'blur(2px)'
    }}
  />
  
  {/* Backdrop filter overlay */}
  <div className="absolute inset-0 rounded-2xl" style={{
    backdropFilter: 'blur(4px)',
    WebkitBackdropFilter: 'blur(4px)'
  }} />
  
  {/* Sharp text content */}
  <div className="relative z-10">
    Button Text
  </div>
</button>
```

### 2. Learning Library Enhancements

#### New Content Added:
- **24 Hour Holter Monitoring** test added to diagnostic tests section
- **Transoesophageal Echocardiogram (TOE)** procedure added
- **Enhanced procedure details** with comprehensive step-by-step processes

#### Navigation Improvements:
- **Contextual test linking** from heart conditions to specific procedures
- **Improved scroll behavior** with header offset calculations
- **Search integration** with main site search functionality

#### UI Refinements:
- **Detail card layout** restructured with 2/3 key information, 1/3 procedure image
- **Consistent button styling** with liquid glass effects
- **Enhanced hover states** and interaction feedback

### 3. Technical Architecture

#### Component Structure:
- **LearningLibrary.tsx**: Main patient education hub with procedure categories
- **ReferralForm.tsx**: Professional referral interface with service selection
- **Header.tsx**: Navigation with integrated search functionality

#### State Management:
- **URL parameter handling** for deep linking and search integration
- **Expandable content state** for collapsible sections
- **Selection state** for procedure buttons and form inputs

#### Animation Framework:
- **Framer Motion** for smooth page transitions and component animations
- **Intersection Observer** for step-by-step reveal animations
- **Custom scroll behavior** for navigation between sections

## Development Guidelines

### Code Standards
- **TypeScript strict mode** enabled for type safety
- **ESLint configuration** for consistent code style
- **Tailwind CSS** for responsive, utility-first styling

### UI/UX Principles
- **Accessibility first** with proper ARIA labels and keyboard navigation
- **Mobile-responsive** design with touch-friendly interactions
- **Performance optimized** with lazy loading and efficient animations

### Testing Commands
```bash
# Development server
npm run dev

# Build for production
npm run build

# Type checking
npm run typecheck

# Linting
npm run lint
```

## Key Features

### Patient Education
- **Comprehensive procedure library** with detailed step-by-step guides
- **Visual procedure cards** with high-quality medical imagery
- **Interactive navigation** between related procedures and tests

### Professional Tools
- **Referral form** with medical service selection
- **Doctor profiles** with specialization details
- **Location-based services** across Melbourne clinics

### Technical Features
- **Progressive Web App** capabilities
- **Service Worker** implementation for offline functionality
- **SEO optimized** with meta tags and structured data

## File Structure
```
src/
├── components/
│   ├── ReferralForm.tsx         # Professional referral interface
│   ├── Header.tsx               # Navigation with search
│   ├── Services.tsx             # Service catalog
│   └── mobile/                  # Mobile-specific components
├── pages/
│   └── LearningLibrary.tsx      # Patient education hub
├── hooks/                       # Custom React hooks
├── utils/                       # Utility functions
└── types/                       # TypeScript definitions
```

## Deployment
- **GitHub Pages** hosting with automated CI/CD
- **Vite** build system for optimized production bundles
- **Domain**: heartclinicmelbourne.com.au

## Future Enhancements
- **FAQ system** for contextual questions on procedure pages
- **Advanced search** with filters and categorization
- **Patient portal** integration for appointment booking
- **Multilingual support** for diverse patient base

## Contact & Support
- **Primary Developer**: Shane Nanayakkara
- **Organization**: Heart Clinic Melbourne
- **Repository**: Private GitHub repository with secure medical content handling