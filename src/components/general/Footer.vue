<template>
  <nav class="tabs is-boxed is-centered">
    <div class="container">
      <ul>
        <router-link
          tag="li"
          :to="{ name: item.to }"
          v-for="(item, i) in menu"
          :key="i"
          :class="$route.name === item.to ? 'is-active' : ''">
            <a :class="$route.name === item.to ? '' : 'primary has-text-white'">{{item.name}}</a>
          </router-link>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      menu: [
        {
          name: 'Acceuil',
          to: 'Home'
        },
        {
          name: 'Nos offres',
          to: 'Offres'
        }
      ]
    }
  }
}
</script>
