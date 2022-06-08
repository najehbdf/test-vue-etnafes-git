<template>
  <div>
    <TopNavbarHome />

    <b-modal id="modal-inscription" title="Réservation">
      <form v-on:submit.prevent="addClient()" class="mb-3">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <input
                aria-label="nom"
                type="text"
                class="form-control"
                placeholder="nom"
                v-model="client.nom"
              />
            </div>
          </div>

          <div class="col-md-6">
            <div class="form-group">
              <input
                aria-label="prenom"
                type="text"
                class="form-control"
                placeholder="prénom"
                v-model="client.prenom"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <input
                aria-label="telephone"
                type="tel"
                class="form-control"
                placeholder="telephone"
                v-model="client.email"
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <select
                class="form-control"
                name="civilite"
                placeholder="civilité"
                v-model="client.civilité"
                required
              >
                <option value="mr" selected>Mr</option>
                <option value="mme">Mme</option>
                <option value="mlle">Mlle</option>
              </select>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <input
                aria-label="email"
                type="email"
                class="form-control"
                placeholder="email"
                v-model="client.email"
              />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-12 col-xs-3">
            <div class="row">
              <div class="col-md-7">
                <div
                  v-for="paiement in paiements"
                  :key="paiement.id"
                  style="padding: 5px; margin-bottom: 20px"
                >
                  <input
                    aria-label="paiement"
                    type="radio"
                    v-bind:key="paiement.id"
                    v-model="paiement_id"
                    v-bind:value="paiement.id"
                    name="paiement_id"
                  />
                  {{ paiement.type }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          class="btn btn-success"
          type="submit"
          fill
          style="margin-left: 10px"
        >
          S'inscrire
        </button>
      </form>
    </b-modal>

    <div class="container" style="margin-bottom: 70px">
      <div class="row">
        <div class="col-md-8">
          <b-card no-body>
            <h2 style="margin-left: 20px; margin-top: 30px">
              {{ hebergement.nom }}
            </h2>

            <p style="margin-left: 20px">
              {{ hebergement.nbr_voyageurs }} voyageurs --
              {{ hebergement.nbr_place_dispo }} places disponibles --
              <span v-if="hebergement.chambre_individuel > 0"
                >{{ hebergement.chambre_individuel }} Chambre individuel--</span
              >
              <span v-if="hebergement.chambre_a_deux > 0"
                >{{ hebergement.chambre_a_deux }} Chambre à deux--</span
              >
              <span v-if="hebergement.chambre_a_trois > 0"
                >{{ hebergement.chambre_a_trois }} Chambre à trois</span
              >
            </p>
            <div id="app" class="container d-lg-none">
            
                  <slider :autoplay="false" autoplayTimeout="100000">
                    <slider-item
                      v-for="(i, index) in get_image"
                      :key="index"
                      :style="i"
                    >
                      <img loading="lazy"
                        :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_hebergement/${i}`"
                      />
                    </slider-item>
                  </slider> 

            </div>
            <div class="d-none d-lg-block">

              <lingallery :iid.sync="currentId" :width="600" :height="400" responsive="true" :items="get_image_url"/>
            <!-- <vue-gallery-slideshow 
                    style="posision: fixed"
                    :images="get_image_url"
                    index="0"
                    @close="index = null"
                  >
                  </vue-gallery-slideshow> -->
            </div>
            <!-- <b-carousel
              id="carousel-1"
              v-model="slide"
              :interval="4000"
              controls
              indicators
              background="#ababab"
              img-width="1024"
              img-height="480"
              style="text-shadow: 1px 1px 2px #333; margin-top: 30px"
              @sliding-start="onSlideStart"
              @sliding-end="onSlideEnd"
            >
              <b-carousel-slide
                v-for="(image, k) in hebergement.images_hebergement"
                v-bind:key="k"
                :img-src="`${apiDomain}/myapp/public/uploads/files_hebergement/${image.url_image}`"
              ></b-carousel-slide>
            </b-carousel> -->

            <div class="col-md-12">
              <div class="row d-none d-lg-block">
                <div class="col-md-12">
                  <br />
                  <h5 style="margin-left: 20px; margin-top: -15px; color: #000">
                    Equipements
                  </h5>
                  <span v-if="hebergement.wifi == 1">
                    <img loading="lazy" src="/wifi-etnafes.png" /> Wi-Fi
                  </span>

                  <span v-if="hebergement.television == 1">
                    <img loading="lazy" src="/tv-etnafes.png" /> Télévision
                  </span>

                  <span v-if="hebergement.chauffage == 1">
                    <img loading="lazy" src="/heating-etnafes.png" /> Chauffage
                  </span>

                  <span v-if="hebergement.cuisine == 1">
                    <img loading="lazy" src="/kitchen-etnafes.png" /> Cuisine
                  </span>

                  <span v-if="hebergement.lave_linge == 1">
                    <img loading="lazy" src="/tumble-dry-etnafes.png" /> Lave-linge
                  </span>
                  <span v-if="hebergement.climatisation == 1">
                    <img loading="lazy" src="/air-conditioner-etnafes.png" /> Climatisation
                  </span>

                  <span v-if="hebergement.eau_chaude == 1">
                    <img loading="lazy" src="/water-heater-etnafes.png" /> Eau Chaude
                  </span>

                  <span v-if="hebergement.salle_de_bain == 1">
                    <img loading="lazy" src="/bath-etnafes.png" /> Salle de bain
                  </span>

                  <span v-if="hebergement.espace_travail_ordinateur == 1">
                    <img loading="lazy" src="/computer-etnafes.png" />
                    &nbsp;Espace de travail pour ordinateur
                  </span>
                  <br />
                  <span v-if="hebergement.espace_enfant == 1">
                    <img loading="lazy" src="/espace-enfant-etnafes.png" />
                    &nbsp;Espace pour enfant
                  </span>
                </div>

                <div class="col-md-6 d-lg-none" style="margin-top: -112px">
                  <br />
                  <h2 style="margin-top: 30px">&nbsp;</h2>
                  <div v-if="hebergement.climatisation == 1">
                    <img loading="lazy" src="/air-conditioner-etnafes.png" /> Climatisation
                    <br />
                    <br />
                  </div>

                  <div v-if="hebergement.eau_chaude == 1">
                    <img loading="lazy" src="/water-heater-etnafes.png" /> Eau Chaude
                    <br />
                    <br />
                  </div>

                  <div v-if="hebergement.salle_de_bain == 1">
                    <img loading="lazy" src="/bath-etnafes.png" /> Salle de bain
                    <br />
                    <br />
                  </div>

                  <div v-if="hebergement.espace_travail_ordinateur == 1">
                    <img loading="lazy" src="/computer-etnafes.png" />
                    &nbsp;Espace de travail pour ordinateur
                    <br />
                    <br />
                  </div>

                  <div v-if="hebergement.espace_enfant == 1">
                    <img loading="lazy" src="/espace-enfant-etnafes.png" />
                    &nbsp;Espace pour enfant
                    <br />
                    <br />
                  </div>
                </div>
              </div>

              <div class="row d-lg-none">
                <h2
                  style="margin-left: 20px; font-size: 17px; font-weight: bold"
                >
                  Equipements
                </h2>
                <div class="col-md-12">
                  <span v-if="hebergement.wifi == 1">
                    <img loading="lazy" src="/wifi-etnafes.png" /> Wi-Fi </span
                  >&nbsp;

                  <span v-if="hebergement.television == 1">
                    <img loading="lazy" src="/tv-etnafes.png" /> Télévision </span
                  >&nbsp;

                  <span v-if="hebergement.chauffage == 1">
                    <img loading="lazy" src="/heating-etnafes.png" /> Chauffage </span
                  >&nbsp;

                  <span v-if="hebergement.cuisine == 1">
                    <img loading="lazy" src="/kitchen-etnafes.png" /> Cuisine </span
                  >&nbsp;

                  <span v-if="hebergement.lave_linge == 1">
                    <img loading="lazy" src="/tumble-dry-etnafes.png" /> Lave-linge </span
                  >&nbsp;

                  <span v-if="hebergement.climatisation == 1">
                    <img loading="lazy" src="/air-conditioner-etnafes.png" />
                    Climatisation </span
                  >&nbsp;

                  <span v-if="hebergement.eau_chaude == 1">
                    <img loading="lazy" src="/water-heater-etnafes.png" /> Eau Chaude </span
                  >&nbsp;

                  <span v-if="hebergement.salle_de_bain == 1">
                    <img loading="lazy" src="/bath-etnafes.png" /> Salle de bain </span
                  >&nbsp;

                  <span v-if="hebergement.espace_travail_ordinateur == 1">
                    <img loading="lazy" src="/computer-etnafes.png" />
                    &nbsp;Espace de travail pour ordinateur </span
                  >&nbsp;

                  <span v-if="hebergement.espace_enfant == 1">
                    <img loading="lazy" src="/espace-enfant-etnafes.png" />
                    &nbsp;Espace pour enfant
                  </span>
                </div>
              </div>
            </div>
          </b-card>
        </div>

        <div class="col-md-4" id="map" ref="map">
          <br />
          <gmap-map
            :center="center"
            :zoom="8"
            style="width: 100%; height: 720px"
          >
            <GmapMarker
              icon="/Etnafes-icon01.png"
              :position="markersh.position"
              @click="toggleInfoWindow(markersh)"
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
    <Footer></Footer>
  </div>
</template>

<script>
import MapMarker from "../components/MapMarker";
import MapInfoWindow from "../components/MapInfoWindow";
import axios from "axios";
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
import TopNavbarHome from "./Layout/TopNavbarHome.vue";
import Footer from "./Layout/Footer.vue";
import { apiDomain } from "../config";
import InfoDepanneur from "./InfoDepanneur.vue";
import VueGallerySlideshow from "vue-gallery-slideshow";
import Lingallery from 'lingallery';


export default {
  components: {
    Lingallery,

    TopNavbarHome,
    Footer,
    VueperSlides,
    VueperSlide,
    "info-content": InfoDepanneur,
    MapMarker,
    MapInfoWindow,
    VueGallerySlideshow,

  },
  data() {
    return {
      paiement_id: "",
      isHidden: true,
      index: null,
      infoContent: "",
      infoWindowPos: {
        lat: 0,
        lng: 0,
      },
      du: "",
      au: "",
      nb_nuit: "",

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

      nb_adulte: this.$route.query.nb_adulte,
      nb_enfant: this.$route.query.nb_enfant,
      apiDomain: "https://etnafesapi20212018.etnafes.com",
      packsvedette: [],
      hebergements: {},
      hebergement: {},
      client: {},
      paiements: {},
      pack: {
        id: "",
        nom: "",
        du: "",
        description: "",
        au: "",
        type: "",
        ville_id: "",
      },
      slide: 0,
      sliding: null,
    };
  },

  created() {
    this.fetchHebergement(this.$route.params.id);
    this.fetchPaiements();
    this.fetchLocations(this.$route.params.id);
    Bus.$on("markers_fetched", (data) => {
      this.markers = data.markers;
      if (this.markers.length > 0) {
        this.center = data.markers[0].position;
      }
      console.log("event data", data);
    });

    Bus.$on("marker_result_clicked", (index) => {
      let targetMarker = this.markers[index];
      this.center = targetMarker.position;
      this.toggleInfoWindow(targetMarker, index);
    });

    Bus.$on("markers_fetched", (data) => {
      this.markersh = data.markersh;
      this.center = data.markersh.position;
    });

    Bus.$on("marker_result_clicked", (index) => {
      let targetMarker = this.markersh;
      this.center = targetMarker.position;
      this.toggleInfoWindow(targetMarker, index);
    });
  },

  computed:{

    get_image() {
       var result = [];
      var moyenne = "";

      const res = this.hebergement.images_hebergement;
      for (var i = 0; i < res.length; i++) {
          moyenne =res[i].url_image;
          result.push(moyenne);
 
      }

      return result;
    },
 get_image_url() {
      var result = [];
      var moyenne = "";

      const res = this.hebergement.images_hebergement;
      for (var i = 0; i < res.length; i++) {
          moyenne =
            "https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_hebergement/" +
            res[i].url_image;
          // result.push(moyenne);
           result.push({ src: moyenne, thumbnail:moyenne });
 
      }

      return result;
    },
  },
  methods: {
    fetchPaiements() {
      axios
        .get(`${apiDomain}/api/paiements`)
        .then(({ data }) => (this.paiements = data));
    },
    hasHistory() {
      return window.history.length > 2;
    },
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

    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
    fetchPacksVedette(ville_id) {
      axios
        .get(`${apiDomain}/api/packs/reservation/${ville_id}`)
        .then(({ data }) => (this.packsvedette = data.pack));
    },

    fetchLocations(id) {
      axios
        .post(`${apiDomain}/api/findheb/${id}`, { center: this.center })
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
    fetchPacks(id) {
      axios
        .get(`${apiDomain}/api/packs/${id}`)
        .then(({ data }) => (this.pack = data.packdetail));
    },
  },
};
</script>