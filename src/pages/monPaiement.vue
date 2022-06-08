<template>
  <div>
    <TopNavbarHome />
    <div class="container" style="margin-bottom: 30px; margin-top: 20px">
      <b-card
        no-body
        style="padding: 10px; border: groove rgba(0, 0, 0, 0.25) 1px"
      >
        <div class="row">
          <div class="col-md-6">
            <b-carousel
              id="carousel-1"
              v-model="slide"
              :interval="4000"
              controls
              indicators
              background="#ababab"
              img-width="1024"
              img-height="480"
              style="text-shadow: 1px 1px 2px #333; margin-top: 30px"
              @sliding-start="onSlideStart"
              @sliding-end="onSlideEnd"
            >
              <!-- Text slides with image -->
              <div v-for="(zone, i) in pack.zone_pack" v-bind:key="i">
                <b-carousel-slide
                  v-for="(image, k) in zone.zone_touristique.image"
                  v-bind:key="k"
                  caption="First slide"
                  text="Nulla vitae elit libero, a pharetra augue mollis interdum."
                  :img-src="`https://etnafesapi20212018.etnafes.com/images/${image.url_image}`"
                  style="height: 60%"
                ></b-carousel-slide>
              </div>
            </b-carousel>
          </div>
          <div class="col-md-6">
            <p
              style="
                margin-left: 20px;
                margin-top: 30px;
                font-weight: bold;
                color: #000;
              "
            >
              {{ pack.titre }}
            </p>
            <b-card-text style="color: #000">
              Date de départ :
              {{ pack.date_deb }}
            </b-card-text>
            <hr style="margin-top: 0.1rem" />
            <b-card-text style="color: #000">
              Date de retour :
              {{ pack.date_fin }}
            </b-card-text>

            <hr style="margin-top: 0.1rem" />
            <b-card-text style="color: #000"
              >{{ nb_adulte }} Adulte(s)</b-card-text
            >
            <b-card-text style="color: #000"
              >{{ nb_enfant }} Enfant(s)</b-card-text
            >

            <hr />
            <h3 style="color: #000">
              Montant total :
              {{ (Number(nb_adulte) + Number(nb_enfant)) * pack.prix_fix }}dt
            </h3>
          </div>
        </div>
      </b-card>

      <div class="row" id="printMe">
        <div class="col-md-12">
          <b-card
            no-body
            style="padding: 20px; border: groove rgba(0, 0, 0, 0.25) 1px"
          >
            <p>Cher(e) {{ this.$store.state.prenom }}</p>
            <p>
              Vous avez choisi de payer l'acompte de ... en espéce à l'agence
              <span style="font-weight: bold">{{ agence.nom_agence }}</span>
              située à {{ agence.gouvernorat }}
              Nous vous invitons à vous rendre àl'agence afin de valider votre
              réservation au plus vite.
            </p>

            <div
              style="
                border: 1px solid;
                padding: 20px;
                margin-bottom: 20px;
                margin-top: 20px;
              "
            >
              <span style="font-weight: bold; line-height: 40px">{{
                agence.nom_agence
              }}</span>
              <br />
              {{ agence.adresse }} , {{ agence.gouvernorat }}
              <br />
              <br />
              Telephone : {{ agence.telephone }}
            </div>

            <div>
              <b-card-text style="color: #000">
                {{ pack.titre }} -- Date de départ : {{ pack.date_deb }} -- Date
                de retour : {{ pack.date_fin }} -- {{ nb_adulte }} Adulte(s) --
                {{ nb_enfant }} Enfant(s) -- Montant total :
                {{ (Number(nb_adulte) + Number(nb_enfant)) * pack.prix_fix }}dt
              </b-card-text>
            </div>
          </b-card>
        </div>
      </div>
      <b-button @click="addReservation">Réservez</b-button>&nbsp;
      <b-button v-print="'#printMe'">Imprimez</b-button>
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
    Footer,
  },
  data() {
    return {
      toggle: false,
      toggle1: false,
      toggle2: false,
      toggle3: false,
      nom: "",
      prenom: "",
      email: "",
      telephone: "",
      civilité: "",
      gouvernorat: "",
      nb_adulte: this.$route.query.nb_adulte,
      nb_enfant: this.$route.query.nb_enfant,

      client: {
        nom: "",
      },
      agence: {},
      pack: {
        id: "",
        nom: "",
        du: "",
        description: "",
        au: "",
        type: "",
        ville_id: "",
      },
    };
  },
  created() {
    this.fetchPacks(this.$route.params.id);
    this.fetchAgences(this.$store.state.id);
  },

  methods: {
    addReservation() {
      var currentDate = new Date();
      axios
        .post(`${apiDomain}/api/create/reservation`, {
          date: new Date().toJSON().slice(0, 10).replace(/-/g, "/"),
          nbr_place: this.$route.query.nb_adulte,
          prix_total:
            (this.$route.query.nb_adulte + this.$route.query.nb_enfant) *
            this.pack.prix_fix,

          prix_remise: this.pack.taux_remise,
          paye: 0,
          pack_id: this.$route.params.id,
          client_id: 34,
          hebergement_id: this.$store.state.hebergement_id,
          headers: {
            "content-type": "application/json",
          },
        })
        .then(function (response) {
          if (response.status == 200) {
            alert("Réservation bien Enregistré");
          }
        })
        .catch((error) => {
          if (error.response && error.response.status == 422) {
            this.validationErrors = error.response.data.errors;
          }
        });
    },
    fetchPacks(id) {
      axios
        .get(`${apiDomain}/api/packs/${id}`)
        .then(({ data }) => (this.pack = data.packdetail));
    },

    fetchAgences(id) {
      axios
        .get(`${apiDomain}/api/agences/${id}`)
        .then(({ data }) => (this.agence = data.agencedetail));
    },

    addClient() {
      axios
        .post(`${apiDomain}/api/storeClient`, {
          nom: this.nom,
          prenom: this.prenom,
          telephone: this.telephone,
          email: this.email,
          civilité: this.civilité,
          gouvernorat: this.gouvernorat,
          headers: {
            "content-type": "application/json",
          },
        })
        .then(function (response) {
          if (response.status == 200) {
            alert("Voyageur Ajoutée");
          }
        })
        .catch((error) => {
          if (error.response && error.response.status == 422) {
            this.validationErrors = error.response.data.errors;
          }
        });
    },
  },
};
</script>