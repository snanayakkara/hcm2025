export const normalizeClinicLocation = (
  location?: string | null
): string | null => {
  if (!location) return null;

  const value = location.toLowerCase();

  if (value.includes('cabrini')) {
    return 'Cabrini Malvern';
  }

  if (value.includes('pakenham')) {
    return 'Pakenham';
  }

  if (value.includes('clyde')) {
    return 'Clyde';
  }

  return null;
};
