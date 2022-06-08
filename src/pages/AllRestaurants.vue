<template>
  <div class="content">
    <!-- <router-link :to="{name:'nouveau_restaurant'}">
      <button
        type="button"
        class="btn btn-outline-success mt-3 btnajout"
        style="color:#fff;margin-bottom:20px;border-radius: 18px 0px 18px 0px;"
      >
        <i class="fa fa-plus"></i>
        &nbsp;&nbsp;Nouveau Restaurant
      </button>
    </router-link>-->
    <div class="row">
      <div class="col-md-12">
        <div>
          <div
            class="table-responsive text-left"
            style="border:solid 1px #9b9b9b;"
            v-if="restaurantslength!=0"
          >
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col" style="text-transform: none;">Nom</th>
                  <th scope="col" style="text-transform: none;">Description</th>
                  <th scope="col" style="text-transform: none;">Proprietaire</th>
                  <th scope="col" style="text-transform: none;">
                    <center>Actions</center>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  :style="[restaurant.readv==0 ? {'background-color': '#e7f1fd'} : {'background-color': 'none'}]"
                  v-for="restaurant in restaurants"
                  v-bind:key="restaurant.id"
                >
                  <td>{{restaurant.nom}}</td>
                  <td>{{restaurant.description}}</td>
                  <td>{{user.nom}} {{user.prenom}}</td>
                  <td>
                    <center>
                      <router-link :to="{name:'show_restaurant', params: { id:restaurant.id} }">
                        <i class="tim-icons icon-send"></i>
                      </router-link>&nbsp;
                      <router-link :to="{name:'edit_restaurant', params: { id:restaurant.id} }">
                        <i
                          class="tim-icons icon-pencil"
                          style="color:#62b062"
                          title="Modifier le restaurant"
                        ></i>
                      </router-link>&nbsp;
                      <!-- <i
                        onmouseover="this.style.cursor='pointer'"
                        style="color: #fd5d93;"
                        class="tim-icons icon-simple-remove"
                        title="Delete restaurant"
                        @click="deleteRestaurant(restaurant.id)"
                      ></i>-->
                    </center>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-else>
            <p>Pas de restaurants encore</p>
          </div>
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

export default {
  components: {
    Card,
    BaseTable
  },
  data() {
    return {
      restaurantslength: "",
      table1: {
        title: "Simple Table",
        columns: [...tableColumns]
      },
      packs: {},
      restaurants: []
    };
  },

  computed: {
    loggedIn() {
      return this.$store.getters.get_loggedIn;
    },

    user() {
      return this.$store.getters.get_user;
    },
    proprestau() {
      return this.$store.getters.get_proprestau;
    }
  },
  created() {
    this.fetchRestaurants(this.$store.state.proprestau[0].id);
  },
  methods: {
    deleteRestaurant(id) {
      if (confirm("Are You Sure?")) {
        fetch(`${apiDomain}/api/restaurant/delete/${id}`, {
          method: "delete"
        })
          .then(res => res.json())
          .then(data => {
            alert("Restaurant Supprimée");
            window.location.reload();
          })
          .catch(err => console.log(err));
      }
    },
    fetchRestaurants(id) {
      fetch(`${apiDomain}/api/restaurants/${id}`)
        .then(res => res.json())
        .then(res => {
          this.restaurants = res.restaurants;
          this.restaurantslength = res.restaurants.length;
        })
        .catch(err => console.log(err));
    }
  }
};
</script>