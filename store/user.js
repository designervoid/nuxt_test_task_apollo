const state = () => ({
    userDetails: {
      name: '',
      lastName: ''
    }
});

const getters = {};

const actions = {};

const mutations = {
  SET_USER_DETAILS(state, payload) {
    state.userDetails = payload
  },
};

const modules = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules,
};