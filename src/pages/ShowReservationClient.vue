<template>
  <div class="content">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb" style="background-color: #a6bfe6 !important">
        <li class="breadcrumb-item">
          <router-link to="/reservations-client">Espace Voyageur</router-link>
        </li>
        <li
          class="breadcrumb-item active"
          style="color: #000"
          aria-current="page"
        >
          Détails Réservation
        </li>
      </ol>
    </nav>
    <!-- <div v-if="reservation.client_id==user.id"> -->

  <div v-if="loaded==false">
    <center>
    <div class="spinner-grow text-dark" role="status" style="width: 15px; 
    height: 15px;">
  <span class="sr-only">Loading...</span>
  
</div>&nbsp;
<div class="spinner-grow text-dark" role="status" style="width: 15px; 
    height: 15px;">
  <span class="sr-only">Loading...</span>
  
</div>&nbsp;
<div class="spinner-grow text-dark" role="status" style="width: 15px; 
    height: 15px;">
  <span class="sr-only">Loading...</span>
  
</div>&nbsp;
<div class="spinner-grow text-dark" role="status" style="width: 15px; 
    height: 15px;">
  <span class="sr-only">Loading...</span>
  
</div>
</center>
  </div>
    <div v-if="loaded==true">
      <div id="printMe">
        <h4>
          <span style="color: #333">Réservation: {{ reservation.code }}</span>
        </h4>

        <card style="border: solid 1px; padding: 15px">
          <div class="row">
            <div class="col-md-4 pr-md-1">
              <h4 style="color: #0157aa">
                Voyageur : {{ client.nom }} {{ client.prenom }}
              </h4>

              <br />
            </div>
          </div>
          <div class="row">
            <div class="col-md-4 pr-md-1 text-left">
              <p>
                <b>Date de réservation :</b>
                {{ reservation.date }}
              </p>
              <p>
                <b>Titre :</b>
                {{ pack.titre }}
              </p>
              <p>
                <b>Ville de départ :</b>
                {{ pack.adresse }}
              </p>
            </div>
            <div class="col-md-4 px-md-1 text-left">
              <p>
                <b>>> {{ reservation.nb_adulte }} Adulte</b>
              </p>

              <p>
                <b>>> {{ pack.time }} </b>
              </p>

              <p style="color: #ff0000">
                <b>>> Nombre total des places :</b>
                {{ reservation.nbr_place }}
              </p>
            </div>

            <div class="col-md-4 pl-md-1 text-left">
              <p>
                <b>>> Prix pack :</b>
                {{ reservation.prix_pack }}dt
              </p>

              <p>
                <b>>> Prix logement :</b>
                {{ reservation.prix_logement }}dt
              </p>

              <p style="color: #ff0000">
                <b>>> Prix total :</b>
                {{ reservation.prix_total }}dt
              </p>
            </div>
          </div>
          <!--  <hr />
          <br />
          <div class="row">
            <div
              class="col-md-5 pr-md-1 text-left"
              v-if="reservation.agence_id != null"
            >
              <p>
                <b>Prestataire de Services :</b>
                {{ agence.nom_agence }}
                <br />
                <br />
                <img loading="lazy" src="/address-etnafes.png" />
                {{ agence.adresse }}
                <br />
                <br />
                <img loading="lazy" src="/phone-etnafes.png" />
                {{ agence.telephone }}
              </p>
            </div>
            <div class="col-md-5 pr-md-1 text-left">
              <p>
                <b>Pack :</b>
                {{ pack.titre }}
              </p>

              <p>
                <img loading="lazy" src="/calendar-etnafes.png" />
                {{ pack.date_deb }}
                <img loading="lazy" src="/calendar-etnafes.png" />
                {{ pack.date_fin }}
              </p>
            </div>
          </div> -->
          <br />
          <hr v-if="reservation.agence_id != null" />
          <div class="row" v-if="reservation.paye == 0">
            <div class="col-md-5 pr-md-1 text-left" style="color: green">
              Statut: payé
            </div>
          </div>

          <div class="row" v-if="reservation.paye == 1">
            <div class="col-md-5 pr-md-1 text-left" style="color: orange">
              Statut: En attente
            </div>
            <!-- <div class="col-md-7 pr-md-1 text-left" style="color: red">
              Statut: en attente de paiement
              <span style="color: #333"
                >Veuillez vous présenter à l'agence {{ agence.nom_agence }} pour
                payer</span
              >
            </div> -->
          </div>

          <div class="row" v-if="reservation.annule == 1">
            <div class="col-md-5 pr-md-1 text-left" style="color: red">
              Statut: annulée
            </div>
          </div>
        </card>
      </div>
      <br />
      <!--   <a
        v-if="reservation.agence_id != null"
        :href="
          'https://etnafesapi20212018.etnafes.com/api/dynamic_pdf/pdf/' +
          reservation.id +
          '?token=' +
          this.$store.state.token
        "
        target="_blank"
        style="background-color: transparent !important"
      >
        <button class="btn btn-danger" style="margin-bottom: 20px">
          Imprimez
        </button>
      </a> -->

      <a
        v-if="reservation.paye == 0"
        :href="
          'https://etnafesapi20212018.etnafes.com/api/dynamic_pdf/pdf/enligne/' +
          reservation.id
        "
        target="_blank"
        style="background-color: transparent !important"
      >
        <button class="btn btn-danger" style="margin-bottom: 20px">
          Imprimez
        </button>
      </a>
      <!-- <b-button @click="generateReport">Imprimez</b-button> -->
      <div>
        <vue-html2pdf
          :show-layout="false"
          :float-layout="true"
          :enable-download="true"
          :preview-modal="true"
          :paginate-elements-by-height="1400"
          filename="Détails-reservation"
          :pdf-quality="2"
          :manual-pagination="false"
          pdf-format="a4"
          pdf-content-width="300px"
          pdf-orientation="portrait"
          ref="html2Pdf"
        >
          <section slot="pdf-content" style="margin: 8%">
            <div>
              <h4>
                <span style="color: #333"
                  >Réservation: {{ reservation.code }}</span
                >
              </h4>

              <card style="border: solid 1px; padding: 15px">
                <div class="row">
                  <h4 style="color: #0157aa">
                    Voyageur : {{ client.nom }} {{ client.prenom }}
                  </h4>
                  <br />
                </div>
                <div class="row">
                  <p>
                    <b>Date de réservation :</b>
                    {{ reservation.date }}
                  </p>
                  <br />
                  <p>
                    <b>>> {{ reservation.nb_adulte }} Adulte</b>
                  </p>

                  <p v-if="reservation.nb_enfant4 != 0">
                    >> {{ reservation.nb_enfant }}
                    <b>Enfants moins de 4 ans</b>
                  </p>

                  <p v-if="reservation.nb_enfant15 != 0">
                    >> {{ reservation.nb_enfant15 }}
                    <b>Enfants plus de 4 ans</b>
                  </p>

                  <p style="color: #ff0000">
                    <b>>> Nombre total des places :</b>
                    {{ reservation.nbr_place }}
                  </p>
                  <br />
                  <p>
                    <b>>> Prix pack :</b>
                    {{ reservation.prix_pack }}dt
                  </p>

                  <p>
                    <b>>> Prix logement :</b>
                    {{ reservation.prix_logement }}dt
                  </p>

                  <p style="color: #ff0000">
                    <b>>> Prix total :</b>
                    {{ reservation.prix_total }}dt
                  </p>
                </div>
                <hr />
                <br />
              </card>
            </div>
          </section>
        </vue-html2pdf>
      </div>
    </div>

    <!--  <div class="container" v-else>
      <card>
        <p>Vous n'avez pas le droit de consulter cette réservation</p>
      </card>
    </div>-->
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
      loaded :false,
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
    this.fetchVilles();
    this.fetchReservation(this.$route.params.id);
    // this.fetchPacks(this.$store.state.user.id);
    this.fetchAgences(this.$store.state.user.id);
    this.fetchZones();
  },
  methods: {
    generateReport() {
      this.$refs.html2Pdf.generatePdf();
    },
    fetchAgences(id) {
      fetch(`${apiDomain}/api/agences/admin/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.agences = res.agences;
        })
        .catch((err) => console.log(err));
    },
    /* fetchPacks(id) {
      fetch(`${apiDomain}/api/agence/packs/${id}`)
        .then(res => res.json())
        .then(res => {
          this.packs = res.packs;
        })
        .catch(err => console.log(err));
    }, */
    updateReservation(id, reservation) {
      this.reservation.id = reservation.id;
      this.reservation.date = reservation.date;
      this.reservation.nbr_place = reservation.nbr_place;
      this.reservation.prix_total = reservation.prix_total;
      this.reservation.prix_remise = reservation.prix_remise;
      this.reservation.pack_id = reservation.pack_id;
      this.reservation.client_id = reservation.client_id;
      this.reservation.hebergement_id = reservation.hebergement_id;
      this.reservation.agence_id = reservation.agence_id;

      fetch(
        `${apiDomain}/api/reservation/${id}?token=${this.$store.state.token}`,
        {
          method: "put",
          body: JSON.stringify(this.reservation),
          headers: {
            "content-type": "application/json",
          },
        }
      )
        .then((res) => res.json())

        .then((data) => {
          if (confirm("Reservation bien modifié")) {
            window.location.reload();
          }
        })
        .catch((err) => console.log(err));
    },

    fetchVilles() {
      fetch(`${apiDomain}/api/villes`)
        .then((res) => res.json())
        .then((res) => {
          this.villes = res;
        })
        .catch((err) => console.log(err));
    },
    fetchLogements(id) {
      axios
        .get(`${apiDomain}/api/hebergements/ville/${id}`)
        .then(({ data }) => (this.hebergements = data.hebergements));
    },

    fetchReservation(id) {
      axios
        .get(
          `${apiDomain}/api/reservation/${id}?token=${this.$store.state.token}`
        )
        .then(
          ({ data }) => (
            this.loaded = true,
            (this.reservation = data.reservation),
            (this.client = data.reservation.client),
            (this.pack = data.reservation.pack),
            (this.agence = data.reservation.agence)
          )
        );
    },

    fetchZones() {
      fetch(`${apiDomain}/api/allzones`)
        .then((res) => res.json())
        .then((res) => {
          this.zones = res.zones;
        })
        .catch((err) => console.log(err));
    },

    fetchPack(id) {
      fetch(`${apiDomain}/api/packs/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.pack = res.packdetail;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

