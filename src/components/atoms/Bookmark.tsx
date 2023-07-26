import { Icon } from "@iconify/react";
import { CSSProperties, useCallback, useState } from "react";
import { css } from "@emotion/react";

interface IBookmarkProps {
  style?: CSSProperties;
  item?: string[];
}

const Bookmark: React.FC<IBookmarkProps> = ({ style, item }) => {
  const [isMarked, setIsMarked] = useState<boolean>(false);

  const handleClick = useCallback(() => {
    setIsMarked(!isMarked);
  }, [isMarked]);

  return (
    <button
      css={css`
        outline: none;
        -webkit-appearance: none;
        background-color: red;
        all: unset;
        cursor: pointer;
      `}
      style={style}
      onClick={handleClick}
    >
      {isMarked ? (
        <Icon
          icon="mdi:bookmark"
          width={24}
          css={css`
            color: red;
          `}
        />
      ) : (
        <Icon icon="mdi:bookmark-outline" width={24} />
      )}
    </button>
  );
};

export default Bookmark;
