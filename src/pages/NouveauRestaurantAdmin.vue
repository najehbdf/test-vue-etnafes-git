<template>
  <div class="content">
    <div class="row">
      <div class="col-md-12">
        <card>
          <template slot="header">
            <h5 class="title" style="padding-top:15px">Ajouter un restaurant</h5>
          </template>
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
                <gmap-map :center="restaurant.center" :zoom="6" style="width:100%;  height: 270px;">
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
                <select class="form-control" v-model="restaurant.ville_id" name="ville" required>
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
                <label>Proprietaire</label>
                <select class="form-control" v-model="restaurant.proprestau_id">
                  <option
                    v-for="proprietaire in proprietaires"
                    v-bind:key="proprietaire.id"
                    v-bind:value="proprietaire.id"
                  >{{proprietaire.client.nom}} {{proprietaire.client.prenom}}</option>
                </select>
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
                <input
                  aria-label="label"
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
            </div>

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
                style="margin-left:10px;border-radius: 18px 0px 18px 0px;"
              >Enregistrer</button>
            </div>
          </form>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
import { Card, BaseInput } from "@/components/index";
import BaseButton from "@/components/BaseButton";
import { apiDomain } from "../config";
export default {
  components: {
    Card,
    BaseInput,
    BaseButton
  },
  data() {
    return {
      proprietaires: {},
      validationErrors: "",
      markers: [],
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
        proprestau_id: "",
        center: { lat: 35.6711663, lng: 10.1005469 }
      }
    };
  },
  created() {
    this.fetchVilles();
    this.fetchProprietaires();
  },
  methods: {
    fetchProprietaires() {
      fetch(
        `${apiDomain}/api/proprietaires/restaurants?token=${this.$store.state.token}`
      )
        .then(res => res.json())
        .then(res => {
          this.proprietaires = res.proprietaires;
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
      fetch(`${apiDomain}/api/villes`)
        .then(res => res.json())
        .then(res => {
          this.villes = res;
        })
        .catch(err => console.log(err));
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

      for (var i = 0; i < this.files.length; i++) {
        let file = this.files[i];
        formData.append("images[" + i + "][url_image]", file);
        console.log(files[i]);
      }

      axios
        .post(`${apiDomain}/api/create/restaurant`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          if (res.status == 200) {
            this.$noty.success("votre restaurant a été créé.");
            this.$router.push({ name: "Restaurants" });
          }
        })
        .catch(error => {
          if (error.response && error.response.status == 400) {
            this.validationErrors = error.response.data;
          }
        });
    }
  }
};
</script>

