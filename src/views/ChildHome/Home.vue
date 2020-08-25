<template>
  <div>
    <div class="columns is-multiline">
      <div class="column">
        <div class="is-flex is-height-100p justify-center align-center flex-column">
          <div>
            <figure class="mb-4">
              <img
              src="@/assets/imgs/logo_white.png"
              class="image is-width-160 mx_auto"/>
            </figure>
          </div>
          <div class="has-text-centered is-max-width-300">
            <h1 class="title has-text-white">
              Achat de monnaie électronique
            </h1>
            <h2 class="subtitle">
              <vue-typer :text="['Acheter chez nous', 'en toute sécurité', 'à des prix abordable']"></vue-typer>
            </h2>
          </div>
          <div class="is-flex">
            <figure class="mb-4">
              <img
              src="@/assets/imgs/icons/bitcoin.svg"
              class="image is-width-160 mx_auto"/>
            </figure>
            <figure class="mb-4">
              <img
              src="@/assets/imgs/icons/pm.svg"
              class="image is-width-160 mx_auto"/>
            </figure>
          </div>
        </div>
      </div>
      <div class="column is-hidden-touch">
        <figure>
          <img src="@/assets/imgs/illustrations/finance.svg" alt="finance">
        </figure>
      </div>
      <div class="column is-12">
        <b-message type="is-transparent">
          <p class="subtitle has-text-centered">
            <vue-typer :text="['Avec notre système de parrainage, gagné 2 FCFA sur chaque dollars acheté par vos filleules']"></vue-typer>
          </p>
        </b-message>
      </div>
    </div>
  </div>
</template>

<script>
import { VueTyper } from 'vue-typer'

export default {
  components: {
    VueTyper
  }
}
</script>

<style>

</style>
