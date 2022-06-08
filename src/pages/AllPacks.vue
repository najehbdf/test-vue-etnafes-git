<template>
  <div class="content">
    <router-link :to="{ name: 'nouveau_pack' }">
      <button
        type="button"
        class="btn btn-outline-success mt-3"
        style="
          color: #fff;
          margin-bottom: 5px;
          border-radius: 18px 0px 18px 0px;
        "
      >
        <i class="fa fa-plus"></i>
        &nbsp;&nbsp;Nouveau Pack
      </button>
    </router-link>

    <button
      @click="sendMail"
      type="button"
      class="btn btn-warning mt-3"
      style="color: #fff; margin-bottom: 5px; float: right"
    >
      <i class="far fa-envelope"></i>
      &nbsp;&nbsp;Email
    </button>

    <b-tabs card>
      <b-tab :title="filtered.length + ' ' + 'Packs'" active>
        <div class="col-md-4">
          <div class="form-group">
            <input
              v-model="search"
              class="form-control"
              aria-label="label"
              type="text"
              placeholder="Chercher ... "
            />
          </div>
        </div>
        <div
          class="table-responsive text-left"
          style="border: solid 1px #9b9b9b"
        >
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col" style="text-transform: none">Titre</th>
                <th scope="col" style="text-transform: none">Ajouté par</th>

                <th scope="col" style="text-transform: none">Date début</th>
                <th scope="col" style="text-transform: none">Duré</th>
                <th scope="col" style="text-transform: none">Prix fix</th>
                <th scope="col" style="text-transform: none">Valide</th>

                <th scope="col" style="text-transform: none">
                  <center>Actions</center>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="pack in filtered"
                v-bind:key="'pack' + pack.id"
                :style="[
                  pack.read == 0 && pack.adagence_id != null
                    ? { 'background-color': '#e0eeff' }
                    : { 'background-color': 'none' },
                ]"
              >
                <td>{{ pack.titre }}</td>
                <td>
                  <p v-if="pack.agence">Autre</p>
                  <p v-else>Admin</p>
                </td>

                <td>{{ pack.date_deb }}</td>
                <td>{{ pack.time }}</td>
                <td>{{ pack.prix_fix }} DNT</td>
                <td>
                  <i
                    v-if="pack.valide == 0"
                    class="fa fa-times-circle text-danger fa-lg"
                    title="En attente de validation "
                  ></i>

                  <i
                    v-if="pack.valide == 1"
                    class="fa fa-check-circle"
                    title="Pack validé"
                    style="color: #62b062"
                  ></i>
                </td>

                <td>
                  <center>
                    <router-link
                      :to="{ name: 'show_pack', params: { id: pack.id } }"
                    >
                      <i
                        style="color: blue"
                        title="Détails du pack"
                        class="tim-icons icon-send"
                      ></i
                      >&nbsp;
                    </router-link>

                    <router-link
                      :to="{ name: 'edit_pack', params: { id: pack.id } }"
                    >
                      <i
                        style="color: #62b062"
                        title="Modifier le pack"
                        class="tim-icons icon-pencil"
                      ></i
                      >&nbsp;
                    </router-link>
                    <i
                      style="color: #fd5d93"
                      title="Delete pack"
                      class="tim-icons icon-simple-remove"
                      @click="deletePack(pack.id)"
                    ></i>
                  </center>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </b-tab>

      <b-tab :title="packscorbeille.data.length + ' ' + 'Corbeille'">
        <div class="col-md-4">
          <div class="form-group">
            <input
              v-model="search"
              class="form-control"
              aria-label="label"
              type="text"
              placeholder="Chercher ... "
            />
          </div>
        </div>
        <template #title>
          {{ packscorbeille.data.length }} Corbeille
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
                <th scope="col" style="text-transform: none">Titre</th>
                <th scope="col" style="text-transform: none">Ajouté par</th>

                <th scope="col" style="text-transform: none">Date début</th>
                <th scope="col" style="text-transform: none">Date fin</th>
                <th scope="col" style="text-transform: none">Prix fix</th>
                <th scope="col" style="text-transform: none">Valide</th>

                <th scope="col" style="text-transform: none">
                  <center>Actions</center>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="pack in packscorbeille.data"
                v-bind:key="'pack' + pack.id"
                :style="[
                  pack.read == 0 && pack.adagence_id != null
                    ? { 'background-color': '#e0eeff' }
                    : { 'background-color': 'none' },
                ]"
              >
                <td>{{ pack.titre }}</td>
                <td>
                  <p v-if="pack.agence">Autre</p>
                  <p v-else>Admin</p>
                </td>

                <td>{{ pack.date_deb }}</td>
                <td>{{ pack.date_fin }}</td>
                <td>{{ pack.prix_fix }}</td>
                <td>
                  <i
                    v-if="pack.valide == 0"
                    class="fa fa-times-circle text-danger fa-lg"
                    title="Pack validé"
                  ></i>

                  <i
                    v-if="pack.valide == 1"
                    class="fa fa-check-circle"
                    title="En attente de validation"
                    style="color: #62b062"
                  ></i>
                </td>

                <td>
                  <center>
                    <i
                      onmouseover="this.style.cursor='pointer'"
                      style="color: green"
                      class="fas fa-trash-restore"
                      @click="restorePack(pack.id)"
                    ></i>
                    &nbsp;
                    <i
                      style="color: #fd5d93"
                      title="Delete pack"
                      class="fas fa-trash-alt"
                      @click="ForcedeletePack(pack.id)"
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
      table1: {
        title: "Simple Table",
        columns: [...tableColumns],
      },
      packs: {},
      packscorbeille: {},
      packdetail: {},
      search: "",
    };
  },

  computed: {
    filtered: function () {
      if (Array.isArray(this.packs)) {
        return this.packs.filter((pack) => {
          return (
            pack.titre.toLowerCase().match(this.search.toLowerCase()) ||
            pack.date_deb.toLowerCase().match(this.search.toLowerCase())
          );
        });
      }
    },
    filteredCorbeit: function () {
      if (Array.isArray(this.packscorbeille)) {
        return this.packscorbeille.filter((pack) => {
          return (
            pack.titre.toLowerCase().match(this.search.toLowerCase()) ||
            pack.date_deb.toLowerCase().match(this.search.toLowerCase())
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
    this.fetchPacks();
  },
  methods: {
    restorePack(id) {
      axios.post(`${apiDomain}/api/restore/pack/${id}`).then((response) => {
        if (response.status == 200) {
          this.$noty.success("Bien restaurée.");
          this.fetchPacks();
        }
      });
    },
    sendMail() {
      axios.post(`${apiDomain}/api/pack/mail`).then((response) => {
        if (response.status == 200) {
          this.$noty.success("Email Envoyé.");
        }
      });
    },
    fetchPacks() {
      fetch(`${apiDomain}/api/allpacks/admin?token=${this.$store.state.token}`)
        .then((res) => res.json())
        .then((res) => {
          this.packs = res.packsM;
          this.packscorbeille = res.packscorbeille;
          this.packsUnread = res.packsUnread;
        })
        .catch((err) => console.log(err));
    },

    fetchPack(id) {
      fetch(`${apiDomain}/api/packs/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.packdetail = res.packdetail;
        })
        .catch((err) => console.log(err));
    },

    deletePack(id) {
      if (confirm("Are You Sure?")) {
        fetch(`${apiDomain}/api/pack/delete/${id}`, {
          method: "delete",
        })
          .then((res) => res.json())
          .then((data) => {
            alert("Pack Supprimée");
            window.location.reload();
          })
          .catch((err) => console.log(err));
      }
    },
    ForcedeletePack(id) {
      if (confirm("Ce pack sera supprimé définitivement?")) {
        fetch(`${apiDomain}/api/pack/force/delete/${id}`, {
          method: "delete",
        })
          .then((res) => res.json())
          .then((data) => {
            alert("Pack Supprimée");
            window.location.reload();
          })
          .catch((err) => console.log(err));
      }
    },
  },
};
</script>

<style>
.card.card-timeline .timeline > li > .timeline-badge {
  color: #fff;
  width: 50px;
  height: 50px;
  line-height: 51px;
  font-size: 1.4em;
  text-align: center;
  position: absolute;
  top: 16px;
  left: 50%;
  margin-left: -25px;
  background-color: #9a9a9a;
  z-index: 100;
  border-top-right-radius: 50%;
  border-top-left-radius: 50%;
  border-bottom-right-radius: 50%;
  border-bottom-left-radius: 50%;
}

.card.card-timeline .timeline-badge.success {
  background-color: #00bf9a !important;
}
</style>