// components/PortfolioSkeleton.tsx
import React from 'react';

const PortfolioSkeleton: React.FC = () => {
  return (
    <div className="flex flex-row flex-wrap">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="card w-96 shadow-xl border m-2 animate-pulse"
        >
          <div className="card-body">
            <div className="skeleton h-6 w-full mb-4"></div>
            {/* Title placeholder */}
            <div className="skeleton h-4 w-3/4 mb-2"></div>
            {/* Deploy status placeholder */}
            <div className="skeleton h-4 w-full mb-2"></div>
            {/* Date placeholder */}
            <div className="skeleton h-4 w-full mb-4"></div>
            {/* URL input placeholder */}
            <div className="flex justify-between mt-2">
              <div className="skeleton h-8 w-8 rounded-full"></div>
              {/* Delete button placeholder */}
              <div className="skeleton h-8 w-16"></div>
              {/* Edit button placeholder */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PortfolioSkeleton;
