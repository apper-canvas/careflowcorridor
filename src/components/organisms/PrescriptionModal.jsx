import React, { useState, useEffect } from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import { motion, AnimatePresence } from "framer-motion";

function PrescriptionModal({ isOpen, onClose, prescription, onSave }) {
  const [formData, setFormData] = useState({
    medication: "",
    dosage: "",
    frequency: "",
    startDate: "",
    endDate: "",
    instructions: "",
    prescribedBy: ""
  });

  useEffect(() => {
    if (prescription) {
      setFormData({
        medication: prescription.medication || "",
        dosage: prescription.dosage || "",
        frequency: prescription.frequency || "",
        startDate: prescription.startDate || "",
        endDate: prescription.endDate || "",
        instructions: prescription.instructions || "",
        prescribedBy: prescription.prescribedBy || ""
      });
    } else {
      setFormData({
        medication: "",
        dosage: "",
        frequency: "",
        startDate: "",
        endDate: "",
        instructions: "",
        prescribedBy: ""
      });
    }
  }, [prescription, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {prescription ? "Edit Prescription" : "Add Prescription"}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <ApperIcon name="X" size={24} />
              </button>
            </div>

            <div className="overflow-y-auto max-h-[calc(90vh-180px)]">
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Medication Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Medication Name"
                      name="medication"
                      value={formData.medication}
                      onChange={handleChange}
                      placeholder="e.g., Lisinopril"
                      required
                    />
                    <Input
                      label="Dosage"
                      name="dosage"
                      value={formData.dosage}
                      onChange={handleChange}
                      placeholder="e.g., 10mg"
                      required
                    />
                    <Select
                      label="Frequency"
                      name="frequency"
                      value={formData.frequency}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Frequency</option>
                      <option value="Once daily">Once daily</option>
                      <option value="Twice daily">Twice daily</option>
                      <option value="Three times daily">Three times daily</option>
                      <option value="Four times daily">Four times daily</option>
                      <option value="Every 4 hours">Every 4 hours</option>
                      <option value="Every 6 hours">Every 6 hours</option>
                      <option value="Every 8 hours">Every 8 hours</option>
                      <option value="Every 12 hours">Every 12 hours</option>
                      <option value="As needed">As needed</option>
                      <option value="Before meals">Before meals</option>
                      <option value="After meals">After meals</option>
                      <option value="At bedtime">At bedtime</option>
                    </Select>
                    <Input
                      label="Prescribed By"
                      name="prescribedBy"
                      value={formData.prescribedBy}
                      onChange={handleChange}
                      placeholder="e.g., Dr. Smith"
                      required
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Duration</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Start Date"
                      name="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      label="End Date (Optional)"
                      name="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Instructions</h3>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Special Instructions
                  </label>
                  <textarea
                    name="instructions"
                    value={formData.instructions}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                    placeholder="e.g., Take with food, avoid dairy products..."
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <Button type="button" variant="secondary" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {prescription ? "Update Prescription" : "Add Prescription"}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default PrescriptionModal;