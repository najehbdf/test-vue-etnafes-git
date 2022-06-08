<template>
  <div class="content">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb" style="background-color: #a6bfe6 !important">
        <li class="breadcrumb-item">
          <!-- <a href="/nouveaupack/agence">Prestataire de Services</a> -->
          <router-link :to="{ name: 'nouveau_pack_agence_active' }"
            >Prestataire de Services</router-link
          >
        </li>
        <li
          class="breadcrumb-item active"
          style="color: #000"
          aria-current="page"
        >
          Edit Pack
        </li>
      </ol>
    </nav>

    <div v-if="loaded==false">
    <center>
    <div class="spinner-grow text-dark" role="status" style="width: 15px; 
    height: 15px;">
  <span class="sr-only">Loading...</span>
  
</div>&nbsp;
<div class="spinner-grow text-dark" role="status" style="width: 15px; 
    height: 15px;">
  <span class="sr-only">Loading...</span>
  
</div>&nbsp;
<div class="spinner-grow text-dark" role="status" style="width: 15px; 
    height: 15px;">
  <span class="sr-only">Loading...</span>
  
</div>&nbsp;
<div class="spinner-grow text-dark" role="status" style="width: 15px; 
    height: 15px;">
  <span class="sr-only">Loading...</span>
  
</div>
</center>
  </div>
    <!--  <div
      v-show="pack.reservation && pack.reservation.length==0 && pack.adagence_id==propagence[0].id"
    >-->
    <div
      v-show="
        pack.reservation &&
        pack.reservation.length == 0 &&
        pack.adagence_id == propagence[0].id && loaded==true
      "
    >
      <div>
        <b-modal
          id="modal-edit-programme"
          :title="pack.titre"
          :programme="'programme'"
          size="lg"
        >
          <form
            v-on:submit.prevent="updateProgramme(programme.id, programme)"
            style="margin-top: 15px"
          >
            <div
              style="
                border-style: dashed;
                border-width: 1px;
                margin-bottom: 20px;
                padding: 20px;
                border-radius: 0.2857rem;
              "
            >
              <div class="row">
                <div class="col-md-12 text-left">
                  <input
                    aria-label="label"
                    type="text"
                    v-model="programme.titre"
                  />
                  <div class="form-group col-md-12">
                    <textarea
                      v-model="programme.description"
                      type="text"
                      class="form-control"
                      placeholder="Description"
                    ></textarea>
                    <br />
                  </div>
                </div>
                <br />
              </div>

              <button
                class="btn btn-success"
                type="submit"
                fill
                style="margin-top: 15px; border-radius: 18px 0px 18px 0px"
              >
                Modifier le programme
              </button>
            </div>
          </form>
          <br />
        </b-modal>
        <b-modal id="modal-edit-pack" title="Modifier le pack" :pack="'pack'">
          <card>
            <form v-on:submit.prevent="updatePack(pack.id, pack)" class="mb-3">
              <div class="row">
                <div class="col-md-4 pr-md-1 text-left">
                  <base-input
                    label="Titre"
                    placeholder="Titre"
                    v-model="pack.titre"
                  ></base-input>
                </div>
                <div class="col-md-4 px-md-1 text-left">
                  <!-- <base-input
                    type="date"
                    label="Date début"
                    placeholder="Date début"
                    v-model="pack.date_deb"
                  ></base-input>-->

                  <label>Date début</label>
                  <b-form-datepicker
                    autofocus
                    format="dd-mm-yyyy"
                    placeholder="Ajouter une date"
                    :min="new Date()"
                    @input="test"
                    locale="en"
                    v-model="pack.date_deb"
                  ></b-form-datepicker>
                  <!-- <VueDatePicker :minDate="new Date()" v-model="pack.date_deb" required="true" /> -->
                  <!-- <p v-show="validationErrors.date_deb" style="padding-bottom:5px;color:red">
                    <span class="alert-link">** {{ validationErrors.date_deb[0] }}</span>
                  </p>-->
                </div>

                <div class="col-md-4 pl-md-1 text-left">
                  <!-- <base-input
                    type="date"
                    label="Date fin"
                    placeholder="Date fin"
                    v-model="pack.date_fin"
                  ></base-input>-->
                  <label>Date fin</label>
                  <b-form-datepicker
                    v-if="seendep == false"
                    disabled
                    placeholder="Ajouter une date"
                    :min="new Date(next)"
                    locale="en"
                    v-model="pack.date_fin"
                  ></b-form-datepicker>

                  <b-form-datepicker
                    v-if="seendep == true"
                    placeholder="Ajouter une date"
                    :min="new Date(next)"
                    locale="en"
                    v-model="pack.date_fin"
                  ></b-form-datepicker>
                </div>
              </div>

              <div class="row">
                <div class="col-md-4 pr-md-1 text-left">
                  <base-input
                    placeholder="URL vidéo"
                    label="URL vidéo"
                    v-model="pack.url_video"
                    type="text"
                  ></base-input>
                </div>

                <div class="col-md-2 pl-md-1 text-left">
                  <label>Niveau d'activité</label>
                  <select
                    class="form-control"
                    v-model="pack.adrenaline"
                    name="adrenaline"
                  >
                    <option value="Faible">Faible</option>
                    <option value="Moyen">Moyen</option>
                    <option value="Extrême">Extrême</option>
                  </select>
                </div>
                <div class="col-md-3 pl-md-1 text-left">
                  <label>Type d'activité</label>
                  <select
                    class="form-control"
                    v-model="pack.activite_id_principal"
                    name="activite_id_principal"
                  >
                    <option
                      v-for="(activité, index2) in activités"
                      v-bind:key="index2"
                      v-bind:value="activité.idact"
                    >
                      {{ activité.nom_activite }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="row">
                <div class="col-md-3 pr-md-1 text-left">
                  <label>Nombre des places (max)</label>
                  <input
                    aria-label="label"
                    oninput="this.value = Math.round(this.value);"
                    style="width: 100% !important"
                    type="number"
                    label="Nombre des places (max)"
                    v-model="pack.nb_place_max"
                    placeholder="nombre max des places"
                    disabled
                  />
                </div>
                <div class="col-md-3 px-md-1 text-left">
                  <label>Places (disponibles)</label>
                  <input
                    aria-label="label"
                    oninput="this.value = Math.round(this.value);"
                    type="number"
                    style="width: 100% !important"
                    label="Nombre des places (disponibles)"
                    v-model="pack.nb_place_dispo"
                    placeholder="nombre des places disponibles"
                    disabled
                  />
                </div>
                <div class="col-md-3 pl-md-1 text-left">
                  <label>Prix fixe</label>
                  <input
                    aria-label="label"
                    oninput="this.value = Math.round(this.value);"
                    style="width: 100% !important"
                    type="number"
                    label="Prix fixe"
                    placeholder="prix fixe"
                    name="prix_fix"
                    v-model="pack.prix_fix"
                    disabled
                  />
                </div>
                <div class="col-md-3 pl-md-1 text-left">
                  <label>Prix pour enfant 4 ans</label>
                  <input
                    aria-label="label"
                    oninput="this.value = Math.round(this.value);"
                    style="width: 100% !important"
                    type="number"
                    label="Prix pour enfant moins que 4 ans"
                    v-model="pack.prix_enfant4"
                    placeholder="prix_enfant4"
                    disabled
                  />
                </div>
              </div>

              <div class="row">
                <div class="col-md-3 pr-md-1 text-left">
                  <label>Prix pour enfant > 4 ans</label>
                  <input
                    aria-label="label"
                    oninput="this.value = Math.round(this.value);"
                    style="width: 100% !important"
                    type="number"
                    label="Prix pour enfant plus que 4 ans"
                    placeholder="Prix pour enfant plus que 4 ans"
                    name="prix_enfant15"
                    v-model="pack.prix_enfant15"
                    disabled
                  />
                </div>

                <div class="col-md-3 px-md-1 text-left">
                  <label>Remise</label>
                  <input
                    aria-label="label"
                    oninput="this.value = Math.round(this.value);"
                    type="number"
                    style="width: 100% !important"
                    label="Remise"
                    v-model="pack.remise"
                    placeholder="remise"
                    name="remise"
                    disabled
                  />
                </div>

                <div class="col-md-3 pl-md-1 text-left">
                  <label>Nombre des places (remise)</label>
                  <input
                    aria-label="label"
                    oninput="this.value = Math.round(this.value);"
                    type="number"
                    style="width: 100% !important"
                    label="Nombre des places (remise)"
                    v-model="pack.nb_place_remise"
                    placeholder="nombre des places de remise"
                    disabled
                  />
                </div>

                <div class="col-md-3 pl-md-1 text-left">
                  <label>Taux de remise</label>
                  <input
                    aria-label="label"
                    type="number"
                    style="width: 100% !important"
                    label="Taux de remise"
                    placeholder="taux de remise"
                    name="taux_remise"
                    v-model="pack.taux_remise"
                    disabled
                  />
                </div>
              </div>
              <div class="form-group">
                <label style="line-height: 35px">Description</label>
                <textarea
                  rows="5"
                  required
                  v-model="pack.description"
                  class="form-control resize_vertical"
                  id="description"
                ></textarea>
              </div>

              <button
                class="btn btn-success"
                type="submit"
                fill
                style="margin-left: 10px"
              >
                Modifier
              </button>
            </form>
          </card>
        </b-modal>
      </div>

      <h4>
        <span style="color: #333">Pack&nbsp;</span>
        <!-- <i class="fas fa-trash" style="color:#de524d" v-on:click="deletePack(pack.id)"></i> -->
        <i
          class="tim-icons icon-simple-remove"
          style="color: #de524d"
          v-on:click="deletePack(pack.id)"
        ></i>

        &nbsp;
        <!-- <i
          style="color: #62b062"
          class="tim-icons icon-pencil"
          title="Modifier le pack"
          v-b-modal.modal-edit-pack
          @click="fetchPack(pack.id)"
        ></i> -->
      </h4>
      <card style="border: solid 1px; padding: 15px">
        <form v-on:submit.prevent="updatePack(pack.id, pack)" class="mb-3">
          <div class="row">
            <div class="col-md-3 pr-md-1 text-left">
              <base-input
                label="Titre"
                placeholder="Titre"
                v-model="pack.titre"
              ></base-input>
              <p
                v-if="validationErrors.titre"
                style="padding-bottom: 5px; color: red"
              >
                <span class="alert-link"
                  >** {{ validationErrors.titre[0] }}</span
                >
              </p>
            </div>

            <div class="col-md-1 pl-md-1 text-left">
              <label>Durée</label>
              <base-input placeholder="24 H" v-model="pack.time"></base-input>
              <p
                v-if="validationErrors.time"
                style="padding-bottom: 5px; color: red"
              >
                <span class="alert-link"
                  >** {{ validationErrors.time[0] }}</span
                >
              </p>
            </div>

            <div class="col-md-1 pl-md-1 text-left">
              <label>NB jours</label>
              <!-- <base-input type="number" min="1" style="width:100% !important"  placeholder="NB jours" v-model="pack.nb_jours"></base-input> -->
              <input
                min="1"
                v-on:change="addNewProgramme"
                aria-label="label"
                oninput="this.value = Math.round(this.value);"
                style="width: 100% !important"
                type="number"
                placeholder="NB jours"
                v-model="pack.nb_jours"
              />
              <p
                v-if="validationErrors.nb_jours"
                style="padding-bottom: 5px; color: red"
              >
                <span class="alert-link"
                  >** {{ validationErrors.nb_jours[0] }}</span
                >
              </p>
            </div>
            <div class="col-md-3 px-md-1 text-left">
              <label>Date début </label>
              <VueDatePicker
                :minDate="new Date()"
                v-model="pack.date_deb"
                required="true"
              />

              <p
                v-if="validationErrors.date_deb"
                style="padding-bottom: 5px; color: red"
              >
                <span class="alert-link"
                  >** {{ validationErrors.date_deb[0] }}</span
                >
              </p>
            </div>
            <div class="col-md-4">
              <label>Ville de Départ </label>
              <gmap-autocomplete
                name="adresse"
                @place_changed="setPlace"
               
                :placeholder="pack.adresse"
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
            <div class="col-md-4 pr-md-1 text-left">
              <base-input
                placeholder="URL vidéo"
                label="URL vidéo"
                v-model="pack.url_video"
                type="text"
              ></base-input>
            </div>

            <div class="col-md-2 pl-md-1 text-left">
              <label>Niveau d'activité</label>
              <select
                class="form-control"
                v-model="pack.adrenaline"
                name="adrenaline"
              >
                <option value="Faible">Faible</option>
                <option value="Moyen">Moyen</option>
                <option value="Extrême">Extrême</option>
              </select>
            </div>
            <div class="col-md-3 pl-md-1 text-left">
              <label>Type d'activité</label>
              <select
                class="form-control"
                v-model="pack.activite_id_principal"
                name="activite_id_principal"
              >
                <option
                  v-for="(activité, ind) in activités"
                  v-bind:key="ind"
                  v-bind:value="activité.idact"
                >
                  {{ activité.nom_activite }}
                </option>
              </select>
            </div>
          </div>

          <div class="row">
            <div class="col-md-3 pr-md-1 text-left">
              <label>Nombre des places (max)</label>
              <input
                aria-label="label"
                oninput="this.value = Math.round(this.value);"
                style="width: 100% !important"
                type="number"
                label="Nombre des places (max)"
                v-model="pack.nb_place_max"
                placeholder="nombre max des places"
              />
            </div>
            <div class="col-md-3 px-md-1 text-left">
              <label>Nombre des places (disponibles)</label>
              <input
                aria-label="label"
                oninput="this.value = Math.round(this.value);"
                type="number"
                style="width: 100% !important"
                label="Nombre des places (disponibles)"
                v-model="pack.nb_place_dispo"
                placeholder="nombre des places disponibles"
              />
            </div>
            <div class="col-md-3 pl-md-1 text-left">
              <label>Prix fixe</label>
              <input
                aria-label="label"
                oninput="this.value = Math.round(this.value);"
                style="width: 100% !important"
                type="number"
                label="Prix fixe"
                placeholder="prix fixe"
                name="prix_fix"
                v-model="pack.prix_fix"
              />
            </div>
            <div class="col-md-3 pl-md-1 text-left">
              <label>Prix pour enfant moins de 4 ans</label>
              <input
                aria-label="label"
                oninput="this.value = Math.round(this.value);"
                style="width: 100% !important"
                type="number"
                label="Prix pour enfant moins que 4 ans"
                v-model="pack.prix_enfant4"
                placeholder="prix_enfant4"
              />
            </div>
          </div>

          <div class="row">
            <div class="col-md-3 pr-md-1 text-left">
              <label>Prix pour enfant > 4 ans</label>
              <input
                aria-label="label"
                oninput="this.value = Math.round(this.value);"
                style="width: 100% !important"
                type="number"
                label="Prix pour enfant plus que 4 ans"
                placeholder="Prix pour enfant plus que 4 ans"
                name="prix_enfant15"
                v-model="pack.prix_enfant15"
              />
            </div>

            <div class="col-md-3 px-md-1 text-left">
              <label>Remise</label>
              <input
                aria-label="label"
                oninput="this.value = Math.round(this.value);"
                type="number"
                style="width: 100% !important"
                label="Remise"
                v-model="pack.remise"
                placeholder="remise"
                name="remise"
              />
            </div>

            <div class="col-md-3 pl-md-1 text-left">
              <label>Nombre des places (remise)</label>
              <input
                aria-label="label"
                oninput="this.value = Math.round(this.value);"
                type="number"
                style="width: 100% !important"
                label="Nombre des places (remise)"
                v-model="pack.nb_place_remise"
                placeholder="nombre des places de remise"
              />
            </div>

            <div class="col-md-3 pl-md-1 text-left">
              <label>Taux de remise</label>
              <input
                aria-label="label"
                type="number"
                style="width: 100% !important"
                label="Taux de remise"
                placeholder="taux de remise"
                name="taux_remise"
                v-model="pack.taux_remise"
              />
            </div>
          </div>

          <div class="form-group">
            <label style="line-height: 35px">Description</label>

            <textarea
              rows="5"
              required
              v-model="pack.description"
              class="form-control resize_vertical"
              id="description"
            ></textarea>
          </div>
          <button
            class="btn btn-success"
            type="submit"
            fill
            style="margin-left: 10px"
          >
            Modifier
          </button>
        </form>
      </card>
      <br />
      <card style="border: solid 1px; padding: 15px">
        <div class="row" style="padding: 10px">
          <div class="col-md-10">
            <h4>
              <span style="color: #333"
                >Les zones touristiques et les hébergements&nbsp;</span
              >
              <i
                class="tim-icons icon-pencil"
                style="color: #62b062"
                title="Modifier les zones du pack"
                v-b-modal.modal-edit-zonepack
                @click="fetchPack(pack.id)"
              ></i>
            </h4>
            <div v-for="(zone, index1) in zone_pack" v-bind:key="index1">
              {{ zone.zone_touristique.nom }}
            </div>
            <div v-for="(heb, index) in hebergement_pack" v-bind:key="index">
              {{ heb.hebergement.nom }}
            </div>
          </div>
        </div>
      </card>

      <br />
      <card style="border: solid 1px; padding: 15px">
        <div class="row" style="padding: 10px">
          <div class="col-md-10">
            <h4>
              <span style="color: #333">Le programme</span>
            </h4>
            <div
              v-for="(programme, indexp) in pack.programmes"
              v-bind:key="indexp"
            >
              <p>
                <b>{{ programme.titre }}</b> &nbsp;
                <i
                  style="color: #62b062"
                  class="tim-icons icon-pencil"
                  title="Modifier les zones du pack"
                  v-b-modal.modal-edit-programme
                  @click="fetchProgramme(programme.id)"
                ></i>
              </p>
              <p>{{ programme.description }}</p>
              <br />
            </div>
          </div>
        </div>
      </card>

      <div>
        <b-modal
          id="modal-edit-zonepack"
          :title="pack.titre"
          :pack="'pack'"
          size="lg"
        >
          <fieldset class="scheduler-border">
            <legend class="scheduler-border">
              Modifier les zones et les hébergements du pack
            </legend>
            <div class="control-group">
              <form v-on:submit.prevent="updateZonePack(pack.id, pack)">
                <div
                  class="row"
                  style="padding-faleft: 10px; padding-right: 10px"
                >
                  <div
                    class="col-md-6 text-left"
                    style="
                      border-style: dashed;
                      border-width: 1px;
                      margin-bottom: 20px;
                      padding: 20px;
                      border-radius: 0.2857rem;
                    "
                    v-for="(villepack, v) in pack.ville_pack"
                    :key="v"
                  >
                    <div class="row">
                      <div class="col-md-11">
                        <select
                          style="margin-bottom: 10px"
                          class="form-control"
                          disabled
                          v-model="villepack.ville.id"
                          name="ville"
                        >
                          <option
                            v-for="(ville, vindex) in villes"
                            v-bind:key="vindex"
                            v-bind:value="ville.id"
                          >
                            {{ ville.nom }}
                          </option>
                        </select>
                      </div>
                      <div class="col-md-1">
                        <i
                          style="margin-left: -50px; margin-top: 13px"
                          class="fa fa-trash text-danger fa-lg"
                          title="Delete ville pack"
                          @click="deleteVillePack(villepack.id)"
                        ></i>
                      </div>
                    </div>
                    <p style="font-weight: bold; font-size: 12px">
                      >> Les zones touristiques:
                    </p>
                    <div class="feed" ref="feed">
                      <div v-for="(zone, index) in zones" :key="zone.id">
                        <label
                          v-show="
                            zone.ville_id == villepack.ville_id &&
                            zone.deleted_at == null
                          "
                          style="
                            font-weight: normal;
                            font-size: 12.5px;
                            color: #636363;
                          "
                        >
                          <input
                            aria-label="label"
                            v-show="zone.ville_id == villepack.ville_id"
                            true-value="true"
                            false-value="false"
                            class="uk-checkbox"
                            type="checkbox"
                            :value="zone.id"
                            v-model="hasZone[index].check"
                            v-on:click="toggleZone(zone)"
                          />
                          {{ zone.nom }} {{ zone.deleted_at }}
                        </label>
                      </div>
                    </div>

                    <p
                      style="
                        font-weight: bold;
                        font-size: 12px;
                        margin-top: 10px;
                      "
                    >
                      >> Les hébergements:
                    </p>
                    <div class="feed" ref="feed">
                      <div
                        v-for="(hebergement, index) in hebergementspack"
                        :key="index"
                      >
                        <label
                          v-show="
                            hebergement.ville_id == villepack.ville_id &&
                            hebergement.deleted_at == null
                          "
                          style="
                            font-weight: normal;
                            font-size: 12.5px;
                            color: #636363;
                          "
                        >
                          <input
                            aria-label="label"
                            v-show="hebergement.ville_id == villepack.ville_id"
                            true-value="true"
                            false-value="false"
                            class="uk-checkbox"
                            type="checkbox"
                            :value="hebergement.id"
                            v-model="hasHebergement[index].check"
                            v-on:click="toggleHebergement(hebergement)"
                          />
                          {{ hebergement.nom }}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  class="btn btn-success"
                  type="submit"
                  fill
                  style="margin-top: 15px; border-radius: 18px 0px 18px 0px"
                >
                  Modifier
                </button>
              </form>
            </div>
          </fieldset>

          <br />
          <fieldset class="scheduler-border">
            <legend class="scheduler-border">
              Ajouter une nouvelle ville à votre circuit
            </legend>
            <div class="control-group">
              <card>
                <div class="row">
                  <div class="col-md-12"></div>

                  <div class="col-md-5">
                    <button
                      type="button"
                      v-on:click="addNewCircuit"
                      style="
                        border-width: 2px;
                        border: none;
                        margin: 4px 1px;
                        border-radius: 0.4285rem;
                        cursor: pointer;
                        background-size: 210% 210%;
                        background-position: top right;
                        transition: all 0.15s ease;
                        color: #ffffff;
                      "
                      class="btn btn-block btn-outline-success"
                    >
                      + Zone touristique
                    </button>
                  </div>
                </div>
                <br />

                <div class="row">
                  <form @submit.prevent="addVillePack">
                    <div class="col-md-12">
                      <div
                        v-for="(zone, index) in villepack"
                        :key="index"
                        style="
                          border-style: dashed;
                          border-width: 1px;
                          margin-bottom: 20px;
                          padding: 5px;
                        "
                      >
                        <div class="row" style="padding: 10px">
                          <div class="col-md-2">
                            <label style="line-height: 17px">
                              <b>&nbsp;</b>
                            </label>
                            <button
                              type="button"
                              v-on:click="removeZone(index)"
                              class="btn btn-block btn-danger btdelete"
                            >
                              <i
                                style="color: #fff !important"
                                class="fa fa-trash text-danger fa-lg"
                              ></i>
                            </button>
                          </div>
                          <div class="form-group col-md-5">
                            <label style="line-height: 17px">
                              <b>Gouvernorat</b>
                            </label>
                            <div class="form-group">
                              <select
                                v-model="zone.ville_id"
                                class="form-control"
                                required
                              >
                                <option value disabled selected>
                                  gouvernorat
                                </option>
                                <option
                                  :name="`villepack[${index}][ville_id]`"
                                  v-for="ville in villes"
                                  v-bind:key="ville.id"
                                  v-bind:value="ville.id"
                                >
                                  {{ ville.nom }}
                                </option>
                              </select>
                            </div>
                          </div>

                          <div class="form-group col-md-5">
                            <label style="line-height: 17px">
                              <b>Ville</b>
                            </label>
                            <select
                              v-model="zone.sville_id"
                              class="form-control"
                              required
                            >
                              <option value disabled selected>ville</option>
                              <option
                                v-show="ville.ville_id == zone.ville_id"
                                v-for="ville in svilles"
                                v-bind:key="ville.id"
                                v-bind:value="ville.id"
                              >
                                {{ ville.nom }}
                              </option>
                            </select>
                          </div>

                          <div class="form-group col-md-5 offset-md-2">
                            <label style="line-height: 17px">
                              <b>Zones touristiques</b>
                            </label>
                            <div
                              v-for="(zpack, k) in villepack[index].zonepack"
                              :key="k"
                            >
                              <div class="col-xs-8">
                                <b-card
                                  no-body
                                  style="
                                    padding: 10px;
                                    border: 1px solid #b3b3b3 !important;
                                    min-height: 2.65rem;
                                  "
                                  class="feed"
                                  ref="feed"
                                >
                                  <div class="row" style="padding-left: 20px">
                                    <div
                                      v-for="z in zonesp"
                                      :key="z.id"
                                      style="opacity: 1; visibility: visible"
                                    >
                                      <div
                                        v-show="z.sville_id == zone.sville_id"
                                      >
                                        <input
                                          aria-label="label"
                                          v-model="zpack.zone_touristique_id"
                                          type="checkbox"
                                          :value="z.id"
                                          :id="z.id"
                                          :name="`villepack[${index}][zonepack][${k}][zone_touristique_id]`"
                                        />
                                        <label
                                          style="margin-left: 2px"
                                          class="form-check-label"
                                          for="flexCheckDefault"
                                          >{{ z.nom }}</label
                                        >&nbsp;&nbsp;&nbsp;
                                      </div>
                                    </div>
                                  </div>
                                </b-card>
                              </div>
                            </div>
                          </div>

                          <div class="form-group col-md-5">
                            <label style="line-height: 17px">
                              <b>Hébergements disponibles</b>
                            </label>

                            <b-card
                              no-body
                              style="
                                padding: 10px;
                                border: 1px solid #b3b3b3 !important;
                                min-height: 2.65rem;
                              "
                              class="feed"
                              ref="feed"
                            >
                              <div class="row" style="padding-left: 20px">
                                <div
                                  v-for="(hebergement, index) in hebergements"
                                  v-bind:key="hebergement.id"
                                  style="opacity: 1; visibility: visible"
                                >
                                  <div
                                    v-show="
                                      hebergement.ville_id == zone.sville_id
                                    "
                                  >
                                    <input
                                      aria-label="label"
                                      v-model="hebergementpack.hebergement_id"
                                      type="checkbox"
                                      v-bind:value="hebergement.id"
                                      :name="`hebergementpack[${index}][hebergement_id]`"
                                    />
                                    <label
                                      style="margin-left: 2px"
                                      class="form-check-label"
                                      for="flexCheckDefault"
                                      >{{ hebergement.nom }} ({{
                                        hebergement.nbr_place_dispo
                                      }}
                                      places)</label
                                    >&nbsp;&nbsp;&nbsp;
                                  </div>
                                </div>
                              </div>
                            </b-card>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <button
                          class="btn btn-success"
                          type="submit"
                          fill
                          style="
                            margin-top: 15px;
                            margin-left: 15px;
                            border-radius: 18px 0px 18px 0px;
                          "
                        >
                          Ajout Ville
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </card>
            </div>
          </fieldset>
        </b-modal>
      </div>
      <div>
        <b-modal id="modal-edit-image" title="Image" :imagepack="'imagepack'">
          <form
            v-on:submit.prevent="updateImage(imagepack.id, imagepack)"
            class="mb-3"
          >
            <div class="row" style="padding: 10px">
              <div>
                <img loading="lazy"
                  alt="pack"
                  :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_pack/${imagepack.url_image}`"
                  width="30%"
                  class="img"
                />
                <br />

                <b-form-file
                  accept="image/x-png, image/gif, image/jpeg"
                  placeholder="Choisir un fichier..."
                  v-model="file"
                  @change="onFileChange"
                ></b-form-file>
              </div>
            </div>
            <div>
              <button type="submit" class="btn btn-info">Modifier</button>
            </div>
          </form>
        </b-modal>
      </div>
      <div v-for="imagepack in imagepacks" :key="'im' + imagepack.id">
        <b-card>
          <div class="col-md-4">
            <img loading="lazy"
              alt="pack"
              :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_pack/${imagepack.url_image}`"
              class="img"
              width="40%"
            />&nbsp;
            <label style="line-height: 35px">
              <i
                class="fa fa-trash"
                style="color: #de524d"
                v-on:click="deleteImage(imagepack.id)"
              ></i>
              &nbsp;
              <i
                class="tim-icons icon-pencil"
                style="color: #62b062"
                title="Edit image"
                v-b-modal.modal-edit-image
                @click="fetchImage(imagepack.id)"
              ></i>
            </label>
          </div>
        </b-card>
      </div>
    </div>
    <!-- <div v-show="pack.adagence_id!=propagence[0].id">
      <p>Vous n'avez pas le droit de modifier ce pack</p>
    </div>-->
  </div>
</template>
<script>
import Vue from "vue";
import { VueDatePicker } from "@mathieustan/vue-datepicker";

import { Card, BaseInput } from "@/components/index";
import { apiDomain } from "../config";
export default {
  components: {
    VueDatePicker,

    Card,
    BaseInput,
  },
  data() {
    return {
      loaded :false,

      markers: [],

      adresse: "",
      places: [],

      center: { lat: 0, lng: 0 },
      currentPlace: null,
      myCoordinates: {
        lat: 0,
        lng: 0,
      },
      validationErrors: {},
      /* ------------------- */
      seendep: false,
      next: "",
      zonesville: [],
      zone_pack: [],
      hebergement_pack: [],
      activités: {},
      formstate: {},
      imagepack: {},
      imagepacks: [],
      zones: {},
      villes: {},
      file: null,
      file2: null,
      pack: {},
      zonesp: [],
      hebergements: [],
      packs: [],
      programme: {},

      hebergementspack: {},
      svilles: [],
      hebergementpack: {
        pack_id: "",
        hebergement_id: [],
      },
      z: [],
      zh: [],
      villepack: [
        {
          zonesville: [],
          ville_id: "",
          sville_id: "",

          zonepack: [
            {
              ville_pack_id: "",
              zone_touristique_id: [],
            },
          ],
        },
      ],
    };
  },

  computed: {
    zonesPack() {
      var finalArray = this.zones.map(function (obj) {
        return obj.id;
      });
      console.log(finalArray);
      return finalArray;
    },
    //convert zone_pack array from array of objects into array of properties
    removeDuplicates() {
      var finalArray = this.zone_pack.map(function (obj) {
        return obj.zone_touristique_id;
      });
      console.log(finalArray);
      return finalArray;
    },

    removeDuplicatesH() {
      var finalArray = this.hebergement_pack.map(function (obj) {
        return obj.hebergement_id;
      });
      console.log(finalArray);
      return finalArray;
    },

    hasHebergement() {
      let zonespack = this.zone_pack;
      let zonesville = this.hebergementspack;
      let ret = [];

      for (let indexville = 0; indexville < zonesville.length; indexville++) {
        if (this.removeDuplicatesH.includes(zonesville[indexville].id)) {
          ret.push({
            id: zonesville[indexville].id,
            nom: zonesville[indexville].nom,
            hebergement_id: zonesville[indexville].id,

            pack_id: this.$route.params.id,
            check: "true",
          });
        } else {
          ret.push({
            id: zonesville[indexville].id,
            nom: zonesville[indexville].nom,
            hebergement_id: zonesville[indexville].id,

            pack_id: this.$route.params.id,
            check: "false",
          });
        }
      }
      return (this.zh = ret);
    },

    hasZone() {
      let zonespack = this.zone_pack;
      let zonesville = this.zones;
      let ret = [];

      for (let indexville = 0; indexville < zonesville.length; indexville++) {
        if (this.removeDuplicates.includes(zonesville[indexville].id)) {
          ret.push({
            id: zonesville[indexville].id,
            nom: zonesville[indexville].nom,
            ville_pack_id: zonesville[indexville].villepackid,
            check: "true",
          });
        } else {
          ret.push({
            id: zonesville[indexville].id,
            nom: zonesville[indexville].nom,
            ville_pack_id: zonesville[indexville].villepackid,
            check: "false",
          });
        }
      }
      return (this.z = ret);
    },
    loggedIn() {
      return this.$store.getters.get_loggedIn;
    },

    user() {
      return this.$store.getters.get_user;
    },
    propagence() {
      return this.$store.getters.get_propagence;
    },
  },
  created() {
    this.fetchSousVilles();
    this.fetchZonesP();
    this.fetchAllHebergements();
    this.fetchVilles();
    this.fetchPack(this.$route.params.id);
    this.fetchZones(this.$route.params.id);
    this.loadCategories();
    this.fetchHebergements(this.$route.params.id);
  },
  methods: {
    addNewProgramme: function () {
      this.programmes.push(Vue.util.extend({}, this.programme));
    },

    setPlace(place) {
      this.adresse = place;
      if (this.adresse) {
        const marker = {
          lat: this.adresse.geometry.location.lat(),
          lng: this.adresse.geometry.location.lng(),
        };
        this.markers.push({ position: marker });
        this.places.push(this.adresse);
        this.center = marker;
        console.log(marker.lat);
        console.log(marker.lng);

        this.adresse = place;
      }
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

    /* ------------------------------------------------- */
    deletePack(id) {
      if (confirm("Are You Sure?")) {
        fetch(`${apiDomain}/api/pack/delete/${id}`, {
          method: "delete",
        })
          .then((res) => res.json())
          .then((data) => {
            alert("Pack Supprimée");
            window.location.reload();
          })
          .catch((err) => console.log(err));
      }
    },
    test() {
      var du = new Date(this.pack.date_deb);
      var month = du.getUTCMonth() + 1;
      var d = du.getUTCDate() + 1;
      var day = ("0" + d).slice(-2);
      var year = du.getUTCFullYear();
      var nextDay = du.getUTCDate() + 1;
      var nextDD = ("0" + nextDay).slice(-2);
      var nextDate = year + "-" + month + "-" + nextDD;
      this.next = nextDate;
      this.seendep = true;
    },
    updateZonePack(id, pack) {
      var formData = new FormData();
      formData.append("pack_id", this.$route.params.id);
      for (var i = 0; i < this.z.length; i++) {
        let zpack = this.z[i].id;
        let zpackville = this.z[i].ville_pack_id;

        if (this.z[i].check == "true") {
          formData.append("zonepack[" + i + "][zone_touristique_id]", zpack);
          formData.append("zonepack[" + i + "][ville_pack_id]", zpackville);
          formData.append("zonepack[" + i + "][check]", this.z[i].check);
        }
      }

      for (var j = 0; j < this.zh.length; j++) {
        let hpack = this.zh[j].id;
        let hpackid = this.zh[j].pack_id;

        if (this.zh[j].check == "true") {
          formData.append("hebergementpack[" + j + "][hebergement_id]", hpack);
          formData.append("hebergementpack[" + j + "][pack_id]", hpackid);
        }
      }

      axios
        .post(
          `${apiDomain}/api/zones-pack/${this.$route.params.id}?token=${this.$store.state.token}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )

        .then((data) => {
          if (confirm("Pack bien modifié")) {
            window.location.reload();
          }
        })
        .catch((err) => console.log(err));
    },
    updateProgramme(id, programme) {
      this.programme.titre = programme.titre;
      this.programme.description = programme.description;
      this.programme.pack_id = this.$route.params.id;
      fetch(`${apiDomain}/api/programme/${id}`, {
        method: "post",
        body: JSON.stringify(this.programme),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())

        .then((data) => {
          if (confirm("Programme bien modifié")) {
            window.location.reload();
          }
        })
        .catch((err) => console.log(err));
    },
    fetchProgramme(id) {
      fetch(`${apiDomain}/api/programme/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.programme = res.programme;
        })
        .catch((err) => console.log(err));
    },
    fetchHebergements(id) {
      axios
        .get(`${apiDomain}/api/hebergements/villespacks/${id}`)
        .then(({ data }) => (this.hebergementspack = data.zonespack));
    },
    removeZone: function (index, villepack) {
      Vue.delete(this.villepack, index);
    },
    deleteVillePack(id) {
      if (confirm("Are You Sure?")) {
        fetch(`${apiDomain}/api/villepack/delete/${id}`, {
          method: "delete",
        })
          .then((res) => res.json())
          .then((data) => {
            alert("Ville Pack Supprimée");
            window.location.reload();
          })
          .catch((err) => console.log(err));
      }
    },
    addVillePack(e) {
      var pack_id = this.$route.params.id;
      var formData = new FormData(e.target);
      formData.append("pack_id", pack_id);
      for (var i = 0; i < this.villepack.length; i++) {
        let zpack = this.villepack[i].ville_id;

        formData.append("villepack[" + i + "][ville_id]", zpack);

        for (var j = 0; j < this.villepack[i].zonepack.length; j++) {
          for (
            var k = 0;
            k < this.villepack[i].zonepack[j].zone_touristique_id.length;
            k++
          ) {
            let zidpack = this.villepack[i].zonepack[j].zone_touristique_id[k];
            formData.append(
              "villepack[" + i + "][zonepack][" + k + "][zone_touristique_id]",
              zidpack
            );
          }
        }
      }

      for (var i = 0; i < this.hebergementpack.hebergement_id.length; i++) {
        let hpack = this.hebergementpack.hebergement_id[i];

        formData.append("hebergementpack[" + i + "][hebergement_id]", hpack);
        formData.append(
          "hebergementpack[" + i + "][pack_id]",
          this.hebergementpack.pack_id
        );
      }
      axios
        .post(
          `${apiDomain}/api/create/ville/pack/${this.$route.params.id}`,
          formData
        )
        .then(function (response) {
          if (response.status == 200) {
            if (confirm("pack Ajoutée")) {
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
    fetchAllHebergements() {
      axios
        .get(`${apiDomain}/api/allhebergements`)
        .then(({ data }) => (this.hebergements = data.hebergements));
    },
    fetchZonesP() {
      fetch(`${apiDomain}/api/allzones`)
        .then((res) => res.json())
        .then((res) => {
          this.zonesp = res.zones;
        })
        .catch((err) => console.log(err));
    },
    fetchSousVilles() {
      fetch(`${apiDomain}/api/sous/villes`)
        .then((res) => res.json())
        .then((res) => {
          this.svilles = res;
        })
        .catch((err) => console.log(err));
    },
    addNewCircuit: function () {
      this.villepack.push({
        zonesville: [],
        check: 1,
        ville_id: "",
        zonepack: [
          {
            zone_touristique_id: [],
            ville_pack_id: "",
          },
        ],
      });
    },
    loadCategories() {
      axios
        .get(`${apiDomain}/api/loadCategorie`, {
          params: _.omit(this.selected, "loadCategorie"),
        })
        .then((response) => {
          this.activités = response.data.categories;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    fetchVilles() {
      fetch(`${apiDomain}/api/villes`)
        .then((res) => res.json())
        .then((res) => {
          this.villes = res;
        })
        .catch((err) => console.log(err));
    },
    fetchLogements(id) {
      axios
        .get(`${apiDomain}/api/hebergements/ville/${id}`)
        .then(({ data }) => (this.hebergements = data.hebergements));
    },
    fetchZones() {
      fetch(`${apiDomain}/api/allzones`)
        .then((res) => res.json())
        .then((res) => {
          this.zones = res.zones;
        })
        .catch((err) => console.log(err));
    },

    fetchZones(id) {
      axios
        .get(`${apiDomain}/api/zones/villespacks/${id}`)
        .then(({ data }) => (this.zones = data.zonespack));
    },
    deleteImage(id) {
      if (confirm("Are You Sure?")) {
        fetch(`${apiDomain}/api/imagesproduitdelete/${id}`, {
          method: "delete",
        })
          .then((res) => res.json())
          .then((data) => {
            this.$noty.success("l'image a été bien supprimé...", {
              killer: true,
              timeout: 6000,
              layout: "topCenter",
            });
            this.fetchTestProduitImage(this.$route.params.id);
          })
          .catch((err) => console.log(err));
      }
    },

    updateImage(id, imageproduit) {
      var formData = new FormData();
      formData.append("id", this.imageproduit.id);
      formData.append("produit_id", this.imageproduit.produit_id);
      formData.append("url_img", this.imageproduit.url_img);
      axios
        .post(`${apiDomain}/api/imagesproduitupdate/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
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
    onFileChange(event) {
      this.imageproduit.url_img = event.target.files[0];
    },
    photo: function (event) {
      var input = event.target;
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        var vm = this;
        reader.onload = function (e) {
          vm.imageproduit.url_img = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
      console.log(input.files[0]);
    },

    fetchImage(id) {
      fetch(`${apiDomain}/api/imagesproduit/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.imageproduit = res.imagesproduit;
        })
        .catch((err) => console.log(err));
    },
    updatePack(id, pack) {
      this.pack.id = pack.id;
      this.pack.titre = pack.titre;
      this.pack.date_deb = pack.date_deb;
      this.pack.date_fin = pack.date_fin;
      this.pack.description = pack.description;
      this.pack.url_video = pack.url_video;
      this.pack.nb_place_max = pack.nb_place_max;
      this.pack.nb_place_dispo = pack.nb_place_dispo;

      this.pack.prix_enfant4 = pack.prix_enfant4;
      this.pack.prix_enfant15 = pack.prix_enfant15;
      this.pack.remise = pack.remise;
      this.pack.taux_remise = pack.taux_remise;
      this.pack.ville_id = pack.ville_id;
      this.pack.adagence_id = pack.adagence_id;
      /* new with moez */
      this.pack.time = pack.time;
      this.pack.nb_jours = pack.nb_jours;
      this.pack.adresse = this.adresse.formatted_address;
      //lng et lat
      this.pack.latitude = this.center.lat;
      this.pack.longitude = this.center.lng;

      if (this.places.length == 0) {
        this.pack.adresse = this.pack.adresse;
        this.pack.latitude = this.pack.latitude;
        this.pack.longitude = this.pack.longitude;
      } else if (this.places.length > 0) {
        this.pack.adresse = this.places[0].formatted_address;
        this.pack.latitude = this.center.lat;
        this.pack.longitude = this.center.lng;
      }

      fetch(`${apiDomain}/api/pack/${id}?token=${this.$store.state.token}`, {
        method: "put",
        body: JSON.stringify(this.pack),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())

        .then((data) => {
          if (confirm("Pack bien modifié")) {
            window.location.reload();
          }
        })
        .catch((err) => console.log(err));
    },
    updatePack_____(id, pack) {
      this.pack.id = pack.id;
      this.pack.titre = pack.titre;
      this.pack.date_deb = pack.date_deb;
      this.pack.date_fin = pack.date_fin;
      this.pack.description = pack.description;
      this.pack.url_video = pack.url_video;
      this.pack.nb_place_max = pack.nb_place_max;
      this.pack.nb_place_dispo = pack.nb_place_dispo;
      this.pack.prix_enfant4 = pack.prix_enfant4;
      this.pack.prix_enfant15 = pack.prix_enfant15;
      this.pack.remise = pack.remise;
      this.pack.taux_remise = pack.taux_remise;
      this.pack.ville_id = pack.ville_id;
      this.pack.adagence_id = pack.adagence_id;

      fetch(`${apiDomain}/api/pack/${id}?token=${this.$store.state.token}`, {
        method: "put",
        body: JSON.stringify(this.pack),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())

        .then((data) => {
          if (confirm("Pack bien modifié")) {
            window.location.reload();
          }
        })
        .catch((err) => console.log(err));
    },

    toggleZone: function (zone) {
      for (var i = 0; i < this.z.length; i++) {
        this.z[i].check == !this.z[i].check;
      }
    },

    toggleHebergement: function (hebergement) {
      for (var i = 0; i < this.zh.length; i++) {
        this.zh[i].check == !this.zh[i].check;
      }
    },
    fetchPack(id) {
      fetch(
        `${apiDomain}/api/zones/packs/${id}?token=${this.$store.state.token}`
      )
        .then((res) => res.json())
        .then((res) => {
          this.loaded = true;

          this.pack = res.packdetail;
          this.zone_pack = res.packdetail.zone_pack;
          this.hebergement_pack = res.packdetail.hebergement_pack;

          this.zonesville.zone_pack = res.packdetail.zone_pack;
        })
        .catch((err) => console.log(err));
    },

    updateHebergement(id, pack) {
      this.pack.id = pack.id;
      this.pack.titre_test = pack.titre_test;
      this.pack.nom_produit = pack.nom_produit;
      this.pack.description = pack.description;
      this.pack.mission = pack.mission;
      this.pack.client_id = pack.client_id;

      fetch(`${apiDomain}/api/pack/${id}?token=${this.$store.state.token}`, {
        method: "put",
        body: JSON.stringify(this.pack),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())

        .then((data) => {
          if (confirm("Hébergement bien modifié")) {
            window.location.reload();
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style>
fieldset.scheduler-border {
  border-style: dashed;
  border-width: 1px;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 0.2857rem;
}

legend.scheduler-border {
  font-size: 1.2em !important;
  font-weight: bold !important;
  text-align: left !important;
  width: auto;
  padding: 0 10px;
  border-bottom: none;
}
.feed {
  background: #fff;
  height: 106px;
  overflow: scroll;
}

.btdelete {
  padding: 11px 27px !important;
  border-radius: 5px;
}
</style>


