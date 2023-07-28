import React from "react";
import { css, SerializedStyles } from "@emotion/react";

interface IContainerProps {
  maxWidth?: string;
  children: React.ReactNode;
  sx?: SerializedStyles;
}

const Container: React.FC<IContainerProps> = ({ maxWidth = "lg", children, sx }) => {
  return (
    <div
      css={css`
        margin: 0 auto;
        max-width: ${getMaxWidthValue(maxWidth)};
        padding: 0 16px;
        ${sx}
      `}
    >
      {children}
    </div>
  );
};

const getMaxWidthValue = (maxWidth: string) => {
  switch (maxWidth) {
    case "xs":
      return "320px";
    case "sm":
      return "600px";
    case "md":
      return "960px";
    case "lg":
      return "1280px";
    case "xl":
      return "1920px";
    default:
      return maxWidth;
  }
};

export default Container;
