import React, { useState, useEffect } from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import { motion, AnimatePresence } from "framer-motion";

const PatientModal = ({ isOpen, onClose, patient, onSave, departments, doctors }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    bloodGroup: "",
    allergies: "",
    emergencyContact: "",
    insuranceProvider: "",
    insuranceNumber: "",
    status: "outpatient",
    departmentId: "",
    assignedDoctorId: "",
    medicalHistory: ""
  });

  useEffect(() => {
    if (patient) {
      setFormData({
        ...patient,
        allergies: Array.isArray(patient.allergies) ? patient.allergies.join(", ") : patient.allergies
      });
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "",
        phone: "",
        email: "",
        address: "",
        bloodGroup: "",
        allergies: "",
        emergencyContact: "",
        insuranceProvider: "",
        insuranceNumber: "",
        status: "outpatient",
        departmentId: "",
        assignedDoctorId: "",
        medicalHistory: ""
      });
    }
  }, [patient, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSave = {
      ...formData,
      allergies: formData.allergies.split(",").map(a => a.trim()).filter(a => a),
      admissionDate: patient ? patient.admissionDate : new Date().toISOString().split("T")[0]
    };
    onSave(dataToSave);
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
              className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
                <h2 className="text-xl font-bold text-gray-900">
                  {patient ? "Edit Patient" : "Add New Patient"}
                </h2>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                  <ApperIcon name="X" size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      label="Date of Birth"
                      name="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      required
                    />
                    <Select
                      label="Gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </Select>
                    <Input
                      label="Phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mt-4">
                    <Input
                      label="Address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Medical Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select
                      label="Blood Group"
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Blood Group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </Select>
                    <Input
                      label="Allergies (comma-separated)"
                      name="allergies"
                      value={formData.allergies}
                      onChange={handleChange}
                      placeholder="e.g., Penicillin, Pollen"
                    />
                    <Select
                      label="Status"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      required
                    >
                      <option value="outpatient">Outpatient</option>
                      <option value="admitted">Admitted</option>
                      <option value="discharged">Discharged</option>
                    </Select>
                    <Select
                      label="Department"
                      name="departmentId"
                      value={formData.departmentId}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Department</option>
                      {departments.map(dept => (
                        <option key={dept.Id} value={dept.Id}>{dept.name}</option>
                      ))}
                    </Select>
                    <Select
                      label="Assigned Doctor"
                      name="assignedDoctorId"
                      value={formData.assignedDoctorId}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Doctor</option>
                      {doctors.map(doctor => (
                        <option key={doctor.Id} value={doctor.Id}>
                          Dr. {doctor.firstName} {doctor.lastName} - {doctor.specialization}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Medical History
                    </label>
                    <textarea
                      name="medicalHistory"
                      value={formData.medicalHistory}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                      placeholder="Enter medical history..."
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency & Insurance</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Emergency Contact"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleChange}
                      placeholder="Name - Phone"
                      required
                    />
                    <Input
                      label="Insurance Provider"
                      name="insuranceProvider"
                      value={formData.insuranceProvider}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      label="Insurance Number"
                      name="insuranceNumber"
                      value={formData.insuranceNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <Button type="button" variant="secondary" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {patient ? "Update Patient" : "Add Patient"}
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

export default PatientModal;