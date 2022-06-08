<template>
  <div class="content">
    <div class="row">
      <div class="col-md-12">
        <card>
          <template slot="header">
            <h5 class="title" style="padding-top:15px">Ajouter un hébergement</h5>
          </template>
          <form @submit.prevent="createHebergement">
            <div class="row">
              <div class="col-md-3 pr-md-1 text-left">
                <base-input label="Nom" placeholder="Nom" name="nom" v-model="hebergement.nom"></base-input>

                <p v-if="validationErrors.nom" style="padding-bottom:5px;color:red">
                  <span class="alert-link">** {{ validationErrors.nom[0] }}</span>
                </p>
              </div>

              <div class="col-md-5 pr-md-1 text-left">
                  <base-input
                    placeholder="exemple:https://www.youtube.com/embed/YMjapYxhWaw"
                    label="URL vidéo"
                    v-model="hebergement.url_video"
                    type="text"
                  ></base-input>
                  <p v-if="validationErrors.url_video" style="padding-bottom:5px;color:red">
                    <span class="alert-link">** {{ validationErrors.url_video[0] }}</span>
                  </p>
                </div>
              <div class="col-md-2 pl-md-1 text-left">
                <label class="control-label">
                  Nombre des voyageurs
                  <span
                    v-if="validationErrors.nbr_voyageurs"
                    style="padding-bottom:5px;color:red"
                  >
                    <span class="alert-link">** {{ validationErrors.nbr_voyageurs[0] }}</span>
                  </span>
                </label>
                <base-input
                  oninput="this.value = Math.round(this.value);"
                  min="0"
                  step="1"
                  type="number"
                  class="numHeb"
                  placeholder="Nombre des voyageurs"
                  v-model="hebergement.nbr_voyageurs"
                ></base-input>
              </div>

              <div class="col-md-2 pl-md-1 text-left">
                <label class="control-label">
                  Places disponibles
                  <span
                    v-if="validationErrors.nbr_place_dispo"
                    style="padding-bottom:5px;color:red"
                  >
                    <span class="alert-link">** {{ validationErrors.nbr_place_dispo[0] }}</span>
                  </span>
                </label>
                <base-input
                  oninput="this.value = Math.round(this.value);"
                  type="number"
                  class="numHeb"
                  min="0"
                  placeholder="Places disponibles"
                  v-model="hebergement.nbr_place_dispo"
                ></base-input>
              </div>
            </div>
            <div class="row">
              <div class="col-md-3 pr-md-1 text-left">
                <label class="control-label">
                  Prix adulte
                  <span
                    v-if="validationErrors.prix_adulte"
                    style="padding-bottom:5px;color:red"
                  >
                    <span class="alert-link">** {{ validationErrors.prix_adulte[0] }}</span>
                  </span>
                </label>
                <base-input
                  oninput="this.value = Math.round(this.value);"
                  placeholder=" 0dt"
                  name="prix_adulte"
                  min="0"
                  class="numHeb"
                  v-model="hebergement.prix_adulte"
                  type="number"
                ></base-input>
              </div>
              <div class="col-md-3 pl-md-1 text-left">
                <label class="control-label">
                  Prix pour enfant moins que 4 ans
                  <span
                    v-if="validationErrors.prix_enfant"
                    style="padding-bottom:5px;color:red"
                  >
                    <span class="alert-link">** {{ validationErrors.prix_enfant[0] }}</span>
                  </span>
                </label>
                <base-input
                  class="numHeb"
                  oninput="this.value = Math.round(this.value);"
                  min="0"
                  placeholder=" 0dt"
                  step="1"
                  name="prix_enfant"
                  v-model="hebergement.prix_enfant"
                  type="number"
                ></base-input>
              </div>

              <div class="col-md-3 pl-md-1 text-left">
                <label class="control-label">
                  Prix pour enfant plus que 4 ans
                  <span
                    v-if="validationErrors.prix_enfant15"
                    style="padding-bottom:5px;color:red"
                  >
                    <span class="alert-link">** {{ validationErrors.prix_enfant15[0] }}</span>
                  </span>
                </label>
                <base-input
                  oninput="this.value = Math.round(this.value);"
                  class="numHeb"
                  placeholder=" 0dt"
                  step="1"
                  name="prix_enfant15"
                  min="0"
                  v-model="hebergement.prix_enfant15"
                  type="number"
                ></base-input>
              </div>

              <div class="col-md-3 pl-md-1 text-left">
                <div class="form-group">
                  <label>Catégorie</label>
                  <select
                    style="height: calc(2.25rem + 2px);"
                    class="form-control"
                    required
                    v-model="hebergement.categorie"
                  >
                    <option value disabled selected>catégorie de votre logement</option>
                    <option>Cabanes</option>
                    <option>Centre de camping</option>
                    <option>Châteaux</option>
                    <option>Dômes</option>
                    <option>Gite rural</option>
                    <option>Maison d'hôtes</option>
                    <option>Yourte</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-3 pr-md-1 text-left">
                <base-input
                  min="0"
                  class="numHeb"
                  label="Nombre des chambres disponibles"
                  type="number"
                  placeholder="Nombre des chambres disponibles"
                  disabled
                  :value="Number(hebergement.chambre_a_deux)+Number(hebergement.chambre_a_trois)+Number(hebergement.chambre_individuel)"
                ></base-input>
                <p v-if="validationErrors.nbr_chambre_dispo" style="padding-bottom:5px;color:red">
                  <span class="alert-link">* {{ validationErrors.nbr_chambre_dispo[0] }}</span>
                </p>
              </div>
              <div class="col-md-3 px-md-1 text-left">
                <base-input
                  class="numHeb"
                  min="0"
                  label="(Chambre individuel)"
                  type="number"
                  placeholder="Nombre des chambres Individuel"
                  v-model="hebergement.chambre_individuel"
                ></base-input>
                <p v-if="validationErrors.chambre_individuel" style="padding-bottom:5px;color:red">
                  <span class="alert-link">** {{ validationErrors.chambre_individuel[0] }}</span>
                </p>
              </div>

              <div class="col-md-3 pl-md-1 text-left">
                <base-input
                  min="0"
                  class="numHeb"
                  label="(Chambre à deux)"
                  type="number"
                  placeholder="Nombre des chambres à deux"
                  v-model="hebergement.chambre_a_deux"
                ></base-input>
                <p v-if="validationErrors.chambre_a_deux" style="padding-bottom:5px;color:red">
                  <span class="alert-link">** {{ validationErrors.chambre_a_deux[0] }}</span>
                </p>
              </div>

              <div class="col-md-3 pl-md-1 text-left">
                <base-input
                  min="0"
                  class="numHeb"
                  label="(Chambre à trois)"
                  type="number"
                  placeholder="Nombre des chambres à trois"
                  v-model="hebergement.chambre_a_trois"
                ></base-input>
                <p v-if="validationErrors.chambre_a_trois" style="padding-bottom:5px;color:red">
                  <span class="alert-link">** {{ validationErrors.chambre_a_trois[0] }}</span>
                </p>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12 pr-md-1 text-left">
                <!-- <label>WiFi</label> -->
                <div class="checkbox">
                  <label>
                    <input
                      aria-label="label"
                      name="wifi"
                      type="checkbox"
                      true-value="1"
                      false-value="0"
                      v-model.number="hebergement.wifi"
                    /> Wi-Fi
                  </label>&nbsp;
                  <label>
                    <input
                      aria-label="label"
                      true-value="1"
                      false-value="0"
                      name="lave_linge"
                      type="checkbox"
                      value="1"
                      v-model="hebergement.lave_linge"
                    /> Lave-linge
                  </label>
                  &nbsp;
                  <label>
                    <input
                      aria-label="label"
                      true-value="1"
                      false-value="0"
                      name="chauffage"
                      type="checkbox"
                      value="1"
                      v-model="hebergement.chauffage"
                    /> Chauffage
                  </label>
                  &nbsp;
                  <label>
                    <input
                      aria-label="label"
                      true-value="1"
                      false-value="0"
                      name="television"
                      type="checkbox"
                      value="1"
                      v-model="hebergement.television"
                    /> Television
                  </label>
                  &nbsp;
                  &nbsp;
                  <label>
                    <input
                      aria-label="label"
                      true-value="1"
                      false-value="0"
                      name="climatisation"
                      type="checkbox"
                      value="1"
                      v-model="hebergement.climatisation"
                    /> Climatisation
                  </label>
                  &nbsp;&nbsp;
                  <label>
                    <input
                      aria-label="label"
                      true-value="1"
                      false-value="0"
                      name="eau_chaude"
                      type="checkbox"
                      value="1"
                      v-model="hebergement.eau_chaude"
                    /> Eau Chaude
                  </label>
                  &nbsp;&nbsp;
                  <label>
                    <input
                      aria-label="label"
                      true-value="1"
                      false-value="0"
                      name="espace_travail_ordinateur"
                      type="checkbox"
                      value="1"
                      v-model="hebergement.espace_travail_ordinateur"
                    /> Espace de travail pour ordinateur
                  </label>
                  &nbsp;&nbsp;
                  <label>
                    <input
                      aria-label="label"
                      true-value="1"
                      false-value="0"
                      name="espace_enfant"
                      type="checkbox"
                      value="1"
                      v-model="hebergement.espace_enfant"
                    /> Espace pour enfant
                  </label>
                  &nbsp;&nbsp;
                  <label>
                    <input
                      aria-label="label"
                      true-value="1"
                      false-value="0"
                      name="salle_de_bain"
                      type="checkbox"
                      value="1"
                      v-model.number="hebergement.salle_de_bain"
                    /> Salle de bain
                  </label>
                  &nbsp;&nbsp;
                  <label>
                    <input
                      aria-label="label"
                      true-value="1"
                      false-value="0"
                      name="cuisine"
                      type="checkbox"
                      value="1"
                      v-model="hebergement.cuisine"
                    /> Cuisine
                  </label>
                </div>
              </div>
            </div>
            <br />
            <div class="row">
              <div class="col-md-12">
                <gmap-autocomplete
                  name="adresse"
                  @place_changed="setPlace"
                  @mouseout="addMarker"
                  style="border: 1px solid #ced4da;border-radius: 0.25rem;
          transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
          padding: 0.375rem 0.75rem;width: 100%;"
                ></gmap-autocomplete>
                <p v-if="validationErrors.adresse" style="padding-bottom:5px;color:red">
                  <span class="alert-link">** {{ validationErrors.adresse[0] }}</span>
                </p>
                <br />
                <input
                  aria-label="label"
                  name="latitude"
                  type="hidden"
                  id="lat"
                  v-model="hebergement.center.lat"
                />
                <input
                  aria-label="label"
                  name="longitude"
                  type="hidden"
                  id="lng"
                  v-model="hebergement.center.lng"
                />
              </div>
            </div>
            <br />

            <div class="row">
              <div class="col-md-12">
                <gmap-map
                  :center="hebergement.center"
                  :zoom="6"
                  style="width:100%;  height: 270px;"
                >
                  <gmap-marker
                    :key="index"
                    v-for="(m, index) in markers"
                    :position="m.position"
                    @click="hebergement.center=m.position"
                  ></gmap-marker>
                </gmap-map>
              </div>
            </div>

            <div class="row" style="margin-top:30px">
              <div class="col-sm-12 col-xs-3">
                <div class="row">
                  <div class="col-md-4">
                    <div class="form-group">
                      <label>Pays</label>
                      <select
                        class="form-control"
                        required
                        v-model="pays_id"
                        @change="fetchVillesPays(pays_id)"
                      >
                        <option value disabled selected>pays</option>
                        <option
                          v-for="pays in pays"
                          v-bind:key="pays.id"
                          v-bind:value="pays.id"
                        >{{pays.nom_fr_fr}}</option>
                      </select>
                    </div>
                  </div>

                  <div class="col-md-4">
                    <div class="form-group">
                      <label>Gouvernorat</label>
                      <select
                        class="form-control"
                        id="SelectRegion"
                        @change="updateVilleid;fetchSousVille(hebergement.ville_id)"
                        v-model="hebergement.ville_id"
                      >
                        <option value disabled selected>gouvernorat</option>
                        <option
                          v-for="ville in villespays"
                          v-bind:key="ville.id"
                          v-bind:value="ville.id"
                        >{{ville.nom}}</option>
                      </select>
                    </div>
                  </div>

                  <div class="col-md-4">
                    <div class="form-group">
                      <label>Ville</label>
                      <select class="form-control" v-model="hebergement.sous_ville_id">
                        <option value disabled selected>ville</option>
                        <option
                          v-for="ville in sousvilles"
                          v-bind:key="ville.id"
                          v-bind:value="ville.id"
                        >{{ville.nom}}</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12 text-left">
                <label>Proprietaire</label>
                <select class="form-control" v-model="hebergement.proprietaire_id" name="ville">
                  <option
                    v-for="proprietaire in proprietaires"
                    v-bind:key="proprietaire.id"
                    v-bind:value="proprietaire.id"
                  >{{proprietaire.client.nom}} {{proprietaire.client.prenom}}</option>
                </select>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12 pr-md-1 text-left">
                <label>Image de couverture</label>
                <br />
                <input
                  aria-label="label"
                  required
                  name="image_couverture"
                  type="file"
                  @change="hebPhoto"
                  class="input-file"
                  accept="image/x-png, image/gif, image/jpeg"
                />
              </div>
            </div>
            <br />

            <div class="row">
              <div class="col-md-12 text-left">
                <base-input>
                  <label>Description</label>
                  <textarea
                    rows="4"
                    cols="80"
                    class="form-control"
                    placeholder="Entrez ici la description de l'hébergement"
                    name="description"
                    v-model="hebergement.description"
                  ></textarea>
                </base-input>
                <p v-if="validationErrors.description" style="padding-bottom:5px;color:red">
                  <span class="alert-link">** {{ validationErrors.description[0] }}</span>
                </p>
              </div>
            </div>

            <br />
            <div class="row">
              <div class="col-md-12">
                <h5 class="title">
                  Dates réservées :
                  <span v-for="(iii, index) in order" :key="index" hidden>{{ iii }}</span>
                  <!-- moez -->
                  <br />

                  <span
                    v-if="validationErrors.disponibilite"
                    style="padding-bottom: 5px; color: red"
                  >
                    <span class="alert-link">** {{ validationErrors.disponibilite[0] }}</span>
                  </span>
                </h5>
              </div>
            </div>
            <!-- moez -->
            <div class="row">
              <div class="col-md-12">
                <b-card border-variant="warning" align="left">
                  <b-card-text>
                    <span v-for="(iii, index) in order" :key="index">
                      <center class="res">
                        {{ iii }}
                        <img loading="lazy"
                          src="close-etnafes.png"
                          width="18%"
                          @click="handleRemove2(iii, index)"
                        />
                      </center>
                    </span>
                  </b-card-text>
                </b-card>

                <div style="width: 50px; hight: 50px">
                  <v-app>
                    <div>
                      <v-date-picker
                        :allowed-dates="disablePastDates"
                        scrollable
                        locale="fr"
                        v-model="date"
                        @input="save(date)"
                        :events="datesAll"
                        no-title
                        format-color="blue lighten-1"
                      ></v-date-picker>
                    </div>
                  </v-app>
                </div>
              </div>
            </div>

            <br />

            <div class="row">
              <div class="col-md-12 text-left">
                <h5 class="title">Photos de l'hébergement</h5>
                <form>
                  <div class="form-group">
                    <label for="my-file" v-if="images.length == 4">
                      <B style="color: red">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="20"
                          height="20"
                          viewBox="0 0 172 172"
                          style="fill: #000000"
                        >
                          <g
                            fill="none"
                            fill-rule="nonzero"
                            stroke="none"
                            stroke-width="1"
                            stroke-linecap="butt"
                            stroke-linejoin="miter"
                            stroke-miterlimit="10"
                            stroke-dasharray
                            stroke-dashoffset="0"
                            font-family="none"
                            font-weight="none"
                            font-size="none"
                            text-anchor="none"
                            style="mix-blend-mode: normal"
                          >
                            <path d="M0,172v-172h172v172z" fill="none" />
                            <g>
                              <path
                                d="M12.9,153.725c-4.1495,0 -7.525,-3.3755 -7.525,-7.525c0,-1.4018 0.43645,-2.80145 1.333,-4.28065l72.4765,-119.325c1.66625,-2.74555 4.15165,-4.31935 6.8155,-4.31935c2.66385,0 5.14925,1.5738 6.8155,4.3215l72.4765,119.325c0.89655,1.47705 1.333,2.8767 1.333,4.2785c0,4.1495 -3.3755,7.525 -7.525,7.525z"
                                fill="#cccccc"
                              />
                              <path
                                d="M86,19.35c3.1218,0 5.0353,2.3822 5.89745,3.80335l36.23825,59.6625l36.23825,59.6625c0.7912,1.3029 1.17605,2.5198 1.17605,3.72165c0,3.5561 -2.8939,6.45 -6.45,6.45h-146.2c-3.5561,0 -6.45,-2.8939 -6.45,-6.45c0,-1.20185 0.38485,-2.41875 1.17605,-3.72165l36.23825,-59.6625l36.23825,-59.6625c0.86215,-1.42115 2.77565,-3.80335 5.89745,-3.80335M86,17.2c-3.39915,0 -6.08235,2.11345 -7.7357,4.8375c-72.4765,119.325 0,0 -72.4765,119.325c-0.8643,1.42545 -1.4878,3.0444 -1.4878,4.8375c0,4.74935 3.85065,8.6 8.6,8.6c3.76035,0 142.16015,0 146.2,0c4.74935,0 8.6,-3.85065 8.6,-8.6c0,-1.7931 -0.6235,-3.41205 -1.4878,-4.8375c-72.4765,-119.325 0,0 -72.4765,-119.325c-1.65335,-2.72405 -4.33655,-4.8375 -7.7357,-4.8375z"
                                fill="#ba9b48"
                              />
                              <path
                                d="M86,120.4c-4.74965,0 -8.6,3.85035 -8.6,8.6c0,4.74965 3.85035,8.6 8.6,8.6c4.74965,0 8.6,-3.85035 8.6,-8.6c0,-4.74965 -3.85035,-8.6 -8.6,-8.6zM86,60.2c-4.74935,0 -8.6,3.55395 -8.6,7.9378c0,2.93045 4.31075,40.0115 4.3301,40.16845c0.25585,1.96725 2.0683,3.49375 4.2699,3.49375c2.2016,0 4.01405,-1.5265 4.2699,-3.49375c0.01935,-0.15695 4.3301,-37.23585 4.3301,-40.16845c0,-4.38385 -3.85065,-7.9378 -8.6,-7.9378z"
                                fill="#36404d"
                              />
                            </g>
                          </g>
                        </svg>
                        Seullement 4 images peut être téléchargée!
                      </B>
                    </label>
                    <input
                      aria-label="label"
                      v-if="images.length < 4"
                      type="file"
                      accept="image/*"
                      multiple="multiple"
                      @change="previewMultiImage"
                      class="form-control-file"
                      id="my-file"
                    />

                    <div class="row">
                      <div class="col-md-3" v-for="(item, index) in preview_list" :key="index">
                        <img loading="lazy" @click="Remove360(item, index)" class="close" src="close-etnafes.png" />
                        <br />

                        <img loading="lazy" :src="item" width="70%" class="preview" />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12 text-left">
                <h5 class="title">Photos 360 de l'hébergement</h5>
                <form>
                  <div class="form-group">
                    <label for="my-file" v-if="images360.length == 4">
                      <B style="color: red">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          x="0px"
                          y="0px"
                          width="20"
                          height="20"
                          viewBox="0 0 172 172"
                          style="fill: #000000"
                        >
                          <g
                            fill="none"
                            fill-rule="nonzero"
                            stroke="none"
                            stroke-width="1"
                            stroke-linecap="butt"
                            stroke-linejoin="miter"
                            stroke-miterlimit="10"
                            stroke-dasharray
                            stroke-dashoffset="0"
                            font-family="none"
                            font-weight="none"
                            font-size="none"
                            text-anchor="none"
                            style="mix-blend-mode: normal"
                          >
                            <path d="M0,172v-172h172v172z" fill="none" />
                            <g>
                              <path
                                d="M12.9,153.725c-4.1495,0 -7.525,-3.3755 -7.525,-7.525c0,-1.4018 0.43645,-2.80145 1.333,-4.28065l72.4765,-119.325c1.66625,-2.74555 4.15165,-4.31935 6.8155,-4.31935c2.66385,0 5.14925,1.5738 6.8155,4.3215l72.4765,119.325c0.89655,1.47705 1.333,2.8767 1.333,4.2785c0,4.1495 -3.3755,7.525 -7.525,7.525z"
                                fill="#cccccc"
                              />
                              <path
                                d="M86,19.35c3.1218,0 5.0353,2.3822 5.89745,3.80335l36.23825,59.6625l36.23825,59.6625c0.7912,1.3029 1.17605,2.5198 1.17605,3.72165c0,3.5561 -2.8939,6.45 -6.45,6.45h-146.2c-3.5561,0 -6.45,-2.8939 -6.45,-6.45c0,-1.20185 0.38485,-2.41875 1.17605,-3.72165l36.23825,-59.6625l36.23825,-59.6625c0.86215,-1.42115 2.77565,-3.80335 5.89745,-3.80335M86,17.2c-3.39915,0 -6.08235,2.11345 -7.7357,4.8375c-72.4765,119.325 0,0 -72.4765,119.325c-0.8643,1.42545 -1.4878,3.0444 -1.4878,4.8375c0,4.74935 3.85065,8.6 8.6,8.6c3.76035,0 142.16015,0 146.2,0c4.74935,0 8.6,-3.85065 8.6,-8.6c0,-1.7931 -0.6235,-3.41205 -1.4878,-4.8375c-72.4765,-119.325 0,0 -72.4765,-119.325c-1.65335,-2.72405 -4.33655,-4.8375 -7.7357,-4.8375z"
                                fill="#ba9b48"
                              />
                              <path
                                d="M86,120.4c-4.74965,0 -8.6,3.85035 -8.6,8.6c0,4.74965 3.85035,8.6 8.6,8.6c4.74965,0 8.6,-3.85035 8.6,-8.6c0,-4.74965 -3.85035,-8.6 -8.6,-8.6zM86,60.2c-4.74935,0 -8.6,3.55395 -8.6,7.9378c0,2.93045 4.31075,40.0115 4.3301,40.16845c0.25585,1.96725 2.0683,3.49375 4.2699,3.49375c2.2016,0 4.01405,-1.5265 4.2699,-3.49375c0.01935,-0.15695 4.3301,-37.23585 4.3301,-40.16845c0,-4.38385 -3.85065,-7.9378 -8.6,-7.9378z"
                                fill="#36404d"
                              />
                            </g>
                          </g>
                        </svg>
                        Seullement 4 images peut être téléchargée!
                      </B>
                    </label>
                    <input
                      aria-label="label"
                      v-if="images360.length < 4"
                      type="file"
                      accept="image/*"
                      multiple="multiple"
                      @change="previewMultiImage360"
                      class="form-control-file"
                      id="my-file"
                    />

                    <div class="row">
                      <div class="col-md-3" v-for="(item, index) in preview_list360" :key="index">
                        <img loading="lazy" @click="Remove(item, index)" class="close" src="close-etnafes.png" />
                        <br />

                        <img loading="lazy" :src="item" width="70%" class="preview" />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <br />
            <div class="row">
              <button
                class="btn btn-success"
                type="submit"
                fill
                style="margin-left:10px;border-radius: 18px 0px 18px 0px;"
              >Enregistrer</button>
            </div>
          </form>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import Vue from "vue";
import { Card, BaseInput } from "@/components/index";
import mDatePicker from "./multiDatePicker.vue";
import BaseButton from "@/components/BaseButton";
import { apiDomain } from "../config";
export default {
  components: {
    draggable,

    Card,
    BaseInput,
    BaseButton,
    "m-date-picker": mDatePicker
  },

  props: {
    max: {
      type: Number,
      default: 5
    },
    action: {
      type: String,
      default: "https://jsonplaceholder.typicode.com/posts/"
    }
  },
  data() {
    return {
      sousvilles: {},
      villespays: {},
      pays: {},
      pays_id: "",
      ville_id: "",

      proprietaires: {},
      dialogImageUrl: "",
      dialogVisible: false,
      list: [],
      datesAll: [],
      validationErrors: "",
      multi: true,
      date: [],
      dd: [],
      disponibilites: [],
      markers: [],
      places: [],
      currentPlace: null,
      files: [],
      images: [],
      images360: [],

      preview_list: [],
      preview_list360: [],

      ville: {},
      villes: {},
      pack: {},
      hebergement: {
        sous_ville_id: "",

        nom: "",
        nbr_voyageurs: "",
        description: "",
        ville_id: "",
        adresse: "",
        prix_adulte: "",
        prix_enfant: "",
        prix_enfant15: "",
        disponibilite: "",
        nbr_chambre_dispo: "",
        nbr_place_dispo: "",
        chambre_a_trois: 0,
        chambre_a_deux: 0,
        chambre_individuel: 0,
        wifi: 0,
        lave_linge: 0,
        chauffage: 0,
        television: 0,
        climatisation: 0,
        eau_chaude: 0,
        espace_travail_ordinateur: 0,
        espace_enfant: 0,

        salle_de_bain: 0,
        cuisine: 0,
        proprietaire_id: "",
        center: { lat: 35.6711663, lng: 10.1005469 }
      }
    };
  },
  created() {
    this.fetchPays();

    this.fetchVilles();
    this.fetchProprietaires();
  },
  computed: {
    order() {
      var test = this.datesAll.sort();
      return test;
    },
    format() {
      const date = this.date;
      var result = [];
      var somme = null;
      for (var i = 0; i < date.length; i++) {
        const y = date[i].getFullYear();
        const m = date[i].getMonth() + 1;
        const d = date[i].getDate();
        somme = y + "-" + m + "-" + d;
        result.push(somme);
      }
      return result;
    }
  },
  methods: {
    previewMultiImage360: function(event) {
      var input = event.target;
      var count = input.files.length;
      var index = 0;
      if (/\.(jpe?g|png|PNG|gif)$/i.test(input.files[index].name)) {
        while (count--) {
          var reader = new FileReader();
          reader.onload = e => {
            this.preview_list360.push(e.target.result);
          };
          this.images360.push(input.files[index]);
          reader.readAsDataURL(input.files[index]);
          index++;
        }
      } else {
        if (
          confirm(
            "Veuillez choisir uniquement un fichier de type image(jpeg,png,jpg)"
          )
        ) {
          console.log("test" + this.images360.length);
          this.images360[this.images360.length].splice(
            [this.images360.length],
            1
          );
          this.preview_list360[this.preview_list360.length].splice(
            [this.preview_list360.length],
            1
          );
        }
      }
    },
    previewMultiImage: function(event) {
      var input = event.target;
      var count = input.files.length;
      var index = 0;
      if (/\.(jpe?g|png|PNG|gif)$/i.test(input.files[index].name)) {
        while (count--) {
          var reader = new FileReader();
          reader.onload = e => {
            this.preview_list.push(e.target.result);
          };
          this.images.push(input.files[index]);
          reader.readAsDataURL(input.files[index]);
          index++;
        }
      } else {
        if (
          confirm(
            "Veuillez choisir uniquement un fichier de type image(jpeg,png,jpg)"
          )
        ) {
          console.log("test" + this.images.length);
          this.images[this.images.length].splice([this.images.length], 1);
          this.preview_list[this.preview_list.length].splice(
            [this.preview_list.length],
            1
          );
        }
      }
    },
    hebPhoto: function(event) {
      var input = event.target;
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        var vm = this;
        reader.onload = function(e) {
          vm.hebergement.image_couverture = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
      console.log(input.files[0]);
    },
    updateVilleid(e) {
      this.$store.commit("updateVilleid", e.target.value);
    },
    fetchSousVille(id) {
      axios
        .get(`${apiDomain}/api/sous/villes/${id}`)
        .then(({ data }) => (this.sousvilles = data.sousvilles));
    },

    fetchVillesPays(id) {
      axios
        .get(`${apiDomain}/api/pays/villes/${id}`)
        .then(({ data }) => (this.villespays = data.villes));
    },
    fetchPays() {
      axios.get(`${apiDomain}/api/pays`).then(({ data }) => (this.pays = data));
    },
    handlePreview(url) {
      this.dialogImageUrl = url;
      this.dialogVisible = true;
    },

    handleRemove(file, index) {
      this.list.splice(index, 1);
      this.$emit("change", this.list);
    },
    handleSuccess(res, file) {
      this.list.push(URL.createObjectURL(file.raw));
      this.images.push(file.raw);
      // this.$emit("change", this.list);
    },
    updateList(list) {
      this.$emit("change", list);
    },
    beforeUpload(file) {
      const isValidFormat =
        [
          "image/jpeg",
          "image/JPEG",

          "image/JPG",
          "image/jpg",
          "image/PNG",
          "image/png"
        ].indexOf(file.type) > -1;
      const isLt2M = file.size / 1024 / 1024 < 0.512; // 1M

      if (!isValidFormat) {
        this.$message.error(
          "Veuillez choisir uniquement un fichier de type image(jpeg,png,jpg)"
        );
      } else if (!isLt2M) {
        this.$message.error("Votre image à passé 512 KO!");
      }

      const maxLt = this.max === 1 && this.list.length > 0;
      if (maxLt) {
        this.$message.error(
          "Seullement 5 images peut être téléchargée, veuillez la supprimer avant de la télécharger!"
        );
      }

      return isValidFormat && isLt2M && !maxLt;
    },
    handleRemove2(file, index) {
      this.order.splice(index, 1);
    },
    save: function(dateAjouter) {
      var index = this.datesAll.findIndex(x => x === dateAjouter);

      if (index === -1) {
        this.datesAll.push(dateAjouter);
      } else {
        this.datesAll.splice(index, 1);
      }
    },

    Remove(file, index) {
      this.preview_list.splice(index, 1);
      this.images.splice(index, 1);
      console.log("testDelete" + index);
    },

    Remove360(file, index) {
      this.preview_list360.splice(index, 1);
      this.images360.splice(index, 1);
      console.log("testDelete" + index);
    },
    disablePastDates(val) {
      return val >= new Date().toISOString().substr(0, 10);
    },
    formatDate(date) {
      return date.toLocaleDateString();
    },
    removeDate: function(index) {
      Vue.delete(this.disponibilites, index);
    },
    addNewDate: function() {
      this.disponibilites.push(Vue.util.extend({}, this.disponibilite));
    },

    setPlace(place) {
      this.currentPlace = place;
      this.hebergement.adresse = place;
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.hebergement.center = marker;
        // lat and lng, In front-end javascript does not support file management due to security concerns.
        console.log(marker.lat);
        console.log(marker.lng);

        this.currentPlace = null;
      }
    },
    handleFilesUpload() {
      let uploadedFiles = this.$refs.files.files;
      for (var i = 0; i < uploadedFiles.length; i++) {
        this.files.push(uploadedFiles[i]);
      }
    },

    fetchVilles() {
      fetch(`${apiDomain}/api/villes`)
        .then(res => res.json())
        .then(res => {
          this.villes = res;
        })
        .catch(err => console.log(err));
    },

    fetchProprietaires() {
      fetch(
        `${apiDomain}/api/allproprietaires?token=${this.$store.state.token}`
      )
        .then(res => res.json())
        .then(res => {
          this.proprietaires = res.proprietaires;
        })
        .catch(err => console.log(err));
    },

    createHebergement(e) {
      var formData = new FormData(e.target);
      const date = this.date;
      formData.append("nom", this.hebergement.nom);
      formData.append("nbr_voyageurs", this.hebergement.nbr_voyageurs);
      formData.append("nbr_place_dispo", this.hebergement.nbr_place_dispo);
      formData.append("sville_id", this.hebergement.sous_ville_id);
      formData.append("categorie", this.hebergement.categorie);
      formData.append("url_video", this.hebergement.url_video);

      formData.append(
        "nbr_chambre_dispo",
        Number(this.hebergement.chambre_a_deux) +
          Number(this.hebergement.chambre_a_trois) +
          Number(this.hebergement.chambre_individuel)
      );

      // formData.append("disponibilite", this.format);
      formData.append("disponibilite", this.order.toString());

      formData.append(
        "chambre_individuel",
        this.hebergement.chambre_individuel
      );
      formData.append("chambre_a_deux", this.hebergement.chambre_a_deux);
      formData.append("chambre_a_trois", this.hebergement.chambre_a_trois);

      formData.append("description", this.hebergement.description);
      formData.append("wifi", this.hebergement.wifi);
      formData.append("chauffage", this.hebergement.chauffage);
      formData.append("lave_linge", this.hebergement.lave_linge);
      formData.append("television", this.hebergement.television);
      formData.append("climatisation", this.hebergement.climatisation);
      formData.append("eau_chaude", this.hebergement.eau_chaude);
      formData.append(
        "espace_travail_ordinateur",
        this.hebergement.espace_travail_ordinateur
      );
      formData.append("espace_enfant", this.hebergement.espace_enfant);
      formData.append("salle_de_bain", this.hebergement.salle_de_bain);
      formData.append("cuisine", this.hebergement.cuisine);
      formData.append("adresse", this.hebergement.adresse.formatted_address);
      formData.append("latitude", this.hebergement.center.lat);
      formData.append("longitude", this.hebergement.center.lng);
      formData.append("proprietaire_id", this.hebergement.proprietaire_id);
      formData.append("ville_id", this.hebergement.ville_id);
      formData.append("valide", 1);


      for (var i = 0; i < this.images.length; i++) {
        let file = this.images[i];
        formData.append("images[" + i + "][url_image]", file);
      }

      for (var i = 0; i < this.images360.length; i++) {
        let file = this.images360[i];
        formData.append("images360[" + i + "][url_image]", file);
      }

      axios
        .post(
          `${apiDomain}/api/create/hebergement?token=${this.$store.state.token}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        )
        .then(res => {
          if (res.status == 200) {
            this.$noty.success("votre hebergement a été ajouté avec succès.");
            this.$router.push({ name: "Hebergements" });
          }
        })
        .catch(error => {
          if (error.response && error.response.status == 400) {
            this.validationErrors = error.response.data;
          }
        });
    }
  }
};
</script>
