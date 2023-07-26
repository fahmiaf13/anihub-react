import React from "react";
import { css } from "@emotion/react";

interface IContainerProps {
  maxWidth?: string;
  children: React.ReactNode;
}

const Container: React.FC<IContainerProps> = ({ maxWidth = "lg", children }) => {
  return (
    <div
      css={css`
        margin: 0 auto;
        max-width: ${getMaxWidthValue(maxWidth)};
        padding: 0 16px;
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
