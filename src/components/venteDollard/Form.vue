<template>
  <div class="container" v-if="isConnect">
    <div class="py-3 is-hidden-mobile"></div>
    <p class="title has-text-centered has-text-white is-size-5-mobile pb-3">
      Formulaire d'achat
    </p>
    <p class="subtitle has-text-centered has-text-white is-size-6-mobile">
      Veuillez vérifier puis remplir les champs suivant:
    </p>

    <transition enter-active-class="zoomIn">
      <div class="box mx_auto" v-if="showAnime1">
        <MsgError :msgs="msgs" v-if="showMsgsError" @close="msgsErrorClose"/>
        <section class="columns is-multiline is-mobile" v-if="show">
          <!-- Nom -->
          <div class="column is-12-mobile is-6-tablet">
            <b-field label="Nom">
              <b-input
                placeholder="Votre nom"
                :value="getUser.nom"
                disabled/>
            </b-field>
          </div>
          <!-- Prenom -->
          <div class="column is-12-mobile is-6-tablet">
            <b-field label="Prénom(s)">
              <b-input
                placeholder="Votre prenon(s)"
                :value="getUser.prenom"
                disabled/>
            </b-field>
          </div>
          <!-- Adresse email -->
          <div class="column is-12-mobile is-6-tablet">
            <b-field label="Adresse email">
              <b-input
                type="email"
                :value="getUser.email"
                disabled/>
            </b-field>
          </div>
          <!-- Numéro -->
          <div class="column is-12-mobile is-6-tablet">
            <b-field>
              <template slot="label">
                <p> Numéro <span class="has-text-danger is-size-7"> * </span> </p>
              </template>
              <div>
                <b-field :type="champs.errphone ? 'is-danger' : ''">
                  <p class="control">
                    <span class="button is-static"> +{{indicatif}} </span>
                  </p>
                  <b-input
                    placeholder="Ex: 66889955"
                    type="number"
                    expanded
                    v-model.number="champs.phone"/>
                </b-field>
              </div>
            </b-field>
          </div>
          <!-- Type achat-->
          <div class="column is-12-mobile is-6-tablet">
            <b-field label="Type d'achat">
              <b-select placeholder="Sélectionner votre type d'achat" expanded
                v-model="typeAchat">
                <option
                  v-for="option in type"
                  :value="option.id"
                  :key="option.id">
                  {{ option.value }}
                </option>
              </b-select>
            </b-field>
          </div>
          <!-- Adresse PM -->
          <div class="column is-12-mobile is-6-tablet" v-show="typeAchat === 1">
            <b-field>
              <template slot="label">
                <p> Adresse PM <span class="has-text-danger is-size-7"> * </span> </p>
              </template>
              <div>
                <b-field :type="champs.erradressepm ? 'is-danger' : ''">
                  <p class="control">
                    <span class="button is-static">U</span>
                  </p>
                  <b-input
                    placeholder="12345678"
                    type="number"
                    expanded
                    v-model.number="champs.adressepm"/>
                </b-field>
              </div>
            </b-field>
          </div>
          <!-- Adresse Bitcoin -->
          <div class="column is-12-mobile is-6-tablet" v-show="typeAchat === 2">
            <b-field>
              <template slot="label">
                <p> Adresse Bitcoin <span class="has-text-danger is-size-7"> * </span> </p>
              </template>
              <div>
                <b-field :type="champs.erradressebitcoin ? 'is-danger' : ''">
                  <b-input
                    placeholder="Ex: 784ljyybhbsdFfhbk95518184ygfy"
                    expanded
                    v-model="champs.adressebitcoin"/>
                </b-field>
              </div>
            </b-field>
          </div>
          <!-- Montant achat en $ -->
          <div class="column is-12-mobile is-6-tablet">
            <b-field>
              <template slot="label">
                <p> Montant achat en $ <span class="has-text-danger is-size-7"> * </span> </p>
              </template>
              <div>
                <b-field :type="champs.errmontantAchat ? 'is-danger' : ''">
                  <b-input
                    placeholder="500"
                    type="number"
                    expanded
                    min="50"
                    v-model.number="champs.montantAchat"/>
                  <p class="control">
                    <span class="button is-static">$</span>
                  </p>
                </b-field>
              </div>
            </b-field>
          </div>
          <!-- Somme à payer -->
          <div class="column is-12-mobile is-6-tablet">
            <b-field label="Somme à payer">
              <b-button
                type="is-primary"
                class="is-static has-background-white has-text-weight-bold"
                :class="montantPayer.class"
                expanded>
                {{montantPayer.value}} FCFA
              </b-button>
            </b-field>
          </div>
        </section>
        <section class="" v-else>
          <h4 class="is-size-4 has-text-weight-bold">Résumé de l'achat</h4>
          <hr>
          <div class="media">
            <div class="media-left is-hidden-mobile">
              <Avatar
                :username="`${getUser.nom} ${getUser.prenom}`"
                :size="100"
                backgroundColor="#1e70b4"
                color="white"/>
            </div>
            <div class="media-content">
              <h5 class="is-size-5 has-text-weight-bold has-text-secondary">
                {{`${getUser.nom} ${getUser.prenom}`}}
              </h5>
              <div class="has-text-weight-normal">
                <p class="is-size-7">
                  Adresse email:
                  <span class="has-text-weight-bold is-size-6">{{getUser.email}}</span>
                </p>
                <p class="is-size-7" v-if="champs.adressepm && typeAchat === 1">
                  Adresse perfect money:
                  <span class="has-text-weight-bold is-size-6">U{{champs.adressepm}}</span>
                </p>
                <p class="is-size-7" v-if="champs.adressebitcoin && typeAchat === 2">
                  Adresse bitcoin:
                  <span class="has-text-weight-bold is-size-6">{{champs.adressebitcoin}}</span>
                </p>
                <p class="is-size-7">
                  Numéro:
                  <span class="has-text-weight-bold is-size-6">{{`+${indicatif} ${champs.phone}`}}</span>
                </p>
              </div>
            </div>
          </div>
          <hr>

          <b-table
            id="tab_tarif"
            :data="data"
            :columns="columns"
            header-class="has-text-white">
          </b-table>
        </section>
        <b-button
          type="is-primary"
          expanded
          class="my-5"
          v-if="show"
          @click="next"
          icon-right="arrow-right-box">
          <span class="has-text-weight-bold">
            Suivant
          </span>
        </b-button>
        <p v-if="show"> <span class="has-text-danger is-size-6 has-text-weight-bold"> * </span> : Champs obligatoire</p>
        <div class="buttons flex-1" v-if="!show">
          <b-button
            type="is-primary"
            class="my-5 flex-1"
            @click="show = !show"
            icon-left="arrow-left-box">
            <span class="has-text-weight-bold is-hidden-mobile">
              Précèdent
            </span>
          </b-button>
          <b-button
            type="is-primary"
            class="my-5 flex-1"
            @click="$buefy.toast.open('En cours développement ...')">
            <span class="has-text-weight-bold">
              Confirmer l'achat
            </span>
          </b-button>
        </div>
      </div>
    </transition>

    <div class="py-3"></div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Avatar from 'vue-avatar'
import cloneDeep from 'lodash/cloneDeep'
import getListePays from '@/services/payes'
import MsgError from '@/components/general/MsgError.vue'

export default {
  components: {
    MsgError,
    Avatar
  },
  props: {
    trancheOffres: Array,
    trancheOffresBitcoin: Array
  },
  data: () => ({
    show: true,
    listPays: [],
    indicatif: '',
    champs: {
      phone: '',
      adressepm: '',
      adressebitcoin: '',
      montantAchat: 50,
      errphone: false,
      erradressepm: false,
      erradressebitcoin: false,
      errmontantAchat: false
    },
    msgs: [],
    showMsgsError: false,
    columns: [
      {
        field: 'description',
        label: 'Description',
        headerClass: 'has-text-secondary'
      },
      {
        field: 'qtt',
        label: 'Quantité ($)',
        headerClass: 'has-text-secondary',
        numeric: true
      },
      {
        field: 'prix',
        label: 'Prix Unit. (FCFA)',
        headerClass: 'has-text-secondary',
        numeric: true
      },
      {
        field: 'total',
        label: 'Total (FCFA)',
        headerClass: 'has-text-secondary',
        numeric: true
      }
    ],
    type: [
      {
        id: 1,
        value: 'PM'
      },
      {
        id: 2,
        value: 'Bitcoin'
      }
    ],
    typeAchat: 1,
    showAnime1: false
  }),
  computed: {
    ...mapState({
      getUser: 'user'
    }),
    ...mapGetters({
      isConnect: 'isConnect'
    }),
    findTranche () {
      if (this.typeAchat === 1) {
        const liste = cloneDeep(this.trancheOffres)
        return liste
          .sort((a, b) => b.trancheInferieur - a.trancheInferieur)
          .find(el => {
            if (el.trancheSuperieur === 0 && this.champs.montantAchat >= el.trancheInferieur) return el
            if (this.champs.montantAchat >= el.trancheInferieur && this.champs.montantAchat < el.trancheSuperieur) return el
          })
      }
      if (this.typeAchat === 2) {
        const liste = cloneDeep(this.trancheOffresBitcoin)
        return liste
          .sort((a, b) => b.trancheInferieur - a.trancheInferieur)
          .find(el => {
            if (el.trancheSuperieur === 0 && this.champs.montantAchat >= el.trancheInferieur) return el
            if (this.champs.montantAchat >= el.trancheInferieur && this.champs.montantAchat < el.trancheSuperieur) return el
          })
      }
      return ''
    },
    montantPayer () {
      if (this.findTranche === undefined) return { class: 'has-text-danger', value: 'Montant d\'achat incorrect' }
      return { class: 'has-text-primary', value: this.findTranche.prix * this.champs.montantAchat }
    },
    data () {
      return [{
        description: 'Achat de dollar',
        qtt: this.champs.montantAchat,
        prix: this.findTranche.prix,
        total: this.montantPayer.value
      }]
    }
  },
  methods: {
    msgsErrorClose () {
      this.msgs = []
      this.showMsgsError = false
      this.champs.errphone = false
      this.champs.erradressepm = false
      this.champs.erradressebitcoin = false
      this.champs.errmontantAchat = false
    },
    validation () {
      let isValid = true
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
      if (this.typeAchat === 1 && this.champs.adressepm.toString().length === 0) {
        this.msgs.push('<b>L\'adresse Perfect Money</b> est obligatoire')
        isValid = false
        this.champs.erradressepm = true
      }
      if (this.typeAchat === 1 && this.champs.adressepm.toString().length !== 8) {
        this.msgs.push('<b>L\'adresse Perfect Money</b> doit contenir 8 chiffres')
        isValid = false
        this.champs.erradressepm = true
      }
      if (this.typeAchat === 2 && this.champs.adressebitcoin.length === 0) {
        this.msgs.push('<b>L\'adresse Bitcoin</b> est obligatoire')
        isValid = false
        this.champs.erradressebitcoin = true
      }
      if (this.champs.montantAchat.length >= 50) {
        this.msgs.push('Le <b>montant d\'achat</b> doit être supérieur à 50$')
        isValid = false
        this.champs.errmontantAchat = true
      }
      return isValid
    },
    next () {
      if (this.validation()) this.show = !this.show
      else this.showMsgsError = true
    }
  },
  mounted () {
    this.listPays = getListePays
    this.indicatif = getListePays.find(el => el.id === this.getUser.pays).indicatif
    this.champs.phone = this.getUser.phone
    const self = this
    setTimeout(function () {
      self.showAnime1 = true
    }, 500)
  }
}
</script>
