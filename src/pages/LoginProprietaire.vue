<template>
  <div>
    <!-- <div class="container-fluid">
      <div class="row">
        <TopNavbarHome></TopNavbarHome>
      </div>
    </div>-->
    <TopNavbarHome></TopNavbarHome>

    <div>
      <b-modal
        title="changer Votre mot de passe"
        color="info"
        id="modal-edit-pwd"
        style="z-index: 9918; margin-top: 150px"
      >
        <div class="row">
          <div class="d-block text-center"></div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <form v-on:submit.prevent="sendToken">
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

                <div class="invalid-feedback">
                  <div class="alert alert-danger" role="alert">
                    {{ erreurEmail }}
                  </div>
                </div>

                <div class="valid-feedback">
                  <div class="alert alert-success" role="alert">
                    {{ infoEmail }}
                  </div>
                </div>
              </div>
              <button class="btn btn-primary">
                Envoie du code à votre adresse email
              </button>
            </form>
          </div>
        </div>

        <div class="row" v-if="EmailValid">
          <div class="col-md-12">
            <form v-on:submit.prevent="validateToken">
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
                  <div class="alert alert-danger" role="alert">
                    {{ errorToken }}
                  </div>
                </div>

                <div class="valid-feedback">
                  <div class="alert alert-success" role="alert">
                    {{ infoToken1 }}
                  </div>
                </div>
              </div>
              <button type="submit" class="btn btn-primary">
                Valider Code
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
                  <div class="input-group mb-2">
                    <input
                      aria-label="label"
                      v-model="password"
                      name="password"
                      id="password"
                      type="password"
                      required
                      class="form-control"
                    />
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <label style="line-height: 30px">Confirmation</label>
                <div class="form-group">
                  <div class="input-group mb-2">
                    <input
                      aria-label="label"
                      v-model="password_confirmation"
                      name="password_confirmation"
                      id="password_confirmation"
                      type="password"
                      required
                      class="form-control"
                    />
                  </div>
                </div>
              </div>
              <button
                type="button"
                class="btn btn-success"
                @click="submitPassword"
                v-show="!isPasswordMatching"
              >
                Change Password
              </button>

              <div class="col-xs-4 text-center"></div>
            </div>
          </div>
        </div>
      </b-modal>
    </div>
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
              <h3 class="panel-title" style="color: #000">
                Proprietaire Hébergement
              </h3>
            </div>
            <div class="panel-body">
              <form
                accept-charset="UTF-8"
                role="form"
                @submit.prevent="performLogin"
              >
                <fieldset>
                  <div class="form-group">
                    <input
                      aria-label="label"
                      class="form-control"
                      placeholder="E-mail"
                      name="email"
                      type="email"
                      v-model="email"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <VuePassword
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

                  <div class="checkbox">
                    <router-link to="/proprietaire_reset_mdp">
                      <p style="color: #1c4b94; font-weight: bold">
                        Mot de passe oublié ?
                      </p>
                    </router-link>
                  </div>
                  <input
                    aria-label="label"
                    class="btn btn-lg btn-success btn-block"
                    type="submit"
                    value="Login"
                  />
                  <div
                    style="
                      margin-top: -10px;
                      padding: 30px;
                      margin-left: -30px;
                      margin-right: -30px;
                    "
                    class="advanced"
                  >
                    <p class="text-center f14 c-grey">Ou continuer avec</p>
                    <!--  <br /> -->
                    <div class="row">
                      <div style="margin-left: 13px" class="col-xs-12 col-sm-4">
                        <span
                          @click="loginFacebbok"
                          class="btn btn_login_fb"
                          data-channel="facebook"
                        >
                          <i class="fab fa-facebook"></i>
                          Facebook
                        </span>
                      </div>
                      <div class="col-xs-12 col-sm-4" style="margin-left: 73px">
                        <span
                          class="btn btn_login_google"
                          data-channel="google"
                        >
                          <i class="fab fa-google"></i>
                          Google
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    Vous n'avez pas encore un compte?
                    <a href="/register/proprietaire">S'inscrire</a>
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
import { apiDomain } from "../config";
import axios from "axios";
export default {
  components: {
    VuePassword,
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
      error: "",
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
  methods: {
    loginFacebbok() {
      this.$store.dispatch("loginFacebooktAction").then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      });
    },
    sendToken() {
      this.erreurEmail = null;
      if (!this.email) {
        this.erreurEmail = "Email est obligatoire";
      }

      if (!this.erreurEmail) {
        const data = {
          email: this.email,
        };
        this.axios
          .post(`${apiDomain}/api/send-token`, data)
          .then(() => {
            this.infoEmail = "Un code a été envoyé à votre adresse email";
            this.EmailValid = true;
          })
          .catch((error) => {
            //this.erreurEmail = error.response.data.error;
            if (error.response && error.response.status == 401) {
              this.erreurEmail = "Votre email est invalid ";
            }
            if (error.response && error.response.status == 422) {
              this.erreurEmail = "Email est obligatoire";
            }
          });
      }
    },

    performLogin() {
      this.isLoading = true;
      this.$store
        .dispatch("performLoginClientAction", {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          this.isLoading = false;
          this.$router.push("/nouveauhebergement");
        })
        .catch((error) => {
          if (error.response && error.response.status == 401) {
            this.error = "Email ou mot de passe incorrect";
          }
          if (error.response && error.response.status == 403) {
            this.$noty.error(
              "Vous n’avez pas encore activé votre compte pour avoir accès. Veuillez vérifier votre courriel ."
            );
            this.$router.push("/proprietaire_verification");
          }
        });
    },
  },
};
</script>
