import React, { ButtonHTMLAttributes } from "react";
import { css, useTheme } from "@emotion/react";
interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  fullWidth?: boolean;
  variant?: "primary" | "secondary";
}

const Button: React.FC<IButtonProps> = ({ onClick, children, fullWidth, variant = "primary", ...rest }) => {
  const theme = useTheme();

  return (
    <button
      {...rest}
      css={css`
        padding: 8px 16px;
        border: none;
        cursor: pointer;
        outline: none;
        width: ${fullWidth && "100%"};
        transition: background-color 0.3s ease;

        ${variant === "primary" &&
        `background-color: ${theme.colors.neon};
         color: ${theme.colors.secondary};
         border: ${theme.colors.neon} solid 2px;
        
        &:hover {
          border: ${theme.colors.neon} solid 2px;
          color: ${theme.colors.neon};
          background-color: transparent;
        }`}
      `}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
