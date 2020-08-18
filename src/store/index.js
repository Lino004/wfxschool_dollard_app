import Vue from 'vue'
import Vuex from 'vuex'
import {
  // get,
  login,
  create
  // getSouscript,
} from '@/api/auth/index'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {}
  },
  mutations: {
    SET_USER (state, val) {
      state.user = val
    }
  },
  actions: {
    async login ({ commit }, infoUser) {
      const data = (await login(infoUser)).data
      commit('SET_USER', data)
    },
    async register (infoUser) {
      await create(infoUser)
    }
  },
  modules: {
  },
  plugins: [
    createPersistedState({
      paths: ['user']
    })
  ]
})
