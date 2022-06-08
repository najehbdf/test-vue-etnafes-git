<template>
  <div class="content">
    <router-link :to="{ name: 'ajouter_produit_femme' }">
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
    <div v-if="mes_produits.length > 0" class="col-md-4">
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
    <b-tabs v-if="filtered.length > 0" card>
      <b-tab :title="filtered.length + ' ' + 'Mes Produits'" active>
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
                    <td>{{ restaurant.prix }} DNT</td>
                    <td>{{ restaurant.qts }}</td>

                    <td>
                      <center>
                        <router-link
                          :to="{
                            name: 'ShowProduitFemme',
                            params: { id: restaurant.id },
                          }"
                        >
                          <i
                            style="color: blue"
                            title="Détails du produit"
                            class="tim-icons icon-send"
                          ></i>
                          &nbsp;
                        </router-link>

                        <router-link
                          :to="{
                            name: 'edit_produit_femme',
                            params: { id: restaurant.id },
                          }"
                        >
                          <i
                            style="color: #62b062"
                            title="Modifier le produit"
                            class="tim-icons icon-pencil"
                          ></i>
                          &nbsp;
                        </router-link>
                        <i
                          onmouseover="this.style.cursor='pointer'"
                          style="color: #fd5d93"
                          class="tim-icons icon-simple-remove"
                          title="Supprimer produit"
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

      <!--  <b-tab title="Restaurants">
        <template #title>
          Corbeille
          <i
            style="color: red !important"
            class="fa fa-trash text-danger fa-lg"
            title="Clients"
          ></i>
        </template>
      </b-tab> -->
    </b-tabs>

    <div v-if="filtered.length == 0">Vous n'avez aucun produit</div>
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
      mes_produits: {},
      restaurantscorbeille: {},
      restaurantsUnread: [],
    };
  },

  computed: {
    filtered: function () {
      if (Array.isArray(this.mes_produits)) {
        return this.mes_produits.filter((pack) => {
          return pack.titre.toLowerCase().match(this.search.toLowerCase());
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
    this.fetchMesProduits(this.$store.state.user.id);
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

            this.fetchMesProduits(this.$store.state.user.id);
          })
          .catch((err) => console.log(err));
      }
    },
    fetchMesProduits() {
      fetch(`${apiDomain}/api/get_mes_produits/${this.$store.state.user.id}`)
        .then((res) => res.json())
        .then((res) => {
          this.mes_produits = res;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>