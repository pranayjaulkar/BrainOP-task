export default function CheckBox({ checked, onCheckedChange, required }) {
  return (
    <div className="relative flex cursor-pointer items-center p-1 rounded-md">
      <input
        type="checkbox"
        checked={checked}
        onChange={onCheckedChange}
        required={required}
        className="peer cursor-pointer appearance-none relative h-5 w-5 border border-slate-400 transition-all checked:border-blue-500 checked:bg-blue-500 rounded-md"
      />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3.5 w-3.5"
          viewBox="0 0 20 20"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
    </div>
  );
}
