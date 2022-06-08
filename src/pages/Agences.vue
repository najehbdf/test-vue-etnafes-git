<template>
  <div class="content">
    <b-tabs class="py-5" card>
      <b-tab title="Filiales" active>
        <div class="row">
          <div class="col-12">
            <div>
              <div class="row" v-if="agenceslength != 0">
                <div class="col-md-12">
                  <!-- <label style="line-height:35px;color:#333">Chercher une agence:</label> -->
                  <input
                    aria-label="search"
                    type="text"
                    v-model="search"
                    placeholder="Chercher une agence: recherche par nom"
                    style="
                      border: 1px solid #ebebeb;
                      width: 100%;
                      height: 30px;
                      margin-bottom: 10px;
                    "
                  />
                </div>
              </div>

              <div
                style="border: solid 1px #9b9b9b"
                class="table-responsive text-left"
                v-if="filteredAgenceslength != 0"
              >
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col" style="text-transform: none">Nom</th>
                      <th scope="col" style="text-transform: none">
                        Telephone
                      </th>
                      <th scope="col" style="text-transform: none">Email</th>
                      <th scope="col" style="text-transform: none">Adresse</th>
                      <th scope="col" style="text-transform: none">Statut</th>

                      <th scope="col" style="text-transform: none">
                        <center>Actions</center>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      :style="[
                        agence.readv == 0
                          ? { 'background-color': '#e7f1fd' }
                          : { 'background-color': 'none' },
                      ]"
                      v-for="agence in filteredAgences"
                      v-bind:key="agence.id"
                    >
                      <td>{{ agence.nom_agence }}</td>
                      <td>{{ agence.telephone }}</td>
                      <td>{{ agence.email }}</td>
                      <td>{{ agence.adresse }}</td>
                      <td>
                        <span v-if="agence.valide == 1">Vérifié</span>
                        <span v-else>Non Vérifié</span>
                      </td>

                      <td>
                        <center>
                          <router-link
                            :to="{
                              name: 'show_agence',
                              params: {
                                id: agence.id,
                                ville_id: agence.ville_id,
                              },
                            }"
                          >
                            <i
                              class="tim-icons icon-send"
                              title="Consulter l'agence"
                            ></i> </router-link
                          >&nbsp;
                          <router-link
                            :to="{
                              name: 'edit_agence',
                              params: { id: agence.id },
                            }"
                          >
                            <i
                              class="tim-icons icon-pencil"
                              style="color: #62b062"
                              title="Modifier l'agence"
                            ></i> </router-link
                          >&nbsp;
                          <!-- <i
                        v-if="agence.reservationpaye.length<0"
                        style="color: #fd5d93;"
                        class="tim-icons icon-simple-remove"
                        title="Delete agence"
                        @click="deleteAgence(agence.id)"
                      ></i>

                      <i
                        v-if="agence.reservationpaye.length>0"
                        style="color: #fd5d93;opacity:0.5"
                        class="tim-icons icon-simple-remove"
                        title="Delete agence"
                      ></i>-->
                        </center>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div v-if="agenceslength == 0 && filteredAgenceslength == 0">
                <p>Vous n'avez aucune agence jusqu'au moment.</p>
              </div>

              <div v-if="filteredAgenceslength == 0 && agenceslength > 0">
                <p>Votre recherche ne correspond à aucune agence.</p>
              </div>

              <pagination
                v-if="filteredAgenceslength != 0"
                :data="agences"
                :limit="4"
                @pagination-change-page="fetchAgencesPaginate"
              ></pagination>
            </div>
          </div>
        </div>
      </b-tab>
      <b-tab title="Ajouter Entreprise">
        <NouvelleAgence></NouvelleAgence>
      </b-tab>
      <b-tab title="Profil">
        <AgenceProfile></AgenceProfile>
      </b-tab>

      <!--    <b-tab disabled v-if="adagence.adagence == 0" title="Profil">
        <AgenceProfile></AgenceProfile>
      </b-tab> -->
    </b-tabs>
    <!-- <router-link :to="{name:'nouvelle_agence'}">
      <button
        type="button"
        class="btn btn-outline-success mt-3 btnajout"
        style="color:#fff;margin-bottom:20px;border-radius: 18px 0px 18px 0px;"
      >
        <i class="fa fa-plus"></i>
        &nbsp;&nbsp;Nouvelle Agence
      </button>
    </router-link>-->
  </div>
</template>
<script>
import NouvelleAgence from "./NouvelleAgence";
import AgenceProfile from "./AgenceProfile";

import BaseTable from "@/components/BaseTable";
import { Card } from "@/components/index";
import { apiDomain } from "../config";
const tableColumns = ["Titre", "Date_deb", "Date_fin", "Prix_fix"];

export default {
  components: {
    Card,
    BaseTable,
    NouvelleAgence,
    AgenceProfile,
  },
  data() {
    return {
      agenceslength: "",
      adagence: [],
      search: "",
      table1: {
        title: "Simple Table",
        columns: [...tableColumns],
      },
      agences: { data: [] },
    };
  },

  computed: {
    filteredAgenceslength() {
      return this.filteredAgences.length;
    },
    filteredAgences: function () {
      if (Array.isArray(this.agences.data)) {
        return this.agences.data.filter((agence) => {
          return (
            agence.nom_agence.match(this.search) ||
            agence.telephone.match(this.search)
          );
        });
      }
    },
    loggedIn() {
      return this.$store.getters.get_loggedIn;
    },
    propagence() {
      return this.$store.getters.get_propagence;
    },
    user() {
      return this.$store.getters.get_user;
    },
  },
  created() {
    this.fetchAgences(this.$store.state.propagence[0].id);
    this.fetchAdagence(this.$store.state.propagence[0].id);
  },
  methods: {
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
    fetchAgencesPaginate(page) {
      if (typeof page === "undefined") {
        page = 1;
      }
      let vm = this;
      fetch(
        `${apiDomain}/api/agences/admin/${this.$store.state.propagence[0].id}?page=` +
          page
      )
        .then((res) => res.json())
        .then((data) => {
          this.agences = data.agences;
        })
        .catch((err) => console.log(err));
    },
    fetchAdagence(id) {
      fetch(`${apiDomain}/api/adagence/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.adagence = res;
        })
        .catch((err) => console.log(err));
    },
    fetchAgences(id) {
      fetch(`${apiDomain}/api/agences/admin/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.agences = res.agences;
          this.agenceslength = res.agencesln;

          // this.agenceslength = res.agences.data.length;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>