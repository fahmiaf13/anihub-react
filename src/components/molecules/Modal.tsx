import { css } from "@emotion/react";
import { Icon } from "@iconify/react";

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<IModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      css={css`
        background: rgba(0, 0, 0, 0.5);
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 100;
      `}
      onClick={onClose}
    >
      <div
        css={css`
          background: white;
          padding: 20px;
          border-radius: 20px;
          position: relative;
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          css={css`
            all: unset;
            cursor: pointer;
            position: absolute;
            top: 20px;
            right: 20px;
          `}
          onClick={onClose}
        >
          <Icon icon="zondicons:close-solid" width={24} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
