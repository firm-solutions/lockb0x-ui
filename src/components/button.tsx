interface ButtonProps {
  label: JSX.Element | string;
  loading?: boolean;
  className?: string;
  onPress: () => void;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

const Button = ({
  label,
  loading,
  className,
  onPress,
  size = "lg",
  disabled = false

}: ButtonProps) => {
  return (
    <button
      type="button"
      className={`bg-indigo-600  text-white  leading-6 font-medium  rounded-lg
        ${loading ? 'disabled:opacity-50' : ''}
        ${size === "sm"
          ? "p-2 text-xs"
          : size === "md"
            ? "px-2 py-1 text-sm"
            : "px-4 py-2 w-full"
        } ${className}`
      }
      onClick={onPress}
      disabled={loading}
    >
      <i className={`${loading ? "fa fa-spinner fa-spin mr-1" : ""}`} />
      {label}
    </button>
  );
};

export default Button;
