import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
export default function TextField({
  disabled,
  name,
  type,
  label,
  value,
  onChange,
  required,
  placeholder,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex flex-col items-start">
      <label className="font-medium">{label}</label>
      <div className="relative w-full ">
        <input
          disabled={disabled}
          name={name}
          type={showPassword ? "text" : type || "text"}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className="pt-2 pb-1 px-4 placeholder:text-gray-500 text-secondary-300 rounded-md border-b-2 w-full border-slate-300 focus:outline-none focus-visible:outline-none"
          {...props}
        />
        {type === "password" && (
          <div
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-0 top-0 bottom-0 flex items-center"
          >
            {showPassword ? (
              <Eye className="bg-white text-secondary-100  w-12 px-2" />
            ) : (
              <EyeOff className="bg-white text-secondary-100 w-12 px-2" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
