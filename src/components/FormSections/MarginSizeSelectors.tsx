import React from "react";

type MarginSize = "small" | "medium" | "large";

interface MarginSizeSelectorProps {
  selectedMarginSize: MarginSize;
  onChange: (size: MarginSize) => void;
}

const MarginSizeSelector: React.FC<MarginSizeSelectorProps> = ({
  selectedMarginSize,
  onChange,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h3 className="text-sm font-medium text-gray-700 mb-2">Page Margin</h3>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onChange("small")}
          className={`px-3 py-1 rounded text-sm ${
            selectedMarginSize === "small"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
        >
          Small
        </button>
        <button
          type="button"
          onClick={() => onChange("medium")}
          className={`px-3 py-1 rounded text-sm ${
            selectedMarginSize === "medium"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
        >
          Medium
        </button>
        <button
          type="button"
          onClick={() => onChange("large")}
          className={`px-3 py-1 rounded text-sm ${
            selectedMarginSize === "large"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
        >
          Large
        </button>
      </div>
    </div>
  );
};

export default MarginSizeSelector;
