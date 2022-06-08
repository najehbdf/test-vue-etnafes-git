<template>
  <div>
    <TopNavbarHome />
    <div class="container" style="padding-bottom: 20px">
      <form @submit.prevent="addContact">
        <div class="row">
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
          <b-button v-bind:href="mailPro" type="submit" title="Envoyer Message">Envoyer Message</b-button>
        </div>
      </form>
    </div>
    <!-- #header page contact -->

    <!--------------------------------->
  </div>
</template>

<script>
import TopNavbarHome from "./Layout/TopNavbarHome.vue";
import { apiDomain } from "./../config.js";
export default {
  name: "Presentation",
  components: {
    TopNavbarHome
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
