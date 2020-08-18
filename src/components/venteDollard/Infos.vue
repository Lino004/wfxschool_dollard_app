<template>
  <div class="container">
    <Header/>
    <figure class="pb-5">
      <img
      src="@/assets/imgs/logo_blue.png"
      class="image is-width-160 mx_auto"/>
    </figure>

    <p class="title has-text-centered has-text-primary is-size-5-mobile">
      Vente de dollar
    </p>
    <p class="subtitle has-text-centered has-text-primary is-size-5-mobile">
      Nos offres
    </p>
    <b-table
      id="tab_tarif"
      :data="data"
      :columns="columns"
      header-class="has-text-white"></b-table>
  </div>
</template>

<script>
import Header from '@/components/general/Header.vue'

export default {
  props: {
    trancheOffres: Array
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
          label: 'Prix',
          headerClass: 'has-text-primary'
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
            prix: `${el.prix} FCFA`
          }
        }
        return {
          tranche: `${el.trancheInferieur}$ - ${el.trancheSuperieur}$`,
          prix: `${el.prix} FCFA`
        }
      })
    }
  }
}
</script>
