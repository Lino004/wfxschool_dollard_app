<template>
  <div class="buttons justify-center">
    <b-button
      pack="mdi"
      type="is-primary"
      v-for="(item, i) in menuData"
      :key="i"
      :icon-left="item.icon"
      size="is-medium"
      tag="router-link"
      :to="{ name: item.to }">
    </b-button>
  </div>
</template>

<script>

export default {
  data () {
    return {
      menuData: [
        {
          to: 'Home',
          icon: 'home'
        },
        {
          to: 'Login',
          icon: 'login'
        },
        {
          to: 'Register',
          icon: 'account-plus'
        }
      ]
    }
  },
  methods: {
    goTo (to) {
      if (this.$route.name !== to) this.$router.push({ name: to })
    }
  }
}
</script>
