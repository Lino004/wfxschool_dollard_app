<template>
  <b-navbar
    :active="true"
    :mobile-burger="false"
    :close-on-click="false"
    id="header_app">
    <template slot="end">
      <b-navbar-item tag="div">
        <div class="buttons">

          <!-- Vente -->
          <b-tooltip label="Accueil"
            position="is-bottom">
            <b-button type="is-primary"
              icon-right="home"
              class="mr-1"
              :class="$route.name === 'home' ? 'is-active' : ''"
              tag="router-link"
              :to="{ name: 'Home' }">
            </b-button>
          </b-tooltip>

          <!-- Vente -->
          <b-tooltip label="Vente"
            position="is-bottom">
            <b-button type="is-primary"
              icon-right="cash-usd"
              class="mr-1"
              :class="$route.name === 'VenteDollar' ? 'is-active' : ''"
              tag="router-link"
              :to="{ name: 'VenteDollar' }">
            </b-button>
          </b-tooltip>

          <!-- Tableau de bord -->
          <b-tooltip label="Tableau de bord"
            position="is-bottom">
            <b-button type="is-primary"
              icon-right="vector-union"
              class="mr-1"
              :class="$route.path.includes('back-office') ? 'is-active' : ''"
              tag="router-link"
              :to="{ name: 'Resume' }">
            </b-button>
          </b-tooltip>

          <!-- Déconnexion -->
          <b-tooltip label="Déconnexion"
            position="is-bottom">
            <b-button type="is-primary"
              icon-right="logout"
              @click="logout()"
              tag="a">
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
      this.$router.replace({ name: 'Login' })
    }
  }
}
</script>
