import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No data found", 
  description = "Get started by adding your first item",
  actionLabel = "Add New",
  onAction,
  icon = "Inbox"
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      <div className="bg-primary/5 rounded-full p-6 mb-6">
        <ApperIcon name={icon} size={48} className="text-primary" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 text-center max-w-md">{description}</p>
      {onAction && (
        <button
          onClick={onAction}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all duration-200 flex items-center gap-2 font-medium"
        >
          <ApperIcon name="Plus" size={18} />
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default Empty;