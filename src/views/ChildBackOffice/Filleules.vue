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
          <b-button type="is-primary">
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
        field: 'email',
        label: 'Email',
        headerClass: 'has-text-primary'
      },
      {
        field: 'phone',
        label: 'Numéro',
        headerClass: 'has-text-primary'
      },
      {
        field: 'gain',
        label: 'Gain (FCFA)',
        headerClass: 'has-text-primary',
        numeric: true
      }
    ],
    dataTab: [
      {
        date: moment().format('L'),
        nom: 'Test',
        prenom: 'Permi',
        email: 'test@test.com',
        phone: '22912345678',
        gain: 1500
      },
      {
        date: moment().format('L'),
        nom: 'Test',
        prenom: 'Permi',
        email: 'test@test.com',
        phone: '22912345678',
        gain: 1500
      },
      {
        date: moment().format('L'),
        nom: 'Test',
        prenom: 'Permi',
        email: 'test@test.com',
        phone: '22912345678',
        gain: 1500
      },
      {
        date: moment().format('L'),
        nom: 'Test',
        prenom: 'Permi',
        email: 'test@test.com',
        phone: '22912345678',
        gain: 1500
      },
      {
        date: moment().format('L'),
        nom: 'Test',
        prenom: 'Permi',
        email: 'test@test.com',
        phone: '22912345678',
        gain: 1500
      },
      {
        date: moment().format('L'),
        nom: 'Test',
        prenom: 'Permi',
        email: 'test@test.com',
        phone: '22912345678',
        gain: 1500
      }
    ]
  }),
  computed: {
    total () {
      return this.dataTab.map(el => el.gain)
        .reduce((a, b) => a + b)
    }
  }
}
</script>

<style>

</style>
