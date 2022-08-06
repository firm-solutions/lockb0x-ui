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
    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full p-3 shadow-sm sm:text-sm border border-gray-300 rounded-md"
    style={inputStyles}
  />
);

export default Input;
