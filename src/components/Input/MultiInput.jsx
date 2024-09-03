/* eslint-disable react/prop-types */
import { useState } from "react";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai"; // Importing icons

function MultiSelect({
  value,
  handleChange,
  error,
  name,
  disabled,
  label,
  placeholder = "Type...",
}) {
  const [selectedItems, setSelectedItems] = useState(value || []);
  const [inputValue, setInputValue] = useState("");

  const handleRemoveChip = (itemToRemove) => {
    const newItems = selectedItems.filter((item) => item !== itemToRemove);
    setSelectedItems(newItems);
    handleChange(newItems);
  };

  const handleClear = () => {
    handleChange([]);
    setInputValue("");
  };

  const handleConfirm = () => {
    if (inputValue && !selectedItems.includes(inputValue)) {
      const newItems = [...selectedItems, inputValue];
      setSelectedItems(newItems);
      handleChange(newItems);
      setInputValue("");
    }
  };

  return (
    <div className="relative mb-6">
      <label
        htmlFor={name}
        className="mb-1 block text-sm font-semibold capitalize text-primary-text"
      >
        {label}
      </label>
      <div className="mb-2 flex flex-wrap gap-2">
        {selectedItems.map((item) => (
          <span
            key={item}
            className="inline-flex items-center rounded-full border border-gray-300 bg-gray-100 px-3 py-1 text-gray-800"
          >
            {item}
            <button
              type="button"
              onClick={() => handleRemoveChip(item)}
              className="ml-2 text-red-500"
            >
              <AiOutlineClose />
            </button>
          </span>
        ))}
      </div>
      <div className="relative">
        <input
          name={name}
          disabled={disabled}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleConfirm()}
          placeholder={placeholder}
          className={`block w-full rounded-md border px-4 py-3 placeholder-gray-500 shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 ${
            error
              ? "border-red-400 text-red-900 placeholder-red-400 focus:ring-red-600"
              : "border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-blue-600"
          } disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-100 disabled:text-gray-800 disabled:placeholder-gray-500 disabled:opacity-70 disabled:shadow-none disabled:focus:ring-blue-600`}
          aria-invalid={error ? "true" : "false"}
        />
        <button
          type="button"
          onClick={handleClear}
          className={`absolute right-12 top-1/2 -translate-y-1/2 transform text-gray-500 transition-opacity duration-300 ${
            inputValue ? "opacity-100" : "opacity-0"
          }`}
        >
          <AiOutlineClose />
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          className={`absolute right-4 top-1/2 -translate-y-1/2 transform text-blue-500 transition-opacity duration-300 ${
            inputValue ? "opacity-100" : "opacity-0"
          }`}
        >
          <AiOutlineCheck />
        </button>
      </div>
      {error && (
        <p id="error-message" className="mt-1 text-sm font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

export default MultiSelect;
