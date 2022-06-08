<template>
  <div class="content">
    <div class="row">
      <div class="col-12">
        <div>
          <div class="row" v-if="reservationsAgence.data.length != 0">
            <div class="col-md-12">
              <input
                aria-label="label"
                type="text"
                v-model="search"
                placeholder="Chercher une réservation : exemple par date 2020-10-01"
                style="
                  border: 1px solid #ebebeb;
                  width: 100%;
                  height: 50px;
                  margin-bottom: 10px;
                "
              />
            </div>
          </div>

          <div
            class="table-responsive text-left"
            style="border: solid 1px #9b9b9b"
            v-if="filteredRes.length > 0"
          >
            <br />
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col" style="text-transform: none">Code</th>
                  <th scope="col" style="text-transform: none">Agence</th>
                  <th scope="col" style="text-transform: none">Date</th>
                  <th scope="col" style="text-transform: none">Pack</th>
                  <th scope="col" style="text-transform: none">Voyageur</th>
                  <!-- <th scope="col" class="col-md-1">Places</th> -->
                  <th scope="col" style="text-transform: none">Prix</th>

                  <th scope="col" style="text-transform: none">
                    <center>Actions</center>
                  </th>
                  <th scope="col" style="text-transform: none">Payé</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="res in filteredRes"
                  v-bind:key="res.id"
                  :style="[
                    res.readv == 0
                      ? { 'background-color': '#e7f1fd' }
                      : { 'background-color': 'none' },
                  ]"
                >
                  <td>{{ res.code }}</td>
                  <td>
                    <span style="font-size: 11.5px">{{ res.nom_agence }}</span>
                  </td>
                  <td>{{ res.date }}</td>
                  <td>
                    <span style="font-size: 13px">{{ res.titre }}</span>
                  </td>
                  <td>{{ res.nom }} {{ res.prenom }}</td>
                  <!-- <td class="col-md-1">{{reservation.nbr_place}}</td> -->
                  <td>{{ res.prix_total }}</td>

                  <td>
                    <center>
                      <router-link
                        v-if="res.deleted_at == null"
                        :to="{
                          name: 'show_reservation_agence',
                          params: { id: res.id, idp: res.idpack },
                        }"
                      >
                        <i
                          class="fa fa-eye mr-3 fa-md"
                          title="Valider la reservation"
                        ></i>
                      </router-link>
                      <div v-else>
                        <p>Supprimé</p>
                      </div>

                      <!-- <i
                        v-if="res.paye==0"
                        class="fa fa-trash text-danger fa-md"
                        title="Delete reservation"
                        @click="deleteReservation(res.id)"
                      ></i>

                      <i
                        v-if="res.paye==1"
                        class="fa fa-trash text-danger fa-md"
                        style="opacity:0.4"
                        title="Delete reservation"
                      ></i>-->
                    </center>
                  </td>

                  <td>
                    <i
                      v-if="res.paye == 1"
                      class="fa fa-times-circle text-danger fa-lg"
                    ></i>
                    <i
                      v-if="res.paye == 0"
                      class="fa fa-check-circle mr-3 fa-lg"
                      style="color: #62b062"
                    ></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            v-if="
              reservationsAgence.data.length == 0 && filteredRes.length == 0
            "
          >
            <p>Vous n'avez aucun réservation jusqu'au moment.</p>
          </div>

          <div
            v-if="filteredRes.length == 0 && reservationsAgence.data.length > 0"
          >
            <p>Votre recherche ne correspond à aucun pack.</p>
          </div>

          <pagination
            v-if="filteredRes.length != 0"
            :data="reservationsAgence"
            :limit="4"
            @pagination-change-page="fetchPaginate"
          ></pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BaseTable from "@/components/BaseTable";
import { Card } from "@/components/index";
import { apiDomain } from "../config";
const tableColumns = ["Titre", "Date_deb", "Date_fin", "Prix_fix"];
// const tableData = [this.packs];
export default {
  components: {
    Card,
    BaseTable,
  },
  data() {
    return {
      reservationsP: "",
      reservationsH: "",
      search: "",
      table1: {
        title: "Simple Table",
        columns: [...tableColumns],
        // data: [...this.packs]
      },
      reservationsAgence: { data: [] },
      reservationsHeb: { data: [] },
    };
  },

  computed: {
    filteredRes: function () {
      return this.reservationsAgence.data.filter((res) => {
        return res.code.match(this.search) || res.date.match(this.search);
      });
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
    this.fetchReservations(this.$store.state.propagence[0].id);
  },
  methods: {
    deleteReservation(id) {
      if (confirm("Are You Sure?")) {
        fetch(`${apiDomain}/api/reservation/delete/${id}`, {
          method: "delete",
        })
          .then((res) => res.json())
          .then((data) => {
            alert("Reservation Supprimée");
            window.location.reload();
          })
          .catch((err) => console.log(err));
      }
    },
    fetchPaginate(page) {
      if (typeof page === "undefined") {
        page = 1;
      }
      let vm = this;
      fetch(
        `${apiDomain}/api/reservation-agence-adagence/${this.$store.state.propagence[0].id}?page=` +
          page
      )
        .then((res) => res.json())
        .then((data) => {
          this.reservationsAgence = data.reservations;
        })
        .catch((err) => console.log(err));
    },
    fetchReservations(id) {
      fetch(
        `${apiDomain}/api/reservation-agence-adagence/${id}?token=${this.$store.state.token}`
      )
        .then((res) => res.json())
        .then((res) => {
          this.reservationsAgence = res.reservations;
          this.reservationsP = res.reservationsP;
          this.reservationsH = res.reservationsH;
          this.reservationsHeb = res.reservationsHeb;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
