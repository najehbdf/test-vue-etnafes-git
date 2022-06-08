<template>
  <div>
    <TopNavbarHome />
    <div class="container" style="margin-top: 30px">
      <div class="row">
        <div class="col-md-4 offset-md-4">
          <div class="panel panel-default style_login_voyageur">
            <div class="panel-heading">
              <h3 class="panel-title" style="color: #000">Register admin</h3>
            </div>
            <div class="panel-body">
              <form accept-charset="UTF-8" role="form" @submit.prevent="performRegister">
                <fieldset>
                  <div class="form-group">
                    <input
                      aria-label="label"
                      class="form-control"
                      placeholder="Nom"
                      name="name"
                      type="text"
                      v-model="name"
                    />
                  </div>

                  <div class="form-group">
                    <input
                      aria-label="label"
                      class="form-control"
                      placeholder="E-mail"
                      name="email"
                      type="text"
                      v-model="email"
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
                      value
                    />
                  </div>
                  <input
                    aria-label="label"
                    class="btn btn-lg btn-success btn-block"
                    type="submit"
                    value="S'inscrire"
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
import axios from "axios";
import { apiDomain } from "../config";
export default {
  components: {
    TopNavbarHome,
    Footer
  },
  data() {
    return {
      name: "",
      email: "",
      password: ""
    };
  },
  methods: {
    performRegister() {
      axios
        .post(`${apiDomain}/api/auth/register`, {
          name: this.name,
          email: this.email,
          password: this.password
        })
        .then(res => {
          console.log(res.data);
          const token = localStorage.setItem("token", res.data.access_token);
          const user = localStorage.setItem("user", res.data.user);
          this.$router.push("/login");
        })
        .catch(err => {
          console.log(err.message);
          this.error = err.message;
        });
      console.log("perform register");
    }
  }
};
</script>
