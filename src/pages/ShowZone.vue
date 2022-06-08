<template>
  <div class="content">
    <h4>
      <span style="color: #333">Zone touristique&nbsp;</span>
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

    <div v-for="imagezone in imagezone" :key="imagezone.id">
      <b-card>
        <div class="col-md-4">
          <img loading="lazy"
            alt="zone"
            :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_zones/${imagezone.url_image}`"
            class="img"
            width="40%"
          />
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

    updateImage(id, imageproduit) {
      var formData = new FormData();
      formData.append("id", this.imageproduit.id);
      formData.append("produit_id", this.imageproduit.produit_id);
      formData.append("url_img", this.imageproduit.url_img);
      axios
        .post(`${apiDomain}/api/imagesproduitupdate/${id}`, formData, {
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
      fetch(`${apiDomain}/api/imagesproduit/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.imageproduit = res.imagesproduit;
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

    updateZone(id, zone) {
      this.zone.id = zone.id;
      this.zone.nom = zone.nom;
      this.zone.description = zone.description;
      this.zone.url_video = zone.url_video;
      this.zone.ville_id = zone.ville_id;
      this.zone.latitude = zone.latitude;
      this.zone.longitude = zone.longitude;
      this.zone.adresse = zone.adresse;

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

