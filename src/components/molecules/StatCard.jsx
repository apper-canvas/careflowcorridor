import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import { motion } from "framer-motion";

const StatCard = ({ title, value, icon, trend, trendValue, color = "primary" }) => {
  const colorClasses = {
    primary: "bg-gradient-to-br from-primary/10 to-primary/5 text-primary",
    success: "bg-gradient-to-br from-success/10 to-success/5 text-success",
    warning: "bg-gradient-to-br from-warning/10 to-warning/5 text-warning",
    error: "bg-gradient-to-br from-error/10 to-error/5 text-error",
    info: "bg-gradient-to-br from-info/10 to-info/5 text-info"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-6 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
            <ApperIcon name={icon} size={24} />
          </div>
          {trend && (
            <div className={`flex items-center gap-1 text-sm ${trend === "up" ? "text-success" : "text-error"}`}>
              <ApperIcon name={trend === "up" ? "TrendingUp" : "TrendingDown"} size={16} />
              <span className="font-medium">{trendValue}</span>
            </div>
          )}
        </div>
        <div>
          <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
          <p className="text-sm text-gray-600">{title}</p>
        </div>
      </Card>
    </motion.div>
  );
};

export default StatCard;