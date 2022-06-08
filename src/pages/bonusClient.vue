<template>
  <div class="content">
    <card style="border: solid 1px; padding: 15px">
      <div class="row">
        <div class="col-md-4 pr-md-1">
          <h4 style="color: #0157aa">
            Voyageur : {{ user.nom }} {{ user.prenom }}
          </h4>

          <br />
        </div>
      </div>
    </card>
  </div>
</template>
<script>
import VueHtml2pdf from "vue-html2pdf";
import { Card, BaseInput } from "@/components/index";
import { apiDomain } from "../config";
export default {
  components: {
    VueHtml2pdf,
    Card,
    BaseInput,
  },
  data() {
    return {
      formstate: {},
      zones: {},
      villes: {},
      pack: {},
      agences: {},
      client: {},
      agence: {},
      pack: {},
      packs: [],
      reservation: {},
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
  created() {
    this.fetchPointBonus(this.$store.state.user.id);
  },
  methods: {
    fetchPointBonus(id) {
      fetch(`${apiDomain}/api/get_Bonu/${this.$store.state.user.id}`)
        .then((res) => res.json())
        .then((res) => {
          this.mesBonus = res.mesBonus;
          this.SommeBonus = res.SommeBonus;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

