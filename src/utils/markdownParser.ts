import React from 'react';
import { marked } from 'marked';

// Configure marked options
marked.setOptions({
  breaks: true, // Convert \n to <br>
  gfm: true,    // GitHub Flavored Markdown
});

export function parseMarkdown(text: string): string {
  // Pre-process the text to handle markdown properly
  let processedText = text
    // First handle bold text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Handle paragraph breaks - double line breaks become new paragraphs
    .split('\n\n')
    .map(paragraph => paragraph.trim())
    .filter(paragraph => paragraph.length > 0)
    .map(paragraph => {
      // Convert single line breaks within paragraphs to <br>
      return paragraph.replace(/\n/g, '<br/>');
    })
    .map(paragraph => `<p>${paragraph}</p>`)
    .join('');
  
  return processedText;
}

export function parseMarkdownForPdf(text: string): { paragraphs: Array<{ text: string; formatting: Array<{ start: number; end: number; bold: boolean }> }> } {
  // Split text into paragraphs
  const paragraphs = text
    .split('\n\n')
    .map(p => p.trim())
    .filter(p => p.length > 0);
  
  const result = paragraphs.map(paragraph => {
    const formatting: Array<{ start: number; end: number; bold: boolean }> = [];
    let processedText = paragraph;
    let offset = 0;

    // Find all bold text markers in this paragraph
    const boldRegex = /\*\*(.*?)\*\*/g;
    let match;
    
    while ((match = boldRegex.exec(paragraph)) !== null) {
      const start = match.index - offset;
      const end = start + match[1].length;
      
      formatting.push({
        start,
        end,
        bold: true
      });
      
      // Replace **text** with just text
      processedText = processedText.replace(match[0], match[1]);
      offset += 4; // Account for removed ** markers (2 at start + 2 at end)
    }

    // Convert single line breaks to spaces within paragraphs
    processedText = processedText.replace(/\n/g, ' ');
    
    return {
      text: processedText,
      formatting
    };
  });

  return { paragraphs: result };
}

export function createMarkdownComponent(text: string): React.ReactNode {
  const processedText = parseMarkdown(text);
  
  return React.createElement('div', {
    className: "prose prose-sm max-w-none",
    dangerouslySetInnerHTML: { __html: processedText }
  });
}
