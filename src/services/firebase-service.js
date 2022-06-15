import axios from "axios";

const baseURL = "https://us-central1-wedding-63917.cloudfunctions.net";
// const baseURL = "http://localhost:5001/wedding-63917/us-central1";

export default {
  getHouseholdByMemberId(householdMemberId) {
    return axios.get(`${baseURL}/app/api/household/${householdMemberId}`);
  },
  getAttendees() {
    return axios.get(`${baseURL}/app/api/attendees`);
  },
  postAttendees(attendees) {
    return axios.post(`${baseURL}/app/api/attendees`, attendees);
  },
  deleteAttendees(attendees) {
    return axios.delete(`${baseURL}/app/api/attendees`, attendees);
  },
};
