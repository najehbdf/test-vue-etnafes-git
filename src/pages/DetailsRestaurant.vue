<template>
  <div>
    <TopNavbarHome />

    <div class="container" style="margin-bottom: 70px">
      <div class="row">
        <div class="col-md-8">
          <b-card no-body>
            <h2 style="margin-left: 20px; margin-top: 30px">
              {{ restaurant.nom }}
            </h2>

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
                v-for="(image, k) in restaurant.images_restaurant"
                v-bind:key="k"
                :img-src="`${apiDomain}/myapp/public/uploads/files_restaurant/${image.url_image}`"
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
              icon="/Etnafes-icon01.png"
              :position="markersr.position"
              @click="toggleInfoWindow(markersr)"
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
      hebergements: {},
      restaurant: {},
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
    this.fetchRestaurants(this.$route.params.id);
    this.fetchRestaurantsadr(this.$route.params.id);

    Bus.$on("markers_fetched", (data) => {
      this.markersr = data.markersr;
      this.center = data.markersr.position;
    });

    Bus.$on("marker_result_clicked", (index) => {
      let targetMarker = this.markersr;
      this.center = targetMarker.position;
      this.toggleInfoWindow(targetMarker, index);
    });
  },
  methods: {
    fetchRestaurantsadr(id) {
      axios
        .post(`${apiDomain}/api/findrestau/${id}`, { center: this.center })
        .then((response) => {
          let data = response.data;
          Bus.$emit("markers_fetched", data);
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

    fetchRestaurants(id) {
      fetch(`${apiDomain}/api/restaurant/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.restaurant = res.restaurant;
          this.imagerestaurants = res.restaurant.images_restaurant;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>