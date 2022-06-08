<template>
  <div>
    <TopNavbarHome />
    <vue-headful
      title="Etnafes-Tourisme et attractions locales"
      image="https://etnafes.com/images/foret-etnafes-voyage111.jpg"
    />
   <!--  <h2>Sticky Element: Scroll Down to See the Effect</h2>
<p>Scroll down this page to see how  sticky positioning works.</p>
<div class="sticky">I will stick to the screen when you reach my scroll position</div> -->
    <div v-if="login == true">
      <b-modal id="modal-login" v-model="login">
        <div>
          <form
            accept-charset="UTF-8"
            role="form"
            @submit.prevent="performLogin"
          >
            <fieldset>
              Se connecter
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
              <!-- <div class="checkbox">
                <label>
                  <input name="remember" type="checkbox" value="Remember Me" /> Remember Me
                </label>
              </div>-->
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
          style="margin-left: 10px; border-radius: 18px 0px 18px 0px"
        >
          Envoyer
        </button>
        <br />

        <div class="alert alert-danger" role="alert" v-if="errorToken != null">
          {{ errorToken }}
        </div>
      </b-modal>
    </div>
    <b-modal id="modal-inscription" class="modal-dialog modal-sm">
      <div>
        <b-tabs content-class="mt-3">
          <b-tab title="Inscription" active v-if="!loggedIn && showinscri">
            <ValidationObserver>
              <form v-on:submit.prevent="addClient()" class="mb-3">
                <!-- <h1 style="color:#333">Send an sms</h1> -->
                <div class="row">
                  <div class="col-md-6">
                    <ValidationProvider
                      name="nom"
                      rules="required|alpha"
                      v-slot="{ errors }"
                    >
                      <div class="form-group">
                        <!-- <label>Nom</label> -->
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
                        <!-- <label>Prenom</label> -->
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
                  <!-- <span class="message">{{errors[0]}}</span> -->
                  <p v-if="validationErrors.password">
                    <span class="alert-link"
                      >*{{ validationErrors.password[0] }}</span
                    >
                  </p>
                </div>

                <!-- <div class="form-group">
                    <VuePassword
                      v-model="client.password"
                      id="password1"
                      type="text"
                      placeholder="Mot de passe"
                    />
                    <span class="message">{{errors[0]}}</span>
                    <p v-if="validationErrors.password">
                      <span class="alert-link">*{{ validationErrors.password[0] }}</span>
                    </p>
                </div>-->

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
                          v-bind:key="pays.id"
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

                <!-- <ValidationProvider name="telephone" rules="required|numeric" v-slot="{errors}">
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control personalise"
                      v-model="client.telephone"
                      placeholder="Numéro de téléphone"
                    />
                    <span class="message">{{errors[0]}}</span>

                    <p v-if="validationErrors.telephone">
                      <span class="alert-link">*{{ validationErrors.telephone[0] }}</span>
                    </p>
                  </div>
                </ValidationProvider>-->

                <VuePhoneNumberInput
                  required
                  :default-country-code="defaultCountry"
                  v-model="client.telephone"
                />

                <div class="row">
                  <div class="col-md-3">
                    <!-- <button
                      class="btn btn-outline-success mt-3"
                      v-b-modal.modal-confirmernum
                      type="submit"
                      fill
                    >Envoyer</button>-->
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
          </b-tab>
          <b-tab title="Login" v-if="!loggedIn">
            <form
              accept-charset="UTF-8"
              role="form"
              @submit.prevent="performLogin"
            >
              <fieldset>
                Se connecter
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
                <!-- <div class="checkbox">
                  <label>
                    <input name="remember" type="checkbox" value="Remember Me" /> Remember Me
                  </label>
                </div>-->
                <button
                  class="btn btn-lg btn-success btn-block"
                  type="submit"
                  v-b-modal.modal-reservation
                >
                  Login
                </button>
              </fieldset>
            </form>
          </b-tab>
        </b-tabs>
      </div>
    </b-modal>

    <b-modal id="modal-reservation" title="Réservation" v-if="loggedIn">
      <form v-on:submit.prevent="addReservation()" class="mb-3">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <input
                aria-label="date"
                type="date"
                class="form-control"
                placeholder="du"
                v-model="du"
                disabled
              />
            </div>
          </div>

          <div class="col-md-6">
            <div class="form-group">
              <input
                aria-label="date"
                type="date"
                class="form-control"
                placeholder="au"
                v-model="au"
                disabled
              />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <input
                aria-label="nb_adulte"
                type="text"
                class="form-control"
                placeholder="nb_adulte"
                v-model="nb_adulte"
                disabled
              />
            </div>
          </div>

          <div class="col-md-6">
            <div class="form-group">
              <input
                aria-label="nb_enfant"
                type="text"
                class="form-control"
                placeholder="nb_enfant"
                v-model="nb_enfant"
                disabled
              />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <input
                aria-label="nom"
                type="text"
                class="form-control"
                placeholder="nom"
                v-model="user.nom"
                disabled
              />
            </div>
          </div>

          <div class="col-md-6">
            <div class="form-group">
              <input
                aria-label="prenom"
                type="text"
                class="form-control"
                placeholder="prénom"
                v-model="user.prenom"
                disabled
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <input
                aria-label="telephone"
                type="tel"
                class="form-control"
                placeholder="telephone"
                v-model="user.telephone"
                disabled
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <select
                class="form-control"
                name="civilite"
                placeholder="civilité"
                v-model="user.civilité"
                required
                disabled
              >
                <option value="mr" selected>Mr</option>
                <option value="mme">Mme</option>
                <option value="mlle">Mlle</option>
              </select>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <input
                aria-label="email"
                type="email"
                class="form-control"
                placeholder="email"
                disabled
                v-model="user.email"
              />
            </div>
          </div>
        </div>

        <!-- <div class="row">
          <div class="col-sm-12 col-xs-3">
            <div class="row">
              <div class="col-md-7">
                <div
                  v-for="paiement in paiements"
                  :key="paiement.id"
                  style="padding:5px;margin-bottom:20px"
                >
                  <input
                    type="radio"
                    v-bind:key="paiement.id"
                    v-model="paiement_id"
                    v-bind:value="paiement.id"
                    name="paiement_id"
                  />
                  {{paiement.type}}
                </div>
              </div>
            </div>
          </div>
        </div>-->

        <button
          class="btn btn-success"
          type="submit"
          fill
          style="margin-left: 10px; border-radius: 18px 0px 18px 0px"
        >
          Réserver
        </button>
      </form>
    </b-modal>

    <div class="container" style="margin-bottom: 70px">
     
       
      <!-- <button
        type="button"
        @click="hasHistory() 
    ? $router.r 
    : $router.push('/')"
        class="my-3 btn btn-outline-success"
      >
        &laquo;
        Retour
      </button>-->
      <div class="row">
        <div class="col-md-8">
          <b-card no-body>
            <div class="row d-none d-lg-block">
              <div class="col-md-10">
                <h2 style="margin-left: 20px; margin-top: 30px">
                  {{ hebergement.nom }}
                </h2>
              </div>
              <!-- <div class="col-md-2" style="margin-left: -14px">
                <social-sharing
                  :href="url"
                  style="float: right; margin-top: 30px"
                  target="_blank"
                  :url="url + hebergement.nom"
                  popup.width="300px"
                  popup.height="400px"
                  :title="hebergement.nom"
                  description="Destinations alternatives à découvrir en Tunisie"
                  :quote="hebergement.nom"
                  :twitter-user="hebergement.nom"
                  inline-template
                >
                  <div>
                    <network network="facebook">
                      <button class="dropbtn">
                        <v-icon class="mr-3" style="color: #fff"
                          >fab fa-facebook</v-icon
                        >facebook
                      </button>
                    </network>
                  </div>
                </social-sharing>
              </div> -->
            </div>

            <div class="row d-lg-none">
              <div class="col-mx-10">
                <h2
                  style="
                    margin-left: 20px;
                    color: #76b72a;
                    font-weight: bold;
                    margin-top: 30px;
                    font-size: 17px;
                  "
                >
                  {{ hebergement.nom }}
                </h2>
              </div>
              <div class="col-mx-2" style="margin-left: 30px">
                <social-sharing
                  :href="url"
                  style="float: right"
                  target="_blank"
                  :url="url + hebergement.nom"
                  popup.width="300px"
                  popup.height="400px"
                  :title="hebergement.nom"
                  description="Destinations alternatives à découvrir en Tunisie"
                  :quote="hebergement.nom"
                  :twitter-user="hebergement.nom"
                  inline-template
                >
                  <div>
                    <!-- <network network="email">
                      <i class="fa fa-envelope"></i> Email
                    </network>-->
                    <network network="facebook">
                      <button class="dropbtn">
                        <v-icon class="mr-3" style="color: #fff"
                          >fab fa-facebook</v-icon
                        >facebook
                      </button>
                    </network>
                  </div>
                </social-sharing>
              </div>
            </div>
            <div class="row" style="margin-top: -17px">
              <p style="margin-left: 20px">
                {{ hebergement.nbr_voyageurs }} voyageurs --
                {{ hebergement.nbr_place_dispo }} places disponibles --
                <span v-if="hebergement.chambre_individuel > 0"
                  >{{ hebergement.chambre_individuel }} Chambres individuel
                  --</span
                >
                <span v-if="hebergement.chambre_a_deux > 0"
                  >{{ hebergement.chambre_a_deux }} Chambre à deux --</span
                >
                <span v-if="hebergement.chambre_a_trois > 0"
                  >{{ hebergement.chambre_a_trois }} Chambre à trois --</span
                >
              </p>
              <p style="margin-left: 20px">
                <b v-if="hebergement.type == 'par personne'"
                  >{{ hebergement.prix_adulte }}dt(Adulte) --</b
                >

                <b v-if="hebergement.type == 'par chambre'"
                  >{{ hebergement.prix_adulte }}dt/nuit --</b
                >
                <b v-if="hebergement.type == 'Logement entier'"
                  >{{ hebergement.prix_adulte }}dt/nuit</b
                >

                <b v-if="hebergement.type == 'par personne'"
                  >{{ hebergement.prix_enfant }}dt(Enfant moins de 4 ans) --</b
                >

                <b v-if="hebergement.type == 'par personne'"
                  >{{ hebergement.prix_enfant15 }}dt(Enfant plus de 4 ans) --</b
                >
              </p>
            </div>

            <br />
            <b-tabs content-class="mt-3" justified>
              <b-tab no-body >
                <template #title v-if="hebergement.url_video">
                  Photos
                </template>
                <div id="app" class="container d-lg-none">
            
                  <slider :autoplay="false" autoplayTimeout="100000">
                    <slider-item
                      v-for="(i, index) in get_image"
                      :key="index"
                      :style="i"
                    >
                      <img loading="lazy"
                        :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_hebergement/${i}`"
                      />
                    </slider-item>
                  </slider> 

            </div>
            <div class="d-none d-lg-block">
                <lingallery :iid.sync="currentId" :width="600" :height="400" responsive="true" :items="get_image_url"/>
                <!-- <vue-gallery-slideshow 
                    style="posision: fixed"
                    :images="get_image_url"
                    index="0"
                    @close="index = null"
                  >
                  </vue-gallery-slideshow> -->
                  <p style="margin-top:15px;padding-left:20px;padding-right:20px;padding-bottom:20px;">{{ hebergement.description }}</p>
            </div>
                
              
                <!-- <b-carousel
                  class="carousel-item22 d-none d-lg-block"
                  v-model="slide"
                  :interval="400000"
                  controls
                  indicators
                  background="#ababab"
                  img-width="1024"
                  img-height="380"
                  style="text-shadow: 1px 1px 2px #333; margin-top: 30px"
                  @sliding-start="onSlideStart"
                  @sliding-end="onSlideEnd"
                >
                  <b-carousel-slide
                    class="carousel-item22"
                    v-for="(image, k) in hebergement.images_hebergement"
                    v-bind:key="k"
                    :img-src="`${apiDomain}/myapp/public/uploads/files_hebergement/${image.url_image}`"
                  ></b-carousel-slide>
                </b-carousel>

                <b-carousel
                  class="carousel-item23 d-lg-none"
                  v-model="slide"
                  :interval="400000"
                  controls
                  indicators
                  background="#ababab"
                  img-width="1024"
                  img-height="380"
                  style="text-shadow: 1px 1px 2px #333; margin-top: 30px"
                  @sliding-start="onSlideStart"
                  @sliding-end="onSlideEnd"
                >
                  <b-carousel-slide
                    class="carousel-item23"
                    v-for="(image, k) in hebergement.images_hebergement"
                    v-bind:key="k"
                    :img-src="`${apiDomain}/myapp/public/uploads/files_hebergement/${image.url_image}`"
                  ></b-carousel-slide>
                </b-carousel> -->
              </b-tab>

              <b-tab no-body title="Vidéo" v-if="hebergement.url_video">
                <b-embed
                  type="iframe"
                  aspect="16by9"
                  :src="hebergement.url_video"
                  allowfullscreen
                ></b-embed>
              </b-tab>

              <b-tab no-body title="Images 360" v-if="hebergement.url_video">
                <div
              class="d-none d-lg-block"
              v-if="
                hebergement.images_hebergement360 &&
                hebergement.images_hebergement360.length != 0
              "
            >
              <div class="container" style="padding-bottom: 20px">
                <center>
                  <h3 style="line-height: 40px; color: #000; padding-top: 30px">
                    Virtual Reality 360°
                    <hr style="border-top: 2px solid #ff931f; width: 10%" />
                  </h3>
                </center>
                <div class="row">
                  <Vr360
                    style="width: 50vw; height: 35vh; padding-bottom: 20px"
                    class="col-md-4"
                    v-for="(image, k) in hebergement.images_hebergement360"
                    v-bind:key="k"
                    :imgSrc="`https://etnafes.com/hebergement360/${image.url_image}`"
                  />
                </div>
              </div>
            </div>
            
              </b-tab>
            </b-tabs>

            <div class="row">

             
              <!-- <div class="col-md-12">
                <p style="padding: 20px">{{ hebergement.description }}</p>
              </div> -->
            </div>
            <div class="container" v-if="chambres.length != 0">
              <div
                class="row"
                v-for="(chambre, k) in chambres"
                v-bind:key="'chambre' + k"
                style="border: 1px solid rgb(203 202 202); margin-bottom: 10px"
              >
                <div class="col-md-4">
                  <b-carousel
                    class="carousel-item-chambre"
                    v-model="slide"
                    :interval="400000"
                    controls
                    indicators
                    background="#ababab"
                    img-width="1024"
                    img-height="380"
                    style="text-shadow: 1px 1px 2px #333"
                    @sliding-start="onSlideStart"
                    @sliding-end="onSlideEnd"
                  >
                    <b-carousel-slide
                      class="carousel-item-chambre"
                      v-for="(image, k) in chambre.images_chambre"
                      v-bind:key="k"
                      :img-src="`${apiDomain}/myapp/public/uploads/files_chambre/${image.url_image}`"
                    ></b-carousel-slide>
                  </b-carousel>
                  <!-- photos chambres-->
                </div>
                <div class="col-md-4">
                  <div class="row" style="font-weight: bold; margin: 0">
                    <div>
                      <img loading="lazy"
                        src="https://img.icons8.com/material-outlined/24/000000/bed.png"
                      />&nbsp;{{ chambre.nb_lit }} lit(s)
                    </div>
                  </div>

                  <div class="row" style="font-weight: bold; margin: 0">
                    <div>
                      <img loading="lazy"
                        src="https://img.icons8.com/material-outlined/24/000000/person-male.png"
                      />&nbsp;{{ chambre.nb_places }} personne(s)
                    </div>
                  </div>

                  <div
                    class="row"
                    style="font-weight: bold; margin: 0; margin-top: 21px"
                  >
                    <div>{{ chambre.nom }}</div>
                  </div>
                </div>
                <div class="col-md-4">
                  <button
                    class="btn btn-warning"
                    type="submit"
                    fill
                    @click="
                    
                      Saveloading();
                      fetchChambre(chambre.id);
                    "
                  >
                    <div
                      v-if="loading"
                      class="spinner-border spinner-border-sm"
                    ></div>
                    <span v-if="loading">En cours</span>
                    <span v-else>Réserver </span>
                  </button>
                  <br />
                  <br />
                  <i
                    class="tim-icons icon-tag"
                    style="color: #f0ad4e; font-size: 1.5em; margin-top: -15px"
                  ></i>
                  <span style="font-size: 20px">{{ chambre.prix }} Dt</span>
                </div>
              </div>
            </div>
            <div class="col-md-12">
              <div class="row d-none d-lg-block">
                <div class="col-md-12">
                  <br />
                  <h5 style="margin-left: 20px; margin-top: -15px; color: #000">
                    Equipements
                  </h5>
                  <span v-if="hebergement.wifi == 1">
                    <img loading="lazy" src="/wifi-etnafes.png" /> Wi-Fi
                  </span>

                  <span v-if="hebergement.television == 1">
                    <img loading="lazy" src="/tv-etnafes.png" /> Télévision
                  </span>

                  <span v-if="hebergement.chauffage == 1">
                    <img loading="lazy" src="/heating-etnafes.png" /> Chauffage
                  </span>

                  <span v-if="hebergement.cuisine == 1">
                    <img loading="lazy" src="/kitchen-etnafes.png" /> Cuisine
                  </span>

                  <span v-if="hebergement.lave_linge == 1">
                    <img loading="lazy" src="/tumble-dry-etnafes.png" /> Lave-linge
                  </span>
                  <span v-if="hebergement.climatisation == 1">
                    <img loading="lazy" src="/air-conditioner-etnafes.png" /> Climatisation
                  </span>

                  <span v-if="hebergement.eau_chaude == 1">
                    <img loading="lazy" src="/water-heater-etnafes.png" /> Eau Chaude
                  </span>

                  <span v-if="hebergement.salle_de_bain == 1">
                    <img loading="lazy" src="/bath-etnafes.png" /> Salle de bain
                  </span>

                  <span v-if="hebergement.espace_travail_ordinateur == 1">
                    <img loading="lazy" src="/computer-etnafes.png" />
                    &nbsp;Espace de travail pour ordinateur
                  </span>
                  <br />
                  <span v-if="hebergement.espace_enfant == 1">
                    <img loading="lazy" src="/espace-enfant-etnafes.png" />
                    &nbsp;Espace pour enfant
                  </span>
                </div>

                <div class="col-md-6 d-lg-none" style="margin-top: -112px">
                  <br />
                  <h2 style="margin-top: 30px">&nbsp;</h2>
                  <div v-if="hebergement.climatisation == 1">
                    <img loading="lazy" src="/air-conditioner-etnafes.png" /> Climatisation
                    <br />
                    <br />
                  </div>

                  <div v-if="hebergement.eau_chaude == 1">
                    <img loading="lazy" src="/water-heater-etnafes.png" /> Eau Chaude
                    <br />
                    <br />
                  </div>

                  <div v-if="hebergement.salle_de_bain == 1">
                    <img loading="lazy" src="/bath-etnafes.png" /> Salle de bain
                    <br />
                    <br />
                  </div>

                  <div v-if="hebergement.espace_travail_ordinateur == 1">
                    <img loading="lazy" src="/computer-etnafes.png" />
                    &nbsp;Espace de travail pour ordinateur
                    <br />
                    <br />
                  </div>

                  <div v-if="hebergement.espace_enfant == 1">
                    <img loading="lazy" src="/espace-enfant-etnafes.png" />
                    &nbsp;Espace pour enfant
                    <br />
                    <br />
                  </div>
                </div>
                <br>
              </div>

              <div class="row d-lg-none">
                <h2
                  style="margin-left: 20px; font-size: 17px; font-weight: bold"
                >
                  Equipements
                </h2>
                <div class="col-md-12">
                  <span v-if="hebergement.wifi == 1">
                    <img loading="lazy" src="/wifi-etnafes.png" /> Wi-Fi </span
                  >&nbsp;

                  <span v-if="hebergement.television == 1">
                    <img loading="lazy" src="/tv-etnafes.png" /> Télévision </span
                  >&nbsp;

                  <span v-if="hebergement.chauffage == 1">
                    <img loading="lazy" src="/heating-etnafes.png" /> Chauffage </span
                  >&nbsp;

                  <span v-if="hebergement.cuisine == 1">
                    <img loading="lazy" src="/kitchen-etnafes.png" /> Cuisine </span
                  >&nbsp;

                  <span v-if="hebergement.lave_linge == 1">
                    <img loading="lazy" src="/tumble-dry-etnafes.png" /> Lave-linge </span
                  >&nbsp;

                  <span v-if="hebergement.climatisation == 1">
                    <img loading="lazy" src="/air-conditioner-etnafes.png" />
                    Climatisation </span
                  >&nbsp;

                  <span v-if="hebergement.eau_chaude == 1">
                    <img loading="lazy" src="/water-heater-etnafes.png" /> Eau Chaude </span
                  >&nbsp;

                  <span v-if="hebergement.salle_de_bain == 1">
                    <img loading="lazy" src="/bath-etnafes.png" /> Salle de bain </span
                  >&nbsp;

                  <span v-if="hebergement.espace_travail_ordinateur == 1">
                    <img loading="lazy" src="/computer-etnafes.png" />
                    &nbsp;Espace de travail pour ordinateur </span
                  >&nbsp;

                  <span v-if="hebergement.espace_enfant == 1">
                    <img loading="lazy" src="/espace-enfant-etnafes.png" />
                    &nbsp;Espace pour enfant
                  </span>
                </div>
              </div>
            </div>

            <!-- <div
              class="d-none d-lg-block"
              v-if="
                hebergement.images_hebergement360 &&
                hebergement.images_hebergement360.length != 0
              "
            >
              <div class="container" style="padding-bottom: 20px">
                <center>
                  <h3 style="line-height: 40px; color: #000; padding-top: 30px">
                    Virtual Reality 360°
                    <hr style="border-top: 2px solid #ff931f; width: 10%" />
                  </h3>
                </center>
                <div class="row">
                  <Vr360
                    style="width: 50vw; height: 35vh; padding-bottom: 20px"
                    class="col-md-4"
                    v-for="(image, k) in hebergement.images_hebergement360"
                    v-bind:key="k"
                    :imgSrc="`https://etnafes.com/hebergement360/${image.url_image}`"
                  />
                </div>
              </div>
            </div> -->
            <div class="container" v-if="loggedIn">
              <h5
                style="color: #000; margin-top: 15px; margin-left: 20px"
                class="d-none d-lg-block"
              >
                Donnez votre Avis
              </h5>
              <h2
                style="
                  color: #000;
                  font-weight: bold;
                  font-size: 17px;
                  margin-top: 15px;
                "
                class="d-lg-none"
              >
                Donnez votre Avis
              </h2>

              <ValidationObserver>
                <form v-on:submit.prevent="addAvisHebergement()" class="mb-3">
                  <!-- :showcount="true" -->
                  <rate
                    class="d-none d-lg-block"
                    :length="5"
                    v-model="avisheb.nbr_etoile"
                  ></rate>
                  <rate
                    class="d-lg-none"
                    :length="5"
                    v-model="avisheb.nbr_etoile"
                    style="margin-top: -24px"
                  ></rate>

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
            <div class="container" v-if="nbcomheb > 0">
              <h5 style="color: blue" class="d-none d-lg-block">
                {{ nbcomheb }} commentaires
              </h5>
              <p style="color: blue" class="d-lg-none">
                {{ nbcomheb }} commentaires
              </p>

              <br />

              <div class="row">
                <div
                  class="col-md-12 d-none d-lg-block"
                  v-for="avisheb in avishebergement"
                  :key="avisheb.id"
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
                  style="border: 1px solid #b7b7b7"
                  class="col d-lg-none"
                  v-for="avisheb in avishebergement"
                  :key="avisheb.id"
                >
                  <center>
                    <div class="row" style="padding: 7px">
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
                  </center>
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
            <gmap-map
            class="d-none d-lg-block"
            :center="center"
            :zoom="12"
            style="width: 100%; height: 420px"
          >
            <GmapMarker
              icon="/Etnafes-icon01.png"
              :position="markersh.position"
              @click="toggleInfoWindow(markersh)"
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
          </b-card>

          <!-- <facebook :url="url" scale="3"></facebook> -->
        </div>

        <div class="col-md-4 d-none d-lg-block" id="map" ref="map" style="position: fixed;
  bottom: 10px;
 top:10px;
 width:33%;
  right: 0;z-index:1">
        <!-- par chambre -->
          <!-- v-if="hebergement.type == 'par chambre' && chambre.length != 0" -->

          <div
            v-if="hebergement.type == 'par chambre' && chambre.length != 0"
            class="card d-none d-lg-block card-fixed"
            style="
             margin-top: 60px;
              border: 1px solid rgb(51, 51, 51);
              width: 77%;
              margin-left: 51px;
            "
          >
            <div class="card-body">
              <form name>
                <div class="row">
                  <div class="col-sm-12 col-xs-3">
                    <div class="row">
                      <p
                        style="font-weight: bold; margin-left: 20px"
                        v-show="chambre"
                      >
                        {{ chambre.nom }}
                      </p>
                      : {{ chambre.prix }} DT / nuit
                      <br />
                    </div>
                    <div class="row">
                      <p style="margin-left: 20px">
                        Sélectionnez les dates pour voir les prix.
                      </p>
                      <div class="col-md-10 offset-md-1">
                        <date-range-picker
                          required
                          style="
                            width: 100%;
                            text-align: center;
                            margin-top: 13px;
                          "
                          @finishSelection="fetch_res_najeh_moez_chambre"
                          v-model="dateHebergementChambre"
                          :date-format="dateFormatHebrgement"
                          :locale-data="{ firstDay: 1, format: 'dd/mm/yyyy' }"
                          :minDate="new Date()"
                          :autoApply="true"
                          locale="fr"
                        ></date-range-picker>
                      </div>
                    </div>
                    <br />
                  </div>
                </div>

                <div class="row">
                  <router-link
                    :to="{
                      name: 'ReservationHebergement',
                      params: { id: hebergement.id },
                      query: {
                        du: convert_date_du_chambre,
                        au: convert_date_au_chambre,
                        nb_adulte: chambre.nb_places,
                        nb_places_chambre: chambre.nb_places,
                        chambre: chambre.nom,
                        chambreid: chambre.id,
                        arr: this.calculIntervalDateResChambre_calender,
                      },
                    }"
                  >
                    <b-button
                      style="margin-left: 90px; margin-top: 20px"
                      v-if="
                        verif_dipo_chambre >= 0 &&
                        loggedIn &&
                        convert_date_au_chambre != convert_date_du_chambre
                      "
                      >Réserver ></b-button
                    >
                  </router-link>

                  <center>
                    <b-button
                      v-b-modal.modal-inscription
                      style="margin-left: 90px; margin-top: 20px"
                      v-if="
                        verif_dipo_chambre >= 0 &&
                        !loggedIn &&
                        convert_date_au != convert_date_du
                      "
                      >Réserver ></b-button
                    >
                  </center>

                  <div
                    style="
                      width: 283px;
                      height: 67px;
                      padding: 10px;
                      margin-left: 21px;
                      margin-top: 19px;
                      color: rgb(133, 100, 4);
                      background-color: rgb(235, 217, 159);
                      border-color: rgb(255, 238, 186);
                      font-size: 15px;
                      text-align: center;
                    "
                    v-if="verif_dipo_chambre < 0 && loggedIn"
                  >
                    Vous avez atteint la limite d’invitations
                  </div>
                </div>

                <hr />
                <!-- supprimz -->
                <div class="row">
                  <div class="col-md-12">
                    <h3 style="color: #333">
                      Total:
                      {{
                        calculIntervalDateResChambre_calender.length *
                        chambre.prix
                      }}dt
                    </h3>

                    <p style="color: rgb(51, 51, 51); margin-top: -25px">
                      Détails:
                      {{ calculIntervalDateResChambre_calender.length }} nuits,
                      {{ chambre.nb_places }} personnes<br />
                    </p>
                  </div>
                  <div
                    class="col-md-7"
                    v-if="get_date_complet_chambre.length > 0"
                  >
                    <div
                      style="
                        color: rgb(51, 51, 51);
                        font-size: 16px;
                        margin-top: 5px;
                      "
                    >
                      <!-- ⚠️ -->
                      ⚠️ Date compléte:
                    </div>
                    <br />
                    <ul v-for="d in get_date_complet_chambre" :key="d.id">
                      <li style="margin-top: -16px; margin-left: 15px">
                        {{ d }}
                      </li>
                    </ul>
                  </div>
                </div>
              </form>
              <!-- Form -->
            </div>
          </div>

          <div
            v-if="hebergement.type == 'par chambre' && chambre.length == 0"
            class="card d-none d-lg-block card-fixed"
            style="
              margin-top: 60px;
              border: 1px solid rgb(51, 51, 51);
              width: 77%;
              margin-left: 51px;
              
            "
          >
            <div class="card-body">
              <form name>
                <div class="row">
                  <div class="col-sm-12 col-xs-3">
                    <div class="row">
                      <p
                        style="font-weight: bold; margin-left: 20px"
                        v-show="chambre"
                      >
                        {{ hebergement.nom }}: Réservation par chambre
                      </p>
                      <!-- : {{ chambre.prix }} DT / nuit -->
                      <br />
                    </div>
                    <div class="row">
                      <p style="margin-left: 20px">
                        <!-- Sélectionnez les dates pour voir les prix. -->
                        Aucune chambre sélectionnée...
                      </p>
                      <div class="col-md-10 offset-md-1">
                        <date-range-picker disabled
                          required
                          style="
                            width: 100%;
                            text-align: center;
                            margin-top: 13px;
                          "
                          @finishSelection="fetch_res_najeh_moez_chambre"
                          v-model="dateHebergementChambre"
                          :date-format="dateFormatHebrgement"
                          :locale-data="{ firstDay: 1, format: 'dd/mm/yyyy' }"
                          :minDate="new Date()"
                          :autoApply="true"
                          locale="fr"
                        ></date-range-picker>
                      </div>
                    </div>
                    <br />
                  </div>
                </div>

                <div class="row">
                  
                  <center>
                    <b-button
                      style="margin-left: 90px; margin-top: 20px"
                      disabled
                      >Réserver ></b-button
                    >
                  </center>

                  <div
                    style="
                      width: 283px;
                      height: 67px;
                      padding: 10px;
                      margin-left: 21px;
                      margin-top: 19px;
                      color: rgb(133, 100, 4);
                      background-color: rgb(235, 217, 159);
                      border-color: rgb(255, 238, 186);
                      font-size: 15px;
                      text-align: center;
                    "
                    v-if="verif_dipo_chambre < 0 && loggedIn"
                  >
                    Vous avez atteint la limite d’invitations
                  </div>
                </div>

                <hr />
                <!-- supprimz -->
                <div class="row">
                  <div class="col-md-12">
                    <h3 style="color: #333">
                      Total:0.00 DT
                      
                    </h3>

                    <p style="color: rgb(51, 51, 51); margin-top: -25px">
                      Détails:
                      0 nuits,
                      0 personnes<br />
                    </p>
                  </div>
                  <div
                    class="col-md-7"
                    v-if="get_date_complet_chambre.length > 0"
                  >
                    <div
                      style="
                        color: rgb(51, 51, 51);
                        font-size: 16px;
                        margin-top: 5px;
                      "
                    >
                      <!-- ⚠️ -->
                      ⚠️ Date compléte:
                    </div>
                    <br />
                    <ul v-for="d in get_date_complet_chambre" :key="d.id">
                      <li style="margin-top: -16px; margin-left: 15px">
                        {{ d }}
                      </li>
                    </ul>
                  </div>
                </div>
              </form>
              <!-- Form -->
            </div>
          </div>
          <!-- end par chambre -->
          <br class="d-none d-lg-block" />

           <!-- <gmap-map
            class="d-none d-lg-block"
            :center="center"
            :zoom="12"
            style="width: 100%; height: 720px"
          >
            <GmapMarker
              icon="/Etnafes-icon01.png"
              :position="markersh.position"
              @click="toggleInfoWindow(markersh)"
            ></GmapMarker>
            <gmap-info-window
              :options="infoOptions"
              :position="infoWindowPos"
              :opened="infoWinOpen"
              @closeclick="infoWinOpen = false"
            >
              <info-content :content="InfoDepanneur"></info-content>
            </gmap-info-window>
          </gmap-map>  -->
                 <!-- par personne -->
          <div
            v-if="
              hebergement.type == 'par personne' ||
              hebergement.type == 'Logement entier'
            "
            class="card d-none d-lg-block"
            style="
              margin-top: 60px;
              border: 1px solid rgb(51, 51, 51);
              width: 77%;
              margin-left: 51px;
            "
          >
            <!--Card content-->
            <div class="card-body">
              <!-- Form -->
              <form name>

                <div class="row" style="margin-top: 25px">
                  <div class="col-sm-12 col-xs-3">
                    <div class="row">
                      <!-- debut 5edma jdidia -->
                      <span style="margin-left: 20px; margin-top: -26px"
                        >{{ hebergement.prix_adulte }} DT / nuit
                        <br />

                        Sélectionnez les dates voir le prix.</span>
                      <div class="col-md-10 offset-md-1">
                        <date-range-picker
                          required
                          style="
                            width: 100%;
                            text-align: center;
                            margin-top: 13px;
                          "
                          @finishSelection="fetch_res_najeh_moez"
                          v-model="dateHebergement"
                          :date-format="dateFormatHebrgement"
                          :locale-data="{ firstDay: 1, format: 'dd/mm/yyyy' }"
                          :minDate="new Date()"
                          :autoApply="true"
                          locale="fr"
                        ></date-range-picker>
                      </div>
                    </div>
                    <br />
                    <div class="row">
                      <div class="col-md-4">
                        <label
                          style="
                            color: #000;
                            font-size: 13px;
                            font-weight: bold;
                          "
                          >Adultes</label
                        >
                      </div>

                      <div class="col-md-4">
                        <label
                          style="
                            color: #000;
                            font-size: 13px;
                            font-weight: bold;
                          "
                          >Enfants >4 ans</label
                        >
                      </div>

                      <div class="col-md-4">
                        <label
                          style="
                            color: #000;
                            font-size: 13px;
                            font-weight: bold;
                          "
                          >Enfants < 4 ans</label
                        >
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-4">
                        <vue-numeric-input
                          v-model="nb_adulte"
                          :min="1"
                          :step="1"
                          :max="
                            hebergement.nbr_place_dispo -
                            nb_enfant15 -
                            nb_enfant4
                          "
                          name="nb_adulte"
                          required
                        ></vue-numeric-input>
                      </div>

                      <!-- nb enfant =>4 -->

                      <div class="col-md-4">
                        <vue-numeric-input
                          :min="0"
                          :step="1"
                          :max="
                            hebergement.nbr_place_dispo - nb_adulte - nb_enfant4
                          "
                          name="nb_enfant15"
                          required
                          v-model="nb_enfant15"
                        ></vue-numeric-input>
                      </div>
                      <!-- nb enfant <4 -->

                      <div class="col-md-4">
                        <vue-numeric-input
                          :min="0"
                          :step="1"
                          :max="
                            hebergement.nbr_place_dispo -
                            nb_adulte -
                            nb_enfant15
                          "
                          name="nb_enfant4"
                          required
                          v-model="nb_enfant4"
                        ></vue-numeric-input>
                      </div>
                    </div>

                    <!-- din 5edma jdida -->
                  </div>
                </div>

                <div class="row">
                  <router-link
                    :to="{
                      name: 'ReservationHebergement',
                      params: { id: hebergement.id },
                      query: {
                        du: convert_date_du,
                        au: convert_date_au,
                        nb_adulte: nb_adulte,
                        nb_enfant15: nb_enfant15,
                        nb_enfant4: nb_enfant4,

                        arr: this.calculIntervalDateRes_calender,
                      },
                    }"
                    ><!-- &&
                          verification_disponible == 1 -->
                    <center>
                      <b-button
                        style="margin-left: 90px; margin-top: 20px"
                        v-if="
                          verif_dipo >= 0 &&
                          loggedIn &&
                          convert_date_au != convert_date_du
                        "
                        >Réserver ></b-button
                      >
                    </center>
                  </router-link>

                  <center>
                    <b-button
                      v-b-modal.modal-inscription
                      style="margin-left: 90px; margin-top: 20px"
                      v-if="
                        verif_dipo >= 0 &&
                        !loggedIn &&
                        convert_date_au != convert_date_du
                      "
                      >Réserver ></b-button
                    >
                  </center>

                  <div
                    style="
                      width: 283px;
                      height: 67px;
                      padding: 10px;
                      margin-left: 21px;
                      margin-top: 19px;
                      color: rgb(133, 100, 4);
                      background-color: rgb(235, 217, 159);
                      border-color: rgb(255, 238, 186);
                      font-size: 15px;
                      text-align: center;
                    "
                    v-if="verif_dipo < 0 && loggedIn"
                  >
                    Vous avez atteint la limite d’invitations
                  </div>
                </div>

                <hr />
                <!-- supprimz -->
                <div class="row">
                  <div class="col-md-12">
                    <h3 style="color: #333">
                      Total:
                      {{
                        calculIntervalDateRes_calender.length *
                        (Number(nb_adulte) * hebergement.prix_adulte +
                          Number(nb_enfant15) * hebergement.prix_enfant15 +
                          Number(nb_enfant4) * hebergement.prix_enfant)
                      }}dt
                    </h3>

                    <p style="color: rgb(51, 51, 51); margin-top: -25px">
                      Détails: {{ calculIntervalDateRes_calender.length }} nuits,{{ nb_adulte }} adultes,
                      {{
                          Number(nb_enfant15) + Number(nb_enfant4)
                        }}
                        enfants
                    </p>
                  </div>
                  <div class="col-md-7" v-if="get_date_complet.length > 0">
                    <div
                      style="
                        color: rgb(51, 51, 51);
                        font-size: 16px;
                        margin-top: 5px;
                      "
                    >
                      <!-- ⚠️ -->
                      ⚠️ Date compléte:
                    </div>
                    <br />
                    <ul v-for="d in get_date_complet" :key="d.id">
                      <li style="margin-top: -16px; margin-left: 15px">
                        {{ d }}
                      </li>
                    </ul>
                  </div>
                </div>
              </form>
              <!-- Form -->
            </div>
          </div>
          <!-- end par personne -->

          <gmap-map
            class="d-lg-none"
            :center="center"
            :zoom="12"
            style="width: 100%; height: 320px"
          >
            <GmapMarker
              icon="/Etnafes-icon01.png"
              :position="markersh.position"
              @click="toggleInfoWindow(markersh)"
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
          <!-- style="background-color: #ff931f; border: 0px; margin-top: 40px" -->

   

          

          <div
            class="card d-none d-lg-block"
            style="
              
              border: 0px;
              margin-top: 2px;
              margin-bottom: 40px;
            "
          >
            <!--Card content-->
            <div class="card-body">
              <!-- Heading -->
              <h4
                class="dark-grey-text text-center"
                style="margin-top: 5px; font-family: 'Poppins', sans-serif"
              >
                <img loading="lazy"
                  width="15%"
                  style="border-radius: 50%"
                  :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_client/${hebergeur.photo}`"
                  class="photo"
                />
                <br />
                <strong
                  style="
                    font-family: 'Poppins', sans-serif;
                    letter-spacing: 1px;
                    font-size: 15px;
                  "
                  >Hébergé par {{ hebergeur.nom }}
                  {{ hebergeur.prenom }}</strong
                >
              </h4>

              <div class="row" style="margin-top: 10px">
                <div class="col-sm-12 col-xs-3">
                  <center>
                    <label
                      style="color: #000; font-size: 13px; font-weight: normal"
                      >Statut du profil:&nbsp;</label
                    >
                    <span v-if="prop.proprietaire == 1">
                      <i
                        class="fa fa-check-circle fa-lg"
                        style="color: #62b062"
                      ></i>
                      <span style="color: #62b062">Vérifié</span>
                    </span>

                    <span v-if="prop.proprietaire == 0">
                      <i class="fa fa-times-circle text-danger fa-lg"></i>
                      <span style="color: red">Non Vérifié</span>
                    </span>
                  </center>
                </div>
              </div>
            </div>
          </div>

          <div
            class="card d-lg-none"
            style="
              background-color: #ebebeb;
              border: 0px;
              margin-top: 40px;
              margin-bottom: -79px;
            "
          >
            <!--Card content-->
            <div class="card-body">
              <!-- Heading -->
              <h4
                class="dark-grey-text text-center"
                style="margin-top: 5px; font-family: 'Poppins', sans-serif"
              >
                <img loading="lazy"
                  width="15%"
                  style="border-radius: 50%"
                  :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_client/${hebergeur.photo}`"
                  class="photo"
                />
                <br />
                <strong
                  style="
                    font-family: 'Poppins', sans-serif;
                    letter-spacing: 1px;
                    font-size: 15px;
                  "
                  >Hébergé par {{ hebergeur.nom }}
                  {{ hebergeur.prenom }}</strong
                >
              </h4>

              <div class="row" style="margin-top: 10px">
                <div class="col-sm-12 col-xs-3">
                  <center>
                    <label
                      style="color: #000; font-size: 13px; font-weight: normal"
                      >Statut du profil:&nbsp;</label
                    >
                    <span v-if="prop.proprietaire == 1">
                      <i
                        class="fa fa-check-circle fa-lg"
                        style="color: #62b062"
                      ></i>
                      <span style="color: #62b062">Vérifié</span>
                    </span>

                    <span v-if="prop.proprietaire == 0">
                      <i class="fa fa-times-circle text-danger fa-lg"></i>
                      <span style="color: red">Non Vérifié</span>
                    </span>
                  </center>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div class="col-md-4 d-lg-none" id="map" ref="map">
          <gmap-map
            class="d-lg-none"
            :center="center"
            :zoom="12"
            style="width: 100%; height: 320px"
          >
            <GmapMarker
              icon="/Etnafes-icon01.png"
              :position="markersh.position"
              @click="toggleInfoWindow(markersh)"
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

          <div
            class="card d-lg-none"
            style="
              background-color: #ebebeb;
              border: 0px;
              margin-top: 40px;
              margin-bottom: -79px;
            "
          >
            <!--Card content-->
            <div class="card-body">
              <!-- Heading -->
              <h4
                class="dark-grey-text text-center"
                style="margin-top: 5px; font-family: 'Poppins', sans-serif"
              >
                <img loading="lazy"
                  width="15%"
                  style="border-radius: 50%"
                  :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_client/${hebergeur.photo}`"
                  class="photo"
                />
                <br />
                <strong
                  style="
                    font-family: 'Poppins', sans-serif;
                    letter-spacing: 1px;
                    font-size: 15px;
                  "
                  >Hébergé par {{ hebergeur.nom }}
                  {{ hebergeur.prenom }}</strong
                >
              </h4>

              <div class="row" style="margin-top: 10px">
                <div class="col-sm-12 col-xs-3">
                  <center>
                    <label
                      style="color: #000; font-size: 13px; font-weight: normal"
                      >Statut du profil:&nbsp;</label
                    >
                    <span v-if="prop.proprietaire == 1">
                      <i
                        class="fa fa-check-circle fa-lg"
                        style="color: #62b062"
                      ></i>
                      <span style="color: #62b062">Vérifié</span>
                    </span>

                    <span v-if="prop.proprietaire == 0">
                      <i class="fa fa-times-circle text-danger fa-lg"></i>
                      <span style="color: red">Non Vérifié</span>
                    </span>
                  </center>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- modal reservation mobile par chambre -->
    <b-modal id="modal-reservation-mobile" title="Réservation">
      <div
        v-if="hebergement.type == 'par chambre' && chambre.length != 0"
        class="card"
        style="margin-top: 12px; border: 1px solid rgb(51, 51, 51)"
      >
        <div class="card-body">
          <form name>
            <div class="row">
              <div class="col-sm-12 col-xs-3">
                <div class="row">
                  <p
                    style="font-weight: bold; margin-left: 20px"
                    v-show="chambre"
                  >
                    {{ chambre.nom }}
                  </p>
                  : {{ chambre.prix }} DT / nuit
                  <br />
                </div>
                <div class="row">
                  <p style="margin-left: 20px">
                    Sélectionnez les dates pour voir les prix.
                  </p>
                  <div class="col-md-10 offset-md-1">
                    <date-range-picker
                      required
                      style="width: 100%; text-align: center; margin-top: 13px"
                      @finishSelection="fetch_res_najeh_moez_chambre"
                      v-model="dateHebergementChambre"
                      :date-format="dateFormatHebrgement"
                      :locale-data="{ firstDay: 1, format: 'dd/mm/yyyy' }"
                      :minDate="new Date()"
                      :autoApply="true"
                      locale="fr"
                    ></date-range-picker>
                  </div>
                </div>
                <br />
              </div>
            </div>

            <div class="row">
              <router-link
                :to="{
                  name: 'ReservationHebergement',
                  params: { id: hebergement.id },
                  query: {
                    du: convert_date_du_chambre,
                    au: convert_date_au_chambre,
                    nb_adulte: chambre.nb_places,
                    nb_places_chambre: chambre.nb_places,
                    chambre: chambre.nom,
                    chambreid: chambre.id,
                    arr: this.calculIntervalDateResChambre_calender,
                  },
                }"
              >
                <b-button
                  style="margin-left: 90px; margin-top: -19px"
                  v-if="
                    verif_dipo_chambre >= 0 &&
                    loggedIn &&
                    convert_date_au_chambre != convert_date_du_chambre
                  "
                  >Réserver ></b-button
                >
              </router-link>

              <center>
                <b-button
                  v-b-modal.modal-inscription
                  style="margin-left: 90px; margin-top: -19px"
                  v-if="
                    verif_dipo_chambre >= 0 &&
                    !loggedIn &&
                    convert_date_au != convert_date_du
                  "
                  >Réserver ></b-button
                >
              </center>

              <div
                style="
                  width: 283px;
                  height: 67px;
                  padding: 10px;
                  margin-left: 21px;
                  margin-top: 19px;
                  color: rgb(133, 100, 4);
                  background-color: rgb(235, 217, 159);
                  border-color: rgb(255, 238, 186);
                  font-size: 15px;
                  text-align: center;
                "
                v-if="verif_dipo_chambre < 0 && loggedIn"
              >
                Vous avez atteint la limite d’invitations
              </div>
            </div>

            <hr />
            <!-- supprimz -->
            <div class="row">
              <div class="col-md-12">
                <h3 style="color: #333">
                  Total:
                  {{
                    calculIntervalDateResChambre_calender.length * chambre.prix
                  }}dt
                </h3>

                <p style="color: rgb(51, 51, 51); margin-top: -25px">
                  Détails:
                  {{ calculIntervalDateResChambre_calender.length }} nuits,
                  {{ chambre.nb_places }} personnes<br />
                </p>
              </div>
              <div class="col-md-7" v-if="get_date_complet_chambre.length > 0">
                <div
                  style="
                    color: rgb(51, 51, 51);
                    font-size: 16px;
                    margin-top: 5px;
                  "
                >
                  <!-- ⚠️ -->
                  ⚠️ Date compléte:
                </div>
                <br />
                <ul v-for="d in get_date_complet_chambre" :key="d.id">
                  <li style="margin-top: -16px; margin-left: 15px">
                    {{ d }}
                  </li>
                </ul>
              </div>
            </div>
          </form>
          <!-- Form -->
        </div>
      </div>
    </b-modal>

    <!-- modal reservation mobile personne/entier -->
    <b-modal id="modal-reservation-personne-mobile" title="Réservation">
      <div
        class="card"
        style="margin-top: 12px; border: 1px solid rgb(51, 51, 51)"
      >
        <div class="card-body">
          <form name>
            <div class="row" style="margin-top: 25px">
              <div class="col-sm-12 col-xs-3">
                <div class="row">
                  <sapn style="margin-left: 20px; margin-top: -26px"
                    >{{ hebergement.prix_adulte }} DT / nuit
                    <br />
                    Sélectionnez les dates voir le prix.</sapn
                  >
                  <div class="col-md-10 offset-md-1">
                    <date-range-picker
                      required
                      style="width: 100%; text-align: center; margin-top: 13px"
                      @finishSelection="fetch_res_najeh_moez"
                      v-model="dateHebergement"
                      :date-format="dateFormatHebrgement"
                      :locale-data="{ firstDay: 1, format: 'dd/mm/yyyy' }"
                      :minDate="new Date()"
                      :autoApply="true"
                      locale="fr"
                    ></date-range-picker>
                  </div>
                </div>
                <br />
                <div class="row">
                  <div class="col">
                    <label
                      style="color: #000; font-size: 13px; font-weight: bold"
                      >Adultes</label
                    >
                  </div>

                  <div class="col">
                    <label
                      style="color: #000; font-size: 13px; font-weight: bold"
                      >Enfants >4 ans</label
                    >
                  </div>

                  <div class="col">
                    <label
                      style="color: #000; font-size: 13px; font-weight: bold"
                      >Enfants < 4 ans</label
                    >
                  </div>
                </div>

                <div class="row">
                  <div class="col">
                    <vue-numeric-input
                      v-model="nb_adulte"
                      :min="1"
                      :step="1"
                      :max="
                        hebergement.nbr_place_dispo - nb_enfant15 - nb_enfant4
                      "
                      name="nb_adulte"
                      required
                    ></vue-numeric-input>
                  </div>

                  <!-- nb enfant =>4 -->

                  <div class="col">
                    <vue-numeric-input
                      :min="0"
                      :step="1"
                      :max="
                        hebergement.nbr_place_dispo - nb_adulte - nb_enfant4
                      "
                      name="nb_enfant15"
                      required
                      v-model="nb_enfant15"
                    ></vue-numeric-input>
                  </div>
                  <!-- nb enfant <4 -->

                  <div class="col">
                    <vue-numeric-input
                      :min="0"
                      :step="1"
                      :max="
                        hebergement.nbr_place_dispo - nb_adulte - nb_enfant15
                      "
                      name="nb_enfant4"
                      required
                      v-model="nb_enfant4"
                    ></vue-numeric-input>
                  </div>
                </div>

                <!-- din 5edma jdida -->
              </div>
            </div>

            <div class="row">
              <router-link
                :to="{
                  name: 'ReservationHebergement',
                  params: { id: hebergement.id },
                  query: {
                    du: convert_date_du,
                    au: convert_date_au,
                    nb_adulte: nb_adulte,
                    nb_enfant15: nb_enfant15,
                    nb_enfant4: nb_enfant4,

                    arr: this.calculIntervalDateRes_calender,
                  },
                }"
                ><!-- &&
                          verification_disponible == 1 -->
                <center>
                  <b-button
                    style="margin-left: 90px; margin-top: 20px"
                    v-if="
                      verif_dipo >= 0 &&
                      loggedIn &&
                      convert_date_au != convert_date_du
                    "
                    >Réserver ></b-button
                  >
                </center>
              </router-link>

              <center>
                <b-button
                  v-b-modal.modal-inscription
                  style="margin-left: 90px; margin-top: 20px"
                  v-if="
                    verif_dipo >= 0 &&
                    !loggedIn &&
                    convert_date_au != convert_date_du
                  "
                  >Réserver ></b-button
                >
              </center>

              <div
                style="
                  width: 283px;
                  height: 67px;
                  padding: 10px;
                  margin-left: 21px;
                  margin-top: 19px;
                  color: rgb(133, 100, 4);
                  background-color: rgb(235, 217, 159);
                  border-color: rgb(255, 238, 186);
                  font-size: 15px;
                  text-align: center;
                "
                v-if="verif_dipo < 0 && loggedIn"
              >
                Vous avez atteint la limite d’invitations
              </div>
            </div>

            <hr />
            <!-- supprimz -->
            <div class="row">
              <div class="col-md-5">
                <h3 style="color: #333">
                  Total:
                  {{
                    calculIntervalDateRes_calender.length *
                    (Number(nb_adulte) * hebergement.prix_adulte +
                      Number(nb_enfant15) * hebergement.prix_enfant15 +
                      Number(nb_enfant4) * hebergement.prix_enfant)
                  }}dt
                </h3>

                <p style="color: rgb(51, 51, 51); margin-top: -25px">
                  Détails: {{ calculIntervalDateRes_calender.length }} nuits
                  <br />
                  <span>{{ nb_adulte }} adultes</span><br />
                  <span
                    >&nbsp;{{
                      Number(nb_enfant15) + Number(nb_enfant4)
                    }}
                    enfants</span
                  >
                </p>
              </div>
              <div class="col-md-7" v-if="get_date_complet.length > 0">
                <div
                  style="
                    color: rgb(51, 51, 51);
                    font-size: 16px;
                    margin-top: 5px;
                  "
                >
                  <!-- ⚠️ -->
                  ⚠️ Date compléte:
                </div>
                <br />
                <ul v-for="d in get_date_complet" :key="d.id">
                  <li style="margin-top: -16px; margin-left: 15px">
                    {{ d }}
                  </li>
                </ul>
              </div>
            </div>
          </form>
          <!-- Form -->
        </div>
      </div>
    </b-modal>

    <!-- Reservation par chambre mobile -->
    <div
      class="row d-lg-none"
      style="display: block"
      v-if="hebergement.type == 'par chambre'"
    >
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
          v-if="chambre.length != 0"
          class="btn btn-info btn-block"
          type="submit"
          fill
          v-b-modal.modal-reservation-mobile
          style="margin-left: -15px; width: 110%"
        >
          Finaliser votre réservation
        </button>

        <button
          v-else
          disabled
          class="btn btn-warning btn-block"
          type="submit"
          fill
          style="margin-left: -15px; width: 110%"
        >
          Réserver maintenant
        </button>
      </div>
    </div>

    <!-- Reservation par personne/logement entier mobile -->

    <div
      class="row d-lg-none"
      style="display: block"
      v-if="
        hebergement.type == 'par personne' ||
        hebergement.type == 'Logement entier'
      "
    >
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
          class="btn btn-info btn-block"
          type="submit"
          fill
          v-b-modal.modal-reservation-personne-mobile
          style="margin-left: -15px; width: 110%"
        >
          Réserver maintenant
        </button>
      </div>
    </div>

    <Footer></Footer>
  </div>
</template>
<script>
import DateRangePicker from "vue2-daterange-picker";
//you need to import the CSS manually
import "vue2-daterange-picker/dist/vue2-daterange-picker.css";
import VuePassword from "vue-password";
import moment from "moment";
import Datepicker from "vuejs-datepicker";
import MapMarker from "../components/MapMarker";
import MapInfoWindow from "../components/MapInfoWindow";
import axios from "axios";
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
import TopNavbarHome from "./Layout/TopNavbarHome.vue";
import Footer from "./Layout/Footer.vue";
import { apiDomain } from "../config";
import InfoDepanneur from "./InfoDepanneur.vue";
import VuePhoneNumberInput from "vue-phone-number-input";
import { Facebook } from "vue-socialmedia-share";
import SocialSharing from "vue-social-sharing";
import Vr360 from "vue-360vr";
import { IntegerPlusminus } from "vue-integer-plusminus";
import VueNumberInput from "@smartweb/vue-number-input";
import Vue from "vue";
import VueGallerySlideshow from "vue-gallery-slideshow";
import Lingallery from 'lingallery';


export default {
  metaInfo: {
    title: "Home",
    meta: [
      {
        vmid: "description",
        name: "description",
        content: "This is a site to ...",
      },
    ],
  },
 /*  metaInfo() {
    return {
      title: this.hebergement.nom,
      meta: [
        { name: "viewport", content: "user-scalable=no" },
        { property: "og:title", content: "title" },
        { property: "og:type", content: "article" },
        {
          property: "og:url",
          content: `https://etnafes.com/reservationhebergement/${this.$route.params.id}`,
        },
        { property: "og:description", content: "description" },
        {
          property: "og:image",
          content:
            "https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_hebergement/144119102423Jebel-Zaghouan-etnafes-voyage.jpg",
        },
        { property: "og:image:width", content: "1000" },
      ],
    };
  }, */
  components: {
    Lingallery,

    Facebook,
    Vr360,
    IntegerPlusminus,
    VuePassword,
    TopNavbarHome,
    VuePhoneNumberInput,
    Footer,
    VueperSlides,
    VueperSlide,
    "info-content": InfoDepanneur,
    "vue-number-input": VueNumberInput,
    MapMarker,
    MapInfoWindow,
    Datepicker,
    SocialSharing,
    DateRangePicker,
    VueGallerySlideshow,

  },
  data() {
    let vv = new Date();
    //var startDate = new Date();
    // let endDate = new Date();
    var startDate = new Date(vv);
    startDate.setDate(vv.getDate() + 1);
    //  startDate.setDate(endDate.getDate() + 1);
    var endDate = new Date(vv);
    endDate.setDate(vv.getDate() + 2);

    /*  */

    /* let startDateToday = new Date();


       var endDate_t = new Date(startDateToday);
    startDate_t.setDate(startDateToday.getDate() + 1);

    var endDate_t = new Date(startDateToday);
    endDate_t.setDate(startDateToday.getDate() + 2); */

    /*  */

    return {
      off: false,
      calendarData: {},
      calendarConfigs: {
        sundayStart: false,
        dateFormat: "dd/mm/yyyy",
        isDatePicker: false,
        isDateRange: false,
      },
      dateRange: { startDate, endDate },

      dateHebergement: {
        startDate: startDate,
        endDate: endDate,
      },

      dateHebergementChambre: {
        startDate: startDate,
        endDate: endDate,
      },

      /*  dateHebergement: {
        startDate: "",
        endDate: "",
      }, */

      selectedDate: [
        //new Date(),
        // new Date(),
        //new Date(new Date().getTime() + 9 * 24 * 60 * 60 * 1000),
      ],
      chambre: [],
      chambres: [],
      verification_disponible: 0,
      verification_disponible_chambre: 0,
      loading: false,
      msg_verif: "",
      res_najeh_moez: [],
      res_najeh_moez_chambre: [],

      url: `https://etnafes.com/reservationhebergement/${this.$route.params.id}`,
      avisheb: {},
      reservation_hebergement_dates: [],
      client: [],
      guide: [],
      adagence: [],

      proprietaire: [],
      proprestau: [],
      scrollPosition: null,
      token: null,
      showinscri: true,
      activeTabName: null,
      password: null,
      password_length: 0,
      contains_eight_characters: false,
      contains_number: false,
      contains_uppercase: false,
      contains_special_character: false,
      valid_password: false,
      villespays: {},
      pays_id: "",
      type: "password",
      btnText: "Show Password",
      defaultCountry: "TN",
      loadheb: false,
      avishebergement: {},
      nbcomheb: "",
      nuit: false,
      datedes: "",
      pays: {},
      pays_id: "",
      validationErrors: "",
      nom: "",
      email: "",
      telephone: "",
      password: "",
      error: "",
      civilité: "",
      ages: [],
      seen: false,
      seendep: false,

      arr: [],
      arrd: [],

      des: {},
      dateFormat: "dd-MM-yyyy",

      dates: {},
      interval: {},
      paiement_id: "",
      isHidden: true,
      index: null,
      infoContent: "",
      infoWindowPos: {
        lat: 0,
        lng: 0,
      },
      du: "",
      next: "",
      au: "",
      nb_nuit: "",

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
      token: "",
      errorToken: null,
      tokenValid: false,
      places: [],
      currentPlace: null,

      login: false,
      entercode: false,
      nb_adulte: 1,
      nb_enfant15: 0,
      nb_enfant4: 0,
      nb_enfant: 0,

      nb_adultec: 1,
      nb_enfant15c: 0,
      nb_enfant4c: 0,
      nb_enfantc: 0,
      apiDomain: "https://etnafesapi20212018.etnafes.com",
      packsvedette: [],
      hebergements: {},
      hebergement: {},
      client: {},
      hebergeur: {},
      prop: {},

      paiements: {},
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

  filters: {
    dateCell(value) {
      let dt = new Date(value);

      return dt.getDate();
    },
    date(val) {
      return val ? val.toLocaleString() : "";
    },
  },
  created() {
    /*   if(this.calculIntervalDateRes_calender.length!=0) {
     this.fetch_res_najeh_moez();
    }  */
    // this.fetch_res_najeh_moez();

    // .catch(err => console.log(err));

    if (this.loggedIn == true) {
      this.fetchclient(this.$store.state.user.id);
      this.fetchproprietaire(this.$store.state.user.id);
      this.fetchproprestau(this.$store.state.user.id);
      this.fetchguide(this.$store.state.user.id);
      this.fetchagenceadmin(this.$store.state.user.id);
    }
    this.fetchLocations(this.$route.params.id);
    this.fetchHebergement(this.$route.params.id);
    this.fetchHebergementDateRes(this.$route.params.id);

    this.fetchPaiements();
    this.fetchPays();

    Bus.$on("markers_fetched", (data) => {
      this.markersh = data.markersh;
      this.center = data.markersh.position;
    });

    Bus.$on("marker_result_clicked", (index) => {
      let targetMarker = this.markersh;
      this.center = targetMarker.position;
      this.toggleInfoWindow(targetMarker, index);
    });
  },
  mounted() {
    /* update nb vu au pack */
    if (this.loggedIn) {
      let formData = new FormData();

      // this.article.article_id = article.id;
      formData.append("heb_id", this.$route.params.id);
      //ID de depanneur
      formData.append("user_id", this.$store.state.user.id),
        axios
          .post(`${apiDomain}/api/ajouter_compteur_vu`, formData, {
            body: JSON.stringify(this.annonce),
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })

          .then((res) => {})

          .catch((error) => {
            // console.log(error.response.data);
          });
    }
  },
  computed: {

    get_image() {
       var result = [];
      var moyenne = "";

      const res = this.hebergement.images_hebergement;
      for (var i = 0; i < res.length; i++) {
          moyenne =res[i].url_image;
          result.push(moyenne);
 
      }

      return result;
    },

    get_image_url() {
      var result = [];
      var moyenne = "";

      const res = this.hebergement.images_hebergement;
      for (var i = 0; i < res.length; i++) {
          moyenne =
            "https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_hebergement/" +
            res[i].url_image;
          // result.push(moyenne);
          result.push({ src: moyenne, thumbnail:moyenne });
 
      }

      return result;
    },
    fetch_res_najeh_moez(id) {
      var tab = [];
      axios
        .get(
          `${apiDomain}/api/getDatesReservation_cl/${this.$route.params.id}/${this.calculIntervalDateRes_calender}`
        )
        // .then((res) => res.json())
        .then((res) => {
          tab = this.res_najeh_moez = res;
        });
      return tab;
    },

    fetch_res_najeh_moez_chambre(id) {
      var a = [];
      fetch(
        `${apiDomain}/api/getDatesReservation_clChambre/${this.$route.params.id}/${this.calculIntervalDateResChambre_calender}`
      )
        .then((res) => res.json())
        .then((res) => {
          a = this.res_najeh_moez_chambre = res;
        });
      return a;
    },
    convert_date_au_date_du() {
      if (this.convert_date_du === this.convert_date_au) {
        return (this.au = this.du.setDate(au.getDate() + 1));
      }
    },
    convert_date_du() {
      /*  if (this.dateHebergement.startDate != "") { */
      return (this.du = this.dateHebergement.startDate
        .toISOString()
        .split("T")[0]);
      /*  } */
    },

    convert_date_du_chambre() {
      return (this.du = this.dateHebergementChambre.startDate
        .toISOString()
        .split("T")[0]);
    },

    convert_date_au() {
      /*   if (this.dateHebergement.endDate != "") { */
      return (this.au = this.dateHebergement.endDate
        .toISOString()
        .split("T")[0]);
      /* } */
    },

    convert_date_au_chambre() {
      return (this.au = this.dateHebergementChambre.endDate
        .toISOString()
        .split("T")[0]);
    },
    nb_adulte_Moez() {
      return this.nb_adulte;
    },

    nb_enfant_Moez() {
      return this.nb_enfant;
    },
    nbr_places_total_Moez() {
      return Number(this.nb_adulte_Moez) + Number(this.nb_enfant_Moez);
    },

    nb_adulte_Moez_chambre() {
      return this.nb_adultec;
    },

    nb_enfant_Moez_chambre() {
      return this.nb_enfantc;
    },
    nbr_places_total_Moez_chambre() {
      return (
        Number(this.nb_adulte_Moez_chambre) +
        Number(this.nb_enfant_Moez_chambre)
      );
    },
    get_disponibilite() {
      const res_najeh_moez = this.res_najeh_moez;
      var result = [];
      const res = 0;
      for (var i = 0; i < res_najeh_moez.length; i++) {
        if (res_najeh_moez[i].length == 0) {
          var testt =
            this.hebergement.nbr_place_dispo - this.nbr_places_total_Moez;
          result.push(testt);
        }
        if (res_najeh_moez[i].length == 1) {
          var testtt =
            res_najeh_moez[i][0].places_disponibles -
            this.nbr_places_total_Moez;
          result.push(testtt);
        }
      }
      return result;
    },

    get_disponibilite_chambre() {
      const res_najeh_moez = this.res_najeh_moez_chambre;
      var result = [];
      const res = 0;
      for (var i = 0; i < res_najeh_moez.length; i++) {
        if (res_najeh_moez[i].length == 0) {
          var testt = this.chambre.nb_places;
          result.push(testt);
        }
        if (res_najeh_moez[i].length == 1) {
          var testtt = -1;
          result.push(testtt);
        }
      }
      return result;
    },

    get_date_complet() {
      const res_najeh_moez = this.res_najeh_moez;
      var result = [];
      const res = 0;
      for (var i = 0; i < res_najeh_moez.length; i++) {
        if (res_najeh_moez[i].length == 1) {
          var date = res_najeh_moez[i][0].places_disponibles;
          if (date == 0) {
            result.push(res_najeh_moez[i][0].date);
          }
        }
      }
      return result;
    },

    get_date_complet_chambre() {
      const res_najeh_moez = this.res_najeh_moez_chambre;
      var result = [];
      const res = 0;
      for (var i = 0; i < res_najeh_moez.length; i++) {
        if (res_najeh_moez[i].length == 1) {
          var date = res_najeh_moez[i][0].places_disponibles;
          if (date == 0) {
            result.push(res_najeh_moez[i][0].date);
          }
        }
      }
      return result;
    },
    verif_dipo() {
      const verif = this.get_disponibilite;
      var largest = Math.min.apply(Math, verif);
      return largest;
    },

    verif_dipo_chambre() {
      const verif = this.get_disponibilite_chambre;
      var largest = Math.min.apply(Math, verif);
      return largest;
    },

    calculIntervalDateRes_calender(du, au) {
      var du = this.du,
        au = this.au;

      var date_res = [],
        dt = new Date(du);

      while (dt < new Date(au)) {
        date_res.push(new Date(dt));
        dt.setDate(dt.getDate() + 1);
      }
      for (var l = 0; l < date_res.length; l++) {
        var month = date_res[l].getUTCMonth() + 1;
        var day = date_res[l].getUTCDate();
        var year = date_res[l].getUTCFullYear();
        // date_res[l] = day + "-" + month + "-" + year ;
        date_res[l] = year + "-" + month + "-" + day;
      }

      const before = this.beforeShowDay;
      for (var j = 0; j < date_res.length; j++) {
        for (var k = 0; k < before.length; k++) {
          if (date_res[j] == before[k]) {
            alert(
              "La réservation est pour deux nuits successifs au minimum la date " +
                date_res[j] +
                " est déja réservée"
            );
            this.au = "";
          }
        }
      }
      return (this.date_res = date_res);
    },

    calculIntervalDateResChambre_calender(du, au) {
      var du = this.du,
        au = this.au;

      var date_res = [],
        dt = new Date(du);

      while (dt < new Date(au)) {
        date_res.push(new Date(dt));
        dt.setDate(dt.getDate() + 1);
      }
      for (var l = 0; l < date_res.length; l++) {
        var month = date_res[l].getUTCMonth() + 1;
        var day = date_res[l].getUTCDate();
        var year = date_res[l].getUTCFullYear();
        // date_res[l] = day + "-" + month + "-" + year ;
        date_res[l] = year + "-" + month + "-" + day;
      }

      const before = this.beforeShowDay;
      for (var j = 0; j < date_res.length; j++) {
        for (var k = 0; k < before.length; k++) {
          if (date_res[j] == before[k]) {
            alert(
              "La réservation est pour deux nuits successifs au minimum la date " +
                date_res[j] +
                " est déja réservée"
            );
            this.au = "";
          }
        }
      }
      return (this.date_res = date_res);
    },

    ArrayDateReserves() {
      const reservation_hebergement_dates = this.reservation_hebergement_dates;
      var result = [];
      var somme = null;
      for (var i = 0; i < reservation_hebergement_dates.length; i++) {
        somme = reservation_hebergement_dates[i].date;
        result.push(somme);
      }
      return result;
    },

    ArrayNbDispoReserves() {
      const reservation_hebergement_dates = this.reservation_hebergement_dates;
      var result = [];
      var somme = null;
      for (var i = 0; i < reservation_hebergement_dates.length; i++) {
        somme = reservation_hebergement_dates[i].places_disponibles;
        result.push(somme);
      }
      return result;
    },

    /* *******  **** date fin rrserves************** */

    tel() {
      var t = this.client.telephone.replace(/ /g, "");
      return t;
    },
    calculPrix() {
      const hebergement = this.hebergement;
      const agestab = this.ages;
      var result = [];
      var somme = null;

      var sommeprixenfant4 = 0;
      var sommeprixenfant15 = 0;
      if (this.ages.length != 0) {
        for (var i = 0; i < agestab.length; i++) {
          if (agestab[i] <= 4) {
            sommeprixenfant4 += hebergement.prix_enfant;
          }
          if (agestab[i] > 4) {
            sommeprixenfant15 += hebergement.prix_enfant15;
          }
        }

        somme += sommeprixenfant4 + sommeprixenfant15;
        result.push(somme);
      }
      return result;
    },
    loggedIn() {
      return this.$store.getters.get_loggedIn;
    },

    user() {
      return this.$store.getters.get_user;
    },

    /*   adultes: {
      get() {
        return this.$store.state.nb_adulte;
      },
      set(value) {
        this.$store.commit("updateNbAdulte", value);
      }
    }, */
    /*   enfants: {
      get() {
        return this.$store.state.nb_enfant;
      },
      set(value) {
        this.$store.commit("updateNbEnfant", value);
      }
    }, */
    beforeShowDay() {
      var dispo = this.hebergement.disponibilite;
      var des = [];
      if (dispo) {
        des = dispo.split(",").sort();
      }
      return des;
    },
  },
  methods: {
    Saveloading() {
      this.loading = !false;
      setTimeout(() => {
        this.loading = !true;
      }, 800);
    },
  
    dateFormatHebrgement(classes, date) {
      if (!classes.disabled) {
        classes.disabled = date.getTime() < new Date();
      }
      return classes;
    },
    verification() {
      // this.fetch_res_najeh_moez();
      if (this.verif_dipo >= 0) {
        /*  alert("disponible"); */
        return (this.verification_disponible = 1), (this.msg_verif = "");
      } else {
        /*    alert(" Non disponible"); */
        return (
          (this.verification_disponible = 0),
          (this.msg_verif = "Vous avez atteint la limite d’invitations")
        );
      }
    },

    verification_chambre() {
      if (this.verif_dipo_chambre >= 0) {
        return (
          (this.verification_disponible_chambre = 1), (this.msg_verif = "")
        );
      } else {
        return (
          (this.verification_disponible_chambre = 0),
          (this.msg_verif = "Vous avez atteint la limite d’invitations")
        );
      }
    },
    /*  fetch_res_najeh_moez(id) {
      fetch(
        `${apiDomain}/api/getDatesReservation_cl/${this.calculIntervalDateRes_calender}`
      )
        .then((res) => res.json())
        .then((res) => {
          this.res_najeh_moez = res;
        });
    }, */

    addAvisHebergement() {
      axios
        .post(`${apiDomain}/api/avis/hebergement`, {
          email: this.$store.state.user.email,
          commentaire: this.avisheb.commentaire,
          nbr_etoile: this.avisheb.nbr_etoile,
          hebergement_id: this.$route.params.id,
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
    fetchagenceadmin(id) {
      fetch(`${apiDomain}/api/agencead/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.adagence = res.adagence;
        });
      // .catch(err => console.log(err));
    },
    fetchguide(id) {
      fetch(`${apiDomain}/api/guide/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.guide = res.guide;
        });
      // .catch(err => console.log(err));
    },
    fetchproprestau(id) {
      fetch(`${apiDomain}/api/proprietaire_restau/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.proprestau = res.proprietaire;
        });
      // .catch(err => console.log(err));
    },
    fetchproprietaire(id) {
      fetch(`${apiDomain}/api/prop/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.proprietaire = res.proprietaire;
        });
      // .catch(err => console.log(err));
    },

    fetchclient(id) {
      fetch(`${apiDomain}/api/client/${id}?token=${this.$store.state.token}`)
        .then((res) => res.json())
        .then((res) => {
          this.client = res;
        });
      // .catch(err => console.log(err));
    },
    fetchLocations(id) {
      axios
        .post(`${apiDomain}/api/findheb/${id}`, { center: this.center })
        .then((response) => {
          let data = response.data;
          Bus.$emit("markers_fetched", data);
        });
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
    fetchPays() {
      axios.get(`${apiDomain}/api/pays`).then(({ data }) => (this.pays = data));
    },
    fetchVillesPays(id) {
      axios
        .get(`${apiDomain}/api/pays/villes/${id}`)
        .then(({ data }) => (this.villespays = data.villes));
    },
    showPassword() {
      if (this.type === "password") {
        this.type = "text";
        this.btnText = "Hide Password";
      } else {
        this.type = "password";
        this.btnText = "Show Password";
      }
    },
    removeAge: function (index) {
      Vue.delete(this.ages, index);
      this.nb_enfant = this.nb_enfant - 1;
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

      axios.post(`${apiDomain}/api/form/mail`, {
        mail: this.client.email,
      });
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
          console.log("test najeh moez");
          if (this.hebergement.type == "par chambre") {
            this.$router.push({
              name: "ReservationHebergement",
              params: { id: this.$route.params.id },
              query: {
                du: this.convert_date_du_chambre,
                au: this.convert_date_au_chambre,
                nb_adulte: this.chambre.nb_places,
                nb_places_chambre: this.chambre.nb_places,
                chambre: this.chambre.nom,
                chambreid: this.chambre.id,

                arr: this.calculIntervalDateResChambre_calender,
              },
            });
          } else if (this.hebergement.type == "par personne") {
            this.$router.push({
              name: "ReservationHebergement",
              params: { id: this.$route.params.id },
              query: {
                du: this.du,
                au: this.au,
                nb_adulte: this.nb_adulte,
                nb_enfant: this.nb_enfant,
                nb_enfant15: this.nb_enfant15,
                nb_enfant4: this.nb_enfant4,

                ages: this.ages,
                arr: this.calculIntervalDateRes_calender,
              },
            });
          }
        })
        .catch((err) => {
          this.error =
            "L’e-mail entré ne correspond à aucun compte. Veuillez créer un compte.";
          // console.log(err.message);
        });

      axios.post(`${apiDomain}/api/login/mail`, {
        mail: this.email,
      });
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
          telephone: this.client.telephone.split(" ").join(""),
          email: this.client.email,
          // login: this.client.login,
          ville_id: this.client.ville_id,
          /* civilité: this.civilité,
          gouvernorat: this.gouvernorat, */
          // agence_id: this.agence_id,
          password: this.password,
        })
        .then((res) => {
          this.loadingInscription = false;
          this.$noty.success("veuillez vérifier votre compte.");

          if (this.hebergement.type == "par chambre") {
            this.$router.push({
              name: "ReservationHebergement",
              params: { id: this.$route.params.id },
              query: {
                du: this.convert_date_du_chambre,
                au: this.convert_date_au_chambre,
                nb_adulte: this.chambre.nb_places,
                nb_places_chambre: this.chambre.nb_places,
                chambre: this.chambre.nom,
                chambreid: this.chambre.id,

                arr: this.calculIntervalDateResChambre_calender,
              },
            });
          } else if (this.hebergement.type == "par personne") {
            this.$router.push({
              name: "ReservationHebergement",
              params: { id: this.$route.params.id },
              query: {
                du: this.du,

                au: this.au,
                nb_adulte: this.nb_adulte,
                nb_enfant: this.nb_enfant,
                nb_enfant15: this.nb_enfant15,
                nb_enfant4: this.nb_enfant4,

                ages: this.ages,
                arr: this.calculIntervalDateRes_calender,
              },
            });
          }
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

    addClient__() {
      this.entercode = false;
      axios
        .post(`${apiDomain}/api/register/client`, {
          nom: this.client.nom,
          prenom: this.client.prenom,
          ville_id: this.client.ville_id,

          telephone: this.tel,
          email: this.client.email,
          civilité: this.civilité,
          password: this.password,

          gouvernorat: this.gouvernorat,
          agence_id: this.agence_id,
          headers: {
            "content-type": "application/json",
          },
        })
        .then((response) => {
          if (response.status == 201) {
            this.showinscri = false;
          }
        })
        .catch((error) => {
          if (error.response && error.response.status == 400) {
            this.validationErrors = error.response.data;
          }
        });
    },
    addReservation() {
      axios
        .post(`${apiDomain}/api/reservation/hebergement`, {
          du: this.du,
          au: this.au,
          paye: 0,
          hebergement_id: this.$route.params.id,
          client_id: this.$store.state.user.id,
          prix_remise: this.prix_remise,
          nbr_place: Number(this.nb_adulte) + Number(this.nb_enfant),
          nb_adulte: this.nb_adulte,

          prix_total:
            (this.nb_adulte * this.hebergement.prix_adulte +
              this.calculPrix[0]) *
            (this.calculIntervalDateRes_calender.length - 1),
          headers: {
            "content-type": "application/json",
          },
        })
        .then((response) => {
          if (response.status == 200) {
            alert("réservation avec succés");
          }
        })
        .catch((error) => {
          if (error.response && error.response.status == 400) {
            this.validationErrors = error.response.data;
          }
        });
    },

    addReservationChambre() {
      axios
        .post(`${apiDomain}/api/reservation/hebergement/chambre`, {
          du: this.du,
          au: this.au,
          paye: 0,
          hebergement_id: this.$route.params.id,
          client_id: this.$store.state.user.id,
          prix_remise: this.prix_remise,
          nbr_place: Number(this.nb_adultec) + Number(this.nb_enfantc),
          nb_adulte: this.nb_adultec,

          prix_total:
            (this.nb_adultec * this.hebergement.prix_adulte +
              this.calculPrix[0]) *
            (this.calculIntervalDateResChambre_calender.length - 1),
          headers: {
            "content-type": "application/json",
          },
        })
        .then((response) => {
          if (response.status == 200) {
            alert("réservation avec succés");
          }
        })
        .catch((error) => {
          if (error.response && error.response.status == 400) {
            this.validationErrors = error.response.data;
          }
        });
    },
    test() {
      const interval = this.beforeShowDay;
      var du = new Date(this.du);
      var month = du.getUTCMonth() + 1;
      var d = du.getUTCDate() + 1;
      var day = ("0" + d).slice(-2);
      var year = du.getUTCFullYear();

      var nextDay = du.getUTCDate() + 1;
      var nextDD = ("0" + nextDay).slice(-2);
      var nextDate = year + "-" + month + "-" + nextDD;

      this.next = nextDate;
      var result = [];
      var somme = null;
      if (interval.includes(this.next)) {
        this.seendep = false;
        this.nuit = true;
      } else {
        this.seendep = true;
        this.nuit = false;
        if (this.interval != undefined) {
          if (this.next != interval[i]) {
            for (var i = 0; i < interval.length; i++) {
              if (this.next < interval[i]) {
                this.datedes = interval[i];
                break;
              }
            }
          }
        }
      }
    },

    /* fetchPays() {
      axios.get(`${apiDomain}/api/pays`).then(({ data }) => (this.pays = data));
    }, */
    addNewAge: function () {
      this.ages.push(Vue.util.extend({}, this.age));
    },

    updateNbAdulte(e) {
      this.$store.commit("updateNbAdulte", e.target.value);
    },

    updateNbEnfant(e) {
      this.seen = true;
      this.$store.commit("updateNbEnfant", e.target.value);
    },
    dateDisabled(dmy, date) {
      const interval = this.beforeShowDay;
      var m = date.getUTCMonth() + 1;
      var d = date.getUTCDate() + 1;
      var day = ("0" + d).slice(-2);
      var month = ("0" + m).slice(-2);
      var year = date.getUTCFullYear();

      var newdate = year + "-" + month + "-" + day;

      var du = new Date(newdate);
      var nextDay = du.getUTCDate() + 1;
      var nextDD = ("0" + nextDay).slice(-2);
      var nextDate = year + "-" + month + "-" + nextDD;

      var prevDay = du.getUTCDate() - 1;
      var prevDD = ("0" + prevDay).slice(-2);
      var prevDate = year + "-" + month + "-" + prevDD;

      /* console.log(nextDate);
      console.log(prevDate); */

      for (var i = 0; i < interval.length; i++) {
        if (newdate == interval[i]) {
          return true;
        }
      }

      if (interval.includes(nextDate) && interval.includes(prevDate)) {
        return true;
      }
    },

    dateDisabledDep(dmy, date) {
      const interval = this.beforeShowDay;
      var month = date.getUTCMonth() + 1;
      var d = date.getUTCDate() + 1;
      var day = ("0" + d).slice(-2);
      var year = date.getUTCFullYear();
      var newdate = year + "-" + month + "-" + day;

      for (var i = 0; i < interval.length; i++) {
        if (newdate == interval[i]) {
          return true;
        }
      }
      if (this.datedes != "") {
        if (newdate >= this.datedes) {
          return true;
        }
      }
    },

    customFormatter(date) {
      return (this.interval = moment(date).format("YYYY-mm-dd"));
    },

    calculIn(du, date) {
      const interval = this.beforeShowDay;

      var month = date.getUTCMonth() + 1;
      var d = date.getUTCDate() + 1;
      var day = ("0" + d).slice(-2);
      var year = date.getUTCFullYear();

      var newdate = day + "-" + month + "-" + year;

      var du = new Date(this.du);

      var nextDay = du.getUTCDate() + 1;
      var nextDate = nextDay + "-" + month + "-" + year;

      // console.log(nextDate);
      for (var i = 0; i < interval.length; i++) {
        if (du != interval[i] && nextDate == interval[i]) {
          return true;
        }
      }
    },

    calculInterval(du, au) {
      var du = this.du,
        au = this.au;

      var arr = [],
        dt = new Date(du);

      while (dt <= new Date(au)) {
        arr.push(new Date(dt));
        dt.setDate(dt.getDate() + 1);
      }
      for (var l = 0; l < arr.length; l++) {
        var month = arr[l].getUTCMonth() + 1;
        var day = arr[l].getUTCDate();
        var year = arr[l].getUTCFullYear();
        arr[l] = day + "-" + month + "-" + year;
      }

      const before = this.beforeShowDay;
      for (var j = 0; j < arr.length; j++) {
        for (var k = 0; k < before.length; k++) {
          if (arr[j] == before[k]) {
            alert(
              "La réservation est pour deux nuits successifs au minimum la date " +
                arr[j] +
                " est déja réservée"
            );
            this.au = "";
          }
        }
      }
      return (this.arr = arr);
    },

    initialiser() {
      (this.du = ""), (this.au = "");
    },
    testdispo() {
      var range = this.getDates(new Date(this.du), new Date(this.au));
      const before = this.beforeShowDay;
      for (var j = 0; j < range.length; j++) {
        for (var k = 0; k < before.length; j++) {
          if (range[j] == before[k]) {
            alert("Imposible");
          }
        }
      }
    },

    fetchPaiements() {
      axios
        .get(`${apiDomain}/api/paiements`)
        .then(({ data }) => (this.paiements = data));
    },
    hasHistory() {
      return window.history.length > 2;
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

    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
    fetchPacksVedette(ville_id) {
      axios
        .get(`${apiDomain}/api/packs/reservation/${ville_id}`)
        .then(({ data }) => (this.packsvedette = data.pack));
    },

    fetchHebergementDateRes(id) {
      fetch(`${apiDomain}/api/dateReserve/${id}`)
        .then((res) => res.json())
        .then((res) => {
          // this.hebergement = res.hebergement;
          this.reservation_hebergement_dates =
            res.hebergement.reservation_hebergement_dates;
        });
    },

    fetchHebergement(id) {
      fetch(`${apiDomain}/api/hebergement/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.hebergement = res.hebergement;
          this.chambres = res.hebergement.chambres;

          this.prop = res.hebergement.proprietaire;

          this.hebergeur = res.hebergement.proprietaire.client;

          this.imagehebergements = res.hebergement.images_hebergement;
        });
      // .catch(err => console.log(err));

      axios
        .get(`${apiDomain}/api/avishebergement/${id}`)
        .then(
          ({ data }) => (
            (this.avishebergement = data.hebergement),
            (this.nbcomheb = data.nbcomheb)
          )
        );
    },

    fetchChambre(id) {
      fetch(`${apiDomain}/api/chambre/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.chambre = res.chambre;
        });
    },
    fetchPacks(id) {
      axios
        .get(`${apiDomain}/api/packs/${id}`)
        .then(({ data }) => (this.pack = data.packdetail));
    },
  },
};
</script>

<style>
div.sticky {
  position: sticky;
  margin-top: 20px;

  background-color: yellow;
  padding: 50px;
  font-size: 20px;
}

.vue-numeric-input {
  position: relative;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  /* height: 2.8rem; */
  width: 81px !important;
}
/* Dropdown Button */
.dropbtn {
  background-color: #3b5998;
  color: white;
  padding: 10px;
  font-size: 16px;
  border: none;
}

.vrButton {
  padding: 0.1em !important;
}
.componentContainer {
  min-width: 30vw !important;
  min-height: 35vh !important;
}

.myCanvas {
  position: absolute;
  left: 0;
  z-index: 0;
  width: 80%;
  height: 0%;
  -ms-touch-action: none;
  touch-action: none;
  cursor: -webkit-grab;
  cursor: grab;
}

/* .vue-daterange-picker {
    position: relative;
    display: inline-block;
    min-width: 26px;
    max-width: 105px;
} */

.reportrange-text {
  background: #fff;
  cursor: pointer;
  padding: 5px 10px;
  border: 1px solid #ccc;
  width: 100%;
  overflow: hidden;
  line-height: 18px;
}

.daterangepicker.openscenter {
  right: auto;
  left: 0 !important;
}
</style>
