import React, { CSSProperties } from "react";
import { css } from "@emotion/react";

interface IStackProps {
  spacing?: number;
  direction?: "row" | "column";
  align?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  justify?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
  children: React.ReactNode;
  sx?: string;
  style?: CSSProperties;
  height?: string;
}

const Stack: React.FC<IStackProps> = ({ spacing = 8, direction = "column", align = "stretch", justify = "flex-start", children, style, height = "100%" }) => {
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
      `}
      style={style}
    >
      {children}
    </div>
  );
};

export default Stack;
