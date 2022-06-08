<template>
  <div class="content">
    <div class="row">
      <div class="col-md-12">
        <card>
          <template slot="header">
            <h5 class="title">Ajouter une réservation</h5>
          </template>
          <form @submit.prevent="createReservation">
            <div class="row">
              <div class="col-md-3 text-left">
                <base-input type="date" label="Date" placeholder="Date" v-model="reservation.date"></base-input>
                <p v-if="validationErrors.date" style="padding-bottom:5px;color:red">
                  <span class="alert-link">** {{ validationErrors.date[0] }}</span>
                </p>
              </div>
              <div class="col-md-4 text-left">
                <label>Pack</label>
                <!-- <base-input label="Ville" v-model="pack.address" placeholder="Home Address"></base-input> -->
                <select
                  class="form-control"
                  v-model="reservation.pack_id"
                  name="pack_id"
                  @change="fetchHebPacks(reservation.pack_id)"
                >
                  <option
                    v-for="pack in packs"
                    v-bind:key="pack.id"
                    v-bind:value="pack.id"
                  >{{pack.titre}}</option>
                </select>

                <p v-if="validationErrors.pack_id" style="padding-bottom:5px;color:red">
                  <span class="alert-link">** {{ validationErrors.pack_id[0] }}</span>
                </p>
              </div>

              <div
                class="col-md-5 text-left"
                v-if="pack.length!=0 &&(pack.hebergement_pack).length!=0"
              >
                <label>Hébergement</label>
                <select
                  class="form-control"
                  v-model="reservation.hebergement_id"
                  @change="fetchHebergement(reservation.hebergement_id)"
                >
                  <option
                    v-for="heberg in pack.hebergement_pack"
                    v-bind:key="heberg.hebergement.id"
                    v-bind:value="heberg.hebergement.id"
                  >
                    <span>{{heberg.hebergement.nom}} ({{heberg.hebergement.nbr_place_dispo}} places disponibles)</span>
                  </option>
                </select>
              </div>

              <div class="col-md-5 text-left" v-else>
                <label>Hébergement</label>
                <select
                  disabled
                  class="form-control"
                  v-model="reservation.hebergement_id"
                  @change="fetchHebergement(reservation.hebergement_id)"
                >
                  <option
                    v-for="heberg in pack.hebergement_pack"
                    v-bind:key="heberg.hebergement.id"
                    v-bind:value="heberg.hebergement.id"
                  >
                    <span>{{heberg.hebergement.nom}} ({{heberg.hebergement.nbr_place_dispo}} places disponibles)</span>
                  </option>
                </select>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6 text-left">
                <label>Voyageur</label>
                <select class="form-control" v-model="reservation.client_id" name="pack_id">
                  <option
                    v-for="client in clients"
                    v-bind:key="client.id"
                    v-bind:value="client.id"
                  >{{client.nom}} {{client.prenom}}</option>
                </select>
                <p v-if="validationErrors.client_id" style="padding-bottom:5px;color:red">
                  <span class="alert-link">** {{ validationErrors.client_id[0] }}</span>
                </p>
              </div>
            </div>

            <div class="row">
              <div class="col-md-4 pr-md-1 text-left">
                <base-input
                  label="Nombre des places"
                  v-model="reservation.nbr_place"
                  placeholder="nombre max des places"
                ></base-input>
                <p v-if="validationErrors.nbr_place" style="padding-bottom:5px;color:red">
                  <span class="alert-link">** {{ validationErrors.nbr_place[0] }}</span>
                </p>
              </div>
              <div class="col-md-4 px-md-1 text-left">
                <base-input
                  label="Prix total"
                  v-model="reservation.prix_total"
                  placeholder="nombre des places"
                ></base-input>
                <p v-if="validationErrors.prix_total" style="padding-bottom:5px;color:red">
                  <span class="alert-link">** {{ validationErrors.prix_total[0] }}</span>
                </p>
              </div>
              <div class="col-md-4 pl-md-1 text-left">
                <base-input
                  label="Prix aprés remise"
                  placeholder="prix aprés remise"
                  name="prix_remise"
                  v-model="reservation.prix_remise"
                ></base-input>
              </div>
            </div>

            <div class="row">
              <button
                class="btn btn-success"
                type="submit"
                fill
                style="margin-left:10px"
              >Enregistrer</button>
            </div>
          </form>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
import { Card, BaseInput } from "@/components/index";
import BaseButton from "@/components/BaseButton";
import { apiDomain } from "../config";
export default {
  components: {
    Card,
    BaseInput,
    BaseButton
  },
  data() {
    return {
      validationErrors: "",
      filtre_zones: [],
      ville: {},
      villes: {},
      packs: {},
      clients: {},
      hebergements: {},

      pack: [],
      reservation: {},
      zones: {}
    };
  },
  created() {
    this.fetchClients();
    this.fetchPacks();
  },
  methods: {
    fetchHebergement(id) {
      fetch(`${apiDomain}/api/hebergement/${id}`)
        .then(res => res.json())
        .then(res => {
          this.hebergement = res.hebergement;
        })
        .catch(err => console.log(err));
    },
    fetchHebPacks(id) {
      axios
        .get(`${apiDomain}/api/packs/${id}`)
        .then(({ data }) => (this.pack = data.packdetail));
    },
    fetchPacks() {
      fetch(`${apiDomain}/api/allpacks?token=${this.$store.state.token}`)
        .then(res => res.json())
        .then(res => {
          this.packs = res.packs.data;
        })
        .catch(err => console.log(err));
    },

    fetchClients() {
      fetch(`${apiDomain}/api/allclients?token=${this.$store.state.token}`)
        .then(res => res.json())
        .then(res => {
          this.clients = res.clients;
        })
        .catch(err => console.log(err));
    },

    createReservation() {
      axios
        .post(`${apiDomain}/api/create/reservation`, {
          date: this.reservation.date,
          nbr_place: this.reservation.nbr_place,
          prix_remise: this.reservation.prix_remise,
          prix_total: this.reservation.prix_total,

          pack_id: this.reservation.pack_id,
          client_id: this.reservation.client_id,

          headers: {
            "content-type": "application/json"
          }
        })
        .then(function(response) {
          if (response.status == 200) {
            if (confirm("Réservation Ajoutée")) {
              window.location.reload();
            }
          }
        })
        .catch(error => {
          if (error.response && error.response.status == 400) {
            this.validationErrors = error.response.data;
          }
        });
    }
  }
};
</script>

