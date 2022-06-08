<template>
  <div class="content">
    <div>
      <b-tabs card>
        <b-tab title="Réservations pack">
          <template #title>
            Réservations aux packs
            &nbsp;
            <span
              class="badge badge-warning"
              style="background-color:red"
            >{{reslength}}</span>
          </template>

          <div class="row">
            <div class="col-md-4">
              <div class="form-group">
                <select
                  v-model="type_recherche"
                  class="form-control"
                  aria-label=".form-select-sm example"
                >
                  <option value disabled selected>Rechercher par</option>
                  <option value="titre">Titre du pack</option>
                  <option value="date">Date</option>
                  <option value="agence">Nom de l'agence</option>
                </select>
              </div>
            </div>

            <div class="col-md-4" v-if="type_recherche!=''">
              <div class="form-group">
                <input
                  class="form-control"
                  aria-label="label"
                  @keyup="fetchReservationsPack(user.id)"
                  type="text"
                  v-model="q"
                  placeholder="Chercher une réservation: exemple par date: 2020-10-01"
                />
              </div>
            </div>
          </div>
          <div>
            <!-- <div class="row">
              <div class="col-md-12">
                <input
                  aria-label="label"
                  type="text"
                  v-model="search"
                  placeholder="Chercher une réservation: exemple par date: 2020-10-01"
                  style="border:1px solid #ebebeb;width:100%;height:30px;margin-bottom:10px"
                />
              </div>
            </div>-->

            <div
              class="table-responsive text-left"
              style="border:solid 1px #9b9b9b;"
              v-if="type_recherche=='' "
            >
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col" style="text-transform: none;">Code</th>
                    <th scope="col" style="text-transform: none;">Agence</th>
                    <th scope="col" style="text-transform: none;">Date</th>
                    <th scope="col" style="text-transform: none;">Pack</th>
                    <th scope="col" style="text-transform: none;">Statut</th>

                    <th scope="col" style="text-transform: none;">Prix</th>

                    <th scope="col">
                      <center style="text-transform: none;">Actions</center>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    :style="[reservation.readv==0 ? {'background-color': '#e7f1fd'} : {'background-color': 'none'}]"
                    v-for="reservation in reservationsWithSearch.data"
                    v-bind:key="reservation.id"
                  >
                    <td>{{reservation.code}}</td>
                    <td>
                      <span style="font-size:11.5px">{{reservation.nom_agence}}</span>
                    </td>
                    <td>{{reservation.date}}</td>
                    <td>
                      <router-link
                        target="_blank"
                        :to="{
                  name: 'Pack',
                  params: { id: reservation.pack_id},
                }"
                      >
                        <span style="font-size:13px">{{reservation.titre}}</span>
                      </router-link>
                    </td>
                    <td>
                      <span style="font-size:13px" v-if="reservation.paye==1">Payée</span>
                      <span style="font-size:13px" v-if="reservation.annule==1">Annulée</span>
                      <span
                        style="font-size:13px"
                        v-if="reservation.annule==0 && reservation.paye==0"
                      >Attente de paiement</span>
                    </td>

                    <td>{{reservation.prix_total}}</td>

                    <td>
                      <center>
                        <router-link
                          :to="{name:'show_reservation_client', params: { id:reservation.id,ville_id:reservation.ville_id} }"
                        >
                          <i class="tim-icons icon-send" title="Consulter la réservation"></i>
                        </router-link>&nbsp;
                        <router-link
                          v-if="reservation.paye==0 && reservation.annule==0"
                          :to="{name:'edit_reservation_client', params: { id:reservation.id,idp:reservation.pack_id} }"
                        >
                          <i
                            class="tim-icons icon-pencil"
                            style="color:#62b062"
                            title="Modifier la réservation"
                          ></i>
                        </router-link>

                        <i
                          v-else
                          class="tim-icons icon-pencil"
                          style="color:#62b062;opacity:0.5"
                          title="Modification désactivée"
                        ></i>
                      </center>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div
              class="table-responsive text-left"
              style="border:solid 1px #9b9b9b;"
              v-if="type_recherche=='titre'"
            >
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col" style="text-transform: none;">Code</th>
                    <th scope="col" style="text-transform: none;">Agence</th>
                    <th scope="col" style="text-transform: none;">Date</th>
                    <th scope="col" style="text-transform: none;">Pack</th>
                    <th scope="col" style="text-transform: none;">Statut</th>

                    <th scope="col" style="text-transform: none;">Prix</th>

                    <th scope="col">
                      <center style="text-transform: none;">Actions</center>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    :style="[reservation.readv==0 ? {'background-color': '#e7f1fd'} : {'background-color': 'none'}]"
                    v-for="reservation in reservationsWithSearch.data"
                    v-bind:key="reservation.id"
                  >
                    <td>{{reservation.code}}</td>
                    <td>
                      <span style="font-size:11.5px">{{reservation.nom_agence}}</span>
                    </td>
                    <td>{{reservation.date}}</td>
                    <td>
                      <span style="font-size:13px">{{reservation.titre}}</span>
                    </td>
                    <td>
                      <span style="font-size:13px" v-if="reservation.paye==1">Payée</span>
                      <span style="font-size:13px" v-if="reservation.annule==1">Annulée</span>
                      <span
                        style="font-size:13px"
                        v-if="reservation.annule==0 && reservation.paye==0"
                      >Attente de paiement</span>
                    </td>

                    <td>{{reservation.prix_total}}</td>

                    <td>
                      <center>
                        <router-link
                          :to="{name:'show_reservation_client', params: { id:reservation.id,ville_id:reservation.ville_id} }"
                        >
                          <i class="tim-icons icon-send" title="Consulter la réservation"></i>
                        </router-link>&nbsp;
                        <router-link
                          v-if="reservation.paye==0 && reservation.annule==0"
                          :to="{name:'edit_reservation_client', params: { id:reservation.id,idp:reservation.pack_id} }"
                        >
                          <i
                            class="tim-icons icon-pencil"
                            style="color:#62b062"
                            title="Modifier la réservation"
                          ></i>
                        </router-link>

                        <i
                          v-else
                          class="tim-icons icon-pencil"
                          style="color:#62b062;opacity:0.5"
                          title="Modification désactivée"
                        ></i>
                      </center>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div
              class="table-responsive text-left"
              style="border:solid 1px #9b9b9b;"
              v-if="type_recherche=='date'"
            >
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col" style="text-transform: none;">Code</th>
                    <th scope="col" style="text-transform: none;">Agence</th>
                    <th scope="col" style="text-transform: none;">Date</th>
                    <th scope="col" style="text-transform: none;">Pack</th>
                    <th scope="col" style="text-transform: none;">Statut</th>

                    <th scope="col" style="text-transform: none;">Prix</th>

                    <th scope="col">
                      <center style="text-transform: none;">Actions</center>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    :style="[reservation.readv==0 ? {'background-color': '#e7f1fd'} : {'background-color': 'none'}]"
                    v-for="reservation in reservationsWithSearchDate.data"
                    v-bind:key="reservation.id"
                  >
                    <td>{{reservation.code}}</td>
                    <td>
                      <span style="font-size:11.5px">{{reservation.nom_agence}}</span>
                    </td>
                    <td>{{reservation.date}}</td>
                    <td>
                      <span style="font-size:13px">{{reservation.titre}}</span>
                    </td>
                    <td>
                      <span style="font-size:13px" v-if="reservation.paye==1">Payée</span>
                      <span style="font-size:13px" v-if="reservation.annule==1">Annulée</span>
                      <span
                        style="font-size:13px"
                        v-if="reservation.annule==0 && reservation.paye==0"
                      >Attente de paiement</span>
                    </td>

                    <td>{{reservation.prix_total}}</td>

                    <td>
                      <center>
                        <router-link
                          :to="{name:'show_reservation_client', params: { id:reservation.id,ville_id:reservation.ville_id} }"
                        >
                          <i class="tim-icons icon-send" title="Consulter la réservation"></i>
                        </router-link>&nbsp;
                        <router-link
                          v-if="reservation.paye==0 && reservation.annule==0"
                          :to="{name:'edit_reservation_client', params: { id:reservation.id,idp:reservation.pack_id} }"
                        >
                          <i
                            class="tim-icons icon-pencil"
                            style="color:#62b062"
                            title="Modifier la réservation"
                          ></i>
                        </router-link>

                        <i
                          v-else
                          class="tim-icons icon-pencil"
                          style="color:#62b062;opacity:0.5"
                          title="Modification désactivée"
                        ></i>
                      </center>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div
              class="table-responsive text-left"
              style="border:solid 1px #9b9b9b;"
              v-if="type_recherche=='agence'"
            >
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col" style="text-transform: none;">Code</th>
                    <th scope="col" style="text-transform: none;">Agence</th>
                    <th scope="col" style="text-transform: none;">Date</th>
                    <th scope="col" style="text-transform: none;">Pack</th>
                    <th scope="col" style="text-transform: none;">Statut</th>

                    <th scope="col" style="text-transform: none;">Prix</th>

                    <th scope="col">
                      <center style="text-transform: none;">Actions</center>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    :style="[reservation.readv==0 ? {'background-color': '#e7f1fd'} : {'background-color': 'none'}]"
                    v-for="reservation in reservationsWithSearchAgence.data"
                    v-bind:key="reservation.id"
                  >
                    <td>{{reservation.code}}</td>
                    <td>
                      <span style="font-size:11.5px">{{reservation.nom_agence}}</span>
                    </td>
                    <td>{{reservation.date}}</td>
                    <td>
                      <span style="font-size:13px">{{reservation.titre}}</span>
                    </td>
                    <td>
                      <span style="font-size:13px" v-if="reservation.paye==1">Payée</span>
                      <span style="font-size:13px" v-if="reservation.annule==1">Annulée</span>
                      <span
                        style="font-size:13px"
                        v-if="reservation.annule==0 && reservation.paye==0"
                      >Attente de paiement</span>
                    </td>

                    <td>{{reservation.prix_total}}</td>

                    <td>
                      <center>
                        <router-link
                          :to="{name:'show_reservation_client', params: { id:reservation.id,ville_id:reservation.ville_id} }"
                        >
                          <i class="tim-icons icon-send" title="Consulter la réservation"></i>
                        </router-link>&nbsp;
                        <router-link
                          v-if="reservation.paye==0 && reservation.annule==0"
                          :to="{name:'edit_reservation_client', params: { id:reservation.id,idp:reservation.pack_id} }"
                        >
                          <i
                            class="tim-icons icon-pencil"
                            style="color:#62b062"
                            title="Modifier la réservation"
                          ></i>
                        </router-link>

                        <i
                          v-else
                          class="tim-icons icon-pencil"
                          style="color:#62b062;opacity:0.5"
                          title="Modification désactivée"
                        ></i>
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

          <!--  <div v-else>
            <p style="margin-top:10px">Pas de réservations encore</p>
          </div>-->
        </b-tab>
        <b-tab title="Réservations aux hébergements" active>
          <template #title>
            Réservations aux hébergements
            &nbsp;
            <span
              class="badge badge-warning"
              style="background-color:red"
            >{{resheb}}</span>
          </template>
          <!-- <div class="row" v-if="filteredReservationsLibre.length!=0"> -->
          <div class="row">
            <div class="col-md-12">
              <!-- <label style="line-height:35px;color:#333;">Chercher une réservation:</label> -->
              <input
                aria-label="label"
                type="text"
                v-model="searchLibre"
                placeholder="Chercher une réservation: exemple par date: 2020-10-01"
                style="border:1px solid #ebebeb;width:100%;height:30px;margin-bottom:10px"
              />
            </div>
          </div>

          <div
            class="table-responsive text-left"
            v-if="filteredReservationsLibre && filteredReservationsLibre.length!=0"
            style="border:solid 1px #9b9b9b;"
          >
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col" style="text-transform: none;">Code</th>
                  <th scope="col" style="text-transform: none;">Hébergement</th>
                  <th scope="col" style="text-transform: none;">Date</th>
                  <th scope="col" style="text-transform: none;">Voyageur</th>
                  <th scope="col" style="text-transform: none;">Prix</th>
                  <th scope="col">
                    <center style="text-transform: none;">Actions</center>
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
                  <td>{{reservation.prix_total}}</td>

                  <td>
                    <center>
                      <router-link
                        :to="{name:'show_reservation_client_libre', params: { id:reservation.id,ville_id:reservation.ville_id} }"
                      >
                        <i class="tim-icons icon-send" title="Consulter la réservation"></i>
                      </router-link>

                      <i
                        v-if="reservation.paye==1"
                        class="fa fa-trash text-danger fa-lg"
                        style="opacity:0.4"
                        title="Delete reservation"
                      ></i>
                    </center>
                  </td>

                  <td>
                    <i v-if="reservation.paye==0" class="fa fa-times-circle text-danger fa-lg"></i>
                    <i
                      v-if="reservation.paye==1"
                      class="fa fa-check-circle mr-3 fa-lg"
                      style="color:#62b062"
                    ></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-else>
            <p style="margin-top:10px">Pas de réservations encore</p>
          </div>
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
    BaseTable
  },
  data() {
    return {
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
        columns: [...tableColumns]
        // data: [...this.packs]
      },
      client: {},
      reservationspack: {},
      reservations: {}
    };
  },

  computed: {
    filteredReservationsPack: function() {
      if (Array.isArray(this.reservationspack)) {
        return this.reservationspack.filter(reservation => {
          return (
            reservation.code.match(this.search) ||
            reservation.nom_agence.match(this.search) ||
            reservation.date.match(this.search) ||
            reservation.prenom.match(this.search)
          );
        });
      }
    },

    filteredReservationsLibre: function() {
      if (Array.isArray(this.reservations)) {
        return this.reservations.filter(reservation => {
          return (
            reservation.code.match(this.searchLibre) ||
            reservation.nom.match(this.searchLibre) ||
            reservation.du.match(this.searchLibre) ||
            reservation.prenom.match(this.searchLibre)
          );
        });
      }
    },
    loggedIn() {
      return this.$store.getters.get_loggedIn;
    },

    user() {
      return this.$store.getters.get_user;
    }
  },

  created() {
    this.fetchReservations(this.$store.state.user.id);
    this.fetchReservationsPack(this.$store.state.user.id);
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
    fetchReservationsPack(id) {
      if (this.q.length > 1) {
        axios
          .get(
            `${apiDomain}/api/reservation-client/${this.$store.state.user.id}/` +
              this.q
          )
          .then(
            response => (
              (this.reservationsWithSearch = response.data.reservations),
              (this.reservationsWithSearchDate = response.data.reservationsd),
              (this.reservationsWithSearchAgence = response.data.reservationsag)
            )
          )
          .catch(error => console.log(error));
      } else {
        axios
          .get(
            `${apiDomain}/api/reservation-client/${this.$store.state.user.id}`
          )
          .then(response => (this.reservationsWithSearch = response.data))
          .catch(error => console.log(error));
      }
    },
    getResults(page = 1) {
      axios
        .get(
          `${apiDomain}/api/reservation-client/${this.$store.state.user.id}?page=` +
            page
        )
        .then(response => {
          this.reservationsWithSearch = response.data.reservations;
        });
    },

    fetchReservations(id) {
      fetch(
        `${apiDomain}/api/reservation-client-heb/${id}?token=${this.$store.state.token}`
      )
        .then(res => res.json())
        .then(res => {
          this.reservations = res.reservations;
          this.resheb = res.resheb;
        })
        .catch(err => console.log(err));
    }
  }
};
</script>
