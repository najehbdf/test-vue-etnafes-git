<template>
 <div >
 <TopNavbarHome></TopNavbarHome>   
    

        <div class="container"   >     
          <div class="row" style="position: fixed; background: #fff; bottom: 0; right: 0; left: 0; padding: 15px; z-index: 1; margin: 0; border-top: 1px solid rgb(221, 221, 221) !important;">
            <div class="col-md-2 d-none d-lg-block">
              <h4 style="color:#000">À proximité</h4>

            </div>

            <div class="col-md-2 d-none d-lg-block">
              <button @click="get_affiche_pack" class="button-28" role="button">Maisons d’hôtes</button>

            </div>

<div class="col-md-2 d-none d-lg-block">
              <button @click="get_affiche_maison_hote" class="button-28" role="button">Packs</button>

            </div>
            <div class="col-md-2 d-none d-lg-block">
              <button class="button-28" role="button" @click="get_affiche_restaurant">Restaurants</button>

            </div>
            
            <div class="col-md-2 d-none d-lg-block">
              <button @click="get_affiche_zone" class="button-28" role="button">Zones touristiques</button>

            </div>

            <div class="col-md-2 d-none d-lg-block">
              <button @click="affiche_pack=1 ;
      affiche_maison_hote=1;affiche_restaurant = 1;affiche_zone=1" class="button-28" role="button">Tous</button>

            </div>

          
          
          </div>

          <div class="row d-lg-none" style="position: fixed; background: #fff; bottom: 0; right: 0; left: 0; padding: 15px; z-index: 1; margin: 0; border-top: 1px solid rgb(221, 221, 221) !important;">
            <div class="col-md-12">
              <h4 style="color:#000;font-weight:bold">À proximité</h4>

            </div>

            <div class="col-mx-2">
              <button style="margin-bottom:5px" @click="get_affiche_pack" class="button-28" role="button">Maisons d’hôtes</button>

            </div>&nbsp;

<div class="col-mx-2">
              <button style="margin-bottom:5px" @click="get_affiche_maison_hote" class="button-28" role="button">Packs</button>

            </div>&nbsp;
            <div class="col-mx-2">
              <button style="margin-bottom:5px" class="button-28" role="button" @click="get_affiche_restaurant">Restaurants</button>

            </div>&nbsp;
            
            <div class="col-mx-2">
              <button style="margin-bottom:5px" @click="get_affiche_zone" class="button-28" role="button">Zones touristiques</button>

            </div>&nbsp;

            <div style="margin-bottom:5px" class="col-mx-2">
              <button @click="affiche_pack=1 ;
      affiche_maison_hote=1;affiche_restaurant = 1;affiche_zone=1" class="button-28" role="button">Tous</button>

            </div>

          
          
          </div>

        
          <br>

        </div>
<!-- new -->
<div class="container" v-show="affiche_pack  == 1" >  
   
<h4   style="color:#000;margin-top: -25px;">Les maisons d’hôtes à proximité :</h4> 
<div class="container" style="margin-top: -20px;"  > 
          <div class="row" style="margin-right:0px !important">

            
          <div class="col-lg-6" v-for="(hebergement,index) in hebergements"
            :key="hebergement.id" v-show="getDistanceFromLatLonInKm[index]<=50">
            <div class="card" style="margin-bottom: 30px; margin-top: 10px;border: 1px solid #333;">
       <div class="row no-gutters">
              <div class="col-md-4">
                <carousel class="d-none d-lg-block"
                  
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

                  <p class="card-text" style="color:#000" v-if="hebergement.description.length < 80">
                      {{ hebergement.description }}
                    </p>
                    
                  <p class="card-text" style="color:#000" v-else>
                    {{ hebergement.description.substr(0, 80) + "..."  }}
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

                      <!-- <span>  
                        <i class="tim-icons icon-tag"></i>
                       {{ getDistanceFromLatLonInKm[index]}} Km</span> -->
                   

                    

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
                      <span>
                        <img loading="lazy"
                          width="8%"
                          src="https://img.icons8.com/color/50/000000/visible--v1.png"
                        />
                        <span style="font-weight: bold">{{
                          hebergement.nb_vus
                        }}</span>
                      </span>
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
        </div>
</div>
        </div>
<!-- end new -->
        <div class="container" v-show="affiche_maison_hote == 1"  >  
    
<h4 style="color:#000">Les packs à proximité :</h4> 
<div class="container" style="margin-top: -20px;"  > 
          <div class="row" style="margin-right:0px !important">

            
          <div class="col-lg-4" v-for="(p,index) in packs" :key="p.id" v-show="getDistanceFromLatLonInKmPacks[index]<=50">
            <div class="card" style="margin-bottom: 30px; margin-top: 10px">
              <router-link
                :to="{
                  name: 'DetailsPackAvis',
                  params: { id: p.id, vid: p.ville_id },
                }"
                @click.native="scrollToTop"
              >
                <div class="card-img-wrap">
                  <img loading="lazy"
                    class="card-img imaa"
                    :src="`${apiDomain}/myapp/public/uploads/files_packs/${p.image_couverture}`"
                    alt="Card image cap"
                  />

                  <div
                    class="top-left badge"
                    style="background-color: rgb(40, 179, 81)"
                  >
                    Départ confirmé
                  </div>
                  <h4
                    class="centered"
                    style="
                      margin-bottom: 0px !important;
                      border-top-right-radius: 15px;
                      color: #fff;
                      background-color: rgba(34, 42, 66, 0.8);
                    "
                  >
                    {{ p.titre }}
                  </h4>
                </div>
              </router-link>
              <div class="card-block">
                <div style="padding-top: 12px; padding-bottom: 12px">
                  <center>
                    <img loading="lazy"
                      src="/date-deb-etnafes.png"
                      alt="debut"
                      width="6%"
                    />&nbsp;
                    <span style="color: #5e6d77"
                      >{{ p.date_deb }} <span v-if="p.time!=null">- {{ p.time }}</span></span
                    >
                    <br />
                  </center>
                </div>
                <hr style="margin-top: 0rem; margin-bottom: 0rem" />

                <!-- moez resppnsive -->
<center>
                <div class="row" style="padding:5px">

                  <div class="col">
                    <center>
                      <img loading="lazy" alt="prix adulte"
                        v-b-tooltip.hover 
                        title="Prix adulte" src="https://img.icons8.com/ios-filled/30/000000/flash-on.png"/>
                      
                    </center>
                    <center>
                      <b class="prixPA2">{{ p.prix_fix }}dt</b>
                    </center>
                  </div>

                  <div class="col">
                    <center>
                     <img loading="lazy" src="https://img.icons8.com/ios-filled/30/000000/group-foreground-selected.png"/>
                    </center>
                    <center>
                      <b class="prixPA2">{{ p.nb_place_max }}</b>
                    </center>

                  </div>
                  <div class="col">
                    <center>
                      <img loading="lazy" src="https://img.icons8.com/ios-filled/30/000000/activity.png"/>
                      
                    </center>
                    <center>
                      <b class="prixPA2">{{ p.adrenaline }}</b>
                    </center>
                  </div>
                </div>
</center>
              </div>
            </div>
          </div>
        </div>
</div>
        </div>

        <div class="container" v-show="affiche_restaurant == 1" >  
    
<h4 style="color:#000">Les restaurants à proximité :</h4> 
<div class="container" style="margin-top: -20px;"  > 
          <div class="row" style="margin-right:0px !important">

            
          <div class="col-lg-4" v-for="(restaurant,index) in restaurants" :key="restaurant.id" v-show="getDistanceFromLatLonInKmRestau[index]<=50">
            <div class="card" style="margin-bottom: 30px; margin-top: 10px">
             <b-carousel
                          id="carousel-1"
                        
                          :interval="8000"
                          controls
                          indicators
                          background="#ababab"
                          img-width="200"
                          img-height="200"
                          style="text-shadow: 1px 1px 2px #333"
                          @sliding-start="onSlideStart"
                          @sliding-end="onSlideEnd"
                        >
                          <div @click="fetchRestaurant(restaurant.id)">
                            <b-carousel-slide
                              id="carousellog"
                              v-b-modal.modal-restaurant
                              v-for="(image, k) in restaurant.images_restaurant"
                              v-bind:key="'imres' + k"
                              :img-src="`${apiDomain}/myapp/public/uploads/files_restaurant/${image.url_image}`"
                            ></b-carousel-slide>
                          </div>
                        </b-carousel>
              <div class="card-block" style="padding: 10px">
                        <b>&nbsp;&nbsp;{{ restaurant.nom }}</b>
                        <br />
                        <i class="tim-icons icon-square-pin"></i>
                        <span style="font-size: 13px"
                          >&nbsp;{{ restaurant.adresse }}.</span
                        >
                      </div>

                      <router-link :to="`/detailsrestaurant/${restaurant.id}`">
                        <b-button
                          style="
                            margin: 0px 0px;
                            border-radius: 0px 0px 24px 0px;
                            width: 100%;
                          "
                          variant="info"
                          >Voir Plus</b-button
                        >
                      </router-link>
            </div>
          </div>
        </div>
</div>
        </div>

        <div class="container" v-show="affiche_zone == 1"  >  
    
<h4 style="color:#000">Les zones à proximité :</h4> 
<div class="container" style="margin-top: -20px;"  > 
          <div class="row" style="margin-right:0px !important">

            
          <div class="col-lg-4" v-for="(zone,index) in zones" :key="zone.id" v-show="getDistanceFromLatLonInKmZones[index]<=50">
            <div class="card" style="margin-bottom: 30px; margin-top: 10px;">
            <carousel style="height:220px;margin-top:-12px"
                
                :per-page="1"
                :navigate-to="someLocalProperty"
                :mouse-drag="false"
                navigationPrevLabel
                navigationNextLabel
              >
                
                <slide
                  onmouseover="this.style.cursor='pointer'"
                  class="MyCustomClasszone"
                  
                  v-for="(image, km) in zone.image"
                  v-b-modal.modal-zone
                  v-bind:key="km"
              
                 
                >  <router-link  @click.native="scrollToTop"
                  :to="{name:'mapZone', params: { id:zone.id} }">
                  <img loading="lazy"
                  class="previewmoez"
                    @click="fetchZone(zone.id)"
                    width="100%" 
                    :src="`${apiDomain}/myapp/public/uploads/files_zones/${image.url_image}`"
                  />
                  </router-link>
                </slide>
             <!--     </router-link> -->
              </carousel>
              <center>
              <p>{{zone.nom}}</p>
              </center>
              <div class="card-block" style="padding: 10px">
                       
                      </div>

                      
            </div>
          </div>
        </div>
        </div>
        </div>

          
          
    <Footer></Footer>
 </div>
</template>

<script>
import TopNavbarHome from "./Layout/TopNavbarHome.vue";
import Footer from "./Layout/Footer.vue";
import { apiDomain } from "../config";
import * as VueGoogleMaps from "vue2-google-maps";
export default {
  components: {
    TopNavbarHome,

    Footer,
  },

  data() {
    return {
      slide: 0,
      sliding: null,
      affiche_restaurant: 1,
      affiche_pack: 1,
      affiche_maison_hote: 1,
      affiche_zone: 1,
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
      packs: [],

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
      zones: [],
      annonces: [],

      anns: {},
    };
  },

  mounted() {},

  created() {
    if (localStorage.center) {
      this.myCoordinates = JSON.parse(localStorage.center);
    } else {
      this.$getLocation({})
        .then((coordinates) => {
          this.myCoordinates = coordinates;
        })
        .catch((error) => alert(error));
    }

    this.fetchHebergements();
    this.fetchRestaurants();
    this.fetchPacks();
    this.fetchZones();
  },
  methods: {
    fetchZones() {
      fetch(`${apiDomain}/api/allzones`)
        .then((res) => res.json())
        .then((res) => {
          this.zones = res.zones;
        })
        .catch((err) => console.log(err));
    },
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },

    get_affiche_zone() {
      this.affiche_maison_hote = 0;
      this.affiche_pack = 0;
      this.affiche_restaurant = 0;
      this.affiche_zone = 1;
    },
    get_affiche_restaurant() {
      this.affiche_maison_hote = 0;
      this.affiche_pack = 0;
      this.affiche_restaurant = 1;
      this.affiche_zone = 0;
    },
    get_affiche_pack() {
      this.affiche_maison_hote = 0;
      this.affiche_pack = 1;
      this.affiche_restaurant = 0;
      this.affiche_zone = 0;
    },
    get_affiche_maison_hote() {
      this.affiche_pack = 0;
      this.affiche_maison_hote = 1;
      this.affiche_restaurant = 0;

      this.affiche_zone = 0;
    },

    GetAddress() {
      var moez = "";
      var lat = this.myCoordinates.lat;
      var lng = this.myCoordinates.lng;
      var latlng = new this.google.gmapApi.maps.LatLng(lat, lng);
      var geocoder = (geocoder = new this.google.maps.Geocoder());
      geocoder.geocode({ latLng: latlng }, function (results, status) {
        if (status == VueGoogleMaps.gmapApi.maps.GeocoderStatus.OK) {
          if (results[1]) {
            this.adresse = results[1].formatted_address;
          }
        }
      });
    },

    getCurrentLocation() {},

    setPlace__(place) {
      this.currentPlace = place;
    },
    async getStreetAddressFrom(lat, long) {
      try {
        var { data } = await axios.get(
          "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
            lat +
            "," +
            long +
            "&key={yourAPIKey}"
        );
        if (data.error_message) {
          console.log(data.error_message);
        } else {
          this.address = data.results[0].formatted_address;
        }
      } catch (error) {
        console.log(error.message);
      }
    },

    setPlace(place) {
      this.adresse = place;
      if (this.adresse) {
        const marker = {
          lat: this.adresse.geometry.location.lat(),
          lng: this.adresse.geometry.location.lng(),
        };
        this.markers.push({ position: marker });
        this.places.push(this.adresse);
        this.center = marker;
        console.log(marker.lat);
        console.log(marker.lng);
        this.adresse = place;
      }
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
          this.restaurants = res.restaurantsim;
        })
        .catch((err) => console.log(err));
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    fetchPacks() {
      fetch(`${apiDomain}/api/allpacks-non-paginate`)
        .then((res) => res.json())
        .then((res) => {
          this.packs = res.packs;
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

    getDistanceFromLatLonInKmZones() {
      var R = 6371; // Radius of the earth in km
      var dist = [];
      var d = "";
      for (var i = 0; i < this.zones.length; i++) {
        var dLat =
          (this.myCoordinates.lat - this.zones[i].latitude) * (Math.PI / 180); // deg2rad below
        var dLon =
          (this.myCoordinates.lng - this.zones[i].longitude) * (Math.PI / 180); // deg2rad below
        var a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(this.zones[i].latitude * (Math.PI / 180)) *
            Math.cos(this.myCoordinates.lat * (Math.PI / 180)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        dist[i] = R * c;
        dist.push(dist[i]);
      }

      return dist;
    },

    getDistanceFromLatLonInKmPacks() {
      var R = 6371; // Radius of the earth in km
      var dist = [];
      var d = "";
      for (var i = 0; i < this.packs.length; i++) {
        var dLat =
          (this.myCoordinates.lat - this.packs[i].latitude) * (Math.PI / 180); // deg2rad below
        var dLon =
          (this.myCoordinates.lng - this.packs[i].longitude) * (Math.PI / 180); // deg2rad below
        var a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(this.packs[i].latitude * (Math.PI / 180)) *
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
.button-28 {
  appearance: none;
  background-color: transparent;
  border: 1px solid #18181a;
  border-radius: 10px;
  box-sizing: border-box;
  color: #3b3b3b;
  cursor: pointer;
  display: inline-block;
  font-family: Roobert, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
  margin: 0;
  min-height: 45px;
  min-width: 0;
  outline: none;
  padding: 10px 24px;
  text-align: center;
  text-decoration: none;
  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: 100%;
  will-change: transform;
}

.button-28:disabled {
  pointer-events: none;
}

.button-28:hover {
  color: #fff;
  background-color: #1a1a1a;
  box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
  transform: translateY(-2px);
}

.button-28:active {
  box-shadow: none;
  transform: translateY(0);
}
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
.previewmoez {
  /* border-radius: 24px; */
  display: block;
  min-width: 100%;
  padding-bottom: -40%;
  position: absolute;
  margin: auto;
  overflow: hidden;
  background: linear-gradient(118deg, #f6f9fb, #e2ebef);
  position: relative;
  height: 74%;
  top: 13px;
  right: -6px;
  bottom: 0;
  left: 3px;
}
</style>