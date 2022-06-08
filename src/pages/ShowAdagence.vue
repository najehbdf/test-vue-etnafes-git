<template>
  <div class="content">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb" style="background-color: #a6bfe6 !important">
        <li class="breadcrumb-item">
          <router-link to="/notifications/admin">Notifications</router-link>
        </li>
        <li
          class="breadcrumb-item active"
          style="color: #000"
          aria-current="page"
        >
          Détails Proprietaire Agence
        </li>
      </ol>
    </nav>
    <div class="row">
      <div class="col-md-6">
        <card style="border: solid 1px; padding: 15px">
          <template slot="header">
            <h5 class="title">Détails Proprietaire Agence</h5>
          </template>
          <div class="row">
            <div class="col-md-2 pr-md-1 text-left">
              <img loading="lazy"
                class="photo"
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

              <p>
                <label style="letter-spacing: 0.8px">Ville:</label>
                {{ ville.nom }}
              </p>

              <p>
                <label style="letter-spacing: 0.8px">Adresse Email:</label>
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
        <card style="border: solid 1px; padding: 15px">
          <template slot="header">
            <h5 class="title">Détails Réservations</h5>
          </template>
          <div class="row">
            <div class="col-md-8 pr-md-1 text-left">
              <p>
                <label style="letter-spacing: 0.8px">Membre depuis:</label>
                {{ client.human_created_at }}
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
      ville: {},
      client: {},
      agences: {},
      reservations: [],
      paiements: {},
    };
  },
  mounted() {
    if (localStorage.getItem("reloaded")) {
      // The page was just reloaded. Clear the value from local storage
      // so that it will reload the next time this page is visited.
      localStorage.removeItem("reloaded");
    } else {
      // Set a flag so that we know not to reload the page twice.
      localStorage.setItem("reloaded", "1");
      location.reload();
    }
  },
  computed: {
    ReservationAnnule() {
      var res = this.client.reservations;
      var result = [];
      if (res) {
        for (var i = 0; i < res.length; i++) {
          if (res[i].annule == 1) {
            result.push(res[i]);
          }
        }
      }
      return result;
    },

    ReservationPaye() {
      var res = this.client.reservations;
      var result = [];
      if (res) {
        for (var i = 0; i < res.length; i++) {
          if (res[i].paye == 1) {
            result.push(res[i]);
          }
        }
      }
      return result;
    },

    ReservationEncours() {
      var res = this.client.reservations;
      var result = [];
      if (res) {
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
    this.fetchAdagence(this.$route.params.id);
    this.fetchAgences();
    this.fetchPaiements();
  },
  methods: {
    fetchPaiements() {
      axios
        .get(`${apiDomain}/api/paiements`)
        .then(({ data }) => (this.paiements = data));
    },
    fetchAdagence(id) {
      fetch(`${apiDomain}/api/adagence/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.client = res.client;
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

