import React from "react";
import { css, useTheme } from "@emotion/react";

interface TextInputProps {
  label?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({ placeholder, label, value, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };
  const theme = useTheme();

  return (
    <div>
      <label
        css={css`
          font-size: 14px;
          margin-bottom: 4px;
        `}
      >
        {label}
      </label>
      <input
        placeholder={placeholder}
        type="text"
        css={css`
          border: 1px solid ${theme.colors.secondary + "50"};
          padding: 8px;
          font-size: 16px;
          border-radius: 4px;
          width: 100%;
          box-sizing: border-box;
        `}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default TextInput;
