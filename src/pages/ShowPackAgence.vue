<template>
  <div class="content">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb" style="background-color: #a6bfe6 !important">
        <li class="breadcrumb-item">
          <!-- <a href="/nouveaupack/agence">Prestataire de Services</a> -->
          <router-link :to="{ name: 'nouveau_pack_agence_active' }"
            >Prestataire de Services</router-link
          >
        </li>
        <li
          class="breadcrumb-item active"
          style="color: #000"
          aria-current="page"
        >
          Détails Pack
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
    <div
      class="container"
      style="margin-bottom: 70px"
      v-if="pack.adagence_id == propagence[0].id && loaded==true" 
    >
      <div class="row">
        <div class="col-md-8">
          <b-card no-body>
            <h2 style="margin-left: 20px; margin-top: 5px; color: #000">
              {{ pack.titre }}
              <!-- <router-link :to="{name:'edit_pack_agence', params: { id:pack.id} }">
                <i class="fa fa-xs fa-edit text-info mr-3" title="Modifier le pack"></i>
              </router-link>-->
            </h2>
            <b-tabs content-class="mt-3" justified>
              <b-tab no-body title="Photos">
                <div
                  v-for="(zone, k) in pack.zone_pack"
                  v-bind:key="'zone' + k"
                >
                  <b-card-footer
                    v-if="!isHidden22 && k == index"
                    class="footer-slider"
                  >
                    <b-carousel
                      id="carousel-1"
                      v-model="slide"
                      :interval="4000"
                      controls
                      indicators
                      style="text-shadow: 1px 1px 2px #333"
                      @sliding-start="onSlideStart"
                      @sliding-end="onSlideEnd"
                    >
                      <div>
                        <b-carousel-slide
                          id="carousel22"
                          v-for="(image, k) in zone.zone_touristique.image"
                          v-bind:key="'im' + k"
                          :text="zone.nom"
                          :img-src="`${apiDomain}/myapp/public/uploads/files_zones/${image.url_image}`"
                        >
                          <h1
                            style="
                              background-color: rgba(0, 0, 0, 0.3);
                              padding: 10px;
                            "
                          >
                            {{ zone.zone_touristique.nom }}
                          </h1>
                        </b-carousel-slide>
                      </div>
                    </b-carousel>
                  </b-card-footer>
                </div>
                <div
                  class="row"
                  v-if="isHidden22"
                  style="padding: 0px 13px 13px 13px"
                >
                  <div class="col-md-12">
                    <img loading="lazy"
                      alt="pack"
                      id="carousel22"
                      :src="`${apiDomain}/myapp/public/uploads/files_packs/${pack.image_couverture}`"
                    />
                  </div>
                </div>
                <div class="row" style="margin-top: -36px">
                  <div
                    class="col-md-4"
                    v-for="(zone, k) in pack.zone_pack"
                    v-bind:key="'z' + zone.zone_touristique_id"
                    @click="(index = k), (isHidden22 = false)"
                  >
                    <b-card-footer class="footer-slider">
                      <b-carousel
                        v-model="slide"
                        :interval="4000"
                        controls
                        indicators
                        style="text-shadow: 1px 1px 2px #333; margin-top: 30px"
                        @sliding-start="onSlideStart"
                        @sliding-end="onSlideEnd"
                      >
                        <b-carousel-slide
                          id="carousel11"
                          v-for="(image, k) in zone.zone_touristique.image"
                          v-bind:key="'imm' + k"
                          :text="zone.nom"
                          :img-src="`${apiDomain}/myapp/public/uploads/files_zones/${image.url_image}`"
                        >
                          <h4 style="color: #fff">
                            {{ zone.zone_touristique.nom }}
                          </h4>
                        </b-carousel-slide>
                      </b-carousel>
                    </b-card-footer>
                  </div>
                </div>
              </b-tab>

              <b-tab no-body title="Vidéos" style="padding: 15px">
                <div
                  v-for="(zone, j) in pack.zone_pack"
                  v-bind:key="zone.zone_touristique_id"
                >
                  <b-embed
                    v-if="!isHidden5 && j == index1"
                    type="iframe"
                    aspect="16by9"
                    :src="zone.zone_touristique.url_video"
                    allowfullscreen
                  ></b-embed>
                </div>
                <b-embed
                  v-if="isHidden5"
                  type="iframe"
                  aspect="16by9"
                  :src="pack.url_video"
                  allowfullscreen
                ></b-embed>
                <div class="row">
                  <div
                    class="col-md-4"
                    v-for="(zone, j) in pack.zone_pack"
                    v-bind:key="zone.zone_touristique_id"
                  >
                    <span
                      onmouseover="this.style.cursor='pointer'"
                      style="color: #333; margin-top: 10px"
                      @click="(index1 = j), (isHidden5 = false)"
                      >{{ zone.zone_touristique.nom }}</span
                    >
                    <b-embed
                      style="margin-top: 10px"
                      type="iframe"
                      aspect="16by9"
                      :src="zone.zone_touristique.url_video"
                      allowfullscreen
                    ></b-embed>
                  </div>
                </div>
              </b-tab>

              <b-tab title="Description" style="padding: 15px">
                <b-card-text>{{ pack.description }}</b-card-text>

                <div v-for="(zone, i) in pack.zone_pack" v-bind:key="i">
                  <h4 style="color: #333">
                    &nbsp;-{{ zone.zone_touristique.nom }} :
                  </h4>
                  <b-card-text>{{
                    zone.zone_touristique.description
                  }}</b-card-text>
                  <br />
                </div>
              </b-tab>

              <b-tab title="Programme" style="padding: 15px">
                <div
                  v-for="(programme, i) in pack.programmes"
                  v-bind:key="'programme' + i"
                >
                  <div class="jour">
                    <div class="jour-number">{{ i + 1 }}</div>
                    <span class="qodef-line-between-icons">
                      <span class="qodef-line-between-icons-inner"></span>
                    </span>
                    <h4
                      class="jour-nom"
                      style="color: #333; margin-bottom: 0px"
                    >
                      Jour {{ i + 1 }}: &nbsp;{{ programme.titre }}
                    </h4>
                    <h4 class="content-jour">
                      {{ programme.description }}
                      <br />
                      <br />
                    </h4>
                  </div>
                </div>
              </b-tab>

              <b-tab title="Logements" id="test" style="padding: 15px">
                <div class="row" v-if="hebergementpack.length > 0">
                  <div
                    class="col-lg-4"
                    v-for="heb in hebergementpack"
                    v-bind:key="'heb' + heb.id"
                  >
                    <div class="card card1">
                      <div>
                        <b-carousel
                          id="carousel-1"
                          v-model="slide"
                          :interval="4000"
                          controls
                          indicators
                          background="#ababab"
                          img-width="200"
                          img-height="200"
                          style="text-shadow: 1px 1px 2px #333"
                          @sliding-start="onSlideStart"
                          @sliding-end="onSlideEnd"
                        >
                          <div @click="fetchHebergement(heb.hebergement.id)">
                            <b-carousel-slide
                              id="carousellog"
                              v-b-modal.modal-hebergement
                              v-for="(imageheb, k) in heb.hebergement
                                .images_hebergement"
                              v-bind:key="'imheb' + k"
                              :img-src="`${apiDomain}/myapp/public/uploads/files_hebergement/${imageheb.url_image}`"
                            ></b-carousel-slide>
                          </div>
                        </b-carousel>
                      </div>
                      <div class="card-block">
                        <div style="padding-top: 10px">
                          <b>&nbsp;&nbsp;{{ heb.hebergement.nom }}</b>
                          <br />
                          <small
                            class="text-muted"
                            style="
                              color: #717171;
                              font-size: 13px;
                              font-weight: 400;
                            "
                          >
                            &nbsp;&nbsp;
                            {{ heb.hebergement.nbr_voyageurs }} voyageurs
                            <span>.</span>
                            {{ heb.hebergement.nbr_chambre_dispo }} chambre(s)
                          </small>
                          <hr style="margin-bottom: 0rem; margin-top: 0.5rem" />
                          <p class="card-text">
                            <small>
                              <span v-if="heb.hebergement.salle_de_bain == 1">
                                <img loading="lazy"
                                  v-b-tooltip.hover
                                  title="Salle de bain"
                                  src="/bath-etnafes-20.png"
                                />
                                &nbsp;
                              </span>

                              <span v-if="heb.hebergement.lave_linge == 1">
                                <img loading="lazy"
                                  v-b-tooltip.hover
                                  title="Lave linge"
                                  src="/tumble-dry-etnafes.png"
                                />&nbsp;
                              </span>

                              <span v-if="heb.hebergement.chauffage == 1">
                                <img loading="lazy"
                                  v-b-tooltip.hover
                                  title="Chauffage"
                                  src="/heating-etnafes.png"
                                />&nbsp;
                              </span>
                              <span v-if="heb.hebergement.television == 1">
                                <img loading="lazy"
                                  v-b-tooltip.hover
                                  title="Television"
                                  src="/tv-etnafes.png"
                                />&nbsp;
                              </span>

                              <span v-if="heb.hebergement.climatisation == 1">
                                <img loading="lazy"
                                  v-b-tooltip.hover
                                  title="Climatisation"
                                  src="/air-conditioner-etnafes.png"
                                />&nbsp;
                              </span>

                              <span v-if="heb.hebergement.eau_chaude == 1">
                                <img loading="lazy"
                                  v-b-tooltip.hover
                                  title="Eau chaude"
                                  src="/water-heater-etnafes.png"
                                />&nbsp;
                              </span>

                              <span
                                v-if="
                                  heb.hebergement.espace_travail_ordinateur == 1
                                "
                              >
                                <img loading="lazy"
                                  v-b-tooltip.hover
                                  title="Espace de travail"
                                  src="/computer-etnafes.png"
                                />&nbsp;
                              </span>

                              <span v-if="heb.hebergement.espace_enfant == 1">
                                <img loading="lazy"
                                  v-b-tooltip.hover
                                  title="Espace enfant"
                                  src="/espace-enfant-etnafes.png"
                                />&nbsp;
                              </span>

                              <span v-if="heb.hebergement.wifi == 1">
                                <img loading="lazy"
                                  v-b-tooltip.hover
                                  title="WiFi"
                                  src="/wifi-etnafes.png"
                                />&nbsp;
                              </span>

                              <span v-if="heb.hebergement.cuisine == 1">
                                <img loading="lazy"
                                  v-b-tooltip.hover
                                  title="Cuisine"
                                  src="/kitchen-etnafes.png"
                                />&nbsp;
                              </span>
                            </small>
                          </p>
                        </div>
                      </div>
                      <hr style="margin-bottom: 0rem; margin-top: 0.5rem" />

                      <div class="card-block" style="padding: 10px">
                        <i class="tim-icons icon-square-pin"></i>
                        <span style="font-size: 13px"
                          >&nbsp;{{ heb.hebergement.adresse }}.</span
                        >
                      </div>
                      <router-link
                        :to="`/detailshebergement/${heb.hebergement.id}`"
                      >
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

                <div class="row" v-if="hebergementpack.length == 0">
                  <div class="col-md-12">
                    <p>Ce pack est sans logement.</p>
                  </div>
                </div>
              </b-tab>

              <!--  <b-tab title="Restaurants" style="padding: 15px">
                <div
                  style="margin-bottom: 25px"
                  class="row"
                  v-for="v in ville_pack"
                  v-bind:key="'v' + v.id"
                  v-show="v.ville.restaurant.length != 0"
                >
                  <div class="col-md-12">
                    <h4>{{ v.ville.nom }}</h4>
                  </div>
                  <br />
                  <div
                    class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12"
                    v-for="restaurant in v.ville.restaurant"
                    v-show="v.ville.restaurant.length != 0"
                    v-bind:key="'res' + restaurant.id"
                  >
                    <div
                      class="card card1"
                      v-show="v.ville.restaurant.length != 0"
                    >
                      <div>
                        <b-carousel
                          id="carousel-1"
                          v-model="slide"
                          :interval="4000"
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
                      </div>

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

                <div class="row" v-if="restaurants.length == 0">
                  <div class="col-md-12">
                    <p>Pas de restaurants disponibles pour cette ville.</p>
                  </div>
                </div>
              </b-tab> -->

              <b-tab title="Assurance" style="padding: 15px">
                <b-card-text>Frais d'assurance</b-card-text>
              </b-tab>
            </b-tabs>
          </b-card>
        </div>

        <div class="col-md-4" id="map" ref="map">
          <br />

          <gmap-map
            :center="center"
            :zoom="8"
            style="width: 100%; height: 975px"
          >
            <GmapMarker
              icon="/Etnafes-icon02.png"
              v-for="(zo, index) in markers"
              :key="'zo' + index"
              :position="zo.position"
              @click="toggleInfoWindow(zo, index)"
            ></GmapMarker>

            <GmapMarker
              icon="/Etnafes-icon01.png"
              v-for="(m, index) in markersh"
              :key="'mar' + index"
              :position="m.position"
              @click="toggleInfoWindow(m, index)"
            ></GmapMarker>
            <gmap-info-window
              :options="infoOptions"
              :position="infoWindowPos"
              :opened="infoWinOpen"
              @closeclick="infoWinOpen = false"
            >
              <info-content :content="InfoDepanneur"></info-content>
            </gmap-info-window>
          </gmap-map>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MapMarker from "../components/MapMarker";
import MapInfoWindow from "../components/MapInfoWindow";
import InfoDepanneur from "./InfoDepanneur.vue";
import { apiDomain } from "../config";
export default {
  components: {
    "info-content": InfoDepanneur,
    MapMarker,
    MapInfoWindow,
  },
  data() {
    return {
      ville_pack: [],

      hebergementpack: {},
      restaurants: {},
      hebergements: {},
      hebergement: {},
      slide: 0,
      sliding: null,
      infoEmail: null,
      infoToken: null,
      infoContent: "",
      infoWindowPos: {
        lat: 0,
        lng: 0,
      },
      infoWinOpen: false,
      currentMidx: null,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35,
        },
      },
      map: null,
      center: { lat: 36.81897, lng: 10.16579 },
      markers: [],
      InfoDepanneur: [],
      markersh: [],

      places: [],
      currentPlace: null,
      isHidden22: true,
      isHidden5: true,
      index: null,
      index1: null,
      apiDomain: "https://etnafesapi20212018.etnafes.com",
      formstate: {},
      imagepack: {},
      imagepacks: [],
      zones: {},
      file: null,
      file2: null,
      pack: {},
      packs: [],
    };
  },

  computed: {
    loggedIn() {
      return this.$store.getters.get_loggedIn;
    },
    user() {
      return this.$store.getters.get_user;
    },
    propagence() {
      return this.$store.getters.get_propagence;
    },
  },
  created() {
    this.fetchPack(this.$route.params.id);
    this.fetchZones();
    this.fetchZoneHeb(this.$route.params.id);

    Bus.$on("markers_fetched", (data) => {
      this.markers = data.markers;
      if (this.markers.length > 0) {
        this.center = data.markers[0].position;
      }
      // console.log("event data", data);
    });

    Bus.$on("marker_result_clicked", (index) => {
      let targetMarker = this.markers[index];
      this.center = targetMarker.position;
      this.toggleInfoWindow(targetMarker, index);
    });

    Bus.$on("markers_fetched", (data) => {
      this.markersh = data.markersh;
      if (this.markersh.length > 0) {
        this.center = data.markersh[0].position;
      }
    });

    Bus.$on("marker_result_clicked", (index) => {
      let targetMarker = this.markersh[index];
      this.center = targetMarker.position;
      this.toggleInfoWindow(targetMarker, index);
    });
  },
  methods: {
    toggleInfoWindow(marker, idx) {
      this.infoWindowPos = marker.position;
      this.InfoDepanneur = marker.position;

      if (this.currentMidx == idx) {
        this.infoWinOpen = !this.infoWinOpen;
      } else {
        this.infoWinOpen = true;
        this.currentMidx = idx;
      }
    },
    fetchRestaurants(id) {
      axios
        .get(`${apiDomain}/api/restaurants/ville/${id}`)
        .then(({ data }) => (this.restaurants = data.restaurants));
    },

    fetchZoneHeb(id) {
      axios
        .post(`${apiDomain}/api/find/${id}`, { center: this.center })
        .then((response) => {
          let data = response.data;
          Bus.$emit("markers_fetched", data);
        });
    },
    fetchHebergement(id) {
      fetch(`${apiDomain}/api/hebergement/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.hebergement = res.hebergement;
          this.imagehebergements = res.hebergement.images_hebergement;
        })
        .catch((err) => console.log(err));
    },
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
    fetchZones() {
      fetch(`${apiDomain}/api/allzones`)
        .then((res) => res.json())
        .then((res) => {
          this.zones = res.zones;
        })
        .catch((err) => console.log(err));
    },
    deleteImage(id) {
      if (confirm("Are You Sure?")) {
        fetch(`${apiDomain}/api/imagesproduitdelete/${id}`, {
          method: "delete",
        })
          .then((res) => res.json())
          .then((data) => {
            this.$noty.success("l'image a été bien supprimé...", {
              killer: true,
              timeout: 6000,
              layout: "topCenter",
            });
            this.fetchTestProduitImage(this.$route.params.id);
          })
          .catch((err) => console.log(err));
      }
    },

    onFileChange(event) {
      this.imageproduit.url_img = event.target.files[0];
    },
    photo: function (event) {
      var input = event.target;
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        var vm = this;
        reader.onload = function (e) {
          vm.imageproduit.url_img = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
      console.log(input.files[0]);
    },

    fetchImage(id) {
      fetch(`${apiDomain}/api/imagesproduit/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.imageproduit = res.imagesproduit;
        })
        .catch((err) => console.log(err));
    },

    fetchPack(id) {
      fetch(`${apiDomain}/api/packs/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.pack = res.packdetail;
          this.hebergementpack = res.packdetail.hebergement_pack;
          this.ville_pack = res.packdetail.ville_pack;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

