<template>
  <div class="container">
    <Header/>
    <div class="media align-center">
      <div class="media-content">
        <p class="title is-4 has-text-centered has-text-primary is-size-5-mobile py-5">
          Tableau de bord
        </p>
      </div>
    </div>
    <div class="buttons">
      <b-button
        pack="mdi"
        type="is-primary"
        expanded
        v-for="(item, i) in menuData"
        :key="i"
        :icon-left="item.icon"
        size="is-medium"
        tag="a"
        :class="$route.name === item.to ? 'is-active' : ''"
        @click="goTo(item.to)">
        <span class="is-size-5">
          {{item.title}}
        </span>
      </b-button>
    </div>
  </div>
</template>

<script>
import Header from '@/components/general/Header.vue'
import { mapState } from 'vuex'

export default {
  props: {
    trancheOffres: Array,
    trancheOffresBitcoin: Array
  },
  components: {
    Header
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      getUser: 'user'
    }),
    menuData () {
      return [
        {
          title: 'Résumé',
          to: 'Resume',
          icon: 'home',
          show: true
        },
        {
          title: 'Liste des filleules',
          to: 'Filleules',
          icon: 'account-multiple',
          show: true
        },
        {
          title: 'Liste des achats',
          to: 'Achats',
          icon: 'cart',
          show: !this.getUser.is_ad
        },
        {
          title: 'Liste tous les achats',
          to: 'AllAchats',
          icon: 'cart',
          show: this.getUser.is_ad
        },
        {
          title: 'Gestion des offres',
          to: 'BackOffres',
          icon: 'tag',
          show: this.getUser.is_ad
        },
        {
          title: 'Paramètre',
          to: 'Setting',
          icon: 'settings',
          show: true
        }
      ].filter(m => m.show)
    }
  },
  methods: {
    goTo (to) {
      this.$emit('isclick')
      if (this.$route.name !== to) this.$router.push({ name: to })
    }
  }
}
</script>
