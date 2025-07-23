import React, { useEffect } from 'react';

const LoadingBar = () => {
  useEffect(() => {
    // Disable scroll
    document.body.style.overflow = 'hidden';

    return () => {
      // Re-enable scroll on unmount
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div
        className="animate-spin rounded-full h-10 w-10 border-4 border-orange-500 border-t-transparent"
        role="status"
        aria-label="Loading"
      ></div>
    </div>
  );
};

export default LoadingBar;
