import React from "react";

interface InputProps {
  onChangeText: (text: string) => void;
  value?: string;
  inputType?: React.HTMLInputTypeAttribute;
  inputStyles?: React.CSSProperties;
}

const Input = ({ value, inputStyles, inputType, onChangeText }: InputProps) => (
  <input
    type={inputType || "text"}
    onChange={(e) => onChangeText(e.target.value)}
    value={value}
    className="form-control"
    style={inputStyles}
  />
);

export default Input;
