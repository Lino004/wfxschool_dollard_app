<template>
  <div>
    <div class="">
      <p class="title is-4 has-text-centered has-text-white is-size-5-mobile">
        Liste des achats
      </p>
      <div class="box">
        <div class="level">
          <div class="level-left">
            <p class="is-size-5">
              Total des achats:
              <span class="has-text-weight-bold has-text-primary is-size-4">
                {{total}} FCFA
              </span>
            </p>
          </div>
        </div>
        <b-table
          id="tab_tarif"
          :data="dataTab"
          :columns="columns"
          header-class="has-text-white"
          paginated
          :per-page="perPage"
          :current-page="page"
          :loading="isLoading">
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { listeAchatUser } from '@/api/achat'
import { mapState } from 'vuex'

export default {
  data: () => ({
    columns: [
      {
        field: 'date',
        label: 'Date',
        headerClass: 'has-text-primary'
      },
      {
        field: 'description',
        label: 'Description',
        headerClass: 'has-text-primary'
      },
      {
        field: 'montantAchat',
        label: 'Quantité ($)',
        headerClass: 'has-text-primary',
        numeric: true
      },
      {
        field: 'prixUnitaire',
        label: 'Prix Unit. (FCFA)',
        headerClass: 'has-text-primary',
        numeric: true
      },
      {
        field: 'sommePaye',
        label: 'Total (FCFA)',
        headerClass: 'has-text-primary',
        numeric: true
      }
    ],
    dataTab: [],
    perPage: 2,
    page: 1,
    isLoading: false
  }),
  computed: {
    ...mapState({
      getUser: 'user'
    }),
    total () {
      if (!this.dataTab.length) return 0
      return this.dataTab.map(el => parseInt(el.sommePaye))
        .reduce((a, b) => a + b)
    }
  },
  methods: {
    async getList () {
      this.isLoading = true
      this.dataTab = (await listeAchatUser(this.getUser.identifiant, this.page, this.perPage)).data
      this.isLoading = false
    },
    formatDate: (date) => moment(date).format('L')
  },
  async mounted () {
    await this.getList()
  }
}
</script>

<style>

</style>
