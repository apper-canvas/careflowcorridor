import { toast } from "react-toastify";

const patientService = {
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
          { field: { Name: "first_name_c" } },
          { field: { Name: "last_name_c" } },
          { field: { Name: "date_of_birth_c" } },
          { field: { Name: "gender_c" } },
          { field: { Name: "phone_c" } },
          { field: { Name: "email_c" } },
          { field: { Name: "address_c" } },
          { field: { Name: "blood_group_c" } },
          { field: { Name: "allergies_c" } },
          { field: { Name: "emergency_contact_c" } },
          { field: { Name: "insurance_provider_c" } },
          { field: { Name: "insurance_number_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "medical_history_c" } },
          { field: { Name: "admission_date_c" } },
          { field: { Name: "department_id_c" } },
          { field: { Name: "assigned_doctor_id_c" } }
        ]
      };

      const response = await apperClient.fetchRecords("patient_c", params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching patients:", error?.message || error);
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
          { field: { Name: "first_name_c" } },
          { field: { Name: "last_name_c" } },
          { field: { Name: "date_of_birth_c" } },
          { field: { Name: "gender_c" } },
          { field: { Name: "phone_c" } },
          { field: { Name: "email_c" } },
          { field: { Name: "address_c" } },
          { field: { Name: "blood_group_c" } },
          { field: { Name: "allergies_c" } },
          { field: { Name: "emergency_contact_c" } },
          { field: { Name: "insurance_provider_c" } },
          { field: { Name: "insurance_number_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "medical_history_c" } },
          { field: { Name: "admission_date_c" } },
          { field: { Name: "department_id_c" } },
          { field: { Name: "assigned_doctor_id_c" } }
        ]
      };

      const response = await apperClient.getRecordById("patient_c", parseInt(id), params);

      if (!response.success) {
        console.error(response.message);
        return null;
      }

      return response.data || null;
    } catch (error) {
      console.error(`Error fetching patient ${id}:`, error?.message || error);
      return null;
    }
  },

  async create(patientData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const record = {
        Name: `${patientData.first_name_c} ${patientData.last_name_c}`,
        first_name_c: patientData.first_name_c,
        last_name_c: patientData.last_name_c,
        date_of_birth_c: patientData.date_of_birth_c,
        gender_c: patientData.gender_c,
        phone_c: patientData.phone_c,
        email_c: patientData.email_c,
        address_c: patientData.address_c,
        blood_group_c: patientData.blood_group_c,
        status_c: patientData.status_c,
        admission_date_c: patientData.admission_date_c
      };

      if (patientData.allergies_c) record.allergies_c = patientData.allergies_c;
      if (patientData.emergency_contact_c) record.emergency_contact_c = patientData.emergency_contact_c;
      if (patientData.insurance_provider_c) record.insurance_provider_c = patientData.insurance_provider_c;
      if (patientData.insurance_number_c) record.insurance_number_c = patientData.insurance_number_c;
      if (patientData.medical_history_c) record.medical_history_c = patientData.medical_history_c;
      if (patientData.department_id_c) record.department_id_c = parseInt(patientData.department_id_c);
      if (patientData.assigned_doctor_id_c) record.assigned_doctor_id_c = parseInt(patientData.assigned_doctor_id_c);

      const params = { records: [record] };
      const response = await apperClient.createRecord("patient_c", params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success);
        if (failed.length > 0) {
          console.error(`Failed to create patient:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
          return null;
        }
        return response.results[0]?.data || null;
      }
    } catch (error) {
      console.error("Error creating patient:", error?.message || error);
      return null;
    }
  },

  async update(id, patientData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const record = { Id: parseInt(id) };

      if (patientData.first_name_c && patientData.last_name_c) {
        record.Name = `${patientData.first_name_c} ${patientData.last_name_c}`;
      }
      if (patientData.first_name_c) record.first_name_c = patientData.first_name_c;
      if (patientData.last_name_c) record.last_name_c = patientData.last_name_c;
      if (patientData.date_of_birth_c) record.date_of_birth_c = patientData.date_of_birth_c;
      if (patientData.gender_c) record.gender_c = patientData.gender_c;
      if (patientData.phone_c) record.phone_c = patientData.phone_c;
      if (patientData.email_c) record.email_c = patientData.email_c;
      if (patientData.address_c) record.address_c = patientData.address_c;
      if (patientData.blood_group_c) record.blood_group_c = patientData.blood_group_c;
      if (patientData.allergies_c !== undefined) record.allergies_c = patientData.allergies_c;
      if (patientData.emergency_contact_c) record.emergency_contact_c = patientData.emergency_contact_c;
      if (patientData.insurance_provider_c) record.insurance_provider_c = patientData.insurance_provider_c;
      if (patientData.insurance_number_c) record.insurance_number_c = patientData.insurance_number_c;
      if (patientData.status_c) record.status_c = patientData.status_c;
      if (patientData.medical_history_c !== undefined) record.medical_history_c = patientData.medical_history_c;
      if (patientData.admission_date_c) record.admission_date_c = patientData.admission_date_c;
      if (patientData.department_id_c) record.department_id_c = parseInt(patientData.department_id_c);
      if (patientData.assigned_doctor_id_c) record.assigned_doctor_id_c = parseInt(patientData.assigned_doctor_id_c);

      const params = { records: [record] };
      const response = await apperClient.updateRecord("patient_c", params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success);
        if (failed.length > 0) {
          console.error(`Failed to update patient:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
          return null;
        }
        return response.results[0]?.data || null;
      }
    } catch (error) {
      console.error("Error updating patient:", error?.message || error);
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
      const response = await apperClient.deleteRecord("patient_c", params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success);
        if (failed.length > 0) {
          console.error(`Failed to delete patient:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
          return false;
        }
        return true;
      }
    } catch (error) {
      console.error("Error deleting patient:", error?.message || error);
      return false;
    }
  },

  async searchPatients(query) {
    try {
      const allPatients = await this.getAll();
      const lowerQuery = query.toLowerCase();
      return allPatients.filter(p => 
        `${p.first_name_c} ${p.last_name_c}`.toLowerCase().includes(lowerQuery) ||
        p.email_c?.toLowerCase().includes(lowerQuery) ||
        p.phone_c?.includes(query)
      );
    } catch (error) {
      console.error("Error searching patients:", error?.message || error);
      return [];
    }
  },

  async getByStatus(status) {
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
          { field: { Name: "first_name_c" } },
          { field: { Name: "last_name_c" } },
          { field: { Name: "status_c" } }
        ],
        where: [
          { FieldName: "status_c", Operator: "EqualTo", Values: [status] }
        ]
      };

      const response = await apperClient.fetchRecords("patient_c", params);

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching patients by status:", error?.message || error);
      return [];
    }
  }
};

export default patientService;