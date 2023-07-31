import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";

interface IToastProps {
  message: string;
  duration?: number;
}

const toastStyles = css`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: #fff;
  padding: 12px 16px;
  border-radius: 4px;
  z-index: 9999;
  opacity: 0;
  transition: opacity 0.3s;
`;

const Toast: React.FC<IToastProps> = ({ message, duration = 3000 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <div css={toastStyles} style={{ opacity: visible ? 1 : 0 }}>
      {message}
    </div>
  );
};

export default Toast;
