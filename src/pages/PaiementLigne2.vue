<template>
  <div>
    <TopNavbarHome />
    <div
      class="container"
      style="margin-bottom: 30px; margin-top: 20px"
      v-show="coordonnee && !details && !paiement1"
    >
      <div class="row">
        <div
          class="col-md-8"
          style="
            border: solid 1px #000;
            background-color: #fff;
            border-radius: 5px;
          "
        >
          <form name>
            <div class="row">
              <div class="col-sm-9 col-xs-3">
                <h4
                  class="dark-grey-text"
                  style="
                    line-height: 60px;
                    font-family: 'Open Sans', sans-serif;
                    margin-bottom: 0px;
                  "
                >
                  <strong
                    style="font-family: 'Indie Flower', cursive; color: #000"
                    >Vos coordonnées</strong
                  >
                </h4>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12 col-xs-3">
                <div class="row">
                  <div class="col-md-4">
                    <div>
                      <label
                        style="
                          color: #5a5a5a;
                          font-size: 14px;
                          line-height: 35px;
                        "
                        >Civilité</label
                      >
                      <div class="form-group">
                        <select
                          class="form-control"
                          name="civilite"
                          v-model="user.civilité"
                          required
                        >
                          <option value="mr" selected>Mr</option>
                          <option value="mme">Mme</option>
                          <option value="mlle">Mlle</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-4">
                    <div>
                      <label
                        style="
                          color: #5a5a5a;
                          font-size: 14px;
                          line-height: 35px;
                        "
                        >Prénom</label
                      >
                      <div class="form-group">
                        <input
                          aria-label="label"
                          required
                          type="text"
                          name="prenom"
                          class="form-control"
                          v-model="user.prenom"
                          @input="updatePrenom"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="col-md-4">
                    <div>
                      <label
                        style="
                          color: #5a5a5a;
                          font-size: 14px;
                          line-height: 35px;
                        "
                        >Nom</label
                      >
                      <div class="form-group">
                        <div class="form-group">
                          <input
                            aria-label="label"
                            required
                            type="text"
                            class="form-control"
                            v-model="user.nom"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-sm-12 col-xs-3">
                <div class="row">
                  <div class="col-md-4">
                    <div>
                      <label
                        style="
                          color: #5a5a5a;
                          font-size: 14px;
                          line-height: 35px;
                        "
                        >Email</label
                      >
                      <div class="form-group">
                        <input
                          aria-label="label"
                          required
                          type="email"
                          class="form-control"
                          v-model="user.email"
                          disabled
                        />
                      </div>
                    </div>
                  </div>

                  <div class="col-md-4">
                    <div>
                      <label
                        style="
                          color: #5a5a5a;
                          font-size: 14px;
                          line-height: 35px;
                        "
                        >Portable</label
                      >
                      <div class="form-group">
                        <input
                          aria-label="label"
                          required
                          type="tel"
                          class="form-control"
                          v-model="user.telephone"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <base-input
                  type="text"
                  :placeholder="ville.nom"
                  disabled
                ></base-input>
              </div>
            </div>
            <div class="col-md-1" style="margin-top: -50px; margin-left: 864px">
              <img loading="lazy"
                alt="edit ville"
                v-if="paysshow == false"
                src="/edit-property-35-etnafes.png"
                @click="paysshow = true"
              />

              <img loading="lazy"
                v-if="paysshow == true"
                src="/edit-property-etnafes.png"
                @click="paysshow = false"
              />
              <!-- <p @click="paysshow=true">Edit</p> -->
            </div>
            <br />
            <div class="row" v-if="paysshow == true">
              <div class="col-md-6 pr-md-1 text-left">
                <div class="form-group">
                  <label>Pays *</label>
                  <select
                    class="form-control"
                    required
                    v-model="pays_id"
                    @change="fetchVillesPays(pays_id)"
                  >
                    <option value disabled selected>
                      choisissez votre pays
                    </option>
                    <option
                      v-for="pays in pays"
                      v-bind:key="pays.id"
                      v-bind:value="pays.id"
                    >
                      {{ pays.nom_fr_fr }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="col-md-6 pl-md-1 text-left">
                <div class="form-group">
                  <label>Ville *</label>
                  <select
                    class="form-control"
                    required
                    v-model="client.ville_id"
                  >
                    <option value disabled selected>
                      choisissez votre destination
                    </option>
                    <option
                      v-for="ville in villespays"
                      v-bind:key="ville.id"
                      v-bind:value="ville.id"
                    >
                      {{ ville.nom }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-4">
                <div>
                  <label
                    style="
                      color: #5a5a5a;
                      font-size: 13px;
                      font-weight: bold;
                      line-height: 35px;
                    "
                    >Adultes</label
                  >
                  <div class="form-group">
                    <input
                      aria-label="label"
                      style="width: 100% !important"
                      autofocus
                      min="1"
                      :max="pack.nb_place_dispo"
                      type="number"
                      name="nb_adulte"
                      v-on:input="updateNbAdulte"
                      required
                      v-model="nb_adulte"
                    />
                  </div>
                </div>
              </div>

              <div class="col-md-4">
                <div>
                  <label
                    style="
                      color: #5a5a5a;
                      font-size: 13px;
                      font-weight: bold;
                      line-height: 35px;
                    "
                    >Enfants</label
                  >
                  <div class="form-group">
                    <input
                      aria-label="label"
                      style="width: 100% !important"
                      :min="agestab != undefined ? agestab.length : 0"
                      :max="pack.nb_place_dispo - nb_adulte"
                      v-on:input="updateNbEnfant"
                      type="number"
                      name="nb_enfant"
                      required
                      v-model="nb_enfant"
                    />
                  </div>
                </div>
              </div>
              <div class="col-md-4" v-if="nb_enfant > 0">
                <div>
                  <label
                    style="
                      color: #5a5a5a;
                      font-size: 13px;
                      font-weight: bold;
                      line-height: 35px;
                    "
                    >Age Enfants:</label
                  >
                  <div
                    class="form-group"
                    v-for="(age, index) in Number(this.nb_enfant)"
                    :key="index"
                  >
                    <select
                      class="form-control personalise22"
                      v-model="agestab[index]"
                      @change="addNewAge"
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                      <option value="13">13</option>
                      <option value="14">14</option>
                      <option value="15">15</option>
                    </select>
                    <img loading="lazy"
                      style="margin-top: -20px"
                      src="/minus-etnafes.png"
                      v-on:click="removeAge(index)"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="offset-md-8"></div>
              <div class="col-md-2"></div>
            </div>

            <div class="row">
              <div class="col-sm-12 col-xs-3">
                <h4
                  class="dark-grey-text"
                  style="
                    line-height: 23px;
                    margin-top: 15px;
                    font-family: 'Open Sans', sans-serif;
                  "
                >
                  <strong
                    style="font-family: 'Indie Flower', cursive; color: #000"
                    >Sélectionnez vous le mode de paiement</strong
                  >
                </h4>

                <div
                  style="
                    border: 1px solid #cad1d7;
                    padding: 10px;
                    margin-bottom: 20px;
                    border-radius: 0.4285rem;
                  "
                >
                  <div class="row">
                    <div class="col-md-11">
                      <!-- <input
                        aria-label="label"
                        type="radio"
                        v-bind:key="agence_id"
                        v-model="agence_id"
                        v-bind:value="agence.id"
                        name="agence_id"
                        @input="updateAgence"
                      />-->
                      <input
                        aria-label="label"
                        type="radio"
                        @input="updateAgence"
                      />
                      <img loading="lazy" src="/paiment-etnafes-tn.png" />
                    </div>
                    <div class="col-md-1">
                      <img loading="lazy"
                        class="fleche"
                        onmouseover="this.style.cursor='pointer'"
                        @click="fetchAgence(agence.id)"
                        style="font-weight: bold; float: right"
                        src="/images/etnafes-fleche-bas.png"
                      />
                    </div>
                  </div>

                  <div
                    class="row"
                    v-if="agencee.nom_agence != null && agencee.id == agence.id"
                  >
                    <div class="col-md-6">
                      <p
                        style="color: #000; margin-top: 5px; padding-left: 20px"
                        v-if="
                          agencee.nom_agence != null && agencee.id == agence.id
                        "
                      >
                        <b>Adresse :</b>
                        {{ agence.adresse }}
                        <br />
                      </p>

                      <p
                        style="
                          color: #000;
                          line-height: 30px;
                          padding-left: 20px;
                        "
                        v-if="
                          agencee.nom_agence != null && agencee.id == agence.id
                        "
                      >
                        <b>Telephone :</b>
                        {{ agence.telephone }}
                      </p>
                    </div>

                    <div class="col-md-6">
                      <p
                        style="color: #000; margin-top: 5px; padding-left: 20px"
                        v-if="
                          agencee.nom_agence != null && agencee.id == agence.id
                        "
                      >
                        <b>Adresse :</b>
                        {{ agence.adresse }}
                      </p>

                      <p
                        style="
                          color: #000;
                          line-height: 30px;
                          padding-left: 20px;
                        "
                        v-if="
                          agencee.nom_agence != null && agencee.id == agence.id
                        "
                      >
                        <b>Telephone :</b>
                        {{ agence.telephone }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="col-md-4">
          <b-card no-body style="padding: 10px; border: solid 1px">
            <b-carousel
              id="carousel-PAgence"
              v-model="slide"
              :interval="4000"
              controls
              indicators
              background="transparent"
              img-width="1024"
              img-height="480"
              style="text-shadow: 1px 1px 2px #333"
              @sliding-start="onSlideStart"
              @sliding-end="onSlideEnd"
            >
              <!-- Text slides with image -->
              <div v-for="(zone, i) in pack.zone_pack" v-bind:key="i">
                <b-carousel-slide
                  v-for="(image, k) in zone.zone_touristique.image"
                  v-bind:key="k"
                  :img-src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_zones/${image.url_image}`"
                ></b-carousel-slide>
              </div>
            </b-carousel>
            <p style="margin: 20px; font-weight: bold">{{ pack.titre }}</p>

            <b-card-text>
              <img loading="lazy" src="/calendar-etnafes.png" />
              Date de départ :
              {{ pack.date_deb }}
            </b-card-text>
            <hr style="margin-top: 0.1rem" />
            <b-card-text>
              <img loading="lazy" src="/calendar-etnafes.png" />
              Date de retour :
              {{ pack.date_fin }}
            </b-card-text>

            <hr style="margin-top: 0.1rem" />

            <b-card-text>{{ pack.description }}</b-card-text>

            <hr />
            <h3
              style="color: #333; margin-bottom: 0px"
              v-if="agestab != undefined"
            >
              Prix total :
              {{ Number(nb_adulte) * pack.prix_fix + calcul[0] }}dt
            </h3>

            <h3 style="color: #333" v-else>
              Prix total :
              {{ Number(nb_adulte) * pack.prix_fix }}dt
            </h3>

            <div>
              <br />
              <!--  agence_id != null && -->
              <b-button
                @click="
                  coordonnee = !coordonnee;
                  details = !details;
                  scrollToTop();
                "
                v-if="user.civilité != '' && nb_enfant == agestab.length"
                >Continuez &nbsp;&nbsp;&nbsp;></b-button
              >
            </div>
          </b-card>
        </div>
      </div>
    </div>

    <div
      class="container"
      style="margin-bottom: 30px; margin-top: 20px"
      v-show="!coordonnee && details && !paiement1"
    >
      <b-card
        no-body
        style="padding: 10px; border: groove rgba(0, 0, 0, 0.25) 1px"
      >
        <div class="row">
          <div class="col-md-6">
            <b-carousel
              id="carousel-PAgence2"
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
              <!-- Text slides with image -->
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
          </div>
          <div class="col-md-6">
            <div class="row" hidden>
              <section class="ps-timeline-sec">
                <div class="container">
                  <ol class="ps-timeline">
                    <li>
                      <span class="ps-sp-top">01</span>
                    </li>
                    <li>
                      <span style="backround: #000 !important" class="ps-sp-bot"
                        >02</span
                      >
                    </li>
                    <li>
                      <span class="ps-sp-top">03</span>
                    </li>
                    <li>
                      <span class="ps-sp-bot">04</span>
                    </li>
                  </ol>
                </div>
              </section>
            </div>
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

              <div class="col-md-6">
                <b-button
                  @click="
                    stepOnePayemee();
                    details = !details;
                    paiement1 = !paiement1;
                  "
                  >Payé</b-button
                >&nbsp;
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
              Date de départ :
              {{ pack.date_deb }}
            </b-card-text>
            <hr style="margin-top: 0.1rem" />
            <b-card-text style="color: #000">
              Date de retour :
              {{ pack.date_fin }}
            </b-card-text>

            <hr style="margin-top: 0.1rem" />
            <b-card-text style="color: #000"
              >{{ nb_adulte }} Adulte(s)</b-card-text
            >
            <b-card-text style="color: #000"
              >{{ nb_enfant }} Enfant(s)</b-card-text
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
          </div>
        </div>
      </b-card>
      <br />

      <br />
      <b-button @click="updateClient(user.id, client)">Payé</b-button>&nbsp;
      <!--  <b-button v-print="'#printMe'">Imprimez</b-button> -->
    </div>

    <div
      class="container"
      style="margin-bottom: 30px; margin-top: 20px"
      v-show="!coordonnee && !details && paiement1"
    >
      <b-card
        no-body
        style="padding: 10px; border: groove rgba(0, 0, 0, 0.25) 1px"
      >
        <button
          v-on:click="redirect(`https://app.paymee.tn/gateway/${token_client}`)"
        >
          Continuez >>
        </button>
      </b-card>
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
  data() {
    return {
      //payemee
      code_compt: "13639",
      note: "Etnafes " + "#" + Math.floor(Math.random() * 40000),

      token_client: "",
      ville: {},
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
      coordonnee: true,
      details: false,
      paiement1: false,

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
    if (this.token_client != "") {
      this.fetchStepTwo(this.token_client);
    }
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
    redirect: function (url) {
      window.location = url;
    },
    redirectSteptwo() {
      window.location.href = `https://app.paymee.tn/gateway/f382edd9da37172d99db506ce5375bc3`;
    },
    stepOnePayemee() {
      let formData = new FormData();

      formData.append("vendor", this.code_compt);
      formData.append("amount", this.prixPack);
      formData.append("note", this.note);

      axios
        .post(`https://app.paymee.tn/api/v1/payments/create`, formData, {
          body: JSON.stringify(this.annonce),
          headers: {
            "Content-Type": "application/json",

            Authorization: "Token ed6b25dc0ae4a9195b30be5f9e4f19a1383eb83b",
          },
        })

        .then((res) => {
          this.token_client = res.data.data.token;
          window.addEventListener(
            "message",
            function (event) {
              //Execute Step 3
              window.location.replace("https://etnafes.com");
            },
            false
          );
          //this.$noty.success("ajouter avec Succès ! ");
        })

        .catch((error) => {
          console.log(error.response.data);
        });
    },

    fetchStepTwo(token_client) {
      fetch(`https://app.paymee.tn/gateway/${this.token_client}`, {
        method: "get",
      })
        .then((res) => res.json())
        .then((data) => {
          // this.fetchsearch();
        })

        .catch((err) => console.log(err));
    },

    fetchStepTwo__(id) {
      axios
        .get(`${apiDomain}/api/packs/${id}`)
        .then(
          ({ data }) => (
            (this.pack = data.packdetail),
            (this.hebergement_pack = data.packdetail.hebergement_pack)
          )
        );
    },

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
      fetch(`${apiDomain}/api/client/${id}`)
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

    updateClient(id, client) {
      if (this.calcul.length != 0) {
        this.prix_total = this.nb_adulte * this.pack.prix_fix + this.calcul[0];

        this.prix_pack = this.nb_adulte * this.pack.prix_fix + this.calcul[0];
      } else if (this.calcul.length == 0) {
        this.prix_total = this.nb_adulte * this.pack.prix_fix;
        this.prix_pack = this.nb_adulte * this.pack.prix_fix;
      }

      axios
        .put(`${apiDomain}/api/client/${id}`, {
          date: new Date().toJSON().slice(0, 10).replace(/-/g, "/"),
          nom: this.user.nom,
          prenom: this.user.prenom,
          telephone: this.user.telephone,
          email: this.user.email,
          civilité: this.user.civilité,
          gouvernorat: this.gouvernorat,
          // agence_id: this.agence_id,
          ville_id: this.client.ville_id,
          nbr_place:
            Number(this.$route.query.nb_adulte) +
            Number(this.$route.query.nb_enfant),
          prix_total: this.prix_total,
          prix_pack: this.prix_pack,
          // prix_logement: this.prix_logement,
          prix_logement: 0,

          nb_adulte: this.$route.query.nb_adulte,
          nb_enfant: this.$route.query.nb_enfant,
          nb_enfant4: this.calculage[0],
          nb_enfant15: this.calculage[1],

          prix_remise: this.pack.taux_remise,
          paye: 0,
          pack_id: this.$route.params.id,
          hebergement_id: this.hebergement_id,
          // agence_id: this.$store.state.id,
          agence_id: this.agence_id,
          headers: {
            "content-type": "application/json",
          },
        })

        .then((res) => {
          if (res.status == 200) {
            this.$fire({
              // title: "Votre profil a été modifié avec succés",
              text: "Votre réservation est passée avec succés!Veuillez retournez à l'agence pour le paiement",
              type: "success",
              timer: 90000,
            }).then((r) => {
              this.$router.push({
                name: "ClientReservation",
              });
            });
          }
        })

        .catch((error) => {
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
</style>