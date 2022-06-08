<template>
  <div>
    <TopNavbarHome />

    <div class="container" style="padding-bottom: 60px;padding-top: 60px">
      <div class="row">
        <div class="col-lg-6 col-md-8">
          <div class="row">
            <div class="col-lg-2 col-md-8"></div>
            <div id="contact" class="pagecontact col-lg-10 col-md-8">
              <div class="form">
                <div id="errormessage"></div>
                <form @submit.prevent="addContact">
                  <div class="form-row">
                    <div class="form-group col-lg-6">
                      <input
                        aria-label="nom"
                        type="text"
                        name="name"
                        class="form-control"
                        id="name"
                        placeholder="Nom"
                        data-rule="minlen:4"
                        data-msg="Please enter at least 4 chars"
                        v-model="contact.nom"
                      />
                      <span class="text-red" v-if="errors.nom">
                        {{
                        errors.nom[0]
                        }}
                      </span>
                    </div>
                    <div class="form-group col-lg-6">
                      <input
                        aria-label="email"
                        type="email"
                        class="form-control"
                        name="email"
                        id="email"
                        placeholder="Email"
                        data-rule="email"
                        data-msg="Please enter a valid email"
                        v-model="contact.email"
                      />
                      <span class="text-red" v-if="errors.email">
                        {{
                        errors.email[0]
                        }}
                      </span>
                      <div class="validation"></div>
                    </div>
                  </div>
                  <div class="form-group">
                    <input
                      aria-label="sujet"
                      type="text"
                      class="form-control"
                      name="sujet"
                      id="sujet"
                      placeholder="Sujet"
                      data-rule="minlen:4"
                      data-msg="Please enter at least 8 chars of subject"
                      v-model="contact.sujet"
                    />
                    <span class="text-red" v-if="errors.sujet">
                      {{
                      errors.sujet[0]
                      }}
                    </span>
                    <div class="validation"></div>
                  </div>
                  <div class="form-group">
                    <b-textarea
                      aria-label="message"
                      class="form-control"
                      name="message"
                      rows="5"
                      data-rule="required"
                      data-msg="Please write something for us"
                      placeholder="Message"
                      v-model="contact.message"
                    ></b-textarea>
                    <span class="text-red" v-if="errors.message">
                      {{
                      errors.message[0]
                      }}
                    </span>
                    <div class="validation"></div>
                  </div>
                  <div class="text-center">
                    <b-button
                      variant="warning"
                      v-bind:href="mailPro"
                      type="submit"
                      title="Envoyer Message"
                    >Envoyer Message</b-button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6 col-md-4">
          <div class="row">
            <div class="col-lg-2 col-md-4"></div>
            <div class="col-lg-10 col-md-4">
              <h4 class="pagecont" style="color:#333">
                N'hésitez pas à nous contacter
                <!--     <br />+216 22 22 59 51 -->
              </h4>
              <p style="line-height:25px">
                <span style="font-weight:bold">Email :</span> contact@etnafes.shop
                <br />
                <span style="font-weight:bold">Téléphone :</span> (+216) 22 225 951
                <br />
                <span style="font-weight:bold">Adresse :</span> 20, rue al Azhar Ben Nounafedh, Mansoura Kairouan
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer></Footer>
  </div>
</template>



  <script>
import axios from "axios";
import TopNavbarHome from "./Layout/TopNavbarHome.vue";
import Footer from "./Layout/Footer.vue";
import { apiDomain } from "../config";
export default {
  components: {
    TopNavbarHome,
    Footer
  },

  data() {
    return {
      errors: [],
      // error: "",
      isCreating: false,
      emailEtnafes: "contact@etnafes.shop",
      mailPro: "",
      contact: {
        nom: "",
        email: "",
        sujet: "",
        message: ""
      }
    };
  },

  methods: {
    addContact() {
      axios
        .post(`${apiDomain}/api/submit`, this.contact)
        .then(response => {
          //this.mailPro = "mailto:" + this.emailEtnafes;
          this.$router.push({ name: "Home" });
          this.$noty.success(
            "Votre message a été bien enregistré,nous vous répondrons dés que possible"
          );
        })
        .catch(error => {
          console.log(error.response.data);
          if (error.response.status == 422) {
            this.errors = error.response.data.errors;
          }
        });
    }
  }
};
</script>



