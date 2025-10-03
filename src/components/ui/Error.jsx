import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      <div className="bg-red-50 rounded-full p-6 mb-6">
        <ApperIcon name="AlertCircle" size={48} className="text-error" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Oops! Something went wrong</h3>
      <p className="text-gray-600 mb-6 text-center max-w-md">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all duration-200 flex items-center gap-2 font-medium"
        >
          <ApperIcon name="RefreshCw" size={18} />
          Try Again
        </button>
      )}
    </div>
  );
};

export default Error;