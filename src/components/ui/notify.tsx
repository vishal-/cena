// Component to display temporary notification messages
import React, { useEffect, useState } from "react";

interface NotifyProps {
  message: string;
  duration?: number;
  type?: "success" | "error" | "info";
  onClose?: () => void;
}

const Notify: React.FC<NotifyProps> = ({
  message,
  duration = 3000,
  type = "info",
  onClose
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        padding: "12px 24px",
        borderRadius: "4px",
        backgroundColor:
          type === "success"
            ? "#4caf50"
            : type === "error"
            ? "#f44336"
            : "#2196f3",
        color: "white",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
        zIndex: 1000,
        animation: "fadeIn 0.3s ease-in"
      }}
    >
      {message}
    </div>
  );
};

export default Notify;
