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
          per-page="5">
        </b-table>
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
    dataTab: [
      {
        date: moment().format('L'),
        description: 'Achat Dollars PM',
        qtt: 50,
        prix: 620,
        total: 31000
      }
    ]
  }),
  computed: {
    total () {
      return this.dataTab.map(el => el.total)
        .reduce((a, b) => a + b)
    }
  }
}
</script>

<style>

</style>
