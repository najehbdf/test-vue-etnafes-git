<template>
  <div class="content">
    <h4>
      <span style="color:#333">Réservation&nbsp;</span>
      <i class="fa fa-trash" style="color:#de524d" v-on:click="deleteReservation(reservation.id)"></i>
    </h4>

    <card style="border:solid 1px;padding:15px">
      <form v-on:submit.prevent="updateReservation(reservation.id,reservation)">
        <div class="row">
          <div class="col-md-4 pr-md-1">
            <h4 style="color:#0157aa">Voyageur : {{client.nom}} {{client.prenom}}</h4>
            <hr />
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 pr-md-1 text-left">
            <base-input
              label="Date de réservation"
              placeholder="Date de réservation"
              v-model="reservation.date"
              type="date"
            ></base-input>
          </div>
          <div class="col-md-4 px-md-1 text-left">
            <base-input
              label="Nombre des places"
              v-model="reservation.nbr_place"
              placeholder="nombre des places"
            ></base-input>
          </div>

          <div class="col-md-4 pl-md-1 text-left">
            <base-input
              label="Prix total"
              placeholder="prix total"
              name="prix_total"
              v-model="reservation.prix_total"
            ></base-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4 pr-md-1 text-left">
            <label>Prestataire de Services</label>
            <select class="form-control" v-model="reservation.agence_id" name="agence">
              <option
                v-for="agence in agences"
                v-bind:key="agence.id"
                v-bind:value="agence.id"
              >{{agence.nom_agence}}</option>
            </select>
          </div>
          <div class="col-md-4 px-md-1 text-left">
            <label>Pack</label>
            <select class="form-control" v-model="reservation.pack_id" name="pack">
              <option
                v-for="pack in packs"
                v-bind:key="pack.id"
                v-bind:value="pack.id"
              >{{pack.titre}}</option>
            </select>
          </div>

          <div class="col-md-4 pl-md-1 text-left"></div>
        </div>
        <button class="btn btn-success" type="submit" fill style="margin-left:10px">Modifier</button>
      </form>
    </card>
  </div>
</template>
<script>
import { Card, BaseInput } from "@/components/index";
import { apiDomain } from "../config";
export default {
  components: {
    Card,
    BaseInput
  },
  data() {
    return {
      formstate: {},
      zones: {},
      villes: {},
      pack: {},
      agences: {},
      client: {},
      packs: [],
      reservation: {}
    };
  },

  computed: {
    loggedIn() {
      return this.$store.getters.get_loggedIn;
    },

    user() {
      return this.$store.getters.get_user;
    }
  },
  created() {
    this.fetchVilles();
    this.fetchReservation(this.$route.params.id);
    this.fetchPacks(this.$store.state.user.id);
    this.fetchAgences(this.$store.state.user.id);
    this.fetchZones();
  },
  methods: {
    fetchAgences(id) {
      fetch(`${apiDomain}/api/agences/admin/${id}`)
        .then(res => res.json())
        .then(res => {
          this.agences = res.agences;
        })
        .catch(err => console.log(err));
    },
    fetchPacks(id) {
      fetch(`${apiDomain}/api/agence/packs/${id}`)
        .then(res => res.json())
        .then(res => {
          this.packs = res.packs;
        })
        .catch(err => console.log(err));
    },
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
          "content-type": "application/json"
        }
      })
        .then(res => res.json())

        .then(data => {
          if (confirm("Reservation bien modifié")) {
            window.location.reload();
          }
        })
        .catch(err => console.log(err));
    },

    fetchVilles() {
      fetch(`${apiDomain}/api/villes`)
        .then(res => res.json())
        .then(res => {
          this.villes = res;
        })
        .catch(err => console.log(err));
    },
    fetchLogements(id) {
      axios
        .get(`${apiDomain}/api/hebergements/ville/${id}`)
        .then(({ data }) => (this.hebergements = data.hebergements));
    },

    fetchReservation(id) {
      axios
        .get(`${apiDomain}/api/reservation/${id}?token=${this.$store.state.token}`)
        .then(
          ({ data }) => (
            (this.reservation = data.reservation),
            (this.client = data.reservation.client)
          )
        );
    },

    fetchZones() {
      fetch(`${apiDomain}/api/allzones`)
        .then(res => res.json())
        .then(res => {
          this.zones = res.zones;
        })
        .catch(err => console.log(err));
    },

    fetchPack(id) {
      fetch(`${apiDomain}/api/packs/${id}`)
        .then(res => res.json())
        .then(res => {
          this.pack = res.packdetail;
        })
        .catch(err => console.log(err));
    }
  }
};
</script>
