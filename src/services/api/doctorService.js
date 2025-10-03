import doctorsData from "../mockData/doctors.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let doctors = [...doctorsData];

const doctorService = {
  async getAll() {
    await delay(300);
    return doctors.map(d => ({ ...d }));
  },

  async getById(id) {
    await delay(200);
    const doctor = doctors.find(d => d.Id === parseInt(id));
    return doctor ? { ...doctor } : null;
  },

  async create(doctorData) {
    await delay(400);
    const maxId = Math.max(...doctors.map(d => d.Id), 0);
    const newDoctor = {
      ...doctorData,
      Id: maxId + 1
    };
    doctors.push(newDoctor);
    return { ...newDoctor };
  },

  async update(id, doctorData) {
    await delay(400);
    const index = doctors.findIndex(d => d.Id === parseInt(id));
    if (index !== -1) {
      doctors[index] = { ...doctors[index], ...doctorData };
      return { ...doctors[index] };
    }
    return null;
  },

  async delete(id) {
    await delay(300);
    const index = doctors.findIndex(d => d.Id === parseInt(id));
    if (index !== -1) {
      doctors.splice(index, 1);
      return true;
    }
    return false;
  },

  async getBySpecialization(specialization) {
    await delay(250);
    return doctors.filter(d => d.specialization === specialization).map(d => ({ ...d }));
  },

  async getAvailable() {
    await delay(250);
    return doctors.filter(d => d.availability === "available").map(d => ({ ...d }));
  }
};

export default doctorService;