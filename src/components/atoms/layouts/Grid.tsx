import React from "react";
import { css } from "@emotion/react";
import { CSSProperties } from "react";

interface IGridProps {
  container?: boolean;
  spacing?: number;
  direction?: "row" | "column";
  alignContent?: "stretch" | "center" | "flex-start" | "flex-end" | "space-between" | "space-around";
  alignItems?: "stretch" | "center" | "flex-start" | "flex-end" | "baseline";
  justifyContent?: "flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly";
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  children: React.ReactNode;
  style?: CSSProperties;
}

type Breakpoints = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
};

const Grid: React.FC<IGridProps> = ({ container = false, spacing = 0, direction = "row", alignContent = "stretch", alignItems = "stretch", justifyContent = "flex-start", wrap = "wrap", xs, sm, md, lg, xl, children, style }) => {
  return (
    <div
      style={style}
      css={css`
        display: ${container ? "flex" : "block"};
        flex-direction: ${direction};
        align-content: ${alignContent};
        align-items: ${alignItems};
        justify-content: ${justifyContent};
        flex-wrap: ${wrap};
        gap: ${spacing}px;

        ${xs && getBreakpointCSS("xs", xs)}
        ${sm && getBreakpointCSS("sm", sm)}
        ${md && getBreakpointCSS("md", md)}
        ${lg && getBreakpointCSS("lg", lg)}
        ${xl && getBreakpointCSS("xl", xl)}
      `}
    >
      {children}
    </div>
  );
};

const getBreakpointCSS = (breakpoint: keyof Breakpoints, size: number) => css`
  @media (min-width: ${breakpoints[breakpoint]}px) {
    flex: 0 0 ${(size / 12) * 100}%;
    max-width: ${(size / 12) * 100}%;
  }
`;

const breakpoints: Breakpoints = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
};

export default Grid;
