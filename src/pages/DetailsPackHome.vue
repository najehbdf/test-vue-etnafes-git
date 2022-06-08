<template>
  <div>
    <b-modal
      id="modal-restaurant"
      :title="restaurant.nom"
      :restaurant="restaurant"
    >
      <hr />
      <b-carousel
        id="carousel-1"
        :interval="4000"
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
    </b-modal>

    <b-modal
      id="modal-inscription-paiement-ligne"
      title="Voyageur"
      class="modal-dialog modal-sm"
      v-if="showinscri"
    >
      <b-tabs content-class="mt-3" style="margin-top: 11px !important">
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
                <!--  <input
                  aria-label="password"
                  v-model="password"
                  class="form-control personalise"
                  placeholder="Mot de passe"
                  name="password"
                  type="password"
                  required
                /> -->
                <VuePassword
                  aria-label="password"
                  v-model="password"
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
      <b-carousel
        id="carousel-1"
        v-model="slide"
        :interval="4000"
        controls
        indicators
        background="#ababab"
        img-width="1024"
        img-height="480"
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

      <div class="col-md-12">
        <div class="row">
          <div class="col-md-6">
            <br />
            <h3 style="margin-top: 5px; color: #000; margin-bottom: 10px">
              Equipements
            </h3>
            <div v-if="hebergement.wifi == 1">
              <img loading="lazy" src="/wifi-etnafes.png" />
              Wi-Fi
            </div>
            <div v-else>
              <img loading="lazy" src="/wifi-etnafes.png" />
              <del>Wi-Fi</del>
            </div>
            <div v-if="hebergement.television == 1">
              <img loading="lazy" src="/tv-etnafes.png" />
              Télévision
            </div>
            <div v-else>
              <img loading="lazy" src="/tv-etnafes.png" />
              <del>&nbsp;Télévision</del>
            </div>

            <div v-if="hebergement.chauffage == 1">
              <img loading="lazy" src="/heating-etnafes.png" />
              Chauffage
            </div>

            <div v-else>
              <img loading="lazy" src="/heating-etnafes.png" />
              <del>&nbsp;Chauffage</del>
            </div>
            <div v-if="hebergement.cuisine == 1">
              <img loading="lazy" src="/kitchen-etnafes.png" />
              Cuisine
            </div>

            <div v-else>
              <img loading="lazy" src="/kitchen-etnafes.png" />
              <del>&nbsp;Cuisine</del>
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
              <img loading="lazy" src="/air-conditioner-etnafes.png" />
              Climatisation
            </div>

            <div v-else>
              <img loading="lazy" src="/air-conditioner-etnafes.png" />
              <del>&nbsp;Climatisation</del>
            </div>

            <div v-if="hebergement.eau_chaude == 1">
              <img loading="lazy" src="/water-heater-etnafes.png" />
              Eau Chaude
            </div>

            <div v-else>
              <img loading="lazy" src="/water-heater-etnafes.png" />
              <del>Eau Chaude</del>
            </div>

            <div v-if="hebergement.salle_de_bain == 1">
              <img loading="lazy" src="/bath-etnafes.png" />
              Salle de bain
            </div>

            <div v-else>
              <img loading="lazy" src="/bath-etnafes.png" />
              <del>&nbsp;Salle de bain</del>
            </div>

            <div v-if="hebergement.espace_travail_ordinateur == 1">
              <img loading="lazy" src="/computer-etnafes.png" />
              &nbsp;Espace de travail pour ordinateur
            </div>

            <div v-else>
              <img loading="lazy" src="/computer-etnafes.png" />
              <del>&nbsp;Espace de travail pour ordinateur</del>
            </div>

            <div v-if="hebergement.espace_enfant == 1">
              <img loading="lazy" src="/espace-enfant-etnafes.png" />
              &nbsp;Espace pour enfant
            </div>

            <div v-else>
              <img loading="lazy" src="/espace-enfant-etnafes.png" />
              <del>&nbsp;Espace pour enfant</del>
            </div>
          </div>
        </div>
      </div>
      <div class="container" v-if="loggedIn && user.role == 2">
        <h4 style="margin-top: 12px; color: #000">Donnez eervotre Avis</h4>
        <ValidationObserver>
          <form v-on:submit.prevent="addAvisHebergement()" class="mb-3">
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
                  style="border-radius: 18px 0px 18px 0px"
                  class="btn btn-outline-success mt-3"
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
        <h5 style="color: blue">{{ nbcomheb }} commentaires</h5>
        <br />

        <div class="row">
          <div
            class="col-md-12"
            v-for="avisheb in avishebergement"
            :key="'avisheb' + avisheb.id"
          >
            <div class="row">
              <div class="col-md-4">
                <img
                  loading="lazy"
                  :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_client/${avisheb.client.photo}`"
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
    <TopNavbarHome />
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
                <div style="color: red" v-if="error">{{ error }}</div>
              </div>
              <div class="form-group">
                <!--  <input
                  aria-label="password"
                  v-model="password"
                  class="form-control personalise"
                  placeholder="Mot de passe"
                  name="password"
                  type="password"
                  required
                /> -->
                <VuePassword
                  aria-label="password"
                  v-model="password"
                  placeholder="Mot de passe"
                  name="password"
                  type="password"
                  required
                />
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
    <!-- <div v-if="entercode==true">
      <b-modal id="modal-confirmernum" title="Confirmez votre numéro" v-model="entercode">
        <p>Saisissez le code que nous venons d'envoyer</p>
        <input
          type="number"
          placeholder="0000"
          v-on:change="onChange"
          v-on:complete="onComplete"
          v-model="client.code"
        />

        <button class="btn btn-success" v-b-modal.modal-login fill style="margin-left:10px">Envoyer</button>
        <br />

        <div class="alert alert-danger" role="alert" v-if="errorToken!=null">{{errorToken}}</div>
      </b-modal>
    </div>-->

    <b-modal
      id="modal-choix"
      title="Veuillez confirmer combien de personnes êtes-vous"
      class="modal-dialog modal-sm"
      v-if="showChoix == true"
    >
      <div>
        <b-tabs content-class="mt-3">
          <ValidationObserver>
            <div class="row">
              <div class="col-sm-12 col-xs-3">
                <div class="row">
                  <div class="col-md-2">
                    <div>
                      <label
                        style="color: #000; font-size: 13px; font-weight: bold"
                        >Ville :</label
                      >
                    </div>
                  </div>

                  <div class="col-md-9">
                    <div class="form-group">
                      <select
                        class="form-control personalise1"
                        v-model="pack.ville_id"
                        disabled
                        name="ville_id"
                      >
                        <option value disabled selected>
                          choisissez votre destination
                        </option>
                        <option
                          v-for="ville in villes"
                          v-bind:key="'vi' + ville.id"
                          v-bind:value="ville.id"
                        >
                          {{ ville.nom }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-sm-12 col-xs-3">
                <div class="row">
                  <div class="col-md-2">
                    <div>
                      <label
                        style="color: #000; font-size: 13px; font-weight: bold"
                        >Du :</label
                      >
                    </div>
                  </div>

                  <div class="col-md-9">
                    <div class="form-group">
                      <input
                        aria-label="date"
                        required
                        type="date"
                        class="form-control personalise1"
                        name="date_deb"
                        v-model="pack.date_deb"
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <div class="row">
                  <div class="col-md-2">
                    <div>
                      <label
                        style="color: #000; font-size: 13px; font-weight: bold"
                        >Adultes:</label
                      >
                    </div>
                  </div>

                  <div class="col-md-2">
                    <div class="form-group">
                      <input
                        aria-label="nb_adulte"
                        class="personalise1"
                        v-on:input="updateNbAdulte"
                        type="number"
                        min="1"
                        name="nb_adulte"
                        placeholder="  combien d'adultes"
                        required
                        v-model="nb_adulte"
                      />
                    </div>
                  </div>
                  <div class="col-md-2 offset-md-1">
                    <div>
                      <label
                        style="color: #000; font-size: 13px; font-weight: bold"
                        >Enfants:</label
                      >
                    </div>
                  </div>
                  <div class="col-md-2">
                    <div class="form-group">
                      <input
                        aria-label="nb_enfant"
                        class="personalise1"
                        v-on:input="updateNbEnfant"
                        type="number"
                        :min="agestab.length"
                        placeholder="  combien d'enfants"
                        name="nb_enfant"
                        required
                        v-model="nb_enfant"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-2" v-if="nb_enfant > 0">
                <div>
                  <label style="color: #000; font-size: 13px; font-weight: bold"
                    >Age Enfants:</label
                  >
                </div>
              </div>

              <div class="col-md-9" v-if="seenchoix || nb_enfant > 0">
                <div
                  class="form-group"
                  v-for="(age, index) in Number(this.nb_enfant)"
                  :key="'ag' + index"
                >
                  <select
                    class="form-control personalise1"
                    v-model="agestab[index]"
                    @change="addNewAge"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                  </select>
                  <img
                    loading="lazy"
                    style="margin-top: -20px"
                    src="/minus-etnafes.png"
                    v-on:click="removeAge(index)"
                  />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-3">
                <button
                  v-if="
                    !loggedIn && nb_enfant == agestab.length && nb_adulte != ''
                  "
                  class="btn btn-outline-success mt-3"
                  v-b-modal.modal-inscription
                  type="submit"
                  fill
                >
                  Envoyer
                </button>

                <router-link
                  :to="{
                    name: 'PaiementAgence',
                    params: { id: pack.id },
                    query: {
                       agence_id: pack.agence_id,
                      ville_id: pack.ville_id,
                      date_deb: pack.date_deb,
                      nb_adulte: nb_adulte,
                      nb_enfant: nb_enfant,
                      ages: agestab,
                    },
                  }"
                >
                  <button
                    class="btn btn-outline-success mt-3"
                    type="submit"
                    fill
                    v-if="
                      loggedIn && nb_enfant == agestab.length && nb_adulte != ''
                    "
                  >
                    Envoyer
                  </button>
                </router-link>
              </div>
            </div>
          </ValidationObserver>
        </b-tabs>
      </div>
    </b-modal>

    <b-modal
      id="modal-inscription"
      title="Voyageur"
      class="modal-dialog modal-sm"
      v-if="showinscri"
    >
      <div>
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
                        id="SelectRegion"
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
                      <li
                        v-bind:class="{ is_valid: contains_eight_characters }"
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
                        v-bind:class="{ is_valid: contains_special_character }"
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
                  <div class="col-md-3">
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
                    type="text"
                    v-model="email"
                    required
                  />
                  <div style="color: red" v-if="error">{{ error }}</div>
                </div>
                <div class="form-group">
                  <!-- <input
                    aria-label="password"
                    v-model="password"
                    class="form-control personalise"
                    placeholder="Mot de passe"
                    name="password"
                    type="password"
                    required
                  /> -->
                  <VuePassword
                    aria-label="password"
                    v-model="password"
                    placeholder="Mot de passe"
                    name="password"
                    type="password"
                    required
                  />
                </div>
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
      </div>
    </b-modal>
    <div class="container" style="margin-bottom: 70px; margin-top: 20px">
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
                      >Circuit expiré</span
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
                      >Nouveau circuit</span
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
                      >Circuit expiré</span
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
                      >Nouveau circuit</span
                    >
                  </h4>
                </div>
              </div>
            </div>
            <b-tabs content-class="mt-3" justified class="d-none d-lg-block">
              <b-tab no-body title="Photos">
                <div style="padding: 10px">
                  <!--  <vue-gallery-slideshow
                    style="posision: fixed"
                    :images="get_image_url"
                    index="0"
                    @close="index = null"
                  >
                  </vue-gallery-slideshow> -->
                  <lingallery
                    :iid.sync="currentId"
                    :width="600"
                    :height="400"
                    responsive="true"
                    :items="get_image_url"
                  />
                </div>
              </b-tab>

              <b-tab title="360°">
                <div class="d-none d-lg-block">
                  <div class="container" style="padding-bottom: 20px">
                    <center>
                      <h3
                        style="
                          line-height: 40px;
                          color: #000;
                          padding-top: 30px;
                        "
                      >
                        Virtual Reality 360°
                        <hr style="border-top: 2px solid #ff931f; width: 10%" />
                      </h3>
                    </center>
                    <div
                      class="row"
                      v-for="(zone, k) in pack.zone_pack"
                      :key="k"
                    >
                      <Vr360
                        v-if="zone.zone_touristique.images_zone360.length > 0"
                        style="width: 50vw; height: 35vh; padding-bottom: 20px"
                        class="col-md-4"
                        v-for="(image, l) in zone.zone_touristique
                          .images_zone360"
                        v-bind:key="l"
                        :imgSrc="`https://etnafes.com/zone360/${image.url_image}`"
                      />

                      <div
                        v-if="zone.zone_touristique.images_zone360.length == 0"
                      >
                        <center style="margin-left: 161px; line-height: 35px">
                          Aucune image en 360° correspond la zone de
                          {{ zone.zone_touristique.nom }}.
                        </center>
                      </div>
                    </div>
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
                  v-bind:key="'z' + zone.zone_touristique_id"
                >
                  <b-embed
                    v-if="!isHiddenpack && j == index1"
                    type="iframe"
                    aspect="16by9"
                    :src="zone.zone_touristique.url_video"
                    allowfullscreen
                  ></b-embed>
                </div>

                <b-embed
                  v-if="isHiddenpack && pack.url_video"
                  type="iframe"
                  aspect="16by9"
                  :src="pack.url_video"
                  allowfullscreen
                ></b-embed>
                <div class="row">
                  <div
                    class="col-md-4"
                    v-for="(zone, j) in pack.zone_pack"
                    v-bind:key="'zj' + zone.zone_touristique_id"
                  >
                    <span
                      onmouseover="this.style.cursor='pointer'"
                      style="color: #333; margin-top: 10px"
                      @click="(index1 = j), (isHiddenpack = false)"
                      >{{ zone.zone_touristique.nom }}</span
                    >
                    <p v-if="zone.zone_touristique.url_video == null">
                      Pas de vidéo disponible pour cette zone
                    </p>
                    <b-embed
                      v-if="zone.zone_touristique.url_video != null"
                      style="margin-top: 10px"
                      type="iframe"
                      aspect="16by9"
                      :src="zone.zone_touristique.url_video"
                      allowfullscreen
                    ></b-embed>
                  </div>
                </div>
              </b-tab>

              <b-tab title="Description" style="padding: 15px">
                <b-card-text>{{ pack.description }}</b-card-text>
                <br />
                <div v-for="(zone, i) in pack.zone_pack" v-bind:key="'zoo' + i">
                  <h4 style="color: #333">
                    <img
                      loading="lazy"
                      style="max-width: 2.5%"
                      draggable="false"
                      role="img"
                      class="emoji"
                      alt="👣"
                      src="https://s.w.org/images/core/emoji/13.0.1/svg/1f463.svg"
                    />
                    &nbsp;{{ zone.zone_touristique.nom }} :
                  </h4>
                  <b-card-text>
                    {{ zone.zone_touristique.description }}
                  </b-card-text>
                  <br />
                </div>
              </b-tab>

              <b-tab
                title="Programme"
                style="padding: 15px"
                v-if="programmespack.length > 0"
              >
                <div
                  v-for="(programme, ip) in pack.programmes"
                  v-bind:key="'p' + ip"
                >
                  <div class="jour">
                    <div class="jour-number">{{ ip + 1 }}</div>
                    <span class="qodef-line-between-icons">
                      <span class="qodef-line-between-icons-inner"></span>
                    </span>
                    <h4
                      class="jour-nom"
                      style="color: #333; margin-bottom: 0px"
                    >
                      Jour {{ ip + 1 }}: &nbsp;{{ programme.titre }}
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
                style="padding: 15px"
                id="test"
                v-if="pack.activite_id_principal != 3"
              >
                <div class="row" v-if="hebergementsp.length > 0">
                  <div
                    class="col-md-4"
                    v-for="hebergement in hebergementsp"
                    v-bind:key="'h' + hebergement.id"
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
                          <div
                            @click="
                              fetchHebergement(hebergement.hebergement.id)
                            "
                          >
                            <b-carousel-slide
                              id="carousellog"
                              v-b-modal.modal-hebergement
                              v-for="(imageheb, k) in hebergement.hebergement
                                .images_hebergement"
                              v-bind:key="'imheb' + k"
                              :img-src="`${apiDomain}/myapp/public/uploads/files_hebergement/${imageheb.url_image}`"
                            ></b-carousel-slide>
                          </div>
                        </b-carousel>
                      </div>

                      <div class="card-block">
                        <div style="padding-top: 10px">
                          <b>&nbsp;&nbsp;{{ hebergement.hebergement.nom }}</b>
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
                            {{ hebergement.hebergement.nbr_voyageurs }}
                            voyageurs
                            <span>.</span>
                            {{ hebergement.hebergement.nbr_chambre_dispo }}
                            chambre(s)
                          </small>
                          <hr style="margin-bottom: 0rem; margin-top: 0.5rem" />
                          <p class="card-text">
                            <small>
                              <span
                                v-if="
                                  hebergement.hebergement.salle_de_bain == 1
                                "
                              >
                                &nbsp;
                                <img
                                  loading="lazy"
                                  v-b-tooltip.hover
                                  title="Salle de bain"
                                  src="/bath-etnafes-21.png"
                                />
                                &nbsp;
                              </span>

                              <span
                                v-if="hebergement.hebergement.lave_linge == 1"
                              >
                                &nbsp;
                                <img
                                  loading="lazy"
                                  v-b-tooltip.hover
                                  title="Lave linge"
                                  src="/tumble-dry-etnafes-21.png"
                                />&nbsp;
                              </span>

                              <span
                                v-if="hebergement.hebergement.chauffage == 1"
                              >
                                &nbsp;
                                <img
                                  loading="lazy"
                                  v-b-tooltip.hover
                                  title="Chauffage"
                                  src="/heating-etnafes-21.png"
                                />&nbsp;
                              </span>
                              <span
                                v-if="hebergement.hebergement.television == 1"
                              >
                                &nbsp;
                                <img
                                  loading="lazy"
                                  v-b-tooltip.hover
                                  title="Television"
                                  src="/tv-etnafes-21.png"
                                />&nbsp;
                              </span>

                              <span
                                v-if="
                                  hebergement.hebergement.climatisation == 1
                                "
                              >
                                &nbsp;
                                <img
                                  loading="lazy"
                                  v-b-tooltip.hover
                                  title="Climatisation"
                                  src="/air-conditioner-etnafes-21.png"
                                />&nbsp;
                              </span>

                              <span
                                v-if="hebergement.hebergement.eau_chaude == 1"
                              >
                                &nbsp;
                                <img
                                  loading="lazy"
                                  v-b-tooltip.hover
                                  title="Eau chaude"
                                  src="/water-heater-etnafes-21.png"
                                />&nbsp;
                              </span>

                              <span
                                v-if="
                                  hebergement.hebergement
                                    .espace_travail_ordinateur == 1
                                "
                              >
                                &nbsp;
                                <img
                                  loading="lazy"
                                  v-b-tooltip.hover
                                  title="Espace de travail"
                                  src="/computer-etnafes-21.png"
                                />&nbsp;
                              </span>

                              <span
                                v-if="
                                  hebergement.hebergement.espace_enfant == 1
                                "
                              >
                                &nbsp;
                                <img
                                  loading="lazy"
                                  v-b-tooltip.hover
                                  title="Espace enfant"
                                  src="/espace-enfant-etnafes-21.png"
                                />&nbsp;
                              </span>

                              <span v-if="hebergement.hebergement.wifi == 1">
                                &nbsp;
                                <img
                                  loading="lazy"
                                  v-b-tooltip.hover
                                  title="WiFi"
                                  src="/wifi-etnafes-21.png"
                                />&nbsp;
                              </span>

                              <span v-if="hebergement.hebergement.cuisine == 1">
                                &nbsp;
                                <img
                                  loading="lazy"
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
                          >&nbsp;{{ hebergement.hebergement.adresse }}.</span
                        >
                      </div>

                      <router-link
                        :to="`/detailshebergement/${hebergement.hebergement.id}`"
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

                <div class="row" v-if="hebergementsp.length == 0">
                  <div class="col-md-12">
                    <p>Ce circuit est sans logement.</p>
                  </div>
                </div>
              </b-tab>

              <!-- <b-tab 
                title="Restaurants"
                style="padding: 15px"
                v-if="pack.activite_id_principal != 3"
              >
                <div
                  style="margin-bottom: 25px"
                  class="row"
                  v-for="(v, sorted) in sortedVille"
                  v-bind:key="sorted"
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
              </b-tab> -->

              <b-tab
                title="Artisans"
                style="padding: 15px"
                v-if="pack.activite_id_principal != 3"
              >
                <vueper-slides
                  style="margin-left: 30px !important ; margin-top: -5px"
                  duration="3000"
                  class="no-shadow"
                  :visible-slides="4"
                  slide-multiple
                  :gap="3"
                  :slide-ratio="1 / 5"
                  :dragging-distance="200"
                  :breakpoints="{ 800: { visibleSlides: 2, slideMultiple: 2 } }"
                >
                  <vueper-slide
                    v-for="(pack, i) in get_produit"
                    v-bind:key="i"
                    class="image_slider_home"
                  >
                    <template #content>
                      <div
                        class="card"
                        style="
                          margin-bottom: 30px;

                          padding: 10px;
                          height: 300px !important;
                          background: #f6f6f6;
                        "
                      >
                        <router-link
                          :to="{
                            name: 'DetailsProduit',
                            params: { id: pack.id },
                          }"
                        >
                          <div>
                            <img
                              loading="lazy"
                              style="
                                margin-top: -8px;
                                margin-left: -6px;

                                max-width: 105%;
                              "
                              :src="`${apiDomain}/myapp/public/uploads/files_produits_zones/${pack.image_couverture}`"
                              alt="etnafes-tn-travel-circuits"
                            />
                          </div>
                        </router-link>
                        <div>
                          <span>
                            <!-- aime -->
                            <button
                              title=" Ajouter à vos favoris ?"
                              class="
                                top-right
                                btn btn-primary btn-round btn-icon
                                NotFav
                              "
                            >
                              <i
                                class="tim-icons icon-heart-2"
                                style="vertical-align: middle"
                              ></i>
                            </button>

                            <span class="top-left">
                              <img
                                loading="lazy"
                                src="/home/hebergement/etnafes-tn-travel-avis.png"
                                style="width: 19px"
                              />
                            </span>
                          </span>
                        </div>
                        <!-- <div>
                      <div
                        class="bottom-right"
                        style="background-color: rgb(40, 179, 81); color: #fff"
                      >
                        Nouveau produit
                      </div>
                      <div
                        class="bottom-right"
                        style="background-color: grey; color: #fff"
                      >
                        Expiré
                      </div>
                    </div> -->
                        <div>
                          <div class="prix_heb">
                            <span class="item-prix">
                              <sup>DT</sup>
                              {{ pack.prix }}
                              <!-- <sub>/Personne</sub> -->
                            </span>
                          </div>
                          <h4
                            class="card-title"
                            style="
                              font-size: 16px;
                              line-height: 2px;
                              margin-top: 12px;
                            "
                          >
                            <span v-if="pack.titre.length < 20">
                              {{ pack.titre }}
                            </span>
                            <span v-else>
                              {{ pack.titre.substr(0, 20) + "..." }}
                            </span>
                          </h4>
                        </div>

                        <div class="row">
                          <div
                            class="col"
                            style="
                              margin-left: 0px;
                              margin-top: 0px;
                              font-size: 14px;
                            "
                          >
                            <!-- {{ pack.description }} -->

                            <span style="margin-left: -2px">
                              <img
                                loading="lazy"
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABkklEQVRIie3VP2tTURzG8e9zcjXiVFeHqmkQmjj45w0kcSgigg6+A0cVFN+Ce5cKKgjiKC6dJdk6ikMTWkhTiCCIoI4mNudxiLcmCi49ZrrP9Ht+XM6HA/dyoUiRIomifGg0Gtnws+5hXUcsJRPMR8Or/V779ew6y4cPn8ITxJqsDRS/JYOlZcyLlXrz1F6382wOPnuxseQxdwLhisPk5LFJ2IlxosnxcH5vu711VHul3hzaegQcwgEgG4UKoH7v7XvHsD6Sb/0ohZuOrB8VBbD8DqjO7jIA20ICMMEKOEyLQgpYB7LD7/cJft34f0eB7wCVWsuVWmtzYXC/1+kGfEHiMeL0wuAcBw/zvjD4zywMrtaaddBy3rN/PZwSjWgbg2BzYbAjJwgw6LUPP6kMQJI97SLKEeK0yEngzCLOn5UBHJTjIIyDq6utSzHoQWk03gWI5fJOCljWZUN/bpcP52pXn4p4DWlD+GsKEABzxui+xcP9bvv5XzDcLlVWv9xFvpH6t4j8ctDtvEl2ZpEiRWbzE2XXiySPB0bsAAAAAElFTkSuQmCC"
                              />
                              Quantité:{{ pack.qts }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </template>
                  </vueper-slide>
                </vueper-slides>

                <div class="row" v-if="restaurants.length == 0">
                  <div class="col-md-12">
                    <p>Pas de restaurants disponibles pour cette ville.</p>
                  </div>
                </div>
              </b-tab>

              <b-tab title="Assurance" style="padding: 15px">
                <b-card-text>Frais d'assurance</b-card-text>
              </b-tab>
            </b-tabs>

            <!-- collapse mobile -->

            <div
              id="app"
              class="container d-lg-none"
              style="margin-bottom: 10px"
            >
              <div>
                <div class="row" style="background: #222a42; color: #fff">
                  <div class="col">
                    <label style="color: #fff; padding: 5px !important"
                      >Photos</label
                    >
                  </div>

                  <div class="col">
                    <i
                      v-if="visible == false"
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

                    <i
                      v-if="visible == true"
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
                      class="tim-icons icon-simple-delete"
                    >
                    </i>
                  </div>
                </div>

                <b-collapse
                  id="collapse-1"
                  v-model="visible"
                  style="margin-top: 20px"
                >
                  <lingallery
                    :iid.sync="currentId"
                    :width="600"
                    :height="400"
                    responsive="true"
                    :items="get_image_url"
                  />

                  <!-- <slider :autoplay="false" autoplayTimeout="100000">
                    <slider-item
                      v-for="(i, index) in get_image"
                      :key="index"
                      :style="i"
                    >
                      <img loading="lazy"
                        :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_zones/${i}`"
                      />
                    </slider-item>
                  </slider> -->
                </b-collapse>
              </div>
            </div>

            <div
              id="app"
              style="margin-bottom: 10px"
              class="container d-lg-none"
              v-if="pack.url_video != null"
            >
              <div
                class="row"
                style="background: #222a42; color: #fff; margin-top: -15px"
              >
                <div class="col">
                  <label style="color: #fff; padding: 5px !important"
                    >Vidéos</label
                  >
                </div>

                <div class="col">
                  <i
                    v-if="visible1 == false"
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

                  <i
                    v-if="visible1 == true"
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
                    class="tim-icons icon-simple-delete"
                  >
                  </i>
                </div>
              </div>

              <b-collapse
                id="collapse-1"
                v-model="visible1"
                style="margin-top: 20px"
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
              </b-collapse>
            </div>

            <div
              id="app"
              class="container d-lg-none"
              style="margin-bottom: 10px"
            >
              <div
                class="row"
                style="background: #222a42; color: #fff; margin-top: -15px"
              >
                <div class="col">
                  <label style="color: #fff; padding: 5px !important"
                    >Description</label
                  >
                </div>

                <div class="col">
                  <i
                    v-if="visible2 == false"
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

                  <i
                    v-if="visible2 == true"
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
                    class="tim-icons icon-simple-delete"
                  >
                  </i>
                </div>
              </div>

              <b-collapse
                id="collapse-1"
                v-model="visible2"
                style="margin-top: 20px"
              >
                <b-card-text>{{ pack.description }}</b-card-text>
                <br />

                <div v-for="(zone, i) in pack.zone_pack" v-bind:key="'zz2' + i">
                  <h4 style="color: #333">
                    <img
                      loading="lazy"
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
              style="margin-bottom: 10px"
              v-if="programmespack.length > 0"
            >
              <div
                class="row"
                style="background: #222a42; color: #fff; margin-top: -15px"
              >
                <div class="col">
                  <label style="color: #fff; padding: 5px !important"
                    >Programme</label
                  >
                </div>

                <div class="col">
                  <i
                    v-if="visible3 == false"
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

                  <i
                    v-if="visible3 == true"
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
                    class="tim-icons icon-simple-delete"
                  >
                  </i>
                </div>
              </div>

              <b-collapse
                id="collapse-1"
                v-model="visible3"
                style="margin-top: 20px"
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
              </b-collapse>
            </div>

            <div
              id="app"
              style="margin-bottom: 10px"
              class="container d-lg-none"
              v-if="hebergementpack.length > 0"
            >
              <div
                class="row"
                style="background: #222a42; color: #fff; margin-top: -15px"
              >
                <div class="col">
                  <label style="color: #fff; padding: 5px !important"
                    >Logements</label
                  >
                </div>

                <div class="col">
                  <i
                    v-if="visible4 == false"
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

                  <i
                    v-if="visible4 == true"
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
                    class="tim-icons icon-simple-delete"
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
                              <img
                                loading="lazy"
                                v-b-tooltip.hover
                                title="Salle de bain"
                                src="/bath-etnafes-21.png"
                              />
                              &nbsp;
                            </span>

                            <span v-if="heb.hebergement.lave_linge == 1">
                              &nbsp;
                              <img
                                loading="lazy"
                                v-b-tooltip.hover
                                title="Lave linge"
                                src="/tumble-dry-etnafes-21.png"
                              />&nbsp;
                            </span>

                            <span v-if="heb.hebergement.chauffage == 1">
                              &nbsp;
                              <img
                                loading="lazy"
                                v-b-tooltip.hover
                                title="Chauffage"
                                src="/heating-etnafes-21.png"
                              />&nbsp;
                            </span>
                            <span v-if="heb.hebergement.television == 1">
                              &nbsp;
                              <img
                                loading="lazy"
                                v-b-tooltip.hover
                                title="Television"
                                src="/tv-etnafes-21.png"
                              />&nbsp;
                            </span>

                            <span v-if="heb.hebergement.climatisation == 1">
                              &nbsp;
                              <img
                                loading="lazy"
                                v-b-tooltip.hover
                                title="Climatisation"
                                src="/air-conditioner-etnafes-21.png"
                              />&nbsp;
                            </span>

                            <span v-if="heb.hebergement.eau_chaude == 1">
                              &nbsp;
                              <img
                                loading="lazy"
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
                              <img
                                loading="lazy"
                                v-b-tooltip.hover
                                title="Espace de travail"
                                src="/computer-etnafes-21.png"
                              />&nbsp;
                            </span>

                            <span v-if="heb.hebergement.espace_enfant == 1">
                              &nbsp;
                              <img
                                loading="lazy"
                                v-b-tooltip.hover
                                title="Espace enfant"
                                src="/espace-enfant-etnafes-21.png"
                              />&nbsp;
                            </span>

                            <span v-if="heb.hebergement.wifi == 1">
                              &nbsp;
                              <img
                                loading="lazy"
                                v-b-tooltip.hover
                                title="WiFi"
                                src="/wifi-etnafes-21.png"
                              />&nbsp;
                            </span>

                            <span v-if="heb.hebergement.cuisine == 1">
                              &nbsp;
                              <img
                                loading="lazy"
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

            <div
              id="app"
              class="container d-lg-none"
              style="margin-bottom: 10px"
            >
              <div
                class="row"
                style="background: #222a42; color: #fff; margin-top: -15px"
              >
                <div class="col">
                  <label style="color: #fff; padding: 5px !important"
                    >Restaurants</label
                  >
                </div>

                <div class="col">
                  <i
                    v-if="visible5 == false"
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

                  <i
                    v-if="visible5 == true"
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
                    class="tim-icons icon-simple-delete"
                  >
                  </i>
                </div>
              </div>

              <b-collapse
                id="collapse-1"
                v-model="visible5"
                style="margin-top: 20px"
              >
                <div
                  style="margin-bottom: 25px"
                  class="row"
                  v-for="(v, index) in ville_pack"
                  v-bind:key="index"
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
                style="background: #222a42; color: #fff; margin-top: -15px"
              >
                <div class="col">
                  <label style="color: #fff; padding: 5px !important"
                    >Assurance</label
                  >
                </div>

                <div class="col">
                  <i
                    v-if="visible6 == false"
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

                  <i
                    v-if="visible6 == true"
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
                    class="tim-icons icon-simple-delete"
                  >
                  </i>
                </div>
              </div>

              <b-collapse
                id="collapse-1"
                v-model="visible6"
                style="margin-top: 20px"
              >
                <b-card-text>Frais d'assurance</b-card-text>
              </b-collapse>
            </div>
            <div
              class="col-md-3 d-none d-lg-block"
              style="margin-bottom: 10px; margin-top: 10px"
            >
              <b-button-group>
                <button
                  v-if="
                    !loggedIn &&
                    pack.date_deb > new Date().toISOString().split('T')[0] &&
                    pack.nb_place_dispo != 0
                  "
                  class="btn btn-outline-success mt-3"
                  style="border-radius: 6px 6px 6px 6px; margin-left: 20px"
                  v-b-modal.modal-inscription-paiement-ligne
                  type="submit"
                  fill
                >
                  Je passe au Paiement >
                </button>

                <button
                  v-if="
                    pack.date_deb < new Date().toISOString().split('T')[0] ||
                    pack.nb_place_dispo == 0
                  "
                  class="btn btn-outline-success mt-3"
                  style="
                    border-radius: 6px 6px 6px 6px;
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
                       agence_id: pack.agence_id,
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
                      pack.date_deb >= new Date().toISOString().split('T')[0] &&
                      pack.nb_place_dispo != 0
                    "
                    style="border-radius: 6px 6px 6px 6px; margin-left: 20px"
                  >
                    <span style="font-size: 12px; color: #fff">
                      Je passe au Paiement >
                      <br />
                    </span>
                  </b-button>

                  <!-- invitation personne -->
                  <!-- <div>
                    <input type="text" v-model="message" />
                    <button
                      type="button"
                      v-clipboard:copy="message"
                      v-clipboard:success="onCopy"
                      v-clipboard:error="onError"
                    >
                      <img
                        style="margin-top: -70px; margin-left: 143px"
                        src="/copy/etnafes-tourisme-copyy.png"
                      />
                    </button>
                  </div> -->
                </router-link>

           <!--      <button
                  v-if="
                    !loggedIn &&
                    pack.date_deb > new Date().toISOString().split('T')[0] &&
                    pack.nb_place_dispo != 0
                  "
                  class="btn btn-outline-success mt-3"
                  style="border-radius: 6px 6px 6px 6px; margin-left: 20px"
                  v-b-modal.modal-inscription-paiement-ligne
                  type="submit"
                  fill
                >
                  Invité personne
                </button>
                <button
                  v-if="
                    loggedIn &&
                    pack.date_deb > new Date().toISOString().split('T')[0] &&
                    pack.nb_place_dispo != 0
                  "
                  class="btn btn-outline-success mt-3"
                  style="border-radius: 6px 6px 6px 6px; margin-left: 20px"
                  v-b-modal.modal-invitation
                  type="submit"
                  fill
                >
                  Invité personne
                </button> -->
              </b-button-group>
            </div>
          </b-card>
        </div>
        <b-modal v-if="loggedIn"
          style="margin-top: 74px !important"
          id="modal-invitation"
          :user="'user'"
          :title="user.nom + ' ' + user.prenom"
        >
          <form class="mb-3">
            <div class="row m-0" style="padding: 10px">
              <span style="color: #333">
                - Invité un(e) personne <br />
                - Gagnier 2000 DT a votre compte sur chaque réservation réussite
                de votre part.
              </span>
            </div>
            <div class="row m-0">
              <div class="col-lg-11 col-md-12 col-xl-11" style="padding: 10px">
                <input disabled type="text" v-model="code" />
              </div>

              <div class="col-lg-1 col-md-12 col-xl-1">
                <button
                  title="Copié code"
                  type="button"
                  v-clipboard:copy="code"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError"
                >
                  <img
                    style="margin: 10px 0 10px 0px"
                    @click="ajouter_invitation_copied"
                    src="/copy/etnafes-tourisme-copy.png"
                  />
                </button>
              </div>
            </div>
          </form>
        </b-modal>
        <div class="col-md-4" id="map" ref="map">
          <br />
          <div class="d-none d-lg-block">
            <center>
              <button
                v-if="
                  !loggedIn &&
                  pack.date_deb >= new Date().toISOString().split('T')[0] &&
                  pack.nb_place_dispo != 0
                "
                class="btn btn-outline-success mt-3"
                style="
                  margin-left: 20px;
                  margin-top: -9px !important;
                  margin-bottom: 12px;
                "
                v-b-modal.modal-inscription-paiement-ligne
                type="submit"
                fill
              >
                Je passe au Paiement >
              </button>

              <button
                v-if="
                  pack.date_deb < new Date().toISOString().split('T')[0] ||
                  pack.nb_place_dispo == 0
                "
                class="btn btn-outline-success mt-3"
                style="
                  color: #fff;
                  margin-left: 20px;
                  margin-top: -9px !important;
                  margin-bottom: 12px;
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
                      agence_id: pack.agence_id,
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
                    pack.date_deb >= new Date().toISOString().split('T')[0]
                  "
                  style="
                    margin-left: 20px;
                    margin-top: -9px !important;
                    margin-bottom: 12px;
                  "
                >
                  <span style="font-size: 12px; color: #fff">
                    Je passe au Paiement >
                    <br />
                  </span>
                </b-button>
              </router-link>
            </center>
          </div>
          <gmap-map
            class="d-none d-lg-block"
            :center="center"
            :zoom="11"
            style="width: 100%; height: 830px"
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

            <!-- <GmapMarker
              icon="/Etnafes-icon-femme artisanne.png"
              v-for="(zo, index) in markersfemme"
              :key="'zo' + index"
              :position="zo.position"
              @click="
                toggleInfoWindow(zo, index);
                fetchImages(zo.position.idz);
              "
            ></GmapMarker> -->

            <GmapMarker
              icon="/Etnafes-icon-femme artisanne.png"
              v-for="(zo, index) in markersfemmeZones"
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

        <div class="container" v-if="calculMoyenne[0] != 0">
          <hr />
          <br class="d-none d-lg-block" />
          <h5>
            <span style="color: #000" v-if="calculMoyenne[0] != 0">
              {{ (calculMoyenne / nbcom).toFixed(2) }}
            </span>
            <img
              loading="lazy"
              v-if="calculMoyenne[0] != 0"
              src="/star-etnafes.png"
              style="margin-top: -3px"
            />&nbsp;
            <span v-if="calculMoyenne[0] != 0" style="color: #000"
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
                  <img
                    loading="lazy"
                    style="
                      max-width: 70% !important;
                      border-radius: 5.2857rem !important;
                    "
                    :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_client/${avispack.client.photo}`"
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
            <div class="row" style="margin-top: -11px">
              <div
                class="col-md-12 d-lg-none"
                v-for="avispack in filteredavispack"
                :key="'avispack' + avispack.id"
              >
                <center>
                  <div class="row">
                    <div class="col-2 offset-1">
                      <img
                        loading="lazy"
                        width="100% !important"
                        style="border-radius: 5.2857rem !important"
                        :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_client/${avispack.client.photo}`"
                      />
                    </div>

                    <div class="col-6">
                      <span style="margin-left: 5px">
                        {{ avispack.client.nom }}
                        {{ avispack.client.prenom }}</span
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

        <div
          class="container"
          v-if="
            loggedIn && pack.date_deb < new Date().toISOString().split('T')[0]
          "
        >
          <br />
          <br />
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
                  <button
                    class="btn btn-outline-success mt-3"
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
      </div>
    </div>
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
            !loggedIn &&
            pack.date_deb >= new Date().toISOString().split('T')[0] &&
            pack.nb_place_dispo != 0
          "
          class="btn btn-info btn-block"
          v-b-modal.modal-inscription-paiement-ligne
          type="submit"
          fill
        >
          Je passe au Paiement >
        </button>

        <b-button
          v-if="
            pack.date_deb < new Date().toISOString().split('T')[0] ||
            pack.nb_place_dispo == 0
          "
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
               agence_id: pack.agence_id,
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
              pack.date_deb >= new Date().toISOString().split('T')[0] &&
              pack.nb_place_dispo != 0
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
import Vr360 from "vue-360vr";
import Vue from "vue";
import MapMarker from "../components/MapMarker";
import MapInfoWindow from "../components/MapInfoWindow";
import axios from "axios";
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
import TopNavbarHome from "./Layout/TopNavbarHome.vue";
import Footer from "./Layout/Footer.vue";
import { apiDomain } from "../config";
import InfoDepanneur from "./InfoDepanneur.vue";
import { ValidationProvider } from "vee-validate";
import { extend } from "vee-validate";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import HighlightWords from "vue-highlight-words";
import StrongProps from "../components/StrongProps";
import StrongSlot from "../components/StrongSlot";
import VuePassword from "vue-password";
import VueGallerySlideshow from "vue-gallery-slideshow";
import Lingallery from "lingallery";

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
    Lingallery,

    VuePassword,
    ValidationProvider,
    TopNavbarHome,
    Footer,
    VueperSlides,
    VueperSlide,
    "info-content": InfoDepanneur,
    MapMarker,
    MapInfoWindow,
    PulseLoader,
    HighlightWords,
    VueGallerySlideshow,
    Vr360,
  },

  data() {
    return {
      message: "Copy These Text",
      programmespack: [],
      hebergementpack: [],
      isHidden22: true,

      visible: false,
      visible1: false,
      visible2: false,

      visible3: false,
      visible4: false,
      visible5: false,
      visible6: false,
      avishebergement: [],
      avisheb: {},
      nbr_etoile: "",
      nbcomheb: "",
      restaurant: {},
      hebergementid: "",
      agestab: this.$route.query.ages ? this.$route.query.ages : [],
      loadingInscription: false,
      isLoadingVerifEmail: false,
      showChoix: true,
      errors: [],
      token: "",
      tokenVerifEmail: "",
      password_length: 0,
      contains_eight_characters: false,
      contains_number: false,
      contains_uppercase: false,
      contains_special_character: false,
      password: null,
      valid_password: false,
      villespays: {},
      villes: {},
      valide_email: false,
      showinscri: true,
      login: false,
      ville: [],
      seenchoix: false,
      entercode: false,
      client: {
        /*   code: "", */
      },

      nom: "",
      email: "",
      telephone: "",
      civilité: "",
      gouvernorat: "",
      error: "",
      pays_id: "",
      pays: {},
      search: "",
      strongProps: StrongProps,
      strongSlot: StrongSlot,
      nbcom: "",
      nbcomheb: "",
      avispack: [],
      load: false,
      loadheb: false,
      avis: {},
      validationErrors: {},
      restaurants: {},
      isHiddenzone: true,
      isHiddenpack: true,

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
      markersfemmeZones: [],
      markersfemme: [],

      places: [],
      currentPlace: null,

      nb_adulte: 1,
      nb_enfant: 0,
      hebergement: {},

      apiDomain: "https://etnafesapi20212018.etnafes.com",
      packsvedette: [],
      hebergements: {},
      hebergementsp: [],
      ville_pack: [],

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
      errorToken: null,
      ages: [],
    };
  },

  created() {
    this.fetchVilles();
    this.fetchPays();
    this.fetchPacks(this.$route.params.id);
    this.fetchAvisPack(this.$route.params.id);

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
      this.markersfemme = data.markersfemme;
      if (this.markersfemme.length > 0) {
        this.center = data.markersfemme[0].position;
      }
    });

    Bus.$on("marker_result_clicked", (index) => {
      let targetMarker = this.markersfemme[index];
      this.center = targetMarker.position;
      this.toggleInfoWindow(targetMarker, index);
    });

    //femmes selon zones

    Bus.$on("markers_fetched", (data) => {
      this.markersfemmeZones = data.markersfemmeZones;
      if (this.markersfemmeZones.length > 0) {
        this.center = data.markersfemmeZones[0].position;
      }
    });

    Bus.$on("marker_result_clicked", (index) => {
      let targetMarker = this.markersfemmeZones[index];
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

  computed: {
    get_produit() {
      var result = [];
      var moyenne = "";

      const res = this.pack.zone_pack;
      for (var i = 0; i < res.length; i++) {
        for (var m = 0; m < res[i].zone_touristique.produit.length; m++) {
          moyenne = res[i].zone_touristique.produit[m];
          result.push(moyenne);
        }
      }

      return result;
    },
    get_image_url() {
      var result = [];
      var moyenne = "";

      const res = this.pack.zone_pack;
      for (var i = 0; i < res.length; i++) {
        for (var m = 0; m < res[i].zone_touristique.image.length; m++) {
          moyenne =
            "https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_zones/" +
            res[i].zone_touristique.image[m].url_image;
          // result.push(moyenne);
          result.push({ src: moyenne, thumbnail: moyenne });
        }
      }

      return result;
    },
    get_image() {
      var result = [];
      var moyenne = "";

      const res = this.pack.zone_pack;
      for (var i = 0; i < res.length; i++) {
        for (var m = 0; m < res[i].zone_touristique.image.length; m++) {
          moyenne = res[i].zone_touristique.image[m].url_image;
          result.push(moyenne);
        }
      }

      return result;
    },
    sortedVille() {
      var obj = {};
      var k = 0;

      for (var i = 0, len = this.ville_pack.length; i < len; i++)
        obj[this.ville_pack[i]["ville_id"]] = this.ville_pack[i];

      this.ville_pack = new Array();
      for (var key in obj) this.ville_pack.push(obj[key]);
      return obj;
    },
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
    agesForm() {
      const ages = this.ages;
      var result = [];
      if (ages.length != 0) {
        for (var i = 0; i < ages.length - 1; i++) {
          result.push(ages[i]);
        }
      }
      return result;
    },
    enfants: {
      get() {
        return this.$store.state.nb_enfant;
      },
      set(value) {
        this.$store.commit("updateNbEnfant", value);
      },
    },

    adultes: {
      get() {
        return this.$store.state.nb_adulte;
      },
      set(value) {
        this.$store.commit("updateNbAdulte", value);
      },
    },
    hebergement_id: {
      get() {
        return this.$store.state.hebergement_id;
      },
      set(value) {
        this.$store.commit("updateHebergementid", value);
      },
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

    code() {
      return (
        "https://etnafes.com/invitation/pack/" +
        this.$route.params.id +
        "?sender_id=" +
        this.user.id +
        "&pack_id=" +
        this.$route.params.id +
        "/" +
        this.user.nom
      );
    },
  },
  methods: {
    ajouter_invitation_copied() {
      axios
        .post(`${apiDomain}/api/ajouter_invitation_copied`, {
          sender_id: this.$store.state.user.id,
          pack_id: this.$route.params.id,
          code: this.code,

          headers: {
            "content-type": "application/json",
          },
        })
        .then((response) => {
          this.$noty.success("code copié.");
          window.location.reload();
          /*   if (response.status == 200) {
            if (confirm("avis bien reçu")) {
                this.$noty.success("code code copié.");
              window.location.reload();
            }
          } */
        })
        .catch((error) => {
          if (error.response && error.response.status == 400) {
            this.validationErrors = error.response.data;
          }
        });
    },

    ajouter_invitation_copied2(e) {
      this.loading = true;
      var formData = new FormData(e.target);
      formData.append("sender_id", this.user.id);
      formData.append("pack_id", this.$router.params.id);
      formData.append("code", this.code);

      /*   formData.append("adresse", this.zone.adresse.formatted_address);
      formData.append("latitude", this.zone.center.lat);
      formData.append("longitude", this.zone.center.lng); */

      axios
        .post(`${apiDomain}/api/ajouter_invitation_copied`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          this.$noty.success("code code copié.");
        })
        .catch((error) => {
          if (error.response && error.response.status == 400) {
            this.validationErrors = error.response.data;
          }
        });
    },
    onCopy: function (e) {
      // this.ajouter_invitation_copied();
      alert("Tu viens de copier: " + e.text);
      /* this.$noty.success("code code copié."); */
    },
    onError: function (e) {
      alert("Échec de la copie des textes");
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
              date_deb: this.pack.date_deb,
              nb_adulte: 1,
              nb_enfant: 0,
            },
          });
        })
        .catch((err) => {
          this.error = "Email ou mot de passe incorrect.";
          console.log(err.message);
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
    fetchHebergement(id) {
      fetch(`${apiDomain}/api/hebergement/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.hebergement = res.hebergement;
          this.imagehebergements = res.hebergement.images_hebergement;
          this.hebergementid = res.hebergement.id;
        })
        .catch((err) => console.log(err));
    },
    removeAge: function (index) {
      Vue.delete(this.agestab, index);
      this.nb_enfant = this.nb_enfant - 1;
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
    fetchVillesPays(id) {
      axios
        .get(`${apiDomain}/api/pays/villes/${id}`)
        .then(({ data }) => (this.villespays = data.villes));
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
              ville_id: this.pack.ville_id,
              date_deb: this.pack.date_deb,
              /* nb_adulte: this.$store.state.nb_adulte,
              nb_enfant: this.$store.state.nb_enfant, */
              nb_adulte: this.nb_adulte,
              nb_enfant: this.nb_enfant,
              // ages: this.ages
              ages: this.agestab,
            },
          });
        })
        .catch((err) => {
          this.error =
            "L’e-mail entré ne correspond à aucun compte. Veuillez créer un compte.";
          console.log(err.message);
        });
    },
    fetchVilles() {
      axios
        .get(`${apiDomain}/api/villes`)
        .then(({ data }) => (this.villes = data));
    },
    addNewAge: function () {
      this.ages.push(Vue.util.extend({}, this.age));
    },
    updateNbEnfant(e) {
      this.seenchoix = true;
      this.$store.commit("updateNbEnfant", e.target.value);
    },

    updateNbAdulte(e) {
      this.$store.commit("updateNbAdulte", e.target.value);
    },
    onChange(v) {
      console.log("onChange ", v);
    },
    onComplete(v) {
      console.log("onComplete ", v);
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

          /*  this.$router.push({
            name: "client",
            params: { id: this.$route.params.id },
            query: {
              date_deb: this.pack.date_deb,
              nb_adulte: 1,
              nb_enfant: 0,
            },
          }); */

          this.$router.push({
            name: "PaiementPack",
            params: { id: this.$route.params.id },
            query: {
              date_deb: this.pack.date_deb,
              nb_adulte: 1,
              nb_enfant: 0,
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
    addClient_____() {
      this.entercode = false;
      this.loadingInscription = true;
      axios
        .post(`${apiDomain}/api/register/client`, {
          nom: this.client.nom,
          prenom: this.client.prenom,
          telephone: this.client.telephone,
          email: this.client.email,
          login: this.client.login,
          civilité: this.civilité,
          password: this.password,
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
              (this.showChoix = false),
              this.$noty.success("veuillez vérifier votre compte.");
          }
        })
        .catch((error) => {
          if (error.response && error.response.status == 400) {
            this.validationErrors = error.response.data;
          }
        });
    },
    fetchPays() {
      axios.get(`${apiDomain}/api/pays`).then(({ data }) => (this.pays = data));
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

    fetchAllAvisPack(id) {
      this.load = true;
      axios
        .get(`${apiDomain}/api/avispack/all/${id}`)
        .then(({ data }) => ((this.avispack = data.pack), (this.load = false)));
    },

    fetchAvisPack(id) {
      axios
        .get(`${apiDomain}/api/avispack/${id}`)
        .then(
          ({ data }) => ((this.avispack = data.pack), (this.nbcom = data.nbcom))
        );
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
    fetchRestaurant(id) {
      fetch(`${apiDomain}/api/restaurant/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.restaurant = res.restaurant;
          this.restaurantid = res.restaurant.id;
        })
        .catch((err) => console.log(err));
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

    fetchLogements(id) {
      axios
        .get(`${apiDomain}/api/hebergements/ville/${id}`)
        .then(({ data }) => (this.hebergements = data.hebergements));
    },

    /* fetchPacks(id) {
      axios
        .get(`${apiDomain}/api/packs/${id}`)
        .then(
          ({ data }) => (
            (this.pack = data.packdetail),
            (this.hebergementsp = data.packdetail.hebergement_pack),
            (this.ville_pack = data.packdetail.ville_pack)
          )
        );
    }, */

    fetchPacks(id) {
      axios
        .get(`${apiDomain}/api/packs/${id}`)
        .then(
          ({ data }) => (
            (this.pack = data.packdetail),
            (this.programmespack = data.packdetail.programmes),
            (this.hebergementpack = data.packdetail.hebergement_pack),
            (this.ville_pack = data.villepacknajeh)
          )
        );
    },
  },
};
</script>