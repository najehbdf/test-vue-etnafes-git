<template>
  <div class="content">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb" style="background-color:#a6bfe6 !important">
        <li class="breadcrumb-item">
          <router-link :to="{name:'reservations_actif'}">Espace Hébergeur</router-link>
        </li>
        <li
          class="breadcrumb-item active"
          style="color:#000"
          aria-current="page"
        >Détails Réservation</li>
      </ol>
    </nav>

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
    <div v-if="loaded==true" >
      <h4>
        <span style="color:#333">Réservation: {{reservation.code}}&nbsp;</span>
      </h4>

      <card style="border:solid 1px;padding:15px">
        <div class="row">
          <div class="col-md-4 pr-md-1">
            <h4 style="color:#0157aa">Voyageur : {{client.nom}} {{client.prenom}}</h4>
            <br />
          </div>

          <div class="col-md-4 offset-md-4">
            <h4 style="color:#0157aa">Hébergement : {{reservation.hebergement.nom}}</h4>
            <br />
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 pr-md-1 text-left">
            <p>
              <b>Date de réservation :</b>
              <br />
              du {{reservation.du}} au {{reservation.au}}
            </p>
          </div>
          <div class="col-md-4 px-md-1 text-left">
            <p>
              <b>Nombre des places :</b>
              {{reservation.nbr_place}}
            </p>
            <p>
              <b>Adultes :</b>
              {{reservation.nb_adulte}}
            </p>

            <p>
              <b>Enfants :</b>
              {{Number(reservation.nb_enfant4)+Number(reservation.nb_enfant15)}}
            </p>
          </div>

          <div class="col-md-4 pl-md-1 text-left">
            <p>
              <b>Prix total :</b>
              {{reservation.prix_total}}dt
            </p>
          </div>
        </div>
        <hr />
        <br />
      </card>
    </div>
    <!-- <div v-else>
      <card>
        <div class="row">
          <div class="col-md-12">
            <p>Vous n'avez pas le droit de consulter cette réservation</p>
          </div>
        </div>
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
      hebergement: {},

      agence: {},
      pack: {},
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
    },
    prop() {
      return this.$store.getters.get_prop;
    }
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
        .get(
          `${apiDomain}/api/reservation-libre/${id}?token=${this.$store.state.token}`
        )
        .then(
          ({ data }) => (
            (this.reservation = data.reservation),
            (this.hebergement = data.reservation.hebergement),
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

