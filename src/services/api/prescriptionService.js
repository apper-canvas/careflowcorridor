import { toast } from "react-toastify";

const prescriptionService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "Name" } },
          { field: { Name: "patient_id_c" } },
          { field: { Name: "medication_c" } },
          { field: { Name: "dosage_c" } },
          { field: { Name: "frequency_c" } },
          { field: { Name: "start_date_c" } },
          { field: { Name: "end_date_c" } },
          { field: { Name: "instructions_c" } },
          { field: { Name: "prescribed_by_c" } }
        ]
      };

      const response = await apperClient.fetchRecords("prescription_c", params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching prescriptions:", error?.message || error);
      return [];
    }
  },

  async getById(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "Name" } },
          { field: { Name: "patient_id_c" } },
          { field: { Name: "medication_c" } },
          { field: { Name: "dosage_c" } },
          { field: { Name: "frequency_c" } },
          { field: { Name: "start_date_c" } },
          { field: { Name: "end_date_c" } },
          { field: { Name: "instructions_c" } },
          { field: { Name: "prescribed_by_c" } }
        ]
      };

      const response = await apperClient.getRecordById("prescription_c", parseInt(id), params);

      if (!response.success) {
        console.error(response.message);
        return null;
      }

      return response.data || null;
    } catch (error) {
      console.error(`Error fetching prescription ${id}:`, error?.message || error);
      return null;
    }
  },

  async getByPatientId(patientId) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Id" } },
          { field: { Name: "Name" } },
          { field: { Name: "patient_id_c" } },
          { field: { Name: "medication_c" } },
          { field: { Name: "dosage_c" } },
          { field: { Name: "frequency_c" } },
          { field: { Name: "start_date_c" } },
          { field: { Name: "end_date_c" } },
          { field: { Name: "instructions_c" } },
          { field: { Name: "prescribed_by_c" } }
        ],
        where: [
          { FieldName: "patient_id_c", Operator: "EqualTo", Values: [parseInt(patientId)] }
        ]
      };

      const response = await apperClient.fetchRecords("prescription_c", params);

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching prescriptions by patient:", error?.message || error);
      return [];
    }
  },

  async create(prescriptionData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const record = {
        Name: prescriptionData.medication_c || "Prescription",
        patient_id_c: parseInt(prescriptionData.patient_id_c),
        medication_c: prescriptionData.medication_c,
        dosage_c: prescriptionData.dosage_c,
        frequency_c: prescriptionData.frequency_c,
        start_date_c: prescriptionData.start_date_c,
        end_date_c: prescriptionData.end_date_c,
        prescribed_by_c: prescriptionData.prescribed_by_c
      };

      if (prescriptionData.instructions_c) record.instructions_c = prescriptionData.instructions_c;

      const params = { records: [record] };
      const response = await apperClient.createRecord("prescription_c", params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success);
        if (failed.length > 0) {
          console.error(`Failed to create prescription:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
          return null;
        }
        return response.results[0]?.data || null;
      }
    } catch (error) {
      console.error("Error creating prescription:", error?.message || error);
      return null;
    }
  },

  async update(id, prescriptionData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const record = { Id: parseInt(id) };

      if (prescriptionData.medication_c) record.medication_c = prescriptionData.medication_c;
      if (prescriptionData.dosage_c) record.dosage_c = prescriptionData.dosage_c;
      if (prescriptionData.frequency_c) record.frequency_c = prescriptionData.frequency_c;
      if (prescriptionData.start_date_c) record.start_date_c = prescriptionData.start_date_c;
      if (prescriptionData.end_date_c) record.end_date_c = prescriptionData.end_date_c;
      if (prescriptionData.instructions_c !== undefined) record.instructions_c = prescriptionData.instructions_c;
      if (prescriptionData.prescribed_by_c) record.prescribed_by_c = prescriptionData.prescribed_by_c;

      const params = { records: [record] };
      const response = await apperClient.updateRecord("prescription_c", params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success);
        if (failed.length > 0) {
          console.error(`Failed to update prescription:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
          return null;
        }
        return response.results[0]?.data || null;
      }
    } catch (error) {
      console.error("Error updating prescription:", error?.message || error);
      return null;
    }
  },

  async delete(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = { RecordIds: [parseInt(id)] };
      const response = await apperClient.deleteRecord("prescription_c", params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success);
        if (failed.length > 0) {
          console.error(`Failed to delete prescription:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
          return false;
        }
        return true;
      }
    } catch (error) {
      console.error("Error deleting prescription:", error?.message || error);
      return false;
    }
  }
};

export default prescriptionService;