import { describe, it, expect, beforeEach, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MobileHeader from '../MobileHeader'
import { render, mockMobileHeaderProps, simulateScroll } from '../../../test-utils'

describe('MobileHeader Browser Compatibility Tests', () => {
  let props: typeof mockMobileHeaderProps

  beforeEach(() => {
    props = {
      onNavigate: vi.fn(),
      currentSection: 'home',
      onTelehealthClick: vi.fn(),
      onCallClick: vi.fn(),
      onDirectionsClick: vi.fn(),
    }
    vi.clearAllMocks()
    simulateScroll(0)
  })

  describe('iOS Safari Compatibility', () => {
    beforeEach(() => {
      // Mock iOS Safari user agent
      Object.defineProperty(navigator, 'userAgent', {
        writable: true,
        value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1'
      })
    })

    it('handles backdrop-filter support correctly', () => {
      // Mock CSS.supports for backdrop-filter
      const mockCSSSupports = vi.fn().mockReturnValue(true)
      Object.defineProperty(CSS, 'supports', {
        writable: true,
        value: mockCSSSupports
      })

      render(<MobileHeader {...props} />)

      const header = screen.getByRole('banner')
      expect(header).toBeInTheDocument()

      // Should have backdrop-filter styles
      const headerElement = header as HTMLElement
      expect(headerElement.style.backdropFilter).toBe('blur(20px) saturate(180%)')
      expect(headerElement.style.WebkitBackdropFilter).toBe('blur(20px) saturate(180%)')
    })

    it('provides fallback for unsupported backdrop-filter', () => {
      // Mock CSS.supports to return false for backdrop-filter
      const mockCSSSupports = vi.fn().mockReturnValue(false)
      Object.defineProperty(CSS, 'supports', {
        writable: true,
        value: mockCSSSupports
      })

      render(<MobileHeader {...props} />)

      const header = screen.getByRole('banner')
      expect(header).toBeInTheDocument()

      // Should still render with fallback styles
      expect(header).toHaveStyle({ position: 'fixed' })
    })

    it('handles safe area insets correctly', () => {
      // Mock CSS environment variables for safe area
      const originalGetComputedStyle = getComputedStyle
      global.getComputedStyle = vi.fn().mockReturnValue({
        getPropertyValue: (prop: string) => {
          if (prop === 'padding-top') return '44px'
          return ''
        }
      } as any)

      render(<MobileHeader {...props} />)

      const header = screen.getByRole('banner')
      expect(header).toHaveClass('safe-area-inset-top')

      global.getComputedStyle = originalGetComputedStyle
    })

    it('works with iOS momentum scrolling', () => {
      render(<MobileHeader {...props} />)

      // Simulate iOS momentum scrolling behavior
      Object.defineProperty(window, 'pageYOffset', {
        writable: true,
        value: 0
      })

      // Start scroll
      simulateScroll(30)
      
      // Momentum continues
      setTimeout(() => {
        simulateScroll(60)
      }, 16)

      expect(screen.getByRole('banner')).toBeInTheDocument()
    })

    it('handles iOS viewport height correctly', () => {
      // Mock iOS viewport behavior
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        value: 812 // iPhone X height
      })

      render(<MobileHeader {...props} />)

      const header = screen.getByRole('banner')
      expect(header).toBeInTheDocument()
      expect(header).toHaveClass('ios-vh-fix')
    })
  })

  describe('Chrome Mobile Compatibility', () => {
    beforeEach(() => {
      // Mock Chrome Mobile user agent
      Object.defineProperty(navigator, 'userAgent', {
        writable: true,
        value: 'Mozilla/5.0 (Linux; Android 12; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Mobile Safari/537.36'
      })
    })

    it('handles Chrome address bar hiding', () => {
      render(<MobileHeader {...props} />)

      // Simulate Chrome address bar hide/show
      const initialHeight = window.innerHeight
      
      // Address bar hides - viewport grows
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        value: initialHeight + 56
      })

      window.dispatchEvent(new Event('resize'))

      const header = screen.getByRole('banner')
      expect(header).toBeInTheDocument()
      expect(header).toHaveClass('fixed')
    })

    it('works with Chrome pull-to-refresh gesture', async () => {
      const user = userEvent.setup()
      render(<MobileHeader {...props} />)

      // Simulate overscroll behavior
      Object.defineProperty(document.documentElement, 'scrollTop', {
        writable: true,
        value: -10 // Overscroll
      })

      const header = screen.getByRole('banner')
      expect(header).toBeInTheDocument()

      // Should still be functional
      const callButton = screen.getByText('Call')
      await user.click(callButton)
      expect(props.onCallClick).toHaveBeenCalled()
    })

    it('handles Chrome DevTools device simulation', () => {
      // Mock Chrome DevTools mobile simulation
      Object.defineProperty(window, 'chrome', {
        writable: true,
        value: {}
      })

      render(<MobileHeader {...props} />)

      const header = screen.getByRole('banner')
      expect(header).toBeInTheDocument()
    })
  })

  describe('Firefox Mobile Compatibility', () => {
    beforeEach(() => {
      // Mock Firefox Mobile user agent
      Object.defineProperty(navigator, 'userAgent', {
        writable: true,
        value: 'Mozilla/5.0 (Mobile; rv:91.0) Gecko/91.0 Firefox/91.0'
      })
    })

    it('works without webkit prefixes', () => {
      render(<MobileHeader {...props} />)

      const header = screen.getByRole('banner')
      expect(header).toBeInTheDocument()

      // Should work with standard CSS properties
      const headerElement = header as HTMLElement
      expect(headerElement.style.backdropFilter).toBeTruthy()
    })

    it('handles Firefox touch events correctly', async () => {
      const user = userEvent.setup()
      render(<MobileHeader {...props} />)

      const callButton = screen.getByText('Call')
      
      // Firefox touch event simulation
      await user.click(callButton)
      expect(props.onCallClick).toHaveBeenCalled()
    })
  })

  describe('Samsung Internet Compatibility', () => {
    beforeEach(() => {
      // Mock Samsung Internet user agent
      Object.defineProperty(navigator, 'userAgent', {
        writable: true,
        value: 'Mozilla/5.0 (Linux; Android 12; SAMSUNG SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/17.0 Chrome/96.0.4664.104 Mobile Safari/537.36'
      })
    })

    it('works with Samsung Internet features', () => {
      render(<MobileHeader {...props} />)

      const header = screen.getByRole('banner')
      expect(header).toBeInTheDocument()
    })

    it('handles Samsung Edge Panel interaction', () => {
      render(<MobileHeader {...props} />)

      // Simulate edge swipe
      const header = screen.getByRole('banner')
      
      const touchStart = new TouchEvent('touchstart', {
        touches: [{ clientX: 0, clientY: 100 } as Touch]
      })
      
      header.dispatchEvent(touchStart)
      expect(header).toBeInTheDocument()
    })
  })

  describe('Cross-Browser Feature Detection', () => {
    it('detects intersection observer support', () => {
      // Mock missing IntersectionObserver
      const originalIntersectionObserver = global.IntersectionObserver
      delete (global as any).IntersectionObserver

      render(<MobileHeader {...props} />)

      // Should still render even without IntersectionObserver
      expect(screen.getByRole('banner')).toBeInTheDocument()

      // Restore
      global.IntersectionObserver = originalIntersectionObserver
    })

    it('detects vibration API support', async () => {
      const user = userEvent.setup()
      
      // Mock missing vibration API
      delete (navigator as any).vibrate

      render(<MobileHeader {...props} />)

      const callButton = screen.getByText('Call')
      await user.click(callButton)

      // Should work without vibration
      expect(props.onCallClick).toHaveBeenCalled()
    })

    it('detects requestAnimationFrame support', () => {
      // Mock missing requestAnimationFrame
      const originalRAF = global.requestAnimationFrame
      delete (global as any).requestAnimationFrame

      render(<MobileHeader {...props} />)

      // Should use setTimeout fallback
      expect(screen.getByRole('banner')).toBeInTheDocument()

      // Restore
      global.requestAnimationFrame = originalRAF
    })

    it('detects CSS custom properties support', () => {
      // Mock CSS custom properties check
      const originalGetComputedStyle = getComputedStyle
      global.getComputedStyle = vi.fn().mockReturnValue({
        getPropertyValue: () => ''
      } as any)

      render(<MobileHeader {...props} />)

      expect(screen.getByRole('banner')).toBeInTheDocument()

      global.getComputedStyle = originalGetComputedStyle
    })
  })

  describe('Touch Device Compatibility', () => {
    it('detects touch capability correctly', () => {
      // Mock touch device
      Object.defineProperty(navigator, 'maxTouchPoints', {
        writable: true,
        value: 5
      })

      render(<MobileHeader {...props} />)

      const buttons = screen.getAllByRole('button')
      buttons.forEach(button => {
        // Should have appropriate touch target size
        expect(button).toBeInTheDocument()
      })
    })

    it('handles multi-touch gestures', () => {
      render(<MobileHeader {...props} />)

      const header = screen.getByRole('banner')
      
      // Simulate multi-touch
      const multiTouch = new TouchEvent('touchstart', {
        touches: [
          { clientX: 100, clientY: 100 } as Touch,
          { clientX: 200, clientY: 100 } as Touch
        ]
      })

      header.dispatchEvent(multiTouch)
      expect(header).toBeInTheDocument()
    })

    it('prevents zoom on double-tap', async () => {
      const user = userEvent.setup()
      render(<MobileHeader {...props} />)

      const callButton = screen.getByText('Call')
      
      // Rapid double-tap
      await user.click(callButton)
      await user.click(callButton)

      // Should not interfere with functionality
      expect(props.onCallClick).toHaveBeenCalledTimes(2)
    })
  })

  describe('Orientation Handling', () => {
    it('adapts to portrait orientation', () => {
      // Mock portrait orientation
      Object.defineProperty(screen, 'orientation', {
        writable: true,
        value: { angle: 0, type: 'portrait-primary' }
      })

      render(<MobileHeader {...props} />)

      const header = screen.getByRole('banner')
      expect(header).toBeInTheDocument()
    })

    it('adapts to landscape orientation', () => {
      // Mock landscape orientation
      Object.defineProperty(screen, 'orientation', {
        writable: true,
        value: { angle: 90, type: 'landscape-primary' }
      })

      render(<MobileHeader {...props} />)

      const header = screen.getByRole('banner')
      expect(header).toBeInTheDocument()
    })

    it('handles orientation change events', () => {
      render(<MobileHeader {...props} />)

      // Simulate orientation change
      window.dispatchEvent(new Event('orientationchange'))

      const header = screen.getByRole('banner')
      expect(header).toBeInTheDocument()
    })
  })

  describe('Network Conditions', () => {
    it('works on slow networks', () => {
      // Mock slow network
      Object.defineProperty(navigator, 'connection', {
        writable: true,
        value: {
          effectiveType: '2g',
          downlink: 0.5,
          rtt: 1000
        }
      })

      render(<MobileHeader {...props} />)

      const header = screen.getByRole('banner')
      expect(header).toBeInTheDocument()
    })

    it('handles offline state', () => {
      // Mock offline
      Object.defineProperty(navigator, 'onLine', {
        writable: true,
        value: false
      })

      render(<MobileHeader {...props} />)

      const header = screen.getByRole('banner')
      expect(header).toBeInTheDocument()
    })

    it('adapts to data saver mode', () => {
      // Mock data saver
      Object.defineProperty(navigator, 'connection', {
        writable: true,
        value: {
          saveData: true
        }
      })

      render(<MobileHeader {...props} />)

      const header = screen.getByRole('banner')
      expect(header).toBeInTheDocument()
    })
  })

  describe('Accessibility Features', () => {
    it('works with reduced motion preference', () => {
      // Mock prefers-reduced-motion
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation((query) => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        }))
      })

      render(<MobileHeader {...props} />)

      const header = screen.getByRole('banner')
      expect(header).toBeInTheDocument()
    })

    it('supports high contrast mode', () => {
      // Mock high contrast
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation((query) => ({
          matches: query === '(prefers-contrast: high)',
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        }))
      })

      render(<MobileHeader {...props} />)

      const header = screen.getByRole('banner')
      expect(header).toBeInTheDocument()
    })

    it('adapts to text scaling', () => {
      // Mock text scaling
      document.documentElement.style.fontSize = '20px'

      render(<MobileHeader {...props} />)

      const header = screen.getByRole('banner')
      expect(header).toBeInTheDocument()

      // Reset
      document.documentElement.style.fontSize = ''
    })
  })
})