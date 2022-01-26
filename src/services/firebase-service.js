import axios from "axios";

export default {
  getGuestList() {
    return axios.get('https://us-central1-wedding-63917.cloudfunctions.net/app/api/guests');
  },

};