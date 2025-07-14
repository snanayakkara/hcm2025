import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'

// Custom render function that includes providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <BrowserRouter>
      {children}
    </BrowserRouter>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

// Mock props for MobileHeader component
export const mockMobileHeaderProps = {
  onNavigate: vi.fn(),
  currentSection: 'home',
  onTelehealthClick: vi.fn(),
  onCallClick: vi.fn(),
  onDirectionsClick: vi.fn(),
}

// Utility to simulate scroll
export const simulateScroll = (scrollY: number) => {
  Object.defineProperty(window, 'pageYOffset', {
    writable: true,
    value: scrollY,
  })
  Object.defineProperty(window, 'scrollY', {
    writable: true,
    value: scrollY,
  })
  Object.defineProperty(document.documentElement, 'scrollTop', {
    writable: true,
    value: scrollY,
  })
  
  // Dispatch scroll event
  const scrollEvent = new Event('scroll')
  window.dispatchEvent(scrollEvent)
}

// Utility to trigger intersection observer
export const triggerIntersectionObserver = (entries: any[]) => {
  const calls = vi.mocked(window.IntersectionObserver).mock.calls
  if (calls.length > 0) {
    const callback = calls[calls.length - 1][0] // Get the latest callback
    if (callback) {
      callback(entries, {} as any)
    }
  }
}

// Utility to wait for animations
export const waitForAnimation = () => new Promise(resolve => setTimeout(resolve, 500))

// Utility to create intersection observer entry
export const createIntersectionObserverEntry = (isIntersecting: boolean) => ({
  isIntersecting,
  target: document.createElement('div'),
  intersectionRatio: isIntersecting ? 1 : 0,
  boundingClientRect: {},
  intersectionRect: {},
  rootBounds: {},
  time: Date.now(),
})

// Re-export everything
export * from '@testing-library/react'
export { customRender as render }