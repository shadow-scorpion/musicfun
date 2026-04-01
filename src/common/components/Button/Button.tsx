import type { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

type DetailedButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const Button = ({ onClick, children, type, className }: DetailedButtonProps) => {
  return (
    <button onClick={onClick} type={type} className={className}>
      {children}
    </button>
  );
};
