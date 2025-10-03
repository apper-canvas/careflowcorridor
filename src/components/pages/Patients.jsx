import React, { useEffect, useState } from "react";
import prescriptionService from "@/services/api/prescriptionService";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Loading from "@/components/ui/Loading";
import ConfirmDialog from "@/components/organisms/ConfirmDialog";
import PatientModal from "@/components/organisms/PatientModal";
import PatientTable from "@/components/organisms/PatientTable";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import patientService from "@/services/api/patientService";
import doctorService from "@/services/api/doctorService";
import departmentService from "@/services/api/departmentService";

const Patients = () => {
const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState(null);
  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      const [patientsData, departmentsData, doctorsData] = await Promise.all([
        patientService.getAll(),
        departmentService.getAll(),
        doctorService.getAll()
      ]);
      setPatients(patientsData);
      setFilteredPatients(patientsData);
      setDepartments(departmentsData);
      setDoctors(doctorsData);
    } catch (err) {
      setError(err.message || "Failed to load patients");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
if (searchQuery) {
      const filtered = patients.filter(p =>
        `${p.first_name_c} ${p.last_name_c}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.email_c?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.phone_c?.includes(searchQuery)
      );
      setFilteredPatients(filtered);
    } else {
      setFilteredPatients(patients);
    }
  }, [searchQuery, patients]);

  const handleAddPatient = () => {
    setSelectedPatient(null);
    setIsModalOpen(true);
  };

  const handleEditPatient = (patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

const handleViewPatient = async (patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
    await loadPrescriptions(patient.Id);
  };

  const loadPrescriptions = async (patientId) => {
    try {
      const data = await prescriptionService.getByPatientId(patientId);
      setPrescriptions(data);
    } catch (err) {
      console.error("Failed to load prescriptions:", err);
      setPrescriptions([]);
    }
  };

  const handleAddPrescription = async (prescriptionData) => {
    try {
const newPrescription = await prescriptionService.create({
        ...prescriptionData,
        patient_id_c: selectedPatient.Id
      });
      setPrescriptions(prev => [...prev, newPrescription]);
      toast.success("Prescription added successfully");
    } catch (err) {
      console.error("Failed to add prescription:", err);
      toast.error("Failed to add prescription");
    }
  };

  const handleEditPrescription = async (id, prescriptionData) => {
    try {
      const updated = await prescriptionService.update(id, prescriptionData);
      if (updated) {
        setPrescriptions(prev =>
          prev.map(p => (p.Id === id ? updated : p))
        );
        toast.success("Prescription updated successfully");
      }
    } catch (err) {
      console.error("Failed to update prescription:", err);
      toast.error("Failed to update prescription");
    }
  };

  const handleDeletePrescription = async (id) => {
    if (!confirm("Are you sure you want to delete this prescription?")) return;
    
    try {
      await prescriptionService.delete(id);
      setPrescriptions(prev => prev.filter(p => p.Id !== id));
      toast.success("Prescription deleted successfully");
    } catch (err) {
      console.error("Failed to delete prescription:", err);
      toast.error("Failed to delete prescription");
    }
  };

  const handleSavePatient = async (patientData) => {
    try {
      if (selectedPatient) {
        await patientService.update(selectedPatient.Id, patientData);
        toast.success("Patient updated successfully");
      } else {
        await patientService.create(patientData);
        toast.success("Patient added successfully");
      }
      setIsModalOpen(false);
      loadData();
    } catch (err) {
      toast.error("Failed to save patient");
    }
  };

  const handleDeleteClick = (patientId) => {
    setPatientToDelete(patientId);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await patientService.delete(patientToDelete);
      toast.success("Patient deleted successfully");
      setIsDeleteDialogOpen(false);
      loadData();
    } catch (err) {
      toast.error("Failed to delete patient");
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadData} />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
          <p className="text-gray-600 mt-1">Manage patient records and information</p>
        </div>
        <Button onClick={handleAddPatient}>
          <ApperIcon name="Plus" size={18} />
          Add Patient
        </Button>
      </div>

      <Card className="p-6">
        <div className="mb-6">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search patients by name, email, or phone..."
          />
        </div>

        {filteredPatients.length > 0 ? (
          <PatientTable
            patients={filteredPatients}
            onView={handleViewPatient}
            onEdit={handleEditPatient}
            onDelete={handleDeleteClick}
          />
        ) : searchQuery ? (
          <Empty
            title="No patients found"
            description={`No patients match "${searchQuery}"`}
            icon="Search"
          />
        ) : (
          <Empty
            title="No patients yet"
            description="Start by adding your first patient to the system"
            actionLabel="Add Patient"
            onAction={handleAddPatient}
            icon="Users"
          />
        )}
      </Card>

<PatientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        patient={selectedPatient}
        onSave={handleSavePatient}
        departments={departments}
        doctors={doctors}
        prescriptions={prescriptions}
        onAddPrescription={handleAddPrescription}
        onEditPrescription={handleEditPrescription}
        onDeletePrescription={handleDeletePrescription}
      />

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Patient"
        message="Are you sure you want to delete this patient? This action cannot be undone."
        type="danger"
      />
    </div>
  );
};

export default Patients;