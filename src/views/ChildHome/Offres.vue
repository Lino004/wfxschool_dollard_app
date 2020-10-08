<template>
  <div>
    <div class="columns is-multiline is-paddingless">
      <div class="column is-12 is-paddingless">
        <div>
          <figure>
            <img
            src="@/assets/imgs/logo_white.png"
            class="image is-width-160 mx_auto"/>
          </figure>
        </div>
      </div>
      <div class="column is-5 is-hidden-touch is-paddingless">
        <figure>
          <img src="@/assets/imgs/illustrations/businessman.svg" alt="finance">
        </figure>
      </div>
      <div class="column is-paddingless">
        <div class="is-flex is-height-100p justify-center align-center flex-column">

          <div class="has-text-centered">
            <h1 class="title mb-2 has-text-white">
              Nos offres
            </h1>
          </div>
          <h2 class="subtitle">
            <vue-typer :text="['Nos offres pour le dollars PM']"></vue-typer>
          </h2>

          <b-table
            id="tab_tarif"
            :data="data"
            :columns="columns"
            header-class="has-text-white"
            v-animate-css="{
              classes: 'fadeIn',
              delay: 300
            }"
            class="is-width-450"/>
          <h2 class="subtitle mt-4">
            <vue-typer :text="['Nos offres pour le dollars Bitcoin']"></vue-typer>
          </h2>
          <b-table
            id="tab_tarif"
            :data="dataBitcoin"
            :columns="columns"
            header-class="has-text-white"
            v-animate-css="{
              classes: 'fadeIn',
              delay: 400
            }"
            class="is-width-450"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueTyper } from 'vue-typer'

export default {
  components: {
    VueTyper
  },
  data () {
    return {
      trancheOffres: [
        { trancheInferieur: 50, trancheSuperieur: 0, prix: 620 },
        { trancheInferieur: 1000, trancheSuperieur: 0, prix: 610 }
      ],
      trancheOffresBitcoin: [
        { trancheInferieur: 50, trancheSuperieur: 0, prix: 610 },
        { trancheInferieur: 1000, trancheSuperieur: 0, prix: 600 }
      ],
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
  }
}
</script>

<style>

</style>
