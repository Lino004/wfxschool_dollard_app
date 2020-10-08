<template>
  <div>
    <div class="">
      <p class="title is-4 has-text-centered has-text-white is-size-5-mobile">
        Liste des achats des utilisateurs
      </p>
      <div class="box">
        <div class="level">
          <div class="level-left">
            <!-- <p class="is-size-5">
              Total des achats:
              <span class="has-text-weight-bold has-text-primary is-size-4">
                {{total}} FCFA
              </span>
            </p> -->
          </div>
        </div>
        <b-table
          id="tab_tarif"
          :data="dataTab"
          header-class="has-text-white"
          paginated
          backend-pagination
          :per-page="perPage"
          :current-page="page"
          :total="totalListe"
          @page-change="onPageChange"
          :loading="isLoading">
          <template v-for="column in columns">
            <b-table-column :key="column.id" v-bind="column">
              <template v-slot="props">
                <div v-if="column.field === 'date'">
                  {{ formatDate(props.row[column.field]) }}
                </div>
                <div v-else-if="column.field === 'valide'">
                  <b-button
                    :type="props.row[column.field] ? 'is-success' : 'is-danger'"
                    @click.stop="validate(props.row.id)">
                    {{ props.row[column.field] ? 'OUI' : 'NON' }}
                  </b-button>
                </div>
                <div v-else>
                  {{ props.row[column.field] }}
                </div>
              </template>
            </b-table-column>
          </template>
          <template slot="empty">
            <div class="container has-text-centered">
              Aucun achat
            </div>
          </template>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { listeAllAchatUser, valideAchat } from '@/api/achat'
import { mapState } from 'vuex'

export default {
  data: () => ({
    columns: [
      {
        field: 'user',
        label: 'Nom du client',
        headerClass: 'has-text-primary'
      },
      {
        field: 'tel',
        label: 'Téléphone',
        headerClass: 'has-text-primary'
      },
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
        field: 'adresse',
        label: 'Adresse',
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
      },
      {
        field: 'valide',
        label: 'Validation',
        headerClass: 'has-text-primary'
      }
    ],
    dataTab: [],
    perPage: 10,
    page: 1,
    totalListe: 0,
    total: 0,
    isLoading: false
  }),
  computed: {
    ...mapState({
      getUser: 'user'
    })
  },
  methods: {
    async getList () {
      this.isLoading = true
      const res = await listeAllAchatUser(this.getUser.identifiant, this.page, this.perPage)
      this.dataTab = res.data.liste.map(e => ({
        ...e,
        adresse: e.adressePm ? e.adressePm : e.adresseBitcoint,
        tel: `+${e.indicartif} ${e.phone}`,
        valide: false
      }))
      this.totalListe = res.data.totalListe
      this.total = res.data.totalSomme
      this.isLoading = false
    },
    formatDate: (date) => moment(date).format('L'),
    onPageChange (page) {
      this.page = page
      this.getList()
    },
    async validate (id) {
      const loadingComponent = this.$buefy.loading.open({ container: null })
      try {
        await valideAchat(id)
        this.getList()
        this.$buefy.toast.open({
          message: 'Achat validé',
          type: 'is-success'
        })
        loadingComponent.close()
      } catch (error) {
        if (error.response) {
          this.$buefy.toast.open({
            message: error.response.data.error,
            type: 'is-success'
          })
        }
        loadingComponent.close()
      }
    }
  },
  async mounted () {
    await this.getList()
  }
}
</script>

<style>

</style>
