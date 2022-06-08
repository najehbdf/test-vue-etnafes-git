<template>
  <div>
    <TopNavbarHome />

    <div
      class="container-fluid view full-page-intro d-none d-lg-block"
      style="
        padding-top: 30px;
        padding-bottom: 30px;
        background-image: url('../images/voyageur-etnafes.jpg');
        background-repeat: no-repeat;
        background-size: cover;
        background-attachment: fixed;
      "
    >
      <div class="row">
        <div class="container" :class="{ 'sign-up-active': signUp }">
          <div class="overlay-container">
            <div class="overlay">
              <div class="overlay-left">
                <h2>Bienvenue !</h2>
                <p>
                  Veuillez vous connecter avec vos informations personnelles
                </p>
                <button class="invert" id="signIn" @click="signUp = !signUp">
                  Connexion
                </button>
              </div>
              <div class="overlay-right">
                <h2>Bienvenue !</h2>
                <p>
                  <!--   Veuillez remplir les informations nécessaires pour votre
                  inscription -->
                  Espace Femme Rurale ou Artisan
                </p>

                <button class="invert" id="signUp" @click="signUp = !signUp">
                  S'inscrire
                </button>
              </div>
            </div>
          </div>
          <!-- register -->
          <form class="sign-up">
            <!--  <h2>Créer une connexion</h2> -->

            <br />
            <!-- <div
              style="
                background: #a2bf20;
                color: #fff;
                width: 106%;
                padding: 5px;
              "
            >
              INSCRIVEZ VOUS
            </div> -->

            <div class="row">
              <!--  style="height: 20px" -->
              <div class="col-md-6 text-left">
                <div
                  class="form-group"
                  style="margin-left: 17px; margin-bottom: -6px"
                >
                  <label>Gouvernorat *</label>
                  <select
                    class="form-control"
                    id="SelectRegion"
                    required
                    @change="fetchSousVille(client.ville_id)"
                        v-model="client.ville_id"
                  >
                    <option :value="Ville" disabled selected>
                      Votre Gouvernorat
                    </option>
                    <option
                          v-for="ville in villespays"
                          v-bind:key="ville.id"
                          v-bind:value="ville.id"
                        >{{ville.nom}}</option>
                  </select>
                </div>
              </div>

              <div class="col-md-6 text-left">
                <div class="form-group" style="margin-bottom: -6px">
                  <label>Ville *</label>
                  <select
                    class="form-control"
                    required
                    v-model="client.zone_id"
                  >
                    <option value disabled selected>
                      choisissez votre ville
                    </option>
                    <option
                          v-for="ville in sousvilles"
                          v-bind:key="ville.id"
                          v-bind:value="ville.id"
                        >{{ville.nom}}</option>
                  </select>
                  <p
                    v-if="validationErrors.ville_id"
                    style="padding-bottom: 5px; color: red; margin-top: -10px"
                  >
                    <span class="alert-link"
                      >** {{ validationErrors.ville_id[0] }}</span
                    >
                  </p>
                </div>
              </div>
            </div>

            <div class="row">
              <!--  style="height: 219px" -->
              <div class="col-md-6 text-left">
                <ValidationProvider name="nom" v-slot="{ errors }">
                  <div
                    class="form-group"
                    style="margin-left: 17px; margin-bottom: -6px"
                  >
                    <label>Nom *</label>
                    <input
                      aria-label="label"
                      type="text"
                      class="form-control personalise"
                      v-model="client.nom"
                      placeholder="Nom de famille *"
                    />
                    <span class="message">{{ errors[0] }}</span>

                    <p
                      v-if="validationErrors.nom"
                      style="padding-bottom: 5px; color: red; margin-top: -10px"
                    >
                      <span class="alert-link"
                        >* {{ validationErrors.nom[0] }}</span
                      >
                    </p>
                  </div>
                </ValidationProvider>
              </div>

              <div class="col-md-6 text-left">
                <ValidationProvider name="prenom" v-slot="{ errors }">
                  <div class="form-group" style="margin-bottom: -6px">
                    <label>Prenom *</label>
                    <input
                      aria-label="label"
                      type="text"
                      class="form-control personalise"
                      v-model="client.prenom"
                      placeholder="Prénom *"
                    />
                    <span class="message">{{ errors[0] }}</span>
                    <p
                      v-if="validationErrors.prenom"
                      style="padding-bottom: 5px; color: red; margin-top: -10px"
                    >
                      <span class="alert-link"
                        >*{{ validationErrors.prenom[0] }}</span
                      >
                    </p>
                  </div>
                </ValidationProvider>
              </div>
            </div>

            <div style="width: 100%" class="row">
              <!--  style="height: 219px" -->
              <div class="col-md-12 text-left">
                <ValidationProvider name="Adresse" v-slot="{ errors }">
                  <div class="form-group" style="margin-bottom: -6px">
                    <label>Adresse *</label>

                    <gmap-autocomplete
                      @place_changed="setPlace"
                      class="form-control personalise"
                    ></gmap-autocomplete>
                    <span class="message">{{ errors[0] }}</span>

                    <p
                      v-if="validationErrors.adresse"
                      style="padding-bottom: 5px; color: red; margin-top: -10px"
                    >
                      <span class="alert-link"
                        >* {{ validationErrors.adresse[0] }}</span
                      >
                    </p>

                    <br />
                    <input
                      aria-label="label"
                      name="latitude"
                      type="hidden"
                      id="lat"
                      v-model="center.lat"
                    />
                    <input
                      aria-label="label"
                      name="longitude"
                      type="hidden"
                      id="lng"
                      v-model="center.lng"
                    />
                  </div>
                </ValidationProvider>
              </div>
            </div>

            <div class="row">
              <!--  style="height: 219px" -->
              <div class="col-md-6 text-left">
                <ValidationProvider name="telephone" v-slot="{ errors }">
                  <div
                    class="form-group"
                    style="margin-left: 17px; margin-bottom: -6px"
                  >
                    <label>Téléphone *</label>
                    <input
                      aria-label="label"
                      type="text"
                      class="form-control personalise"
                      v-model="client.telephone"
                      placeholder="téléphone"
                    />
                    <span class="message">{{ errors[0] }}</span>

                    <p
                      v-if="validationErrors.telephone"
                      style="padding-bottom: 5px; color: red; margin-top: -10px"
                    >
                      <span class="alert-link"
                        >* {{ validationErrors.telephone[0] }}</span
                      >
                    </p>
                  </div>
                </ValidationProvider>
              </div>

              <div class="col-md-6 text-left">
                <b-tooltip target="tooltip-target-1" triggers="hover">
                  <ul>
                    <li v-bind:class="{ is_valid: contains_eight_characters }">
                      8 Caractéres
                    </li>
                    <li v-bind:class="{ is_valid: contains_number }">
                      Chiffre
                    </li>
                    <li v-bind:class="{ is_valid: contains_uppercase }">
                      Lettre majuscule
                    </li>
                    <li
                      v-bind:class="{
                        is_valid: contains_special_character,
                      }"
                    >
                      Caractére spécial
                    </li>
                  </ul>

                  <div
                    class="checkmark_container"
                    v-bind:class="{ show_checkmark: valid_password }"
                  >
                    <svg width="50%" height="50%" viewBox="0 0 140 100">
                      <path
                        class="checkmark"
                        v-bind:class="{ checked: valid_password }"
                        d="M10,50 l25,40 l95,-70"
                      />
                    </svg>
                  </div>
                </b-tooltip>
                <div id="tooltip-target-1">
                  <label>Mot de passse *</label>
                  <!-- @input="checkPassword" -->
                  <VuePassword
                    style="
                      padding: 5px !important;
                      border-radius: 15px !important;
                    "
                    type="password"
                    v-model="password"
                    autocomplete="off"
                    placeholder="Mot de passe *"
                  />
                </div>
              </div>
            </div>
            <!-- 
            <div
              style="
                background: #d79c19;
                color: #fff;
                width: 106%;
                padding: 5px;
              "
            >
              <span @click.prevent="addClient">
                {{ loading ? "En cours ... " : "Sinscrire" }}
              </span>
            </div> -->
            <div class="row">
              <div class="col-md-3">
                <button @click.prevent="addClient">
                  {{ loading ? " ... " : "S'inscrire" }}
                </button>
              </div>
            </div>
            <!--  -->
            <!-- <input
              max="8"
              minlength="8"
              v-model="telephone"
              type="number"
              placeholder="telephone"
            />
            <p v-if="errors.telephone" style="color: red; margin: 0px 0px">
              <span class="alert-link">** {{ errors.telephone[0] }}</span>
            </p>

            <input v-model="email" type="email" placeholder="Email" />
            <p v-if="errors.email" style="color: red; margin: 0px 0px">
              <span class="alert-link">** {{ errors.email[0] }}</span>
            </p>
            <input v-model="password" type="password" placeholder="Password" />
            <p v-if="errors.password" style="color: red; margin: 0px 0px">
              <span class="alert-link">** {{ errors.password[0] }}</span>
            </p> -->

            <!-- <CButton @click.prevent="performRegister">
              {{
                isCreatingInscrire
                  ? "En cours d'inscription ..."
                  : "S'inscrire "
              }}
            </CButton> -->
          </form>
          <!-- login -->
          <form class="sign-in">
            <!--    <h2>Connection</h2> -->
            <div>Utilisez votre compte (Espace Femme R/A)</div>
            <div class="form-group" style="margin-bottom: -6px">
              <input
                style="
                  width: 195% !important;
                  margin-left: -66px;
                  border-radius: 1px !important;
                "
                aria-label="label"
                class="form-control"
                placeholder="Téléphone"
                name="telephone"
                type="text"
                v-model="telephone"
                required
              />
            </div>
            <div class="form-group" style="margin-bottom: -6px">
              <VuePassword
                style="
                  width: 233% !important;
                  margin-left: -78px;
                  border-radius: 1px !important;
                "
                v-model="password"
                id="password1"
                type="password"
                placeholder="Mot de passe"
                required
              />
            </div>
            <div style="color: red; padding-bottom: 5px" v-if="error">
              {{ error }}
            </div>

            <!--  <a style="margin-top: -33px;" href="#">Mot de passe oublié?</a> -->
            <router-link style="margin-top: -33px" to="/client_reset_mdp">
              <p
                style="
                  color: #1c4b94;
                  font-size: 14px;
                  font-weight: 500;
                  text-decoration: underline;
                "
              >
                Mot de passe oublié ?
              </p>
            </router-link>

            <button style=" 1px 26px !important;" @click.prevent="performLogin">
              {{ isLoading ? "Connexion ..." : "Connexion " }}
            </button>
          </form>
        </div>
      </div>
    </div>

    <!-- mobile -->
    <div class="d-lg-none">
      <div class="row">
        <div class="container">
          <!-- login -->
          <form class="sign-in">
            <div>Utilisez votre compte</div>
            <div class="form-group" style="margin-bottom: -6px">
              <input
                style="
                  width: 195% !important;
                  margin-left: -66px;
                  border-radius: 1px !important;
                "
                aria-label="label"
                class="form-control"
                placeholder="E-mail"
                name="email"
                type="text"
                v-model="email"
                required
              />
            </div>
            <div class="form-group" style="margin-bottom: -6px">
              <VuePassword
                style="
                  width: 233% !important;
                  margin-left: -78px;
                  border-radius: 1px !important;
                "
                v-model="password"
                id="password1"
                type="password"
                placeholder="Mot de passe"
                required
              />
            </div>
            <div style="color: red; padding-bottom: 5px" v-if="error">
              {{ error }}
            </div>

            <!--  <a style="margin-top: -33px;" href="#">Mot de passe oublié?</a> -->
            <router-link style="margin-top: -33px" to="/client_reset_mdp">
              <p style="color: #1c4b94; font-weight: bold;margin-top:15px">
                Mot de passe oublié ?
              </p>
            </router-link>

            <div>
              Vous n'avez pas un compte?
              <a href="/register/client"
                ><span style="color: #1c4b94; font-weight: bold"
                  >S'inscrire</span
                ></a
              >
            </div>

            <button style=" 1px 26px !important;" @click.prevent="performLogin">
              {{ isLoading ? "Connexion ..." : "Connexion " }}
            </button>
          </form>
        </div>
      </div>
    </div>

    <Footer></Footer>
  </div>
</template>



<script>
import VuePassword from "vue-password";
import TopNavbarHome from "./Layout/TopNavbarHome.vue";
import Footer from "./Layout/Footer.vue";
import axios from "axios";
import { apiDomain } from "../config";
import { ValidationProvider } from "vee-validate";
import { extend } from "vee-validate";
import {
  required,
  email,
  alpha,
  min,
  max,
  numeric,
} from "vee-validate/dist/rules";
// Add the required rule
extend("required", {
  ...required,
  message: "Veuillez remplir ce champs",
});

// Add the email rule
extend("email", {
  ...email,
  message: "Veuillez saisir un email valide",
});

// Add the min rule
extend("min", {
  ...min,
  message: "Le mot de passe doit contenir au moins 6 caractéres",
});

// Add the max rule
extend("max", {
  ...max,
  message: "Le mot de passe doit contenir au plus 12 caractéres",
});

// Add the alpha rule
extend("alpha", {
  ...alpha,
  message: "Veuillez entrer uniquement des lettres",
});

// Add the numeric rule
extend("numeric", {
  ...numeric,
  message: "Veuillez entrer uniquement des chiffres",
});
export default {
  components: {
    VuePassword,
    ValidationProvider,
    TopNavbarHome,
    Footer,
  },
  name: "login",
  data() {
    return {
      sousvilles: {},

      markers: [],

      adresse: "",
      places: [],

      center: { lat: 35.6711663, lng: 10.1005469 },
      currentPlace: null,
      myCoordinates: {
        lat: 0,
        lng: 0,
      },
      /* new data */
      client: [],
      guide: [],
      adagence: [],
      isLoading: false,
      proprietaire: [],
      proprestau: [],
      scrollPosition: null,
      loading: false,
      password: null,
      password_length: 0,
      contains_eight_characters: false,
      contains_number: false,
      contains_uppercase: false,
      contains_special_character: false,
      valid_password: false,
      entercode: false,
      validationErrors: "",
      villespays: {},
      villesZones: {},
      client: {
        code: "",
        // email: "etnafes.admin@gmail.com",
        email: "Etnafes@" + Math.floor(Math.random() * 4000),
      },

      nom: "",

      telephone: "",
      civilité: "",
      gouvernorat: "",
      pays: {},
      pays_id: "",
      guide: {},
      /* new data */
      isCreatingInscrire: false,
      isCreatingLogin: false,

      validationErrors: "",
      signUp: false,
      tokenVerifEmail: "",
      isLoadingVerifEmail: false,
      errorTokenVerifEmail: null,
      infoVerifEmail: null,
      showLogin: false,
      prenom: "",
      telephone: "",
      nom: "",
      password: "",
      email: "",
      infoModal: false,
      loggedIn: false,
      //error: "",
      isCreating: false,
      show: false,
      formstate: {},
      validationErrors: "",
      //modifier password
      password: "",
      password_confirmation: "",

      erreurEmail: null,
      token: "",
      errorToken: null,
      newPassword: "",
      errornewPaswword: null,
      passwordAgain: "",
      errorpasswordAgain: null,
      tokenValid: false,
      EmailValid: false,
      infoEmail: null,
      infoToken: null,

      user: null,
      infoToken1: "Verifier avec Succès",

      status_msg: "",
      status: "",
      error: "",
      errors: [],
    };
  },

  created() {
    this.fetchPays();
    this.fetchVillesPays(1);
  },
  computed: {
    isPasswordMatching() {
      if (
        this.password == "" ||
        this.password_confirmation == "" ||
        this.password != this.password_confirmation
      )
        return true;
      return false;
    },
  },

  mounted() {},

  methods: {
    fetchSousVille(id) {
      axios
        .get(`${apiDomain}/api/sous/villes/${id}`)
        .then(({ data }) => (this.sousvilles = data.sousvilles));
    },
    setPlace(place) {
      this.adresse = place;
      if (this.adresse) {
        const marker = {
          lat: this.adresse.geometry.location.lat(),
          lng: this.adresse.geometry.location.lng(),
        };
        this.markers.push({ position: marker });
        this.places.push(this.adresse);
        this.center = marker;
        console.log(marker.lat);
        console.log(marker.lng);

        this.adresse = place;
      }
    },
    performLogin() {
      this.isLoading = true;
      this.$store
        .dispatch("performLoginFemmeAction", {
          telephone: this.telephone,
          password: this.password,
        })
        .then((res) => {
          this.isLoading = false;
          this.$router.push("/ajouter_produit_femme");
        })
        .catch((error) => {
          if (error.response && error.response.status == 401) {
            this.isLoading = false;

            this.error = "Téléphone ou mot de passe incorrect";
          }
          if (error.response && error.response.status == 403) {
            this.$noty.error(
              "Vous n’avez pas encore activé votre compte pour avoir accès. Veuillez vérifier votre courriel ."
            );
            this.$router.push("/client_verification");
          }
        });
    },

    addClient() {
      this.entercode = false;
      this.loading = true;
      this.errors = [];

      this.$store
        .dispatch("performRegisterFemmeAction", {
          nom: this.client.nom,
          prenom: this.client.prenom,
          telephone: this.client.telephone,
         /*  email: this.client.email, */
          login: this.client.login,
          ville_id: this.client.ville_id,
          civilité: this.civilité,

          gouvernorat: this.gouvernorat,
          zone_id: this.client.zone_id,

          password: this.password,
          /* map */
          adresse: this.adresse.formatted_address,
          latitude: this.center.lat,

          longitude: this.center.lng,
        })
        .then((res) => {
          this.isCreating = false;

          /*  if (response.status == 20) { */
          this.loading = false;
          //this.$noty.success("veuillez vérifier votre compte.");

          this.$noty.success("Connexion réussie.");
          this.$router.push("/ajouter_produit_femme");
          /*  } */
        })
        .catch((error) => {
          this.loading = false;
          if (error.response && error.response.status == 400) {
            this.$noty.error(
              " OOPS !  error sur votre demande d'inscription ! "
            );
            this.validationErrors = error.response.data;
          }
        });
    },
    fetchPays() {
      axios.get(`${apiDomain}/api/pays`).then(({ data }) => (this.pays = data));
    },
    fetchVillesPays(id) {
      axios
        .get(`${apiDomain}/api/pays/villes/1`)
        .then(({ data }) => (this.villespays = data.villes));
    },

    fetchVillesZone(id) {
      axios
        .get(`${apiDomain}/api/zones/villes/${id}`)
        .then(({ data }) => (this.villesZones = data.zones));
    },
    checkPassword() {
      this.password_length = this.password.length;
      const format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

      if (this.password_length >= 8) {
        this.contains_eight_characters = true;
      } else {
        this.contains_eight_characters = false;
      }

      this.contains_number = /\d/.test(this.password);
      this.contains_uppercase = /[A-Z]/.test(this.password);
      this.contains_special_character = format.test(this.password);

      if (
        this.contains_eight_characters === true &&
        this.contains_special_character === true &&
        this.contains_uppercase === true &&
        this.contains_number === true
      ) {
        this.valid_password = true;
      } else {
        this.valid_password = false;
      }
    },

    /* new methode */
    showNotification(message) {
      this.status_msg = message;
      setTimeout(() => {
        this.status_msg = "";
      }, 120000);
    },

    performRegister() {
      this.isCreating = true;
      this.isCreatingInscrire = true;
      this.$store
        .dispatch("performRegisterAction", {
          nom: this.nom,
          prenom: this.prenom,
          telephone: this.telephone,
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          this.isCreatingInscrire = false;
          this.isCreating = false;
          //  this.$noty.success("Connexion réussie.");
          this.$router.push("/profile");
        })
        .catch((error) => {
          this.isCreating = false;
          this.isCreatingInscrire = false;
          // this.error = " There was error during Registration process";
          console.log(error);
          if (error.response && error.response.status == 422) {
            this.errors = error.response.data.errors;
          }
        });
    },
  },
};
</script>
<style lang="scss" scoped>
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

/* #app {
  font-family: Tahoma;
  font-size: 1rem;
  color: #222;
  background-color: #092525;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
} */

.container {
  position: relative;
  width: 790px;
  height: 480px;
  border-radius: 10px !important;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2);
  background: linear-gradient(to bottom, #efefef, #ccc);

  .overlay-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform 0.5s ease-in-out;
    z-index: 100;
  }

  .overlay {
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    background: linear-gradient(to bottom right, #7fd625, #ff8213);
    color: #fff;
    transform: translateX(0);
    transition: transform 0.5s ease-in-out;
  }

  @mixin overlays($property) {
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    padding: 70px 40px;
    width: calc(50% - 80px);
    height: calc(100% - 140px);
    text-align: center;
    transform: translateX($property);
    transition: transform 0.5s ease-in-out;
  }

  .overlay-left {
    @include overlays(-20%);
  }

  .overlay-right {
    @include overlays(0);
    right: 0;
  }
}

h2 {
  margin: 0;
}
/* 
p {
  margin: 20px 0 30px;
  color: #000;
} */

a {
  color: #222;
  text-decoration: none;
  margin: 15px 0;
  font-size: 1rem;
}

button {
  border-radius: 20px !important;
  border: 1px solid #ff8213;
  background-color: #ff8213;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  padding: 10px 40px;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: transform 0.1s ease-in;

  &:active {
    transform: scale(0.9);
  }

  &:focus {
    outline: none;
  }
}

button.invert {
  background-color: transparent;
  border-color: #fff;
}

form {
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  padding: 90px 60px;
  width: calc(50% - 120px);
  height: calc(100% - 180px);
  text-align: center;
  background: linear-gradient(to bottom, #efefef, #ccc);
  transition: all 0.5s ease-in-out;

  /*  
  div {
    font-size: 1rem;
  } */

  select {
    background-color: #eee !important;
    border: none;
    padding: 5px;
    margin: 6px 0;
    width: calc(100% - 30px);
    border-radius: 15px !important;
    border-bottom: 1px solid #ddd;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.4), 0 -1px 1px #fff,
      0 1px 0 #fff;
    overflow: hidden;

    &:focus {
      outline: none;
      background-color: #fff;
    }
  }

  input {
    background-color: #eee;
    border: none;
    padding: 5px;
    margin: 6px 0;
    width: calc(100% - 30px);
    border-radius: 15px !important;
    border-bottom: 1px solid #ddd;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.4), 0 -1px 1px #fff,
      0 1px 0 #fff;
    overflow: hidden;

    &:focus {
      outline: none;
      background-color: #fff;
    }
  }
}

/* .sign-in {
  left: 0;
  z-index: 2;
} */

.sign-in {
  left: 0px;
  padding: 2px;
  width: 394px;
  height: 383px;
  z-index: 2;
  @media (min-width: 320px) and (max-width: 480px) {
    left: 0px;
    padding: 2px;
    width: 394px;
    height: 383px;
    z-index: 2;
  }

  @media (min-width: 480px) and (max-width: 768px) {
    left: 0px;
    padding: 2px;
    width: 394px;
    height: 383px;
    z-index: 2;
  }
}
.sign-up {
  left: -8px;
  padding: 2px;
  width: 394px;
  height: 427px;
  z-index: 1;
  opacity: 0;
  @media (min-width: 320px) and (max-width: 480px) {
    left: -8px;
    padding: 2px;
    width: 394px;
    height: 427px;
    z-index: 1;
    opacity: 0;
  }

  @media (min-width: 480px) and (max-width: 768px) {
    left: -8px;
    padding: 2px;
    width: 394px;
    height: 427px;
    z-index: 1;
    opacity: 0;
  }
}

.sign-up-active {
  .sign-in {
    transform: translateX(100%);
    @media (min-width: 320px) and (max-width: 480px) {
      transform: translateX(100%);
    }

    @media (min-width: 480px) and (max-width: 768px) {
      transform: translateX(100%);
    }
  }

  .sign-up {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    animation: show 0.5s;
    @media (min-width: 320px) and (max-width: 480px) {
      transform: translateX(100%);
      opacity: 1;
      z-index: 5;
      animation: show 0.5s;
    }

    @media (min-width: 480px) and (max-width: 768px) {
      transform: translateX(100%);
      opacity: 1;
      z-index: 5;
      animation: show 0.5s;
    }
  }

  .overlay-container {
    transform: translateX(-100%);
    @media (min-width: 320px) and (max-width: 480px) {
      transform: translateX(-100%);
    }

    @media (min-width: 480px) and (max-width: 768px) {
      transform: translateX(-100%);
    }
  }

  .overlay {
    transform: translateX(50%);
  }

  .overlay-left {
    transform: translateX(0);
  }

  .overlay-right {
    transform: translateX(20%);
  }
}

@keyframes show {
  0% {
    opacity: 0;
    z-index: 1;
  }
  49% {
    opacity: 0;
    z-index: 1;
  }
  50% {
    opacity: 1;
    z-index: 10;
  }
}

/* Youtube Link */
#yt_link {
  position: absolute;
  right: 0;
  left: 0;
  bottom: -200px;
  display: block;
  width: 160px;
  text-align: center;
  color: red;
  font-size: 15px;
  text-decoration: none;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  padding: 10px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 2px !important;
  animation: showYtLink 1.5s ease 3s forwards;
}

@keyframes showYtLink {
  0% {
    bottom: -200px;
  }
  100% {
    bottom: 20px;
  }
}

.container-fluid,
.container-sm,
.container-md,
.container-lg,
.container-xl {
  width: 100%;
  padding-right: 457px;
  padding-left: -23px;
  margin-right: auto;
  margin-left: auto;

  @media (min-width: 320px) and (max-width: 480px) {
    width: 286%;
    padding-right: 427px;
    padding-left: -23px;
    margin-right: auto;
    margin-left: auto;
  }

  @media (min-width: 480px) and (max-width: 768px) {
    width: 145%;
    padding-right: 471px;
    padding-left: -23px;
    margin-right: auto;
    margin-left: auto;
  }

  .form-control {
    display: block;
    width: 100% !important;
    height: calc(2.65rem + 2px);
  }
  label {
    color: #1c4b94;
    font-size: 12px !important;
    /* font-weight: bold; */
    margin-bottom: 0rem;
  }
}
</style>


