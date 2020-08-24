<template>
  <div>
    <div class="columns is-multiline is-mobile">
      <div class="column is-12">
        <Avatar
          :username="`${user.nom} ${user.prenom}`"
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
            :value="user.nom"
            :disabled="disabled"/>
        </b-field>
      </div>
      <div class="column is-12-mobile is-6-tablet">
        <b-field label="Prenom">
          <b-input
            :value="user.prenom"
            :disabled="disabled"/>
        </b-field>
      </div>
      <div class="column is-12-mobile is-6-tablet">
        <b-field label="Email">
          <b-input
            :value="user.email"
            :disabled="disabled"/>
        </b-field>
      </div>
      <div class="column is-12-mobile is-6-tablet">
        <b-field label="Numéro">
          <b-input
            :value="user.phone"
            :disabled="disabled"/>
        </b-field>
      </div>
      <div class="column is-12-mobile is-6-tablet">
        <b-field label="Adresse PM">
          <b-input
            :value="user.adressepm"
            :disabled="disabled"/>
        </b-field>
      </div>
      <div class="column is-12-mobile is-6-tablet">
        <b-field label="Adresse Bitcoin">
          <b-input
            :value="user.adressebitcoin"
            :disabled="disabled"/>
        </b-field>
      </div>
      <div class="column is-12-mobile is-6-tablet" v-if="disabled">
        <b-field label="Lien de parainage">
          <b-button expanded type="is-primary" @click="$buefy.toast.open('En cours développement ...')">
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
          @click="$buefy.toast.open('En cours développement ...')">
          Valider
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from 'vue-avatar'
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
  mounted () {
    this.champs = this.user
  }
}
</script>

<style>

</style>
