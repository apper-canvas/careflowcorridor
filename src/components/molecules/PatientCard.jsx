import React from "react";
import Card from "@/components/atoms/Card";
import StatusBadge from "@/components/molecules/StatusBadge";
import ApperIcon from "@/components/ApperIcon";

const PatientCard = ({ patient, onClick }) => {
  return (
    <Card className="p-4 hover:shadow-md transition-all duration-200 cursor-pointer" onClick={onClick}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-gray-900 mb-1">
            {patient.firstName} {patient.lastName}
          </h3>
          <p className="text-sm text-gray-600">ID: {patient.Id}</p>
        </div>
        <StatusBadge status={patient.status} />
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <ApperIcon name="Phone" size={14} />
          <span>{patient.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <ApperIcon name="Mail" size={14} />
          <span className="truncate">{patient.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <ApperIcon name="Droplet" size={14} />
          <span>{patient.bloodGroup}</span>
        </div>
      </div>
    </Card>
  );
};

export default PatientCard;