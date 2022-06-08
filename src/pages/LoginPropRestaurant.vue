<template>
  <div>
    <TopNavbarHome />
    <div
      class="container-fluid view full-page-intro"
      style="
        padding-top: 50px;
        padding-bottom: 50px;
        background-image: url('../images/restaurant-etnafes-voyage.jpg');
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
                PROPRIETAIRE RESTAURANT
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
                    <router-link to="/proprestau_reset_mdp">
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
                    <a href="/register/proprietaire_restau">S'inscrire</a>
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
      scrollPosition: null,
      email: "",
      password: "",
      remember: "",
      isLoading: false,
      error: "",
    };
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
    performLogin() {
      this.isLoading = true;
      this.$store
        .dispatch("performLoginClientAction", {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          this.isLoading = false;
          this.$router.push("/nouveaurestaurant");
        })
        .catch((error) => {
          //this.erreurEmail = error.response.data.error;
          if (error.response && error.response.status == 401) {
            this.error = "Email ou mot de passe incorrect";
          }
          if (error.response && error.response.status == 403) {
            this.$noty.error(
              "Vous n’avez pas encore activé votre compte pour avoir accès. Veuillez vérifier votre courriel ."
            );
            this.$router.push("/proprietaire_restau_verification");
          }
        });
    },
  },
};
</script>