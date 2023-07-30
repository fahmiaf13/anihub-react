import React from "react";
import { css } from "@emotion/react";

interface TextInputProps {
  label?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const inputStyles = css`
  border: 1px solid #ccc;
  padding: 8px;
  font-size: 16px;
  border-radius: 4px;
  width: 100%;
`;

const labelStyles = css`
  font-size: 14px;
  margin-bottom: 4px;
`;

const TextInput: React.FC<TextInputProps> = ({ placeholder, label, value, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div>
      <label css={labelStyles}>{label}</label>
      <input placeholder={placeholder} type="text" css={inputStyles} value={value} onChange={handleChange} />
    </div>
  );
};

export default TextInput;
