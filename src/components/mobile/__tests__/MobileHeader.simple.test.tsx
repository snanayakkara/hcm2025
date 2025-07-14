import { describe, it, expect, beforeEach, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { render } from '../../../test-utils'
import MobileHeader from '../MobileHeader'

describe('MobileHeader Simple Test', () => {
  const mockProps = {
    onNavigate: vi.fn(),
    currentSection: 'home',
    onTelehealthClick: vi.fn(),
    onCallClick: vi.fn(),
    onDirectionsClick: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders without crashing', () => {
    render(<MobileHeader {...mockProps} />)
    
    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()
  })

  it('shows clinic name', () => {
    render(<MobileHeader {...mockProps} />)
    
    expect(screen.getByText('Heart Clinic Melbourne')).toBeInTheDocument()
  })

  it('shows call and menu buttons', () => {
    render(<MobileHeader {...mockProps} />)
    
    expect(screen.getByText('Call')).toBeInTheDocument()
    expect(screen.getByText('Menu')).toBeInTheDocument()
  })
})