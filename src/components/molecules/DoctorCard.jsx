import React from "react";
import Card from "@/components/atoms/Card";
import StatusBadge from "@/components/molecules/StatusBadge";
import ApperIcon from "@/components/ApperIcon";

const DoctorCard = ({ doctor }) => {
  return (
    <Card className="p-6 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold text-lg">
            {doctor.firstName[0]}{doctor.lastName[0]}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              Dr. {doctor.firstName} {doctor.lastName}
            </h3>
            <p className="text-sm text-gray-600">{doctor.specialization}</p>
          </div>
        </div>
        <StatusBadge status={doctor.availability} />
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <ApperIcon name="Phone" size={14} />
          <span>{doctor.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <ApperIcon name="Mail" size={14} />
          <span className="truncate">{doctor.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <ApperIcon name="Calendar" size={14} />
          <span>{doctor.appointmentCount} appointments</span>
        </div>
      </div>
    </Card>
  );
};

export default DoctorCard;