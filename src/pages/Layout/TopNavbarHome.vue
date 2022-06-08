<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info" class="navhome">
      <div class="row">
        <div class="col-md-1">
          <router-link :to="{ name: 'Home' }">
            <img loading="lazy"
              class="logo_top_nav"
              alt="logo"
              src="/images/logo-etnafes-couleur-blanc.png"
              :class="{ change_size: scrollPosition > 50 }"
            />
          </router-link>
        </div>
        <div class="col-md-1 toggelNAV_top_nav_bar">
          <center>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
          </center>
        </div>
        <div class="col-md-10 testresp">
          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="ml-auto">
             <b-nav-item>
                <router-link class="nav-link" to="/">Accueil</router-link>
              </b-nav-item> 
              <b-nav-item class="d-none d-lg-block">
                <router-link class="nav-link" to="/packs"
                  >Nos Circuits</router-link
                >
              </b-nav-item>

              <b-nav-item class="d-lg-none">
                <router-link class="nav-link" to="/mpacks"
                  >Nos Circuits</router-link
                >
              </b-nav-item>

              <b-nav-item>
                <router-link class="nav-link" to="/hebergementlibre"
                  >Maison d'hôte</router-link
                >
              </b-nav-item>
              <b-nav-item>
                <router-link class="nav-link" to="/artisans"
                  >Artisans</router-link
                >
              </b-nav-item>

              <b-nav-item v-if="!loggedIn" class="d-none d-lg-block">
                <router-link class="nav-link" to="/inscritfemme" 
                  >Espace Femme R/A</router-link
                >
              </b-nav-item>


              <b-nav-item v-if="!loggedIn" class="d-lg-none">
                <router-link class="nav-link" to="/login/femme"
                  >Espace Femme R/A</router-link
                >
              </b-nav-item>
              <!-- <li class="nav-item">
                <router-link class="nav-link" to="/"> Accueil </router-link>
              </li>-->

              <!-- <b-nav-item-dropdown class="mt-2" right v-if="!loggedIn">
                <template v-slot:button-content>Proprietaire</template>

                <b-dropdown-item>
                  <router-link to="/login/proprietaire">Hébergement</router-link>
                </b-dropdown-item>
                <b-dropdown-item>
                  <router-link to="/login/proprietaire_restaurant">Restaurant</router-link>
                </b-dropdown-item>
              </b-nav-item-dropdown>-->
              <!-- <b-nav-item v-if="!loggedIn">
                <router-link class="nav-link" to="/login/guide">Guide</router-link>
              </b-nav-item>-->
              <b-nav-item v-if="!loggedIn" class="d-none d-lg-block">
                <router-link class="nav-link" to="/login/client-register"
                  >Se connecter</router-link
                >
              </b-nav-item>

              <b-nav-item v-if="!loggedIn" class="d-lg-none">
                <router-link class="nav-link" to="/login/client"
                  >Se connecter</router-link
                >
              </b-nav-item>

              <!-- <b-nav-item v-if="!loggedIn">
                <router-link class="nav-link" to="/login/agence">Prestataire de Services</router-link>
              </b-nav-item>-->

              <b-nav-item-dropdown class="mt-2" text="Lang" right>
                <b-dropdown-item href="#">EN</b-dropdown-item>
                <b-dropdown-item href="#">ES</b-dropdown-item>
                <b-dropdown-item href="#">RU</b-dropdown-item>
                <b-dropdown-item href="#">FA</b-dropdown-item>
              </b-nav-item-dropdown>

              <b-nav-item-dropdown right v-if="loggedIn">
                <template v-slot:button-content>
                  <em>{{ user.nom }} {{ user.prenom }}</em>
                  &nbsp;
                  <em v-if="user.role == 1">{{ user.name }}&nbsp;</em>
                  <img loading="lazy"
                    v-if="user.role == 1"
                    :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_admins/${user.photo}`"
                    alt="Profile Photo"
                    class="photo"
                  />
                  <img loading="lazy"
                    v-if="user.role != 1 && user.provider != null"
                    :src="`${client.photo}`"
                    alt="Profile Photo"
                    class="photo"
                  />

                  <img loading="lazy"
                    v-if="user.role != 1 && user.provider == null"
                    :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_client/${client.photo}`"
                    alt="Profile Photo"
                    class="photo"
                  />
                </template>

                <!-- admin -->
                <b-dropdown-item v-if="user.role == 1" href="/user"
                  >Profile</b-dropdown-item
                >

                <b-dropdown-item v-if="user.role == 1" href="/statistiques"
                  >Dashboard</b-dropdown-item
                >

                <!-- client -->
                <b-dropdown-item v-if="user.role == 2" to="/dashboard_client">
                  <router-link to="/dashboard_client">Dashboard</router-link>
                </b-dropdown-item>
                <b-dropdown-item v-if="user.role == 2" to="/client">
                  <router-link to="/client">Profile</router-link>
                </b-dropdown-item>
                <b-dropdown-item
                  v-if="user.role == 2"
                  to="/reservations-client"
                >
                  <router-link to="/reservations-client"
                    >Mes réservations</router-link
                  >
                </b-dropdown-item>

                <b-dropdown-item v-if="user.role == 2" to="/nouveauhebergement">
                  <router-link to="/nouveauhebergement">Hébergeur</router-link>
                </b-dropdown-item>

                <b-dropdown-item v-if="user.role == 2" to="/nouveaupack/agence">
                  <router-link to="/nouveaupack/agence"
                    >Prestataire de Services</router-link
                  >
                </b-dropdown-item>

                <b-dropdown-item to="/guide/cv" v-if="user.role == 2">
                  <router-link to="/guide/cv">Guide</router-link>
                </b-dropdown-item>
                <b-dropdown-item to="/nouveaurestaurant" v-if="user.role == 2">
                  <router-link to="/nouveaurestaurant"
                    >Proprietaire Resraurant</router-link
                  >
                </b-dropdown-item>

                <b-dropdown-item
                  to="/notifications/client"
                  v-if="user.role == 2"
                >
                  <!-- class="nav-link" -->
                  <router-link to="/notifications/client"
                    >Notifications</router-link
                  >
                </b-dropdown-item>

                <!-- femme -->
                 <b-dropdown-item v-if="user.role == 10" to="/dashboard_femme">
                  <router-link to="/dashboard_femme">Dashboard</router-link>
                </b-dropdown-item>
                <b-dropdown-item v-if="user.role == 10" to="/femme">
                  <router-link to="/femme">Profile</router-link>
                </b-dropdown-item>
                <b-dropdown-item v-if="user.role == 10" to="/ajouter_produit_femme">
                  <router-link to="/ajouter_produit_femme">Ajouter Produit</router-link>
                </b-dropdown-item>
                <b-dropdown-item v-if="user.role == 10" to="/listes_mes_produit">
                  <router-link to="/listes_mes_produit">Liste des Produits</router-link>
                </b-dropdown-item>

                <b-dropdown-item @click.prevent="performLogout"
                  >Déconnexion</b-dropdown-item
                >
              </b-nav-item-dropdown>
            </b-navbar-nav>
          </b-collapse>
        </div>
      </div>
    </b-navbar>
  </div>
</template>
<script>
import { apiDomain } from "../../config";
import axios from "axios";
export default {
  data() {
    return {
      client: [],

      admin: [],

      guide: [],
      adagence: [],

      proprietaire: [],
      proprestau: [],
      scrollPosition: null,
      token: null,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.updateScroll);
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
    if (this.loggedIn == true) {
      //client
      if (this.user.role == 2) this.fetchclient(this.$store.state.user.id);
      //proprietaire hébergement
      if (this.user.role == 6)
        this.fetchproprietaire(this.$store.state.user.id);
      //proprietaire restaurant
      if (this.user.role == 5) this.fetchproprestau(this.$store.state.user.id);
      //agence admin
      if (this.user.role == 3) this.fetchagenceadmin(this.$store.state.user.id);
      //guide
      if (this.user.role == 4) this.fetchguide(this.$store.state.user.id);
      //admin
      if (this.user.role == 1) this.fetchadmin(this.$store.state.user.id);
    }
  },
  methods: {
    //show user by id
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

    fetchadmin(id) {
      fetch(`${apiDomain}/api/admin/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.admin = res;
        })
        .catch((err) => console.log(err));
    },
    updateScroll() {
      this.scrollPosition = window.scrollY;
    },
    performLogout() {
      this.$store
        .dispatch("performLogoutAction")
        .then((res) => {
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    },

    performLogoutAdmin() {
      this.$store
        .dispatch("performLogoutActionAdmin")
        .then((res) => {
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    },

    checkUserStatus() {
      if (localStorage.getItem("token") != null) {
        this.token = localStorage.getItem("token");
      }
    },
  },
};
</script>





