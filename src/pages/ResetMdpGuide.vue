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
              <h3 class="panel-title" style="color: #000">Guide - Mot de passe oublié</h3>
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

                  <div class="valid-feedback">
                    <div class="alert alert-success" role="alert">{{ infoEmail }}</div>
                  </div>
                </div>
                <button class="btn btn-primary">Envoie du code à votre adresse email</button>
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
                      <div class="alert alert-danger" role="alert">{{ errorToken }}</div>
                    </div>

                    <div class="valid-feedback">
                      <div class="alert alert-success" role="alert">{{ infoToken }}</div>
                    </div>
                  </div>
                  <button type="submit" class="btn btn-primary">Valider Code</button>
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
                  >Change Password</button>

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
      tokenVerifEmail: "",
      isLoadingVerifEmail: false,
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
    submitPassword() {
      axios
        .post(`${apiDomain}/api/recoverNewPassword-guide`, {
          // 'token':this.$route.params.token
          email: this.email,
          password: this.password
        })
        .then(res => {
          if (res.status == 200) {
            this.$noty.success(res.data.message);
            this.infoModal = false;

            // this.clear();
            this.$router.push({ path: "/login/guide" });
          }
        })
        .catch(error => {
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
      this.erreurEmail = null;
      if (!this.email) {
        this.erreurEmail = "Email est obligatoire";
      }

      if (!this.erreurEmail) {
        const data = {
          email: this.email
        };
        axios
          .post(`${apiDomain}/api/send-token-guide`, data)
          .then(() => {
            this.infoEmail = "Un code a été envoyé à votre adresse email";
            this.EmailValid = true;
          })
          .catch(error => {
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

    validateToken() {
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
          .post(`${apiDomain}/api/validate-token-guide`, data)
          .then(response => {
            this.tokenValid = true;
            this.infoToken = "Code verifié avec succès";
            if (response.data.id) {
              this.user = response.data;
              // this.$noty.success("votre code a été verifier avec succes .");
            }
          })
          .catch(error => {
            // this.errorToken = error.response.data.error;
            if (error.response && error.response.status == 401) {
              this.errorToken = "Votre Code est incorrect ";
            }
            if (error.response && error.response.status == 422) {
              this.errorToken = "Code est obligatoire";
            }
          });
      }
    }
  }
};
</script>
