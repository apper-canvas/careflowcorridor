import departmentsData from "../mockData/departments.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let departments = [...departmentsData];

const departmentService = {
  async getAll() {
    await delay(300);
    return departments.map(d => ({ ...d }));
  },

  async getById(id) {
    await delay(200);
    const department = departments.find(d => d.Id === parseInt(id));
    return department ? { ...department } : null;
  },

  async create(departmentData) {
    await delay(400);
    const maxId = Math.max(...departments.map(d => d.Id), 0);
    const newDepartment = {
      ...departmentData,
      Id: maxId + 1
    };
    departments.push(newDepartment);
    return { ...newDepartment };
  },

  async update(id, departmentData) {
    await delay(400);
    const index = departments.findIndex(d => d.Id === parseInt(id));
    if (index !== -1) {
      departments[index] = { ...departments[index], ...departmentData };
      return { ...departments[index] };
    }
    return null;
  },

  async delete(id) {
    await delay(300);
    const index = departments.findIndex(d => d.Id === parseInt(id));
    if (index !== -1) {
      departments.splice(index, 1);
      return true;
    }
    return false;
  }
};

export default departmentService;