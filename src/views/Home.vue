<template>
  <div>
    <section class="hero bg_degraded is-fullheight">
      <!-- Hero head: will stick at the top -->
      <div class="hero-head">
        <b-navbar
          :active="true"
          :mobile-burger="false"
          :close-on-click="false"
          id="header_app2">
          <template slot="end">
            <b-navbar-item tag="div">
              <div class="buttons" v-if="!getUser">

                <b-button
                  type="is-primary"
                  class="has-text-weight-bold"
                  tag="router-link"
                  :to="{ name: 'Register' }">
                  Inscription
                </b-button>
                <b-button
                  type=""
                  class="has-text-weight-bold has-text-primary"
                  tag="router-link"
                  :to="{ name: 'Login' }">
                  Connexion
                </b-button>

              </div>
              <div class="buttons" v-else>

                <b-button
                  type="is-primary"
                  class="has-text-weight-bold"
                  tag="router-link"
                  :to="{ name: 'VenteDollar' }">
                  Faire un achat
                </b-button>
                <b-button
                  type=""
                  class="has-text-weight-bold has-text-primary"
                  tag="router-link"
                  :to="{ name: 'Resume' }">
                  Tableau de bord
                </b-button>

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
      </div>

      <!-- Hero content: will be in the middle -->
      <div class="hero-body">
        <div class="container">
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
      </div>

      <!-- Hero footer: will stick at the bottom -->
      <div class="hero-foot">
        <AppFooter />
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Footer from '@/components/general/Footer.vue'

export default {
  components: {
    AppFooter: Footer
  },
  computed: {
    ...mapState({
      getUser: 'user'
    })
  },
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
