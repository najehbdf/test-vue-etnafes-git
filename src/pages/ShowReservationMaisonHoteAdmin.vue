<template>
  <div class="content">
    <h4>
      <span style="color: #333">Réservation du maison d'hote&nbsp;</span>
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
            {{ reservation.created_at }}
          </p>
          <p>
            <b>Date Arrivée :</b>
            {{ reservation.du }}
          </p>
          <p>
            <b>Date Départ :</b>
            {{ reservation.au }}
          </p>
        </div>
        <div class="col-md-4 px-md-1 text-left">
          <p>
            <b>Nombre des places :</b>
            {{ reservation.nbr_place }}
          </p>
          <!-- <p>
            <b>Adultes :</b>
            {{ reservation.nb_adulte }}
          </p> -->
          <p>
            <b>Type de paiement :</b>
            {{ reservation.type_paiement }}
          </p>
        </div>

        <div class="col-md-4 pl-md-1 text-left">
          <p>
            <b>Prix total :</b>
            {{ reservation.prix_total }}dt
          </p>
        </div>
      </div>
      <hr />

      <div class="row">
        <div class="col-md-4 pr-md-1 text-left">
          <p>
            <b>Hébérgement :</b>
            {{ reservation.hebergement.nom }}
          </p>

          <!-- <p>
            <img loading="lazy" src="/calendar-etnafes.png" />
            {{ reservation.du }}
            
          </p> -->
        </div>
      </div>
      <br />
      <div class="row" v-if="reservation.paye == 1 && reservation.annule == 0">
        <div class="col-md-2 pr-md-1 text-left">
          <button
            type="button"
            style="border-radius: 0px 0px 15px !important"
            class="btn btn-success"
            @click="validateReservationHeb(reservation.id, reservation)"
          >
            Valider
          </button>
        </div>

        <div class="col-md-2 pr-md-1 text-left" v-if="reservation.annule == 0">
          <button
            style="border-radius: 0px 0px 15px !important"
            type="button"
            class="btn btn-warning"
            @click="annuleReservation(reservation.id, reservation)"
          >
            Annuler
          </button>
        </div>
      </div>

      <div class="row" v-if="reservation.paye == 0">
        <div class="col-md-4 pr-md-1 text-left" style="color: red">
          Statut: payé
        </div>
      </div>

      <div class="row" v-if="reservation.annule == 1">
        <div class="col-md-4 pr-md-1 text-left" style="color: red">
          Statut: annulée
        </div>
      </div>
    </card>
  </div>
</template>
<script>
import UserCard from "./Profile/UserCard.vue";
import { apiDomain } from "../config";
import { Card, BaseInput } from "@/components/index";

import BaseButton from "@/components/BaseButton";
export default {
  components: {
    UserCard,
    Card,
    BaseInput,
    BaseButton,
  },
  data() {
    return {
      client: {},
      hebergement: {},

      packs: {},
      pack: {},

      reservation: {},
      agences: {},
      agence: {},

      paiements: {},
    };
  },

  created() {
    this.fetchReservation(this.$route.params.id);
    this.fetchAgences();
    this.fetchPaiements();
    this.fetchPacks();
  },
  methods: {
    annuleReservation(id, reservation) {
      fetch(`${apiDomain}/api/reservation-annule/${id}`, {
        method: "put",
        body: JSON.stringify(this.reservation),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())

        .then((data) => {
          if (confirm("Reservation annulée")) {
            window.location.reload();
          }
        })
        .catch((err) => console.log(err));
    },

    validateReservationHeb(id, reservation) {
      fetch(`${apiDomain}/api/validation_off_line_heb/${id}`, {
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

      /* axios.post(`${apiDomain}/api/pack/place/${this.$route.params.idp}`, {
        nb_place_dispo:
          this.reservation.pack.nb_place_dispo -
          (Number(this.reservation.nb_adulte)),
      }); */
    },
    fetchPacks() {
      fetch(`${apiDomain}/api/allpacks?token=${this.$store.state.token}`)
        .then((res) => res.json())
        .then((res) => {
          this.packs = res.packs;
        })
        .catch((err) => console.log(err));
    },

    fetchPaiements() {
      axios
        .get(`${apiDomain}/api/paiements`)
        .then(({ data }) => (this.paiements = data));
    },
    fetchReservation(id) {
      fetch(`${apiDomain}/api/showReservation_hebergementAdmin/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.reservation = res.reservation;
          this.client = res.reservation.client;
        })
        .catch((err) => console.log(err));
    },

    fetchAgences() {
      axios
        .get(`${apiDomain}/api/agences`)
        .then(({ data }) => (this.agences = data));
    },
  },
};
</script>

