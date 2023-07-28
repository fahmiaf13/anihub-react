import { css, SerializedStyles } from "@emotion/react";

type TFontSize = "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "8xl" | "9xl";

interface ITypographyProps {
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  font?: string;
  size?: TFontSize;
  children: React.ReactNode | string;
  align?: "center" | "left" | "right" | "justify";
  sx?: SerializedStyles;
}

const Typography: React.FC<ITypographyProps> = ({ sx, font = "Outfit", weight = 400, children, size = "base", align = "left" }) => {
  return (
    <div
      css={css`
        font-family: ${font}, sans-serif;
        font-weight: ${weight};
        font-size: ${getFontSize(size)};
        text-align: ${align};
        ${sx}
      `}
    >
      {children}
    </div>
  );
};

const getFontSize = (variant: TFontSize): string => {
  switch (variant) {
    case "xs":
      return "0.75rem";
    case "sm":
      return "0.875rem";
    case "base":
      return "1rem";
    case "lg":
      return "1.125rem";
    case "xl":
      return "1.25rem";
    case "2xl":
      return "1.5rem";
    case "3xl":
      return "1.875rem";
    case "4xl":
      return "2.25rem";
    case "5xl":
      return "3rem";
    case "6xl":
      return "4rem";
    case "7xl":
      return "5rem";
    case "8xl":
      return "6rem";
    case "9xl":
      return "8rem";
    default:
      return "1rem"; // Default font size
  }
};

export default Typography;
