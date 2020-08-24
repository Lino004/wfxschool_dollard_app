import Vue from 'vue'
import Buefy from 'buefy'
import VAnimateCss from 'v-animate-css'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/scss/app.scss'
import 'vue2-animate/dist/vue2-animate.min.css'

Vue.use(Buefy)
Vue.use(VAnimateCss)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
