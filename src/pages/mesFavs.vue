<template>
  <div class="content">
    <div>
      <!--  Packs
      <span
        class="badge badge-pill badge-danger"
        style="background-color: red"
        >{{ mesFavs.length }}</span
      >
      <br /> -->
      <div v-if="mesFavs.length > 0" class="row">
        <div class="col-md-12">
          <card>
            <div class="row">
              <div class="col-lg-4" v-for="(pack, i) in mesFavs" :key="pack.id">
                <div
                  class="card"
                  style="
                    margin-bottom: 30px;
                    margin-top: 10px;
                    border: 1px solid #857979;
                  "
                >
                  <router-link
                    :to="{ name: 'DetailsPackAvis', params: { id: pack.id } }"
                  >
                    <div class="card-img-wrap">
                      <img loading="lazy"
                        class="card-img-top"
                        id="imagepack"
                        :src="`${apiDomain}/myapp/public/uploads/files_packs/${pack.image_couverture}`"
                        alt="Card image cap"
                      />
                    </div>
                  </router-link>
                  <div class="card-block" style="height: 170px">
                    <h4 class="card-title" style="color: #c37600">
                      {{ pack.titre }}
                    </h4>
                    <button
                      title="Retiré mon favorite"
                      @click="deleteFav(pack.idFav)"
                      class="
                        top-right
                        btn btn-warning btn-round btn-icon
                        addFav
                      "
                    >
                      <i
                        class="tim-icons icon-heart-2"
                        style="vertical-align: middle"
                      ></i>
                    </button>

                    <h4
                      class="card-title"
                      style="color: #c37600"
                      v-if="
                        pack.date_deb < new Date().toISOString().split('T')[0]
                      "
                    >
                      <span
                        class="badge badge-warning"
                        style="background-color: #ff4012"
                        >Pack expiré</span
                      >
                    </h4>

                    <h4
                      class="card-title"
                      style="color: #c37600"
                      v-if="
                        pack.date_deb >
                          new Date().toISOString().split('T')[0] && i <= 1
                      "
                    >
                      <span
                        class="badge badge-success"
                        style="background-color: #28b351"
                        >Nouveau pack</span
                      >
                    </h4>
                    <div>{{ pack.description }}</div>
                    <!-- <div class="output" style="margin-top: 5px">
                        <p style="padding: 10px">
                          <HighlightWords
                            class="wrapper"
                            highlightClassName="highlight"
                            highlightTag="i"
                            :searchWords="keywords"
                            :autoEscape="true"
                            :textToHighlight="pack.description"
                          ></HighlightWords>
                        </p>
                      </div>-->
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </card>
        </div>
      </div>
      <div v-else>Aucun pack sur votre favoris</div>
    </div>

    
  </div>
</template>
<script>
import HighlightWords from "vue-highlight-words";
import draggable from "vuedraggable";
import Vue from "vue";
import { Card, BaseInput } from "@/components/index";
import ProprietaireReservations from "./ProprietaireReservations";
import AllHebergements from "./AllHebergements";
import DashboardProprietaire from "./DashboardProprietaire";
import ProprietaireProfile from "./ProprietaireProfile";

import mDatePicker from "./multiDatePicker.vue";
import BaseButton from "@/components/BaseButton";
import { apiDomain } from "../config";
export default {
  components: {
    HighlightWords,
    draggable,
    Card,
    BaseInput,
    ProprietaireReservations,
    DashboardProprietaire,
    ProprietaireProfile,
    AllHebergements,
    BaseButton,
    "m-date-picker": mDatePicker,
  },
  props: {
    min: {
      type: Number,
      default: 1,
    },
    max: {
      type: Number,
      default: 5,
    },
    action: {
      type: String,
      default: "https://jsonplaceholder.typicode.com/posts/",
    },
  },
  data() {
    return {
      apiDomain: "https://etnafesapi20212018.etnafes.com",
      mesFavs: {},
      showdetailleModale: false,
      detaille: {
        id: "",
      },
      index: -1,
      /*  */
      reservationsUnread: "",
      reservationspUnread: "",
      hebergementsunread: "",
      files: [],
      images: [],
      preview_list: [],
      errorsimage: "",
      sousvilles: {},
      villespays: {},
      pays: {},
      pays_id: "",
      ville_id: "",
      currentDate: "",
      availableDates: [],
      dd: new Date().toISOString().slice(0, 10),
      dateAjouter: null,
      menu2: false,
      datesAll: [],
      /* moez */
      list: [],
      auto: false,
      filesun: [],
      dialogImageUrl: "",
      proprietaire: {},
      dialogVisible: false,
      validationErrors: {},
      multi: true,
      date: [],
      dd: [],
      disponibilites: [],
      markers: [],
      places: [],
      currentPlace: null,
      images: [],
      imagesnot: [],
      ville: {},
      villes: {},
      pack: {},
      hebergement: {
        sous_ville_id: "",
        nom: "",
        nbr_voyageurs: "",
        description: "",
        ville_id: "",
        adresse: "",
        prix_adulte: "",
        prix_enfant: "",
        prix_enfant15: "",
        disponibilite: "",
        nbr_chambre_dispo: "",
        nbr_place_dispo: "",
        chambre_a_trois: 0,
        chambre_a_deux: 0,
        chambre_individuel: 0,
        wifi: 0,
        lave_linge: 0,
        chauffage: 0,
        television: 0,
        climatisation: 0,
        eau_chaude: 0,
        espace_travail_ordinateur: 0,
        espace_enfant: 0,
        salle_de_bain: 0,
        cuisine: 0,
        proprietaire_id: this.$store.state.prop[0].id,
        center: { lat: 35.6711663, lng: 10.1005469 },
      },
    };
  },
  created() {
    this.fetchPays();
    this.fetchVilles();
    this.fetchMesFavs(this.$store.state.user.id);
    this.fetchproprietaire(this.$store.state.prop[0].id);
    this.fetchUnreadHeb(this.$store.state.prop[0].id);
    this.fetchReservations(this.$store.state.prop[0].id);
    this.fetchReservationsPack(this.$store.state.prop[0].id);
  },
  computed: {
    prop() {
      return this.$store.getters.get_prop;
    },
    /* moez */
    order() {
      var test = this.datesAll.sort();
      return test;
    },
    format() {
      const date = this.date;
      var result = [];
      var somme = null;
      for (var i = 0; i < date.length; i++) {
        const y = date[i].getFullYear();
        const m = date[i].getMonth() + 1;
        const d = date[i].getDate();
        somme = y + "-" + m + "-" + d;
        result.push(somme);
      }
      return result;
    },
  },
  methods: {
    showEditModal(pack, index) {
      let obj = {
        id: pack.idFav,
      };
      this.detaille = obj;
      this.showdetailleModale = true;
      this.index = index;
    },

    showdetaille(pack) {
      this.detaille = pack;
      this.showdetailleModale = true;
    },
    fetchMesFavs(id) {
      fetch(`${apiDomain}/api/allpacks/fav/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.mesFavs = res;
        })
        .catch((err) => console.log(err));
    },

    deleteFav(id) {
      /*  if (confirm("Are You Sure?")) { */
      fetch(`${apiDomain}/api/UNfavoritePack2/${id}`, {
        method: "delete",
      })
        .then((res) => res.json())
        .then((data) => {
          this.$fire({
            text: "Votre favoris a été retiré avec succés",
            type: "success",
            timer: 5000,
          }).then((r) => {
            console.log(r.value);
            this.fetchMesFavs(this.$store.state.user.id);
          });
        })

        .catch((err) => console.log(err));
      /*  } */
    },
    deleteFav1(id) {
      //  this.$confirm("Are you sure?").then(() => {
      //do something...

      this.$fire({
        text: "Rétirer à vos favoris??",
        type: "question",
        timer: 9000,
      }).then((r) => {
        fetch(`${apiDomain}/api/UNfavoritePack2/${id}`, {
          method: "delete",
        })
          .then((res) => res.json())
          .then((data) => {
            this.fetchMesFavs(this.$store.state.user.id);
            // alert("Votre favoris est retirer");
            /* this.$fire({
              text: "Votre favoris a été retiré avec succés",
              type: "success",
              timer: 5000,
            }).then((r) => {
              console.log(r.value);
              this.fetchMesFavs(this.$store.state.user.id);
              
            }); */
          })

          .catch((err) => console.log(err));
      });
    },

    fetchReservations(id) {
      fetch(`${apiDomain}/api/reservation-proprietaire-libre/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.reservationsUnread = res.reservationc;
        })
        .catch((err) => console.log(err));
    },

    fetchReservationsPack(id) {
      fetch(`${apiDomain}/api/reservation-proprietaire-pack/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.reservationspack = res.reservations;
          this.reservationspUnread = res.reservationp;
        })
        .catch((err) => console.log(err));
    },
    fetchproprietaire(id) {
      fetch(`${apiDomain}/api/prop/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.proprietaire = res.proprietaire;
        })
        .catch((err) => console.log(err));
    },
    hebPhoto: function (event) {
      var input = event.target;
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        var vm = this;
        reader.onload = function (e) {
          vm.hebergement.image_couverture = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
      console.log(input.files[0]);
    },
    previewMultiImage: function (event) {
      var input = event.target;
      var count = input.files.length;
      var index = 0;
      if (/\.(jpe?g|png|PNG|gif)$/i.test(input.files[index].name)) {
        while (count--) {
          var reader = new FileReader();
          reader.onload = (e) => {
            this.preview_list.push(e.target.result);
          };
          this.images.push(input.files[index]);
          reader.readAsDataURL(input.files[index]);
          index++;
        }
      } else {
        if (
          confirm(
            "Veuillez choisir uniquement un fichier de type image(jpeg,png,jpg)"
          )
        ) {
          console.log("test" + this.images.length);
          this.images[this.images.length].splice([this.images.length], 1);
          this.preview_list[this.preview_list.length].splice(
            [this.preview_list.length],
            1
          );
        }
      }
    },

    Remove(file, index) {
      this.preview_list.splice(index, 1);
      this.images.splice(index, 1);
      console.log("testDelete" + index);
    },
    updateVilleid(e) {
      this.$store.commit("updateVilleid", e.target.value);
    },
    fetchSousVille(id) {
      axios
        .get(`${apiDomain}/api/sous/villes/${id}`)
        .then(({ data }) => (this.sousvilles = data.sousvilles));
    },

    fetchVillesPays(id) {
      axios
        .get(`${apiDomain}/api/pays/villes/${id}`)
        .then(({ data }) => (this.villespays = data.villes));
    },
    fetchPays() {
      axios.get(`${apiDomain}/api/pays`).then(({ data }) => (this.pays = data));
    },
    /* moez */
    disablePastDates(val) {
      return val >= new Date().toISOString().substr(0, 10);
    },
    handleRemove2(file, index) {
      this.order.splice(index, 1);
    },
    save: function (dateAjouter) {
      var index = this.datesAll.findIndex((x) => x === dateAjouter);

      if (index === -1) {
        this.datesAll.push(dateAjouter);
      } else {
        this.datesAll.splice(index, 1);
      }
    },

    /* moez */
    updateList(list) {
      this.$emit("change", list);
    },
    beforeUpload(file) {
      const isValidFormat =
        [
          "image/jpeg",
          "image/JPEG",

          "image/JPG",
          "image/jpg",
          "image/PNG",
          "image/png",
        ].indexOf(file.type) > -1;
      const isLt2M = file.size / 1024 / 1024 < 0.512; // 1M

      if (!isValidFormat) {
        this.$message.error(
          "Veuillez choisir uniquement un fichier de type image(jpeg,png,jpg)"
        );
      } else if (!isLt2M) {
        this.$message.error("Votre image à passé 512 KO!");
      }

      const maxLt = this.max === 1 && this.list.length > 0;
      // const minLt = this.min === 1 && this.list.length > 0;

      if (maxLt) {
        this.$message.error(
          "Seullement 5 images peut être téléchargée, veuillez la supprimer avant de la télécharger!"
        );
      }

      return isValidFormat && isLt2M && !maxLt;
    },

    handleRemove(file, index) {
      this.list.splice(index, 1);
      this.$emit("change", this.list);
    },

    handlePreview(url) {
      this.dialogImageUrl = url;
      this.dialogVisible = true;
    },
    uploadImageList(file) {
      this.images.push(file.raw);

      for (var i = 0; i < this.images.length; i++) {
        let file = this.images[i];
        let test = file.name.split(".").pop();
        console.log(test);
        if (test != "png" && test != "jpg") {
          this.$message.error("Only upload jpg/png picture!");
          this.images.splice(i, 1);
        }
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    formatDate(date) {
      return date.toLocaleDateString();
    },
    removeDate: function (index) {
      Vue.delete(this.disponibilites, index);
    },
    addNewDate: function () {
      this.disponibilites.push(Vue.util.extend({}, this.disponibilite));
    },

    setPlace(place) {
      this.currentPlace = place;
      this.hebergement.adresse = place;
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.hebergement.center = marker;
        console.log(marker.lat);
        console.log(marker.lng);

        this.currentPlace = null;
      }
    },
    handleFilesUpload() {
      let uploadedFiles = this.$refs.files.files;
      for (var i = 0; i < uploadedFiles.length; i++) {
        // file.name.split(".").pop() != 'png'
        if (uploadedFiles[i].name.split(".").pop() != "png") {
          alert("error");
          return;
        } else {
          this.files.push(uploadedFiles[i]);
        }
      }
    },

    fetchVilles() {
      fetch(`${apiDomain}/api/villes`)
        .then((res) => res.json())
        .then((res) => {
          this.villes = res;
        })
        .catch((err) => console.log(err));
    },
    fetchUnreadHeb(id) {
      axios
        .get(
          `${apiDomain}/api/hebergements/unread/${this.$store.state.prop[0].id}`
        )
        .then((response) => (this.hebergementsunread = response.data.length))
        .catch((error) => console.log(error));
    },

    createHebergement(e) {
      var formData = new FormData(e.target);
      const date = this.date;
      formData.append("nom", this.hebergement.nom);
      formData.append("nbr_voyageurs", this.hebergement.nbr_voyageurs);
      formData.append("nbr_place_dispo", this.hebergement.nbr_place_dispo);
      formData.append(
        "nbr_chambre_dispo",
        Number(this.hebergement.chambre_a_deux) +
          Number(this.hebergement.chambre_a_trois) +
          Number(this.hebergement.chambre_individuel)
      );

      formData.append("disponibilite", this.order.toString());

      formData.append(
        "chambre_individuel",
        this.hebergement.chambre_individuel
      );
      formData.append("chambre_a_deux", this.hebergement.chambre_a_deux);
      formData.append("chambre_a_trois", this.hebergement.chambre_a_trois);

      formData.append("description", this.hebergement.description);
      formData.append("wifi", this.hebergement.wifi);
      formData.append("chauffage", this.hebergement.chauffage);
      formData.append("lave_linge", this.hebergement.lave_linge);
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
      formData.append("adresse", this.hebergement.adresse.formatted_address);
      formData.append("latitude", this.hebergement.center.lat);
      formData.append("longitude", this.hebergement.center.lng);
      formData.append("proprietaire_id", this.hebergement.proprietaire_id);
      formData.append("prix_adulte", this.hebergement.prix_adulte);
      formData.append("prix_enfant", this.hebergement.prix_enfant);
      formData.append("prix_enfant15", this.hebergement.prix_enfant15);

      formData.append("ville_id", this.hebergement.ville_id);
      formData.append("sville_id", this.hebergement.sous_ville_id);

      for (var i = 0; i < this.images.length; i++) {
        let file = this.images[i];

        formData.append("images[" + i + "][url_image]", file);
      }

      axios
        .post(`${apiDomain}/api/create/hebergement`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.status == 200) {
            this.$fire({
              text: "votre hebergement a été ajouté avec succès,en attente de validation",
              type: "success",
              timer: 90000,
            }).then((r) => {
              window.location.reload();
            });
            /* this.$noty.success("votre hebergement a été ajouté avec succès.");
            this.$router.push({ name: "nouveau_hebergement" }); */
          }
        })
        .catch((error) => {
          if (error.response && error.response.status == 400) {
            this.validationErrors = error.response.data;
          }

          if (error.response && error.response.status == 422) {
            this.errorsimage = error.response.data;
          }
        });
    },
  },
};
</script>
<style>
.addFav {
  border-radius: 50% !important;
  position: absolute !important;
  font-size: 1em !important;
  top: 6% !important;

  -webkit-transform: translate(-12px, -12px) !important;
  transform: translate(-12px, -12px) !important;
  line-height: 1.5626rem !important;
  width: 24px !important;
  background: #f70607 !important;
}

.addFav:hover {
  border-radius: 50% !important;
  position: absolute !important;
  font-size: 1em !important;
  top: 6% !important;

  -webkit-transform: translate(-12px, -12px) !important;
  transform: translate(-12px, -12px) !important;
  line-height: 1.5626rem !important;
  width: 24px !important;
  background: #929dcedc !important;
}
.NotFav {
  border-radius: 50% !important;
  position: absolute !important;
  font-size: 1em !important;
  top: 6% !important;

  -webkit-transform: translate(-12px, -12px) !important;
  transform: translate(-12px, -12px) !important;
  line-height: 1.5626rem !important;
  width: 24px !important;
  background: #929dcedc !important;
}

.NotFav:hover {
  border-radius: 50% !important;
  position: absolute !important;
  font-size: 1em !important;
  top: 6% !important;

  -webkit-transform: translate(-12px, -12px) !important;
  transform: translate(-12px, -12px) !important;
  line-height: 1.5626rem !important;
  width: 24px !important;
  background: #f70607 !important;
}

/*  */

.preview {
  border-radius: 24px;
  display: block;
  min-width: 100%;
  padding-bottom: -40%;
  position: absolute;
  margin: auto;
  overflow: hidden;
  background: linear-gradient(118deg, #f6f9fb, #e2ebef);
  position: relative;
  height: 74%;
  top: 13px;
  right: -6px;
  bottom: 0;
  left: 3px;
}

.close {
  top: 20px;
}

.v-application--wrap {
  min-height: 1vh !important;
}
.res {
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
