<template>
  <div class="content">
    <!-- <router-link :to="{name:'nouveau_hebergement'}">
      <button
        type="button"
        class="btn btn-outline-success mt-3"
        style="color:#fff;margin-bottom:20px;border-radius: 18px 0px 18px 0px;"
      >
        <i class="fa fa-plus"></i>
        &nbsp;&nbsp;Nouveau Hébergement
      </button>
    </router-link>-->
    <div class="row" v-if="heblength != 0">
      <div class="col-md-12">
        <div>
          <div class="row">
            <div class="col-md-12">
              <!-- <label style="line-height:35px;color:#333">Chercher un hébergement:</label> -->
              <input
                aria-label="search"
                type="text"
                v-model="search"
                placeholder="Chercher un hébergement: recherche par nom"
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
            class="table-responsive text-left"
            style="border: solid 1px #9b9b9b"
          >
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col" style="text-transform: none">Nom</th>
                  <th scope="col" style="text-transform: none">Voyageurs</th>
                  <th scope="col" style="text-transform: none">Chambres</th>
                  <th scope="col" style="text-transform: none">Réservations</th>
                  <th scope="col" style="text-transform: none">
                    <center>Actions</center>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  :style="[
                    hebergement.readv == 0
                      ? { 'background-color': '#e7f1fd' }
                      : { 'background-color': 'none' },
                  ]"
                  v-for="hebergement in filteredHebergements"
                  v-bind:key="hebergement.id"
                >
                  <td>{{ hebergement.nom }}</td>
                  <td>{{ hebergement.nbr_voyageurs }} voyageurs</td>
                  <td>{{ hebergement.nbr_chambre_dispo }} chambres</td>
                  <td>
                    {{
                      hebergement.reservation.length +
                      hebergement.reservation_hebergement.length
                    }}
                  </td>
                  <td>
                    <center>
                      <router-link
                        :to="{
                          name: 'show_hebergement',
                          params: { id: hebergement.id },
                        }"
                      >
                        <i
                          class="tim-icons icon-send"
                          title="Consulter l'hébergement"
                        ></i> </router-link
                      >&nbsp;
                      <router-link
                        :to="{
                          name: 'edit_hebergement',
                          params: { id: hebergement.id },
                        }"
                      >
                        <i
                          v-if="
                            hebergement.reservation.length +
                              hebergement.reservation_hebergement.length ==
                            0
                          "
                          class="tim-icons icon-pencil"
                          style="color: #62b062"
                          title="Modifier l'hébergement"
                        ></i> </router-link
                      >&nbsp;
                      <i
                        v-if="
                          hebergement.reservation.length +
                            hebergement.reservation_hebergement.length >
                          0
                        "
                        disabled
                        class="tim-icons icon-pencil"
                        style="color: #62b062; opacity: 0.5"
                        title="Modifier l'hébergement"
                      ></i>
                      <!-- <i
                        v-if="hebergement.reservation.length==0 && hebergement.reservation_hebergement.length==0"
                        style="color: #fd5d93;"
                        class="tim-icons icon-simple-remove"
                        title="Supprimer l'hébergement"
                        @click="deleteHebergement(hebergement.id)"
                      ></i> -->

                      <i
                        v-else
                        class="tim-icons icon-simple-remove"
                        style="color: #fd5d93; opacity: 0.5"
                        title="Delete disabled"
                      ></i>
                    </center>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <pagination
            :limit="4"
            :data="hebergements"
            @pagination-change-page="getResults"
            class="mt-3"
          ></pagination>
        </div>
      </div>
    </div>
    <div class="row" v-if="heblength == 0">
      <div class="col-md-12">
        <p>Aucun hébérgement jusqu'au moment.</p>
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
      hebergementsunread: "",
      q: "",
      search: "",
      table1: {
        title: "Simple Table",
        columns: [...tableColumns],
      },
      heblength: "",
      packs: {},
      hebergements: {
        data: [],
      },
    };
  },

  computed: {
    prop() {
      return this.$store.getters.get_prop;
    },
    filteredHebergements: function () {
      if (Array.isArray(this.hebergements.data)) {
        return this.hebergements.data.filter((hebergement) => {
          return (
            hebergement.nom.match(this.search) ||
            hebergement.nom.match(this.search.toLowerCase()) ||
            hebergement.nom.match(this.search.toUpperCase())
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
    this.fetchHebergements(this.$store.state.prop[0].id);
    // this.fetchUnreadHeb(this.$store.state.prop[0].id);
  },
  methods: {
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
            this.fetchHebergements(this.$store.state.user.id);
          })
          .catch((err) => console.log(err));
      }
    },

    fetchUnreadHeb(id) {
      axios
        .get(
          `${apiDomain}/api/hebergements/unread/${this.$store.state.prop[0].id}`
        )
        .then((response) => (this.hebergementsunread = response.data.length))
        .catch((error) => console.log(error));
    },

    fetchHebergements(id) {
      if (this.q) {
        axios
          .get(
            `${apiDomain}/api/hebergements/search/${this.$store.state.prop[0].id}/` +
              this.q
          )
          .then(
            (response) => (this.hebergements = response.data),
            (this.heblength = response.data.data.length)
          )
          .catch((error) => console.log(error));
      } else {
        axios
          .get(
            `${apiDomain}/api/hebergements/search/${this.$store.state.prop[0].id}`
          )
          .then(
            (response) => (
              (this.hebergements = response.data),
              (this.heblength = response.data.data.length)
            )
          )
          .catch((error) => console.log(error));
      }
    },
    getResults(page = 1) {
      axios
        .get(
          `${apiDomain}/api/hebergements/search/${this.$store.state.prop[0].id}?page=` +
            page
        )
        .then((response) => {
          this.hebergements = response.data;
          this.heblength = response.data.data.length;
        });
    },
  },
};
</script>