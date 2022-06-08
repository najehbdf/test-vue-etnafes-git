<template>
  <div class="content">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb" style="background-color:#a6bfe6 !important">
        <li class="breadcrumb-item">
          <router-link to="/reservations-client">Espace Voyageur</router-link>
        </li>
        <li class="breadcrumb-item active" style="color:#000" aria-current="page">Edit Réservation</li>
      </ol>
    </nav>
    <!-- <div v-if="reservation.client_id==user.id"> -->
    <div>
      <h4>
        <span style="color:#333">Réservation: {{reservation.code}} réservé le {{reservation.date}}</span>
      </h4>
      <card style="border:solid 1px;padding:15px">
        <form v-on:submit.prevent="updateReservation(reservation.id,reservation)">
          <div class="row">
            <div class="col-md-4 pr-md-1">
              <h4 style="color:#0157aa">Voyageur : {{client.nom}} {{client.prenom}}</h4>
              <br />
            </div>
          </div>

          <div class="row" style="margin-top:-30px">
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
                disabled
                :max="pack.nb_place_dispo"
                label="Nombre des places"
                :value="Number(reservation.nb_adulte)+Number(reservation.nb_enfant4)+Number(reservation.nb_enfant15)"
                placeholder="nombre des places"
              ></base-input>
            </div>

            <div class="col-md-6 text-left" v-if="hebergement.length>0">
              <base-input
                label="Prix total"
                disabled
                placeholder="prix total"
                name="prix_total"
                :value="Number(reservation.nb_adulte*(pack.prix_fix))+(calcul[0])+((Number((reservation.nb_adulte)*(hebergement.prix_adulte))+(calculPrix[0]))*((calculInterval.length)-1))"
              ></base-input>
            </div>

            <div class="col-md-6 text-left" v-else>
              <base-input
                label="Prix total"
                disabled
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
                disabled
                name="prix_pack"
                :value="Number(reservation.nb_adulte*(pack.prix_fix))+(calcul[0])"
              ></base-input>
            </div>

            <div class="col-md-6 text-left" v-if="agestab!=undefined && hebergement.length>0">
              <base-input
                label="Prix logement"
                placeholder="prix logement"
                disabled
                name="prix_logement"
                :value="((Number((reservation.nb_adulte)*(hebergement.prix_adulte))+(calculPrix[0]))*((calculInterval.length)-1))"
              ></base-input>
            </div>

            <div class="col-md-6 text-left" v-else>
              <base-input
                label="Prix logement"
                disabled
                placeholder="prix logement"
                name="prix_pack"
                :value="0"
              ></base-input>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 text-left" v-if="reservation.agence_id!=null">
              <label>Prestataire de Services</label>
              <select disabled class="form-control" v-model="reservation.agence_id" name="agence">
                <option
                  v-for="agence in agences"
                  v-bind:key="agence.id"
                  v-bind:value="agence.id"
                >{{agence.nom_agence}}</option>
              </select>
            </div>
            <div class="col-md-6 text-left">
              <label>Pack</label>
              <select
                disabled
                class="form-control"
                v-model="reservation.pack_id"
                name="pack"
                @change="fetchHebPacks(reservation.pack_id)"
              >
                <option
                  v-for="pack in packs"
                  v-bind:key="pack.id"
                  v-bind:value="pack.id"
                >{{pack.titre}} ({{pack.nb_place_dispo}} places disponibles)</option>
              </select>
            </div>

            <div class="col-md-4 pl-md-1 text-left" v-if="hebergement.length>0">
              <div class="form-group">
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
            </div>
          </div>

          <button
            class="btn btn-success"
            type="submit"
            fill
            style="border-radius: 0px 0px 15px !important;"
          >Modifier</button>
        </form>
      </card>
    </div>
    <!-- <div class="container" v-else>
      <card>
        <p>Vous n'avez pas le droit de modifier cette réservation</p>
      </card>
    </div>-->
  </div>
</template>
<script>
import Vue from "vue";
import { VueDatePicker } from "@mathieustan/vue-datepicker";

import { Card, BaseInput } from "@/components/index";
import { apiDomain } from "../config";
export default {
  components: {
    VueDatePicker,
    Card,
    BaseInput
  },
  data() {
    return {
      prix_total: "",
      arr: [],
      hebergement: [],
      ages: [],
      agestab: [],
      formstate: {},
      zones: {},
      villes: {},
      pack: {},
      agences: {},
      client: {},
      packs: [],
      res: [],
      reservation: {},
      client: {}
    };
  },

  computed: {
    calculInterval(du, au) {
      var du = this.pack.date_deb,
        au = this.pack.date_fin;

      var arr = [],
        dt = new Date(du);

      while (dt <= new Date(au)) {
        arr.push(new Date(dt));
        dt.setDate(dt.getDate() + 1);
      }
      for (var l = 0; l < arr.length; l++) {
        var month = arr[l].getUTCMonth() + 1; //months from 1-12
        var day = arr[l].getUTCDate();
        var year = arr[l].getUTCFullYear();
        arr[l] = day + "-" + month + "-" + year;
      }

      return (this.arr = arr);
    },
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
    },

    calculPrix() {
      const hebergement = this.hebergement;
      const nb4 = Number(this.reservation.nb_enfant4);
      const nb15 = Number(this.reservation.nb_enfant15);
      var result = [];
      var somme = null;
      var sommeprixenfant4 = 0;
      var sommeprixenfant15 = 0;
      for (var i = 0; i < nb4; i++) {
        sommeprixenfant4 += hebergement.prix_enfant;
      }

      for (var j = 0; j < nb15; j++) {
        sommeprixenfant15 += hebergement.prix_enfant15;
      }
      somme += sommeprixenfant4 + sommeprixenfant15;
      result.push(somme);

      return result;
    },
    enfants: {
      get() {
        return this.$store.state.nb_enfant;
      },
      set(value) {
        this.$store.commit("updateNbEnfant", value);
      }
    },

    adultes: {
      get() {
        return this.$store.state.nb_adulte;
      },
      set(value) {
        this.$store.commit("updateNbAdulte", value);
      }
    },
    loggedIn() {
      return this.$store.getters.get_loggedIn;
    },

    hebid() {
      return this.reservation.hebergement_id;
    },
    user() {
      return this.$store.getters.get_user;
    }
  },

  created() {
    this.fetchVilles();
    this.fetchReservation(this.$route.params.id);
    this.fetchPacks();
    this.fetchAgences();
    this.fetchHebPacks(this.$route.params.idp);
    this.fetchHebergement();
    this.fetchZones();
  },
  methods: {
    fetchHebergement(id) {
      fetch(`${apiDomain}/api/hebergement/${this.hebid}`)
        .then(res => res.json())
        .then(res => {
          this.hebergement = res.hebergement;
        })
        .catch(err => console.log(err));
    },
    removeAge: function(index) {
      Vue.delete(this.agestab, index);
      this.nb_enfant = this.nb_enfant - 1;
    },
    addNewAge: function() {
      this.ages.push(Vue.util.extend({}, this.age));
    },
    updateNbEnfant(e) {
      this.seen = true;
      this.$store.commit("updateNbEnfant", e.target.value);
    },

    updateNbAdulte(e) {
      this.seen = true;
      this.$store.commit("updateNbAdulte", e.target.value);
    },
    fetchHebPacks(id) {
      axios
        .get(`${apiDomain}/api/packs/${id}`)
        .then(({ data }) => (this.pack = data.packdetail));
    },
    fetchAgences() {
      axios
        .get(`${apiDomain}/api/agences`)
        .then(({ data }) => (this.agences = data));
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
        this.prix_total = this.reservation.nb_adulte * this.pack.prix_fix;
        this.prix_pack = this.reservation.nb_adulte * this.pack.prix_fix;

        this.prix_logement =
          this.reservation.nb_adulte *
          this.hebergement.prix_adulte *
          (this.calculInterval.length - 1);
      }

      axios
        .put(
          `${apiDomain}/api/reservation/${id}?token=${this.$store.state.token}`,
          {
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
            client_id: this.$store.state.user.id,

            headers: {
              "content-type": "application/json"
            }
          }
        )
        .then(res => {
          if (res.status == 200) {
            this.$fire({
              text: "Votre réservation a été modifiée avec succés",
              type: "success",
              timer: 90000
            }).then(r => {
              this.$router.push("/reservations-client");
            });
          }
        })
        .catch(error => {
          if (error.response && error.response.status == 422) {
            this.validationErrors = error.response.data.errors;
          }
        });
    },

    fetchVilles() {
      fetch(`${apiDomain}/api/villes`)
        .then(res => res.json())
        .then(res => {
          this.villes = res;
        })
        .catch(err => console.log(err));
    },

    fetchReservation(id) {
      fetch(
        `${apiDomain}/api/reservation/${id}?token=${this.$store.state.token}`
      )
        .then(res => res.json())
        .then(res => {
          this.reservation = res.reservation;
          this.client = res.reservation.client;
        });
    },

    fetchZones() {
      fetch(`${apiDomain}/api/allzones`)
        .then(res => res.json())
        .then(res => {
          this.zones = res.zones;
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

