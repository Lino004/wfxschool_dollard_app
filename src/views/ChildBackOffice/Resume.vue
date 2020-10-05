<template>
  <div>
    <div class="columns is-multiline py-5">
      <!-- Vos filleules -->
      <div class="column">
        <div class="box">
          <div class="media align-center">
            <div class="media-left">
              <b-icon
                icon="account-multiple"
                size="is-large"
                type="is-primary">
              </b-icon>
            </div>
            <div class="media-content has-text-centered">
              <p class="is-size-5 has-text-weight-bold">Vos filleules</p>
              <h4 class="is-size-4 has-text-weight-bold has-text-primary">
                0
              </h4>
            </div>
          </div>
        </div>
      </div>
      <!-- Achats ($) -->
      <div class="column">
        <div class="box">
          <div class="media align-center">
            <div class="media-left">
              <b-icon
                icon="cart"
                size="is-large"
                type="is-primary">
              </b-icon>
            </div>
            <div class="media-content has-text-centered">
              <p class="is-size-5 has-text-weight-bold">Achats ($)</p>
              <h4 class="is-size-4 has-text-weight-bold has-text-primary">
                5000
              </h4>
            </div>
          </div>
        </div>
      </div>
      <!-- Solde (FCFA) -->
      <div class="column">
        <div class="box">
          <div class="media align-center">
            <div class="media-left">
              <b-icon
                icon="scale-balance"
                size="is-large"
                type="is-primary">
              </b-icon>
            </div>
            <div class="media-content has-text-centered">
              <p class="is-size-5 has-text-weight-bold">Gain (FCFA)</p>
              <h4 class="is-size-4 has-text-weight-bold has-text-primary">
                0
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-12">
        <div class="box">
        <p class="is-size-5 has-text-weight-bold">Dernières transactions</p>
          <b-table
            id="tab_tarif"
            :data="dataTab"
            header-class="has-text-white">
            <template v-for="column in columns">
              <b-table-column :key="column.id" v-bind="column">
                <template v-slot="props">
                  <div v-if="column.field === 'date'">
                    {{ formatDate(props.row[column.field]) }}
                  </div>
                  <div v-else>
                    {{ props.row[column.field] }}
                  </div>
                </template>
              </b-table-column>
            </template>
          </b-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { listeAchatUser, resume } from '@/api/achat'
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
    resume: {}
  }),
  computed: {
    ...mapState({
      getUser: 'user'
    })
  },
  methods: {
    formatDate: date => moment(date).format('L'),
    async getList () {
      this.isLoading = true
      const res = await listeAchatUser(this.getUser.identifiant, 1, 10)
      this.dataTab = res.data.liste
      this.isLoading = false
    }
  },
  async mounted () {
    await this.getList()
    const res = await resume(this.getUser.identifiant)
    console.log(res)
  }
}
</script>

<style>

</style>
