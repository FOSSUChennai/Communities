import React from 'react';

interface ButtonProps {
  label: string;
  variant: 'primary' | 'secondary';
  url: string;
}

const CallToActionButton: React.FC<ButtonProps> = ({ label, variant, url }) => {
  const baseClasses = 'rounded-md px-6 py-2 md:px-10 md:py-3 text-white transition-colors';

  const variantClasses = {
    primary: 'bg-black hover:bg-gray-800 border-2 border-zinc-700',
    secondary: 'border-2 border-white bg-transparent hover:bg-white/10'
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]}`}
      onClick={() => window.open(url)}
    >
      {label}
    </button>
  );
};

export default CallToActionButton;
