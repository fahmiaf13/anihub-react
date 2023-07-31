import React, { useEffect } from "react";
import { css, keyframes } from "@emotion/react";

interface ToastProps {
  message: string;
  duration: number;
  onClose: () => void;
}

const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const Toast: React.FC<ToastProps> = ({ message, duration, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration, onClose]);

  return (
    <div
      css={css`
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #333;
        color: #fff;
        padding: 10px 20px;
        border-radius: 8px;
        animation: ${slideUp} 0.3s ease;
      `}
    >
      {message}
    </div>
  );
};

export default Toast;
