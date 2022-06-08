<template>
  <div class="content">
    <div>
      <b-tabs card>
        <!-- Reservation en ligne -->

        <b-tab title="Reservation en ligne">
          <template #title>
            Reservation aux circuits &nbsp;
            <span class="badge badge-warning" style="background-color: red">{{
              reservationsLigne.length
            }}</span>
          </template>

          <div class="row">
            <div class="col-md-4">
              <div class="form-group">
                <input
                  v-model="search"
                  class="form-control"
                  aria-label="label"
                  type="text"
                  placeholder="Chercher par titre , date :2021-12-10,date ... "
                />
              </div>
            </div>
          </div>
          <div>
            <div
              class="table-responsive text-left"
              style="border: solid 1px #9b9b9b"
            >
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col" style="text-transform: none">Code</th>
                    <th scope="col" style="text-transform: none">
                      Type Paiement
                    </th>
                    <th scope="col" style="text-transform: none">Date</th>
                    <th scope="col" style="text-transform: none">Circuit</th>
                    <th scope="col" style="text-transform: none">Statut</th>

                    <th scope="col" style="text-transform: none">Prix</th>

                    <th scope="col">
                      <center style="text-transform: none">Actions</center>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    :style="[
                      reservation.readv == 0
                        ? { 'background-color': '#e7f1fd' }
                        : { 'background-color': 'none' },
                    ]"
                    v-for="reservation in filtered"
                    v-bind:key="reservation.id"
                  >
                    <td>{{ reservation.code }}</td>
                    <td>
                      <span style="font-size: 13px">{{
                        reservation.type_paiement
                      }}</span>
                    </td>
                    <td>{{ reservation.date }}</td>
                    <td>
                      <router-link
                        target="_blank"
                        :to="{
                          name: 'Pack',
                          params: { id: reservation.pack_id },
                        }"
                      >
                        <span style="font-size: 13px">{{
                          reservation.titre
                        }}</span>
                      </router-link>
                    </td>
                    <td>
                      <span class="payer" v-if="reservation.paye == 0"
                        >Payée</span
                      >
                      <span class="annuler" v-if="reservation.annule == 1"
                        >Annulée</span
                      >
                      <span class="en_attente" v-if="reservation.paye == 1"
                        >En attente</span
                      >
                    </td>

                    <td>{{ reservation.prix_total }} DT</td>

                    <td>
                      <center>
                        <router-link
                          :to="{
                            name: 'show_reservation_client',
                            params: {
                              id: reservation.id,
                              ville_id: reservation.ville_id,
                            },
                          }"
                        >
                          <i
                            class="tim-icons icon-send"
                            title="Consulter la réservation"
                          ></i> </router-link
                        >&nbsp;
                        <!-- <router-link
                          v-if="
                            reservation.paye == 1 && reservation.annule == 0
                          "
                          :to="{
                            name: 'edit_reservation_client',
                            params: {
                              id: reservation.id,
                              idp: reservation.pack_id,
                            },
                          }"
                        >
                          <i
                            class="tim-icons icon-pencil"
                            style="color: #62b062"
                            title="Modifier la réservation"
                          ></i>
                        </router-link>

                        <i
                          v-else
                          class="tim-icons icon-pencil"
                          style="color: #62b062; opacity: 0.5"
                          title="Modification désactivée"
                        ></i> -->
                      </center>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <pagination
              :limit="4"
              :data="reservationsWithSearch"
              @pagination-change-page="getResults"
              class="mt-5"
            ></pagination>
          </div>

          <div v-if="filtered.length == 0">
            <p style="margin-top: 10px">Pas de réservations encore</p>
          </div>
        </b-tab>

        <b-tab title="Réservations aux hébergements">
          <template #title>
            Réservations aux hébergements &nbsp;
            <span class="badge badge-warning" style="background-color: red">{{
              resheb
            }}</span>
          </template>
          <!-- <div class="row" v-if="filteredReservationsLibre.length!=0"> -->

          <div class="row">
            <div class="col-md-4">
              <div class="form-group">
                <input
                  v-model="searchLibre"
                  class="form-control"
                  aria-label="label"
                  type="text"
                  placeholder="Chercher par hébergement , date :2021-12-10 ,code ... "
                />
              </div>
            </div>
          </div>

          <div
            class="table-responsive text-left"
            v-if="filteredReservationsLibre.length > 0"
            style="border: solid 1px #9b9b9b"
          >
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col" style="text-transform: none">Code</th>
                  <th scope="col" style="text-transform: none">Hébergement</th>
                  <th scope="col" style="text-transform: none">Date Début</th>
                  <th scope="col" style="text-transform: none">Date Fin</th>

                  <th scope="col" style="text-transform: none">Prix</th>
                  <th scope="col">
                    <center style="text-transform: none">Actions</center>
                  </th>
                  <th scope="col">Type Paiement</th>
                  <th scope="col">Statue</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  :style="[
                    reservation.readv == 0
                      ? { 'background-color': '#e7f1fd' }
                      : { 'background-color': 'none' },
                  ]"
                  v-for="reservation in filteredReservationsLibre"
                  v-bind:key="reservation.id"
                >
                  <td>{{ reservation.code }}</td>
                  <td>
                    <span style="font-size: 11.5px">{{ reservation.nom }}</span>
                  </td>
                  <td>{{ reservation.du }}</td>
                  <td>{{ reservation.au }}</td>

                  <td>{{ reservation.prix_total }} DT</td>

                  <td>
                    <center>
                      <router-link
                        :to="{
                          name: 'ShowReservationClientClinet',
                          params: {
                            id: reservation.id,
                            ville_id: reservation.ville_id,
                          },
                        }"
                      >
                        <i
                          class="tim-icons icon-send"
                          title="Consulter la réservation"
                        ></i>
                      </router-link>

                      <!--  <i
                        v-if="reservation.paye == 1"
                        class="fa fa-trash text-danger fa-lg"
                        style="opacity: 0.4"
                        title="Delete reservation"
                      ></i> -->
                    </center>
                  </td>
                  <td>{{ reservation.type_paiement }}</td>
                  <td></td>

                  <td>
                    <span class="payer_heb" v-if="reservation.paye == 0"
                      >Payée</span
                    >
                    <span class="annuler_heb" v-if="reservation.annule == 1"
                      >Annulée</span
                    >
                    <span class="en_attente_heb" v-if="reservation.paye == 1"
                      >En attente</span
                    >
                  </td>
                  <!--    <i
                      v-if="reservation.paye == 0"
                      class="fa fa-check-circle mr-3 fa-lg"
                      style="color: #62b062"
                    ></i>
                    <i
                      v-if="reservation.paye == 1"
                      class="fa fa-times-circle text-danger fa-lg"
                    ></i>
                  </td> -->
                </tr>
              </tbody>
            </table>
          </div>

          <div v-else>
            <p style="margin-top: 10px">Pas de réservations encore</p>
          </div>
        </b-tab>

        <b-tab title="Mes points bonus">
          <template #title>
            Mes points bonus &nbsp;
            <span class="badge badge-warning" style="background-color: red"
              >{{ SommeBonus }} Pts</span
            >
          </template>

          <div
            class="table-responsive text-left"
            style="border: solid 1px #9b9b9b"
            v-if="SommeBonus != 500"
          >
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col" style="text-transform: none">
                    Date de réservation
                  </th>
                  <th scope="col" style="text-transform: none">
                    Type de réservation
                  </th>
                  <!--  <th scope="col" style="text-transform: none">
                    Type de paiement
                  </th> -->
                  <th scope="col" style="text-transform: none">points</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="reservation in mesBonus" v-bind:key="reservation.id">
                  <!--   v-if="reservation.reservation != null" -->
                  <td>
                    <span style="font-size: 11.5px">{{
                      reservation.created_at
                    }}</span>
                  </td>
                  <td>
                    <span
                      v-if="
                        reservation.reservation_heb_id == null &&
                        reservation.point != 500
                      "
                    >
                      réservation de circuit</span
                    >
                    <span
                      v-if="
                        reservation.reservation_id == null &&
                        reservation.point != 500
                      "
                    >
                      réservation de Maison d'hote</span
                    >
                    <span v-if="reservation.point == 500">
                      suite a votre inscription</span
                    >
                  </td>

                  <!--    <td>{{ reservation.reservation.type_paiement }}</td> -->
                  <td>{{ reservation.point }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p style="font-size: 18px">
            Suite a votre inscription vous avez 500 points bonus.
          </p>
          <h3 style="color: red">Total:{{ SommeBonus }} points</h3>
        </b-tab>
      </b-tabs>
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
      reservationsLigne: {},
      reservationsWithSearchAgence: {},
      q: "",
      reservationsWithSearchDate: {},
      reservationsWithSearch: {},
      type_recherche: "",
      resheb: "",
      reslength: "",
      search: "",
      searchLibre: "",
      table1: {
        title: "Simple Table",
        columns: [...tableColumns],
        // data: [...this.packs]
      },
      client: {},
      reservationspack: {},
      reservations: {},
      mesBonus: {},
      SommeBonus: {},
    };
  },

  computed: {
    filtered: function () {
      if (Array.isArray(this.reservationsLigne)) {
        return this.reservationsLigne.filter((pack) => {
          return (
            pack.titre.toLowerCase().match(this.search.toLowerCase()) ||
            pack.date.match(this.search) ||
            pack.code.match(this.search)
          );
        });
      }
    },
    filteredReservationsPack: function () {
      if (Array.isArray(this.reservationspack)) {
        return this.reservationspack.filter((reservation) => {
          return (
            reservation.code.match(this.search) ||
            reservation.nom_agence.match(this.search) ||
            reservation.date.match(this.search) ||
            reservation.prenom.match(this.search)
          );
        });
      }
    },

    filteredReservationsLibre: function () {
      if (Array.isArray(this.reservations)) {
        return this.reservations.filter((reservation) => {
          return (
            reservation.code.match(this.searchLibre) ||
            reservation.nom.match(this.searchLibre) ||
            reservation.du.match(this.searchLibre) ||
            reservation.prenom.match(this.searchLibre) ||
            reservation.code.match(this.searchLibre)
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
    this.fetchMesPointsBonus(this.$store.state.user.id);

    this.fetchReservations(this.$store.state.user.id);
    this.fetchReservationsPack(this.$store.state.user.id);
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
    fetchReservationsPack(id) {
      if (this.q.length > 1) {
        axios
          .get(
            `${apiDomain}/api/reservation-client/${this.$store.state.user.id}/` +
              this.q +
              `?token=${this.$store.state.token}`
          )
          .then(
            (response) => (
              (this.reservationsWithSearch = response.data.reservations.data),
              (this.reservationsWithSearchDate = response.data.reservationsd),
              (this.reservationsWithSearchAgence = response.data.reservationsag)
            )
          )
          .catch((error) => console.log(error));
      } else {
        axios
          .get(
            `${apiDomain}/api/reservation-client/${this.$store.state.user.id}?token=${this.$store.state.token}`
          )
          .then(
            (response) =>
              (this.reservationsWithSearch = response.data.reservations.data)(
                (this.reservationsLigne = response.data.reservationsLigne)
              ) /* ,
            (this.reservationsLigne = response.data.reservationsLigne.data) */
          )
          .catch((error) => console.log(error));
      }
    },
    getResults(page = 1) {
      axios
        .get(
          `${apiDomain}/api/reservation-client/${this.$store.state.user.id}?page=` +
            page +
            `?token=${this.$store.state.token}`
        )
        .then((response) => {
          this.reservationsWithSearch = response.data.reservations;
        });
    },

    fetchReservations(id) {
      fetch(
        `${apiDomain}/api/reservation-client-heb/${id}?token=${this.$store.state.token}`
      )
        .then((res) => res.json())
        .then((res) => {
          this.reservations = res.reservations;
          this.resheb = res.resheb;
        })
        .catch((err) => console.log(err));
    },

    fetchMesPointsBonus(id) {
      fetch(`${apiDomain}/api/get_Bonu/${this.$store.state.user.id}`)
        .then((res) => res.json())
        .then((res) => {
          this.SommeBonus = res.SommeBonus;
          this.mesBonus = res.mesBonus;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
<style>
.annuler {
  position: absolute;
  background: #f10735;
  opacity: 0.8;
  display: inline-block;
  padding: 0 10px;
  color: #fff;
  font-size: 13px;
  font-weight: 500;
  z-index: 1;
  margin-left: -1.4%;
  /*  margin-top: -15.6%; */

  margin-top: -23.6% !important;

  height: 30px;
  line-height: 30px;
  border-radius: 15px;
}

.payer {
  font-size: 13px;
  position: absolute;
  background: #28e40c;
  opacity: 0.8;
  display: inline-block;
  padding: 0 10px;
  color: #fff;
  font-size: 13px;
  font-weight: 500;
  z-index: 1;
  margin-left: -1.4%;
  margin-top: -1.3%;
  height: 30px;
  line-height: 30px;
  border-radius: 15px;
}

.en_attente {
  background: #f39507;

  font-size: 13px;
  position: absolute;

  opacity: 0.8;
  display: inline-block;
  padding: 0 10px;
  color: #fff;
  font-size: 13px;
  font-weight: 500;
  z-index: 1;
  margin-left: -1.4%;
  margin-top: -1.3%;
  height: 30px;
  line-height: 30px;
  border-radius: 15px;
}

/* hebergement */
.annuler_heb {
  position: absolute;
  background: #f10735;
  opacity: 0.8;
  display: inline-block;
  padding: 0 10px;
  color: #fff;
  font-size: 13px;
  font-weight: 500;
  z-index: 1;
  margin-left: -10.4%;
  /*  margin-top: -15.6%; */

  margin-top: -23.6% !important;

  height: 30px;
  line-height: 30px;
  border-radius: 15px;
}

.payer_heb {
  font-size: 13px;
  position: absolute;
  background: #28e40c;
  opacity: 0.8;
  display: inline-block;
  padding: 0 10px;
  color: #fff;
  font-size: 13px;
  font-weight: 500;
  z-index: 1;
  margin-left: -10.4%;
  margin-top: -1.3%;
  height: 30px;
  line-height: 30px;
  border-radius: 15px;
}

.en_attente_heb {
  background: #f39507;

  font-size: 13px;
  position: absolute;

  opacity: 0.8;
  display: inline-block;
  padding: 0 10px;
  color: #fff;
  font-size: 13px;
  font-weight: 500;
  z-index: 1;
  margin-left: -10.4%;
  margin-top: -1.3%;
  height: 30px;
  line-height: 30px;
  border-radius: 15px;
}
</style>