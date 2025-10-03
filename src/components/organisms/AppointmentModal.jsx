import React, { useState, useEffect } from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import { motion, AnimatePresence } from "framer-motion";

const AppointmentModal = ({ isOpen, onClose, appointment, onSave, patients, doctors }) => {
const [formData, setFormData] = useState({
    patient_id_c: "",
    doctor_id_c: "",
    date_c: "",
    time_c: "",
    duration_c: 30,
    type_c: "consultation",
    status_c: "scheduled",
    notes_c: ""
  });

  useEffect(() => {
if (appointment) {
      setFormData({
        patient_id_c: appointment.patient_id_c?.Id || appointment.patient_id_c || "",
        doctor_id_c: appointment.doctor_id_c?.Id || appointment.doctor_id_c || "",
        date_c: appointment.date_c || "",
        time_c: appointment.time_c || "",
        duration_c: appointment.duration_c || 30,
        type_c: appointment.type_c || "consultation",
        status_c: appointment.status_c || "scheduled",
        notes_c: appointment.notes_c || ""
      });
    } else {
      setFormData({
        patient_id_c: "",
        doctor_id_c: "",
        date_c: "",
        time_c: "",
        duration_c: 30,
        type_c: "consultation",
        status_c: "scheduled",
        notes_c: ""
      });
    }
  }, [appointment, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

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
              className="bg-white rounded-lg shadow-xl w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  {appointment ? "Edit Appointment" : "Schedule New Appointment"}
                </h2>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                  <ApperIcon name="X" size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<Select
                    label="Patient"
                    name="patient_id_c"
                    value={formData.patient_id_c}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Patient</option>
                    {patients.map(patient => (
                      <option key={patient.Id} value={patient.Id}>
                        {patient.first_name_c} {patient.last_name_c}
                      </option>
                    ))}
                  </Select>
<Select
                    label="Doctor"
                    name="doctor_id_c"
                    value={formData.doctor_id_c}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Doctor</option>
                    {doctors.map(doctor => (
                      <option key={doctor.Id} value={doctor.Id}>
                        Dr. {doctor.first_name_c} {doctor.last_name_c} - {doctor.specialization_c}
                      </option>
))}
                  </Select>
                  <Input
                    label="Date"
                    name="date_c"
                    type="date"
                    value={formData.date_c}
onChange={handleChange}
                    required
                  />
                  <Input
                    label="Time"
                    name="time_c"
                    type="time"
value={formData.time_c}
                    onChange={handleChange}
                    required
                  />
                  <Select
                    label="Duration (minutes)"
                    name="duration_c"
                    value={formData.duration_c}
                    onChange={handleChange}
                    required
                  >
                    <option value={15}>15 minutes</option>
                    <option value={30}>30 minutes</option>
                    <option value={45}>45 minutes</option>
                    <option value={60}>60 minutes</option>
                  </Select>
<Select
                    label="Type"
                    name="type_c"
                    value={formData.type_c}
                    onChange={handleChange}
                    required
                  >
                    <option value="consultation">Consultation</option>
                    <option value="follow-up">Follow-up</option>
                    <option value="checkup">Checkup</option>
                    <option value="emergency">Emergency</option>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Notes
                  </label>
                  <textarea
name="notes_c"
                    value={formData.notes_c}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                    placeholder="Enter appointment notes..."
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <Button type="button" variant="secondary" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {appointment ? "Update Appointment" : "Schedule Appointment"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AppointmentModal;