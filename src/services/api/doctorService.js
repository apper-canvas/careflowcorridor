import { toast } from "react-toastify";

const doctorService = {
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
          { field: { Name: "specialization_c" } },
          { field: { Name: "phone_c" } },
          { field: { Name: "email_c" } },
          { field: { Name: "license_number_c" } },
          { field: { Name: "department_id_c" } },
          { field: { Name: "availability_c" } },
          { field: { Name: "working_hours_c" } },
          { field: { Name: "appointment_count_c" } }
        ]
      };

      const response = await apperClient.fetchRecords("doctor_c", params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching doctors:", error?.message || error);
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
          { field: { Name: "specialization_c" } },
          { field: { Name: "phone_c" } },
          { field: { Name: "email_c" } },
          { field: { Name: "license_number_c" } },
          { field: { Name: "department_id_c" } },
          { field: { Name: "availability_c" } },
          { field: { Name: "working_hours_c" } },
          { field: { Name: "appointment_count_c" } }
        ]
      };

      const response = await apperClient.getRecordById("doctor_c", parseInt(id), params);

      if (!response.success) {
        console.error(response.message);
        return null;
      }

      return response.data || null;
    } catch (error) {
      console.error(`Error fetching doctor ${id}:`, error?.message || error);
      return null;
    }
  },

  async create(doctorData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const record = {
        Name: `Dr. ${doctorData.first_name_c} ${doctorData.last_name_c}`,
        first_name_c: doctorData.first_name_c,
        last_name_c: doctorData.last_name_c,
        specialization_c: doctorData.specialization_c,
        phone_c: doctorData.phone_c,
        email_c: doctorData.email_c,
        license_number_c: doctorData.license_number_c,
        availability_c: doctorData.availability_c || "available"
      };

      if (doctorData.department_id_c) record.department_id_c = parseInt(doctorData.department_id_c);
      if (doctorData.working_hours_c) record.working_hours_c = doctorData.working_hours_c;
      if (doctorData.appointment_count_c) record.appointment_count_c = parseInt(doctorData.appointment_count_c);

      const params = { records: [record] };
      const response = await apperClient.createRecord("doctor_c", params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success);
        if (failed.length > 0) {
          console.error(`Failed to create doctor:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
          return null;
        }
        return response.results[0]?.data || null;
      }
    } catch (error) {
      console.error("Error creating doctor:", error?.message || error);
      return null;
    }
  },

  async update(id, doctorData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const record = { Id: parseInt(id) };

      if (doctorData.first_name_c) record.first_name_c = doctorData.first_name_c;
      if (doctorData.last_name_c) record.last_name_c = doctorData.last_name_c;
      if (doctorData.specialization_c) record.specialization_c = doctorData.specialization_c;
      if (doctorData.phone_c) record.phone_c = doctorData.phone_c;
      if (doctorData.email_c) record.email_c = doctorData.email_c;
      if (doctorData.license_number_c) record.license_number_c = doctorData.license_number_c;
      if (doctorData.department_id_c) record.department_id_c = parseInt(doctorData.department_id_c);
      if (doctorData.availability_c) record.availability_c = doctorData.availability_c;
      if (doctorData.working_hours_c !== undefined) record.working_hours_c = doctorData.working_hours_c;
      if (doctorData.appointment_count_c !== undefined) record.appointment_count_c = parseInt(doctorData.appointment_count_c);

      const params = { records: [record] };
      const response = await apperClient.updateRecord("doctor_c", params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success);
        if (failed.length > 0) {
          console.error(`Failed to update doctor:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
          return null;
        }
        return response.results[0]?.data || null;
      }
    } catch (error) {
      console.error("Error updating doctor:", error?.message || error);
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
      const response = await apperClient.deleteRecord("doctor_c", params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success);
        if (failed.length > 0) {
          console.error(`Failed to delete doctor:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
          return false;
        }
        return true;
      }
    } catch (error) {
      console.error("Error deleting doctor:", error?.message || error);
      return false;
    }
  },

  async getBySpecialization(specialization) {
    try {
      const allDoctors = await this.getAll();
      return allDoctors.filter(d => d.specialization_c === specialization);
    } catch (error) {
      console.error("Error fetching doctors by specialization:", error?.message || error);
      return [];
    }
  },

  async getAvailable() {
    try {
      const allDoctors = await this.getAll();
      return allDoctors.filter(d => d.availability_c === "available");
    } catch (error) {
      console.error("Error fetching available doctors:", error?.message || error);
      return [];
    }
  }
};

export default doctorService;