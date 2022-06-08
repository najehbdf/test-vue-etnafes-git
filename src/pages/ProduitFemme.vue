<template>
  <div>
    <TopNavbarHome />
<div v-if="loaded==false">
       <center>
          <h3
            style="
              line-height: 20px;
              color: #000;
              padding-top: 30px;
              margin-bottom: 30px;
            "
          >
             Produits
            <hr style="border-top: 2px solid #ff931f; width: 10%" />
          </h3>
        </center>
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
  </div>
    <div class="container" style="padding-bottom: 20px" v-if="produits.length!=0 && loaded==true" >
      <center>
        <h3  v-if="produits.length!=0"
          style="
            line-height: 20px;
            color: #000;
            padding-top: 30px;
            margin-bottom: 30px;
          "
        >
          Produits de {{produits[0].client.nom}} {{produits[0].client.prenom}}
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
               v-model="searchQuery"
              placeholder="Chercher un produit"
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

      <div class="row">
          <div class="col-sm-12">
            <vueper-slides
              style="margin-left: 30px !important ; margin-top: -5px"
              duration="3000"
              class="no-shadow"
              :visible-slides="4"
              slide-multiple
              :gap="3"
              :slide-ratio="1 / 5"
              :dragging-distance="200"
              :breakpoints="{ 800: { visibleSlides: 2, slideMultiple: 2 } }"
            >
              <vueper-slide
                v-for="(pack, i) in resultQuery"
                v-bind:key="i"
                class="image_slider_home"
              >
                <template #content>
                  <div
                    class="card"
                    style="
                      margin-bottom: 30px;padding: 10px;

                      
                      height: 300px !important;
                      background: #fff;
                    "
                  >
                    <router-link
                      :to="{
                        name: 'DetailsProduit',
                        params: { id: pack.id },
                      }"
                    >
                      <div>
                        <img loading="lazy"
                          style="
                            margin-top: -8px;
                            margin-left: -6px;

                            max-width: 105%;
                          "
                          :src="`${apiDomain}/myapp/public/uploads/files_produits_zones/${pack.image_couverture}`"
                          alt="etnafes-tn-travel-circuits"
                        />
                      </div>
                    </router-link>
                    <div>
                      <span>
                        <button
                          title=" Ajouter à vos favoris ?"
                          class="
                            top-right
                            btn btn-primary btn-round btn-icon
                            NotFav
                          "
                        >
                          <i
                            class="tim-icons icon-heart-2"
                            style="vertical-align: middle"
                          ></i>
                        </button>
                        <span class="top-left">
                          <img loading="lazy"
                            src="/home/hebergement/etnafes-tn-travel-avis.png"
                            style="width: 19px"
                          />
                          0.0
                        </span>
                      </span>
                    </div>
                    <div>
                      <div
                        v-if="pack.qts > 0"
                        class="bottom-right"
                        style="background-color: rgb(40, 179, 81); color: #fff"
                      >
                        Nouveau
                      </div>

                      <div
                        v-if="pack.qts == 0"
                        class="bottom-right"
                        style="background-color: grey; color: #fff"
                      >
                        En rupture
                      </div>
                    </div>
                    <div>
                      <div class="prix_heb">
                        <span class="item-prix">
                          <sup>DT</sup>
                          {{ pack.prix }}
                        </span>
                      </div>
                      <h4
                        class="card-title"
                        style="
                          font-size: 14px;
                          line-height: 2px;
                          margin-top: 14px;font-weight:bold
                        "
                      >
                        {{ pack.titre }}
                      </h4>
                    </div>

                    <div class="row">
                      <div
                        class="col"
                        style="
                          margin-left: 0px;
                          margin-top: 0px;
                          font-size: 13px;
                        "
                      >

                        <img loading="lazy"
                          v-b-tooltip.hover
                          title="nom de femme rurale / artisan"
                          src="/images/home/etnafes-tn-artisan.png"
                          style="width: 33px"
                        />
                        {{ pack.nomC }} {{ pack.prenom }}

                        &nbsp; &nbsp; &nbsp;

                        <img loading="lazy"
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABkklEQVRIie3VP2tTURzG8e9zcjXiVFeHqmkQmjj45w0kcSgigg6+A0cVFN+Ce5cKKgjiKC6dJdk6ikMTWkhTiCCIoI4mNudxiLcmCi49ZrrP9Ht+XM6HA/dyoUiRIomifGg0Gtnws+5hXUcsJRPMR8Or/V779ew6y4cPn8ITxJqsDRS/JYOlZcyLlXrz1F6382wOPnuxseQxdwLhisPk5LFJ2IlxosnxcH5vu711VHul3hzaegQcwgEgG4UKoH7v7XvHsD6Sb/0ohZuOrB8VBbD8DqjO7jIA20ICMMEKOEyLQgpYB7LD7/cJft34f0eB7wCVWsuVWmtzYXC/1+kGfEHiMeL0wuAcBw/zvjD4zywMrtaaddBy3rN/PZwSjWgbg2BzYbAjJwgw6LUPP6kMQJI97SLKEeK0yEngzCLOn5UBHJTjIIyDq6utSzHoQWk03gWI5fJOCljWZUN/bpcP52pXn4p4DWlD+GsKEABzxui+xcP9bvv5XzDcLlVWv9xFvpH6t4j8ctDtvEl2ZpEiRWbzE2XXiySPB0bsAAAAAElFTkSuQmCC"
                        />

                        {{ pack.qts }}
                      </div>
                    </div>
                  </div>
                </template>
              </vueper-slide>
            </vueper-slides>
          </div>
          
        </div>

     
    </div>
   <div style="padding-top: 70px; padding-bottom: 40px" v-if="produits.length==0 && loaded==true">
        <center>
          <h3 style="color: #333">
            Aucun produit trouvé pour cet artisan, veuillez
            consultez les produits disponibles sur le lien ci-dessous
          </h3>
        </center>

        <center>
          <h3 style="color: #333">
            <a style="#000" href="/packs">
              __
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="12"
                height="12"
                viewBox="0 0 172 172"
                style="fill: #000000"
              >
                <g
                  fill="none"
                  fill-rule="nonzero"
                  stroke="none"
                  stroke-width="1"
                  stroke-linecap="butt"
                  stroke-linejoin="miter"
                  stroke-miterlimit="10"
                  stroke-dasharray
                  stroke-dashoffset="0"
                  font-family="none"
                  font-weight="none"
                  font-size="none"
                  text-anchor="none"
                  style="mix-blend-mode: normal"
                >
                  <path d="M0,172v-172h172v172z" fill="none" />
                  <g fill="#e67e22">
                    <path
                      d="M86,31.83008c7.11068,-15.95703 19.62435,-31.41015 37.45703,-31.41015c10.41406,0 20.01627,5.03906 28.80664,15.11719c8.37044,9.57422 12.56966,19.17643 12.56966,28.83463c0,14.47331 -4.00326,29.5905 -11.95378,45.40756c-6.85872,13.63347 -16.74088,28.02278 -29.64648,43.16797c-9.74219,11.44988 -22.28385,24.46745 -37.653,39.05274c-13.29752,-12.68164 -25.22331,-25.2793 -35.80533,-37.82097c-12.9056,-15.42512 -22.92774,-29.81445 -30.03842,-43.16797c-8.37044,-15.81706 -12.56966,-29.98242 -12.56966,-42.52409c0,-12.00976 3.69531,-22.84375 11.11393,-32.52994c8.0905,-10.63802 17.97266,-15.95703 29.64649,-15.95703c18.39258,0 31.07422,15.5931 38.07292,31.83008z"
                    />
                  </g>
                </g>
              </svg>
              Nos PRODUITS
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="12"
                height="12"
                viewBox="0 0 172 172"
                style="fill: #000000"
              >
                <g
                  fill="none"
                  fill-rule="nonzero"
                  stroke="none"
                  stroke-width="1"
                  stroke-linecap="butt"
                  stroke-linejoin="miter"
                  stroke-miterlimit="10"
                  stroke-dasharray
                  stroke-dashoffset="0"
                  font-family="none"
                  font-weight="none"
                  font-size="none"
                  text-anchor="none"
                  style="mix-blend-mode: normal"
                >
                  <path d="M0,172v-172h172v172z" fill="none" />
                  <g fill="#34495e">
                    <path
                      d="M86,31.83008c7.11068,-15.95703 19.62435,-31.41015 37.45703,-31.41015c10.41406,0 20.01627,5.03906 28.80664,15.11719c8.37044,9.57422 12.56966,19.17643 12.56966,28.83463c0,14.47331 -4.00326,29.5905 -11.95378,45.40756c-6.85872,13.63347 -16.74088,28.02278 -29.64648,43.16797c-9.74219,11.44988 -22.28385,24.46745 -37.653,39.05274c-13.29752,-12.68164 -25.22331,-25.2793 -35.80533,-37.82097c-12.9056,-15.42512 -22.92774,-29.81445 -30.03842,-43.16797c-8.37044,-15.81706 -12.56966,-29.98242 -12.56966,-42.52409c0,-12.00976 3.69531,-22.84375 11.11393,-32.52994c8.0905,-10.63802 17.97266,-15.95703 29.64649,-15.95703c18.39258,0 31.07422,15.5931 38.07292,31.83008z"
                    />
                  </g>
                </g>
              </svg>
              __
            </a>
          </h3>
        </center>
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

      searchQuery: "",
      search: "",
      villes: [],
      ages: [],
      pagination: {},

      nb_adulte: 1,
      nb_enfant: 0,
      apiDomain: "https://etnafesapi20212018.etnafes.com",
      packsvedette: [],
      produits: [],
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
    resultQuery: function () {
      if (Array.isArray(this.produits)) {
        return this.produits.filter((produit) => {
          return (
            produit.titre.toLowerCase().match(this.searchQuery.toLowerCase())
          );
        });
      }
    },
   
  },
  created() {
    this.fetchProduitsFemme(this.$route.params.id);
  },

  methods: {
    
    

    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },

    

    fetchProduitsFemme(id) {
      axios
        .get(`${apiDomain}/api/get_produit_femme/${id}`)
        .then(({ data }) => (
          this.loaded = true,
          this.produits = data));
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