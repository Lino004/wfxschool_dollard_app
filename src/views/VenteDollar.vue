<template>
  <div class="bg_degraded page-vente">
    <section class="hero is-fullheight page-vente_hero">
      <div class="columns flex-1 is-marginless">
        <div
          class="
            column flex-1 is-min-full-height has-background-white
            px-6 form_vente is-5 is-4-desktop box_shadow_1"
          v-show="!showOneColumn || show">
          <Infos :tranche-offres="trancheOffres"
                :tranche-offres-bitcoin="trancheOffresBitcoin"
                :isLoading="isLoading"/>
        </div>
        <div class="column flex-1 px-6 form_vente" v-show="!showOneColumn || !show">
          <Form :tranche-offres="trancheOffres"
                :tranche-offres-bitcoin="trancheOffresBitcoin"
                :isLoading="isLoading"/>
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
                  Offre
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
                  Formulaire
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
import {
  listeAllOffre
} from '@/api/achat'
import Infos from '@/components/venteDollard/Infos.vue'
import Form from '@/components/venteDollard/Form.vue'

export default {
  components: {
    Infos,
    Form
  },
  data () {
    return {
      show: true,
      window: {
        width: 0,
        height: 0
      },
      tranches: [],
      isLoading: false
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
    },
    trancheOffres () {
      return this.tranches.filter(el => el.type === 'PM').sort((a, b) => a.trancheInferieur - b.trancheInferieur)
    },
    trancheOffresBitcoin () {
      return this.tranches.filter(el => el.type === 'BITCOIN').sort((a, b) => a.trancheInferieur - b.trancheInferieur)
    }
  },
  methods: {
    handleResize () {
      this.window.width = window.innerWidth
      this.window.height = window.innerHeight
    },
    async getList () {
      this.isLoading = true
      try {
        const res = await listeAllOffre()
        this.tranches = res.data.map(el => ({
          ...el,
          trancheInferieur: parseInt(el.trancheInferieur),
          trancheSuperieur: parseInt(el.trancheSuperieur),
          prix: parseInt(el.prix)
        }))
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
      }
    }
  },
  created () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  mounted () {
    this.getList()
  },
  destroyed () {
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>
