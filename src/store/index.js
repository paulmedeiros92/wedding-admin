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
    guestLength: state => {
      return state.households.length;
    },
    guestsAttending: state => {
      return state.households.filter((guest) => guest.isAttending).length;
    },
    guestsChild: state => {
      return state.households.filter((guest) => guest.isChild).length;
    },
    guestsViewed: state => {
      return state.households.filter((guest) => guest.hasViewed).length;
    }
  }
});

export default store;
