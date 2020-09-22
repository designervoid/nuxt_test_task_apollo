const state = () => ({
  userDetails: {
    name: "",
    lastName: "",
  },
  editable: false
})

const getters = {}

const actions = {}

const mutations = {
  SET_USER_DETAILS(state, payload) {
    state.userDetails = payload
  },
  SET_EDITABLE_STATE(state, payload) {
    state.editable = payload
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
