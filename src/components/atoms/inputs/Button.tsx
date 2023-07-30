import React, { ButtonHTMLAttributes } from "react";
import { SerializedStyles, css, useTheme } from "@emotion/react";
import { Typography } from "..";
interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  fullWidth?: boolean;
  variant?: "primary" | "secondary" | "neon";
  sx?: SerializedStyles;
}

const Button: React.FC<IButtonProps> = ({ sx, onClick, children, fullWidth, variant = "neon", ...rest }) => {
  const theme = useTheme();

  return (
    <button
      {...rest}
      css={css`
        ${sx}
        padding: 8px 16px;
        border: none;
        cursor: pointer;
        outline: none;
        border-radius: 10px;
        width: ${fullWidth && "100%"};
        transition: background-color 0.3s ease;

        ${variant === "primary" &&
        `background-color: ${theme.colors.primary};
         color: ${theme.colors.secondary};
         border: ${theme.colors.primary} solid 2px;
        &:hover {
          border: ${theme.colors.primary} solid 2px;
          color: ${theme.colors.primary};
          background-color: transparent;
        }`}

        ${variant === "secondary" &&
        `background-color: ${theme.colors.secondary};
         color: ${theme.colors.primary};
         border: ${theme.colors.secondary} solid 2px;
        &:hover {
          border: ${theme.colors.secondary} solid 2px;
          color: ${theme.colors.secondary};
          background-color: transparent;
        }`}

        ${variant === "neon" &&
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
      <Typography>{children}</Typography>
    </button>
  );
};

export default Button;
