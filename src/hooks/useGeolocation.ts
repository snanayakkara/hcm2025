import { useState, useEffect, useCallback } from 'react';

interface GeolocationCoords {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

interface GeolocationState {
  coords: GeolocationCoords | null;
  isLoading: boolean;
  error: string | null;
  isSupported: boolean;
}

interface UseGeolocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
  watchPosition?: boolean;
}

const useGeolocation = (options: UseGeolocationOptions = {}) => {
  const {
    enableHighAccuracy = true,
    timeout = 10000,
    maximumAge = 60000,
    watchPosition = false
  } = options;

  const [state, setState] = useState<GeolocationState>({
    coords: null,
    isLoading: false,
    error: null,
    isSupported: 'geolocation' in navigator
  });

  const [watchId, setWatchId] = useState<number | null>(null);

  const updateState = useCallback((updates: Partial<GeolocationState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  const handleSuccess = useCallback((position: GeolocationPosition) => {
    updateState({
      coords: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy
      },
      isLoading: false,
      error: null
    });
  }, [updateState]);

  const handleError = useCallback((error: GeolocationPositionError) => {
    let errorMessage = 'Unknown error occurred';
    
    switch (error.code) {
      case error.PERMISSION_DENIED:
        errorMessage = 'Location access denied by user';
        break;
      case error.POSITION_UNAVAILABLE:
        errorMessage = 'Location information unavailable';
        break;
      case error.TIMEOUT:
        errorMessage = 'Location request timed out';
        break;
    }

    updateState({
      coords: null,
      isLoading: false,
      error: errorMessage
    });
  }, [updateState]);

  const getCurrentPosition = useCallback(() => {
    if (!state.isSupported) {
      updateState({ error: 'Geolocation not supported' });
      return;
    }

    updateState({ isLoading: true, error: null });

    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError,
      {
        enableHighAccuracy,
        timeout,
        maximumAge
      }
    );
  }, [state.isSupported, handleSuccess, handleError, enableHighAccuracy, timeout, maximumAge, updateState]);

  const startWatching = useCallback(() => {
    if (!state.isSupported || watchId !== null) return;

    updateState({ isLoading: true, error: null });

    const id = navigator.geolocation.watchPosition(
      handleSuccess,
      handleError,
      {
        enableHighAccuracy,
        timeout,
        maximumAge
      }
    );

    setWatchId(id);
  }, [state.isSupported, watchId, handleSuccess, handleError, enableHighAccuracy, timeout, maximumAge, updateState]);

  const stopWatching = useCallback(() => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
      updateState({ isLoading: false });
    }
  }, [watchId, updateState]);

  const clearError = useCallback(() => {
    updateState({ error: null });
  }, [updateState]);

  // Auto-start based on options
  useEffect(() => {
    if (watchPosition) {
      startWatching();
    } else {
      getCurrentPosition();
    }

    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [watchPosition, startWatching, getCurrentPosition, watchId]);

  return {
    ...state,
    getCurrentPosition,
    startWatching,
    stopWatching,
    clearError,
    isWatching: watchId !== null
  };
};

export default useGeolocation;