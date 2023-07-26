import React, { ButtonHTMLAttributes } from "react";
import { css, useTheme } from "@emotion/react";
interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  fullWidth?: boolean;
  variant?: "primary" | "secondary";
}

const Button: React.FC<IButtonProps> = ({ onClick, children, fullWidth, ...rest }) => {
  const theme = useTheme();

  return (
    <button
      {...rest}
      css={css`
        padding: 8px 16px;
        border: none;
        cursor: pointer;
        outline: none;
        background-color: ${theme.colors.neon};
        width: ${fullWidth && "100%"};
      `}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
