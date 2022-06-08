<template>
  <div>
    <TopNavbarHome />
    <!-- <TopNavbarHome /> -->
    <div
      class="container-fluid view full-page-intro"
      style="padding-top:30px;padding-bottom:30px;background-image: url('../images/guide-etnafes.jpg'); background-repeat: no-repeat; background-size: cover;background-attachment:fixed"
    >
      <div class="row">
        <div class="col-md-5 offset-md-6">
          <div
            class="panel panel-default"
            style="background-color:#fff;padding:20px;border-radius:5px"
          >
            <div class="panel-heading" style="padding: 8px 20px;">
              <h3
                class="panel-title"
                style="color:#000"
              >Gagnez de l'argent en tant que guide Etnafes</h3>
            </div>
            <div class="panel-body">
              <form accept-charset="UTF-8" role="form" @submit.prevent="performRegister">
                <fieldset>
                  <!-- <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <select
                          class="form-control"
                          name="civilité"
                          id="civilité"
                          v-model="guide.civilité"
                        >
                          <option value="mr">Mr</option>
                          <option value="mme">Mme</option>
                          <option value="mlle">Mlle</option>
                        </select>
                        <p v-if="validationErrors.civilité" style="padding-bottom:5px;color:red">
                          <span class="alert-link">** {{ validationErrors.civilité[0] }}</span>
                        </p>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="form-group">
                        <input
                          class="form-control"
                          placeholder="telephone"
                          name="Telephone"
                          type="text"
                          v-model="guide.telephone"
                        />
                        <p v-if="validationErrors.telephone" style="padding-bottom:5px;color:red">
                          <span class="alert-link">** {{ validationErrors.telephone[0] }}</span>
                        </p>
                      </div>
                    </div>
                  </div>-->

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Pays *</label>
                        <select
                          class="form-control"
                          required
                          v-model="pays_id"
                          @change="fetchVillesPays(pays_id)"
                        >
                          <!-- <option value disabled selected>choisissez votre pays</option> -->
                          <option
                            v-for="pays in pays"
                            v-bind:key="pays.id"
                            v-bind:value="pays.id"
                          >{{pays.nom_fr_fr}}</option>
                        </select>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="form-group">
                        <label>Ville *</label>
                        <select class="form-control" required v-model="guide.ville_id">
                          <option value disabled selected>choisissez votre destination</option>
                          <option
                            v-for="ville in villespays"
                            v-bind:key="ville.id"
                            v-bind:value="ville.id"
                          >{{ville.nom}}</option>
                        </select>
                        <p v-if="validationErrors.ville_id" style="padding-bottom:5px;color:red">
                          <span class="alert-link">** {{ validationErrors.ville_id[0] }}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <!-- <label>Nom *</label> -->
                        <input
                          aria-label="label"
                          class="form-control"
                          placeholder="Nom de famille *"
                          name="name"
                          type="text"
                          v-model="guide.nom"
                        />
                        <p v-if="validationErrors.nom" style="padding-bottom:5px;color:red">
                          <span class="alert-link">** {{ validationErrors.nom[0] }}</span>
                        </p>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="form-group">
                        <!-- <label>Prenom *</label> -->
                        <input
                          aria-label="label"
                          class="form-control"
                          placeholder="Prénom *"
                          name="prenom"
                          type="text"
                          v-model="guide.prenom"
                        />
                        <p v-if="validationErrors.prenom" style="padding-bottom:5px;color:red">
                          <span class="alert-link">** {{ validationErrors.prenom[0] }}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <input
                          aria-label="label"
                          class="form-control"
                          placeholder="E-mail *"
                          name="email"
                          type="text"
                          v-model="guide.email"
                        />
                        <p v-if="validationErrors.email" style="padding-bottom:5px;color:red">
                          <span class="alert-link">** {{ validationErrors.email[0] }}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <input
                          aria-label="label"
                          class="form-control"
                          placeholder="Login *"
                          name="login"
                          type="text"
                          v-model="guide.login"
                        />
                        <p v-if="validationErrors.login" style="padding-bottom:5px;color:red">
                          <span class="alert-link">** {{ validationErrors.login[0] }}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <b-tooltip target="tooltip-target-1" triggers="hover">
                          <ul>
                            <li v-bind:class="{ is_valid: contains_eight_characters }">8 Caractéres</li>
                            <li v-bind:class="{ is_valid: contains_number }">Chiffre</li>
                            <li v-bind:class="{ is_valid: contains_uppercase }">Lettre majuscule</li>
                            <li
                              v-bind:class="{ is_valid: contains_special_character }"
                            >Caractére spécial</li>
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
                          <VuePassword
                            type="password"
                            @input="checkPassword"
                            v-model="password"
                            autocomplete="off"
                            placeholder="Mot de passe *"
                          />
                        </div>
                        <p v-if="validationErrors.password" style="padding-bottom:5px;color:red">
                          <span class="alert-link">** {{ validationErrors.password[0] }}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <!-- <div class="form-group">
                    <label>Présentation *</label>
                    <textarea
                      class="form-control"
                      placeholder="Ecrire quelques lignes de présentation qui apparaitront sur votre page dédiée"
                      name="présentation"
                      v-model="guide.présentation"
                    />
                    <p v-if="validationErrors.présentation" style="padding-bottom:5px;color:red">
                      <span class="alert-link">** {{ validationErrors.présentation[0] }}</span>
                    </p>
                  </div>-->

                  <!-- <div class="form-group">
                    <label>Envoyez-nous une photo du guide *</label>
                    <b-form-file
                      required
                      type="file"
                      name="photo"
                      @change="profilePhoto"
                      class="input-file"
                      accept="image/x-png, image/gif, image/jpeg"
                    />
                  </div>-->

                  <!-- <div class="form-group">
                    <label>Carte professionnel de guide(facultatif)</label>
                    <b-form-file
                      type="file"
                      name="carte_professionnel"
                      @change="Carte"
                      class="input-file"
                      accept="image/x-png, image/gif, image/jpeg"
                    />
                  </div>-->
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <!-- <label>Langue maternelle *</label> -->
                        <input
                          aria-label="label"
                          placeholder="Langue maternelle (facultatif)"
                          class="form-control"
                          name="langue_maternelle"
                          type="text"
                          v-model="guide.langue_maternelle"
                        />
                        <p
                          v-if="validationErrors.langue_maternelle"
                          style="padding-bottom:5px;color:red"
                        >
                          <span class="alert-link">** {{ validationErrors.langue_maternelle[0] }}</span>
                        </p>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="form-group">
                        <!-- <label>Langues de visite *</label> -->
                        <input
                          aria-label="label"
                          class="form-control"
                          placeholder="Langues de visite (facultatif)"
                          name="langue_de_visite"
                          type="text"
                          v-model="guide.langue_de_visite"
                        />
                        <p
                          v-if="validationErrors.langue_de_visite"
                          style="padding-bottom:5px;color:red"
                        >
                          <span class="alert-link">** {{ validationErrors.langue_de_visite[0] }}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <input
                    aria-label="label"
                    class="btn btn-lg btn-light btn-block"
                    type="submit"
                    value="S'inscrire"
                  />
                  <br />
                  <div>
                    Vous avez déja un compte?
                    <a href="/login/guide">Se connecter</a>
                  </div>
                </fieldset>
              </form>
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
export default {
  components: {
    VuePassword,
    TopNavbarHome,
    Footer
  },
  data() {
    return {
      scrollPosition: null,
      villespays: {},
      validationErrors: "",
      password: null,
      password_length: 0,
      contains_eight_characters: false,
      contains_number: false,
      contains_uppercase: false,
      contains_special_character: false,
      valid_password: false,
      pays: {},
      pays_id: "",
      guide: {
        nom: "",
        prenom: "",
        civilité: "",
        cin: "",
        telephone: "",
        langue_maternelle: "",
        langue_de_visite: "",
        présentation: ""
      }
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

  created() {
    this.fetchPays();
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
    fetchPays() {
      axios.get(`${apiDomain}/api/pays`).then(({ data }) => (this.pays = data));
    },
    fetchVillesPays(id) {
      axios
        .get(`${apiDomain}/api/pays/villes/${id}`)
        .then(({ data }) => (this.villespays = data.villes));
    },
    profilePhoto: function(event) {
      var input = event.target;
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        var vm = this;
        reader.onload = function(e) {
          vm.guide.photo = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
      console.log(input.files[0]);
    },

    Carte: function(event) {
      var input = event.target;
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        var vm = this;
        reader.onload = function(e) {
          vm.guide.carte_professionnel = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
      console.log(input.files[0]);
    },
    performRegister(e) {
      var formData = new FormData(e.target);
      formData.append("nom", this.guide.nom);
      formData.append("prenom", this.guide.prenom);
      formData.append("telephone", this.guide.telephone);
      formData.append("email", this.guide.email);
      /* formData.append("civilité", this.guide.civilité);
      formData.append("présentation", this.guide.présentation); */
      formData.append("langue_maternelle", this.guide.langue_maternelle);
      formData.append("langue_de_visite", this.guide.langue_de_visite);
      // formData.append("cin", this.guide.cin);

      if (this.valid_password == true) {
        formData.append("password", this.password);
      }
      formData.append("login", this.guide.login);
      formData.append("verifier", 0);
      formData.append("ville_id", this.guide.ville_id);

      axios
        .post(`${apiDomain}/api/register/guide`, formData)
        .then(response => {
          if (response.status == 201) {
            this.$noty.success("veuillez vérifiez votre compte.");
            // if (confirm("proprietaire Ajoutée")) {
            this.$router.push("/client_verification");
            // }
          }
        })
        .catch(error => {
          if (error.response && error.response.status == 400) {
            this.validationErrors = error.response.data;
          }
        });
    }
  }
};
</script>
