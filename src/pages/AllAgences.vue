<template>
  <div class="content">
    <router-link :to="{ name: 'nouvelle_agence' }">
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
        &nbsp;&nbsp;Nouvelle Agence
      </button>
    </router-link>

    <button
      @click="sendMail"
      type="button"
      class="btn btn-warning mt-3"
      style="color: #fff; margin-bottom: 20px; float: right"
    >
      <i class="far fa-envelope"></i>
      &nbsp;&nbsp;Email
    </button>
    <b-tabs card>
      <b-tab :title="filtered.length + ' ' + 'Agences'">
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

                <th scope="col" style="text-transform: none">Ville</th>
                <th scope="col" style="text-transform: none">Telephone</th>
                <th scope="col" style="text-transform: none">Email</th>
                <th scope="col" style="text-transform: none">Valide</th>

                <th scope="col" style="text-transform: none">
                  <center>Actions</center>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="agence in filtered"
                v-bind:key="'agence' + agence.id"
                :style="[
                  agence.read == 0 && agence.adagence_id != null
                    ? { 'background-color': '#e0eeff' }
                    : { 'background-color': 'none' },
                ]"
              >
                <td>{{ agence.nom_agence }}</td>
                <td>
                  <p v-if="agence.admin_agence">
                    {{ agence.admin_agence.nom }}
                    {{ agence.admin_agence.prenom }}
                  </p>
                  <p v-else>Admin</p>
                </td>

                <td>{{ agence.ville.nom }}</td>
                <td>{{ agence.telephone }}</td>
                <td>{{ agence.email }}</td>
                <td>
                  <i
                    v-if="agence.valide == 0"
                    class="fa fa-times-circle text-danger fa-lg"
                    title="Pack validé"
                  ></i>

                  <i
                    v-if="agence.valide == 1"
                    class="fa fa-check-circle"
                    title="En attente de validation"
                    style="color: #62b062"
                  ></i>
                </td>

                <td>
                  <center>
                    <router-link
                      :to="{
                        name: 'show_agence_admin',
                        params: { id: agence.id },
                      }"
                    >
                      <i
                        style="color: blue"
                        title="Détails du client"
                        class="tim-icons icon-send"
                      ></i
                      >&nbsp;
                    </router-link>

                    <router-link
                      :to="{ name: 'edit_pack', params: { id: agence.id } }"
                    >
                      <i
                        style="color: #62b062"
                        title="Modifier le client"
                        class="tim-icons icon-pencil"
                      ></i
                      >&nbsp;
                    </router-link>
                    <i
                      onmouseover="this.style.cursor='pointer'"
                      style="color: #fd5d93"
                      title="Delete client"
                      class="tim-icons icon-simple-remove"
                      @click="deleteAgence(agence.id)"
                    ></i>
                  </center>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </b-tab>

      <b-tab title="Agences">
        <template #title>
          {{ agencescorbeille.length }} Corbeille
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

                <th scope="col" style="text-transform: none">Ville</th>
                <th scope="col" style="text-transform: none">Telephone</th>
                <th scope="col" style="text-transform: none">Email</th>
                <th scope="col" style="text-transform: none">Valide</th>

                <th scope="col" style="text-transform: none">
                  <center>Actions</center>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="agence in agencescorbeille"
                v-bind:key="'agence' + agence.id"
                :style="[
                  agence.read == 0 && agence.adagence_id != null
                    ? { 'background-color': '#e0eeff' }
                    : { 'background-color': 'none' },
                ]"
              >
                <td>{{ agence.nom_agence }}</td>
                <td>
                  <p v-if="agence.admin_agence">
                    {{ agence.admin_agence.nom }}
                    {{ agence.admin_agence.prenom }}
                  </p>
                  <p v-else>Admin</p>
                </td>

                <td>{{ agence.ville.nom }}</td>
                <td>{{ agence.telephone }}</td>
                <td>{{ agence.email }}</td>
                <td>
                  <i
                    v-if="agence.valide == 0"
                    class="fa fa-times-circle text-danger fa-lg"
                    title="Pack validé"
                  ></i>

                  <i
                    v-if="agence.valide == 1"
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
                      @click="restoreAgence(agence.id)"
                    ></i>
                    &nbsp;
                    <i
                      onmouseover="this.style.cursor='pointer'"
                      style="color: #fd5d93"
                      title="Delete client"
                      class="fas fa-trash-alt"
                      @click="ForcedeleteAgence(agence.id)"
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
      agencescorbeille: {},
      packs: {},
      packdetail: {},
      search: "",
    };
  },

  computed: {
    filtered: function () {
      if (Array.isArray(this.packs)) {
        return this.packs.filter((pack) => {
          return (
            pack.nom_agence.toLowerCase().match(this.search.toLowerCase()) ||
            pack.ville.nom.toLowerCase().match(this.search.toLowerCase())
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
    this.fetchAgences();
  },
  methods: {
    restoreAgence(id) {
      axios.post(`${apiDomain}/api/restore/agence/${id}`).then((response) => {
        if (response.status == 200) {
          this.$noty.success("Bien restaurée.");
          this.fetchAgences();
        }
      });
    },
    sendMail() {
      axios.post(`${apiDomain}/api/agence/mail`).then((response) => {
        if (response.status == 200) {
          this.$noty.success("Email Envoyé.");
        }
      });
    },
    fetchAgences() {
      fetch(`${apiDomain}/api/allagences`)
        .then((res) => res.json())
        .then((res) => {
          this.packs = res.agences;
          this.agencescorbeille = res.agencescorbeille;
          this.packsUnread = res.agencesUnread;
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

    deleteAgence(id) {
      if (confirm("Are You Sure?")) {
        fetch(`${apiDomain}/api/agence/delete/${id}`, {
          method: "delete",
        })
          .then((res) => res.json())
          .then((data) => {
            alert("Agence Supprimée");
            window.location.reload();
          })
          .catch((err) => console.log(err));
      }
    },

    ForcedeleteAgence(id) {
      if (confirm("Cet agence sera supprimée définitivement?")) {
        fetch(`${apiDomain}/api/agence/force/delete/${id}`, {
          method: "delete",
        })
          .then((res) => res.json())
          .then((data) => {
            alert("Agence Supprimée");
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