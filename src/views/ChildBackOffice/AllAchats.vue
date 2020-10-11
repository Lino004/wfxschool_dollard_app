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
          :loading="isLoading"
          @select="selectAchat">
          <template v-for="column in columns">
            <b-table-column :key="column.id" v-bind="column">
              <template v-slot="props">
                <div v-if="column.field === 'status'">
                  <b-tag
                    :type="props.row[column.field] === 'VALIDER' ? 'is-success' : 'is-danger'"
                    @click.stop="validate(props.row.id)">
                    {{ props.row[column.field] }}
                  </b-tag>
                </div>
                <div v-else-if="column.field === 'actions'">
                  <div class="block">
                      <b-button
                        type="is-success"
                        icon-right="check"
                        size="is-small"/>
                  </div>
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
    <b-modal v-model="showDetailAchat" :width="520">
      <div class="card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            Détail de l'achat
          </p>
        </header>
        <div class="card-content">
          <div class="">
            <ul>
              <li>
                <div class="level is-mobile pb-1">
                  <div class="level-left has-text-weight-bold">Client:</div>
                  <div class="level-right"><b-tag type="is-primary">{{achatSelect.user}}</b-tag></div>
                </div>
              </li>
              <li>
                <div class="level is-mobile pb-1">
                  <div class="level-left has-text-weight-bold">Téléphone:</div>
                  <div class="level-right"><b-tag type="is-primary">{{achatSelect.tel}}</b-tag></div>
                </div>
              </li>
              <li v-if="achatSelect.adressePm">
                <div class="level is-mobile pb-1">
                  <div class="level-left has-text-weight-bold">Adresse PM:</div>
                  <div class="level-right"><b-tag type="is-primary">{{achatSelect.adressePm}}</b-tag></div>
                </div>
              </li>
              <li v-if="achatSelect.adresseBitcoin">
                <div class="level is-mobile pb-1">
                  <div class="level-left has-text-weight-bold">Adresse BITCOIN:</div>
                  <div class="level-right"><b-tag type="is-primary">{{achatSelect.adresseBitcoin}}</b-tag></div>
                </div>
              </li>
              <li>
                <div class="level is-mobile pb-1">
                  <div class="level-left has-text-weight-bold">Date de l'achat:</div>
                  <div class="level-right"><b-tag type="is-primary">{{achatSelect.date}}</b-tag></div>
                </div>
              </li>
              <li>
                <div class="level is-mobile pb-1">
                  <div class="level-left has-text-weight-bold">Description de l'achat:</div>
                  <div class="level-right"><b-tag type="is-primary">{{achatSelect.description}}</b-tag></div>
                </div>
              </li>
              <li v-if="achatSelect.adresseBitcoin">
                <div class="level is-mobile pb-1">
                  <div class="level-left has-text-weight-bold">Adresse BITCOIN:</div>
                  <div class="level-right"><b-tag type="is-primary">{{achatSelect.adresseBitcoin}}</b-tag></div>
                </div>
              </li>
              <li>
                <div class="level is-mobile pb-1">
                  <div class="level-left has-text-weight-bold">Date de l'achat:</div>
                  <div class="level-right"><b-tag type="is-primary">{{achatSelect.date}}</b-tag></div>
                </div>
              </li>
              <li>
                <div class="level is-mobile pb-1">
                  <div class="level-left has-text-weight-bold">Description de l'achat:</div>
                  <div class="level-right"><b-tag type="is-primary">{{achatSelect.description}}</b-tag></div>
                </div>
              </li>
              <li>
                <div class="level is-mobile pb-1">
                  <div class="level-left has-text-weight-bold">Prix unitaire:</div>
                  <div class="level-right"><b-tag type="is-primary">{{achatSelect.prixUnitaire}} FCFA</b-tag></div>
                </div>
              </li>
              <li>
                <div class="level is-mobile pb-1">
                  <div class="level-left has-text-weight-bold">Quantité:</div>
                  <div class="level-right"><b-tag type="is-primary">{{achatSelect.montantAchat}} $</b-tag></div>
                </div>
              </li>
              <li>
                <div class="level is-mobile pb-1">
                  <div class="level-left has-text-weight-bold">Total:</div>
                  <div class="level-right"><b-tag type="is-primary">{{achatSelect.sommePaye}} FCFA</b-tag></div>
                </div>
              </li>
              <li>
                <div class="level is-mobile pb-1">
                  <div class="level-left has-text-weight-bold">Statut:</div>
                  <div class="level-right">
                    <b-tag
                      :type="achatSelect.status === 'VALIDER' ? 'is-success' : 'is-danger'">
                      {{ achatSelect.status }}
                    </b-tag>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <footer class="modal-card-foot">
          <button
            class="button"
            @click="showDetailAchat = false">
            Fermer
          </button>
          <button
            class="button is-primary"
            v-if="achatSelect.status !== 'VALIDER'"
            @click.stop="validate(achatSelect.id)">
            Valider
          </button>
        </footer>
      </div>
    </b-modal>
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
      },
      {
        field: 'status',
        label: 'Statut',
        headerClass: 'has-text-primary'
      }
    ],
    dataTab: [],
    perPage: 10,
    page: 1,
    totalListe: 0,
    total: 0,
    isLoading: false,
    showDetailAchat: false,
    achatSelect: {}
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
        adresse: e.adressePm ? e.adressePm : e.adresseBitcoin,
        tel: `+${e.indicartif} ${e.phone}`,
        status: e.status.toUpperCase(),
        date: this.formatDate(e.date)
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
        this.showDetailAchat = false
      } catch (error) {
        if (error.response) {
          this.$buefy.toast.open({
            message: error.response.data.error,
            type: 'is-danger'
          })
        }
        loadingComponent.close()
      }
    },
    selectAchat (achat) {
      this.achatSelect = achat
      this.showDetailAchat = true
    }
  },
  async mounted () {
    await this.getList()
  }
}
</script>

<style>

</style>
