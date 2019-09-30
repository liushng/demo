import createPersistedState from 'vuex-persistedstate';
import asyncPersistedState from "./asyncPersistedState/";
import syncPersistedState from "./syncPersistedState/";
import {
  vuexLsPersistent
} from "../util/publicMethods"
export default new Vuex.Store({
  modules: {
    asyncPersistedState,
    syncPersistedState
  },
  plugins: [vuexLsPersistent({
    paths: ['asyncPersistedState'],
    keyName: "vuexAsync"
  }), createPersistedState({
    paths: ['syncPersistedState']
  }), ]
})