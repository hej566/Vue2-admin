export default {
  namespaced: true,
  state: {
    property: null
  },

  getters: {
    property: state => {
      return state.property;
    }
  },

  mutations: {
    SET(state, val) {
      state.property = val;
    }
  },

  actions: {
    set({ commit }, val) {
      commit('SET', val);
    }
  }
};
