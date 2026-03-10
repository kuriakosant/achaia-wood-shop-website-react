import React, { ButtonHTMLAttributes } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
}

function Button({ children, variant = 'default', className, ...props }: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants = {
    default: 'bg-green-600 text-white hover:bg-green-500 focus:ring-green-500',
    outline: 'border-2 border-green-600 text-green-600 hover:bg-green-50 focus:ring-green-500',
    ghost: 'text-gray-600 hover:text-green-600 hover:bg-green-50 focus:ring-gray-500'
  };

  return (
    <button className={twMerge(clsx(baseStyles, variants[variant], className))} {...props}>
      {children}
    </button>
  );
}

export default Button; 