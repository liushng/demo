const state = {
  sync: 1
}
const mutations = {
  setSync(state, paylod) {
    state.sync += paylod
  }
}
const actions = {}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}