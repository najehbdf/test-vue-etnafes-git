<template>
  <div class="content">
    <div class="row">
      <div class="col-md-12">
        <card>
          <template slot="header">
            <h5 class="title" style="padding-top: 15px">
              Modifier mon produit   &nbsp; &nbsp; <img class="retour" @click="$router.go(-1)"   onmouseover="this.style.cursor='pointer'" src="/r-etnafes.png" title="Retour" alt="etnafes" />
                      &nbsp; &nbsp;  <i
                          onmouseover="this.style.cursor='pointer'"
                          style="color: #fd5d93"
                          class="tim-icons icon-simple-remove"
                          title="Supprimer produit"
                          @click="deleteProduit(this.$route.params.id)"
                        ></i>
            </h5>
          </template>
          <form @submit.prevent="createProduit">
            <div class="row">
              <div class="col-md-4 pr-md-1 text-left">
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

              <div class="col-md-4 pr-md-1 text-left">
                <!-- <base-input
                  label="Prix"
                  placeholder="0.00"
                  v-model="produit.prix"
                  type="number"
                ></base-input> -->

                <label>Prix</label>

                   <input
                    aria-label="label"
                    oninput="this.value = Math.round(this.value);"
                                style="width: 100% !important;height: 48%;"
                    type="number"
                    min="0"
                   
                    label="Prix"
                    placeholder="  0dt"
                    name="prix_fix"
                       v-model="produit.prix"
                  />
                <p
                  v-if="validationErrors.prix"
                  style="padding-bottom: 5px; color: red"
                >
                  <span class="alert-link"
                    >** {{ validationErrors.prix[0] }}</span
                  >
                </p>
              </div>

              <div class="col-md-4 pr-md-1 text-left">
               <!--  <base-input
                  label="Quantité"
                  placeholder="Qts"
                  v-model="produit.qts"
                   type="number"
                ></base-input> -->

                <label>Quantité</label>

                   <input
                    aria-label="label"
                    oninput="this.value = Math.round(this.value);"
                    style="width: 100% !important;height: 48%;"
                    type="number"
                    min="1"
                   
                    label="Quantité"
                  placeholder=" 1 Qts"
                       v-model="produit.qts"
                  />
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

                  <b-form-textarea
                    id="textarea-state"
                    v-model="produit.description"
                    :state="produit.description"
                    rows="3"
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
              <button
                class="btn btn-success"
                type="submit"
                fill
                style="
                  margin-left: 10px;
                  border-radius: 6px 6px 6px 6px;
                  margin-top: -19px !important;
                "
              >
                Modifier
              </button>
            </div>

            <div>
              <b-modal
                id="modal-edit-image"
                title="Image"
                :imageproduit_id="'imageproduit_id'"
              >
                <form v-on:submit.prevent="updateImage()" class="mb-3">
                  <div class="row" style="padding: 10px">
                    <div>
                      <!--  <img loading="lazy"
                        alt="zone"
                        :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_produits_zones/${imageproduit_id.image}`"
                        width="30%"
                        class="img"
                      /> -->
                      <br />
                      <br />
                      <b-form-file
                        accept="image/x-png, image/gif, image/jpeg"
                        placeholder="Choisir un fichier..."
                        v-model="file"
                        @change="onFileChange"
                        required
                      ></b-form-file>
                    </div>
                  </div>
                  <div>
                    <button type="submit" class="btn btn-info">Modifier</button>
                  </div>
                </form>
              </b-modal>
            </div>
            <hr />
            <p>Listes des images</p>
            <div>
              <b-card>
                <div class="row">
                  <div
                    class="col-md-3"
                    v-for="imgProduit in imageproduit"
                    :key="imgProduit.id"
                  >
                    <img
                      loading="lazy"
                      alt="zone"
                      :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_produits_zones/${imgProduit.image}`"
                      class="img"
                      width="100%"
                    />&nbsp;
                    <label style="line-height: 35px">
                      <i
                        onmouseover="this.style.cursor='pointer'"
                        class="fa fa-edit text-info mr-3"
                        title="Edit image"
                        v-b-modal.modal-edit-image
                        @click="fetchImage(imgProduit.id)"
                      ></i>
                      &nbsp;

                      <i
                        onmouseover="this.style.cursor='pointer'"
                        class="fa fa-trash"
                        style="color: #de524d"
                        v-on:click="deleteImage(imgProduit.id)"
                      ></i>
                    </label>
                  </div>
                </div>
              </b-card>
            </div>
            <hr />
            <div class="row">
              <div class="col-md-12 text-left">
                <card>
                  <h5 class="title" style="color: #333; padding-top: 15px">
                    Nouveau photos du produit
                  </h5>
                  <form>
                    <div class="form-group">
                      <label for="my-file" v-if="images3600.length == 10">
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
                          Seullement 10 images peut être téléchargée!
                        </B>
                      </label>
                      <input
                        aria-label="label"
                        v-if="images3600.length < 10"
                        type="file"
                        accept="image/*"
                        multiple="multiple"
                        @change="previewMultiImage3600"
                        class="form-control-file"
                        id="my-file"
                      />

                      <div class="row">
                        <div
                          class="col-md-3"
                          v-for="(item, index) in preview_list3600"
                          :key="index"
                        >
                          <img
                            loading="lazy"
                            @click="Remove(item, index)"
                            class="close"
                            src="/close-etnafes.png"
                          />
                          <br />

                          <img
                            loading="lazy"
                            :src="item"
                            width="100%"
                            class="preview"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </card>
              </div>
              <div>
                <center>
                  <form @submit.prevent="add_img_produit">
                    <button
                      type="submit"
                      class="btn btn-info"
                      style="border-radius: 6px 6px 6px 6px !important"
                    >
                      {{ loading ? "En cours ettendez" : "Ajouter image" }}
                    </button>
                  </form>
                </center>
              </div>
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
      loading: false,
      preview_list3600: [],
      images3600: [],
      updateimage: "",
      imageproduit: {},
      imageproduit_id: {},
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
     deleteProduit(id) {
      if (confirm("Are You Sure?")) {
        fetch(`${apiDomain}/api/delete_produit/${id}`, {
          method: "delete",
        })
          .then((res) => res.json())
          .then((data) => {
            /*  alert("Produit Supprimée");
            window.location.reload(); */
            this.$noty.success("votre produit a été supprimé.");

            this.fetchMesProduits(this.$store.state.user.id);
          })
          .catch((err) => console.log(err));
      }
    },
    deleteImage(id) {
      if (confirm("Are You Sure?")) {
        fetch(`${apiDomain}/api/delete_img_produit/${id}`, {
          method: "delete",
        })
          .then((res) => res.json())
          .then((data) => {
            this.$noty.success("l'image a été bien supprimé...", {
              killer: true,
              timeout: 6000,
              layout: "topCenter",
            });
            this.fetchProduit(this.$route.params.id);
          })
          .catch((err) => console.log(err));
      }
    },
    previewMultiImage3600: function (event) {
      var input = event.target;
      var count = input.files.length;
      var index = 0;
      if (/\.(jpe?g|png|PNG|gif)$/i.test(input.files[index].name)) {
        while (count--) {
          var reader = new FileReader();
          reader.onload = (e) => {
            this.preview_list3600.push(e.target.result);
          };
          this.images3600.push(input.files[index]);
          reader.readAsDataURL(input.files[index]);
          index++;
        }
      } else {
        if (
          confirm(
            "Veuillez choisir uniquement un fichier de type image(jpeg,png,jpg)"
          )
        ) {
          console.log("test" + this.images3600.length);
          this.images3600[this.images3600.length].splice(
            [this.images3600.length],
            1
          );
          this.preview_list3600[this.preview_list3600.length].splice(
            [this.preview_list3600.length],
            1
          );
        }
      }
    },
    add_img_produit(e) {
      this.loading = true;
      var formData = new FormData(e.target);
      formData.append("produit_id", this.$route.params.id);

      for (var j = 0; j < this.images3600.length; j++) {
        let image = this.images3600[j];
        formData.append("images3600[" + j + "][image]", image);
      }

      axios
        .post(
          `${apiDomain}/api/ajouter_nouveau_img_produit/${this.$route.params.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          if (res.status == 200) {
            this.loading = false;
            this.$noty.success("votre image a été ajouté avec succès.");
            /* this.$router.push({ name: "Zones" }); */
            //this.fetchProduit(this.$route.params.id);
            this.preview_list3600 = [];
            this.fetchProduit(this.$route.params.id);
          }
        })
        .catch((error) => {
          this.loading = false;
          if (error.response && error.response.status == 400) {
            this.validationErrors = error.response.data;
          }
        });
    },

    removeImage(i) {
      var arrayImages = this.images;

      var index = arrayImages.indexOf(arrayImages[i]);

      arrayImages.splice(index, i);
    },
    /* ----------- */
    updateImage() {
      var formData = new FormData();

      formData.append("produit_id", this.imageproduit_id.produit_id);
      formData.append("image", this.file);
      axios
        .post(
          `${apiDomain}/api/imageupdateProduit/${this.imageproduit_id.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
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
    fetchImage(id) {
      fetch(`${apiDomain}/api/image_produit/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.imageproduit_id = res.images;
        })
        .catch((err) => console.log(err));
    },
    fetchProduit() {
      fetch(`${apiDomain}/api/get_produit/${this.$route.params.id}`)
        .then((res) => res.json())
        .then((res) => {
          this.produit = res.produit;
          this.imageproduit = res.produit.image_produit;
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
    onFileChange(event) {
      this.updateimage = this.imageproduit_id.image = event.target.files[0];
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
      formData.append("titre", this.produit.titre);
      formData.append("description", this.produit.description);
      formData.append("prix", this.produit.prix);
      formData.append("qts", this.produit.qts);
      formData.append("client_id", this.$store.state.user.id);

      /*   formData.append("adresse", this.zone.adresse.formatted_address);
      formData.append("latitude", this.zone.center.lat);
      formData.append("longitude", this.zone.center.lng); */

      axios
        .post(
          `${apiDomain}/api/modifier_produits/${this.$route.params.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          if (res.status == 200) {
            this.$noty.success("votre produit a été modifiée.");
            this.$router.push({ name: "listes_mes_produit" });
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

