import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Header = ({ onMenuClick, onQuickAction }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuClick}
              className="lg:hidden text-gray-700 hover:text-gray-900"
            >
              <ApperIcon name="Menu" size={24} />
            </button>
            <div className="lg:hidden flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <ApperIcon name="Heart" size={18} className="text-white" />
              </div>
              <h1 className="text-lg font-bold text-gray-900">CareFlow</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={onQuickAction}
              size="sm"
              className="flex items-center gap-2"
            >
              <ApperIcon name="Plus" size={18} />
              <span className="hidden sm:inline">Quick Action</span>
            </Button>
            <button className="p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200">
              <ApperIcon name="Bell" size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;