<template>
  <div class="content">
    <div>
      <b-modal
        id="modal-edit-image"
        :user="'user'"
        :title="user.nom + ' ' + user.prenom"
      >
        <form v-on:submit.prevent="updateImage(user.id, user)" class="mb-3">
          <div class="row" style="padding: 10px">
            <div>
              <center>
                <img
                  loading="lazy"
                  alt="photo"
                  class="rounded-circle"
                  v-bind:src="imagePreview"
                  v-show="showPreview"
                  style="width: 200%"
                />

                <img
                  loading="lazy"
                  alt="photo"
                  v-if="!showPreview"
                  class="rounded-circle"
                  :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_client/${client.photo}`"
                  width="70%"
                />
              </center>
              <br />

              <input
                style="font-size: 12.5px !important"
                aria-label="photo"
                required
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
              <button type="submit" class="btn btn-info">
                <!--  {{ loading ? "Téléchargement en cours " : "Modifier" }} -->
                <div
                  v-if="loading"
                  class="spinner-border spinner-border-sm"
                ></div>
                <span v-if="loading">Téléchargement en cours</span>
                <span v-else>Modifier </span>
              </button>
            </center>
          </div>
        </form>
      </b-modal>
    </div>
    <div class="row">
      <div class="col-xl-8 col-lg-8 col-md-12 col-sm-12 order-lg-1 order-2">
        <card>
          <div class="row" v-if="userSingll.active == 0">
            <div class="col-md-12">
              <b-card style="border-color: #f5a623" tag="article" class="mb-2">
                <b-card-text
                  style="border: 1px solid rgb(237 145 32); padding: 19px"
                >
                  <form>
                    <div class="row">
                      <div class="col-md-12">
                        <div
                          style="
                            border-color: #f5a623;
                            background: #f5e7cd;
                            color: #ee6739;
                          "
                          class="alert mr-1"
                        >
                          Bonjour {{ user.nom }} {{ user.prenom }} , Veuillez
                          saisir le code que vous avez reçu par email pour
                          activer votre compte. <br />
                          NB:Si vous n'avez pas reçu l'email vérfier votre SPAM
                          .<br />

                          مرحبًا ، الرجاء إدخال الرمز الذي تلقيته عبر البريد
                          الإلكتروني لتفعيل حسابك.
                          <br />
                          27 432 182 إذا كانت لديك مشكلة في تفعيل حسابك الرجاء
                          الإتصال بالرقم التالي
                        </div>
                        <div class="row">
                          <div class="col-md-6">
                            <base-input
                              placeholder="Entrer votre code ..."
                              v-model="tokenVerifEmail"
                            >
                            </base-input>

                            <span class="text-red" v-if="errors.token">{{
                              errors.token[0]
                            }}</span>
                          </div>
                          <div class="col-md-6">
                            <button
                              @click.prevent="verifEmailClient"
                              type="submit"
                              class="btn btn-info"
                              fill
                              style="border-radius: 18px 0px 18px 0px"
                            >
                              {{
                                isLoadingVerifEmail
                                  ? "En cours attendez ..."
                                  : "Verification "
                              }}
                            </button>
                            <!--    <button
                              style="margin-top: -2px"
                              color="primary"
                              class="px-4"
                              @click.prevent="verifEmailClient"
                            >
                              {{
                                isLoadingVerifEmail
                                  ? "En cours attendez ..."
                                  : "Verification "
                              }}
                            </button> -->
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </b-card-text>
              </b-card>
            </div>
          </div>

          <template slot="header">
            <h5 class="title" style="padding-top: 15px">
              Modifier votre profile
            </h5>
          </template>
          <form
            v-on:submit.prevent="updateClient(client.id, client)"
            style="padding: 10px"
          >
            <div class="row">
              <div class="col-md-6 pr-md-1 text-left">
                <base-input
                  label="Nom"
                  placeholder="Nom"
                  v-model="client.nom"
                ></base-input>
                <!--  {{client.nom.substr(client.nom.indexof('')+1)}}  -->
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
                  v-model="client.prenom"
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
                  v-model="client.civilité"
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
                  v-model="client.telephone"
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
            <div class="row" v-if="client.ville != null">
              <div class="col-lg-12 d-flex align-items-center">
                <base-input
                  class="w-100 m-0"
                  type="text"
                  :placeholder="ville.nom"
                  disabled
                ></base-input>
                <img
                  class="h-100"
                  loading="lazy"
                  alt="edit ville"
                  v-if="paysshow == false"
                  src="/edit-property-etnafes.png"
                  @click="paysshow = true"
                />

                <img
                  loading="lazy"
                  v-if="paysshow == true"
                  src="/edit-property-etnafes.png"
                  @click="paysshow = false"
                />
              </div>
              <div class="col-sm-2 col-md-1"></div>
            </div>

            <div class="row" v-else>
              <div class="col-sm-9 col-md-11">
                <base-input
                  type="text"
                  placeholder="ville est vide"
                  disabled
                ></base-input>
              </div>
              <div class="col-sm-2 col-md-1">
                <img
                  loading="lazy"
                  alt="edit ville"
                  v-if="paysshow == false"
                  src="/edit-property-etnafes.png"
                  @click="paysshow = true"
                />

                <img
                  loading="lazy"
                  v-if="paysshow == true"
                  src="/edit-property-etnafes.png"
                  @click="paysshow = false"
                />
              </div>
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
                    v-model="client.ville_id"
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
              <div class="col-md-12">
                <base-input
                  label="Adresse Email"
                  type="email"
                  v-model="client.email"
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
            </div>
            <div class="row">
              <div class="col-md-12">
                <gmap-autocomplete
                  name="adresse"
                  @place_changed="setPlace"
                  @mouseout="addMarker"
                  :placeholder="user.adresse"
                  style="
                    border: 1px solid #ced4da;
                    border-radius: 0.25rem;
                    transition: border-color 0.15s ease-in-out,
                      box-shadow 0.15s ease-in-out;
                    padding: 0.375rem 0.75rem;
                    width: 100%;
                  "
                ></gmap-autocomplete>
                <p
                  v-if="validationErrors.adresse"
                  style="padding-bottom: 5px; color: red"
                >
                  <span class="alert-link"
                    >** {{ validationErrors.adresse[0] }}</span
                  >
                </p>
                <br />
                <input
                  aria-label="label"
                  name="latitude"
                  type="hidden"
                  id="lat"
                  v-model="center.lat"
                />
                <input
                  aria-label="label"
                  name="longitude"
                  type="hidden"
                  id="lng"
                  v-model="center.lng"
                />
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <gmap-map
                  :center="center"
                  :zoom="6"
                  style="width: 100%; height: 270px"
                >
                  <gmap-marker
                    :key="index"
                    v-for="(m, index) in markers"
                    :position="m.position"
                    @click="center = m.position"
                  ></gmap-marker>
                </gmap-map>
              </div>
            </div>

            <!-- <div class="row">
              <div class="col-md-12">
                <base-input
                  label="Login"
                  type="text"
                  v-model="client.login"
                ></base-input>
                <p
                  v-if="validationErrors.login"
                  style="padding-bottom: 5px; color: red"
                >
                  <span class="alert-link"
                    >** {{ validationErrors.login[0] }}</span
                  >
                </p>
              </div>
            </div> -->

            <button
              v-if="loading_enregistrer == false"
              type="submit"
              class="btn btn-info"
              fill
              style="border-radius: 18px 0px 18px 0px"
            >
              Enregistrer
            </button>

            <b-button
              v-if="loading_enregistrer == true"
              type="submit"
              class="btn btn-info"
              fill
            >
              <span
                ><!-- <b-spinner small type="grow"></b-spinner> -->
                En cours attendez...</span
              >
            </b-button>
          </form>
        </card>
      </div>

      <div class="col-lg-4 col-md-12 order-lg-2 order-1">
        <section>
          <div class="container">
            <div class="row">
              <!--Profile Card 3-->
              <div class="col-md-12">
                <div class="card profile-card-3">
                  <div
                    class="background-block"
                    style="background-color: rgba(240, 255, 223)"
                  ></div>
                  <div class="profile-thumb-block">
                    <img
                      loading="lazy"
                      v-if="user.provider != null"
                      v-b-modal.modal-edit-image
                      :src="`${client.photo}`"
                      alt="profile-image"
                      class="profile"
                    />

                    <img
                      loading="lazy"
                      v-if="user.provider == null"
                      v-b-modal.modal-edit-image
                      :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_client/${client.photo}`"
                      alt="profile-image"
                      class="profile"
                    />
                  </div>
                  <div class="card-content">
                    <h2>
                      {{ client.nom }} {{ client.prenom }}
                      <!-- <small>Designer</small> -->
                    </h2>
                    <div class="icon-block">
                      <a href="#">
                        <i class="fab fa-facebook"></i>
                      </a>
                      <a href="#">
                        <i class="fab fa-twitter"></i>
                      </a>
                      <a href="#">
                        <i class="fab fa-google-plus"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div class="card profile-card-4">
                  <hr v-if="!modalContacterClient" />
                  <div
                    @click="modalActionContact()"
                    v-if="!modalContacterClient"
                  >
                    <p
                      style="color: balck; font-weight: bold; margin-left: 20px"
                      onmouseover="this.style.cursor='pointer'"
                    >
                      <img loading="lazy" src="/key-security-etnafes.png" />
                      Changer le mot de passe
                    </p>
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
                    <p
                      style="color: balck; font-weight: bold; margin-left: 20px"
                    >
                      <img loading="lazy" src="/key-security-etnafes.png" />
                      Changer le mot de passe
                    </p>
                    <hr />
                    <div class="p-4 rounded w-1/3" style="color: black">
                      <div class="row" style="margin-top: -30px">
                        <form v-on:submit.prevent="changePassword">
                          <div class="col-sm-12" v-if="isCorrect == false">
                            <div class="row">
                              <div class="col-md-8">
                                <label>Mot de passe actuel</label>
                                <VuePassword
                                  style="
                                    margin-left: -7px;
                                    height: 88% !important;
                                  "
                                  name="password"
                                  label="Tapez votre nouveau mot de passe"
                                  v-model="passwordAncien"
                                  type="text"
                                  placeholder="*******"
                                />
                              </div>
                              <div class="col-md-3">
                                <div
                                  v-if="isCorrect == false"
                                  class="text-center"
                                >
                                  <base-button
                                    type="submit"
                                    style="margin-top: 27px; margin-left: -20px"
                                    class="btn btn-info"
                                    v-on:click="changePassword()"
                                  >
                                    {{
                                      isCreatingPassword
                                        ? "En cours"
                                        : "Verifier"
                                    }}
                                  </base-button>
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

                                <b-tooltip
                                  target="tooltip-target-1"
                                  triggers="hover"
                                >
                                  <ul>
                                    <li
                                      v-bind:class="{
                                        is_valid: contains_eight_characters,
                                      }"
                                    >
                                      8 Caractéres
                                    </li>
                                    <li
                                      v-bind:class="{
                                        is_valid: contains_number,
                                      }"
                                    >
                                      Chiffre
                                    </li>
                                    <li
                                      v-bind:class="{
                                        is_valid: contains_uppercase,
                                      }"
                                    >
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
                                    v-bind:class="{
                                      show_checkmark: valid_password,
                                    }"
                                  >
                                    <svg
                                      width="50%"
                                      height="50%"
                                      viewBox="0 0 140 100"
                                    >
                                      <path
                                        class="checkmark"
                                        v-bind:class="{
                                          checked: valid_password,
                                        }"
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
                              >
                                {{
                                  isCreatingPasswordVerif
                                    ? "En cours attendez ..."
                                    : "Modifier "
                                }}
                              </base-button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- <p class="mt-3 w-100 float-left text-center">
                  
                </p>-->
              </div>
            </div>
          </div>
        </section>
      </div>
      <!-- <div class="col-md-4">
        <card type="user">
          <div class="author">
            <div class="block block-one"></div>
            <div class="block block-two"></div>
            <div class="block block-three"></div>
            <div class="block block-four"></div>
            <center>
              <img loading="lazy"
                class="img-responsive rounded-circle"
                :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_client/${client.photo}`"
                alt="modifier image"
                style="width:50%"
                v-b-modal.modal-edit-image
              />
            </center>
            <br />
            <br />

            <h5 class="title">{{ client.nom }} {{ client.prenom }}</h5>

            <p class="description">{{user.title}}</p>
          </div>
          <p class="card-description">{{user.présentation}}</p>

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

            <p
              style="color:balck;font-weight:bold;margin-left:20px"
              onmouseover="this.style.cursor='pointer'"
            >
              <img loading="lazy" src="/key-security-etnafes.png" /> Changer le mot de passe
            </p>
            <br />
          </div>
          <hr v-if="!modalContacterClient" />
          <div
            v-if="modalContacterClient"
            class="bg-smoke absoluten pin-t pin-l h-screen w-full flex items-center justify-center"
          >
            <hr />
            <br />
            <p style="color:balck;font-weight:bold;margin-left:20px">
              <img loading="lazy" src="/key-security-etnafes.png" /> Changer le mot de passe
            </p>
            <br />
            <hr />
            <div class="bg-white p-4 rounded w-1/3" style="color:black;">
              <div class="row" style="margin-top:-30px">
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
                            style="margin-top:20px;padding:10px 26px"
                            class="btn btn-info"
                            v-on:click="changePassword()"
                          >{{isCreatingPassword ? 'En cours' : 'Verifier'}}</base-button>
                        </div>
                      </div>
                    </div>

                    <span
                      class="list-group-item list-group-item-danger"
                      v-if="errors.passwordAncien"
                    >{{errors.passwordAncien[0]}} (*)</span>
                  </div>
                </form>

                <form v-on:submit.prevent="IschangePassword">
                  <div v-if="isCorrect == true">
                    <div>
                      <div class="col-sm-12">
                        <p>Tapez votre nouveau mot de passe</p>

                        <b-tooltip target="tooltip-target-1" triggers="hover">
                          <ul>
                            <li v-bind:class="{ is_valid: contains_eight_characters }">8 Caractéres</li>
                            <li v-bind:class="{ is_valid: contains_number }">Chiffre</li>
                            <li v-bind:class="{ is_valid: contains_uppercase }">Lettre majuscule</li>
                            <li
                              v-bind:class="{ is_valid: contains_special_character }"
                            >Caractére spécial</li>
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
                        >{{errors.password[0]}} (*)</span>
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
                          v-if="isPasswordMatching==false"
                          class="alert alert-success"
                          role="alert"
                        >Mot de passe confirmé</div>
                        <div
                          v-if="isPasswordMatching==true"
                          class="alert alert-danger"
                          role="alert"
                        >Pas encore confirmé</div>
                      </div>
                    </div>

                    <div class="text-center">
                      <base-button
                        type="submit"
                        style="margin-top:20px"
                        class="btn btn-info"
                        v-show="!isPasswordMatching"
                        v-on:click="IschangePassword()"
                      >{{isCreatingPasswordVerif ? 'En cours attendez ...' : 'Modifier '}}</base-button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </card>
      </div>-->
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
      markers: [],
      places: [],
      currentPlace: null,
      loading_enregistrer: false,
      loading: false,
      type: this.$route.query.type,
      tokenVerifEmail: "",
      isLoadingVerifEmail: false,
      errorTokenVerifEmail: null,
      validationErrors: "",
      paysshow: false,
      ville: {},
      pays_id: "",
      adresse: "",
      villespays: [],
      pays: [],
      passwordAncien: "",
      password: "",
      password_confirmation: "",
      isCreatingPassword: false,
      isCreatingPasswordVerif: false,
      isCreating: false,
      errors: [],
      has_minimum_lenth: false,
      has_number: false,
      has_lowercase: false,
      has_uppercase: false,
      has_special: false,
      valid_password: false,
      show: false,
      isCorrect: false,
      modalContacterClient: false,
      agences: {},
      paiements: {},
      client: {
        nom: "",
        paiement_id: null,
      },
      center: { lat: 35.6711663, lng: 10.1005469 },
      photo: "",
      file: null,
      showPreview: false,
      imagePreview: "",
      apiDomain: "https://etnafesapi20212018.etnafes.com",
      userSingll: [],
    };
  },
  created() {
    this.fetchPays();
    this.fetchclient(this.$store.state.user.id);
    this.fetchuserSingl(this.$store.state.user.id);

    /* this.fetchPaiements();
    this.fetchAgences(); */
  },

  methods: {
    setPlace(place) {
      this.currentPlace = place;
      this.adresse = place;
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
    //show user by id
    fetchuserSingl(id) {
      fetch(`${apiDomain}/api/user_client/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.userSingll = res.user;
        })
        .catch((err) => console.log(err));
    },

    verifEmailClient() {
      this.isLoadingVerifEmail = true;
      this.errorTokenVerifEmail = null;
      let formData = new FormData();

      if (!this.errorTokenVerifEmail) {
        const data = {
          token: this.tokenVerifEmail,
        };
        axios
          .post(`${apiDomain}/api/validate-email`, data)
          .then((response) => {
            this.fetchuserSingl(this.$store.state.user.id);
            this.$store.dispatch("updateVerifAction");
            this.$noty.success("votre code a été vérifié avec succès .");
            this.showLogin = true;
            this.isLoadingVerifEmail = false;
            if (response.data.id) {
              this.user = response.data;
            }

            if (this.type == "") {
              this.$router.push({
                name: "PaiementPack",
                params: { id: this.$route.params.id },
                query: {
                  ville_id: this.$route.query.ville_id,
                  date_deb: this.$route.query.date_deb,

                  nb_adulte: this.$route.query.nb_adulte,
                  nb_enfant: this.$route.query.nb_enfant,
                  ages: this.$route.query.ages,
                },
              });
            }

            if (this.type == "par chambre") {
              this.$router.push({
                name: "ReservationHebergement",
                params: { id: this.$route.params.id },
                query: {
                  du: this.$route.query.du,
                  au: this.$route.query.au,
                  nb_adulte: this.$route.query.nb_adulte,
                  nb_places_chambre: this.$route.query.nb_places_chambre,
                  chambre: this.$route.query.chambre,
                  chambreid: this.$route.query.chambreid,
                  arr: this.$route.query.arr,
                },
              });
            }

            if (this.type == "par personne" || this.type == "Logement entier") {
              this.$router.push({
                name: "ReservationHebergement",
                params: { id: this.$route.params.id },
                query: {
                  du: this.$route.query.du,
                  au: this.$route.query.au,
                  nb_adulte: this.$route.query.nb_adulte,
                  nb_enfant: this.$route.query.nb_enfant,
                  nb_enfant15: this.$route.query.nb_enfant15,
                  nb_enfant4: this.$route.query.nb_enfant4,

                  ages: this.$route.query.ages,
                  arr: this.$route.query.arr,
                },
              });
            }
          })
          .catch((error) => {
            this.isLoadingVerifEmail = false;

            if (error.response.status == 422) {
              this.isLoadingVerifEmail = false;
              this.errors = error.response.data.errors;
            }

            if (error.response.status == 401) {
              this.$noty.error("votre code est invalid ! .");
            }
          });
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
          `${apiDomain}/api/editPassword/${this.$store.state.user.id}?token=${this.$store.state.token}`,
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
          `${apiDomain}/api/password/${this.$store.state.user.id}`,
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

    updateClient(e) {
      this.loading_enregistrer = true;
      let formData = new FormData();
      formData.append("nom", this.client.nom);
      formData.append("prenom", this.client.prenom);
      formData.append("email", this.client.email);
      formData.append("telephone", this.client.telephone);
      formData.append("gouvernorat", this.client.gouvernorat);
      formData.append("civilité", this.client.civilité);
      formData.append("ville_id", this.client.ville_id);
      if (this.places.length == 0) {
        formData.append("adresse", this.client.adresse);
        formData.append("latitude", this.client.latitude);
        formData.append("longitude", this.client.longitude);
      } else if (this.places.length > 0) {
        formData.append("adresse", this.adresse.formatted_address);
        formData.append("latitude", this.center.lat);
        formData.append("longitude", this.center.lng);
      }

      axios
        .post(
          `${apiDomain}/api/client/update/${this.$store.state.user.id}?token=${this.$store.state.token}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )

        .then((res) => {
          if (res.status == 200) {
            this.loading_enregistrer = false;

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
          this.loading_enregistrer = false;

          this.updateIn = false;
          console.log(error.response.data);
          if (error.response.status == 422) {
            this.validationErrors = error.response.data;
          }
        });
    },

    updateImage(id, user) {
      this.loading = true;
      var formData = new FormData();
      formData.append("photo", this.photo);
      axios
        .post(
          `${apiDomain}/api/clientphoto/${this.$store.state.user.id}?token=${this.$store.state.token}`,
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

    fetchclient(id) {
      fetch(
        `${apiDomain}/api/client/${this.$store.state.user.id}?token=${this.$store.state.token}`
      )
        .then((res) => res.json())
        .then((res) => {
          this.client = res;
          this.ville = res.ville;
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
<style>
section {
  float: left;
  width: 100%;
  background: #fff; /* fallback for old browsers */
  /* padding: 30px 0; */
}

.profile-card-4 {
  font-family: "Open Sans", Arial, sans-serif;
  position: relative;
  background-color: #efefef;
  float: left;
  overflow: hidden;
  width: 100%;
  text-align: center;
  height: auto;
  border: none;
}
/*Profile Card 3*/
.profile-card-3 {
  font-family: "Open Sans", Arial, sans-serif;
  position: relative;
  float: left;
  overflow: hidden;
  width: 100%;
  text-align: center;
  height: auto;
  border: none;
}
.profile-card-3 .background-block {
  float: left;
  width: 100%;
  height: 200px;
  overflow: hidden;
}
.profile-card-3 .background-block .background {
  width: 100%;
  vertical-align: top;
  opacity: 0.9;
  -webkit-filter: blur(0.5px);
  filter: blur(0.5px);
  -webkit-transform: scale(1.8);
  transform: scale(2.8);
}
.profile-card-3 .card-content {
  width: 100%;
  padding: 15px 25px;
  color: #232323;
  float: left;
  background: #efefef;
  height: 50%;
  border-radius: 0 0 5px 5px;
  position: relative;
  z-index: 1;
}
.profile-card-3 .card-content::before {
  content: "";
  background: #efefef;
  width: 120%;
  height: 100%;
  left: 11px;
  bottom: 51px;
  position: absolute;
  z-index: -1;
  transform: rotate(-13deg);
}
.profile-card-3 .profile {
  /* foremation css */
  width: 100px;
  height: 100px;

  object-fit: cover;
  /* FIN FORMATION CSS */
  border-radius: 50%;
  position: absolute;
  bottom: 50%;
  left: 50%;

  max-width: 100px;
  opacity: 1;
  box-shadow: 3px 3px 20px rgba(0, 0, 0, 0.5);
  border: 2px solid rgba(255, 255, 255, 1);
  -webkit-transform: translate(-50%, 0%);
  transform: translate(-50%, 0%);
  z-index: 9;
}
.profile-card-3 h2 {
  margin: 0 0 5px;
  font-weight: 600;
  font-size: 25px;
}
.profile-card-3 h2 small {
  display: block;
  font-size: 15px;
  margin-top: 10px;
}
.profile-card-3 i {
  display: inline-block;
  font-size: 16px;
  color: #232323;
  text-align: center;
  border: 1px solid #232323;
  width: 30px;
  height: 30px;
  line-height: 30px;
  border-radius: 50%;
  margin: 0 5px;
}
.profile-card-3 .icon-block {
  float: left;
  width: 100%;
  margin-top: 15px;
}
.profile-card-3 .icon-block a {
  text-decoration: none;
}
.profile-card-3 i:hover {
  background-color: #232323;
  color: #fff;
  text-decoration: none;
}
</style>
