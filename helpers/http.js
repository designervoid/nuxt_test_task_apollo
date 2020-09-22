import mock from "./database"

const http = {
  get(url) {
    return mock[url]
  },
  post(url, payload) {
    mock[url] = payload
  },
}

export default http
