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

            <div class="col-md-6 text-left">
              <base-input
                v-if="calculPrix[0]>0"
                label="Prix total"
                placeholder="prix total"
                name="prix_total"
                :value="((Number((reservation.nb_adulte)*(hebergement.prix_adulte))+(calculPrix[0]))*((calculInterval.length)-1))"
              ></base-input>
              <base-input
                v-else
                label="Prix total"
                placeholder="prix total"
                name="prix_total"
                :value="((Number((reservation.nb_adulte)*(hebergement.prix_adulte)))*((calculInterval.length)-1))"
              ></base-input>
            </div>
          </div>

          <div class="row" style="margin-top:25px">
            <div class="col-sm-12 col-xs-3">
              <div class="row">
                <div class="col-md-1">
                  <div>
                    <label style="color:#000;font-size:13px;font-weight:bold">Arrivée</label>
                  </div>
                </div>

                <div class="col-md-4">
                  <div class="form-group">
                    <b-form-datepicker
                      style="height:auto !important"
                      autofocus
                      format="dd-mm-yyyy"
                      placeholder="Ajouter une date"
                      :min="new Date()"
                      @input="test"
                      :date-disabled-fn="dateDisabled"
                      locale="en"
                      v-model="reservation.du"
                    ></b-form-datepicker>
                  </div>
                </div>
                <div class="col-md-1">
                  <div>
                    <label style="color:#000;font-size:13px;font-weight:bold">Départ</label>
                  </div>
                </div>

                <div class="col-md-4">
                  <div class="form-group" v-if="seendep==false">
                    <b-form-datepicker
                      disabled
                      placeholder="Ajouter une date"
                      :min="new Date(next)"
                      :date-disabled-fn="dateDisabled"
                      locale="en"
                      v-model="reservation.au"
                      @input="calculInterval"
                    ></b-form-datepicker>
                  </div>

                  <div class="form-group" v-if="seendep==true">
                    <b-form-datepicker
                      placeholder="Ajouter une date"
                      :min="new Date(next)"
                      :date-disabled-fn="dateDisabledDep"
                      locale="en"
                      v-model="reservation.au"
                      @input="calculInterval"
                    ></b-form-datepicker>
                  </div>
                </div>
              </div>

              <h6
                v-if="nuit==true"
                style="line-height:35px;color:#ed0000"
              >NB: La Réservation est pour deux nuits au minimum</h6>
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
      nuit: false,

      next: "",
      seendep: false,
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
    calculInterval(du, au) {
      var du = this.reservation.du,
        au = this.reservation.au;

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
        //console.log(arr[l]);
      }

      const before = this.beforeShowDay;
      for (var j = 0; j < arr.length; j++) {
        for (var k = 0; k < before.length; k++) {
          if (arr[j] == before[k]) {
            alert(
              "La réservation est pour deux nuits successifs au minimum la date " +
                arr[j] +
                " est déja réservée"
            );
            this.au = "";
          }
        }
      }
      return (this.arr = arr);
    },

    beforeShowDay() {
      var dispo = this.hebergement.disponibilite;
      var des = [];
      if (dispo) {
        des = dispo.split(",").sort();
      }

      return (this.datesAll = des);
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
    dateDisabledDep(dmy, date) {
      if (this.beforeShowDay.length != 0) {
        const interval = this.beforeShowDay;
        var month = date.getUTCMonth() + 1; //months from 1-12
        var d = date.getUTCDate() + 1;
        var day = ("0" + d).slice(-2);
        var year = date.getUTCFullYear();
        var newdate = year + "-" + month + "-" + day;

        for (var i = 0; i < interval.length; i++) {
          if (newdate == interval[i]) {
            return true;
          }
        }
        if (this.datedes != "") {
          if (newdate >= this.datedes) {
            return true;
          }
        }
      }
    },
    test() {
      const interval = this.beforeShowDay;
      var du = new Date(this.du);
      var month = du.getUTCMonth() + 1;
      var d = du.getUTCDate() + 1;
      var day = ("0" + d).slice(-2);
      var year = du.getUTCFullYear();

      //var newdate = day + "-" + month + "-" + year;

      var nextDay = du.getUTCDate() + 1;
      var nextDD = ("0" + nextDay).slice(-2);
      var nextDate = year + "-" + month + "-" + nextDD;
      /* console.log(this.du);
      console.log(nextDate); */
      this.next = nextDate;
      var result = [];
      var somme = null;
      if (interval.includes(this.next)) {
        this.seendep = false;
        this.nuit = true;
      } else {
        this.seendep = true;
        this.nuit = false;
        if (this.next != interval[i]) {
          for (var i = 0; i < interval.length; i++) {
            if (this.next < interval[i]) {
              this.datedes = interval[i];
              break;
            }
          }
        }
      }
    },
    dateDisabled(dmy, date) {
      if (this.beforeShowDay.length != 0) {
        const interval = this.beforeShowDay;

        var month = date.getUTCMonth() + 1; //months from 1-12
        var d = date.getUTCDate() + 1;
        var day = ("0" + d).slice(-2);
        var year = date.getUTCFullYear();

        var newdate = year + "-" + month + "-" + day;

        for (var i = 0; i < interval.length; i++) {
          if (newdate == interval[i]) {
            return true;
          }
        }
      }
    },
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
      if (this.calculPrix.length != 0) {
        this.prix_total =
          (this.reservation.nb_adulte * this.hebergement.prix_adulte +
            this.calculPrix[0]) *
          (this.arr.length - 1);
      } else if (this.calculPrix.length == 0) {
        this.prix_total =
          this.reservation.nb_adulte *
          this.hebergement.prix_adulte *
          (this.arr.length - 1);
      }

      axios
        .put(
          `${apiDomain}/api/reservation-libre/${id}?token=${this.$store.state.token}`,
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
            client_id: this.client.id,
            du: this.reservation.du,
            au: this.reservation.au,
            headers: {
              "content-type": "application/json"
            }
          }
        )
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

    fetchAgences() {
      axios
        .get(`${apiDomain}/api/agences`)
        .then(({ data }) => (this.agences = data));
    }
  }
};
</script>

