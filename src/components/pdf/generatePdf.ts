import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import * as fontkit from 'fontkit';
import { IntakeForm } from '../../types/intake';
import { FaqItem } from '../../utils/parseFaqData';
import { parseMarkdownForPdf } from '../../utils/markdownParser';

interface ProcedureData {
  name: string;
  description: string;
  summary: string;
  needToKnow: string[];
  image?: string;
  steps: {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    duration: string;
    details: string[];
  }[];
  faqs?: FaqItem[];
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
    // Replace all types of dash characters with regular ASCII hyphen
    .replace(/[\u2010\u2011\u2012\u2013\u2014\u2015\u2212]/g, '-') // Various dash and minus characters
    // Replace smart quotes with regular quotes
    .replace(/[\u2018\u2019]/g, "'") // Replace smart quotes with regular apostrophe
    .replace(/[\u201C\u201D]/g, '"') // Replace smart quotes with regular quotes
    // Replace various bracket characters with standard ASCII brackets
    .replace(/[\u2768\u276A\u276C\u276E]/g, '(') // Various opening parentheses
    .replace(/[\u2769\u276B\u276D\u276F]/g, ')') // Various closing parentheses
    .replace(/[\u3008\u3010\u3014\u3016\u3018\u301A]/g, '(') // CJK opening brackets
    .replace(/[\u3009\u3011\u3015\u3017\u3019\u301B]/g, ')') // CJK closing brackets
    .replace(/[\u2039]/g, '<') // Single left-pointing angle quotation mark
    .replace(/[\u203A]/g, '>') // Single right-pointing angle quotation mark
    .replace(/[\u2026]/g, '...') // Replace ellipsis with three dots
    // Remove zero-width and invisible characters that might cause spacing issues
    .replace(/[\u200B\u200C\u200D\u2060\uFEFF]/g, '') // Zero-width spaces and BOM
    .replace(/[\u00A0]/g, ' ') // Non-breaking spaces to regular spaces
    // Handle specific patterns with special characters
    .replace(/(\d+)\s*[\u2010-\u2015\u2212]\s*(\d+)/g, '$1-$2') // Numbers with dashes, no spaces
    .replace(/\s*[\u2768-\u276F\u3008-\u301B]\s*/g, ' (') // Clean spacing around various brackets
    // Clean up any remaining non-ASCII characters
    .replace(/[^\x00-\x7F]/g, '')
    // Normalize whitespace
    .replace(/\s+/g, ' ')
    .trim();
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

async function fetchProcedureImage(imagePath: string): Promise<ArrayBuffer | null> {
  try {
    const response = await fetch(imagePath);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status}`);
    }
    return await response.arrayBuffer();
  } catch (error) {
    console.warn(`Failed to load procedure image ${imagePath}:`, error);
    return null;
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

  const marginLeft = 30;
  const marginRight = 30;
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

  // Title - aligned with logo
  const titleX = marginLeft + (logo ? logoWidth + 20 : 0);
  drawText(coverPage, 'Heart Clinic Melbourne', titleX, coverY - 15, { 
    font: boldFont, 
    size: 24, 
    color: primaryTeal 
  });
  drawText(coverPage, 'Patient Education Guide', titleX, coverY - 40, { 
    font: boldFont, 
    size: 18, 
    color: darkGray 
  });

  // Date in header as subtitle
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-AU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  
  drawText(coverPage, `Generated: ${dateStr}`, titleX, coverY - 60, { 
    size: 10, 
    color: lightGray 
  });

  coverY -= 80;
  drawLine(coverPage, marginLeft, coverY, coverWidth - marginRight, coverY, primaryTeal, 2);
  coverY -= 40;

  // Only show table of contents if there are multiple procedures
  const showTableOfContents = procedures.length > 1;
  
  // Load procedure images for table of contents (or single procedure header)
  const procedureImages: { [key: string]: any } = {};
  for (const procedure of procedures) {
    if (procedure.image) {
      try {
        const imageBytes = await fetchProcedureImage(procedure.image);
        if (imageBytes) {
          // Determine image type and embed accordingly
          const isPng = procedure.image.toLowerCase().includes('.png');
          procedureImages[procedure.name] = isPng 
            ? await pdfDoc.embedPng(imageBytes)
            : await pdfDoc.embedJpg(imageBytes);
        }
      } catch (error) {
        console.warn(`Failed to embed image for ${procedure.name}:`, error);
      }
    }
  }

  if (showTableOfContents) {
    // Table of contents
    drawText(coverPage, 'Contents', marginLeft, coverY, { 
      font: boldFont, 
      size: 16, 
      color: primaryTeal 
    });
    coverY -= 40;

    procedures.forEach((procedure) => {
      const imageSize = 24;
      const rowHeight = 32;
      
      // Draw procedure image if available
      if (procedureImages[procedure.name]) {
        const image = procedureImages[procedure.name];
        const imageScale = Math.min(imageSize / image.width, imageSize / image.height);
        const scaledWidth = image.width * imageScale;
        const scaledHeight = image.height * imageScale;
        
        // Draw rounded rectangle border around image
        const imagePadding = 2;
        drawRectangle(coverPage, 
          marginLeft + 20 - imagePadding, 
          coverY - scaledHeight + 5 - imagePadding, 
          scaledWidth + (imagePadding * 2), 
          scaledHeight + (imagePadding * 2), 
          rgb(1, 1, 1), // white background
          lightGray // border color
        );
        
        coverPage.drawImage(image, {
          x: marginLeft + 20,
          y: coverY - scaledHeight + 5,
          width: scaledWidth,
          height: scaledHeight,
        });
      }
      
      // Draw procedure name with image offset
      drawText(coverPage, procedure.name, marginLeft + 20 + imageSize + 10, coverY, { 
        size: 12 
      });
      coverY -= rowHeight;
    });
  } else {
    // For single procedure, create an attractive centered layout
    const singleProcedure = procedures[0];
    const centerX = coverWidth / 2;
    
    // Focus Topic header - centered
    const focusTopicText = 'Focus Topic';
    const focusTopicWidth = focusTopicText.length * 9; // Approximate width for font size 16
    drawText(coverPage, focusTopicText, centerX - (focusTopicWidth / 2), coverY, { 
      font: boldFont, 
      size: 16, 
      color: primaryTeal 
    });
    coverY -= 50;
    
    // Procedure name - centered and larger
    const procedureNameWidth = singleProcedure.name.length * 11; // Approximate width for font size 18
    drawText(coverPage, singleProcedure.name, centerX - (procedureNameWidth / 2), coverY, { 
      font: boldFont, 
      size: 18, 
      color: darkGray 
    });
    coverY -= 60;
    
    // Large procedure image in the center with rounded container
    if (procedureImages[singleProcedure.name]) {
      const image = procedureImages[singleProcedure.name];
      const maxImageSize = 200; // Large featured image
      const imageScale = Math.min(maxImageSize / image.width, maxImageSize / image.height);
      const scaledWidth = image.width * imageScale;
      const scaledHeight = image.height * imageScale;
      
      // Calculate centered position
      const imageX = centerX - (scaledWidth / 2);
      const imageY = coverY - scaledHeight;
      
      // Draw rounded rectangle container with shadow effect
      const containerPadding = 20;
      const containerX = imageX - containerPadding;
      const containerY = imageY - containerPadding;
      const containerWidth = scaledWidth + (containerPadding * 2);
      const containerHeight = scaledHeight + (containerPadding * 2);
      
      // Shadow effect (slightly offset gray rectangle)
      drawRectangle(coverPage, 
        containerX + 3, 
        containerY - 3, 
        containerWidth, 
        containerHeight, 
        rgb(0.9, 0.9, 0.9)
      );
      
      // Main container with light background and border
      drawRectangle(coverPage, 
        containerX, 
        containerY, 
        containerWidth, 
        containerHeight, 
        rgb(0.98, 0.98, 0.98), // Very light gray background
        lightGray // border color
      );
      
      // Draw the image centered in the container
      coverPage.drawImage(image, {
        x: imageX,
        y: imageY,
        width: scaledWidth,
        height: scaledHeight,
      });
      
      coverY -= (scaledHeight + containerPadding * 2 + 30); // Move below image
    } else {
      // If no image, add more space
      coverY -= 80;
    }
    
    // Add centered description if available
    if (singleProcedure.summary) {
      const maxDescWidth = 400; // Narrower centered text block
      const summaryLines = wrapText(singleProcedure.summary, maxDescWidth, 12);
      
      summaryLines.slice(0, 4).forEach(line => { // Show more lines since we have space
        const lineWidth = line.length * 7; // Approximate width for font size 12
        drawText(coverPage, line, centerX - (lineWidth / 2), coverY, { 
          size: 12, 
          color: darkGray 
        });
        coverY -= 18;
      });
      
      // Add "..." if there are more lines
      if (summaryLines.length > 4) {
        const dotsWidth = 3 * 7;
        drawText(coverPage, '...', centerX - (dotsWidth / 2), coverY, { 
          size: 12, 
          color: lightGray 
        });
      }
    }
  }


  // Add procedure pages with proper page management
  procedures.forEach((procedure) => {
    let page = pdfDoc.addPage([595.28, 841.89]);
    const { width, height } = page.getSize();
    let currentY = height - marginTop;
    const procedurePages: any[] = [page]; // Track all pages for this procedure
    
    // Helper function to check if we need a new page
    const checkPageBreak = (requiredSpace: number): boolean => {
      return currentY - requiredSpace < marginBottom + 50; // 50px buffer above footer
    };
    
    // Helper function to add a new page
    const addNewPage = (): void => {
      page = pdfDoc.addPage([595.28, 841.89]);
      procedurePages.push(page);
      currentY = height - marginTop;
      addHeader(page); // Add header to new page
      currentY -= 80; // Adjust for header space
    };
    
    // Helper function to add footer to a page
    const addFooter = (currentPage: any) => {
      drawLine(currentPage, marginLeft, marginBottom + 35, width - marginRight, marginBottom + 35, lightGray, 1);
      drawText(currentPage, 'Heart Clinic Melbourne', marginLeft, marginBottom + 20, { 
        font: boldFont, 
        size: 10, 
        color: primaryTeal 
      });
      drawText(currentPage, 'Suite 21/183 Wattletree Rd, Malvern VIC 3144', marginLeft, marginBottom + 8, { 
        size: 8, 
        color: lightGray 
      });
      drawText(currentPage, 'Phone: (03) 9509 5009  |  Email: reception@heartclinicmelbourne.com.au', marginLeft, marginBottom - 4, { 
        size: 8, 
        color: lightGray 
      });
    };

    // Helper function to add header with logo and procedure image
    const addHeader = (currentPage: any) => {
      let headerY = height - marginTop;
      
      // Draw logo
      if (logo) {
        const logoScale = Math.min(logoWidth / logo.width, logoHeight / logo.height);
        const scaledLogoWidth = logo.width * logoScale;
        const scaledLogoHeight = logo.height * logoScale;
        
        currentPage.drawImage(logo, {
          x: marginLeft,
          y: headerY - scaledLogoHeight,
          width: scaledLogoWidth,
          height: scaledLogoHeight,
        });
      }

      // Draw procedure image in header (top right)
      if (procedureImages[procedure.name]) {
        const procedureImage = procedureImages[procedure.name];
        const procedureImageSize = 40;
        const imageScale = Math.min(procedureImageSize / procedureImage.width, procedureImageSize / procedureImage.height);
        const scaledWidth = procedureImage.width * imageScale;
        const scaledHeight = procedureImage.height * imageScale;
        
        currentPage.drawImage(procedureImage, {
          x: width - marginRight - scaledWidth,
          y: headerY - scaledHeight,
          width: scaledWidth,
          height: scaledHeight,
        });
      }

      // Procedure name - aligned with logo
      const titleX = marginLeft + (logo ? logoWidth + 20 : 0);
      drawText(currentPage, procedure.name, titleX, headerY - 15, { 
        font: boldFont, 
        size: 20, 
        color: primaryTeal 
      });
    };
    
    // Add header to first page
    addHeader(page);

    currentY -= 60;
    drawLine(page, marginLeft, currentY, width - marginRight, currentY, primaryTeal, 2);
    currentY -= 30;

    // Description
    const descriptionLines = wrapText(procedure.description, width - marginLeft - marginRight, 12);
    if (checkPageBreak(descriptionLines.length * 18 + 15)) {
      addNewPage();
    }
    descriptionLines.forEach(line => {
      if (checkPageBreak(18)) {
        addNewPage();
      }
      drawText(page, line, marginLeft, currentY, { size: 12 });
      currentY -= 18;
    });

    currentY -= 15;

    // Summary section
    if (procedure.summary) {
      const summaryLines = wrapText(procedure.summary, width - marginLeft - marginRight - 20, 11);
      const summaryHeight = 60 + (summaryLines.length * 16) + 20; // Header + content + spacing
      
      if (checkPageBreak(summaryHeight)) {
        addNewPage();
      }
      
      drawRectangle(page, marginLeft - 10, currentY - 5, width - marginLeft - marginRight + 20, 25, lightTeal);
      drawText(page, 'Overview', marginLeft, currentY, { 
        font: boldFont, 
        size: 14, 
        color: primaryTeal 
      });
      currentY -= 35;

      summaryLines.forEach(line => {
        if (checkPageBreak(16)) {
          addNewPage();
        }
        drawText(page, line, marginLeft + 10, currentY, { size: 11 });
        currentY -= 16;
      });

      currentY -= 20;
    }

    // Need to know section
    if (procedure.needToKnow && procedure.needToKnow.length > 0) {
      // Calculate approximate height needed
      const estimatedHeight = 60 + (procedure.needToKnow.length * 40); // Header + items
      
      if (checkPageBreak(estimatedHeight)) {
        addNewPage();
      }
      
      drawRectangle(page, marginLeft - 10, currentY - 5, width - marginLeft - marginRight + 20, 25, lightTeal);
      drawText(page, 'Key Information', marginLeft, currentY, { 
        font: boldFont, 
        size: 14, 
        color: primaryTeal 
      });
      currentY -= 35;

      procedure.needToKnow.forEach(item => {
        const itemLines = wrapText(item, width - marginLeft - marginRight - 40, 11);
        const itemHeight = itemLines.length * 16 + 20;
        
        if (checkPageBreak(itemHeight)) {
          addNewPage();
        }
        
        drawText(page, '•', marginLeft + 10, currentY, { 
          color: primaryTeal, 
          size: 12, 
          font: boldFont 
        });
        itemLines.forEach((line, index) => {
          if (checkPageBreak(16)) {
            addNewPage();
          }
          drawText(page, line, marginLeft + 25, currentY, { size: 11 });
          if (index < itemLines.length - 1) currentY -= 16;
        });
        currentY -= 20;
      });

      currentY -= 10;
    }

    // Steps section
    if (procedure.steps && procedure.steps.length > 0) {
      if (checkPageBreak(60)) { // Check for section header space
        addNewPage();
      }
      
      drawRectangle(page, marginLeft - 10, currentY - 5, width - marginLeft - marginRight + 20, 25, lightTeal);
      drawText(page, 'Procedure Steps', marginLeft, currentY, { 
        font: boldFont, 
        size: 14, 
        color: primaryTeal 
      });
      currentY -= 35;

      procedure.steps.forEach((step) => {
        // Calculate approximate step height
        const descLines = wrapText(step.description, width - marginLeft - marginRight - 40, 11);
        const detailsHeight = step.details ? step.details.length * 26 : 0; // Approximate
        const stepHeight = 50 + (descLines.length * 14) + detailsHeight;
        
        if (checkPageBreak(stepHeight)) {
          addNewPage();
        }
        
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

        // Subtitle and duration (only add spacing if subtitle exists)
        if (step.subtitle) {
          if (checkPageBreak(16)) {
            addNewPage();
          }
          drawText(page, step.subtitle, marginLeft + 30, currentY, { 
            size: 10, 
            color: lightGray 
          });
          if (step.duration) {
            drawText(page, `Duration: ${step.duration}`, width - marginRight - 100, currentY, { 
              size: 10, 
              color: lightGray 
            });
          }
          currentY -= 16;
        } else if (step.duration) {
          // Only duration, no subtitle
          drawText(page, `Duration: ${step.duration}`, marginLeft + 30, currentY, { 
            size: 10, 
            color: lightGray 
          });
          currentY -= 16;
        }
        // If neither subtitle nor duration, don't add extra spacing

        // Description
        descLines.forEach(line => {
          if (checkPageBreak(14)) {
            addNewPage();
          }
          drawText(page, line, marginLeft + 30, currentY, { size: 11 });
          currentY -= 14;
        });

        // Details
        if (step.details && step.details.length > 0) {
          step.details.forEach(detail => {
            const detailLines = wrapText(detail, width - marginLeft - marginRight - 60, 10);
            const detailHeight = detailLines.length * 12 + 14;
            
            if (checkPageBreak(detailHeight)) {
              addNewPage();
            }
            
            drawText(page, '◦', marginLeft + 40, currentY, { 
              color: lightGray, 
              size: 10 
            });
            detailLines.forEach((line, lineIndex) => {
              if (checkPageBreak(12)) {
                addNewPage();
              }
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

    // FAQ section
    if (procedure.faqs && procedure.faqs.length > 0) {
      if (checkPageBreak(60)) { // Check for section header space
        addNewPage();
      }
      
      drawRectangle(page, marginLeft - 10, currentY - 5, width - marginLeft - marginRight + 20, 25, lightTeal);
      drawText(page, 'Frequently Asked Questions', marginLeft, currentY, { 
        font: boldFont, 
        size: 14, 
        color: primaryTeal 
      });
      currentY -= 35;

      procedure.faqs.forEach((faq, index) => {
        // Parse markdown for answer to get proper formatting
        const { paragraphs } = parseMarkdownForPdf(faq.answer);
        
        // Calculate approximate FAQ height
        const questionLines = wrapText(faq.question, width - marginLeft - marginRight - 35, 12);
        const totalAnswerLines = paragraphs.reduce((total, para) => {
          return total + wrapText(para.text, width - marginLeft - marginRight - 25, 11).length;
        }, 0);
        const faqHeight = 30 + (questionLines.length * 16) + (totalAnswerLines * 14) + (paragraphs.length * 8) + 20;
        
        if (checkPageBreak(faqHeight)) {
          addNewPage();
        }
        
        // Question with teal color
        drawText(page, `Q${index + 1}:`, marginLeft + 10, currentY, { 
          color: primaryTeal, 
          size: 12, 
          font: boldFont 
        });
        
        questionLines.forEach((line, lineIndex) => {
          if (checkPageBreak(16)) {
            addNewPage();
          }
          drawText(page, line, marginLeft + (lineIndex === 0 ? 35 : 25), currentY, { 
            font: boldFont, 
            size: 12 
          });
          currentY -= 16;
        });

        currentY -= 5;

        // Answer with markdown formatting
        drawText(page, 'A:', marginLeft + 10, currentY, { 
          color: lightGray, 
          size: 11, 
          font: boldFont 
        });
        
        // Handle paragraphs in the answer
        let isFirstAnswer = true;
        
        paragraphs.forEach((paragraph, paraIndex) => {
          if (paragraph.text.trim()) {
            const paragraphLines = wrapText(paragraph.text.trim(), width - marginLeft - marginRight - 25, 11);
            
            paragraphLines.forEach((line, lineIndex) => {
              if (checkPageBreak(14)) {
                addNewPage();
              }
              
              // Determine if line should be bold based on formatting info
              const lineStart = paragraphLines.slice(0, lineIndex).join(' ').length + (lineIndex > 0 ? lineIndex : 0);
              const lineEnd = lineStart + line.length;
              
              const shouldBold = paragraph.formatting.some(format => 
                format.bold && 
                ((format.start >= lineStart && format.start < lineEnd) ||
                 (format.end > lineStart && format.end <= lineEnd) ||
                 (format.start <= lineStart && format.end >= lineEnd))
              );
              
              drawText(page, line, marginLeft + (isFirstAnswer && lineIndex === 0 ? 25 : 25), currentY, { 
                size: 11,
                font: shouldBold ? boldFont : font
              });
              currentY -= 14;
              isFirstAnswer = false;
            });
            
            // Add paragraph spacing except for the last paragraph
            if (paraIndex < paragraphs.length - 1) {
              currentY -= 8;
            }
          }
        });

        currentY -= 15;
      });

      currentY -= 10;
    }
    
    // Add footers to all pages created for this procedure
    procedurePages.forEach(pageToFooter => {
      addFooter(pageToFooter);
    });
  });

  return await pdfDoc.save();
}

export function createLearningLibraryMailtoLink(_pdfBytes: Uint8Array, selectedProcedures: string[]): void {
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