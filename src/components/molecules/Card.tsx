import { css, SerializedStyles } from "@emotion/react";

interface ICardProps {
  elevation?: number;
  children: React.ReactNode;
  sx?: SerializedStyles;
}

const Card: React.FC<ICardProps> = ({ elevation = 1, children, sx }) => {
  return (
    <div
      css={css`
        width: 185px;
        height: 320px;
        padding: 0.3em;
        background: #f5f5f5;
        border-radius: 20px;
        elevation: ${elevation};
        ${sx}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
