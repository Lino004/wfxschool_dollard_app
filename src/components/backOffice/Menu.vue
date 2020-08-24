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
        tag="router-link"
        :class="$route.name === item.to ? 'is-active' : ''"
        :to="{ name: item.to }">
        <span class="is-size-5">
          {{item.title}}
        </span>
      </b-button>
    </div>
  </div>
</template>

<script>
import Header from '@/components/general/Header.vue'

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
      menuData: [
        {
          title: 'Résumé',
          to: 'Resume',
          icon: 'home'
        },
        {
          title: 'Liste des filleules',
          to: 'Filleules',
          icon: 'account-multiple'
        },
        {
          title: 'Liste des achats',
          to: 'Achats',
          icon: 'cart'
        },
        {
          title: 'Paramètre',
          to: 'Setting',
          icon: 'settings'
        }
      ]
    }
  },
  computed: {}
}
</script>
