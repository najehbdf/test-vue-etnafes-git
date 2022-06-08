<template>
  <div class="content">
    <div class="row">
      <div class="col-md-12">
        <card>
          <form
            v-on:submit.prevent="
              updateAdAgenceWithoutPhoto(adagence.id, adagence)
            "
          >
            <!--  v-if="adagence.carte_professionnel != null" -->
            <!--  <div class="row">
              <div class="col-md-12 text-left">
                <label>Présentation <sapn style="color: red">*</sapn></label>
                <textarea
                  required
                  class="form-control"
                  placeholder="Ecrire quelques lignes de présentation qui apparaitront sur votre page dédiée"
                  name="présentation"
                  v-model="présentation"
                />

                <p
                  v-if="validationErrors.présentation"
                  style="padding-bottom: 5px; color: red"
                >
                  <span class="alert-link"
                    >** {{ validationErrors.présentation[0] }}</span
                  >
                </p>
              </div>
            </div> -->

            <div class="row">
              <!--Profile Card 3-->
              <div class="col-md-12">
                <div>
                  <label
                    >Carte professionnel de l'agence
                    <sapn style="color: red">*</sapn></label
                  >
                  <div class="profile-thumb-block">
                    <img
                      loading="lazy"
                      width="20%"
                      v-b-modal.modal-edit-image
                      :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_agence/${adagence.carte_professionnel}`"
                      alt="profile-image"
                      class="profile"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              class="btn btn-info my-3"
              fill
              style="border-radius: 6px 6px 6px 6px"
            >
              Enregistrer
            </button>
          </form>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
import VuePassword from "vue-password";
import { apiDomain } from "../config";
import { Card, BaseInput } from "@/components/index";
import EditProfileForm from "./Profile/EditProfileProp.vue";
import UserCard from "./Profile/UserCard.vue";
import BaseButton from "@/components/BaseButton";

export default {
  components: {
    VuePassword,
    EditProfileForm,
    UserCard,
    Card,
    BaseInput,
    BaseButton,
  },

  computed: {
    loggedIn() {
      return this.$store.getters.get_loggedIn;
    },

    propagence() {
      return this.$store.getters.get_propagence;
    },

    user() {
      return this.$store.getters.get_user;
    },
    isPasswordMatching() {
      if (
        this.password == "" ||
        this.password_confirmation == "" ||
        this.password != this.password_confirmation
      )
        return true;
      return false;
    },
  },
  data() {
    return {
      présentation: "",
      validationErrors: [],
      loading: false,
      errors: [],
      pays: [],
      villespays: [],
      pays_id: "",
      paysshow: false,
      ville: {},
      contains_eight_characters: false,
      contains_number: false,
      contains_uppercase: false,
      contains_special_character: false,
      valid_password: false,
      passwordAncien: "",
      password: "",
      password_confirmation: "",
      isCreatingPassword: false,
      isCreatingPasswordVerif: false,
      isCreating: false,
      isCorrect: false,
      modalContacterClient: false,
      agences: {},
      adagence: {},
      paiements: {},
      client: {},
      photo: "",
      carte_prof: "",
      carte_professionnel: "",
      file: null,
      showPreview: false,
      imagePreview: "",
      apiDomain: "https://etnafesapi20212018.etnafes.com",
    };
  },
  created() {
    this.fetchclient(this.$store.state.user.id);
    this.fetchagenceadmin(this.$store.state.propagence[0].id);

    this.fetchPaiements();
    this.fetchAgences();
  },

  methods: {
    Carte: function (event) {
      var input = event.target;
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        var vm = this;
        reader.onload = function (e) {
          vm.carte_prof = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
      console.log(input.files[0]);
    },
    checkPassword() {
      this.password_length = this.password.length;
      const format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

      if (this.password_length >= 8) {
        this.contains_eight_characters = true;
      } else {
        this.contains_eight_characters = false;
      }

      this.contains_number = /\d/.test(this.password);
      this.contains_uppercase = /[A-Z]/.test(this.password);
      this.contains_special_character = format.test(this.password);

      if (
        this.contains_eight_characters === true &&
        this.contains_special_character === true &&
        this.contains_uppercase === true &&
        this.contains_number === true
      ) {
        this.valid_password = true;
      } else {
        this.valid_password = false;
      }
    },
    IschangePassword() {
      var formData = new FormData();
      this.isCreatingPasswordVerif = true;
      if (this.valid_password == true) {
        formData.append("password", this.password);
      }
      axios
        .post(
          `${apiDomain}/api/editPassword/agence/${this.$store.state.user.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )

        .then((res) => {
          this.isCreatingPasswordVerif = false;
          if (res.status == 200) {
            if (confirm("Mot de passe modifié avec succés")) {
              window.location.reload();
            }
          }
        })
        .catch((error) => {
          this.isCreatingPasswordVerif = false;
          console.log(error);

          if (error.response.status == 422) {
            this.errors = error.response.data.errors;
          }
        });
    },
    changePassword() {
      this.isCreatingPassword = true;
      this.isCorrect = false;

      let formData = new FormData();
      formData.append("passwordAncien", this.passwordAncien);
      axios
        .post(
          `${apiDomain}/api/password/agence/${this.$store.state.user.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          this.isCreatingPassword = false;
          if (res.status == 200) {
            this.isCorrect = true;
          }
        })
        .catch((error) => {
          this.isCreatingPassword = false;
          console.log(error);

          if (error.response.status == 422) {
            this.errors = error.response.data.errors;
          }
          if (error.response.status == 500) {
            this.$noty.error(" OOPS ! mot de passe ancien est incoorect !");
          }
        });
    },
    modalActionContact() {
      if (this.modalContacterClient == false) {
        this.modalContacterClient = true;
      } else {
        this.modalContacterClient = false;
      }
    },
    fetchAgences() {
      axios
        .get(`${apiDomain}/api/agences`)
        .then(({ data }) => (this.agences = data));
    },
    fetchPaiements() {
      axios
        .get(`${apiDomain}/api/paiements`)
        .then(({ data }) => (this.paiements = data));
    },
    updateAdAgenceWithoutPhoto(e) {
      let formData = new FormData();
      formData.append("présentation", this.présentation);
      axios
        .post(
          `${apiDomain}/api/adagence/non/update/${this.$store.state.propagence[0].id}?token=${this.$store.state.token}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          if (res.status == 200) {
            this.$fire({
              text: "Votre profil a été modifié avec succés",
              type: "success",
              timer: 90000,
            }).then((r) => {
              window.location.reload();
            });
          }
        })
        .catch((error) => {
          console.log(error.response.data);
          if (error.response.status == 422) {
            this.validationErrors = error.response.data;
          }
        });
    },

    updateAdAgence(e) {
      let formData = new FormData();
      formData.append("présentation", this.adagence.présentation);
      axios
        .post(
          `${apiDomain}/api/adagence/update/${this.$store.state.propagence[0].id}?token=${this.$store.state.token}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          if (res.status == 200) {
            this.$fire({
              text: "Votre profil a été modifié avec succés",
              type: "success",
              timer: 90000,
            }).then((r) => {
              window.location.reload();
            });
          }
        })
        .catch((error) => {
          console.log(error.response.data);
          if (error.response.status == 422) {
            this.validationErrors = error.response.data;
          }
        });
    },

    updateImage(id, user) {
      this.loading = true;
      var formData = new FormData();
      formData.append("carte_professionnel", this.carte_professionnel);
      axios
        .post(
          `${apiDomain}/api/adagence-photo/${this.$store.state.propagence[0].id}`,
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
            if (confirm("photo modifiée avec succés")) {
              window.location.reload();
            }
          }
        })
        .catch(function () {
          this.loading = false;

          console.log("FAILURE!!");
        });
    },

    //show user by id
    fetchclient(id) {
      fetch(`${apiDomain}/api/client/${id}?token=${this.$store.state.token}`)
        .then((res) => res.json())
        .then((res) => {
          this.client = res.client;
        })
        .catch((err) => console.log(err));
    },

    fetchagenceadmin(id) {
      fetch(`${apiDomain}/api/agencead/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.adagence = res.adagence;
        })
        .catch((err) => console.log(err));
    },

    onChangeFileUpload() {
      this.carte_professionnel = this.$refs.carte_professionnel.files[0];
      let reader = new FileReader();
      reader.addEventListener(
        "load",
        function () {
          this.showPreview = true;
          this.imagePreview = reader.result;
        }.bind(this),
        false
      );

      if (this.carte_professionnel) {
        if (/\.(jpe?g|png|gif)$/i.test(this.carte_professionnel.name)) {
          reader.readAsDataURL(this.carte_professionnel);
        }
      }
    },
  },
};
</script>
