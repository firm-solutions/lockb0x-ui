import React from "react";
import Input from "./input";

interface InputProps {
  label: string;
  onChangeText: (text: string) => void;
  rightSlot?: React.ReactNode;
  value?: string;
  isMandatory?: boolean;
  inputType?: React.HTMLInputTypeAttribute;
  inputStyles?: React.CSSProperties;
}

function FormField({
  label,
  value,
  rightSlot,
  isMandatory,
  inputType,
  inputStyles,
  onChangeText,
}: InputProps) {
  return (
    <>
      {/* <div className="flex flex-inline justify-between items-center">
        <label className="block text-sm font-medium  items-center text-gray-700">
          {label}{" "}
          {isMandatory && <span className="text-rose-500 ml-0.5">*</span>}
        </label>
        {rightSlot}
      </div> */}

      <Input
        value={value}
        inputType={inputType}
        onChangeText={onChangeText}
        inputStyles={inputStyles}
      />
    </>
  );
}

export default FormField;
