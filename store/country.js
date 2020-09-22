const state = () => ({
  countryDetails: {
    country: ''
  },
  editable: false
})

const getters = {}

const actions = {}

const mutations = {
  SET_COUNTRY_DETAILS(state, payload) {
    state.countryDetails = payload
  },
  SET_EDITABLE_STATE(state, payload) {
    state.editable = payload;
  }
}

const modules = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules,
}
