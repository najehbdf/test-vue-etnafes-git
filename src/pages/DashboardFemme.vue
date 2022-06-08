<template>
  <div class="content">
    <div class="row">
      <div class="col-md-6">
        <card style="border: solid 1px; padding: 15px">
          <div class="row">
            <div
              class="col-md-2 pr-md-1 text-left"
              v-if="user.provider != null"
            >
              <img loading="lazy"
                class="style_img_dash_cli"
                :src="user.photo"
                :alt="user.nom"
              />
            </div>

            <div
              class="col-md-2 pr-md-1 text-left"
              v-if="user.provider == null"
            >
              <img loading="lazy"
                class="style_img_dash_cli"
                :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_client/${client.photo}`"
                alt="Profile Photo"
              />
            </div>
            <div class="col-md-8 pr-md-1 text-left">
              <p>
                <label style="letter-spacing: 0.8px">Nom et prenom:</label>
                {{ client.nom }} {{ client.prenom }}
              </p>
              <p>
                <label style="letter-spacing: 0.8px">Civilité:</label>
                {{ client.civilité }}
              </p>

              <p v-if="client.ville != null">
                <label style="letter-spacing: 0.8px">Ville:</label>
                {{ ville.nom }}
              </p>
              <p v-else>
                <label style="letter-spacing: 0.8px">Ville:</label>
              </p>

              <p>
                <label style="letter-spacing: 0.8px">Email:</label>
                {{ client.email }}
              </p>
              <p>
                <label style="letter-spacing: 0.8px">Numéro Mobile:</label>
                {{ client.telephone }}
              </p>
              <p>
                <label style="color: green" v-if="client.active == 1"
                  >active</label
                >
              </p>
            </div>
          </div>
        </card>
      </div>

      <div class="col-md-6">
        <card class="style_card_dashCl">
          <div class="row">
            <div class="col-md-8 pr-md-1 text-left">
              <p>
                <label style="letter-spacing: 0.8px"
                  >Total des Réservations:</label
                >
                {{ reservations.length }} réservations
              </p>
              <p>
                <label style="letter-spacing: 0.8px">Membre depuis:</label>
                <!-- {{client.created_at.slice(0,10)}} -->
                {{ client.human_created_at }}
              </p>

              <p v-if="ReservationAnnule.length > 1">
                <label style="letter-spacing: 0.8px"
                  >Réservations annulées:</label
                >
                {{ ReservationAnnule.length }} réservations
              </p>

              <p v-else>
                <label style="letter-spacing: 0.8px"
                  >Réservations annulées:</label
                >
                {{ ReservationAnnule.length }} réservation
              </p>

              <p v-if="ReservationPaye.length > 1">
                <label style="letter-spacing: 0.8px"
                  >Réservations confirmées:</label
                >
                {{ ReservationPaye.length }} réservations
              </p>

              <p v-else>
                <label style="letter-spacing: 0.8px"
                  >Réservations confirmées:</label
                >
                {{ ReservationPaye.length }} réservation
              </p>

              <p v-if="ReservationEncours.length > 1">
                <label style="letter-spacing: 0.8px"
                  >Réservations en cours:</label
                >
                {{ ReservationEncours.length }} réservations
              </p>
              <p v-else>
                <label style="letter-spacing: 0.8px"
                  >Réservations en cours:</label
                >
                {{ ReservationEncours.length }} réservation
              </p>
              <p>
                <label style="color: green" v-if="client.active == 1"
                  >active</label
                >
              </p>
            </div>
          </div>
        </card>
      </div>
    </div>
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
      ville: {},
      reservations: {},

      agences: {},
      paiements: {},
    };
  },

  computed: {
    loggedIn() {
      return this.$store.getters.get_loggedIn;
    },

    user() {
      return this.$store.getters.get_user;
    },
    ReservationAnnule() {
      var res = this.reservations;
      var result = [];
      if (res.length != 0) {
        for (var i = 0; i < res.length; i++) {
          if (res[i].annule == 1) {
            result.push(res[i]);
          }
        }
      }
      return result;
    },

    ReservationPaye() {
      var res = this.reservations;
      var result = [];
      if (res.length != 0) {
        for (var i = 0; i < res.length; i++) {
          if (res[i].paye == 1) {
            result.push(res[i]);
          }
        }
      }
      return result;
    },

    ReservationEncours() {
      var res = this.reservations;
      var result = [];
      if (res.length != 0) {
        for (var i = 0; i < res.length; i++) {
          if (res[i].paye == 0 && res[i].annule == 0) {
            result.push(res[i]);
          }
        }
      }
      return result;
    },
  },

  created() {
    this.fetchClient(this.$store.state.user.id);

  },
  methods: {
     
    fetchClient(id) {
      fetch(`${apiDomain}/api/client/${id}?token=${this.$store.state.token}`)
        .then((res) => res.json())
        .then((res) => {
          this.client = res;
          this.ville = res.ville;
          this.reservations = res.reservations;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

