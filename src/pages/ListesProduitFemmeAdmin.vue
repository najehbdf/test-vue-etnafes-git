<template>
  <div class="content">
    <router-link :to="{ name: 'ajouter_produit' }">
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
        &nbsp;&nbsp;Nouveau Produit
      </button>
    </router-link>
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
    <br />
    <b-tabs card>
      <b-tab :title="filtered.length + ' ' + 'Produits Femmes R/A'" active>
        <div class="row">
          <div class="col-12">
            <div
              class="table-responsive text-left"
              style="border: solid 1px #9b9b9b"
            >
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Titre</th>
                    <th scope="col">Prix</th>
                    <th scope="col">Qts</th>
                    <th scope="col">Femme R/A</th>
                    <th scope="col">
                      <center>Actions</center>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="restaurant in filtered"
                    v-bind:key="restaurant.id"
                    :style="[
                      restaurant.read == 0
                        ? { 'background-color': '#e0eeff' }
                        : { 'background-color': 'none' },
                    ]"
                  >
                    <td>{{ restaurant.titre }}</td>
                    <td>{{ restaurant.prix }}</td>
                    <td>{{ restaurant.qts }}</td>
                    <td>{{ restaurant.nomC }} {{ restaurant.prenom }}</td>
                    <td>
                      <center>
                        <router-link
                          :to="{
                            name: 'show_restaurant_admin',
                            params: { id: restaurant.id },
                          }"
                        >
                          <i
                            style="color: blue"
                            title="Détails du restaurant"
                            class="tim-icons icon-send"
                          ></i>
                          &nbsp;
                        </router-link>

                        <router-link
                          :to="{
                            name: 'edit_produit_admin',
                            params: { id: restaurant.id },
                          }"
                        >
                          <i
                            style="color: #62b062"
                            title="Modifier le restaurant"
                            class="tim-icons icon-pencil"
                          ></i>
                          &nbsp;
                        </router-link>
                        <i
                          onmouseover="this.style.cursor='pointer'"
                          style="color: #fd5d93"
                          class="tim-icons icon-simple-remove"
                          title="Delete hbergement"
                          @click="deleteProduit(restaurant.id)"
                        ></i>
                      </center>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </b-tab>

      <b-tab title="Restaurants">
        <template #title>
          Corbeille
          <i
            style="color: red !important"
            class="fa fa-trash text-danger fa-lg"
            title="Clients"
          ></i>
        </template>
      </b-tab>
    </b-tabs>
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
      table1: {
        title: "Simple Table",
        columns: [...tableColumns],
        // data: [...this.packs]
      },
      packs: {},
      search: "",
      femmes: {},
      restaurantscorbeille: {},
      restaurantsUnread: [],
    };
  },

  computed: {
    filtered: function () {
      if (Array.isArray(this.femmes)) {
        return this.femmes.filter((pack) => {
          return (
            pack.titre.toLowerCase().match(this.search.toLowerCase()) ||
            pack.prenom.toLowerCase().match(this.search.toLowerCase()) ||
            pack.nom.toLowerCase().match(this.search.toLowerCase())
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
    this.fetchRests();
  },
  methods: {
    restoreRestaurant(id) {
      axios
        .post(`${apiDomain}/api/restore/restaurant/${id}`)
        .then((response) => {
          if (response.status == 200) {
            this.$noty.success("Bien restaurée.");
            this.fetchRests();
          }
        });
    },
    deleteProduit(id) {
      if (confirm("Are You Sure?")) {
        fetch(`${apiDomain}/api/delete_produit/${id}`, {
          method: "delete",
        })
          .then((res) => res.json())
          .then((data) => {
            /*  alert("Produit Supprimée");
            window.location.reload(); */
            this.$noty.success("votre produit a été supprimé.");

            this.fetchRests();
          })
          .catch((err) => console.log(err));
      }
    },
    fetchRests() {
      fetch(`${apiDomain}/api/get_all_produits`)
        .then((res) => res.json())
        .then((res) => {
          this.femmes = res;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>