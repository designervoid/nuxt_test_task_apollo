import http from "@/helpers/http"
import { SET_USER_DETAILS, SET_EDITABLE_STATE } from "./mutation-types"

const state = () => ({
  userDetails: {
    name: "",
    lastName: "",
  },
  editable: false,
})

const getters = {}

const actions = {
  getUserDetails({ commit }) {
    // по какой-то причине с моканной базы прилетает { __ob__: Observer }, здесь надо обрабатывать такую конструкцию spread оператором, чтобы все работало
    let response = http.get("/api/user")
    commit(SET_USER_DETAILS, { ...response })
  },
  saveUserDetails({ commit }, payload) {
    http.post("/api/user", payload)
    commit(SET_USER_DETAILS, payload)
  },
}

const mutations = {
  [SET_USER_DETAILS](state, payload) {
    state.userDetails = payload
  },
  [SET_EDITABLE_STATE](state, payload) {
    state.editable = payload
  },
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
