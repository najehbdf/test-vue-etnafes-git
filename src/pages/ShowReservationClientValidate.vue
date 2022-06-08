<template>
  <div class="content">
    <h4>
      <span style="color: #333">Réservation&nbsp;</span>
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
        </div>
        <div class="col-md-4 px-md-1 text-left">
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
      <hr />
      <br />
      <div class="row">
        <!-- <div class="col-md-5 pr-md-1 text-left">
          <p>
            <b>Prestataire de Services :</b>
            {{agence.nom_agence}}
            <br />
            <br />
            <img loading="lazy" src="/address-etnafes.png" />
            {{agence.adresse}}
            <br />
            <br />
            <img loading="lazy" src="/phone-etnafes.png" />
            {{agence.telephone}}
          </p>
        </div> -->

        <div class="col-md-5 pr-md-1 text-left">
          <p>
            <b>Pack :</b>
            {{ pack.titre }}
          </p>

          <p>
            <img loading="lazy" src="/calendar-etnafes.png" />
            {{ pack.date_deb }}
            <!--   <img loading="lazy" src="/calendar-etnafes.png" />
            {{ pack.date_fin }} -->
          </p>
        </div>
      </div>
      <hr />

      <div class="row" v-if="reservation.paye == 0">
        <div class="col-md-4 pr-md-1 text-left" style="color: green">
          Statut: payé
        </div>
      </div>

      <div class="row" v-if="reservation.paye == 1">
        <div class="col-md-4 pr-md-1 text-left" style="color: red">
          Statut: en attente de paiement
        </div>
      </div>
    </card>
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
    this.fetchZones();
  },
  methods: {
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

      fetch(`${apiDomain}/api/reservation/${id}`, {
        method: "put",
        body: JSON.stringify(this.reservation),
        headers: {
          "content-type": "application/json",
        },
      })
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
        .get(`${apiDomain}/api/notifClientRead/${id}`)
        .then(
          ({ data }) => (
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

