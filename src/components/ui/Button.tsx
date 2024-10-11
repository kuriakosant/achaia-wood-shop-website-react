import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'outline';
  className?: string;
}

function Button({ children, onClick, variant = 'default', className = '' }: ButtonProps) {
  const baseStyles = 'px-4 py-2 rounded';
  const variantStyles = variant === 'outline' ? 'border border-blue-500 text-blue-500' : 'bg-blue-500 text-white';

  return (
    <button onClick={onClick} className={`${baseStyles} ${variantStyles} ${className}`}>
      {children}
    </button>
  );
}

export default Button; 