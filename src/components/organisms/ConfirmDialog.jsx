import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { motion, AnimatePresence } from "framer-motion";

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message, type = "danger" }) => {
  const icons = {
    danger: { name: "AlertCircle", color: "text-error" },
    warning: { name: "AlertTriangle", color: "text-warning" },
    info: { name: "Info", color: "text-info" }
  };

  const icon = icons[type] || icons.danger;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-lg shadow-xl w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 ${icon.color}`}>
                    <ApperIcon name={icon.name} size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
                    <p className="text-gray-600">{message}</p>
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <Button type="button" variant="secondary" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="button" variant={type} onClick={onConfirm}>
                    Confirm
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ConfirmDialog;