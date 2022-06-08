<template>
  <card>
    <template slot="header">
      <h5 class="title" style="padding-top:15px">Modifier votre profile</h5>
    </template>
    <div class="row">
      <div class="col-md-6 pr-md-1 text-left">
        <base-input label="Nom" placeholder="Nom" v-model="user.name"></base-input>
      </div>
      <!-- <div class="col-md-3 px-md-1 text-left">
        <base-input label="Prenom" placeholder="Prenom" v-model="user.prenom"></base-input>
      </div>-->
      <div class="col-md-6 pl-md-1 text-left">
        <base-input label="Adresse Email" type="email" v-model="user.email"></base-input>
      </div>
    </div>

    <!-- <div class="row">
      <div class="col-md-6 pr-md-1 text-left">
        <base-input label="Telephone" v-model="user.Telephone" placeholder="Telephone"></base-input>
      </div>
      <div class="col-md-6 pl-md-1 text-left">
        <base-input label="Gouvernorat" v-model="user.gouvernorat" placeholder="Gouvernorat"></base-input>
      </div>
    </div>-->

    <!-- <div class="row">
      <div class="col-md-12 text-left">
        <base-input label="Civilité" v-model="user.civilité" placeholder="Civilité"></base-input>
      </div>
    </div>-->

    <!-- <div class="row">
      <div class="col-md-4 pr-md-1 text-left">
        <base-input label="Cin" v-model="user.cin" placeholder="Cin"></base-input>
      </div>
      <div class="col-md-4 px-md-1 text-left">
        <base-input label="Code postale" v-model="user.code_postale" placeholder="Code postale"></base-input>
      </div>
      <div class="col-md-4 pl-md-1 text-left">
        <base-input label="Login" placeholder="Login" v-model="user.login"></base-input>
      </div>
    </div>-->
    <!-- <div class="row">
      <div class="col-md-8 text-left">
        <base-input>
          <label>About Me</label>
          <textarea
            rows="4"
            cols="80"
            class="form-control"
            placeholder="Here can be your description"
            v-model="model.about"
          ></textarea>
        </base-input>
      </div>
    </div>-->
    <template slot="footer">
      <base-button type="success" fill>Enregistrer</base-button>
    </template>
  </card>
</template>
<script>
import { Card, BaseInput } from "@/components/index";

import BaseButton from "@/components/BaseButton";

export default {
  components: {
    Card,
    BaseInput,
    BaseButton
  },

  computed: {
    loggedIn() {
      return this.$store.getters.get_loggedIn;
    },

    user() {
      return this.$store.getters.get_user;
    }
  },
  props: {
    model: {
      type: Object,
      default: () => {
        return {};
      }
    }
  }
};
</script>
 <style>
/* select,
input,
textarea {
  border: 1px solid #e0e0e0 !important;
  background-color: #eeeeee !important;
} */
</style> 
