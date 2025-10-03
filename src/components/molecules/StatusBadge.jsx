import React from "react";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const StatusBadge = ({ status }) => {
  const statusConfig = {
    scheduled: { variant: "info", icon: "Clock", label: "Scheduled" },
    completed: { variant: "success", icon: "CheckCircle", label: "Completed" },
    cancelled: { variant: "error", icon: "XCircle", label: "Cancelled" },
    "no-show": { variant: "warning", icon: "AlertCircle", label: "No Show" },
    admitted: { variant: "info", icon: "Bed", label: "Admitted" },
    outpatient: { variant: "primary", icon: "UserCheck", label: "Outpatient" },
    discharged: { variant: "success", icon: "UserMinus", label: "Discharged" },
    available: { variant: "success", icon: "UserCheck", label: "Available" },
    "on-duty": { variant: "info", icon: "Briefcase", label: "On Duty" },
    "off-duty": { variant: "default", icon: "Coffee", label: "Off Duty" }
  };

  const config = statusConfig[status] || statusConfig.scheduled;

  return (
    <Badge variant={config.variant} className="flex items-center gap-1">
      <ApperIcon name={config.icon} size={12} />
      {config.label}
    </Badge>
  );
};

export default StatusBadge;