/**
 * Calculate distance between two coordinates using Haversine formula
 * Returns distance in kilometers
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return Math.round(distance * 10) / 10; // Round to 1 decimal place
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Format distance for display
 */
export function formatDistance(distance: number): string {
  if (distance < 1) {
    return `${Math.round(distance * 1000)}m`;
  } else {
    return `${distance}km`;
  }
}

/**
 * Calculate estimated travel time by car
 * Assumes average speed of 40km/h in urban areas
 */
export function calculateTravelTime(distance: number): number {
  const averageSpeed = 40; // km/h
  return Math.round((distance / averageSpeed) * 60); // minutes
}

/**
 * Format travel time for display
 */
export function formatTravelTime(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  } else {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) {
      return `${hours}h`;
    } else {
      return `${hours}h ${remainingMinutes}m`;
    }
  }
}

/**
 * Get postcode from coordinates (approximate)
 * This is a simplified implementation - in production you'd use a proper geocoding service
 */
export function approximatePostcode(lat: number, lon: number): string {
  // Melbourne CBD area
  if (lat >= -37.82 && lat <= -37.80 && lon >= 144.95 && lon <= 144.98) {
    return '3000';
  }
  
  // Malvern area
  if (lat >= -37.87 && lat <= -37.84 && lon >= 145.02 && lon <= 145.04) {
    return '3144';
  }
  
  // Pakenham area
  if (lat >= -38.09 && lat <= -38.06 && lon >= 145.47 && lon <= 145.50) {
    return '3810';
  }
  
  // Clyde area
  if (lat >= -38.11 && lat <= -38.09 && lon >= 145.34 && lon <= 145.37) {
    return '3978';
  }
  
  // Default for Melbourne area
  return '3000';
}

/**
 * Parse postcode and return approximate coordinates
 */
export function postcodeToCoordinates(postcode: string): { lat: number; lon: number } | null {
  const postcodeMap: Record<string, { lat: number; lon: number }> = {
    '3000': { lat: -37.8136, lon: 144.9631 }, // Melbourne CBD
    '3144': { lat: -37.8564, lon: 145.0278 }, // Malvern
    '3810': { lat: -38.0773, lon: 145.4835 }, // Pakenham
    '3978': { lat: -38.1036, lon: 145.3514 }, // Clyde North
    '3141': { lat: -37.8467, lon: 144.9850 }, // South Yarra
    '3142': { lat: -37.8397, lon: 144.9944 }, // Toorak
    '3143': { lat: -37.8553, lon: 145.0072 }, // Armadale
    '3145': { lat: -37.8675, lon: 145.0514 }, // Malvern East
    '3146': { lat: -37.8731, lon: 145.0619 }, // Glen Iris
    '3147': { lat: -37.8789, lon: 145.0686 }, // Ashburton
    '3148': { lat: -37.8856, lon: 145.0786 }, // Burwood
    '3149': { lat: -37.8928, lon: 145.0889 }, // Burwood East
  };
  
  return postcodeMap[postcode] || null;
}