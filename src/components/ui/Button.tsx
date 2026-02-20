import React, { useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'outline-white' | 'white';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  icon?: LucideIcon;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  isMobile?: boolean;
  /** Enable magnetic pull-toward-cursor effect on hover */
  magnetic?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  children,
  onClick,
  href,
  icon: Icon,
  disabled = false,
  className = '',
  type = 'button',
  isMobile = false,
  magnetic = false
}) => {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!magnetic || isMobile || disabled || !buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      x.set(distX * 0.3);
      y.set(distY * 0.3);
    },
    [magnetic, isMobile, disabled, x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);
  // Base styles
  const baseStyles = "inline-flex items-center justify-center transition-all duration-200 font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2";
  
  // Variant styles
  const variantStyles = {
    primary: "bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 shadow-sm hover:shadow-md",
    secondary: "border-2 border-primary-500 text-primary-600 hover:bg-primary-50 bg-white",
    tertiary: "text-primary-600 hover:text-primary-700 hover:bg-primary-50",
    'outline-white': "border-2 border-white text-white hover:bg-white hover:text-primary-600",
    white: "bg-white text-primary-600 hover:bg-primary-50"
  };

  // Size styles
  const sizeStyles = {
    small: isMobile ? "px-4 py-2 min-h-[36px] text-sm rounded-xl" : "px-4 py-2 text-sm rounded-xl",
    medium: isMobile ? "px-6 py-3 min-h-[44px] text-base rounded-2xl" : "px-6 py-3 text-base rounded-2xl",
    large: isMobile ? "px-8 py-4 min-h-[48px] text-lg rounded-2xl" : "px-8 py-4 text-lg rounded-2xl"
  };

  // Disabled styles
  const disabledStyles = disabled 
    ? "opacity-50 cursor-not-allowed pointer-events-none" 
    : "cursor-pointer";

  // Icon spacing
  const iconSpacing = Icon ? "space-x-2" : "";

  // Combine all styles
  const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${iconSpacing} ${className}`;

  // Animation props
  const animationProps = {
    whileHover: disabled ? {} : { scale: 1.02 },
    whileTap: disabled ? {} : { scale: 0.98 },
    transition: { duration: 0.2 }
  };

  const magneticStyle = magnetic && !isMobile
    ? { x: springX, y: springY }
    : undefined;

  // Render as link if href is provided
  if (href) {
    return (
      <motion.a
        ref={buttonRef as React.Ref<HTMLAnchorElement>}
        href={href}
        className={buttonStyles}
        style={magneticStyle}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...animationProps}
        onClick={onClick}
      >
        {Icon && <Icon className={size === 'small' ? 'w-4 h-4' : 'w-5 h-5'} />}
        <span>{children}</span>
      </motion.a>
    );
  }

  // Render as button
  return (
    <motion.button
      ref={buttonRef as React.Ref<HTMLButtonElement>}
      type={type}
      className={buttonStyles}
      style={magneticStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      disabled={disabled}
      {...animationProps}
    >
      {Icon && <Icon className={size === 'small' ? 'w-4 h-4' : 'w-5 h-5'} />}
      <span>{children}</span>
    </motion.button>
  );
};

export default Button;