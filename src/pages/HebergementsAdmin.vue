<template>
  <div class="content">
    <b-modal id="modal-updatePourcentage">
      <div>
        <form
          accept-charset="UTF-8"
          role="form"
          @submit.prevent="updatePourcentage"
        >
          <div class="row">
            <div class="col-md-6">
              <base-input placeholder="Pourcentage"> </base-input>
            </div>
          </div>
        </form>
      </div>
    </b-modal>

    <b-modal class="modal-contentmoez" id="modal-get-prix-total-hote2">
      <div>
        Les frais total de {{ hebergementLigne.nom }} non payé :
        {{ prix_total_hote }}
      </div>
    </b-modal>

    <router-link :to="{ name: 'nouveau_hebergement_admin' }">
      <button
        type="button"
        class="btn btn-outline-success mt-3"
        style="
          color: #fff;
          margin-bottom: 20px;
          border-radius: 18px 0px 18px 0px;
        "
      >
        <i class="fa fa-plus"></i>
        &nbsp;&nbsp;Nouveau Hébergement
      </button>
    </router-link>

    <button
      v-if="hebergements.length > 0"
      @click.once="sendMail"
      type="button"
      class="btn btn-warning mt-3"
      style="color: #fff; margin-bottom: 20px; float: right"
    >
      <i class="far fa-envelope"></i>
      &nbsp;&nbsp;Email
    </button>
    <div>
      <b-modal
        style="
          width: 468px !important;
          margin-top: 80px !important;
          margin-left: 30% !important;
        "
        id="modal-get-prix-total-hote"
      >
        <div class="mb-3">
          <div class="row" style="padding: 10px">
            Les frais total de {{ hebergementLigne.nom }} non payé :
            {{ prix_total_hote }}
          </div>
        </div>
      </b-modal>
    </div>

    <b-tabs card>
      <b-tab :title="filtered.length + ' ' + 'Hébergements'" active>
        <div class="row">
          <div class="col-md-12">
            <label style="line-height: 35px; color: #333; padding-top: 10px"
              >Chercher un hébergement:</label
            >
            <input
              aria-label="search"
              type="text"
              v-model="search"
              placeholder="Rechercher ..."
              style="border: 1px solid #ebebeb; width: 100%; height: 30px"
            />
            <br />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div
              v-if="hebergements.length != 0"
              class="table-responsive text-left"
              style="border: solid 1px #9b9b9b"
            >
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col" style="text-transform: none">Nom</th>
                    <th scope="col" style="text-transform: none">
                      Nombre des voyageurs
                    </th>
                    <th scope="col" style="text-transform: none">
                      Nombre des chambres
                    </th>
                    <th scope="col" style="text-transform: none">
                      Proprietaire
                    </th>

                    <th scope="col" style="text-transform: none">Ville</th>
                    <th scope="col" style="text-transform: none">
                      Pourcentage
                    </th>

                    <th scope="col" style="text-transform: none">
                      <center>Actions</center>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="hebergement in filtered"
                    v-bind:key="hebergement.id"
                    :style="[
                      hebergement.read == 0
                        ? { 'background-color': '#e0eeff' }
                        : { 'background-color': 'none' },
                    ]"
                  >
                    <td>{{ hebergement.hebnom }}</td>
                    <td>{{ hebergement.nbr_voyageurs }}</td>
                    <td>{{ hebergement.nbr_chambre_dispo }}</td>
                    <td>
                      <span
                        >{{ hebergement.nom }} {{ hebergement.prenom }}</span
                      >
                    </td>

                    <td>
                      <b-badge
                        style="font-size: 12px !important"
                        variant="info"
                        >{{ hebergement.nomville }}</b-badge
                      >
                    </td>

                    <td>
                      <span>{{ hebergement.pourcentage }} %</span>&nbsp;

                      <i
                        v-b-modal.modal-updatePourcentage
                        @click.prevent="fetchHotePourcentage(hebergement.id)"
                        style="color: rgb(255 0 49)"
                        title="Modifier le pourcentage"
                        class="tim-icons icon-pencil"
                      ></i
                      >&nbsp; &nbsp;

                      <i
                        v-b-modal.modal-get-prix-total-hote
                        @click.prevent="
                          fetchGetPrix(hebergement.id);
                          fetchHebergementId(hebergement.id);
                        "
                        style="color: #62b062"
                        title="Voir prix total des frais"
                        class="tim-icons icon-coins"
                      ></i>
                    </td>
                    <td>
                      <center>
                        <router-link
                          :to="{
                            name: 'show_hebergement_admin',
                            params: { id: hebergement.id },
                          }"
                        >
                          <i
                            style="color: blue"
                            title="Détails du client"
                            class="tim-icons icon-send"
                          ></i>
                          &nbsp;
                        </router-link>

                        <router-link
                          :to="{
                            name: 'edit_hebergement_admin',
                            params: { id: hebergement.id },
                          }"
                        >
                          <i
                            style="color: #62b062"
                            title="Modifier l'hébergement"
                            class="tim-icons icon-pencil"
                          ></i
                          >&nbsp;
                        </router-link>
                        <i
                          onmouseover="this.style.cursor='pointer'"
                          style="color: #fd5d93"
                          class="tim-icons icon-simple-remove"
                          @click="deleteHebergement(hebergement.id)"
                        ></i>
                      </center>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-else>
              <card>
                <p>Pas d'hébergements disponible pour le moment</p>
              </card>
            </div>
          </div>
        </div>
      </b-tab>

      <b-tab title="Corbeille">
        <div class="row">
          <div class="col-md-12">
            <label style="line-height: 35px; color: #333; padding-top: 10px"
              >Chercher un hébergement:</label
            >
            <input
              aria-label="search"
              type="text"
              v-model="search"
              placeholder="Rechercher ..."
              style="border: 1px solid #ebebeb; width: 100%; height: 30px"
            />
            <br />
          </div>
        </div>
        <template #title>
          {{ filteredCorbeit.length }} Corbeille
          <i
            style="color: red !important"
            class="fa fa-trash text-danger fa-lg"
            title="Clients"
          ></i>
        </template>

        <div
          class="table-responsive text-left"
          style="border: solid 1px #9b9b9b"
        >
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col" style="text-transform: none">Nom</th>
                <th scope="col" style="text-transform: none">
                  Nombre des voyageurs
                </th>
                <th scope="col" style="text-transform: none">
                  Nombre des chambres
                </th>
                <th scope="col" style="text-transform: none">Proprietaire</th>
                <th scope="col" style="text-transform: none">
                  <center>Actions</center>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="hebergement in filteredCorbeit"
                v-bind:key="hebergement.id"
                :style="[
                  hebergement.read == 0
                    ? { 'background-color': '#e0eeff' }
                    : { 'background-color': 'none' },
                ]"
              >
                <td>{{ hebergement.hebnom }}</td>
                <td>{{ hebergement.nbr_voyageurs }}</td>
                <td>{{ hebergement.nbr_chambre_dispo }}</td>
                <td>
                  <span>{{ hebergement.nom }} {{ hebergement.prenom }}</span>
                </td>
                <td>
                  <center>
                    <i
                      onmouseover="this.style.cursor='pointer'"
                      style="color: green"
                      class="fas fa-trash-restore"
                      @click="restoreHebergement(hebergement.id)"
                    ></i>
                    &nbsp;
                    <i
                      onmouseover="this.style.cursor='pointer'"
                      style="color: #fd5d93"
                      class="fas fa-trash-alt"
                      @click="ForcedeleteHebergement(hebergement.id)"
                    ></i>
                  </center>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </b-tab>
    </b-tabs>
  </div>
</template>
<script>
import BaseTable from "@/components/BaseTable";
import { Card } from "@/components/index";
import { apiDomain } from "../config";
const tableColumns = ["Titre", "Date_deb", "Date_fin", "Prix_fix"];
export default {
  components: {
    Card,
    BaseTable,
  },
  data() {
    return {
      search: "",
      prix_total_hote: "",
      hebergementLigne: {},
      get_pourcenage_hote: {},
      table1: {
        title: "Simple Table",
        columns: [...tableColumns],
      },
      packs: {},
      hebergements: {},
      hebergementscorbeille: {},
      hebergementsUnread: [],
    };
  },

  computed: {
    filtered: function () {
      if (Array.isArray(this.hebergements)) {
        return this.hebergements.filter((pack) => {
          return (
            pack.hebnom.toLowerCase().match(this.search.toLowerCase()) ||
            pack.nomville.toLowerCase().match(this.search.toLowerCase())
          );
        });
      }
    },
    filteredCorbeit: function () {
      if (Array.isArray(this.hebergementscorbeille)) {
        return this.hebergementscorbeille.filter((pack) => {
          return (
            pack.nom.toLowerCase().match(this.search.toLowerCase()) ||
            pack.hebnom.toLowerCase().match(this.search.toLowerCase())
          );
        });
      }
    },
    loggedIn() {
      return this.$store.getters.get_loggedIn;
    },

    user() {
      return this.$store.getters.get_user;
    },
  },
  created() {
    this.fetchHebergements();
  },
  methods: {
    fetchGetPrix(id) {
      fetch(`${apiDomain}/api/get_frais_reservation_hote/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.prix_total_hote = res;
        })
        .catch((err) => console.log(err));
    },

    fetchHotePourcentage(id) {
      fetch(`${apiDomain}/api/get_pourcenage_hote/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.get_pourcenage_hote = res;
        })
        .catch((err) => console.log(err));
    },
    fetchHebergementId(id) {
      fetch(`${apiDomain}/api/hebergement/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.hebergementLigne = res.hebergement;
        })
        .catch((err) => console.log(err));
    },

    restoreHebergement(id) {
      axios
        .post(`${apiDomain}/api/restore/hebergement/${id}`)
        .then((response) => {
          if (response.status == 200) {
            this.$noty.success("Bien restaurée.");
            this.fetchHebergements();
          }
        });
    },
    deleteHebergement(id) {
      if (confirm("Are You Sure?")) {
        fetch(`${apiDomain}/api/hebergement/${id}`, {
          method: "delete",
        })
          .then((res) => res.json())
          .then((data) => {
            this.$noty.success("L'hébergement a été bien supprimé...", {
              killer: true,
              timeout: 6000,
              layout: "topRight",
            });
            this.fetchHebergements();
          })
          .catch((err) => console.log(err));
      }
    },

    ForcedeleteHebergement(id) {
      if (confirm("Are You Sure?")) {
        fetch(`${apiDomain}/api/force/hebergement/${id}`, {
          method: "delete",
        })
          .then((res) => res.json())
          .then((data) => {
            this.$noty.success("L'hébergement a été bien supprimé...", {
              killer: true,
              timeout: 6000,
              layout: "topRight",
            });
            this.fetchHebergements();
          })
          .catch((err) => console.log(err));
      }
    },
    sendMail() {
      axios.post(`${apiDomain}/api/hebergement/mail`).then((response) => {
        if (response.status == 200) {
          this.$noty.success("Email Envoyé.");
        }
      });
    },
    fetchHebergements() {
      fetch(`${apiDomain}/api/allhebergements`)
        .then((res) => res.json())
        .then((res) => {
          this.hebergements = res.hebergements;
          this.hebergementscorbeille = res.hebergementscorbeille;

          this.hebergementsUnread = res.hebergementsUnread;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
<style>
#modal-get-prix-total-hote2 {
  margin-top: 100px !important;
}

.modal-contentmoez {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  width: 47%;
  margin-top: 100px;
  pointer-events: auto;
  background-color: #ffffff;
  background-clip: padding-box;
  border: 1px solid rgba(34, 42, 66, 0.2);
  border-radius: 0.2857rem;
  -webkit-box-shadow: 0px 10px 50px 0px rgb(0 0 0 / 50%);
  box-shadow: 0px 10px 50px 0px rgb(0 0 0 / 50%);
  outline: 0;
}
</style>