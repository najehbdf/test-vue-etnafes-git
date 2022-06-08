<template>
  <div>
    <TopNavbarHome />

    <div v-if="login == true">
      <b-modal id="modal-login" v-model="login" title="Login">
        <div>
          <form
            accept-charset="UTF-8"
            role="form"
            @submit.prevent="performLogin"
          >
            <fieldset>
              <div class="form-group">
                <input
                  aria-label="email"
                  class="form-control personalise"
                  placeholder="E-mail"
                  name="email"
                  type="email"
                  v-model="email"
                  required
                />
              </div>
              <div class="form-group">
                <input
                  aria-label="password"
                  v-model="password"
                  class="form-control personalise"
                  placeholder="Mot de passe"
                  name="password"
                  type="password"
                  required
                />
              </div>
              <div style="color: red; padding-bottom: 5px" v-if="error">
                {{ error }}
              </div>

              <input
                aria-label="login"
                class="btn btn-lg btn-success btn-block"
                type="submit"
                value="Login"
              />
            </fieldset>
          </form>
        </div>
      </b-modal>
    </div>
    <div v-if="entercode == true">
      <b-modal
        id="modal-confirmernum"
        title="Confirmez votre numéro"
        v-model="entercode"
      >
        <p>Saisissez le code que nous venons d'envoyer</p>

        <input
          aria-label="code"
          type="number"
          placeholder="0000"
          v-on:change="onChange"
          v-on:complete="onComplete"
          v-model="client.code"
        />

        <button
          class="btn btn-success"
          v-b-modal.modal-login
          @click.prevent="validateCode"
          fill
          style="margin-left: 10px"
        >
          Envoyer
        </button>
        <br />

        <div class="alert alert-danger" role="alert" v-if="errorToken != null">
          {{ errorToken }}
        </div>
      </b-modal>
    </div>

    <div v-if="valide_email == true">
      <b-modal
        id="modal-validerEmail"
        title="Confirmez votre adresse email"
        v-model="valide_email"
      >
        <p>Saisissez le code que nous venons d'envoyer</p>
        <div class="form-group">
          <input
            aria-label="verif"
            type="text"
            class="form-control personalise"
            placeholder="Entrer votre code ..."
            v-model="tokenVerifEmail"
          />
        </div>
        <span
          class="list-group-item list-group-item-danger"
          v-if="errors.token"
          >{{ errors.token[0] }}</span
        >
        <div class="row">
          <div class="col-md-12">
            <button
              v-b-modal.modal-login
              style="margin-left: 10px"
              class="btn btn-outline-success mt-3"
              @click.prevent="verifEmailClient"
              fill
            >
              {{
                isLoadingVerifEmail
                  ? "Vérification En cours..."
                  : "Vérification"
              }}
            </button>
          </div>
        </div>
      </b-modal>
    </div>
    <b-modal
      id="modal-inscription-paiement-ligne"
      title="Voyageur"
      class="modal-dialog modal-sm"
      v-if="showinscri"
    >
      <b-tabs content-class="mt-3">
        <b-tab title="Inscription" active v-if="!loggedIn">
          <ValidationObserver>
            <form class="mb-3">
              <div class="row">
                <div class="col-md-6">
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
                        v-bind:key="'pays' + pays.id"
                        v-bind:value="pays.id"
                      >
                        {{ pays.nom_fr_fr }}
                      </option>
                    </select>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group">
                    <label>Ville *</label>
                    <select
                      class="form-control"
                      id="SelectRegion"
                      required
                      v-model="client.ville_id"
                    >
                      <option value disabled selected>
                        choisissez votre destination
                      </option>
                      <option
                        v-for="ville in villespays"
                        v-bind:key="'ville' + ville.id"
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
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <ValidationProvider
                    name="nom"
                    rules="required|alpha"
                    v-slot="{ errors }"
                  >
                    <div class="form-group">
                      <input
                        aria-label="nom"
                        type="text"
                        class="form-control personalise"
                        v-model="client.nom"
                        placeholder="Nom de famille"
                      />
                      <span class="message">{{ errors[0] }}</span>

                      <p v-if="validationErrors.nom">
                        <span class="alert-link"
                          >* {{ validationErrors.nom[0] }}</span
                        >
                      </p>
                    </div>
                  </ValidationProvider>
                </div>

                <div class="col-md-6">
                  <ValidationProvider
                    name="prenom"
                    rules="required|alpha"
                    v-slot="{ errors }"
                  >
                    <div class="form-group">
                      <input
                        aria-label="prenom"
                        type="text"
                        class="form-control personalise"
                        v-model="client.prenom"
                        placeholder="Prénom"
                      />
                      <span class="message">{{ errors[0] }}</span>
                      <p v-if="validationErrors.prenom">
                        <span class="alert-link"
                          >*{{ validationErrors.prenom[0] }}</span
                        >
                      </p>
                    </div>
                  </ValidationProvider>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <ValidationProvider
                    name="telephone"
                    rules="required|numeric"
                    v-slot="{ errors }"
                  >
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control personalise"
                        v-model="client.telephone"
                        placeholder="Numéro de téléphone"
                      />
                      <span class="message">{{ errors[0] }}</span>

                      <p
                        v-if="validationErrors.telephone"
                        style="padding-bottom: 5px; color: red"
                      >
                        <span class="alert-link"
                          >**{{ validationErrors.telephone[0] }}</span
                        >
                      </p>
                    </div>
                  </ValidationProvider>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <ValidationProvider
                    name="email"
                    rules="required|email"
                    v-slot="{ errors }"
                  >
                    <div class="form-group">
                      <!-- <label>Email</label> -->
                      <input
                        aria-label="email"
                        type="email"
                        class="form-control personalise"
                        v-model="client.email"
                        placeholder="E-mail"
                      />
                      <span class="message">{{ errors[0] }}</span>

                      <p v-if="validationErrors.email">
                        <span class="alert-link"
                          >*{{ validationErrors.email[0] }}</span
                        >
                      </p>
                    </div>
                  </ValidationProvider>
                </div>
              </div>

              <div class="form-group">
                <b-tooltip target="tooltip-target-1" triggers="hover">
                  <ul>
                    <li v-bind:class="{ is_valid: contains_eight_characters }">
                      8 Caractéres
                    </li>
                    <li v-bind:class="{ is_valid: contains_number }">
                      Chiffre
                    </li>
                    <li v-bind:class="{ is_valid: contains_uppercase }">
                      Lettre majuscule
                    </li>
                    <li v-bind:class="{ is_valid: contains_special_character }">
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
                <div id="tooltip-target-1">
                  <VuePassword
                    @input="checkPassword"
                    v-model="password"
                    id="password1"
                    type="text"
                    placeholder="Mot de passe"
                  />
                </div>
                <p v-if="validationErrors.password">
                  <span class="alert-link"
                    >*{{ validationErrors.password[0] }}</span
                  >
                </p>
              </div>

              <div class="row">
                <button
                  v-if="
                    client.nom != null &&
                    client.prenom != null &&
                    client.email != null &&
                    password != null &&
                    client.telephone != null
                  "
                  v-b-modal.modal-validerEmail
                  style="margin-left: 10px"
                  class="btn btn-outline-success mt-3"
                  @click.prevent="addClient"
                  fill
                >
                  {{ loadingInscription ? "En cours..." : "Sinscrire" }}
                </button>
              </div>
            </form>
          </ValidationObserver>
        </b-tab>
        <b-tab title="Login" v-if="!loggedIn">
          <form
            accept-charset="UTF-8"
            role="form"
            @submit.prevent="performLoginEnLigne"
          >
            <fieldset>
              <div class="form-group">
                <input
                  aria-label="email"
                  class="form-control personalise"
                  placeholder="E-mail"
                  name="email"
                  type="email"
                  v-model="email"
                  required
                />
              </div>
              <div class="form-group">
                <input
                  aria-label="password"
                  v-model="password"
                  class="form-control personalise"
                  placeholder="Mot de passe"
                  name="password"
                  type="password"
                  required
                />
              </div>
              <div style="color: red" v-if="error">{{ error }}</div>

              <input
                aria-label="login"
                class="btn btn-lg btn-success btn-block"
                type="submit"
                value="Login"
              />
            </fieldset>
          </form>
        </b-tab>
      </b-tabs>
    </b-modal>
    <!-- modal-inscription-via-agence -->
    <b-modal
      id="modal-inscription"
      title="Voyageur"
      class="modal-dialog modal-sm"
      v-if="showinscri"
    >
      <b-tabs content-class="mt-3">
        <b-tab title="Inscription" active v-if="!loggedIn">
          <ValidationObserver>
            <form class="mb-3">
              <div class="row">
                <div class="col-md-6">
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
                        v-bind:key="'pays' + pays.id"
                        v-bind:value="pays.id"
                      >
                        {{ pays.nom_fr_fr }}
                      </option>
                    </select>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group">
                    <label>Ville *</label>
                    <select
                      class="form-control"
                      id="SelectRegion"
                      required
                      v-model="client.ville_id"
                    >
                      <option value disabled selected>
                        choisissez votre destination
                      </option>
                      <option
                        v-for="ville in villespays"
                        v-bind:key="'ville' + ville.id"
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
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <ValidationProvider
                    name="nom"
                    rules="required|alpha"
                    v-slot="{ errors }"
                  >
                    <div class="form-group">
                      <input
                        aria-label="nom"
                        type="text"
                        class="form-control personalise"
                        v-model="client.nom"
                        placeholder="Nom de famille"
                      />
                      <span class="message">{{ errors[0] }}</span>

                      <p v-if="validationErrors.nom">
                        <span class="alert-link"
                          >* {{ validationErrors.nom[0] }}</span
                        >
                      </p>
                    </div>
                  </ValidationProvider>
                </div>

                <div class="col-md-6">
                  <ValidationProvider
                    name="prenom"
                    rules="required|alpha"
                    v-slot="{ errors }"
                  >
                    <div class="form-group">
                      <input
                        aria-label="prenom"
                        type="text"
                        class="form-control personalise"
                        v-model="client.prenom"
                        placeholder="Prénom"
                      />
                      <span class="message">{{ errors[0] }}</span>
                      <p v-if="validationErrors.prenom">
                        <span class="alert-link"
                          >*{{ validationErrors.prenom[0] }}</span
                        >
                      </p>
                    </div>
                  </ValidationProvider>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <ValidationProvider
                    name="email"
                    rules="required|email"
                    v-slot="{ errors }"
                  >
                    <div class="form-group">
                      <!-- <label>Email</label> -->
                      <input
                        aria-label="email"
                        type="email"
                        class="form-control personalise"
                        v-model="client.email"
                        placeholder="E-mail"
                      />
                      <span class="message">{{ errors[0] }}</span>

                      <p v-if="validationErrors.email">
                        <span class="alert-link"
                          >*{{ validationErrors.email[0] }}</span
                        >
                      </p>
                    </div>
                  </ValidationProvider>
                </div>
              </div>

              <div class="form-group">
                <input
                  aria-label="login"
                  class="form-control"
                  placeholder="Login *"
                  name="login"
                  type="text"
                  v-model="client.login"
                />
                <p
                  v-if="validationErrors.login"
                  style="padding-bottom: 5px; color: red"
                >
                  <span class="alert-link"
                    >** {{ validationErrors.login[0] }}</span
                  >
                </p>
              </div>

              <div class="form-group">
                <b-tooltip target="tooltip-target-1" triggers="hover">
                  <ul>
                    <li v-bind:class="{ is_valid: contains_eight_characters }">
                      8 Caractéres
                    </li>
                    <li v-bind:class="{ is_valid: contains_number }">
                      Chiffre
                    </li>
                    <li v-bind:class="{ is_valid: contains_uppercase }">
                      Lettre majuscule
                    </li>
                    <li v-bind:class="{ is_valid: contains_special_character }">
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
                <div id="tooltip-target-1">
                  <VuePassword
                    @input="checkPassword"
                    v-model="password"
                    id="password1"
                    type="text"
                    placeholder="Mot de passe"
                  />
                </div>
                <p v-if="validationErrors.password">
                  <span class="alert-link"
                    >*{{ validationErrors.password[0] }}</span
                  >
                </p>
              </div>

              <div class="row">
                <button
                  v-if="
                    client.nom != null &&
                    client.prenom != null &&
                    client.email != null &&
                    password != null &&
                    client.login != null
                  "
                  v-b-modal.modal-validerEmail
                  style="margin-left: 10px"
                  class="btn btn-outline-success mt-3"
                  @click.prevent="addClient"
                  fill
                >
                  {{ loadingInscription ? "En cours..." : "Sinscrire" }}
                </button>
              </div>
            </form>
          </ValidationObserver>
        </b-tab>
        <b-tab title="Login" v-if="!loggedIn">
          <form
            accept-charset="UTF-8"
            role="form"
            @submit.prevent="performLogin"
          >
            <fieldset>
              <div class="form-group">
                <input
                  aria-label="email"
                  class="form-control personalise"
                  placeholder="E-mail"
                  name="email"
                  type="email"
                  v-model="email"
                  required
                />
              </div>
              <div class="form-group">
                <input
                  aria-label="password"
                  v-model="password"
                  class="form-control personalise"
                  placeholder="Mot de passe"
                  name="password"
                  type="password"
                  required
                />
              </div>
              <div style="color: red" v-if="error">{{ error }}</div>

              <input
                aria-label="login"
                class="btn btn-lg btn-success btn-block"
                type="submit"
                value="Login"
              />
            </fieldset>
          </form>
        </b-tab>
      </b-tabs>
    </b-modal>

    <b-modal
      id="modal-hebergement"
      :title="hebergement.nom"
      :hebergement="hebergement"
      style="transform: translate(0, 1%)"
    >
      <hr />

      <p style="margin-left: 20px">
        {{ hebergement.nbr_voyageurs }} voyageurs --
        {{ hebergement.nbr_place_dispo }} places disponibles --
        <span v-if="hebergement.chambre_individuel > 0"
          >{{ hebergement.chambre_individuel }} Chambre individuel--</span
        >
        <span v-if="hebergement.chambre_a_deux > 0"
          >{{ hebergement.chambre_a_deux }} Chambre à deux--</span
        >
        <span v-if="hebergement.chambre_a_trois > 0"
          >{{ hebergement.chambre_a_trois }} Chambre à trois</span
        >
      </p>
      <div class="col-md-8 offset-md-2">
        <b-carousel
          id="carousel-1"
          v-model="slide"
          :interval="4000"
          controls
          indicators
          background="#ababab"
          img-width="1024"
          img-height="380"
          style="text-shadow: 1px 1px 2px #333; margin-top: 10px"
          @sliding-start="onSlideStart"
          @sliding-end="onSlideEnd"
        >
          <b-carousel-slide
            v-for="(image, k) in hebergement.images_hebergement"
            v-bind:key="'image' + k"
            :img-src="`${apiDomain}/myapp/public/uploads/files_hebergement/${image.url_image}`"
          ></b-carousel-slide>
        </b-carousel>
      </div>

      <div class="col-md-12">
        <div class="row">
          <div class="col-md-6">
            <br />
            <h3 style="margin-top: 5px; color: #000; margin-bottom: 10px">
              Equipements
            </h3>
            <div v-if="hebergement.wifi == 1">
              <img loading="lazy" src="/wifi-etnafes.png" /> Wi-Fi
              <br />
            </div>
            <div v-else>
              <img loading="lazy" src="/wifi-etnafes.png" />
              <del>Wi-Fi</del>
              <br />
            </div>
            <div v-if="hebergement.television == 1">
              <img loading="lazy" src="/tv-etnafes.png" /> Télévision
              <br />
            </div>
            <div v-else>
              <img loading="lazy" src="/tv-etnafes.png" />
              <del>&nbsp;Télévision</del>
              <br />
            </div>

            <div v-if="hebergement.chauffage == 1">
              <img loading="lazy" src="/heating-etnafes.png" /> Chauffage
              <br />
            </div>

            <div v-else>
              <img loading="lazy" src="/heating-etnafes.png" />
              <del>&nbsp;Chauffage</del>
              <br />
            </div>
            <div v-if="hebergement.cuisine == 1">
              <img loading="lazy" src="/kitchen-etnafes.png" /> Cuisine
              <br />
            </div>

            <div v-else>
              <img loading="lazy" src="/kitchen-etnafes.png" />
              <del>&nbsp;Cuisine</del>
              <br />
            </div>

            <div v-if="hebergement.lave_linge == 1">
              <img loading="lazy" src="/tumble-dry-etnafes.png" />
              Lave-linge
            </div>

            <div v-else>
              <img loading="lazy" src="/tumble-dry-etnafes.png" />
              <del>&nbsp;Lave-linge</del>
            </div>
          </div>
          <div class="col-md-6">
            <h2 style="margin-top: 30px">&nbsp;</h2>
            <div v-if="hebergement.climatisation == 1">
              <img loading="lazy" src="/air-conditioner-etnafes.png" /> Climatisation
              <br />
            </div>

            <div v-else>
              <img loading="lazy" src="/air-conditioner-etnafes.png" />
              <del>&nbsp;Climatisation</del>
              <br />
            </div>

            <div v-if="hebergement.eau_chaude == 1">
              <img loading="lazy" src="/water-heater-etnafes.png" /> Eau Chaude
              <br />
            </div>

            <div v-else>
              <img loading="lazy" src="/water-heater-etnafes.png" />
              <del>Eau Chaude</del>
              <br />
            </div>

            <div v-if="hebergement.salle_de_bain == 1">
              <img loading="lazy" src="/bath-etnafes.png" /> Salle de bain
              <br />
            </div>

            <div v-else>
              <img loading="lazy" src="/bath-etnafes.png" />
              <del>&nbsp;Salle de bain</del>
              <br />
            </div>

            <div v-if="hebergement.espace_travail_ordinateur == 1">
              <img loading="lazy" src="/computer-etnafes.png" />
              &nbsp;Espace de travail pour ordinateur
              <br />
            </div>

            <div v-else>
              <img loading="lazy" src="/computer-etnafes.png" />
              <del>&nbsp;Espace de travail pour ordinateur</del>
              <br />
            </div>

            <div v-if="hebergement.espace_enfant == 1">
              <img loading="lazy" src="/espace-enfant-etnafes.png" />
              &nbsp;Espace pour enfant
              <br />
            </div>

            <div v-else>
              <img loading="lazy" src="/espace-enfant-etnafes.png" />
              <del>&nbsp;Espace pour enfant</del>
              <br />
            </div>
          </div>
        </div>
      </div>

      <div class="container" v-if="loggedIn && user.role == 2">
        <h4 style="margin-top: 12px; color: #000">Donnez votre Avis</h4>
        <ValidationObserver>
          <form v-on:submit.prevent="addAvisHebergement()" class="mb-3">
            <!-- :showcount="true" -->
            <rate :length="5" v-model="avisheb.nbr_etoile"></rate>
            <br />
            <ValidationProvider
              name="commentaire"
              rules="required"
              v-slot="{ errors }"
            >
              <div class="form-group">
                <textarea
                  rows="4"
                  class="form-control personalise"
                  v-model="avisheb.commentaire"
                  placeholder="Ecrivez un commentaire"
                />
                <span class="message">{{ errors[0] }}</span>

                <p v-if="validationErrors.commentaire">
                  <span class="alert-link"
                    >* {{ validationErrors.commentaire[0] }}</span
                  >
                </p>
              </div>
            </ValidationProvider>

            <div class="row">
              <div class="col-md-3">
                <button
                  class="btn btn-outline-success mt-3"
                  style="border-radius: 18px 0px 18px 0px"
                  type="submit"
                  fill
                >
                  Envoyer
                </button>
              </div>
            </div>
          </form>
        </ValidationObserver>
      </div>

      <div class="container" v-if="nbcomheb > 0">
        <h5 style="color: blue" class="d-none d-lg-block">
          {{ nbcomheb }} commentaires
        </h5>

        <br />

        <div class="row">
          <div
            class="col-md-12 d-none d-lg-block"
            v-for="avisheb in avishebergement"
            :key="'avisheb' + avisheb.id"
          >
            <div class="row">
              <div class="col-md-4">
                <img loading="lazy"
                  :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_guide/1602251763-11598521261.png`"
                  alt="Profile Photo"
                  width="60%"
                />
              </div>

              <div class="col-md-8">
                {{ avisheb.client.nom }} {{ avisheb.client.prenom }}
                <rate :length="5" v-model="avisheb.nbr_etoile"></rate>
                {{ avisheb.created_at }}
                <div class="row">
                  <p
                    style="
                      color: #333;
                      padding: 20px;
                      text-align: justify;
                      text-justify: inter-word;
                    "
                  >
                    {{ avisheb.commentaire }}
                  </p>
                </div>
              </div>
            </div>
            <hr />
          </div>

          <div
            class="col d-lg-none"
            v-for="avisheb in avishebergement"
            :key="'avisheb' + avisheb.id"
          >
            <div class="row">
              <div class="col-mx-4">
                <img loading="lazy"
                  :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_guide/1602251763-11598521261.png`"
                  alt="Profile Photo"
                  width="40%"
                />
              </div>

              <div class="col-mx-4">
                {{ avisheb.client.nom }} {{ avisheb.client.prenom }}
                <rate :length="5" v-model="avisheb.nbr_etoile"></rate>
                {{ avisheb.created_at }}
                <div class="row">
                  <p
                    style="
                      color: #333;
                      padding: 20px;
                      text-align: justify;
                      text-justify: inter-word;
                    "
                  >
                    {{ avisheb.commentaire }}
                  </p>
                </div>
              </div>
            </div>
            <hr />
          </div>
          <br />
        </div>
        <br />

        <br />

        <button
          v-if="nbcomheb > 3"
          @click="fetchAllAvisHebergement(hebergement.id)"
          class="btn btn-outline-success mt-3 btnout"
          fill
        >
          Afficher tous les {{ nbcomheb }} commentaires >>
          <pulse-loader
            v-if="loadheb == true"
            :loading="loading"
            :color="color"
            :size="size"
          ></pulse-loader>
        </button>
      </div>
    </b-modal>

    <b-modal
      id="modal-restaurant"
      :title="restaurant.nom"
      :restaurant="restaurant"
    >
      <hr />

      <div class="col-md-8 offset-md-2">
        <b-carousel
          id="carousel-1"
          v-model="slide"
          :interval="15000"
          controls
          indicators
          background="#ababab"
          img-width="1024"
          img-height="480"
          style="text-shadow: 1px 1px 2px #333; margin-top: 30px"
          @sliding-start="onSlideStart"
          @sliding-end="onSlideEnd"
        >
          <b-carousel-slide
            v-for="(image, k) in restaurant.images_restaurant"
            v-bind:key="'image' + k"
            :img-src="`${apiDomain}/myapp/public/uploads/files_restaurant/${image.url_image}`"
          ></b-carousel-slide>
        </b-carousel>
      </div>
    </b-modal>

    <div class="container" style="margin-top: 20px">
      <div class="row">
        <div class="col-md-8">
          <b-card no-body>
            <div class="row">
              <div class="col-md-8">
                <h2
                  class="d-none d-lg-block"
                  style="margin-left: 20px; margin-top: 7px; color: #000"
                >
                  {{ pack.titre }}
                </h2>

                <h2
                  class="d-lg-none"
                  style="
                    font-size: 19px;
                    margin-left: 20px;
                    margin-top: 7px;
                    color: #000;
                  "
                >
                  {{ pack.titre }}
                </h2>
              </div>

              <div class="col-md-4">
                <div class="d-none d-lg-block">
                  <h4
                    class="card-title"
                    style="color: #c37600"
                    v-if="
                      pack.date_deb < new Date().toISOString().split('T')[0]
                    "
                  >
                    <span
                      class="badge badge-warning"
                      style="background-color: #ff4012"
                      >Pack expiré</span
                    >
                  </h4>

                  <h4
                    class="card-title"
                    style="color: #c37600"
                    v-if="
                      pack.date_deb > new Date().toISOString().split('T')[0]
                    "
                  >
                    <span
                      class="badge badge-success"
                      style="background-color: #28b351"
                      >Nouveau pack</span
                    >
                  </h4>
                </div>

                <!-- mobile -->

                <div style="margin-top: -35px" class="d-lg-none">
                  <h4
                    class="card-title"
                    style="color: #c37600"
                    v-if="
                      pack.date_deb < new Date().toISOString().split('T')[0]
                    "
                  >
                    <span
                      class="badge badge-warning"
                      style="background-color: #ff4012"
                      >Pack expiré</span
                    >
                  </h4>

                  <h4
                    class="card-title"
                    style="color: #c37600"
                    v-if="
                      pack.date_deb > new Date().toISOString().split('T')[0]
                    "
                  >
                    <span
                      class="badge badge-success"
                      style="background-color: #28b351"
                      >Nouveau pack</span
                    >
                  </h4>
                </div>
              </div>
            </div>

            <b-tabs content-class="mt-3" justified class="d-none d-lg-block">
              <b-tab no-body title="Photos">
                <div
                  v-for="(zone, k) in pack.zone_pack"
                  v-bind:key="'zone' + k"
                >
                  <b-card-footer
                    v-if="!isHidden22 && k == index"
                    class="footer-slider"
                  >
                    <b-carousel
                      id="carousel-1"
                      v-model="slide"
                      :interval="4000"
                      controls
                      indicators
                      style="text-shadow: 1px 1px 2px #333"
                      @sliding-start="onSlideStart"
                      @sliding-end="onSlideEnd"
                    >
                      <div>
                        <b-carousel-slide
                          id="carousel22"
                          v-for="(image, k) in zone.zone_touristique.image"
                          v-bind:key="'im' + k"
                          :text="zone.nom"
                          :img-src="`${apiDomain}/myapp/public/uploads/files_zones/${image.url_image}`"
                        >
                          <h1
                            style="
                              background-color: rgba(0, 0, 0, 0.3);
                              padding: 10px;
                            "
                          >
                            {{ zone.zone_touristique.nom }}
                          </h1>
                        </b-carousel-slide>
                      </div>
                    </b-carousel>
                  </b-card-footer>
                </div>
                <div
                  class="row"
                  v-if="isHidden22"
                  style="padding: 0px 13px 13px 13px"
                >
                  <div class="col-md-12">
                    <img loading="lazy"
                      alt="pack"
                      id="carousel22"
                      :src="`${apiDomain}/myapp/public/uploads/files_packs/${pack.image_couverture}`"
                    />
                  </div>
                </div>
                <div class="row" style="margin-top: 5px">
                  <div
                    class="col-md-4"
                    v-for="(zone, k) in pack.zone_pack"
                    v-bind:key="'z' + zone.zone_touristique_id"
                    @click="(index = k), (isHidden22 = false)"
                  >
                    <b-card-footer
                      class="footer-slider"
                      style="padding: 1px 15px 1px 15px"
                    >
                      <!-- <b-carousel
                        v-model="slide"
                        :interval="4000"
                        controls
                        indicators
                        style="text-shadow: 1px 1px 2px #333;margin-top:30px"
                        @sliding-start="onSlideStart"
                        @sliding-end="onSlideEnd"
                      >
                        <b-carousel-slide
                          id="carousel11"
                          v-for="(image,k) in zone.zone_touristique.image"
                          v-bind:key="'imm'+k"
                          :text="zone.nom"
                          :img-src="`${apiDomain}/myapp/public/uploads/files_zones/${image.url_image}`"
                        >
                          <h4 style="color:#fff">{{zone.zone_touristique.nom}}</h4>
                        </b-carousel-slide>
                      </b-carousel>-->
                      <carousel
                        :per-page="1"
                        :mouse-drag="false"
                        navigationPrevLabel
                        navigationNextLabel
                      >
                        <slide
                          style="margin-top: 20px"
                          v-for="(image, k) in zone.zone_touristique.image"
                          v-bind:key="'imm' + k"
                          :text="zone.nom"
                          class="MyCustomClassDetail"
                          v-b-modal.modal-zone
                          link="#"
                        >
                          <img loading="lazy"
                            width="100%"
                            :src="`${apiDomain}/myapp/public/uploads/files_zones/${image.url_image}`"
                          />
                        </slide>
                      </carousel>

                      <center>
                        <span style="margin-top: 20px">{{
                          zone.zone_touristique.nom
                        }}</span>
                      </center>
                    </b-card-footer>
                  </div>
                </div>
              </b-tab>

              <b-tab
                no-body
                title="Vidéos"
                style="padding: 15px"
                v-if="pack.url_video != null"
              >
                <div
                  v-for="(zone, j) in pack.zone_pack"
                  v-bind:key="'zzz' + zone.zone_touristique_id"
                >
                  <!-- <b-card-footer> -->
                  <b-embed
                    v-if="!isHidden5 && j == index1"
                    type="iframe"
                    aspect="16by9"
                    :src="zone.zone_touristique.url_video"
                    allowfullscreen
                  ></b-embed>
                </div>

                <b-embed
                  v-if="isHidden5 && pack.url_video"
                  type="iframe"
                  aspect="16by9"
                  :src="pack.url_video"
                  allowfullscreen
                ></b-embed>
                <div class="row">
                  <div
                    class="col-md-4"
                    v-for="(zone, j) in pack.zone_pack"
                    v-bind:key="'zz1' + zone.zone_touristique_id"
                  >
                    <span
                      onmouseover="this.style.cursor='pointer'"
                      style="color: #333; margin-top: 10px"
                      @click="(index1 = j), (isHidden5 = false)"
                      >{{ zone.zone_touristique.nom }}</span
                    >
                    <!-- <b-card-footer> -->
                    <b-embed
                      style="margin-top: 10px"
                      type="iframe"
                      aspect="16by9"
                      :src="zone.zone_touristique.url_video"
                      allowfullscreen
                    ></b-embed>
                    <!-- </b-card-footer> -->
                  </div>
                </div>
              </b-tab>

              <b-tab title="Description" style="padding: 15px">
                <b-card-text>{{ pack.description }}</b-card-text>
                <br />

                <div v-for="(zone, i) in pack.zone_pack" v-bind:key="'zz2' + i">
                  <h4 style="color: #333">
                    <img loading="lazy"
                      style="max-width: 2.5%"
                      draggable="false"
                      role="img"
                      class="emoji"
                      alt="👣"
                      src="https://s.w.org/images/core/emoji/13.0.1/svg/1f463.svg"
                    />
                    &nbsp;{{ zone.zone_touristique.nom }} :
                  </h4>
                  <b-card-text>{{
                    zone.zone_touristique.description
                  }}</b-card-text>
                  <br />
                </div>
              </b-tab>

              <b-tab
                title="Programme"
                style="padding: 15px"
                v-if="pack.programmes.length > 0"
              >
                <div
                  v-for="(programme, i) in pack.programmes"
                  v-bind:key="'programme' + i"
                >
                  <div class="jour">
                    <div class="jour-number">{{ i + 1 }}</div>
                    <span class="qodef-line-between-icons">
                      <span class="qodef-line-between-icons-inner"></span>
                    </span>
                    <h4
                      class="jour-nom"
                      style="color: #333; margin-bottom: 0px"
                    >
                      Jour {{ i + 1 }}: &nbsp;{{ programme.titre }}
                    </h4>
                    <h4 class="content-jour">
                      {{ programme.description }}
                      <br />
                      <br />
                    </h4>
                  </div>
                </div>
              </b-tab>

              <b-tab
                title="Logements"
                id="test"
                style="padding: 15px"
                v-if="pack.activite_id_principal != 3"
              >
                <div class="row" v-if="hebergementpack.length > 0">
                  <div
                    class="col-lg-4"
                    v-for="heb in hebergementpack"
                    v-bind:key="'heb' + heb.id"
                  >
                    <div class="card card1">
                      <div>
                        <b-carousel
                          id="carousel-1"
                          v-model="slide"
                          :interval="4000"
                          controls
                          indicators
                          background="#ababab"
                          img-width="200"
                          img-height="200"
                          style="text-shadow: 1px 1px 2px #333"
                          @sliding-start="onSlideStart"
                          @sliding-end="onSlideEnd"
                        >
                          <div @click="fetchHebergement(heb.hebergement.id)">
                            <b-carousel-slide
                              id="carousellog"
                              v-b-modal.modal-hebergement
                              v-for="(imageheb, k) in heb.hebergement
                                .images_hebergement"
                              v-bind:key="'imheb' + k"
                              :img-src="`${apiDomain}/myapp/public/uploads/files_hebergement/${imageheb.url_image}`"
                            ></b-carousel-slide>
                          </div>
                        </b-carousel>
                      </div>
                      <div class="card-block">
                        <div style="padding-top: 10px">
                          <b>&nbsp;&nbsp;{{ heb.hebergement.nom }}</b>
                          <br />
                          <small
                            class="text-muted"
                            style="
                              color: #717171;
                              font-size: 13px;
                              font-weight: 400;
                            "
                          >
                            &nbsp;&nbsp;
                            {{ heb.hebergement.nbr_voyageurs }} voyageurs
                            <span>.</span>
                            {{ heb.hebergement.nbr_chambre_dispo }} chambre(s)
                          </small>
                          <hr style="margin-bottom: 0rem; margin-top: 0.5rem" />
                          <p class="card-text">
                            <small>
                              <span v-if="heb.hebergement.salle_de_bain == 1">
                                &nbsp;
                                <img loading="lazy"
                                  v-b-tooltip.hover
                                  title="Salle de bain"
                                  src="/bath-etnafes-21.png"
                                />
                                &nbsp;
                              </span>

                              <span v-if="heb.hebergement.lave_linge == 1">
                                &nbsp;
                                <img loading="lazy"
                                  v-b-tooltip.hover
                                  title="Lave linge"
                                  src="/tumble-dry-etnafes-21.png"
                                />&nbsp;
                              </span>

                              <span v-if="heb.hebergement.chauffage == 1">
                                &nbsp;
                                <img loading="lazy"
                                  v-b-tooltip.hover
                                  title="Chauffage"
                                  src="/heating-etnafes-21.png"
                                />&nbsp;
                              </span>
                              <span v-if="heb.hebergement.television == 1">
                                &nbsp;
                                <img loading="lazy"
                                  v-b-tooltip.hover
                                  title="Television"
                                  src="/tv-etnafes-21.png"
                                />&nbsp;
                              </span>

                              <span v-if="heb.hebergement.climatisation == 1">
                                &nbsp;
                                <img loading="lazy"
                                  v-b-tooltip.hover
                                  title="Climatisation"
                                  src="/air-conditioner-etnafes-21.png"
                                />&nbsp;
                              </span>

                              <span v-if="heb.hebergement.eau_chaude == 1">
                                &nbsp;
                                <img loading="lazy"
                                  v-b-tooltip.hover
                                  title="Eau chaude"
                                  src="/water-heater-etnafes-21.png"
                                />&nbsp;
                              </span>

                              <span
                                v-if="
                                  heb.hebergement.espace_travail_ordinateur == 1
                                "
                              >
                                &nbsp;
                                <img loading="lazy"
                                  v-b-tooltip.hover
                                  title="Espace de travail"
                                  src="/computer-etnafes-21.png"
                                />&nbsp;
                              </span>

                              <span v-if="heb.hebergement.espace_enfant == 1">
                                &nbsp;
                                <img loading="lazy"
                                  v-b-tooltip.hover
                                  title="Espace enfant"
                                  src="/espace-enfant-etnafes-21.png"
                                />&nbsp;
                              </span>

                              <span v-if="heb.hebergement.wifi == 1">
                                &nbsp;
                                <img loading="lazy"
                                  v-b-tooltip.hover
                                  title="WiFi"
                                  src="/wifi-etnafes-21.png"
                                />&nbsp;
                              </span>

                              <span v-if="heb.hebergement.cuisine == 1">
                                &nbsp;
                                <img loading="lazy"
                                  v-b-tooltip.hover
                                  title="Cuisine"
                                  src="/kitchen-etnafes-21.png"
                                />&nbsp;
                              </span>
                            </small>
                          </p>
                        </div>
                      </div>
                      <hr style="margin-bottom: 0rem; margin-top: 0.5rem" />

                      <div class="card-block" style="padding: 10px">
                        <i class="tim-icons icon-square-pin"></i>
                        <span style="font-size: 13px"
                          >&nbsp;{{ heb.hebergement.adresse }}.</span
                        >
                      </div>

                      <router-link
                        :to="`/detailshebergement/${heb.hebergement.id}`"
                      >
                        <b-button
                          style="
                            margin: 0px 0px;
                            border-radius: 0px 0px 24px 0px;
                            width: 100%;
                          "
                          variant="info"
                          >Voir Plus</b-button
                        >
                      </router-link>
                    </div>
                  </div>
                </div>

                <div class="row" v-if="hebergementpack.length == 0">
                  <div class="col-md-12">
                    <p>Ce pack est sans logement.</p>
                  </div>
                </div>
              </b-tab>

              <b-tab
                title="Restaurants"
                style="padding: 15px"
                v-if="pack.activite_id_principal != 3"
              >
                <div
                  style="margin-bottom: 25px"
                  class="row"
                  v-for="v in ville_pack"
                  v-bind:key="'v' + v.id"
                  v-show="v.ville.restaurant.length != 0"
                >
                  <div class="col-md-12">
                    <h4>{{ v.ville.nom }}</h4>
                  </div>
                  <br />
                  <div
                    class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12"
                    v-for="restaurant in v.ville.restaurant"
                    v-show="v.ville.restaurant.length != 0"
                    v-bind:key="'res' + restaurant.id"
                  >
                    <div
                      class="card card1"
                      v-show="v.ville.restaurant.length != 0"
                    >
                      <div>
                        <b-carousel
                          id="carousel-1"
                          v-model="slide"
                          :interval="4000"
                          controls
                          indicators
                          background="#ababab"
                          img-width="200"
                          img-height="200"
                          style="text-shadow: 1px 1px 2px #333"
                          @sliding-start="onSlideStart"
                          @sliding-end="onSlideEnd"
                        >
                          <div @click="fetchRestaurant(restaurant.id)">
                            <b-carousel-slide
                              id="carousellog"
                              v-b-modal.modal-restaurant
                              v-for="(image, k) in restaurant.images_restaurant"
                              v-bind:key="'imres' + k"
                              :img-src="`${apiDomain}/myapp/public/uploads/files_restaurant/${image.url_image}`"
                            ></b-carousel-slide>
                          </div>
                        </b-carousel>
                      </div>

                      <div class="card-block" style="padding: 10px">
                        <b>&nbsp;&nbsp;{{ restaurant.nom }}</b>
                        <br />
                        <i class="tim-icons icon-square-pin"></i>
                        <span style="font-size: 13px"
                          >&nbsp;{{ restaurant.adresse }}.</span
                        >
                      </div>

                      <router-link :to="`/detailsrestaurant/${restaurant.id}`">
                        <b-button
                          style="
                            margin: 0px 0px;
                            border-radius: 0px 0px 24px 0px;
                            width: 100%;
                          "
                          variant="info"
                          >Voir Plus</b-button
                        >
                      </router-link>
                    </div>
                  </div>
                </div>

                <div class="row" v-if="restaurants.length == 0">
                  <div class="col-md-12">
                    <p>Pas de restaurants disponibles pour cette ville.</p>
                  </div>
                </div>
              </b-tab>
              <b-tab
                title="Assurance"
                style="padding: 15px"
                v-if="pack.activite_id_principal != 3"
              >
                <b-card-text>Frais d'assurance</b-card-text>
              </b-tab>
            </b-tabs>

            <!-- collapse mobile -->

            <div id="app" class="container d-lg-none">
              <div>
                <div
                  class="row"
                  style="background: #222a42; color: #fff"
                >
                  <div class="col">
                    <label style="color: #fff; padding: 5px !important"
                      >Photos</label
                    >
                  </div>

                  <div class="col">
                    <i
                      style="
                        margin-left: 97px;
                        color: #fff;
                        padding: 5px !important;
                        font-weight: bold;
                      "
                      :class="visible ? null : 'collapsed'"
                      :aria-expanded="visible ? 'true' : 'false'"
                      aria-controls="collapse-1"
                      @click="visible = !visible"
                      class="tim-icons icon-simple-add"
                    >
                    </i>
                  </div>
                </div>

                <b-collapse id="collapse-1" v-model="visible" class="mt-2">
                  <div
                    v-for="(zone, k) in pack.zone_pack"
                    v-bind:key="'zone' + k"
                  >
                    <b-card-footer
                      v-if="!isHidden22 && k == index"
                      class="footer-slider"
                    >
                      <b-carousel
                        id="carousel-1"
                        v-model="slide"
                        :interval="4000"
                        controls
                        indicators
                        style="text-shadow: 1px 1px 2px #333"
                        @sliding-start="onSlideStart"
                        @sliding-end="onSlideEnd"
                      >
                        <div>
                          <b-carousel-slide
                            id="carousel22"
                            v-for="(image, k) in zone.zone_touristique.image"
                            v-bind:key="'im' + k"
                            :text="zone.nom"
                            :img-src="`${apiDomain}/myapp/public/uploads/files_zones/${image.url_image}`"
                          >
                            <h1
                              style="
                                background-color: rgba(0, 0, 0, 0.3);
                                padding: 10px;
                              "
                            >
                              {{ zone.zone_touristique.nom }}
                            </h1>
                          </b-carousel-slide>
                        </div>
                      </b-carousel>
                    </b-card-footer>
                  </div>
                  <div
                    class="row"
                    v-if="isHidden22"
                    style="padding: 0px 13px 13px 13px"
                  >
                    <div class="col-md-12">
                      <img loading="lazy"
                        alt="pack"
                        id="carousel22"
                        :src="`${apiDomain}/myapp/public/uploads/files_packs/${pack.image_couverture}`"
                      />
                    </div>
                  </div>
                  <div class="row" style="margin-top: 5px">
                    <div
                      class="col-md-4"
                      v-for="(zone, k) in pack.zone_pack"
                      v-bind:key="'z' + zone.zone_touristique_id"
                      @click="(index = k), (isHidden22 = false)"
                    >
                      <b-card-footer
                        class="footer-slider"
                        style="padding: 1px 15px 1px 15px"
                      >
                        <!-- <b-carousel
                        v-model="slide"
                        :interval="4000"
                        controls
                        indicators
                        style="text-shadow: 1px 1px 2px #333;margin-top:30px"
                        @sliding-start="onSlideStart"
                        @sliding-end="onSlideEnd"
                      >
                        <b-carousel-slide
                          id="carousel11"
                          v-for="(image,k) in zone.zone_touristique.image"
                          v-bind:key="'imm'+k"
                          :text="zone.nom"
                          :img-src="`${apiDomain}/myapp/public/uploads/files_zones/${image.url_image}`"
                        >
                          <h4 style="color:#fff">{{zone.zone_touristique.nom}}</h4>
                        </b-carousel-slide>
                      </b-carousel>-->
                        <carousel
                          :per-page="1"
                          :mouse-drag="false"
                          navigationPrevLabel
                          navigationNextLabel
                        >
                          <slide
                            style="margin-top: 20px"
                            v-for="(image, k) in zone.zone_touristique.image"
                            v-bind:key="'imm' + k"
                            :text="zone.nom"
                            class="MyCustomClassDetail"
                            v-b-modal.modal-zone
                            link="#"
                          >
                            <img loading="lazy"
                              width="100%"
                              :src="`${apiDomain}/myapp/public/uploads/files_zones/${image.url_image}`"
                            />
                          </slide>
                        </carousel>

                        <center>
                          <span style="margin-top: 20px">{{
                            zone.zone_touristique.nom
                          }}</span>
                        </center>
                      </b-card-footer>
                    </div>
                  </div>
                </b-collapse>
              </div>
            </div>

            <div
              id="app"
              class="container d-lg-none"
              v-if="pack.url_video != null"
            >
              <div
                class="row"
                style="
                  background: #222a42;
                  color: #fff;
                  margin-top: -15px;
                "
              >
                <div class="col">
                  <label style="color: #fff; padding: 5px !important"
                    >Vidéos</label
                  >
                </div>

                <div class="col">
                  <i
                    style="
                      margin-left: 97px;
                      color: #fff;
                      padding: 5px !important;
                      font-weight: bold;
                    "
                    :class="visible1 ? null : 'collapsed'"
                    :aria-expanded="visible1 ? 'true' : 'false'"
                    aria-controls="collapse-1"
                    @click="visible1 = !visible1"
                    class="tim-icons icon-simple-add"
                  >
                  </i>
                </div>
              </div>

              <b-collapse id="collapse-1" v-model="visible1" class="mt-2">
                <div
                  v-for="(zone, j) in pack.zone_pack"
                  v-bind:key="'zzz' + zone.zone_touristique_id"
                >
                  <!-- <b-card-footer> -->
                  <b-embed
                    v-if="!isHidden5 && j == index1"
                    type="iframe"
                    aspect="16by9"
                    :src="zone.zone_touristique.url_video"
                    allowfullscreen
                  ></b-embed>
                </div>

                <b-embed
                  v-if="isHidden5 && pack.url_video"
                  type="iframe"
                  aspect="16by9"
                  :src="pack.url_video"
                  allowfullscreen
                ></b-embed>
                <div class="row">
                  <div
                    class="col-md-4"
                    v-for="(zone, j) in pack.zone_pack"
                    v-bind:key="'zz1' + zone.zone_touristique_id"
                  >
                    <span
                      onmouseover="this.style.cursor='pointer'"
                      style="color: #333; margin-top: 10px"
                      @click="(index1 = j), (isHidden5 = false)"
                      >{{ zone.zone_touristique.nom }}</span
                    >
                    <!-- <b-card-footer> -->
                    <b-embed
                      style="margin-top: 10px"
                      type="iframe"
                      aspect="16by9"
                      :src="zone.zone_touristique.url_video"
                      allowfullscreen
                    ></b-embed>
                    <!-- </b-card-footer> -->
                  </div>
                </div>
              </b-collapse>
            </div>

            <div id="app" class="container d-lg-none">
              <div
                class="row"
                style="
                  background: #222a42;
                  color: #fff;
                  margin-top: -15px;
                "
              >
                <div class="col">
                  <label style="color: #fff; padding: 5px !important"
                    >Description</label
                  >
                </div>

                <div class="col">
                  <i
                    onmouseover="this.style.cursor='pointer'"
                    style="
                      margin-left: 97px;
                      color: #fff;
                      padding: 5px !important;
                      font-weight: bold;
                    "
                    :class="visible2 ? null : 'collapsed'"
                    :aria-expanded="visible2 ? 'true' : 'false'"
                    aria-controls="collapse-1"
                    @click="visible2 = !visible2"
                    class="tim-icons icon-simple-add"
                  >
                  </i>
                </div>
              </div>

              <b-collapse id="collapse-1" v-model="visible2" class="mt-2">
                <b-card-text>{{ pack.description }}</b-card-text>
                <br />

                <div v-for="(zone, i) in pack.zone_pack" v-bind:key="'zz2' + i">
                  <h4 style="color: #333">
                    <img loading="lazy"
                      style="max-width: 2.5%"
                      draggable="false"
                      role="img"
                      class="emoji"
                      alt="👣"
                      src="https://s.w.org/images/core/emoji/13.0.1/svg/1f463.svg"
                    />
                    &nbsp;{{ zone.zone_touristique.nom }} :
                  </h4>
                  <b-card-text>{{
                    zone.zone_touristique.description
                  }}</b-card-text>
                  <br />
                </div>
              </b-collapse>
            </div>

            <div
              id="app"
              class="container d-lg-none"
              v-if="pack.programmes.length > 0"
            >
              <div
                class="row"
                style="
                  background: #222a42;
                  color: #fff;
                  margin-top: -15px;
                "
              >
                <div class="col">
                  <label style="color: #fff; padding: 5px !important"
                    >Programme</label
                  >
                </div>

                <div class="col">
                  <i
                    onmouseover="this.style.cursor='pointer'"
                    style="
                      margin-left: 97px;
                      color: #fff;
                      padding: 5px !important;
                      font-weight: bold;
                    "
                    :class="visible3 ? null : 'collapsed'"
                    :aria-expanded="visible3 ? 'true' : 'false'"
                    aria-controls="collapse-1"
                    @click="visible3 = !visible3"
                    class="tim-icons icon-simple-add"
                  >
                  </i>
                </div>
              </div>

              <b-collapse id="collapse-1" v-model="visible3" class="mt-2">
                <div
                  v-for="(programme, i) in pack.programmes"
                  v-bind:key="'programme' + i"
                >
                  <div class="jour">
                    <div class="jour-number">{{ i + 1 }}</div>
                    <span class="qodef-line-between-icons">
                      <span class="qodef-line-between-icons-inner"></span>
                    </span>
                    <h4
                      class="jour-nom"
                      style="color: #333; margin-bottom: 0px"
                    >
                      Jour {{ i + 1 }}: &nbsp;{{ programme.titre }}
                    </h4>
                    <h4 class="content-jour">
                      {{ programme.description }}
                      <br />
                      <br />
                    </h4>
                  </div>
                </div>
              </b-collapse>
            </div>

            <div
              id="app"
              class="container d-lg-none"
              v-if="pack.hebergement_pack.length > 0"
            >
              <div
                class="row"
                style="
                  background: #222a42;
                  color: #fff;
                  margin-top: -15px;
                "
              >
                <div class="col">
                  <label style="color: #fff; padding: 5px !important"
                    >Logements</label
                  >
                </div>

                <div class="col">
                  <i
                    onmouseover="this.style.cursor='pointer'"
                    style="
                      margin-left: 97px;
                      color: #fff;
                      padding: 5px !important;
                      font-weight: bold;
                    "
                    :class="visible4 ? null : 'collapsed'"
                    :aria-expanded="visible4 ? 'true' : 'false'"
                    aria-controls="collapse-1"
                    @click="visible4 = !visible4"
                    class="tim-icons icon-simple-add"
                  >
                  </i>
                </div>
              </div>

              <b-collapse id="collapse-1" v-model="visible4" class="mt-2">
                <div
                  class="col-lg-4"
                  v-for="heb in hebergementpack"
                  v-bind:key="'heb' + heb.id"
                >
                  <div class="card card1">
                    <div>
                      <b-carousel
                        id="carousel-1"
                        v-model="slide"
                        :interval="4000"
                        controls
                        indicators
                        background="#ababab"
                        img-width="200"
                        img-height="200"
                        style="text-shadow: 1px 1px 2px #333"
                        @sliding-start="onSlideStart"
                        @sliding-end="onSlideEnd"
                      >
                        <div @click="fetchHebergement(heb.hebergement.id)">
                          <b-carousel-slide
                            id="carousellog"
                            v-b-modal.modal-hebergement
                            v-for="(imageheb, k) in heb.hebergement
                              .images_hebergement"
                            v-bind:key="'imheb' + k"
                            :img-src="`${apiDomain}/myapp/public/uploads/files_hebergement/${imageheb.url_image}`"
                          ></b-carousel-slide>
                        </div>
                      </b-carousel>
                    </div>
                    <div class="card-block">
                      <div style="padding-top: 10px">
                        <b>&nbsp;&nbsp;{{ heb.hebergement.nom }}</b>
                        <br />
                        <small
                          class="text-muted"
                          style="
                            color: #717171;
                            font-size: 13px;
                            font-weight: 400;
                          "
                        >
                          &nbsp;&nbsp;
                          {{ heb.hebergement.nbr_voyageurs }} voyageurs
                          <span>.</span>
                          {{ heb.hebergement.nbr_chambre_dispo }} chambre(s)
                        </small>
                        <hr style="margin-bottom: 0rem; margin-top: 0.5rem" />
                        <p class="card-text">
                          <small>
                            <span v-if="heb.hebergement.salle_de_bain == 1">
                              &nbsp;
                              <img loading="lazy"
                                v-b-tooltip.hover
                                title="Salle de bain"
                                src="/bath-etnafes-21.png"
                              />
                              &nbsp;
                            </span>

                            <span v-if="heb.hebergement.lave_linge == 1">
                              &nbsp;
                              <img loading="lazy"
                                v-b-tooltip.hover
                                title="Lave linge"
                                src="/tumble-dry-etnafes-21.png"
                              />&nbsp;
                            </span>

                            <span v-if="heb.hebergement.chauffage == 1">
                              &nbsp;
                              <img loading="lazy"
                                v-b-tooltip.hover
                                title="Chauffage"
                                src="/heating-etnafes-21.png"
                              />&nbsp;
                            </span>
                            <span v-if="heb.hebergement.television == 1">
                              &nbsp;
                              <img loading="lazy"
                                v-b-tooltip.hover
                                title="Television"
                                src="/tv-etnafes-21.png"
                              />&nbsp;
                            </span>

                            <span v-if="heb.hebergement.climatisation == 1">
                              &nbsp;
                              <img loading="lazy"
                                v-b-tooltip.hover
                                title="Climatisation"
                                src="/air-conditioner-etnafes-21.png"
                              />&nbsp;
                            </span>

                            <span v-if="heb.hebergement.eau_chaude == 1">
                              &nbsp;
                              <img loading="lazy"
                                v-b-tooltip.hover
                                title="Eau chaude"
                                src="/water-heater-etnafes-21.png"
                              />&nbsp;
                            </span>

                            <span
                              v-if="
                                heb.hebergement.espace_travail_ordinateur == 1
                              "
                            >
                              &nbsp;
                              <img loading="lazy"
                                v-b-tooltip.hover
                                title="Espace de travail"
                                src="/computer-etnafes-21.png"
                              />&nbsp;
                            </span>

                            <span v-if="heb.hebergement.espace_enfant == 1">
                              &nbsp;
                              <img loading="lazy"
                                v-b-tooltip.hover
                                title="Espace enfant"
                                src="/espace-enfant-etnafes-21.png"
                              />&nbsp;
                            </span>

                            <span v-if="heb.hebergement.wifi == 1">
                              &nbsp;
                              <img loading="lazy"
                                v-b-tooltip.hover
                                title="WiFi"
                                src="/wifi-etnafes-21.png"
                              />&nbsp;
                            </span>

                            <span v-if="heb.hebergement.cuisine == 1">
                              &nbsp;
                              <img loading="lazy"
                                v-b-tooltip.hover
                                title="Cuisine"
                                src="/kitchen-etnafes-21.png"
                              />&nbsp;
                            </span>
                          </small>
                        </p>
                      </div>
                    </div>
                    <hr style="margin-bottom: 0rem; margin-top: 0.5rem" />

                    <div class="card-block" style="padding: 10px">
                      <i class="tim-icons icon-square-pin"></i>
                      <span style="font-size: 13px"
                        >&nbsp;{{ heb.hebergement.adresse }}.</span
                      >
                    </div>

                    <router-link
                      :to="`/detailshebergement/${heb.hebergement.id}`"
                    >
                      <b-button
                        style="
                          margin: 0px 0px;
                          border-radius: 0px 0px 24px 0px;
                          width: 100%;
                        "
                        variant="info"
                        >Voir Plus</b-button
                      >
                    </router-link>
                  </div>
                </div>
              </b-collapse>
            </div>

            <div id="app" class="container d-lg-none">
              <div
                class="row"
                style="
                  background: #222a42;
                  color: #fff;
                  margin-top: -15px;
                "
              >
                <div class="col">
                  <label style="color: #fff; padding: 5px !important"
                    >Restaurants</label
                  >
                </div>

                <div class="col">
                  <i
                    onmouseover="this.style.cursor='pointer'"
                    style="
                      margin-left: 97px;
                      color: #fff;
                      padding: 5px !important;
                      font-weight: bold;
                    "
                    :class="visible5 ? null : 'collapsed'"
                    :aria-expanded="visible5 ? 'true' : 'false'"
                    aria-controls="collapse-1"
                    @click="visible5 = !visible5"
                    class="tim-icons icon-simple-add"
                  >
                  </i>
                </div>
              </div>

              <b-collapse id="collapse-1" v-model="visible5" class="mt-2">
                <div
                  style="margin-bottom: 25px"
                  class="row"
                  v-for="v in ville_pack"
                  v-bind:key="'v' + v.id"
                  v-show="v.ville.restaurant.length != 0"
                >
                  <div class="col-md-12">
                    <h4>{{ v.ville.nom }}</h4>
                  </div>
                  <br />
                  <div
                    class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12"
                    v-for="restaurant in v.ville.restaurant"
                    v-show="v.ville.restaurant.length != 0"
                    v-bind:key="'res' + restaurant.id"
                  >
                    <div
                      class="card card1"
                      v-show="v.ville.restaurant.length != 0"
                    >
                      <div>
                        <b-carousel
                          id="carousel-1"
                          v-model="slide"
                          :interval="4000"
                          controls
                          indicators
                          background="#ababab"
                          img-width="200"
                          img-height="200"
                          style="text-shadow: 1px 1px 2px #333"
                          @sliding-start="onSlideStart"
                          @sliding-end="onSlideEnd"
                        >
                          <div @click="fetchRestaurant(restaurant.id)">
                            <b-carousel-slide
                              id="carousellog"
                              v-b-modal.modal-restaurant
                              v-for="(image, k) in restaurant.images_restaurant"
                              v-bind:key="'imres' + k"
                              :img-src="`${apiDomain}/myapp/public/uploads/files_restaurant/${image.url_image}`"
                            ></b-carousel-slide>
                          </div>
                        </b-carousel>
                      </div>

                      <div class="card-block" style="padding: 10px">
                        <b>&nbsp;&nbsp;{{ restaurant.nom }}</b>
                        <br />
                        <i class="tim-icons icon-square-pin"></i>
                        <span style="font-size: 13px"
                          >&nbsp;{{ restaurant.adresse }}.</span
                        >
                      </div>

                      <router-link :to="`/detailsrestaurant/${restaurant.id}`">
                        <b-button
                          style="
                            margin: 0px 0px;
                            border-radius: 0px 0px 24px 0px;
                            width: 100%;
                          "
                          variant="info"
                          >Voir Plus</b-button
                        >
                      </router-link>
                    </div>
                  </div>
                </div>
              </b-collapse>
            </div>

            <div id="app" class="container d-lg-none">
              <div
                class="row"
                style="
                  background: #222a42;
                  color: #fff;
                  margin-top: -15px;
                "
              >
                <div class="col">
                  <label style="color: #fff; padding: 5px !important"
                    >Assurance</label
                  >
                </div>

                <div class="col">
                  <i
                    onmouseover="this.style.cursor='pointer'"
                    style="
                      margin-left: 97px;
                      color: #fff;
                      padding: 5px !important;
                      font-weight: bold;
                    "
                    :class="visible6 ? null : 'collapsed'"
                    :aria-expanded="visible6 ? 'true' : 'false'"
                    aria-controls="collapse-1"
                    @click="visible6 = !visible6"
                    class="tim-icons icon-simple-add"
                  >
                  </i>
                </div>
              </div>

              <b-collapse id="collapse-1" v-model="visible6" class="mt-2">
                <b-card-text>Frais d'assurance</b-card-text>
              </b-collapse>
            </div>
            <div
              class="col-md-3 d-none d-lg-block"
              style="margin-bottom: 10px; margin-top: 10px"
            >
              <b-button-group>
                <!--     <button
                  v-if="!loggedIn && pack.date_deb>(new Date().toISOString().split('T')[0])"
                  class="btn btn-outline-success mt-3"
                  style="border-radius: 18px 0px 18px 0px;"
                  v-b-modal.modal-inscription
                  type="submit"
                  fill
                >Je passe à l'agence ></button>

                <button
                  v-if="pack.date_deb<(new Date().toISOString().split('T')[0])"
                  class="btn btn-outline-success mt-3"
                  style="border-radius: 18px 0px 18px 0px;color:#fff;"
                  disabled
                  type="submit"
                  fill
                >Je passe à l'agence ></button>
                -->
                <!-- <router-link
                  @click.native="scrollToTop"
                  :to="{name:'PaiementAgence',params:{id:pack.id},
query: { ville_id:pack.ville_id,date_deb:pack.date_deb,vip:pack.vip,nb_adulte:nb_adulte,nb_enfant:nb_enfant,ages:agestab}}"
                >
                  <b-button
                    v-if="loggedIn && user.role==2 && pack.date_deb>(new Date().toISOString().split('T')[0])"
                    style="border-radius: 18px 0px 18px 0px;"
                  >
                    <span style="font-size:12px;color:#fff">
                      Je passe à l'agence >
                      <br />
                    </span>
                  </b-button>
                </router-link>-->

                <!-- payemee -->
                <button
                  v-if="
                    !loggedIn &&
                    pack.date_deb > new Date().toISOString().split('T')[0]
                  "
                  class="btn btn-outline-success mt-3"
                  style="border-radius: 18px 0px 18px 0px; margin-left: 20px"
                  v-b-modal.modal-inscription-paiement-ligne
                  type="submit"
                  fill
                >
                  Je passe au Paiement >
                </button>

                <button
                  v-if="pack.date_deb < new Date().toISOString().split('T')[0]"
                  class="btn btn-outline-success mt-3"
                  style="
                    border-radius: 18px 0px 18px 0px;
                    color: #fff;
                    margin-left: 20px;
                  "
                  disabled
                  type="submit"
                  fill
                >
                  Je passe au Paiement >
                </button>

                <router-link
                  @click.native="scrollToTop"
                  :to="{
                    name: 'PaiementPack',
                    params: { id: pack.id },
                    query: {
                      ville_id: pack.ville_id,
                      date_deb: pack.date_deb,

                      nb_adulte: nb_adulte,
                      nb_enfant: nb_enfant,
                      ages: agestab,
                    },
                  }"
                >
                  <b-button
                    v-if="
                      loggedIn &&
                      pack.date_deb > new Date().toISOString().split('T')[0]
                    "
                    style="border-radius: 18px 0px 18px 0px; margin-left: 20px"
                  >
                    <span style="font-size: 12px; color: #fff">
                      Je passe au Paiement >
                      <br />
                    </span>
                  </b-button>
                </router-link>
              </b-button-group>
            </div>
          </b-card>
        </div>

        <div class="col-md-4" id="map" ref="map">
          <br />

          <gmap-map
            class="d-none d-lg-block"
            :center="center"
            :zoom="8"
            style="width: 100%; height: 975px"
          >
            <GmapMarker
              icon="/Etnafes-icon02.png"
              v-for="(zo, index) in markers"
              :key="'zo' + index"
              :position="zo.position"
              @click="
                toggleInfoWindow(zo, index);
                fetchImages(zo.position.idz);
              "
            ></GmapMarker>

            <GmapMarker
              icon="/Etnafes-icon01.png"
              v-for="(m, index) in markersh"
              :key="'mar' + index"
              :position="m.position"
              @click="toggleInfoWindow(m, index)"
            ></GmapMarker>
            <gmap-info-window
              :options="infoOptions"
              :position="infoWindowPos"
              :opened="infoWinOpen"
              @closeclick="infoWinOpen = false"
            >
              <info-content :content="InfoDepanneur"></info-content>
            </gmap-info-window>
          </gmap-map>

          <gmap-map
            class="d-lg-none"
            :center="center"
            :zoom="8"
            style="width: 100%; height: 320px"
          >
            <GmapMarker
              icon="/Etnafes-icon02.png"
              v-for="(zo, index) in markers"
              :key="'zo' + index"
              :position="zo.position"
              @click="
                toggleInfoWindow(zo, index);
                fetchImages(zo.position.idz);
              "
            ></GmapMarker>

            <GmapMarker
              icon="/Etnafes-icon01.png"
              v-for="(m, index) in markersh"
              :key="'mar' + index"
              :position="m.position"
              @click="toggleInfoWindow(m, index)"
            ></GmapMarker>
            <gmap-info-window
              :options="infoOptions"
              :position="infoWindowPos"
              :opened="infoWinOpen"
              @closeclick="infoWinOpen = false"
            >
              <info-content :content="InfoDepanneur"></info-content>
            </gmap-info-window>
          </gmap-map>
        </div>
      </div>
    </div>

    <div class="container" v-if="nbcom > 0">
      <hr />
      <br class="d-none d-lg-block" />
      <h5>
        <span style="color: #000">{{
          (calculMoyenne / nbcom).toFixed(2)
        }}</span>
        <img loading="lazy" src="/star-etnafes.png" style="margin-top: -3px" />&nbsp;
        <span style="color: #000" class="d-none d-lg-block"
          >({{ nbcom }} commentaires)</span
        >
        <span style="color: #000; font-size: 15px" class="d-lg-none"
          >({{ nbcom }} commentaires)</span
        >
      </h5>
      <br class="d-none d-lg-block" />
      <div class="row" v-if="nbcom > 0">
        <div class="col-md-12">
          <input
            aria-label="search"
            type="text"
            v-model="search"
            placeholder="rechercher dans les commentaires"
            style="border: 1px solid #ebebeb; width: 100%; height: 30px"
          />
        </div>
      </div>

      <br />
      <br />

      <div class="row">
        <div
          class="col-md-4 d-none d-lg-block"
          v-for="avispack in filteredavispack"
          :key="'avispack' + avispack.id"
          style="margin-top: 30px !important"
        >
          <div class="row">
            <div class="col-md-4">
              <img loading="lazy"
                :src="`https://etnafesapi20212018.etnafes.com/${avispack.client.photo}`"
                alt="Profile Photo"
              />
            </div>

            <div class="col-md-8">
              {{ avispack.client.nom }} {{ avispack.client.prenom }}
              <rate :length="5" v-model="avispack.nbr_etoile"></rate>
              {{ avispack.created_at }}
            </div>
          </div>
          <div class="output" style="margin-top: 20px">
            <HighlightWords
              class="wrapper"
              highlightClassName="highlight"
              highlightTag="i"
              :searchWords="keywords"
              :autoEscape="true"
              :textToHighlight="avispack.commentaire"
            ></HighlightWords>
          </div>
          <!-- <br />
          <br />-->
        </div>
        <div class="row" style="margin-top: -60px">
          <div
            class="col d-lg-none"
            v-for="avispack in filteredavispack"
            :key="'avispack' + avispack.id"
            style="margin-top: 30px !important; border: 1px solid #b7b7b7"
          >
            <center>
              <div class="row">
                <div class="col-mx-4">
                  <img loading="lazy"
                    width="40% !important"
                    :src="`https://etnafesapi20212018.etnafes.com/${avispack.client.photo}`"
                  />
                </div>

                <div class="col-mx-4">
                  <span style="margin-left: 5px">
                    {{ avispack.client.nom }} {{ avispack.client.prenom }}</span
                  >
                  <span style="margin-left: 5px">
                    <rate :length="5" v-model="avispack.nbr_etoile"></rate>
                  </span>
                  <span style="margin-left: 25px">{{
                    avispack.created_at
                  }}</span>
                </div>
              </div>
              <div class="output" style="margin-top: 20px">
                <HighlightWords
                  class="wrapper"
                  highlightClassName="highlight"
                  highlightTag="i"
                  :searchWords="keywords"
                  :autoEscape="true"
                  :textToHighlight="avispack.commentaire"
                ></HighlightWords>
              </div>
            </center>
            <!-- <br />
          <br />-->
          </div>
        </div>
      </div>

      <br class="d-none d-lg-block" />

      <button
        @click="fetchAllAvisPack(pack.id)"
        class="btn btn-outline-success mt-3 btnout"
        fill
        v-if="nbcom > 3"
      >
        Afficher tous les {{ nbcom }} commentaires >>
        <pulse-loader
          v-if="load == true"
          :loading="loading"
          :color="color"
          :size="size"
        ></pulse-loader>
      </button>
    </div>
    <!-- <br />
    <br />-->

    <div class="container" v-if="loggedIn">
      <!-- <br />
      <br />-->
      <hr />
      <h4 style="color: #000">Donnez votre Avis</h4>
      <ValidationObserver>
        <form v-on:submit.prevent="addAvis()" class="mb-3">
          <rate :length="5" v-model="avis.nbr_etoile"></rate>
          <br />
          <ValidationProvider
            name="commentaire"
            rules="required"
            v-slot="{ errors }"
          >
            <div class="form-group">
              <textarea
                rows="4"
                class="form-control personalise"
                v-model="avis.commentaire"
                placeholder="Commentaire"
              />
              <span class="message">{{ errors[0] }}</span>

              <p v-if="validationErrors.commentaire">
                <span class="alert-link"
                  >* {{ validationErrors.commentaire[0] }}</span
                >
              </p>
            </div>
          </ValidationProvider>

          <div class="row">
            <div class="col-md-3">
              <button class="btn btn-outline-success mt-3" type="submit" fill>
                Envoyer
              </button>
            </div>
          </div>
        </form>
      </ValidationObserver>
    </div>

    <!-- <div
      class="container-fluid d-none d-lg-block"
      style="background-color: #4c7daa"
    >
      <div classs="row">
        <div class="col-md-10 offset-md-1">
          <center>
            <h4 style="line-height: 20px; color: #fff; padding-top: 30px">
              NOS PACKS EN VEDETTE
            </h4>
          </center>
          <div class="back_col_9_home">
            <vueper-slides
              autoplay
              duration="3000"
              class="no-shadow"
              :visible-slides="3"
              slide-multiple
              :gap="3"
              :slide-ratio="1 / 5"
              :dragging-distance="200"
              :breakpoints="{ 800: { visibleSlides: 2, slideMultiple: 2 } }"
            >
              <vueper-slide
                v-for="(pack, i) in packsvedette"
                v-bind:key="i"
                :content="
                  '<span class= tite_vue_slider_home> ' +
                  pack.titre +
                  '</span>' +
                  '<br><small class=tite_vue_slider_home>Arrivée: ' +
                  pack.date_deb +
                  '</small>' +
                  '<small class=tite_vue_slider_home> Départ: ' +
                  pack.date_fin +
                  '</small>' +
                  '<br><img loading="lazy" class=web  alt=réservation src=/nombre-reservation-etnafes1.png   />' +
                  '&nbsp;<span class=adrenaline_vue_slider_home >' +
                  pack.nb_place_dispo +
                  '</span>&nbsp;' +
                  '<img loading="lazy" class=web alt=adrenaline  src=/extreme-etnafes1.png  />' +
                  '&nbsp;' +
                  '<span class= adrenaline_vue_slider_home >' +
                  pack.adrenaline +
                  '</span>' +
                  '<br>'
                "
                :link="`pack/${pack.id}`"
                :image="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_packs/${pack.image_couverture}`"
                class="image_slider_home"
              />
            </vueper-slides>
          </div>
        </div>
      </div>
    </div> -->

    <!-- <div class="container-fluid d-lg-none" style="background-color: #4c7daa">
      <div classs="row">
        <div class="col-md-10 offset-md-1">
          <center>
            <h4 style="line-height: 20px; color: #fff; padding-top: 30px">
              NOS PACKS EN VEDETTE
            </h4>
          </center>
          <div class="back_col_9_home">
            <vueper-slides :infinite="false" :bullets="false">
              <template v-slot:arrow-left>
                <i class="tim-icons icon-double-left style-right-row"></i>
              </template>

              <template v-slot:arrow-right>
                <i class="tim-icons icon-double-right style-right-row"></i>
              </template>
              <vueper-slide
                v-for="(pack, i) in packsvedette"
                v-bind:key="i"
                :content="
                  '<span class= tite_vue_slider_home> ' +
                  pack.titre +
                  '</span>' +
                  '<br><small class=tite_vue_slider_home>Arrivée: ' +
                  pack.date_deb +
                  '</small>' +
                  '<small class=tite_vue_slider_home> Départ: ' +
                  pack.date_fin +
                  '</small>' +
                  '<br><img loading="lazy" class=web alt=reservation  src=/nombre-reservation-etnafes1.png   />' +
                  '&nbsp;<span class=adrenaline_vue_slider_home >' +
                  pack.nb_place_dispo +
                  '</span>&nbsp;' +
                  '<img loading="lazy" class=web  alt=adrenaline src=/extreme-etnafes1.png  />' +
                  '&nbsp;' +
                  '<span class= adrenaline_vue_slider_home >' +
                  pack.adrenaline +
                  '</span>' +
                  '<br>'
                "
                :link="`pack/${pack.id}`"
                :image="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_packs/${pack.image_couverture}`"
                class="image_slider_home"
              />
            </vueper-slides>
          </div>
        </div>
      </div>
    </div> -->

    <div class="row d-lg-none" style="display: block">
      <div
        style="
          position: fixed;
          background: #fff;
          bottom: 0;
          right: 0;
          left: 0;
          padding: 15px;
          z-index: 1;
          margin: 0;
          border-top: 1px solid rgb(221, 221, 221) !important;
        "
      >
        <button
          v-if="
            !loggedIn && pack.date_deb > new Date().toISOString().split('T')[0]
          "
          class="btn btn-info btn-block"
          v-b-modal.modal-inscription-paiement-ligne
          type="submit"
          fill
        >
          Je passe au Paiement >
        </button>

        <b-button
          v-if="pack.date_deb < new Date().toISOString().split('T')[0]"
          class="btn-info btn-block"
          disabled
          type="submit"
          fill
        >
          Je passe au Paiement >
        </b-button>

        <router-link
          @click.native="scrollToTop"
          :to="{
            name: 'PaiementPack',
            params: { id: pack.id },
            query: {
              ville_id: pack.ville_id,
              date_deb: pack.date_deb,

              nb_adulte: nb_adulte,
              nb_enfant: nb_enfant,
              ages: agestab,
            },
          }"
        >
          <b-button
            v-if="
              loggedIn && pack.date_deb > new Date().toISOString().split('T')[0]
            "
            class="btn btn-info btn-block"
          >
            <span style="font-size: 12px; color: #fff">
              Je passe au Paiement >
              <br />
            </span>
          </b-button>
        </router-link>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import VueAccordion from "@ztrehagem/vue-accordion";
import MapMarker from "../components/MapMarker";
import MapInfoWindow from "../components/MapInfoWindow";
import axios from "axios";
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
import TopNavbarHome from "./Layout/TopNavbarHome.vue";
import Footer from "./Layout/Footer.vue";
import facebookLogin from "facebook-login-vuejs";
import GoogleLogin from "vue-google-login";
import { apiDomain } from "../config";
import InfoDepanneur from "./InfoDepanneur.vue";
import CodeInput from "vue-verification-code-input";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { ValidationProvider } from "vee-validate";
import { extend } from "vee-validate";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import HighlightWords from "vue-highlight-words";
import StrongProps from "../components/StrongProps";
import StrongSlot from "../components/StrongSlot";
import VuePassword from "vue-password";
import "@ztrehagem/vue-accordion/dist/vue-accordion.css";
import {
  required,
  email,
  alpha,
  min,
  max,
  numeric,
} from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "Veuillez remplir ce champs",
});

extend("email", {
  ...email,
  message: "Veuillez saisir un email valide",
});

extend("min", {
  ...min,
  message: "Le mot de passe doit contenir au moins 6 caractéres",
});

extend("max", {
  ...max,
  message: "Le mot de passe doit contenir au plus 12 caractéres",
});

extend("alpha", {
  ...alpha,
  message: "Veuillez entrer uniquement des lettres",
});

extend("numeric", {
  ...numeric,
  message: "Veuillez entrer uniquement des chiffres",
});
export default {
  components: {
    VuePassword,
    ValidationProvider,
    CodeInput,
    TopNavbarHome,
    Footer,
    VueperSlides,
    facebookLogin,
    GoogleLogin,
    VueperSlide,
    "info-content": InfoDepanneur,
    MapMarker,
    MapInfoWindow,
    PulseLoader,
    HighlightWords,
    VueAccordion,
  },
  data() {
    return {
      visible: false,
      visible1: false,
      visible2: false,

      visible3: false,
      visible4: false,
      visible5: false,
      visible6: false,

      isExpanded: true,
      loadingInscription: false,
      isLoadingVerifEmail: false,
      errors: [],
      token: "",
      tokenVerifEmail: "",
      valide_email: false,
      showinscri: true,
      password: null,
      password_length: 0,
      contains_eight_characters: false,
      contains_number: false,
      contains_uppercase: false,
      contains_special_character: false,
      valid_password: false,
      pays_id: "",
      agestab: this.$route.query.ages,
      strongProps: StrongProps,
      strongSlot: StrongSlot,
      nbcom: "",
      nbcomheb: "",
      load: false,
      loadheb: false,
      nbr_etoile: "",
      validationErrors: "",
      login: false,
      entercode: false,
      error: "",
      password: "",
      erreurEmail: null,
      token: "",
      errorToken: null,
      newPassword: "",
      errornewPaswword: null,
      passwordAgain: "",
      errorpasswordAgain: null,
      tokenValid: false,
      var: "najeh",
      infoEmail: null,
      infoToken: null,
      pays_id: "",
      alert: null,
      sending: false,
      villespays: {},
      pays: {},
      agence_id: null,
      agence: {},
      agences: {},
      client: {
        code: "",
      },
      nom: "",
      email: "",
      telephone: "",
      civilité: "",
      gouvernorat: "",
      nb_adulte: this.$route.query.nb_adulte,
      nb_enfant: this.$route.query.nb_enfant,

      isHidden22: true,
      isHidden5: true,
      index: null,
      index1: null,
      infoContent: "",
      infoWindowPos: {
        lat: 0,
        lng: 0,
      },
      infoWinOpen: false,
      currentMidx: null,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35,
        },
      },
      map: null,
      center: { lat: 36.81897, lng: 10.16579 },
      markers: [],
      InfoDepanneur: [],
      markersh: [],
      avispack: [],
      avishebergement: [],
      avisheb: {},
      avis: {},
      search: "",

      places: [],
      hebergementpack: {},
      currentPlace: null,
      nb_adulte: this.$route.query.nb_adulte,
      nb_enfant: this.$route.query.nb_enfant,
      apiDomain: "https://etnafesapi20212018.etnafes.com",
      packsvedette: [],
      hebergements: [],
      ville_pack: [],

      restaurants: {},
      hebergement: {},
      restaurant: {},
      hebergementchoix: {},
      hebergementid: "",
      pack: {
        id: "",
        nom: "",
        du: "",
        description: "",
        au: "",
        type: "",
        ville_id: "",
      },
      slide: 0,
      sliding: null,
    };
  },

  computed: {
    calculMoyenne() {
      const avisp = this.avispack;
      var result = [];
      var moyenne = 0;
      for (var i = 0; i < avisp.length; i++) {
        moyenne += avisp[i].nbr_etoile;
      }
      result.push(moyenne);
      return result;
    },
    HebergementDispo() {
      var res = this.hebergementpack;
      var result = [];
      if (res.length != 0) {
        for (var i = 0; i < res.length; i++) {
          if (
            res[i].hebergement.nbr_place_dispo >=
            Number(this.nb_adulte) + Number(this.nb_enfant)
          ) {
            result.push(res[i]);
          }
        }
      }
      return result;
    },

    keywords() {
      return this.search.split(" ");
    },
    filteredavispack: function () {
      if (Array.isArray(this.avispack)) {
        return this.avispack.filter((avis) => {
          return (
            avis.email.match(this.search) || avis.commentaire.match(this.search)
          );
        });
      }
    },

    loggedIn() {
      return this.$store.getters.get_loggedIn;
    },

    user() {
      return this.$store.getters.get_user;
    },
    isDisabled: function () {
      return !this.terms;
    },
    hebergement_id: {
      get() {
        return this.$store.state.hebergement_id;
      },
      set(value) {
        this.$store.commit("updateHebergementid", value);
      },
    },

    code: {
      get() {
        return this.$store.state.code;
      },
      set(value) {
        this.$store.commit("updateCode", value);
      },
    },

    prenom: {
      get() {
        return this.$store.state.prenom;
      },
      set(value) {
        this.$store.commit("updatePrenom", value);
      },
    },
    id: {
      get() {
        return this.$store.state.id;
      },
      set(value) {
        this.$store.commit("updateAgence", value);
      },
    },
  },
  created() {
    if (this.hebergement_id != "") {
      this.fetchHebergementchoix(this.hebergement_id);
    }
    this.fetchAgences();
    this.fetchPays();
    this.fetchAvisPack(this.$route.params.id);

    // this.fetchAgencesid(this.$store.state.id);
    this.fetchPacks(this.$route.params.id);
    this.fetchPacksVedette();

    // this.fetchPacksVedette(this.$route.query.ville_id);
    // this.fetchRestaurants(this.$route.query.ville_id);

    this.fetchLocations(this.$route.params.id);
    Bus.$on("markers_fetched", (data) => {
      this.markers = data.markers;
      if (this.markers.length > 0) {
        this.center = data.markers[0].position;
      }
    });

    Bus.$on("marker_result_clicked", (index) => {
      let targetMarker = this.markers[index];
      this.center = targetMarker.position;
      this.toggleInfoWindow(targetMarker, index);
    });

    Bus.$on("markers_fetched", (data) => {
      this.markersh = data.markersh;
      if (this.markersh.length > 0) {
        this.center = data.markersh[0].position;
      }
    });

    Bus.$on("marker_result_clicked", (index) => {
      let targetMarker = this.markersh[index];
      this.center = targetMarker.position;
      this.toggleInfoWindow(targetMarker, index);
    });
  },
  methods: {
    fetchImages(id) {
      fetch(`${apiDomain}/api/zone/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.zone = res.zonetouristique;
          this.imagezones = res.zonetouristique.image;
        })
        .catch((err) => console.log(err));
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    fetchHebergementchoix(id) {
      fetch(`${apiDomain}/api/hebergement/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.hebergementchoix = res.hebergement;
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
            this.login = true;
            this.valide_email = false;
            this.$noty.success("votre code a été vérifié avec succès .");

            this.isLoadingVerifEmail = false;
            if (response.data.id) {
              this.user = response.data;
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
    fetchAllAvisPack(id) {
      this.load = true;
      axios
        .get(`${apiDomain}/api/avispack/all/${id}`)
        .then(({ data }) => ((this.avispack = data.pack), (this.load = false)));
    },

    fetchAllAvisHebergement(id) {
      this.loadheb = true;
      axios
        .get(`${apiDomain}/api/avishebergement/all/${id}`)
        .then(
          ({ data }) => (
            (this.avishebergement = data.hebergement), (this.loadheb = false)
          )
        );
    },

    validateCode() {
      this.errorToken = null;
      if (!this.client.code) {
        this.errorToken = "code est obligatoire";
      }

      if (!this.errorToken) {
        const data = {
          code: this.client.code,
        };
        this.login = false;
        axios
          .post(`${apiDomain}/api/verify`, data)
          .then((response) => {
            if (response.data.id) {
              this.login = true;
              this.tokenValid = true;
              this.user = response.data;
            }
          })
          .catch((error) => {
            this.errorToken = "error invalid";
          });
      }
    },

    onChange(v) {
      console.log("onChange ", v);
    },
    onComplete(v) {
      console.log("onComplete ", v);
    },
    updatePrenom(e) {
      this.$store.commit("updatePrenom", e.target.value);
    },

    updateAgence(e) {
      this.$store.commit("updateAgence", e.target.value);
    },
    fetchPays() {
      axios.get(`${apiDomain}/api/pays`).then(({ data }) => (this.pays = data));
    },
    fetchVillesPays(id) {
      axios
        .get(`${apiDomain}/api/pays/villes/${id}`)
        .then(({ data }) => (this.villespays = data.villes));
    },
    fetchAgencesid(id) {
      axios
        .get(`${apiDomain}/api/agences/${id}`)
        .then(({ data }) => (this.agence = data.agencedetail));
    },

    fetchAvisPack(id) {
      axios
        .get(`${apiDomain}/api/avispack/${id}`)
        .then(
          ({ data }) => ((this.avispack = data.pack), (this.nbcom = data.nbcom))
        );
    },
    fetchAgences() {
      axios
        .get(`${apiDomain}/api/agences`)
        .then(({ data }) => (this.agences = data));
    },
    performLogin() {
      this.isLoading = true;
      this.$store
        .dispatch("performLoginClientAction", {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          this.isLoading = false;
          this.$router.push({
            name: "PaiementAgence",
            params: { id: this.$route.params.id },
            query: {
              ville_id: this.$route.query.ville_id,
              date_deb: this.$route.query.date_deb,
              nb_adulte: this.$route.query.nb_adulte,
              nb_enfant: this.$route.query.nb_enfant,
              ages: this.$route.query.ages,
            },
          });
        })
        .catch((err) => {
          this.error = "Email ou mot de passe incorrect.";
          console.log(err.message);
        });
    },

    performLoginEnLigne() {
      this.isLoading = true;
      this.$store
        .dispatch("performLoginClientAction", {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          this.isLoading = false;
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
        })
        .catch((err) => {
          this.error = "Email ou mot de passe incorrect.";
          console.log(err.message);
        });
    },

    verifyNumero() {
      axios
        .post(`${apiDomain}/api/verify`)
        .then(function (response) {
          if (response.status == 200) {
            alert("Verified");
          }
        })
        .catch((error) => {
          if (error.response && error.response.status == 422) {
            this.validationErrors = error.response.data.errors;
          }
        });
    },

    addAvis() {
      axios
        .post(`${apiDomain}/api/avis/pack`, {
          email: this.$store.state.user.email,
          commentaire: this.avis.commentaire,
          nbr_etoile: this.avis.nbr_etoile,
          pack_id: this.$route.params.id,
          client_id: this.$store.state.user.id,
          headers: {
            "content-type": "application/json",
          },
        })
        .then((response) => {
          if (response.status == 200) {
            if (confirm("avis bien reçu")) {
              window.location.reload();
            }
          }
        })
        .catch((error) => {
          if (error.response && error.response.status == 400) {
            this.validationErrors = error.response.data;
          }
        });
    },

    addAvisHebergement() {
      axios
        .post(`${apiDomain}/api/avis/hebergement`, {
          email: this.$store.state.user.email,
          commentaire: this.avisheb.commentaire,
          nbr_etoile: this.avisheb.nbr_etoile,
          hebergement_id: this.hebergementid,
          client_id: this.$store.state.user.id,
          headers: {
            "content-type": "application/json",
          },
        })
        .then((response) => {
          if (response.status == 200) {
            if (confirm("avis bien reçu")) {
              window.location.reload();
            }
          }
        })
        .catch((error) => {
          if (error.response && error.response.status == 400) {
            this.validationErrors = error.response.data;
          }
        });
    },

    addClient() {
      this.entercode = false;
      this.loadingInscription = true;
      this.errors = [];

      this.$store
        .dispatch("performRegisterClientAction", {
          nom: this.client.nom,
          prenom: this.client.prenom,
          telephone: this.client.telephone,
          email: this.client.email,
          login: this.client.login,
          ville_id: this.client.ville_id,
          civilité: this.civilité,

          gouvernorat: this.gouvernorat,
          agence_id: this.agence_id,

          password: this.password,
        })
        .then((res) => {
          this.loadingInscription = false;

          /*  if (response.status == 20) { */

          this.$noty.success("veuillez vérifier votre compte.");

          // this.$noty.success("Connexion réussie.");
          //this.$router.push("/client");
          this.$router.push({
            name: "client",
            params: { id: this.$route.params.id },
            query: {
              ville_id: this.$route.query.ville_id,
              date_deb: this.$route.query.date_deb,
              nb_adulte: this.$route.query.nb_adulte,
              nb_enfant: this.$route.query.nb_enfant,
              ages: this.$route.query.ages,
            },
          });

          /*  } */
        })
        .catch((error) => {
          this.loadingInscription = false;
          if (error.response && error.response.status == 400) {
            this.$noty.error(
              " OOPS !  error sur votre demande d'inscription ! "
            );
            this.validationErrors = error.response.data;
          }
        });
    },

    addClient____() {
      this.entercode = false;
      this.loadingInscription = true;
      axios
        .post(`${apiDomain}/api/register/client`, {
          nom: this.client.nom,
          prenom: this.client.prenom,
          telephone: this.client.telephone,
          email: this.client.email,
          civilité: this.civilité,
          password: this.password,
          login: this.client.login,
          ville_id: this.client.ville_id,

          gouvernorat: this.gouvernorat,
          agence_id: this.agence_id,
          headers: {
            "content-type": "application/json",
          },
        })
        .then((response) => {
          if (response.status == 201) {
            this.loadingInscription = false;
            this.valide_email = true;
            (this.showinscri = false),
              this.$noty.success("veuillez vérifier votre compte.");
          }
        })
        .catch((error) => {
          if (error.response && error.response.status == 400) {
            this.validationErrors = error.response.data;
          }
        });
    },
    updateHebergementid(e) {
      this.$store.commit("updateHebergementid", e.target.value);
    },

    updateCode(e) {
      this.$store.commit("updateCode", e.target.value);
    },
    toggleInfoWindow(marker, idx) {
      this.infoWindowPos = marker.position;
      this.InfoDepanneur = marker.position;

      if (this.currentMidx == idx) {
        this.infoWinOpen = !this.infoWinOpen;
      } else {
        this.infoWinOpen = true;
        this.currentMidx = idx;
      }
    },
    fetchLocations(id) {
      axios
        .post(`${apiDomain}/api/find/${id}`, { center: this.center })
        .then((response) => {
          let data = response.data;
          Bus.$emit("markers_fetched", data);
        });
    },

    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
    /* fetchPacksVedette(ville_id) {
      axios
        .get(`${apiDomain}/api/packs/reservation/${ville_id}`)
        .then(({ data }) => (this.packsvedette = data.pack));
    }, */

    fetchPacksVedette() {
      axios
        .get(`${apiDomain}/api/packs/reservation`)
        .then(({ data }) => (this.packsvedette = data.packs));
    },

    fetchRestaurants(id) {
      axios
        .get(`${apiDomain}/api/restaurants/ville/${id}`)
        .then(({ data }) => (this.restaurants = data.restaurants));
    },

    fetchPacks(id) {
      axios.get(`${apiDomain}/api/packs/${id}`).then(
        ({ data }) => (
          (this.pack = data.packdetail),
          (this.hebergementpack = data.packdetail.hebergement_pack),
          (this.ville_pack = data.villepacknajeh)

          // (this.ville_pack = data.packdetail.ville_pack)
        )
      );
    },

    fetchRestaurant(id) {
      fetch(`${apiDomain}/api/restaurant/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.restaurant = res.restaurant;
          this.restaurantid = res.restaurant.id;
        })
        .catch((err) => console.log(err));
    },

    fetchHebergement(id) {
      fetch(`${apiDomain}/api/hebergement/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.hebergement = res.hebergement;
          this.hebergementid = res.hebergement.id;
        })
        .catch((err) => console.log(err));

      axios
        .get(`${apiDomain}/api/avishebergement/${id}`)
        .then(
          ({ data }) => (
            (this.avishebergement = data.hebergement),
            (this.nbcomheb = data.nbcomheb)
          )
        );
    },
  },
};
</script>
<style >
.MyCustomClassDetail {
  width: 100%;
  height: 150px !important;
  object-fit: cover;
}
.MyCustomClassRest {
  width: 100%;
  height: 150px !important;
  object-fit: cover;
}

.modal-body {
  position: relative;
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  padding: 3px 24px 0px 24px;
}
.dis {
  opacity: 0.7;
  border-radius: 5px;
  border-top-left-radius: 5px !important;
  border-bottom-left-radius: 5px !important;

  border-top-right-radius: 5px !important;
  border-bottom-right-radius: 5px !important;
}
</style>