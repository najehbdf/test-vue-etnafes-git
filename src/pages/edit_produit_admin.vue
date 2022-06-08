<template>
  <div class="content">
    <div class="row">
      <div class="col-md-12">
        <card>
          <template slot="header">
            <h5 class="title" style="padding-top: 15px">
              Modifier un produit pour femme R/A
            </h5>
          </template>
          <form @submit.prevent="createProduit">
            <div class="row">
              <div class="col-md-6 pr-md-1 text-left">
                <base-input
                  label="Nom"
                  placeholder="Nom"
                  v-model="produit.titre"
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
                <label>Femme R/A</label>
                <select
                  class="form-control"
                  v-model="produit.client_id"
                  name="ville"
                >
                  <option
                    v-for="femme in femmes"
                    v-bind:key="femme.client_id"
                    v-bind:value="femme.client_id"
                  >
                    {{ femme.client.nom }} {{ femme.client.prenom }}
                  </option>
                </select>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 pr-md-1 text-left">
                <label>Zone Touristique</label>
                <select
                  class="form-control"
                  v-model="produit.zone_id"
                  name="zone_id"
                >
                  <option
                    v-for="zone in zones"
                    v-bind:key="zone.id"
                    v-bind:value="zone.id"
                  >
                    {{ zone.nom }}
                  </option>
                </select>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 pr-md-1 text-left">
                <base-input
                  label="Prix"
                  placeholder="0.00"
                  v-model="produit.prix"
                ></base-input>
                <p
                  v-if="validationErrors.prix"
                  style="padding-bottom: 5px; color: red"
                >
                  <span class="alert-link"
                    >** {{ validationErrors.prix[0] }}</span
                  >
                </p>
              </div>

              <div class="col-md-6 pr-md-1 text-left">
                <base-input
                  label="Quantité"
                  placeholder="Qts"
                  v-model="produit.qts"
                ></base-input>
                <p
                  v-if="validationErrors.qts"
                  style="padding-bottom: 5px; color: red"
                >
                  <span class="alert-link"
                    >** {{ validationErrors.qts[0] }}</span
                  >
                </p>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12 text-left">
                <base-input>
                  <label>Description</label>
                  <span
                    style="float: right; color: red"
                    v-if="produit.description.length < 50"
                    >{{ produit.description.length }}/50</span
                  >
                  <span
                    style="float: right; color: green"
                    v-if="produit.description.length > 50"
                    >{{ produit.description.length }}/450</span
                  >

                  <b-form-textarea
                    id="textarea-state"
                    v-model="produit.description"
                    :state="produit.description.length >= 50"
                    placeholder="Entrer 50 caractéres au minimum"
                    rows="3"
                    maxlength="450"
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

            <br />

            <br />
            <div class="row">
              <button
                class="btn btn-success"
                type="submit"
                fill
                style="margin-left: 10px; border-radius: 18px 0px 18px 0px"
              >
                Modifier
              </button>
            </div>
          </form>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import { Card, BaseInput } from "@/components/index";
import BaseButton from "@/components/BaseButton";
import { apiDomain } from "../config";
export default {
  components: {
    draggable,
    Card,
    BaseInput,
    BaseButton,
  },

  props: {
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
      images: [],
      preview_list: [],
      dialogVisible: false,
      dialogImageUrl: "",
      list: [],
      description: "",
      sousvilles: {},
      villespays: {},
      pays: {},
      validationErrors: "",
      markers: [],
      places: [],
      currentPlace: null,
      files: [],
      images: [],
      ville: {},
      femmes: {},
      produit: {},
      zones: {},
      villes: {},
      pays_id: "",
      zone: {
        description: "",

        titre: "",
        qts: "",
        prix: "",
        client_id: "",
        zone_id: "",

        center: { lat: 35.6711663, lng: 10.1005469 },
      },
    };
  },
  created() {
    this.fetchPays();

    this.fetchVilles();
    this.fetchFemme();
    this.fetchallzones();
    this.fetchProduit(this.$route.params.id);
  },
  methods: {
    fetchProduit() {
      fetch(`${apiDomain}/api/get_produit/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.produit = res;
        })
        .catch((err) => console.log(err));
    },
    fetchallzones() {
      fetch(`${apiDomain}/api/allzones`)
        .then((res) => res.json())
        .then((res) => {
          this.zones = res.zones;
        })
        .catch((err) => console.log(err));
    },
    fetchFemme() {
      fetch(`${apiDomain}/api/allFemmes`)
        .then((res) => res.json())
        .then((res) => {
          this.femmes = res.femmes;
        })
        .catch((err) => console.log(err));
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
    zonePhoto: function (event) {
      var input = event.target;
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        var vm = this;
        reader.onload = function (e) {
          vm.zone.image_couverture = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
      console.log(input.files[0]);
    },
    handlePreview(url) {
      this.dialogImageUrl = url;
      this.dialogVisible = true;
    },

    handleRemove(file, index) {
      this.list.splice(index, 1);
      this.$emit("change", this.list);
    },
    handleSuccess(res, file) {
      this.list.push(URL.createObjectURL(file.raw));
      this.images.push(file.raw);
      // this.$emit("change", this.list);
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
      if (maxLt) {
        this.$message.error(
          "Seullement 5 images peut être téléchargée, veuillez la supprimer avant de la télécharger!"
        );
      }

      return isValidFormat && isLt2M && !maxLt;
    },
    updateList(list) {
      this.$emit("change", list);
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

    setPlace(place) {
      this.currentPlace = place;
      this.zone.adresse = place;
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.zone.center = marker;
        // lat and lng, In front-end javascript does not support file management due to security concerns.
        console.log(marker.lat);
        console.log(marker.lng);

        this.currentPlace = null;
      }
    },
    handleFilesUpload() {
      let uploadedFiles = this.$refs.files.files;

      /*
          Adds the uploaded file to the files array
        */
      for (var i = 0; i < uploadedFiles.length; i++) {
        this.files.push(uploadedFiles[i]);
      }
    },

    Remove(file, index) {
      this.preview_list.splice(index, 1);
      this.images.splice(index, 1);
      console.log("testDelete" + index);
    },

    removeFile(key) {
      this.files.splice(key, 1);
    },

    addFiles() {
      this.$refs.files.click();
    },

    fetchVilles() {
      fetch(`${apiDomain}/api/villes`)
        .then((res) => res.json())
        .then((res) => {
          this.villes = res;
        })
        .catch((err) => console.log(err));
    },

    createProduit(e) {
      var formData = new FormData(e.target);
      formData.append("titre", this.zone.titre);
      formData.append("description", this.zone.description);
      formData.append("prix", this.zone.prix);
      formData.append("qts", this.zone.qts);
      formData.append("client_id", this.zone.client_id);

      /*   formData.append("adresse", this.zone.adresse.formatted_address);
      formData.append("latitude", this.zone.center.lat);
      formData.append("longitude", this.zone.center.lng); */

      for (var i = 0; i < this.images.length; i++) {
        let file = this.images[i];
        formData.append("images[" + i + "][image]", file);
      }
      axios
        .post(`${apiDomain}/api/ajouter_produit`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.status == 200) {
            this.$noty.success("votre produit a été créé.");
            this.$router.push({ name: "ListesProduitFemmeAdmin" });
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

