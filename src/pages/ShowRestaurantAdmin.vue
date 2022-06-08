<template>
  <div class="content">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb" style="background-color: #a6bfe6 !important">
        <li class="breadcrumb-item">
          <a href="/restaurants">Les restaurants</a>
        </li>
        <li
          class="breadcrumb-item active"
          style="color: #000"
          aria-current="page"
        >
          Détails Restaurant
        </li>
      </ol>
    </nav>
    <div class="jumbotron">
      <div class="row">
        <div class="col-md-7">
          <b-carousel
            id="carousel-1"
            v-model="slide"
            :interval="4000"
            controls
            indicators
            background="#ababab"
            img-width="1024"
            img-height="480"
            style="text-shadow: 1px 1px 2px #333"
            @sliding-start="onSlideStart"
            @sliding-end="onSlideEnd"
          >
            <b-carousel-slide
              v-for="imagerestaurant in imagerestaurants"
              :key="imagerestaurant.id"
              :img-src="`${apiDomain}/myapp/public/uploads/files_restaurant/${imagerestaurant.url_image}`"
            ></b-carousel-slide>
          </b-carousel>
        </div>
        <div class="col-md-5">
          <h1 class="display-4" style="color: #333">
            {{ restaurant.nom }}
            <i
              v-if="proprietairerestau.proprestau == 0"
              onmouseover="this.style.cursor='pointer'"
              title="Valider le proprietaire du restaurant"
              style="color: red; float: right"
              class="fas fa-user-check mr-3 fa-xs"
              @click.once="
                validatePropRestau(restaurant.proprestau_id, proprietairerestau)
              "
            ></i>

            <i
              title="Valider le restaurant"
              v-if="restaurant.valide == 0"
              onmouseover="this.style.cursor='pointer'"
              style="color: red"
              class="fas fa-check-square mr-3 fa-xs"
              @click.once="validateRestau(restaurant.id, restaurant)"
            ></i>
          </h1>
          <p style="color: #333">
            <i class="fas fa-map-marker-alt"></i>
            {{ restaurant.adresse }}
          </p>
          <hr class="my-4" />
          <p class="lead" style="color: #333">{{ restaurant.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { apiDomain } from "../config";
export default {
  data() {
    return {
      apiDomain: "https://etnafesapi20212018.etnafes.com",
      formstate: {},
      imagerestaurant: {},
      imagerestaurants: [],
      slide: 0,
      file: null,
      file2: null,
      restaurant: {},
      proprietairerestau: {},
      restaurants: [],
    };
  },

  computed: {
    loggedIn() {
      return this.$store.getters.get_loggedIn;
    },
    proprestau() {
      return this.$store.getters.get_proprestau;
    },

    user() {
      return this.$store.getters.get_user;
    },
  },
  created() {
    this.fetchRestaurant(this.$route.params.id);
  },
  methods: {
    validatePropRestau(id, proprietairerestau) {
      fetch(`${apiDomain}/api/proprestau-validate/${id}`, {
        method: "put",
        body: JSON.stringify(this.proprietairerestau),
        headers: {
          "content-type": "application/json",
        },
      }).then((res) => {
        if (res.status == 200) {
          this.$fire({
            text: "Proprietaire restaurant validé",
            type: "success",
            timer: 90000,
          }).then((r) => {
            window.location.reload();
          });
        }
      });
    },

    validateRestau(id, restaurant) {
      fetch(`${apiDomain}/api/restaurant-validate/${id}`, {
        method: "put",
        body: JSON.stringify(this.restaurant),
        headers: {
          "content-type": "application/json",
        },
      }).then((res) => {
        if (res.status == 200) {
          this.$fire({
            text: "Restaurant validé",
            type: "success",
            timer: 90000,
          }).then((r) => {
            window.location.reload();
          });
        }
      });
    },
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
    fetchRestaurant(id) {
      fetch(`${apiDomain}/api/restaurantad/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.restaurant = res.restaurant;
          this.proprietairerestau = res.restaurant.proprietairerestau;

          this.imagerestaurants = res.restaurant.images_restaurant;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

