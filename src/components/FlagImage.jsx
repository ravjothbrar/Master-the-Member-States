import { useState } from 'react';
import { Flag } from 'lucide-react';

const FlagImage = ({ code, size = 'w160', alt = 'Flag', className = '' }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const baseUrl = 'https://flagcdn.com';
  const primaryUrl = `${baseUrl}/${size}/${code}.png`;
  // Fallback to different size if primary fails
  const fallbackUrl = `${baseUrl}/w160/${code}.png`;

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    if (retryCount < 2) {
      // Retry with a slight delay
      setRetryCount(prev => prev + 1);
      setIsLoading(true);
    } else {
      setIsLoading(false);
      setHasError(true);
    }
  };

  const currentUrl = retryCount === 1 ? fallbackUrl : primaryUrl;

  if (hasError) {
    return (
      <div className={`bg-gray-100 rounded-lg flex items-center justify-center ${className}`}>
        <Flag className="w-8 h-8 text-gray-400" />
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 rounded-lg animate-pulse flex items-center justify-center">
          <Flag className="w-6 h-6 text-gray-300" />
        </div>
      )}
      <img
        key={`${code}-${retryCount}`}
        src={currentUrl}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onLoad={handleLoad}
        onError={handleError}
        loading="eager"
      />
    </div>
  );
};

export default FlagImage;
