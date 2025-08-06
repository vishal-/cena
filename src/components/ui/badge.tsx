import React from "react";

export interface BadgeProps {
  text: string;
  color?: "blue" | "red" | "green" | "gray" | "purple";
  onDelete?: () => void;
}

const Badge: React.FC<BadgeProps> = ({ text, color = "blue", onDelete }) => {
  // Define the background color classes based on the color prop
  const colorClasses = {
    blue: "bg-blue-500 text-white",
    red: "bg-red-500 text-white",
    green: "bg-green-500 text-white",
    gray: "bg-gray-500 text-white",
    purple: "bg-purple-500 text-white",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-sm font-semibold rounded-full ${colorClasses[color]}`}
    >
      {text}

      {onDelete && (
        <button
          onClick={onDelete}
          className="ml-2 hover:bg-black hover:bg-opacity-20 rounded-full transition-colors"
        >
          &#x2718;
        </button>
      )}
    </span>
  );
};

export default Badge;
