import prescriptionsData from "../mockData/prescriptions.json";

let prescriptions = [...prescriptionsData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const prescriptionService = {
  async getAll() {
    await delay(300);
    return prescriptions.map(p => ({ ...p }));
  },

  async getById(id) {
    await delay(300);
    const prescription = prescriptions.find(p => p.Id === parseInt(id));
    return prescription ? { ...prescription } : null;
  },

  async getByPatientId(patientId) {
    await delay(300);
    return prescriptions
      .filter(p => p.patientId === parseInt(patientId))
      .map(p => ({ ...p }));
  },

  async create(prescriptionData) {
    await delay(400);
    const maxId = Math.max(...prescriptions.map(p => p.Id), 0);
    const newPrescription = {
      ...prescriptionData,
      Id: maxId + 1,
      createdAt: new Date().toISOString()
    };
    prescriptions.push(newPrescription);
    return { ...newPrescription };
  },

  async update(id, prescriptionData) {
    await delay(400);
    const index = prescriptions.findIndex(p => p.Id === parseInt(id));
    if (index !== -1) {
      prescriptions[index] = { ...prescriptions[index], ...prescriptionData };
      return { ...prescriptions[index] };
    }
    return null;
  },

  async delete(id) {
    await delay(400);
    const index = prescriptions.findIndex(p => p.Id === parseInt(id));
    if (index !== -1) {
      prescriptions.splice(index, 1);
      return true;
    }
    return false;
  }
};

export default prescriptionService;