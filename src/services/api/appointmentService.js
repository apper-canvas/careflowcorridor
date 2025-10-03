import appointmentsData from "../mockData/appointments.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let appointments = [...appointmentsData];

const appointmentService = {
  async getAll() {
    await delay(300);
    return appointments.map(a => ({ ...a }));
  },

  async getById(id) {
    await delay(200);
    const appointment = appointments.find(a => a.Id === parseInt(id));
    return appointment ? { ...appointment } : null;
  },

  async create(appointmentData) {
    await delay(400);
    const maxId = Math.max(...appointments.map(a => a.Id), 0);
    const newAppointment = {
      ...appointmentData,
      Id: maxId + 1,
      createdAt: new Date().toISOString()
    };
    appointments.push(newAppointment);
    return { ...newAppointment };
  },

  async update(id, appointmentData) {
    await delay(400);
    const index = appointments.findIndex(a => a.Id === parseInt(id));
    if (index !== -1) {
      appointments[index] = { ...appointments[index], ...appointmentData };
      return { ...appointments[index] };
    }
    return null;
  },

  async delete(id) {
    await delay(300);
    const index = appointments.findIndex(a => a.Id === parseInt(id));
    if (index !== -1) {
      appointments.splice(index, 1);
      return true;
    }
    return false;
  },

  async getByPatient(patientId) {
    await delay(250);
    return appointments.filter(a => a.patientId === patientId).map(a => ({ ...a }));
  },

  async getByDoctor(doctorId) {
    await delay(250);
    return appointments.filter(a => a.doctorId === doctorId).map(a => ({ ...a }));
  },

  async getByDate(date) {
    await delay(250);
    return appointments.filter(a => a.date === date).map(a => ({ ...a }));
  },

  async getByStatus(status) {
    await delay(250);
    return appointments.filter(a => a.status === status).map(a => ({ ...a }));
  },

  async getTodayAppointments() {
    await delay(300);
    const today = new Date().toISOString().split("T")[0];
    return appointments.filter(a => a.date === today).map(a => ({ ...a }));
  }
};

export default appointmentService;