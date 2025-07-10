// Related cards mapping for PDF generation suggestions
export const relatedCards: Record<string, string[]> = {
  // General procedure related cards
  'general': ['echocardiogram', 'holter', 'exercise_stress_echo'],
  
  // Diagnostic test related cards
  'echocardiogram': ['exercise_stress_echo', 'cardiac_mri', 'general'],
  'exercise_stress_echo': ['echocardiogram', 'ctca', 'angiogram_pci'],
  'holter': ['echocardiogram', 'svt_ablation', 'af_ablation'],
  'ctca': ['exercise_stress_echo', 'angiogram_pci', 'cardiac_mri'],
  'cardiac_mri': ['echocardiogram', 'ctca', 'pyp_scan'],
  'pyp_scan': ['cardiac_mri', 'echocardiogram', 'general'],
  
  // Procedure related cards
  'angiogram_pci': ['ctca', 'exercise_stress_echo', 'cabg'],
  'cabg': ['angiogram_pci', 'ctca', 'general'],
  'tavi': ['echocardiogram', 'bav', 'general'],
  'bav': ['tavi', 'echocardiogram', 'general'],
  'mteer': ['echocardiogram', 'tavi', 'general'],
  'pacemaker': ['holter', 'general', 'echocardiogram'],
  'af_ablation': ['holter', 'toe_dcr', 'echocardiogram'],
  'svt_ablation': ['holter', 'af_ablation', 'general'],
  'toe_dcr': ['af_ablation', 'echocardiogram', 'holter'],
  'pfoclosure': ['echocardiogram', 'general', 'ctca'],
  'asd': ['echocardiogram', 'pfoclosure', 'general'],
  
  // Monitoring related cards
  'abpm': ['echocardiogram', 'general', 'holter'],
  'heartbug': ['holter', 'abpm', 'general'],
};