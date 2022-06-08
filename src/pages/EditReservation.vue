<template>
  <div class="content">
    <h4>
      <span style="color:#333">Réservation: {{reservation.code}} réservé le {{reservation.date}}</span>
    </h4>
    <div class="row">
      <div class="col-md-12">
        <card style="border: 1px solid; padding: 15px;">
          <template slot="header">
            <h4 style="color:#0157aa">Voyageur : {{client.nom}} {{client.prenom}}</h4>
          </template>

          <div class="row">
            <div class="col-md-3">
              <label style="color:#000;font-size:13px;font-weight:bold">Adultes</label>
              <div class="form-group">
                <input
                  aria-label="label"
                  style="width:100%"
                  class="personalise"
                  v-on:input="updateNbAdulte"
                  type="number"
                  min="1"
                  name="nb_adulte"
                  required
                  v-model="reservation.nb_adulte"
                />
              </div>
            </div>
            <div class="col-md-3">
              <label style="color:#000;font-size:13px;font-weight:bold">Enfants:</label>
              <div class="form-group">
                <input
                  aria-label="label"
                  disabled
                  class="personalise"
                  style="width:100%"
                  v-on:input="updateNbEnfant"
                  type="number"
                  :min="Number(reservation.nb_enfant4)+Number(reservation.nb_enfant15)"
                  :max="Number(reservation.nb_enfant4)+Number(reservation.nb_enfant15)"
                  name="nb_enfant"
                  required
                  :value="Number(reservation.nb_enfant4)+Number(reservation.nb_enfant15)"
                />
              </div>
            </div>

            <div class="col-md-3">
              <label style="color:#000;font-size:13px;font-weight:bold">Enfants moins de 4 ans:</label>
              <input
                aria-label="label"
                class="personalise"
                type="number"
                style="width:100%"
                min="0"
                name="nb_enfant"
                required
                v-model="reservation.nb_enfant4"
              />
            </div>

            <div class="col-md-3">
              <label style="color:#000;font-size:13px;font-weight:bold">Enfants plus de 4 ans:</label>
              <input
                aria-label="label"
                class="personalise"
                style="width:100%"
                type="number"
                min="0"
                name="nb_enfant"
                required
                v-model="reservation.nb_enfant15"
              />
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 text-left">
              <base-input
                label="Nombre des places"
                :value="Number(reservation.nb_adulte)+Number(reservation.nb_enfant4)+Number(reservation.nb_enfant15)"
                placeholder="nombre des places"
              ></base-input>
            </div>

            <div class="col-md-6 text-left" v-if="hebergement.length>0">
              <base-input
                label="Prix total"
                placeholder="prix total"
                name="prix_total"
                :value="Number(reservation.nb_adulte*(pack.prix_fix))+(calcul[0])+((Number((reservation.nb_adulte)*(hebergement.prix_adulte))+(calculPrix[0]))*((calculInterval.length)-1))"
              ></base-input>
            </div>

            <div class="col-md-6 text-left" v-else>
              <base-input
                label="Prix total"
                placeholder="prix total"
                name="prix_total"
                :value="Number(reservation.nb_adulte*(pack.prix_fix))+(calcul[0])"
              ></base-input>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 text-left">
              <base-input
                label="Prix pack"
                placeholder="prix pack"
                name="prix_pack"
                :value="Number(reservation.nb_adulte*(pack.prix_fix))+(calcul[0])"
              ></base-input>
            </div>

            <div class="col-md-6 text-left" v-if="agestab!=undefined && hebergement.length>0">
              <base-input
                label="Prix logement"
                placeholder="prix logement"
                name="prix_logement"
                :value="((Number((reservation.nb_adulte)*(hebergement.prix_adulte))+(calculPrix[0]))*((calculInterval.length)-1))"
              ></base-input>
            </div>

            <div class="col-md-6 text-left" v-else>
              <base-input
                label="Prix logement"
                placeholder="prix logement"
                name="prix_pack"
                :value="0"
              ></base-input>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 text-left">
              <base-input label="Date" type="date" v-model="reservation.date"></base-input>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12 text-left">
              <select class="form-control" name="pack_id" v-model="reservation.pack_id" required>
                <option
                  v-for="pack in packs"
                  v-bind:key="pack.id"
                  v-bind:value="pack.id"
                >{{pack.titre}}</option>
              </select>
            </div>
          </div>
          <br />
          <div class="row">
            <div class="col-md-12 text-left">
              <select class="form-control" name="paiement_id" v-model="client.paiement_id" required>
                <option value="null">Je vais pas payer en ligne</option>
                <option
                  v-for="paiement in paiements"
                  v-bind:key="paiement.id"
                  v-bind:value="paiement.id"
                >{{paiement.type}}</option>
              </select>
            </div>
          </div>

          <br />

          <div class="row">
            <div class="col-md-12 text-left">
              <select
                class="form-control"
                name="agence_id"
                id="agence_id"
                v-model="reservation.agence_id"
                required
              >
                <option value="NULL">Je vais pas payer à l'agence</option>
                <option
                  v-for="agence in agences"
                  v-bind:key="agence.id"
                  v-bind:value="agence.id"
                >{{agence.nom_agence}}</option>
              </select>
            </div>
          </div>

          <template slot="footer">
            <base-button
              type="success"
              @click.prevent="updateReservation(reservation.id,reservation)"
              fill
            >Modifier</base-button>
          </template>
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
    BaseButton
  },
  data() {
    return {
      client: {},
      packs: {},
      pack: {},
      agestab: [],
      reservation: {},
      hebergement: {},

      agences: {},
      paiements: {}
    };
  },

  computed: {
    calcul() {
      const pack = this.pack;
      const nb4 = Number(this.reservation.nb_enfant4);
      const nb15 = Number(this.reservation.nb_enfant15);
      var result = [];
      var somme = null;
      var sommeprixenfant4 = 0;
      var sommeprixenfant15 = 0;
      for (var i = 0; i < nb4; i++) {
        sommeprixenfant4 += pack.prix_enfant4;
      }
      for (var j = 0; j < nb15; j++) {
        sommeprixenfant15 += pack.prix_enfant15;
      }
      somme += sommeprixenfant4 + sommeprixenfant15;
      result.push(somme);
      return result;
    }
  },

  created() {
    this.fetchReservation(this.$route.params.id);
    this.fetchAgences();
    this.fetchPaiements();
    this.fetchPacks();
  },
  methods: {
    fetchHebPacks(id) {
      axios
        .get(`${apiDomain}/api/packs/${id}`)
        .then(({ data }) => (this.pack = data.packdetail));
    },
    fetchHebergement(id) {
      fetch(`${apiDomain}/api/hebergement/${this.hebid}`)
        .then(res => res.json())
        .then(res => {
          this.hebergement = res.hebergement;
        })
        .catch(err => console.log(err));
    },
    updateNbEnfant(e) {
      this.seen = true;
      this.$store.commit("updateNbEnfant", e.target.value);
    },

    updateNbAdulte(e) {
      this.seen = true;
      this.$store.commit("updateNbAdulte", e.target.value);
    },
    fetchPacks() {
      fetch(`${apiDomain}/api/allpacks-non-paginate`)
        .then(res => res.json())
        .then(res => {
          this.packs = res.packs;
        })
        .catch(err => console.log(err));
    },

    updateReservation(id, reservation) {
      if (this.calcul[0] != 0 && this.hebergement.length > 0) {
        this.prix_total =
          this.reservation.nb_adulte * this.pack.prix_fix +
          this.calcul[0] +
          (this.reservation.nb_adulte * this.hebergement.prix_adulte +
            this.calculPrix[0]) *
            (this.calculInterval.length - 1);

        this.prix_pack =
          this.reservation.nb_adulte * this.pack.prix_fix + this.calcul[0];

        this.prix_logement =
          (this.reservation.nb_adulte * this.hebergement.prix_adulte +
            this.calculPrix[0]) *
          (this.calculInterval.length - 1);
      }

      if (this.calcul[0] != 0 && this.hebergement.length == 0) {
        this.prix_total =
          this.reservation.nb_adulte * this.pack.prix_fix + this.calcul[0];

        this.prix_pack =
          this.reservation.nb_adulte * this.pack.prix_fix + this.calcul[0];

        this.prix_logement = 0;
      } else if (this.calcul[0] == 0) {
        this.prix_total =
          this.reservation.nb_adulte * this.pack.prix_fix +
          this.reservation.nb_adulte *
            this.hebergement.prix_adulte *
            (this.calculInterval.length - 1);
        this.prix_pack = this.reservation.nb_adulte * this.pack.prix_fix;

        this.prix_logement =
          this.reservation.nb_adulte *
          this.hebergement.prix_adulte *
          (this.calculInterval.length - 1);
      }

      axios
        .put(`${apiDomain}/api/reservation/${id}`, {
          date: new Date()
            .toJSON()
            .slice(0, 10)
            .replace(/-/g, "/"),
          ville_id: this.ville_id,
          nbr_place:
            Number(this.reservation.nb_adulte) +
            Number(this.reservation.nb_enfant4) +
            Number(this.reservation.nb_enfant15),
          prix_total: this.prix_total,
          prix_pack: this.prix_pack,
          prix_logement: this.prix_logement,
          nb_adulte: this.reservation.nb_adulte,
          nb_enfant:
            Number(this.reservation.nb_enfant4) +
            Number(this.reservation.nb_enfant15),
          nb_enfant4: Number(this.reservation.nb_enfant4),
          nb_enfant15: Number(this.reservation.nb_enfant15),
          paye: 0,
          pack_id: this.$route.params.idp,
          hebergement_id: this.reservation.hebergement_id,
          agence_id: this.reservation.agence_id,
          client_id: this.client.id,

          headers: {
            "content-type": "application/json"
          }
        })
        .then(function(response) {
          if (response.status == 200) {
            alert("Réservation modifiée");
          }
        })
        .catch(error => {
          if (error.response && error.response.status == 422) {
            this.validationErrors = error.response.data.errors;
          }
        });
    },

    fetchPaiements() {
      axios
        .get(`${apiDomain}/api/paiements`)
        .then(({ data }) => (this.paiements = data));
    },
    fetchReservation(id) {
      fetch(`${apiDomain}/api/reservation/${id}`)
        .then(res => res.json())
        .then(res => {
          this.reservation = res.reservation;
          this.client = res.reservation.client;
          this.pack = res.reservation.pack;
        })
        .catch(err => console.log(err));
    },

    fetchAgences() {
      axios
        .get(`${apiDomain}/api/agences`)
        .then(({ data }) => (this.agences = data));
    }
  }
};
</script>

