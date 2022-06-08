<template>
  <div>
    <TopNavbarHome />
    <div>
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
            Nos Villes
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
                placeholder="Chercher ... "
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
          <div class="col-lg-4" v-for="ville in filteredVilles" :key="ville.id">
            <router-link :to="{ name: 'PackVille', params: { id: ville.id } }">
              <div class="card" style="margin-bottom: 30px; margin-top: 10px">
                <div class="card-img-wrap">
                  <img loading="lazy"
                    class="card-img imaa"
                    :src="`${apiDomain}/myapp/public/uploads/files_ville/${ville.image}`"
                    alt="Card image cap"
                  />
                </div>
                <div class="card-block">
                  <h4 class="card-title" style="color: #c37600">
                    {{ ville.nom }}
                  </h4>
                  <p class="card-text" style="font-size: 15px">
                    {{ ville.description }}
                  </p>

                  <br />
                </div>
              </div>
            </router-link>
          </div>
        </div>

        <div class="flex justify-center">
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li
                v-bind:class="[{ disabled: !pagination.prev_page_url }]"
                class="page-item"
              >
                <button
                  class="page-link text-dark"
                  v-on:click="fetchVilles(pagination.prev_page_url)"
                >
                  &laquo;
                </button>
              </li>
              <li class="page-item disabled">
                <a class="page-link text-dark" href="#"
                  >Page {{ pagination.current_page }} de
                  {{ pagination.last_page }}</a
                >
              </li>
              <li
                class="page-item"
                v-bind:class="[{ disabled: !pagination.next_page_url }]"
              >
                <button
                  class="page-link text-dark"
                  @click="fetchVilles(pagination.next_page_url)"
                >
                  &raquo;
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>

    <Footer></Footer>
  </div>
</template>


  <script>
import HighlightWords from "vue-highlight-words";
import StrongProps from "../components/StrongProps";
import StrongSlot from "../components/StrongSlot";
import axios from "axios";
import TopNavbarHome from "./Layout/TopNavbarHome.vue";
import Footer from "./Layout/Footer.vue";
import { required, minLength, between } from "vuelidate/lib/validators";
import { apiDomain } from "../config";
import Vue from "vue";

export default {
  components: {
    TopNavbarHome,
    Footer,
    HighlightWords,
  },
  data() {
    return {
      client: [],
      guide: [],
      adagence: [],

      proprietaire: [],
      proprestau: [],
      scrollPosition: null,
      token: null,
      pagination: {},
      strongProps: StrongProps,
      strongSlot: StrongSlot,
      search: "",
      apiDomain: "https://etnafesapi20212018.etnafes.com",
      villes: [],
    };
  },

  created() {
    if (this.loggedIn == true) {
      this.fetchclient(this.$store.state.user.id);
      this.fetchproprietaire(this.$store.state.user.id);
      this.fetchproprestau(this.$store.state.user.id);
      this.fetchguide(this.$store.state.user.id);
      this.fetchagenceadmin(this.$store.state.user.id);
    }
    this.fetchVilles();
  },

  computed: {
    loggedIn() {
      return this.$store.getters.get_loggedIn;
    },

    user() {
      return this.$store.getters.get_user;
    },
    keywords() {
      return this.search.split(" ");
    },
    filteredVilles: function () {
      if (Array.isArray(this.villes)) {
        return this.villes.filter((ville) => {
          return (
            ville.nom.toLowerCase().match(this.search.toLowerCase()) ||
            ville.description.match(this.search)
          );
        });
      }
    },
  },

  methods: {
    fetchsearch() {
      if (this.q.length > 1) {
        axios
          .get(`${apiDomain}/api/annoncesWithSearch/` + this.q)
          .then((response) => (this.annoncesWithSearch = response.data))
          .catch((error) => console.log(error));
      } else {
        axios
          .get(`${apiDomain}/api/annoncesWithSearch`)
          .then((response) => (this.annoncesWithSearch = response.data))
          .catch((error) => console.log(error));
      }
    },
    fetchagenceadmin(id) {
      fetch(`${apiDomain}/api/agencead/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.adagence = res.adagence;
        })
        .catch((err) => console.log(err));
    },
    fetchguide(id) {
      fetch(`${apiDomain}/api/guide/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.guide = res.guide;
        })
        .catch((err) => console.log(err));
    },
    fetchproprestau(id) {
      fetch(`${apiDomain}/api/proprietaire_restau/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.proprestau = res.proprietaire;
        })
        .catch((err) => console.log(err));
    },
    fetchproprietaire(id) {
      fetch(`${apiDomain}/api/prop/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.proprietaire = res.proprietaire;
        })
        .catch((err) => console.log(err));
    },
    //show user by id
    fetchclient(id) {
      fetch(`${apiDomain}/api/client/${id}?token=${this.$store.state.token}`)
        .then((res) => res.json())
        .then((res) => {
          this.client = res;
        })
        .catch((err) => console.log(err));
    },

    fetchVilles(page_url) {
      let vm = this;
      page_url = page_url || `${apiDomain}/api/allvilles`;
      fetch(page_url)
        .then((res) => res.json())
        .then((res) => {
          this.villes = res.villes.data;
          vm.makePagination(res);
        })
        .catch((err) => console.log(err));
    },

    makePagination(res) {
      let pagination = {
        current_page: res.villes.current_page,
        last_page: res.villes.last_page,
        next_page_url: res.villes.next_page_url,
        prev_page_url: res.villes.prev_page_url,
        from_page: res.villes.from,
        to_page: res.villes.to,
      };
      this.pagination = pagination;
    },
  },
};
</script>