<template>
  <div class="content">
    <router-link :to="{ name: 'nouveau_restaurant_admin' }">
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
        &nbsp;&nbsp;Nouveau Restaurant
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
    <b-tabs card>
      <b-tab :title="filtered.length + ' ' + 'Restaurants'" active>
        <div class="row">
          <div class="col-12">
            <div
              class="table-responsive text-left"
              style="border: solid 1px #9b9b9b"
            >
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Nom</th>
                    <th scope="col">adresse</th>
                    <th scope="col">description</th>
                    <th scope="col">Proprietaire</th>
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
                    <td>{{ restaurant.nomrestau }}</td>
                    <td>{{ restaurant.adresse }}</td>
                    <td>{{ restaurant.description }}</td>
                    <td>{{ restaurant.nom }} {{ restaurant.prenom }}</td>
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
                            name: 'edit_restaurant_admin',
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
                          @click="deleteRestaurant(restaurant.id)"
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
          {{ restaurantscorbeille.length }} Corbeille
          <i
            style="color: red !important"
            class="fa fa-trash text-danger fa-lg"
            title="Clients"
          ></i>
        </template>
        <div class="row">
          <div class="col-12">
            <div
              class="table-responsive text-left"
              style="border: solid 1px #9b9b9b"
            >
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Nom</th>
                    <th scope="col">adresse</th>
                    <th scope="col">description</th>
                    <th scope="col">Proprietaire</th>
                    <th scope="col">
                      <center>Actions</center>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="restaurant in restaurantscorbeille"
                    v-bind:key="restaurant.id"
                    :style="[
                      restaurant.read == 0
                        ? { 'background-color': '#e0eeff' }
                        : { 'background-color': 'none' },
                    ]"
                  >
                    <td>{{ restaurant.nomrestau }}</td>
                    <td>{{ restaurant.adresse }}</td>
                    <td>{{ restaurant.description }}</td>
                    <td>
                      <span>{{ restaurant.nom }} {{ restaurant.prenom }}</span>
                      <!-- 
                      <span v-else>Le proprietaire a été supprimé</span>-->
                    </td>
                    <td>
                      <center>
                        <i
                          onmouseover="this.style.cursor='pointer'"
                          style="color: green"
                          class="fas fa-trash-restore"
                          @click="restoreRestaurant(restaurant.id)"
                        ></i>
                        &nbsp;
                        <i
                          onmouseover="this.style.cursor='pointer'"
                          style="color: #fd5d93"
                          class="fas fa-trash-alt"
                          title="Delete hbergement"
                          @click="deleteRestaurant(restaurant.id)"
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
      restaurants: {},
      restaurantscorbeille: {},
      restaurantsUnread: [],
    };
  },

  computed: {
    filtered: function () {
      if (Array.isArray(this.restaurants)) {
        return this.restaurants.filter((pack) => {
          return (
            pack.nomrestau.toLowerCase().match(this.search.toLowerCase()) ||
            pack.adresse.toLowerCase().match(this.search.toLowerCase())
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
    deleteRestaurant(id) {
      if (confirm("Are You Sure?")) {
        fetch(`${apiDomain}/api/restaurant/delete/${id}`, {
          method: "delete",
        })
          .then((res) => res.json())
          .then((data) => {
            alert("Restaurant Supprimée");
            window.location.reload();
          })
          .catch((err) => console.log(err));
      }
    },
    fetchRests() {
      fetch(`${apiDomain}/api/allrestaurants`)
        .then((res) => res.json())
        .then((res) => {
          this.restaurants = res.rest;
          this.restaurantscorbeille = res.restaurantscorbeille;
          this.restaurantsUnread = res.restaurantsUnread;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>