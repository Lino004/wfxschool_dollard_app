import Vue from 'vue'
import Vuex from 'vuex'
import {
  // get,
  login,
  logout,
  update,
  create,
  createByParraine
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
    async logout ({ commit, state }) {
      await logout(state.user.identifiant)
      commit('SET_USER', null)
    },
    async login ({ commit }, infoUser) {
      const data = (await login(infoUser)).data
      commit('SET_USER', data)
    },
    async register (context, payload) {
      if (payload.route.name === 'RegisterParrainage') {
        await createByParraine(payload.route.params.id, payload.infoUser)
        return
      }
      await create(payload.infoUser)
    },
    async update ({ commit }, payload) {
      const data = (await update(payload)).data
      commit('SET_USER', data)
    }
  },
  getters: {
    isConnect: (state) => state.user !== null && state.user.nom !== undefined
  },
  modules: {
  },
  plugins: [
    createPersistedState({
      key: process.env.NODE_ENV === 'production' ? 'wfx_dollars' : 'wfx_dollars_dev',
      paths: ['user']
    })
  ]
})
