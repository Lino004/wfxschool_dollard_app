<template>
  <div class="bg_degraded page-vente">
    <section class="hero is-fullheight page-vente_hero">
      <div class="columns flex-1 is-marginless">
        <div
          class="
            column flex-1 is-min-full-height has-background-white
            px-6 form_vente is-5 is-4-desktop is-3-widescreen box_shadow_1
            is-hidden-desktop-only is-hidden-tablet-only"
          v-show="!showOneColumn || show">
          <Menu @isclick="show = false"/>
        </div>
        <div class="is-hidden-mobile is-hidden-widescreen">
          <b-sidebar
            fullheight
            overlay
            v-model="open"
            id="menu-backoffice"
          >
            <div class="px-2 py-2">
              <Menu @isclick="show = false"/>
            </div>
          </b-sidebar>
          <b-button
            @click="open = true"
            icon-left="menu"
            class="mt-5 ml-5 is-position-fixed"
            style="z-index: 30">
          </b-button>
        </div>
        <div class="column flex-1 px-6 form_vente" v-show="!showOneColumn || !show">
          <div class="container">
            <figure class="logo_backoffice">
              <img
              src="@/assets/imgs/logo_white.png"
              class="image is-width-160 mx_auto"/>
            </figure>
            <div class="py-5">
              <router-view/>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="is-invisible-tablet page-vente_footer">
      <b-navbar
        fixed-bottom
        :active="true"
        :mobile-burger="false"
        :close-on-click="false">
        <template slot="start">
          <div class="field has-addons">
            <div class="control flex-1">
              <b-button
                @click="show = true"
                expanded
                class="is-height-52 no-border-radius">
                <span class="has-text-weight-bold">
                  Menu
                </span>
              </b-button>
            </div>
            <div class="control flex-1">
              <b-button
                @click="show = false"
                expanded
                class="is-height-52 no-border-radius"
                type="is-primary">
                <span class="has-text-weight-bold">
                  Page
                </span>
              </b-button>
            </div>
          </div>
        </template>
      </b-navbar>
    </div>
  </div>
</template>

<script>
import Menu from '@/components/backOffice/Menu.vue'

export default {
  components: {
    Menu
  },
  data () {
    return {
      show: true,
      window: {
        width: 0,
        height: 0
      },
      open: false
    }
  },
  watch: {
    showOneColumn (val) {
      if (!val) {
        this.show = true
      } else {
        this.show = false
      }
    }
  },
  computed: {
    showOneColumn () {
      if (this.window.width < 769) return true
      return false
    }
  },
  methods: {
    handleResize () {
      this.window.width = window.innerWidth
      this.window.height = window.innerHeight
    }
  },
  created () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  mounted () {
    this.show = false
  },
  destroyed () {
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>
