<template>
  <div class="content">
    <b-tabs card>
      <b-tab title="Ajouter un pack">
        <div class="row">
          <div>
            <form @submit.prevent="createPack">
              <card style="border: solid 1px #7a7979;">
                <div class="row">
                  <div class="col-md-4 pr-md-1 text-left">
                    <base-input label="Titre" placeholder="Titre" v-model="pack.titre"></base-input>
                    <p v-if="validationErrors.titre" style="padding-bottom: 5px; color: red">
                      <span class="alert-link">** {{ validationErrors.titre[0] }}</span>
                    </p>
                  </div>
                  <div class="col-md-4 px-md-1 text-left">
                    <label>Date début</label>
                    <VueDatePicker :minDate="new Date()" v-model="pack.date_deb" required="true" />
                    <p v-if="validationErrors.date_deb" style="padding-bottom: 5px; color: red">
                      <span class="alert-link">** {{ validationErrors.date_deb[0] }}</span>
                    </p>
                  </div>

                  <div class="col-md-4 pl-md-1 text-left">
                    <label>Date fin</label>
                    <VueDatePicker
                      disabled
                      v-if="pack.date_deb == null"
                      :minDate="new Date(pack.date_deb)"
                      v-model="pack.date_fin"
                      :input-attr="{ required: 'true' }"
                    />

                    <VueDatePicker
                      v-else
                      :minDate="new Date(pack.date_deb)"
                      v-model="pack.date_fin"
                      @input="calculInterval"
                      :input-attr="{ required: 'true' }"
                    />
                    <p v-if="validationErrors.date_fin" style="padding-bottom: 5px; color: red">
                      <span class="alert-link">** {{ validationErrors.date_fin[0] }}</span>
                    </p>
                  </div>
                </div>

                <div class="row">
                 

                  <div class="col-md-4 pl-md-1 text-left">
                    <label>Niveau d'activité</label>
                    <select class="form-control" v-model="pack.adrenaline" name="adrenaline">
                      <option value="Faible">Faible</option>
                      <option value="Moyen">Moyen</option>
                      <option value="Extrême">Extrême</option>
                    </select>

                    <p v-if="validationErrors.adrenaline" style="padding-bottom: 5px; color: red">
                      <span class="alert-link">** {{ validationErrors.adrenaline[0] }}</span>
                    </p>
                  </div>

                  <div class="col-md-4 pl-md-1 text-left">
                    <label>Type d'activité</label>
                    <select
                      class="form-control"
                      v-model="pack.activite_id_principal"
                      name="activite_id_principal"
                    >
                      <option
                        v-for="activité in activités"
                        v-bind:key="activité.idact"
                        v-bind:value="activité.idact"
                      >{{ activité.nom_activite }}</option>
                    </select>

                    <p
                      v-if="validationErrors.activite_id_principal"
                      style="padding-bottom: 5px; color: red"
                    >
                      <span class="alert-link">
                        **
                        {{ validationErrors.activite_id_principal[0] }}
                      </span>
                    </p>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-3 pr-md-1 text-left">
                    <label>Nombre des places (max)</label>
                    <input
                      aria-label="label"
                      oninput="this.value = Math.round(this.value);"
                      style="width: 100% !important"
                      type="number"
                      label="Nombre des places (max)"
                      v-model="pack.nb_place_max"
                      placeholder="  00"
                    />
                    <p v-if="validationErrors.nb_place_max" style="padding-bottom: 5px; color: red">
                      <span class="alert-link">** {{ validationErrors.nb_place_max[0] }}</span>
                    </p>
                  </div>
                  <div class="col-md-3 px-md-1 text-left">
                    <label>Nombre des places (disponibles)</label>
                    <input
                      aria-label="label"
                      oninput="this.value = Math.round(this.value);"
                      type="number"
                      style="width: 100% !important"
                      label="Nombre des places (disponibles)"
                      v-model="pack.nb_place_dispo"
                      placeholder="  0"
                    />
                    <p
                      v-if="validationErrors.nb_place_dispo"
                      style="padding-bottom: 5px; color: red"
                    >
                      <span class="alert-link">** {{ validationErrors.nb_place_dispo[0] }}</span>
                    </p>
                  </div>
                  <div class="col-md-3 pl-md-1 text-left">
                    <label>Prix fixe (>15 ans)</label>

                    <input
                      aria-label="label"
                      oninput="this.value = Math.round(this.value);"
                      style="width: 100% !important"
                      type="number"
                      label="Prix fixe"
                      placeholder="  0dt"
                      name="prix_fix"
                      v-model="pack.prix_fix"
                    />
                    <p v-if="validationErrors.prix_fix" style="padding-bottom: 5px; color: red">
                      <span class="alert-link">** {{ validationErrors.prix_fix[0] }}</span>
                    </p>
                  </div>
                  <div class="col-md-3 pl-md-1 text-left">
                    <label>Prix pour enfant moins que 4 ans</label>
                    <input
                      aria-label="label"
                      oninput="this.value = Math.round(this.value);"
                      type="number"
                      style="width: 100% !important"
                      label="Prix pour enfant moins que 4 ans"
                      v-model="pack.prix_enfant4"
                      placeholder="  0dt"
                    />
                    <p v-if="validationErrors.prix_enfant4" style="padding-bottom: 5px; color: red">
                      <span class="alert-link">** {{ validationErrors.prix_enfant4[0] }}</span>
                    </p>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-3 pr-md-1 text-left">
                    <label>Prix pour enfant entre 4 et 15 ans</label>

                    <input
                      aria-label="label"
                      oninput="this.value = Math.round(this.value);"
                      type="number"
                      style="width: 100% !important"
                      label="Prix pour enfant plus que 4 ans"
                      placeholder="  0dt"
                      name="prix_enfant15"
                      v-model="pack.prix_enfant15"
                    />

                    <p
                      v-if="validationErrors.prix_enfant15"
                      style="padding-bottom: 5px; color: red"
                    >
                      <span class="alert-link">** {{ validationErrors.prix_enfant15[0] }}</span>
                    </p>
                  </div>

                  <div class="col-md-3 px-md-1 text-left">
                    <label>Remise</label>
                    <input
                      aria-label="label"
                      oninput="this.value = Math.round(this.value);"
                      type="number"
                      style="width: 100% !important"
                      label="Remise"
                      v-model="pack.remise"
                      placeholder="  0dt"
                      name="remise"
                    />
                  </div>

                  <div class="col-md-3 pl-md-1 text-left">
                    <label>Nombre des places (remise)</label>
                    <input
                      aria-label="label"
                      oninput="this.value = Math.round(this.value);"
                      type="number"
                      style="width: 100% !important"
                      label="Nombre des places (remise)"
                      v-model="pack.nb_place_remise"
                      placeholder="  0"
                    />
                  </div>
                  <div class="col-md-3 pl-md-1 text-left">
                    <label>Taux de remise</label>
                    <input
                      aria-label="label"
                      type="number"
                      style="width: 100% !important"
                      label="Taux de remise"
                      placeholder=" 0%"
                      name="taux_remise"
                      v-model="pack.taux_remise"
                    />
                  </div>
                </div>
                <hr />
                <div class="row">
                  <div class="col-md-12 text-left">
                    <base-input>
                      <label>Description</label>
                      <span
                        style="float:right;color:red"
                        v-if="pack.description.length<50"
                      >{{pack.description.length}}/50</span>
                      <span
                        style="float:right;color:green"
                        v-if="pack.description.length>50"
                      >{{pack.description.length}}/238</span>

                      <b-form-textarea
                        id="textarea-state"
                        :state="pack.description.length >= 50"
                        rows="4"
                        maxlength="238"
                        cols="80"
                        class="form-control"
                        placeholder="Entrez ici la description du pack"
                        name="description"
                        v-model="pack.description"
                      ></b-form-textarea>
                    </base-input>

                    <p v-if="validationErrors.description" style="padding-bottom: 5px; color: red">
                      <span class="alert-link">** {{ validationErrors.description[0] }}</span>
                    </p>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12 pr-md-1 text-left">
                    <!-- <label>Image de couverture</label>
                      <br />
                      <input
                        name="image_couverture"
                        required
                        type="file"
                        @change="packPhoto"
                        class="input-file"
                        accept="image/x-png, image/gif, image/jpeg"
                    />-->

                    <label class="custom-file-upload">
                      Image de couverture
                      <br />
                      <br />
                      <input
                        aria-label="label"
                        name="image_couverture"
                        required
                        type="file"
                        @change="previewImageRio"
                        class="input-file nn"
                        accept="image/x-png, image/gif, image/jpeg"
                      />
                      <img loading="lazy"
                        class="hideWeb"
                        src="https://img.icons8.com/color/48/000000/add-image.png"
                      />
                    </label>
                    <div class="image-preview11 style_image" v-if="image_couverture.length > 0">
                      <img loading="lazy" class="width_img_src preview11" :src="image_couverture" />
                    </div>
                  </div>
                </div>
                <br />
              </card>
              <br />
              <div>
                <div style="border: solid 1px #7a7979; padding: 15px">
                  <div class="row">
                    <div class="col-md-12">
                      <h4 class="d-none d-lg-block">
                        <b style="color:#000">
                          **Veuillez ajouter le programme de votre pack par
                          journée
                        </b>
                      </h4>

                      <h4 class="d-lg-none">
                        <b style="color:#000;font-size: 14px;">
                          **Veuillez ajouter le programme de votre pack par
                          journée
                        </b>
                      </h4>
                    </div>
                  </div>
                  <!-- <br /> -->
                  <div class="row">
                    <div class="col-md-12">
                      <div
                        v-for="(programme, index) in programmes"
                        :key="index"
                        style="border: 1px solid #ff931f; margin-bottom: 20px"
                      >
                        <div class="row" style="padding: 10px">
                          <div class="col-md-1 d-none d-lg-block">
                            <label>&nbsp;</label>
                            <button
                              type="button"
                              v-on:click="removeProgramme(index)"
                              class="btn btn-block btn-danger btdelete d-none d-lg-block"
                            >
                              <i
                                style="color: #fff !important"
                                class="fa fa-trash text-danger fa-lg"
                              ></i>
                            </button>
                          </div>

                          <div class="col-md-1 d-lg-none">
                            <button
                              type="button"
                              v-on:click="removeProgramme(index)"
                              class="btn btn-block btn-danger btdeleteResp d-lg-none"
                            >
                              <i
                                style="color: #fff !important"
                                class="fa fa-trash text-danger fa-lg"
                              ></i>
                            </button>
                          </div>
                          <div class="form-group col-md-10">
                            <label style="line-height: 35px">
                              <b>Jour {{ index + 1 }}</b>
                            </label>
                            <input
                              aria-label="label"
                              v-model="programme.titre"
                              type="text"
                              class="form-control"
                              :placeholder="`Titre du jour ${
                                  index + 1
                                } du programme`"
                              :name="`programmes[${index}][titre]`"
                            />
                          </div>
                          <div class="form-group col-md-10 offset-md-1">
                            <textarea
                              v-model="programme.description"
                              type="text"
                              :name="`programmes[${index}][description]`"
                              class="form-control"
                              placeholder="Description"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <button
                      type="button"
                      v-on:click="addNewProgramme"
                      class="btn btn-block btn-outline-success orange"
                    >+ Programme</button>
                  </div>
                </div>
                <br />

                <div style="border: solid 1px #7a7979; padding: 15px">
                  <div class="row">
                    <div class="col-md-12">
                      <h4 class="d-none d-lg-block">
                        <b style="color:#000">**Veuillez choisir les zones touristiques</b>
                      </h4>

                      <h4 class="d-lg-none">
                        <b
                          style="color:#000;font-size:14px"
                        >**Veuillez choisir les zones touristiques</b>
                      </h4>
                    </div>
                  </div>
                  <!-- <br /> -->

                  <div class="row">
                    <div class="col-md-12">
                      <div
                        v-for="(zone, index) in villepack"
                        :key="index"
                        style="border: 1px solid #ff931f; margin-bottom: 20px"
                      >
                        <div class="row" style="padding: 10px">
                          <div class="col-md-1 d-none d-lg-block">
                            <label>&nbsp;</label>
                            <button
                              type="button"
                              v-on:click="removeZone(index)"
                              class="btn btn-block btn-danger btdelete d-none d-lg-block"
                            >
                              <i
                                style="color: #fff !important"
                                class="fa fa-trash text-danger fa-lg"
                              ></i>
                            </button>
                          </div>

                          <div class="col-md-1 d-lg-none">
                            <button
                              type="button"
                              v-on:click="removeZone(index)"
                              class="btn btn-block btn-danger btdeleteResp d-lg-none"
                            >
                              <i
                                style="color: #fff !important"
                                class="fa fa-trash text-danger fa-lg"
                              ></i>
                            </button>
                          </div>
                          <div class="form-group col-md-3">
                            <label style="line-height: 35px">
                              <b>Zone touristique {{ index + 1 }}</b>
                            </label>
                            <div class="form-group">
                              <select v-model="zone.ville_id" class="form-control" required>
                                <option value disabled selected>gouvernorat</option>
                                <option
                                  :name="`villepack[${index}][ville_id]`"
                                  v-for="ville in villes"
                                  v-bind:key="ville.id"
                                  v-bind:value="ville.id"
                                >{{ ville.nom }}</option>
                              </select>
                            </div>
                            <div class="form-group">
                              <select v-model="zone.sville_id" class="form-control" required>
                                <option value disabled selected>ville</option>
                                <option
                                  v-show="ville.ville_id == zone.ville_id"
                                  v-for="ville in svilles"
                                  v-bind:key="ville.id"
                                  v-bind:value="ville.id"
                                >{{ ville.nom }}</option>
                              </select>
                            </div>
                          </div>

                          <div class="form-group col-md-4">
                            <label style="line-height: 35px">
                              <b>Zones touristiques</b>
                            </label>
                            <div v-for="(zpack, k) in villepack[index].zonepack" :key="k">
                              <div class="col-xs-8">
                                <b-card
                                  no-body
                                  style="
                                      padding: 10px;
                                      border: 1px solid #b3b3b3 !important;
                                    "
                                  class="feed"
                                  ref="feed"
                                >
                                  <div class="row" style="padding-left: 20px">
                                    <div
                                      v-for="z in zones"
                                      :key="z.id"
                                      style="opacity: 1; visibility: visible"
                                    >
                                      <div v-show="z.sville_id == zone.sville_id">
                                        <input
                                          aria-label="label"
                                          v-model="zpack.zone_touristique_id"
                                          type="checkbox"
                                          :value="z.id"
                                          :id="z.id"
                                          :name="`villepack[${index}][zonepack][${k}][zone_touristique_id]`"
                                        />
                                        <label
                                          style="margin-left: 2px"
                                          class="form-check-label"
                                          for="flexCheckDefault"
                                        >{{ z.nom }}</label>&nbsp;&nbsp;&nbsp;
                                      </div>
                                    </div>
                                  </div>
                                </b-card>
                              </div>
                            </div>
                          </div>

                          <div class="form-group col-md-4">
                            <label style="line-height: 35px">
                              <b>Hébergements disponibles</b>
                            </label>

                            <b-card
                              no-body
                              style="
                                  padding: 10px;
                                  border: 1px solid #b3b3b3 !important;
                                "
                              class="feed"
                              ref="feed"
                            >
                              <div class="row" style="padding-left: 20px">
                                <div
                                  v-for="(hebergement, index) in hebergements"
                                  v-bind:key="hebergement.id"
                                  style="opacity: 1; visibility: visible"
                                >
                                  <div
                                    v-show="
                                        hebergement.ville_id == zone.sville_id
                                      "
                                  >
                                    <input
                                      aria-label="label"
                                      v-model="hebergementpack.hebergement_id"
                                      type="checkbox"
                                      v-bind:value="hebergement.id"
                                      :name="`hebergementpack[${index}][hebergement_id]`"
                                    />
                                    <label
                                      style="margin-left: 2px"
                                      class="form-check-label"
                                      for="flexCheckDefault"
                                    >
                                      {{ hebergement.nom }} ({{
                                      hebergement.nbr_place_dispo
                                      }}
                                      places)
                                    </label>&nbsp;&nbsp;&nbsp;
                                  </div>
                                </div>
                              </div>
                            </b-card>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <button
                      type="button"
                      v-on:click="addNewCircuit"
                      class="btn btn-block btn-outline-success orange"
                    >+ Zone touristique</button>
                  </div>
                </div>

                <br />

                <div class="row">
                  <button
                    class="btn btn-success"
                    type="submit"
                    fill
                    style="
                        margin-left: 10px;
                        border-radius: 18px 0px 18px 0px;
                      "
                  >Enregistrer</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </b-tab>
      <b-tab title="Ajouter une agence">
        <NouvelleAgence></NouvelleAgence>
      </b-tab>
      <b-tab title="Mes Packs" active v-show="adagence.adagence == 1">
        <template #title>
          Mes Packs
          <span
            class="badge badge-pill badge-danger"
            style="background-color:red"
          >{{ packsln }}</span>
        </template>
        <PacksAgence></PacksAgence>
      </b-tab>

      <b-tab title="Mes Packs" disabled v-if="adagence.adagence == 0">
        <template #title>
          Mes Packs
          <span
            class="badge badge-pill badge-danger"
            style="background-color:red"
          >{{ packsln }}</span>
        </template>
        <PacksAgence></PacksAgence>
      </b-tab>

      <b-tab title="Mes Agences" v-show="adagence.adagence == 1">
        <template #title>
          Mes Agences
          <span
            class="badge badge-pill badge-danger"
            style="background-color:red"
          >{{ agencesln }}</span>
        </template>
        <Agences></Agences>
      </b-tab>

      <b-tab title="Mes Agences" disabled v-if="adagence.adagence == 0">
        <template #title>
          Mes Agences
          <span
            class="badge badge-pill badge-danger"
            style="background-color:red"
          >{{ agencesln }}</span>
        </template>
        <Agences></Agences>
      </b-tab>
      <b-tab title="Mes Réservations" v-show="adagence.adagence == 1">
        <template #title>
          Mes Réservations
          <span class="badge badge-pill badge-danger" style="background-color:red">
            {{
            reservationsP + reservationsH
            }}
          </span>
        </template>
        <ReservationsAgence></ReservationsAgence>
      </b-tab>

      <b-tab title="Mes Réservations" disabled v-if="adagence.adagence == 0">
        <template #title>
          Mes Réservations
          <span class="badge badge-pill badge-danger" style="background-color:red">
            {{
            reservationsP + reservationsH
            }}
          </span>
        </template>
        <ReservationsAgence></ReservationsAgence>
      </b-tab>
      <b-tab title="Statistiques" v-show="adagence.adagence == 1">
        <DashboardAgence></DashboardAgence>
      </b-tab>
      <b-tab title="Statistiques" disabled v-if="adagence.adagence == 0">
        <DashboardAgence></DashboardAgence>
      </b-tab>

      <b-tab title="Profil">
        <AgenceProfile></AgenceProfile>
      </b-tab>
    </b-tabs>
  </div>
</template>
<script>
import StepProgress from "vue-step-progress";
import { VueDatePicker } from "@mathieustan/vue-datepicker";
// import the css (OPTIONAL - you can provide your own design)
import "vue-step-progress/dist/main.css";
import Vue from "vue";
import { Card, BaseInput } from "@/components/index";
import BaseButton from "@/components/BaseButton";
import ReservationsAgence from "./RéservationsAgence";
import Agences from "./Agences";
import PacksAgence from "./PacksAgence";
import DashboardAgence from "./DashboardAgence";
import NouvelleAgence from "./NouvelleAgence";
import AgenceProfile from "./AgenceProfile";
import { apiDomain } from "../config";
export default {
  components: {
    VueDatePicker,
    Card,
    BaseInput,
    PacksAgence,
    ReservationsAgence,
    DashboardAgence,
    Agences,
    AgenceProfile,
    NouvelleAgence,
    BaseButton,
    "step-progress": StepProgress
  },
  data() {
    return {
      reservationsP: "",
      reservationsH: "",
      agencesln: "",
      packsln: "",
      validationzone: "",
      validationErrors: "",
      image_couverture: "",
      currentStep: {
        type: Number,
        default: 0
      },
      svilles: {},

      mySteps: ["Step 1", "Step 2", "Step 3"],
      packcard: true,
      ville_id: "",
      zonesville: [],
      villepack: [
        {
          zonesville: [],
          ville_id: "",
          sville_id: "",

          zonepack: [
            {
              ville_pack_id: "",
              zone_touristique_id: []
            }
          ]
        }
      ],
      hebergementpack: {
        pack_id: "",
        hebergement_id: []
      },
      activités: {},
      programmes: [
        {
          description: "",
          titre: ""
        }
      ],
      filtre_zones: [],
      ville: {},
      villes: {},
      pack: {
        adrenaline: "",
        activite_id_principal: "",

        titre: "",
        date_deb: null,
        date_fin: null,
        description: "",
        url_video: "",
        nb_place_max: "",
        nb_place_dispo: "",
        prix_fix: "",
        remise: 0,
        valide: 0,
        prix_enfant15: 0,
        prix_enfant4: 0,
        nb_place_remise: 0,
        taux_remise: 0,
        ville_id: "",
        adagence_id: this.$store.state.propagence[0].id
      },
      hebergements: {},
      adagence: [],

      arr: [],
      zones: {}
    };
  },

  computed: {
    propagence() {
      return this.$store.getters.get_propagence;
    }
  },
  created() {
    this.fetchAllHebergements();
    this.fetchVilles();
    this.fetchZones();
    this.fetchSousVilles();
    this.loadCategories();
    this.fetchAdagence(this.$store.state.propagence[0].id);
    this.fetchPacks(this.$store.state.propagence[0].id);
    this.fetchAgences(this.$store.state.propagence[0].id);
    this.fetchReservations(this.$store.state.propagence[0].id);
  },
  methods: {
    previewImageRio: function(event) {
      // Reference to the DOM input element
      var input = event.target;
      // Ensure that you have a file before attempting to read it
      if (input.files && input.files[0]) {
        // create a new FileReader to read this image and convert to base64 format
        var reader = new FileReader();
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = e => {
          // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
          // Read image as base64 and set to imageData
          this.image_couverture = e.target.result;
        };
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsDataURL(input.files[0]);
      }
    },
    fetchReservations(id) {
      fetch(
        `${apiDomain}/api/reservation-agence-adagence/${id}?token=${this.$store.state.token}`
      )
        .then(res => res.json())
        .then(res => {
          this.reservationsAgence = res.reservations;
          this.reservationsP = res.reservationsP;
          this.reservationsH = res.reservationsH;
          this.reservationsHeb = res.reservationsHeb;
        })
        .catch(err => console.log(err));
    },
    fetchPacks(id) {
      fetch(`${apiDomain}/api/agence/packs/${id}`)
        .then(res => res.json())
        .then(res => {
          this.packsln = res.packsln;
        })
        .catch(err => console.log(err));
    },

    fetchAgences(id) {
      fetch(`${apiDomain}/api/agences/admin/${id}`)
        .then(res => res.json())
        .then(res => {
          this.agencesln = res.agencesln;
        })
        .catch(err => console.log(err));
    },
    fetchAdagence(id) {
      fetch(`${apiDomain}/api/adagence/${id}`)
        .then(res => res.json())
        .then(res => {
          this.adagence = res;
        })
        .catch(err => console.log(err));
    },

    fetchAllHebergements() {
      axios
        .get(`${apiDomain}/api/allhebergements`)
        .then(({ data }) => (this.hebergements = data.hebergements));
    },
    removeZone: function(index, villepack) {
      Vue.delete(this.villepack, index);
    },
    addNewCircuit: function() {
      this.villepack.push({
        zonesville: [],
        check: 1,
        ville_id: "",
        zonepack: [
          {
            zone_touristique_id: [],
            ville_pack_id: ""
          }
        ]
      });
    },

    addRow: function() {
      this.zonepack.push(Vue.util.extend({}, this.zone));
    },
    calculInterval(date_deb, date_fin) {
      var date_deb = this.pack.date_deb,
        date_fin = this.pack.date_fin;
      var arr = [],
        dt = new Date(date_deb);

      while (dt <= new Date(date_fin)) {
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
    loadCategories() {
      axios
        .get(`${apiDomain}/api/loadCategorie`, {
          params: _.omit(this.selected, "loadCategorie")
        })
        .then(response => {
          this.activités = response.data.categories;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    setPackHeb_id() {
      var vm = this;
      vm.hebergementpack.pack_id = this.pack.id;
    },
    removeProgramme: function(index) {
      Vue.delete(this.programmes, index);
    },
    addNewProgramme: function() {
      this.programmes.push(Vue.util.extend({}, this.programme));
    },

    fetchZonesVille(id) {
      axios
        .get(`${apiDomain}/api/zones/${id}/ville`)
        .then(({ data }) => (this.zonesville = data.zones));
      axios
        .get(`${apiDomain}/api/hebergements/ville/${id}`)
        .then(({ data }) => (this.hebergements = data.hebergements));
    },

    fetchZones() {
      fetch(`${apiDomain}/api/allzones`)
        .then(res => res.json())
        .then(res => {
          this.zones = res.zones;
          this.options = res.zones;
        })
        .catch(err => console.log(err));
    },
    /* fetchVilles() {
      fetch(`${apiDomain}/api/villes`)
        .then(res => res.json())
        .then(res => {
          this.villes = res;
        })
        .catch(err => console.log(err));
    }, */
    fetchVilles() {
      axios
        .get(`${apiDomain}/api/allvillesTun`)
        .then(({ data }) => (this.villes = data.villes));
    },

    fetchSousVilles() {
      fetch(`${apiDomain}/api/sous/villes`)
        .then(res => res.json())
        .then(res => {
          this.svilles = res;
        })
        .catch(err => console.log(err));
    },

    packPhoto: function(event) {
      var input = event.target;
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        var vm = this;
        reader.onload = function(e) {
          vm.image_couverture = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
      console.log(input.files[0]);
    },

    setPack_id() {
      var vm = this;
      vm.zonepack.pack_id = this.pack.id;
    },

    createPack(e) {
      var formData = new FormData(e.target);
      formData.append("titre", this.pack.titre);
      formData.append("date_deb", this.pack.date_deb);
      formData.append("date_fin", this.pack.date_fin);
      formData.append("description", this.pack.description);
      formData.append("url_video", this.pack.url_video);
      formData.append("nb_place_max", this.pack.nb_place_max);
      formData.append("nb_place_dispo", this.pack.nb_place_dispo);
      formData.append("prix_fix", this.pack.prix_fix);
      formData.append("prix_enfant4", this.pack.prix_enfant4);
      formData.append("prix_enfant15", this.pack.prix_enfant15);
      formData.append("remise", this.pack.remise);
      formData.append("nb_place_remise", this.pack.nb_place_remise);
      formData.append("taux_remise", this.pack.taux_remise);
      formData.append("ville_id", this.pack.ville_id);
      formData.append("activite_id_principal", this.pack.activite_id_principal);
      formData.append("adrenaline", this.pack.adrenaline);
      formData.append("adagence_id", this.pack.adagence_id);
      formData.append("valide", 0);

      for (var i = 0; i < this.villepack.length; i++) {
        let zpack = this.villepack[i].ville_id;

        formData.append("villepack[" + i + "][ville_id]", zpack);

        for (var j = 0; j < this.villepack[i].zonepack.length; j++) {
          for (
            var k = 0;
            k < this.villepack[i].zonepack[j].zone_touristique_id.length;
            k++
          ) {
            let zidpack = this.villepack[i].zonepack[j].zone_touristique_id[k];
            formData.append(
              "villepack[" + i + "][zonepack][" + j + "][zone_touristique_id]",
              zidpack
            );
          }
        }
      }

      for (var i = 0; i < this.hebergementpack.hebergement_id.length; i++) {
        let hpack = this.hebergementpack.hebergement_id[i];

        formData.append("hebergementpack[" + i + "][hebergement_id]", hpack);
        formData.append(
          "hebergementpack[" + i + "][pack_id]",
          this.hebergementpack.pack_id
        );
      }
      axios
        .post(
          `${apiDomain}/api/create/pack?token=${this.$store.state.token}`,
          formData
        )
        .then(res => {
          if (res.status == 200) {
            this.$fire({
              text:
                "votre pack a été ajouté avec succès,en ttente de validation",
              type: "success",
              timer: 90000
            }).then(r => {
              window.location.reload();
            });
            /* if (confirm("pack Ajoutée")) {
              window.location.reload();
            } */
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

<style>
.feed {
  background: #fff;
  height: 106px;
  overflow: scroll;
}

.btdelete {
  padding: 11px 27px !important;
  margin-top: 38px;
  border-radius: 5px;
}
.btdeleteResp {
  padding: 11px 27px !important;
  margin-top: 0px;
  border-radius: 5px;
}

.custom-file-upload {
  display: inline-block;

  cursor: pointer;
}
</style>
