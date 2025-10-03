import { toast } from "react-toastify";

const departmentService = {
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
          { field: { Name: "name_c" } },
          { field: { Name: "total_beds_c" } },
          { field: { Name: "occupied_beds_c" } },
          { field: { Name: "head_doctor_id_c" } }
        ]
      };

      const response = await apperClient.fetchRecords("department_c", params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching departments:", error?.message || error);
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
          { field: { Name: "name_c" } },
          { field: { Name: "total_beds_c" } },
          { field: { Name: "occupied_beds_c" } },
          { field: { Name: "head_doctor_id_c" } }
        ]
      };

      const response = await apperClient.getRecordById("department_c", parseInt(id), params);

      if (!response.success) {
        console.error(response.message);
        return null;
      }

      return response.data || null;
    } catch (error) {
      console.error(`Error fetching department ${id}:`, error?.message || error);
      return null;
    }
  },

  async create(departmentData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const record = {
        Name: departmentData.name_c,
        name_c: departmentData.name_c,
        total_beds_c: parseInt(departmentData.total_beds_c),
        occupied_beds_c: parseInt(departmentData.occupied_beds_c || 0)
      };

      if (departmentData.head_doctor_id_c) {
        record.head_doctor_id_c = parseInt(departmentData.head_doctor_id_c);
      }

      const params = { records: [record] };
      const response = await apperClient.createRecord("department_c", params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success);
        if (failed.length > 0) {
          console.error(`Failed to create department:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
          return null;
        }
        return response.results[0]?.data || null;
      }
    } catch (error) {
      console.error("Error creating department:", error?.message || error);
      return null;
    }
  },

  async update(id, departmentData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const record = { Id: parseInt(id) };

      if (departmentData.name_c) record.name_c = departmentData.name_c;
      if (departmentData.total_beds_c !== undefined) record.total_beds_c = parseInt(departmentData.total_beds_c);
      if (departmentData.occupied_beds_c !== undefined) record.occupied_beds_c = parseInt(departmentData.occupied_beds_c);
      if (departmentData.head_doctor_id_c) record.head_doctor_id_c = parseInt(departmentData.head_doctor_id_c);

      const params = { records: [record] };
      const response = await apperClient.updateRecord("department_c", params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success);
        if (failed.length > 0) {
          console.error(`Failed to update department:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
          return null;
        }
        return response.results[0]?.data || null;
      }
    } catch (error) {
      console.error("Error updating department:", error?.message || error);
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
      const response = await apperClient.deleteRecord("department_c", params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success);
        if (failed.length > 0) {
          console.error(`Failed to delete department:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
          return false;
        }
        return true;
      }
    } catch (error) {
      console.error("Error deleting department:", error?.message || error);
      return false;
    }
  }
};

export default departmentService;