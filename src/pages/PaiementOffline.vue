<template>
  <div>
    <TopNavbarHome />
    <div v-if="reserver == false">
      <div class="container container_off_line">
        <b-card no-body class="card_off_line">
          <div class="row">
            <!--    <div class="col-md-6">
            <b-carousel
              id="carousel-PAgence222"
              v-model="slide"
              :interval="4000"
              controls
              indicators
              background="transparent"
              img-width="1024"
              img-height="480"
              style="text-shadow: 1px 1px 2px #333; margin-top: 30px"
              @sliding-start="onSlideStart"
              @sliding-end="onSlideEnd"
            >
              
              <div v-for="(zone, i) in pack.zone_pack" v-bind:key="i">
                <b-carousel-slide
                  v-for="(image, k) in zone.zone_touristique.image"
                  v-bind:key="k"
                  :img-src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_zones/${image.url_image}`"
                  style="height: 60%"
                >
                  <h1
                    style="background-color: rgba(0, 0, 0, 0.3); padding: 10px"
                  >
                    {{ zone.zone_touristique.nom }}
                  </h1>
                </b-carousel-slide>
              </div>
            </b-carousel>
          </div> -->
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
                    {{ pack.titre }}
                  </p>
                </div>

                <div class="col-md-6 d-none d-lg-block">
                  <b-button
                    v-if="verif == false"
                    @click="reservation_off_line(user.id, client)"
                    >Réservez</b-button
                  >&nbsp;
                  <b-button v-if="verif == true">Imprimez</b-button>&nbsp;
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
                Date de départ : {{ this.$route.query.agence_id }}
                {{ pack.date_deb }}
              </b-card-text>
              <hr style="margin-top: 0.1rem" />
              <b-card-text style="color: #000">
                Ville de départ :
                {{ pack.adresse }}
              </b-card-text>
              <hr style="margin-top: 0.1rem" />
              <b-card-text style="color: #000">
                Durée :
                {{ pack.time }}
              </b-card-text>
              <hr style="margin-top: 0.1rem" />
              <b-card-text style="color: #000" v-if="pack.date_fin != 'null'">
                Date de retour :
                {{ pack.date_fin }}
              </b-card-text>

              <hr style="margin-top: 0.1rem" v-if="pack.date_fin != 'null'" />
              <b-card-text style="color: #000"
                >{{ nb_adulte }} Adulte(s)</b-card-text
              >
              <hr />

              <h4 style="color: #333" v-if="agestab != undefined">
                >> Prix total :
                {{ Number(nb_adulte) * pack.prix_fix + calcul[0] }}dt
              </h4>

              <h4 style="color: #333" v-else>
                >> Prix total :
                {{ Number(nb_adulte) * pack.prix_fix }}dt
              </h4>
              <p>
                <span style="font-weight: bold">Notre bureau :&nbsp;</span>
                <span>20, rue al azhar ben Mounafedh,Mansoura Kairouan</span>
              </p>
              <p>
                <span style="font-weight: bold">Telephone :&nbsp;</span>
                <span>Pour plus d'information contacter 22225951</span>
              </p>
            </div>
          </div>
        </b-card>
        <br />

        <div class="row" id="printMe" v-if="agence_id != null">
          <div class="col-md-12">
            <b-card
              no-body
              style="padding: 20px; border: groove rgba(0, 0, 0, 0.25) 1px"
            >
              <center>
                <a href="/">
                  <img
                    loading="lazy"
                    src="/images/logo-etnafes-couleur.png"
                    width="25%"
                    style="padding-bottom: 10px"
                  />
                </a>
              </center>
              <p>Cher(e) {{ this.$store.state.user.prenom }}</p>
              <p>
                Vous avez choisi de payer l'acompte de ... en espéce à l'agence
                <span style="font-weight: bold">{{ agence.nom_agence }}</span>
                située à {{ agence.gouvernorat }}
                Nous vous invitons à vous rendre à l'agence afin de valider
                votre réservation au plus vite.
              </p>

              <div
                style="
                  border: 1px solid;
                  padding: 20px;
                  margin-bottom: 20px;
                  margin-top: 20px;
                "
              >
                <span style="font-weight: bold; line-height: 40px">{{
                  agence.nom_agence
                }}</span>
                <br />
                {{ agence.adresse }} , {{ agence.gouvernorat }}
                <br />
                <br />
                Telephone : {{ agence.telephone }}
              </div>

              <div>
                <b-card-text style="color: #000">
                  {{ pack.titre }} -- Date de départ : {{ pack.date_deb }} --
                  Date de retour : {{ pack.date_fin }} --
                  {{ nb_adulte }} Adulte(s) -- {{ nb_enfant }} Enfant(s) --
                  Montant total : {{ this.prixPack }}dt
                </b-card-text>
              </div>
            </b-card>
          </div>
        </div>

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
            class="btn btn-info btn-block"
            v-if="verif == false"
            @click="reservation_off_line(user.id, client)"
            >Réservez</b-button
          >&nbsp; <b-button v-if="verif == true">Imprimez</b-button>&nbsp;
        </div>
      </div>
    </div>
    <div v-if="reserver == true">
      <div class="container container_off_line">
        <b-card style="background: #00bf9a" no-body class="card_off_line">
          <b-alert style="line-height: 32px" show variant="success">
            <span style="color: #222a42">{{ user.nom }} {{ user.prenom }}</span>
            ,Votre réservation a été validée avec succès ! 😊😊
            <br />
            Vous n'êtes qu'à un pas de gagner
            <span style="color: #222a42">1000 points bonus</span> dans votre
            système de points. Pour confirmer votre réservation, veuillez
            effectuer votre paiement dans un délai de 48 heures. Auprès de notre
            bureau :
            <span style="color: #222a42"
              >20, rue al Azhar Ben Nounafedh Mansoura Kairouan.</span
            ><br />
            Si vous annulez votre réservation, des frais de service seront
            facturés pour le montant total.
          </b-alert>
        </b-card>

        <!--  <b-button v-print="'#printMe'">Imprimez</b-button> -->
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
      verif: false,
      ville: {},
      reserver: false,
      paysshow: false,
      agenceshow: false,
      client: [],
      ages: [],
      agestab: this.$route.query.ages ? this.$route.query.ages : [],
      villespays: {},
      nbr_place: this.$route.query.nb_adulte,
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
      nbenfant4: "",
      nbenfant15: "",

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
    this.fetchClient(this.$store.state.user.id);
    this.fetchPacks(this.$route.params.id);

    this.fetchPays();
    this.fetchAgences();
  },

  computed: {
    prixPack() {
      if (this.calcul.length != 0) {
        var prixPack =
          Number(this.nb_adulte) * this.pack.prix_fix + this.calcul[0];
      } else {
        var prixPack = Number(this.nb_adulte) * this.pack.prix_fix;
      }

      return prixPack;
    },

    prixLogement() {
      if (this.hebergement_pack.length > 0) {
        if (this.calculPrix.length != 0) {
          var prixLogement =
            (Number(this.nb_adulte) * this.hebergement.prix_adulte +
              this.calculPrix[0]) *
            (this.calculInterval.length - 1);
        } else {
          var prixLogement =
            Number(this.nb_adulte) *
            this.hebergement.prix_adulte *
            (this.calculInterval.length - 1);
        }

        return prixLogement;
      } else return 0;
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
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    fetchAgence(id) {
      fetch(`${apiDomain}/api/agences/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.agencee = res.agencedetail;
        })
        .catch((err) => console.log(err));
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
    removeAge: function (index) {
      Vue.delete(this.agestab, index);
      this.nb_enfant = this.nb_enfant - 1;
    },
    addNewAge: function () {
      this.ages.push(Vue.util.extend({}, this.age));
    },
    updateNbAdulte(e) {
      this.$store.commit("updateNbAdulte", e.target.value);
    },

    updateNbEnfant(e) {
      this.seen = true;
      // if (this.nb_enfant == this.agestab.length) {
      this.$store.commit("updateNbEnfant", e.target.value);
    },

    fetchPays() {
      axios.get(`${apiDomain}/api/pays`).then(({ data }) => (this.pays = data));
    },
    fetchVillesPays(id) {
      axios
        .get(`${apiDomain}/api/pays/villes/${id}`)
        .then(({ data }) => (this.villespays = data.villes));
    },
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },

    fetchAgencesid(id) {
      axios
        .get(`${apiDomain}/api/agences/${id}`)
        .then(({ data }) => (this.agence = data.agencedetail));
    },
    fetchAgences() {
      axios
        .get(`${apiDomain}/api/agences`)
        .then(({ data }) => (this.agences = data));
    },
    updatePrenom(e) {
      this.$store.commit("updatePrenom", e.target.value);
    },

    updateAgence(e) {
      this.$store.commit("updateAgence", e.target.value);
      axios
        .get(`${apiDomain}/api/agences/${this.$store.state.id}`)
        .then(({ data }) => (this.agence = data.agencedetail));
    },

    fetchPacks(id) {
      axios
        .get(`${apiDomain}/api/packs/${id}`)
        .then(
          ({ data }) => (
            (this.pack = data.packdetail),
            (this.hebergement_pack = data.packdetail.hebergement_pack)
          )
        );
    },

    reservation_off_line(id, client) {
      this.verif = false;
      this.reserver = false;
      if (this.calcul.length != 0) {
        this.prix_total = this.nb_adulte * this.pack.prix_fix + this.calcul[0];

        this.prix_pack = this.nb_adulte * this.pack.prix_fix + this.calcul[0];
      } else if (this.calcul.length == 0) {
        this.prix_total = this.nb_adulte * this.pack.prix_fix;
        this.prix_pack = this.nb_adulte * this.pack.prix_fix;
      }

      axios
        .put(`${apiDomain}/api/reservation_off_line/${id}`, {
          date: new Date().toJSON().slice(0, 10).replace(/-/g, "/"),
          nom: this.user.nom,
          prenom: this.user.prenom,
          telephone: this.user.telephone,
          email: this.user.email,
          civilité: this.user.civilité,
          gouvernorat: this.gouvernorat,

          agence_id: this.$route.query.agence_id,

          ville_id: this.client.ville_id,
          client_id: this.client.id,

          nbr_place: this.nbr_place,
          prix_total: this.prix_total,
          prix_pack: this.prix_pack,
          // prix_logement: this.prix_logement,
          prix_logement: 0,

          type_paiement: "offline",
          point: 1000,
          validation: 1,

          nb_adulte: this.$route.query.nb_adulte,
          nb_enfant: this.$route.query.nb_enfant,
          nb_enfant4: this.calculage[0],
          nb_enfant15: this.calculage[1],

          prix_remise: this.pack.taux_remise,
          paye: 1, //pas en core paye
          pack_id: this.$route.params.id,
          hebergement_id: this.hebergement_id,

          headers: {
            "content-type": "application/json",
          },
        })

        .then((res) => {
          this.verif = true;
          this.reserver = true;
          if (res.status == 200) {
            this.$fire({
              // title: "Votre profil a été modifié avec succés",
              text: "Votre réservation est passée avec succés!Veuillez retournez à notre breau pour le paiement",
              type: "success",
              timer: 90000,
            }).then((r) => {
              /*  this.$router.push({
                name: "ClientReservation",
              }); */
            });
          }
        })

        .catch((error) => {
          this.verif = false;
          this.reserver = false;

          if (error.response && error.response.status == 422) {
            this.validationErrors = error.response.data.errors;
          }
        });
    },

    addClient() {
      axios
        .post(`${apiDomain}/api/storeClient`, {
          nom: this.nom,
          prenom: this.prenom,
          telephone: this.telephone,
          email: this.email,
          civilité: this.civilité,
          gouvernorat: this.gouvernorat,
          agence_id: this.agence_id,
          headers: {
            "content-type": "application/json",
          },
        })
        .then(function (response) {
          if (response.status == 200) {
            alert("Veuillez joindre l'agence pour le paiement");
          }
        })
        .catch((error) => {
          if (error.response && error.response.status == 422) {
            this.validationErrors = error.response.data.errors;
          }
        });
    },
  },
};
</script>