import React from "react";
import ApperIcon from "@/components/ApperIcon";
import StatusBadge from "@/components/molecules/StatusBadge";
import Card from "@/components/atoms/Card";
import { format } from "date-fns";

const AppointmentList = ({ appointments, patients, doctors }) => {
  const getPatientName = (patientId) => {
    const patient = patients.find(p => p.Id === parseInt(patientId));
    return patient ? `${patient.firstName} ${patient.lastName}` : "Unknown";
  };

  const getDoctorName = (doctorId) => {
    const doctor = doctors.find(d => d.Id === parseInt(doctorId));
    return doctor ? `Dr. ${doctor.firstName} ${doctor.lastName}` : "Unknown";
  };

  return (
    <div className="space-y-3">
      {appointments.map((appointment) => (
        <Card key={appointment.Id} className="p-4 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold">
                  <ApperIcon name="Calendar" size={18} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {getPatientName(appointment.patientId)}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {getDoctorName(appointment.doctorId)}
                  </p>
                </div>
              </div>
              <div className="ml-13 space-y-1">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <ApperIcon name="Clock" size={14} />
                  <span>{format(new Date(appointment.date), "MMM dd, yyyy")} at {appointment.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <ApperIcon name="Timer" size={14} />
                  <span>{appointment.duration} minutes</span>
                </div>
                {appointment.notes && (
                  <p className="text-sm text-gray-600 mt-2">{appointment.notes}</p>
                )}
              </div>
            </div>
            <StatusBadge status={appointment.status} />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AppointmentList;