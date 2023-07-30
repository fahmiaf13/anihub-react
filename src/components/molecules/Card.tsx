import { css, SerializedStyles } from "@emotion/react";

interface ICardProps {
  elevation?: number;
  children: React.ReactNode;
  sx?: SerializedStyles;
  isSelected?: boolean;
}

const Card: React.FC<ICardProps> = ({ isSelected, elevation = 1, children, sx, ...rest }) => {
  return (
    <div
      {...rest}
      css={css`
        border: ${isSelected ? "2px solid red" : "2px solid transparent"};
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
