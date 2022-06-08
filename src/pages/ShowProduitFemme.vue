<template>
  <div class="content">
    <h4>
      <span style="color: #333">Mon produit&nbsp;   &nbsp; </span> 

       <img class="retour" @click="$router.go(-1)"   onmouseover="this.style.cursor='pointer'" src="/r-etnafes.png" title="Retour" alt="etnafes" />
                      &nbsp; &nbsp; 
      <router-link
                          :to="{
                            name: 'edit_produit_femme',
                            params: { id: this.$route.params.id },
                          }"
                        >
                          <i
                            style="color: #62b062"
                            title="Modifier le produit"
                            class="tim-icons icon-pencil"
                          ></i>
                          &nbsp; &nbsp;
                        </router-link>
                        <i
                          onmouseover="this.style.cursor='pointer'"
                          style="color: #fd5d93"
                          class="tim-icons icon-simple-remove"
                          title="Supprimer produit"
                          @click="deleteProduit(this.$route.params.id)"
                        ></i>
    </h4>

    <div class="row">
      <div class="col-md-4 pr-md-1 text-left">
        <base-input
          label="Nom"
          placeholder="Nom"
          v-model="produit.titre"
          disabled
        ></base-input>
      </div>

      <div class="col-md-4 pr-md-1 text-left">
        <base-input
          label="Prix"
          placeholder="0.00"
          v-model="produit.prix"
          disabled
        ></base-input>
      </div>

      <div class="col-md-4 pr-md-1 text-left">
        <base-input
          label="Quantité"
          placeholder="Qts"
          v-model="produit.qts"
          disabled
        ></base-input>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4">
        <div class="form-group">
          <label style="line-height: 35px">Titre</label>
          <input
            aria-label="label"
            type="text"
            class="form-control"
            v-model="produit.titre"
            disabled
          />
        </div>
      </div>

      <div class="col-md-4">
        <div class="form-group">
          <label style="line-height: 35px">Prix DNT</label>
          <input
            aria-label="label"
            type="text"
            class="form-control"
            v-model="produit.prix"
            disabled
          />
        </div>
      </div>

      <div class="col-md-4">
        <div class="form-group">
          <label style="line-height: 35px">Quantité</label>
          <input
            aria-label="label"
            type="text"
            class="form-control"
            v-model="produit.qts"
            disabled
          />
        </div>
      </div>
    </div>

    <div class="form-group">
      <label style="line-height: 35px">Description</label>

      <textarea
        disabled
        rows="5"
        required
        v-model="produit.description"
        class="form-control resize_vertical"
        id="description"
      ></textarea>
    </div>

    <div>
      <b-card>
        <div class="row">
          <div
            class="col-md-4"
            v-for="imgProduit in imageproduit"
            :key="imgProduit.id"
          >
            <img
              loading="lazy"
              alt="zone"
              :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_produits_zones/${imgProduit.image}`"
              class="img"
              width="100%"
            />
          </div>
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
      produit: {},
      imageproduit: {},
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
    /*  this.fetchZone(this.$route.params.id); */
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
    fetchProduit() {
      fetch(`${apiDomain}/api/get_produit/${this.$route.params.id}`)
        .then((res) => res.json())
        .then((res) => {
          this.produit = res.produit;
          this.imageproduit = res.produit.image_produit;
        })
        .catch((err) => console.log(err));
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

