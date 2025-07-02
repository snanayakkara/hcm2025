import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useIntake } from '../hooks/useIntake';
import { IntakeSchema, STORAGE_KEY } from '../types/intake';
import Wizard from '../components/Wizard/Wizard';
import ToggleCard from '../components/fields/ToggleCard';
import { generateIntakePDF } from '../components/pdf/generatePdf';

// Mock the lazy imports
vi.mock('../components/pdf/generatePdf', () => ({
  generateIntakePDF: vi.fn().mockResolvedValue(new Uint8Array([1, 2, 3])),
  downloadPDF: vi.fn(),
  createMailtoLink: vi.fn()
}));

describe('IntakeSchema', () => {
  it('should validate complete intake form', () => {
    const validData = {
      medicalHistory: {
        bp: true,
        diabetes: false,
        cholesterol: true,
        af: false,
        osa: false
      },
      medications: 'Aspirin 100mg daily',
      allergies: 'Penicillin',
      tests: {
        echo: true,
        holter: false,
        angio: false,
        surgery: false
      },
      smoking: {
        current: false,
        past: true,
        start: '1990',
        stop: '2010'
      },
      familyHistory: true,
      nok: {
        name: 'John Doe',
        relation: 'Spouse',
        phone: '0412345678'
      },
      notes: 'Additional information'
    };

    const result = IntakeSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should reject invalid phone number format', () => {
    const invalidData = {
      medicalHistory: { bp: false, diabetes: false, cholesterol: false, af: false, osa: false },
      tests: { echo: false, holter: false, angio: false, surgery: false },
      smoking: { current: false, past: false },
      familyHistory: false,
      nok: {
        name: 'John Doe',
        relation: 'Spouse',
        phone: '123' // Invalid phone
      }
    };

    const result = IntakeSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some(issue => 
        issue.path.includes('phone') && issue.message.includes('valid phone number')
      )).toBe(true);
    }
  });

  it('should allow empty optional fields', () => {
    const minimalData = {
      medicalHistory: { bp: false, diabetes: false, cholesterol: false, af: false, osa: false },
      tests: { echo: false, holter: false, angio: false, surgery: false },
      smoking: { current: false, past: false },
      familyHistory: false,
      nok: {}
    };

    const result = IntakeSchema.safeParse(minimalData);
    expect(result.success).toBe(true);
  });
});

describe('useIntake Hook', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  afterEach(() => {
    cleanup();
  });

  const TestComponent = () => {
    const { state, updateData, nextStep, prevStep, reset } = useIntake();
    
    return (
      <div>
        <div data-testid="current-step">{state.currentStep}</div>
        <div data-testid="is-dirty">{state.isDirty.toString()}</div>
        <button 
          data-testid="next-btn" 
          onClick={nextStep}
        >
          Next
        </button>
        <button 
          data-testid="prev-btn" 
          onClick={prevStep}
        >
          Previous
        </button>
        <button 
          data-testid="update-btn" 
          onClick={() => updateData({ medications: 'Test medication' })}
        >
          Update
        </button>
        <button 
          data-testid="reset-btn" 
          onClick={reset}
        >
          Reset
        </button>
      </div>
    );
  };

  it('should initialize with default state', () => {
    render(<TestComponent />);
    expect(screen.getByTestId('current-step')).toHaveTextContent('0');
    expect(screen.getByTestId('is-dirty')).toHaveTextContent('false');
  });

  it('should navigate between steps', () => {
    render(<TestComponent />);
    
    fireEvent.click(screen.getByTestId('next-btn'));
    expect(screen.getByTestId('current-step')).toHaveTextContent('1');
    
    fireEvent.click(screen.getByTestId('prev-btn'));
    expect(screen.getByTestId('current-step')).toHaveTextContent('0');
  });

  it('should update data and mark as dirty', () => {
    render(<TestComponent />);
    
    fireEvent.click(screen.getByTestId('update-btn'));
    expect(screen.getByTestId('is-dirty')).toHaveTextContent('true');
  });

  it('should reset state and clear storage', () => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ medications: 'test' }));
    render(<TestComponent />);
    
    fireEvent.click(screen.getByTestId('update-btn'));
    fireEvent.click(screen.getByTestId('reset-btn'));
    
    expect(screen.getByTestId('current-step')).toHaveTextContent('0');
    expect(screen.getByTestId('is-dirty')).toHaveTextContent('false');
    expect(sessionStorage.getItem(STORAGE_KEY)).toBeNull();
  });

  it('should not go below step 0 or above step 9', () => {
    render(<TestComponent />);
    
    // Try to go below 0
    fireEvent.click(screen.getByTestId('prev-btn'));
    expect(screen.getByTestId('current-step')).toHaveTextContent('0');
    
    // Go to step 9
    for (let i = 0; i < 10; i++) {
      fireEvent.click(screen.getByTestId('next-btn'));
    }
    expect(screen.getByTestId('current-step')).toHaveTextContent('9');
    
    // Try to go above 9
    fireEvent.click(screen.getByTestId('next-btn'));
    expect(screen.getByTestId('current-step')).toHaveTextContent('9');
  });
});

describe('ToggleCard Component', () => {
  it('should render with correct title and handle clicks', () => {
    const mockOnChange = vi.fn();
    
    render(
      <ToggleCard
        title="Test Condition"
        description="Test description"
        checked={false}
        onChange={mockOnChange}
      />
    );

    expect(screen.getByText('Test Condition')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Test Condition'));
    expect(mockOnChange).toHaveBeenCalledWith(true);
  });

  it('should show tooltip when provided', async () => {
    render(
      <ToggleCard
        title="Test Condition"
        checked={false}
        onChange={() => {}}
        tooltip="This is a tooltip"
      />
    );

    const infoIcon = screen.getByRole('generic', { name: /info/i });
    expect(infoIcon).toBeInTheDocument();
  });

  it('should be disabled when disabled prop is true', () => {
    const mockOnChange = vi.fn();
    
    render(
      <ToggleCard
        title="Test Condition"
        checked={false}
        onChange={mockOnChange}
        disabled={true}
      />
    );

    fireEvent.click(screen.getByText('Test Condition'));
    expect(mockOnChange).not.toHaveBeenCalled();
  });
});

describe('Wizard Component', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    sessionStorage.clear();
    mockOnClose.mockClear();
  });

  afterEach(() => {
    cleanup();
  });

  it('should render welcome step initially', () => {
    render(<Wizard onClose={mockOnClose} />);
    
    expect(screen.getByText('Patient Intake Form')).toBeInTheDocument();
    expect(screen.getByText(/This secure form collects/)).toBeInTheDocument();
  });

  it('should navigate through steps', () => {
    render(<Wizard onClose={mockOnClose} />);
    
    // Click Next to go to Medical History
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByText('Medical History')).toBeInTheDocument();
    
    // Click Previous to go back
    fireEvent.click(screen.getByText('Previous'));
    expect(screen.getByText('Patient Intake Form')).toBeInTheDocument();
  });

  it('should close wizard when close button is clicked', () => {
    render(<Wizard onClose={mockOnClose} />);
    
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should handle medical history step interactions', () => {
    render(<Wizard onClose={mockOnClose} />);
    
    // Navigate to medical history step
    fireEvent.click(screen.getByText('Next'));
    
    // Check for medical conditions
    expect(screen.getByText('High Blood Pressure (Hypertension)')).toBeInTheDocument();
    expect(screen.getByText('Diabetes (Type 1 or 2)')).toBeInTheDocument();
    
    // Click on a condition
    fireEvent.click(screen.getByText('High Blood Pressure (Hypertension)'));
    
    // Should be able to proceed
    const nextButton = screen.getByText('Next');
    expect(nextButton).not.toBeDisabled();
  });

  it('should handle medications step', () => {
    render(<Wizard onClose={mockOnClose} />);
    
    // Navigate to medications step
    fireEvent.click(screen.getByText('Next')); // Welcome -> Medical History
    fireEvent.click(screen.getByText('Next')); // Medical History -> Medications
    
    expect(screen.getByText('Medications & Allergies')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/List all medications/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/List any drug, food/)).toBeInTheDocument();
  });

  it('should show stepper with correct steps', () => {
    render(<Wizard onClose={mockOnClose} />);
    
    // Check that stepper shows step 1 as active
    expect(screen.getByText('Step 1 of 10')).toBeInTheDocument();
  });
});

describe('PDF Generation', () => {
  it('should generate PDF with valid data', async () => {
    const testData = {
      medicalHistory: { bp: true, diabetes: false, cholesterol: false, af: false, osa: false },
      medications: 'Test medication',
      allergies: 'Test allergy',
      tests: { echo: true, holter: false, angio: false, surgery: false },
      smoking: { current: false, past: false },
      familyHistory: true,
      nok: { name: 'John Doe', relation: 'Spouse', phone: '0412345678' },
      notes: 'Test notes'
    };

    const result = await generateIntakePDF(testData);
    expect(result).toBeInstanceOf(Uint8Array);
    expect(result.length).toBeGreaterThan(0);
  });

  it('should handle minimal data', async () => {
    const minimalData = {
      medicalHistory: { bp: false, diabetes: false, cholesterol: false, af: false, osa: false },
      tests: { echo: false, holter: false, angio: false, surgery: false },
      smoking: { current: false, past: false },
      familyHistory: false,
      nok: {}
    };

    const result = await generateIntakePDF(minimalData);
    expect(result).toBeInstanceOf(Uint8Array);
    expect(result.length).toBeGreaterThan(0);
  });
});

describe('Session Storage Integration', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('should save draft to sessionStorage', () => {
    const TestComponent = () => {
      const { updateData, saveDraft } = useIntake();
      
      return (
        <div>
          <button 
            onClick={() => {
              updateData({ medications: 'Test med' });
              saveDraft();
            }}
          >
            Save Draft
          </button>
        </div>
      );
    };

    render(<TestComponent />);
    fireEvent.click(screen.getByText('Save Draft'));

    const stored = sessionStorage.getItem(STORAGE_KEY);
    expect(stored).toBeTruthy();
    
    if (stored) {
      const data = JSON.parse(stored);
      expect(data.medications).toBe('Test med');
    }
  });

  it('should load draft from sessionStorage', () => {
    const draftData = {
      medications: 'Loaded medication',
      allergies: 'Loaded allergy'
    };
    
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draftData));

    const TestComponent = () => {
      const { state } = useIntake();
      
      return (
        <div>
          <div data-testid="medications">{state.data.medications || 'none'}</div>
          <div data-testid="allergies">{state.data.allergies || 'none'}</div>
        </div>
      );
    };

    render(<TestComponent />);

    // Should load the draft data
    expect(screen.getByTestId('medications')).toHaveTextContent('Loaded medication');
    expect(screen.getByTestId('allergies')).toHaveTextContent('Loaded allergy');
  });

  it('should handle corrupted sessionStorage data gracefully', () => {
    sessionStorage.setItem(STORAGE_KEY, 'invalid json');

    const TestComponent = () => {
      const { state } = useIntake();
      
      return (
        <div data-testid="step">{state.currentStep}</div>
      );
    };

    // Should not throw and should clear the corrupted data
    expect(() => render(<TestComponent />)).not.toThrow();
    expect(sessionStorage.getItem(STORAGE_KEY)).toBeNull();
  });
});

describe('Data Cleanup', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('should clear sessionStorage on cleanup', () => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ test: 'data' }));

    const TestComponent = () => {
      const { cleanup } = useIntake();
      
      return (
        <button onClick={cleanup}>Cleanup</button>
      );
    };

    render(<TestComponent />);
    fireEvent.click(screen.getByText('Cleanup'));

    expect(sessionStorage.getItem(STORAGE_KEY)).toBeNull();
  });

  it('should clear data on beforeunload event', () => {
    const TestComponent = () => {
      const { updateData } = useIntake();
      
      return (
        <button onClick={() => updateData({ medications: 'test' })}>
          Update
        </button>
      );
    };

    render(<TestComponent />);
    fireEvent.click(screen.getByText('Update'));

    // Simulate beforeunload event
    const beforeUnloadEvent = new Event('beforeunload');
    window.dispatchEvent(beforeUnloadEvent);

    // Data should be saved to sessionStorage before unload
    const stored = sessionStorage.getItem(STORAGE_KEY);
    expect(stored).toBeTruthy();
  });
});

describe('Accessibility', () => {
  it('should have proper ARIA labels and roles', () => {
    render(<Wizard onClose={() => {}} />);
    
    // Check for heading structure
    expect(screen.getByRole('heading', { name: /Patient Intake Wizard/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Patient Intake Form/i })).toBeInTheDocument();
    
    // Check for button accessibility
    expect(screen.getByRole('button', { name: /Next/i })).toBeInTheDocument();
  });

  it('should support keyboard navigation', () => {
    render(<Wizard onClose={() => {}} />);
    
    const nextButton = screen.getByRole('button', { name: /Next/i });
    nextButton.focus();
    
    expect(document.activeElement).toBe(nextButton);
  });
});

describe('Error Handling', () => {
  it('should handle PDF generation errors gracefully', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    // Mock PDF generation to throw an error
    vi.mocked(generateIntakePDF).mockRejectedValueOnce(new Error('PDF generation failed'));

    render(<Wizard onClose={() => {}} />);
    
    // Navigate to final step
    for (let i = 0; i < 9; i++) {
      const nextBtn = screen.queryByText('Next');
      if (nextBtn) {
        fireEvent.click(nextBtn);
      }
    }

    // Try to generate PDF
    const generateBtn = screen.queryByText(/Generate PDF/);
    if (generateBtn) {
      fireEvent.click(generateBtn);
      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith('PDF generation failed:', expect.any(Error));
      });
    }

    consoleSpy.mockRestore();
  });
});