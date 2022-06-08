<template>
  <div>
    <TopNavbarHome />

    <div class="container" style="margin-bottom: 70px">
      <div class="row">
        <div class="col-md-8">
          <b-card no-body>
            <h2 style="margin-left: 20px; margin-top: 30px">{{ zone.nom }}</h2>

            <b-carousel
              id="carousel-1"
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
                v-for="(image, k) in zone.image"
                v-bind:key="k"
                :img-src="`${apiDomain}/myapp/public/uploads/files_zones/${image.url_image}`"
              ></b-carousel-slide>
            </b-carousel>
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
              icon="/logo-Etnafess-marker-maps-voyage.png"
              v-for="(m, index) in markers"
              :key="index"
              :position="m.position"
              @click="toggleInfoWindow(m, index)"
            ></GmapMarker>

            <GmapMarker
              icon="/logo-Etnafess-marker-maps-voyage-logement.png"
              v-for="(m, index) in markersh"
              :key="index"
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
export default {
  components: {
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
      apiDomain: "https://etnafesapi20212018.etnafes.com",
      packsvedette: [],
      zones: {},
      zone: {},
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
    this.fetchZone(this.$route.params.id);
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

    fetchZone(id) {
      fetch(`${apiDomain}/api/zone/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.zone = res.zonetouristique;
          this.imagezones = res.zonetouristique.image;
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