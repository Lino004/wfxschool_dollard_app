<template>
  <div>
    <div class="">
      <p class="title is-4 has-text-centered has-text-white is-size-5-mobile">
        Liste des Offres
      </p>
      <div class="box">
        <div class="subtitle" v-if="!offreSelect">
          Ajouter une offre
        </div>
        <div class="subtitle" v-else>
          Modifier l'offre
        </div>
        <div class="columns is-multiline">
          <div class="column">
            <b-field label="Tranche inférieur">
              <b-input placeholder="Tranche inférieur"
                type="number"
                v-model="offre.trancheInferieur">
              </b-input>
            </b-field>
          </div>
          <div class="column">
            <b-field label="Tranche supérieur">
              <b-input placeholder="Tranche supérieur"
                type="number"
                v-model="offre.trancheSuperieur">
              </b-input>
            </b-field>
          </div>
          <div class="column">
            <b-field label="Pris de l'offre">
              <b-input placeholder="Pris de l'offre"
                type="number"
                v-model="offre.prix">
              </b-input>
            </b-field>
          </div>
          <div class="column">
            <b-field label="Type offre">
              <b-select placeholder="Type d'offre" v-model="offre.type">
                <option value="PM">PM</option>
                <option value="BITCOIN">BITCOIN</option>
            </b-select>
            </b-field>
          </div>
          <div class="column">
            <div v-if="!offreSelect">
              <label for="ok" class="label has-text-transparent">""</label>
              <b-button @click="addOffre" expanded type="is-primary">Ajouter</b-button>
            </div>
            <div v-else>
              <b-button @click="offreSelect = null" expanded type="" class="mb-1">Annuler</b-button>
              <b-button @click="updateOffre(offreSelect)" expanded type="is-primary">Modifer</b-button>
            </div>
          </div>
        </div>
        <b-table
          id="tab_offres"
          :data="dataOffres"
          header-class="has-text-white"
          paginated
          :per-page="perPage"
          :current-page="page"
          :loading="isLoading"
          @select="row => {
            offreSelect = row.offre
            offre = row.offre
          }">
          <template v-for="column in columns">
            <b-table-column :key="column.id" v-bind="column">
              <template v-slot="props">
                <div v-if="column.field === 'delete'">
                  <div class="block">
                    <b-button
                      type="is-danger"
                      icon-right="delete"
                      size="is-small"
                      @click.stop="deleteOffre(props.row.offre.id)"/>
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
              Aucun offres
            </div>
          </template>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
import {
  listeAllOffre,
  addOffre,
  updateOffre,
  deleteOffre
} from '@/api/achat'
import { mapState } from 'vuex'
import cloneDeep from 'lodash/cloneDeep'

export default {
  data: () => ({
    columns: [
      {
        field: 'tranche',
        label: 'Tranche',
        headerClass: 'has-text-primary'
      },
      {
        field: 'type',
        label: 'Type',
        headerClass: 'has-text-primary'
      },
      {
        field: 'prix',
        label: 'Prix (FCFA)',
        headerClass: 'has-text-primary',
        numeric: true
      },
      {
        field: 'delete',
        label: 'Supprimer',
        headerClass: 'has-text-primary',
        numeric: true
      }
    ],
    tranches: [],
    dataTab: [],
    perPage: 10,
    page: 1,
    totalListe: 0,
    total: 0,
    isLoading: false,
    offre: {
      trancheInferieur: 0,
      trancheSuperieur: 0,
      prix: 0,
      type: 'PM'
    },
    offreSelect: null
  }),
  computed: {
    ...mapState({
      getUser: 'user'
    }),
    dataOffres () {
      return this.tranches.map(el => {
        if (parseInt(el.trancheSuperieur) === 0) {
          return {
            offre: el,
            type: el.type,
            tranche: `À partie de ${el.trancheInferieur}$`,
            prix: el.prix
          }
        }
        return {
          offre: el,
          type: el.type,
          tranche: `${el.trancheInferieur}$ - ${el.trancheSuperieur}$`,
          prix: el.prix
        }
      })
    }
  },
  methods: {
    async getList () {
      this.isLoading = true
      try {
        const res = await listeAllOffre()
        this.tranches = res.data
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
      }
    },
    onPageChange (page) {
      this.page = page
      this.getList()
    },
    async addOffre () {
      const loadingComponent = this.$buefy.loading.open({ container: null })
      try {
        await addOffre(this.offre)
        this.$buefy.toast.open({
          message: 'Offre enregistrée',
          type: 'is-success'
        })
        this.offre = {}
        this.getList()
        loadingComponent.close()
      } catch (error) {
        loadingComponent.close()
      }
    },
    async updateOffre (data) {
      const loadingComponent = this.$buefy.loading.open({ container: null })
      const offre = cloneDeep(data)
      delete offre.id
      try {
        await updateOffre(data.id, offre)
        this.$buefy.toast.open({
          message: 'Offre modifiée',
          type: 'is-success'
        })
        this.offre = {}
        this.getList()
        loadingComponent.close()
      } catch (error) {
        loadingComponent.close()
      }
    },
    async deleteOffre (id) {
      const loadingComponent = this.$buefy.loading.open({ container: null })
      try {
        await deleteOffre(id)
        this.$buefy.toast.open({
          message: 'Offre supprimée',
          type: 'is-success'
        })
        this.offre = {}
        this.getList()
        loadingComponent.close()
      } catch (error) {
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
