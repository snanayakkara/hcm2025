/** Remove invisible Unicode gremlins that create fake gaps */
export const cleanText = (s: string) =>
  s
    .replace(/[\u00A0\u200B\u200D]/g, "") // NBSP + zero-widths → nothing
    .replace(/\s{2,}/g, " ") // collapse double spaces
    .replace(/•/g, "*") // Replace Unicode bullet with ASCII asterisk
    .replace(/◦/g, "-") // Replace Unicode white bullet with ASCII hyphen
    .replace(/–/g, "-") // Replace en-dash with ASCII hyphen
    .replace(/—/g, "-") // Replace em-dash with ASCII hyphen
    .replace(/[""]/g, '"') // Replace smart quotes with ASCII quotes
    .replace(/['']/g, "'"); // Replace smart apostrophes with ASCII apostrophe
