import React from "react";
import ApperIcon from "@/components/ApperIcon";
import StatusBadge from "@/components/molecules/StatusBadge";
import Card from "@/components/atoms/Card";
import { format } from "date-fns";

const AppointmentList = ({ appointments, patients, doctors }) => {
const getPatientName = (patientId) => {
    if (!patientId) return "Unknown";
    const id = typeof patientId === 'object' ? patientId.Id : parseInt(patientId);
    const patient = patients.find(p => p.Id === id);
    return patient ? `${patient.first_name_c} ${patient.last_name_c}` : "Unknown";
  };

  const getDoctorName = (doctorId) => {
    if (!doctorId) return "Unknown";
    const id = typeof doctorId === 'object' ? doctorId.Id : parseInt(doctorId);
    const doctor = doctors.find(d => d.Id === id);
    return doctor ? `Dr. ${doctor.first_name_c} ${doctor.last_name_c}` : "Unknown";
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
                    {getPatientName(appointment.patient_id_c)}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {getDoctorName(appointment.doctor_id_c)}
                  </p>
                </div>
              </div>
              <div className="ml-13 space-y-1">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <ApperIcon name="Clock" size={14} />
                  <span>{appointment.date_c ? format(new Date(appointment.date_c), "MMM dd, yyyy") : "N/A"} at {appointment.time_c || "N/A"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <ApperIcon name="Timer" size={14} />
                  <span>{appointment.duration_c || 0} minutes</span>
                </div>
                {appointment.notes_c && (
                  <p className="text-sm text-gray-600 mt-2">{appointment.notes_c}</p>
                )}
              </div>
            </div>
            <StatusBadge status={appointment.status_c} />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AppointmentList;