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
              <p class="is-size-5 has-text-weight-bold">Solde (FCFA)</p>
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
            :columns="columns"
            header-class="has-text-white">
          </b-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

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
        field: 'qtt',
        label: 'Quantité ($)',
        headerClass: 'has-text-primary',
        numeric: true
      },
      {
        field: 'prix',
        label: 'Prix Unit. (FCFA)',
        headerClass: 'has-text-primary',
        numeric: true
      },
      {
        field: 'total',
        label: 'Total (FCFA)',
        headerClass: 'has-text-primary',
        numeric: true
      }
    ],
    dataTab: [{
      date: moment().format('L'),
      description: 'Achat de dollar',
      qtt: 50,
      prix: 620,
      total: 31000
    }]
  }),
  methods: {
    formatDate: date => moment(date).format('L')
  }
}
</script>

<style>

</style>
