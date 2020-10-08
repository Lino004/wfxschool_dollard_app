import Vue from 'vue'
import Buefy from 'buefy'
import VAnimateCss from 'v-animate-css'
import VueClipboard from 'vue-clipboard2'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/scss/app.scss'
import 'vue2-animate/dist/vue2-animate.min.css'

VueClipboard.config.autoSetContainer = true

Vue.use(Buefy)
Vue.use(VAnimateCss)
Vue.use(VueClipboard)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
