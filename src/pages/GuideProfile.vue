<template>
  <div class="content">
    <div>
      <b-modal id="modal-edit-image" :user="'user'">
        <form v-on:submit.prevent="updateImage(user.id, user)" class="mb-3">
          <div class="row" style="padding: 10px">
            <div>
              <center>
                <img loading="lazy"
                  alt="photo"
                  class="rounded-circle"
                  v-bind:src="imagePreview"
                  v-show="showPreview"
                  style="width: 200%"
                />
                <img loading="lazy"
                  alt="guide"
                  v-if="!showPreview"
                  class="rounded-circle"
                  :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_guide/${guide.photo}`"
                  width="70%"
                />
              </center>
              <br />

              <input
                aria-label="label"
                type="file"
                ref="photo"
                v-on:change="onChangeFileUpload()"
                id="photo"
                class="upload-button"
              />
            </div>
          </div>
          <div>
            <center>
              <button type="submit" class="btn btn-info">Modifier</button>
            </center>
          </div>
        </form>
      </b-modal>
    </div>
    <div class="row">
      <div class="col-md-8">
        <card>
          <template slot="header">
            <h5 class="title" style="padding-top: 15px">
              Modifier votre profile
            </h5>
          </template>
          <form v-on:submit.prevent="updateGuide(guide.id, guide)">
            <div class="row">
              <div class="col-md-6 pr-md-1 text-left">
                <base-input
                  label="Nom"
                  placeholder="Nom"
                  v-model="guide.nom"
                ></base-input>

                <p
                  v-if="validationErrors.nom"
                  style="padding-bottom: 5px; color: red"
                >
                  <span class="alert-link"
                    >** {{ validationErrors.nom[0] }}</span
                  >
                </p>
              </div>

              <div class="col-md-6 pl-md-1 text-left">
                <base-input
                  label="Prenom"
                  placeholder="Prénom"
                  v-model="guide.prenom"
                ></base-input>

                <p
                  v-if="validationErrors.prenom"
                  style="padding-bottom: 5px; color: red"
                >
                  <span class="alert-link"
                    >** {{ validationErrors.prenom[0] }}</span
                  >
                </p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 pr-md-1 text-left">
                <label>Civilité</label>
                <select
                  class="form-control"
                  name="civilite"
                  placeholder="civilité"
                  v-model="guide.civilité"
                  required
                >
                  <option value="mr" selected>Mr</option>
                  <option value="mme">Mme</option>
                  <option value="mlle">Mlle</option>
                </select>
                <p
                  v-if="validationErrors.civilité"
                  style="padding-bottom: 5px; color: red"
                >
                  <span class="alert-link"
                    >** {{ validationErrors.civilité[0] }}</span
                  >
                </p>
              </div>
              <div class="col-md-6 pl-md-1 text-left">
                <base-input
                  label="Telephone"
                  placeholder="Telephone"
                  v-model="guide.telephone"
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

            <div class="row">
              <div class="col-md-6 pr-md-1 text-left">
                <base-input
                  label="Langue de visite"
                  placeholder="Langue de visite"
                  v-model="guide.langue_de_visite"
                ></base-input>
                <p
                  v-if="validationErrors.langue_de_visite"
                  style="padding-bottom: 5px; color: red"
                >
                  <span class="alert-link"
                    >** {{ validationErrors.langue_de_visite[0] }}</span
                  >
                </p>
              </div>
              <div class="col-md-6 pl-md-1 text-left">
                <base-input
                  label="Langue maternelle"
                  v-model="guide.langue_maternelle"
                ></base-input>
                <p
                  v-if="validationErrors.langue_maternelle"
                  style="padding-bottom: 5px; color: red"
                >
                  <span class="alert-link"
                    >** {{ validationErrors.langue_maternelle[0] }}</span
                  >
                </p>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <base-input
                  type="text"
                  :placeholder="ville.nom"
                  disabled
                ></base-input>
              </div>
            </div>
            <div class="col-md-1" style="margin-top: -52px; margin-left: 714px">
              <img loading="lazy"
                alt="edit ville"
                v-if="paysshow == false"
                src="/edit-property-etnafes.png"
                @click="paysshow = true"
              />

              <img loading="lazy"
                v-if="paysshow == true"
                src="/edit-property-etnafes.png"
                @click="paysshow = false"
              />
            </div>
            <br />
            <div class="row" v-if="paysshow == true">
              <div class="col-md-6 pr-md-1 text-left">
                <div class="form-group">
                  <label>Pays *</label>
                  <select
                    class="form-control"
                    required
                    v-model="pays_id"
                    @change="fetchVillesPays(pays_id)"
                  >
                    <option value disabled selected>
                      choisissez votre pays
                    </option>
                    <option
                      v-for="pays in pays"
                      v-bind:key="pays.id"
                      v-bind:value="pays.id"
                    >
                      {{ pays.nom_fr_fr }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="col-md-6 pl-md-1 text-left">
                <div class="form-group">
                  <label>Ville *</label>
                  <select
                    class="form-control"
                    required
                    v-model="guide.ville_id"
                  >
                    <option value disabled selected>
                      choisissez votre destination
                    </option>
                    <option
                      v-for="ville in villespays"
                      v-bind:key="ville.id"
                      v-bind:value="ville.id"
                    >
                      {{ ville.nom }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12 text-left">
                <base-input
                  label="Numéro CIN"
                  placeholder="Numéro CIN"
                  v-model="guide.cin"
                ></base-input>

                <p
                  v-if="validationErrors.cin"
                  style="padding-bottom: 5px; color: red"
                >
                  <span class="alert-link"
                    >** {{ validationErrors.cin[0] }}</span
                  >
                </p>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 text-left">
                <label>Présentation</label>
                <textarea
                  class="form-control"
                  placeholder="Ecrire quelques lignes de présentation qui apparaitront sur votre page dédiée"
                  name="présentation"
                  v-model="guide.présentation"
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
            </div>

            <div class="row">
              <div class="col-md-6 pr-md-1 text-left">
                <base-input
                  label="Adresse Email"
                  type="email"
                  v-model="guide.email"
                ></base-input>

                <p
                  v-if="validationErrors.email"
                  style="padding-bottom: 5px; color: red"
                >
                  <span class="alert-link"
                    >** {{ validationErrors.email[0] }}</span
                  >
                </p>
              </div>
              <div class="col-md-6 pl-md-1 text-left">
                <base-input label="login" v-model="guide.login"></base-input>
              </div>
            </div>
            <button
              type="submit"
              class="btn btn-info"
              style="border-radius: 18px 0px 18px 0px"
              fill
            >
              Enregistrer
            </button>
          </form>
        </card>
      </div>
      <div class="col-md-4">
        <card type="user">
          <div class="author">
            <div class="block block-one"></div>
            <div class="block block-two"></div>
            <div class="block block-three"></div>
            <div class="block block-four"></div>
            <center>
              <img loading="lazy"
                class="img-responsive rounded-circle"
                :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_guide/${guide.photo}`"
                alt="modifier image"
                style="width: 50%"
                v-b-modal.modal-edit-image
              />
            </center>
            <br />
            <br />
            <h5 class="title">{{ guide.nom }} {{ guide.prenom }}</h5>
          </div>
          <p class="card-description">{{ guide.présentation }}</p>
          <div slot="footer" class="button-container">
            <base-button icon round class="btn-facebook">
              <i class="fab fa-facebook"></i>
            </base-button>
            <base-button icon round class="btn-twitter">
              <i class="fab fa-twitter"></i>
            </base-button>
            <base-button icon round class="btn-google">
              <i class="fab fa-google-plus"></i>
            </base-button>
          </div>

          <hr v-if="!modalContacterClient" />
          <div @click="modalActionContact()" v-if="!modalContacterClient">
            <br />

            <p style="color: balck; font-weight: bold; margin-left: 20px">
              <img loading="lazy" src="/key-security-etnafes.png" /> Changer le mot de passe
            </p>
            <br />
          </div>
          <hr v-if="!modalContacterClient" />
          <div
            v-if="modalContacterClient"
            class="
              bg-smoke
              absoluten
              pin-t pin-l
              h-screen
              w-full
              flex
              items-center
              justify-center
            "
          >
            <hr />
            <br />
            <p style="color: balck; font-weight: bold; margin-left: 20px">
              <img loading="lazy" src="/key-security-etnafes.png" /> Changer le mot de passe
            </p>
            <br />
            <hr />
            <div class="bg-white p-4 rounded w-1/3" style="color: black">
              <div class="row">
                <form v-on:submit.prevent="changePassword">
                  <div class="col-sm-12" v-if="isCorrect == false">
                    <div class="row">
                      <div class="col-md-8">
                        <label>Mot de passe actuel</label>
                        <VuePassword
                          name="password"
                          label="Tapez votre nouveau mot de passe"
                          v-model="passwordAncien"
                          type="text"
                          placeholder="*******"
                        />
                      </div>
                      <div class="col-md-3">
                        <div v-if="isCorrect == false" class="text-center">
                          <base-button
                            type="submit"
                            style="margin-top: 20px; padding: 10px 26px"
                            class="btn btn-info"
                            v-on:click="changePassword()"
                            >{{
                              isCreatingPassword ? "En cours" : "Verifier"
                            }}</base-button
                          >
                        </div>
                      </div>
                    </div>

                    <span
                      class="list-group-item list-group-item-danger"
                      v-if="errors.passwordAncien"
                      >{{ errors.passwordAncien[0] }} (*)</span
                    >
                  </div>
                </form>

                <form v-on:submit.prevent="IschangePassword">
                  <div v-if="isCorrect == true">
                    <div>
                      <div class="col-sm-12">
                        <p>Tapez votre nouveau mot de passe</p>

                        <b-tooltip target="tooltip-target-1" triggers="hover">
                          <ul>
                            <li
                              v-bind:class="{
                                is_valid: contains_eight_characters,
                              }"
                            >
                              8 Caractéres
                            </li>
                            <li v-bind:class="{ is_valid: contains_number }">
                              Chiffre
                            </li>
                            <li v-bind:class="{ is_valid: contains_uppercase }">
                              Lettre majuscule
                            </li>
                            <li
                              v-bind:class="{
                                is_valid: contains_special_character,
                              }"
                            >
                              Caractére spécial
                            </li>
                          </ul>

                          <div
                            class="checkmark_container"
                            v-bind:class="{ show_checkmark: valid_password }"
                          >
                            <svg width="50%" height="50%" viewBox="0 0 140 100">
                              <path
                                class="checkmark"
                                v-bind:class="{ checked: valid_password }"
                                d="M10,50 l25,40 l95,-70"
                              />
                            </svg>
                          </div>
                        </b-tooltip>

                        <VuePassword
                          id="tooltip-target-1"
                          name="password"
                          @input="checkPassword"
                          label="Tapez votre nouveau mot de passe"
                          v-model="password"
                          type="text"
                          placeholder="*******"
                        />

                        <span
                          class="list-group-item list-group-item-danger"
                          v-if="errors.password"
                          >{{ errors.password[0] }} (*)</span
                        >
                      </div>
                    </div>
                    <div>
                      <div class="col-sm-12">
                        <p>Confirmation mot de passe</p>
                        <VuePassword
                          name="password_confirmation"
                          label="Confirmation"
                          v-model="password_confirmation"
                          type="text"
                          placeholder="*******"
                        />

                        <div
                          v-if="isPasswordMatching == false"
                          class="alert alert-success"
                          role="alert"
                        >
                          Mot de passe confirmé
                        </div>
                        <div
                          v-if="isPasswordMatching == true"
                          class="alert alert-danger"
                          role="alert"
                        >
                          Pas encore confirmé
                        </div>
                      </div>
                    </div>

                    <div class="text-center">
                      <base-button
                        type="submit"
                        style="margin-top: 20px"
                        class="btn btn-info"
                        v-show="!isPasswordMatching"
                        v-on:click="IschangePassword()"
                        >{{
                          isCreatingPasswordVerif
                            ? "En cours attendez ..."
                            : "Modifier "
                        }}</base-button
                      >
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
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
      validationErrors: [],
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
      guide: {},
      photo: "",
      file: null,
      showPreview: false,
      imagePreview: "",
      apiDomain: "https://etnafesapi20212018.etnafes.com",
    };
  },
  created() {
    this.fetchguide(this.$store.state.user.id);
    this.fetchPays();
  },

  methods: {
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
          `${apiDomain}/api/editPassword/guide/${this.$store.state.user.id}`,
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
          `${apiDomain}/api/password/guide/${this.$store.state.user.id}`,
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
            this.$noty.error(" OOPS ! mot de passe ancien est incorrect !");
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
    fetchPays() {
      axios.get(`${apiDomain}/api/pays`).then(({ data }) => (this.pays = data));
    },
    fetchVillesPays(id) {
      axios
        .get(`${apiDomain}/api/pays/villes/${id}`)
        .then(({ data }) => (this.villespays = data.villes));
    },

    updateGuide(e) {
      let formData = new FormData();
      formData.append("nom", this.guide.nom);
      formData.append("prenom", this.guide.prenom);
      formData.append("email", this.guide.email);
      formData.append("telephone", this.guide.telephone);
      formData.append("présentation", this.guide.présentation);
      formData.append("civilité", this.guide.civilité);
      formData.append("cin", this.guide.cin);
      formData.append("langue_maternelle", this.guide.langue_maternelle);
      formData.append("langue_de_visite", this.guide.langue_de_visite);
      formData.append("login", this.guide.login);
      formData.append("ville_id", this.guide.ville_id);
      axios
        .post(
          `${apiDomain}/api/update/guide/${this.$store.state.user.id}`,
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
          this.updateIn = false;
          console.log(error.response.data);
          if (error.response.status == 422) {
            this.validationErrors = error.response.data;
          }
        });
    },

    updateImage(id, user) {
      var formData = new FormData();
      formData.append("photo", this.photo);
      axios
        .post(
          `${apiDomain}/api/userphoto/${this.$store.state.user.id}`,
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

    //show user by id
    fetchguide(id) {
      fetch(`${apiDomain}/api/guide/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.guide = res.guide;
          this.ville = res.guide.ville;
        })
        .catch((err) => console.log(err));
    },
    onChangeFileUpload() {
      this.photo = this.$refs.photo.files[0];
      let reader = new FileReader();
      reader.addEventListener(
        "load",
        function () {
          this.showPreview = true;
          this.imagePreview = reader.result;
        }.bind(this),
        false
      );

      if (this.photo) {
        if (/\.(jpe?g|png|gif)$/i.test(this.photo.name)) {
          reader.readAsDataURL(this.photo);
        }
      }
    },
  },
};
</script>

