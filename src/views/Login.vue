<template>
  <div class="bg_degraded">
    <section class="hero is-fullheight">
      <div class="hero-body align_items_none">
        <div class="container">
          <figure class="pb-5">
            <img
            src="@/assets/imgs/logo_white.png"
            class="image is-width-160 mx_auto"/>
          </figure>
          <p class="title has-text-centered has-text-white is-size-5-mobile">
            Connexion
          </p>
          <div class="box width-600 mx_auto">
            <MsgError :msgs="msgs" v-if="showMsgsError" @close="msgsErrorClose"/>
            <section>
              <b-field label="Adresse email" :type="champs.erremail ? 'is-danger' : ''">
                <b-input
                  type="email"
                  placeholder="exemple@test.com"
                  v-model.trim="champs.email"
                  @keypress.enter="login"/>
              </b-field>

              <b-field label="Mot de passe"  :type="champs.errpassword ? 'is-danger' : ''">
                <b-input
                  type="password"
                  placeholder="Votre mot de passe"
                  v-model="champs.password"
                  @keypress.enter="login"/>
              </b-field>
            </section>
            <b-button
              type="is-primary"
              expanded
              class="my-5"
              @click="login">
              <span class="has-text-weight-bold">
                Se connecter
              </span>
            </b-button>
            <div class="has-text-centered">
              <a class="is-block has-text-secondary" @click="$router.push({ name: 'ResetPassword' })">
                Mot de passe oublié?
              </a>
              <a class="is-block has-text-secondary" @click="$router.push({ name: 'Register' })">
                Inscription
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import MsgError from '@/components/general/MsgError.vue'

export default {
  components: {
    MsgError
  },
  data: () => ({
    champs: {
      email: '',
      password: '',
      erremail: '',
      errpassword: ''
    },
    msgs: [],
    showMsgsError: false
  }),
  methods: {
    ...mapActions({
      actionLogin: 'login'
    }),
    msgsErrorClose () {
      this.msgs = []
      this.showMsgsError = false
      this.champs.erremail = false
      this.champs.errpassword = false
    },
    validation () {
      let isValid = true
      if (!this.champs.email) {
        this.msgs.push('Le champs <b>Adresse email</b> est obligatoire')
        isValid = false
        this.champs.erremail = true
      }
      if (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.champs.email))) {
        this.msgs.push('L\'<b>Adresse email</b> entrée est invalide')
        isValid = false
        this.champs.erremail = true
      }
      if (!this.champs.password) {
        this.msgs.push('Le champs <b>Mot de passe</b> est obligatoire')
        isValid = false
        this.champs.errpassword = true
      }
      return isValid
    },
    async login () {
      const loadingComponent = this.$buefy.loading.open({ container: null })
      try {
        if (!this.validation()) {
          this.showMsgsError = true
          loadingComponent.close()
          return
        }
        await this.actionLogin({
          login: this.champs.email.toLowerCase(),
          password: this.champs.password
        })
        this.$buefy.toast.open({
          message: 'Connexion réussi',
          type: 'is-success'
        })
        this.champs.email = ''
        this.champs.password = ''
        this.$router.push({ name: 'VenteDollar' })
        loadingComponent.close()
      } catch (error) {
        if (error.response) {
          this.msgs.push(error.response.data.error)
          this.showMsgsError = true
        }
        loadingComponent.close()
      }
    }
  }
}
</script>
