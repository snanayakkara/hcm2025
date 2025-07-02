import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { IntakeForm } from '../../types/intake';

// Inter font URLs from Google Fonts
const INTER_REGULAR_URL = 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2';
const INTER_BOLD_URL = 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyfAZ9hiJ-Ek-_EeA.woff2';

async function fetchFont(url: string): Promise<ArrayBuffer> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch font: ${response.status}`);
    }
    return await response.arrayBuffer();
  } catch (error) {
    console.warn('Failed to load Inter font, falling back to Helvetica:', error);
    throw error;
  }
}

async function fetchLogo(): Promise<ArrayBuffer> {
  try {
    const response = await fetch('/images/hcm3d2.png');
    if (!response.ok) {
      throw new Error(`Failed to fetch logo: ${response.status}`);
    }
    return await response.arrayBuffer();
  } catch (error) {
    console.warn('Failed to load logo:', error);
    throw error;
  }
}

export async function generateIntakePDF(data: IntakeForm): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // A4 size in points
  const { width, height } = page.getSize();
  
  // Try to load Inter fonts, fallback to Helvetica if failed
  let font, boldFont;
  try {
    const [regularFontBytes, boldFontBytes] = await Promise.all([
      fetchFont(INTER_REGULAR_URL),
      fetchFont(INTER_BOLD_URL)
    ]);
    
    font = await pdfDoc.embedFont(regularFontBytes);
    boldFont = await pdfDoc.embedFont(boldFontBytes);
  } catch (error) {
    console.warn('Using fallback fonts:', error);
    font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  }

  // Try to load and embed logo
  let logo = null;
  try {
    const logoBytes = await fetchLogo();
    logo = await pdfDoc.embedPng(logoBytes);
  } catch (error) {
    console.warn('Logo not available, proceeding without logo:', error);
  }
  
  const marginLeft = 60;
  const marginRight = 60;
  const marginTop = 60;
  const logoHeight = 50;
  const logoWidth = 50;
  let currentY = height - marginTop;
  
  // Color palette
  const primaryBlue = rgb(0.118, 0.365, 0.549); // #1E5D8C
  const lightBlue = rgb(0.89, 0.945, 0.984); // #E3F1FB
  const darkGray = rgb(0.2, 0.2, 0.2); // #333333
  const lightGray = rgb(0.6, 0.6, 0.6); // #999999
  const veryLightGray = rgb(0.95, 0.95, 0.95); // #F2F2F2
  
  const drawText = (text: string, x: number, y: number, options: { font?: any; size?: number; color?: any; maxWidth?: number } = {}) => {
    let textToDraw = text;
    
    // Simple text wrapping if maxWidth is specified
    if (options.maxWidth && font) {
      const fontSize = options.size || 12;
      const textWidth = (text.length * fontSize * 0.6); // Rough estimation
      if (textWidth > options.maxWidth) {
        const maxChars = Math.floor(options.maxWidth / (fontSize * 0.6));
        if (text.length > maxChars) {
          textToDraw = text.substring(0, maxChars - 3) + '...';
        }
      }
    }
    
    page.drawText(textToDraw, {
      x,
      y,
      size: options.size || 12,
      font: options.font || font,
      color: options.color || darkGray,
    });
  };
  
  const drawRectangle = (x: number, y: number, width: number, height: number, color: any, borderColor?: any) => {
    page.drawRectangle({
      x,
      y,
      width,
      height,
      color,
      borderColor,
      borderWidth: borderColor ? 1 : 0,
    });
  };
  
  const drawLine = (startX: number, startY: number, endX: number, endY: number, color = lightGray, thickness = 1) => {
    page.drawLine({
      start: { x: startX, y: startY },
      end: { x: endX, y: endY },
      thickness,
      color,
    });
  };

  // Header with logo and clinic info
  if (logo) {
    const logoScale = Math.min(logoWidth / logo.width, logoHeight / logo.height);
    const scaledLogoWidth = logo.width * logoScale;
    const scaledLogoHeight = logo.height * logoScale;
    
    page.drawImage(logo, {
      x: marginLeft,
      y: currentY - scaledLogoHeight,
      width: scaledLogoWidth,
      height: scaledLogoHeight,
    });
  }
  
  // Clinic name and title
  const titleX = marginLeft + (logo ? logoWidth + 20 : 0);
  drawText('Heart Clinic Melbourne', titleX, currentY - 10, { 
    font: boldFont, 
    size: 24, 
    color: primaryBlue 
  });
  drawText('Patient Intake Summary', titleX, currentY - 35, { 
    font: boldFont, 
    size: 16, 
    color: darkGray 
  });
  
  // Date and time
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-AU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  const timeStr = today.toLocaleTimeString('en-AU', {
    hour: '2-digit',
    minute: '2-digit'
  });
  
  drawText(`Generated: ${dateStr} at ${timeStr}`, width - marginRight - 140, currentY - 10, { 
    size: 10, 
    color: lightGray 
  });
  drawText('Document ID: #' + Math.random().toString(36).substr(2, 9).toUpperCase(), 
    width - marginRight - 140, currentY - 25, { 
    size: 10, 
    color: lightGray 
  });
  
  currentY -= 80;
  
  // Elegant separator line
  drawLine(marginLeft, currentY, width - marginRight, currentY, primaryBlue, 2);
  currentY -= 30;
  
  // Helper function to create section
  const createSection = (title: string, content: () => number) => {
    // Section header with background
    drawRectangle(marginLeft - 10, currentY - 5, width - marginLeft - marginRight + 20, 25, lightBlue);
    drawText(title, marginLeft, currentY, { font: boldFont, size: 14, color: primaryBlue });
    currentY -= 35;
    
    // Section content
    currentY = content();
    currentY -= 15;
    
    return currentY;
  };
  
  // Medical History Section
  createSection('Medical History', () => {
    const medicalConditions = [
      { key: 'bp', label: 'High Blood Pressure (Hypertension)' },
      { key: 'diabetes', label: 'Diabetes' },
      { key: 'cholesterol', label: 'High Cholesterol' },
      { key: 'af', label: 'Atrial Fibrillation' },
      { key: 'osa', label: 'Obstructive Sleep Apnea' }
    ];
    
    const activeConditions = medicalConditions.filter(condition => 
      data.medicalHistory?.[condition.key as keyof typeof data.medicalHistory]
    );
    
    if (activeConditions.length > 0) {
      activeConditions.forEach(condition => {
        drawText('✓', marginLeft + 10, currentY, { color: rgb(0, 0.6, 0), size: 12 });
        drawText(condition.label, marginLeft + 25, currentY, { size: 11 });
        currentY -= 16;
      });
    } else {
      drawText('No significant medical history reported', marginLeft + 10, currentY, { 
        color: lightGray, 
        size: 11 
      });
      currentY -= 16;
    }
    
    return currentY;
  });
  
  // Medications Section
  if (data.medications && data.medications.trim()) {
    createSection('Current Medications', () => {
      const medicationLines = data.medications.split('\n').slice(0, 4);
      medicationLines.forEach(line => {
        if (line.trim()) {
          drawText('•', marginLeft + 10, currentY, { color: primaryBlue, size: 12 });
          drawText(line.trim(), marginLeft + 25, currentY, { size: 11, maxWidth: width - marginLeft - marginRight - 40 });
          currentY -= 16;
        }
      });
      return currentY;
    });
  }
  
  // Allergies Section
  if (data.allergies && data.allergies.trim()) {
    createSection('Known Allergies', () => {
      const allergyLines = data.allergies.split('\n').slice(0, 3);
      allergyLines.forEach(line => {
        if (line.trim()) {
          drawText('⚠', marginLeft + 10, currentY, { color: rgb(0.8, 0.4, 0), size: 12 });
          drawText(line.trim(), marginLeft + 25, currentY, { size: 11, maxWidth: width - marginLeft - marginRight - 40 });
          currentY -= 16;
        }
      });
      return currentY;
    });
  }
  
  // Cardiac Tests Section
  createSection('Previous Cardiac Tests & Procedures', () => {
    const tests = [
      { key: 'echo', label: 'Echocardiogram' },
      { key: 'holter', label: 'Holter Monitor (24-48hr)' },
      { key: 'angio', label: 'Angiogram/Catheterization' },
      { key: 'surgery', label: 'Previous Cardiac Surgery' }
    ];
    
    const completedTests = tests.filter(test => 
      data.tests?.[test.key as keyof typeof data.tests]
    );
    
    if (completedTests.length > 0) {
      completedTests.forEach(test => {
        drawText('✓', marginLeft + 10, currentY, { color: rgb(0, 0.6, 0), size: 12 });
        drawText(test.label, marginLeft + 25, currentY, { size: 11 });
        currentY -= 16;
      });
    } else {
      drawText('No previous cardiac tests or procedures reported', marginLeft + 10, currentY, { 
        color: lightGray, 
        size: 11 
      });
      currentY -= 16;
    }
    
    return currentY;
  });
  
  // Smoking History Section
  createSection('Smoking History', () => {
    if (data.smoking?.current) {
      drawText('🚬', marginLeft + 10, currentY, { size: 12 });
      drawText('Current smoker', marginLeft + 30, currentY, { size: 11, color: rgb(0.8, 0.2, 0.2) });
      currentY -= 16;
      if (data.smoking.start) {
        drawText(`Started smoking: ${data.smoking.start}`, marginLeft + 30, currentY, { size: 10, color: lightGray });
        currentY -= 14;
      }
    } else if (data.smoking?.past) {
      drawText('⊘', marginLeft + 10, currentY, { size: 12, color: rgb(0, 0.6, 0) });
      drawText('Former smoker (quit)', marginLeft + 30, currentY, { size: 11, color: rgb(0, 0.6, 0) });
      currentY -= 16;
      if (data.smoking.start) {
        drawText(`Smoking period: ${data.smoking.start}`, marginLeft + 30, currentY, { size: 10, color: lightGray });
        if (data.smoking.stop) {
          drawText(` - ${data.smoking.stop}`, marginLeft + 130, currentY, { size: 10, color: lightGray });
        }
        currentY -= 14;
      }
    } else {
      drawText('✓', marginLeft + 10, currentY, { color: rgb(0, 0.6, 0), size: 12 });
      drawText('Never smoked', marginLeft + 30, currentY, { size: 11, color: rgb(0, 0.6, 0) });
      currentY -= 16;
    }
    return currentY;
  });
  
  // Family History Section
  createSection('Family History', () => {
    if (data.familyHistory) {
      drawText('⚡', marginLeft + 10, currentY, { color: rgb(0.8, 0.4, 0), size: 12 });
      drawText('Family history of heart disease before age 65', marginLeft + 30, currentY, { size: 11, color: rgb(0.8, 0.4, 0) });
    } else {
      drawText('✓', marginLeft + 10, currentY, { color: rgb(0, 0.6, 0), size: 12 });
      drawText('No family history of early heart disease', marginLeft + 30, currentY, { size: 11 });
    }
    currentY -= 16;
    return currentY;
  });
  
  // Emergency Contact Section
  if (data.nok?.name || data.nok?.relation || data.nok?.phone) {
    createSection('Emergency Contact', () => {
      if (data.nok.name) {
        drawText('👤', marginLeft + 10, currentY, { size: 12 });
        drawText(`Name: ${data.nok.name}`, marginLeft + 30, currentY, { size: 11 });
        currentY -= 16;
      }
      
      if (data.nok.relation) {
        drawText('🔗', marginLeft + 10, currentY, { size: 12 });
        drawText(`Relationship: ${data.nok.relation}`, marginLeft + 30, currentY, { size: 11 });
        currentY -= 16;
      }
      
      if (data.nok.phone) {
        drawText('📞', marginLeft + 10, currentY, { size: 12 });
        drawText(`Phone: ${data.nok.phone}`, marginLeft + 30, currentY, { size: 11 });
        currentY -= 16;
      }
      
      return currentY;
    });
  }
  
  // Additional Notes Section
  if (data.notes && data.notes.trim()) {
    createSection('Additional Information', () => {
      drawRectangle(marginLeft, currentY - 5, width - marginLeft - marginRight, 2, veryLightGray);
      currentY -= 10;
      
      const noteLines = data.notes.split('\n').slice(0, 6);
      noteLines.forEach(line => {
        if (line.trim()) {
          drawText(line.trim(), marginLeft + 10, currentY, { 
            size: 10, 
            maxWidth: width - marginLeft - marginRight - 20 
          });
          currentY -= 14;
        }
      });
      
      currentY -= 5;
      drawRectangle(marginLeft, currentY, width - marginLeft - marginRight, 2, veryLightGray);
      
      return currentY;
    });
  }
  
  // Professional Footer
  const footerY = 60;
  
  // Footer separator
  drawLine(marginLeft, footerY + 35, width - marginRight, footerY + 35, lightGray, 1);
  
  // Footer content
  drawText('Heart Clinic Melbourne', marginLeft, footerY + 20, { 
    font: boldFont, 
    size: 10, 
    color: primaryBlue 
  });
  drawText('Level 1, 142 Toorak Road, Hawksburn VIC 3142', marginLeft, footerY + 8, { 
    size: 8, 
    color: lightGray 
  });
  drawText('Phone: (03) 9509 5009  |  Email: reception@heartclinicmelbourne.com.au', marginLeft, footerY - 4, { 
    size: 8, 
    color: lightGray 
  });
  
  // Privacy notice
  drawText('🔒 Generated locally via hcm2025.pages.dev', width - marginRight - 180, footerY + 8, { 
    size: 8, 
    color: lightGray 
  });
  drawText('No patient data stored online or transmitted', width - marginRight - 180, footerY - 4, { 
    size: 8, 
    color: lightGray 
  });
  
  return await pdfDoc.save();
}

export function downloadPDF(pdfBytes: Uint8Array, filename: string = 'patient-intake.pdf') {
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
}

export function createMailtoLink(pdfBytes: Uint8Array): void {
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  
  const subject = encodeURIComponent('Patient Intake Form');
  const body = encodeURIComponent(`Dear Reception Team,

Please find attached my completed patient intake form.

I look forward to hearing from you to schedule my appointment.

Full Name [Your Name Here],
DOB [Your Date of Birth Here],
Phone Number [Your Phone Number Here],

`);
  
  const mailtoUrl = `mailto:reception@heartclinicmelbourne.com.au?subject=${subject}&body=${body}`;
  
  window.open(mailtoUrl, '_blank');
  
  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 10000);
}