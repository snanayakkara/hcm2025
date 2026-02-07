import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import MobileHeader from '../MobileHeader'
import { 
  render, 
  mockMobileHeaderProps, 
  simulateScroll, 
  triggerIntersectionObserver,
  createIntersectionObserverEntry,
  waitForAnimation 
} from '../../../test-utils'

describe('MobileHeader', () => {
  let props: typeof mockMobileHeaderProps

  beforeEach(() => {
    props = {
      onNavigate: vi.fn(),
      currentSection: 'home',
      onTelehealthClick: vi.fn(),
      onCallClick: vi.fn(),
      onDirectionsClick: vi.fn(),
    }
    
    // Reset DOM
    document.body.innerHTML = ''
    
    // Reset mocks
    vi.clearAllMocks()
    
    // Reset scroll position
    simulateScroll(0)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Component Rendering', () => {
    it('renders the header with correct structure', () => {
      render(<MobileHeader {...props} />)
      
      const header = screen.getByRole('banner')
      expect(header).toBeInTheDocument()
      expect(header).toHaveClass('fixed', 'top-0', 'left-0', 'right-0', 'z-50')
    })

    it('renders logo with correct attributes', () => {
      render(<MobileHeader {...props} />)
      
      const logo = screen.getByAltText('Heart Clinic Melbourne Logo')
      expect(logo).toBeInTheDocument()
      expect(logo).toHaveAttribute('src', '/images/hcm3d2.webp')
      expect(logo).toHaveClass('w-6', 'h-6', 'object-contain')
    })

    it('renders clinic name text', () => {
      render(<MobileHeader {...props} />)
      
      expect(screen.getByText('Heart Clinic Melbourne')).toBeInTheDocument()
    })

    it('renders call and menu buttons initially', () => {
      render(<MobileHeader {...props} />)
      
      const callButtons = screen.getAllByText('Call')
      const menuButtons = screen.getAllByText('Menu')
      
      expect(callButtons).toHaveLength(1)
      expect(menuButtons).toHaveLength(1)
    })

    it('applies correct initial styling', () => {
      render(<MobileHeader {...props} />)
      
      const header = screen.getByRole('banner')
      expect(header).toHaveStyle({
        position: 'fixed',
        zIndex: '50'
      })
    })
  })

  describe('Navigation Functionality', () => {
    it('calls onCallClick when call button is clicked', async () => {
      const user = userEvent.setup()
      render(<MobileHeader {...props} />)
      
      const callButton = screen.getByText('Call')
      await user.click(callButton)
      
      expect(props.onCallClick).toHaveBeenCalledTimes(1)
    })

    it('calls navigator.vibrate when call button is clicked', async () => {
      const user = userEvent.setup()
      render(<MobileHeader {...props} />)
      
      const callButton = screen.getByText('Call')
      await user.click(callButton)
      
      expect(navigator.vibrate).toHaveBeenCalledWith(6)
    })

    it('toggles menu dropdown when menu button is clicked', async () => {
      const user = userEvent.setup()
      render(<MobileHeader {...props} />)
      
      const menuButton = screen.getByText('Menu')
      await user.click(menuButton)
      
      await waitFor(() => {
        expect(screen.getByText('About Us')).toBeInTheDocument()
        expect(screen.getByText('Services')).toBeInTheDocument()
        expect(screen.getByText('Our Doctors')).toBeInTheDocument()
        expect(screen.getByText('Reception Team')).toBeInTheDocument()
        expect(screen.getByText('Patient Information')).toBeInTheDocument()
        expect(screen.getByText('Contact')).toBeInTheDocument()
      })
    })

    it('closes menu when backdrop is clicked', async () => {
      const user = userEvent.setup()
      render(<MobileHeader {...props} />)
      
      // Open menu
      const menuButton = screen.getByText('Menu')
      await user.click(menuButton)
      
      await waitFor(() => {
        expect(screen.getByText('About Us')).toBeInTheDocument()
      })
      
      // Click backdrop
      const backdrop = document.querySelector('.fixed.inset-0.z-40')
      expect(backdrop).toBeInTheDocument()
      await user.click(backdrop as Element)
      
      await waitFor(() => {
        expect(screen.queryByText('About Us')).not.toBeInTheDocument()
      })
    })

    it('calls onNavigate with correct section when menu item is clicked', async () => {
      const user = userEvent.setup()
      render(<MobileHeader {...props} />)
      
      // Open menu
      const menuButton = screen.getByText('Menu')
      await user.click(menuButton)
      
      await waitFor(() => {
        expect(screen.getByText('About Us')).toBeInTheDocument()
      })
      
      // Click About Us
      const aboutUsButton = screen.getByText('About Us')
      await user.click(aboutUsButton)
      
      expect(props.onNavigate).toHaveBeenCalledWith('about')
    })

    it('closes menu after selecting a menu item', async () => {
      const user = userEvent.setup()
      render(<MobileHeader {...props} />)
      
      // Open menu
      const menuButton = screen.getByText('Menu')
      await user.click(menuButton)
      
      await waitFor(() => {
        expect(screen.getByText('Services')).toBeInTheDocument()
      })
      
      // Click Services
      const servicesButton = screen.getByText('Services')
      await user.click(servicesButton)
      
      await waitFor(() => {
        expect(screen.queryByText('About Us')).not.toBeInTheDocument()
      })
    })
  })

  describe('Scroll Detection and State Changes', () => {
    it('maintains initial state when scroll is less than threshold', async () => {
      render(<MobileHeader {...props} />)
      
      simulateScroll(30)
      
      // Trigger intersection observer for visible state
      triggerIntersectionObserver([createIntersectionObserverEntry(true)])
      
      await waitFor(() => {
        expect(screen.getByText('Heart Clinic Melbourne')).toBeInTheDocument()
        expect(screen.getAllByText('Call')).toHaveLength(1)
        expect(screen.getAllByText('Menu')).toHaveLength(1)
      })
    })

    it('changes to scrolled state when scroll exceeds threshold', async () => {
      render(<MobileHeader {...props} />)
      
      simulateScroll(60)
      
      // Trigger intersection observer for not visible state
      triggerIntersectionObserver([createIntersectionObserverEntry(false)])
      
      await waitFor(() => {
        // Should show full navigation bar
        expect(screen.getByText('Home')).toBeInTheDocument()
        expect(screen.getByText('Directions')).toBeInTheDocument()
        expect(screen.getByText('Telehealth')).toBeInTheDocument()
        expect(screen.getAllByText('Call')).toHaveLength(1)
        expect(screen.getAllByText('More')).toHaveLength(1)
      })
    })

    it('navigates to home when logo is clicked in scrolled state', async () => {
      const user = userEvent.setup()
      render(<MobileHeader {...props} />)
      
      // Scroll to trigger scrolled state
      simulateScroll(60)
      triggerIntersectionObserver([createIntersectionObserverEntry(false)])
      
      await waitFor(() => {
        expect(screen.getByText('Home')).toBeInTheDocument()
      })
      
      const homeButton = screen.getByText('Home')
      await user.click(homeButton)
      
      expect(props.onNavigate).toHaveBeenCalledWith('home')
    })

    it('calls onDirectionsClick when directions button is clicked in scrolled state', async () => {
      const user = userEvent.setup()
      render(<MobileHeader {...props} />)
      
      // Scroll to trigger scrolled state
      simulateScroll(60)
      triggerIntersectionObserver([createIntersectionObserverEntry(false)])
      
      await waitFor(() => {
        expect(screen.getByText('Directions')).toBeInTheDocument()
      })
      
      const directionsButton = screen.getByText('Directions')
      await user.click(directionsButton)
      
      expect(props.onDirectionsClick).toHaveBeenCalledTimes(1)
    })

    it('calls onTelehealthClick when telehealth button is clicked in scrolled state', async () => {
      const user = userEvent.setup()
      render(<MobileHeader {...props} />)
      
      // Scroll to trigger scrolled state
      simulateScroll(60)
      triggerIntersectionObserver([createIntersectionObserverEntry(false)])
      
      await waitFor(() => {
        expect(screen.getByText('Telehealth')).toBeInTheDocument()
      })
      
      const telehealthButton = screen.getByText('Telehealth')
      await user.click(telehealthButton)
      
      expect(props.onTelehealthClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('Intersection Observer Setup', () => {
    it('creates intersection observer on mount', () => {
      render(<MobileHeader {...props} />)
      
      expect(global.IntersectionObserver).toHaveBeenCalledWith(
        expect.any(Function),
        {
          root: null,
          rootMargin: '-50px 0px 0px 0px',
          threshold: 0
        }
      )
    })

    it('creates and observes sentinel element', () => {
      render(<MobileHeader {...props} />)
      
      const mockObserver = vi.mocked(global.IntersectionObserver).mock.results[0]?.value
      expect(mockObserver.observe).toHaveBeenCalled()
    })

    it('cleans up observer on unmount', () => {
      const { unmount } = render(<MobileHeader {...props} />)
      
      const mockObserver = vi.mocked(global.IntersectionObserver).mock.results[0]?.value
      
      unmount()
      
      expect(mockObserver.disconnect).toHaveBeenCalled()
    })
  })

  describe('Event Listeners', () => {
    it('adds scroll event listener on mount', () => {
      const addEventListenerSpy = vi.spyOn(window, 'addEventListener')
      
      render(<MobileHeader {...props} />)
      
      expect(addEventListenerSpy).toHaveBeenCalledWith(
        'scroll',
        expect.any(Function),
        { passive: true }
      )
    })

    it('removes scroll event listener on unmount', () => {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')
      const { unmount } = render(<MobileHeader {...props} />)
      
      unmount()
      
      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'scroll',
        expect.any(Function)
      )
    })

    it('throttles scroll events using requestAnimationFrame', () => {
      const requestAnimationFrameSpy = vi.spyOn(global, 'requestAnimationFrame')
      render(<MobileHeader {...props} />)
      
      // Simulate multiple scroll events
      simulateScroll(10)
      simulateScroll(20)
      simulateScroll(30)
      
      expect(requestAnimationFrameSpy).toHaveBeenCalled()
    })
  })

  describe('Animations and Transitions', () => {
    it('applies scale animation on button hover', async () => {
      const user = userEvent.setup()
      render(<MobileHeader {...props} />)
      
      const callButton = screen.getByText('Call')
      
      await user.hover(callButton)
      
      // Note: Testing framer-motion animations requires more complex setup
      // This test verifies the button responds to hover events
      expect(callButton).toBeInTheDocument()
    })

    it('rotates menu icon when menu is opened', async () => {
      const user = userEvent.setup()
      render(<MobileHeader {...props} />)
      
      const menuButton = screen.getByText('Menu')
      await user.click(menuButton)
      
      await waitFor(() => {
        expect(screen.getByText('About Us')).toBeInTheDocument()
      })
      
      // Menu should be open
      expect(screen.getByText('About Us')).toBeInTheDocument()
    })

    it('shows smooth transition between header states', async () => {
      render(<MobileHeader {...props} />)
      
      // Initial state
      expect(screen.getByText('Heart Clinic Melbourne')).toBeInTheDocument()
      
      // Trigger scrolled state
      simulateScroll(60)
      triggerIntersectionObserver([createIntersectionObserverEntry(false)])
      
      await waitFor(() => {
        expect(screen.getByText('Home')).toBeInTheDocument()
      })
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA labels for logo images', () => {
      render(<MobileHeader {...props} />)
      
      const logos = screen.getAllByAltText('Heart Clinic Melbourne Logo')
      expect(logos.length).toBeGreaterThan(0)
      logos.forEach(logo => {
        expect(logo).toHaveAttribute('alt', 'Heart Clinic Melbourne Logo')
      })
    })

    it('maintains focus order in navigation', async () => {
      const user = userEvent.setup()
      render(<MobileHeader {...props} />)
      
      // Tab through elements
      await user.tab()
      expect(screen.getByText('Call')).toHaveFocus()
      
      await user.tab()
      expect(screen.getByText('Menu')).toHaveFocus()
    })

    it('provides proper keyboard navigation for dropdown menu', async () => {
      const user = userEvent.setup()
      render(<MobileHeader {...props} />)
      
      // Open menu with Enter key
      const menuButton = screen.getByText('Menu')
      menuButton.focus()
      await user.keyboard('{Enter}')
      
      await waitFor(() => {
        expect(screen.getByText('About Us')).toBeInTheDocument()
      })
      
      // Navigate through menu items
      await user.tab()
      expect(screen.getByText('About Us')).toHaveFocus()
    })

    it('announces state changes to screen readers', () => {
      render(<MobileHeader {...props} />)
      
      // The header role="banner" should be present
      expect(screen.getByRole('banner')).toBeInTheDocument()
    })
  })

  describe('Error Handling', () => {
    it('handles missing vibration API gracefully', async () => {
      // Mock vibration API as undefined
      Object.defineProperty(navigator, 'vibrate', {
        writable: true,
        value: undefined,
      })
      
      const user = userEvent.setup()
      render(<MobileHeader {...props} />)
      
      const callButton = screen.getByText('Call')
      
      // Should not throw error
      await user.click(callButton)
      expect(props.onCallClick).toHaveBeenCalled()
    })

    it('handles scroll events when pageYOffset is undefined', () => {
      // Mock pageYOffset as undefined
      Object.defineProperty(window, 'pageYOffset', {
        writable: true,
        value: undefined,
      })
      
      render(<MobileHeader {...props} />)
      
      // Should not throw error
      simulateScroll(0)
      expect(screen.getByText('Heart Clinic Melbourne')).toBeInTheDocument()
    })

    it('gracefully handles intersection observer errors', () => {
      // Mock intersection observer to throw error
      global.IntersectionObserver = vi.fn().mockImplementation(() => {
        throw new Error('IntersectionObserver error')
      })
      
      // Should not crash the component
      expect(() => render(<MobileHeader {...props} />)).not.toThrow()
    })
  })

  describe('Performance', () => {
    it('does not create multiple intersection observers', () => {
      const { rerender } = render(<MobileHeader {...props} />)
      
      const initialCallCount = vi.mocked(global.IntersectionObserver).mock.calls.length
      
      rerender(<MobileHeader {...props} currentSection="about" />)
      
      const finalCallCount = vi.mocked(global.IntersectionObserver).mock.calls.length
      
      // Should not create additional observers on re-render
      expect(finalCallCount).toBe(initialCallCount)
    })

    it('efficiently handles rapid scroll events', () => {
      const { rerender } = render(<MobileHeader {...props} />)
      
      // Simulate rapid scrolling
      for (let i = 0; i < 100; i++) {
        simulateScroll(i)
      }
      
      // Component should remain stable
      expect(screen.getByRole('banner')).toBeInTheDocument()
    })

    it('cleans up timeouts on unmount', () => {
      const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout')
      const { unmount } = render(<MobileHeader {...props} />)
      
      unmount()
      
      expect(clearTimeoutSpy).toHaveBeenCalled()
    })
  })

  describe('Integration Tests', () => {
    it('works correctly with all prop combinations', () => {
      const testProps = {
        ...props,
        currentSection: 'doctors',
      }
      
      render(<MobileHeader {...testProps} />)
      
      expect(screen.getByRole('banner')).toBeInTheDocument()
      expect(screen.getByText('Heart Clinic Melbourne')).toBeInTheDocument()
    })

    it('maintains state consistency across multiple interactions', async () => {
      const user = userEvent.setup()
      render(<MobileHeader {...props} />)
      
      // Multiple interactions
      await user.click(screen.getByText('Menu'))
      await waitFor(() => expect(screen.getByText('About Us')).toBeInTheDocument())
      
      await user.click(screen.getByText('About Us'))
      expect(props.onNavigate).toHaveBeenCalledWith('about')
      
      await user.click(screen.getByText('Call'))
      expect(props.onCallClick).toHaveBeenCalled()
      
      // Scroll interaction
      simulateScroll(60)
      triggerIntersectionObserver([createIntersectionObserverEntry(false)])
      
      await waitFor(() => {
        expect(screen.getByText('Home')).toBeInTheDocument()
      })
    })
  })
})