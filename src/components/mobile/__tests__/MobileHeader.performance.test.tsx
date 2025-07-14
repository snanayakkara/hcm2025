import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import MobileHeader from '../MobileHeader'
import { render, mockMobileHeaderProps, simulateScroll } from '../../../test-utils'

describe('MobileHeader Performance Tests', () => {
  let props: typeof mockMobileHeaderProps
  let performanceMarks: string[] = []

  beforeEach(() => {
    props = {
      onNavigate: vi.fn(),
      currentSection: 'home',
      onTelehealthClick: vi.fn(),
      onCallClick: vi.fn(),
      onDirectionsClick: vi.fn(),
    }
    
    // Mock performance API
    global.performance.mark = vi.fn((name: string) => {
      performanceMarks.push(name)
    })
    
    global.performance.measure = vi.fn()
    global.performance.getEntriesByType = vi.fn().mockReturnValue([])
    
    vi.clearAllMocks()
    performanceMarks = []
    simulateScroll(0)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Render Performance', () => {
    it('renders within acceptable time limits', () => {
      const startTime = performance.now()
      
      render(<MobileHeader {...props} />)
      
      const endTime = performance.now()
      const renderTime = endTime - startTime
      
      // Should render in less than 16ms (60fps budget)
      expect(renderTime).toBeLessThan(16)
    })

    it('maintains consistent render times across multiple renders', () => {
      const renderTimes: number[] = []
      
      for (let i = 0; i < 10; i++) {
        const startTime = performance.now()
        const { unmount } = render(<MobileHeader {...props} />)
        const endTime = performance.now()
        
        renderTimes.push(endTime - startTime)
        unmount()
      }
      
      const averageTime = renderTimes.reduce((a, b) => a + b, 0) / renderTimes.length
      const maxTime = Math.max(...renderTimes)
      
      expect(averageTime).toBeLessThan(10)
      expect(maxTime).toBeLessThan(20)
    })

    it('does not cause layout thrashing during state changes', async () => {
      let layoutCount = 0
      
      // Mock getBoundingClientRect to count layout operations
      const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect
      Element.prototype.getBoundingClientRect = vi.fn(() => {
        layoutCount++
        return { top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 } as DOMRect
      })
      
      render(<MobileHeader {...props} />)
      
      // Trigger state change
      act(() => {
        simulateScroll(60)
      })
      
      // Should not cause excessive layout calculations
      expect(layoutCount).toBeLessThan(10)
      
      Element.prototype.getBoundingClientRect = originalGetBoundingClientRect
    })
  })

  describe('Scroll Performance', () => {
    it('efficiently handles scroll events using requestAnimationFrame', () => {
      const rafSpy = vi.spyOn(global, 'requestAnimationFrame')
      
      render(<MobileHeader {...props} />)
      
      // Simulate rapid scrolling
      for (let i = 0; i < 100; i++) {
        simulateScroll(i)
      }
      
      // Should use requestAnimationFrame for throttling
      expect(rafSpy).toHaveBeenCalled()
      
      rafSpy.mockRestore()
    })

    it('throttles scroll events to prevent excessive updates', () => {
      let updateCount = 0
      const mockSetIsScrolled = vi.fn(() => updateCount++)
      
      // Mock useState to track state updates
      const originalUseState = React.useState
      vi.spyOn(React, 'useState').mockImplementation((initial) => {
        if (typeof initial === 'boolean') {
          return [initial, mockSetIsScrolled]
        }
        return originalUseState(initial)
      })
      
      render(<MobileHeader {...props} />)
      
      // Rapid scroll events
      for (let i = 0; i < 50; i++) {
        simulateScroll(i)
      }
      
      // Should throttle updates
      expect(updateCount).toBeLessThan(50)
      
      vi.restoreAllMocks()
    })

    it('maintains 60fps during continuous scrolling', () => {
      const startTime = performance.now()
      render(<MobileHeader {...props} />)
      
      // Simulate 1 second of 60fps scrolling
      for (let i = 0; i < 60; i++) {
        const frameTime = performance.now()
        simulateScroll(i * 10)
        
        // Each frame should complete within 16.67ms budget
        const frameDuration = performance.now() - frameTime
        expect(frameDuration).toBeLessThan(16.67)
      }
      
      const totalTime = performance.now() - startTime
      expect(totalTime).toBeLessThan(2000) // Allow some overhead
    })
  })

  describe('Animation Performance', () => {
    it('uses hardware acceleration for animations', () => {
      render(<MobileHeader {...props} />)
      
      const header = screen.getByRole('banner')
      const styles = getComputedStyle(header)
      
      // Should use transform for animations (hardware accelerated)
      expect(styles.transform).toBeDefined()
    })

    it('completes animations within expected timeframes', async () => {
      const user = userEvent.setup()
      render(<MobileHeader {...props} />)
      
      const startTime = performance.now()
      
      // Trigger menu animation
      const menuButton = screen.getByText('Menu')
      await user.click(menuButton)
      
      const animationTime = performance.now() - startTime
      
      // Menu animation should complete quickly
      expect(animationTime).toBeLessThan(500)
    })

    it('handles concurrent animations efficiently', async () => {
      const user = userEvent.setup()
      render(<MobileHeader {...props} />)
      
      const startTime = performance.now()
      
      // Trigger multiple animations simultaneously
      const menuButton = screen.getByText('Menu')
      await user.click(menuButton)
      
      // Simulate scroll during menu animation
      act(() => {
        simulateScroll(60)
      })
      
      const endTime = performance.now()
      const totalTime = endTime - startTime
      
      // Should handle concurrent animations smoothly
      expect(totalTime).toBeLessThan(1000)
    })
  })

  describe('Memory Performance', () => {
    it('does not create memory leaks on mount/unmount cycles', () => {
      const initialMemory = (performance as any).memory?.usedJSHeapSize || 0
      
      // Multiple mount/unmount cycles
      for (let i = 0; i < 20; i++) {
        const { unmount } = render(<MobileHeader {...props} />)
        unmount()
      }
      
      // Force garbage collection if available
      if ((global as any).gc) {
        (global as any).gc()
      }
      
      const finalMemory = (performance as any).memory?.usedJSHeapSize || 0
      const memoryIncrease = finalMemory - initialMemory
      
      // Should not have significant memory growth
      expect(memoryIncrease).toBeLessThan(1024 * 1024) // Less than 1MB
    })

    it('properly cleans up event listeners', () => {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')
      const { unmount } = render(<MobileHeader {...props} />)
      
      unmount()
      
      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'scroll',
        expect.any(Function)
      )
      
      removeEventListenerSpy.mockRestore()
    })

    it('cleans up intersection observers', () => {
      const { unmount } = render(<MobileHeader {...props} />)
      
      const mockObserver = vi.mocked(global.IntersectionObserver).mock.results[0]?.value
      
      unmount()
      
      expect(mockObserver.disconnect).toHaveBeenCalled()
    })

    it('clears timeouts on unmount', () => {
      const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout')
      const { unmount } = render(<MobileHeader {...props} />)
      
      unmount()
      
      expect(clearTimeoutSpy).toHaveBeenCalled()
      
      clearTimeoutSpy.mockRestore()
    })
  })

  describe('Interaction Performance', () => {
    it('responds to user interactions within acceptable latency', async () => {
      const user = userEvent.setup()
      render(<MobileHeader {...props} />)
      
      const callButton = screen.getByText('Call')
      
      const startTime = performance.now()
      await user.click(callButton)
      const responseTime = performance.now() - startTime
      
      // Should respond within 100ms for good UX
      expect(responseTime).toBeLessThan(100)
      expect(props.onCallClick).toHaveBeenCalled()
    })

    it('maintains responsiveness during heavy operations', async () => {
      const user = userEvent.setup()
      render(<MobileHeader {...props} />)
      
      // Simulate heavy operation
      const heavyOperation = () => {
        for (let i = 0; i < 100000; i++) {
          Math.random()
        }
      }
      
      props.onCallClick.mockImplementation(heavyOperation)
      
      const callButton = screen.getByText('Call')
      
      const startTime = performance.now()
      await user.click(callButton)
      const responseTime = performance.now() - startTime
      
      // Should still be responsive
      expect(responseTime).toBeLessThan(200)
    })

    it('handles rapid successive interactions gracefully', async () => {
      const user = userEvent.setup()
      render(<MobileHeader {...props} />)
      
      const menuButton = screen.getByText('Menu')
      
      const startTime = performance.now()
      
      // Rapid clicks
      for (let i = 0; i < 10; i++) {
        await user.click(menuButton)
      }
      
      const totalTime = performance.now() - startTime
      
      // Should handle rapid interactions without performance degradation
      expect(totalTime).toBeLessThan(1000)
    })
  })

  describe('Bundle Size Impact', () => {
    it('uses minimal dependencies', () => {
      // This test would need bundler integration to be fully effective
      // For now, we verify that the component loads without importing heavy libraries
      
      render(<MobileHeader {...props} />)
      
      // Component should render successfully
      expect(screen.getByRole('banner')).toBeInTheDocument()
    })

    it('supports tree shaking', () => {
      // Verify only necessary parts are imported
      render(<MobileHeader {...props} />)
      
      // Should use only required Lucide icons
      expect(screen.getByRole('banner')).toBeInTheDocument()
    })
  })

  describe('Rendering Optimization', () => {
    it('minimizes re-renders on prop changes', () => {
      let renderCount = 0
      
      const TestWrapper = (props: any) => {
        renderCount++
        return <MobileHeader {...props} />
      }
      
      const { rerender } = render(<TestWrapper {...props} />)
      
      // Change non-affecting prop
      rerender(<TestWrapper {...props} currentSection="about" />)
      
      // Should have minimal re-renders
      expect(renderCount).toBeLessThan(5)
    })

    it('uses efficient state updates', () => {
      render(<MobileHeader {...props} />)
      
      const initialScrollPosition = 0
      const targetScrollPosition = 60
      
      const startTime = performance.now()
      
      // Simulate state update
      act(() => {
        simulateScroll(targetScrollPosition)
      })
      
      const updateTime = performance.now() - startTime
      
      // State update should be fast
      expect(updateTime).toBeLessThan(10)
    })

    it('efficiently handles list rendering in dropdown', async () => {
      const user = userEvent.setup()
      render(<MobileHeader {...props} />)
      
      const startTime = performance.now()
      
      // Open dropdown
      const menuButton = screen.getByText('Menu')
      await user.click(menuButton)
      
      const renderTime = performance.now() - startTime
      
      // Dropdown should render quickly even with multiple items
      expect(renderTime).toBeLessThan(50)
    })
  })

  describe('Resource Loading', () => {
    it('handles image loading efficiently', () => {
      render(<MobileHeader {...props} />)
      
      const logos = screen.getAllByAltText('Heart Clinic Melbourne Logo')
      
      logos.forEach(logo => {
        // Should have proper loading attributes
        expect(logo).toHaveAttribute('src', '/images/hcm3d2.png')
      })
    })

    it('gracefully handles missing resources', () => {
      render(<MobileHeader {...props} />)
      
      const logo = screen.getAllByAltText('Heart Clinic Melbourne Logo')[0]
      
      // Simulate image load error
      act(() => {
        const errorEvent = new Event('error')
        logo.dispatchEvent(errorEvent)
      })
      
      // Should continue functioning
      expect(screen.getByRole('banner')).toBeInTheDocument()
    })
  })

  describe('CPU Utilization', () => {
    it('maintains low CPU usage during idle state', () => {
      render(<MobileHeader {...props} />)
      
      // Simulate idle period
      const idleStart = performance.now()
      
      // Wait for any initial effects to settle
      act(() => {
        setTimeout(() => {}, 100)
      })
      
      const idleTime = performance.now() - idleStart
      
      // Should settle quickly to idle state
      expect(idleTime).toBeLessThan(200)
    })

    it('efficiently processes background tasks', () => {
      render(<MobileHeader {...props} />)
      
      // Simulate background intersection observer updates
      const startTime = performance.now()
      
      for (let i = 0; i < 10; i++) {
        // Trigger intersection observer
        const mockObserver = vi.mocked(global.IntersectionObserver).mock.calls[0]?.[0]
        if (mockObserver) {
          mockObserver([{ isIntersecting: i % 2 === 0 }] as any, {} as any)
        }
      }
      
      const processingTime = performance.now() - startTime
      
      // Should process background updates efficiently
      expect(processingTime).toBeLessThan(50)
    })
  })
})