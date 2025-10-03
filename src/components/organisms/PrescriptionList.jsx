import React from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import Empty from "@/components/ui/Empty";

function PrescriptionList({ prescriptions, onEdit, onDelete }) {
  if (!prescriptions || prescriptions.length === 0) {
    return (
      <Empty
        icon="Pill"
        message="No prescriptions found"
        description="Add a new prescription to get started"
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Medication
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Dosage
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Frequency
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Start Date
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              End Date
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Prescribed By
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {prescriptions.map((prescription) => (
            <tr key={prescription.Id} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-4">
                <div className="flex items-center gap-2">
                  <ApperIcon name="Pill" size={18} className="text-primary" />
                  <span className="font-medium text-gray-900">{prescription.medication}</span>
                </div>
              </td>
              <td className="px-4 py-4 text-gray-600">{prescription.dosage}</td>
              <td className="px-4 py-4 text-gray-600">{prescription.frequency}</td>
              <td className="px-4 py-4 text-gray-600">
                {new Date(prescription.startDate).toLocaleDateString()}
              </td>
              <td className="px-4 py-4 text-gray-600">
                {prescription.endDate 
                  ? new Date(prescription.endDate).toLocaleDateString() 
                  : "Ongoing"}
              </td>
              <td className="px-4 py-4 text-gray-600">{prescription.prescribedBy}</td>
              <td className="px-4 py-4">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => onEdit(prescription)}
                    className="p-1.5 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                    title="Edit prescription"
                  >
                    <ApperIcon name="Edit2" size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(prescription.Id)}
                    className="p-1.5 text-error hover:bg-error/10 rounded-lg transition-colors"
                    title="Delete prescription"
                  >
                    <ApperIcon name="Trash2" size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PrescriptionList;