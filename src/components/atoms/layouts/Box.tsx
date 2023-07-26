import React from "react";
import { css } from "@emotion/react";
import { CSSProperties } from "react";

interface IBoxProps {
  display?: string;
  width?: string;
  height?: string;
  margin?: string;
  padding?: string;
  backgroundColor?: string;
  color?: string;
  children: React.ReactNode;
  style: CSSProperties;
}

const Box: React.FC<IBoxProps> = ({ display = "block", width, height, margin, padding, backgroundColor, color, children, style }) => {
  return (
    <div
      style={style}
      css={css`
        display: ${display};
        width: ${width};
        height: ${height};
        margin: ${margin};
        padding: ${padding};
        background-color: ${backgroundColor};
        color: ${color};
      `}
    >
      {children}
    </div>
  );
};

export default Box;
