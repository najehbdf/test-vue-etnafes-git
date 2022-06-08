<template>
  <div>
    <TopNavbarHome />

    <div class="container" style="padding-bottom: 20px">
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

      <div class="row">
            <div
              class="col-lg-4"
              v-for="(pack, i) in packs.data"
              :key="pack.id"
            >
              <div
                class="card"
                style="
                  margin-bottom: 30px;
                  margin-top: 10px;
                  border: solid 1px #b6b6b6;
                  padding: 10px;
                "
              >
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
                  </div>
                </router-link>
                <div class="card-block" style="height: 170px">
                  <h4 class="card-title" style="color: #c37600">
                    {{ pack.titre }}
                  </h4>
                  <div>
                    <!-- v-if="q == ''" -->
                    <!-- divvvvvv -->

                    <div>
                      <span>
                        <button class="top-left">
                          <!--           :title="pack.titre"
           
                          :image="`${apiDomain}/myapp/public/uploads/files_packs/${pack.image_couverture}`"-->

                          <iframe
                            :src="`https://www.facebook.com/plugins/share_button.php?
                href=https://etnafes.com/detailspack/${pack.id}
                &layout=button_count&size=large&appId=763428000992015&width=104&height=28`"
                            width="104"
                            height="28"
                            style="border: none; overflow: hidden"
                            scrolling="no"
                            frameborder="0"
                            allowfullscreen="true"
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                          ></iframe>
                        </button>
                      </span>
                    </div>

                    <div >
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
                      </span>
                    </div>

                   
                  </div>
                  <!-- fin diiiiv -->
                  <div class="row" style="margin-top: -21px">
                    <div class="col-md-3">
                      <h4
                        class="card-title"
                        style="color: #c37600"
                        v-if="
                          pack.date_deb < new Date().toISOString().split('T')[0]
                        "
                      >
                        <span
                          class="badge badge-warning"
                          style="background-color: #ff4012"
                          >Circuit expiré</span
                        >
                      </h4>

                      <h4 class="card-title" style="color: #c37600" v-else>
                        <span
                          class="badge badge-success"
                          style="background-color: #28b351"
                          >Nouveau circuit</span
                        >
                      </h4>
                    </div>

                    <!--  -->

                    <div class="rowww d-none d-lg-block">
                      <!-- 1) #creation v if mech 3aml hata haja la like la dislike -->
                      <!-- original like & dislik -->
                    
                      <!-- 2) #update v if  3aml  like  -->
                      <!-- original like & dislik -->
                   
                    </div>

                    <!--  -->
                    <div
                      class="col-md-9 d-none d-lg-block"
                      style="margin-top: -34px; margin-left: 113px"
                    >
                      <img loading="lazy"
                        width="7%"
                        src="https://img.icons8.com/color/50/000000/visible--v1.png"
                      />
                      {{ pack.nb_vus }}
                    </div>

                    <div
                      class="col-md-9 d-lg-none"
                      style="margin-top: -33px; margin-left: 112px"
                    >
                      <img loading="lazy"
                        width="9%"
                        src="https://img.icons8.com/color/50/000000/visible--v1.png"
                      />
                      {{ pack.nb_vus }}
                      <span>
                        <!-- 1) #creation v if mech 3aml hata haja la like la dislike -->
                        <!-- original like & dislik -->
                        
                      </span>
                    </div>
                  </div>

                  <div>
                    <div v-if="pack.description.length < 180">
                      {{ pack.description }}
                    </div>
                    <div v-else>
                      {{ pack.description.substr(0, 200) + "..." }}
                    </div>
                  </div>
                  
                  <br />
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
        .then(({ data }) => (this.packs = data.packs));
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