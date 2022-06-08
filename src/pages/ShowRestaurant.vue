<template>
  <div class="content">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb" style="background-color: #a6bfe6 !important">
        <li class="breadcrumb-item">
          <!-- <a href="/nouveaurestaurant">Espace Restaurant</a> -->
          <router-link :to="{ name: 'nouveau_restaurantactive' }"
            >Espace Restaurant</router-link
          >
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

     <div v-if="loaded==false">
    <center>
    <div class="spinner-grow text-dark" role="status" style="width: 15px; 
    height: 15px;">
  <span class="sr-only">Loading...</span>
  
</div>&nbsp;
<div class="spinner-grow text-dark" role="status" style="width: 15px; 
    height: 15px;">
  <span class="sr-only">Loading...</span>
  
</div>&nbsp;
<div class="spinner-grow text-dark" role="status" style="width: 15px; 
    height: 15px;">
  <span class="sr-only">Loading...</span>
  
</div>&nbsp;
<div class="spinner-grow text-dark" role="status" style="width: 15px; 
    height: 15px;">
  <span class="sr-only">Loading...</span>
  
</div>
</center>
  </div>
    <div class="jumbotron" v-if="proprietairerestau.id == proprestau[0].id && loaded==true">
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
          <h1 class="display-4" style="color: #333">{{ restaurant.nom }}</h1>
          <p style="color: #333">
            <i class="fas fa-map-marker-alt"></i>
            {{ restaurant.adresse }}
          </p>
          <hr class="my-4" />
          <p class="lead" style="color: #333">{{ restaurant.description }}</p>
        </div>
      </div>
    </div>

    <div class="container" v-if="proprietairerestau.id != proprestau[0].id && loaded==true">>
      <card>
        <p>Vous n'avez pas le droit de consulter ce restaurant</p>
      </card>
    </div>
  </div>
</template>
<script>
import { apiDomain } from "../config";
import { Card, BaseInput } from "@/components/index";

export default {
  components: {
    Card,
    BaseInput,
  },
  data() {
    return {
      loaded :false,

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
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
    fetchRestaurant(id) {
      fetch(`${apiDomain}/api/restaurant/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.loaded = true;
          this.restaurant = res.restaurant;
          this.proprietairerestau = res.restaurant.proprietairerestau;
          this.imagerestaurants = res.restaurant.images_restaurant;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

