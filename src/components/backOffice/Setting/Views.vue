<template>
  <div>
    <div class="columns is-multiline is-mobile">
      <div class="column is-12">
        <Avatar
          :username="`${champs.nom} ${champs.prenom}`"
          :size="100"
          backgroundColor="#1e70b4"
          color="white"
          :customStyle="{
            marginLeft: 'auto',
            marginRight: 'auto'
          }"/>
      </div>
      <div class="column is-12-mobile is-6-tablet">
        <b-field label="Nom">
          <b-input
            v-model="champs.nom"
            :disabled="disabled"/>
        </b-field>
      </div>
      <div class="column is-12-mobile is-6-tablet">
        <b-field label="Prenom">
          <b-input
            v-model="champs.prenom"
            :disabled="disabled"/>
        </b-field>
      </div>
      <div class="column is-12-mobile is-6-tablet">
        <b-field label="Email">
          <b-input
            v-model="champs.email"
            :disabled="disabled"/>
        </b-field>
      </div>
      <div class="column is-12-mobile is-6-tablet">
        <b-field label="Numéro">
          <b-input
            v-model="champs.phone"
            :disabled="disabled"/>
        </b-field>
      </div>
      <div class="column is-12-mobile is-6-tablet">
        <b-field label="Adresse PM">
          <b-input
            v-model="champs.adressepm"
            :disabled="disabled"/>
        </b-field>
      </div>
      <div class="column is-12-mobile is-6-tablet">
        <b-field label="Adresse Bitcoin">
          <b-input
            v-model="champs.adressebitcoin"
            :disabled="disabled"/>
        </b-field>
      </div>
      <div class="column is-12-mobile is-6-tablet" v-if="disabled">
        <b-field label="Lien de parainage">
          <b-button expanded type="is-primary" @click="copieLien">
            Copier le lien de parainage
          </b-button>
        </b-field>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <b-button
          expanded
          :type="disabled ? 'is-primary' : ''"
          @click="disabled = !disabled">
          <span :class="disabled ? '' : 'has-text-primary'">
            {{disabled ? 'Modifier' : 'Annuler'}}
          </span>
        </b-button>
      </div>
      <div class="column" v-if="!disabled">
        <b-button
          expanded
          type="is-primary"
          @click="updateUser">
          Valider
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from 'vue-avatar'
import { mapActions } from 'vuex'

export default {
  components: {
    Avatar
  },
  props: {
    user: Object
  },
  data: () => ({
    champs: {},
    disabled: true
  }),
  computed: {
  },
  methods: {
    ...mapActions({
      update: 'update'
    }),
    async copieLien () {
      try {
        const getUrl = window.location
        await this.$copyText(`${getUrl.protocol}/${getUrl.host}/register-parrainage/${this.user.identifiant_url}`)
        this.$buefy.toast.open({
          message: 'Lien de parrainage copié',
          type: 'is-success'
        })
      } catch (error) {
        this.$buefy.toast.open({
          message: 'Problème lors de la copie',
          type: 'is-danger'
        })
      }
    },
    async updateUser () {
      try {
        if (this.champs.password === this.user.password) {
          delete this.champs.password
        }
        await this.update(this.champs)
        this.$buefy.toast.open({
          message: 'Modification effectuée',
          type: 'is-success'
        })
        this.disabled = true
      } catch (error) {
        this.$buefy.toast.open({
          message: 'Erreur lors de la modification',
          type: 'is-danger'
        })
      }
    }
  },
  mounted () {
    this.champs = this.user
  }
}
</script>

<style>

</style>
