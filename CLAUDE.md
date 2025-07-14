# CLAUDE.md - Heart Clinic Melbourne Development Guide

## Project Overview
Heart Clinic Melbourne is a comprehensive React/TypeScript medical website providing patient education, referral management, and professional services for cardiovascular care. The site features a modern, responsive design with advanced UI components and interactive elements.



#### Technical Implementation:
```typescript
// Three-button system with slide-out labels
<div className="group/card">
  <div className="relative group/button">
    <button className="bg-white/90 hover:bg-white text-primary-600 p-2 rounded-full">
      <FileText className="w-4 h-4" />
    </button>
    <div className="absolute right-full opacity-0 group-hover/button:opacity-100 
                    transform translate-x-2 group-hover/button:translate-x-0 
                    transition-all duration-200">
      <div className="bg-gray-900 text-white px-3 py-1 rounded-lg">
        Add to Guide
      </div>
    </div>
  </div>
</div>

// Smart blur system for enhanced readability
.group-hover/button:blur-sm {
  filter: blur(4px);
}
```

#### UI/UX Enhancements:
- **Contextual clarity**: Button purposes immediately clear through slide-out text
- **Visual hierarchy**: Card content blurs to emphasize action buttons and labels
- **Smooth animations**: 200ms transitions for all hover states and blur effects
- **Accessibility**: High contrast tooltips with proper ARIA labels

### 2. Liquid Glass Button Implementation (December 2024)
**Enhanced UI with iOS 18-style liquid glass effect for improved readability**

#### Files Modified:
- `src/components/ReferralForm.tsx`

#### Implementation Details:
- **Separated layer architecture**: Background images moved to dedicated blur layers
- **CSS filters applied**: `filter: blur(2px)` for background images, `backdrop-filter: blur(4px)` for overlays
- **Cross-browser compatibility**: WebKit prefixes for Safari support
- **Image quality optimization**: Added `imageRendering: '-webkit-optimize-contrast'` for high-resolution scaling

#### Button Types Enhanced:
**Referral Form Buttons**:
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


### 3. Technical Architecture

#### Component Structure:
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
- **Medical information resources** for patient understanding
- **Visual content** with high-quality medical imagery

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
├── hooks/                       # Custom React hooks
├── utils/                       # Utility functions
└── types/                       # TypeScript definitions
```

## Deployment
- **GitHub Pages** hosting with automated CI/CD
- **Vite** build system for optimized production bundles
- **Domain**: heartclinicmelbourne.com.au

## Future Enhancements
- **FAQ system** for contextual questions
- **Advanced search** with filters and categorization
- **Patient portal** integration for appointment booking
- **Multilingual support** for diverse patient base

## Contact & Support
- **Primary Developer**: Shane Nanayakkara
- **Organization**: Heart Clinic Melbourne
- **Repository**: Private GitHub repository with secure medical content handling