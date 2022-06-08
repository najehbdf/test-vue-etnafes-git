<template>
  <div class="content">
    <div v-if="user.role == 1">
      <div class="row">
        <div class="col-md-12">
          <card>
            <template slot="header">
              <h5 class="title" style="padding-top: 15px">
                Modifier les informations générales de votre hébergement
              </h5>
            </template>
            <form
              v-on:submit.prevent="
                updateHebergement(hebergement.id, hebergement)
              "
              class="mb-3"
            >
              <div class="row">
                <div class="col-md-4 pr-md-1 text-left">
                  <label class="control-label">
                    Nom
                    <span
                      v-if="validationErrors.nom"
                      style="padding-bottom: 5px; color: red"
                    >
                      <span class="alert-link"
                        >** {{ validationErrors.nom[0] }}</span
                      >
                    </span>
                  </label>
                  <base-input
                    type="text"
                    class="numHeb"
                    v-model="hebergement.nom"
                  ></base-input>
                  <!-- <p v-if="validationErrors.nom" style="padding-bottom:5px;color:red">
                  <span class="alert-link">** {{ validationErrors.nom[0] }}</span>
                  </p>-->
                </div>

                <div class="col-md-4 pl-md-1 text-left">
                  <label class="control-label">
                    Nombre des voyageurs
                    <span
                      v-if="validationErrors.nbr_voyageurs"
                      style="padding-bottom: 5px; color: red"
                    >
                      <span class="alert-link"
                        >** {{ validationErrors.nbr_voyageurs[0] }}</span
                      >
                    </span>
                  </label>
                  <base-input
                    min="0"
                    type="number"
                    class="numHeb"
                    v-model="hebergement.nbr_voyageurs"
                  ></base-input>
                  <!-- <p v-if="validationErrors.nbr_voyageurs" style="padding-bottom:5px;color:red">
                  <span class="alert-link">** {{ validationErrors.nbr_voyageurs[0] }}</span>
                  </p>-->
                </div>

                <div class="col-md-4 pl-md-1 text-left">
                  <div class="form-group">
                    <label class="control-label">
                      Nombre des places disponibles
                      <span
                        v-if="validationErrors.nbr_place_dispo"
                        style="padding-bottom: 5px; color: red"
                      >
                        <span class="alert-link"
                          >** {{ validationErrors.nbr_place_dispo[0] }}</span
                        >
                      </span>
                    </label>
                    <base-input
                      min="0"
                      type="number"
                      class="numHeb"
                      v-model="hebergement.nbr_place_dispo"
                    ></base-input>
                    <!-- <p v-if="validationErrors.nbr_place_dispo" style="padding-bottom:5px;color:red">
                    <span class="alert-link">** {{ validationErrors.nbr_place_dispo[0] }}</span>
                    </p>-->
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4 pr-md-1 text-left">
                  <label class="control-label">
                    Prix adulte
                    <span
                      v-if="validationErrors.prix_adulte"
                      style="padding-bottom: 5px; color: red"
                    >
                      <span class="alert-link"
                        >** {{ validationErrors.prix_adulte[0] }}</span
                      >
                    </span>
                  </label>
                  <base-input
                    placeholder="Prix adulte"
                    name="prix_adulte"
                    class="numHeb"
                    v-model="hebergement.prix_adulte"
                    type="number"
                  ></base-input>

                  <!-- <p v-if="validationErrors.prix_adulte" style="padding-bottom:5px;color:red">
                  <span class="alert-link">** {{ validationErrors.prix_adulte[0] }}</span>
                  </p>-->
                </div>
                <div class="col-md-4 pl-md-1 text-left">
                  <label class="control-label">
                    Prix pour enfant moins que 4 ans
                    <span
                      v-if="validationErrors.prix_enfant"
                      style="padding-bottom: 5px; color: red"
                    >
                      <span class="alert-link"
                        >** {{ validationErrors.prix_enfant[0] }}</span
                      >
                    </span>
                  </label>
                  <base-input
                    placeholder="Prix pour enfant moins que 4 ans"
                    name="prix_enfant"
                    class="numHeb"
                    v-model="hebergement.prix_enfant"
                    type="number"
                  ></base-input>

                  <!-- <p v-if="validationErrors.prix_enfant" style="padding-bottom:5px;color:red">
                  <span class="alert-link">** {{ validationErrors.prix_enfant[0] }}</span>
                  </p>-->
                </div>

                <div class="col-md-4 pl-md-1 text-left">
                  <label class="control-label">
                    Prix pour enfant plus que 4 ans
                    <span
                      v-if="validationErrors.prix_enfant15"
                      style="padding-bottom: 5px; color: red"
                    >
                      <span class="alert-link"
                        >** {{ validationErrors.prix_enfant15[0] }}</span
                      >
                    </span>
                  </label>
                  <base-input
                    placeholder="Prix pour enfant plus que 4 ans"
                    name="prix_enfant15"
                    class="numHeb"
                    v-model="hebergement.prix_enfant15"
                    type="number"
                  ></base-input>
                </div>
              </div>
              <div class="row">
                <div class="col-md-3 pr-md-1 text-left">
                  <div class="form-group">
                    <base-input
                      label="Nombre des chambres disponibles"
                      min="0"
                      type="number"
                      class="numHeb"
                      disabled
                      :value="
                        Number(hebergement.chambre_a_deux) +
                        Number(hebergement.chambre_a_trois) +
                        Number(hebergement.chambre_individuel)
                      "
                    ></base-input>
                  </div>
                </div>

                <div class="col-md-3 px-md-1 text-left">
                  <div class="form-group">
                    <base-input
                      label="(Chambre individuel)"
                      min="0"
                      type="number"
                      class="numHeb"
                      v-model="hebergement.chambre_individuel"
                    ></base-input>
                  </div>
                </div>

                <div class="col-md-3 pl-md-1 text-left">
                  <div class="form-group">
                    <base-input
                      min="0"
                      label="(Chambre à deux)"
                      type="number"
                      class="numHeb"
                      v-model="hebergement.chambre_a_deux"
                    ></base-input>
                  </div>
                </div>

                <div class="col-md-3 pl-md-1 text-left">
                  <div class="form-group">
                    <base-input
                      min="0"
                      label="(Chambre à trois)"
                      type="number"
                      class="numHeb"
                      v-model="hebergement.chambre_a_trois"
                    ></base-input>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12 pr-md-1 text-left">
                  <!-- <label>WiFi</label> -->
                  <div class="checkbox">
                    <label>
                      <input
                        aria-label="wifi"
                        name="wifi"
                        type="checkbox"
                        true-value="1"
                        false-value="0"
                        v-model.number="hebergement.wifi"
                      />
                      Wi-Fi </label
                    >&nbsp;
                    <label>
                      <input
                        aria-label="linge"
                        true-value="1"
                        false-value="0"
                        name="lave_linge"
                        type="checkbox"
                        value="1"
                        v-model="hebergement.lave_linge"
                      />
                      Lave-linge
                    </label>
                    &nbsp;
                    <label>
                      <input
                        aria-label="chauffage"
                        true-value="1"
                        false-value="0"
                        name="chauffage"
                        type="checkbox"
                        value="1"
                        v-model="hebergement.chauffage"
                      />
                      Chauffage
                    </label>
                    &nbsp;
                    <label>
                      <input
                        aria-label="tv"
                        true-value="1"
                        false-value="0"
                        name="television"
                        type="checkbox"
                        value="1"
                        v-model="hebergement.television"
                      />
                      Television
                    </label>
                    &nbsp; &nbsp;
                    <label>
                      <input
                        aria-label="clim"
                        true-value="1"
                        false-value="0"
                        name="climatisation"
                        type="checkbox"
                        value="1"
                        v-model="hebergement.climatisation"
                      />
                      Climatisation
                    </label>
                    &nbsp;&nbsp;
                    <label>
                      <input
                        aria-label="eau"
                        true-value="1"
                        false-value="0"
                        name="eau_chaude"
                        type="checkbox"
                        value="1"
                        v-model="hebergement.eau_chaude"
                      />
                      Eau Chaude
                    </label>
                    &nbsp;&nbsp;
                    <label>
                      <input
                        aria-label="ordinateur"
                        true-value="1"
                        false-value="0"
                        name="espace_travail_ordinateur"
                        type="checkbox"
                        value="1"
                        v-model="hebergement.espace_travail_ordinateur"
                      />
                      Espace de travail pour ordinateur
                    </label>
                    &nbsp;&nbsp;
                    <label>
                      <input
                        aria-label="enfant"
                        true-value="1"
                        false-value="0"
                        name="espace_enfant"
                        type="checkbox"
                        value="1"
                        v-model="hebergement.espace_enfant"
                      />
                      Espace pour enfant
                    </label>
                    &nbsp;&nbsp;
                    <label>
                      <input
                        aria-label="bain"
                        true-value="1"
                        false-value="0"
                        name="salle_de_bain"
                        type="checkbox"
                        value="1"
                        v-model.number="hebergement.salle_de_bain"
                      />
                      Salle de bain
                    </label>
                    &nbsp;&nbsp;
                    <label>
                      <input
                        aria-label="cuisine"
                        true-value="1"
                        false-value="0"
                        name="cuisine"
                        type="checkbox"
                        value="1"
                        v-model="hebergement.cuisine"
                      />
                      Cuisine
                    </label>
                  </div>
                </div>
              </div>

              <br />
              <div class="form-group">
                <gmap-autocomplete
                  name="adresse"
                  @place_changed="setPlace"
                  @mouseout="addMarker"
                  :placeholder="hebergement.adresse"
                  style="
                    border: 1px solid #ced4da;
                    border-radius: 0.25rem;
                    transition: border-color 0.15s ease-in-out,
                      box-shadow 0.15s ease-in-out;
                    padding: 0.375rem 0.75rem;
                    width: 100%;
                  "
                ></gmap-autocomplete>
                <br />
              </div>

              <div class="col-sm-12">
                <gmap-map
                  :center="center"
                  :zoom="11"
                  style="width: 100%; height: 200px"
                >
                  <gmap-marker
                    :key="index"
                    v-for="(m, index) in markers"
                    :position="m.position"
                    @click="center = m.position"
                  ></gmap-marker>
                </gmap-map>
              </div>
              <br />

              <div class="row">
                <div class="col-md-6 text-left">
                  <div class="form-group">
                    <label>Gouvernorat</label>
                    <select
                      class="form-control"
                      id="SelectRegion"
                      @change="
                        updateVilleid;
                        fetchSousVille(hebergement.ville_id);
                      "
                      v-model="hebergement.ville_id"
                    >
                      <option value disabled selected>gouvernorat</option>
                      <option
                        v-for="ville in villes"
                        v-bind:key="ville.id"
                        v-bind:value="ville.id"
                      >
                        {{ ville.nom }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Ville</label>
                    <select
                      class="form-control"
                      v-model="hebergement.sville_id"
                    >
                      <option value disabled selected>ville</option>
                      <option
                        v-for="ville in sousvilles"
                        v-bind:key="ville.id"
                        v-bind:value="ville.id"
                      >
                        {{ ville.nom }}
                      </option>
                    </select>
                  </div>
                </div>

                <!--  <label class="control-label">
                  Ville
                  <span
                    v-if="validationErrors.ville_id"
                    style="padding-bottom: 5px; color: red"
                  >
                    <span class="alert-link">** {{ validationErrors.ville_id[0] }}</span>
                  </span>
                </label>
                <select class="form-control" v-model="hebergement.ville_id" name="ville">
                  <option
                    v-for="ville in villes"
                    v-bind:key="ville.id"
                    v-bind:value="ville.id"
                  >{{ ville.nom }}</option>
                </select>-->
                <!-- <p v-if="validationErrors.ville_id" style="padding-bottom:5px;color:red">
                  <span class="alert-link">** {{ validationErrors.ville_id[0] }}</span>
                </p>-->
              </div>
              <div class="form-group">
                <label class="control-label">
                  Description
                  <span
                    v-if="validationErrors.description"
                    style="padding-bottom: 5px; color: red"
                  >
                    <span class="alert-link"
                      >** {{ validationErrors.description[0] }}</span
                    >
                  </span>
                </label>

                <textarea
                  rows="5"
                  required
                  v-model="hebergement.description"
                  class="form-control resize_vertical"
                  id="description"
                ></textarea>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <h5 class="title">
                    Dates réservées :
                    <span
                      v-for="(iii, index) in beforeShowDay"
                      :key="index"
                      hidden
                      >{{ iii }}</span
                    >
                    <br />
                    <!--   test {{ datesAll }} -->
                    <span
                      v-if="validationErrors.disponibilite"
                      style="padding-bottom: 5px; color: red"
                    >
                      <span class="alert-link"
                        >** {{ validationErrors.disponibilite[0] }}</span
                      >
                    </span>
                  </h5>
                </div>

                <!-- new2 -->

                <!--      <m-date-picker
                v-model="beforeShowDay"
                :format="formatDate"
                lang="en"
                :multi="multi"
                :always-display="true"
                ></m-date-picker>-->

                <!-- moez -->

                <!-- moez -->

                <!--  -->
              </div>

              <div class="row">
                <div class="col-md-12">
                  <b-card border-variant="warning" align="left">
                    <b-card-text>
                      <span v-for="(iii, index) in order" :key="index">
                        <center class="dateres" v-show="iii >= dd">
                          {{ iii }}
                          <img loading="lazy"
                            src="/close-etnafes.png"
                            width="18%"
                            @click="handleRemove2(beforeShowDay, index)"
                          />
                        </center>
                      </span>
                    </b-card-text>
                  </b-card>

                  <div style="width: 50px; hight: 50px">
                    <v-app>
                      <div>
                        <!--  :allowed-dates="datesAfterTodayMoez" -->
                        <!--  :min="nowDate" :allowed-dates="allowedDates" -->
                        <v-date-picker
                          :allowed-dates="disablePastDates"
                          scrollable
                          locale="fr"
                          v-model="date"
                          @input="save(date)"
                          :events="datesAll"
                          no-title
                          format-color="blue lighten-1"
                        ></v-date-picker>
                      </div>
                    </v-app>
                  </div>
                </div>
              </div>

              <button
                class="btn btn-success"
                type="submit"
                fill
                style="
                  margin-left: 10px;
                  border-radius: 15px 0px 15px !important;
                "
              >
                Modifier
              </button>
            </form>
          </card>
        </div>
      </div>

      <div>
        <b-modal
          id="modal-edit-image"
          :title="hebergement.nom"
          :imagehebergement="'imagehebergement'"
        >
          <form
            v-on:submit.prevent="
              updateImage(imagehebergement.id, imagehebergement)
            "
            class="mb-3"
          >
            <div class="row" style="padding: 10px">
              <div>
                <center>
                  <img loading="lazy"
                    alt="heberegement"
                    v-show="!showPreview"
                    :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_hebergement/${imagehebergement.url_image}`"
                    width="55%"
                    class="img"
                  />
                  <br />

                  <img loading="lazy"
                    v-bind:src="imagePreview"
                    v-show="showPreview"
                    width="55%"
                    class="img"
                  />
                  <br />
                </center>
                <b-form-file
                  accept="image/x-png, image/gif, image/jpeg"
                  placeholder="Choisir un fichier..."
                  v-model="file"
                  @change="onFileChange"
                ></b-form-file>
              </div>
            </div>
            <div>
              <center>
                <button
                  type="submit"
                  class="btn btn-info"
                  style="border-radius: 15px 0px 15px !important"
                >
                  Modifier
                </button>
              </center>
            </div>
          </form>
        </b-modal>
      </div>
      <br />
      <br />
      <div class="row">
        <div class="col-md-12">
          <card>
            <template slot="header">
              <h5 class="title" style="padding-top: 15px">
                Modifier les photos de votre hébergement
              </h5>
            </template>
            <div class="row">
              <div
                class="col-md-3"
                v-for="imagehebergement in imagehebergements"
                :key="imagehebergement.id"
              >
                <div>
                  <img loading="lazy"
                    alt="hebergement"
                    :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_hebergement/${imagehebergement.url_image}`"
                    class="img"
                    width="65%"
                  />&nbsp;
                  <label style="line-height: 35px">
                    <i
                      class="fa fa-edit text-info mr-3"
                      title="Edit image"
                      v-b-modal.modal-edit-image
                      @click="fetchImage(imagehebergement.id)"
                    ></i>
                  </label>
                </div>
                <br />
              </div>
            </div>
          </card>
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-md-12 text-left">
          <card>
            <h5 class="title" style="padding-top: 15px">
              Photos 360 de l'hébergement
            </h5>
            <form>
              <div class="form-group">
                <label for="my-file" v-if="images360.length == 4">
                  <B style="color: red">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="20"
                      height="20"
                      viewBox="0 0 172 172"
                      style="fill: #000000"
                    >
                      <g
                        fill="none"
                        fill-rule="nonzero"
                        stroke="none"
                        stroke-width="1"
                        stroke-linecap="butt"
                        stroke-linejoin="miter"
                        stroke-miterlimit="10"
                        stroke-dasharray
                        stroke-dashoffset="0"
                        font-family="none"
                        font-weight="none"
                        font-size="none"
                        text-anchor="none"
                        style="mix-blend-mode: normal"
                      >
                        <path d="M0,172v-172h172v172z" fill="none" />
                        <g>
                          <path
                            d="M12.9,153.725c-4.1495,0 -7.525,-3.3755 -7.525,-7.525c0,-1.4018 0.43645,-2.80145 1.333,-4.28065l72.4765,-119.325c1.66625,-2.74555 4.15165,-4.31935 6.8155,-4.31935c2.66385,0 5.14925,1.5738 6.8155,4.3215l72.4765,119.325c0.89655,1.47705 1.333,2.8767 1.333,4.2785c0,4.1495 -3.3755,7.525 -7.525,7.525z"
                            fill="#cccccc"
                          />
                          <path
                            d="M86,19.35c3.1218,0 5.0353,2.3822 5.89745,3.80335l36.23825,59.6625l36.23825,59.6625c0.7912,1.3029 1.17605,2.5198 1.17605,3.72165c0,3.5561 -2.8939,6.45 -6.45,6.45h-146.2c-3.5561,0 -6.45,-2.8939 -6.45,-6.45c0,-1.20185 0.38485,-2.41875 1.17605,-3.72165l36.23825,-59.6625l36.23825,-59.6625c0.86215,-1.42115 2.77565,-3.80335 5.89745,-3.80335M86,17.2c-3.39915,0 -6.08235,2.11345 -7.7357,4.8375c-72.4765,119.325 0,0 -72.4765,119.325c-0.8643,1.42545 -1.4878,3.0444 -1.4878,4.8375c0,4.74935 3.85065,8.6 8.6,8.6c3.76035,0 142.16015,0 146.2,0c4.74935,0 8.6,-3.85065 8.6,-8.6c0,-1.7931 -0.6235,-3.41205 -1.4878,-4.8375c-72.4765,-119.325 0,0 -72.4765,-119.325c-1.65335,-2.72405 -4.33655,-4.8375 -7.7357,-4.8375z"
                            fill="#ba9b48"
                          />
                          <path
                            d="M86,120.4c-4.74965,0 -8.6,3.85035 -8.6,8.6c0,4.74965 3.85035,8.6 8.6,8.6c4.74965,0 8.6,-3.85035 8.6,-8.6c0,-4.74965 -3.85035,-8.6 -8.6,-8.6zM86,60.2c-4.74935,0 -8.6,3.55395 -8.6,7.9378c0,2.93045 4.31075,40.0115 4.3301,40.16845c0.25585,1.96725 2.0683,3.49375 4.2699,3.49375c2.2016,0 4.01405,-1.5265 4.2699,-3.49375c0.01935,-0.15695 4.3301,-37.23585 4.3301,-40.16845c0,-4.38385 -3.85065,-7.9378 -8.6,-7.9378z"
                            fill="#36404d"
                          />
                        </g>
                      </g>
                    </svg>
                    Seullement 4 images peut être téléchargée!
                  </B>
                </label>
                <input
                  aria-label="label"
                  v-if="images360.length < 4"
                  type="file"
                  accept="image/*"
                  multiple="multiple"
                  @change="previewMultiImage360"
                  class="form-control-file"
                  id="my-file"
                />

                <div class="row">
                  <div
                    class="col-md-3"
                    v-for="(item, index) in preview_list360"
                    :key="index"
                  >
                    <img loading="lazy"
                      @click="Remove(item, index)"
                      class="close"
                      src="close-etnafes.png"
                    />
                    <br />

                    <img loading="lazy" :src="item" width="70%" class="preview" />
                  </div>
                </div>
              </div>
            </form>
          </card>
        </div>
        <div>
          <center>
            <form @submit.prevent="add360">
              <button
                type="submit"
                class="btn btn-info"
                style="border-radius: 15px 0px 15px !important"
              >
                Modifier image 360°
              </button>
            </form>
          </center>
        </div>
      </div>
    </div>
    <div class="container" v-else>
      <card>
        <p>Vous n'avez pas le droit de modifier cet hébergement</p>
      </card>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Card, BaseInput } from "@/components/index";
import mDatePicker from "./multiDatePicker.vue";
import { apiDomain } from "../config";
export default {
  props: {
    show: Boolean,
    showClose: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    Card,
    BaseInput,
    "m-date-picker": mDatePicker,
  },
  data() {
    return {
      preview_list360: [],

      images360: [],

      reservation_hebergement: [],
      reservation: [],
      sousvilles: {},
      currentDate: "",
      availableDates: [],
      dd: new Date().toISOString().slice(0, 10),
      dateAjouter: null,
      menu2: false,
      datesAll: [],
      validationErrors: "",
      places: [],
      address: "",
      center: { lat: 45.508, lng: -73.587 },
      markers: [],
      modalAdresse: false,
      showPreview: false,
      imagePreview: "",
      photo: "",
      des: [],
      multi: true,
      date: [],
      formstate: {},
      imagehebergement: {},
      imagehebergements: [],
      villes: [],
      file: null,
      file2: null,
      ordered: [],
      hebergement: {},
      hebergements: [],
      allowedDays: [],
    };
  },

  mounted() {
    this.geolocate();
    var dates = [];
    var currentDate = new Date();
    var endDate = new Date();
    endDate.setFullYear(endDate.getFullYear() + 1);
    var addDays = function (days) {
      var date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    };
    while (currentDate <= endDate) {
      dates.push(currentDate);
      currentDate = addDays.call(currentDate, 1);
    }
  },

  computed: {
    order() {
      if (this.datesAll) var test = this.datesAll.sort();
      return test;
    },
    datesAfterToday: function (date) {
      var dates = [];
      var currentDate = new Date();
      var endDate = new Date();

      endDate.setFullYear(endDate.getFullYear() + 1);

      var addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };

      while (currentDate <= endDate) {
        dates.push(currentDate);
        currentDate = addDays.call(currentDate, 1);
      }
    },

    format() {
      const date = this.date;
      var result = [];
      var somme = null;

      for (var i = 0; i < date.length; i++) {
        result.push(date[i]);
      }
      return result;
    },
    beforeShowDay() {
      var dispo = this.hebergement.disponibilite;
      var des = [];
      if (dispo) {
        des = dispo.split(",").sort();
      }

      return (this.datesAll = des);
    },
    loggedIn() {
      return this.$store.getters.get_loggedIn;
    },

    user() {
      return this.$store.getters.get_user;
    },
  },
  created() {
    this.fetchVilles();
    this.fetchHebergement(this.$route.params.id);
  },
  methods: {
    add360(e) {
      var formData = new FormData(e.target);
      formData.append("hebergement_id", this.$route.params.id);

      for (var j = 0; j < this.images360.length; j++) {
        let url_image = this.images360[j];
        formData.append("images360[" + j + "][url_image]", url_image);

        //  formData.append("hebergement_id", this.$route.params.id);
      }

      axios
        .post(`${apiDomain}/api/add360/${this.$route.params.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.status == 200) {
            this.$noty.success("votre hebergement a été ajouté avec succès.");
            this.$router.push({ name: "Hebergements" });
          }
        })
        .catch((error) => {
          if (error.response && error.response.status == 400) {
            this.validationErrors = error.response.data;
          }
        });
    },
    add36000(e) {
      let formData = new FormData(e.target);
      for (var j = 0; j < this.images360.length; j++) {
        let url_image = this.images360[j];
        formData.append("images360[" + j + "][url_image]", url_image);

        formData.append("hebergement_id", this.$route.params.id);
      }

      axios
        .post(`${apiDomain}/api/add360/${this.$route.params.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.status == 200) {
            this.$noty.success("votre image 360° a été ajouté avec succès.");
            this.$router.push({ name: "Hebergements" });
          }
        })
        .catch((error) => {
          if (error.response && error.response.status == 400) {
            this.validationErrors = error.response.data;
          }
        });
    },

    previewMultiImage360: function (event) {
      var input = event.target;
      var count = input.files.length;
      var index = 0;
      if (/\.(jpe?g|png|PNG|gif)$/i.test(input.files[index].name)) {
        while (count--) {
          var reader = new FileReader();
          reader.onload = (e) => {
            this.preview_list360.push(e.target.result);
          };
          this.images360.push(input.files[index]);
          reader.readAsDataURL(input.files[index]);
          index++;
        }
      } else {
        if (
          confirm(
            "Veuillez choisir uniquement un fichier de type image(jpeg,png,jpg)"
          )
        ) {
          console.log("test" + this.images360.length);
          this.images360[this.images360.length].splice(
            [this.images360.length],
            1
          );
          this.preview_list360[this.preview_list360.length].splice(
            [this.preview_list360.length],
            1
          );
        }
      }
    },
    fetchSousVille(id) {
      axios
        .get(`${apiDomain}/api/sous/villes/${id}`)
        .then(({ data }) => (this.sousvilles = data.sousvilles));
    },
    moez() {
      var dates = [];
      var currentDate = new Date();
      var endDate = new Date();

      endDate.setFullYear(endDate.getFullYear() + 1);

      var addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };

      while (currentDate <= endDate) {
        dates.push(currentDate);
        currentDate = addDays.call(currentDate, 1);
      }
      console.log(dates);

      return (this.allowedDays = dates);
    },

    datesAfterTodayMoez: function (date) {
      var dates = [];
      var currentDate = new Date();
      var endDate = new Date();

      endDate.setFullYear(endDate.getFullYear() + 1);

      var addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };

      while (currentDate <= endDate) {
        dates.push(currentDate);
        currentDate = addDays.call(currentDate, 1);
      }

      console.log(dates);
      return dates;
    },
    allowed() {
      return new Date().toISOString().substr(0, 10);
    },
    toAllowedDates(val, index) {
      const today = this.$moment(this.schedules[index].dayFrom, "YYYY-MM-DD");
      const maxAllowedDate = today.clone().add(1, "days");
      const currentDate = this.$moment(val);
      return (
        !today.isAfter(currentDate) && !currentDate.isAfter(maxAllowedDate)
      );
    },
    allowedDates() {
      var dates = [];
      var currentDate = new Date();
      var endDate = new Date();

      endDate.setFullYear(endDate.getFullYear() + 1);

      var addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };

      while (currentDate <= endDate) {
        dates.push(currentDate);
        currentDate = addDays.call(currentDate, 1);
      }
    },

    handleRemove2(file, index) {
      this.beforeShowDay.splice(index, 1);
    },

    deleteDate(index) {
      let i = this.beforeShowDay.map((item) => item.index).indexOf(index);
      this.beforeShowDay.splice(i, 1);
    },
    handleRemove(index) {
      this.beforeShowDay.splice(index, 1);

      this.$emit("change", this.beforeShowDay);
    },
    save: function (dateAjouter) {
      var index = this.datesAll.findIndex((x) => x === dateAjouter);

      if (index === -1) {
        this.datesAll.push(dateAjouter);
      } else {
        this.datesAll.splice(index, 1);
      }
    },
    getString: function (dt_string) {
      var weekday = new Array(7);
      weekday[1] = "Mon";
      weekday[2] = "Tue";
      weekday[3] = "Wed";
      weekday[4] = "Thu";
      weekday[5] = "Fri";
      weekday[6] = "Sat";
      weekday[0] = "Sun";

      var dt = new Date(dt_string);
      const dayWeek = dt.getUTCDay();

      return `${weekday[dayWeek]}, ${dt.getUTCMonth()}/${dt.getUTCDate()}`;
    },
    fetchVilles() {
      fetch(`${apiDomain}/api/villes`)
        .then((res) => res.json())
        .then((res) => {
          this.villes = res;
        })
        .catch((err) => console.log(err));
    },
    modalActionEntreprise() {
      if (this.modalAdresse == false) {
        this.modalAdresse = true;
      } else {
        this.modalAdresse = false;
      }
    },

    geolocate: function () {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    },

    getAddressData: function (addressData, placeResultData, id) {
      this.address = addressData;
    },
    setPlace(place) {
      this.adresse = place;
      if (this.adresse) {
        const marker = {
          lat: this.adresse.geometry.location.lat(),
          lng: this.adresse.geometry.location.lng(),
        };
        this.markers.push({ position: marker });
        this.places.push(this.adresse);
        this.center = marker;
        console.log(marker.lat);
        console.log(marker.lng);
        this.adresse = place;
      }
    },

    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        console.log(marker.lat);
        console.log(marker.lng);

        this.currentPlace = null;
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
    deleteImage(id) {
      if (confirm("Are You Sure?")) {
        fetch(`${apiDomain}/api/delete-image-hebergement/${id}`, {
          method: "delete",
        })
          .then((res) => res.json())
          .then((data) => {
            this.$noty.success("L''image a été supprimé...", {
              killer: true,
              timeout: 6000,
            });
            this.fetchHebergement(this.$route.params.id);
          })
          .catch((err) => console.log(err));
      }
    },

    updateImage(id, imagehebergement) {
      var formData = new FormData();
      formData.append("id", this.imagehebergement.id);
      formData.append("hebergement_id", this.imagehebergement.hebergement_id);
      formData.append("url_image", this.imagehebergement.url_image);
      axios
        .post(`${apiDomain}/api/images-hebergement-update/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.status == 200) {
            if (confirm("photo modifiée avec succés")) {
              window.location.reload();
            }
          }
        })
        .catch(function () {
          console.log("FAILURE!!");
        });
    },

    onFileChange(event) {
      this.imagehebergement.url_image = event.target.files[0];
      let reader = new FileReader();
      reader.addEventListener(
        "load",
        function () {
          this.showPreview = true;
          this.imagePreview = reader.result;
        }.bind(this),
        false
      );

      if (this.imagehebergement.url_image) {
        if (/\.(jpe?g|png|gif)$/i.test(this.imagehebergement.url_image.name)) {
          reader.readAsDataURL(this.imagehebergement.url_image);
        }
      }
    },
    fetchImage(id) {
      fetch(`${apiDomain}/api/images-hebergement/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.imagehebergement = res.imageshebergement;
        })
        .catch((err) => console.log(err));
    },

    fetchHebergement(id) {
      fetch(`${apiDomain}/api/hebergement/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.hebergement = res.hebergement;
          this.reservation = res.reservation;
          this.reservation_hebergement = res.reservation_hebergement;

          this.imagehebergements = res.hebergement.images_hebergement;
        })
        .catch((err) => console.log(err));
    },

    disablePastDates(val) {
      return val >= new Date().toISOString().substr(0, 10);
    },
    updateHebergement(e) {
      let formData = new FormData();
      if (this.places.length == 0) {
        formData.append("adresse", this.hebergement.adresse);
        formData.append("longitude", this.hebergement.longitude);
        formData.append("latitude", this.hebergement.latitude);
      } else if (this.places.length > 0) {
        formData.append("adresse", this.places[0].formatted_address);
        formData.append("longitude", this.center.lng);
        formData.append("latitude", this.center.lat);
      }
      formData.append("nom", this.hebergement.nom);
      formData.append("nbr_voyageurs", this.hebergement.nbr_voyageurs);
      formData.append(
        "nbr_chambre_dispo",
        Number(this.hebergement.chambre_a_deux) +
          Number(this.hebergement.chambre_a_trois) +
          Number(this.hebergement.chambre_individuel)
      );
      formData.append("nbr_place_dispo", this.hebergement.nbr_place_dispo);
      formData.append("description", this.hebergement.description);
      formData.append("wifi", this.hebergement.wifi);
      formData.append("chauffage", this.hebergement.chauffage);
      formData.append("television", this.hebergement.television);
      formData.append("climatisation", this.hebergement.climatisation);
      formData.append("eau_chaude", this.hebergement.eau_chaude);
      formData.append(
        "espace_travail_ordinateur",
        this.hebergement.espace_travail_ordinateur
      );

      formData.append("espace_enfant", this.hebergement.espace_enfant);
      formData.append("salle_de_bain", this.hebergement.salle_de_bain);
      formData.append("cuisine", this.hebergement.cuisine);
      formData.append("proprietaire_id", this.hebergement.proprietaire_id);
      formData.append("ville_id", this.hebergement.ville_id);
      formData.append(
        "chambre_individuel",
        this.hebergement.chambre_individuel
      );
      formData.append("chambre_a_deux", this.hebergement.chambre_a_deux);
      formData.append("chambre_a_trois", this.hebergement.chambre_a_trois);
      formData.append("prix_adulte", this.hebergement.prix_adulte);
      formData.append("prix_enfant15", this.hebergement.prix_enfant15);
      formData.append("prix_enfant", this.hebergement.prix_enfant);
      formData.append("disponibilite", this.order.toString());

      axios
        .post(
          `${apiDomain}/api/hebergement/${this.$route.params.id}?token=${this.$store.state.token}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )

        .then((res) => {
          if (res.status == 200) {
            this.$fire({
              text: "Votre hébergement a été modifié avec succés",
              type: "success",
              timer: 90000,
            }).then((r) => {
              this.$router.push({ name: "Hebergements" });
            });
          }
        })
        .catch((error) => {
          console.log(error.response.data);
          if (error.response.status == 422) {
            this.validationErrors = error.response.data;
          }
        });
    },
  },
};
</script>
<style>
.v-application--wrap {
  min-height: 1vh !important;
}
.dateres {
  max-width: 780px;
  border-radius: 24px 24px 24px 24px;
  padding: 6px;
  margin: 6px;
  display: inline-block;
  background: #a593ff;
}
.v-date-picker-table--date td {
  width: 15px;
}
</style>
