<template>
  <div class="content">
    <b-tabs card>
      <b-tab title="Ajouter un restaurant">
        <div class="row">
          <div class="col-md-12">
            <card>
              <form @submit.prevent="createRestaurant">
                <div class="row">
                  <div class="col-md-12 text-left">
                    <base-input label="Nom" placeholder="Nom" v-model="restaurant.nom" required></base-input>
                    <p v-if="validationErrors.nom" style="padding-bottom:5px;color:red">
                      <span class="alert-link">** {{ validationErrors.nom[0] }}</span>
                    </p>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <gmap-autocomplete
                      name="adresse"
                      required
                      @place_changed="setPlace"
                      @mouseout="addMarker"
                      style="border: 1px solid #ced4da;border-radius: 0.25rem;
          transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
          padding: 0.375rem 0.75rem;width: 100%;"
                    ></gmap-autocomplete>
                    <br />
                    <input
                      aria-label="label"
                      name="latitude"
                      type="hidden"
                      id="lat"
                      v-model="restaurant.center.lat"
                    />
                    <input
                      aria-label="label"
                      name="longitude"
                      type="hidden"
                      id="lng"
                      v-model="restaurant.center.lng"
                    />
                  </div>
                </div>
                <br />

                <div class="row">
                  <div class="col-md-12">
                    <gmap-map
                      :center="restaurant.center"
                      :zoom="6"
                      style="width:100%;  height: 270px;"
                    >
                      <gmap-marker
                        :key="index"
                        v-for="(m, index) in markers"
                        :position="m.position"
                        @click="restaurant.center=m.position"
                      ></gmap-marker>
                    </gmap-map>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12 text-left">
                    <label>Ville</label>
                    <!-- <base-input label="Ville" v-model="pack.address" placeholder="Home Address"></base-input> -->
                    <select
                      class="form-control"
                      v-model="restaurant.ville_id"
                      name="ville"
                      required
                    >
                      <option
                        v-for="ville in villes"
                        v-bind:key="ville.id"
                        v-bind:value="ville.id"
                      >{{ville.nom}}</option>
                    </select>
                    <p v-if="validationErrors.ville_id" style="padding-bottom:5px;color:red">
                      <span class="alert-link">** {{ validationErrors.ville_id[0] }}</span>
                    </p>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12 text-left">
                    <base-input>
                      <label>Description</label>
                      <textarea
                        rows="4"
                        required
                        cols="80"
                        class="form-control"
                        placeholder="Entrez ici la description du restaurant"
                        name="description"
                        v-model="restaurant.description"
                      ></textarea>
                    </base-input>
                    <p v-if="validationErrors.description" style="padding-bottom:5px;color:red">
                      <span class="alert-link">** {{ validationErrors.description[0] }}</span>
                    </p>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12 text-left">
                    <h5 class="title">Photos de votre restaurant</h5>
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
                          <div class="col-md-3" v-for="(item, index) in preview_list" :key="index">
                            <img loading="lazy" @click="Remove(item, index)" class="close" src="close-etnafes.png" />
                            <br />

                            <img loading="lazy" :src="item" width="70%" class="preview" />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                <!-- <div class="row">
                  <div class="col-md-12 text-left">
                    <input
                      required
                      type="file"
                      id="files"
                      name="images[]"
                      ref="files"
                      multiple
                      v-on:change="handleFilesUpload()"
                      accept="image/x-png, image/gif, image/jpeg"
                    />
                  </div>
                </div>-->

                <div class="row" hidden>
                  <div class="col-md-12 text-left">
                    <label>Proprietaire</label>
                    <input
                      aria-label="label"
                      class="form-control"
                      name="proprietaire_id"
                      v-model="restaurant.proprestau_id"
                    />
                  </div>
                </div>
                <br />
                <div class="row">
                  <button
                    class="btn btn-success"
                    type="submit"
                    fill
                    style="margin-left:10px"
                  >Enregistrer</button>
                </div>
              </form>
            </card>
          </div>
        </div>
      </b-tab>
      <b-tab title="Mes restaurants" v-show="proprestaurant.proprestau==1" active>
        <template #title>
          Mes restaurants
          <span
            class="badge badge-pill badge-danger"
            style="background-color:red"
          >{{restaurantslength}}</span>
        </template>
        <AllRestaurants></AllRestaurants>
      </b-tab>

      <b-tab title="Mes restaurants" disabled v-if="proprestaurant.proprestau==0">
        <template #title>
          Mes restaurants
          <span
            class="badge badge-pill badge-danger"
            style="background-color:red"
          >{{restaurantslength}}</span>
        </template>
        <AllRestaurants></AllRestaurants>
      </b-tab>
    </b-tabs>
  </div>
</template>
<script>
import { Card, BaseInput } from "@/components/index";
import BaseButton from "@/components/BaseButton";
import AllRestaurants from "./AllRestaurants";
import { apiDomain } from "../config";
export default {
  components: {
    Card,
    BaseInput,
    AllRestaurants,
    BaseButton
  },
  data() {
    return {
      restaurantslength: "",
      preview_list: [],
      images: [],
      validationErrors: "",
      markers: [],
      proprestaurant: [],
      places: [],
      currentPlace: null,
      files: [],
      images: [],
      ville: {},
      villes: {},
      pack: {},
      restaurant: {
        nom: "",
        description: "",
        adresse: "",
        ville_id: "",
        proprestau_id: this.$store.state.proprestau[0].id,
        center: { lat: 35.6711663, lng: 10.1005469 }
      }
    };
  },

  computed: {
    proprestau() {
      return this.$store.getters.get_proprestau;
    }
  },
  created() {
    this.fetchVilles();
    this.fetchproprestau(this.$store.state.proprestau[0].id);
    this.fetchRestaurants(this.$store.state.proprestau[0].id);
  },
  methods: {
    fetchRestaurants(id) {
      fetch(`${apiDomain}/api/restaurants/${id}`)
        .then(res => res.json())
        .then(res => {
          this.restaurants = res.restaurants;
          this.restaurantslength = res.restauunread;
        })
        .catch(err => console.log(err));
    },
    Remove(file, index) {
      this.preview_list.splice(index, 1);
      this.images.splice(index, 1);
      console.log("testDelete" + index);
    },

    previewMultiImage: function(event) {
      var input = event.target;
      var count = input.files.length;
      var index = 0;
      if (/\.(jpe?g|png|PNG|gif)$/i.test(input.files[index].name)) {
        while (count--) {
          var reader = new FileReader();
          reader.onload = e => {
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
    fetchproprestau(id) {
      fetch(`${apiDomain}/api/proprietaire_restau/${id}`)
        .then(res => res.json())
        .then(res => {
          this.proprestaurant = res.proprietaire;
        })
        .catch(err => console.log(err));
    },
    setPlace(place) {
      this.currentPlace = place;
      this.restaurant.adresse = place;
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.restaurant.center = marker;
        // lat and lng, In front-end javascript does not support file management due to security concerns.
        console.log(marker.lat);
        console.log(marker.lng);

        this.currentPlace = null;
      }
    },
    handleFilesUpload() {
      let uploadedFiles = this.$refs.files.files;
      for (var i = 0; i < uploadedFiles.length; i++) {
        this.files.push(uploadedFiles[i]);
      }
    },

    fetchVilles() {
      axios
        .get(`${apiDomain}/api/allvillesTun`)
        .then(({ data }) => (this.villes = data.villes));
    },

    createRestaurant(e) {
      var formData = new FormData(e.target);
      formData.append("nom", this.restaurant.nom);
      formData.append("description", this.restaurant.description);
      formData.append("adresse", this.restaurant.adresse.formatted_address);
      formData.append("latitude", this.restaurant.center.lat);
      formData.append("longitude", this.restaurant.center.lng);
      formData.append("proprestau_id", this.restaurant.proprestau_id);
      formData.append("ville_id", this.restaurant.ville_id);
      for (var i = 0; i < this.images.length; i++) {
        let file = this.images[i];
        formData.append("images[" + i + "][url_image]", file);
      }
      axios
        .post(`${apiDomain}/api/create/restaurant`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          if (res.status == 200) {
            this.$fire({
              text: "votre restaurant a été ajouté avec succès",
              type: "success",
              timer: 90000
            }).then(r => {
              window.location.reload();
            });
            // this.$noty.success("votre restaurant a été créé.");
            // this.$router.push({ name: "Restaurant" });
          }
        })
        .catch(error => {
          if (error.response && error.response.status == 400) {
            this.validationErrors = error.response.data;
          }
        });

      /* fetch(
        `${apiDomain}/api/proprestau-validate/${this.$store.state.proprestau[0].id}`,
        {
          method: "put",
          body: JSON.stringify(this.proprestau),
          headers: {
            "content-type": "application/json"
          }
        }
      ); */
    }
  }
};
</script>

