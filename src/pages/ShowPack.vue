<template>
  <div class="content">
    <div class="container" style="margin-bottom: 70px; margin-top: 20px">
      <div class="row">
        <div class="col-md-8">
          <b-card no-body>
            <h2 style="margin-left: 20px; margin-top: 30px; color: #000">
              {{ pack.titre }}
              <router-link :to="{ name: 'edit_pack', params: { id: pack.id } }">
                <i
                  class="fa fa-xs fa-edit text-info mr-3"
                  title="Modifier le pack"
                ></i>
              </router-link>

              <!-- <i
                v-if="pack.adagence_id!=null && pack.valide==0"
                onmouseover="this.style.cursor='pointer'"
                style="color:red"
                title="valider le pack"
                @click="validatePack(pack.id,pack)"
                class="far fa-xs fa-check-square"
              ></i>-->

              <i
                v-if="pack.adagence_id != null && pack.valide == 0"
                onmouseover="this.style.cursor='pointer'"
                style="color: red"
                title="Valider le pack"
                class="fas fa-check-square mr-3 fa-xs"
                @click.once="validatePack(pack.id, pack)"
              ></i>
              <i
                v-if="pack.adagence_id != null && adagence.adagence == 0"
                onmouseover="this.style.cursor='pointer'"
                title="Valider le proprietaire de l'agence"
                style="color: red; float: right"
                class="fas fa-user-check mr-3 fa-xs"
                @click.once="validateAdAgence(pack.adagence_id, adagence)"
              ></i>
            </h2>
            <b-tabs content-class="mt-3">
              <b-tab no-body title="Photos">
                <div v-for="(zone, k) in pack.zone_pack" v-bind:key="'zk' + k">
                  <b-card-footer v-if="!isHidden22 && k == index">
                    <b-carousel
                      id="carousel-1"
                      v-model="slide"
                      :interval="4000"
                      controls
                      indicators
                      img-width="200"
                      img-height="200"
                      style="text-shadow: 1px 1px 2px #333; margin-top: 30px"
                      @sliding-start="onSlideStart"
                      @sliding-end="onSlideEnd"
                    >
                      <div>
                        <b-carousel-slide
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
                <b-carousel
                  v-if="isHidden22"
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
                  <div
                    v-for="zone in pack.zone_pack"
                    v-bind:key="'z' + zone.id"
                  >
                    <b-carousel-slide
                      v-for="(image, k) in zone.zone_touristique.image"
                      v-bind:key="'ima' + k"
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
                <div class="row">
                  <div
                    class="col-md-4"
                    v-for="(zone, k) in pack.zone_pack"
                    v-bind:key="'z' + zone.zone_touristique_id"
                    @click="(index = k), (isHidden22 = false)"
                  >
                    <b-card-footer>
                      <b-carousel
                        id="carousel-1"
                        v-model="slide"
                        :interval="4000"
                        controls
                        indicators
                        img-width="200"
                        img-height="200"
                        style="text-shadow: 1px 1px 2px #333; margin-top: 30px"
                        @sliding-start="onSlideStart"
                        @sliding-end="onSlideEnd"
                      >
                        <b-carousel-slide
                          v-for="(image, k) in zone.zone_touristique.image"
                          v-bind:key="'img' + k"
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

              <b-tab no-body title="Vidéos">
                <div
                  v-for="(zone, j) in pack.zone_pack"
                  v-bind:key="'zn' + zone.zone_touristique_id"
                >
                  <b-embed
                    v-if="!isHidden5 && j == index1"
                    style="margin-top: 30px"
                    type="iframe"
                    aspect="16by9"
                    :src="zone.zone_touristique.url_video"
                    allowfullscreen
                  ></b-embed>
                </div>
                <b-embed
                  v-if="isHidden5"
                  style="margin-top: 50px"
                  type="iframe"
                  aspect="16by9"
                  :src="pack.url_video"
                  allowfullscreen
                ></b-embed>
                <div class="row">
                  <div
                    class="col-md-4"
                    v-for="(zone, j) in pack.zone_pack"
                    v-bind:key="'zz' + zone.zone_touristique_id"
                  >
                    <span
                      style="color: #333; margin-top: 10px"
                      @click="(index1 = j), (isHidden5 = false)"
                      >{{ zone.zone_touristique.nom }}</span
                    >
                    <b-embed
                      style="margin-top: 30px"
                      type="iframe"
                      aspect="16by9"
                      :src="zone.zone_touristique.url_video"
                      allowfullscreen
                    ></b-embed>
                  </div>
                </div>
              </b-tab>

              <b-tab title="Description">
                <b-card-text style="margin-top: 30px">{{
                  pack.description
                }}</b-card-text>

                <div v-for="(zone, i) in pack.zone_pack" v-bind:key="'zi' + i">
                  <h4 style="color: #333">
                    &nbsp;-{{ zone.zone_touristique.nom }} :
                  </h4>
                  <b-card-text>{{
                    zone.zone_touristique.description
                  }}</b-card-text>
                  <br />
                </div>
              </b-tab>

              <b-tab title="Programme">
                <div v-for="(zone, i) in pack.zone_pack" v-bind:key="'zp' + i">
                  <div class="jour">
                    <div class="jour-number">{{ i + 1 }}</div>
                    <span class="qodef-line-between-icons">
                      <span class="qodef-line-between-icons-inner"></span>
                    </span>
                    <h3 class="jour-nom" style="color: #333">
                      Jour {{ i + 1 }}: &nbsp;{{ zone.zone_touristique.nom }}
                    </h3>
                    <h4 class="content-jour">
                      {{ zone.zone_touristique.description }}
                      <br />
                      <br />Départ Collecte et départ de Sousse (Transport
                      disponible du Tunis vers Sousse) vers El Jem. Visite
                      optionnelle de l’Amphithéâtre Romain fondée au courant du
                      3ème siècle ap-JC et classé patrimoine mondial.
                      <br />Départ vers Matmata via Métouia située à 12
                      kilométres de Gabés. Métouia posséde une grande palmeraie
                      (270 hectares environ) et une plage à une dizaine de
                      kilométres de son centre ville. Un lieu de commerce connu
                      avec ses produit du terroir de la région: Hennè Gabsienne,
                      Mloukia, Anbar, Couffins, ...etc.
                      <br />
                      <br />Départ vers Matmata et visite d’une maison
                      troglodytique. Bourg du grand sud tunisien situé dans une
                      région montagneuse nord de la chaîne du Dahar, à une
                      altitude de 600m, Matmata est plantée dans un désert de
                      pierres brulées de soleil où la population et la culture
                      existent encore abutées dans des maisons troglodytiques.
                      La demeure-type s’ordonne autour d’un trou circulaire
                      servant de cour sur laquelle s’ouvrent les chambres.
                      Matmata est le nom d’une tribu berbère qui est elle-même
                      descendante des Temzit.
                      <br />
                      <br />Déjeuner libre à Matmata.
                      <br />
                      <br />Continuation vers Douz, ville dénommée «La Porte du
                      désert» qui est une petite ville de la région de Nefzaoua,
                      de 17.000 habitants et 25 fois plus de palmiers, sur le
                      rive sud-est de Chott El Jerid. Sa principale ressource et
                      la culture du palmiers dattier. Ses oasis sont splendides
                      ainsi que son marché de Jeudi, son artisanat de peaux de
                      dromadaire, ses bijoux berbères et l’élevage du célèbre
                      Sloughi (Le Lévrier Berbère) en font un musée vivant de
                      traditions, dépaysement total garanti. Douz est aussi la
                      plaque tournante du Tourisme Saharien, vue sa situation
                      géographique à la lisière de l’Erg Oriental.
                      <br />
                      <br />Passage facultative au centre d’animation sportive
                      et touristique: Kart-Cross, Buggys, Quads.
                      <br />
                      <br />Balade à dos de dromadaire en extra en plein coeur
                      du sahara vous laissant la liberté d’admirer un magnifique
                      coucher de soleil.
                      <br />
                      <br />Check-in dans un hôtel 4* à Douz. Dîner & logement à
                      l’hôtel.
                    </h4>
                  </div>
                </div>
              </b-tab>

              <!-- <b-tab title="Logements">
                <div class="row" style="padding:20px">
                  <div
                    class="col-md-6"
                    v-for="hebergement in hebergements"
                    v-bind:key="hebergement.id"
                  >
                    <div style="border:1px solid #dbdbdb;padding:10px">
                      <b>{{hebergement.nom}}</b>
                      {{hebergement.nbr_place_dispo}} Place(s) disponible(s)
                      <div v-if="hebergement.nbr_etoile==1">
                        <i class="fas fa-star"></i>
                      </div>
                      <b-card-footer>
                        <b-carousel
                          id="carousel-1"
                          v-model="slide"
                          :interval="4000"
                          controls
                          indicators
                          background="#ababab"
                          img-width="200"
                          img-height="200"
                          style="text-shadow: 1px 1px 2px #333;margin-top:30px"
                          @sliding-start="onSlideStart"
                          @sliding-end="onSlideEnd"
                        >
                          <div @click="fetchHebergement(hebergement.id)">
                            <b-carousel-slide
                              v-b-modal.modal-hebergement
                              v-for="(image,k) in hebergement.images_hebergement"
                              v-bind:key="k"
                              :img-src="`${apiDomain}/myapp/public/uploads/files_hebergement/${image.url_image}`"
                            ></b-carousel-slide>
                          </div>
                        </b-carousel>
                        <br />
                        <b-button
                          @click="fetchHebergement(hebergement.id)"
                          v-b-modal.modal-hebergement
                          variant="warning"
                        >Voir Plus</b-button>
                      </b-card-footer>
                    </div>
                  </div>
                </div>
              </b-tab>-->

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
                                &nbsp;
                                <img loading="lazy"
                                  v-b-tooltip.hover
                                  title="Salle de bain"
                                  src="/bath-etnafes-21.png"
                                />
                                &nbsp;
                              </span>

                              <span v-if="heb.hebergement.lave_linge == 1">
                                &nbsp;
                                <img loading="lazy"
                                  v-b-tooltip.hover
                                  title="Lave linge"
                                  src="/tumble-dry-etnafes-21.png"
                                />&nbsp;
                              </span>

                              <span v-if="heb.hebergement.chauffage == 1">
                                &nbsp;
                                <img loading="lazy"
                                  v-b-tooltip.hover
                                  title="Chauffage"
                                  src="/heating-etnafes-21.png"
                                />&nbsp;
                              </span>
                              <span v-if="heb.hebergement.television == 1">
                                &nbsp;
                                <img loading="lazy"
                                  v-b-tooltip.hover
                                  title="Television"
                                  src="/tv-etnafes-21.png"
                                />&nbsp;
                              </span>

                              <span v-if="heb.hebergement.climatisation == 1">
                                &nbsp;
                                <img loading="lazy"
                                  v-b-tooltip.hover
                                  title="Climatisation"
                                  src="/air-conditioner-etnafes-21.png"
                                />&nbsp;
                              </span>

                              <span v-if="heb.hebergement.eau_chaude == 1">
                                &nbsp;
                                <img loading="lazy"
                                  v-b-tooltip.hover
                                  title="Eau chaude"
                                  src="/water-heater-etnafes-21.png"
                                />&nbsp;
                              </span>

                              <span
                                v-if="
                                  heb.hebergement.espace_travail_ordinateur == 1
                                "
                              >
                                &nbsp;
                                <img loading="lazy"
                                  v-b-tooltip.hover
                                  title="Espace de travail"
                                  src="/computer-etnafes-21.png"
                                />&nbsp;
                              </span>

                              <span v-if="heb.hebergement.espace_enfant == 1">
                                &nbsp;
                                <img loading="lazy"
                                  v-b-tooltip.hover
                                  title="Espace enfant"
                                  src="/espace-enfant-etnafes-21.png"
                                />&nbsp;
                              </span>

                              <span v-if="heb.hebergement.wifi == 1">
                                &nbsp;
                                <img loading="lazy"
                                  v-b-tooltip.hover
                                  title="WiFi"
                                  src="/wifi-etnafes-21.png"
                                />&nbsp;
                              </span>

                              <span v-if="heb.hebergement.cuisine == 1">
                                &nbsp;
                                <img loading="lazy"
                                  v-b-tooltip.hover
                                  title="Cuisine"
                                  src="/kitchen-etnafes-21.png"
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

              <b-tab title="Restaurants" style="padding: 15px">
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

                <!--  <div class="row" v-if="restaurants.length==0">
                  <div class="col-md-12">
                    <p>Pas de restaurants disponibles pour cette ville.</p>
                  </div>
                </div>-->
              </b-tab>
              <b-tab title="Assurance">
                <b-card-text style="margin-top: 30px"
                  >Frais d'assurance</b-card-text
                >
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
              icon="/logo-Etnafess-marker-maps-voyage.png"
              v-for="(m, index) in markers"
              :key="'mi' + index"
              :position="m.position"
              @click="toggleInfoWindow(m, index)"
            ></GmapMarker>

            <GmapMarker
              icon="/logo-Etnafess-marker-maps-voyage-logement.png"
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
      restaurants: {},

      center: { lat: 36.81897, lng: 10.16579 },
      infoContent: "",
      infoWindowPos: {
        lat: 0,
        lng: 0,
      },
      hebergementpack: {},

      infoWinOpen: false,
      currentMidx: null,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35,
        },
      },
      map: null,
      markers: [],
      InfoDepanneur: [],
      markersh: [],

      places: [],
      currentPlace: null,
      hebergements: {},
      hebergement: {},
      slide: 0,
      sliding: null,
      isHidden22: true,
      isHidden5: true,
      index: null,
      index1: null,
      apiDomain: "https://etnafesapi20212018.etnafes.com",
      formstate: {},
      imagepack: {},
      imagepacks: [],
      zones: {},
      adagence: {},

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
  },
  created() {
    this.fetchPack(this.$route.params.id);
    this.fetchZones();
    /* this.fetchLogements(this.$route.params.ville_id); */
    this.fetchLocations(this.$route.params.id, this.$route.params.ville_id);
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
      if (this.markersh.length > 0) {
        this.center = data.markersh[0].position;
      }
      console.log("event data", data);
    });

    Bus.$on("marker_result_clicked", (index) => {
      let targetMarker = this.markersh[index];
      this.center = targetMarker.position;
      this.toggleInfoWindow(targetMarker, index);
    });
  },
  methods: {
    validateAdAgence(id, adagence) {
      fetch(`${apiDomain}/api/adagence-validate/${id}`, {
        method: "put",
        body: JSON.stringify(this.adagence),
        headers: {
          "content-type": "application/json",
        },
      }).then((res) => {
        if (res.status == 200) {
          this.$fire({
            text: "Admin agence validé",
            type: "success",
            timer: 90000,
          }).then((r) => {
            window.location.reload();
          });
        }
      });
    },

    validatePack(id, pack) {
      fetch(`${apiDomain}/api/pack-validate/${id}`, {
        method: "put",
        body: JSON.stringify(this.pack),
        headers: {
          "content-type": "application/json",
        },
      }).then((res) => {
        if (res.status == 200) {
          this.$fire({
            text: "Pack validé",
            type: "success",
            timer: 90000,
          }).then((r) => {
            window.location.reload();
          });
        }
      });
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
    validatePack(id, pack) {
      fetch(`${apiDomain}/api/pack-validate/${id}`, {
        method: "put",
        body: JSON.stringify(this.pack),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())

        .then((data) => {
          if (confirm("Pack validée")) {
            window.location.reload();
          }
        })
        .catch((err) => console.log(err));
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

    fetchLocations(id) {
      axios
        .post(`${apiDomain}/api/find/${id}`, { center: this.center })
        .then((response) => {
          let data = response.data;
          Bus.$emit("markers_fetched", data);
        });
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
      axios
        .get(`${apiDomain}/api/packsad/${id}`)
        .then(
          ({ data }) => (
            (this.pack = data.packdetail),
            (this.adagence = data.packdetail.agence),
            (this.hebergementpack = data.packdetail.hebergement_pack),
            (this.ville_pack = data.packdetail.ville_pack)
          )
        );
    },

    /* fetchPack(id) {
      fetch(`${apiDomain}/api/packs/${id}`)
        .then(res => res.json())
        .then(res => {
          this.pack = res.packdetail;
        })
        .catch(err => console.log(err));
    } */
  },
};
</script>

