<template>
  <div>
    <TopNavbarHome />
    <div v-if="entercode == true">
      <b-modal
        id="modal-confirmernum"
        title="Confirmez votre numéro"
        v-model="entercode"
      >
        <p>Saisissez le code que nous venons d'envoyer</p>
        <input
          aria-label="label"
          type="number"
          placeholder="0000"
          v-on:change="onChange"
          v-on:complete="onComplete"
          v-model="client.code"
        />

        <button
          class="btn btn-success"
          v-b-modal.modal-login
          @click.prevent="validateCode"
          fill
          style="margin-left: 10px"
        >
          Envoyer
        </button>
        <br />

        <div class="alert alert-danger" role="alert" v-if="errorToken != null">
          {{ errorToken }}
        </div>
      </b-modal>
    </div>
    <div
      class="container-fluid view full-page-intro"
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
        <div class="col-md-5 offset-md-6">
          <div
            class="panel panel-default"
            style="background-color: #fff; padding: 20px; border-radius: 5px"
          >
            <div class="panel-heading" style="padding: 8px 20px">
              <h3 class="panel-title" style="color: #000">Inscrivez vous</h3>
            </div>
            <div class="panel-body">
              <ValidationObserver>
                <form class="mb-3">
                  <!-- <h1 style="color:#333">Send an sms</h1> -->
                  <div class="row">
                    <div class="col">
                      <div class="form-group">
                        <label>Pays *</label>
                        <select
                          class="form-control"
                          id="SelectRegion"
                          required
                          v-model="pays_id"
                          @change="fetchVillesPays(pays_id)"
                        >
                          <option value disabled selected>
                            choisissez votre pays
                          </option>
                          <option
                            v-for="pays in pays"
                            v-bind:key="pays.id"
                            v-bind:value="pays.id"
                          >
                            {{ pays.nom_fr_fr }}
                          </option>
                        </select>
                      </div>
                    </div>

                    <div class="col">
                      <div class="form-group">
                        <label>Ville *</label>
                        <select
                          class="form-control"
                          required
                          v-model="client.ville_id"
                        >
                          <option value disabled selected>
                            choisissez votre destination
                          </option>
                          <option
                            v-for="ville in villespays"
                            v-bind:key="ville.id"
                            v-bind:value="ville.id"
                          >
                            {{ ville.nom }}
                          </option>
                        </select>
                        <p
                          v-if="validationErrors.ville_id"
                          style="padding-bottom: 5px; color: red"
                        >
                          <span class="alert-link"
                            >** {{ validationErrors.ville_id[0] }}</span
                          >
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col">
                      <ValidationProvider
                        name="nom"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <div class="form-group">
                          <!-- <label>Nom</label> -->
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
                            style="padding-bottom: 5px; color: red"
                          >
                            <span class="alert-link"
                              >* {{ validationErrors.nom[0] }}</span
                            >
                          </p>
                        </div>
                      </ValidationProvider>
                    </div>

                    <div class="col">
                      <ValidationProvider
                        name="prenom"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <div class="form-group">
                          <!-- <label>Prenom</label> -->
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
                            style="padding-bottom: 5px; color: red"
                          >
                            <span class="alert-link"
                              >*{{ validationErrors.prenom[0] }}</span
                            >
                          </p>
                        </div>
                      </ValidationProvider>
                    </div>
                  </div>

                  <ValidationProvider
                    name="telephone"
                    rules="required|numeric"
                    v-slot="{ errors }"
                  >
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control personalise"
                        v-model="client.telephone"
                        placeholder="Numéro de téléphone"
                      />
                      <span class="message">{{ errors[0] }}</span>

                      <p
                        v-if="validationErrors.telephone"
                        style="padding-bottom: 5px; color: red"
                      >
                        <span class="alert-link"
                          >**{{ validationErrors.telephone[0] }}</span
                        >
                      </p>
                    </div>
                  </ValidationProvider>

                  <div class="row">
                    <div class="col-md-12">
                      <ValidationProvider
                        name="email"
                        rules="required|email"
                        v-slot="{ errors }"
                      >
                        <div class="form-group">
                          <!-- <label>Email</label> -->
                          <input
                            aria-label="label"
                            type="email"
                            class="form-control personalise"
                            v-model="client.email"
                            placeholder="E-mail *"
                          />
                          <span class="message">{{ errors[0] }}</span>

                          <p
                            v-if="validationErrors.email"
                            style="padding-bottom: 5px; color: red"
                          >
                            <span class="alert-link"
                              >*{{ validationErrors.email[0] }}</span
                            >
                          </p>
                        </div>
                      </ValidationProvider>
                    </div>
                  </div>

                  <div class="form-group">
                    <b-tooltip target="tooltip-target-1" triggers="hover">
                      <ul>
                        <li
                          v-bind:class="{ is_valid: contains_eight_characters }"
                        >
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
                      <!-- @input="checkPassword" -->
                      <VuePassword
                        type="password"
                        v-model="password"
                        autocomplete="off"
                        placeholder="Mot de passe *"
                      />
                    </div>

                    <p
                      v-if="validationErrors.password"
                      style="padding-bottom: 5px; color: red"
                    >
                      <span class="alert-link"
                        >** {{ validationErrors.password[0] }}</span
                      >
                    </p>
                  </div>

                  <div class="row">
                    <div class="col-md-3">
                      <button
                        class="btn btn-outline-success mt-3"
                        @click.prevent="addClient"
                        fill
                      >
                        {{ loading ? "En cours ... " : "S'inscrire" }}
                      </button>
                    </div>
                  </div>
                  <br />
                  <div>
                    Vous avez déja un compte?
                    <a href="/login/client">Se connecter</a>
                  </div>
                </form>
              </ValidationObserver>
            </div>
          </div>
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
  data() {
    return {
      client: [],
      guide: [],
      adagence: [],

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
      client: {
        code: "",
      },

      nom: "",
      email: "",
      telephone: "",
      civilité: "",
      gouvernorat: "",
      pays: {},
      pays_id: "",
      guide: {},
    };
  },

  created() {
    this.fetchPays();
  },

  computed: {
    loggedIn() {
      return this.$store.getters.get_loggedIn;
    },

    user() {
      return this.$store.getters.get_user;
    },
  },
  methods: {
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

    addClient() {
      this.entercode = false;
      this.loading = true;
      this.errors = [];

      this.$store
        .dispatch("performRegisterClientAction", {
          nom: this.client.nom,
          prenom: this.client.prenom,
          telephone: this.client.telephone,
          email: this.client.email,
          login: this.client.login,
          ville_id: this.client.ville_id,
          civilité: this.civilité,

          gouvernorat: this.gouvernorat,
          agence_id: this.agence_id,

          password: this.password,
        })
        .then((res) => {
          this.isCreating = false;

          /*  if (response.status == 20) { */
          this.loading = false;
          //this.$noty.success("veuillez vérifier votre compte.");

          this.$noty.success("Connexion réussie.");
          this.$router.push("/");
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

    addClient____() {
      this.entercode = false;
      this.loading = true;

      axios
        .post(`${apiDomain}/api/register/client`, {
          nom: this.client.nom,
          prenom: this.client.prenom,
          telephone: this.client.telephone,
          email: this.client.email,
          login: this.client.login,
          ville_id: this.client.ville_id,
          civilité: this.civilité,
          password: this.password,

          gouvernorat: this.gouvernorat,
          agence_id: this.agence_id,
          headers: {
            "content-type": "application/json",
          },
        })
        .then((response) => {
          if (response.status == 201) {
            this.loading = false;
            this.$noty.success("veuillez vérifier votre compte.");
            this.$router.push("/client_verification");
          }
        })
        .catch((error) => {
          this.loading = false;
          if (error.response && error.response.status == 400) {
            this.validationErrors = error.response.data;
          }
        });
    },
    fetchPays() {
      axios.get(`${apiDomain}/api/pays`).then(({ data }) => (this.pays = data));
    },
    fetchVillesPays(id) {
      axios
        .get(`${apiDomain}/api/pays/villes/${id}`)
        .then(({ data }) => (this.villespays = data.villes));
    },
    profilePhoto: function (event) {
      var input = event.target;
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        var vm = this;
        reader.onload = function (e) {
          vm.guide.photo = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
      console.log(input.files[0]);
    },

    Carte: function (event) {
      var input = event.target;
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        var vm = this;
        reader.onload = function (e) {
          vm.guide.carte_professionnel = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
      console.log(input.files[0]);
    },
  },
};
</script>
<style>
p {
  color: #000;
}
</style>