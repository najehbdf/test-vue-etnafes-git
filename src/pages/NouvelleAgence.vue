<template>
  <div class="content">
    <form
      v-if="agences.data.length == 0 && showEtape2 == false"
      @submit.prevent="createAgence"
    >
      <card style="border: solid 1px #7a7979">
        <div>
          Remarque ( <sapn style="color: red">*</sapn> ) : Champ obligatoire.
          <div v-if="agences.data.length == 0 && showEtape2 == false">
            ma 3andpuch
          </div>
        </div>

        <div class="row m-0 w-100">
          <div class="col-md-4 pr-md-1 text-left">
            <label>Agence/Entreprise <sapn style="color: red">*</sapn></label>

            <base-input
              v-if="agencesln == 0"
              placeholder="Nom agence/entreprise"
              v-model="agence.nom_agence"
            ></base-input>

            <base-input
              placeholder="Nom agence"
              disabled
              v-if="agencesln > 0"
              :value="agencesln > 0 ? agences.data[0].nom_agence : ''"
            ></base-input>
            <p
              v-if="validationErrors.nom_agence"
              style="padding-bottom: 5px; color: red"
            >
              <span class="alert-link"
                >** {{ validationErrors.nom_agence[0] }}</span
              >
            </p>
          </div>
          <div class="col-md-4 px-md-1 text-left">
            <label>Adresse <sapn style="color: red">*</sapn></label>

            <base-input
              required
              type="text"
              placeholder="Adresse"
              v-model="agence.adresse"
            ></base-input>
            <p
              v-if="validationErrors.adresse"
              style="padding-bottom: 5px; color: red"
            >
              <span class="alert-link"
                >** {{ validationErrors.adresse[0] }}</span
              >
            </p>
          </div>

          <div class="col-md-4 pl-md-1 text-left">
            <label>Téléphone <sapn style="color: red">*</sapn></label>

            <base-input
              type="text"
              required
              placeholder="Téléphone"
              v-model="agence.telephone"
            ></base-input>
            <p
              v-if="validationErrors.telephone"
              style="padding-bottom: 5px; color: red"
            >
              <span class="alert-link"
                >** {{ validationErrors.telephone[0] }}</span
              >
            </p>
          </div>
        </div>

        <div class="row m-0 w-100">
          <div class="col-md-4 pr-md-1 text-left">
            <label>Email <sapn style="color: red">*</sapn></label>
            <base-input
              placeholder="Email"
              v-model="agence.email"
              type="email"
            ></base-input>
            <p
              v-if="validationErrors.email"
              style="padding-bottom: 5px; color: red"
            >
              <span class="alert-link">** {{ validationErrors.email[0] }}</span>
            </p>
          </div>
          <div class="col-md-4 px-md-1 text-left">
            <label>Ville <sapn style="color: red">*</sapn></label>
            <select
              class="form-control"
              v-model="agence.ville_id"
              name="ville"
              required
            >
              <option
                v-for="ville in villes"
                v-bind:key="ville.id"
                v-bind:value="ville.id"
              >
                {{ ville.nom }}
              </option>
            </select>
            <p
              v-if="validationErrors.ville_id"
              style="padding-bottom: 5px; color: red"
            >
              <span class="alert-link"
                >** {{ validationErrors.ville_id[0] }}</span
              >
            </p>
          </div>

          <div class="col-md-4 px-md-1 text-left">
            <label class="custom-file-upload">
              Logo <sapn style="color: red">*</sapn>
              <br />
              <br />
              <input
                aria-label="label"
                name="logo"
                required
                type="file"
                @change="previewImageRio"
                class="input-file nn"
                accept="image/x-png, image/gif, image/jpeg"
              />
              <img
                c
                loading="lazy"
                class="hideWeb"
                src="https://img.icons8.com/color/48/000000/add-image.png"
              />
            </label>
            <div class="image-preview11 style_image" v-if="logo.length > 0">
              <img
                loading="lazy"
                class="width_img_src preview11"
                v-if="logo != 'logo-entreprise-etnafes.jpg'"
                :src="logo"
              />
            </div>
          </div>
        </div>

        <!-- <div class="row">
                <div class="col-md-12 pr-md-1 text-left">
                  <label>Logo</label>
                  <br />
                  <input
                    required
                    name="logo"
                    type="file"
                    @change="agencePhoto"
                    class="input-file"
                    accept="image/x-png, image/gif, image/jpeg"
                  />
                </div>
        </div>-->

        <div>
          <div class="row m-0 w-100 my-3">
            <button
              class="btn btn-success"
              type="submit"
              fill
              style="margin-left: 10px; border-radius: 6px 6px 6px 6px"
            >
              {{ loading ? "En cours attendez ... " : "Suivant" }}
            </button>
          </div>
        </div>
      </card>
    </form>

    <form v-if="agences.data.length > 0" @submit.prevent="createAgencee">
      <card style="border: solid 1px #7a7979">
        <div>
          Remarque ( <sapn style="color: red">*</sapn> ) : Champ obligatoire.
        </div>

        <div class="row m-0 w-100">
          <div class="col-md-4 pr-md-1 text-left">
            <label>Agence/Entreprise <sapn style="color: red">*</sapn></label>

            <base-input
              v-if="agencesln == 0"
              placeholder="Nom agence/entreprise"
              v-model="agence.nom_agence"
            ></base-input>

            <base-input
              placeholder="Nom agence"
              disabled
              v-if="agencesln > 0"
              :value="agencesln > 0 ? agences.data[0].nom_agence : ''"
            ></base-input>
            <p
              v-if="validationErrors.nom_agence"
              style="padding-bottom: 5px; color: red"
            >
              <span class="alert-link"
                >** {{ validationErrors.nom_agence[0] }}</span
              >
            </p>
          </div>
          <div class="col-md-4 px-md-1 text-left">
            <label>Adresse <sapn style="color: red">*</sapn></label>

            <base-input
              required
              type="text"
              placeholder="Adresse"
              v-model="agence.adresse"
            ></base-input>
            <p
              v-if="validationErrors.adresse"
              style="padding-bottom: 5px; color: red"
            >
              <span class="alert-link"
                >** {{ validationErrors.adresse[0] }}</span
              >
            </p>
          </div>

          <div class="col-md-4 pl-md-1 text-left">
            <label>Téléphone <sapn style="color: red">*</sapn></label>

            <base-input
              type="text"
              required
              placeholder="Téléphone"
              v-model="agence.telephone"
            ></base-input>
            <p
              v-if="validationErrors.telephone"
              style="padding-bottom: 5px; color: red"
            >
              <span class="alert-link"
                >** {{ validationErrors.telephone[0] }}</span
              >
            </p>
          </div>
        </div>

        <div class="row m-0 w-100">
          <div class="col-md-4 pr-md-1 text-left">
            <label>Email <sapn style="color: red">*</sapn></label>
            <base-input
              placeholder="Email"
              v-model="agence.email"
              type="email"
            ></base-input>
            <p
              v-if="validationErrors.email"
              style="padding-bottom: 5px; color: red"
            >
              <span class="alert-link">** {{ validationErrors.email[0] }}</span>
            </p>
          </div>
          <div class="col-md-4 px-md-1 text-left">
            <label>Ville <sapn style="color: red">*</sapn></label>
            <select
              class="form-control"
              v-model="agence.ville_id"
              name="ville"
              required
            >
              <option
                v-for="ville in villes"
                v-bind:key="ville.id"
                v-bind:value="ville.id"
              >
                {{ ville.nom }}
              </option>
            </select>
            <p
              v-if="validationErrors.ville_id"
              style="padding-bottom: 5px; color: red"
            >
              <span class="alert-link"
                >** {{ validationErrors.ville_id[0] }}</span
              >
            </p>
          </div>

          <div class="col-md-4 px-md-1 text-left">
            <label class="custom-file-upload">
              Logo <sapn style="color: red">*</sapn>
              <br />
              <br />
              <input
                aria-label="label"
                name="logo"
                required
                type="file"
                @change="previewImageRio"
                class="input-file nn"
                accept="image/x-png, image/gif, image/jpeg"
              />
              <img
                c
                loading="lazy"
                class="hideWeb"
                src="https://img.icons8.com/color/48/000000/add-image.png"
              />
            </label>
            <div class="image-preview11 style_image" v-if="logo.length > 0">
              <img
                loading="lazy"
                class="width_img_src preview11"
                v-if="logo != 'logo-entreprise-etnafes.jpg'"
                :src="logo"
              />
            </div>
          </div>
        </div>

        <!-- <div class="row">
                <div class="col-md-12 pr-md-1 text-left">
                  <label>Logo</label>
                  <br />
                  <input
                    required
                    name="logo"
                    type="file"
                    @change="agencePhoto"
                    class="input-file"
                    accept="image/x-png, image/gif, image/jpeg"
                  />
                </div>
        </div>-->

        <div v-if="agences.data.length > 0">
          <div class="row m-0 w-100 my-3">
            <button
              class="btn btn-success"
              type="submit"
              fill
              style="margin-left: 10px; border-radius: 6px 6px 6px 6px"
            >
              {{ loading ? "En cours attendez ... " : "Enregistrer" }}
            </button>
          </div>
        </div>

        <div v-if="agences.data.length < 0">
          <div class="row m-0 w-100 my-3">
            <button
              class="btn btn-success"
              type="submit"
              fill
              style="margin-left: 10px; border-radius: 6px 6px 6px 6px"
            >
              {{ loading ? "En cours attendez ... " : "Suivant" }}
            </button>
          </div>
        </div>
      </card>
    </form>
    <card
      v-if="agences.data.length == 0 && showEtape2 == true"
      class="my-2"
      style="border: solid 1px #7a7979"
      ><!--   v-if="agences.length > 0" -->
      <div>
        Remarque ( <sapn style="color: red">*</sapn> ) : Champ obligatoire.
      </div>

      <div class="row m-0 w-100">
        <AjouterAgenceProfile></AjouterAgenceProfile>
      </div>
      <br />
    </card>
  </div>
</template>
<script>
import Vue from "vue";
import AjouterAgenceProfile from "./AjouterAgenceProfile";
import { Card, BaseInput } from "@/components/index";
import BaseButton from "@/components/BaseButton";
import { apiDomain } from "../config";
export default {
  components: {
    Card,
    BaseInput,
    BaseButton,
    AjouterAgenceProfile,
  },
  data() {
    return {
      loading: false,
      agencesln: "",
      showEtape2: false,
      logo: "logo-entreprise-etnafes.jpg",
      agences: [],
      adagence: [],
      validationErrors: "",
      ville_id: "",
      ville: {},
      villes: {},
      agence: {
        adagence_id: this.$store.state.propagence[0].id,
      },
    };
  },

  computed: {
    propagence() {
      return this.$store.getters.get_propagence;
    },
  },
  created() {
    this.fetchVilles();
    this.fetchAdagence(this.$store.state.propagence[0].id);
    this.fetchAgences(this.$store.state.propagence[0].id);
  },
  methods: {
    fetchAgences(id) {
      fetch(`${apiDomain}/api/agences/admin/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.agences = res.agences;
          this.agenceslength = res.agencesln;

          // this.agenceslength = res.agences.data.length;
        })
        .catch((err) => console.log(err));
    },
    previewImageRio: function (event) {
      // Reference to the DOM input element
      var input = event.target;
      // Ensure that you have a file before attempting to read it
      if (input.files && input.files[0]) {
        // create a new FileReader to read this image and convert to base64 format
        var reader = new FileReader();
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = (e) => {
          // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
          // Read image as base64 and set to imageData
          this.logo = e.target.result;
        };
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsDataURL(input.files[0]);
      }
    },
    /*   fetchAgences(id) {
      fetch(`${apiDomain}/api/agences/admin/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.agences = res.agences;
          this.agencesln = res.agencesln;
        })
        .catch((err) => console.log(err));
    }, */
    fetchAdagence(id) {
      fetch(`${apiDomain}/api/adagence/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.adagence = res;
        })
        .catch((err) => console.log(err));
    },
    fetchVilles() {
      axios
        .get(`${apiDomain}/api/allvillesTun`)
        .then(({ data }) => (this.villes = data.villes));
    },

    agencePhoto: function (event) {
      var input = event.target;
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        var vm = this;
        reader.onload = function (e) {
          vm.agence.logo = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
      console.log(input.files[0]);
    },

    createAgence(e) {
      this.loading = true;
      var formData = new FormData(e.target);
      if (this.agencesln > 0) {
        formData.append("nom_agence", this.agences.data[0].nom_agence);
      } else {
        formData.append("nom_agence", this.agence.nom_agence);
      }

      formData.append("email", this.agence.email);
      formData.append("logo", this.logo);

      formData.append("telephone", this.agence.telephone);
      formData.append("adresse", this.agence.adresse);
      formData.append("ville_id", this.agence.ville_id);
      formData.append("adagence_id", this.agence.adagence_id);
      axios
        .post(
          `${apiDomain}/api/create/agence?token=${this.$store.state.token}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          this.loading = false;
          if (res.status == 200) {
            this.showEtape2 = true;
            /* this.$fire({
              text: "votre agence a été ajouté avec succès,validation en cours",
              type: "success",
              timer: 90000,
            }).then((r) => {
              window.location.reload();
            }); */
          }
          /* this.$noty.success("Prestataire de Services Ajoutée avec succés.");
            this.$router.push({ name: "Agences" }); */
        })
        .catch((error) => {
          this.loading = false;
          if (error.response && error.response.status == 400) {
            this.validationErrors = error.response.data;
          }
        });
    },

    createAgencee(e) {
      this.loading = true;
      var formData = new FormData(e.target);
      if (this.agencesln > 0) {
        formData.append("nom_agence", this.agences.data[0].nom_agence);
      } else {
        formData.append("nom_agence", this.agence.nom_agence);
      }

      formData.append("email", this.agence.email);
      formData.append("logo", this.logo);

      formData.append("telephone", this.agence.telephone);
      formData.append("adresse", this.agence.adresse);
      formData.append("ville_id", this.agence.ville_id);
      formData.append("adagence_id", this.agence.adagence_id);
      axios
        .post(
          `${apiDomain}/api/create/agence?token=${this.$store.state.token}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          this.loading = false;
          if (res.status == 200) {
            this.$fire({
              text: "votre agence a été ajouté avec succès,validation en cours",
              type: "success",
              timer: 90000,
            }).then((r) => {
              window.location.reload();
            });
          }
          /* this.$noty.success("Prestataire de Services Ajoutée avec succés.");
            this.$router.push({ name: "Agences" }); */
        })
        .catch((error) => {
          this.loading = false;
          if (error.response && error.response.status == 400) {
            this.validationErrors = error.response.data;
          }
        });
    },
  },
};
</script>

