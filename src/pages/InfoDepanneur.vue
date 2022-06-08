<template>
  <div>
    <div class="card" style="width: 18rem">
      <center>
        <div class="card-body">
          <img loading="lazy"
            alt="photo"
            v-if="content.id"
            style="max-width: 75% !important"
            :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_hebergement/${content.image_couverture}`"
            class="photo"
          />

          <img loading="lazy"
            alt="photo"
            v-if="content.idzone"
            style="max-width: 75% !important"
            :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_zones/${content.image_couverture}`"
            class="photo"
          />

          <h4 class="card-text" style="margin-top: 10px">{{ content.nom }}</h4>

          <p class="card-text">{{ content.place }}</p>
          <!--  <p class="card-text" >{{content.depanneur_id}}</p> -->
          <router-link
            v-if="content.id"
            :to="`/detailshebergement/${content.id}`"
            class="btn btn-warning"
            >Afficher la suite</router-link
          >
           <router-link
            v-if="content.idfemme"
            :to="`/produit_femme/${content.idfemme}`"
            class="btn btn-warning"
            >Voir les produits</router-link
          >
          

          <router-link
            v-if="content.idzone"
            :to="`/detailszone/${content.idzone}`"
            class="btn btn-warning"
            >Afficher la suite</router-link
          >
        </div>
      </center>
    </div>
  </div>
</template>

<script>
import { apiDomain } from "../config";
export default {
  props: ["content"],
  data() {
    return {
      slide: 0,
      apiDomain: "https://etnafesapi20212018.etnafes.com",
      zone: {},
      imagezones: [],
      verification: [],
      resultasMAP: [],
      client: {
        // user_id: this.$store.state.user.id
      },
    };
  },
  mounted() {},
  computed: {
    loggedIn() {
      return this.$store.getters.get_loggedIn;
    },
    user() {
      return this.$store.getters.get_user;
    },
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },

    //fetch all entreprise with relation of client
    fetchFindDistance(id) {
      fetch(
        `${apiDomain}/api/findDistance/${id}` +
          "?token=" +
          this.$store.state.token
      )
        .then((res) => res.json())
        .then((res) => {
          this.resultasMAP = res.resultas;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>