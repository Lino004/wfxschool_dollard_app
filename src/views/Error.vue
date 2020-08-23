<template>
  <div class="bg_degraded">
    <section class="hero is-fullheight">
      <div class="hero-body">
        <div class="container">
          <p class="error is-size-5-mobile">
            Erreur
          </p>
          <p class="hit-the-floor is-size-5-mobile">
            404
          </p>
          <p class="is-size-3 has-text-white has-text-centered">
            La page web que vous recherchez n'existe pas.
            <br>
            Cliquez <a @click="$router.push({ name: 'VenteDollar' })">ici</a>
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {

}
</script>

<style>
</style>
