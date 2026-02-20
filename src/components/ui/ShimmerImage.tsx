import React, { useState } from 'react';

interface ShimmerImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'auto' | 'sync';
}

/**
 * Image component with a shimmer skeleton placeholder that shows
 * while the image is loading, then cross-fades to the real image.
 */
const ShimmerImage: React.FC<ShimmerImageProps> = ({
  src,
  alt,
  className = '',
  loading = 'lazy',
  decoding = 'async',
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative overflow-hidden">
      {/* Shimmer skeleton */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          loaded ? 'opacity-0' : 'opacity-100'
        }`}
        aria-hidden
      >
        <div className="absolute inset-0 bg-gradient-to-r from-secondary-100 via-secondary-50 to-secondary-100 animate-shimmer bg-[length:200%_100%]" />
      </div>

      {/* Actual image */}
      <img
        src={src}
        alt={alt}
        className={`${className} transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading={loading}
        decoding={decoding}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};

export default ShimmerImage;
