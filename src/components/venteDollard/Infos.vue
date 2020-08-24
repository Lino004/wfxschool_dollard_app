<template>
  <div class="container">
    <Header/>
    <transition enter-active-class="slideInLeft">
      <figure class="pb-5" v-if="showAnime1">
        <img
        src="@/assets/imgs/logo_blue.png"
        class="image is-width-160 mx_auto"/>
      </figure>
    </transition>

    <transition enter-active-class="slideInLeft">
      <p class="title has-text-centered has-text-primary is-size-5-mobile" v-if="showAnime1">
        Achat de monnaie électronique
      </p>
    </transition>

    <transition enter-active-class="slideInLeft">
      <p class="subtitle has-text-centered has-text-primary is-size-5-mobile mt-2" v-if="showAnime2">
        Nos offres pour le dollars PM
      </p>
    </transition>

    <transition enter-active-class="slideInLeft">
      <b-table
        id="tab_tarif"
        :data="data"
        :columns="columns"
        header-class="has-text-white"
        v-if="showAnime3"></b-table>
    </transition>

    <transition enter-active-class="slideInLeft">
      <p class="subtitle has-text-centered has-text-primary is-size-5-mobile mt-2" v-if="showAnime4">
        Nos offres pour le dollars Bitcoin
      </p>
    </transition>

    <transition enter-active-class="slideInLeft">
      <b-table
        id="tab_tarif"
        :data="dataBitcoin"
        :columns="columns"
        header-class="has-text-white"
        v-if="showAnime4"></b-table>
    </transition>

    <br>
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
      columns: [
        {
          field: 'tranche',
          label: 'Tranche',
          headerClass: 'has-text-primary'
        },
        {
          field: 'prix',
          label: 'Prix (FCFA)',
          headerClass: 'has-text-primary',
          numeric: true
        }
      ],
      showAnime1: false,
      showAnime2: false,
      showAnime3: false,
      showAnime4: false,
      showAnime5: false
    }
  },
  computed: {
    data () {
      return this.trancheOffres.map(el => {
        if (el.trancheSuperieur === 0) {
          return {
            tranche: `À partie de ${el.trancheInferieur}$`,
            prix: `${el.prix}`
          }
        }
        return {
          tranche: `${el.trancheInferieur}$ - ${el.trancheSuperieur}$`,
          prix: `${el.prix}`
        }
      })
    },
    dataBitcoin () {
      return this.trancheOffresBitcoin.map(el => {
        if (el.trancheSuperieur === 0) {
          return {
            tranche: `À partie de ${el.trancheInferieur}$`,
            prix: `${el.prix}`
          }
        }
        return {
          tranche: `${el.trancheInferieur}$ - ${el.trancheSuperieur}$`,
          prix: `${el.prix}`
        }
      })
    }
  },
  mounted () {
    const self = this
    setTimeout(function () {
      self.showAnime1 = true
    }, 500)
    setTimeout(function () {
      self.showAnime2 = true
    }, 700)
    setTimeout(function () {
      self.showAnime3 = true
    }, 900)
    setTimeout(function () {
      self.showAnime4 = true
    }, 1100)
    setTimeout(function () {
      self.showAnime5 = true
    }, 1300)
  }
}
</script>
