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
            Inscription
          </p>
          <div class="box connexion width-600 mx_auto" v-show="!isRegistered">
            <MsgError :msgs="msgs" v-if="showMsgsError" @close="msgsErrorClose"/>
            <section class="columns is-multiline" v-show="show">
              <!-- Nom -->
              <div class="column is-6">
                <b-field :type="champs.errnom ? 'is-danger' : ''">
                  <template slot="label">
                    <p> Nom <span class="has-text-danger is-size-7"> (Obligatoire) </span> </p>
                  </template>
                  <b-input
                    placeholder="Ex: HOUNTONDJI"
                    v-model.trim="champs.nom"
                    type="text"/>
                </b-field>
              </div>
              <!-- Prenom(s) -->
              <div class="column is-6">
                <b-field :type="champs.errprenom ? 'is-danger' : ''">
                  <template slot="label">
                    <p> Prénom(s) <span class="has-text-danger is-size-7"> (Obligatoire) </span> </p>
                  </template>
                  <b-input
                    placeholder="Ex: Jean"
                    v-model.trim="champs.prenom"
                    type="text"/>
                </b-field>
              </div>
              <!-- Pays de résidence -->
              <div class="column is-6">
                <b-field :type="champs.errpays ? 'is-danger' : ''">
                  <template slot="label">
                    <p> Pays de résidence <span class="has-text-danger is-size-7"> (Obligatoire) </span> </p>
                  </template>
                  <b-autocomplete
                    v-model="nomPays"
                    placeholder="Ex: Bénin"
                    keep-first
                    open-on-focus
                    :data="filteredListPays"
                    field="nom"
                    @select="option => {
                      champs.pays = option.id
                      indicatif = option.indicatif
                    }">
                  </b-autocomplete>
                </b-field>
              </div>
              <!-- Numéro -->
              <div class="column is-6">
                <b-field>
                  <template slot="label">
                    <p> Numéro <span class="has-text-danger is-size-7"> (Obligatoire) </span> </p>
                  </template>
                  <div>
                    <b-field :type="champs.errphone ? 'is-danger' : ''">
                      <p class="control" v-if="champs.pays">
                        <span class="button is-static"> +{{indicatif}} </span>
                      </p>
                      <b-input
                        placeholder="Ex: 66889955"
                        type="number"
                        v-model.trim="champs.phone"
                        expanded
                        @blur="() => {
                          if (!validation1()) showMsgsError = true
                        }"/>
                    </b-field>
                  </div>
                </b-field>
              </div>
            </section>
            <section  class="columns is-multiline" v-show="!show">
              <!-- Adresse email -->
              <div class="column is-12">
                <b-field :type="champs.erremail ? 'is-danger' : ''">
                  <template slot="label">
                    <p> Adresse email <span class="has-text-danger is-size-7"> (Obligatoire) </span> </p>
                  </template>
                  <b-input
                    type="email"
                    placeholder="Ex: exemple@test.com"
                    v-model.trim="champs.email"/>
                </b-field>
              </div>
              <!-- Mot de passe -->
              <div class="column is-12">
                <b-field :type="champs.errpassword ? 'is-danger' : ''">
                  <template slot="label">
                    <p> Mot de passe <span class="has-text-danger is-size-7"> (Obligatoire) </span> </p>
                  </template>
                  <b-input
                    type="password"
                    placeholder="Mot de passe"
                    v-model.trim="champs.password"/>
                </b-field>
              </div>
              <!-- Confirmer le mot de passe -->
              <div class="column is-12">
                <b-field :type="champs.errconfPassword ? 'is-danger' : ''">
                  <template slot="label">
                    <p> Confirmer le mot de passe <span class="has-text-danger is-size-7"> (Obligatoire) </span> </p>
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
              v-if="show"
              @click="nextStep"
              icon-right="arrow-right-box">
              <span class="has-text-weight-bold">
                Suivant
              </span>
            </b-button>
            <div class="buttons flex-1" v-if="!show">
              <b-button
                type="is-primary"
                class="my-5 flex-1"
                @click="show = !show"
                icon-left="arrow-left-box">
                <span class="has-text-weight-bold">
                  Précèdent
                </span>
              </b-button>
              <b-button
                type="is-primary"
                class="my-5 flex-1"
                @click="register">
                <span class="has-text-weight-bold">
                  S'inscrire
                </span>
              </b-button>
            </div>
            <div class="has-text-centered">
              <a class="is-block has-text-secondary" @click="$router.push({name: 'Login'})">
                Se connecter
              </a>
            </div>
          </div>
          <ConfirmRegister :email="champs.email" v-show="isRegistered"/>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import getListePays from '@/services/payes.js'
import { confirmeUser } from '@/api/auth/index'

import MsgError from '@/components/general/MsgError.vue'
import ConfirmRegister from '@/components/register/ConfirmRegister.vue'

export default {
  components: {
    MsgError,
    ConfirmRegister
  },
  data: () => ({
    show: true,
    champs: {
      nom: '',
      prenom: '',
      phone: '',
      pays: '',
      email: '',
      password: '',
      confPassword: '',
      errnom: '',
      errprenom: '',
      errphone: '',
      errpays: '',
      erremail: '',
      errpassword: '',
      errconfPassword: ''
    },
    listPays: [],
    nomPays: '',
    indicatif: '',
    msgs: [],
    showMsgsError: false,
    isRegistered: false
  }),
  computed: {
    filteredListPays () {
      return this.listPays.filter((option) => {
        return option.nom
          .toString()
          .toLowerCase()
          .indexOf(this.nomPays.toLowerCase()) >= 0
      })
    }
  },
  methods: {
    ...mapActions({
      actionRegister: 'register'
    }),
    msgsErrorClose () {
      this.msgs = []
      this.showMsgsError = false
      this.champs.errnom = false
      this.champs.errprenom = false
      this.champs.errpays = false
      this.champs.errphone = false
      this.champs.erremail = false
      this.champs.errpassword = false
      this.champs.errconfPassword = false
    },
    validation1 () {
      let isValid = true
      if (!this.champs.nom) {
        this.msgs.push('Le champs <b>Nom</b> n\'a pas été rempli')
        isValid = false
        this.champs.errnom = true
      }
      if (!this.champs.prenom) {
        this.msgs.push('Le champs <b>Prénom</b> n\'a pas été rempli')
        isValid = false
        this.champs.errprenom = true
      }
      if (typeof this.champs.pays !== 'number') {
        this.msgs.push('Aucun <b>Pays</b> n\'a été selectioné')
        isValid = false
        this.champs.errpays = true
      }
      if (!this.champs.phone) {
        this.msgs.push('Le champs <b>Numéro</b> n\'a pas été saisie ou contient des caractères')
        isValid = false
        this.champs.errphone = true
      }
      if (this.champs.phone.length < 8) {
        this.msgs.push('Le champs <b>Numéro</b> doit contenir au moins 8 caractères')
        isValid = false
        this.champs.errphone = true
      }
      return isValid
    },
    validation2 () {
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
    nextStep () {
      if (this.validation1()) this.show = !this.show
      else this.showMsgsError = true
    },
    async register () {
      if (this.validation1() && this.validation2()) {
        const loadingComponent = this.$buefy.loading.open({ container: null })
        try {
          const infoUser = {
            nom: this.champs.nom,
            prenom: this.champs.prenom,
            email: this.champs.email.toLowerCase(),
            phone: this.champs.phone,
            password: this.champs.password,
            pays: this.champs.pays,
            is_ad: false
          }
          await this.actionRegister(infoUser)
          this.isRegistered = true
          loadingComponent.close()
        } catch (error) {
          if (error.response) {
            this.msgs.push(error.response.data.error)
            this.showMsgsError = true
          }
          loadingComponent.close()
        }
      } else this.showMsgsError = true
    }
  },
  async mounted () {
    this.listPays = getListePays()
    if (this.$route.name === 'RegisterConfirme') {
      const loadingComponent = this.$buefy.loading.open({ container: null })
      await confirmeUser(this.$route.params.id)
      this.$buefy.toast.open({
        message: 'La vérification de votre compte a été faite avec succès. Veuillez vous connecter',
        type: 'is-success',
        duration: 5000
      })
      this.$router.push({ name: 'Login' })
      loadingComponent.close()
    }
  }
}
</script>
