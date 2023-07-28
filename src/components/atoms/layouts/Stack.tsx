import React from "react";
import { css, SerializedStyles } from "@emotion/react";

interface IStackProps {
  spacing?: number;
  direction?: "row" | "column";
  align?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  justify?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
  children: React.ReactNode;
  sx?: SerializedStyles;
  height?: string;
}

const Stack: React.FC<IStackProps> = ({ sx, spacing = 8, direction = "column", align = "stretch", justify = "flex-start", children, height = "100%" }) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: ${direction};
        align-items: ${align};
        justify-content: ${justify};
        gap: ${spacing}px;
        height: ${height};
        box-sizing: border-box;
        ${sx}
      `}
    >
      {children}
    </div>
  );
};

export default Stack;
