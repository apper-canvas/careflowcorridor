import React from "react";
import ApperIcon from "@/components/ApperIcon";
import StatusBadge from "@/components/molecules/StatusBadge";
import Button from "@/components/atoms/Button";
import { format } from "date-fns";

const PatientTable = ({ patients, onView, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Patient
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Contact
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Blood Group
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Admission Date
            </th>
            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
{patients.map((patient) => (
            <tr key={patient.Id} className="hover:bg-gray-50 transition-colors duration-150">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold">
                    {patient.first_name_c?.[0]}{patient.last_name_c?.[0]}
                  </div>
                  <div className="ml-4">
                    <div className="font-medium text-gray-900">
                      {patient.first_name_c} {patient.last_name_c}
                    </div>
                    <div className="text-sm text-gray-600">ID: {patient.Id}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">{patient.phone_c}</div>
                <div className="text-sm text-gray-600">{patient.email_c}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-error/10 text-error">
                  {patient.blood_group_c}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <StatusBadge status={patient.status_c} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {patient.admission_date_c ? format(new Date(patient.admission_date_c), "MMM dd, yyyy") : "N/A"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => onView(patient)}
                    className="text-primary hover:text-primary/80 p-1.5 hover:bg-primary/10 rounded transition-colors duration-150"
                  >
                    <ApperIcon name="Eye" size={18} />
                  </button>
                  <button
                    onClick={() => onEdit(patient)}
                    className="text-info hover:text-info/80 p-1.5 hover:bg-info/10 rounded transition-colors duration-150"
                  >
                    <ApperIcon name="Edit" size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(patient.Id)}
                    className="text-error hover:text-error/80 p-1.5 hover:bg-error/10 rounded transition-colors duration-150"
                  >
                    <ApperIcon name="Trash2" size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientTable;