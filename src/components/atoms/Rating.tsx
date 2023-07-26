import React from "react";
import { Icon } from "@iconify/react";

interface IRatingProps {}

const Rating: React.FC<IRatingProps> = () => {
  return (
    <div>
      <Icon icon="pepicons-pop:star-filled" />
    </div>
  );
};

export default Rating;
