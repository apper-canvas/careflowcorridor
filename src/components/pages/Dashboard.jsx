import React, { useState, useEffect } from "react";
import StatCard from "@/components/molecules/StatCard";
import AppointmentList from "@/components/organisms/AppointmentList";
import Card from "@/components/atoms/Card";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import patientService from "@/services/api/patientService";
import appointmentService from "@/services/api/appointmentService";
import doctorService from "@/services/api/doctorService";
import departmentService from "@/services/api/departmentService";

const Dashboard = () => {
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      const [patientsData, appointmentsData, doctorsData, departmentsData] = await Promise.all([
        patientService.getAll(),
        appointmentService.getTodayAppointments(),
        doctorService.getAll(),
        departmentService.getAll()
      ]);
      setPatients(patientsData);
      setAppointments(appointmentsData);
      setDoctors(doctorsData);
      setDepartments(departmentsData);
    } catch (err) {
      setError(err.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadData} />;

const admittedPatients = patients.filter(p => p.status_c === "admitted").length;
  const availableDoctors = doctors.filter(d => d.availability_c === "available").length;
  const totalBeds = departments.reduce((sum, d) => sum + (d.total_beds_c || 0), 0);
  const occupiedBeds = departments.reduce((sum, d) => sum + (d.occupied_beds_c || 0), 0);
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Patients"
          value={patients.length}
          icon="Users"
          color="primary"
          trend="up"
          trendValue="+12%"
        />
        <StatCard
          title="Today's Appointments"
          value={appointments.length}
          icon="Calendar"
          color="info"
          trend="up"
          trendValue="+8%"
        />
        <StatCard
          title="Available Doctors"
          value={availableDoctors}
          icon="Stethoscope"
          color="success"
        />
        <StatCard
          title="Bed Occupancy"
          value={`${occupiedBeds}/${totalBeds}`}
          icon="Bed"
          color="warning"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Today's Appointments</h2>
              <span className="text-sm text-gray-600">{appointments.length} appointments</span>
            </div>
            {appointments.length > 0 ? (
<AppointmentList 
                appointments={appointments} 
                patients={patients}
                doctors={doctors}
              />
            ) : (
              <Empty 
                title="No appointments today"
                description="There are no scheduled appointments for today"
                icon="Calendar"
              />
            )}
          </Card>
        </div>

        <div>
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Department Overview</h2>
            <div className="space-y-4">
{departments.map((dept) => (
                <div key={dept.Id} className="p-4 bg-gradient-to-br from-primary/5 to-transparent rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{dept.name_c || dept.Name}</h3>
                    <span className="text-sm font-medium text-primary">
                      {Math.round(((dept.occupied_beds_c || 0) / (dept.total_beds_c || 1)) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                      style={{ width: `${((dept.occupied_beds_c || 0) / (dept.total_beds_c || 1)) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    {dept.occupied_beds_c || 0} of {dept.total_beds_c || 0} beds occupied
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;