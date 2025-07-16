import { describe, it, expect } from 'vitest';
import { cleanText } from '../cleanText';

describe('cleanText', () => {
  it('should remove invisible Unicode characters', () => {
    const input = 'Hello\u00A0World\u200B\u200D';
    const expected = 'HelloWorld'; // NBSP and zero-width chars are removed completely
    expect(cleanText(input)).toBe(expected);
  });

  it('should replace Unicode arrows with ASCII equivalents', () => {
    const input = 'Step 1 ↪ Step 2 → Step 3 ← Back ↑ Up ↓ Down';
    const expected = 'Step 1 -> Step 2 -> Step 3 <- Back ^ Up v Down';
    expect(cleanText(input)).toBe(expected);
  });

  it('should replace Unicode bullets and dashes', () => {
    const input = '• Bullet point ◦ Sub bullet – en dash — em dash';
    const expected = '* Bullet point - Sub bullet - en dash - em dash';
    expect(cleanText(input)).toBe(expected);
  });

  it('should handle smart quotes and apostrophes', () => {
    const input = 'Test with quotes';
    const expected = 'Test with quotes';
    expect(cleanText(input)).toBe(expected);
  });

  it('should replace special symbols with ASCII equivalents', () => {
    const input = '✓ Check ✗ X © Copyright ® Registered ™ Trademark';
    const expected = 'v Check x X (c) Copyright (R) Registered (TM) Trademark';
    expect(cleanText(input)).toBe(expected);
  });

  it('should replace Unicode ellipsis', () => {
    const input = 'Loading…';
    const expected = 'Loading...';
    expect(cleanText(input)).toBe(expected);
  });

  it('should collapse multiple spaces', () => {
    const input = 'Multiple    spaces   here';
    const expected = 'Multiple spaces here';
    expect(cleanText(input)).toBe(expected);
  });

  it('should handle complex mixed Unicode text', () => {
    const input = 'Patient: John "Doe"  ↪  Age: 45 • Weight: 75kg … Notes: ✓ Healthy';
    const expected = 'Patient: John "Doe" -> Age: 45 * Weight: 75kg ... Notes: v Healthy';
    expect(cleanText(input)).toBe(expected);
  });

  it('should handle empty and null strings safely', () => {
    expect(cleanText('')).toBe('');
    expect(cleanText(' ')).toBe(' ');
  });

  it('should preserve regular ASCII text unchanged', () => {
    const input = 'Regular ASCII text with numbers 123 and symbols !@#$%^&*()';
    expect(cleanText(input)).toBe(input);
  });

  it('should handle medical terminology with special characters', () => {
    const input = 'ECG → Normal • Blood pressure: 120/80 § Patient notes…';
    const expected = 'ECG -> Normal * Blood pressure: 120/80 S Patient notes...';
    expect(cleanText(input)).toBe(expected);
  });
});