import { toast } from "react-toastify";

const appointmentService = {
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
          { field: { Name: "doctor_id_c" } },
          { field: { Name: "date_c" } },
          { field: { Name: "time_c" } },
          { field: { Name: "duration_c" } },
          { field: { Name: "type_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "notes_c" } }
        ]
      };

      const response = await apperClient.fetchRecords("appointment_c", params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching appointments:", error?.message || error);
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
          { field: { Name: "doctor_id_c" } },
          { field: { Name: "date_c" } },
          { field: { Name: "time_c" } },
          { field: { Name: "duration_c" } },
          { field: { Name: "type_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "notes_c" } }
        ]
      };

      const response = await apperClient.getRecordById("appointment_c", parseInt(id), params);

      if (!response.success) {
        console.error(response.message);
        return null;
      }

      return response.data || null;
    } catch (error) {
      console.error(`Error fetching appointment ${id}:`, error?.message || error);
      return null;
    }
  },

  async create(appointmentData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const record = {
        Name: `Appointment - ${appointmentData.date_c}`,
        patient_id_c: parseInt(appointmentData.patient_id_c),
        doctor_id_c: parseInt(appointmentData.doctor_id_c),
        date_c: appointmentData.date_c,
        time_c: appointmentData.time_c,
        duration_c: parseInt(appointmentData.duration_c),
        type_c: appointmentData.type_c,
        status_c: appointmentData.status_c
      };

      if (appointmentData.notes_c) record.notes_c = appointmentData.notes_c;

      const params = { records: [record] };
      const response = await apperClient.createRecord("appointment_c", params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success);
        if (failed.length > 0) {
          console.error(`Failed to create appointment:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
          return null;
        }
        return response.results[0]?.data || null;
      }
    } catch (error) {
      console.error("Error creating appointment:", error?.message || error);
      return null;
    }
  },

  async update(id, appointmentData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const record = { Id: parseInt(id) };

      if (appointmentData.patient_id_c) record.patient_id_c = parseInt(appointmentData.patient_id_c);
      if (appointmentData.doctor_id_c) record.doctor_id_c = parseInt(appointmentData.doctor_id_c);
      if (appointmentData.date_c) record.date_c = appointmentData.date_c;
      if (appointmentData.time_c) record.time_c = appointmentData.time_c;
      if (appointmentData.duration_c) record.duration_c = parseInt(appointmentData.duration_c);
      if (appointmentData.type_c) record.type_c = appointmentData.type_c;
      if (appointmentData.status_c) record.status_c = appointmentData.status_c;
      if (appointmentData.notes_c !== undefined) record.notes_c = appointmentData.notes_c;

      const params = { records: [record] };
      const response = await apperClient.updateRecord("appointment_c", params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success);
        if (failed.length > 0) {
          console.error(`Failed to update appointment:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
          return null;
        }
        return response.results[0]?.data || null;
      }
    } catch (error) {
      console.error("Error updating appointment:", error?.message || error);
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
      const response = await apperClient.deleteRecord("appointment_c", params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success);
        if (failed.length > 0) {
          console.error(`Failed to delete appointment:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
          return false;
        }
        return true;
      }
    } catch (error) {
      console.error("Error deleting appointment:", error?.message || error);
      return false;
    }
  },

  async getByPatient(patientId) {
    try {
      const allAppointments = await this.getAll();
      return allAppointments.filter(a => a.patient_id_c?.Id === parseInt(patientId));
    } catch (error) {
      console.error("Error fetching appointments by patient:", error?.message || error);
      return [];
    }
  },

  async getByDoctor(doctorId) {
    try {
      const allAppointments = await this.getAll();
      return allAppointments.filter(a => a.doctor_id_c?.Id === parseInt(doctorId));
    } catch (error) {
      console.error("Error fetching appointments by doctor:", error?.message || error);
      return [];
    }
  },

  async getByDate(date) {
    try {
      const allAppointments = await this.getAll();
      return allAppointments.filter(a => a.date_c === date);
    } catch (error) {
      console.error("Error fetching appointments by date:", error?.message || error);
      return [];
    }
  },

  async getByStatus(status) {
    try {
      const allAppointments = await this.getAll();
      return allAppointments.filter(a => a.status_c === status);
    } catch (error) {
      console.error("Error fetching appointments by status:", error?.message || error);
      return [];
    }
  },

  async getTodayAppointments() {
    try {
      const today = new Date().toISOString().split("T")[0];
      return await this.getByDate(today);
    } catch (error) {
      console.error("Error fetching today's appointments:", error?.message || error);
      return [];
    }
  }
};

export default appointmentService;
export default appointmentService;