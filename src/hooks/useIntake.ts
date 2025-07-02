import { useReducer, useEffect, useCallback } from 'react';
import { IntakeState, IntakeAction, IntakeForm, IntakeSchema, STORAGE_KEY } from '../types/intake';

const initialState: IntakeState = {
  data: {
    medicalHistory: {
      bp: false,
      diabetes: false,
      cholesterol: false,
      af: false,
      osa: false
    },
    medications: '',
    allergies: '',
    tests: {
      echo: false,
      holter: false,
      angio: false,
      surgery: false
    },
    smoking: {
      current: false,
      past: false,
      start: '',
      stop: ''
    },
    familyHistory: false,
    nok: {
      name: '',
      relation: '',
      phone: ''
    },
    notes: ''
  },
  currentStep: 0,
  isValid: false,
  isDirty: false
};

function intakeReducer(state: IntakeState, action: IntakeAction): IntakeState {
  switch (action.type) {
    case 'UPDATE_DATA':
      return {
        ...state,
        data: { ...state.data, ...action.payload },
        isDirty: true
      };
    case 'SET_STEP':
      return {
        ...state,
        currentStep: Math.max(0, Math.min(action.payload, 9))
      };
    case 'NEXT_STEP':
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, 9)
      };
    case 'PREV_STEP':
      return {
        ...state,
        currentStep: Math.max(state.currentStep - 1, 0)
      };
    case 'SET_VALID':
      return {
        ...state,
        isValid: action.payload
      };
    case 'RESET':
      return initialState;
    case 'LOAD_DRAFT':
      return {
        ...state,
        data: { ...state.data, ...action.payload },
        isDirty: false
      };
    default:
      return state;
  }
}

export function useIntake() {
  const [state, dispatch] = useReducer(intakeReducer, initialState);

  const updateData = useCallback((data: Partial<IntakeForm>) => {
    dispatch({ type: 'UPDATE_DATA', payload: data });
  }, []);

  const nextStep = useCallback(() => {
    dispatch({ type: 'NEXT_STEP' });
  }, []);

  const prevStep = useCallback(() => {
    dispatch({ type: 'PREV_STEP' });
  }, []);

  const setStep = useCallback((step: number) => {
    dispatch({ type: 'SET_STEP', payload: step });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
    sessionStorage.removeItem(STORAGE_KEY);
  }, []);

  const validateCurrentStep = useCallback(() => {
    try {
      IntakeSchema.parse(state.data);
      dispatch({ type: 'SET_VALID', payload: true });
      return true;
    } catch {
      dispatch({ type: 'SET_VALID', payload: false });
      return false;
    }
  }, [state.data]);

  const saveDraft = useCallback(() => {
    if (state.isDirty) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state.data));
    }
  }, [state.data, state.isDirty]);

  const loadDraft = useCallback(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        dispatch({ type: 'LOAD_DRAFT', payload: data });
      }
    } catch (error) {
      console.error('Failed to load draft:', error);
      sessionStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const cleanup = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY);
    dispatch({ type: 'RESET' });
  }, []);

  useEffect(() => {
    loadDraft();
  }, [loadDraft]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (state.isDirty) {
        saveDraft();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [state.isDirty, saveDraft]);

  useEffect(() => {
    const interval = setInterval(saveDraft, 10000);
    return () => clearInterval(interval);
  }, [saveDraft]);

  return {
    state,
    updateData,
    nextStep,
    prevStep,
    setStep,
    reset,
    validateCurrentStep,
    saveDraft,
    loadDraft,
    cleanup
  };
}