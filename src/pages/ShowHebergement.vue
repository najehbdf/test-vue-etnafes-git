<template>
  <div class="content">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb" style="background-color: #a6bfe6 !important">
        <li class="breadcrumb-item">
          <router-link :to="{ name: 'hebergement_actif' }"
            >Espace Hébergeur</router-link
          >
        </li>
        <li
          class="breadcrumb-item active"
          style="color: #000"
          aria-current="page"
        >
          Détails Hébergement
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
      v-if="hebergement.proprietaire_id == prop[0].id && loaded==true"
    >
      <div class="row">
        <div class="col-md-8">
          <b-card no-body>
            <h2 style="margin-left: 20px; margin-top: 5px">
              {{ hebergement.nom }}
              <!-- <router-link :to="{name:'edit_hebergement', params: { id:hebergement.id} }">
                <i
                  class="fa fa-edit mr-3 fa-xs"
                  style="color:#62b062"
                  title="Modifier le hebergement"
                ></i>
              </router-link>-->
            </h2>

            <p style="margin-left: 20px">
              {{ hebergement.nbr_voyageurs }} voyageurs |
              {{ hebergement.nbr_place_dispo }} places disponibles |
              <span v-if="hebergement.chambre_individuel > 0"
                >{{ hebergement.chambre_individuel }} Chambre individuel |</span
              >
              <span v-if="hebergement.chambre_a_deux > 0"
                >{{ hebergement.chambre_a_deux }} Chambre à deux |</span
              >
              <span v-if="hebergement.chambre_a_trois > 0"
                >{{ hebergement.chambre_a_trois }} Chambre à trois</span
              >
            </p>
            <p style="margin-left: 20px">
              <b>{{ hebergement.prix_adulte }}dt(Adulte)</b> |
              <b>{{ hebergement.prix_enfant }}dt(Enfant moins de 4 ans)</b> |
              <b>{{ hebergement.prix_enfant15 }}dt(Enfant plus de 4 ans)</b>
            </p>
            <b-carousel
              id="carousel-1"
              autoplay="false"
              v-model="slide"
              :interval="9000"
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
                id="carousel23"
                v-for="(image, k) in hebergement.images_hebergement"
                v-bind:key="k"
                :img-src="`${apiDomain}/myapp/public/uploads/files_hebergement/${image.url_image}`"
              ></b-carousel-slide>
            </b-carousel>
            <!-- <vue-three-sixty
              :amount="36"
              imagePath="https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_hebergement"
              fileName="113922ETNAFES-dar-lela-hbiba-3.jpg"
            />-->
            <!-- <Vr360
              :imgSrc="`${apiDomain}/myapp/public/uploads/files_hebergement/${hebergement.images_hebergement[0].url_image}`"
            />-->

            <br />

            <div class="col-md-12">
              <div class="row">
                <div class="col-md-6">
                  <br />
                  <h2 style="margin-left: 20px; margin-top: 30px">
                    Equipements
                  </h2>
                  <div v-if="hebergement.wifi == 1">
                    <img loading="lazy" src="/wifi-etnafes.png" /> Wi-Fi
                    <br />
                    <br />
                  </div>
                  <div v-else>
                    <img loading="lazy" src="/wifi-etnafes.png" />
                    <del>Wi-Fi</del>
                    <br />
                    <br />
                  </div>
                  <div v-if="hebergement.television == 1">
                    <img loading="lazy" src="/tv-etnafes.png" /> Télévision
                    <br />
                    <br />
                  </div>
                  <div v-else>
                    <img loading="lazy" src="/tv-etnafes.png" />
                    <del>&nbsp;Télévision</del>
                    <br />
                    <br />
                  </div>

                  <div v-if="hebergement.chauffage == 1">
                    <img loading="lazy" src="/heating-etnafes.png" /> Chauffage
                    <br />
                    <br />
                  </div>

                  <div v-else>
                    <img loading="lazy" src="/heating-etnafes.png" />
                    <del>&nbsp;Chauffage</del>
                    <br />
                    <br />
                  </div>
                  <div v-if="hebergement.cuisine == 1">
                    <img loading="lazy" src="/kitchen-etnafes.png" /> Cuisine
                    <br />
                    <br />
                  </div>

                  <div v-else>
                    <img loading="lazy" src="/kitchen-etnafes.png" />
                    <del>&nbsp;Cuisine</del>
                    <br />
                    <br />
                  </div>

                  <div v-if="hebergement.lave_linge == 1">
                    <img loading="lazy" src="/tumble-dry-etnafes.png" /> Lave-linge
                    <br />
                    <br />
                  </div>

                  <div v-else>
                    <img loading="lazy" src="/tumble-dry-etnafes.png" />
                    <del>&nbsp;Lave-linge</del>
                    <br />
                    <br />
                  </div>
                </div>
                <div class="col-md-6">
                  <br />
                  <h2 style="margin-top: 30px">&nbsp;</h2>
                  <div v-if="hebergement.climatisation == 1">
                    <img loading="lazy" src="/air-conditioner-etnafes.png" /> Climatisation
                    <br />
                    <br />
                  </div>

                  <div v-else>
                    <img loading="lazy" src="/air-conditioner-etnafes.png" />
                    <del>&nbsp;Climatisation</del>
                    <br />
                    <br />
                  </div>

                  <div v-if="hebergement.eau_chaude == 1">
                    <img loading="lazy" src="/water-heater-etnafes.png" /> Eau Chaude
                    <br />
                    <br />
                  </div>

                  <div v-else>
                    <img loading="lazy" src="/water-heater-etnafes.png" />
                    <del>Eau Chaude</del>
                    <br />
                    <br />
                  </div>

                  <div v-if="hebergement.salle_de_bain == 1">
                    <img loading="lazy" src="/bath-etnafes.png" /> Salle de bain
                    <br />
                    <br />
                  </div>

                  <div v-else>
                    <img loading="lazy" src="/bath-etnafes.png" />
                    <del>&nbsp;Salle de bain</del>
                    <br />
                    <br />
                  </div>

                  <div v-if="hebergement.espace_travail_ordinateur == 1">
                    <img loading="lazy" src="/computer-etnafes.png" />
                    &nbsp;Espace de travail pour ordinateur
                    <br />
                    <br />
                  </div>

                  <div v-else>
                    <img loading="lazy" src="/computer-etnafes.png" />
                    <del>&nbsp;Espace de travail pour ordinateur</del>
                    <br />
                    <br />
                  </div>

                  <div v-if="hebergement.espace_enfant == 1">
                    <img loading="lazy" src="/espace-enfant-etnafes.png" />
                    &nbsp;Espace pour enfant
                    <br />
                    <br />
                  </div>

                  <div v-else>
                    <img loading="lazy" src="/espace-enfant-etnafes.png" />
                    <del>&nbsp;Espace pour enfant</del>
                    <br />
                    <br />
                  </div>
                </div>
              </div>
            </div>

            <div class="container" v-if="nbcomheb > 0">
              <h5 style="color: blue">{{ nbcomheb }} commentaires</h5>
              <br />

              <div class="row">
                <div
                  class="col-md-12"
                  v-for="avisheb in avishebergement"
                  :key="avisheb.id"
                >
                  <div class="row">
                    <div class="col-md-4">
                      <img loading="lazy"
                        :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_guide/1602251763-11598521261.png`"
                        alt="Profile Photo"
                        width="60%"
                      />
                    </div>

                    <div class="col-md-8">
                      {{ avisheb.client.nom }} {{ avisheb.client.prenom }}
                      <rate :length="5" v-model="avisheb.nbr_etoile"></rate>
                      {{ avisheb.created_at }}
                      <div class="row">
                        <p
                          style="
                            color: #333;
                            padding: 20px;
                            text-align: justify;
                            text-justify: inter-word;
                          "
                        >
                          {{ avisheb.commentaire }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
                <br />
              </div>
              <br />

              <br />

              <button
                v-if="nbcomheb > 3"
                @click="fetchAllAvisHebergement(hebergement.id)"
                class="btn btn-outline-success mt-3 btnout"
                fill
              >
                Afficher tous les {{ nbcomheb }} commentaires >>
                <pulse-loader
                  v-if="loadheb == true"
                  :loading="loading"
                  :color="color"
                  :size="size"
                ></pulse-loader>
              </button>
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
    <div class="container" v-if="hebergement.proprietaire_id != prop[0].id && loaded==true">
      <card>
        <p>Vous n'avez pas le droit de consulter cet hébergement</p>
      </card>
    </div>

    <!-- <div class="container">
      <Vr360
        v-for="(image,k) in hebergement.images_hebergement"
        :key="k"
        :imgSrc="`${apiDomain}/myapp/public/uploads/files_hebergement/${image.url_image}`"
      />
    </div>-->
  </div>
</template>
<script>
import MapMarker from "../components/MapMarker";
import MapInfoWindow from "../components/MapInfoWindow";
import { Card } from "@/components/index";

import { VueperSlides, VueperSlide } from "vueperslides";
import InfoDepanneur from "./InfoDepanneur.vue";
import { apiDomain } from "../config";
import Vr360 from "vue-360vr";

export default {
  components: {
    Card,

    Vr360,

    VueperSlides,
    VueperSlide,
    "info-content": InfoDepanneur,
    MapMarker,
    MapInfoWindow,
  },
  data() {
    return {
      loaded :false,

      url: "https://etnafes.com/images/foret-etnafes-voyage.jpg",

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
      InfoDepanneur: [],
      markersh: [],
      places: [],
      currentPlace: null,
      apiDomain: "https://etnafesapi20212018.etnafes.com",
      formstate: {},
      imagehebergement: {},
      imagehebergements: [],
      slide: 0,
      file: null,
      file2: null,
      infoWindowPos: {
        lat: 0,
        lng: 0,
      },
      nbcomheb: "",
      avishebergement: [],
      hebergement: {},
      hebergements: [],
    };
  },

  computed: {
    loggedIn() {
      return this.$store.getters.get_loggedIn;
    },
    prop() {
      return this.$store.getters.get_prop;
    },

    user() {
      return this.$store.getters.get_user;
    },
  },
  created() {
    this.fetchLocations(this.$route.params.id);
    this.fetchHebergement(this.$route.params.id);

    Bus.$on("markers_fetched", (data) => {
      this.markersh = data.markersh;
      if (this.markersh.length > 0) {
        this.center = data.markersh[0].position;
      }
      // console.log("event data", data);
    });

    Bus.$on("marker_result_clicked", (index) => {
      let targetMarker = this.markersh[index];
      this.center = targetMarker.position;
      this.toggleInfoWindow(targetMarker, index);
    });
  },
  methods: {
    fetchLocations(id) {
      axios
        .post(`${apiDomain}/api/findheb/${id}`, { center: this.center })
        .then((response) => {
          let data = response.data;
          Bus.$emit("markers_fetched", data);
        });
    },
    toggleInfoWindow(marker, idx) {
      this.infoWindowPos = marker.position;
      this.InfoDepanneur = marker.position;

      //check if its the same marker that was selected if yes toggle
      if (this.currentMidx == idx) {
        this.infoWinOpen = !this.infoWinOpen;
      }
      //if different marker set infowindow to open and reset current marker index
      else {
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

    updateImage(id, imageproduit) {
      var formData = new FormData();
      formData.append("id", this.imageproduit.id);
      formData.append("produit_id", this.imageproduit.produit_id);
      formData.append("url_img", this.imageproduit.url_img);
      axios
        .post(`${apiDomain}/api/imagesproduitupdate/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.status == 200) {
            if (confirm("photo modifiée avec succés")) {
              window.location.reload();
            }
          }
        })
        .catch(function () {
          console.log("FAILURE!!");
        });
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

    fetchTestProduit(id) {
      fetch(`${apiDomain}/api/testproduit/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.testproduit = res.testproduit;
        })
        .catch((err) => console.log(err));
    },

    fetchImage(id) {
      fetch(`${apiDomain}/api/imagesproduit/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.imageproduit = res.imagesproduit;
        })
        .catch((err) => console.log(err));
    },

    fetchHebergement(id) {
      fetch(`${apiDomain}/api/hebergement/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.loaded = true;

          this.hebergement = res.hebergement;
          this.hebergementid = res.hebergement.id;
        })
        .catch((err) => console.log(err));

      axios
        .get(`${apiDomain}/api/avishebergement/${id}`)
        .then(
          ({ data }) => (
            (this.avishebergement = data.hebergement),
            (this.nbcomheb = data.nbcomheb)
          )
        );
    },

    updateHebergement(id, hebergement) {
      this.hebergement.id = hebergement.id;
      this.hebergement.titre_test = hebergement.titre_test;
      this.hebergement.nom_produit = hebergement.nom_produit;
      this.hebergement.description = hebergement.description;
      this.hebergement.mission = hebergement.mission;
      this.hebergement.client_id = hebergement.client_id;

      fetch(
        `${apiDomain}/api/hebergement/${id}?token=${this.$store.state.token}`,
        {
          method: "put",
          body: JSON.stringify(this.hebergement),
          headers: {
            "content-type": "application/json",
          },
        }
      )
        .then((res) => res.json())

        .then((data) => {
          if (confirm("Hébergement bien modifié")) {
            window.location.reload();
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

