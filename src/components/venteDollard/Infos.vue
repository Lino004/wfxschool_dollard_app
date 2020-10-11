<template>
  <div class="container">
    <Header/>
    <figure
      class="pb-5"
      v-animate-css="{
        classes: 'slideInLeft',
        delay: 100
      }">
      <img
      src="@/assets/imgs/logo_blue.png"
      class="image is-width-160 mx_auto"/>
    </figure>

    <p class="title has-text-centered has-text-primary is-size-5-mobile"
      v-animate-css="{
        classes: 'slideInLeft',
        delay: 200
      }">
      Achat de monnaie électronique
    </p>

    <p class="subtitle has-text-centered has-text-primary is-size-5-mobile mt-2"
      v-animate-css="{
        classes: 'slideInLeft',
        delay: 300
      }">
      Nos offres pour le dollars PM
    </p>

    <b-table
      id="tab_tarif"
      :data="data"
      :columns="columns"
      header-class="has-text-white"
      v-animate-css="{
        classes: 'slideInLeft',
        delay: 300
      }"
      :loading="isLoading"></b-table>

    <p class="subtitle has-text-centered has-text-primary is-size-5-mobile mt-2"
      v-animate-css="{
        classes: 'slideInLeft',
        delay: 400
      }">
      Nos offres pour le dollars Bitcoin
    </p>

    <b-table
      id="tab_tarif"
      :data="dataBitcoin"
      :columns="columns"
      header-class="has-text-white"
      v-animate-css="{
        classes: 'slideInLeft',
        delay: 400
      }"
      :loading="isLoading"></b-table>

    <br>
  </div>
</template>

<script>
import Header from '@/components/general/Header.vue'

export default {
  props: {
    trancheOffres: Array,
    trancheOffresBitcoin: Array,
    isLoading: Boolean
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
      ]
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
  mounted () {}
}
</script>
