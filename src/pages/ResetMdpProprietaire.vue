<template>
  <div>
    <TopNavbarHome />
    <div
      class="container-fluid view full-page-intro"
      style="
        padding-top: 50px;
        padding-bottom: 50px;
        background-image: url('../images/hebergeur-maison-hote-etnafes.jpg');
        background-repeat: no-repeat;
        background-size: cover;
        background-attachment: fixed;
      "
    >
      <div class="row">
        <div class="col-md-4 offset-md-7">
          <div class="panel panel-default style_login_voyageur">
            <div class="panel-heading">
              <h3 class="panel-title" style="color: #000">PROPRIETAIRE - Mot de passe oublié</h3>
            </div>
            <form>
              <div class="form-group">
                <input
                  aria-label="label"
                  type="email"
                  class="form-control"
                  v-bind:class="{
                    'is-invalid': erreurEmail,
                    'is-valid': infoEmail,
                  }"
                  placeholder="Email..."
                  v-model="email"
                />

                <div class="valid-feedback">
                  <div class="alert alert-success" role="alert">{{ infoEmail }}</div>
                </div>
                <div class="invalid-feedback">
                  <div class="alert alert-danger" role="alert">{{ erreurEmail }}</div>
                </div>
              </div>
              <!-- <button class="btn btn-primary">Envoie du code à votre adresse email</button> -->
              <button class="btn btn-primary" @click.prevent="sendToken" v-if="EmailValid == false">
                {{
                isLoadingSendEmail
                ? "En cours attendez ..."
                : "Envoie du code à votre adresse email "
                }}
              </button>
            </form>

            <div class="row" v-if="EmailValid">
              <div class="col-md-12">
                <form>
                  <div class="form-group">
                    <input
                      aria-label="label"
                      type="text"
                      class="form-control"
                      v-bind:class="{
                        'is-invalid': errorToken,
                        'is-valid': infoToken,
                      }"
                      placeholder="code..."
                      v-model="token"
                    />

                    <div class="invalid-feedback">
                      <div class="alert alert-danger" role="alert">{{ errorToken }}</div>
                    </div>

                    <div class="valid-feedback">
                      <div class="alert alert-success" role="alert">{{ infoToken }}</div>
                    </div>
                  </div>
                  <button
                    class="btn btn-primary"
                    @click.prevent="validateToken"
                    v-if="tokenValid == false"
                  >
                    {{
                    isLoadingSendValidToken
                    ? "En cours attendez ..."
                    : "Valider Code "
                    }}
                  </button>
                </form>
              </div>
            </div>

            <div class="row" v-if="tokenValid">
              <div class="col-md-12">
                <div class="row">
                  <div class="col-md-6">
                    <label style="line-height: 30px">Mot de passe</label>
                    <div class="form-group">
                      <b-tooltip target="tooltip-target-1" triggers="hover">
                        <ul>
                          <li
                            v-bind:class="{
                              is_valid: contains_eight_characters,
                            }"
                          >
                            <span>8 Caractéres</span>
                          </li>
                          <li v-bind:class="{ is_valid: contains_number }">Chiffre</li>
                          <li v-bind:class="{ is_valid: contains_uppercase }">Lettre majuscule</li>
                          <li
                            v-bind:class="{
                              is_valid: contains_special_character,
                            }"
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
                          @input="checkPassword"
                          v-model="password"
                          id="password1"
                          type="password"
                          placeholder="Mot de passe"
                        />
                      </div>
                      <p v-if="validationErrors.password" style="padding-bottom: 5px; color: red">
                        <span class="alert-link">** {{ validationErrors.password[0] }}</span>
                      </p>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <label style="line-height: 30px">Confirmation</label>
                    <div class="form-group">
                      <div class="input-group mb-2">
                        <VuePassword
                          v-model="password_confirmation"
                          name="password_confirmation"
                          id="password_confirmation"
                          type="password"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-5">
                    <button
                      type="button"
                      class="btn btn-success"
                      @click="submitPassword"
                      v-show="isPasswordMatching"
                      disabled
                    >
                      {{
                      isLoadingSendchangePass
                      ? "En cours attendez ..."
                      : "Modifier "
                      }}
                    </button>

                    <button
                      type="button"
                      class="btn btn-success"
                      @click="submitPassword"
                      v-show="!isPasswordMatching"
                    >
                      {{
                      isLoadingSendchangePass
                      ? "En cours attendez ..."
                      : "Modifier "
                      }}
                    </button>
                  </div>

                  <div class="col-xs-4 text-center"></div>
                </div>
              </div>
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
import { apiDomain } from "../config";
import axios from "axios";
export default {
  components: {
    VuePassword,
    TopNavbarHome,
    Footer
  },
  data() {
    return {
      valid_password: false,

      isLoadingSendchangePass: false,
      isLoadingSendEmail: false,
      isLoadingSendValidToken: false,
      tokenVerifEmail: "",
      isLoadingVerifEmail: false,
      errorTokenVerifEmail: null,
      infoVerifEmail: null,
      showLogin: false,
      password: null,
      password_length: 0,
      contains_eight_characters: false,
      contains_number: false,
      contains_uppercase: false,
      contains_special_character: false,
      login: "",
      email: "",
      infoModal: false,
      loggedIn: false,
      //error: "",
      isCreating: false,
      show: false,
      formstate: {},
      validationErrors: "",
      //modifier password
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
      infoToken1: "Verifier avec success",

      status_msg: "",
      status: "",
      //error: "",
      errors: [],
      isLoading: false,
      erreurEmail: null,
      infoEmail: null,
      infoToken: null,
      tokenValid: false,
      EmailValid: false,
      infoModal: false,
      email: "",
      password: "",
      remember: "",
      isLoading: false,
      error: ""
    };
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
    }
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
    submitPassword() {
      this.isLoadingSendchangePass = true;
      axios
        .post(`${apiDomain}/api/recoverNewPassword`, {
          // 'token':this.$route.params.token
          email: this.email,
          password: this.password
        })
        .then(res => {
          if (res.status == 200) {
            this.isLoadingSendchangePass = false;
            this.$noty.success("Votre mot de passe a été modifié");
            // this.infoModal = false;

            // this.clear();
            this.$router.push("/login/proprietaire");
          }
        })
        .catch(error => {
          this.isLoadingSendchangePass = false;
          if (error.response && error.response.status == 422) {
            this.validationErrors = error.response.data.errors;
          }
        });
    },
    clear() {
      (this.password = null),
        (this.email = null),
        (this.password_confirmation = null),
        (this.token = null),
        (this.tokenValid = false),
        (this.EmailValid = false),
        (this.infoEmail = false),
        (this.erreurEmail = false);
    },
    sendToken() {
      this.isLoadingSendEmail = true;
      this.erreurEmail = null;
      if (!this.email) {
        this.erreurEmail = "Email est obligatoire";
      }

      if (!this.erreurEmail) {
        const data = {
          email: this.email
        };
        axios
          .post(`${apiDomain}/api/send-token`, data)
          .then(() => {
            this.isLoadingSendEmail = false;
            this.infoEmail = "Un code a été envoyé à votre adresse email";
            this.EmailValid = true;
          })
          .catch(error => {
            if (error.response && error.response.status == 401) {
              this.isLoadingSendEmail = false;
              this.erreurEmail = "Votre email est invalid ";
            }
            if (error.response && error.response.status == 400) {
              this.isLoadingSendEmail = false;
              this.erreurEmail = "Email est obligatoire";
            }
          });
      }
    },

    validateToken() {
      this.isLoadingSendValidToken = true;
      this.errorToken = null;

      if (!this.token) {
        this.errorToken = "code est obligatoire";
      }

      if (!this.errorToken) {
        const data = {
          email: this.email,
          token_pwd: this.token
        };
        axios
          .post(`${apiDomain}/api/validate-token`, data)
          .then(response => {
            this.isLoadingSendValidToken = false;
            this.tokenValid = true;
            this.infoToken = "Code verifié avec succès";
            if (response.data.id) {
              this.user = response.data;
              // this.$noty.success("votre code a été verifier avec succes .");
            }
          })
          .catch(error => {
            this.isLoadingSendValidToken = false;
            // this.errorToken = error.response.data.error;
            if (error.response && error.response.status == 401) {
              this.isLoadingSendValidToken = false;
              this.errorToken = "Votre Code est incorrect ";
            }
            if (error.response && error.response.status == 422) {
              this.errorToken = "Code est obligatoire";
              this.isLoadingSendValidToken = false;
            }
          });
      }
    },

    performLogin() {
      this.isLoading = true;
      this.$store
        .dispatch("performLoginPropAction", {
          email: this.email,
          password: this.password
        })
        .then(res => {
          this.isLoading = false;
          this.$router.push("/dashboard_proprietaire");
        })
        .catch(error => {
          //this.erreurEmail = error.response.data.error;
          if (error.response && error.response.status == 401) {
            this.error = "Email ou mot de passe incorrect";
          }
          if (error.response && error.response.status == 403) {
            this.error =
              "Vous N’avez Pas Encore Activé Votre Compte Pour Avoir Accès. Veuillez Vérifier Votre Courriel";
          }
        });
    }
  }
};
</script>