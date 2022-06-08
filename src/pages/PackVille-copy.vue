<template>
  <div>
    <TopNavbarHome />

  <!--   <div v-if="loaded==false">
      <br>
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
<div><br></div>
</center>
  </div> -->

    <div class="container" style="padding-bottom: 20px" >
      <center>
        <h3
          style="
            line-height: 20px;
            color: #000;
            padding-top: 30px;
            margin-bottom: 30px;
          "
        >
          {{ nomville }}
          <hr style="border-top: 2px solid #ff931f; width: 10%" />
        </h3>
      </center>
      <div class="row">
        <div class="col-md-12">
          <form class="d-flex">
            <input
              aria-label="label"
              type="search"
              class="form-control me-2"
              v-model="search"
              placeholder="Chercher un pack : exemple par date 2020-10-01"
              style="
                border: 1px solid #ebebeb;
                width: 100%;
                background-color: #fff;
              "
            />
          </form>
        </div>
      </div>
      <br />
<div class="container-fluid d-none d-lg-block">
        
      
      </div>
      <div class="row">
        <div class="col-lg-4" v-for="(pack, index) in packs.data" :key="index">
          <div class="card" style="margin-bottom: 30px; margin-top: 10px">
            <router-link
              :to="{ name: 'DetailsPackAvis', params: { id: pack.pack_id } }"
            >
              <div class="card-img-wrap">
                <img loading="lazy"
                  class="card-img-top"
                  id="imagepack"
                  :src="`${apiDomain}/myapp/public/uploads/files_packs/${pack.image_couverture}`"
                  alt="Card image cap"
                />
                <div
                  v-if="pack.date_deb > new Date().toISOString().split('T')[0]"
                  class="top-left badge"
                  style="background-color: rgb(40, 179, 81)"
                >
                  Nouveau pack
                </div>
                <h4
                  class="centered"
                  style="
                    margin-bottom: 0px !important;
                    border-top-right-radius: 15px;
                    background-color: rgba(34, 42, 66, 0.8);
                  "
                >
                  {{ pack.titre }}
                </h4>

                <div
                  v-if="pack.date_deb < new Date().toISOString().split('T')[0]"
                  class="top-left badge"
                  style="background-color: #ff4012"
                >
                  Pack expiré
                </div>
                <div
                  v-if="pack.date_deb > new Date().toISOString().split('T')[0]"
                  class="top-left badge"
                  style="background-color: rgb(40, 179, 81)"
                >
                  Pack en cours
                </div>
                <button
                  class="top-right btn btn-primary btn-round btn-icon"
                  style="border-radius: 50%"
                >
                  <i
                    class="tim-icons icon-heart-2"
                    style="vertical-align: middle"
                  ></i>
                </button>
              </div>
            </router-link>
            <div class="card-block" style="height: auto">
              <div style="padding-top: 12px; padding-bottom: 12px">
                <center>
                  <img loading="lazy" src="/date-deb-etnafes.png" width="6%" />&nbsp;
                  <span style="color: #5e6d77"
                    >{{ pack.date_deb }} - {{ pack.time }}</span
                  >
                  <br />
                </center>
              </div>

              <hr style="margin-top: 0rem; margin-bottom: 0rem" />

              <!-- moez resppnsive -->

              <div class="row images_pack_home">
                <!--  <div class="col-mx-2 offset-md-1">
                  <center>
                    <img loading="lazy"
                      class="imgWidthHome"
                      v-b-tooltip.hover
                      title="Prix enfant < 4ans"
                      src="/bebe-etnafes1.png"
                    />
                  </center>
                </div> -->
                <!-- <div class="col-mx-2">
                  <center>
                    <img loading="lazy"
                      v-b-tooltip.hover
                      title="Prix enfant de 4 à 15ans"
                      src="/enfant-etnafes1.png"
                      class="imgWidthHome"
                    />
                  </center>
                </div> -->

                <div class="col-md-3">
                  <center>
                    <img loading="lazy"
                      v-b-tooltip.hover
                      title="Prix adulte"
                      src="https://img.icons8.com/ios-filled/20/000000/flash-on.png/"
                      class="imgWidthHome"
                    />
                  </center>
                </div>

                <div class="col-md-3">
                  <center>
                    <img loading="lazy"
                      v-b-tooltip.hover
                      title="Nombres des personnes"
                      src="/home/hebergement/etnafes-tn-travel-hote.png"
                      class="imgWidthHome"
                    />
                  </center>
                </div>
                <div class="col-md-3">
                  <center>
                    <img loading="lazy"
                      v-b-tooltip.hover
                      title="Niveau d'activités physique"
                     src="https://img.icons8.com/ios-filled/20/000000/activity.png/"
                      class="imgWidthHome"
                    />
                  </center>
                </div>
              </div>
              <!-- 2 eme row  -->
              <div class="row images_pack_home">
                <!-- <div class="col-mx-2 offset-md-1">
                  <b>
                    <center class="prixPA">{{ pack.prix_enfant4 }}dt</center>
                  </b>
                </div> -->
                <!--  <div class="col-mx-2">
                  <b>
                    <center class="prixPA">{{ pack.prix_enfant15 }}dt</center>
                  </b>
                </div> -->

                <div class="col-md-3">
                  <center>
                    <b class="prixPA2">{{ pack.prix_fix }}dt</b>
                  </center>
                </div>

                <div class="col-md-3">
                  <center>
                    <b class="prixPA2">{{ pack.nb_place_max }}</b>
                  </center>
                </div>
                <div class="col-md-3">
                  <center>
                    <b class="prixPA2">{{ pack.adrenaline }}</b>
                  </center>
                </div>
              </div>
              <!-- <div class="row" style="padding-top:7px;padding-bottom:7px">
                <div class="col-md-2 offset-md-1">
                  <center>
                    <img loading="lazy"
                      class="imgWidthHome"
                      v-b-tooltip.hover
                      title="Prix enfant <4ans"
                      src="/bebe-etnafes1.png"
                    />
                    <br />
                    <b style="font-size:12px;color:#333">{{ pack.prix_enfant4}}dt</b>
                  </center>
                </div>

                <div class="col-md-2">
                  <center>
                    <img loading="lazy"
                      class="imgWidthHome"
                      v-b-tooltip.hover
                      title="Prix enfant de 4 à 15ans"
                      src="/enfant-etnafes1.png"
                    />
                    <br />
                    <b style="font-size:12px;color:#333">{{ pack.prix_enfant15}}dt</b>
                  </center>
                </div>
                <div class="col-md-2">
                  <center>
                    <img loading="lazy"
                      class="imgWidthHome"
                      v-b-tooltip.hover
                      title="Prix adulte"
                      src="/adult-etnafes1.png"
                    />
                    <br />
                    <b style="font-size:12px;color:#333">{{ pack.prix_fix}}dt</b>
                  </center>
                </div>

                <div class="col-md-2">
                  <center>
                    <img loading="lazy"
                      class="imgWidthHome"
                      v-b-tooltip.hover
                      title="Nombres des personnes"
                      src="/nombre-reservation-etnafes1.png"
                    />
                    <br />

                    <b style="font-size:12px;color:#333">{{ pack.nb_place_max}}</b>
                  </center>
                </div>
                <div class="col-md-2">
                  <center>
                    <img loading="lazy"
                      class="imgWidthHome"
                      v-b-tooltip.hover
                      title="Niveau d'activités physique"
                      src="/extreme-etnafes1.png"
                    />
                    <br />
                    <b style="font-size:12px;color:#333">{{ pack.adrenaline }}</b>
                  </center>
                </div>
              </div>-->
            </div>
          </div>
        </div>
      </div>

      <pagination
        :data="packs"
        @pagination-change-page="fetchPaginate"
      ></pagination>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import HighlightWords from "vue-highlight-words";
import { VueDatePicker } from "@mathieustan/vue-datepicker";
import "@mathieustan/vue-datepicker/dist/vue-datepicker.min.css";
import MapMarker from "../components/MapMarker";
import MapInfoWindow from "../components/MapInfoWindow";
import axios from "axios";
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
import TopNavbarHome from "./Layout/TopNavbarHome.vue";
import Footer from "./Layout/Footer.vue";
import { apiDomain } from "../config";
import InfoDepanneur from "./InfoDepanneur.vue";
export default {
  components: {
    VueDatePicker,
    HighlightWords,
    TopNavbarHome,
    Footer,
    VueperSlides,
    VueperSlide,
    "info-content": InfoDepanneur,
    MapMarker,
    MapInfoWindow,
  },
  data() {
    return {
      loaded :false,

      search: "",
      villes: [],
      ages: [],
      pagination: {},

      nb_adulte: 1,
      nb_enfant: 0,
      apiDomain: "https://etnafesapi20212018.etnafes.com",
      packsvedette: [],
      packs: [],
      hebergements: {},
      nomville: "",
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
  computed: {
    loggedIn() {
      return this.$store.getters.get_loggedIn;
    },
    keywords() {
      return this.search.split(" ");
    },
    filteredPacks: function () {
      let packpag = this.packs.data;
      return packpag.filter((pack) => {
        return (
          pack.titre.match(this.search) ||
          pack.date_deb.match(this.search) ||
          pack.date_fin.match(this.search) ||
          pack.description.match(this.search)
        );
      });
    },
  },
  created() {
    this.fetchPacksVille(this.$route.params.id);
    this.fetchVille(this.$route.params.id);

    this.fetchVilles();
  },

  methods: {
    fetchVille(id) {
      axios
        .get(`${apiDomain}/api/ville/${id}`)
        .then(
          ({ data }) => (
            (this.ville = data.ville), (this.nomville = data.ville.nom)
          )
        );
    },
    fetchVilles() {
      axios
        .get(`${apiDomain}/api/villes`)
        .then(({ data }) => (this.villes = data));
    },

    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },

    fetchPacksVille(id) {
      axios
        .get(`${apiDomain}/api/packs_ville/${id}`)
        .then(({ data }) => (
          this.loaded = true,

          this.packs = data.packs));
    },

    fetchPaginate(page) {
      if (typeof page === "undefined") {
        page = 1;
      }
      let vm = this;
      fetch(
        `${apiDomain}/api/packs_ville/${this.$route.params.id}?page=` + page
      )
        .then((res) => res.json())
        .then((data) => {
          this.packs = data.packs;
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

<style scoped>
.top-left {
  position: absolute;
  color: #fff;
  padding: 10px;
  top: 0px;
  left: 0px;
}

.top-right {
  position: absolute;
  top: 8px;
  right: 16px;
}

.centered {
  letter-spacing: 1.5px;
  font-size: 14px;
  color: #fff;
  padding: 10px;
  position: absolute;
  bottom: 0px;
  left: 0px;
}
</style>