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
              <form action="https://perfectmoney.com/api/step1.asp" method="POST">
                <input type="hidden" name="PAYEE_ACCOUNT" value="U18956870">
                <input type="hidden" name="PAYEE_NAME" value="WEXCHANGE">
                <input type="hidden" name="PAYMENT_ID" value="CHQNGE">
                <input type="text" name="PAYMENT_AMOUNT" value="">
                <input type="hidden" name="PAYMENT_UNITS" value="USD">
                <input type="hidden" name="STATUS_URL" value="mailto:h.ayinlamouhayad@gmail.com">
                <input type="hidden" name="PAYMENT_URL" value="localhost:8080/test">
                <input type="hidden" name="PAYMENT_URL_METHOD" value="POST">
                <input type="hidden" name="NOPAYMENT_URL" value="localhost:8080/nottest">
                <input type="hidden" name="NOPAYMENT_URL_METHOD" value="POST">
                <input type="hidden" name="SUGGESTED_MEMO" value="">
                <input type="hidden" name="type" value="pm">
                <input type="hidden" name="BAGGAGE_FIELDS" value="type">
                <input type="submit" name="PAYMENT_METHOD" value="Pay Now!">
              </form>
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

      <div class="hero-foot">
        <AppFooter />
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import MsgError from '@/components/general/MsgError.vue'
import Footer from '@/components/general/Footer.vue'

export default {
  components: {
    MsgError,
    AppFooter: Footer
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
    },
    keyPress (e) {
      if (e.key === 'Enter') this.login()
    }
  }
}
</script>
