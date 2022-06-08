<template>
  <div>
    <TopNavbarHome />
    <div
      class="view full-page-intro"
      style="
        padding-top: 130px;
        padding-bottom: 130px;
        background-image: url('../images/voyageur.jpg');
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
                Voyageur - Mot de passe oublié<br />
                Si vous n'avez pas reçu l'email vérfier votre SPAM
              </h3>
            </div>
            <div class="panel-body">
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
                  <!-- <span
                    style="color: red; font-wight: bold"
                    v-if="erreurEmail"
                    >{{ erreurEmail }}</span
                  > -->
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
                <!--  <button class="btn btn">
                  Envoie du code à votre adresse email .
                </button> -->

                <button
                  v-if="EmailValid == false"
                  type="submit"
                  class="btn btn-info"
                  fill
                  style="border-radius: 18px 0px 18px 0px"
                >
                  {{
                    isLoadingVerifEmail
                      ? "En cours  ..."
                      : " Envoie du code à votre adresse email "
                  }}
                </button>
              </form>
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
                        {{ infoToken }}
                      </div>
                    </div>
                  </div>

                  <button
                    v-if="tokenValid == false"
                    type="submit"
                    class="btn btn-info"
                    fill
                    style="border-radius: 18px 0px 18px 0px"
                  >
                    {{
                      isLoadingVerifToken
                        ? "En cours  ..."
                        : " Valider le code "
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
                      <div class="input-group mb-2">
                        <!-- <input
                          aria-label="label"
                          v-model="password"
                          name="password"
                          id="password"
                          type="password"
                          required
                          class="form-control"
                        /> -->
                        <VuePassword
                          name="password_confirmation"
                          label="Confirmation"
                          v-model="password"
                          type="text"
                          placeholder="*******"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <label style="line-height: 30px">Confirmation</label>
                    <div class="form-group">
                      <div class="input-group mb-2">
                        <!-- <input
                          aria-label="label"
                          v-model="password_confirmation"
                          name="password_confirmation"
                          id="password_confirmation"
                          type="password"
                          required
                          class="form-control"
                        /> -->

                        <VuePassword
                          name="password_confirmation"
                          label="Confirmation"
                          v-model="password_confirmation"
                          type="text"
                          placeholder="*******"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    @click="submitPassword"
                    v-show="!isPasswordMatching"
                    type="submit"
                    class="btn btn-info"
                    fill
                    style="border-radius: 18px 0px 18px 0px"
                  >
                    {{
                      isLoadingVerifPass
                        ? "En cours  ..."
                        : " Modifier mot de passe "
                    }}
                  </button>

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
    Footer,
  },
  data() {
    return {
      tokenVerifEmail: "",
      isLoadingVerifEmail: false,
      isLoadingVerifToken: false,
      isLoadingVerifPass: false,
      errorTokenVerifEmail: null,
      infoVerifEmail: null,
      showLogin: false,

      login: "",
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
      infoToken1: "Verifier avec success",

      status_msg: "",
      status: "",
      //error: "",
      errors: [],
      isLoading: false,
      /*  erreurEmail: null, */
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
  methods: {
    submitPassword() {
      this.isLoadingVerifPass = true;
      axios
        .post(`${apiDomain}/api/recoverNewPassword-client`, {
          // 'token':this.$route.params.token
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          if (res.status == 200) {
            this.$noty.success(res.data.message);
            this.infoModal = false;
            this.isLoadingVerifPass = false;

            // this.clear();
            this.$router.push({ path: "/login/client" });
          }
        })
        .catch((error) => {
          this.isLoadingVerifPass = false;

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
      this.isLoadingVerifEmail = true;
      this.erreurEmail = null;
      if (!this.email) {
        this.erreurEmail = "Email est obligatoire";
      }

      if (!this.erreurEmail) {
        const data = {
          email: this.email,
        };
        axios
          .post(`${apiDomain}/api/send-token-client`, data)
          .then(() => {
            this.infoEmail = "Un code a été envoyé à votre adresse email";
            this.EmailValid = true;
            this.isLoadingVerifEmail = false;
          })
          .catch((error) => {
            this.isLoadingVerifEmail = false;

            //this.erreurEmail = error.response.data.error;
            if (error.response && error.response.status == 401) {
              this.erreurEmail = "Votre email est invalid ";
              this.isLoadingVerifEmail = false;
            }
            if (error.response && error.response.status == 422) {
              this.erreurEmail = "Email est obligatoire";
              this.isLoadingVerifEmail = false;
            }
          });
      }
    },

    validateToken() {
      this.isLoadingVerifToken = true;
      this.errorToken = null;

      if (!this.token) {
        this.errorToken = "code est obligatoire";
      }

      if (!this.errorToken) {
        const data = {
          email: this.email,
          token_pwd: this.token,
        };
        axios
          .post(`${apiDomain}/api/validate-token-client`, data)
          .then((response) => {
            this.isLoadingVerifToken = false;

            this.tokenValid = true;
            this.infoToken = "Code verifié avec succès";
            if (response.data.id) {
              this.user = response.data;
              // this.$noty.success("votre code a été verifier avec succes .");
            }
          })
          .catch((error) => {
            this.isLoadingVerifToken = false;

            // this.errorToken = error.response.data.error;
            if (error.response && error.response.status == 401) {
              this.errorToken = "Votre Code est incorrect ";
              this.isLoadingVerifToken = false;
            }
            if (error.response && error.response.status == 422) {
              this.errorToken = "Code est obligatoire";
              this.isLoadingVerifToken = false;
            }
          });
      }
    },

    performLogin() {
      this.isLoading = true;
      this.$store
        .dispatch("performLoginPropAction", {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          this.isLoading = false;
          this.$router.push("/dashboard_proprietaire");
        })
        .catch((error) => {
          //this.erreurEmail = error.response.data.error;
          if (error.response && error.response.status == 401) {
            this.error = "Email ou mot de passe incorrect";
          }
          if (error.response && error.response.status == 403) {
            this.error =
              "Vous N’avez Pas Encore Activé Votre Compte Pour Avoir Accès. Veuillez Vérifier Votre Courriel";
          }
        });
    },
  },
};
</script>