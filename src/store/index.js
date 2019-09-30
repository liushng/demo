import createPersistedState from 'vuex-persistedstate'
import {
  vuexLsPersistent
} from "../util/publicMethods"
export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  plugins: [createPersistedState({
    paths: ['userInfo.userInfo']
  }), vuexLsPersistent]
})