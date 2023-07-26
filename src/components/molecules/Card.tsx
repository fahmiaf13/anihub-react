import { css } from "@emotion/react";
import { CSSProperties } from "react";

interface ICardProps {
  elevation?: number;
  children: React.ReactNode;
  style?: CSSProperties;
}

const Card: React.FC<ICardProps> = ({ elevation = 1, children, style }) => {
  return (
    <div
      style={style}
      css={css`
        width: 185px;
        height: 320px;
        padding: 0.3em;
        background: #f5f5f5;
        border-radius: 20px;
        elevation: ${elevation};
      `}
    >
      {children}
    </div>
  );
};

export default Card;
