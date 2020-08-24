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
            disabled/>
        </b-field>
      </div>
      <div class="column is-12-mobile is-6-tablet">
        <b-field label="Prenom">
          <b-input
            :value="user.prenom"
            disabled/>
        </b-field>
      </div>
      <div class="column is-12-mobile is-6-tablet">
        <b-field label="Email">
          <b-input
            :value="user.email"
            disabled/>
        </b-field>
      </div>
      <div class="column is-12-mobile is-6-tablet">
        <b-field label="Numéro">
          <b-input
            :value="user.phone"
            disabled/>
        </b-field>
      </div>
      <div class="column is-12-mobile is-6-tablet">
        <b-field label="Adresse PM">
          <b-input
            :value="user.adressepm"
            disabled/>
        </b-field>
      </div>
      <div class="column is-12-mobile is-6-tablet">
        <b-field label="Adresse Bitcoin">
          <b-input
            :value="user.adressebitcoin"
            disabled/>
        </b-field>
      </div>
      <div class="column is-12-mobile is-6-tablet">
        <b-field label="Lien de parainage">
          <b-button expanded type="is-primary">
            Copier le lien de parainage
          </b-button>
        </b-field>
      </div>
      <div class="column is-12">
          <b-button expanded type="is-primary" @click="$emit('modif')">
            Modifier
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
  }
}
</script>

<style>

</style>
