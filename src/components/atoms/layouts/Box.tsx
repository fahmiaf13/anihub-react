import React from "react";
import { css, SerializedStyles } from "@emotion/react";

interface IBoxProps {
  display?: string;
  width?: string;
  height?: string;
  margin?: string;
  padding?: string;
  backgroundColor?: string;
  color?: string;
  children: React.ReactNode;
  sx?: SerializedStyles;
}

const Box: React.FC<IBoxProps> = ({ sx, display = "block", width, height, margin, padding, backgroundColor, color, children }) => {
  return (
    <div
      css={css`
        display: ${display};
        width: ${width};
        height: ${height};
        margin: ${margin};
        padding: ${padding};
        background-color: ${backgroundColor};
        color: ${color};
        ${sx}
      `}
    >
      {children}
    </div>
  );
};

export default Box;
