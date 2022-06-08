<template>
  <div class="content">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb" style="background-color: #a6bfe6 !important">
        <li class="breadcrumb-item">
          <router-link :to="{ name: 'resrvations_agence_active' }"
            >Prestataire de Services</router-link
          >
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
    <div v-if="loaded == false">
      <center>
        <div
          class="spinner-grow text-dark"
          role="status"
          style="width: 15px; height: 15px"
        >
          <span class="sr-only">Loading...</span>
        </div>
        &nbsp;
        <div
          class="spinner-grow text-dark"
          role="status"
          style="width: 15px; height: 15px"
        >
          <span class="sr-only">Loading...</span>
        </div>
        &nbsp;
        <div
          class="spinner-grow text-dark"
          role="status"
          style="width: 15px; height: 15px"
        >
          <span class="sr-only">Loading...</span>
        </div>
        &nbsp;
        <div
          class="spinner-grow text-dark"
          role="status"
          style="width: 15px; height: 15px"
        >
          <span class="sr-only">Loading...</span>
        </div>
      </center>
    </div>
    <!-- <div v-if="agence.adagence_id==propagence[0].id"> -->
    <div v-if="loaded == true">
      <h4>
        <span style="color: #333">Réservation&nbsp;</span>
      </h4>

      <card style="border: solid 1px; padding: 15px">
        <div class="row">
          <div class="col-md-4 pr-md-1">
            <h4 style="color: #0157aa">
              Voyageur : {{ client.nom }} {{ client.prenom }}
            </h4>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 pr-md-1 text-left">
            <p>
              <b>Date de réservation :</b>
              {{ reservation.date }}
            </p>
          </div>
          <div class="col-md-4 px-md-1 text-left">
            <p>
              <b>Nombre des places :</b>
              {{ reservation.nbr_place }}
            </p>
            <p>
              <b>Adultes :</b>
              {{ reservation.nb_adulte }}
            </p>

            <p>
              <b>Enfants :</b>
              {{ reservation.nb_enfant }}
            </p>
          </div>

          <div class="col-md-4 pl-md-1 text-left">
            <p>
              <b>Prix total :</b>
              {{ reservation.prix_total }}dt
            </p>

            <p>
              <b>Prix pack :</b>
              {{ reservation.prix_pack }}dt
            </p>

            <p>
              <b>Prix logement :</b>
              {{ reservation.prix_logement }}dt
            </p>
          </div>
        </div>
        <hr />
        <br />
        <div class="row" v-show="hebpack.length != 0">
          <div class="col-md-12">
            <p>
              <b>Hébergement(s) :</b>
            </p>
            <div v-for="h in hebpack" :key="h.id">
              <p>
                {{ h.hebergement.nom }}
                <img loading="lazy" src="/address-etnafes.png" />
                <span style="color: #707e94; line-height: 30px">{{
                  h.hebergement.adresse
                }}</span>
              </p>
            </div>
          </div>

          <br />
        </div>
        <hr v-show="hebpack.length != 0" />
        <div class="row">
          <div class="col-md-6 pr-md-1 text-left">
            <p>
              <b>Prestataire de Services :</b>
              {{ agence.nom_agence }}
              <br />
              <br />
              <img loading="lazy" src="/address-etnafes.png" />
              {{ agence.adresse }}
            </p>
          </div>
          <div class="col-md-6 pr-md-1 text-left">
            <p>
              <b>Pack :</b>
              {{ pack.titre }}
            </p>

            <p>
              <img loading="lazy" src="/calendar-etnafes.png" />
              {{ pack.date_deb }}
            </p>
          </div>
        </div>
        <hr />

        <br />
        <div class="row" v-if="reservation.paye == 1">
          <div class="col-md-4 pr-md-1 text-left">
            <button
              type="button"
              class="btn btn-warning"
              @click="validateReservation(reservation.id, reservation)"
            >
              Valider
            </button>
          </div>
        </div>

        <div class="row" v-if="reservation.paye == 0">
          <div class="col-md-4 pr-md-1 text-left" style="color: red">
            Statut: payé
          </div>
        </div>
      </card>
    </div>
    <!-- <div class="container" v-else>
      <card>
        <p>Vous n'avez pas le droit de consulter cette réservation</p>
      </card>
    </div>-->
  </div>
</template>
<script>
import { Card, BaseInput } from "@/components/index";
import { apiDomain } from "../config";
export default {
  components: {
    Card,
    BaseInput,
  },
  data() {
    return {
      loaded: false,

      formstate: {},
      zones: {},
      villes: {},
      pack: {},
      hebpack: {},
      agences: {},
      hebergement: [],

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
    propagence() {
      return this.$store.getters.get_propagence;
    },

    user() {
      return this.$store.getters.get_user;
    },
  },
  created() {
    this.fetchVilles();
    this.fetchReservation(this.$route.params.id);
    this.fetchPacks(this.$store.state.user.id);
    this.fetchAgences(this.$store.state.user.id);
    this.fetchZones();
  },
  methods: {
    validateReservation(id, reservation) {
      fetch(`${apiDomain}/api/reservation-validate/${id}`, {
        method: "put",
        body: JSON.stringify(this.reservation),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())

        .then((data) => {
          if (confirm("Reservation validée")) {
            window.location.reload();
          }
        })
        .catch((err) => console.log(err));

      axios.post(`${apiDomain}/api/pack/place/${this.$route.params.idp}`, {
        nb_place_dispo:
          this.reservation.pack.nb_place_dispo -
          (Number(this.reservation.nb_adulte) +
            Number(this.reservation.nb_enfant)),
      });
    },
    fetchAgences(id) {
      fetch(`${apiDomain}/api/agences/admin/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.agences = res.agences;
        })
        .catch((err) => console.log(err));
    },
    fetchPacks(id) {
      fetch(`${apiDomain}/api/agence/packs/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.packs = res.packs;
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
            (this.loaded = true),
            (this.reservation = data.reservation),
            (this.client = data.reservation.client),
            (this.pack = data.reservation.pack),
            (this.hebpack = data.reservation.pack.hebergement_pack),
            (this.agence = data.reservation.agence),
            (this.hebergement = data.hebergementtest)
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

