<template>
  <div class="content">
    <div>
      <b-modal
        id="modal-edit-zone"
        title="Modifier la zone"
        :zonetouristique="'zonetouristique'"
      >
        <form v-on:submit.prevent="updateZoneForAdmin()" class="mb-3">
          <div class="form-group">
            <label style="line-height: 35px">Nom</label>
            <input
              aria-label="label"
              type="text"
              class="form-control"
              v-model="zonetouristique.nom"
            />
          </div>

          <div class="form-group">
            <label style="line-height: 35px">Description</label>

            <textarea
              rows="5"
              required
              v-model="zonetouristique.description"
              class="form-control resize_vertical"
              id="description"
            ></textarea>
          </div>

          <button
            class="btn btn-success"
            type="submit"
            fill
            style="margin-left: 10px"
          >
            Modifier
          </button>
        </form>
      </b-modal>
    </div>

    <h4>
      <span style="color: #333">Zone touristique&nbsp;</span>
      <i
        onmouseover="this.style.cursor='pointer'"
        class="fa fa-trash"
        style="color: #de524d"
        v-on:click="deleteHebergement(zonetouristique.id)"
      ></i>
      &nbsp;
      <i
        onmouseover="this.style.cursor='pointer'"
        class="fa fa-edit text-info mr-3"
        title="Modifier la zone"
        v-b-modal.modal-edit-zone
        @click="fetchZone(zonetouristique.id)"
      ></i>
    </h4>

    <div class="form-group">
      <label style="line-height: 35px">Nom</label>
      <input
        aria-label="label"
        type="text"
        class="form-control"
        v-model="zonetouristique.nom"
        disabled
      />
    </div>

    <div class="form-group">
      <label style="line-height: 35px">Description</label>

      <textarea
        disabled
        rows="5"
        required
        v-model="zonetouristique.description"
        class="form-control resize_vertical"
        id="description"
      ></textarea>
    </div>

    <div>
      <b-modal
        id="modal-edit-image"
        title="Image"
        :imagezone_id="'imagezone_id'"
      >
        <form v-on:submit.prevent="updateImage()" class="mb-3">
          <div class="row" style="padding: 10px">
            <div>
              <img loading="lazy"
                alt="zone"
                :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_zones/${imagezone_id.url_image}`"
                width="30%"
                class="img"
              />
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

    <div>
      <b-modal
        id="modal-edit-image360"
        title="Image"
        :imagezone_id="'imagezone_id'"
      >
        <form v-on:submit.prevent="updateImage360()" class="mb-3">
          <div class="row" style="padding: 10px">
            <div>
              <img loading="lazy"
                alt="zone"
                :src="`https://etnafes.com/zone360/${imagezone360_id.url_image}`"
                width="30%"
                class="img"
              />
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
    <p>Listes des images</p>
    <div v-for="imagezone in imagezone" :key="imagezone.id">
      <b-card>
        <div class="col-md-4">
          <img loading="lazy"
            alt="zone"
            :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_zones/${imagezone.url_image}`"
            class="img"
            width="40%"
          />&nbsp;
          <label style="line-height: 35px">
            <i
              onmouseover="this.style.cursor='pointer'"
              class="fa fa-trash"
              style="color: #de524d"
              v-on:click="deleteImage(imagezone.id)"
            ></i>
            &nbsp;
            <i
              onmouseover="this.style.cursor='pointer'"
              class="fa fa-edit text-info mr-3"
              title="Edit image"
              v-b-modal.modal-edit-image
              @click="fetchImage(imagezone.id)"
            ></i>
          </label>
        </div>
      </b-card>
    </div>
    <hr />
    <p>Listes des images en 360°</p>
    <p v-if="imagezone360.length == 0">Aucune image en 360°</p>
    <div v-for="imagezone in imagezone360" :key="imagezone.id">
      <b-card>
        <div class="col-md-4">
          <img loading="lazy"
            alt="zone"
            :src="`https://etnafes.com/zone360/${imagezone.url_image}`"
            class="img"
            width="40%"
          />&nbsp;
          <label style="line-height: 35px">
            <i
              onmouseover="this.style.cursor='pointer'"
              class="fa fa-trash"
              style="color: #de524d"
              v-on:click="deleteImage360(imagezone.id)"
            ></i>
            &nbsp;
            <i
              onmouseover="this.style.cursor='pointer'"
              class="fa fa-edit text-info mr-3"
              title="Edit image"
              v-b-modal.modal-edit-image360
              @click="fetchImage360(imagezone.id)"
            ></i>
          </label>
        </div>
      </b-card>
    </div>
    <hr />
    <div class="row">
      <div class="col-md-12 text-left">
        <card>
          <h5 class="title" style="color: #333; padding-top: 15px">
            Nouveau Photos de la zone touristique
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
          <form @submit.prevent="add3600">
            <button
              type="submit"
              class="btn btn-info"
              style="border-radius: 15px 0px 15px !important"
            >
              Modifier image
            </button>
          </form>
        </center>
      </div>
    </div>
    <hr />

    <div class="row">
      <div class="col-md-12 text-left">
        <card>
          <h5 class="title" style="color: #333; padding-top: 15px">
            Photos 360 de la zone touristique
          </h5>
          <form>
            <div class="form-group">
              <label for="my-file" v-if="images360.length == 10">
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
                v-if="images360.length < 10"
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
</template>
<script>
import { apiDomain } from "../config";
export default {
  props: {
    max: {
      type: Number,
      default: 11,
    },
    action: {
      type: String,
      default: "https://jsonplaceholder.typicode.com/posts/",
    },
  },
  data() {
    return {
      preview_list360: [],
      images360: [],
      formstate: {},
      imagezone_id: {},
      imagezone: {},
      imagezones: [],
      file: null,
      file2: null,
      zonetouristiques: [],
      zonetouristique: {},

      imageproduit: "",
      /* ----------- */
      preview_list3600: [],
      images3600: [],
      imagezone360_id: {},
      imagezone360: {},
    };
  },

  computed: {
    loggedIn() {
      return this.$store.getters.get_loggedIn;
    },

    user() {
      return this.$store.getters.get_user;
    },
  },
  created() {
    this.fetchZone(this.$route.params.id);
  },
  methods: {
    add360(e) {
      var formData = new FormData(e.target);
      formData.append("zonetouristique_id", this.$route.params.id);

      for (var j = 0; j < this.images360.length; j++) {
        let url_image = this.images360[j];
        formData.append("images360[" + j + "][url_image]", url_image);
      }

      axios
        .post(
          `${apiDomain}/api/add360_zone/${this.$route.params.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          if (res.status == 200) {
            this.$noty.success("votre image a été ajouté avec succès.");
            /* this.$router.push({ name: "Zones" }); */
            this.fetchZone(this.$route.params.id);
          }
        })
        .catch((error) => {
          if (error.response && error.response.status == 400) {
            this.validationErrors = error.response.data;
          }
        });
    },

    add3600(e) {
      var formData = new FormData(e.target);
      formData.append("zone_touristique_id", this.$route.params.id);

      for (var j = 0; j < this.images3600.length; j++) {
        let url_image = this.images3600[j];
        formData.append("images3600[" + j + "][url_image]", url_image);
      }

      axios
        .post(
          `${apiDomain}/api/add3600_zone/${this.$route.params.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          if (res.status == 200) {
            this.$noty.success("votre image a été ajouté avec succès.");
            /* this.$router.push({ name: "Zones" }); */
            this.fetchZone(this.$route.params.id);
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

    deleteImage(id) {
      if (confirm("Are You Sure?")) {
        fetch(`${apiDomain}/api/imagesproduitdelete/${id}`, {
          method: "delete",
        })
          .then((res) => res.json())
          .then((data) => {
            this.$noty.success("l'image a été bien supprimé...", {
              killer: true,
              timeout: 6000,
              layout: "topCenter",
            });
            this.fetchZone(this.$route.params.id);
          })
          .catch((err) => console.log(err));
      }
    },

    deleteImage360(id) {
      if (confirm("Are You Sure?")) {
        fetch(`${apiDomain}/api/imagesproduitdelete360/${id}`, {
          method: "delete",
        })
          .then((res) => res.json())
          .then((data) => {
            this.$noty.success("l'image a été bien supprimé...", {
              killer: true,
              timeout: 6000,
              layout: "topCenter",
            });
            this.fetchZone(this.$route.params.id);
          })
          .catch((err) => console.log(err));
      }
    },

    updateImage() {
      var formData = new FormData();

      formData.append(
        "zone_touristique_id",
        this.imagezone_id.zone_touristique_id
      );
      formData.append("url_image", this.file);
      axios
        .post(
          `${apiDomain}/api/imageupdate/${this.imagezone_id.id}`,
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

    updateImage360() {
      var formData = new FormData();

      formData.append(
        "zonetouristique_id",
        this.imagezone360_id.zonetouristique_id
      );
      formData.append("url_image", this.file);
      axios
        .post(
          `${apiDomain}/api/imageupdate360/${this.imagezone360_id.id}`,
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
    onFileChange(event) {
      this.imageproduit = this.imagezone_id.url_img = event.target.files[0];
    },
    photo: function (event) {
      var input = event.target;
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        var vm = this;
        reader.onload = function (e) {
          vm.imageproduit.url_img = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
      console.log(input.files[0]);
    },

    fetchImage(id) {
      fetch(`${apiDomain}/api/image/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.imagezone_id = res.images;
        })
        .catch((err) => console.log(err));
    },

    fetchImage360(id) {
      fetch(`${apiDomain}/api/image360/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.imagezone360_id = res.images;
        })
        .catch((err) => console.log(err));
    },

    fetchZone(id) {
      fetch(`${apiDomain}/api/zone/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.zonetouristique = res.zonetouristique;
          this.imagezone = res.zonetouristique.image;
          this.imagezone360 = res.zonetouristique.images_zone360;
        })
        .catch((err) => console.log(err));
    },

    updateZoneForAdmin(e) {
      let formData = new FormData();
      /* this.errors=[]; */

      formData.append("nom", this.zonetouristique.nom);
      formData.append("description", this.zonetouristique.description);

      axios
        .post(
          `${apiDomain}/api/UpdatedZoneForAdmin/${this.$route.params.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )

        .then((res) => {
          this.fetchZone(this.$route.params.id);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },

    updateZone(id, zonetouristique) {
      this.zonetouristique.id = zonetouristique.id;
      this.zonetouristique.nom = zonetouristique.nom;
      this.zonetouristique.description = zonetouristique.description;
      this.zonetouristique.url_video = zonetouristique.url_video;
      this.zonetouristique.ville_id = zonetouristique.ville_id;
      this.zonetouristique.latitude = zonetouristique.latitude;
      this.zonetouristique.longitude = zonetouristique.longitude;
      this.zonetouristique.adresse = zonetouristique.adresse;

      fetch(`${apiDomain}/api/zone/${id}`, {
        method: "put",
        body: JSON.stringify(this.zone),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())

        .then((data) => {
          if (confirm("Zone bien modifié")) {
            window.location.reload();
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
