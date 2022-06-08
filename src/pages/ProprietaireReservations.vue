<template>
  <div class="content">
    <div>
      <b-card no-body>
        <b-tabs card>
          <b-tab title="Réservations pack" active>
            <template #title>
              Réservations pack
              <span class="badge badge-pill badge-success">{{reservationspUnread}}</span>
            </template>
            <div class="row" v-if="reservationspack.data.length!=0">
              <div class="col-md-12">
                <!-- <label
                  style="line-height:35px;color:#333;padding-top:25px"
                >Chercher une réservation:</label>-->
                <input
                  aria-label="label"
                  type="text"
                  v-model="search"
                  placeholder="Chercher une réservation: exemple par date: 2020-10-01"
                  style="border:1px solid #ebebeb;width:100%;height:30px;margin-top:15px;"
                />
              </div>
            </div>
            <br />
            <div
              class="table-responsive text-left"
              style="border:solid 1px #9b9b9b;"
              v-if="filteredReservationsPack.length!=0"
            >
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col" style="text-transform: none;">Code</th>

                    <th scope="col" style="text-transform: none;">Hébergement</th>
                    <th scope="col" style="text-transform: none;">Date</th>
                    <th scope="col" style="text-transform: none;">Voyageur</th>
                    <!-- <th scope="col" class="col-md-1">Places</th> -->
                    <th scope="col" style="text-transform: none;">Prix</th>

                    <th scope="col" style="text-transform: none;">
                      <center>Actions</center>
                    </th>
                    <th scope="col" style="text-transform: none;">Payé</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    :style="[reservation.readv==0 ? {'background-color': '#e7f1fd'} : {'background-color': 'none'}]"
                    v-for="reservation in filteredReservationsPack"
                    v-bind:key="reservation.id"
                  >
                    <td>{{reservation.code}}</td>
                    <td>
                      <span style="font-size:11.5px">{{reservation.nom}}</span>
                    </td>
                    <td>{{reservation.date}}</td>

                    <td>{{reservation.prenom}}</td>
                    <!-- <td class="col-md-1">{{reservation.nbr_place}}</td> -->
                    <td>{{reservation.prix_total}}</td>

                    <td>
                      <center>
                        <router-link
                          :to="{name:'show_reservation_prop', params: { id:reservation.id,idh:reservation.hebid} }"
                        >
                          <i class="tim-icons icon-send" title="Consulter la réservation"></i>
                        </router-link>&nbsp;
                        <!-- <i
                          v-if="reservation.paye==0"
                          style="color: #fd5d93;"
                          class="tim-icons icon-simple-remove"
                          title="Supprimer la réservation"
                          @click="deleteReservation(reservation.id)"
                        ></i>-->

                        <!-- <i
                          v-if="reservation.paye==0"
                          style="color: #fd5d93;opacity:0.5"
                          class="tim-icons icon-simple-remove"
                          title="Delete disabled"
                        ></i> -->
                      </center>
                    </td>

                    <td>
                      <i
                        v-if="reservation.paye==1"
                        class="fa fa-times-circle text-danger fa-lg"
                        title="Réservation non payée"
                      ></i>
                      <i
                        v-if="reservation.paye==0"
                        class="fa fa-check-circle mr-3 fa-lg"
                        title="Réservation payée"
                        style="color:#62b062"
                      ></i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div v-if="reservationspack.data.length==0 && filteredReservationsPack.length==0">
              <p style="padding-top:15px">Vous n'avez aucune réservation jusqu'au moment.</p>
            </div>

            <div v-if="filteredReservationsPack.length==0 && reservationspack.data.length>0">
              <p style="padding-top:15px">Votre recherche ne correspond à aucune réservation.</p>
            </div>

            <pagination
              v-if="filteredReservationsPack.length!=0"
              :data="reservationspack"
              :limit="4"
              @pagination-change-page="fetchResPackPaginate"
            ></pagination>
          </b-tab>
          <b-tab title="Réservations aux hébergements">
            <template #title>
              Réservations aux hébergements
              <span
                class="badge badge-pill badge-success"
              >{{reservationsUnread}}</span>
            </template>
            <div class="row" v-if="reservationsLibre.data.length!=0">
              <div class="col-md-12">
                <!-- <label
                  style="line-height:35px;color:#333;padding-top:25px"
                >Chercher une réservation:</label>-->
                <input
                  aria-label="label"
                  type="text"
                  v-model="searchLibre"
                  placeholder="Chercher une réservation: exemple par date: 2020-10-01"
                  style="border:1px solid #ebebeb;width:100%;height:30px;margin-top:15px"
                />
              </div>
            </div>
            <br />
            <div
              class="table-responsive text-left"
              style="border:solid 1px #9b9b9b;"
              v-if="filteredReservationsLibre.length!=0"
            >
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Code</th>
                    <th scope="col">Hébergement</th>
                    <th scope="col">Date</th>
                    <th scope="col">Voyageur</th>
                    <!-- <th scope="col" class="col-md-1">Places</th> -->
                    <th scope="col">Prix</th>
                    <th scope="col">
                      <center>Actions</center>
                    </th>
                    <th scope="col">Payé</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    :style="[reservation.readv==0 ? {'background-color': '#e7f1fd'} : {'background-color': 'none'}]"
                    v-for="reservation in filteredReservationsLibre"
                    v-bind:key="reservation.id"
                  >
                    <td>{{reservation.code}}</td>
                    <td>
                      <span style="font-size:11.5px">{{reservation.nom}}</span>
                    </td>
                    <td>{{reservation.du}}</td>

                    <td>{{reservation.prenom}}</td>
                    <!-- <td class="col-md-1">{{reservation.nbr_place}}</td> -->
                    <td>{{reservation.prix_total}}</td>

                    <td>
                      <center>
                        <router-link
                          :to="{name:'show_reservation_libre', params: { id:reservation.id,ville_id:reservation.ville_id} }"
                        >
                          <i class="tim-icons icon-send" title="Consulter la réservation"></i>
                        </router-link>&nbsp;
                        <!-- <i
                          v-if="reservation.paye==0"
                          style="color: #fd5d93"
                          class="tim-icons icon-simple-remove"
                          title="Supprimer la réservation"
                          @click="deleteReservationLibre(reservation.id)"
                        ></i>

                        <i
                          v-if="reservation.paye==1"
                          style="color: #fd5d93;opacity:0.5"
                          class="tim-icons icon-simple-remove"
                          title="Delete reservation"
                        ></i>-->
                      </center>
                    </td>

                    <td>
                      <i
                        v-if="reservation.paye==0"
                        class="fa fa-times-circle text-danger fa-lg"
                        title="Réservation non payée"
                      ></i>
                      <i
                        v-if="reservation.paye==1"
                        class="fa fa-check-circle mr-3 fa-lg"
                        title="Réservation payée"
                        style="color:#62b062"
                      ></i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div v-if="reservationsLibre.data.length==0 && filteredReservationsLibre.length==0">
              <p style="padding-top:15px">Vous n'avez aucune réservation jusqu'au moment.</p>
            </div>

            <div v-if="filteredReservationsLibre.length==0 && filteredReservationsLibre.length>0">
              <p style="padding-top:15px">Votre recherche ne correspond à aucune réservation.</p>
            </div>

            <pagination
              v-if="filteredReservationsLibre.length!=0"
              :data="reservationsLibre"
              :limit="4"
              @pagination-change-page="fetchResLibrePaginate"
            ></pagination>
          </b-tab>
        </b-tabs>
      </b-card>
      <div class="container">
        <div class="col-md-12">
          <i
            class="fa fa-trash mr-3 text-danger fa-lg"
            style="opacity:0.4"
            title="Delete reservation"
          ></i>
          <span
            style="color:#707e94;font-size:13px"
          >La suppression d'une réservation sera impossible si le voyageur a déja payé.</span>
          <br />
          <br />
          <i class="fa fa-check-circle mr-3 fa-lg" title="Réservation payée" style="color:#62b062"></i>
          <span style="color:#707e94;font-size:13px">Le voyageur a payé sa réservation.</span>
          <br />
          <br />
          <i class="fa fa-times-circle mr-3 text-danger fa-lg"></i>
          <span style="color:#707e94;font-size:13px">Le voyageur n'a pas encore payé sa réservation.</span>
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
    BaseTable
  },
  data() {
    return {
      reservationsUnread: "",
      reservationspUnread: "",

      search: "",
      searchLibre: "",

      client: {},
      reservationsLibre: { data: [] },
      reservationspack: { data: [] }
    };
  },

  computed: {
    filteredReservationsPack: function() {
      return this.reservationspack.data.filter(reservation => {
        return (
          reservation.code.match(this.search) ||
          reservation.nom.match(this.search) ||
          reservation.date.match(this.search) ||
          reservation.prenom.match(this.search)
        );
      });
    },

    filteredReservationsLibre: function() {
      return this.reservationsLibre.data.filter(reservation => {
        return (
          reservation.code.match(this.searchLibre) ||
          reservation.nom.match(this.searchLibre) ||
          reservation.du.match(this.searchLibre) ||
          reservation.prenom.match(this.searchLibre)
        );
      });
    },
    loggedIn() {
      return this.$store.getters.get_loggedIn;
    },

    prop() {
      return this.$store.getters.get_prop;
    },

    user() {
      return this.$store.getters.get_user;
    }
  },
  created() {
    this.fetchReservations(this.$store.state.prop[0].id);
    this.fetchReservationsPack(this.$store.state.prop[0].id);
  },
  methods: {
    deleteReservation(id) {
      if (confirm("Are You Sure?")) {
        fetch(`${apiDomain}/api/reservation/delete/${id}`, {
          method: "delete"
        })
          .then(res => res.json())
          .then(data => {
            alert("Reservation Supprimée");
            window.location.reload();
          })
          .catch(err => console.log(err));
      }
    },

    deleteReservationLibre(id) {
      if (confirm("Are You Sure?")) {
        fetch(
          `${apiDomain}/api/reservation-libre/${id}?token=${this.$store.state.token}`,
          {
            method: "delete"
          }
        )
          .then(res => res.json())
          .then(data => {
            alert("Reservation Supprimée");
            window.location.reload();
          })
          .catch(err => console.log(err));
      }
    },
    fetchReservations(id) {
      fetch(`${apiDomain}/api/reservation-proprietaire-libre/${id}`)
        .then(res => res.json())
        .then(res => {
          this.reservationsLibre = res.reservations;
          this.reservationsUnread = res.reservationc;
        })
        .catch(err => console.log(err));
    },
    fetchResLibrePaginate(page) {
      if (typeof page === "undefined") {
        page = 1;
      }
      let vm = this;
      fetch(
        `${apiDomain}/api/reservation-proprietaire-libre/${this.$store.state.user.id}?page=` +
          page
      )
        .then(res => res.json())
        .then(data => {
          this.reservationsLibre = data.reservations;
        })
        .catch(err => console.log(err));
    },

    fetchReservationsPack(id) {
      fetch(`${apiDomain}/api/reservation-proprietaire-pack/${id}`)
        .then(res => res.json())
        .then(res => {
          this.reservationspack = res.reservations;
          this.reservationspUnread = res.reservationp;
        })
        .catch(err => console.log(err));
    },
    fetchResPackPaginate(page) {
      if (typeof page === "undefined") {
        page = 1;
      }
      let vm = this;
      fetch(
        `${apiDomain}/api/reservation-proprietaire-pack/${this.$store.state.user.id}?page=` +
          page
      )
        .then(res => res.json())
        .then(data => {
          this.reservationspack = data.reservations.data;
        })
        .catch(err => console.log(err));
    }
  }
};
</script>