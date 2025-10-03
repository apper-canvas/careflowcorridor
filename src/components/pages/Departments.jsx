import React, { useState, useEffect } from "react";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import departmentService from "@/services/api/departmentService";
import doctorService from "@/services/api/doctorService";
import { motion } from "framer-motion";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      const [departmentsData, doctorsData] = await Promise.all([
        departmentService.getAll(),
        doctorService.getAll()
      ]);
      setDepartments(departmentsData);
      setDoctors(doctorsData);
    } catch (err) {
      setError(err.message || "Failed to load departments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

const getHeadDoctor = (headDoctorId) => {
    if (!headDoctorId) return "Not assigned";
    const doctorId = typeof headDoctorId === 'object' ? headDoctorId.Id : parseInt(headDoctorId);
    const doctor = doctors.find(d => d.Id === doctorId);
    return doctor ? `Dr. ${doctor.first_name_c} ${doctor.last_name_c}` : "Not assigned";
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadData} />;

  if (departments.length === 0) {
    return (
      <Empty
        title="No departments available"
        description="No departments are currently in the system"
        icon="Building2"
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Departments</h1>
        <p className="text-gray-600 mt-1">Overview of hospital departments and bed availability</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept, index) => {
const occupancyRate = Math.round(((dept.occupied_beds_c || 0) / (dept.total_beds_c || 1)) * 100);
          const isHighOccupancy = occupancyRate > 80;

          return (
            <motion.div
              key={dept.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg">
                      <ApperIcon name="Building2" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{dept.name_c || dept.Name}</h3>
                      <p className="text-sm text-gray-600">Department</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isHighOccupancy 
                      ? "bg-error/10 text-error" 
                      : "bg-success/10 text-success"
                  }`}>
                    {occupancyRate}% Full
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Bed Occupancy</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {dept.occupied_beds_c || 0} / {dept.total_beds_c || 0}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${occupancyRate}%` }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        className={`h-full ${
                          isHighOccupancy
                            ? "bg-gradient-to-r from-error to-warning"
                            : "bg-gradient-to-r from-primary to-secondary"
                        }`}
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <ApperIcon name="UserCheck" size={16} />
                      <span>Head: {getHeadDoctor(dept.head_doctor_id_c)}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="text-center p-3 bg-success/5 rounded-lg">
                      <p className="text-2xl font-bold text-success">
                        {(dept.total_beds_c || 0) - (dept.occupied_beds_c || 0)}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">Available</p>
                    </div>
                    <div className="text-center p-3 bg-primary/5 rounded-lg">
                      <p className="text-2xl font-bold text-primary">{dept.occupied_beds_c || 0}</p>
                      <p className="text-xs text-gray-600 mt-1">Occupied</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Departments;