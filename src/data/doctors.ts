export interface Doctor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  qualifications: string;
  education: string;
  degrees: string;
  expertise: string[];
  image: string;
  locations: string[];
  description: string;
  color: string;
  experience: string;
  specialization: string;
  mobileColor: string;
}

export const doctors: Doctor[] = [
  {
    id: 'freilich',
    name: "Dr Mark Freilich",
    title: "General & Interventional Cardiologist",
    specialty: "Interventional Cardiologist",
    specialization: "Coronary Interventions",
    education: "MBBS (Hons) Monash University 1999, Fellowship Lahey Clinic Medical Centre Boston",
    degrees: "MBBS FRACP",
    qualifications: "MBBS (Hons) FRACP",
    expertise: ["Radial (wrist) approach coronary angiography", "Interventional cardiology", "Coronary angiograms", "General cardiology"],
    image: "/images/freilich.png",
    locations: ["Cabrini Hospital Malvern"],
    description: "Dr Freilich is a pioneer in radial approach coronary angiography in Melbourne, having trained in this advanced technique in the United States. He specialises in interventional cardiac procedures with extensive experience in coronary interventions.",
    color: '#148792',
    mobileColor: 'from-primary-500 to-primary-600',
    experience: '25+ years',
  },
  {
    id: 'ngu',
    name: "Dr Phillip Ngu",
    title: "General Cardiologist & Cardiac Imaging Specialist",
    specialty: "Non-Invasive Imaging",
    specialization: "Cardiac Imaging & General Cardiology",
    education: "MBBS (Hons) Monash University 2007, Cardiac Imaging Fellowship Alfred Hospital 2017",
    degrees: "MBBS FRACP",
    qualifications: "MBBS (Hons) FRACP",
    expertise: ["Echocardiography (resting, stress, TOE)", "CT coronary angiography", "Cardiac MRI", "Multi-modality imaging"],
    image: "/images/ngu.png",
    locations: ["The Alfred Hospital"],
    description: "Dr Ngu specialises in advanced cardiac imaging and uses multi-modality imaging techniques to better understand cardiac disease and improve patient outcomes. His expertise spans all forms of non-invasive cardiac assessment.",
    color: '#4a787d',
    mobileColor: 'from-sage-500 to-sage-600',
    experience: '17+ years',
  },
  {
    id: 'voskoboinik',
    name: "A/Prof Alex Voskoboinik",
    title: "General Cardiologist & Electrophysiologist",
    specialty: "Electrophysiologist",
    specialization: "Cardiac Rhythm Disturbances",
    education: "MBBS (Hons) Monash University 2008, PhD Baker Heart Institute 2019, Electrophysiology Fellowship UCSF 2019",
    degrees: "MBBS PhD FRACP",
    qualifications: "MBBS (Hons) FRACP PhD",
    expertise: ["Pacemaker implantation", "Defibrillator implantation", "Catheter ablation", "Atrial fibrillation treatment"],
    image: "/images/vosko.png",
    locations: ["The Alfred Hospital", "Cabrini Hospital Malvern", "Epworth Hospital"],
    description: "Associate Professor Voskoboinik is a leading electrophysiologist specializing in rhythm disorders. He has extensive research experience and has won prestigious awards including the Ralph Reader Prize for top young investigator.",
    color: '#3bd7d6',
    mobileColor: 'from-accent-500 to-accent-600',
    experience: '16+ years',
  },
  {
    id: 'nanayakkara',
    name: "Dr Shane Nanayakkara",
    title: "General Cardiologist, Interventional & Structural Cardiologist and Heart Failure Specialist",
    specialty: "Interventional/Structural and Heart Failure Cardiologist",
    specialization: "Coronary and Structural Heart Interventions, Heart Failure",
    education: "MBBS Monash University, PhD Heart Failure, Advanced Fellowships in Coronary Intervention and Structural Intervention",
    degrees: "MBBS PhD FRACP",
    qualifications: "MBBS FRACP PhD",
    expertise: ["Coronary angiography", "Coronary stenting", "Transcatheter valve procedures", "Structural heart interventions"],
    image: "/images/nanayakkara.png",
    locations: ["The Alfred Hospital", "Cabrini Hospital Malvern", "Epworth Hospital"],
    description: "Dr Nanayakkara is an interventional and structural cardiologist with expertise in advanced procedures including transcatheter valve interventions. He combines clinical excellence with research innovation and has a passion for both face-to-face and telemedicine care.",
    color: '#79e7e1',
    mobileColor: 'from-cream-700 to-cream-800',
    experience: '14+ years',
  },
  {
    id: 'rowe',
    name: "Dr Kate Rowe",
    title: "General Cardiologist & Cardiac Imaging Specialist",
    specialty: "Cardiac Imaging & Valvular Heart Disease",
    specialization: "Cardiac Imaging & Valvular Heart Disease",
    education: "MBBS Monash University 2013, Cardiac Imaging Fellowship Alfred Hospital 2023",
    degrees: "MBBS FRACP",
    qualifications: "MBBS FRACP",
    expertise: ["Echocardiography (resting, stress, TOE)", "Valvular heart disease", "Cardiac imaging", "Women's cardiac health"],
    image: "/images/rowe.png",
    locations: ["The Alfred Hospital", "Cabrini Hospital Malvern"],
    description: "Dr Rowe is a cardiac imaging specialist with particular expertise in valvular heart disease and echocardiography. She has a special interest in women's cardiac health and provides comprehensive cardiac care with a focus on patient-centered approach.",
    color: '#e879cd',
    mobileColor: 'from-pink-500 to-pink-600',
    experience: '11+ years',
  },
];