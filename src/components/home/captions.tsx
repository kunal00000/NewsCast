import React from 'react';

const Caption = ({ children }: {children: React.ReactNode}) => {
  return (
    <div className="mt-4 px-2 md:px-6 text-md text-gray-100 line-clamp-1">
      {children} 
    </div>
  );
};

export default Caption;
