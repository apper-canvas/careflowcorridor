import React, { useState, useEffect } from "react";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import AppointmentList from "@/components/organisms/AppointmentList";
import AppointmentModal from "@/components/organisms/AppointmentModal";
import Card from "@/components/atoms/Card";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import appointmentService from "@/services/api/appointmentService";
import patientService from "@/services/api/patientService";
import doctorService from "@/services/api/doctorService";
import { toast } from "react-toastify";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      const [appointmentsData, patientsData, doctorsData] = await Promise.all([
        appointmentService.getAll(),
        patientService.getAll(),
        doctorService.getAll()
      ]);
      setAppointments(appointmentsData);
      setPatients(patientsData);
      setDoctors(doctorsData);
    } catch (err) {
      setError(err.message || "Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddAppointment = () => {
    setSelectedAppointment(null);
    setIsModalOpen(true);
  };

  const handleSaveAppointment = async (appointmentData) => {
    try {
      if (selectedAppointment) {
        await appointmentService.update(selectedAppointment.Id, appointmentData);
        toast.success("Appointment updated successfully");
      } else {
        await appointmentService.create(appointmentData);
        toast.success("Appointment scheduled successfully");
      }
      setIsModalOpen(false);
      loadData();
    } catch (err) {
      toast.error("Failed to save appointment");
    }
  };

const filteredAppointments = filterStatus === "all"
    ? appointments
    : appointments.filter(a => a.status_c === filterStatus);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadData} />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-600 mt-1">Manage patient appointments and schedules</p>
        </div>
        <Button onClick={handleAddAppointment}>
          <ApperIcon name="Plus" size={18} />
          Schedule Appointment
        </Button>
      </div>

      <Card className="p-6">
        <div className="mb-6 flex flex-wrap gap-3">
          <button
            onClick={() => setFilterStatus("all")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              filterStatus === "all"
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All Appointments
          </button>
          <button
            onClick={() => setFilterStatus("scheduled")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              filterStatus === "scheduled"
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Scheduled
          </button>
          <button
            onClick={() => setFilterStatus("completed")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              filterStatus === "completed"
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setFilterStatus("cancelled")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              filterStatus === "cancelled"
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Cancelled
          </button>
        </div>

        {filteredAppointments.length > 0 ? (
          <AppointmentList
            appointments={filteredAppointments}
            patients={patients}
            doctors={doctors}
          />
        ) : (
          <Empty
            title="No appointments found"
            description={filterStatus === "all" 
              ? "Start by scheduling your first appointment"
              : `No ${filterStatus} appointments found`}
            actionLabel="Schedule Appointment"
            onAction={handleAddAppointment}
            icon="Calendar"
          />
        )}
      </Card>

      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        appointment={selectedAppointment}
        onSave={handleSaveAppointment}
        patients={patients}
        doctors={doctors}
      />
    </div>
  );
};

export default Appointments;