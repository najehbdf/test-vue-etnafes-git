<template>
  <div class="content">
    <div class="row">
      <div class="col-md-12">
        <card>
          <template slot="header">
            <h5 class="title" style="padding-top: 15px">
              Ajouter une Actuialité
            </h5>
          </template>
          <form @submit.prevent="createActu">
            <card style="border: solid 1px #7a7979; padding: 15px">
              <div class="row">
                <div class="col-md-6 pr-md-1 text-left">
                  <base-input
                    label="Titre"
                    placeholder="Titre"
                    v-model="titre"
                  ></base-input>
                  <p
                    v-if="validationErrors.titre"
                    style="padding-bottom: 5px; color: red"
                  >
                    <span class="alert-link"
                      >** {{ validationErrors.titre[0] }}</span
                    >
                  </p>
                </div>
                <div class="col-md-6 pr-md-1 text-left">
                  <base-input
                    label="ID "
                    placeholder="ID de pack ou hébérgement"
                    v-model="id_act"
                  ></base-input>
                  <p
                    v-if="validationErrors.titre"
                    style="padding-bottom: 5px; color: red"
                  >
                    <span class="alert-link"
                      >** {{ validationErrors.titre[0] }}</span
                    >
                  </p>
                </div>
              </div>
              <div class="row">
                <div>
                  <b-form-group
                    label="Ajout de lien"
                    v-slot="{ ariaDescribedby }"
                  >
                    <b-form-radio
                      v-model="lien"
                      :aria-describedby="ariaDescribedby"
                      name="some-radios"
                      value="https://etnafes.com/pack"
                      >https://etnafes.com/pack</b-form-radio
                    >
                    <b-form-radio
                      v-model="lien"
                      :aria-describedby="ariaDescribedby"
                      name="some-radios"
                      value="https://etnafes.com/reservationhebergement"
                      >https://etnafes.com/reservationhebergement</b-form-radio
                    >
                  </b-form-group>

                  <div class="mt-3">
                    Lien : <strong>{{ lien }}/{{ id_act }}</strong>
                  </div>
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-md-12 text-left">
                  <base-input>
                    <label>Description</label>
                    <span
                      style="float: right; color: red"
                      v-if="description.length < 50"
                      >{{ description.length }}/50</span
                    >
                    <span style="float: right; color: green" v-if="length > 50"
                      >{{ description.length }}/238</span
                    >
                    <b-form-textarea
                      id="textarea-state"
                      :state="description.length >= 50"
                      rows="4"
                      maxlength="238"
                      cols="80"
                      class="form-control"
                      placeholder="Entrez ici la description du pack"
                      name="description"
                      v-model="description"
                    ></b-form-textarea>
                  </base-input>

                  <p
                    v-if="validationErrors.description"
                    style="padding-bottom: 5px; color: red"
                  >
                    <span class="alert-link"
                      >** {{ validationErrors.description[0] }}</span
                    >
                  </p>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12 pr-md-1 text-left">
                  <label>Image </label>
                  <br />
                  <input
                    aria-label="label"
                    required
                    name="image"
                    type="file"
                    @change="ActuialitePhoto"
                    class="input-file"
                    accept="image/x-png, image/gif, image/jpeg"
                  />
                </div>
              </div>
              <div class="row">
                <button
                  class="btn btn-success"
                  type="submit"
                  fill
                  style="
                    margin-left: 10px;
                    border-radius: 18px 0px 18px 0px;
                    margin-top: 20px;
                  "
                >
                  Ajouter
                </button>
              </div>
            </card>
            <br />
          </form>
        </card>
      </div>
    </div>
  </div>
</template>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<script>
import StepProgress from "vue-step-progress";
import { VueDatePicker } from "@mathieustan/vue-datepicker";
// import the css (OPTIONAL - you can provide your own design)
import "vue-step-progress/dist/main.css";
import Vue from "vue";
import { Card, BaseInput } from "@/components/index";
import BaseButton from "@/components/BaseButton";
import { apiDomain } from "../config";

export default {
  components: {
    VueDatePicker,
    Card,
    BaseInput,
    BaseButton,

    "step-progress": StepProgress,
  },
  data() {
    return {
      markers: [],

      adresse: "",
      places: [],

      center: { lat: 35.6711663, lng: 10.1005469 },
      currentPlace: null,
      myCoordinates: {
        lat: 0,
        lng: 0,
      },
      options: [],
      zones: [],

      value: [],

      activités: {},
      validationErrors: "",
      currentStep: {
        type: Number,
        default: 0,
      },
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
              zone_touristique_id: [],
            },
          ],
        },
      ],
      hebergementpack: {
        pack_id: "",
        hebergement_id: [],
      },
      programmes: [
        {
          description: "",
          titre: "",
        },
      ],
      // zonepack: [{ zonesville: {} }],
      zville: [],
      vhebergements: [],
      svhebergements: [],
      filtre_zones: [],
      ville: {},
      villes: {},
      svilles: {},

      titre: "",

      description: "",
      lien: "",

      id_act: "",
      image: "",

      hebergements: {},
    };
  },

  created() {
    this.loadCategories();
    this.fetchVilles();
    this.fetchZones();
    this.fetchSousVilles();

    this.fetchAllHebergements();
  },

  computed: {
    villeValue() {
      return this.zones.map((zone) => zone.ville_id);
    },
    ZonesArray() {
      return _.map(this.zones, function (num, key) {
        return num.name;
      });
    },
    getAllvilleidselected() {
      var result = [];
      const villepack = this.villepack;
      for (var i = 0; i < villepack.length; i++) {
        var t = villepack[i].ville_id;
        result.push(villepack[i].ville_id);
      }
      return result;
    },
  },

  methods: {
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
    setPlace___(place) {
      this.currentPlace = place;
      this.adresse = place;
    },

    addMarker__() {
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
    addTag(newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000),
      };
      this.options.push(tag);
      this.value.push(tag);
    },
    loadCategories() {
      axios
        .get(`${apiDomain}/api/loadCategorie`, {
          params: _.omit(this.selected, "loadCategorie"),
        })
        .then((response) => {
          this.activités = response.data.categories;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    removeProgramme: function (index) {
      Vue.delete(this.programmes, index);
    },
    addNewProgramme: function () {
      this.programmes.push(Vue.util.extend({}, this.programme));
    },

    removeZone: function (index, villepack) {
      Vue.delete(this.villepack, index);
    },
    addNewCircuit: function () {
      this.villepack.push({
        zonesville: [],
        check: 1,
        ville_id: "",
        zonepack: [
          {
            zone_touristique_id: [],
            ville_pack_id: "",
          },
        ],
      });
    },

    addRow: function () {
      this.zonepack.push(Vue.util.extend({}, this.zone));
    },
    fetchAllHebergements() {
      axios
        .get(`${apiDomain}/api/allhebergements`)
        .then(({ data }) => (this.hebergements = data.hebergements));
    },

    fetchZones() {
      fetch(`${apiDomain}/api/allzones`)
        .then((res) => res.json())
        .then((res) => {
          this.zones = res.zones;
          this.options = res.zones;
        })
        .catch((err) => console.log(err));
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
        .then((res) => res.json())
        .then((res) => {
          this.svilles = res;
        })
        .catch((err) => console.log(err));
    },

    ActuialitePhoto: function (event) {
      var input = event.target;
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        var vm = this;
        reader.onload = function (e) {
          vm.pack.image = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
      console.log(input.files[0]);
    },

    setPack_id() {
      var vm = this;
      vm.villepack.pack_id = this.pack.id;
    },

    setPackHeb_id() {
      var vm = this;
      vm.hebergementpack.pack_id = this.pack.id;
    },

    fetchHebSVille(id) {
      axios
        .get(`${apiDomain}/api/hebergements/sville/${id}`)
        .then(({ data }) => (this.svhebergements = data.hebergements));
    },

    fetchHebVille(id) {
      axios
        .get(`${apiDomain}/api/hebergements/ville/${id}`)
        .then(({ data }) => (this.vhebergements = data.hebergements));
    },
    createActu(e) {
      var formData = new FormData(e.target);
      formData.append("titre", this.titre);
      formData.append("lien", this.lien);
      formData.append("id_act", this.id_act);
      formData.append("description", this.description);

      axios
        .post(`${apiDomain}/api/add_actualite`, formData)
        .then(function (response) {
          if (response.status == 200) {
            if (confirm("Actuialité Ajoutée")) {
              this.$router.push({ name: "AllPacks" });
            }
          }
        })
        .catch((error) => {
          if (error.response && error.response.status == 400) {
            this.validationErrors = error.response.data;
          }
        });
    },
  },
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
</style>

