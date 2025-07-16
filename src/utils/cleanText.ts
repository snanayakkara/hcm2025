/** Remove invisible Unicode gremlins that create fake gaps and replace problematic characters for PDF generation */
export const cleanText = (s: string) =>
  s
    .replace(/[\u00A0\u200B\u200D]/g, "") // NBSP + zero-widths → nothing
    .replace(/\s{2,}/g, " ") // collapse double spaces
    .replace(/•/g, "*") // Replace Unicode bullet with ASCII asterisk
    .replace(/◦/g, "-") // Replace Unicode white bullet with ASCII hyphen
    .replace(/–/g, "-") // Replace en-dash with ASCII hyphen
    .replace(/—/g, "-") // Replace em-dash with ASCII hyphen
    .replace(/[""]/g, '"') // Replace smart quotes with ASCII quotes
    .replace(/['']/g, "'") // Replace smart apostrophes with ASCII apostrophe
    .replace(/↪/g, "->") // Replace Unicode curved arrow with ASCII arrow
    .replace(/→/g, "->") // Replace Unicode right arrow with ASCII arrow
    .replace(/←/g, "<-") // Replace Unicode left arrow with ASCII arrow
    .replace(/↑/g, "^") // Replace Unicode up arrow with ASCII caret
    .replace(/↓/g, "v") // Replace Unicode down arrow with ASCII v
    .replace(/✓/g, "v") // Replace Unicode checkmark with ASCII v
    .replace(/✗/g, "x") // Replace Unicode X mark with ASCII x
    .replace(/…/g, "...") // Replace Unicode ellipsis with ASCII dots
    .replace(/©/g, "(c)") // Replace Unicode copyright with ASCII
    .replace(/®/g, "(R)") // Replace Unicode registered with ASCII
    .replace(/™/g, "(TM)") // Replace Unicode trademark with ASCII
    .replace(/§/g, "S") // Replace Unicode section sign with ASCII S
    .replace(/¶/g, "P") // Replace Unicode pilcrow with ASCII P
    .replace(/†/g, "+") // Replace Unicode dagger with ASCII plus
    .replace(/‡/g, "++") // Replace Unicode double dagger with ASCII plus
    .replace(/[\u2000-\u206F\u2E00-\u2E7F]/g, " ") // Replace various Unicode spaces and punctuation
    .replace(/[\u00A1-\u00BF\u00D7\u00F7]/g, ""); // Remove problematic Latin-1 supplement characters
