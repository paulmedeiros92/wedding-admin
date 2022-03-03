import axios from "axios";

// const baseURL = 'https://us-central1-wedding-63917.cloudfunctions.net';
const baseURL = 'http://localhost:5001/wedding-63917/us-central1';

export default {
  getHouseholds() {
    return axios.get(`${baseURL}/app/api/households`);
  },
  setHousehold(households) {
    return axios.post(`${baseURL}/app/api/households`, households);
  }

};