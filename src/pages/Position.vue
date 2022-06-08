<template>
 <div>
    myCoordinates {{myCoordinates}}
    <div class="container" style="height:150px">
<div class="row">

  <div class="col-md-6">
    <v-select :options="['A proximité']" placeholder="recherche a proximité"
 @input="getCurrentLocation"/>
  </div>

  <div class="col-md-3">
    <v-select multiple v-model="type_recherche" :options="['Restaurants','Packs','Hébergements']" placeholder="recherche"
 @input="getCurrentLocation"/>
  </div>

  <div class="col-md-3">
    <router-link
                    name="recherche"
                    :to="{
                      name: 'PositionResultats',
                      query: {},
                    }"
                  >
                    <button
                      type="button"
                      class="btn btn-warning style_btn_rech_home"
                      name="recherche"
                    >
                      <i
                        class="tim-icons icon-zoom-split"
                        style_btn_rech_home
                        style="font-size: 20px"
                      ></i>
                    </button>
                  </router-link>
  </div>
                  <!-- <div class="col-md-6">  
                     <gmap-autocomplete
                      name="adresse"
                      @place_changed="setPlace"
                      @mouseout="addMarker"
                      style="
                    border: 1px solid #ced4da;
                    border-radius: 0.25rem;
                    transition: border-color 0.15s ease-in-out,
                      box-shadow 0.15s ease-in-out;
                    padding: 0.375rem 0.75rem;
                    width: 100%;
                  "
                    >

    <div class="geolocation" v-on:click="getCurrentLocation()">
     <p> proximité</p>
    </div>

                    </gmap-autocomplete> 
                    
                  
                    <input
                      aria-label="label"
                      name="latitude"
                      type="hidden"
                      id="lat"
                      v-model="center.lat"
                      
                    />
                    <input
                      aria-label="label"
                      name="longitude"
                      type="hidden"
                      id="lng"
                      v-model="center.lng"
                 
                    />
                  </div> -->
                </div>
    </div>

                {{center}}
      <div v-show="getDistanceFromLatLonInKm[index]<=50" style="margin-top:30px"
            class="card mb-3 cardheb"
            v-for="(hebergement,index) in hebergements"
            :key="hebergement.id"
          >
            <div class="row no-gutters">
              <div class="col-md-4">
                <carousel
                  class="d-none d-lg-block"
                  :per-page="1"
                  :navigate-to="someLocalProperty"
                  :mouse-drag="false"
                  navigationPrevLabel
                  navigationNextLabel
                >
                  <!-- web -->
                  <slide
                    onmouseover="this.style.cursor='pointer'"
                    class="MyCustomClass1"
                    id="carousel3"
                    v-b-modal.modal-hebergement
                    v-for="(image, k) in hebergement.images_hebergement"
                    v-bind:key="k"
                    :img-src="`${apiDomain}/myapp/public/uploads/files_hebergement/${image.url_image}`"
                    link="#"
                  >
                    <img loading="lazy"
                      @click="fetchHebergement(hebergement.id)"
                      width="100%"
                      :src="`${apiDomain}/myapp/public/uploads/files_hebergement/${image.url_image}`"
                    />
                  </slide>
                </carousel>

                <carousel
                  class="d-lg-none"
                  :per-page="1"
                  :navigate-to="someLocalProperty"
                  :mouse-drag="false"
                  navigationPrevLabel
                  navigationNextLabel
                >
                  <!-- web -->
                  <slide
                    class="MyCustomClass1"
                    id="carousel05"
                    v-b-modal.modal-hebergement
                    v-for="(image, k) in hebergement.images_hebergement"
                    v-bind:key="k"
                    :img-src="`${apiDomain}/myapp/public/uploads/files_hebergement/${image.url_image}`"
                    link="#"
                  >
                    <img loading="lazy"
                      @click="fetchHebergement(hebergement.id)"
                      width="100%"
                      :src="`${apiDomain}/myapp/public/uploads/files_hebergement/${image.url_image}`"
                    />
                  </slide>
                </carousel>
              </div>
              <div class="col-md-8 col-sm-12">
                <div class="card-body">
                  <p
                    class="card-title"
                    
                  >
                    &nbsp;<span style="font-weight: bold; letter-spacing: 1px">{{ hebergement.nom }}</span>&nbsp;
                    
                    <!-- <img loading="lazy"
                      width="5%"
                      src="https://img.icons8.com/color/50/000000/visible--v1.png"
                    />
                    <span style="font-weight:normal">{{hebergement.nb_vus}}</span>-->
                    <router-link
                      class="d-none d-lg-block"
                      :to="`/reservationhebergement/${hebergement.id}`"
                      style="float: right; margin-top: -13px"
                    >
                      <button type="button" class="btn btn-warning btn1">
                        + De détails
                      </button>
                    </router-link>
                  </p>
                  <hr />
                  <p class="card-text" style="color:#000">
                    {{ hebergement.description }}
                    <hr />
                    <small
                      class="text-muted"
                      style="color: #717171; font-size: 13px; font-weight: 400"
                    >
                     <i class="tim-icons icon-single-02"></i>
                      {{ hebergement.nbr_voyageurs }} voyageurs&nbsp;&nbsp;
                     <span v-if="hebergement.nbr_chambre_dispo>0"> 
                     <i class="tim-icons icon-bulb-63"></i>

                      {{ hebergement.nbr_chambre_dispo }} chambre(s)&nbsp;&nbsp;</span>
                    
                     <span>  
                     <i class="tim-icons icon-bank"></i>
                       {{ hebergement.type }}</span>&nbsp;&nbsp;

                       <span>  
                        <i class="tim-icons icon-tag"></i>
                       {{ hebergement.prix_adulte }} dt</span>
                    </small>

                      <span>  
                        <i class="tim-icons icon-tag"></i>
                       {{ getDistanceFromLatLonInKm[index]}} Km</span>
                   

                    

                    <!-- modification -->
                    <br />
                    <!-- <span>
                      <img loading="lazy" src="/Etnafes-icon3.png" style="width: 12px" />
                      &nbsp;{{ hebergement.ville.nom }}</span
                    > -->
                    <!-- modification -->
                    
                  </p>
                  <hr />
                  <p class="card-text">
                    <small>
                      <span v-if="hebergement.salle_de_bain == 1">
                        &nbsp;
                        <img loading="lazy"
                          v-b-tooltip.hover
                          title="Salle de bain"
                          src="bath-etnafes.png"
                        />
                        &nbsp;
                      </span>

                      <span v-if="hebergement.lave_linge == 1">
                        &nbsp;
                        <img loading="lazy"
                          v-b-tooltip.hover
                          title="Lave linge"
                          src="tumble-dry-etnafes.png"
                        />&nbsp;
                      </span>

                      <span v-if="hebergement.chauffage == 1">
                        &nbsp;
                        <img loading="lazy"
                          v-b-tooltip.hover
                          title="Chauffage"
                          src="heating-etnafes.png"
                        />&nbsp;
                      </span>
                      <span v-if="hebergement.television == 1">
                        &nbsp;
                        <img loading="lazy"
                          v-b-tooltip.hover
                          title="Television"
                          src="tv-etnafes.png"
                        />&nbsp;
                      </span>

                      <span v-if="hebergement.climatisation == 1">
                        &nbsp;
                        <img loading="lazy"
                          v-b-tooltip.hover
                          title="Climatisation"
                          src="air-conditioner-etnafes.png"
                        />&nbsp;
                      </span>

                      <span v-if="hebergement.eau_chaude == 1">
                        &nbsp;
                        <img loading="lazy"
                          v-b-tooltip.hover
                          title="Eau chaude"
                          src="water-heater-etnafes.png"
                        />&nbsp;
                      </span>

                      <span v-if="hebergement.espace_travail_ordinateur == 1">
                        &nbsp;
                        <img loading="lazy"
                          v-b-tooltip.hover
                          title="Espace de travail"
                          src="computer-etnafes.png"
                        />&nbsp;
                      </span>

                      <span v-if="hebergement.espace_enfant == 1">
                        &nbsp;
                        <img loading="lazy"
                          v-b-tooltip.hover
                          title="Espace enfant"
                          src="espace-enfant-etnafes.png"
                        />&nbsp;
                      </span>

                      <span v-if="hebergement.wifi == 1">
                        &nbsp;
                        <img loading="lazy"
                          v-b-tooltip.hover
                          title="WiFi"
                          src="wifi-etnafes.png"
                        />&nbsp;
                      </span>

                      <span v-if="hebergement.cuisine == 1">
                        &nbsp;
                        <img loading="lazy"
                          v-b-tooltip.hover
                          title="Cuisine"
                          src="kitchen-etnafes.png"
                        />&nbsp;
                      </span>
                      <div style="float: right">
                        <img loading="lazy"
                          width="50%"
                          src="https://img.icons8.com/color/50/000000/visible--v1.png"
                        />
                        <span style="font-weight: normal">{{
                          hebergement.nb_vus
                        }}</span>
                      </div>
                    </small>
                  </p>
                </div>
              </div>
              <div class="col-md-12 d-lg-none">
                <router-link :to="`/reservationhebergement/${hebergement.id}`">
                  <button type="button" class="btn btn-warning btn1">
                    + De détails
                  </button>
                </router-link>
              </div>
            </div>
          </div>
 </div>
</template>

<script>
import { apiDomain } from "../config";

export default {
  components: {},
  name: "home",

  data() {
    return {
      type_recherche: "",

      adresse: "",
      moez: 2333,
      markers: [],
      places: [],

      center: { lat: 0, lng: 0 },
      currentPlace: null,

      apiDomain: "https://etnafesapi20212018.etnafes.com",
      map: null,
      myCoordinates: {
        lat: 0,
        lng: 0,
      },

      distance: [],
      annsDis: [],
      restaurants: [],
      hebergements: [],
      annsDis: [],
      testLat: 35.67,
      testLng: 10.1,
      /* new  */
      loadCategorie: [],
      Annoonnccee: [],
      loading: true,

      /* end new */

      searchKey: "",
      currentPage: 0,
      itemsPerPage: 1,
      resultCount: 0,

      search: "",
      someLocalProperty: [],

      singlEntreprise: [],
      q: "",
      A: "",
      annoncess: "",
      cats: {},
      userSingll: {
        StatuPack1: "",
        role: "",
      },
      userSingllV: [],
      pagination: {},
      hebergements: [],
      nombreAnnonce: "",
      nombreContact: "",
      list: {},

      annonces: [],

      anns: {},
    };
  },

  mounted() {},

  created() {
    this.fetchHebergements();
    this.fetchRestaurants();
  },
  methods: {
    getCurrentLocation() {
      if (localStorage.center) {
        this.myCoordinates = JSON.parse(localStorage.center);
      } else {
        this.$getLocation({})
          .then((coordinates) => {
            this.myCoordinates = coordinates;
          })
          .catch((error) => alert(error));
      }
    },

    setPlace(place) {
      this.currentPlace = place;
    },

    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.myCoordinates = marker;
        console.log(marker.lat);
        console.log(marker.lng);

        this.currentPlace = null;
      }
    },
    fetchRestaurants() {
      fetch(`${apiDomain}/api/allrestaurants`)
        .then((res) => res.json())
        .then((res) => {
          this.restaurants = res.rest;
        })
        .catch((err) => console.log(err));
    },
    fetchHebergements() {
      fetch(`${apiDomain}/api/all-hebergements`)
        .then((res) => res.json())
        .then((res) => {
          this.hebergements = res.hebergements;
        })
        .catch((err) => console.log(err));
    },

    setPage: function (pageNumber) {
      this.currentPage = pageNumber;
    },
  },

  computed: {
    getDistanceFromLatLonInKm() {
      var R = 6371; // Radius of the earth in km
      var dist = [];
      var d = "";
      for (var i = 0; i < this.hebergements.length; i++) {
        var dLat =
          (this.myCoordinates.lat - this.hebergements[i].latitude) *
          (Math.PI / 180); // deg2rad below
        var dLon =
          (this.myCoordinates.lng - this.hebergements[i].longitude) *
          (Math.PI / 180); // deg2rad below
        var a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(this.hebergements[i].latitude * (Math.PI / 180)) *
            Math.cos(this.myCoordinates.lat * (Math.PI / 180)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        dist[i] = R * c;
        dist.push(dist[i]);
      }

      return dist;
    },

    getDistanceFromLatLonInKmRestau() {
      var R = 6371; // Radius of the earth in km
      var dist = [];
      var d = "";
      for (var i = 0; i < this.restaurants.length; i++) {
        var dLat =
          (this.myCoordinates.lat - this.restaurants[i].latitude) *
          (Math.PI / 180); // deg2rad below
        var dLon =
          (this.myCoordinates.lng - this.restaurants[i].longitude) *
          (Math.PI / 180); // deg2rad below
        var a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(this.hebergements[i].latitude * (Math.PI / 180)) *
            Math.cos(this.myCoordinates.lat * (Math.PI / 180)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        dist[i] = R * c;
        dist.push(dist[i]);
      }

      return dist;
    },

    getProximite() {
      var dist = [];

      for (var i = 0; i < this.getDistanceFromLatLonInKm.length; i++) {
        if (this.getDistanceFromLatLonInKm[i] <= 50) {
          dist.push(this.getDistanceFromLatLonInKm[i]);
        }
      }

      return dist;
    },
    mapCoordinates() {
      if (!this.map) {
        return {
          lat: 0,
          lng: 0,
        };
      }

      return {
        lat: this.map.getCenter().lat().toFixed(0),
        lng: this.map.getCenter().lng().toFixed(0),
      };
    },
  },
};
</script>
<style>
.home {
  background-color: #172b4d;
}

.ca {
  margin: 20px 5px 0px 20px;
}
.col-4 {
  margin: -20px 0px 0px 0px;
}

.cc {
  margin: -20px 0px 0px 0px;
}

.card-body {
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  min-height: 1px;
  padding: 0.25rem;
}
@media (min-width: 1200px) {
  #modal-edit-image {
    max-width: 310px;
    margin: 1.75rem auto;
  }
}
.card-accent-warning {
  border-top: 2px solid #f9b115 !important;
  border-bottom: 2px solid #f9b115 !important;
}

.cNoir {
  color: #fff;
}
</style>