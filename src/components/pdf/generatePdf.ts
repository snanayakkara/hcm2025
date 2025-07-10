import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import * as fontkit from 'fontkit';
import { IntakeForm } from '../../types/intake';

interface ProcedureData {
  name: string;
  description: string;
  summary: string;
  needToKnow: string[];
  steps: {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    duration: string;
    details: string[];
  }[];
}

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

// Clean text function to handle special characters that can't be encoded in WinAnsi
function cleanText(text: string): string {
  return text
    .replace(/[\u2010-\u2015]/g, '-') // Replace various dash characters with regular hyphen
    .replace(/[\u2018\u2019]/g, "'") // Replace smart quotes with regular apostrophe
    .replace(/[\u201C\u201D]/g, '"') // Replace smart quotes with regular quotes
    .replace(/[\u2026]/g, '...') // Replace ellipsis with three dots
    .replace(/[^\x00-\x7F]/g, ''); // Remove any remaining non-ASCII characters
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
  
  // Register fontkit for custom font support
  pdfDoc.registerFontkit(fontkit);
  
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
  
  // Color palette - Updated to match teal gradient
  const primaryTeal = rgb(0.2, 0.6, 0.6); // Teal color
  const lightTeal = rgb(0.89, 0.97, 0.95); // Light teal background
  const darkGray = rgb(0.2, 0.2, 0.2); // #333333
  const lightGray = rgb(0.6, 0.6, 0.6); // #999999
  const veryLightGray = rgb(0.95, 0.95, 0.95); // #F2F2F2
  
  const drawText = (text: string, x: number, y: number, options: { font?: any; size?: number; color?: any; maxWidth?: number } = {}) => {
    let textToDraw = cleanText(text); // Clean text to handle special characters
    
    // Simple text wrapping if maxWidth is specified
    if (options.maxWidth && font) {
      const fontSize = options.size || 12;
      const textWidth = (textToDraw.length * fontSize * 0.6); // Rough estimation
      if (textWidth > options.maxWidth) {
        const maxChars = Math.floor(options.maxWidth / (fontSize * 0.6));
        if (textToDraw.length > maxChars) {
          textToDraw = textToDraw.substring(0, maxChars - 3) + '...';
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
  
  // Clinic name and title - Updated with teal gradient effect
  const titleX = marginLeft + (logo ? logoWidth + 20 : 0);
  drawText('Heart Clinic Melbourne', titleX, currentY - 10, { 
    font: boldFont, 
    size: 24, 
    color: primaryTeal 
  });
  drawText('Patient Intake Summary', titleX, currentY - 35, { 
    font: boldFont, 
    size: 16, 
    color: darkGray 
  });
  
  // Date and time - Simplified for footer
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
  
  currentY -= 80;
  
  // Elegant separator line
  drawLine(marginLeft, currentY, width - marginRight, currentY, primaryTeal, 2);
  currentY -= 30;
  
  // Helper function to create section
  const createSection = (title: string, content: () => number) => {
    // Section header with background
    drawRectangle(marginLeft - 10, currentY - 5, width - marginLeft - marginRight + 20, 25, lightTeal);
    drawText(title, marginLeft, currentY, { font: boldFont, size: 14, color: primaryTeal });
    currentY -= 35;
    
    // Section content
    currentY = content();
    currentY -= 15;
    
    return currentY;
  };
  
  // Primary Symptom Section (new)
  if (data.primarySymptom && data.primarySymptom.trim()) {
    createSection('Primary Symptom', () => {
      drawText('[>]', marginLeft + 10, currentY, { color: rgb(0.8, 0.4, 0), size: 12, font: boldFont });
      drawText(data.primarySymptom!, marginLeft + 40, currentY, { size: 11, color: rgb(0.8, 0.4, 0) });
      currentY -= 16;
      return currentY;
    });
  }
  
  // Medical History Section (now includes smoking and family history)
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
        drawText('↪', marginLeft + 10, currentY, { color: rgb(0, 0.6, 0), size: 12, font: boldFont });
        drawText(condition.label, marginLeft + 35, currentY, { size: 11 });
        currentY -= 16;
      });
    } else {
      drawText('No significant medical history reported', marginLeft + 10, currentY, { 
        color: lightGray, 
        size: 11 
      });
      currentY -= 16;
    }
    
    // Add smoking history as part of medical history
    currentY -= 8;
    drawText('Smoking History:', marginLeft + 10, currentY, { size: 11, font: boldFont, color: darkGray });
    currentY -= 16;
    
    if (data.smoking?.current) {
      drawText('↪', marginLeft + 20, currentY, { size: 12, color: rgb(0, 0.6, 0), font: boldFont });
      drawText('Current smoker', marginLeft + 45, currentY, { size: 11, color: rgb(0.8, 0.2, 0.2) });
      currentY -= 16;
      if (data.smoking.start) {
        drawText(`Started smoking: ${data.smoking.start}`, marginLeft + 45, currentY, { size: 10, color: lightGray });
        currentY -= 14;
      }
    } else if (data.smoking?.past) {
      drawText('↪', marginLeft + 20, currentY, { size: 12, color: rgb(0, 0.6, 0), font: boldFont });
      drawText('Former smoker (quit)', marginLeft + 45, currentY, { size: 11, color: rgb(0, 0.6, 0) });
      currentY -= 16;
      if (data.smoking.start) {
        drawText(`Smoking period: ${data.smoking.start}`, marginLeft + 45, currentY, { size: 10, color: lightGray });
        if (data.smoking.stop) {
          drawText(` - ${data.smoking.stop}`, marginLeft + 150, currentY, { size: 10, color: lightGray });
        }
        currentY -= 14;
      }
    } else {
      drawText('↪', marginLeft + 20, currentY, { color: rgb(0, 0.6, 0), size: 12, font: boldFont });
      drawText('Never smoked', marginLeft + 45, currentY, { size: 11, color: rgb(0, 0.6, 0) });
      currentY -= 16;
    }
    
    // Add family history as part of medical history
    currentY -= 8;
    drawText('Family History:', marginLeft + 10, currentY, { size: 11, font: boldFont, color: darkGray });
    currentY -= 16;
    
    if (data.familyHistory) {
      drawText('↪', marginLeft + 20, currentY, { color: rgb(0, 0.6, 0), size: 12, font: boldFont });
      drawText('Family history of heart disease before age 65', marginLeft + 45, currentY, { size: 11, color: rgb(0.8, 0.4, 0) });
    } else {
      drawText('↪', marginLeft + 20, currentY, { color: rgb(0, 0.6, 0), size: 12, font: boldFont });
      drawText('No family history of early heart disease', marginLeft + 45, currentY, { size: 11 });
    }
    currentY -= 16;
    
    return currentY;
  });
  
  // Medications Section
  if (data.medications && data.medications.trim()) {
    createSection('Current Medications', () => {
      const medicationLines = data.medications!.split('\n').slice(0, 4);
      medicationLines.forEach(line => {
        if (line.trim()) {
          drawText('*', marginLeft + 10, currentY, { color: primaryTeal, size: 12, font: boldFont });
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
      const allergyLines = data.allergies!.split('\n').slice(0, 3);
      allergyLines.forEach(line => {
        if (line.trim()) {
          drawText('!', marginLeft + 10, currentY, { color: rgb(0.8, 0.4, 0), size: 12, font: boldFont });
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
      { key: 'angio', label: 'Angiogram/Catheterisation' },
      { key: 'surgery', label: 'Previous Cardiac Surgery' }
    ];
    
    const completedTests = tests.filter(test => 
      data.tests?.[test.key as keyof typeof data.tests]
    );
    
    if (completedTests.length > 0) {
      completedTests.forEach(test => {
        drawText('[+]', marginLeft + 10, currentY, { color: rgb(0, 0.6, 0), size: 12, font: boldFont });
        drawText(test.label, marginLeft + 35, currentY, { size: 11 });
        currentY -= 16;
        
        // Add per-test location and date details if provided
        const locationKey = `${test.key}Location` as keyof IntakeForm;
        const dateKey = `${test.key}Date` as keyof IntakeForm;
        const location = data[locationKey] as string;
        const date = data[dateKey] as string;
        
        if (location || date) {
          if (location) {
            drawText('Location:', marginLeft + 45, currentY, { size: 9, font: boldFont, color: lightGray });
            drawText(location, marginLeft + 95, currentY, { size: 9, color: lightGray });
            currentY -= 12;
          }
          if (date) {
            drawText('Date:', marginLeft + 45, currentY, { size: 9, font: boldFont, color: lightGray });
            drawText(date, marginLeft + 75, currentY, { size: 9, color: lightGray });
            currentY -= 12;
          }
          currentY -= 4; // Add spacing between tests
        }
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
  
  // Emergency Contact Section
  if (data.nok?.name || data.nok?.relation || data.nok?.phone) {
    createSection('Emergency Contact', () => {
      if (data.nok.name) {
        drawText('>', marginLeft + 10, currentY, { size: 12, font: boldFont, color: primaryTeal });
        drawText(`Name: ${data.nok.name}`, marginLeft + 30, currentY, { size: 11 });
        currentY -= 16;
      }
      
      if (data.nok.relation) {
        drawText('>', marginLeft + 10, currentY, { size: 12, font: boldFont, color: primaryTeal });
        drawText(`Relationship: ${data.nok.relation}`, marginLeft + 30, currentY, { size: 11 });
        currentY -= 16;
      }
      
      if (data.nok.phone) {
        drawText('>', marginLeft + 10, currentY, { size: 12, font: boldFont, color: primaryTeal });
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
      
      const noteLines = data.notes!.split('\n').slice(0, 6);
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
  
  // Professional Footer - Updated with Cabrini address and timestamp
  const footerY = 60;
  
  // Footer separator
  drawLine(marginLeft, footerY + 35, width - marginRight, footerY + 35, lightGray, 1);
  
  // Footer content
  drawText('Heart Clinic Melbourne', marginLeft, footerY + 20, { 
    font: boldFont, 
    size: 10, 
    color: primaryTeal 
  });
  drawText('Suite 21/183 Wattletree Rd, Malvern VIC 3144', marginLeft, footerY + 8, { 
    size: 8, 
    color: lightGray 
  });
  drawText('Phone: (03) 9509 5009  |  Email: reception@heartclinicmelbourne.com.au', marginLeft, footerY - 4, { 
    size: 8, 
    color: lightGray 
  });
  
  // Timestamp in footer (smaller font)
  drawText(`Generated: ${dateStr} at ${timeStr}`, width - marginRight - 120, footerY - 4, { 
    size: 7, 
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

export async function generateLearningLibraryPDF(procedures: ProcedureData[]): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  
  // Register fontkit for custom font support
  pdfDoc.registerFontkit(fontkit);
  
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
  const marginBottom = 80;
  const logoHeight = 50;
  const logoWidth = 50;
  
  // Color palette
  const primaryTeal = rgb(0.2, 0.6, 0.6);
  const lightTeal = rgb(0.89, 0.97, 0.95);
  const darkGray = rgb(0.2, 0.2, 0.2);
  const lightGray = rgb(0.6, 0.6, 0.6);
  const veryLightGray = rgb(0.95, 0.95, 0.95);

  // Helper functions
  const drawText = (page: any, text: string, x: number, y: number, options: { font?: any; size?: number; color?: any; maxWidth?: number } = {}) => {
    let textToDraw = cleanText(text); // Clean text to handle special characters
    
    if (options.maxWidth && font) {
      const fontSize = options.size || 12;
      const textWidth = (textToDraw.length * fontSize * 0.6);
      if (textWidth > options.maxWidth) {
        const maxChars = Math.floor(options.maxWidth / (fontSize * 0.6));
        if (textToDraw.length > maxChars) {
          textToDraw = textToDraw.substring(0, maxChars - 3) + '...';
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

  const drawRectangle = (page: any, x: number, y: number, width: number, height: number, color: any, borderColor?: any) => {
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

  const drawLine = (page: any, startX: number, startY: number, endX: number, endY: number, color = lightGray, thickness = 1) => {
    page.drawLine({
      start: { x: startX, y: startY },
      end: { x: endX, y: endY },
      thickness,
      color,
    });
  };

  const wrapText = (text: string, maxWidth: number, fontSize: number): string[] => {
    const cleanedText = cleanText(text); // Clean text to handle special characters
    const words = cleanedText.split(' ');
    const lines: string[] = [];
    let currentLine = '';
    
    for (const word of words) {
      const testLine = currentLine + (currentLine ? ' ' : '') + word;
      const testWidth = testLine.length * fontSize * 0.6;
      
      if (testWidth <= maxWidth) {
        currentLine = testLine;
      } else {
        if (currentLine) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          lines.push(word);
        }
      }
    }
    
    if (currentLine) {
      lines.push(currentLine);
    }
    
    return lines;
  };

  // Add cover page
  const coverPage = pdfDoc.addPage([595.28, 841.89]);
  const { width: coverWidth, height: coverHeight } = coverPage.getSize();
  let coverY = coverHeight - marginTop;

  // Header with logo
  if (logo) {
    const logoScale = Math.min(logoWidth / logo.width, logoHeight / logo.height);
    const scaledLogoWidth = logo.width * logoScale;
    const scaledLogoHeight = logo.height * logoScale;
    
    coverPage.drawImage(logo, {
      x: marginLeft,
      y: coverY - scaledLogoHeight,
      width: scaledLogoWidth,
      height: scaledLogoHeight,
    });
  }

  // Title
  const titleX = marginLeft + (logo ? logoWidth + 20 : 0);
  drawText(coverPage, 'Heart Clinic Melbourne', titleX, coverY - 10, { 
    font: boldFont, 
    size: 24, 
    color: primaryTeal 
  });
  drawText(coverPage, 'Patient Education Guide', titleX, coverY - 35, { 
    font: boldFont, 
    size: 18, 
    color: darkGray 
  });

  coverY -= 80;
  drawLine(coverPage, marginLeft, coverY, coverWidth - marginRight, coverY, primaryTeal, 2);
  coverY -= 40;

  // Table of contents
  drawText(coverPage, 'Contents', marginLeft, coverY, { 
    font: boldFont, 
    size: 16, 
    color: primaryTeal 
  });
  coverY -= 30;

  procedures.forEach((procedure, index) => {
    drawText(coverPage, `${index + 1}. ${procedure.name}`, marginLeft + 20, coverY, { 
      size: 12 
    });
    coverY -= 20;
  });

  // Date
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-AU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  
  drawText(coverPage, `Generated: ${dateStr}`, marginLeft, marginBottom, { 
    size: 10, 
    color: lightGray 
  });

  // Add procedure pages
  procedures.forEach((procedure) => {
    const page = pdfDoc.addPage([595.28, 841.89]);
    const { width, height } = page.getSize();
    let currentY = height - marginTop;

    // Header
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

    // Procedure name
    const titleX = marginLeft + (logo ? logoWidth + 20 : 0);
    drawText(page, procedure.name, titleX, currentY - 10, { 
      font: boldFont, 
      size: 20, 
      color: primaryTeal 
    });

    currentY -= 60;
    drawLine(page, marginLeft, currentY, width - marginRight, currentY, primaryTeal, 2);
    currentY -= 30;

    // Description
    const descriptionLines = wrapText(procedure.description, width - marginLeft - marginRight, 12);
    descriptionLines.forEach(line => {
      drawText(page, line, marginLeft, currentY, { size: 12 });
      currentY -= 18;
    });

    currentY -= 15;

    // Summary section
    if (procedure.summary) {
      drawRectangle(page, marginLeft - 10, currentY - 5, width - marginLeft - marginRight + 20, 25, lightTeal);
      drawText(page, 'Overview', marginLeft, currentY, { 
        font: boldFont, 
        size: 14, 
        color: primaryTeal 
      });
      currentY -= 35;

      const summaryLines = wrapText(procedure.summary, width - marginLeft - marginRight - 20, 11);
      summaryLines.forEach(line => {
        drawText(page, line, marginLeft + 10, currentY, { size: 11 });
        currentY -= 16;
      });

      currentY -= 20;
    }

    // Need to know section
    if (procedure.needToKnow && procedure.needToKnow.length > 0) {
      drawRectangle(page, marginLeft - 10, currentY - 5, width - marginLeft - marginRight + 20, 25, lightTeal);
      drawText(page, 'Key Information', marginLeft, currentY, { 
        font: boldFont, 
        size: 14, 
        color: primaryTeal 
      });
      currentY -= 35;

      procedure.needToKnow.forEach(item => {
        drawText(page, '•', marginLeft + 10, currentY, { 
          color: primaryTeal, 
          size: 12, 
          font: boldFont 
        });
        const itemLines = wrapText(item, width - marginLeft - marginRight - 40, 11);
        itemLines.forEach((line, index) => {
          drawText(page, line, marginLeft + 25, currentY, { size: 11 });
          if (index < itemLines.length - 1) currentY -= 16;
        });
        currentY -= 20;
      });

      currentY -= 10;
    }

    // Steps section
    if (procedure.steps && procedure.steps.length > 0) {
      drawRectangle(page, marginLeft - 10, currentY - 5, width - marginLeft - marginRight + 20, 25, lightTeal);
      drawText(page, 'Procedure Steps', marginLeft, currentY, { 
        font: boldFont, 
        size: 14, 
        color: primaryTeal 
      });
      currentY -= 35;

      procedure.steps.forEach((step, index) => {
        // Step number and title
        drawText(page, `${step.id}.`, marginLeft + 10, currentY, { 
          color: primaryTeal, 
          size: 12, 
          font: boldFont 
        });
        drawText(page, step.title, marginLeft + 30, currentY, { 
          font: boldFont, 
          size: 12 
        });
        currentY -= 18;

        // Subtitle and duration
        if (step.subtitle) {
          drawText(page, step.subtitle, marginLeft + 30, currentY, { 
            size: 10, 
            color: lightGray 
          });
        }
        if (step.duration) {
          drawText(page, `Duration: ${step.duration}`, width - marginRight - 100, currentY, { 
            size: 10, 
            color: lightGray 
          });
        }
        currentY -= 16;

        // Description
        const descLines = wrapText(step.description, width - marginLeft - marginRight - 40, 11);
        descLines.forEach(line => {
          drawText(page, line, marginLeft + 30, currentY, { size: 11 });
          currentY -= 14;
        });

        // Details
        if (step.details && step.details.length > 0) {
          step.details.forEach(detail => {
            drawText(page, '◦', marginLeft + 40, currentY, { 
              color: lightGray, 
              size: 10 
            });
            const detailLines = wrapText(detail, width - marginLeft - marginRight - 60, 10);
            detailLines.forEach((line, lineIndex) => {
              drawText(page, line, marginLeft + 50, currentY, { 
                size: 10, 
                color: lightGray 
              });
              if (lineIndex < detailLines.length - 1) currentY -= 12;
            });
            currentY -= 14;
          });
        }

        currentY -= 10;
      });
    }

    // Footer
    drawLine(page, marginLeft, marginBottom + 35, width - marginRight, marginBottom + 35, lightGray, 1);
    drawText(page, 'Heart Clinic Melbourne', marginLeft, marginBottom + 20, { 
      font: boldFont, 
      size: 10, 
      color: primaryTeal 
    });
    drawText(page, 'Suite 21/183 Wattletree Rd, Malvern VIC 3144', marginLeft, marginBottom + 8, { 
      size: 8, 
      color: lightGray 
    });
    drawText(page, 'Phone: (03) 9509 5009  |  Email: reception@heartclinicmelbourne.com.au', marginLeft, marginBottom - 4, { 
      size: 8, 
      color: lightGray 
    });
  });

  return await pdfDoc.save();
}

export function createLearningLibraryMailtoLink(pdfBytes: Uint8Array, selectedProcedures: string[]): void {
  const procedureList = selectedProcedures.join(', ');
  const subject = encodeURIComponent('Patient Education Materials Request');
  const body = encodeURIComponent(`Dear Heart Clinic Melbourne Team,

I would like to request the educational materials for the following procedures/tests:

${procedureList}

Please find the attached PDF with detailed information about these procedures.

I look forward to my consultation where we can discuss these procedures further.

Best regards,
[Your Name]
[Your Phone Number]
[Your Email Address]

`);
  
  const mailtoUrl = `mailto:reception@heartclinicmelbourne.com.au?subject=${subject}&body=${body}`;
  window.open(mailtoUrl, '_blank');
}