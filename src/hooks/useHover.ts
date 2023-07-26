import { useState } from "react";

const useHover = (): [boolean, React.HTMLAttributes<HTMLElement>] => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const hoverProps: React.HTMLAttributes<HTMLElement> = {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  };

  return [isHovered, hoverProps];
};

export default useHover;
