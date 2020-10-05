<template>
  <div>
    <div class="">
      <p class="title is-4 has-text-centered has-text-white is-size-5-mobile">
        Liste des filleules
      </p>
      <div class="box">
      <div class="level">
        <div class="level-left">
          <p class="is-size-5">
            Gain total acquis:
            <span class="has-text-weight-bold has-text-primary is-size-4">
              {{total}} FCFA
            </span>
          </p>
        </div>
        <div class="level-right">
          <b-button type="is-primary" @click="$buefy.toast.open('En cours développement ...')">
            Demander un transfert
          </b-button>
        </div>
      </div>
        <b-table
          id="tab_tarif"
          :data="dataTab"
          :columns="columns"
          header-class="has-text-white"
          paginated
          :per-page="10">
          <template slot="empty">
            <div class="container has-text-centered">
              Aucun filleule
            </div>
          </template>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { listeChild } from '@/api/achat'
import { mapState } from 'vuex'

export default {
  data: () => ({
    columns: [
      {
        field: 'lastDateAchat',
        label: 'Date',
        headerClass: 'has-text-primary'
      },
      {
        field: 'nom',
        label: 'Nom',
        headerClass: 'has-text-primary'
      },
      {
        field: 'prenom',
        label: 'Prenom',
        headerClass: 'has-text-primary'
      },
      {
        field: 'gain',
        label: 'Gain (FCFA)',
        headerClass: 'has-text-primary',
        numeric: true
      }
    ],
    dataTab: [],
    isLoading: false
  }),
  computed: {
    ...mapState({
      getUser: 'user'
    }),
    total () {
      if (!this.dataTab.length) return 0
      return this.dataTab.map(el => el.gain)
        .reduce((a, b) => a + b)
    }
  },
  methods: {
    async getList () {
      this.isLoading = true
      const res = await listeChild(this.getUser.identifiant)
      this.dataTab = res.data
      this.isLoading = false
    },
    formatDate: (date) => moment(date).format('L'),
    onPageChange (page) {
      this.page = page
      this.getList()
    }
  },
  async mounted () {
    await this.getList()
  }
}
</script>

<style>

</style>
