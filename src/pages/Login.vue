<template>
  <div>
    <TopNavbarHome />
    <div class="container" style="margin-top: 30px">
      <div class="row">
        <div class="col-md-4 offset-md-4">
          <div class="panel panel-default style_login_voyageur">
            <div class="panel-heading">
              <h3 class="panel-title" style="color: #000">ADMIN</h3>
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
                    />
                    <div style="color: red" v-if="error">{{ error }}</div>
                  </div>
                  <div class="form-group">
                    <input
                      aria-label="label"
                      v-model="password"
                      class="form-control"
                      placeholder="Mot de passe"
                      required
                      name="password"
                      type="password"
                      value
                    />
                  </div>
                  <input
                    aria-label="label"
                    class="btn btn-lg btn-success btn-block"
                    type="submit"
                    value="Login"
                  />
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TopNavbarHome from "./Layout/TopNavbarHome.vue";
import Footer from "./Layout/Footer.vue";
import { apiDomain } from "../config";
import axios from "axios";
export default {
  components: {
    TopNavbarHome,
    Footer
  },
  data() {
    return {
      email: "",
      password: "",
      remember: "",
      isLoading: false,
      error: ""
    };
  },
  methods: {
    performLogin() {
      this.isLoading = true;
      this.$store
        .dispatch("performLoginClientAction", {
          email: this.email,
          password: this.password
        })
        .then(res => {
          this.isLoading = false;
          this.$router.push("/statistiques");
        })
        .catch(error => {
          if (error.response && error.response.status == 401) {
            this.error = "Email ou mot de passe incorrect";
          }
          if (error.response && error.response.status == 403) {
            this.$noty.error(
              "Vous n’avez pas encore activé votre compte pour avoir accès. Veuillez vérifier votre courriel ."
            );
            this.$router.push("/client_verification");
          }
        });
    }
    /* performLogin() {
      this.isLoading = true;
      this.$store
        .dispatch("performLoginAction", {
          email: this.email,
          password: this.password
        })
        .then(res => {
          this.isLoading = false;
          this.$router.push("/statistiques");
        })
        .catch(err => {
          this.error = "there was error";
          console.log(err.message);
        });
    } */
  }
};
</script>