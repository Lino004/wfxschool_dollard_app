<template>
  <div>
    <div class="">
      <p class="title is-4 has-text-centered has-text-white is-size-5-mobile">
        Paramètre
      </p>
      <div class="box">
        <Views
          :user="getUser"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Views from '@/components/backOffice/Setting/Views.vue'

export default {
  components: {
    Views
  },
  data: () => ({}),
  computed: {
    ...mapState({
      getUser: 'user'
    })
  }
}
</script>

<style>

</style>
