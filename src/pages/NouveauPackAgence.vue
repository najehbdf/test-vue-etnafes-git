<template>
  <div class="content">
    <b-tabs card>
      <b-tab title="Mes Filiales">
        <template #title>
          Mes Filiales
          <span
            v-if="agencesln > 0"
            class="badge badge-pill badge-danger"
            style="background-color: red"
            >{{ agencesln }}</span
          >
        </template>
        <Agences></Agences>
      </b-tab>

      <b-tab v-if="adagence.adagence == 1" title="Mes Packs"
        ><!-- v-if="adagence.adagence == 1" -->
        <template #title>
          Mes Packs
          <span
            v-if="packsln > 0"
            class="badge badge-pill badge-danger"
            style="background-color: red"
            >{{ packsln }}</span
          >
        </template>
        <PacksAgence></PacksAgence>
      </b-tab>

      <b-tab disabled v-if="adagence.adagence == 0" title="Mes Packs"
        ><!-- v-if="adagence.adagence == 1" -->
        <template #title>
          Mes Packs
          <span
            v-if="packsln > 0"
            class="badge badge-pill badge-danger"
            style="background-color: red"
            >{{ packsln }}</span
          >
        </template>
        <PacksAgence></PacksAgence>
      </b-tab>

      <b-tab title="Statistiques" v-if="adagence.adagence == 1">
        <DashboardAgence></DashboardAgence>
      </b-tab>
      <b-tab title="Statistiques" disabled v-if="adagence.adagence == 0">
        <DashboardAgence></DashboardAgence>
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
    "step-progress": StepProgress,
  },
  data() {
    return {
      markers: [],
      loading: false,

      adresse: "",
      places: [],

      center: { lat: 0, lng: 0 },
      currentPlace: null,
      myCoordinates: {
        lat: 0,
        lng: 0,
      },
      agences: {},
      seendeb: false,
      reservationsP: "",
      reservationsH: "",
      agencesln: "",
      packsln: "",
      validationzone: "",
      validationErrors: "",
      image_couverture: "",
      currentStep: {
        type: Number,
        default: 0,
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
              zone_touristique_id: [],
            },
          ],
        },
      ],
      hebergementpack: {
        pack_id: "",
        hebergement_id: [],
      },
      activités: {},
      programmes: [
        {
          description: "",
          titre: "",
        },
      ],
      filtre_zones: [],
      ville: {},
      villes: {},
      difference: "",
      pack: {
        nb_jours: 1,
        time: "",
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
        adagence_id: this.$store.state.propagence[0].id,
      },
      hebergements: {},
      adagence: [],

      arr: [],
      zones: {},
    };
  },

  computed: {
    propagence() {
      return this.$store.getters.get_propagence;
    },
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
    previewImageRio: function (event) {
      // Reference to the DOM input element
      var input = event.target;
      // Ensure that you have a file before attempting to read it
      if (input.files && input.files[0]) {
        // create a new FileReader to read this image and convert to base64 format
        var reader = new FileReader();
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = (e) => {
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
        .then((res) => res.json())
        .then((res) => {
          this.reservationsAgence = res.reservations;
          this.reservationsP = res.reservationsP;
          this.reservationsH = res.reservationsH;
          this.reservationsHeb = res.reservationsHeb;
        })
        .catch((err) => console.log(err));
    },
    fetchPacks(id) {
      fetch(`${apiDomain}/api/agence/packs/${id}`)
        .then((res) => res.json())
        .then((res) => {
          agence.nom_ageb;
          this.packsln = res.packsln;
        })
        .catch((err) => console.log(err));
    },

    fetchAgences(id) {
      fetch(`${apiDomain}/api/agences/admin/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.agences = res.agences.data;

          this.agencesln = res.agencesln;
        })
        .catch((err) => console.log(err));
    },
    fetchAdagence(id) {
      fetch(`${apiDomain}/api/adagence/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.adagence = res;
        })
        .catch((err) => console.log(err));
    },

    fetchAllHebergements() {
      axios
        .get(`${apiDomain}/api/allhebergements`)
        .then(({ data }) => (this.hebergements = data.hebergements));
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
    calculInterval(date_deb, date_fin) {
      var date_deb = this.pack.date_deb,
        date_fin = this.pack.date_fin;
      this.difference = date_fin - date_deb;
      this.seendeb = true;

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
          params: _.omit(this.selected, "loadCategorie"),
        })
        .then((response) => {
          this.activités = response.data.categories;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    setPackHeb_id() {
      var vm = this;
      vm.hebergementpack.pack_id = this.pack.id;
    },
    removeProgramme: function (index) {
      Vue.delete(this.programmes, index);
    },
    addNewProgramme: function () {
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

    packPhoto: function (event) {
      var input = event.target;
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        var vm = this;
        reader.onload = function (e) {
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
      this.loading = true;
      var formData = new FormData(e.target);
      formData.append("time", this.pack.time);
      formData.append("nb_jours", this.pack.nb_jours);

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
      formData.append("agence_id", this.pack.agence_id);

      formData.append("adresse", this.adresse.formatted_address);
      formData.append("latitude", this.center.lat);
      formData.append("longitude", this.center.lng);

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
              "villepack[" + i + "][zonepack][" + k + "][zone_touristique_id]",
              zidpack
            );
            // console.log(zidpack);
          }
        }
      }

      /* for (var i = 0; i < this.hebergementpack.hebergement_id.length; i++) {
        let hpack = this.hebergementpack.hebergement_id[i];

        formData.append("hebergementpack[" + i + "][hebergement_id]", hpack);
        formData.append(
          "hebergementpack[" + i + "][pack_id]",
          this.hebergementpack.pack_id
        );
      } */
      axios
        .post(
          `${apiDomain}/api/create/pack?token=${this.$store.state.token}`,
          formData
        )
        .then((res) => {
          this.loading = false;

          if (res.status == 200) {
            this.$fire({
              text: "votre pack a été ajouté avec succès,en attente de validation par l'admin",
              type: "success",
              timer: 90000,
            }).then((r) => {
              window.location.reload();
            });
            /* if (confirm("pack Ajoutée")) {
              window.location.reload();
            } */
          }
        })
        .catch((error) => {
          this.loading = false;

          if (error.response && error.response.status == 400) {
            this.validationErrors = error.response.data;
          }
          if (this.image_couverture == "") {
            this.$noty.error(" OOPS! L'image de couverture est vide  !");
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
