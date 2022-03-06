import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import firebaseService from '@/services/firebase-service';

Vue.use(Vuex);

/* eslint-disable no-new */
const store = new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
  },
  strict: true, // turn off in Production
  state: {
    isLoading: false,
    error: null,
    households: [],
  },
  mutations: {
    setLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
    setError(state, error) {
      state.error = error;
    },
    setHouseholds(state, households) {
      state.households = households;
    }
  },
  actions: {
    getHouseholds({ commit }) {
      commit('setLoading', true);
      firebaseService.getHouseholds()
        .then((result) => commit('setHouseholds', result.data.data))
        .catch((error) => commit('setError', error))
        .finally(() => commit('setLoading', false));
    }
  },
  getters: {
    attendees: state => {
      return state.households
        ? state.households.reduce((prev, curr) => {
          return prev.concat(curr.attendees.map((attendee) => {
            const {hasViewed, hashWord, isAttending } = curr;
            const address = `${curr.address}, ${curr.city} ${curr.province} ${curr.country}`;
            return {...attendee, hasViewed, hashWord, isAttending, address };
          }));
        }, [])
        : [];
    },
    attendeesChildren: (state, getters) => {
      return getters.attendees.filter((attendee) => attendee.isChild);
    },
    attendeesAttending: (state, getters) => {
      return getters.attendees.filter((attendee) => attendee.isAttending);
    },
    attendeesViewed: (state, getters) => {
      return getters.attendees.filter((attendee) => attendee.hasViewed);
    },
  }
});

export default store;
