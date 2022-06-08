<template>
  <div>
    <TopNavbarHome />
    <div class="container" style="margin-bottom: 30px; margin-top: 20px">
      <b-modal id="modal-paymee">
        <iframe
          style="border: 1px solid #c4252c; width: 100%"
          height="500"
          width="100%"
          id="inlineFrameExample"
          :src="url_frame"
        ></iframe>
      </b-modal>

      <b-modal id="modal-paymee-responsive">
        <iframe
          style="border: 1px solid #c4252c; width: 100%"
          height="500"
          width="100%"
          id="inlineFrameExample"
          :src="url_frame"
        ></iframe>
      </b-modal>
      <div class="row">
        <div class="col-md-8 card_paiement">
          <div class="row">
            <div class="col-md-8 d-none d-lg-block">
              <form name>
                <div class="row">
                  <div class="col-sm-9 col-xs-3">
                    <h4
                      class="dark-grey-text"
                      style="
                        line-height: 60px;
                        font-family: 'Open Sans', sans-serif;
                        margin-bottom: 0px;
                      "
                    >
                      <strong
                        style="
                          font-family: 'Indie Flower', cursive;
                          color: #000;
                        "
                        >Vos coordonnées</strong
                      >
                    </h4>
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-12 col-xs-3">
                    <div class="row">
                      <div class="col-md-4">
                        <div>
                          <label
                            style="
                              color: #5a5a5a;
                              font-size: 14px;
                              line-height: 35px;
                            "
                            >Civilité</label
                          >
                          <div class="form-group">
                            <select
                              class="form-control"
                              name="civilite"
                              v-model="user.civilité"
                              required
                            >
                              <option value="mr" selected>Mr</option>
                              <option value="mme">Mme</option>
                              <option value="mlle">Mlle</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div class="col-md-4">
                        <div>
                          <label
                            style="
                              color: #5a5a5a;
                              font-size: 14px;
                              line-height: 35px;
                            "
                            >Prénom</label
                          >
                          <div class="form-group">
                            <input
                              aria-label="label"
                              required
                              type="text"
                              name="prenom"
                              class="form-control"
                              v-model="user.prenom"
                              @input="updatePrenom"
                            />
                          </div>
                        </div>
                      </div>

                      <div class="col-md-4">
                        <div>
                          <label
                            style="
                              color: #5a5a5a;
                              font-size: 14px;
                              line-height: 35px;
                            "
                            >Nom</label
                          >
                          <div class="form-group">
                            <div class="form-group">
                              <input
                                aria-label="label"
                                required
                                type="text"
                                class="form-control"
                                v-model="user.nom"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-sm-12 col-xs-3">
                    <div class="row">
                      <div class="col-md-6">
                        <div>
                          <label
                            style="
                              color: #5a5a5a;
                              font-size: 14px;
                              line-height: 35px;
                            "
                            >Email</label
                          >
                          <div class="form-group">
                            <input
                              aria-label="label"
                              required
                              type="email"
                              class="form-control"
                              v-model="user.email"
                              disabled
                            />
                          </div>
                        </div>
                      </div>

                      <div class="col-md-3">
                        <div>
                          <label
                            style="
                              color: #5a5a5a;
                              font-size: 14px;
                              line-height: 35px;
                            "
                            >Téléphone
                          </label>
                          <div class="form-group">
                            <input
                              aria-label="label"
                              required
                              type="tel"
                              class="form-control"
                              v-model="user.telephone"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div>
                          <label
                            style="
                              color: #5a5a5a;
                              font-size: 13px;
                              font-weight: bold;
                              line-height: 35px;
                            "
                            >Personnes</label
                          >
                          <div class="form-group">
                            <input
                              aria-label="label"
                              style="
                                width: 100% !important ;
                                height: 42px !important;
                              "
                              autofocus
                              min="1"
                              :max="pack.nb_place_dispo"
                              type="number"
                              name="nb_adulte"
                              v-on:input="updateNbAdulte"
                              required
                              v-model="nb_adulte"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-3">
                    <img loading="lazy" class="post" src="/post/d17.jpg" />
                  </div>
                  <div class="col-3">
                    <img loading="lazy" class="post" src="/post/dinar.jpg" />
                  </div>
                  <div class="col-3">
                    <img loading="lazy" class="post" src="/post/e-dinar.jpg" />
                  </div>
                  <div class="col-3">
                    <img loading="lazy" class="post" src="/post/QR.jpg" />
                  </div>
                </div>

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
                  <div class="offset-md-8"></div>
                  <div class="col-md-2"></div>
                </div>
              </form>
            </div>

            <!-- mobiel -->
            <div class="col-md-8 d-lg-none">
              <form name>
                <div class="row">
                  <div class="col">
                    <h4
                      class="dark-grey-text"
                      style="
                        line-height: 60px;
                        font-family: 'Open Sans', sans-serif;
                        margin-bottom: 0px;
                      "
                    >
                      <strong
                        style="
                          font-family: 'Indie Flower', cursive;
                          color: #000;
                        "
                        >Vos coordonnées</strong
                      >
                    </h4>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="row">
                      <div class="col">
                        <div>
                          <label
                            style="
                              color: #5a5a5a;
                              font-size: 14px;
                              line-height: 35px;
                            "
                            >Civilité</label
                          >
                          <div class="form-group">
                            <select
                              class="form-control"
                              name="civilite"
                              v-model="user.civilité"
                              required
                            >
                              <option value="mr" selected>Mr</option>
                              <option value="mme">Mme</option>
                              <option value="mlle">Mlle</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div class="col">
                        <div>
                          <label
                            style="
                              color: #5a5a5a;
                              font-size: 14px;
                              line-height: 35px;
                            "
                            >Prénom</label
                          >
                          <div class="form-group">
                            <input
                              aria-label="label"
                              required
                              type="text"
                              name="prenom"
                              class="form-control"
                              v-model="user.prenom"
                              @input="updatePrenom"
                            />
                          </div>
                        </div>
                      </div>

                      <div class="col">
                        <div>
                          <label
                            style="
                              color: #5a5a5a;
                              font-size: 14px;
                              line-height: 35px;
                            "
                            >Nom</label
                          >
                          <div class="form-group">
                            <div class="form-group">
                              <input
                                aria-label="label"
                                required
                                type="text"
                                class="form-control"
                                v-model="user.nom"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div>
                      <label
                        style="
                          color: #5a5a5a;
                          font-size: 14px;
                          line-height: 35px;
                        "
                        >Email</label
                      >
                      <div class="form-group">
                        <input
                          aria-label="label"
                          required
                          type="email"
                          class="form-control"
                          v-model="user.email"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="row">
                      <div class="col">
                        <div>
                          <label
                            style="
                              color: #5a5a5a;
                              font-size: 14px;
                              line-height: 35px;
                            "
                            >Téléphone 11</label
                          >
                          <div class="form-group">
                            <input
                              aria-label="label"
                              required
                              type="tel"
                              class="form-control"
                              v-model="user.telephone"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="col">
                        <div>
                          <label
                            style="
                              color: #5a5a5a;
                              font-size: 13px;
                              font-weight: bold;
                              line-height: 35px;
                            "
                            >Personnes</label
                          >
                          <div class="form-group">
                            <input
                              aria-label="label"
                              style="
                                width: 100% !important ;
                                height: 42px !important;
                              "
                              autofocus
                              min="1"
                              :max="pack.nb_place_dispo"
                              type="number"
                              name="nb_adulte"
                              v-on:input="updateNbAdulte"
                              required
                              v-model="nb_adulte"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row" v-if="paysshow == true">
                  <div class="col">
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

                  <div class="col">
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
                  <div class="offset-md-8"></div>
                  <div class="col-md-2"></div>
                </div>
              </form>
            </div>
            <!-- web -->
            <div class="col-md-4 d-none d-lg-block">
              <div class="row">
                <b-card style="background-color: #e5e5b3; width: 98%">
                  <div class="col-sm-12 col-xs-3">
                    <br />
                    <center>
                      <img
                        loading="lazy"
                        width="70%"
                        class="d-none d-lg-block"
                        alt="logo"
                        src="/images/logo-etnafes-couleur-blanc.png"
                      />
                    </center>
                    <br /><br />
                    <h4
                      class="dark-grey-text"
                      style="
                        line-height: 23px;
                        margin-top: 15px;
                        font-family: 'Open Sans', sans-serif;
                      "
                    >
                      <strong
                        style="
                          font-family: 'Indie Flower', cursive;
                          color: #000;
                        "
                        >Sélectionnez votre mode de paiement</strong
                      >
                    </h4>

                    <div
                      style="
                        border: 1px solid #cad1d7;
                        padding: 10px;
                        margin-bottom: 20px;
                        border-radius: 0.4285rem;
                      "
                    >
                      <div class="row">
                        <div class="col-md-10">
                          <input
                            v-model="type_paiement"
                            value="offline"
                            aria-label="label"
                            type="radio"
                          />
                          <span>&nbsp;Offline</span>
                        </div>

                        <div class="col-md-2">
                          <i
                            style="color: #333"
                            :class="visible3 ? null : 'collapsed'"
                            :aria-expanded="visible3 ? 'true' : 'false'"
                            aria-controls="collapse-3"
                            @click="visible3 = !visible3"
                            class="tim-icons icon-minimal-down"
                          >
                          </i>
                        </div>
                        <!-- info ici -->
                        <b-collapse
                          id="collapse-3"
                          v-model="visible3"
                          class="mt-2"
                        >
                          <span style="font-weight: bold; margin-left: 10px"
                            >Téléphone :</span
                          >
                          (+216) 22 225 951
                          <br />
                          <span style="font-weight: bold; margin-left: 10px"
                            >Adresse :</span
                          >
                          20, rue al Azhar Ben
                          <p style="margin-left: 10px">
                            Nounafedh Mansoura Kairouan
                          </p>
                        </b-collapse>
                      </div>
                    </div>

                    <div
                      style="
                        border: 1px solid #cad1d7;
                        padding: 10px;
                        margin-bottom: 1px !important;
                        border-radius: 0.4285rem;
                      "
                    >
                      <div class="row">
                        <div class="col-md-10">
                          <input
                            v-model="type_paiement"
                            value="en ligne"
                            aria-label="label"
                            type="radio"
                          />
                          <img loading="lazy" src="/paiment-etnafes-tn.png" />
                        </div>
                      </div>

                      <div
                        class="row"
                        v-if="
                          agencee.nom_agence != null && agencee.id == agence.id
                        "
                      >
                        <div class="col-md-6">
                          <p
                            style="
                              color: #000;
                              margin-top: 5px;
                              padding-left: 20px;
                            "
                            v-if="
                              agencee.nom_agence != null &&
                              agencee.id == agence.id
                            "
                          >
                            <b>Adresse :</b>
                            {{ agence.adresse }}
                            <br />
                          </p>

                          <p
                            style="
                              color: #000;
                              line-height: 30px;
                              padding-left: 20px;
                            "
                            v-if="
                              agencee.nom_agence != null &&
                              agencee.id == agence.id
                            "
                          >
                            <b>Telephone :</b>
                            {{ agence.telephone }}
                          </p>
                        </div>

                        <div class="col-md-6">
                          <p
                            style="
                              color: #000;
                              margin-top: 5px;
                              padding-left: 20px;
                            "
                            v-if="
                              agencee.nom_agence != null &&
                              agencee.id == agence.id
                            "
                          >
                            <b>Adresse :</b>
                            {{ agence.adresse }}
                          </p>

                          <p
                            style="
                              color: #000;
                              line-height: 30px;
                              padding-left: 20px;
                            "
                            v-if="
                              agencee.nom_agence != null &&
                              agencee.id == agence.id
                            "
                          >
                            <b>Telephone :</b>
                            {{ agence.telephone }}
                          </p>
                        </div>
                      </div>
                    </div>
                    <br />
                    <br />
                  </div>
                </b-card>
              </div>
            </div>

            <!-- mobile -->
            <div class="col-md-4 d-lg-none">
              <div class="row">
                <div style="width: 98%">
                  <div class="col-sm-12 col-xs-3">
                    <!--  <br>
                <center>
             <img loading="lazy" width="50%"
              
              alt="logo"
              src="/images/logo-etnafes-couleur-blanc.png"
            />
                </center>
            <br> -->
                    <h4
                      class="dark-grey-text"
                      style="
                        line-height: 23px;
                        margin-top: 15px;
                        font-family: 'Open Sans', sans-serif;
                      "
                    >
                      <strong
                        style="
                          font-family: 'Indie Flower', cursive;
                          color: #000;
                        "
                        >Sélectionnez votre mode de paiement</strong
                      >
                    </h4>

                    <div
                      style="
                        border: 1px solid #cad1d7;
                        padding: 10px;
                        margin-bottom: 20px;
                        border-radius: 0.4285rem;
                      "
                    >
                      <div class="row d-lg-none">
                        <div class="col">
                          <input
                            v-model="type_paiement"
                            value="offline"
                            aria-label="label"
                            type="radio"
                          />
                          <span>&nbsp;Offline</span>
                        </div>

                        <div class="col">
                          <i
                            style="color: #333; float: right"
                            :class="visible3 ? null : 'collapsed'"
                            :aria-expanded="visible3 ? 'true' : 'false'"
                            aria-controls="collapse-3"
                            @click="visible3 = !visible3"
                            class="tim-icons icon-minimal-down"
                          >
                          </i>
                        </div>
                        <!-- info ici -->
                      </div>

                      <div class="row">
                        <b-collapse
                          id="collapse-3"
                          v-model="visible3"
                          class="mt-2"
                        >
                          <span style="font-weight: bold; margin-left: 10px"
                            >Téléphone :</span
                          >
                          (+216) 22 225 951
                          <br />
                          <span style="font-weight: bold; margin-left: 10px"
                            >Adresse :</span
                          >
                          20, rue al Azhar Ben Nounafedh
                          <p style="margin-left: 10px">Mansoura Kairouan</p>
                        </b-collapse>
                      </div>
                    </div>

                    <div
                      style="
                        border: 1px solid #cad1d7;
                        padding: 10px;
                        margin-bottom: 20px;
                        border-radius: 0.4285rem;
                      "
                    >
                      <div class="row">
                        <div class="col-md-10">
                          <input
                            v-model="type_paiement"
                            value="en ligne"
                            aria-label="label"
                            type="radio"
                          />
                          <img loading="lazy" src="/paiment-etnafes-tn.png" />
                        </div>
                      </div>

                      <div
                        class="row"
                        v-if="
                          agencee.nom_agence != null && agencee.id == agence.id
                        "
                      >
                        <div class="col-md-6">
                          <p
                            style="
                              color: #000;
                              margin-top: 5px;
                              padding-left: 20px;
                            "
                            v-if="
                              agencee.nom_agence != null &&
                              agencee.id == agence.id
                            "
                          >
                            <b>Adresse :</b>
                            {{ agence.adresse }}
                            <br />
                          </p>

                          <p
                            style="
                              color: #000;
                              line-height: 30px;
                              padding-left: 20px;
                            "
                            v-if="
                              agencee.nom_agence != null &&
                              agencee.id == agence.id
                            "
                          >
                            <b>Telephone :</b>
                            {{ agence.telephone }}
                          </p>
                        </div>

                        <div class="col-md-6">
                          <p
                            style="
                              color: #000;
                              margin-top: 5px;
                              padding-left: 20px;
                            "
                            v-if="
                              agencee.nom_agence != null &&
                              agencee.id == agence.id
                            "
                          >
                            <b>Adresse :</b>
                            {{ agence.adresse }}
                          </p>

                          <p
                            style="
                              color: #000;
                              line-height: 30px;
                              padding-left: 20px;
                            "
                            v-if="
                              agencee.nom_agence != null &&
                              agencee.id == agence.id
                            "
                          >
                            <b>Telephone :</b>
                            {{ agence.telephone }}
                          </p>
                        </div>
                      </div>
                    </div>
                    <br />
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <b-card no-body style="padding: 10px; border: solid 1px">
            <!-- <b-carousel
              hidden
              v-if="pack.activite_id_principal != 3"
              id="carousel-PAgence"
              class="d-none d-lg-block"
              v-model="slide"
              :interval="4000"
              controls
              indicators
              background="transparent"
              img-width="1024"
              img-height="480"
              style="text-shadow: 1px 1px 2px #333"
              @sliding-start="onSlideStart"
              @sliding-end="onSlideEnd"
            >
            
              <div v-for="(zone, i) in pack.zone_pack" v-bind:key="i">
                <b-carousel-slide
                  v-for="(image, k) in zone.zone_touristique.image"
                  v-bind:key="k"
                  :img-src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_zones/${image.url_image}`"
                ></b-carousel-slide>
              </div>
            </b-carousel>

            <b-carousel
              hidden
              v-if="pack.activite_id_principal != 3"
              class="d-lg-none"
              id="carousel-PAgence-responsive"
              v-model="slide"
              :interval="4000"
              controls
              indicators
              background="transparent"
              img-width="1024"
              img-height="480"
              style="text-shadow: 1px 1px 2px #333"
              @sliding-start="onSlideStart"
              @sliding-end="onSlideEnd"
            >
              
              <div hidden v-for="(zone, i) in pack.zone_pack" v-bind:key="i">
                <b-carousel-slide
                  v-for="(image, k) in zone.zone_touristique.image"
                  v-bind:key="k"
                  :img-src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_zones/${image.url_image}`"
                ></b-carousel-slide>
              </div>
            </b-carousel>

         

            <b-carousel
              hidden
              v-if="pack.activite_id_principal == 3"
              v-model="slide"
              :interval="4000"
              controls
              indicators
              background="transparent"
              img-width="1024"
              img-height="480"
              style="text-shadow: 1px 1px 2px #333"
              @sliding-start="onSlideStart"
              @sliding-end="onSlideEnd"
            >
            
              <b-carousel-slide hidden
                :img-src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_packs/${pack.image_couverture}`"
              ></b-carousel-slide>
            </b-carousel> -->
            <h4
              class="dark-grey-text"
              style="
                line-height: 60px;
                font-family: 'Open Sans', sans-serif;
                margin-bottom: 0px;
              "
            >
              <strong style="font-family: 'Indie Flower', cursive; color: #000"
                >Votre réservation</strong
              >
            </h4>
            <p style="margin: 10px; font-weight: bold">{{ pack.titre }}</p>

            <b-card-text>
              <img loading="lazy" src="/calendar-etnafes.png" />
              Date de départ :
              {{ pack.date_deb }}
            </b-card-text>

            <b-card-text>
              <img
                loading="lazy"
                style="width: 18px"
                src="/Etnafes-icon4.png"
              />

              Ville de départ :
              {{ pack.adresse }}
            </b-card-text>

            <b-card-text>
              <img
                loading="lazy"
                style="width: 25px; margin-left: -4px"
                src="/etanfes-duree.png"
              />
              Durée:
              {{ pack.time }}
            </b-card-text>

            <b-card-text>
              <img
                loading="lazy"
                style="width: 23px"
                src="/etnafes-personnes.png"
              />

              Personnes:
              {{ nb_adulte }}
            </b-card-text>
            <b-card-text>
              <img
                loading="lazy"
                style="width: 25px; margin-left: -4px"
                src="/etnafes-resume.png"
              />

              Résumé:
              {{ nb_adulte }} * {{ pack.prix_fix }} DT
            </b-card-text>

            <hr style="margin-top: 0.1rem" />

            <b-card-text>{{ pack.description }}</b-card-text>

            <hr />
            <div class="row">
              <div class="col-md-5">
                <h3
                  style="color: #333; margin-bottom: 0px"
                  v-if="agestab != undefined"
                >
                  Prix total :
                  {{ Number(nb_adulte) * pack.prix_fix + calcul[0] }} DT
                </h3>

                <h3 style="color: #333" v-else>
                  Prix total :
                  {{ Number(nb_adulte) * pack.prix_fix }}dt
                </h3>
              </div>

              <div class="col-md-7 d-none d-lg-block">
                <b-button
                  style="margin-top: -7px"
                  class="d-none d-lg-block"
                  @click="stepOnePayemee()"
                  v-b-modal.modal-paymee
                  v-if="type_paiement == 'en ligne'"
                  >Continuez &nbsp;&nbsp;&nbsp;></b-button
                >

                <b-button
                  style="margin-top: -7px"
                  class="d-lg-none"
                  @click="stepOnePayemee()"
                  v-b-modal.modal-paymee-responsive
                  v-if="type_paiement == 'en ligne'"
                  >Continuez &nbsp;&nbsp;&nbsp;></b-button
                >

                <router-link
                  :to="{
                    name: 'PaiementOffline',
                    params: { id: this.$route.params.id },
                    query: {
                      date_deb: this.$route.query.date_deb,
                      nb_adulte: this.nb_adulte,
                      nb_enfant: this.$route.query.nb_enfant,
                      ville_id: this.$route.query.ville_id,
                      agence_id: this.$route.query.agence_id,
                    },
                  }"
                >
                  <b-button
                    style="margin-top: -7px"
                    v-if="type_paiement == 'offline'"
                    >Continuez &nbsp;&nbsp;&nbsp;></b-button
                  >
                </router-link>
              </div>
            </div>

            <div>
              <br />
              <!--  agence_id != null && -->
              <!--  v-b-modal.modal-paymee -->

              <!--   <router-link
                @click="stepOnePayemee()"
                :to="{
                  name: 'suivant',

                  query: {
                    token_client: token_client,
                    url_frame: url_frame,
                    note: note,
                  },
                }"
              >-->
              <!--    <b-button
                @click="stepOnePayemee()"
                v-b-modal.modal-paymee
                v-if="
                  user.civilité != '' &&
                  nb_enfant == agestab.length &&
                  type_paiement == 'en ligne'
                "
                >Continuez &nbsp;&nbsp;&nbsp;></b-button
              >
              <router-link
                :to="{
                  name: 'PaiementOffline',
                  params: { id: this.$route.params.id },
                  query: {
                    date_deb: this.$route.query.date_deb,
                    nb_adulte: this.$route.query.nb_adulte,
                    nb_enfant: this.$route.query.nb_enfant,
                    vip: this.$route.query.vip,
                    ville_id: this.$route.query.ville_id,
                  },
                }"
              >
                <b-button
                  v-if="
                    user.civilité != '' &&
                    nb_enfant == agestab.length &&
                    type_paiement == 'offline'
                  "
                  >Continuez &nbsp;&nbsp;&nbsp;></b-button
                >
              </router-link> -->
              <!--  </router-link> -->
            </div>
          </b-card>
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
        <b-button
          style="margin-top: -7px"
          class="btn-info btn-block d-none d-lg-block"
          @click="stepOnePayemee()"
          v-b-modal.modal-paymee
          v-if="type_paiement == 'en ligne'"
          >Continuez &nbsp;&nbsp;&nbsp;></b-button
        >

        <b-button
          style="margin-top: -7px"
          class="btn-info btn-block d-lg-none"
          @click="stepOnePayemee()"
          v-b-modal.modal-paymee-responsive
          v-if="type_paiement == 'en ligne'"
          >Continuez &nbsp;&nbsp;&nbsp;></b-button
        >
        <router-link
          :to="{
            name: 'PaiementOffline',
            params: { id: this.$route.params.id },
            query: {
              date_deb: this.$route.query.date_deb,
              nb_adulte: this.nb_adulte,
              nb_enfant: this.$route.query.nb_enfant,
              ville_id: this.$route.query.ville_id,
              agence_id: this.$route.query.agence_id,
            },
          }"
        >
          <b-button
            style="margin-top: -7px"
            class="btn-info btn-block"
            v-if="type_paiement == 'offline'"
            >Continuez &nbsp;&nbsp;&nbsp;></b-button
          >
        </router-link>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import axios from "axios";
import { Card, BaseInput } from "@/components/index";
import TopNavbarHome from "./Layout/TopNavbarHome.vue";
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
import jsonpAdapter from "axios-jsonp";
import Footer from "./Layout/Footer.vue";
import { mapState } from "vuex";
import { apiDomain } from "../config";
import Vue from "vue";
export default {
  components: {
    TopNavbarHome,
    Footer,
    BaseInput,
    VueperSlides,
    VueperSlide,
  },
  data() {
    return {
      //payemee
      visible3: false,
      type_paiement: "",
      url_frame: "",
      code_compt: "13639", //ligne
      // code_compt: "1915",

      note: "Etnafes " + "#" + Math.floor(Math.random() * 40000),

      token_client: "",
      ville: {},
      paysshow: false,
      agenceshow: false,
      client: [],
      ages: [],
      agestab: this.$route.query.ages ? this.$route.query.ages : [],
      villespays: {},
      nbr_place: "",
      date: "",
      pays: {},
      pays_id: "",
      slide: 0,
      sliding: null,
      coordonnee: true,
      details: false,
      paiement1: false,

      //ticket: false,
      client: {},
      terms: false,
      toggle: false,
      toggle1: false,
      toggle2: false,
      toggle3: false,
      toggle4: false,
      agence_id: null,
      nom: "",
      hebergement: {},
      agencee: {},
      // prenom: "",
      email: "",
      telephone: "",
      civilité: "",
      gouvernorat: "",
      ville_id: "",
      prix_total: "",
      prix_pack: "",
      prix_logement: 0,

      nb_adulte: this.$route.query.nb_adulte,
      nb_enfant: this.$route.query.nb_enfant,
      nbenfant4: "",
      nbenfant15: "",

      agence: {
        nom_agence: null,
      },
      nom_agence: "",
      agences: {},
      arr: [],
      hebergement_pack: {},
      pack: {
        id: "",
        nom: "",
        du: "",
        description: "",
        au: "",
        type: "",
        ville_id: "",
      },
    };
  },
  created() {
    this.fetchClient(this.$store.state.user.id);
    this.fetchPacks(this.$route.params.id);
    /*   if (this.token_client != "") { */
    this.fetchSte3();
    /*   } */

    this.fetchPays();
    this.fetchAgences();
  },

  computed: {
    get_token_client() {
      return this.token_client;
    },
    url_calback() {
      return `https://etnafes.com/suivant/${this.token_client}`;
    },

    url() {
      return `https://app.paymee.tn/gateway/${this.token_client}`;
    },

    prixPack() {
      if (this.calcul.length != 0) {
        var prixPack =
          Number(this.nb_adulte) * this.pack.prix_fix + this.calcul[0];
      } else {
        var prixPack = Number(this.nb_adulte) * this.pack.prix_fix;
      }

      return prixPack;
    },

    prixLogement() {
      if (this.hebergement_pack.length > 0) {
        if (this.calculPrix.length != 0) {
          var prixLogement =
            (Number(this.nb_adulte) * this.hebergement.prix_adulte +
              this.calculPrix[0]) *
            (this.calculInterval.length - 1);
        } else {
          var prixLogement =
            Number(this.nb_adulte) *
            this.hebergement.prix_adulte *
            (this.calculInterval.length - 1);
        }

        return prixLogement;
      } else return 0;
    },
    calculInterval(du, au) {
      var du = this.pack.date_deb,
        au = this.pack.date_fin;

      var arr = [],
        dt = new Date(du);

      while (dt <= new Date(au)) {
        arr.push(new Date(dt));
        dt.setDate(dt.getDate() + 1);
      }
      for (var l = 0; l < arr.length; l++) {
        var month = arr[l].getUTCMonth() + 1; //months from 1-12
        var day = arr[l].getUTCDate();
        var year = arr[l].getUTCFullYear();
        arr[l] = day + "-" + month + "-" + year;
      }

      return (this.arr = arr);
    },
    calculPrix() {
      const hebergement = this.hebergement;
      const agestab = this.agestab;
      var result = [];
      var somme = null;

      var sommeprixenfant4 = 0;
      var sommeprixenfant15 = 0;
      if (agestab != undefined) {
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

    calculage() {
      const agestab = this.agestab;
      var result = [];
      this.nbenfant4 = 0;
      this.nbenfant15 = 0;
      if (agestab != undefined) {
        for (var k = 0; k < agestab.length; k++) {
          if (agestab[k] <= 4) {
            this.nbenfant4 = parseInt(this.nbenfant4) + 1;
          }
          if (agestab[k] > 4) {
            this.nbenfant15 = parseInt(this.nbenfant15) + 1;
          }
        }
      }
      return [this.nbenfant4, this.nbenfant15];
    },

    calcul() {
      const pack = this.pack;
      const agestab = this.agestab;
      var result = [];
      var somme = null;

      var sommeprixenfant4 = 0;
      var sommeprixenfant15 = 0;
      if (agestab != undefined) {
        for (var i = 0; i < agestab.length; i++) {
          if (agestab[i] <= 4) {
            sommeprixenfant4 += pack.prix_enfant4;
          }
          if (agestab[i] > 4) {
            sommeprixenfant15 += pack.prix_enfant15;
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

    isDisabled: function () {
      return !this.terms;
    },

    adultes: {
      get() {
        return this.$store.state.nb_adulte;
      },
      set(value) {
        this.$store.commit("updateNbAdulte", value);
      },
    },
    enfants: {
      get() {
        return this.$store.state.nb_enfant;
      },
      set(value) {
        this.$store.commit("updateNbEnfant", value);
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

  mounted() {
    //  this.fechStep3();

    window.addEventListener(
      "message",
      function (event) {
        if (event.data.event_id === "paymee.complete") {
          window.location.replace("https://etnafes.com/suivant");

          // window.location.replace("https://etnafes.com/suivant");
        }
      },
      false
    );
  },

  methods: {
    stepOnePayemee() {
      let formData = new FormData();

      formData.append("vendor", this.code_compt);
      formData.append("amount", this.prixPack);
      formData.append("note", this.note);

      axios
        .post(`https://app.paymee.tn/api/v1/payments/create`, formData, {
          body: JSON.stringify(this.annonce),
          headers: {
            "Content-Type": "application/json",

            Authorization: "Token ed6b25dc0ae4a9195b30be5f9e4f19a1383eb83b", // en ligen
            //Authorization: "Token a6408a6150213d091a55669461fc9fc1b34d2192",
          },
        })

        .then((res) => {
          this.token_client = res.data.data.token;
          this.url_frame = `https://app.paymee.tn/gateway/${this.token_client}`; //step2

          localStorage.setItem("token_client", this.token_client);
          //query
          localStorage.setItem("pack_id", this.$route.params.id);
          localStorage.setItem("prixPack", this.prixPack);

          localStorage.setItem("nb_enfant4", this.calculage[0]);
          localStorage.setItem("nb_enfant15", this.calculage[1]);

          localStorage.setItem("nb_adults", this.nb_adulte);
        })

        .catch((error) => {
          console.log(error.response.data);
        });
    },

    redirect: function (url) {
      window.location = url;
    },

    red() {},

    fetchSte3() {
      axios
        .get(
          `https://app.paymee.tn/api/v1/payments/${this.token_client}/check`,
          {
            body: JSON.stringify(this.annonce),
            headers: {
              "Content-Type": "application/json",
              //Authorization: "Token a6408a6150213d091a55669461fc9fc1b34d2192",

              Authorization: "Token ed6b25dc0ae4a9195b30be5f9e4f19a1383eb83b",
            },
          }
        )
        .then((res) => res.json())
        .then((data) => {
          this.data_ste3 = res.data.data;
        });
    },

    fetchStepTwo(token_client) {
      fetch(`https://app.paymee.tn/gateway/599b61ce80e2d1ed26b62393d8c93c3c`, {
        method: "get",
      })
        .then((res) => res.json())
        .then((data) => {
          // this.fetchsearch();
        })

        .catch((err) => console.log(err));
    },

    fetchStepTwo__(id) {
      axios
        .get(`${apiDomain}/api/packs/${id}`)
        .then(
          ({ data }) => (
            (this.pack = data.packdetail),
            (this.hebergement_pack = data.packdetail.hebergement_pack)
          )
        );
    },

    scrollToTop() {
      window.scrollTo(0, 0);
    },
    fetchAgence(id) {
      fetch(`${apiDomain}/api/agences/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.agencee = res.agencedetail;
        })
        .catch((err) => console.log(err));
    },
    fetchClient(id) {
      fetch(`${apiDomain}/api/client/${id}?token=${this.$store.state.token}`)
        .then((res) => res.json())
        .then((res) => {
          this.client = res;
          this.ville = res.ville;
        })
        .catch((err) => console.log(err));
    },
    removeAge: function (index) {
      Vue.delete(this.agestab, index);
      this.nb_enfant = this.nb_enfant - 1;
    },
    addNewAge: function () {
      this.ages.push(Vue.util.extend({}, this.age));
    },
    updateNbAdulte(e) {
      this.$store.commit("updateNbAdulte", e.target.value);
    },

    updateNbEnfant(e) {
      this.seen = true;
      // if (this.nb_enfant == this.agestab.length) {
      this.$store.commit("updateNbEnfant", e.target.value);
    },

    fetchPays() {
      axios.get(`${apiDomain}/api/pays`).then(({ data }) => (this.pays = data));
    },
    fetchVillesPays(id) {
      axios
        .get(`${apiDomain}/api/pays/villes/${id}`)
        .then(({ data }) => (this.villespays = data.villes));
    },
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },

    fetchAgencesid(id) {
      axios
        .get(`${apiDomain}/api/agences/${id}`)
        .then(({ data }) => (this.agence = data.agencedetail));
    },
    fetchAgences() {
      axios
        .get(`${apiDomain}/api/agences`)
        .then(({ data }) => (this.agences = data));
    },
    updatePrenom(e) {
      this.$store.commit("updatePrenom", e.target.value);
    },

    updateAgence(e) {
      this.$store.commit("updateAgence", e.target.value);
      axios
        .get(`${apiDomain}/api/agences/${this.$store.state.id}`)
        .then(({ data }) => (this.agence = data.agencedetail));
    },

    fetchPacks(id) {
      axios
        .get(`${apiDomain}/api/packs/${id}`)
        .then(
          ({ data }) => (
            (this.pack = data.packdetail),
            (this.hebergement_pack = data.packdetail.hebergement_pack)
          )
        );
    },

    updateClient(id, client) {
      if (this.calcul.length != 0) {
        this.prix_total = this.nb_adulte * this.pack.prix_fix + this.calcul[0];

        this.prix_pack = this.nb_adulte * this.pack.prix_fix + this.calcul[0];
      } else if (this.calcul.length == 0) {
        this.prix_total = this.nb_adulte * this.pack.prix_fix;
        this.prix_pack = this.nb_adulte * this.pack.prix_fix;
      }

      axios
        .put(`${apiDomain}/api/client/${id}`, {
          date: new Date().toJSON().slice(0, 10).replace(/-/g, "/"),
          nom: this.user.nom,
          prenom: this.user.prenom,
          telephone: this.user.telephone,
          email: this.user.email,
          civilité: this.user.civilité,
          gouvernorat: this.gouvernorat,
          // agence_id: this.agence_id,
          ville_id: this.client.ville_id,
          nbr_place:
            Number(this.$route.query.nb_adulte) +
            Number(this.$route.query.nb_enfant),
          prix_total: this.prix_total,
          prix_pack: this.prix_pack,
          // prix_logement: this.prix_logement,
          prix_logement: 0,

          nb_adulte: this.$route.query.nb_adulte,
          nb_enfant: this.$route.query.nb_enfant,
          nb_enfant4: this.calculage[0],
          nb_enfant15: this.calculage[1],

          prix_remise: this.pack.taux_remise,
          paye: 0,
          pack_id: this.$route.params.id,
          hebergement_id: this.hebergement_id,
          // agence_id: this.$store.state.id,
          agence_id: this.agence_id,
          headers: {
            "content-type": "application/json",
          },
        })

        .then((res) => {
          if (res.status == 200) {
            this.$fire({
              // title: "Votre profil a été modifié avec succés",
              text: "Votre réservation est passée avec succés!Veuillez retournez à l'agence pour le paiement",
              type: "success",
              timer: 90000,
            }).then((r) => {
              this.$router.push({
                name: "ClientReservation",
              });
            });
          }
        })

        .catch((error) => {
          if (error.response && error.response.status == 422) {
            this.validationErrors = error.response.data.errors;
          }
        });
    },
    reservation_off_line_Client(id, client) {
      this.verif = false;
      if (this.calcul.length != 0) {
        this.prix_total = this.nb_adulte * this.pack.prix_fix + this.calcul[0];

        this.prix_pack = this.nb_adulte * this.pack.prix_fix + this.calcul[0];
      } else if (this.calcul.length == 0) {
        this.prix_total = this.nb_adulte * this.pack.prix_fix;
        this.prix_pack = this.nb_adulte * this.pack.prix_fix;
      }

      axios
        .put(`${apiDomain}/api/client/${id}`, {
          date: new Date().toJSON().slice(0, 10).replace(/-/g, "/"),
          nom: this.user.nom,
          prenom: this.user.prenom,
          telephone: this.user.telephone,
          email: this.user.email,
          civilité: this.user.civilité,
          gouvernorat: this.gouvernorat,
          // agence_id: this.agence_id,
          ville_id: this.client.ville_id,
          client_id: this.client.id,

          nbr_place: this.nbr_place,
          prix_total: this.prix_total,
          prix_pack: this.prix_pack,
          // prix_logement: this.prix_logement,
          prix_logement: 0,
          type_paiement: "offline",

          nb_adulte: this.$route.query.nb_adulte,
          nb_enfant: this.$route.query.nb_enfant,
          nb_enfant4: this.calculage[0],
          nb_enfant15: this.calculage[1],

          prix_remise: this.pack.taux_remise,
          paye: 0,
          pack_id: this.$route.params.id,
          hebergement_id: this.hebergement_id,
          // agence_id: this.$store.state.id,
          agence_id: this.agence_id,
          headers: {
            "content-type": "application/json",
          },
        })

        .then((res) => {
          this.verif = true;

          if (res.status == 200) {
            this.$fire({
              // title: "Votre profil a été modifié avec succés",
              text: "Votre réservation est passée avec succés!Veuillez retournez à notre breau pour le paiement",
              type: "success",
              timer: 90000,
            }).then((r) => {
              this.$router.push({
                name: "ClientReservation",
              });
            });
          }
        })

        .catch((error) => {
          this.verif = false;

          if (error.response && error.response.status == 422) {
            this.validationErrors = error.response.data.errors;
          }
        });
    },
    addClient() {
      axios
        .post(`${apiDomain}/api/storeClient`, {
          nom: this.nom,
          prenom: this.prenom,
          telephone: this.telephone,
          email: this.email,
          civilité: this.civilité,
          gouvernorat: this.gouvernorat,
          agence_id: this.agence_id,
          headers: {
            "content-type": "application/json",
          },
        })
        .then(function (response) {
          if (response.status == 200) {
            alert("Veuillez joindre l'agence pour le paiement");
          }
        })
        .catch((error) => {
          if (error.response && error.response.status == 422) {
            this.validationErrors = error.response.data.errors;
          }
        });
    },
  },
};
</script>





<style lang="scss">
$color-white: #fff;
$brand-color-g: #348e80;
$brand-color: #df8625;

@mixin respond-to($breakpoint) {
  @if $breakpoint == "xs" {
    @media screen and (max-width: 767px) {
      @content;
    }
  } @else if $breakpoint == "sm" {
    @media (min-width: 768px) and (max-width: 991px) {
      @content;
    }
  } @else if $breakpoint == "md" {
    @media (min-width: 992px) and (max-width: 1199px) {
      @content;
    }
  } @else if $breakpoint == "lg" {
    @media screen and (min-width: 1200px) {
      @content;
    }
  }
}

.ps-timeline-sec {
  position: relative;
  background: $color-white;

  .container {
    position: relative;

    ol {
      @include respond-to(xs) {
        &:before {
          background: $brand-color-g;
          content: "";
          width: 10px;
          height: 10px;
          border-radius: 100%;
          position: absolute;
          top: 130px !important;
          left: 36px !important;
        }

        &:after {
          background: #348e80;
          content: "";
          width: 10px;
          height: 10px;
          border-radius: 100%;
          position: absolute;
          top: inherit !important;
          left: 36px;
        }

        &.ps-timeline {
          margin: 130px 0 !important;
          border-left: 2px solid #348e80;
          padding-left: 0 !important;
          padding-top: 120px !important;
          border-top: 0 !important;
          margin-left: 25px !important;

          li {
            height: 220px;
            float: none !important;
            width: inherit !important;

            &:nth-child(2) {
              .img-handler-bot {
                img {
                  width: 70px;
                }
              }
            }

            &:last-child {
              margin: 0;
              bottom: 0 !important;
              height: 120px;

              .img-handler-bot {
                bottom: 40px !important;
                width: 40% !important;
                margin-left: 25px !important;
                margin-top: 0 !important;

                img {
                  width: 100%;
                }
              }

              .ps-top {
                margin-bottom: 0 !important;
                top: 20px;
                width: 50% !important;
              }
            }

            span {
              left: 0 !important;

              &.ps-sp-top {
                &:before {
                  content: none !important;
                }

                &:after {
                  content: none !important;
                }
              }

              &.ps-sp-bot {
                &:before {
                  content: none !important;
                }

                &:after {
                  content: none !important;
                }
              }
            }

            .img-handler-top {
              position: absolute !important;
              bottom: 150px !important;
              width: 30% !important;
              float: left !important;
              margin-left: 35px !important;
              margin-bottom: 0 !important;

              img {
                margin: 0 auto !important;
                width: 80% !important;
              }
            }

            .img-handler-bot {
              position: absolute !important;
              bottom: 115px !important;
              width: 30% !important;
              float: left !important;
              margin-left: 35px !important;
              margin-bottom: 0 !important;

              img {
              }
            }

            p {
              text-align: left !important;
              width: 100% !important;
              margin: 0 auto !important;
              margin-top: 0px !important;
            }

            .ps-top {
              width: 60% !important;
              float: right !important;
              right: 0;
              top: -40px;
            }

            .ps-bot {
              width: 60% !important;
              float: right !important;
              right: 0;
              top: -40px;
            }
          }
        }
      }

      &:before {
        background: $brand-color-g;
        content: "";
        width: 10px;
        height: 10px;
        border-radius: 100%;
        position: absolute;
        left: 8px;
        top: 49.5%;
      }

      &:after {
        background: $brand-color-g;
        content: "";
        width: 10px;
        height: 10px;
        border-radius: 100%;
        position: absolute;
        right: 8px;
        top: 49.5%;
      }

      &.ps-timeline {
        margin: 58px 0;
        padding: 0;
        border-top: 2px solid $brand-color-g;
        list-style: none;

        li {
          float: left;
          width: 25%;
          padding-top: 30px;
          position: relative;

          span {
            width: 50px;
            height: 50px;
            margin-left: -25px;
            background: $color-white;
            border: 4px solid $brand-color-g;
            border-radius: 50%;
            box-shadow: 0 0 0 0px $color-white;
            text-align: center;
            line-height: 50px -10;
            color: $brand-color;
            font-size: 2em;
            font-style: normal;
            position: absolute;
            top: -26px;
            left: 50%;

            &.ps-sp-top {
              &:before {
                content: "";
                color: $brand-color-g;
                width: 2px;
                height: 50px;
                background: $brand-color-g;
                position: absolute;
                top: -50px;
                left: 50%;
              }

              &:after {
                content: "";
                color: $brand-color-g;
                width: 8px;
                height: 8px;
                background: $brand-color-g;
                position: absolute;
                bottom: 90px;
                left: 44%;
                border-radius: 100%;
              }
            }

            &.ps-sp-bot {
              &:before {
                content: "";
                color: $brand-color-g;
                width: 2px;
                height: 50px;
                background: $brand-color-g;
                position: absolute;
                bottom: -50px;
                left: 50%;
              }

              &:after {
                content: "";
                color: $brand-color-g;
                width: 8px;
                height: 8px;
                background: $brand-color-g;
                position: absolute;
                top: 90px;
                left: 44%;
                border-radius: 100%;
              }
            }
          }

          .img-handler-top {
            position: absolute;
            bottom: 0;
            margin-bottom: 130px;
            width: 100%;

            img {
              display: table;
              margin: 0 auto;
            }
          }

          .img-handler-bot {
            position: absolute;
            margin-top: 60px;
            width: 100%;

            img {
              display: table;
              margin: 0 auto;
            }
          }

          p {
            text-align: center;
            width: 80%;
            margin: 0 auto;
          }

          .ps-top {
            position: absolute;
            bottom: 0;
            margin-bottom: 100px;
          }

          .ps-bot {
            position: absolute;
            margin-top: 35px;
          }
        }
      }
    }
  }
}

/* iframe {
  border: 1px solid #c4252c;
  width: 100%;
} */

#modal-paymee .modal-content {
  width: 69% !important;
}

#modal-paymee-responsive .modal-content {
  width: 100% !important;
}
</style>