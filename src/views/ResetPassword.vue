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
            Mot de passe oublié
          </p>
          <div class="box width-600 mx_auto">
            <MsgError :msgs="msgs" v-if="showMsgsError" @close="msgsErrorClose"/>
            <div class="content mb-2">
              Vous avez oublié votre mot de passe. Veillez remplir le formulaire qui suit:
            </div>
            <section  class="columns is-multiline">
              <!-- Adresse email -->
              <div class="column is-12">
                <b-field :type="champs.erremail ? 'is-danger' : ''">
                  <template slot="label">
                    <p> Adresse email <span class="has-text-danger is-size-7"> (*) </span> </p>
                  </template>
                  <b-input
                    type="email"
                    placeholder="Ex: exemple@test.com"
                    v-model.trim="champs.email"/>
                </b-field>
              </div>
              <!-- Mot de passe -->
              <div class="column is-12" v-if="$route.name === 'ResetPasswordConfirme'">
                <b-field :type="champs.errpassword ? 'is-danger' : ''">
                  <template slot="label">
                    <p> Mot de passe <span class="has-text-danger is-size-7"> (*) </span> </p>
                  </template>
                  <b-input
                    type="password"
                    placeholder="Mot de passe"
                    v-model.trim="champs.password"/>
                </b-field>
              </div>
              <!-- Confirmer le mot de passe -->
              <div class="column is-12" v-if="$route.name === 'ResetPasswordConfirme'">
                <b-field :type="champs.errconfPassword ? 'is-danger' : ''">
                  <template slot="label">
                    <p> Confirmer le mot de passe <span class="has-text-danger is-size-7"> (*) </span> </p>
                  </template>
                  <b-input
                    type="password"
                    placeholder="Mot de passe"
                    v-model.trim="champs.confPassword"/>
                </b-field>
              </div>
            </section>
            <b-button
              type="is-primary"
              expanded
              class="my-5"
              @click="resetPassword">
              <span class="has-text-weight-bold">
                {{ $route.name === 'ResetPasswordConfirme' ? 'Modifier le mot de passe' : 'Envoyer'}}
              </span>
            </b-button>
            <MenuBox/>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import MsgError from '@/components/general/MsgError.vue'
import MenuBox from '@/components/general/MenuBox.vue'
import { initResetPassword, resetPassword } from '@/api/auth/index'

export default {
  components: {
    MsgError,
    MenuBox
  },
  data: () => ({
    champs: {
      email: '',
      password: '',
      confPassword: '',
      erremail: '',
      errpassword: '',
      errconfPassword: ''
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
      this.champs.errconfPassword = false
    },
    validation () {
      let isValid = true
      if (!this.champs.email) {
        this.msgs.push('Le champs <b>Adresse email</b> n\'a pas été rempli')
        isValid = false
        this.champs.erremail = true
      }
      if (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.champs.email))) {
        this.msgs.push('L\'<b>Adresse email</b> entrée est invalide')
        isValid = false
        this.champs.erremail = true
      }

      if (this.$route.name !== 'ResetPasswordConfirme') return isValid

      if (!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(this.champs.password))) {
        this.msgs.push(`Le <b>Mot de passe</b> entrée est doit
                          contenir de 8 à 15 caractères,
                          au moins une lettre minuscule,
                          au moins une lettre majuscule,
                          au moins un chiffre numérique
                          et au moins un caractère spécial.`)
        isValid = false
        this.champs.errpassword = true
      }
      if (!this.champs.confPassword) {
        this.msgs.push('Le <b>Mots de passes</b> de confirmation n\'a pas été saisie')
        isValid = false
        this.champs.errconfPassword = true
      }
      if (!(this.champs.password === this.champs.confPassword)) {
        this.msgs.push('Les <b>Mots de passes</b> ne sont pas identique')
        isValid = false
        this.champs.errconfPassword = true
      }
      return isValid
    },
    async resetPassword () {
      const loadingComponent = this.$buefy.loading.open({ container: null })
      try {
        if (!this.validation()) {
          this.showMsgsError = true
          loadingComponent.close()
          return
        }
        if (this.$route.name === 'ResetPasswordConfirme') {
          await this.reset()
          loadingComponent.close()
          return
        }
        await this.initReset()
        loadingComponent.close()
      } catch (error) {
        if (error.response) {
          this.msgs.push(error.response.data.error)
          this.showMsgsError = true
        }
        loadingComponent.close()
      }
    },
    async initReset () {
      await initResetPassword({
        email: this.champs.email.toLowerCase()
      })
      this.$buefy.toast.open({
        message: 'Votre demande a été pris en compte avec success. Vérifier votre boîte mail',
        type: 'is-success',
        duration: 5000
      })
    },
    async reset () {
      const { pass, id } = this.$route.params
      const data = {
        password: this.champs.password,
        identifiant_url: pass,
        identifiant: id
      }
      await resetPassword(data)
      this.$buefy.toast.open({
        message: 'Votre mot de passe a été réinitialisé avec sucesse',
        type: 'is-success',
        duration: 5000
      })
      this.champs.email = ''
      this.champs.password = ''
      this.champs.confPassword = ''
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>
