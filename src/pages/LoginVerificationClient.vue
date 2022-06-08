<template>
  <div>
    <TopNavbarHome />
    <div
      class="container-fluid view full-page-intro"
      style="padding-top:50px;padding-bottom:50px;background-image: url('../images/voyageur.jpg'); background-repeat: no-repeat; background-size: cover;background-attachment:fixed"
    >
      <div class="row">
        <div class="col-md-4 offset-md-7" v-if="showLogin==true">
          <div
            class="panel panel-default"
            style="background-color:#fff;padding:30px;border-radius:5px"
          >
            <div class="panel-heading">
              <h3 class="panel-title" style="color:#000">Se connecter</h3>
            </div>
            <div class="panel-body">
              <form accept-charset="UTF-8" role="form" @submit.prevent="performLogin">
                <fieldset>
                  <div class="form-group">
                    <input
                      aria-label="label"
                      class="form-control"
                      placeholder="E-mail"
                      name="email"
                      type="text"
                      v-model="email"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <input
                      aria-label="label"
                      v-model="password"
                      class="form-control"
                      placeholder="Mot de passe"
                      name="password"
                      type="password"
                      required
                    />
                  </div>
                  <div style="color:red;padding-bottom:5px" v-if="error">{{error}}</div>

                  <input
                    aria-label="label"
                    class="btn btn-lg btn-success btn-block"
                    type="submit"
                    value="Login"
                  />
                  <br />
                  <div>
                    Vous n'avez pas encore un compte?
                    <a href="/register/client">S'inscrire</a>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>

        <div class="col-md-4 offset-md-7" v-if="showLogin==false">
          <div
            class="panel panel-default"
            style="background-color:#fff;padding:30px;border-radius:5px"
          >
            <div class="panel-heading">
              <h3 class="panel-title" style="color:#000">VÉRIFICATION DU COMPTE</h3>
              <p>Veuillez saisir le code d'activation envoyé à votre adresse email</p>
            </div>
            <div class="panel-body">
              <form>
                <div class="form-group">
                  <input
                    aria-label="label"
                    type="text"
                    class="form-control personalise"
                    placeholder="Entrer votre code ..."
                    v-model="tokenVerifEmail"
                  />
                </div>
                <span
                  class="list-group-item list-group-item-danger"
                  v-if="errors.token"
                >{{errors.token[0]}}</span>

                <div class="row">
                  <div class="col-md-12">
                    <input
                      aria-label="label"
                      class="btn btn-lg btn-success btn-block"
                      @click.prevent="verifEmailClient"
                      type="submit"
                      value="Vérification"
                    />
                  </div>
                </div>
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
import TopNavbarHome from "./Layout/TopNavbarHome.vue";
import Footer from "./Layout/Footer.vue";
import axios from "axios";
import { apiDomain } from "../config";
export default {
  components: {
    TopNavbarHome,
    Footer
  },
  name: "login",
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
      isLoading: false
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

  mounted() {},

  methods: {
    //modifier mot de passe
    submitPassword() {
      axios
        .post(`${apiDomain}/api/recoverNewPassword`, {
          password: this.password
        })
        .then(res => {
          if (res.status == 200) {
            this.$noty.success(res.data.message);
            this.infoModal = false;

            this.clear();
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
        this.axios
          .post(`${apiDomain}/api/send-token`, data)
          .then(() => {
            this.infoEmail = "Un code a été envoyé à votre adresse email";
            this.EmailValid = true;
          })
          .catch(error => {
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
          token: this.token
        };
        axios
          .post(`${apiDomain}/api/validate-token`, data)
          .then(response => {
            this.tokenValid = true;
            /*   this.infoToken ='code  envoyer.' ; */
            if (response.data.id) {
              this.user = response.data;
            }
          })
          .catch(error => {
            if (error.response && error.response.status == 401) {
              this.erreurEmail = "Votre Code est incorrect ";
            }
            if (error.response && error.response.status == 422) {
              this.erreurEmail = "Code est obligatoire";
            }
          });
      }
    },

    verifEmailClient() {
      this.isLoadingVerifEmail = true;
      this.errorTokenVerifEmail = null;
      let formData = new FormData();

      if (!this.errorTokenVerifEmail) {
        const data = {
          token: this.tokenVerifEmail
        };
        axios
          .post(`${apiDomain}/api/validate-email`, data)
          .then(response => {
            this.$noty.success("votre code a été vérifié avec succès .");
            this.showLogin = true;
            this.isLoadingVerifEmail = false;
            if (response.data.id) {
              this.user = response.data;
            }
          })
          .catch(error => {
            this.isLoadingVerifEmail = false;

            if (error.response.status == 422) {
              this.isLoadingVerifEmail = false;
              this.errors = error.response.data.errors;
            }

            if (error.response.status == 401) {
              this.$noty.error("votre code est invalid ! .");
            }
          });
      }
    },

    //rest pasword
    sendEmail() {
      axios
        .post(`${apiDomain}/api/user/forgot`, {
          email: this.email
        })
        .then(res => {
          if (res.status == 200) {
            if (res.data.status != "success")
              this.$noty.error(res.data.message);
            else {
              this.$noty.success(res.data.message);
              //	this.$bvModal.hide('bv-modal')
            }
          }
        })
        .catch(err => console.log(err));
    },

    showNotification(message) {
      this.status_msg = message;
      setTimeout(() => {
        this.status_msg = "";
      }, 120000);
    },

    performLogin() {
      this.isLoading = true;
      this.$store
        .dispatch("performLoginClientAction", {
          email: this.email,
          password: this.password
        })
        .then(res => {
          this.isLoading = false;
          this.$router.push("/dashboard_client");
        })
        .catch(err => {
          this.error = "Email ou mot de passe incorrect.";
          console.log(err.message);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@mixin showpass($property) {
  position: absolute;
  left: $property;
  top: 20px;
  z-index: 11;
  cursor: pointer;
}
.show-icon {
  @include showpass(20px);
}
.hide-icon {
  @include showpass(18px);
  color: #555;
}
.show-icon {
  @include showpass(20px);
}
.hide-icon {
  @include showpass(18px);
  color: #555;
}
@import url("https://use.fontawesome.com/releases/v5.7.2/css/all.css");
</style>>
