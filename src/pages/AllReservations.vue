<template>
  <div class="content">
    <router-link :to="{ name: 'nouvelle_reservation' }">
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
        &nbsp;&nbsp;Nouvelle Réservation
      </button>
    </router-link>
    <div class="row">
      <div class="col-12">
        <card>
          <b-tabs card>
            <b-tab :title="filtered.length + ' ' + 'Réservations pack'" active>
              <div class="row">
                <div class="col-md-12">
                  <label
                    style="line-height: 35px; color: #333; padding-top: 10px"
                    >Chercher une réservation:</label
                  >
                  <input
                    aria-label="search"
                    type="text"
                    v-model="search"
                    placeholder="exemple par date: 2020-10-01"
                    style="border: 1px solid #ebebeb; width: 100%; height: 42px"
                  />
                  <br />
                </div>
              </div>

              <div
                class="table-responsive text-left"
                style="border: solid 1px #9b9b9b"
              >
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col" style="text-transform: none">Code</th>

                      <th scope="col" style="text-transform: none">Détails</th>
                      

                      <th scope="col" style="text-transform: none">
                        Prix total
                      </th>
                      <th scope="col" style="text-transform: none">Voyageur</th>
                      <th scope="col" style="text-transform: none">Date</th>
<th scope="col" style="text-transform: none">Type</th>
                      <th scope="col" style="text-transform: none">
                        <center>Actions</center>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="reservation in filtered"
                      v-bind:key="reservation.id"
                      :style="[
                        reservation.read == 0
                          ? { 'background-color': '#e7f1fd' }
                          : { 'background-color': 'none' },
                      ]"
                    >
                      <td>{{ reservation.code }}</td>
                      <td>
                        {{ reservation.nbr_place }} places
                        <br />
                        {{ reservation.pack_res.titre }}
                      </td>
                      
                      <td>{{ reservation.prix_total }} Dt</td>

                      <td>
                        {{ reservation.client.nom }}
                        {{ reservation.client.prenom }}
                      </td>
                      <td>{{ reservation.date }}</td>
<td>
                        <span class="badge badge-secondary" v-if="reservation.type_paiement=='offline'">{{ reservation.type_paiement}}</span>
                        <span class="badge badge-info"  v-if="reservation.type_paiement=='en ligne'">{{ reservation.type_paiement}}</span>
                      </td>
                      <td>
                        <center>
                          <router-link
                            :to="{
                              name: 'show_reservation',
                              params: { id: reservation.id },
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
                              name: 'edit_reservation',
                              params: { id: reservation.id },
                            }"
                          >
                            <i
                              style="color: #62b062"
                              title="Modifier la réservation"
                              class="tim-icons icon-pencil"
                            ></i
                            >&nbsp;
                          </router-link>
                          <i
                            style="color: #fd5d93"
                            class="tim-icons icon-simple-remove"
                            title="Delete reservation"
                            @click="deleteReservation(reservation.id)"
                          ></i>
                        </center>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </b-tab>
            <b-tab title="Corbeille">
              <template #title>
                {{ filteredCorbeit.length }} Corbeille
                <i
                  style="color: red !important"
                  class="fa fa-trash text-danger fa-lg"
                  title="Corbeille réservetions packs"
                ></i>
              </template>
              <div class="row">
                <div class="col-md-12">
                  <label
                    style="line-height: 35px; color: #333; padding-top: 10px"
                    >Chercher une réservation:</label
                  >
                  <input
                    aria-label="search"
                    type="text"
                    v-model="search"
                    placeholder="exemple par date: 2020-10-01"
                    style="border: 1px solid #ebebeb; width: 100%; height: 42px"
                  />
                  <br />
                </div>
              </div>

              <div
                class="table-responsive text-left"
                style="border: solid 1px #9b9b9b"
              >
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col" style="text-transform: none">Code</th>

                      <th scope="col" style="text-transform: none">Détails</th>
                      <th scope="col" style="text-transform: none">
                        Prix total
                      </th>
                      <th scope="col" style="text-transform: none">Voyageur</th>
                      <th scope="col" style="text-transform: none">Date</th>
                      <th scope="col" style="text-transform: none">
                        Date de suppression
                      </th>

                      <th scope="col" style="text-transform: none">
                        <center>Actions</center>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="reservation in filteredCorbeit"
                      v-bind:key="reservation.id"
                      :style="[
                        reservation.read == 0
                          ? { 'background-color': '#e7f1fd' }
                          : { 'background-color': 'none' },
                      ]"
                    >
                      <td>{{ reservation.code }}</td>
                      <td>
                        {{ reservation.nbr_place }} places
                        <br />
                        <span v-if="reservation.pack != null">{{
                          reservation.pack.titre
                        }}</span>
                        <span v-else>Le pack a été supprimé</span>
                      </td>
                      <td>{{ reservation.prix_total }}</td>

                      <td>
                        <span v-if="reservation.client != null"
                          >{{ reservation.client.nom }}
                          {{ reservation.client.prenom }}</span
                        >

                        <span v-else>Le client a été supprimé</span>
                      </td>

                      <td>{{ reservation.date }}</td>
                      <td>{{ reservation.deleted_at }}</td>

                      <td>
                        <center>
                          <!-- <router-link
                            :to="{name:'show_reservation', params: { id:reservation.id} }"
                          >
                            <i
                              style="color:blue"
                              title="Détails du client"
                              class="tim-icons icon-send"
                            ></i>
                            &nbsp;
                          </router-link>

                          <router-link
                            :to="{name:'edit_reservation', params: { id:reservation.id} }"
                          >
                            <i
                              style="color:#62b062"
                              title="Modifier la réservation"
                              class="tim-icons icon-pencil"
                            ></i>&nbsp;
                          </router-link>-->
                          <i
                            onmouseover="this.style.cursor='pointer'"
                            style="color: green"
                            class="fas fa-trash-restore"
                            @click="restoreReservation(reservation.id)"
                          ></i>
                          &nbsp;
                          <i
                            style="color: #fd5d93"
                            class="fas fa-trash-alt"
                            title="Delete reservation"
                            @click="ForcedeleteReservation(reservation.id)"
                          ></i>
                        </center>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </b-tab>

            <b-tab
              :title="
                filteredReserHeb.length + ' ' + 'Réservations aux hébergements'
              "
            >
              <div class="row">
                <div class="col-md-12">
                  <label
                    style="line-height: 35px; color: #333; padding-top: 10px"
                    >Chercher une réservation:</label
                  >
                  <input
                    aria-label="search"
                    type="text"
                    v-model="search"
                    placeholder="exemple par date: 2020-10-01"
                    style="border: 1px solid #ebebeb; width: 100%; height: 42px"
                  />
                  <br />
                </div>
              </div>

              <div
                class="table-responsive text-left"
                style="border: solid 1px #9b9b9b"
              >
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col" style="text-transform: none">Code</th>

                      <th scope="col" style="text-transform: none">
                        Hébergement
                      </th>
                      <th scope="col" style="text-transform: none">Date</th>
                      <th scope="col" style="text-transform: none">Voyageur</th>
                      <th scope="col" style="text-transform: none">Prix</th>
                      <th scope="col" style="text-transform: none">Type</th>


                      <th scope="col" style="text-transform: none">
                        <center>Actions</center>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="reservation in filteredReserHeb"
                      v-bind:key="reservation.id"
                      :style="[
                        reservation.read == 0
                          ? { 'background-color': '#e7f1fd' }
                          : { 'background-color': 'none' },
                      ]"
                    >
                      <td>{{ reservation.code }}</td>
                      <td>{{ reservation.hebergementres.nom }}</td>
                      <td>{{ reservation.created_at }}</td>
                      <td>
                        {{ reservation.client.nom }}
                        {{ reservation.client.prenom }}
                      </td>
                      <td>{{ reservation.prix_total }}Dt</td>
                      <td>
                         <span class="badge badge-secondary" v-if="reservation.type_paiement=='offline'">{{ reservation.type_paiement}}</span>
                        <span class="badge badge-info"  v-if="reservation.type_paiement=='en ligne'">{{ reservation.type_paiement}}</span>

                      </td>


                      <td>
                        <center>
                          <router-link
                            :to="{
                              name: 'show_reservation_libre_admin',
                              params: { id: reservation.id },
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
                              name: 'edit_reservation_libre',
                              params: { id: reservation.id },
                            }"
                          >
                            <i
                              style="color: #62b062"
                              title="Modifier la réservation"
                              class="tim-icons icon-pencil"
                            ></i
                            >&nbsp;
                          </router-link>
                          <i
                            style="color: #fd5d93"
                            class="tim-icons icon-simple-remove"
                            title="Delete reservation"
                            @click="deleteReservationHeb(reservation.id)"
                          ></i>
                        </center>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </b-tab>

            <b-tab title="Corbeille">
              <template #title>
                {{ filteredReserHebCorbeile.length }} Corbeille
                <i
                  style="color: red !important"
                  class="fa fa-trash text-danger fa-lg"
                  title="Corbeille réservations hébergements"
                ></i>
              </template>
              <div class="row">
                <div class="col-md-12">
                  <label
                    style="line-height: 35px; color: #333; padding-top: 10px"
                    >Chercher une réservation:</label
                  >
                  <input
                    aria-label="search"
                    type="text"
                    v-model="search"
                    placeholder="exemple par date: 2020-10-01"
                    style="border: 1px solid #ebebeb; width: 100%; height: 42px"
                  />
                  <br />
                </div>
              </div>

              <div
                class="table-responsive text-left"
                style="border: solid 1px #9b9b9b"
              >
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col" style="text-transform: none">Code</th>

                      <th scope="col" style="text-transform: none">
                        Hébergement
                      </th>
                      <th scope="col" style="text-transform: none">Date</th>
                      <th scope="col" style="text-transform: none">Voyageur</th>
                      <th scope="col" style="text-transform: none">Prix</th>
                      <th scope="col" style="text-transform: none">
                        Date de suppression
                      </th>

                      <th scope="col" style="text-transform: none">
                        <center>Actions</center>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="reservation in filteredReserHebCorbeile"
                      v-bind:key="reservation.id"
                      :style="[
                        reservation.read == 0
                          ? { 'background-color': '#e7f1fd' }
                          : { 'background-color': 'none' },
                      ]"
                    >
                      <td>{{ reservation.code }}</td>
                      <td>
                        <span v-if="reservation.hebergement != null">{{
                          reservation.hebergement.nom
                        }}</span>
                      </td>
                      <td>{{ reservation.created_at }}</td>
                      <td>
                        <span v-if="reservation.hebergement != null"
                          >{{ reservation.client.nom }}
                          {{ reservation.client.prenom }}</span
                        >
                      </td>

                      <td>{{ reservation.prix_total }}</td>
                      <td>{{ reservation.deleted_at }}</td>

                      <td>
                        <center>
                          <i
                            onmouseover="this.style.cursor='pointer'"
                            style="color: green"
                            class="fas fa-trash-restore"
                            @click="restoreReservationHeb(reservation.id)"
                          ></i>
                          &nbsp;
                          <i
                            style="color: #fd5d93"
                            class="fas fa-trash-alt"
                            title="Delete reservation"
                            @click="ForcedeleteReservationHeb(reservation.id)"
                          ></i>
                        </center>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </b-tab>
          </b-tabs>
        </card>
      </div>
    </div>
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
      table1: {
        title: "Simple Table",
        columns: [...tableColumns],
      },
      packs: {},
      reservationsUnread: [],
      reservationslUnread: [],
      reservations: {},
      reservationscorbeille: {},
      reservationslcorbeille: {},
      reservationsl: [],
    };
  },

  computed: {
    filteredReserHeb: function () {
      if (Array.isArray(this.reservationsl)) {
        return this.reservationsl.filter((pack) => {
          return pack.created_at.toLowerCase().match(this.search.toLowerCase());
        });
      }
    },
    filteredReserHebCorbeile: function () {
      if (Array.isArray(this.reservationslcorbeille)) {
        return this.reservationslcorbeille.filter((pack) => {
          return pack.created_at.toLowerCase().match(this.search.toLowerCase());
        });
      }
    },
    /* ********* */
    filtered: function () {
      if (Array.isArray(this.reservations)) {
        return this.reservations.filter((pack) => {
          return pack.date.toLowerCase().match(this.search.toLowerCase());
        });
      }
    },
    filteredCorbeit: function () {
      if (Array.isArray(this.reservationscorbeille)) {
        return this.reservationscorbeille.filter((pack) => {
          return (
            pack.date.toLowerCase().match(this.search.toLowerCase()) ||
            pack.type_paiement.toLowerCase().match(this.search.toLowerCase())
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
    this.fetchReservations();
  },
  methods: {
    restoreReservation(id) {
      axios
        .post(`${apiDomain}/api/restore/reservation/${id}`)
        .then((response) => {
          if (response.status == 200) {
            this.$noty.success("Bien restaurée.");
            this.fetchReservations();
          }
        });
    },

    restoreReservationHeb(id) {
      axios
        .post(`${apiDomain}/api/restore/reservationHeb/${id}`)
        .then((response) => {
          if (response.status == 200) {
            this.$noty.success("Bien restaurée.");
            this.fetchReservations();
          }
        });
    },
    fetchReservations() {
      fetch(`${apiDomain}/api/allreservations?token=${this.$store.state.token}`)
        .then((res) => res.json())
        .then((res) => {
          this.reservations = res.reservations;
          this.reservationscorbeille = res.reservationscorbeille;
          this.reservationsl = res.reservationsl;
          this.reservationslcorbeille = res.reservationslcorbeille;
          this.reservationsUnread = res.reservationsUnread;
          this.reservationslUnread = res.reservationslUnread;
        })
        .catch((err) => console.log(err));
    },
    fetchPacks() {
      fetch(`${apiDomain}/api/allpacks?token=${this.$store.state.token}`)
        .then((res) => res.json())
        .then((res) => {
          this.packs = res.packs;
        })
        .catch((err) => console.log(err));
    },

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

    deleteReservationHeb(id) {
      if (confirm("Are You Sure?")) {
        fetch(`${apiDomain}/api/reservation-libre/${id}`, {
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

    ForcedeleteReservation(id) {
      if (confirm("Cette réservation sera supprimé définitivement?")) {
        fetch(`${apiDomain}/api/reservation/force/delete/${id}`, {
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

    ForcedeleteReservationHeb(id) {
      if (confirm("Cette réservation sera supprimé définitivement?")) {
        fetch(`${apiDomain}/api/reservation-libre/force/delete/${id}`, {
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
  },
};
</script>