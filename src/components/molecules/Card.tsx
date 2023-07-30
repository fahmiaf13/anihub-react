import { css, SerializedStyles } from "@emotion/react";

interface ICardProps {
  elevation?: number;
  children?: React.ReactNode;
  sx?: SerializedStyles;
  isSelected?: boolean;
  onSelect?: () => void;
}

const Card: React.FC<ICardProps> = ({ isSelected, elevation = 1, children, sx, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      css={css`
        border: ${isSelected ? "2px solid red" : "2px solid transparent"};
        width: 180px;
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
