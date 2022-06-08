<template>
  <div>
    <scroll-fixed-header
      :fixed.sync="fixed"
      :threshold="56"
      :class="{ change_color: scrollPosition > 50 }"
    >
      <TopNavbarHome />
      <vue-headful
        title="Etnafes-Tourisme et attractions locales"
        image="https://etnafes.com/images/foret-etnafes-voyage111.jpg"
      />
    </scroll-fixed-header>
    <!-- WEB -->
    <div
      class="container-fluid view full-page-intro d-none d-lg-block"
      style="
        background-image: url('v4-500px.jpg.webp');
        background-repeat: no-repeat;

        background-size: cover;
        background-attachment: fixed;
        height: 550px !important;
      "
    >
      <!-- moez media 21/04/2022 -->
      <div class="row">
        <div class="col-2"></div>
        <div class="center">
          <!-- pack est active -->
          <div>
            <div v-if="visible2 == true">
              <center>
                <button
                  v-if="visible2 == false"
                  @click="
                    visible2 = !visible2;
                    visible3 = !visible3;
                  "
                  class="pack"
                >
                  Circuits
                </button>
                <button v-if="visible2 == true" class="pack_active">
                  Circuits
                  <hr class="hr_active" />
                </button>
                <button v-if="visible3 == true" class="heb_active">
                  Hébergements
                  <hr class="hr_active" />
                </button>
                <button
                  v-if="visible3 == false"
                  @click="
                    visible3 = !visible3;
                    visible2 = !visible2;
                  "
                  class="heb"
                >
                  Hébergements
                </button>
                <router-link to="/position_resultats">
                  <button class="heb">Proximité</button>
                </router-link>
              </center>
            </div>
          </div>

          <!-- hebergement est active -->
          <div>
            <div v-if="visible3 == true">
              <center>
                <button
                  v-if="visible2 == false"
                  @click="
                    visible2 = !visible2;
                    visible3 = !visible3;
                  "
                  class="pack"
                >
                  Circuits
                </button>
                <button v-if="visible2 == true" class="pack_active">
                  Circuits
                  <hr class="hr_active" />
                </button>
                <button v-if="visible3 == true" class="heb_active">
                  Hébergements
                  <hr class="hr_active" />
                </button>
                <button
                  v-if="visible3 == false"
                  @click="
                    visible3 = !visible3;
                    visible2 = !visible2;
                  "
                  class="heb"
                >
                  Hébergements
                </button>
                <router-link to="/position_resultats">
                  <button class="heb">Proximité</button>
                </router-link>
              </center>
            </div>
          </div>
          <!-- ----------------------------------- -->
          <!-- card pack active -->
          <div>
            <div v-if="visible2 == true">
              <div class="card-body card_pack">
                <form>
                  <div class="row">
                    <div class="col-moez st_destination">
                      <div
                        style="
                          position: relative !important;
                          z-index: 1 !important;
                        "
                        class="form-group11"
                      >
                        <div class="label_pack">Destination</div>

                        <v-select
                          class="topAllinput"
                          placeholder="Où allez-vous ?"
                          v-model="pack.ville_id"
                          required
                          :options="villes"
                          value="id"
                          label="nom"
                        ></v-select>
                      </div>
                    </div>
                    <div
                      class="col-moez st_Arrivee"
                      style="margin-left: -9px !important"
                    >
                      <div
                        style="
                          position: relative !important;
                          z-index: 1 !important;
                        "
                        class="form-group11"
                      >
                        <div class="label_arrivee">ََArrivée</div>

                        <div style="margin-top: -18px !important">
                          <date-picker
                           onmouseover="this.style.cursor='pointer'"
                            v-model="pack.date_deb"
                            required
                            valueType="format"
                            :lang="fr"
                            placeholder=" Votre date ?"
                            :disabled-date="disabledBeforeToday"
                          ></date-picker>
                        </div>
                      </div>
                    </div>

                    <div
                      class="col-moez st_voyageurs"
                      style="margin-left: -11px !important"
                    >
                      <div
                        style="
                          position: relative !important;
                          z-index: 1 !important;
                        "
                        class="form-group11"
                      >
                        <div class="label_arrivee">Voyageurs</div>

                        <div class="row_voy_moez">
                          <b-nav-item-dropdown
                            v-if="verif_voy_pack == false"
                            @show="verif_nb_voy_pack"
                            text="ََQui sont les voyageurs ?"
                            center
                          >
                            <div
                              class="row"
                              style="
                                width: 289px !important;
                                border-radius: 109px !important;
                                margin-top: 10px;
                                padding: 4px;
                              "
                            >
                              <span
                                style="
                                  margin-left: 20px;
                                  margin-top: -6px;
                                  color: #333;
                                  font-size: small;
                                "
                              >
                                voyageurs:</span
                              >
                              <vue-numeric-input
                                style="
                                  position: relative !important;
                                  -webkit-box-sizing: border-box !important;
                                  box-sizing: border-box !important;
                                  /* height: 2.8rem; */
                                  width: 81px !important;
                                  margin-left: 85px !important;
                                  margin-top: -9px !important;
                                "
                                v-model="nb_adulte"
                                :min="1"
                                :step="1"
                                name="nb_adulte"
                                required
                                size="small"
                              ></vue-numeric-input>
                            </div>
                          </b-nav-item-dropdown>

                          <b-nav-item-dropdown
                            v-if="verif_voy_pack == true && nb_adulte == 1"
                            @show="verif_nb_voy_pack"
                            :text="' ' + nb_adulte + ' ' + 'Voyageur'"
                            center
                          >
                            <div
                              class="row"
                              style="
                                width: 289px !important;
                                border-radius: 109px !important;
                                margin-top: 10px;
                                padding: 4px;
                              "
                            >
                              <span
                                style="
                                  margin-left: 20px;
                                  margin-top: -6px;
                                  color: #333;
                                  font-size: small;
                                "
                              >
                                voyageurs:</span
                              >
                              <vue-numeric-input
                                style="
                                  position: relative !important;
                                  -webkit-box-sizing: border-box !important;
                                  box-sizing: border-box !important;
                                  /* height: 2.8rem; */
                                  width: 81px !important;
                                  margin-left: 85px !important;
                                  margin-top: -9px !important;
                                "
                                v-model="nb_adulte"
                                :min="1"
                                :step="1"
                                name="nb_adulte"
                                required
                                size="small"
                              ></vue-numeric-input>
                            </div>
                          </b-nav-item-dropdown>

                          <b-nav-item-dropdown
                            v-if="verif_voy_pack == true && nb_adulte > 1"
                            @show="verif_nb_voy_pack"
                            :text="' ' + nb_adulte + ' ' + 'Voyageurs'"
                            center
                          >
                            <div
                              class="row"
                              style="
                                width: 289px !important;
                                border-radius: 109px !important;
                                margin-top: 10px;
                                padding: 4px;
                              "
                            >
                              <span
                                style="
                                  margin-left: 20px;
                                  margin-top: -6px;
                                  color: #333;
                                  font-size: small;
                                "
                              >
                                voyageurs:</span
                              >
                              <vue-numeric-input
                                style="
                                  position: relative !important;
                                  -webkit-box-sizing: border-box !important;
                                  box-sizing: border-box !important;
                                  /* height: 2.8rem; */
                                  width: 81px !important;
                                  margin-left: 85px !important;
                                  margin-top: -9px !important;
                                "
                                v-model="nb_adulte"
                                :min="1"
                                :step="1"
                                name="nb_adulte"
                                required
                                size="small"
                              ></vue-numeric-input>
                            </div>
                          </b-nav-item-dropdown>
                        </div>
                      </div>
                    </div>

                    <div class="col-moez10">
                      <div>
                        <router-link
                          :to="{
                            name: 'ResultatsRecherche',
                            query: {
                              ville_id: pack.ville_id.id,
                              date_deb: pack.date_deb,
                              nb_adulte: nb_adulte,
                            },
                          }"
                        >
                          <img loading="lazy"
                            src="serach-etanfes-b.png"
                            class="style_button_search"
                          />
                        </router-link>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <!-- heb active -->
            <div v-else>
              <div class="card-body card_heb">
                <form>
                  <div class="row">
                    <div class="col-22moez st_destination">
                      <div
                        style="
                          position: relative !important;
                          z-index: 1 !important;
                        "
                        class="form-group11"
                      >
                        <div class="label_pack">Destination</div>

                        <v-select
                          class="topAllinput"
                          placeholder="Où allez-vous ?"
                          v-model="pack.ville_id"
                          :options="villes"
                          value="id"
                          label="nom"
                        ></v-select>
                      </div>
                    </div>
                    <div class="col-22moez st_Arrivee">
                      <div
                        style="
                          position: relative !important;
                          z-index: 1 !important;
                        "
                        class="form-group11"
                      >
                        <div class="label_arrivee">ََArrivée</div>

                        <div style="margin-top: -18px !important">
                          <date-picker
                            v-model="du"
                            valueType="format"
                            :lang="fr"
                            placeholder=" Votre date ?"
                            :disabled-date="disabledBeforeToday"
                          ></date-picker>
                        </div>
                      </div>
                    </div>
                    <div class="col-22moez st_Arrivee">
                      <div
                        style="
                          position: relative !important;
                          z-index: 1 !important;
                        "
                        class="form-group11"
                      >
                        <div class="label_arrivee">Départ</div>

                        <div style="margin-top: -18px !important">
                          <date-picker
                            v-model="au"
                            valueType="format"
                            :lang="fr"
                            placeholder=" Votre date ?"
                            :disabled-date="disabledBeforeToday"
                          ></date-picker>
                        </div>
                      </div>
                    </div>
                    <div class="col-22moez st_voyageurs">
                      <div
                        style="
                          position: relative !important;
                          z-index: 1 !important;
                        "
                        class="form-group11"
                      >
                        <div class="label_arrivee">Voyageurs</div>

                        <div class="voyageur_moez">
                          <b-nav-item-dropdown
                            text="Qui sont les voyageurs ?"
                            center
                            v-if="verif_voy_heb == false"
                            @show="verif_nb_voy_heb"
                          >
                            <div
                              class="row"
                              style="
                                width: 289px !important;
                                border-radius: 109px !important;
                                margin-top: 10px;
                                padding: 4px;
                              "
                            >
                              <span
                                style="
                                  margin-left: 20px;
                                  margin-top: -6px;
                                  color: #333;
                                  font-size: small;
                                "
                              >
                                Adultes</span
                              >
                              <vue-numeric-input
                                style="
                                  position: relative !important;
                                  -webkit-box-sizing: border-box !important;
                                  box-sizing: border-box !important;
                                  /* height: 2.8rem; */
                                  width: 81px !important;
                                  margin-left: 85px !important;
                                  margin-top: -9px !important;
                                "
                                v-model="nb_adulte"
                                :min="1"
                                :step="1"
                                name="nb_adulte"
                                required
                                size="small"
                              ></vue-numeric-input>
                            </div>

                            <div
                              class="row"
                              style="
                                width: 289px !important;
                                border-radius: 109px !important;
                                margin-top: 10px;
                                padding: 4px;
                              "
                            >
                              <span
                                style="
                                  margin-left: 20px;
                                  margin-top: -6px;
                                  color: #333;
                                  font-size: small;
                                "
                              >
                                Enfants
                              </span>
                              <vue-numeric-input
                                style="
                                  position: relative !important;
                                  -webkit-box-sizing: border-box !important;
                                  box-sizing: border-box !important;
                                  /* height: 2.8rem; */
                                  width: 81px !important;
                                  margin-left: 85px !important;
                                  margin-top: -9px !important;
                                "
                                v-model="nb_enfant"
                                :min="0"
                                :step="1"
                                name="nb_adulte"
                                required
                                size="small"
                              ></vue-numeric-input>
                            </div>
                          </b-nav-item-dropdown>

                          <b-nav-item-dropdown
                            text="
                              
                              1 Voyageur
                            "
                            center
                            v-if="
                              verif_voy_heb == true &&
                              nb_adulte == 1 &&
                              nb_enfant == 0
                            "
                            @show="verif_nb_voy_heb"
                          >
                            <div
                              class="row"
                              style="
                                width: 289px !important;
                                border-radius: 109px !important;
                                margin-top: 10px;
                                padding: 4px;
                              "
                            >
                              <span
                                style="
                                  margin-left: 20px;
                                  margin-top: -6px;
                                  color: #333;
                                  font-size: small;
                                "
                              >
                                Adultes</span
                              >
                              <vue-numeric-input
                                style="
                                  position: relative !important;
                                  -webkit-box-sizing: border-box !important;
                                  box-sizing: border-box !important;
                                  /* height: 2.8rem; */
                                  width: 81px !important;
                                  margin-left: 85px !important;
                                  margin-top: -9px !important;
                                "
                                v-model="nb_adulte"
                                :min="1"
                                :step="1"
                                name="nb_adulte"
                                required
                                size="small"
                              ></vue-numeric-input>
                            </div>

                            <div
                              class="row"
                              style="
                                width: 289px !important;
                                border-radius: 109px !important;
                                margin-top: 10px;
                                padding: 4px;
                              "
                            >
                              <span
                                style="
                                  margin-left: 20px;
                                  margin-top: -6px;
                                  color: #333;
                                  font-size: small;
                                "
                              >
                                Enfants
                              </span>
                              <vue-numeric-input
                                style="
                                  position: relative !important;
                                  -webkit-box-sizing: border-box !important;
                                  box-sizing: border-box !important;
                                  /* height: 2.8rem; */
                                  width: 81px !important;
                                  margin-left: 85px !important;
                                  margin-top: -9px !important;
                                "
                                v-model="nb_enfant"
                                :min="0"
                                :step="1"
                                name="nb_adulte"
                                required
                                size="small"
                              ></vue-numeric-input>
                            </div>
                          </b-nav-item-dropdown>

                          <b-nav-item-dropdown
                            :text="
                              Number(nb_adulte) +
                              Number(nb_enfant) +
                              ' ' +
                              'Voyageurs'
                            "
                            center
                            v-if="
                              (verif_voy_heb == true && nb_adulte > 1) ||
                              nb_enfant > 0
                            "
                            @show="verif_nb_voy_heb"
                          >
                            <div
                              class="row"
                              style="
                                width: 289px !important;
                                border-radius: 109px !important;
                                margin-top: 10px;
                                padding: 4px;
                              "
                            >
                              <span
                                style="
                                  margin-left: 20px;
                                  margin-top: -6px;
                                  color: #333;
                                  font-size: small;
                                "
                              >
                                Adultes</span
                              >
                              <vue-numeric-input
                                style="
                                  position: relative !important;
                                  -webkit-box-sizing: border-box !important;
                                  box-sizing: border-box !important;
                                  /* height: 2.8rem; */
                                  width: 81px !important;
                                  margin-left: 85px !important;
                                  margin-top: -9px !important;
                                "
                                v-model="nb_adulte"
                                :min="1"
                                :step="1"
                                name="nb_adulte"
                                required
                                size="small"
                              ></vue-numeric-input>
                            </div>

                            <div
                              class="row"
                              style="
                                width: 289px !important;
                                border-radius: 109px !important;
                                margin-top: 10px;
                                padding: 4px;
                              "
                            >
                              <span
                                style="
                                  margin-left: 20px;
                                  margin-top: -6px;
                                  color: #333;
                                  font-size: small;
                                "
                              >
                                Enfants
                              </span>
                              <vue-numeric-input
                                style="
                                  position: relative !important;
                                  -webkit-box-sizing: border-box !important;
                                  box-sizing: border-box !important;
                                  /* height: 2.8rem; */
                                  width: 81px !important;
                                  margin-left: 85px !important;
                                  margin-top: -9px !important;
                                "
                                v-model="nb_enfant"
                                :min="0"
                                :step="1"
                                name="nb_adulte"
                                required
                                size="small"
                              ></vue-numeric-input>
                            </div>
                          </b-nav-item-dropdown>
                        </div>
                      </div>
                    </div>
                    <div class="col-moez10_heb">
                      <div>
                        <router-link
                          :to="{
                            name: 'ResultatsRechercheHebergement',
                            query: {
                              ville_id: pack.ville_id.id,
                              du: du,
                              au: au,
                              nb_adulte: nb_adulte,
                              nb_enfant: nb_enfant,
                            },
                          }"
                        >
                          <img loading="lazy"
                            class="style_button_hebergement"
                            src="serach-etanfes-b.png"
                          />
                        </router-link>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div class="col-2"></div>
      </div>

      <!-- fin moez media 21/04/2022 -->

      <br />
      <div style="margin-top: 42px" class="row">
        <div class="col-md-8 offset-2">
          <h1 class="text_h1_home">
            Participer et vivre des experiences chez les femmes rurales ou
            artisans.
          </h1>
          <h1 class="text_h1_home">
            Vivre une expérience virtuelle et découvrir des nouveaux endroits en
            Tunisie.
          </h1>
        </div>
        <!--  <h1 class="text_h2_home">
          Trouver facilement un hébergement indépendant pour votre prochain
          séjour.
        </h1> -->
      </div>

    </div>
    <!-- MOBILE -->

    <div
      class="container-fluid_moez view full-page-intro d-lg-none"
      style="
        background-image: url('v4-500px.jpg');
        background-repeat: no-repeat;
        background-size: cover;
        background-attachment: fixed;
        height: auto !important;
      "
    >
      <div style="margin-top: 5px" class="row offset">
        <h1
          class="text_h1_home_resp"
          style="margin-top: 30px !important; letter-spacing: 1px"
        >
          Voyagez autrement en Tunisie.
        </h1>
      </div>
      <div>
        <div
          v-if="visible2 == true"
          style="margin-left: -17px; margin-top: -23px !important"
        >
          <center>
            <button
              v-if="visible2 == false"
              @click="
                visible2 = !visible2;
                visible3 = !visible3;
              "
              class="pack_resp"
            >
              Circuits
            </button>
            <button v-if="visible2 == true" class="pack_active_resp">
              Circuits
              <hr class="hr_active" />
            </button>
            <button v-if="visible3 == true" class="heb_active_resp">
              Hébergements
              <hr class="hr_active" />
            </button>
            <button
              v-if="visible3 == false"
              @click="
                visible3 = !visible3;
                visible2 = !visible2;
              "
              class="heb_resp"
            >
              Hébergements
            </button>
            <router-link to="/position_resultats">
              <button class="prox_resp">Proximité</button>
            </router-link>
          </center>
        </div>

        <div
          v-if="visible3 == true"
          style="margin-left: -100px; margin-top: -23px !important"
        >
          <center>
            <button
              v-if="visible2 == false"
              @click="
                visible2 = !visible2;
                visible3 = !visible3;
              "
              class="pack_resp"
            >
              Circuits
            </button>
            <button v-if="visible2 == true" class="pack_active_resp">
              Circuits
              <hr class="hr_active" />
            </button>
            <button v-if="visible3 == true" class="heb_active_resp">
              Hébergements
              <hr class="hr_active_resp" />
            </button>
            <button
              v-if="visible3 == false"
              @click="
                visible3 = !visible3;
                visible2 = !visible2;
              "
              class="heb_resp"
            >
              Hébergements
            </button>
            <router-link to="/position_resultats">
              <button style="margin-left: 117px !important" class="prox_resp">
                Proximité
              </button>
            </router-link>
          </center>
        </div>
        <div class="mt-2" style="padding-bottom: 20px !important">
          <div v-if="visible2 == true">
            <div>
              <div class="card-body card_pack_resp">
                <form>
                  <div class="row">
                    <div class="col-md-4 st_destination">
                      <div
                        style="
                          position: relative !important;
                          z-index: 1 !important;
                        "
                        class="form-group11"
                      >
                        <div class="label_pack_resp">Destination</div>

                        <v-select
                          style="margin-left: -28px !important"
                          class="topAllinput"
                          placeholder="Où allez-vous ?"
                          v-model="pack.ville_id"
                          :options="villes"
                          value="id"
                          label="nom"
                        ></v-select>
                      </div>
                    </div>
                    <div
                      class="col-md-4 st_Arrivee"
                      style="margin-left: -9px !important"
                    >
                      <div
                        style="
                          position: relative !important;
                          z-index: 1 !important;
                        "
                        class="form-group11"
                      >
                        <div class="label_arrivee_resp">ََArrivée</div>

                        <div style="margin-top: -18px !important">
                          <date-picker
                            v-model="pack.date_deb"
                            valueType="format"
                            :lang="fr"
                            placeholder=" Votre date ?"
                            :disabled-date="disabledBeforeToday"
                            style="margin-left: 1px !important"
                          ></date-picker>
                        </div>
                      </div>
                    </div>

                    <div
                      class="col-md-4 st_voyageurs"
                      style="margin-left: -11px !important"
                    >
                      <div
                        style="
                          position: relative !important;
                          z-index: 1 !important;
                        "
                        class="form-group11"
                      >
                        <div class="label_voyageur_resp">Voyageurs</div>

                        <div
                          style="
                            width: 159px;
                            margin-top: -14px;
                            list-style: none;
                            color: rgb(101, 94, 94);
                            font-size: 15px;
                            font-weight: bold;
                            margin-left: -35px;
                          "
                        >
                          <b-nav-item-dropdown
                            v-if="verif_voy_pack == false"
                            @show="verif_nb_voy_pack"
                            text="ََQui sont?"
                            left
                          >
                            <div
                              class="row"
                              style="
                                width: 289px !important;
                                border-radius: 109px !important;
                                margin-top: 10px;
                                padding: 4px;
                              "
                            >
                              <span
                                style="
                                  margin-left: 20px;
                                  margin-top: -6px;
                                  color: #333;
                                  font-size: small;
                                "
                              >
                                voyageurs:</span
                              >
                              <br />
                              <vue-numeric-input
                                style="
                                  position: relative !important;
                                  -webkit-box-sizing: border-box !important;
                                  box-sizing: border-box !important;
                                  /* height: 2.8rem; */
                                  width: 81px !important;
                                  margin-left: -76px !important;
                                  margin-top: 20px !important;
                                "
                                v-model="nb_adulte"
                                :min="1"
                                :step="1"
                                name="nb_adulte"
                                required
                                size="small"
                              ></vue-numeric-input>
                            </div>
                          </b-nav-item-dropdown>

                          <b-nav-item-dropdown
                            v-if="verif_voy_pack == true && nb_adulte == 1"
                            @show="verif_nb_voy_pack"
                            :text="' ' + nb_adulte + ' ' + 'Voyageur'"
                            center
                          >
                            <div
                              class="row"
                              style="
                                width: 289px !important;
                                border-radius: 109px !important;
                                margin-top: 10px;
                                padding: 4px;
                              "
                            >
                              <span
                                style="
                                  margin-left: 20px;
                                  margin-top: -6px;
                                  color: #333;
                                  font-size: small;
                                "
                              >
                                voyageurs:</span
                              >
                              <br />
                              <vue-numeric-input
                                style="
                                  position: relative !important;
                                  -webkit-box-sizing: border-box !important;
                                  box-sizing: border-box !important;
                                  /* height: 2.8rem; */
                                  width: 81px !important;
                                  margin-left: -76px !important;
                                  margin-top: 20px !important;
                                "
                                v-model="nb_adulte"
                                :min="1"
                                :step="1"
                                name="nb_adulte"
                                required
                                size="small"
                              ></vue-numeric-input>
                            </div>
                          </b-nav-item-dropdown>

                          <b-nav-item-dropdown
                            v-if="verif_voy_pack == true && nb_adulte > 1"
                            @show="verif_nb_voy_pack"
                            :text="nb_adulte + ' ' + 'Voyageurs'"
                            center
                            style="margin-left: -6px !important"
                          >
                            <div
                              class="row"
                              style="
                                width: 289px !important;
                                border-radius: 109px !important;
                                margin-top: 10px;
                                padding: 4px;
                              "
                            >
                              <span
                                style="
                                  margin-left: 20px;
                                  margin-top: -6px;
                                  color: #333;
                                  font-size: small;
                                "
                              >
                                voyageurs:</span
                              >
                              <br />
                              <vue-numeric-input
                                style="
                                  position: relative !important;
                                  -webkit-box-sizing: border-box !important;
                                  box-sizing: border-box !important;
                                  /* height: 2.8rem; */
                                  width: 81px !important;
                                  margin-left: -76px !important;
                                  margin-top: 20px !important;
                                "
                                v-model="nb_adulte"
                                :min="1"
                                :step="1"
                                name="nb_adulte"
                                required
                                size="small"
                              ></vue-numeric-input>
                            </div>
                          </b-nav-item-dropdown>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-1">
                      <router-link
                        :to="{
                          name: 'ResultatsRecherche',
                          query: {
                            ville_id: pack.ville_id.id,
                            date_deb: pack.date_deb,
                            nb_adulte: nb_adulte,
                          },
                        }"
                      >
                        <button
                          type="submit"
                          class="btn"
                          style="
                            background: rgb(34, 42, 66) !important;
                            margin-top: -8px;
                            margin-left: 110px !important;
                            border-radius: 24px;
                          "
                        >
                          Rechercher
                        </button>
                      </router-link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="card-body card_heb_resp">
              <form>
                <div class="row">
                  <div class="col-md-4 st_destination">
                    <div
                      style="
                        position: relative !important;
                        z-index: 1 !important;
                      "
                      class="form-group11"
                    >
                      <div class="label_pack_resp">Destination</div>

                      <v-select
                        style="margin-left: -28px !important"
                        class="topAllinput"
                        placeholder="Où allez-vous ?"
                        v-model="pack.ville_id"
                        :options="villes"
                        value="id"
                        label="nom"
                      ></v-select>
                    </div>
                  </div>
                  <div
                    class="col-md-4 st_Arrivee"
                    style="margin-left: -9px !important"
                  >
                    <div
                      style="
                        position: relative !important;
                        z-index: 1 !important;
                      "
                      class="form-group11"
                    >
                      <div class="label_arrivee_resp">ََArrivée</div>

                      <div style="margin-top: -18px !important">
                        <date-picker
                          v-model="du"
                          valueType="format"
                          :lang="fr"
                          placeholder=" Votre date ?"
                          :disabled-date="disabledBeforeToday"
                          style="margin-left: 1px !important"
                        ></date-picker>
                      </div>
                    </div>
                  </div>

                  <div
                    class="col-md-4 st_voyageurs"
                    style="margin-left: -11px !important"
                  >
                    <div
                      style="
                        position: relative !important;
                        z-index: 1 !important;
                      "
                      class="form-group11"
                    >
                      <div class="label_voyageur_resp">Voyageurs</div>

                      <div
                        style="
                          width: 159px;
                          margin-top: -14px;
                          list-style: none;
                          color: rgb(101, 94, 94);
                          font-size: 15px;
                          font-weight: bold;
                          margin-left: -35px;
                        "
                      >
                        <b-nav-item-dropdown
                          v-if="verif_voy_heb == false"
                          @show="verif_nb_voy_heb"
                          text="Qui sont!?"
                          right
                        >
                          <div
                            class="row"
                            style="
                              width: 289px !important;
                              border-radius: 109px !important;
                              margin-top: 10px;
                              padding: 4px;
                            "
                          >
                            <span
                              style="
                                margin-left: 20px;
                                margin-top: -6px;
                                color: #333;
                                font-size: small;
                              "
                            >
                              Adultes:</span
                            >
                            <br />
                            <vue-numeric-input
                              style="
                                position: relative !important;
                                -webkit-box-sizing: border-box !important;
                                box-sizing: border-box !important;
                                /* height: 2.8rem; */
                                width: 81px !important;
                                margin-left: -53px !important;
                                margin-top: 20px !important;
                              "
                              v-model="nb_adulte"
                              :min="1"
                              :step="1"
                              name="nb_adulte"
                              required
                              size="small"
                            ></vue-numeric-input>
                          </div>

                          <div
                            class="row"
                            style="
                              width: 289px !important;
                              border-radius: 109px !important;
                              margin-top: 10px;
                              padding: 4px;
                            "
                          >
                            <span
                              style="
                                margin-left: 20px;
                                margin-top: -6px;
                                color: #333;
                                font-size: small;
                              "
                            >
                              Enfants:
                            </span>
                            <vue-numeric-input
                              style="
                                position: relative !important;
                                -webkit-box-sizing: border-box !important;
                                box-sizing: border-box !important;
                                /* height: 2.8rem; */
                                width: 81px !important;
                                margin-left: -53px !important;
                                margin-top: 17px !important;
                              "
                              v-model="nb_enfant"
                              :min="0"
                              :step="1"
                              name="nb_adulte"
                              required
                              size="small"
                            ></vue-numeric-input>
                          </div>
                        </b-nav-item-dropdown>
                        <b-nav-item-dropdown
                          text="
                              
                              1 Voyageur
                            "
                          center
                          v-if="
                            verif_voy_heb == true &&
                            nb_adulte == 1 &&
                            nb_enfant == 0
                          "
                          @show="verif_nb_voy_heb"
                        >
                          <div
                            class="row"
                            style="
                              width: 289px !important;
                              border-radius: 109px !important;
                              margin-top: 10px;
                              padding: 4px;
                            "
                          >
                            <span
                              style="
                                margin-left: 20px;
                                margin-top: -6px;
                                color: #333;
                                font-size: small;
                              "
                            >
                              Adultes:</span
                            >
                            <br />
                            <vue-numeric-input
                              style="
                                position: relative !important;
                                -webkit-box-sizing: border-box !important;
                                box-sizing: border-box !important;
                                /* height: 2.8rem; */
                                width: 81px !important;
                                margin-left: -53px !important;
                                margin-top: 20px !important;
                              "
                              v-model="nb_adulte"
                              :min="1"
                              :step="1"
                              name="nb_adulte"
                              required
                              size="small"
                            ></vue-numeric-input>
                          </div>

                          <div
                            class="row"
                            style="
                              width: 289px !important;
                              border-radius: 109px !important;
                              margin-top: 10px;
                              padding: 4px;
                            "
                          >
                            <span
                              style="
                                margin-left: 20px;
                                margin-top: -6px;
                                color: #333;
                                font-size: small;
                              "
                            >
                              Enfants:
                            </span>
                            <vue-numeric-input
                              style="
                                position: relative !important;
                                -webkit-box-sizing: border-box !important;
                                box-sizing: border-box !important;
                                /* height: 2.8rem; */
                                width: 81px !important;
                                margin-left: -53px !important;
                                margin-top: 17px !important;
                              "
                              v-model="nb_enfant"
                              :min="0"
                              :step="1"
                              name="nb_adulte"
                              required
                              size="small"
                            ></vue-numeric-input>
                          </div>
                        </b-nav-item-dropdown>

                        <b-nav-item-dropdown
                          :text="
                            Number(nb_adulte) +
                            Number(nb_enfant) +
                            ' ' +
                            'Voyageurs'
                          "
                          center
                          v-if="
                            (verif_voy_heb == true && nb_adulte > 1) ||
                            nb_enfant > 0
                          "
                          @show="verif_nb_voy_heb"
                        >
                          <div
                            class="row"
                            style="
                              width: 289px !important;
                              border-radius: 109px !important;
                              margin-top: 10px;
                              padding: 4px;
                            "
                          >
                            <span
                              style="
                                margin-left: 20px;
                                margin-top: -6px;
                                color: #333;
                                font-size: small;
                              "
                            >
                              Adultes:</span
                            >
                            <br />
                            <vue-numeric-input
                              style="
                                position: relative !important;
                                -webkit-box-sizing: border-box !important;
                                box-sizing: border-box !important;
                                /* height: 2.8rem; */
                                width: 81px !important;
                                margin-left: -53px !important;
                                margin-top: 20px !important;
                              "
                              v-model="nb_adulte"
                              :min="1"
                              :step="1"
                              name="nb_adulte"
                              required
                              size="small"
                            ></vue-numeric-input>
                          </div>

                          <div
                            class="row"
                            style="
                              width: 289px !important;
                              border-radius: 109px !important;
                              margin-top: 10px;
                              padding: 4px;
                            "
                          >
                            <span
                              style="
                                margin-left: 20px;
                                margin-top: -6px;
                                color: #333;
                                font-size: small;
                              "
                            >
                              Enfants:
                            </span>
                            <vue-numeric-input
                              style="
                                position: relative !important;
                                -webkit-box-sizing: border-box !important;
                                box-sizing: border-box !important;
                                /* height: 2.8rem; */
                                width: 81px !important;
                                margin-left: -53px !important;
                                margin-top: 17px !important;
                              "
                              v-model="nb_enfant"
                              :min="0"
                              :step="1"
                              name="nb_adulte"
                              required
                              size="small"
                            ></vue-numeric-input>
                          </div>
                        </b-nav-item-dropdown>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div
                    class="col-md-4 st_Arrivee"
                    style="margin-left: -18px !important"
                  >
                    <div
                      style="position: relative !important"
                      class="form-group11"
                    >
                      <div class="label_depart_resp">Départ</div>

                      <div style="margin-top: -17px !important">
                        <date-picker
                          v-model="au"
                          valueType="format"
                          :lang="fr"
                          placeholder=" Votre date ?"
                          :disabled-date="disabledBeforeToday"
                          style="margin-left: 2px !important"
                        ></date-picker>
                      </div>
                    </div>
                  </div>

                  <div class="col-4"></div>
                  <div class="col-4"></div>

                  <!-- button  -->
                </div>
                <div class="row">
                  <div class="col-md-1">
                    <router-link
                      :to="{
                        name: 'ResultatsRechercheHebergement',
                        query: {
                          ville_id: pack.ville_id.id,
                          du: du,
                          au: au,
                          nb_adulte: nb_adulte,
                          nb_enfant: nb_enfant,
                          ages: agestab,
                        },
                      }"
                    >
                      <button
                        type="submit"
                        class="btn"
                        style="
                          background: rgb(34, 42, 66) !important;
                          margin-top: -69px;
                          margin-left: 154px !important;
                          border-radius: 24px;
                        "
                      >
                        Rechercher
                      </button>
                    </router-link>
                  </div>
                </div>
              </form>
              
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- pourquoi partir avec etnafes web -->
    <div class="container container_pourqoit_etnafes d-none d-lg-block">
      <center>
        <h2 style="color: #000; margin-top: 10px">
          Pourquoi partir avec Etnafes
        </h2>
      </center>
      <div class="row">
        <div class="col-md-3">
          <img loading="lazy"
            class="img_pour_qoit_atnafes"
            alt="destination"
            src="images/home/icons8-touriste-homme-80.png"
          />

          <p class="stytle_txt_pour_qoit_etnafes">
            Destinations alternatives à découvrir en Tunisie
          </p>
        </div>
        <div class="col-md-3">
          <img loading="lazy"
            src="images/home/icons8-tour-de-potier-80.png"
            alt="artisan"
            class="img_pour_qoit_atnafes"
          />

          <p class="stytle_txt_pour_qoit_etnafes">
            Vivre une expérience avec les artisans
          </p>
        </div>
        <div class="col-md-3">
          <img loading="lazy"
            src="images/home/icons8-fermier-femme-80.png"
            alt="femme"
            class="img_pour_qoit_atnafes"
          />

          <p class="stytle_txt_pour_qoit_etnafes">
            Participer à des événements chez les femmes rurales
          </p>
        </div>
        <div class="col-md-3">
          <img loading="lazy"
            src="images/home/icons8-argent-80.png"
            alt="prix"
            class="img_pour_qoit_atnafes"
          />

          <p class="stytle_txt_pour_qoit_etnafes">
            Profiter d'un prix raisonnable et à la portée de tous
          </p>
        </div>
      </div>
    </div>

    <!-- pourquoi partir avec etnafes mobile -->
    <div
      class="container container_pourqoit_etnafes d-lg-none"
      style="padding-bottom: 0px !important"
    >
      <div class="row">
        <div class="col-md-3" style="padding-bottom: 13px">
          <img loading="lazy"
            class="img_pour_qoit_atnafes"
            alt="destination"
            src="images/home/icons8-touriste-homme-80.png"
          />

          <p
            class="stytle_txt_pour_qoit_etnafes"
            style="font-size: 15px !important"
          >
            Destinations alternatives à découvrir en Tunisie
          </p>
        </div>
        <br />
        <div class="col-md-3" style="padding-bottom: 13px">
          <img loading="lazy"
            src="images/home/icons8-tour-de-potier-80.png"
            alt="artisan"
            class="img_pour_qoit_atnafes"
          />

          <p
            class="stytle_txt_pour_qoit_etnafes"
            style="font-size: 15px !important"
          >
            Vivre une expérience avec les artisans
          </p>
        </div>
        <div class="col-md-3" style="padding-bottom: 13px">
          <img loading="lazy"
            src="images/home/icons8-fermier-femme-80.png"
            alt="femme"
            class="img_pour_qoit_atnafes"
          />

          <p
            class="stytle_txt_pour_qoit_etnafes"
            style="font-size: 15px !important"
          >
            Participer à des événements chez les femmes rurales
          </p>
        </div>
        <div class="col-md-3">
          <img loading="lazy"
            src="images/home/icons8-argent-80.png"
            alt="prix"
            class="img_pour_qoit_atnafes"
          />

          <p
            class="stytle_txt_pour_qoit_etnafes"
            style="font-size: 15px !important"
          >
            Profiter d'un prix raisonnable et à la portée de tous
          </p>
        </div>
      </div>
    </div>
    <!--  responsive moez -->
    <!--  responsive moez -->

    <!-- new version calen des packs -->

    <div class="container d-none d-lg-block style_cal_packs">
      <h3
        class="d-none d-lg-block"
        style="color: #000; padding-top: 30px; margin-left: 26px"
      >
        Calendrier des circuits
        <!-- <hr style="border-top: 2px solid #ff931f; width: 16%;margin-top: 8px;" /> -->
      </h3>

      <div class="row">
        <div class="col-sm-12">
          <vueper-slides
            class="no-shadow slides-moez-pack"
            duration="3000"
            :visible-slides="4"
            slide-multiple
            :gap="3"
            :slide-ratio="1 / 5"
            :dragging-distance="200"
            :breakpoints="{ 800: { visibleSlides: 2, slideMultiple: 2 } }"
          >
            <vueper-slide
              v-for="(pack, i) in newpacks"
              v-bind:key="i"
              class="image_slider_home"
            >
              <template #content>
                <div class="card calendrier_packs">
                  <router-link
                    :to="{
                      name: 'Pack',
                      params: { id: pack.id },
                    }"
                  >
                    <div>
                      <img loading="lazy"
                        class="style-moez-img-card"
                        :src="`${apiDomain}/myapp/public/uploads/files_packs/${pack.image_couverture}`"
                        alt="etnafes-tn-travel-circuits"
                      />
                    </div>
                  </router-link>
                  <div>
                    <span>
                      <!-- aime -->
                      <button
                        v-if="!loggedIn"
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
                      <div v-if="loggedIn">
                        <div v-if="pack.Favorite.length == 0">
                          <span>
                            <button
                              title=" Ajouter à vos favoris ?"
                              @click="
                                showEditModal(pack, i);
                                show = true;
                              "
                              v-on:click="submit"
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
                          </span>
                        </div>

                        <div v-if="Object.keys(pack.Favorite).length > 0">
                          <span>
                            <span>
                              <button
                                title="Déja à vos favoris"
                                class="
                                  top-right
                                  btn btn-danger btn-round btn-icon
                                  addFav
                                "
                              >
                                <i
                                  class="tim-icons icon-heart-2"
                                  style="vertical-align: middle"
                                ></i>
                              </button>
                            </span>
                          </span>
                        </div>
                      </div>
                      <!-- fin j aime -->
                      <span class="top-left">
                        <img loading="lazy"
                          src="/home/hebergement/etnafes-tn-travel-avis.png"
                          style="width: 19px"
                        />

                        <div v-if="pack.avis_pack.length > 0">
                          {{
                            Number(
                              calculMoyennePack[i] / pack.avis_pack.length
                            ).toFixed(1)
                          }}
                        </div>
                        <div v-if="pack.avis_pack.length == 0">
                          {{ calculMoyennePack[i].toFixed(1) }}
                        </div>
                      </span>
                    </span>
                  </div>
                  <div>
                    <div
                      v-if="
                        pack.date_deb >
                          new Date().toISOString().split('T')[0] &&
                        pack.nb_place_dispo != 0
                      "
                      class="bottom-right-nouveau-pack"
                    >
                      Nouveau
                    </div>
                    <div
                      v-if="
                        pack.date_deb < new Date().toISOString().split('T')[0]
                      "
                      class="bottom-right-expier-pack"
                    >
                      Expiré
                    </div>
                    <div
                      v-if="pack.nb_place_dispo == 0"
                      class="bottom-right-expier-pack"
                    >
                      Complet
                    </div>
                  </div>
                  <div>
                    <div class="prix_heb">
                      <span class="item-prix">
                        <sup>DT</sup>
                        {{ pack.prix_fix }}
                        <sub>/Personne</sub>
                      </span>
                    </div>
                    <h4 class="card-title title-moez-pack">
                      {{ pack.titre }}
                    </h4>
                  </div>

                  <div class="row">
                    <div class="col style-row-dateArrivee">
                      <!--   <center> -->

 <img loading="lazy"
                        v-b-tooltip.hover
                        title="Date d'arrivée"
                        src="home/pack/etnafes-tn-travel-circuit-pack-tourisme.png"
                        style="width: 19px"
                      />
                      <!--  Arrivée: -->
                      {{ pack.date_deb }}
 <img loading="lazy"
                        v-b-tooltip.hover
                        title="Durée de circuit"
                        src="/date-deb-etnafes.png"
                        alt="debut"
                        width="5%"
                      />
                      <!-- Durée: -->
                      {{ pack.time }} 
<img loading="lazy" v-b-tooltip.hover title="Niveau
                      d’activité physique"
                      src=https://img.icons8.com/ios-filled/20/000000/activity.png/>

                      {{ pack.adrenaline }}


                      
                  <br>
                      
                      
                     
                      <span style="margin-left: -2px">
                        <img loading="lazy"
                          v-b-tooltip.hover
                          title="Nombres de places"
                          src="home/hebergement/etnafes-tn-travel-hote.png"
                          style="width: 24px"
                        />
                        <!--  Place: -->{{ pack.nb_place_max }} Personnes</span
                      >
                      &nbsp; &nbsp; <img loading="lazy" v-if="pack.nomagence.nom_agence!='Admin'" v-b-tooltip.hover title="Niveau
                      d’activité physique"
                      src="https://img.icons8.com/ios/20/undefined/travel-agency.png">

                      <span v-if="pack.nomagence.nom_agence!='Admin'">&nbsp;{{ pack.nomagence.nom_agence }}</span><br />
                      <!-- </center> -->
                    </div>
                  </div>
                </div>
              </template>
            </vueper-slide>
          </vueper-slides>
        </div>
      </div>

      <div class="row" style="margin-top: -42px">
        <div class="col-sm-12">
          <router-link :to="{ name: 'NosPacks' }">
            <button
              style="background: #ff931f !important; float: right"
              class="btn style_voir_plus"
            >
              Voir tous les circuits
            </button>
          </router-link>
        </div>
      </div>
    </div>

    <div id="app" style="margin-bottom: 20px">
      <div
        style="background: #f5f6fa; padding-bottom: 20px !important"
        class="container d-none d-lg-block"
      >
        <h3
          class="d-none d-lg-block"
          style="
            line-height: 40px;
            color: #000;
            padding-top: 25px;
            margin-left: 26px;
          "
        >
          <!-- Participer et vivre des experiences chez les femmes rurales ou
            artisans -->
          Produits divers à découvrir
          <!-- <hr style="border-top: 2px solid #ff931f; width: 10%" /> -->
        </h3>

        <div class="row">
          <div class="col-sm-12">
            <vueper-slides
              duration="3000"
              class="no-shadow slides-moez-pack"
              :visible-slides="4"
              slide-multiple
              :gap="3"
              :slide-ratio="1 / 5"
              :dragging-distance="200"
              :breakpoints="{ 800: { visibleSlides: 2, slideMultiple: 2 } }"
            >
              <vueper-slide
                v-for="(pack, i) in femmes"
                v-bind:key="i"
                class="image_slider_home"
              >
                <template #content>
                  <div class="card calendrier_produits">
                    <router-link
                      :to="{
                        name: 'DetailsProduit',
                        params: { id: pack.id },
                      }"
                    >
                      <div>
                        <img loading="lazy"
                          class="style-moez-img-card"
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
                        <!-- <div v-if="loggedIn">
                          <div v-if="pack.Favorite.length == 0">
                            <span>
                              <button
                                title=" Ajouter à vos favoris ?"
                                @click="
                                  showEditModal(pack, i);
                                  show = true;
                                "
                                v-on:click="submit"
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
                            </span>
                          </div>

                          <div v-if="Object.keys(pack.Favorite).length > 0">
                            <span>
                              <span>
                                <button
                                  title="Déja à vos favoris"
                                  class="
                                    top-right
                                    btn btn-danger btn-round btn-icon
                                    addFav
                                  "
                                >
                                  <i
                                    class="tim-icons icon-heart-2"
                                    style="vertical-align: middle"
                                  ></i>
                                </button>
                              </span>
                            </span>
                          </div>
                        </div> -->
                        <!-- fin j aime -->
                        <span class="top-left">
                          <img loading="lazy"
                            src="/home/hebergement/etnafes-tn-travel-avis.png"
                            style="width: 19px"
                          />

                          <!--  <div v-if="pack.avis_pack.length > 0">
                            {{
                              Number(
                                calculMoyennePack[i] / pack.avis_pack.length
                              ).toFixed(1)
                            }}
                          </div>
                          <div v-if="pack.avis_pack.length == 0">
                            {{ calculMoyennePack[i].toFixed(1) }}
                          </div> -->
                          0.0
                        </span>
                      </span>
                    </div>
                    <div>
                      <div
                        v-if="pack.qts > 0"
                        class="bottom-right-nouveau-pack"
                      >
                        Nouveau
                      </div>

                      <div
                        v-if="pack.qts == 0"
                        class="bottom-right-expier-pack"
                      >
                        En rupture
                      </div>
                    </div>
                    <div>
                      <div class="prix_heb">
                        <span class="item-prix">
                          <sup>DT</sup>
                          {{ pack.prix }}
                        </span>
                      </div>
                      <h4 class="card-title title-moez-pack">
                        {{ pack.titre }}
                      </h4>
                    </div>

                    <div class="row">
                      <div class="col">
                        <img loading="lazy"
                          v-b-tooltip.hover
                          title="nom de femme rurale / artisan"
                          src="/images/home/etnafes-tn-artisan.png"
                          class="style_img_prop_produit"
                        />
                        {{ pack.nomC }} {{ pack.prenom }}

                        &nbsp; &nbsp; &nbsp;

                        <img loading="lazy"
                          class="style_img_qts_produit"
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABkklEQVRIie3VP2tTURzG8e9zcjXiVFeHqmkQmjj45w0kcSgigg6+A0cVFN+Ce5cKKgjiKC6dJdk6ikMTWkhTiCCIoI4mNudxiLcmCi49ZrrP9Ht+XM6HA/dyoUiRIomifGg0Gtnws+5hXUcsJRPMR8Or/V779ew6y4cPn8ITxJqsDRS/JYOlZcyLlXrz1F6382wOPnuxseQxdwLhisPk5LFJ2IlxosnxcH5vu711VHul3hzaegQcwgEgG4UKoH7v7XvHsD6Sb/0ohZuOrB8VBbD8DqjO7jIA20ICMMEKOEyLQgpYB7LD7/cJft34f0eB7wCVWsuVWmtzYXC/1+kGfEHiMeL0wuAcBw/zvjD4zywMrtaaddBy3rN/PZwSjWgbg2BzYbAjJwgw6LUPP6kMQJI97SLKEeK0yEngzCLOn5UBHJTjIIyDq6utSzHoQWk03gWI5fJOCljWZUN/bpcP52pXn4p4DWlD+GsKEABzxui+xcP9bvv5XzDcLlVWv9xFvpH6t4j8ctDtvEl2ZpEiRWbzE2XXiySPB0bsAAAAAElFTkSuQmCC"
                        />

                        {{ pack.qts }}
                      </div>
                    </div>
                  </div>
                </template>
              </vueper-slide>
            </vueper-slides>
          </div>
        </div>
        <div
          class="row"
          style="margin-top: 14px; margin-bottom: 0px !important"
        >
          <div class="col-sm-12">
            <router-link :to="{ name: 'Artisans' }">
              <button
                style="background: #ff931f !important; float: right"
                class="btn style_voir_plus"
              >
                Voir tous les produits
              </button>
            </router-link>
          </div>
        </div>
      </div>

      <div style="background: #fff" class="container-fluid d-lg-none">
        <center>
          <h3
            class="d-lg-none"
            style="
              line-height: 10px;
              font-size: 16px;
              color: #000;
              padding-top: 30px;
            "
          >
            Calendrier des circuits

            <hr style="border-top: 2px solid #ff931f; width: 10%" />
          </h3>
        </center>
        <div class="row">
          <div class="col-sm-12">
            <vueper-slides
              style="margin-left: 40px !important ; margin-top: -30px"
              duration="3000"
              class="no-shadow"
              :visible-slides="1"
              slide-multiple
              :gap="3"
              :slide-ratio="1 / 2"
              :dragging-distance="200"
              :breakpoints="{ 800: { visibleSlides: 1, slideMultiple: 1 } }"
            >
              <vueper-slide
                v-for="(pack, i) in newpacks"
                v-bind:key="i"
                class="image_slider_home"
              >
                <template #content>
                  <div
                    class="card card_mobile_circui"
                    
                  >
                    <router-link
                      :to="{
                        name: 'Pack',
                        params: { id: pack.id },
                      }"
                    >
                      <div>
                        <img loading="lazy"
                          style="
                            margin-top: -8px;
                            margin-left: -6px;

                            max-width: 105%;
                          "
                          :src="`${apiDomain}/myapp/public/uploads/files_packs/${pack.image_couverture}`"
                          alt="etnafes-tn-travel-circuits"
                        />
                      </div>
                    </router-link>
                    <div>
                      <span>
                        <!-- aime -->
                        <button
                          v-if="!loggedIn"
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
                        <div v-if="loggedIn">
                          <div v-if="pack.Favorite.length == 0">
                            <span>
                              <button
                                title=" Ajouter à vos favoris ?"
                                @click="
                                  showEditModal(pack, i);
                                  show = true;
                                "
                                v-on:click="submit"
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
                            </span>
                          </div>

                          <div v-if="Object.keys(pack.Favorite).length > 0">
                            <span>
                              <span>
                                <button
                                  title="Déja à vos favoris"
                                  class="
                                    top-right
                                    btn btn-danger btn-round btn-icon
                                    addFav
                                  "
                                >
                                  <i
                                    class="tim-icons icon-heart-2"
                                    style="vertical-align: middle"
                                  ></i>
                                </button>
                              </span>
                            </span>
                          </div>
                        </div>
                        <!-- fin j aime -->
                        <span class="top-left">
                          <img loading="lazy"
                            src="/home/hebergement/etnafes-tn-travel-avis.png"
                            style="width: 19px"
                          />

                          <div v-if="pack.avis_pack.length > 0">
                            {{
                              Number(
                                calculMoyennePack[i] / pack.avis_pack.length
                              ).toFixed(1)
                            }}
                          </div>
                          <div v-if="pack.avis_pack.length == 0">
                            {{ calculMoyennePack[i].toFixed(1) }}
                          </div>
                        </span>
                      </span>
                    </div>
                    <div>
                      <div
                        v-if="
                          pack.date_deb >
                            new Date().toISOString().split('T')[0] &&
                          pack.nb_place_dispo != 0
                        "
                        class="bottom-right_resp"
                        style="background-color: rgb(40, 179, 81); color: #fff"
                      >
                        Nouveau
                      </div>
                      <div
                        v-if="
                          pack.date_deb < new Date().toISOString().split('T')[0]
                        "
                        class="bottom-right_resp"
                        style="background-color: grey; color: #fff"
                      >
                        Expiré
                      </div>
                      <div
                        v-if="pack.nb_place_dispo == 0"
                        class="bottom-right_resp"
                        style="background-color: grey; color: #fff"
                      >
                        Complet
                      </div>
                    </div>
                    <div>
                      <div class="prix_heb">
                        <span class="item-prix">
                          <sup>DT</sup>
                          {{ pack.prix_fix }}
                          <sub>/Personne</sub>
                        </span>
                      </div>
                      <h4
                        class="card-title"
                        style="
                          font-size: 14px;
                          line-height: 2px;
                          margin-top: 14px;
                          font-weight: bold;
                        "
                      >
                        {{ pack.titre }}
                      </h4>
                    </div>

                    <div class="row">
                      <div
                        class="col"
                        style="
                          margin-left: 0px;
                          margin-top: 0px;
                          font-size: 13px;
                        "
                      >
                        <!--   <center> -->

                        <img loading="lazy"
                          v-b-tooltip.hover
                          title="Date d'arrivée"
                          src="home/pack/etnafes-tn-travel-circuit-pack-tourisme.png"
                          style="width: 19px"
                        />
                        Arrivée: {{ pack.date_deb }}
                        &nbsp; &nbsp;
                        <img loading="lazy"
                          v-b-tooltip.hover
                          title="Durée de circuit"
                          src="/date-deb-etnafes.png"
                          alt="debut"
                          width="5%"
                        />
                        Durée:
                        {{ pack.time }}
                        <!-- <small class="tite_vue_slider_home">
                          Durée: {{ pack.time }}</small
                        > -->
                        <br />
                        <span style="margin-left: -2px">
                          <img loading="lazy"
                            v-b-tooltip.hover
                            title="Nombres de places"
                            src="home/hebergement/etnafes-tn-travel-hote.png"
                            style="width: 24px"
                          />
                          Place:{{ pack.nb_place_max }} Personnes</span
                        >
                        &nbsp; &nbsp; <img loading="lazy" v-b-tooltip.hover title="Niveau
                        d’activité physique"
                        src=https://img.icons8.com/ios-filled/20/000000/activity.png/>
                        <!--   <img loading="lazy" src=home/pack/icons8-activity.gif/> -->

                        {{ pack.adrenaline }}
                        <!-- </center> -->
                      </div>
                    </div>
                  </div>
                </template>
              </vueper-slide>
            </vueper-slides>
          </div>
        </div>
      </div>
      <!-- produits femme responsive -->
      <div style="background: #fff" class="container-fluid d-lg-none">
        <center>
          <h3
            class="d-lg-none"
            style="
              line-height: 10px;
              font-size: 16px;
              color: #000;
              padding-top: 20px;
            "
          >
            Produits divers à découvrir

            <hr style="border-top: 2px solid #ff931f; width: 10%" />
          </h3>
        </center>
        <div class="row">
          <div class="col-sm-12">
            <vueper-slides
              style="margin-left: 40px !important ; margin-top: -30px"
              duration="3000"
              class="no-shadow"
              :visible-slides="1"
              slide-multiple
              :gap="3"
              :slide-ratio="1 / 2"
              :dragging-distance="200"
              :breakpoints="{ 800: { visibleSlides: 1, slideMultiple: 1 } }"
            >
              <vueper-slide
                v-for="(pack, i) in femmes"
                v-bind:key="i"
                class="image_slider_home"
              >
                <template #content>
                  <div
                    class="card card_mobile_circui"
                 
                  >
                    <router-link
                      :to="{
                        name: 'DetailsProduit',
                        params: { id: pack.id },
                      }"
                    >
                      <div>
                        <img loading="lazy"
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
                          <img loading="lazy"
                            src="/home/hebergement/etnafes-tn-travel-avis.png"
                            style="width: 19px"
                          />
                          0.0
                        </span>
                      </span>
                    </div>
                    <div>
                      <div class="prix_heb">
                        <span class="item-prix">
                          <sup>DT</sup>
                          {{ pack.prix }}
                        </span>
                      </div>
                      <h4
                        class="card-title"
                        style="
                          font-size: 14px;
                          line-height: 2px;
                          margin-top: 14px;
                          font-weight: bold;
                        "
                      >
                        {{ pack.titre }}
                      </h4>
                    </div>

                    <div class="row">
                      <div
                        class="col"
                        style="
                          margin-left: 0px;
                          margin-top: 0px;
                          font-size: 13px;
                        "
                      >
                        <img loading="lazy"
                          v-b-tooltip.hover
                          title="nom de femme rurale / artisan"
                          src="/images/home/etnafes-tn-artisan.png"
                          style="width: 33px"
                        />
                        {{ pack.nomC }} {{ pack.prenom }}

                        &nbsp; &nbsp; &nbsp;

                        <img loading="lazy"
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAABkklEQVRIie3VP2tTURzG8e9zcjXiVFeHqmkQmjj45w0kcSgigg6+A0cVFN+Ce5cKKgjiKC6dJdk6ikMTWkhTiCCIoI4mNudxiLcmCi49ZrrP9Ht+XM6HA/dyoUiRIomifGg0Gtnws+5hXUcsJRPMR8Or/V779ew6y4cPn8ITxJqsDRS/JYOlZcyLlXrz1F6382wOPnuxseQxdwLhisPk5LFJ2IlxosnxcH5vu711VHul3hzaegQcwgEgG4UKoH7v7XvHsD6Sb/0ohZuOrB8VBbD8DqjO7jIA20ICMMEKOEyLQgpYB7LD7/cJft34f0eB7wCVWsuVWmtzYXC/1+kGfEHiMeL0wuAcBw/zvjD4zywMrtaaddBy3rN/PZwSjWgbg2BzYbAjJwgw6LUPP6kMQJI97SLKEeK0yEngzCLOn5UBHJTjIIyDq6utSzHoQWk03gWI5fJOCljWZUN/bpcP52pXn4p4DWlD+GsKEABzxui+xcP9bvv5XzDcLlVWv9xFvpH6t4j8ctDtvEl2ZpEiRWbzE2XXiySPB0bsAAAAAElFTkSuQmCC"
                        />

                        {{ pack.qts }}
                      </div>
                    </div>
                  </div>
                </template>
              </vueper-slide>
            </vueper-slides>
          </div>
        </div>
      </div>
    </div>

    <!-- fin new version claendrier  -->

    <!-- div mobile -->

    <!-- div mobile -->
    <!-- fin responsive moez -->

    <!-- container_new_pack_home -->

    <div id="app">
      <div
        class="container d-none d-lg-block"
        style="background: #fff; padding-bottom: 44px !important"
      >
        <h3
          class="d-none d-lg-block"
          style="
            line-height: 40px;
            color: #000;
            padding-top: 25px;
            margin-left: 26px;
          "
        >
          Maison d'hôte authentique
          <!-- <hr style="border-top: 2px solid #ff931f; width: 20%;margin-top: 8px;" /> -->
        </h3>

        <!--   <h3
            class="d-lg-none"
            style="
              line-height: 10px;
              font-size: small;
              color: #000;
              padding-top: 30px;
            "
          >
            Maison d'hôte authentique
            <hr style="border-top: 2px solid #ff931f; width: 10%" />
          </h3> -->

        <div class="row">
          <div class="col-sm-12">
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
                v-for="(pack, i) in hebergements_home"
                v-bind:key="i"
                class="image_slider_home"
              >
                <!--  border: solid 1px #b6b6b6; -->
                <template #content>
                  <div class="card card_hebergement">
                    <router-link class="d-none d-lg-block"
                      :to="{
                        name: 'DetailsHebergementRes',
                        params: { id: pack.id },
                      }"
                    >
                      <div>
                        <img loading="lazy"
                          class="style-moez-img-card"
                          :src="`${apiDomain}/myapp/public/uploads/files_hebergement/${pack.image_couverture}`"
                          alt="Card image cap"
                        />
                      </div>
                    </router-link>

                   <!-- mobile -->

                    <router-link class="d-lg-none"
                      :to="{
                        name: 'DetailsHebergementResMobile',
                        params: { id: pack.id },
                      }"
                    >
                      <div>
                        <img loading="lazy"
                          class="style-moez-img-card"
                          :src="`${apiDomain}/myapp/public/uploads/files_hebergement/${pack.image_couverture}`"
                          alt="Card image cap"
                        />
                      </div>
                    </router-link>
                    <div>
                      <span>
                        <button
                          v-if="!loggedIn"
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
                        <!-- avis -->

                        <div v-if="loggedIn">
                          <div v-if="pack.Favorite.length == 0">
                            <span>
                              <button
                                title=" Ajouter à vos favoris ?"
                                @click="
                                  showEditModal_heb(pack, i);
                                  show = true;
                                "
                                v-on:click="submit_heb"
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
                            </span>
                          </div>

                          <div v-if="Object.keys(pack.Favorite).length > 0">
                            <span>
                              <span>
                                <button
                                  title="Déja à vos favoris"
                                  class="
                                    top-right
                                    btn btn-danger btn-round btn-icon
                                    addFav
                                  "
                                >
                                  <i
                                    class="tim-icons icon-heart-2"
                                    style="vertical-align: middle"
                                  ></i>
                                </button>
                              </span>
                            </span>
                          </div>
                        </div>
                        <!-- avis -->
                        <span class="top-left">
                          <img loading="lazy"
                            src="/home/hebergement/etnafes-tn-travel-avis.png"
                            style="width: 19px"
                          />
                          <div v-if="pack.avis_hebergement.length > 0">
                            {{
                              Number(
                                calculMoyenne[i] / pack.avis_hebergement.length
                              ).toFixed(1)
                            }}
                          </div>
                          <div v-if="pack.avis_hebergement.length == 0">
                            {{ calculMoyenne[i].toFixed(1) }}
                          </div>
                        </span>
                      </span>
                    </div>
                    <div>
                      <div class="prix_heb">
                        <span class="item-prix">
                          <sup>DT</sup>
                          {{ pack.prix_adulte }}
                          <sub>/Nuit </sub>
                        </span>
                      </div>
                      <h4
                        class="card-title"
                        style="
                          font-size: 14px;
                          line-height: 2px;
                          margin-top: 9px;
                          font-weight: bold;
                        "
                      >
                        {{ pack.nom }}
                      </h4>
                    </div>

                    <div class="row sty_rowHEb">
                      <div class="col" style="font-size: 13px">
                        <!--   <center> -->
                        <img loading="lazy"
                          src="home/hebergement/etnafes-tn-travel-hote.png"
                          style="width: 24px"
                        />
                        {{ pack.nbr_voyageurs }} personnes &nbsp; &nbsp;
                        <img loading="lazy"
                          src="home/hebergement/etnafes-tn-maison-hote-travel.png"
                          style="width: 19px"
                        />
                        {{ pack.nbr_chambre_dispo }}
                        <!-- chambres -->

                        <br />
                        <span style="margin-left: 4px">
                          <img loading="lazy" src="/Etnafes-icon3.png" style="width: 16px" />
                          {{ pack.ville.nom }}</span
                        >
                        &nbsp; &nbsp;
                        <i
                          v-b-tooltip.hover
                          title="Type de logement"
                          style="width: 18px"
                          class="tim-icons icon-bank"
                        ></i>
                        {{ pack.type }}
                        <!-- </center> -->
                      </div>
                    </div>
                   
                  </div>
                </template>
              </vueper-slide>
            </vueper-slides>
          </div>
        </div>

        <div class="row" style="margin-top: -42px">
          <div class="col-sm-12">
            <router-link :to="{ name: 'HebergementLibre' }">
              <button
                style="background: #ff931f !important; float: right"
                class="btn style_voir_plus"
              >
                Voir tous les hébergements
              </button>
            </router-link>
          </div>
        </div>
      </div>

      <div class="container-fluid d-lg-none" style="background: #fff">
        <center>
          <!-- <h3
            class="d-lg-none"
            style="line-height: 10px;font-size: 16px;color: #000;padding-top: 30px;"
          >
            Produits divers à découvrir

            <hr style="border-top: 2px solid #ff931f; width: 10%" />
          </h3> -->
          <h3
            style="
              line-height: 10px;
              font-size: 16px;
              color: #000;
              padding-top: 15px;
              margin-top: -20px;
            "
          >
            Maison d'hôte authentique
            <hr style="border-top: 2px solid #ff931f; width: 10%" />
          </h3>
        </center>
        <div class="row">
          <div class="col-sm-12">
            <vueper-slides
              style="margin-left: 40px !important ; margin-top: -30px"
              duration="3000"
              class="no-shadow"
              :visible-slides="1"
              slide-multiple
              :gap="3"
              :slide-ratio="1 / 2"
              :dragging-distance="200"
              :breakpoints="{ 800: { visibleSlides: 1, slideMultiple: 1 } }"
            >
              <vueper-slide
                v-for="(pack, i) in hebergements_home"
                v-bind:key="i"
                class="image_slider_home"
              >
                <!--  border: solid 1px #b6b6b6; -->
                <template #content>
                  <div
                    class="card card_mobile_circui"
                  
                  >
                    <router-link
                      :to="{
                        name: 'DetailsHebergementResMobile',
                        params: { id: pack.id },
                      }"
                    >
                      <div>
                        <img loading="lazy"
                          style="
                            margin-top: -8px;
                            margin-left: -6px;

                            max-width: 105%;
                          "
                          :src="`${apiDomain}/myapp/public/uploads/files_hebergement/${pack.image_couverture}`"
                          alt="Card image cap"
                        />
                      </div>
                    </router-link>
                    <div>
                      <span>
                        <button
                          v-if="!loggedIn"
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
                        <!-- avis -->

                        <div v-if="loggedIn">
                          <div v-if="pack.Favorite.length == 0">
                            <span>
                              <button
                                title=" Ajouter à vos favoris ?"
                                @click="
                                  showEditModal_heb(pack, i);
                                  show = true;
                                "
                                v-on:click="submit_heb"
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
                            </span>
                          </div>

                          <div v-if="Object.keys(pack.Favorite).length > 0">
                            <span>
                              <span>
                                <button
                                  title="Déja à vos favoris"
                                  class="
                                    top-right
                                    btn btn-danger btn-round btn-icon
                                    addFav
                                  "
                                >
                                  <i
                                    class="tim-icons icon-heart-2"
                                    style="vertical-align: middle"
                                  ></i>
                                </button>
                              </span>
                            </span>
                          </div>
                        </div>
                        <!-- avis -->
                        <span class="top-left">
                          <img loading="lazy"
                            src="/home/hebergement/etnafes-tn-travel-avis.png"
                            style="width: 19px"
                          />
                          <div v-if="pack.avis_hebergement.length > 0">
                            {{
                              Number(
                                calculMoyenne[i] / pack.avis_hebergement.length
                              ).toFixed(1)
                            }}
                          </div>
                          <div v-if="pack.avis_hebergement.length == 0">
                            {{ calculMoyenne[i].toFixed(1) }}
                          </div>
                        </span>
                      </span>
                    </div>
                    <div>
                      <div class="prix_heb">
                        <span class="item-prix">
                          <sup>DT</sup>
                          {{ pack.prix_adulte }}
                          <sub>/Nuit </sub>
                        </span>
                      </div>
                      <h4
                        class="card-title"
                        style="
                          font-size: 14px;
                          line-height: 2px;
                          margin-top: 9px;
                          font-weight: bold;
                        "
                      >
                        {{ pack.nom }}
                      </h4>
                    </div>

                    <div class="row">
                      <div
                        class="col"
                        style="
                          margin-left: 19px;
                          margin-top: -4px;
                          font-size: 13px;
                        "
                      >
                        <!--   <center> -->
                        <img loading="lazy"
                          src="home/hebergement/etnafes-tn-travel-hote.png"
                          style="width: 24px"
                        />
                        {{ pack.nbr_voyageurs }} personnes &nbsp; &nbsp;
                        <img loading="lazy"
                          src="home/hebergement/etnafes-tn-maison-hote-travel.png"
                          style="width: 19px"
                        />
                        {{ pack.nbr_chambre_dispo }} chambres

                        <br />
                        <span style="margin-left: 4px">
                          <img loading="lazy" src="/Etnafes-icon3.png" style="width: 16px" />
                          {{ pack.ville.nom }}</span
                        >
                        &nbsp; &nbsp;
                        <i
                          v-b-tooltip.hover
                          title="Type de logement"
                          style="width: 18px"
                          class="tim-icons icon-bank"
                        ></i>
                        {{ pack.type }}
                        <!-- </center> -->
                      </div>
                    </div>
                    
                  </div>
                </template>
              </vueper-slide>
            </vueper-slides>
          </div>
        </div>
      </div>
    </div>

    

    <!-- fin  pack en vedtte -->
    <!-- moteur de recherche -->

    <!-- fin moteur de recherche -->
    <div>
      <div
        class="container"
        style="padding-bottom: 20px; margin-top: 15px !important"
      >
        <center>
          <h3 style="line-height: 40px; color: #000">
            DÉCOUVREZ LA TUNISIE
            <!-- <hr
              style="border-top: 2px solid #ff931f; width: 10%; margin: -2px"
            /> -->
          </h3>
        </center>
        <div class="row" style="margin-top: -15px !important">
          <div class="col-lg-3" v-for="ville in villescot" :key="ville.id">
            <router-link :to="{ name: 'PackVille', params: { id: ville.id } }">
              <div class="card" style="margin-bottom: 30px; margin-top: 10px">
                <div class="card-img-wrap">
                  <img loading="lazy"
                    class="card-img imaa"
                    :src="`${apiDomain}/myapp/public/uploads/files_ville/${ville.image}`"
                    alt="Card image cap"
                  />
                </div>
                <div class="card-block">
                  <h4 class="card-title" style="color: #ff931f">
                    {{ ville.nom }}
                  </h4>
                  <!-- <p class="card-text" style="font-size: 15px">
                    {{ ville.description }}
                  </p> -->

                  <p class="card-text" style="font-size: 15px">
                    <span v-if="ville.description.length < 80">
                      {{ ville.description }}
                    </span>
                    <span v-else>
                      {{ ville.description.substr(0, 70) + "..." }}
                    </span>
                  </p>

                  <br />
                </div>
              </div>
            </router-link>
          </div>
        </div>
        <router-link :to="{ name: 'NosVilles' }">
          <button
            style="background: #ff931f !important"
            class="btn style_voir_plus"
          >
            Voir Plus
          </button>
        </router-link>
      </div>
    </div>

    <div>
      <div class="container" style="padding-bottom: 20px">
        <center>
          <h3
            style="line-height: 40px; color: #000; padding-top: 7px"
            class="d-none d-lg-block"
          >
            Rejoignez Etnafes
            <hr style="border-top: 2px solid #ff931f; width: 10%" />
          </h3>

          <h3
            style="line-height: 15px; color: #000; padding-top: 7px"
            class="d-lg-none"
          >
            Rejoignez
            <!-- notre réseau -->
            Etnafes
            <hr style="border-top: 2px solid #ff931f; width: 10%" />
          </h3>
        </center>
        <div class="row">
          <div class="col-lg-4">
            <router-link
              :to="{ name: 'LoginProprietaire' }"
              @click.native="scrollToTop"
            >
              <div class="card" style="margin-bottom: 30px; margin-top: 10px">
                <div class="card-img-wrap">
                  <img loading="lazy"
                    class="card-img"
                    src="/images/hebergeur-maison-hote-etnafes.jpg.webp"
                    alt="Card image cap"
                  />

                  <div
                    class="top-left badge"
                    style="background-color: rgb(40, 179, 81)"
                  >
                    Hébergeur
                  </div>
                  <h4
                    class="centered"
                    style="
                      margin-bottom: 0px !important;
                      border-top-right-radius: 15px;
                      color: #fff;
                      background-color: rgba(34, 42, 66, 0.8);
                    "
                  >
                    Partagez votre logement sur Etnafes
                  </h4>
                </div>
              </div>
            </router-link>
          </div>

          <div class="col-lg-4">
            <router-link
              :to="{ name: 'LoginAgence' }"
              @click.native="scrollToTop"
            >
              <div class="card" style="margin-bottom: 30px; margin-top: 10px">
                <div class="card-img-wrap">
                  <img loading="lazy"
                    class="card-img"
                    src="/images/agence-de-voyage-etnafes.jpg.webp"
                    alt="Card image cap"
                  />

                  <div
                    class="top-left badge"
                    style="background-color: rgb(40, 179, 81)"
                  >
                    Prestataire de Services
                  </div>
                  <h4
                    class="centered"
                    style="
                      margin-bottom: 0px !important;
                      border-top-right-radius: 15px;
                      color: #fff;
                      background-color: rgba(34, 42, 66, 0.8);
                    "
                  >
                    Organiser un circuit
                  </h4>
                </div>
              </div>
            </router-link>
          </div>

          <div class="col-lg-4">
            <router-link
              :to="{ name: 'LoginGuide' }"
              @click.native="scrollToTop"
            >
              <div class="card" style="margin-bottom: 30px; margin-top: 10px">
                <div class="card-img-wrap">
                  <img loading="lazy"
                    class="card-img"
                    src="/images/guides-touristique3-etnafes-voyage.jpg" 
                    alt="Card image cap"
                  />

                  <div
                    class="top-left badge"
                    style="background-color: rgb(40, 179, 81)"
                  >
                    Guide touristique
                  </div>
                  <h4
                    class="centered"
                    style="
                      margin-bottom: 0px !important;
                      border-top-right-radius: 15px;
                      color: #fff;
                      background-color: rgba(34, 42, 66, 0.8);
                    "
                  >
                    Accompagnez nos voyageurs
                  </h4>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <Footer></Footer>
  </div>
</template>
<style type="text/css">
/* .imaa {
  height: 250px;
} */

.vd-menu__content {
  top: 76px !important;
}
</style>

  <script>
import { IntegerPlusminus } from "vue-integer-plusminus";
import Calendar from "v-calendar/lib/components/calendar.umd";
//import DatePicker from "v-calendar/lib/components/date-picker.umd";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import { VueDatePicker } from "@mathieustan/vue-datepicker";
import "@mathieustan/vue-datepicker/dist/vue-datepicker.min.css";
import { mapState, mapMutations, mapGetters } from "vuex";
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
import axios from "axios";
import TopNavbarHome from "./Layout/TopNavbarHome.vue";
import Footer from "./Layout/Footer.vue";
import { required, minLength, between } from "vuelidate/lib/validators";
import { apiDomain } from "../config";
import Vue from "vue";
import {
  mdbRow,
  mdbCol,
  mdbCard,
  mdbCardImage,
  mdbCardBody,
  mdbCardTitle,
  mdbCardUp,
  mdbBtn,
  mdbView,
  mdbMask,
  mdbIcon,
} from "mdbvue";
export default {
  components: {
    IntegerPlusminus,
    VueDatePicker,
    TopNavbarHome,
    VueperSlides,
    VueperSlide,
    Footer,
    Calendar,
    DatePicker,
    /* ------ */
    mdbRow,
    mdbCol,
    mdbCard,
    mdbCardImage,
    mdbCardBody,
    mdbCardTitle,
    mdbCardUp,
    mdbBtn,
    mdbView,
    mdbMask,
    mdbIcon,
  },
  data() {
    return {
      show: false,
      showdetailleModale: false,
      detaille: {
        id: "",
      },
      index: -1,
      listOfTodos: [{ id: 1 }, { id: 2 }, { id: 3 }],
      verif_voy_pack: false,
      verif_voy_heb: false,
      destination: false,
      /* ----------------- */
      places: [],
      femmes: {},
      center: { lat: 0, lng: 0 },
      currentPlace: null,
      myCoordinates: {
        lat: 0,
        lng: 0,
      },
      agestab: this.$route.query.ages ? this.$route.query.ages : [],
      search: "",
      disabledDates: {
        to: new Date(Date.now() - 8640000),
      },
      scrollPosition: null,
      fixed: false,

      ages: [],
      hebergements_home: {},
      validations: {
        date_deb: {
          required,
        },
        age: {
          between: between(20, 30),
        },
      },
      apiDomain: "https://etnafesapi20212018.etnafes.com",
      seen: false,
      show: false,
      zones: [],
      zonest: [],
      packs: [],
      villescot: [],
      newpacks: [],
      nb_adulte: 1,
      nb_enfant: "0",
      visible: true,
      visible1: false,
      visible2: true,
      visible3: false,
      packsvedette: [],
      packsdep: [],
      hebergement: {
        date_deb: null,
        ville_id: "",
      },
      du: null,
      next: "",
      au: null,
      pack: {
        id: "",
        nom: "",
        date_deb: null,
        au: "",
        type: "",
        ville_id: "",
        description: "",
      },
      villes: [],
      actu: {},
      ville: {
        id: "",
        nom_ville: "",
      },
    };
  },

  created() {
    this.fetch_all_produits();

    this.fetchVilles();
    this.fetchVillesCot();

    this.fetchPacksVedette();
    this.fetchPacksDep();
    this.fetchActu();
    //this.fetch_all_hebrgement_connected();
    if (this.loggedIn == true) {
      this.fetch_all_hebrgement_connected();
    }
    if (this.loggedIn == false) {
      this.fetch_all_hebrgement();
    }

    if (this.loggedIn == true) {
      this.fetchPacks_connected();
    }
    if (this.loggedIn == false) {
      this.fetchPacks();
    }
  },

  computed: {
    loggedIn() {
      return this.$store.getters.get_loggedIn;
    },
    calculMoyennePack() {
      const avisp = this.newpacks;
      var result = [];
      var moyenne = 0;
      for (var i = 0; i < avisp.length; i++) {
        if (avisp[i].avis_pack.length > 0) {
          for (var j = 0; j < avisp[i].avis_pack.length; j++) {
            moyenne += avisp[i].avis_pack[j].nbr_etoile;
          }
        } else {
          moyenne = 0;
        }

        result.push(moyenne);
      }
      return result;
    },

/*     tableauAgencePack() {
      const tabPack = this.newpacks;
      var result = [];
      var moyenne = 0;
      for (var i = 0; i < tabPack.length; i++) {
          for (var j = 0; j < tabPack[i].Agence.length; j++) {
            moyenne += tabPack[i].Agence[j].nom_agence;
          }

        result.push(moyenne);
      }
      return result;
    }, */
    calculMoyenne() {
      const avisp = this.hebergements_home;
      var result = [];
      var moyenne = 0;
      for (var i = 0; i < avisp.length; i++) {
        if (avisp[i].avis_hebergement.length > 0) {
          for (var j = 0; j < avisp[i].avis_hebergement.length; j++) {
            moyenne += avisp[i].avis_hebergement[j].nbr_etoile;
          }
        } else {
          moyenne = 0;
        }

        result.push(moyenne);
      }
      return result;
    },
    get_lien() {
      return this.actu[0].lien + "/" + this.actu[0].id_act;
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
  },

  mounted() {
    window.addEventListener("scroll", this.updateScroll);
  },
  methods: {
    fetch_all_produits() {
      fetch(`${apiDomain}/api/get_all_produits`)
        .then((res) => res.json())
        .then((res) => {
          this.femmes = res;
        })
        .catch((err) => console.log(err));
    },
    submit() {
      let formData = new FormData();

      formData.append("client_id", this.$store.state.user.id);
      formData.append("pack_id", this.detaille.id);

      axios
        .post(
          `${apiDomain}/api/favoritePack2`,

          formData,
          {
            body: JSON.stringify(this.annonce),
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )

        .then((res) => {
          this.show = false;
          //this.$noty.success("ajouter avec Succès ! ");
        /*   this.fetchPacks(); */
           this.fetchPacks_connected();
        })

        .catch((error) => {
          console.log(error.response.data);
        });
    },
    submit_heb() {
      let formData = new FormData();

      formData.append("client_id", this.$store.state.user.id);
      formData.append("hebergement_id", this.detaille.id);

      axios
        .post(
          `${apiDomain}/api/favoriteHebergement`,

          formData,
          {
            body: JSON.stringify(this.annonce),
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )

        .then((res) => {
          this.show = false;
          //this.$noty.success("ajouter avec Succès ! ");
          this.fetch_all_hebrgement();
        })

        .catch((error) => {
          console.log(error.response.data);
        });
    },
    showEditModal_heb(pack, index) {
      let obj = {
        id: pack.id,
      };
      this.detaille = obj;
      this.showdetailleModale = true;
      this.index = index;
    },
    showEditModal(pack, index) {
      let obj = {
        id: pack.id,
      };
      this.detaille = obj;
      this.showdetailleModale = true;
      this.index = index;
    },
    fetch_all_hebrgement_connected() {
      fetch(
        `${apiDomain}/api/all-hebergements-connected` +
          "?token=" +
          this.$store.state.token
      )
        .then((res) => res.json())
        .then((res) => {
          this.hebergements_home = res.hebergements;
        })
        .catch((err) => console.log(err));
    },

    fetch_all_hebrgement() {
      fetch(`${apiDomain}/api/all-hebergements`)
        .then((res) => res.json())
        .then((res) => {
          this.hebergements_home = res.hebergements;
        })
        .catch((err) => console.log(err));
    },
    verif_nb_voy_pack() {
      this.verif_voy_pack = true;
    },

    verif_nb_voy_heb() {
      this.verif_voy_heb = true;
    },

    disabledBeforeToday(date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return date < today;
    },
    fetchActu() {
      fetch(`${apiDomain}/api/get_actualite/1`)
        .then((res) => res.json())
        .then((res) => {
          this.actu = res;
        })
        .catch((err) => console.log(err));
    },
    redirectProxim() {
      window.location.href = `/position_resultats`;
    },

    getCurrentLocation() {
      if (localStorage.center) {
        this.myCoordinates = JSON.parse(localStorage.center);
      } else {
        this.$getLocation({})
          .then((coordinates) => {
            this.myCoordinates = coordinates;
          })
          .catch((error) => alert(error));
      }
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    redirect() {
      window.location.href = `/resultatsHome?search=${this.search}`;
    },

    trigger() {
      this.$refs.research.click();
    },
    removeAge: function (index) {
      Vue.delete(this.agestab, index);
      this.nb_enfant = this.nb_enfant - 1;
    },
    updateScroll() {
      this.scrollPosition = window.scrollY;
    },
    addNewAge: function () {
      this.ages.push(Vue.util.extend({}, this.age));
    },
    updateNbEnfant(e) {
      this.seen = true;
      this.$store.commit("updateNbEnfant", e.target.value);
    },

    updateNbAdulte(e) {
      this.$store.commit("updateNbAdulte", e.target.value);
    },
    fetchVilles() {
      axios
        .get(`${apiDomain}/api/allvillesTun`)
        .then(({ data }) => (this.villes = data.villes));
    },

    fetchVillesCot() {
      axios
        .get(`${apiDomain}/api/villes/cot`)
        .then(({ data }) => (this.villescot = data));
    },

    fetchPacks_connected() {
      axios
        .get(
          `${apiDomain}/api/allpacks/search` +
            "?token=" +
            this.$store.state.token
        )
        .then((response) => (this.newpacks = response.data))
        .catch((error) => console.log(error));
    },

    fetchPacks() {
      axios
        .get(`${apiDomain}/api/allpacks/search_note_connected`)
        .then((response) => (this.newpacks = response.data))
        .catch((error) => console.log(error));
    },

    fetchPacksVedette() {
      axios
        .get(`${apiDomain}/api/packs/reservation`)
        .then(({ data }) => (this.packsvedette = data.packs));
    },

    fetchPacksDep() {
      axios
        .get(`${apiDomain}/api/departs/packs`)
        .then(({ data }) => (this.packsdep = data.packsdep));
    },
  },
};
</script>

<style>
.bg-white {
  --tw-bg-opacity: 1;
  background-color: rgba(255, 255, 255, var(--tw-bg-opacity));
}
.p-4 {
  padding: 1rem;
}
.border-indigo-500 {
  --tw-border-opacity: 1 !important;
  border-color: rgba(99, 102, 241, var(--tw-border-opacity)) !important;
}

.border-dashed {
  border-style: dashed;
}
.border-2 {
  border-width: 3px;
}
.rounded {
  border-radius: 0.25rem;
}
</style>

<style>
.image-clignote {
  animation-duration: 1.4s;
  animation-name: clignoter;
  animation-iteration-count: infinite;
  transition: none;
}
@keyframes clignoter {
  0% {
    opacity: 1;
  }
  40% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.social-fb-btn-enter-active {
  transition: all 0.7s ease;
}
.social-fb-btn-leave-active {
  transition: all 0.3s ease;
}
.social-fb-btn-enter,
.social-fb-btn-leave-to {
  transform: translateX(100px);
  opacity: 0;
}

.social-tw-btn-enter-active {
  transition: all 0.5s ease;
}
.social-tw-btn-leave-active {
  transition: all 0.3s ease;
}
.social-tw-btn-enter,
.social-tw-btn-leave-to {
  transform: translateX(70px);
  opacity: 0;
}

.social-gplus-btn-enter-active {
  transition: all 0.3s ease;
}
.social-gplus-btn-leave-active {
  transition: all 0.3s ease;
}
.social-gplus-btn-enter,
.social-gplus-btn-leave-to {
  transform: translateX(40px);
  opacity: 0;
}

#nav-item {
  /* border-radius: 8px 8px 0 0 !important; */

  margin-top: -1px !important;
}

#nav-tabs {
  /* border-radius: 8px 8px 0 0 !important; */
  background-color: #f5f6fa !important;
  margin-top: -1px !important;
}

.titre_tab {
  font-size: 16px !important;
  line-height: 20px !important;
  font-weight: 400 !important;
  padding: 10px 16px !important;
}
.tabs {
  background: transparent !important;
  display: flex;
  flex-direction: column;
  border-radius: 0.23rem;
  height: 75% !important;
  width: 100%;
  margin-top: -10px !important;
}

/*  */
.btn_packs {
  background: #fff;

  color: #000;

  border-radius: 24px;
  width: 5cm;
}

.btn_packs:hover .btn:hover {
  background: #fff;

  color: #000;

  border-radius: 24px;
  width: 5cm;
}

.pack {
  /* background: #fff; */
  color: #fff;

  width: 5cm;
  height: 40px;
  border-style: none !important;
}
.heb {
  /*  background: #fff; */
  color: #fff;

  width: 5cm;
  height: 40px;
  margin-left: 19px;
  border-style: none !important;
}
button.heb:focus {
  outline: none;
}
button.pack:focus {
  outline: none;
}

.hr_active {
  height: 3px;
  width: 100%;
  text-align: left;
  margin-left: 0px;
  color: rgb(255, 255, 255) !important;
  size: 3px;
  margin-top: 9px;
  border-top: 3px solid rgb(255, 255, 255);
}

.pack_active {
  color: #fff;
  /* border-radius: 24px; */
  width: 5cm;
  height: 40px;
  border-style: none !important;
}
.heb_active {
  color: #fff;
  /* border-radius: 24px; */
  width: 5cm;
  height: 40px;
  margin-left: 19px;
  border-style: none !important;
  /* ------------- */
}

button.heb_active:focus {
  outline: none;
}
button.pack_active:focus {
  outline: none;
}
.vs--searchable .vs__dropdown-toggle {
  cursor: text;
  width: 146px !important;
  margin-top: -11px !important;
  border: none !important;
  margin-left: 23px !important;
}

.vd-wrapper:not(.vd-wrapper--inline) {
  cursor: pointer;
  margin-top: -1px !important;
  margin-left: 13px !important;
  width: 182px !important;
  max-width: 161% !important;
}
/* MOBILE */
.pack_mobile {
  background: #fff;
  color: #000;
  border-radius: 24px;
  width: 4cm;
  height: 40px;
}
.heb_mobile {
  background: #fff;
  color: #000;
  border-radius: 24px;
  width: 4cm;
  height: 40px;
  margin-left: 19px;
}

.pack_active_mobile {
  background: #222a42;
  color: #fff;
  border-radius: 24px;
  width: 4cm;
  height: 40px;
}
.heb_active_mobile {
  background: #222a42;
  color: #fff;
  border-radius: 24px;
  width: 4cm;
  height: 40px;
  margin-left: 19px;
  /* ------------- */
}
</style>

<style>
/* lined tabs */

.lined.nav-link {
  border: none;
  border-bottom: 3px solid transparent;
}

.lined .nav-link:hover {
  border: none;
  border-bottom: 3px solid transparent;
}

.lined .nav-link.active {
  background: none;
  color: #555;
  border-color: #2b90d9;
}

/* -------12/02/2022------- */
.card_pack {
  border: 1px solid rgb(221, 221, 221) !important;
  border-radius: 32px !important;
  color: rgb(34, 34, 34) !important;
  display: flex !important;
  height: 66px !important;
  position: relative !important;
  width: 100% !important;
  outline: none !important;
  box-shadow: rgb(0 0 0 / 15%) 0px 16px 32px, rgb(0 0 0 / 10%) 0px 3px 8px !important;
  --big-search-form-background: #f7f7f7 !important;
  background-color: rgb(247, 247, 247) !important;
  /*  margin-left: 41px !important; */
}

.card_heb {
  border: 1px solid rgb(221, 221, 221) !important;
  border-radius: 32px !important;
  color: rgb(34, 34, 34) !important;
  display: flex !important;
  height: 66px !important;
  position: relative !important;
  width: 100% !important;
  outline: none !important;
  box-shadow: rgb(0 0 0 / 15%) 0px 16px 32px, rgb(0 0 0 / 10%) 0px 3px 8px !important;
  --big-search-form-background: #f7f7f7 !important;
  background-color: rgb(247, 247, 247) !important;
  /*   margin-left: 1px !important; */
}
.label_pack {
  font-size: 12px !important;
  line-height: 27px !important;
  font-weight: 800 !important;
  letter-spacing: 0.04em !important;
  margin-left: 33px;
  margin-top: 6px;
  padding-bottom: 2px !important;
}
.label_arrivee {
  font-size: 12px !important;
  line-height: 27px !important;
  font-weight: 800 !important;
  letter-spacing: 0.04em !important;
  margin-left: 33px;
  margin-top: 6px;
  padding-bottom: 2px !important;
  list-style: none !important;
}

.st_destination {
  display: -webkit-box !important;
  display: -moz-box !important;
  display: -ms-flexbox !important;
  display: -webkit-flex !important;
  display: flex !important;
  -webkit-flex: 1 1 0% !important;
  -ms-flex: 1 1 0% !important;
  flex: 1 1 0% !important;
  height: 100% !important;
  min-width: 0px !important;
  pointer-events: auto !important;
}

.st_Arrivee {
  display: -webkit-box !important;
  display: -moz-box !important;
  display: -ms-flexbox !important;
  display: -webkit-flex !important;
  display: flex !important;
  -webkit-flex: 1 1 0% !important;
  -ms-flex: 1 1 0% !important;
  flex: 1 1 0% !important;
  height: 100% !important;
  min-width: 0px !important;
  pointer-events: auto !important;
  left: 5px !important;
}

.st_voyageurs {
  display: -webkit-box !important;
  display: -moz-box !important;
  display: -ms-flexbox !important;
  display: -webkit-flex !important;
  display: flex !important;
  -webkit-flex: 1 1 0% !important;
  -ms-flex: 1 1 0% !important;
  flex: 1 1 0% !important;
  height: 100% !important;
  min-width: 0px !important;
  pointer-events: auto !important;
  left: 40px !important;
}

/* ------date picker----- */
.mx-input {
  display: inline-block;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  height: 34px;
  padding: 6px 30px;
  padding-left: 10px;
  font-size: 14px;
  line-height: 1.4;
  color: #555;
  border: #f7f7f7 !important;
  background: none !important;
  -webkit-box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%);
  box-shadow: inset 0 1px 1px rgb(255 242 242 / 8%);
  /* background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%);
  box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%);
  
  */
}
/* ----14/02/2022------ */
.vue-numeric-input .numeric-input {
  height: inherit;
  padding: 2px 2rem !important;

  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-size: inherit;
  border: 1px solid #fff !important;
  border-radius: 32px;
  display: block;
  line-height: 1.8rem;
  -webkit-transition: all 0.1s ease 0s;
  transition: all 0.1s ease 0s;
  width: 100%;
  -moz-appearance: textfield !important;
}

.vue-numeric-input .btn-increment .btn-icon {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #fff;
  border: none !important;
  /* background: none !important; */
}

.vue-numeric-input .btn-decrement .btn-icon {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #fff;
  border: none !important;
  /* background: none !important; */
}
/* 15/02/2022 */
.pack_m {
  /* background: rgb(249 247 247); */
  background: rgb(241 241 241);
  color: #000;
  border-radius: 24px;
  width: 5cm;
  height: 40px;
}
.heb_m {
  background: rgb(241 241 241);
  color: #000;
  border-radius: 24px;
  width: 5cm;
  height: 40px;
  margin-left: 19px;
}

.pack_active_m {
  background: #222a42;
  color: #fff;
  border-radius: 24px;
  width: 5cm;
  height: 40px;
}
.heb_active_m {
  background: #222a42;
  color: #fff;
  border-radius: 24px;
  width: 5cm;
  height: 40px;
  margin-left: 19px;
  /* ------------- */
}

/* responsive */
.pack_resp {
  /* background: #fff; */
  color: #fff;
  width: 5cm;
  height: 40px;
  margin-left: 19px;
  border-style: none !important;
}
.heb_resp {
  /* background: #fff; */
  color: #fff;
  width: 5cm;
  height: 40px;
  margin-left: 19px;
  border-style: none !important;
}

.pack_active_resp {
  color: #fff;
  /* border-radius: 24px; */
  width: 1cm;
  height: 40px;
  border-style: none !important;
}
.heb_active_resp {
  color: #fff;
  /* border-radius: 24px; */
  width: 1cm;
  height: 40px;
  border-style: none !important;
}
.prox_resp {
  color: #fff;
  /*  width: 5cm; */
  height: 40px;
  margin-left: 2px;
  border-style: none !important;
}

.card_pack_resp {
  border: 1px solid rgb(221, 221, 221) !important;
  /* border-radius: 32px !important; */
  color: rgb(34, 34, 34) !important;
  display: -webkit-box !important;
  display: -ms-flexbox !important;
  display: flex !important;
  height: 116px !important;
  position: relative !important;
  width: 107% !important;
  outline: none !important;
  -webkit-box-shadow: rgb(0 0 0 / 15%) 0px 16px 32px,
    rgb(0 0 0 / 10%) 0px 3px 8px !important;
  box-shadow: rgb(0 0 0 / 15%) 0px 16px 32px, rgb(0 0 0 / 10%) 0px 3px 8px !important;
  --big-search-form-background: #f7f7f7 !important;
  background-color: rgb(247, 247, 247) !important;
  margin-left: -11px !important;
}

.label_pack_resp {
  font-size: 12px !important;
  line-height: 37px !important;
  font-weight: 800 !important;
  letter-spacing: 0.04em !important;
  margin-left: 4px;
  margin-top: 2px;
  padding-bottom: 2px !important;
}

.label_arrivee_resp {
  font-size: 12px !important;
  line-height: 27px !important;
  font-weight: 800 !important;
  letter-spacing: 0.04em !important;
  margin-left: 18px;
  margin-top: 5px;
  padding-bottom: 2px !important;
  list-style: none !important;
}

.label_voyageur_resp {
  font-size: 12px !important;
  line-height: 27px !important;
  font-weight: 800 !important;
  letter-spacing: 0.04em !important;
  margin-left: -13px !important;
  margin-top: 6px;
  padding-bottom: 2px !important;
  list-style: none !important;
}
/* hebregrement resp */
.card_heb_resp {
  border: 1px solid rgb(221, 221, 221) !important;
  /* border-radius: 32px !important; */
  color: rgb(34, 34, 34) !important;
  display: -webkit-box !important;
  display: -ms-flexbox !important;
  display: flex !important;
  height: 134px !important;
  position: relative !important;
  width: 107% !important;
  outline: none !important;
  -webkit-box-shadow: rgb(0 0 0 / 15%) 0px 16px 32px,
    rgb(0 0 0 / 10%) 0px 3px 8px !important;
  box-shadow: rgb(0 0 0 / 15%) 0px 16px 32px, rgb(0 0 0 / 10%) 0px 3px 8px !important;
  --big-search-form-background: #f7f7f7 !important;
  background-color: rgb(247, 247, 247) !important;
  margin-left: -11px !important;
}
.label_depart_resp {
  font-size: 12px !important;
  line-height: 27px !important;
  font-weight: 800 !important;
  letter-spacing: 0.04em !important;
  margin-left: 18px;
  margin-top: -4px;
  padding-bottom: 2px !important;
  list-style: none !important;
}

.container-fluid_moez {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  margin-top: -18px !important;
}

.hr_active_resp {
  height: 3px;
  width: 100%;
  text-align: left;
  margin-left: 29px;
  color: rgb(255, 255, 255) !important;
  size: 3px;
  margin-top: 9px;
  border-top: 3px solid rgb(255, 255, 255);
}

/* ----vs__dropdawn-menu */
.text_h1_home {
  font-weight: 500;
  font-size: 25px;
  color: #fff;
  margin-left: -20px;
}

.text_h2_home {
  font-weight: 500;
  font-size: 25px;
  color: #fff;
  margin-top: 20px;
  margin-left: -20px;
}
.text_h1_home_resp {
  font-weight: 500;
  font-size: 19px;
  line-height: 36px;
  color: #fff;
  margin-left: 21px;
}
.text_h2_home_resp {
  font-weight: 500;
  margin-left: 21px;
  font-size: 19px;
  color: #fff;
  line-height: 36px;
  margin-top: -4px;
}

/* .card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2) !important;
  transition: 0.3s !important;

} */

.bottom-right_resp {
  position: absolute;
  bottom: 90px;
  right: 16px;
  letter-spacing: 1.5px;
  font-size: 11px;
  color: #fff;
  padding: 7px;
}

.flex-container {
  display: flex;
  flex-wrap: nowrap;
}

.flex-container > div {
  width: 100px;
  margin: 10px;
  text-align: center;
  line-height: 75px;
  font-size: 30px;
}

.page {
  display: flex;
  flex-wrap: wrap;
}

.page > * {
  padding: 1rem;
}

.sidebar11 {
  background: var(--color-primary-x-light);
  outline: 1px solid var(--color-primary);
  flex-grow: 1;
  flex-basis: 12rem;
}

.content11 {
  flex-basis: 0;
  flex-grow: 2;
  min-width: 70%;
}

.page {
  background: white;
  border: 1px solid var(--color-stroke);
}

/* 25/04/2022 */
</style>