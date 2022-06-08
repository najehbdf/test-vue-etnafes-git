<template>
  <div class="content">
    <div class="row">
      <div class="col-md-12">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb" style="background-color: #a6bfe6 !important">
            <li class="breadcrumb-item">
              <!-- <a @click="$router.go(-1)">back</a> -->
              <router-link :to="{ name: 'nouveau_restaurantactive' }"
                >Espace Restaurant</router-link
              >
            </li>
            <li
              class="breadcrumb-item active"
              style="color: #000"
              aria-current="page"
            >
              Edit Restaurant
            </li>
          </ol>
        </nav>

        <div v-if="loaded==false">
    <center>
    <div class="spinner-grow text-dark" role="status" style="width: 15px; 
    height: 15px;">
  <span class="sr-only">Loading...</span>
  
</div>&nbsp;
<div class="spinner-grow text-dark" role="status" style="width: 15px; 
    height: 15px;">
  <span class="sr-only">Loading...</span>
  
</div>&nbsp;
<div class="spinner-grow text-dark" role="status" style="width: 15px; 
    height: 15px;">
  <span class="sr-only">Loading...</span>
  
</div>&nbsp;
<div class="spinner-grow text-dark" role="status" style="width: 15px; 
    height: 15px;">
  <span class="sr-only">Loading...</span>
  
</div>
</center>
  </div>
        <div v-if="proprietairerestau.id == proprestau[0].id && loaded==true">
          <card>
            <template slot="header">
              <h5 class="title" style="padding-top: 15px">
                Modifier les informations générales de votre restaurant
                <i
                  class="tim-icons icon-simple-remove"
                  style="color: #de524d"
                  v-on:click="deleteRestaurant(restaurant.id)"
                ></i>
              </h5>
            </template>
            <form
              v-on:submit.prevent="updateRestaurant(restaurant.id, restaurant)"
              class="mb-3"
              style="padding-left: 10px; padding-right: 10px"
            >
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label style="line-height: 35px">Nom</label>
                    <input
                      aria-label="label"
                      type="text"
                      class="form-control"
                      v-model="restaurant.nom"
                      required
                    />
                  </div>
                </div>
              </div>
              <div class="form-group">
                <gmap-autocomplete
                  name="adresse"
                  @place_changed="setPlace"
                  @mouseout="addMarker"
                  :placeholder="restaurant.adresse"
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
                <div class="col-md-12 text-left">
                  <select
                    class="form-control"
                    v-model="restaurant.ville_id"
                    name="ville"
                  >
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

              <div class="form-group">
                <label style="line-height: 35px">Description</label>

                <textarea
                  rows="5"
                  required
                  v-model="restaurant.description"
                  class="form-control resize_vertical"
                  id="description"
                ></textarea>
              </div>

              <br />

              <button
                class="btn btn-success"
                type="submit"
                fill
                style="margin-left: 10px; border-radius: 18px 0px 18px 0px"
              >
                Modifier
              </button>
            </form>
          </card>
        </div>
      </div>
    </div>

    <div>
      <b-modal
        id="modal-edit-image"
        :title="restaurant.nom"
        :imagerestaurant="'imagerestaurant'"
      >
        <form
          v-on:submit.prevent="updateImage(imagerestaurant.id, imagerestaurant)"
          class="mb-3"
        >
          <div class="row" style="padding: 10px">
            <div>
              <center>
                <img loading="lazy"
                  alt="restaurant"
                  v-show="!showPreview"
                  :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_restaurant/${imagerestaurant.url_image}`"
                  width="55%"
                  class="img"
                />
                <br />
                <img loading="lazy"
                  alt="restaurant"
                  v-bind:src="imagePreview"
                  v-show="showPreview"
                  width="30%"
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
                style="border-radius: 15px 0px 15px !important"
                class="btn btn-info"
              >
                Modifier
              </button>
            </center>
          </div>
        </form>
      </b-modal>
    </div>

    <div class="row" v-if="proprietairerestau.id == proprestau[0].id && loaded==true">
      <br />
      <br />
      <div class="col-md-12">
        <card>
          <template slot="header">
            <h5 class="title" style="padding-top: 15px">
              Modifier les photos de votre restaurant
            </h5>
          </template>
          <div class="row">
            <div
              class="col-md-3"
              v-for="imagerestaurant in imagerestaurants"
              :key="imagerestaurant.id"
            >
              <div>
                <img loading="lazy"
                  :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_restaurant/${imagerestaurant.url_image}`"
                  class="img"
                  width="65%"
                />&nbsp;
                <label style="line-height: 35px">
                  <i
                    class="tim-icons icon-simple-remove"
                    style="color: #de524d"
                    v-on:click="deleteImage(imagerestaurant.id)"
                  ></i>
                  &nbsp;
                  <i
                    class="tim-icons icon-pencil"
                    style="color: #62b062"
                    title="Edit image"
                    v-b-modal.modal-edit-image
                    @click="fetchImage(imagerestaurant.id)"
                  ></i>
                </label>
              </div>
              <br />
            </div>
          </div>
        </card>
      </div>
    </div>

    <div class="container" v-if="proprietairerestau.id != proprestau[0].id && loaded==true">
      <card>
        <p>Vous n'avez pas le droit de consulter ce restaurant</p>
      </card>
    </div>
  </div>
</template>
<script>
import { Card, BaseInput } from "@/components/index";
import { apiDomain } from "../config";
export default {
  components: {
    Card,
    BaseInput,
  },
  data() {
    return {
      loaded :false,

      villes: [],
      places: [],
      address: "",
      center: { lat: 45.508, lng: -73.587 },
      markers: [],
      formstate: {},
      imagerestaurant: {},
      imagerestaurants: [],
      showPreview: false,
      imagePreview: "",
      file: null,
      file2: null,
      restaurant: {},
      proprietairerestau: {},
      restaurants: [],
    };
  },
  mounted() {
    this.geolocate();
  },
  computed: {
    loggedIn() {
      return this.$store.getters.get_loggedIn;
    },

    proprestau() {
      return this.$store.getters.get_proprestau;
    },

    user() {
      return this.$store.getters.get_user;
    },
  },
  created() {
    this.fetchVilles();
    this.fetchRestaurant(this.$route.params.id);
  },
  methods: {
    fetchVilles() {
      fetch(`${apiDomain}/api/villes`)
        .then((res) => res.json())
        .then((res) => {
          this.villes = res;
        })
        .catch((err) => console.log(err));
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

    deleteRestaurant(id) {
      if (confirm("Are You Sure?")) {
        fetch(`${apiDomain}/api/restaurant/delete/${id}`, {
          method: "delete",
        })
          .then((res) => res.json())
          .then((data) => {
            alert("Restaurant Supprimée");
            window.location.reload();
          })
          .catch((err) => console.log(err));
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
            this.fetchTestProduitImage(this.$route.params.id);
          })
          .catch((err) => console.log(err));
      }
    },

    updateImage(id, imagerestaurant) {
      var formData = new FormData();
      formData.append("id", this.imagerestaurant.id);
      formData.append("restaurant_id", this.imagerestaurant.restaurant_id);
      formData.append("url_image", this.imagerestaurant.url_image);
      axios
        .post(`${apiDomain}/api/images-restaurant-update/${id}`, formData, {
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
      this.imagerestaurant.url_image = event.target.files[0];
      let reader = new FileReader();
      reader.addEventListener(
        "load",
        function () {
          this.showPreview = true;
          this.imagePreview = reader.result;
        }.bind(this),
        false
      );

      if (this.imagerestaurant.url_image) {
        if (/\.(jpe?g|png|gif)$/i.test(this.imagerestaurant.url_image.name)) {
          reader.readAsDataURL(this.imagerestaurant.url_image);
        }
      }
    },

    fetchImage(id) {
      fetch(`${apiDomain}/api/images-restaurant/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.imagerestaurant = res.imagesrestaurant;
        })
        .catch((err) => console.log(err));
    },

    fetchRestaurant(id) {
      fetch(`${apiDomain}/api/restaurant/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.loaded = true;

          this.restaurant = res.restaurant;
          this.proprietairerestau = res.restaurant.proprietairerestau;

          this.imagerestaurants = res.restaurant.images_restaurant;
        })
        .catch((err) => console.log(err));
    },

    updateRestaurant(id, restaurant) {
      if (this.places.length == 0) {
        this.restaurant.adresse = restaurant.adresse;
        this.restaurant.longitude = restaurant.longitude;
        this.restaurant.latitude = restaurant.latitude;
      } else if (this.places.length > 0) {
        restaurant.adresse = this.places[0].formatted_address;
        restaurant.longitude = this.center.lng;
        restaurant.latitude = this.center.lat;
      }
      this.restaurant.id = restaurant.id;
      this.restaurant.description = restaurant.description;
      fetch(
        `${apiDomain}/api/restaurant/${id}?token=${this.$store.state.token}`,
        {
          method: "put",
          body: JSON.stringify(this.restaurant),
          headers: {
            "content-type": "application/json",
          },
        }
      )
        .then((res) => {
          if (res.status == 200) {
            this.$fire({
              text: "Votre restaurant a été modifié avec succés",
              type: "success",
              timer: 90000,
            }).then((r) => {
              this.$router.push({ name: "Restaurants" });
            });
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

