<template>
  <div>
    <TopNavbarHome />

    <div class="container" style="margin-bottom: 70px">
      <!-- <button
        type="button"
        @click="hasHistory() 
    ? $router.go(-1) 
    : $router.push('/')"
        class="my-3 btn btn-outline-success"
      >
        &laquo;
        Retour
      </button>-->
      <div class="row">
        <div class="col-md-12" id="map" ref="map">
          <br class="d-none d-lg-block" />

          <gmap-map
            class="d-none d-lg-block"
            :center="center"
            :zoom="12"
            style="width: 100%; height: 720px"
          >
            <GmapMarker
              icon="/Etnafes-icon02.png"
              :position="markersh.position"
              @click="toggleInfoWindow(markersh)"
            ></GmapMarker>
            <gmap-info-window
              :options="infoOptions"
              :position="infoWindowPos"
              :opened="infoWinOpen"
              @closeclick="infoWinOpen = false"
            >
              <info-content :content="InfoDepanneur"></info-content>
            </gmap-info-window>
          </gmap-map>

          <gmap-map
            class="d-lg-none"
            :center="center"
            :zoom="12"
            style="width: 100%; height: 320px"
          >
            <GmapMarker
              icon="/Etnafes-icon01.png"
              :position="markersh.position"
              @click="toggleInfoWindow(markersh)"
            ></GmapMarker>
            <gmap-info-window
              :options="infoOptions"
              :position="infoWindowPos"
              :opened="infoWinOpen"
              @closeclick="infoWinOpen = false"
            >
              <info-content :content="InfoDepanneur"></info-content>
            </gmap-info-window>
          </gmap-map>
        </div>
      </div>
    </div>

    <Footer></Footer>
  </div>
</template>
<script>
import DateRangePicker from "vue2-daterange-picker";
//you need to import the CSS manually
import "vue2-daterange-picker/dist/vue2-daterange-picker.css";
import VuePassword from "vue-password";
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
import InfoDepanneur from "./InfoDepanneurZone.vue";
import VuePhoneNumberInput from "vue-phone-number-input";
import { Facebook } from "vue-socialmedia-share";
import SocialSharing from "vue-social-sharing";
import Vr360 from "vue-360vr";
import { IntegerPlusminus } from "vue-integer-plusminus";
import VueNumberInput from "@smartweb/vue-number-input";
import Vue from "vue";
export default {
  metaInfo: {
    title: "Home",
    meta: [
      {
        vmid: "description",
        name: "description",
        content: "This is a site to ...",
      },
    ],
  },
  metaInfo() {
    return {
      title: this.hebergement.nom,
      meta: [
        { name: "viewport", content: "user-scalable=no" },
        { property: "og:title", content: "title" },
        { property: "og:type", content: "article" },
        {
          property: "og:url",
          content: `https://etnafes.com/reservationhebergement/${this.$route.params.id}`,
        },
        { property: "og:description", content: "description" },
        {
          property: "og:image",
          content:
            "https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_hebergement/144119102423Jebel-Zaghouan-etnafes-voyage.jpg",
        },
        { property: "og:image:width", content: "1000" },
      ],
    };
  },
  components: {
    Facebook,
    Vr360,
    IntegerPlusminus,
    VuePassword,
    TopNavbarHome,
    VuePhoneNumberInput,
    Footer,
    VueperSlides,
    VueperSlide,
    "info-content": InfoDepanneur,
    "vue-number-input": VueNumberInput,
    MapMarker,
    MapInfoWindow,
    Datepicker,
    SocialSharing,
    DateRangePicker,
  },
  data() {
    let vv = new Date();
    //var startDate = new Date();
    // let endDate = new Date();
    var startDate = new Date(vv);
    startDate.setDate(vv.getDate() + 1);
    //  startDate.setDate(endDate.getDate() + 1);
    var endDate = new Date(vv);
    endDate.setDate(vv.getDate() + 2);

    /*  */

    /* let startDateToday = new Date();


       var endDate_t = new Date(startDateToday);
    startDate_t.setDate(startDateToday.getDate() + 1);

    var endDate_t = new Date(startDateToday);
    endDate_t.setDate(startDateToday.getDate() + 2); */

    /*  */

    return {
      off: false,
      calendarData: {},
      calendarConfigs: {
        sundayStart: false,
        dateFormat: "dd/mm/yyyy",
        isDatePicker: false,
        isDateRange: false,
      },
      dateRange: { startDate, endDate },

      dateHebergement: {
        startDate: startDate,
        endDate: endDate,
      },

      dateHebergementChambre: {
        startDate: startDate,
        endDate: endDate,
      },

      /*  dateHebergement: {
        startDate: "",
        endDate: "",
      }, */

      selectedDate: [
        //new Date(),
        // new Date(),
        //new Date(new Date().getTime() + 9 * 24 * 60 * 60 * 1000),
      ],
      chambre: [],
      chambres: [],
      verification_disponible: 0,
      verification_disponible_chambre: 0,

      msg_verif: "",
      res_najeh_moez: [],
      res_najeh_moez_chambre: [],

      url: `https://etnafes.com/reservationhebergement/${this.$route.params.id}`,
      avisheb: {},
      reservation_hebergement_dates: [],
      client: [],
      guide: [],
      adagence: [],

      proprietaire: [],
      proprestau: [],
      scrollPosition: null,
      token: null,
      showinscri: true,
      activeTabName: null,
      password: null,
      password_length: 0,
      contains_eight_characters: false,
      contains_number: false,
      contains_uppercase: false,
      contains_special_character: false,
      valid_password: false,
      villespays: {},
      pays_id: "",
      type: "password",
      btnText: "Show Password",
      defaultCountry: "TN",
      loadheb: false,
      avishebergement: {},
      nbcomheb: "",
      nuit: false,
      datedes: "",
      pays: {},
      pays_id: "",
      validationErrors: "",
      nom: "",
      email: "",
      telephone: "",
      password: "",
      error: "",
      civilité: "",
      ages: [],
      seen: false,
      seendep: false,

      arr: [],
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
      du: "",
      next: "",
      au: "",
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
      token: "",
      errorToken: null,
      tokenValid: false,
      places: [],
      currentPlace: null,

      login: false,
      entercode: false,
      nb_adulte: 1,
      nb_enfant15: 0,
      nb_enfant4: 0,
      nb_enfant: 0,

      nb_adultec: 1,
      nb_enfant15c: 0,
      nb_enfant4c: 0,
      nb_enfantc: 0,
      apiDomain: "https://etnafesapi20212018.etnafes.com",
      packsvedette: [],
      hebergements: {},
      hebergement: {},
      client: {},
      hebergeur: {},
      prop: {},

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

  filters: {
    dateCell(value) {
      let dt = new Date(value);

      return dt.getDate();
    },
    date(val) {
      return val ? val.toLocaleString() : "";
    },
  },
  created() {
    this.fetchLocations(this.$route.params.id);
    Bus.$on("markers_fetched", (data) => {
      this.markersh = data.markersh;
      this.center = data.markersh.position;
    });

    Bus.$on("marker_result_clicked", (index) => {
      let targetMarker = this.markersh;
      this.center = targetMarker.position;
      this.toggleInfoWindow(targetMarker, index);
    });
  },
  mounted() {
    /* update nb vu au pack */
    if (this.loggedIn) {
      let formData = new FormData();

      // this.article.article_id = article.id;
      formData.append("heb_id", this.$route.params.id);
      //ID de depanneur
      formData.append("user_id", this.$store.state.user.id),
        axios
          .post(`${apiDomain}/api/ajouter_compteur_vu`, formData, {
            body: JSON.stringify(this.annonce),
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })

          .then((res) => {})

          .catch((error) => {
            // console.log(error.response.data);
          });
    }
  },
  computed: {
    fetch_res_najeh_moez(id) {
      var tab = [];
      axios
        .get(
          `${apiDomain}/api/getDatesReservation_cl/${this.$route.params.id}/${this.calculIntervalDateRes_calender}`
        )
        // .then((res) => res.json())
        .then((res) => {
          tab = this.res_najeh_moez = res;
        });
      return tab;
    },

    fetch_res_najeh_moez_chambre(id) {
      var a = [];
      fetch(
        `${apiDomain}/api/getDatesReservation_clChambre/${this.$route.params.id}/${this.calculIntervalDateResChambre_calender}`
      )
        .then((res) => res.json())
        .then((res) => {
          a = this.res_najeh_moez_chambre = res;
        });
      return a;
    },
    convert_date_au_date_du() {
      if (this.convert_date_du === this.convert_date_au) {
        return (this.au = this.du.setDate(au.getDate() + 1));
      }
    },
    convert_date_du() {
      /*  if (this.dateHebergement.startDate != "") { */
      return (this.du = this.dateHebergement.startDate
        .toISOString()
        .split("T")[0]);
      /*  } */
    },

    convert_date_du_chambre() {
      return (this.du = this.dateHebergementChambre.startDate
        .toISOString()
        .split("T")[0]);
    },

    convert_date_au() {
      /*   if (this.dateHebergement.endDate != "") { */
      return (this.au = this.dateHebergement.endDate
        .toISOString()
        .split("T")[0]);
      /* } */
    },

    convert_date_au_chambre() {
      return (this.au = this.dateHebergementChambre.endDate
        .toISOString()
        .split("T")[0]);
    },
    nb_adulte_Moez() {
      return this.nb_adulte;
    },

    nb_enfant_Moez() {
      return this.nb_enfant;
    },
    nbr_places_total_Moez() {
      return Number(this.nb_adulte_Moez) + Number(this.nb_enfant_Moez);
    },

    nb_adulte_Moez_chambre() {
      return this.nb_adultec;
    },

    nb_enfant_Moez_chambre() {
      return this.nb_enfantc;
    },
    nbr_places_total_Moez_chambre() {
      return (
        Number(this.nb_adulte_Moez_chambre) +
        Number(this.nb_enfant_Moez_chambre)
      );
    },
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

    get_disponibilite_chambre() {
      const res_najeh_moez = this.res_najeh_moez_chambre;
      var result = [];
      const res = 0;
      for (var i = 0; i < res_najeh_moez.length; i++) {
        if (res_najeh_moez[i].length == 0) {
          var testt = this.chambre.nb_places;
          result.push(testt);
        }
        if (res_najeh_moez[i].length == 1) {
          var testtt = -1;
          result.push(testtt);
        }
      }
      return result;
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

    get_date_complet_chambre() {
      const res_najeh_moez = this.res_najeh_moez_chambre;
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
    verif_dipo() {
      const verif = this.get_disponibilite;
      var largest = Math.min.apply(Math, verif);
      return largest;
    },

    verif_dipo_chambre() {
      const verif = this.get_disponibilite_chambre;
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

      const before = this.beforeShowDay;
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
      }
      return (this.date_res = date_res);
    },

    calculIntervalDateResChambre_calender(du, au) {
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

      const before = this.beforeShowDay;
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
      }
      return (this.date_res = date_res);
    },

    ArrayDateReserves() {
      const reservation_hebergement_dates = this.reservation_hebergement_dates;
      var result = [];
      var somme = null;
      for (var i = 0; i < reservation_hebergement_dates.length; i++) {
        somme = reservation_hebergement_dates[i].date;
        result.push(somme);
      }
      return result;
    },

    ArrayNbDispoReserves() {
      const reservation_hebergement_dates = this.reservation_hebergement_dates;
      var result = [];
      var somme = null;
      for (var i = 0; i < reservation_hebergement_dates.length; i++) {
        somme = reservation_hebergement_dates[i].places_disponibles;
        result.push(somme);
      }
      return result;
    },

    /* *******  **** date fin rrserves************** */

    tel() {
      var t = this.client.telephone.replace(/ /g, "");
      return t;
    },
    calculPrix() {
      const hebergement = this.hebergement;
      const agestab = this.ages;
      var result = [];
      var somme = null;

      var sommeprixenfant4 = 0;
      var sommeprixenfant15 = 0;
      if (this.ages.length != 0) {
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
    loggedIn() {
      return this.$store.getters.get_loggedIn;
    },

    user() {
      return this.$store.getters.get_user;
    },

    /*   adultes: {
      get() {
        return this.$store.state.nb_adulte;
      },
      set(value) {
        this.$store.commit("updateNbAdulte", value);
      }
    }, */
    /*   enfants: {
      get() {
        return this.$store.state.nb_enfant;
      },
      set(value) {
        this.$store.commit("updateNbEnfant", value);
      }
    }, */
    beforeShowDay() {
      var dispo = this.hebergement.disponibilite;
      var des = [];
      if (dispo) {
        des = dispo.split(",").sort();
      }
      return des;
    },
  },
  methods: {
    dateFormatHebrgement(classes, date) {
      if (!classes.disabled) {
        classes.disabled = date.getTime() < new Date();
      }
      return classes;
    },
    verification() {
      // this.fetch_res_najeh_moez();
      if (this.verif_dipo >= 0) {
        /*  alert("disponible"); */
        return (this.verification_disponible = 1), (this.msg_verif = "");
      } else {
        /*    alert(" Non disponible"); */
        return (
          (this.verification_disponible = 0),
          (this.msg_verif = "Vous avez atteint la limite d’invitations")
        );
      }
    },

    verification_chambre() {
      if (this.verif_dipo_chambre >= 0) {
        return (
          (this.verification_disponible_chambre = 1), (this.msg_verif = "")
        );
      } else {
        return (
          (this.verification_disponible_chambre = 0),
          (this.msg_verif = "Vous avez atteint la limite d’invitations")
        );
      }
    },
    /*  fetch_res_najeh_moez(id) {
      fetch(
        `${apiDomain}/api/getDatesReservation_cl/${this.calculIntervalDateRes_calender}`
      )
        .then((res) => res.json())
        .then((res) => {
          this.res_najeh_moez = res;
        });
    }, */

    addAvisHebergement() {
      axios
        .post(`${apiDomain}/api/avis/hebergement`, {
          email: this.$store.state.user.email,
          commentaire: this.avisheb.commentaire,
          nbr_etoile: this.avisheb.nbr_etoile,
          hebergement_id: this.$route.params.id,
          client_id: this.$store.state.user.id,
          headers: {
            "content-type": "application/json",
          },
        })
        .then((response) => {
          if (response.status == 200) {
            if (confirm("avis bien reçu")) {
              window.location.reload();
            }
          }
        })
        .catch((error) => {
          if (error.response && error.response.status == 400) {
            this.validationErrors = error.response.data;
          }
        });
    },
    fetchagenceadmin(id) {
      fetch(`${apiDomain}/api/agencead/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.adagence = res.adagence;
        });
      // .catch(err => console.log(err));
    },
    fetchguide(id) {
      fetch(`${apiDomain}/api/guide/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.guide = res.guide;
        });
      // .catch(err => console.log(err));
    },
    fetchproprestau(id) {
      fetch(`${apiDomain}/api/proprietaire_restau/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.proprestau = res.proprietaire;
        });
      // .catch(err => console.log(err));
    },
    fetchproprietaire(id) {
      fetch(`${apiDomain}/api/prop/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.proprietaire = res.proprietaire;
        });
      // .catch(err => console.log(err));
    },

    fetchclient(id) {
      fetch(`${apiDomain}/api/client/${id}?token=${this.$store.state.token}`)
        .then((res) => res.json())
        .then((res) => {
          this.client = res;
        });
      // .catch(err => console.log(err));
    },
    fetchLocations(id) {
      axios
        .post(`${apiDomain}/api/findZone/${id}`, { center: this.center })
        .then((response) => {
          let data = response.data;
          Bus.$emit("markers_fetched", data);
        });
    },
    checkPassword() {
      this.password_length = this.password.length;
      const format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

      if (this.password_length >= 8) {
        this.contains_eight_characters = true;
      } else {
        this.contains_eight_characters = false;
      }

      this.contains_number = /\d/.test(this.password);
      this.contains_uppercase = /[A-Z]/.test(this.password);
      this.contains_special_character = format.test(this.password);

      if (
        this.contains_eight_characters === true &&
        this.contains_special_character === true &&
        this.contains_uppercase === true &&
        this.contains_number === true
      ) {
        this.valid_password = true;
      } else {
        this.valid_password = false;
      }
    },
    fetchPays() {
      axios.get(`${apiDomain}/api/pays`).then(({ data }) => (this.pays = data));
    },
    fetchVillesPays(id) {
      axios
        .get(`${apiDomain}/api/pays/villes/${id}`)
        .then(({ data }) => (this.villespays = data.villes));
    },
    showPassword() {
      if (this.type === "password") {
        this.type = "text";
        this.btnText = "Hide Password";
      } else {
        this.type = "password";
        this.btnText = "Show Password";
      }
    },
    removeAge: function (index) {
      Vue.delete(this.ages, index);
      this.nb_enfant = this.nb_enfant - 1;
    },
    fetchAllAvisHebergement(id) {
      this.loadheb = true;
      axios
        .get(`${apiDomain}/api/avishebergement/all/${id}`)
        .then(
          ({ data }) => (
            (this.avishebergement = data.hebergement), (this.loadheb = false)
          )
        );
    },
    validateCode() {
      this.errorToken = null;
      if (!this.client.code) {
        this.errorToken = "code est obligatoire";
      }

      if (!this.errorToken) {
        const data = {
          code: this.client.code,
        };
        this.login = false;
        axios
          .post(`${apiDomain}/api/verify`, data)
          .then((response) => {
            if (response.data.id) {
              this.login = true;
              this.tokenValid = true;
              this.user = response.data;
            }
          })
          .catch((error) => {
            this.errorToken = "error invalid";
          });
      }

      axios.post(`${apiDomain}/api/form/mail`, {
        mail: this.client.email,
      });
    },
    performLogin() {
      this.isLoading = true;
      this.$store
        .dispatch("performLoginClientAction", {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          this.isLoading = false;
          console.log("test najeh moez");
          if (this.hebergement.type == "par chambre") {
            this.$router.push({
              name: "ReservationHebergement",
              params: { id: this.$route.params.id },
              query: {
                du: this.convert_date_du_chambre,
                au: this.convert_date_au_chambre,
                nb_adulte: this.chambre.nb_places,
                nb_places_chambre: this.chambre.nb_places,
                chambre: this.chambre.nom,
                chambreid: this.chambre.id,

                arr: this.calculIntervalDateResChambre_calender,
              },
            });
          } else if (this.hebergement.type == "par personne") {
            this.$router.push({
              name: "ReservationHebergement",
              params: { id: this.$route.params.id },
              query: {
                du: this.du,
                au: this.au,
                nb_adulte: this.nb_adulte,
                nb_enfant: this.nb_enfant,
                nb_enfant15: this.nb_enfant15,
                nb_enfant4: this.nb_enfant4,

                ages: this.ages,
                arr: this.calculIntervalDateRes_calender,
              },
            });
          }
        })
        .catch((err) => {
          this.error =
            "L’e-mail entré ne correspond à aucun compte. Veuillez créer un compte.";
          // console.log(err.message);
        });

      axios.post(`${apiDomain}/api/login/mail`, {
        mail: this.email,
      });
    },
    onChange(v) {
      console.log("onChange ", v);
    },
    onComplete(v) {
      console.log("onComplete ", v);
    },

    addClient() {
      this.entercode = false;
      this.loadingInscription = true;
      this.errors = [];
      this.$store
        .dispatch("performRegisterClientAction", {
          nom: this.client.nom,
          prenom: this.client.prenom,
          telephone: this.client.telephone.split(" ").join(""),
          email: this.client.email,
          // login: this.client.login,
          ville_id: this.client.ville_id,
          /* civilité: this.civilité,
          gouvernorat: this.gouvernorat, */
          // agence_id: this.agence_id,
          password: this.password,
        })
        .then((res) => {
          this.loadingInscription = false;
          this.$noty.success("veuillez vérifier votre compte.");

          if (this.hebergement.type == "par chambre") {
            this.$router.push({
              name: "client",
              params: { id: this.$route.params.id },
              query: {
                du: this.convert_date_du_chambre,
                au: this.convert_date_au_chambre,
                nb_adulte: this.chambre.nb_places,
                nb_places_chambre: this.chambre.nb_places,
                chambre: this.chambre.nom,
                chambreid: this.chambre.id,
                type: this.hebergement.type,

                arr: this.calculIntervalDateResChambre_calender,
              },
            });
          } else if (this.hebergement.type == "par personne") {
            this.$router.push({
              name: "client",
              params: { id: this.$route.params.id },
              query: {
                du: this.du,
                au: this.au,
                nb_adulte: this.nb_adulte,
                nb_enfant: this.nb_enfant,
                nb_enfant15: this.nb_enfant15,
                nb_enfant4: this.nb_enfant4,
                type: this.hebergement.type,

                ages: this.ages,
                arr: this.calculIntervalDateRes_calender,
              },
            });
          }
        })
        .catch((error) => {
          this.loadingInscription = false;
          if (error.response && error.response.status == 400) {
            this.$noty.error(
              " OOPS !  error sur votre demande d'inscription ! "
            );
            this.validationErrors = error.response.data;
          }
        });
    },

    addClient__() {
      this.entercode = false;
      axios
        .post(`${apiDomain}/api/register/client`, {
          nom: this.client.nom,
          prenom: this.client.prenom,
          ville_id: this.client.ville_id,

          telephone: this.tel,
          email: this.client.email,
          civilité: this.civilité,
          password: this.password,

          gouvernorat: this.gouvernorat,
          agence_id: this.agence_id,
          headers: {
            "content-type": "application/json",
          },
        })
        .then((response) => {
          if (response.status == 201) {
            this.showinscri = false;
          }
        })
        .catch((error) => {
          if (error.response && error.response.status == 400) {
            this.validationErrors = error.response.data;
          }
        });
    },
    addReservation() {
      axios
        .post(`${apiDomain}/api/reservation/hebergement`, {
          du: this.du,
          au: this.au,
          paye: 0,
          hebergement_id: this.$route.params.id,
          client_id: this.$store.state.user.id,
          prix_remise: this.prix_remise,
          nbr_place: Number(this.nb_adulte) + Number(this.nb_enfant),
          nb_adulte: this.nb_adulte,

          prix_total:
            (this.nb_adulte * this.hebergement.prix_adulte +
              this.calculPrix[0]) *
            (this.calculIntervalDateRes_calender.length - 1),
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
    },

    addReservationChambre() {
      axios
        .post(`${apiDomain}/api/reservation/hebergement/chambre`, {
          du: this.du,
          au: this.au,
          paye: 0,
          hebergement_id: this.$route.params.id,
          client_id: this.$store.state.user.id,
          prix_remise: this.prix_remise,
          nbr_place: Number(this.nb_adultec) + Number(this.nb_enfantc),
          nb_adulte: this.nb_adultec,

          prix_total:
            (this.nb_adultec * this.hebergement.prix_adulte +
              this.calculPrix[0]) *
            (this.calculIntervalDateResChambre_calender.length - 1),
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
    },
    test() {
      const interval = this.beforeShowDay;
      var du = new Date(this.du);
      var month = du.getUTCMonth() + 1;
      var d = du.getUTCDate() + 1;
      var day = ("0" + d).slice(-2);
      var year = du.getUTCFullYear();

      var nextDay = du.getUTCDate() + 1;
      var nextDD = ("0" + nextDay).slice(-2);
      var nextDate = year + "-" + month + "-" + nextDD;

      this.next = nextDate;
      var result = [];
      var somme = null;
      if (interval.includes(this.next)) {
        this.seendep = false;
        this.nuit = true;
      } else {
        this.seendep = true;
        this.nuit = false;
        if (this.interval != undefined) {
          if (this.next != interval[i]) {
            for (var i = 0; i < interval.length; i++) {
              if (this.next < interval[i]) {
                this.datedes = interval[i];
                break;
              }
            }
          }
        }
      }
    },

    /* fetchPays() {
      axios.get(`${apiDomain}/api/pays`).then(({ data }) => (this.pays = data));
    }, */
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
      const interval = this.beforeShowDay;
      var m = date.getUTCMonth() + 1;
      var d = date.getUTCDate() + 1;
      var day = ("0" + d).slice(-2);
      var month = ("0" + m).slice(-2);
      var year = date.getUTCFullYear();

      var newdate = year + "-" + month + "-" + day;

      var du = new Date(newdate);
      var nextDay = du.getUTCDate() + 1;
      var nextDD = ("0" + nextDay).slice(-2);
      var nextDate = year + "-" + month + "-" + nextDD;

      var prevDay = du.getUTCDate() - 1;
      var prevDD = ("0" + prevDay).slice(-2);
      var prevDate = year + "-" + month + "-" + prevDD;

      /* console.log(nextDate);
      console.log(prevDate); */

      for (var i = 0; i < interval.length; i++) {
        if (newdate == interval[i]) {
          return true;
        }
      }

      if (interval.includes(nextDate) && interval.includes(prevDate)) {
        return true;
      }
    },

    dateDisabledDep(dmy, date) {
      const interval = this.beforeShowDay;
      var month = date.getUTCMonth() + 1;
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
    },

    customFormatter(date) {
      return (this.interval = moment(date).format("YYYY-mm-dd"));
    },

    calculIn(du, date) {
      const interval = this.beforeShowDay;

      var month = date.getUTCMonth() + 1;
      var d = date.getUTCDate() + 1;
      var day = ("0" + d).slice(-2);
      var year = date.getUTCFullYear();

      var newdate = day + "-" + month + "-" + year;

      var du = new Date(this.du);

      var nextDay = du.getUTCDate() + 1;
      var nextDate = nextDay + "-" + month + "-" + year;

      // console.log(nextDate);
      for (var i = 0; i < interval.length; i++) {
        if (du != interval[i] && nextDate == interval[i]) {
          return true;
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
        var month = arr[l].getUTCMonth() + 1;
        var day = arr[l].getUTCDate();
        var year = arr[l].getUTCFullYear();
        arr[l] = day + "-" + month + "-" + year;
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
    testdispo() {
      var range = this.getDates(new Date(this.du), new Date(this.au));
      const before = this.beforeShowDay;
      for (var j = 0; j < range.length; j++) {
        for (var k = 0; k < before.length; j++) {
          if (range[j] == before[k]) {
            alert("Imposible");
          }
        }
      }
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

      if (this.currentMidx == idx) {
        this.infoWinOpen = !this.infoWinOpen;
      } else {
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

    fetchHebergementDateRes(id) {
      fetch(`${apiDomain}/api/dateReserve/${id}`)
        .then((res) => res.json())
        .then((res) => {
          // this.hebergement = res.hebergement;
          this.reservation_hebergement_dates =
            res.hebergement.reservation_hebergement_dates;
        });
    },

    fetchHebergement(id) {
      fetch(`${apiDomain}/api/hebergement/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.hebergement = res.hebergement;
          this.chambres = res.hebergement.chambres;

          this.prop = res.hebergement.proprietaire;

          this.hebergeur = res.hebergement.proprietaire.client;

          this.imagehebergements = res.hebergement.images_hebergement;
        });
      // .catch(err => console.log(err));

      axios
        .get(`${apiDomain}/api/avishebergement/${id}`)
        .then(
          ({ data }) => (
            (this.avishebergement = data.hebergement),
            (this.nbcomheb = data.nbcomheb)
          )
        );
    },

    fetchChambre(id) {
      fetch(`${apiDomain}/api/chambre/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.chambre = res.chambre;
        });
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
.vue-numeric-input {
  position: relative;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  /* height: 2.8rem; */
  width: 81px !important;
}
/* Dropdown Button */
.dropbtn {
  background-color: #3b5998;
  color: white;
  padding: 10px;
  font-size: 16px;
  border: none;
}

.vrButton {
  padding: 0.1em !important;
}
.componentContainer {
  min-width: 30vw !important;
  min-height: 35vh !important;
}

.myCanvas {
  position: absolute;
  left: 0;
  z-index: 0;
  width: 80%;
  height: 0%;
  -ms-touch-action: none;
  touch-action: none;
  cursor: -webkit-grab;
  cursor: grab;
}

/* .vue-daterange-picker {
    position: relative;
    display: inline-block;
    min-width: 26px;
    max-width: 105px;
} */

.reportrange-text {
  background: #fff;
  cursor: pointer;
  padding: 5px 10px;
  border: 1px solid #ccc;
  width: 100%;
  overflow: hidden;
  line-height: 18px;
}

.daterangepicker.openscenter {
  right: auto;
  left: 0 !important;
}
</style>



