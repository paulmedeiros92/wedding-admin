import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import firebaseService from "@/services/firebase-service";

Vue.use(Vuex);

/* eslint-disable no-new */
const store = new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {},
  strict: true, // turn off in Production
  state: {
    isLoading: false,
    error: null,
    attendees: [],
  },
  mutations: {
    setLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
    setError(state, error) {
      state.error = error;
    },
    setAttendees(state, attendees) {
      state.attendees = attendees;
    },
  },
  actions: {
    async getAttendees({ commit }) {
      commit("setLoading", true);
      try {
        const result = await firebaseService.getAttendees();
        commit("setAttendees", result.data.data);
      } catch (error) {
        commit("setError", error);
      } finally {
        commit("setLoading", false);
      }
    },
  },
  getters: {
    attendeesChildren: (state) => {
      return state.attendees.filter((attendee) => attendee.isChild);
    },
    attendeesAttending: (state) => {
      return state.attendees.filter((attendee) => attendee.isAttending);
    },
    attendeesViewed: (state) => {
      return state.attendees.filter((attendee) => attendee.hasViewed);
    },
  },
});

export default store;
