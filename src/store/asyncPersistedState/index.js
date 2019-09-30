const state = {
  async: 1
}
const mutations = {
  setAsync(state, paylod) {
    state.async += paylod
  }
}
const actions = {}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}