export interface StarterPack {
  id: string              // kebab-case
  name: string            // patient-facing title
  description: string
  procedureIds: string[]  // matches keys in procedureJourneys
}

export const starterPacks: StarterPack[] = [
  {
    id: 'coronary-workup',
    name: 'Coronary Work-up Pack',
    description: 'Complete assessment for coronary artery disease including imaging and intervention options',
    procedureIds: ['ctca', 'exercise_stress_echo', 'angiogram_pci']
  },
  {
    id: 'atrial-fibrillation-rhythm',
    name: 'Atrial Fibrillation Rhythm Pack',
    description: 'Comprehensive rhythm management for atrial fibrillation patients',
    procedureIds: ['toe_dcr', 'holter', 'af_ablation']
  },
  {
    id: 'valve-disease-aortic-stenosis',
    name: 'Valve Disease Pack (Aortic Stenosis)',
    description: 'Assessment and treatment options for aortic stenosis',
    procedureIds: ['echocardiogram', 'bav', 'tavi']
  },
  {
    id: 'hypertension-assessment',
    name: 'Hypertension Assessment Pack',
    description: 'Comprehensive blood pressure monitoring and cardiac assessment',
    procedureIds: ['abpm', 'echocardiogram']
  }
]