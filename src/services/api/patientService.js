import patientsData from "../mockData/patients.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let patients = [...patientsData];

const patientService = {
  async getAll() {
    await delay(300);
    return patients.map(p => ({ ...p }));
  },

  async getById(id) {
    await delay(200);
    const patient = patients.find(p => p.Id === parseInt(id));
    return patient ? { ...patient } : null;
  },

  async create(patientData) {
    await delay(400);
    const maxId = Math.max(...patients.map(p => p.Id), 0);
    const newPatient = {
      ...patientData,
      Id: maxId + 1,
      createdAt: new Date().toISOString()
    };
    patients.push(newPatient);
    return { ...newPatient };
  },

  async update(id, patientData) {
    await delay(400);
    const index = patients.findIndex(p => p.Id === parseInt(id));
    if (index !== -1) {
      patients[index] = { ...patients[index], ...patientData };
      return { ...patients[index] };
    }
    return null;
  },

  async delete(id) {
    await delay(300);
    const index = patients.findIndex(p => p.Id === parseInt(id));
    if (index !== -1) {
      patients.splice(index, 1);
      return true;
    }
    return false;
  },

  async searchPatients(query) {
    await delay(250);
    const lowerQuery = query.toLowerCase();
    return patients.filter(p => 
      p.firstName.toLowerCase().includes(lowerQuery) ||
      p.lastName.toLowerCase().includes(lowerQuery) ||
      p.email.toLowerCase().includes(lowerQuery) ||
      p.phone.includes(query)
    ).map(p => ({ ...p }));
  },

  async getByStatus(status) {
    await delay(300);
    return patients.filter(p => p.status === status).map(p => ({ ...p }));
  }
};

export default patientService;