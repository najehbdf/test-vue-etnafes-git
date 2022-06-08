<template>
  <div>
    <TopNavbarHome />

    <div class="container container_off_line">
       <b-card no-body class="card_off_line">
        <div class="row">
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-6">
                <p
                  style="
                    margin-left: 20px;
                    margin-top: 30px;
                    font-weight: bold;
                    color: #000;
                  "
                >
                  {{ hebergement.nom }}
                </p>
              </div>

              <div class="col-md-6 d-none d-lg-block">
                <b-button
                  v-if="verif == false && verif_dipo >= 0"
                  @click="addReservation()"
                  >Réservez</b-button
                >&nbsp; <b-button v-if="verif == true">Imprimez</b-button>&nbsp;
                <!-- <b-button v-print="'#printMe'">Imprimez</b-button> -->
                <!-- <a
                  :href="'https://etnafesapi20212018.etnafes.com/api/reservation_pack/pdf/' + pack.id"
                  target="_blank"
                  style="background-color:transparent !important"
                >
                  <button class="btn btn-danger" style="margin-bottom:20px">Imprimez</button>
                </a>-->
              </div>
            </div>

            <b-card-text style="color: #000">
              {{ hebergement.nom }}
            </b-card-text>
            <hr style="margin-top: 0.1rem" />
            <b-card-text style="color: #000">
              Dates : du {{ $route.query.du }} au {{ $route.query.au }}
            </b-card-text>

            <hr style="margin-top: 0.1rem" />
            <b-card-text style="color: #000"
              >{{ nb_adulte }} Adulte(s)</b-card-text
            >
            <b-card-text style="color: #000"
              >{{ nb_enfant }} Enfant(s)</b-card-text
            >

            <hr />
            <!-- <h4 style="color: #333">
              >> Prix total :
              {{
                calculIntervalDateRes_calender.length *
                (Number(nb_adulte) * hebergement.prix_adulte +
                  Number(nb_enfant15) * hebergement.prix_enfant15 +
                  Number(nb_enfant4) * hebergement.prix_enfant)
              }}dt
            </h4> -->

            <h4 style="color: #333">
              >> Prix total :
              {{ $route.query.p_etnafes }}dt
            </h4>

            <p>
              <span style="font-weight: bold; line-height: 27px"
                >Notre bureau :&nbsp;</span
              >
              <span>20, rue al azhar ben Mounafedh,Mansoura Kairouan</span>
            </p>
            <p>
              <span style="font-weight: bold; line-height: 27px"
                >Telephone :&nbsp;</span
              >
              <span>Pour plus d'information contacter 22225951</span>
            </p>
          </div>
        </div>
      </b-card>
      <br class="d-none d-lg-block" />

      <!--  <b-button v-print="'#printMe'">Imprimez</b-button> -->
    </div>
    <div class="row d-lg-none" style="display: block">
      <div
        style="
          position: fixed;
          background: #fff;
          bottom: 0;
          right: 0;
          left: 0;
          padding: 15px;
          z-index: 1;
          margin: 0;
          border-top: 1px solid rgb(221, 221, 221) !important;
        "
      >
        <b-button
          class="btn-info btn-block"
          v-if="verif == false && verif_dipo >= 0"
          @click="addReservation()"
          >Réservez</b-button
        >&nbsp; <b-button v-if="verif == true">Imprimez</b-button>&nbsp;
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<style>
#carousel-PAgence222 {
  width: 100%;
}
</style>
<script>
import axios from "axios";
import { Card, BaseInput } from "@/components/index";
import TopNavbarHome from "./Layout/TopNavbarHome.vue";
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
import jsonpAdapter from "axios-jsonp";
import Footer from "./Layout/Footer.vue";
import { mapState } from "vuex";
import { apiDomain } from "../config";
import Vue from "vue";
export default {
  components: {
    TopNavbarHome,
    Footer,
    BaseInput,
    VueperSlides,
    VueperSlide,
  },
  data() {
    return {
      nbr_places: Number(this.$route.query.nbr_places_reserves),
      res_najeh_moez: [],
      apiDomain: "https://etnafesapi20212018.etnafes.com",

      logement_id: this.$route.params.id,

      listes_dates: this.$route.query.arr,
      nbr_places_total: localStorage.getItem(
        "nbr_places_total_Moez",
        this.nbr_places_total_Moez
      ),
      nb_adultes: this.$route.query.nb_adulte,

      du: this.$route.query.du,
      au: this.$route.query.au,
      verif: false,
      ville: {},
      hebergement: {},

      paysshow: false,
      agenceshow: false,
      client: [],
      ages: [],
      agestab: this.$route.query.ages ? this.$route.query.ages : [],
      villespays: {},
      nbr_place: "",
      date: "",
      pays: {},
      pays_id: "",
      slide: 0,
      sliding: null,
      choixagence: true,
      //ticket: false,
      client: {},
      terms: false,
      toggle: false,
      toggle1: false,
      toggle2: false,
      toggle3: false,
      toggle4: false,
      agence_id: null,
      nom: "",
      hebergement: {},
      agencee: {},
      // prenom: "",
      email: "",
      telephone: "",
      civilité: "",
      gouvernorat: "",
      ville_id: "",
      prix_total: "",
      prix_pack: "",
      prix_logement: 0,

      nb_adulte: this.$route.query.nb_adulte,
      nb_enfant: this.$route.query.nb_enfant,
      nb_enfant15: this.$route.query.nb_enfant15,
      nb_enfant4: this.$route.query.nb_enfant4,

      agence: {
        nom_agence: null,
      },
      nom_agence: "",
      agences: {},
      arr: [],
      hebergement_pack: {},
      pack: {
        id: "",
        nom: "",
        du: "",
        description: "",
        au: "",
        type: "",
        ville_id: "",
      },
    };
  },
  created() {
    this.fetchHebergement(this.$route.params.id);

    this.fetchClient(this.$store.state.user.id);

    fetch(
      `${apiDomain}/api/getDatesReservation_cl/${this.$route.params.id}/${this.calculIntervalDateRes_calender}`
    )
      .then((res) => res.json())
      .then((res) => {
        this.res_najeh_moez = res;
      });
  },

  computed: {
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
    get_disponibilite() {
      const res_najeh_moez = this.res_najeh_moez;
      var result = [];
      const res = 0;
      for (var i = 0; i < res_najeh_moez.length; i++) {
        if (res_najeh_moez[i].length == 0) {
          var testt =
            this.hebergement.nbr_place_dispo -
            this.$route.query.nbr_places_reserves;
          result.push(testt);
        }
        if (res_najeh_moez[i].length == 1) {
          var testtt =
            res_najeh_moez[i][0].places_disponibles - this.nbr_places;
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
    calculPrix() {
      const hebergement = this.hebergement;
      const agestab = this.agestab;
      var result = [];
      var somme = null;

      var sommeprixenfant4 = 0;
      var sommeprixenfant15 = 0;
      if (agestab != undefined) {
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
      }
      return result;
    },

    calculage() {
      const agestab = this.agestab;
      var result = [];
      this.nbenfant4 = 0;
      this.nbenfant15 = 0;
      if (agestab != undefined) {
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

    calcul() {
      const pack = this.pack;
      const agestab = this.agestab;
      var result = [];
      var somme = null;

      var sommeprixenfant4 = 0;
      var sommeprixenfant15 = 0;
      if (agestab != undefined) {
        for (var i = 0; i < agestab.length; i++) {
          if (agestab[i] <= 4) {
            sommeprixenfant4 += pack.prix_enfant4;
          }
          if (agestab[i] > 4) {
            sommeprixenfant15 += pack.prix_enfant15;
          }
        }
        somme += sommeprixenfant4 + sommeprixenfant15;
        result.push(somme);
      }

      return result;
    },
    loggedIn() {
      return this.$store.getters.get_loggedIn;
    },

    user() {
      return this.$store.getters.get_user;
    },

    isDisabled: function () {
      return !this.terms;
    },

    prenom: {
      get() {
        return this.$store.state.prenom;
      },
      set(value) {
        this.$store.commit("updatePrenom", value);
      },
    },
    id: {
      get() {
        return this.$store.state.id;
      },
      set(value) {
        this.$store.commit("updateAgence", value);
      },
    },
  },

  methods: {
    save() {
      axios.post(
        `${apiDomain}/api/Verif_Save_dates_reserve/` + this.listes_dates,
        {
          hebergement_id: this.logement_id,
          client_id: this.$store.state.user.id,

          nbr_places_reserves: this.$route.query.nbr_places_reserves,
          places_disponibles: this.$route.query.places_disponibles,

          headers: {
            "content-type": "application/json",
          },
        }
      );
    },

    addReservation() {
      axios
        .post(`${apiDomain}/api/reservation/hebergement`, {
          du: this.du,
          au: this.au,
          point: 1000,
          type_paiement: "offline",
          validation: 1,
          paye: 1, //pas encore payé
          read: 0,
          hebergement_id: this.logement_id,
          client_id: this.$store.state.user.id,
          nbr_place: this.nbr_places,
          nb_adulte: this.nb_adultes,
          prix_total: this.$route.query.p_etnafes,
          nb_enfant4: this.nb_enfant4,
          nb_enfant15: this.nb_enfant15,
          headers: {
            "content-type": "application/json",
          },
        })
        .then((response) => {
          this.save();
          this.$noty.success("réservation offline ajouter avec Succès ! ");

          this.$router.push("/reservations-client");
          /* if (response.status == 200) {
            this.reservation = response.data;
            alert("réservation avec succés");
          } */
        })
        .catch((error) => {
          if (error.response && error.response.status == 400) {
            this.validationErrors = error.response.data;
          }
        });

      axios.post(`${apiDomain}/api/reservation/mail`, {
        mail: this.user.email,
      });

      /* for (var i = 0; i < this.arr.length; i++) {
      axios
        .post(`${apiDomain}/api/reservation/hebergement/save`, {         
          date: this.arr[i],
          hebergement_id: this.logement_id,
          client_id: this.$store.state.user.id,
          nbr_places_reserves: Number(this.nb_adulte) + Number(this.nb_enfant),  
          places_disponibles:
            this.hebergement.nbr_place_dispo -
            (Number(this.nb_adulte) + Number(this.nb_enfant)),
          headers: {
            "content-type": "application/json",
          },
        });
      }; */

      /* axios.post(
        `${apiDomain}/api/hebergement/place/${this.$route.params.id}`,
        {
          nbr_place_dispo:
            this.hebergement.nbr_place_dispo -
            (Number(this.nb_adulte) + Number(this.nb_enfant)),
        }
      ); */
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
    scrollToTop() {
      window.scrollTo(0, 0);
    },

    fetchClient(id) {
      fetch(`${apiDomain}/api/client/${id}?token=${this.$store.state.token}`)
        .then((res) => res.json())
        .then((res) => {
          this.client = res;
          this.ville = res.ville;
        })
        .catch((err) => console.log(err));
    },

    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
  },
};
</script>