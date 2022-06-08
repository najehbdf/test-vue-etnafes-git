<template>
  <div>
    <TopNavbarHome />

    <div class="container" style="margin-bottom: 30px; margin-top: 40px">
      <b-modal id="modal-paymee">
        <iframe
          style="border: 1px solid #c4252c; width: 100%"
          height="500"
          width="100%"
          id="inlineFrameExample"
          :src="url_frame"
        ></iframe>
      </b-modal>
      <div class="row">
        <div class="col-md-6">
          <!--Card content-->
          <div class="card-body" style="border: solid 1px #afaeae">
            <!-- Form -->
            <form name>
              <!-- Heading -->
              <!-- <h4
                class="dark-grey-text"
                style="margin-top: 25px; font-family: 'Poppins', sans-serif"
              > -->
              <h4
                class="dark-grey-text"
                style="line-height: 60px; font-family: 'Open Sans', sans-serif"
              >
                <!--  <strong
                  style="
                    color: #333;
                    font-family: 'Poppins', sans-serif;
                    letter-spacing: 1px;
                    font-size: 20px;
                  "
                  >Modifier votre recherche</strong
                > -->

                <strong
                  style="font-family: 'Indie Flower', cursive; color: #000"
                  >Modifier votre recherche</strong
                >
              </h4>

              <div class="row" style="margin-top: 25px">
                <div class="col-md-12 col-xs-3">
                  <div class="row">
                    <div class="col-md-4">
                      <div>
                        <label
                          style="
                            color: #000;
                            font-size: 13px;
                            font-weight: bold;
                          "
                          >Sélectionnez vos dates</label
                        >
                      </div>
                    </div>

                    <div class="col-md-8">
                      <!--   @finishSelection="fetch_res_najeh_moez" -->
                      <date-range-picker
                        style="width: 50%; text-align: center; margin-top: 13px"
                        @finishSelection="fetch_res_najeh_moez"
                        v-model="dateHebergement"
                        :date-format="dateFormatHebrgement"
                        :locale-data="{ firstDay: 1, format: 'dd/mm/yyyy' }"
                        :minDate="new Date()"
                        :autoApply="true"
                        locale="fr"
                      ></date-range-picker>

                      <!-- <VueDatePicker
                                class="form-control personalisedate"
                                :minDate="new Date()"
                                v-model="date_deb"
                              /> -->
                    </div>
                    <router-link
                      :to="{
                        name: 'ReservationHebergement',
                        params: { id: hebergement.id },
                        query: {
                          du:
                            this.$route.query.du ==
                            this.dateHebergement.startDate
                              ? this.$route.query.du
                              : this.convert_date_du,
                          au:
                            this.$route.query.au == this.dateHebergement.endDate
                              ? this.$route.query.au
                              : this.convert_date_au,

                          nb_adulte: nb_adulte,
                          nb_enfant15: nb_enfant15,
                          nb_enfant4: nb_enfant4,
                          arr: this.calculIntervalDateRes_calender,
                        },
                      }"
                    >
                      <b-button hidden class="btn btn-success"
                        >Enregistrer</b-button
                      >
                    </router-link>
                  </div>

                  <div class="row">
                    <div class="col-md-4">
                      <label
                        style="color: #000; font-size: 13px; font-weight: bold"
                        >Adultes</label
                      >
                      <vue-numeric-input
                        v-model="nb_adulte"
                        :min="1"
                        :step="1"
                        :max="
                          hebergement.nbr_place_dispo - nb_enfant15 - nb_enfant4
                        "
                        name="nb_adulte"
                        required
                      ></vue-numeric-input>
                    </div>

                    <!-- nb enfant =>4 -->

                    <div class="col-md-4">
                      <label
                        style="color: #000; font-size: 13px; font-weight: bold"
                        >Enfants >4 ans</label
                      >
                      <vue-numeric-input
                        :min="0"
                        :step="1"
                        :max="
                          hebergement.nbr_place_dispo - nb_adulte - nb_enfant4
                        "
                        name="nb_enfant15"
                        required
                        v-model="nb_enfant15"
                      ></vue-numeric-input>
                    </div>
                    <!-- nb enfant <4 -->

                    <div class="col-md-4">
                      <label
                        style="color: #000; font-size: 13px; font-weight: bold"
                        >Enfants < 4 ans</label
                      >
                      <vue-numeric-input
                        :min="0"
                        :step="1"
                        :max="
                          hebergement.nbr_place_dispo - nb_adulte - nb_enfant15
                        "
                        name="nb_enfant4"
                        required
                        v-model="nb_enfant4"
                      ></vue-numeric-input>
                    </div>
                  </div>
                </div>
              </div>

              <div
                style="
                  width: 283px;
                  height: 67px;
                  padding: 10px;
                  margin-left: 21px;
                  margin-top: 19px;
                  color: rgb(133, 100, 4);
                  background-color: rgb(235, 217, 159);
                  border-color: rgb(255, 238, 186);
                  font-size: 15px;
                  text-align: center;
                "
                v-if="verif_dipo < 0"
              >
                Vous avez atteint la limite d’invitations
              </div>
              <br />
              <div class="row">
                <div class="col-md-5">
                  <h3 style="color: #333">
                    Total:
                    {{
                      calculIntervalDateRes_calender.length *
                      (Number(nb_adulte) * hebergement.prix_adulte +
                        Number(nb_enfant15) * hebergement.prix_enfant15 +
                        Number(nb_enfant4) * hebergement.prix_enfant)
                    }}dt
                  </h3>

                  <p style="color: rgb(51, 51, 51); margin-top: -25px">
                    Détails: {{ calculIntervalDateRes_calender.length }} nuits,
                    <span>{{ nb_adulte }} adultes,</span>
                    <span
                      >&nbsp;{{
                        Number(nb_enfant15) + Number(nb_enfant4)
                      }}
                      enfants</span
                    >
                    <!-- <br />
                      <span>{{ nb_adulte }} adultes</span><br />
                      <span
                        >&nbsp;{{
                          Number(nb_enfant15) + Number(nb_enfant4)
                        }}
                        enfants</span
                      > -->
                  </p>
                </div>
                <div class="col-md-7" v-if="get_date_complet.length > 0">
                  <div
                    style="
                      color: rgb(51, 51, 51);
                      font-size: 16px;
                      margin-top: 5px;
                    "
                  >
                    <!-- ⚠️ -->
                    ⚠️ Date compléte:
                  </div>
                  <br />
                  <ul v-for="d in get_date_complet" :key="d.id">
                    <li style="margin-top: -16px; margin-left: 15px">
                      {{ d }}
                    </li>
                  </ul>
                </div>
              </div>
            </form>
            <!-- Form -->
          </div>
        </div>

        <div class="col-md-6">
          <div class="card-body" style="border: solid 1px #afaeae">
            <h4
              class="dark-grey-text"
              style="line-height: 60px; font-family: 'Open Sans', sans-serif"
            >
              <strong style="font-family: 'Indie Flower', cursive; color: #000"
                >Demande de réservation :</strong
              >
              &nbsp;
              <strong
                style="font-family: 'Indie Flower', cursive; color: #ff931f"
                ><span v-show="$route.query.chambre"
                  >{{ $route.query.chambre }} -- </span
                >{{ hebergement.nom }}</strong
              >
            </h4>
            <span style="font-weight: bold; line-height: 30px; color: #000"
              >Dates</span
            >
            <br />
            {{ du }} / {{ au }} ({{
              calculIntervalDateRes_calender.length
            }}
            nuits)
            <br />
            <br />
            <!-- <br />
          <span style="font-weight: bold; line-height: 30px">Voyageurs</span>
          <br /> -->

            <span style="font-weight: bold; line-height: 30px; color: #000"
              >Choisissez le moyen de paiement</span
            >
            <br />
            <div class="row">
              <div class="col-md-11">
                <input
                  v-model="type_paiement"
                  value="offline"
                  aria-label="label"
                  type="radio"
                />
                <span>&nbsp;Offline</span>
              </div>
            </div>
            <br />
            <div class="row">
              <div class="col-md-11">
                <input
                  v-model="type_paiement"
                  value="en ligne"
                  aria-label="label"
                  type="radio"
                />
                <img loading="lazy" src="/paiment-etnafes-tn.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        @click="stepOnePayemee()"
        v-b-modal.modal-paymee
        v-if="type_paiement == 'en ligne' && verif_dipo >= 0"
        class="btn btn-success"
        type="submit"
        fill
        style="margin-left: 10px"
      >
        <!-- && agestab.length == nb_enfant -->
        Demande de réservation
      </button>

      <router-link
        :to="{
          name: 'PaiementOfflineHebergement',
          params: { id: this.$route.params.id },
          query: {
            du: this.du,
            au: this.au,
            nb_enfant15: nb_enfant15,
            nb_enfant4: nb_enfant4,
            arr: this.calculIntervalDateRes_calender,
            nb_adulte: this.nb_adulte,
            nb_enfant: this.nb_enfant_Moez,

            nbr_places_reserves: this.nbr_places_total_Moez,
            places_disponibles: this.nbr_places_dispo_Moez,
          },
        }"
      >
        <b-button v-if="type_paiement == 'offline' && verif_dipo >= 0"
          >Demande de réservation</b-button
        >
      </router-link>
    </div>

    <Footer></Footer>
  </div>
</template>

<style>
@media (min-width: 1200px) {
  .container {
    max-width: 1420px;
  }
}
</style>

<script>
import DateRangePicker from "vue2-daterange-picker";
import moment from "moment";
import Datepicker from "vuejs-datepicker";
import MapMarker from "../components/MapMarker";
import MapInfoWindow from "../components/MapInfoWindow";
import axios from "axios";
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
import TopNavbarHome from "./Layout/TopNavbarHome.vue";
import Footer from "./Layout/Footer.vue";
import { apiDomain } from "../config";
import InfoDepanneur from "./InfoDepanneur.vue";
import Vue from "vue";
import { VueDatePicker } from "@mathieustan/vue-datepicker";

export default {
  components: {
    TopNavbarHome,
    Footer,
    VueDatePicker,

    VueperSlides,
    VueperSlide,
    "info-content": InfoDepanneur,
    MapMarker,
    MapInfoWindow,
    Datepicker,
    DateRangePicker,
  },
  data() {
    return {
      date_deb: null,
      dateHebergement: {
        startDate: this.$route.query.du,
        endDate: this.$route.query.au,
      },
      type_paiement: "",

      url_frame: "",
      code_compt: "13639", //ligne
      //code_compt: "1915",

      note: "Etnafes " + "#" + Math.floor(Math.random() * 40000),

      token_client: "",
      prix_total: "",
      agestab: this.$route.query.ages ? this.$route.query.ages : [],

      nuit: false,
      datedes: "",
      pays: {},
      pays_id: "",
      validationErrors: "",
      nom: "",
      email: this.$store.state.user.email,
      telephone: "",
      password: "",
      error: "",
      civilité: "",
      ages: [],
      seen: false,
      seendep: false,

      arrd: [],

      des: {},
      dateFormat: "dd-MM-yyyy",

      dates: {},
      interval: {},
      paiement_id: "",
      isHidden: true,
      index: null,
      infoContent: "",
      infoWindowPos: {
        lat: 0,
        lng: 0,
      },

      nb_adulte: this.$route.query.nb_adulte,
      nb_enfant15: this.$route.query.nb_enfant15,
      nb_enfant4: this.$route.query.nb_enfant4,

      arr: this.$route.query.arr,

      du: this.$route.query.du,
      au: this.$route.query.au,
      next: "",

      nb_nuit: "",

      infoWinOpen: false,
      currentMidx: null,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35,
        },
      },
      map: null,
      center: { lat: 36.81897, lng: 10.16579 },
      markers: [],
      InfoDepanneur: [],
      markersh: [],

      places: [],
      currentPlace: null,
      // packs:[],
      entercode: false,
      res_najeh_moez: [],

      apiDomain: "https://etnafesapi20212018.etnafes.com",
      packsvedette: [],
      hebergements: {},
      hebergement: {},
      client: {},
      paiements: {},
      pack: {
        id: "",
        nom: "",
        du: "",
        description: "",
        au: "",
        type: "",
        ville_id: "",
      },
      slide: 0,
      sliding: null,
    };
  },

  created() {
    this.fetchHebergement(this.$route.params.id);

    this.fetchPaiements();
    this.fetchPays();

    Bus.$on("markers_fetched", (data) => {
      this.markersh = data.markersh;
      if (this.markersh.length > 0) {
        this.center = data.markersh[0].position;
      }
      console.log("event data", data);
    });

    Bus.$on("marker_result_clicked", (index) => {
      let targetMarker = this.markersh[index];
      this.center = targetMarker.position;
      this.toggleInfoWindow(targetMarker, index);
    });
  },
  computed: {
    get_disponibilite() {
      const res_najeh_moez = this.res_najeh_moez;
      var result = [];
      const res = 0;
      for (var i = 0; i < res_najeh_moez.length; i++) {
        if (res_najeh_moez[i].length == 0) {
          var testt =
            this.hebergement.nbr_place_dispo - this.nbr_places_total_Moez;
          result.push(testt);
        }
        if (res_najeh_moez[i].length == 1) {
          var testtt =
            res_najeh_moez[i][0].places_disponibles -
            this.nbr_places_total_Moez;
          result.push(testtt);
        }
      }
      return result;
    },
    verif_dipo() {
      const verif = this.get_disponibilite;
      var largest = Math.min.apply(Math, verif);
      return largest;
    },
    get_date_complet() {
      const res_najeh_moez = this.res_najeh_moez;
      var result = [];
      const res = 0;
      for (var i = 0; i < res_najeh_moez.length; i++) {
        if (res_najeh_moez[i].length == 1) {
          var date = res_najeh_moez[i][0].places_disponibles;
          if (date == 0) {
            result.push(res_najeh_moez[i][0].date);
          }
        }
      }
      return result;
    },

    calculIntervalDateRes_calender(du, au) {
      var du = this.du,
        au = this.au;

      var date_res = [],
        dt = new Date(du);

      while (dt < new Date(au)) {
        date_res.push(new Date(dt));
        dt.setDate(dt.getDate() + 1);
      }
      for (var l = 0; l < date_res.length; l++) {
        var month = date_res[l].getUTCMonth() + 1;
        var day = date_res[l].getUTCDate();
        var year = date_res[l].getUTCFullYear();
        // date_res[l] = day + "-" + month + "-" + year ;
        date_res[l] = year + "-" + month + "-" + day;
      }

      /* const before = this.beforeShowDay;
      for (var j = 0; j < date_res.length; j++) {
        for (var k = 0; k < before.length; k++) {
          if (date_res[j] == before[k]) {
            alert(
              "La réservation est pour deux nuits successifs au minimum la date " +
                date_res[j] +
                " est déja réservée"
            );
            this.au = "";
          }
        }
      }  */
      return (this.date_res = date_res);
    },
    fetch_res_najeh_moez(id) {
      fetch(
        `${apiDomain}/api/getDatesReservation_cl/${this.$route.params.id}/${this.calculIntervalDateRes_calender}`
      )
        .then((res) => res.json())
        .then((res) => {
          this.res_najeh_moez = res;
        });
    },
    formatterDate() {
      const arr = this.arr;
      const output = arr.map((str) => {
        /* Split date string into sub string parts */
        var [year, month, date] = str.split("-");
        /*  var mm=("0" + month).slice(-2);
  var dd=("0" + date+1).slice(-2); */
        // var dd = date< 10 ? '0' +date: ''+date;

        if (month < 10) {
          month = "0" + month;
        }

        if (year < 10) {
          year = "0" + year;
        }

        /* if (date < 10) 
        date = '0' + date; */

        /* Compose a new date from sub string parts of desired format */
        return `${date}-${month}-${year}`;
        // return `${year}-${month}-${date}`;
      });
      return output;
    },

    /*  for(var i=0;i<arrdates.length;i++)
      {
        var d = new Date(arrdates[i]);
        month = '' + (d.getMonth() + 1);
        day = '' + d.getDate();
        year = d.getFullYear();
        if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
         const interval = [year, month, day].join('-');
         result.push(interval);
      }
return result; */

    calculage() {
      // const agestab = this.agesForm;
      const agestab = this.agestab;

      var result = [];
      this.nbenfant4 = 0;
      this.nbenfant15 = 0;
      if (this.ages != 0) {
        for (var k = 0; k < agestab.length; k++) {
          if (agestab[k] <= 4) {
            this.nbenfant4 = parseInt(this.nbenfant4) + 1;
          }
          if (agestab[k] > 4) {
            this.nbenfant15 = parseInt(this.nbenfant15) + 1;
          }
        }
      }
      return [this.nbenfant4, this.nbenfant15];
    },
    agesForm() {
      const ages = this.agestab;
      var result = [];
      if (ages.length != 0) {
        for (var i = 0; i < ages.length - 1; i++) {
          result.push(ages[i]);
        }
      }
      return result;
    },
    calculPrix() {
      const hebergement = this.hebergement;
      // const agestab = this.agesForm;
      const agestab = this.agestab;

      var result = [];
      var somme = null;

      var sommeprixenfant4 = 0;
      var sommeprixenfant15 = 0;
      for (var i = 0; i < agestab.length; i++) {
        if (agestab[i] <= 4) {
          sommeprixenfant4 += hebergement.prix_enfant;
        }
        if (agestab[i] > 4) {
          sommeprixenfant15 += hebergement.prix_enfant15;
        }
      }
      somme += sommeprixenfant4 + sommeprixenfant15;
      result.push(somme);

      return result;
    },
    nb_adulte_Moez() {
      return this.nb_adulte;
    },
    convert_date_du() {
      if (this.dateHebergement.startDate != "") {
        return (this.du = this.dateHebergement.startDate
          .toISOString()
          .split("T")[0]);
      }
    },

    convert_date_au() {
      /*       if (this.dateHebergement.endDate != "") { */
      return (this.au = this.dateHebergement.endDate
        .toISOString()
        .split("T")[0]);
      /* } */
    },

    nb_enfant_Moez() {
      return Number(this.nb_enfant15) + Number(this.nb_enfant4);
    },
    nbr_places_total_Moez() {
      return (
        Number(this.nb_adulte_Moez) +
        Number(this.nb_enfant4) +
        Number(this.nb_enfant15)
      );
    },
    nbr_places_dispo_Moez() {
      return (
        Number(this.hebergement.nbr_place_dispo) -
        Number(this.nbr_places_total_Moez)
      );
    },

    sommeMoez() {
      return (
        this.calculIntervalDateRes_calender.length *
        (this.nb_adulte * this.hebergement.prix_adulte +
          this.nb_enfant15 * this.hebergement.prix_enfant15 +
          this.nb_enfant4 * this.hebergement.prix_enfant)
      );
    },
    loggedIn() {
      return this.$store.getters.get_loggedIn;
    },

    user() {
      return this.$store.getters.get_user;
    },

    adultes: {
      get() {
        return this.$store.state.nb_adulte;
      },
      set(value) {
        this.$store.commit("updateNbAdulte", value);
      },
    },
    enfants: {
      get() {
        return this.$store.state.nb_enfant;
      },
      set(value) {
        this.$store.commit("updateNbEnfant", value);
      },
    },
    beforeShowDay() {
      var dispo = this.hebergement.disponibilite;
      // var des = [];
      if (dispo) {
        var des = dispo.split(",").sort();
      }
      return des;
    },
  },

  mounted() {
    //  this.fechStep3();

    window.addEventListener(
      "message",
      function (event) {
        if (event.data.event_id === "paymee.complete") {
          // window.location.replace("https://etnafes.com/suivant_logement");
          window.location.replace("https://etnafes.com/suivant_logement");
        }
      },
      false
    );
  },
  methods: {
    dateFormatHebrgement(classes, date) {
      if (!classes.disabled) {
        classes.disabled = date.getTime() < new Date();
      }
      return classes;
    },
    stepOnePayemee() {
      let formData = new FormData();

      formData.append("vendor", this.code_compt);
      formData.append("amount", this.sommeMoez);
      formData.append("note", this.note);

      axios
        .post(`https://app.paymee.tn/api/v1/payments/create`, formData, {
          body: JSON.stringify(this.annonce),
          headers: {
            "Content-Type": "application/json",

            Authorization: "Token ed6b25dc0ae4a9195b30be5f9e4f19a1383eb83b", // en ligen
            // Authorization: "Token a6408a6150213d091a55669461fc9fc1b34d2192",
          },
        })

        .then((res) => {
          this.token_client = res.data.data.token;
          this.url_frame = `https://app.paymee.tn/gateway/${this.token_client}`; //step2

          localStorage.setItem("token_client", this.token_client);
          //query
          localStorage.setItem("logement_id", this.$route.params.id);
          localStorage.setItem("prix_logement", this.sommeMoez);

          localStorage.setItem("du", this.du);
          localStorage.setItem("au", this.au);
          localStorage.setItem("nom_hebergement", this.hebergement.nom);
          localStorage.setItem("arr", this.calculIntervalDateRes_calender);

          localStorage.setItem("nb_enfant4", this.nb_enfant4);
          localStorage.setItem("nb_enfant15", this.nb_enfant15);

          localStorage.setItem("nb_enfants", this.nb_enfant_Moez);
          localStorage.setItem("nb_adultes", this.nb_adulte_Moez);

          localStorage.setItem(
            "nbr_places_dispo_Moez",
            this.nbr_places_dispo_Moez
          );
          localStorage.setItem(
            "nbr_places_total_Moez",
            this.nbr_places_total_Moez
          );
        })

        .catch((error) => {
          console.log(error.response.data);
        });
    },
    removeAge: function (index) {
      Vue.delete(this.agestab, index);
      this.nb_enfant = this.nb_enfant - 1;
    },
    onChange(v) {
      console.log("onChange ", v);
    },
    onComplete(v) {
      console.log("onComplete ", v);
    },
    addClient() {
      this.entercode = false;
      axios
        .post(`${apiDomain}/api/register/client`, {
          nom: this.client.nom,
          prenom: this.client.prenom,
          telephone: this.client.telephone,
          email: this.client.email,
          civilité: this.civilité,
          password: this.client.password,

          gouvernorat: this.gouvernorat,
          agence_id: this.agence_id,
          headers: {
            "content-type": "application/json",
          },
        })
        .then((response) => {
          if (response.status == 201) {
            this.entercode = true;
            // alert("Client Ajoutée");
            // console.log("success");
          }
        })
        .catch((error) => {
          if (error.response && error.response.status == 400) {
            this.validationErrors = error.response.data;
          }
        });
    },
    addReservation() {
      if (this.calculPrix.length != 0) {
        this.prix_total =
          (this.nb_adulte * this.hebergement.prix_adulte + this.calculPrix[0]) *
          (this.arr.length - 1);
      } else if (this.calculPrix.length == 0) {
        this.prix_total =
          this.nb_adulte * this.hebergement.prix_adulte * (this.arr.length - 1);
      }

      axios
        .post(`${apiDomain}/api/reservation/hebergement`, {
          du: this.du,
          au: this.au,
          paye: 0,
          read: 0,

          hebergement_id: this.$route.params.id,
          client_id: this.$store.state.user.id,
          prix_remise: this.prix_remise,
          nbr_place:
            Number(this.nb_adulte) +
            Number(this.nb_enfant15) +
            Number(this.nb_enfant4),
          prix_total: this.prix_total,
          nb_adulte: this.nb_adulte,
          nb_enfant4: this.nb_enfant4,
          nb_enfant15: this.nb_enfant15,

          headers: {
            "content-type": "application/json",
          },
        })
        .then((response) => {
          if (response.status == 200) {
            alert("réservation avec succés");
          }
        })
        .catch((error) => {
          if (error.response && error.response.status == 400) {
            this.validationErrors = error.response.data;
          }
        });

      axios.post(`${apiDomain}/api/reservation/mail`, {
        mail: this.email,
      });

      axios.post(
        `${apiDomain}/api/hebergement/place/${this.$route.params.id}`,
        {
          nbr_place_dispo:
            this.hebergement.nbr_place_dispo -
            (Number(this.nb_adulte) + Number(this.nb_enfant)),
        }
      );
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
    testArrivée() {
      alert("rrded vgezfezf hzeftez hzefeg");
    },
    fetchPays() {
      axios.get(`${apiDomain}/api/pays`).then(({ data }) => (this.pays = data));
    },
    addNewAge: function () {
      this.ages.push(Vue.util.extend({}, this.age));
    },

    updateNbAdulte(e) {
      this.$store.commit("updateNbAdulte", e.target.value);
    },

    updateNbEnfant(e) {
      this.seen = true;
      this.$store.commit("updateNbEnfant", e.target.value);
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

    customFormatter(date) {
      // return moment(date).format("MMMM Do YYYY, h:mm:ss a");
      return (this.interval = moment(date).format("YYYY-m-d"));
    },

    calculIn(du, date) {
      if (this.beforeShowDay.length != 0) {
        const interval = this.beforeShowDay;

        var month = date.getUTCMonth() + 1; //months from 1-12
        var d = date.getUTCDate() + 1;
        var day = ("0" + d).slice(-2);
        var year = date.getUTCFullYear();

        var newdate = day + "-" + month + "-" + year;
        // var du = new Date(this.du);
        var du = new Date(this.du);

        var nextDay = du.getUTCDate() + 1;
        var nextDate = nextDay + "-" + month + "-" + year;

        console.log(nextDate);
        for (var i = 0; i < interval.length; i++) {
          if (du != interval[i] && nextDate == interval[i]) {
            return true;
          }
        }
      }
    },

    calculInterval(du, au) {
      var du = this.du,
        au = this.au;

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

    initialiser() {
      (this.du = ""), (this.au = "");
    },

    fetchPaiements() {
      axios
        .get(`${apiDomain}/api/paiements`)
        .then(({ data }) => (this.paiements = data));
    },
    hasHistory() {
      return window.history.length > 2;
    },
    toggleInfoWindow(marker, idx) {
      this.infoWindowPos = marker.position;
      this.InfoDepanneur = marker.position;

      //check if its the same marker that was selected if yes toggle
      if (this.currentMidx == idx) {
        this.infoWinOpen = !this.infoWinOpen;
      }
      //if different marker set infowindow to open and reset current marker index
      else {
        this.infoWinOpen = true;
        this.currentMidx = idx;
      }
    },

    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
    fetchPacksVedette(ville_id) {
      axios
        .get(`${apiDomain}/api/packs/reservation/${ville_id}`)
        .then(({ data }) => (this.packsvedette = data.pack));
    },

    fetchHebergement(id) {
      fetch(`${apiDomain}/api/hebergement/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.hebergement = res.hebergement;
          this.imagehebergements = res.hebergement.images_hebergement;
          this.interval = res.interval;
        })
        .catch((err) => console.log(err));
    },
    fetchPacks(id) {
      axios
        .get(`${apiDomain}/api/packs/${id}`)
        .then(({ data }) => (this.pack = data.packdetail));
    },
  },
};
</script>

<style>
#modal-paymee .modal-content {
  width: 69% !important;
}
</style>