import { motion, AnimatePresence } from "framer-motion";
import { HiCheckCircle, HiExclamationCircle, HiXMark } from "react-icons/hi2";
import { useEffect } from "react";

interface CustomAlertProps {
  show: boolean;
  type: "success" | "error";
  message: string;
  onClose: () => void;
}

export const CustomAlert = ({
  show,
  type,
  message,
  onClose,
}: CustomAlertProps) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 20, x: "-50%" }}
          className="fixed bottom-10 left-1/2 z-100 min-w-[320px] flex items-center gap-4 bg-zinc-900/90 border border-zinc-800 p-4 pr-6 rounded-2xl shadow-2xl backdrop-blur-xl"
          style={{
            borderColor:
              type === "success"
                ? "rgba(74, 222, 128, 0.5)"
                : "rgba(248, 113, 113, 0.5)",
          }}
        >
          <div
            className={`size-10 rounded-full flex items-center justify-center ${
              type === "success"
                ? "bg-green-500/10 text-green-400"
                : "bg-red-500/10 text-red-400"
            }`}
          >
            {type === "success" ? (
              <HiCheckCircle className="size-6" />
            ) : (
              <HiExclamationCircle className="size-6" />
            )}
          </div>

          <div className="flex-1">
            <p className="text-white font-medium text-sm">
              {type === "success" ? "Success" : "Error"}
            </p>
            <p className="text-zinc-400 text-xs">{message}</p>
          </div>

          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-white transition-colors"
          >
            <HiXMark className="size-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
