<template>
  <b-navbar
    :is-active="true"
    :mobile-burger="false"
    :close-on-click="false"
    id="header_app">
    <template slot="end">
      <b-navbar-item tag="div">
        <div class="buttons">
          <b-tooltip label="Déconnexion"
            position="is-bottom">
            <b-button type="is-primary"
              icon-right="logout"
              @click="logout()">
            </b-button>
        </b-tooltip>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import { mapMutations } from 'vuex'

export default {

  methods: {
    ...mapMutations({
      actionLogout: 'SET_USER'
    }),
    logout () {
      this.actionLogout(null)
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>
