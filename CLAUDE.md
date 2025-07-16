# CLAUDE.md - Heart Clinic Melbourne Development Guide

## Project Overview
Heart Clinic Melbourne is a comprehensive React/TypeScript medical website providing patient education, referral management, and professional services for cardiovascular care. The site features a modern, responsive design with advanced UI components and interactive elements.

## Testing Infrastructure

### Testing Framework
**Vitest + React Testing Library** for comprehensive component testing

#### Test Files:
- `src/components/mobile/__tests__/MobileHeader.simple.test.tsx` - Basic functionality tests
- `src/components/mobile/__tests__/MobileHeader.performance.test.tsx` - Performance benchmarks
- `src/test-utils/index.tsx` - Shared testing utilities
- `src/setupTests.ts` - Global test configuration

#### Testing Utilities:
```typescript
// Custom render with providers
export const render = (ui: ReactElement, options?: RenderOptions) => 
  render(ui, { wrapper: AllTheProviders, ...options })

// Scroll simulation for header state changes
export const simulateScroll = (scrollY: number) => {
  Object.defineProperty(window, 'pageYOffset', { value: scrollY })
  window.dispatchEvent(new Event('scroll'))
}

// Intersection Observer testing
export const triggerIntersectionObserver = (entries: any[]) => {
  const callback = vi.mocked(window.IntersectionObserver).mock.calls[0][0]
  callback(entries, {} as any)
}
```

#### Performance Benchmarks:
- **Render time**: < 16ms (60fps budget)
- **Scroll response**: < 100ms latency
- **Animation completion**: < 500ms
- **Memory usage**: < 1MB growth per mount/unmount cycle

### Test Commands
```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm run test MobileHeader

# Run performance tests only
npm run test performance
```

## Development History

### 1. UI Enhancement with Three-Button System
**Interactive card buttons with slide-out labels and smart blur effects**

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
- **Visual hierarchy**: Card content blurs to emphasise action buttons and labels
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

### Development Commands
```bash
# Development server
npm run dev

# Build for production
npm run build

# Type checking
npm run typecheck

# Linting
npm run lint

# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
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
│       ├── MobileHeader.tsx     # Mobile navigation header
│       └── __tests__/           # Component tests
│           ├── MobileHeader.simple.test.tsx      # Basic functionality
│           └── MobileHeader.performance.test.tsx # Performance benchmarks
├── pages/
├── hooks/                       # Custom React hooks
├── utils/                       # Utility functions
├── types/                       # TypeScript definitions
├── test-utils/                  # Testing utilities
│   └── index.tsx                # Custom render functions
├── setupTests.ts                # Global test configuration
├── vitest.config.ts             # Vitest configuration
└── package.json                 # Dependencies including test framework
```

## Deployment
- **GitHub Pages** hosting with automated CI/CD
- **Vite** build system for optimized production bundles
- **Domain**: heartclinicmelbourne.com.au

## Recent Updates (July 2025)

### 4. Project Structure Fix & Color Palette Refinement (July 16, 2025)
**Resolved nested folder structure and updated Wizard component styling**

#### Major Infrastructure Fix:
- **Fixed nested `hcm2025/hcm2025/` folder structure** that was preventing npm/build tools from working
- **Moved all project files up one level** to enable proper development workflow
- **Resolved npm script execution issues** - `npm run dev` now works correctly
- **Enabled Vite dev server** to run at http://localhost:5173/

#### Wizard Component Color Palette Updates:
**Migrated from blue-based to teal-based color scheme for better brand consistency**

#### Color Changes Applied:
- **Primary accent color**: `blue-600` → `teal-600`
- **Background highlights**: `blue-50/100` → `teal-50/100` 
- **Border colors**: `blue-200` → `teal-200`
- **Focus rings**: `focus:ring-blue-500` → `focus:ring-teal-500`
- **Text colors**: `blue-800/900` → `teal-800/900`

#### Enhanced User Experience:
- **Improved PDF generation error handling** with user-friendly error messages
- **Enhanced completion flow** with clearer next steps instructions
- **Better validation logic** for review step - checks essential fields rather than strict validation
- **Added instructional messaging** for PDF attachment process

#### Technical Improvements:
- **Button component integration** - Replaced custom button styling with reusable `Button` component
- **Consistent spacing and typography** across all wizard steps
- **Improved accessibility** with better color contrast ratios

```typescript
// Example of color palette migration
// Before:
<div className="bg-blue-100 rounded-full">
  <FileText className="w-8 h-8 text-blue-600" />
</div>

// After:
<div className="bg-teal-100 rounded-full">
  <FileText className="w-8 h-8 text-teal-600" />
</div>
```

### 3. Comprehensive Testing Infrastructure (January 2025)
**Complete test suite implementation with performance monitoring**

#### Testing Coverage:
- **MobileHeader Component**: 100% code coverage with unit, integration, and performance tests
- **Performance Benchmarks**: Render time < 16ms, scroll response < 100ms
- **Memory Management**: Proper cleanup of event listeners and observers
- **Browser Compatibility**: Cross-platform testing utilities

#### Test Implementation:
```typescript
// Performance test example
it('renders within acceptable time limits', () => {
  const startTime = performance.now()
  render(<MobileHeader {...props} />)
  const endTime = performance.now()
  const renderTime = endTime - startTime
  
  expect(renderTime).toBeLessThan(16) // 60fps budget
})

// Scroll performance
it('efficiently handles scroll events using requestAnimationFrame', () => {
  const rafSpy = vi.spyOn(global, 'requestAnimationFrame')
  render(<MobileHeader {...props} />)
  
  for (let i = 0; i < 100; i++) {
    simulateScroll(i)
  }
  
  expect(rafSpy).toHaveBeenCalled()
})
```

#### Test Categories:
- **Simple Tests**: Basic rendering and functionality
- **Performance Tests**: CPU usage, memory leaks, animation timing
- **Accessibility Tests**: ARIA labels, keyboard navigation
- **Integration Tests**: Component interaction and state management

## Future Enhancements
- **FAQ system** for contextual questions
- **Advanced search** with filters and categorization
- **Extended test coverage** for all components
- **E2E testing** with Playwright/Cypress

## Contact & Support
- **Primary Developer**: Shane Nanayakkara
- **Organization**: Heart Clinic Melbourne
- **Repository**: Private GitHub repository with secure medical content handling