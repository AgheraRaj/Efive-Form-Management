import { motion } from "motion/react";

const ToggleButton = ({ value, onChange }) => {
  return (
    <button
      onClick={() => onChange(!value)}
      className="w-11 h-6 rounded-full cursor-pointer flex items-center px-0.5"
      style={{ justifyContent: value ? "flex-end" : "flex-start", backgroundColor: value ? "#4169e1" : "#d1d5db" }}
    >
      <motion.div
        layout
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
          visualDuration: 0.2,
          bounce: 0.2,
        }}
        className="h-5 w-5 bg-white rounded-full"
      />
    </button>
  );
};

export default ToggleButton;
