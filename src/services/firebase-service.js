import axios from "axios";

// const baseURL = 'https://us-central1-wedding-63917.cloudfunctions.net';
const baseURL = 'http://localhost:5001/wedding-63917/us-central1';

export default {
  getHouseholdById(id) {
    return axios.get(`${baseURL}/app/api/households/${id}`);
  },
  getAttendees() {
    return axios.get(`${baseURL}/app/api/attendees`);
  },
  postHouseholds(households) {
    return axios.post(`${baseURL}/app/api/households`, households);
  },
  updateHousehold(household) {
    return axios.put(`${baseURL}/app/api/households/${household.hashWord}`, household);
  }
};