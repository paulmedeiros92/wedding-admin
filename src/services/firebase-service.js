import axios from "axios";

// const baseURL = 'https://us-central1-wedding-63917.cloudfunctions.net';
const baseURL = 'http://localhost:5001/wedding-63917/us-central1';

export default {
  getHouseholdByMemberId(id) {
    return axios.get(`${baseURL}/app/api/household/${id}`);
  },
  getAttendees() {
    return axios.get(`${baseURL}/app/api/attendees`);
  },
  postAttendees(attendees) {
    return axios.post(`${baseURL}/app/api/attendees`, attendees);
  },
  updateHousehold(household) {
    return axios.put(`${baseURL}/app/api/households/${household.hashWord}`, household);
  }
};