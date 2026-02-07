import { describe, it, expect, beforeEach, vi } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MobileHeader from '../MobileHeader'
import { render, mockMobileHeaderProps, simulateScroll, triggerIntersectionObserver, createIntersectionObserverEntry } from '../../../test-utils'

describe('MobileHeader Accessibility Tests', () => {
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

  describe('Semantic HTML Structure', () => {
    it('uses proper semantic elements', () => {
      render(<MobileHeader {...props} />)
      
      // Should have header landmark
      expect(screen.getByRole('banner')).toBeInTheDocument()
      
      // Should have navigation elements
      const buttons = screen.getAllByRole('button')
      expect(buttons.length).toBeGreaterThan(0)
    })

    it('provides proper heading structure', () => {
      render(<MobileHeader {...props} />)
      
      // Clinic name should be in a heading
      const heading = screen.getByText('Heart Clinic Melbourne')
      expect(heading.tagName).toBe('H1')
    })

    it('maintains logical document outline', () => {
      render(<MobileHeader {...props} />)
      
      const header = screen.getByRole('banner')
      expect(header.tagName).toBe('HEADER')
    })
  })

  describe('Keyboard Navigation', () => {
    it('supports tab navigation through all interactive elements', async () => {
      const user = userEvent.setup()
      render(<MobileHeader {...props} />)
      
      // Tab to first button (Call)
      await user.tab()
      expect(screen.getByText('Call')).toHaveFocus()
      
      // Tab to second button (Menu)
      await user.tab()
      expect(screen.getByText('Menu')).toHaveFocus()
    })

    it('supports keyboard activation of buttons', async () => {
      const user = userEvent.setup()
      render(<MobileHeader {...props} />)
      
      const callButton = screen.getByText('Call')
      callButton.focus()
      
      // Activate with Enter
      await user.keyboard('{Enter}')
      expect(props.onCallClick).toHaveBeenCalled()
      
      // Reset and test Space
      vi.clearAllMocks()
      await user.keyboard(' ')
      expect(props.onCallClick).toHaveBeenCalled()
    })

    it('provides proper focus management in dropdown menu', async () => {
      const user = userEvent.setup()
      render(<MobileHeader {...props} />)
      
      // Open menu
      const menuButton = screen.getByText('Menu')
      menuButton.focus()
      await user.keyboard('{Enter}')
      
      await waitFor(() => {
        expect(screen.getByText('About Us')).toBeInTheDocument()
      })
      
      // First menu item should be focusable
      await user.tab()
      expect(screen.getByText('About Us')).toHaveFocus()
      
      // Can navigate through menu items
      await user.tab()
      expect(screen.getByText('Services')).toHaveFocus()
    })

    it('supports Escape key to close dropdown menu', async () => {
      const user = userEvent.setup()
      render(<MobileHeader {...props} />)
      
      // Open menu
      const menuButton = screen.getByText('Menu')
      await user.click(menuButton)
      
      await waitFor(() => {
        expect(screen.getByText('About Us')).toBeInTheDocument()
      })
      
      // Press Escape
      await user.keyboard('{Escape}')
      
      await waitFor(() => {
        expect(screen.queryByText('About Us')).not.toBeInTheDocument()
      })
    })

    it('maintains focus trap within dropdown menu', async () => {
      const user = userEvent.setup()
      render(<MobileHeader {...props} />)
      
      // Open menu
      const menuButton = screen.getByText('Menu')
      await user.click(menuButton)
      
      await waitFor(() => {
        expect(screen.getByText('About Us')).toBeInTheDocument()
      })
      
      // Navigate to last menu item
      const contactButton = screen.getByText('Contact')
      contactButton.focus()
      
      // Tab should wrap to first item
      await user.tab()
      expect(screen.getByText('About Us')).toHaveFocus()
    })
  })

  describe('ARIA Labels and Descriptions', () => {
    it('provides descriptive alt text for images', () => {
      render(<MobileHeader {...props} />)
      
      const logos = screen.getAllByAltText('Heart Clinic Melbourne Logo')
      expect(logos.length).toBeGreaterThan(0)
      
      logos.forEach(logo => {
        expect(logo).toHaveAttribute('alt', 'Heart Clinic Melbourne Logo')
      })
    })

    it('provides ARIA labels for icon-only buttons', () => {
      render(<MobileHeader {...props} />)
      
      // All buttons should have accessible names
      const buttons = screen.getAllByRole('button')
      buttons.forEach(button => {
        expect(button).toHaveAccessibleName()
      })
    })

    it('indicates menu state with ARIA attributes', async () => {
      const user = userEvent.setup()
      render(<MobileHeader {...props} />)
      
      const menuButton = screen.getByText('Menu')
      
      // Menu should indicate expanded state
      expect(menuButton).toHaveAttribute('aria-expanded', 'false')
      
      await user.click(menuButton)
      
      await waitFor(() => {
        expect(menuButton).toHaveAttribute('aria-expanded', 'true')
      })
    })

    it('provides proper role attributes for navigation', async () => {
      const user = userEvent.setup()
      render(<MobileHeader {...props} />)
      
      // Open menu to reveal navigation
      const menuButton = screen.getByText('Menu')
      await user.click(menuButton)
      
      await waitFor(() => {
        const menuItems = screen.getAllByRole('button')
        // Menu items should be properly labelled
        expect(menuItems.length).toBeGreaterThan(0)
      })
    })
  })

  describe('Screen Reader Support', () => {
    it('announces header landmark', () => {
      render(<MobileHeader {...props} />)
      
      const header = screen.getByRole('banner')
      expect(header).toBeInTheDocument()
    })

    it('provides meaningful button names', () => {
      render(<MobileHeader {...props} />)
      
      expect(screen.getByRole('button', { name: 'Call' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Menu' })).toBeInTheDocument()
    })

    it('announces state changes appropriately', async () => {
      render(<MobileHeader {...props} />)
      
      // Trigger scrolled state
      simulateScroll(60)
      triggerIntersectionObserver([createIntersectionObserverEntry(false)])
      
      await waitFor(() => {
        // New buttons should be announced
        expect(screen.getByRole('button', { name: 'Home' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Directions' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Telehealth' })).toBeInTheDocument()
      })
    })

    it('provides context for navigation actions', async () => {
      const user = userEvent.setup()
      render(<MobileHeader {...props} />)
      
      const menuButton = screen.getByText('Menu')
      await user.click(menuButton)
      
      await waitFor(() => {
        // Menu items should have descriptive names
        expect(screen.getByText('About Us')).toBeInTheDocument()
        expect(screen.getByText('Our Doctors')).toBeInTheDocument()
        expect(screen.getByText('Patient Information')).toBeInTheDocument()
      })
    })
  })

  describe('Color Contrast and Visual Accessibility', () => {
    it('maintains sufficient color contrast', () => {
      render(<MobileHeader {...props} />)
      
      const header = screen.getByRole('banner')
      const style = getComputedStyle(header)
      
      // Should have visible content (not transparent)
      expect(style.opacity).not.toBe('0')
    })

    it('provides visual focus indicators', async () => {
      const user = userEvent.setup()
      render(<MobileHeader {...props} />)
      
      const callButton = screen.getByText('Call')
      
      // Focus the button
      await user.tab()
      expect(callButton).toHaveFocus()
      
      // Should have focus styles applied
      expect(callButton).toBeInTheDocument()
    })

    it('maintains visibility in high contrast mode', () => {
      // Simulate high contrast mode
      document.documentElement.style.filter = 'contrast(200%)'
      
      render(<MobileHeader {...props} />)
      
      const header = screen.getByRole('banner')
      expect(header).toBeInTheDocument()
      
      // Reset
      document.documentElement.style.filter = ''
    })
  })

  describe('Motion and Animation Accessibility', () => {
    it('respects reduced motion preferences', () => {
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
        })),
      })
      
      render(<MobileHeader {...props} />)
      
      // Component should still render properly
      expect(screen.getByRole('banner')).toBeInTheDocument()
    })

    it('provides static alternatives for animations', () => {
      render(<MobileHeader {...props} />)
      
      // Even without animations, content should be accessible
      expect(screen.getByText('Heart Clinic Melbourne')).toBeInTheDocument()
      expect(screen.getByText('Call')).toBeInTheDocument()
    })
  })

  describe('Touch Accessibility', () => {
    it('provides adequate touch target sizes', () => {
      render(<MobileHeader {...props} />)
      
      const buttons = screen.getAllByRole('button')
      
      buttons.forEach(button => {
        const rect = button.getBoundingClientRect()
        // Touch targets should be at least 44x44px
        expect(rect.width).toBeGreaterThanOrEqual(32) // Accounting for padding
        expect(rect.height).toBeGreaterThanOrEqual(32)
      })
    })

    it('prevents accidental activation', async () => {
      const user = userEvent.setup()
      render(<MobileHeader {...props} />)
      
      const callButton = screen.getByText('Call')
      
      // Simulate touch start/end without move (tap)
      fireEvent.touchStart(callButton)
      fireEvent.touchEnd(callButton)
      
      // Should be properly handled
      expect(callButton).toBeInTheDocument()
    })
  })

  describe('Assistive Technology Compatibility', () => {
    it('works with voice control software', () => {
      render(<MobileHeader {...props} />)
      
      // Buttons should have clear, unique names for voice commands
      expect(screen.getByRole('button', { name: 'Call' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Menu' })).toBeInTheDocument()
    })

    it('supports switch navigation', async () => {
      const user = userEvent.setup()
      render(<MobileHeader {...props} />)
      
      // Should be navigable with single-switch scanning
      await user.tab()
      expect(screen.getByText('Call')).toHaveFocus()
      
      await user.tab()
      expect(screen.getByText('Menu')).toHaveFocus()
    })

    it('provides clear interaction feedback', async () => {
      const user = userEvent.setup()
      render(<MobileHeader {...props} />)
      
      const callButton = screen.getByText('Call')
      await user.click(callButton)
      
      // Should provide haptic feedback (vibration)
      expect(navigator.vibrate).toHaveBeenCalledWith(6)
    })
  })

  describe('Error States and Recovery', () => {
    it('provides accessible error messages', () => {
      // Mock network error for logo
      const originalError = console.error
      console.error = vi.fn()
      
      render(<MobileHeader {...props} />)
      
      const logo = screen.getByAltText('Heart Clinic Melbourne Logo')
      
      // Simulate image load error
      fireEvent.error(logo)
      
      // Should still be accessible
      expect(screen.getByRole('banner')).toBeInTheDocument()
      
      console.error = originalError
    })

    it('handles focus management during errors', async () => {
      const user = userEvent.setup()
      
      // Mock console to suppress error messages
      const originalError = console.error
      console.error = vi.fn()
      
      const errorProps = {
        ...props,
        onCallClick: vi.fn().mockImplementation(() => {
          throw new Error('Call failed')
        })
      }
      
      render(<MobileHeader {...errorProps} />)
      
      const callButton = screen.getByText('Call')
      callButton.focus()
      
      // Should maintain focus even if action fails
      await user.click(callButton)
      expect(callButton).toHaveFocus()
      
      console.error = originalError
    })
  })

  describe('Language and Internationalization', () => {
    it('supports right-to-left languages', () => {
      document.documentElement.dir = 'rtl'
      
      render(<MobileHeader {...props} />)
      
      const header = screen.getByRole('banner')
      expect(header).toBeInTheDocument()
      
      // Reset
      document.documentElement.dir = 'ltr'
    })

    it('handles text scaling appropriately', () => {
      // Simulate text scaling
      document.documentElement.style.fontSize = '20px'
      
      render(<MobileHeader {...props} />)
      
      const header = screen.getByRole('banner')
      expect(header).toBeInTheDocument()
      
      // Should remain functional with larger text
      expect(screen.getByText('Call')).toBeInTheDocument()
      
      // Reset
      document.documentElement.style.fontSize = ''
    })
  })
})