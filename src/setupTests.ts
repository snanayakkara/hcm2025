import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn()
mockIntersectionObserver.mockImplementation((callback, options) => {
  return {
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
    root: options?.root || null,
    rootMargin: options?.rootMargin || '',
    thresholds: options?.threshold ? [options.threshold] : [],
  }
})

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: mockIntersectionObserver,
})

Object.defineProperty(global, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: mockIntersectionObserver,
})

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock requestAnimationFrame
global.requestAnimationFrame = vi.fn((cb) => setTimeout(cb, 0))
global.cancelAnimationFrame = vi.fn()

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock navigator.vibrate
Object.defineProperty(navigator, 'vibrate', {
  writable: true,
  value: vi.fn(),
})

// Mock scrollTo
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: vi.fn(),
})

// Mock pageYOffset and scrollY
Object.defineProperty(window, 'pageYOffset', {
  writable: true,
  value: 0,
})

Object.defineProperty(window, 'scrollY', {
  writable: true,
  value: 0,
})

// Mock document.documentElement.scrollTop
Object.defineProperty(document.documentElement, 'scrollTop', {
  writable: true,
  value: 0,
})

// Mock CSS.supports for backdrop-filter
Object.defineProperty(CSS, 'supports', {
  writable: true,
  value: vi.fn().mockReturnValue(true),
})

// Console warnings suppression for testing
const originalConsoleError = console.error
console.error = (...args: any[]) => {
  if (
    typeof args[0] === 'string' &&
    args[0].includes('Warning: ReactDOM.render is no longer supported')
  ) {
    return
  }
  originalConsoleError(...args)
}