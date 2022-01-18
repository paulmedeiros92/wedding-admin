import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import firebaseService from '@/services/firebase-service';

Vue.use(Vuex)

/* eslint-disable no-new */
const store = new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
  },
  strict: true, // turn off in Production
  state: {
    isLoading: false,
    error: null,
    guestList: [],
  },
  mutations: {
    setLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
    setError(state, error) {
      state.error = error;
    },
    setGuestList(state, guestList) {
      state.guestList = guestList;
    }
  },
  actions: {
    getGuestList({ commit }) {
      commit('setLoading', true);
      firebaseService.getGuestList()
        .then((result) => commit('setGuestList', result.data.data))
        .catch((error) => commit('setError', error))
        .finally(() => commit('setLoading', false));
    }
  }
})

export default store
