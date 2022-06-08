<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a
        class="navbar-brand"
        href="#"
        style="font-family: 'Indie Flower', cursive;font-size:40px"
      >Etnafes</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link to="/" class="nav-link">
              Accueil
              <span class="sr-only">(current)</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link">
              A propos
              <span class="sr-only">(current)</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/services" class="nav-link">
              Services
              <span class="sr-only">(current)</span>
            </router-link>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >Liste des packs</a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <router-link class="dropdown-item" to="/packs">Béja</router-link>
              <router-link class="dropdown-item" to="/packs">Bizerte</router-link>
              <router-link class="dropdown-item" to="/packs">Gabès</router-link>
              <router-link class="dropdown-item" to="/packs">Kairouan</router-link>
              <router-link class="dropdown-item" to="/packs">Gafsa</router-link>
              <router-link class="dropdown-item" to="/packs">Touzeur</router-link>
              <router-link class="dropdown-item" to="/packs">Jendouba</router-link>
            </div>
          </li>
          <li class="nav-item">
            <router-link to="/authentification" class="nav-link">
              Espace propriètaire
              <span class="sr-only">(current)</span>
            </router-link>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input
            aria-label="Search"
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
          />
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav>

    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import TopNavbarHome from "./Layout/TopNavbarHome.vue";
import Footer from "./Layout/Footer.vue";
import { apiDomain } from "../../config";
import axios from "axios";
export default {
  components: {
    TopNavbarHome,
    Footer
  },
  data() {
    return {
      token: null
    };
  },

  computed: {
    loggedIn() {
      return this.$store.getters.get_loggedIn;
    },

    user() {
      return this.$store.getters.get_user;
    }
  },
  methods: {
    performLogout() {
      this.$store
        .dispatch("performLogoutAction")
        .then(res => {
          this.$router.push("/");
        })
        .catch(err => {
          console.log(err);
        });
    },

    checkUserStatus() {
      if (localStorage.getItem("token") != null) {
        this.token = localStorage.getItem("token");
      }
    }
  }
};
</script>

