import http from "@/helpers/http"
import { SET_COUNTRY_DETAILS, SET_EDITABLE_STATE } from "./mutation-types"

const state = () => ({
  countryDetails: {
    country: "",
  },
  editable: false,
})

const getters = {}

const actions = {
  getCountryDetails({ commit }) {
    let response = http.get("/api/country")
    commit(SET_COUNTRY_DETAILS, response)
  },
  saveCountryDetails({ commit }, payload) {
    http.post("/api/country", payload)
    commit(SET_COUNTRY_DETAILS, payload)
  },
}

const mutations = {
  [SET_COUNTRY_DETAILS](state, payload) {
    state.countryDetails = payload
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
