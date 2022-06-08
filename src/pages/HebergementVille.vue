<template>
  <div>
    <TopNavbarHome />

    <div class="container" style="padding-top: 70px; padding-bottom: 40px">
      <div class="row">
        <div
          class="col-lg-4"
          v-for="hebergement in hebergementsville"
          :key="hebergement.id"
        >
          <div class="card" style="margin-bottom: 30px; margin-top: 10px">
            <b-carousel
              id="carousel-1"
              v-model="slide"
              :interval="4000"
              controls
              indicators
              background="#ababab"
              img-width="200"
              img-height="200"
              style="text-shadow: 1px 1px 2px #333; margin-top: 30px"
              @sliding-start="onSlideStart"
              @sliding-end="onSlideEnd"
            >
              <!-- Text slides with image -->
              <div>
                <b-carousel-slide
                  v-for="(image, k) in hebergement.images_hebergement"
                  v-bind:key="k"
                  :img-src="`${apiDomain}/myapp/public/uploads/files_hebergement/${image.url_image}`"
                ></b-carousel-slide>
              </div>
            </b-carousel>

            <input
              aria-label="label"
              style="margin-top: 20px"
              v-on:click="updateHebergementid"
              type="radio"
              id="male"
              name="gender"
              :value="hebergement.id"
              v-model="hebergement.id"
            />
            &nbsp;
            <router-link :to="`/detailshebergement/${hebergement.id}`"
              >&nbsp;{{ hebergement.nom }}</router-link
            >

            <div class="card-block">
              <h4 class="card-title" style="color: #c37600">
                {{ hebergement.nom }}
              </h4>
              <p class="card-text" style="font-size: 15px">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <br />
            </div>
          </div>
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
      apiDomain: "https://etnafesapi20212018.etnafes.com",
      packsvedette: [],
      hebergementsville: [],
      hebergements: {},
      slide: 0,
      sliding: null,
    };
  },

  created() {
    this.fetchPacksVille(this.$route.params.id);
  },

  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
    fetchPacksVille(id) {
      axios
        .get(`${apiDomain}/api/hebergements/ville/${id}`)
        .then(({ data }) => (this.hebergementsville = data.hebergements));
    },
  },
};
</script>