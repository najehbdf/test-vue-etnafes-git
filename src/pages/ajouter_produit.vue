<template>
  <div class="content">
    <div class="row">
      <div class="col-md-12">
        <card>
          <template slot="header">
            <h5 class="title" style="padding-top: 15px">
              Ajouter un produit pour femme R/A
            </h5>
          </template>
          <form @submit.prevent="createProduit">
            <div class="row">
              <div class="col-md-6 pr-md-1 text-left">
                <base-input
                  label="Nom"
                  placeholder="Nom"
                  v-model="zone.titre"
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
                  v-model="zone.client_id"
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
                  v-model="zone.zone_id"
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
                  v-model="zone.prix"
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
                  v-model="zone.qts"
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
                    v-if="zone.description.length < 50"
                    >{{ zone.description.length }}/50</span
                  >
                  <span
                    style="float: right; color: green"
                    v-if="zone.description.length > 50"
                    >{{ zone.description.length }}/450</span
                  >

                  <b-form-textarea
                    id="textarea-state"
                    v-model="zone.description"
                    :state="zone.description.length >= 50"
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

            <div class="row">
              <div class="col-md-12 pr-md-1 text-left">
                <label>Image de couverture</label>
                <br />
                <input
                  aria-label="label"
                  required
                  name="image_couverture"
                  type="file"
                  @change="zonePhoto"
                  class="input-file"
                  accept="image/x-png, image/gif, image/jpeg"
                />
              </div>
            </div>
            <br />

            <div class="row">
              <div class="col-md-12 text-left">
                <h5 class="title">Photos de produit</h5>
                <form>
                  <div class="form-group">
                    <label for="my-file" v-if="images.length == 4">
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
                      v-if="images.length < 4"
                      type="file"
                      accept="image/*"
                      multiple="multiple"
                      @change="previewMultiImage"
                      class="form-control-file"
                      id="my-file"
                    />

                    <div class="row">
                      <div
                        class="col-md-3"
                        v-for="(item, index) in preview_list"
                        :key="index"
                      >
                        <img
                          loading="lazy"
                          @click="Remove(item, index)"
                          class="close"
                          src="close-etnafes.png"
                        />
                        <br />

                        <img
                          loading="lazy"
                          :src="item"
                          width="70%"
                          class="preview"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <br />
            <div class="row">
              <button
                class="btn btn-success"
                type="submit"
                fill
                style="margin-left: 10px; border-radius: 18px 0px 18px 0px"
              >
                Enregistrer
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
  },
  methods: {
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
          "image/webp",
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

