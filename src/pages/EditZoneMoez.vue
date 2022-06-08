<template>
  <div class="content">
    <div>
      <b-modal
        id="modal-edit-zone"
        title="Modifier la zone"
        :zonetouristique="'zonetouristique'"
      >
        <form
          v-on:submit.prevent="updateZone(zonetouristique.id, zonetouristique)"
          class="mb-3"
        >
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
        class="fa fa-trash"
        style="color: #de524d"
        v-on:click="deleteHebergement(zonetouristique.id)"
      ></i>
      &nbsp;
      <i
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
      <b-modal id="modal-edit-image" title="Image" :imagezone="'imagezone'">
        <form
          v-on:submit.prevent="updateImage(imagezone.id, imagezone)"
          class="mb-3"
        >
          <div class="row" style="padding: 10px">
            <div>
              <img loading="lazy"
                alt="zone"
                :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_zones/${imagezone.url_image}`"
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
              class="fa fa-trash"
              style="color: #de524d"
              v-on:click="deleteImage(imagezone.id)"
            ></i>
            &nbsp;
            <i
              class="fa fa-edit text-info mr-3"
              title="Edit image"
              v-b-modal.modal-edit-image
              @click="fetchImage(imagezone.id)"
            ></i>
          </label>
        </div>
      </b-card>
    </div>
  </div>
</template>
<script>
import { apiDomain } from "../config";
export default {
  data() {
    return {
      formstate: {},
      imagezone: {},
      imagezones: [],
      file: null,
      file2: null,
      zonetouristiques: [],
      zonetouristique: {},
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

    updateImage(id, imagezone) {
      var formData = new FormData();
      formData.append("id", this.imagezone.id);
      formData.append(
        "zone_touristique_id",
        this.imagezone.zone_touristique_id
      );
      formData.append("url_image", this.imagezone.url_image);
      axios
        .post(`${apiDomain}/api/imageupdate/${id}`, formData, {
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
      this.imageproduit.url_img = event.target.files[0];
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
          this.imagezone = res.images;
        })
        .catch((err) => console.log(err));
    },

    fetchZone(id) {
      fetch(`${apiDomain}/api/zone/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.zonetouristique = res.zonetouristique;
          this.imagezone = res.zonetouristique.image;
        })
        .catch((err) => console.log(err));
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
