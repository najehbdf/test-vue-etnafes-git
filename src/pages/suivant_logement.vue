<template>
  <div>
    <TopNavbarHome />

    <div class="container">
      <b-alert
        v-if="data_ste3.payment_status == true"
        :show="dismissCountDown"
        dismissible
        variant="success"
        @dismissed="dismissCountDown = 0"
        @dismiss-count-down="countDownChanged"
      >
        <h4>Votre paiement est passée avec succès</h4>
        <h5>
          Cette notification va disparaître dans
          {{ dismissCountDown }} seconds...
        </h5>
        <b-progress
          variant="light"
          :max="dismissSecs"
          :value="dismissCountDown"
          height="4px"
        ></b-progress>
      </b-alert>

      <b-alert
        v-else
        :show="dismissCountDown"
        dismissible
        variant="danger"
        @dismissed="dismissCountDown = 0"
        @dismiss-count-down="countDownChanged"
      >
        <h4>Votre paiement a échoué</h4>
        <h5>
          Cette notification va disparaître dans
          {{ dismissCountDown }} seconds...
        </h5>
        <b-progress
          variant="light"
          :max="dismissSecs"
          :value="dismissCountDown"
          height="4px"
        ></b-progress>
      </b-alert>

      <div class="row" id="printMe" v-if="data_ste3.payment_status == true">
        <div class="col-md-12">
          <b-card
            no-body
            style="padding: 20px; border: groove rgba(0, 0, 0, 0.25) 1px"
          >
            <center>
              <a href="/">
                <img loading="lazy"
                  src="/images/logo-etnafes-couleur.png"
                  width="25%"
                  style="padding-bottom: 10px"
                />
              </a>
            </center>
            <p>
              Cher(e) {{ this.$store.state.user.prenom }} notre equipe ETNAFES
              vous remerciez de votre réseravation .
            </p>
            <h4>Code de réservation :{{ reservation.code }}</h4>
            <div class="row">
              <div class="col-md-4 pr-md-1 text-left">
                <base-input
                  disabled
                  label="Nom et prenom"
                  v-model="user.nom + ' ' + user.prenom"
                ></base-input>
              </div>
              <div class="col-md-4">
                <base-input
                  disabled
                  label="Date"
                  :value="currentDate"
                ></base-input>
              </div>
              <div class="col-md-4">
                <base-input
                  disabled
                  label="Nom d'hebergement"
                  v-model="nom_hebergement"
                ></base-input>
              </div>
            </div>

            <div class="row">
              <div class="col-md-4 pr-md-1 text-left">
                <base-input
                  style="border-radius: 16px !important"
                  disabled
                  label="Du"
                  v-model="du"
                ></base-input>
              </div>
              <div class="col-md-4">
                <base-input disabled label="Au" v-model="au"></base-input>
              </div>
              <div class="col-md-4">
                <base-input
                  disabled
                  label="Montant Total"
                  v-model="this.data_ste3.amount.toFixed(3)"
                ></base-input>
              </div>
            </div>

            <div class="row">
              <div class="col-md-4 pr-md-1 text-left">
                <base-input
                  disabled
                  label="Nombre(s) adulte(s)"
                  v-model="nb_adulte"
                ></base-input>
              </div>
              <div class="col-md-4">
                <base-input
                  disabled
                  label="Nombre(s) enfant(s)"
                  v-model="nb_enfant"
                ></base-input>
              </div>
              <div class="col-md-4">
                <base-input
                  disabled
                  label="Nombre(s) de place(s)"
                  v-model="nbr_place"
                ></base-input>
              </div>
            </div>

            <div>
              <b-card-text style="color: #000">
                {{ pack.titre }} -- Date de départ : {{ pack.date_deb }} -- Date
                de retour : {{ pack.date_fin }} -- {{ nb_adulte }} Adulte(s) --
                {{ nb_enfant }} Enfant(s) -- Montant total :
                {{ this.data_ste3.amount }} 000 dt
              </b-card-text>
            </div>
            <center>
              <b-button-group class="d-none d-lg-block" style="padding: 9px">
                <button
                  @click="$router.go(-1)"
                  style="width: 153px"
                  type="button"
                  class="btn btn-danger btn1"
                >
                  Retour
                </button>

                <a
                  :href="
                    'https://etnafesapi20212018.etnafes.com/api/dynamic_pdf/pdfLibre/' +
                    reservation.id +
                    '?token=' +
                    this.$store.state.token
                  "
                  target="_blank"
                  style="background-color: transparent !important"
                >
                  <!-- <button class="btn btn-danger" style="margin-bottom:20px">Imprimez</button> -->
                  <button
                    style="width: 153px; margin-left: 20px"
                    type="button"
                    class="btn btn-success btn1"
                  >
                    Imprimer
                  </button>
                </a>
                <!-- <button
                  style="width: 153px;    margin-left: 20px;"
                  type="button"
                  class="btn btn-success btn1"
                >Imprimer</button> -->
              </b-button-group>

              <div class="d-lg-none" style="padding: 9px">
                <a>
                  <button
                    @click="$router.go(-1)"
                    style="width: 153px; margin-left: -210px"
                    type="button"
                    class="btn btn-danger btn1"
                  >
                    Retour
                  </button>
                </a>
                <br />
                <a
                  :href="
                    'https://etnafesapi20212018.etnafes.com/api/dynamic_pdf/pdfLibre/' +
                    reservation.id +
                    '?token=' +
                    this.$store.state.token
                  "
                  target="_blank"
                  style="background-color: transparent !important"
                >
                  <!-- <button class="btn btn-danger" style="margin-bottom:20px">Imprimez</button> -->
                  <button
                    style="width: 153px; margin-left: -207px"
                    type="button"
                    class="btn btn-success btn1"
                  >
                    Imprimer
                  </button>
                </a>
              </div>
            </center>
          </b-card>
        </div>
      </div>
      <!-- <b-button variant="info" class="m-1">Show alert with count-down timer</b-button> -->
    </div>

    <Footer></Footer>
  </div>
</template>

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
  props: {},

  data() {
    return {
      type: localStorage.getItem("type", this.type),

      logement_id: localStorage.getItem("logement_id", this.logement_id),
      chambre_id: localStorage.getItem("chambre_id ", this.chambre_id),
      nom_hebergement: localStorage.getItem(
        "nom_hebergement",
        this.nom_hebergement
      ),
      //nb_adultes: localStorage.getItem("nb_adultes", this.nb_adultes),
      nb_enfant4: localStorage.getItem("nb_enfant4", this.nb_enfant4),
      nb_enfant15: localStorage.getItem("nb_enfant15", this.nb_enfant15),

      du: localStorage.getItem("du", this.du),
      au: localStorage.getItem("au", this.au),

      prix_logement: localStorage.getItem("prix_logement", this.prix_logement),

      listes_dates: localStorage.getItem("arr", this.arr),

      nb_enfants: localStorage.getItem("nb_enfants", this.nb_enfant_Moez),
      nb_adultes: localStorage.getItem("nb_adultes", this.nb_adulte_Moez),

      nbr_places_dispo: localStorage.getItem(
        "nbr_places_dispo_Moez",
        this.nbr_places_dispo_Moez
      ),
      nbr_places_total: localStorage.getItem(
        "nbr_places_total_Moez",
        this.nbr_places_total_Moez
      ),

      frais: localStorage.getItem("frais", this.frais),

      type_paiement: "en ligne",
      reservation: [],
      agestab: 0,
      prix_total: "",
      prix_pack: "",
      // nb_adulte: this.$store.state.nb_adulte,
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
      dismissSecs: 30,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      //payemee
      data_ste3: {},
      url_frame: "",
      token_client: localStorage.getItem("token_client"),
    };
  },
  created() {
    this.fetchPacks(localStorage.getItem("pack_id", this.$route.params.id));
    this.fetchSte3();
    this.dismissCountDown = this.dismissSecs;
    // this.save();
  },

  computed: {
    currentDate() {
      const current = new Date();
      const date = `${current.getDate()}/${
        current.getMonth() + 1
      }/${current.getFullYear()}`;
      return date;
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
    /*  showAlert() {
      return (this.dismissCountDown = this.dismissSecs);
    }, */
    loggedIn() {
      return this.$store.getters.get_loggedIn;
    },

    user() {
      return this.$store.getters.get_user;
    },
  },

  /* mounted() {
    axios
      .put(`${apiDomain}/api/client/${this.$store.state.user.id}`, {
        date: new Date()
          .toJSON()
          .slice(0, 10)
          .replace(/-/g, "/"),
        nom: this.user.nom,
        prenom: this.user.prenom,
        telephone: this.user.telephone,
        email: this.user.email,
        civilité: this.user.civilité,
        gouvernorat: this.gouvernorat,
        ville_id: 232,
        nbr_place:
          Number(this.$store.state.nb_adulte) +
          Number(this.$store.state.nb_enfant),
        prix_total: 10.0,
        prix_pack: 10.0,
        prix_logement: 0,

        nb_adulte: this.$store.state.nb_adulte,
        nb_enfant: this.$store.state.nb_enfant,
        nb_enfant4: this.calculage[0],
        nb_enfant15: this.calculage[1],

        prix_remise: this.pack.taux_remise,
        paye: 1,
        pack_id: localStorage.getItem("pack_id", this.$route.params.id),
  
        headers: {
          "content-type": "application/json"
        }
      })

      .then(res => {
       
      })

      .catch(error => {
        if (error.response && error.response.status == 422) {
          this.validationErrors = error.response.data.errors;
        }
      });
  }, */

  methods: {
    save_date_chambre() {
      axios.post(
        `${apiDomain}/api/Verif_Save_dates_reserve_chambre/` +
          this.listes_dates,
        {
          /* date: this.arr[i], */
          hebergement_id: this.logement_id,
          client_id: this.$store.state.user.id,
          //  nbr_places_reserves: Number(this.nb_adulte) + Number(this.nb_enfant),
          chambre_id: this.chambre_id,
          /* places_disponibles:
            this.hebergement.nbr_place_dispo -
            (Number(this.nb_adulte) + Number(this.nb_enfant)),  */

          headers: {
            "content-type": "application/json",
          },
        }
      );
    },
    save() {
      axios.post(
        `${apiDomain}/api/Verif_Save_dates_reserve/` + this.listes_dates,
        {
          /* date: this.arr[i], */
          hebergement_id: this.logement_id,
          client_id: this.$store.state.user.id,
          //  nbr_places_reserves: Number(this.nb_adulte) + Number(this.nb_enfant),
          nbr_places_reserves: this.nbr_places_total,
          /* places_disponibles:
            this.hebergement.nbr_place_dispo -
            (Number(this.nb_adulte) + Number(this.nb_enfant)),  */
          places_disponibles: this.nbr_places_dispo,

          headers: {
            "content-type": "application/json",
          },
        }
      );
    },
    addReservation() {
      /* if (this.calculPrix.length != 0) {
        this.prix_total =
          (this.nb_adulte * this.hebergement.prix_adulte + this.calculPrix[0]) *
          (this.arr.length - 1);
      } else if (this.calculPrix.length == 0) {
        this.prix_total =
          this.nb_adulte * this.hebergement.prix_adulte * (this.arr.length - 1);
      } */

      axios
        .post(`${apiDomain}/api/reservation/hebergement`, {
          du: this.du,
          au: this.au,
          paye: 0, //payé deja
          type_paiement: "en ligne",
          read: 0,
          hebergement_id: this.logement_id,
          client_id: this.$store.state.user.id,
          // nbr_place: Number(this.nb_adulte) + Number(this.nb_enfant),
          nbr_place: this.nbr_places_total,
          nb_adulte: this.nb_adultes,

          frais: this.frais,
          prix_total: this.prix_logement,
          nb_enfant4: this.nb_enfant4,
          nb_enfant15: this.nb_enfant15,
          headers: {
            "content-type": "application/json",
          },
        })
        .then((response) => {
          if (this.type == "par personne") {
            this.save();
          } else if (this.type == "par chambre") {
            this.save_date_chambre();
          }

          if (response.status == 200) {
            this.reservation = response.data;
            // this.saveDateReserve();
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

    saveDateReserve() {},
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
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
    fetchSte3() {
      axios
        .get(
          `https://app.paymee.tn/api/v1/payments/${this.token_client}/check`,
          {
            body: JSON.stringify(this.annonce),
            headers: {
              "Content-Type": "application/json",

              Authorization: "Token ed6b25dc0ae4a9195b30be5f9e4f19a1383eb83b", //en ligne
              //Authorization: "Token a6408a6150213d091a55669461fc9fc1b34d2192",
            },
          }
        )
        /*   .then((res) => res.json()) */

        .then((res) => {
          this.data_ste3 = res.data.data;
          if (this.data_ste3.payment_status == true) {
            this.addReservation();
          }
        });
    },
  },
};
</script>





<style lang="scss">
$color-white: #fff;
$brand-color-g: #348e80;
$brand-color: #df8625;

@mixin respond-to($breakpoint) {
  @if $breakpoint == "xs" {
    @media screen and (max-width: 767px) {
      @content;
    }
  } @else if $breakpoint == "sm" {
    @media (min-width: 768px) and (max-width: 991px) {
      @content;
    }
  } @else if $breakpoint == "md" {
    @media (min-width: 992px) and (max-width: 1199px) {
      @content;
    }
  } @else if $breakpoint == "lg" {
    @media screen and (min-width: 1200px) {
      @content;
    }
  }
}

.ps-timeline-sec {
  position: relative;
  background: $color-white;

  .container {
    position: relative;

    ol {
      @include respond-to(xs) {
        &:before {
          background: $brand-color-g;
          content: "";
          width: 10px;
          height: 10px;
          border-radius: 100%;
          position: absolute;
          top: 130px !important;
          left: 36px !important;
        }

        &:after {
          background: #348e80;
          content: "";
          width: 10px;
          height: 10px;
          border-radius: 100%;
          position: absolute;
          top: inherit !important;
          left: 36px;
        }

        &.ps-timeline {
          margin: 130px 0 !important;
          border-left: 2px solid #348e80;
          padding-left: 0 !important;
          padding-top: 120px !important;
          border-top: 0 !important;
          margin-left: 25px !important;

          li {
            height: 220px;
            float: none !important;
            width: inherit !important;

            &:nth-child(2) {
              .img-handler-bot {
                img {
                  width: 70px;
                }
              }
            }

            &:last-child {
              margin: 0;
              bottom: 0 !important;
              height: 120px;

              .img-handler-bot {
                bottom: 40px !important;
                width: 40% !important;
                margin-left: 25px !important;
                margin-top: 0 !important;

                img {
                  width: 100%;
                }
              }

              .ps-top {
                margin-bottom: 0 !important;
                top: 20px;
                width: 50% !important;
              }
            }

            span {
              left: 0 !important;

              &.ps-sp-top {
                &:before {
                  content: none !important;
                }

                &:after {
                  content: none !important;
                }
              }

              &.ps-sp-bot {
                &:before {
                  content: none !important;
                }

                &:after {
                  content: none !important;
                }
              }
            }

            .img-handler-top {
              position: absolute !important;
              bottom: 150px !important;
              width: 30% !important;
              float: left !important;
              margin-left: 35px !important;
              margin-bottom: 0 !important;

              img {
                margin: 0 auto !important;
                width: 80% !important;
              }
            }

            .img-handler-bot {
              position: absolute !important;
              bottom: 115px !important;
              width: 30% !important;
              float: left !important;
              margin-left: 35px !important;
              margin-bottom: 0 !important;

              img {
              }
            }

            p {
              text-align: left !important;
              width: 100% !important;
              margin: 0 auto !important;
              margin-top: 0px !important;
            }

            .ps-top {
              width: 60% !important;
              float: right !important;
              right: 0;
              top: -40px;
            }

            .ps-bot {
              width: 60% !important;
              float: right !important;
              right: 0;
              top: -40px;
            }
          }
        }
      }

      &:before {
        background: $brand-color-g;
        content: "";
        width: 10px;
        height: 10px;
        border-radius: 100%;
        position: absolute;
        left: 8px;
        top: 49.5%;
      }

      &:after {
        background: $brand-color-g;
        content: "";
        width: 10px;
        height: 10px;
        border-radius: 100%;
        position: absolute;
        right: 8px;
        top: 49.5%;
      }

      &.ps-timeline {
        margin: 58px 0;
        padding: 0;
        border-top: 2px solid $brand-color-g;
        list-style: none;

        li {
          float: left;
          width: 25%;
          padding-top: 30px;
          position: relative;

          span {
            width: 50px;
            height: 50px;
            margin-left: -25px;
            background: $color-white;
            border: 4px solid $brand-color-g;
            border-radius: 50%;
            box-shadow: 0 0 0 0px $color-white;
            text-align: center;
            line-height: 50px -10;
            color: $brand-color;
            font-size: 2em;
            font-style: normal;
            position: absolute;
            top: -26px;
            left: 50%;

            &.ps-sp-top {
              &:before {
                content: "";
                color: $brand-color-g;
                width: 2px;
                height: 50px;
                background: $brand-color-g;
                position: absolute;
                top: -50px;
                left: 50%;
              }

              &:after {
                content: "";
                color: $brand-color-g;
                width: 8px;
                height: 8px;
                background: $brand-color-g;
                position: absolute;
                bottom: 90px;
                left: 44%;
                border-radius: 100%;
              }
            }

            &.ps-sp-bot {
              &:before {
                content: "";
                color: $brand-color-g;
                width: 2px;
                height: 50px;
                background: $brand-color-g;
                position: absolute;
                bottom: -50px;
                left: 50%;
              }

              &:after {
                content: "";
                color: $brand-color-g;
                width: 8px;
                height: 8px;
                background: $brand-color-g;
                position: absolute;
                top: 90px;
                left: 44%;
                border-radius: 100%;
              }
            }
          }

          .img-handler-top {
            position: absolute;
            bottom: 0;
            margin-bottom: 130px;
            width: 100%;

            img {
              display: table;
              margin: 0 auto;
            }
          }

          .img-handler-bot {
            position: absolute;
            margin-top: 60px;
            width: 100%;

            img {
              display: table;
              margin: 0 auto;
            }
          }

          p {
            text-align: center;
            width: 80%;
            margin: 0 auto;
          }

          .ps-top {
            position: absolute;
            bottom: 0;
            margin-bottom: 100px;
          }

          .ps-bot {
            position: absolute;
            margin-top: 35px;
          }
        }
      }
    }
  }
}

iframe {
  border: 1px solid black;
  width: 100%;
}


</style>