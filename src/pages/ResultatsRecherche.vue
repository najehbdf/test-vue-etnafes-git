<template>
  <div>
    <!-- Full Page Intro -->
    <TopNavbarHome />
    <div
      class="view full-page-intro"
      style="
        background-image: url('https://static.wixstatic.com/media/84770f_bc8aea547ced4ad4a1820904fc9e1b82.jpg/v1/fill/w_1920,h_1280,al_t,q_85,usm_0.66_1.00_0.01/84770f_bc8aea547ced4ad4a1820904fc9e1b82.webp');
        background-repeat: no-repeat;
        background-size: cover;
        background-attachment: fixed;
        height: auto !important;
      "
    >
      <div
        class="
          mask
          rgba-black-light
          d-flex
          justify-content-center
          align-items-center
        "
      >
        <!-- Content -->
        <div class="container container_home1 d-none d-lg-block">
          <!--Grid row-->
          <div class="row" v-if="!toggle">
            <div class="col-md-8 offset-md-2">   
              <div class="card style_card_rechereche">
                <div class="card-body" style="padding:6px !important">
                  <form name>
                    <div class="row">          
                          <div class="col-md-3 mr-2 ml-4">
                            <label 
                              style="margin-left: 23px;
                                color: #000;font-size: 12px !important;

    font-weight: 800 !important;
    letter-spacing: 0.04em !important;
                              "
                              >Destination</label
                            >
                            <div class="form-group">
                              <select
                                @change="toggle = !toggle"
                                class="v-select vs--single vs--searchable"
                                
                                v-model="pack.ville_id"
                                name="ville_id"
                                style="background-color: #fff !important;    padding: 3px;font-size: 12px !important;
                                margin-left: 23px;"
                              >
                                <option value disabled selected>
                                  choisissez votre destination
                                </option>
                                <option style="margin-left:5px"
                                  v-for="ville in villes"
                                  v-bind:key="'v' + ville.id"
                                  v-bind:value="ville.id"
                                >
                                  {{ ville.nom }}
                                </option>
                              </select>
                            </div> 
                          </div>

                          <div class="col-md-3 mr-2">
                            <label
                              style="
                                color: #000;
                                font-size: 12px !important;
    
    font-weight: 800 !important;
    letter-spacing: 0.04em !important;
                              "
                              >Date d'arrivée</label
                            >
                            <div style="margin-top: -11px !important;margin-left: -11px;">
                            <date-picker
                              v-model="pack.date_deb"
                              required
                              valueType="format"
                              @input="toggle = !toggle"
                              placeholder=" Quelle est votre date ?"
                              :disabled-date="disabledBeforeToday"
                            ></date-picker>
                            </div>
                           <!--  <div class="form-group">
                              <VueDatePicker
                                class="form-control personalisedate"
                                @input="toggle = !toggle"
                                :minDate="new Date()"
                                v-model="pack.date_deb"
                              />
                            </div> -->
                          </div>

                          &nbsp; &nbsp; &nbsp;
                          <div class="col-mx-1 mr-1">
                            <label
                              style="
                                color: #000;
                                font-size: 12px !important;
    
    font-weight: 800 !important;
    letter-spacing: 0.04em !important;"
                              >Personnes</label
                            >
                             <vue-numeric-input
                                  style="
                                    position: relative !important;
                                    -webkit-box-sizing: border-box !important;
                                    box-sizing: border-box !important;
                                   
                                    width: 81px !important;
                                    margin-top: 1px !important;
                                  "
                                  v-model="nb_adulte"
                                  v-on:input="updateNbAdulte"
                                  :min="1"
                                  :step="1"
                                  name="nb_adulte"
                                  required
                                  size="small"
                                ></vue-numeric-input>
                            <!-- <div class="form-group">
                              <input
                                aria-label="label"
                                class="personalise1"
                                v-on:input="updateNbAdulte"
                                type="number"
                                min="1"
                                name="nb_adulte"
                                required
                                v-model="nb_adulte"
                              />
                            </div> -->
                          </div>
                          <!-- &nbsp; &nbsp; &nbsp;
                          <div class="col-mx-1">
                            <label
                              style="
                                color: #000;
                                font-size: 13px;
                                font-weight: bold;
                                margin-left: 30px;
                              "
                              >Enfants:</label
                            >
                            <div class="form-group" style="margin-left: 29px">
                              <input
                                aria-label="label"
                                :min="agestab != undefined ? agestab.length : 0"
                                class="personalise1"
                                v-on:input="updateNbEnfant"
                                type="number"
                                name="nb_enfant"
                                required
                                v-model="nb_enfant"
                              />
                            </div>
                          </div>
                          &nbsp; &nbsp; &nbsp;
                          <div class="col-mx-1" v-if="nb_enfant != 0">
                            <label
                              style="
                                color: #000;
                                font-size: 13px;
                                font-weight: bold;
                                margin-left: 30px;
                              "
                              >Age Enfants:</label
                            >

                            <div
                              class="form-group"
                              style="margin-left: 29px"
                              v-for="(age, index) in Number(this.nb_enfant)"
                              :key="'a' + index"
                            >
                              <select
                                class="form-controlAGERES_home personalise1"
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
                              <img loading="lazy"
                                class="image_minus_home_RECH"
                                src="/minus-etnafes.png"
                                v-on:click="removeAge(index)"
                              />
                            </div>
                          </div>
                          &nbsp; &nbsp; &nbsp; -->
                          <div class="col-md-1 offset-md-1">
                            <label></label>
                            <button
                              @click="toggle = !toggle"
                              type="button"
                              class="btn"
                              style="
                                background-color: #222a42;
                                color: #fff;
                                margin-top: -10px;
                              "
                            >
                              Modifier
                            </button>
                          </div>
                        
                      
                    </div>
                  </form>
                  <!-- Form -->
                </div>
              </div>
            </div>
          </div>
          <div class="row" v-if="toggle">
            <div class="col-md-8 offset-md-2">
              <div class="card style_card_rechereche">
                <div class="card-body" style="padding:6px !important">
                  <!-- Form -->
                  <form name>
                    <div class="row">              
                          <div class="col-md-3 mr-2 ml-4">
                             <label 
                              style="margin-left: 23px;
                                color: #000;font-size: 12px !important;
  
    font-weight: 800 !important;
    letter-spacing: 0.04em !important;
                              "
                              >Destination</label
                            >
                            <div class="form-group">
                              <select
                                @change="toggle = !toggle"
                                class="v-select vs--single vs--searchable"
                                
                                v-model="pack.ville_id"
                                name="ville_id"
                                style="background-color: #fff !important;    padding: 3px;font-size: 12px !important;
                                margin-left: 23px;"
                              >
                                <option value disabled selected>
                                  choisissez votre destination
                                </option>
                                <option style="margin-left:5px"
                                  v-for="ville in villes"
                                  v-bind:key="'v' + ville.id"
                                  v-bind:value="ville.id"
                                >
                                  {{ ville.nom }}
                                </option>
                              </select>
                            </div> 
                          </div>

                          <div class="col-md-3 mr-2">
                            <label
                              style="
                                color: #000;
                                font-size: 12px !important;
    
    font-weight: 800 !important;
    letter-spacing: 0.04em !important;
                              "
                              >Date d'arrivée</label
                            >
                            <div style="margin-top: -11px !important;margin-left: -11px;">
                            <date-picker
                              v-model="pack.date_deb"
                              required
                              valueType="format"
                              @input="toggle = !toggle"
                              placeholder=" Quelle est votre date ?"
                              :disabled-date="disabledBeforeToday"
                            ></date-picker>
                            </div>
                          </div>

                          &nbsp; &nbsp; &nbsp;
                          <div class="col-mx-1 mr-1">
                            <label
                              style="
                                color: #000;
                                font-size: 12px !important;
   
    font-weight: 800 !important;
    letter-spacing: 0.04em !important;"
                              >Personnes</label
                            >
                             <vue-numeric-input
                                  style="
                                    position: relative !important;
                                    -webkit-box-sizing: border-box !important;
                                    box-sizing: border-box !important;
                                   
                                    width: 81px !important;
                                    margin-top: 1px !important;
                                  "
                                  v-model="nb_adulte"
                                      @change="updateNbAdulte"
                                  :min="1"
                                  :step="1"
                                  name="nb_adulte"
                                  required
                                  size="small"
                                ></vue-numeric-input>
                           <!--  <label
                              style="
                                color: #000;font-size: 12px !important;
    line-height: 27px !important;
    font-weight: 800 !important;
    letter-spacing: 0.04em !important;
                              "
                              >Personnes</label
                            >
                            <div class="form-group">
                              <input
                                aria-label="label"
                                class="personalise1"
                                v-model="nb_adulte"
                                @change="updateNbAdulte"
                                type="number"
                                min="1"
                                name="nb_adulte"
                                required
                              />
                            </div> -->
                          </div>
                          <!-- &nbsp; &nbsp; &nbsp;
                          <div class="col-mx-1">
                            <label
                              style="
                                color: #000;
                                font-size: 13px;
                                font-weight: bold;
                              "
                              >Enfants:</label
                            >
                            <div class="form-group">
                              <input
                                aria-label="label"
                                class="personalise1"
                                v-on:input="updateNbEnfant"
                                type="number"
                                :min="agestab != undefined ? agestab.length : 0"
                                name="nb_enfant"
                                required
                                v-model="nb_enfant"
                              />
                            </div>
                          </div>
                          &nbsp; &nbsp; &nbsp;
                          <div class="col-mx-1" v-if="nb_enfant != 0">
                            <label
                              style="
                                color: #000;
                                font-size: 13px;
                                font-weight: bold;
                              "
                              >Age Enfants:</label
                            >
                            <div
                              class="form-group"
                              v-for="(age, index) in Number(this.nb_enfant)"
                              :key="'a' + index"
                            >
                              <select
                                class="form-controlAGERES_home personalise1"
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
                              <img loading="lazy"
                                class="image_minus_home_RECH"
                                src="/minus-etnafes.png"
                                v-on:click="removeAge(index)"
                              />
                            </div>
                          </div>
                          &nbsp; &nbsp; &nbsp; -->
                          <div class="col-md-1 offset-md-1">
                            <label></label>
                            <router-link
                              :to="{
                                name: 'ResultatsRecherche',
                                query: {
                                  ville_id: pack.ville_id,
                                  date_deb: pack.date_deb,
                                  nb_adulte: nb_adulte,
                                  nb_enfant: nb_enfant,
                                  ages: agestab,
                                },
                              }"
                            >
                              <button
                                type="submit"
                                class="btn btn-info"
                                style="
                                  background-color: #17a2b8;
                                  color: #fff;
                                  margin-top: -10px;
                                "
                              >
                                Rechercher
                              </button>
                            </router-link>
                          </div>
                        
                      
                    </div>
                  </form>
                  <!-- Form -->
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- responsive -->
        <div class="container container_home1 d-lg-none">
          <!-- mobile responsive -->
          <div class="row" v-show="!toggle">
            <div class="col-md-12">   
              <div class="card" style="margin-bottom: 12px;">
                <div class="card-body" style="padding:11px !important">
                  <form name>
                    <div class="row">   
                      
                       <div class="col">
                            <label
                              style="
                                color: #000;
                                font-size: 12px !important;
        margin-left: 6px;
    font-weight: 800 !important;
    letter-spacing: 0.04em !important;
                              "
                              >Date d'arrivée</label
                            >
                            <div style="margin-top: -11px !important;margin-left: -5px;">
                            <date-picker  style="width: 345px !important;"
                              v-model="pack.date_deb"
                              required
                              valueType="format"
                              @input="toggle = !toggle"
                              placeholder="Choisissez votre date d'arrivée ?"
                              :disabled-date="disabledBeforeToday"
                            ></date-picker>
                            </div>
                          </div>  

                              
                          

                                             
                      
                    </div>
<div class="row">
  <div class="col">
                            <label 
                              style="
                                color: #000;font-size: 12px !important;
margin-left: 6px;
    font-weight: 800 !important;
    letter-spacing: 0.04em !important;
                              "
                              >Destination</label
                            >
                            <div class="form-group">
                              <select
                                @change="toggle = !toggle"
                                class="v-select vs--single vs--searchable"
                                
                                v-model="pack.ville_id"
                                name="ville_id"
                                style="background-color: #fff !important;    padding: 3px;font-size: 12px !important;
                                margin-left: 6px;"
                              >
                                <option :value="najeh" disabled selected>
                                  choisissez votre destination
                                </option>
                                <option style="margin-left:5px"
                                  v-for="ville in villes"
                                  v-bind:key="'v' + ville.id"
                                  v-bind:value="ville.id"
                                >
                                  {{ ville.nom }}
                                </option>
                              </select>
                            </div> 
                          </div>
                          <div class="col">
                            <label
                              style="
                                color: #000;
                                font-size: 12px !important;
    margin-left: 34px;
    font-weight: 800 !important;
    letter-spacing: 0.04em !important;"
                              >Personnes</label
                            >
                             <vue-numeric-input
                                  style="
                                    position: relative !important;
                                    -webkit-box-sizing: border-box !important;
                                    box-sizing: border-box !important;
                                
                                    width: 80px !important;
                                    margin-left: 34px;
    margin-top: 6px !important;
                                    
                                  "
                                  v-model="nb_adulte"
                                  v-on:input="updateNbAdulte"
                                  :min="1"
                                  :step="1"
                                  name="nb_adulte"
                                  required
                                  size="small"
                                ></vue-numeric-input>
                          </div>
</div>



                  
                    <div class="row">
                      <button
                              @click="toggle = !toggle"
                              type="button"
                              class="btn btn-block"
                              style="
                                background-color: #222a42;
                                color: #fff;
    margin: 10px 10px 0px 10px;
                              "
                            >
                              Modifier
                            </button>
                    </div>
                  </form>
                  <!-- Form -->
                </div>
              </div>
            </div>
          </div>
          <div class="row" v-show="toggle">
            <div class="col-md-8 offset-md-2">
              <div class="card" style="margin-bottom: 12px;">
                <div class="card-body" style="padding:11px !important">
                  <!-- Form -->
                  <form name>
                    <div class="row">    
 
                      <div class="col">
                            <label
                              style="
                                color: #000;
                                font-size: 12px !important;
        margin-left: 6px;
    font-weight: 800 !important;
    letter-spacing: 0.04em !important;
                              "
                              >Date d'arrivée</label
                            >
                            <div style="margin-top: -11px !important;margin-left: -5px;">
                            <date-picker  style="width: 345px !important;"
                              v-model="pack.date_deb"
                              required
                              valueType="format"
                              @input="toggle = !toggle"
                              placeholder="Choisissez votre date d'arrivée ?"
                              :disabled-date="disabledBeforeToday"
                            ></date-picker>
                            </div>
                          </div>  

                                                             
                    </div>

                    <div class="row">
  <div class="col">
                            <label 
                              style="
                                color: #000;font-size: 12px !important;
margin-left: 6px;
    font-weight: 800 !important;
    letter-spacing: 0.04em !important;
                              "
                              >Destination</label
                            >
                            <div class="form-group">
                              <select
                                @change="toggle = !toggle"
                                class="v-select vs--single vs--searchable"
                                
                                v-model="pack.ville_id"
                                name="ville_id"
                                style="background-color: #fff !important;    padding: 3px;font-size: 12px !important;
                                margin-left: 6px;"
                              >
                                <option :value="najeh" disabled selected>
                                  choisissez votre destination
                                </option>
                                <option style="margin-left:5px"
                                  v-for="ville in villes"
                                  v-bind:key="'v' + ville.id"
                                  v-bind:value="ville.id"
                                >
                                  {{ ville.nom }}
                                </option>
                              </select>
                            </div> 
                          </div>
                          <div class="col">
                            <label
                              style="
                                color: #000;
                                font-size: 12px !important;
    margin-left: 34px;
    font-weight: 800 !important;
    letter-spacing: 0.04em !important;"
                              >Personnes</label
                            >
                             <vue-numeric-input
                                  style="
                                    position: relative !important;
                                    -webkit-box-sizing: border-box !important;
                                    box-sizing: border-box !important;
                                
                                    width: 80px !important;
                                    margin-left: 34px;
    margin-top: 6px !important;
                                    
                                  "
                                  v-model="nb_adulte"
                                  v-on:input="updateNbAdulte"
                                  :min="1"
                                  :step="1"
                                  name="nb_adulte"
                                  required
                                  size="small"
                                ></vue-numeric-input>
                          </div>
</div>

                    <div class="row">
                      
                            <router-link
                              :to="{
                                name: 'ResultatsRecherche',
                                query: {
                                  ville_id: pack.ville_id,
                                  date_deb: pack.date_deb,
                                  nb_adulte: nb_adulte,
                                  nb_enfant: nb_enfant,
                                  ages: agestab,
                                },
                              }"
                            >
                              <button
                                type="button"
                                class="btn btn-block btn-info"
                                style="
                                  background-color: #17a2b8;
                                  color: #fff;
                                   margin: 10px 10px 0px 10px;
                                "
                              >
                                Rechercher
                              </button>
                            </router-link>
                          
                    </div>

                   
                  </form>
                  <!-- Form -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br />
    <!-- moez -->

    <div class="container">
      <div class="row" v-if="packs.length > 0">
        <div class="col-md-3 d-none d-lg-block">
          <table class="table table-bordered" style="border-radius: 22px">
            <thead>
              <label
                class="mx-3"
                style="
                  color: rgb(26, 43, 72);
                  padding: 22px;
                  margin-bottom: -28px;
                  margin-top: -13px;
                  margin-left: -11px !important;
                "
                >Filtrer par&nbsp;:</label
              >

              <hr class="style_hr" style="color: black" />
            </thead>
            <tbody>
              <div id="app">
                <div class="block">
                  <div class="app-content">
                    <label style="color: #1a2b48; margin-left: 6px !important"
                      >Prix Totale</label
                    >

                    <vue-slider
                      v-model="rangeDate"
                      :tooltip-formatter="'{value} DT'"
                      style="margin-top: 35px; bottom: -7px"
                      :tooltip="'always'"
                      :max="valuesSlider[1]"
                      :min="valuesSlider[0]"
                      :enableCross="true"
                    ></vue-slider>
                  </div>
                </div>
              </div>

              <hr />
              <br />

              <div
                class="
                  app-contentt
                  typeActivite
                  mx-3
                  style_type_activite_rech_home
                "
              >
                <label style="color: #1a2b48">Type de l'activité</label>

                <div
                  v-for="(category, index) in loadCategorie"
                  :key="'i' + index"
                >
                  <div class="pretty p-switch">
                    <input
                      aria-label="label"
                      :value="category.nom_activite"
                      :id="'category' + index"
                      v-model="nom_activite"
                      type="radio"
                      name="nom_activite"
                    />
                    <div class="state p-success">
                      <label :for="'category' + index">{{
                        category.nom_activite
                      }}</label>
                    </div>
                  </div>

                  <br />
                </div>
                <div class="pretty p-switch">
                  <input
                    aria-label="label"
                    value
                    v-model="nom_activite"
                    id="alll"
                    type="radio"
                    name="switch1"
                  />
                  <div class="state p-warning">
                    <label>Tous</label>
                  </div>
                </div>
              </div>
              <br />
              <hr />
              <br />

              <div
                class="app-contentt typeActivite mx-3 style_totADRL_rech_home"
              >
                <label style="color: #1a2b48">Taux d'adrénaline</label>

                <div>
                  <p-radio
                    value="Faible"
                    v-model="adrenaline"
                    class="p-default p-curve"
                    name="color"
                    color="primary-o"
                    >Faible</p-radio
                  >
                  <br />
                  <p-radio
                    value="Moyen"
                    v-model="adrenaline"
                    class="p-default p-curve"
                    name="color"
                    color="success-o"
                    >Moyen</p-radio
                  >

                  <br />

                  <p-radio
                    value="Extrême"
                    v-model="adrenaline"
                    class="p-default p-curve"
                    name="color"
                    color="danger-o"
                    >Extrême</p-radio
                  >
                  <br />
                  <p-radio
                    value
                    v-model="adrenaline"
                    class="p-default p-curve"
                    name="color"
                    color="warning-o"
                    >Tous</p-radio
                  >
                  <br />
                </div>
              </div>
              <br />
            </tbody>
          </table>
        </div>

<div class="col-md-3 d-lg-none">
          <table class="table table-bordered" style="border-radius: 22px">
            <thead>
              <label
                class="mx-3"
                style="
                  color: rgb(26, 43, 72);
                  padding: 22px;
                  margin-bottom: -28px;
                  margin-top: -13px;
                  margin-left: -11px !important;
                "
                >Filtrer par&nbsp;:</label
              >

              <hr class="style_hr" style="color: black" />
            </thead>
            <tbody>
              <div id="app">
                <div class="block">
                  <div class="app-content">
                    <div class="row">
                      <!-- <div class="col">
                    <label style="color: #1a2b48;font-size: 13px;">Type de l'activité</label>
                      </div> -->
                      <div class="col">
                        <label
                          style="color: #1a2b48;font-size: 13px; margin-left:6px;"
                          >Prix Totale</label
                        >
                      </div>

                      <div class="col">
                        <i
                          style="margin-left: 97px; color: #333"
                          :class="visible ? null : 'collapsed'"
                          :aria-expanded="visible ? 'true' : 'false'"
                          aria-controls="collapse-1"
                          @click="visible = !visible"
                          class="tim-icons icon-minimal-down"
                        >
                        </i>
                      </div>
                    </div>

                    <b-collapse id="collapse-1" v-model="visible" class="mt-2">
                      <vue-slider
                        v-model="rangeDate"
                        :tooltip-formatter="'{value} DT'"
                        style="margin-top: 35px; bottom: -7px"
                        :tooltip="'always'"
                        :max="valuesSlider[1]"
                        :min="valuesSlider[0]"
                        :enableCross="true"
                      ></vue-slider>
                    </b-collapse>
                  </div>
                </div>
              </div>

              <hr />
              <br />

              <div
                class="
                  app-contentt
                  typeActivite
                  mx-3
                  style_type_activite_rech_home
                "
              >
                <div class="row">
                  <div class="col">
                    <label style="color: #1a2b48;font-size: 13px;">Type de l'activité</label>
                  </div>

                  <div class="col">
                    <i
                      style="margin-left: 97px; color: #333"
                      :class="visible2 ? null : 'collapsed'"
                      :aria-expanded="visible2 ? 'true' : 'false'"
                      aria-controls="collapse-2"
                      @click="visible2 = !visible2"
                      class="tim-icons icon-minimal-down"
                    >
                    </i>
                  </div>
                </div>

                <b-collapse id="collapse-2" v-model="visible2" class="mt-2">
                  <div
                    v-for="(category, index) in loadCategorie"
                    :key="'i' + index"
                  >
                    <div class="pretty p-switch">
                      <input
                        aria-label="label"
                        :value="category.nom_activite"
                        :id="'category' + index"
                        v-model="nom_activite"
                        type="radio"
                        name="nom_activite1"
                      />
                      <div class="state p-success">
                        <label :for="'category' + index">
                          {{ category.nom_activite }}
                        </label>
                      </div>
                    </div>

                    <br />
                  </div>
                  <div class="pretty p-switch">
                    <input
                      aria-label="label"
                      value
                      v-model="nom_activite"
                      id="alll"
                      type="radio"
                      name="switch1"
                    />
                    <div class="state p-warning">
                      <label>Tous</label>
                    </div>
                  </div>
                </b-collapse>
              </div>
              <br />
              <hr />
              <br />

              <div
                class="app-contentt typeActivite mx-3 style_totADRL_rech_home"
              >
                <div class="row">
                  <div class="col">
                    <label style="color: #1a2b48;font-size: 13px;">Taux d'adrénaline</label>
                  </div>

                  <div class="col">
                    <i
                      style="margin-left: 97px; color: #333"
                      :class="visible3 ? null : 'collapsed'"
                      :aria-expanded="visible3 ? 'true' : 'false'"
                      aria-controls="collapse-3"
                      @click="visible3 = !visible3"
                      class="tim-icons icon-minimal-down"
                    >
                    </i>
                  </div>
                </div>
                <b-collapse id="collapse-3" v-model="visible3" class="mt-2">
                  <div>
                    <p-radio
                      value="Faible"
                      v-model="adrenaline"
                      class="p-default p-curve"
                      name="color1"
                      color="primary-o"
                      >Faible</p-radio
                    >
                    <br />
                    <p-radio
                      value="Moyen"
                      v-model="adrenaline"
                      class="p-default p-curve"
                      name="color1"
                      color="success-o"
                      >Moyen</p-radio
                    >

                    <br />

                    <p-radio
                      value="Extrême"
                      v-model="adrenaline"
                      class="p-default p-curve"
                      name="color1"
                      color="danger-o"
                      >Extrême</p-radio
                    >
                    <br />
                    <p-radio
                      value
                      v-model="adrenaline"
                      class="p-default p-curve"
                      name="color1"
                      color="warning-o"
                      >Tous</p-radio
                    >
                    <br />
                  </div>
                </b-collapse>
              </div>
              <br />
            </tbody>
          </table>
        </div>
        <div class="col-md-9">
          <div class="container feed" ref="feed">
            <!--  <div class="container feed" ref="feed"> -->
            <div>
              <center>
                <b class="resFil d-none d-lg-block">
                  Vous avez {{ filteredData.length }} activités trouvées pour
                  votre recherche.
                </b>

                <b class="resFil d-lg-none" style="font-size: 12px !important;">
                  Vous avez {{ filteredData.length }} activités trouvées pour
                  votre recherche.
                </b>
              </center>
            </div>
            <div class="row">
              <div
                class="col-lg-4"
                v-for="(pack, index) in filteredData"
                :key="index"
              >
                <div
                  class="card"
                  style="
                    margin-bottom: 30px;
                    margin-top: 10px;
                    box-shadow: 0 0 0 1px #222a42;
                  "
                >
                  <router-link
                    :to="{
                      name: 'DetailsPack',
                      params: { id: pack.pack_id },
                      query: {
                        ville_id: pack.ville_id,
                        date_deb: pack.date_deb,
                        nb_adulte: nb_adulte,
                        nb_enfant: nb_enfant,
                        ages: agestab,
                      },
                    }"
                  >
                    <div class="card-img-wrap">
                      <img loading="lazy"
                        class="card-img imaa1"
                        :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_packs/${pack.image_couverture}`"
                        alt="Card image cap"
                      />

                      <div
                        class="top-left badge"
                        style="background-color: #ff4012"
                        v-if="
                          pack.date_deb < new Date().toISOString().split('T')[0]
                        "
                      >
                        Pack expiré
                      </div>

                      <div
                        class="top-left badge"
                        style="background-color: rgb(40, 179, 81)"
                        v-else
                      >
                        Pack disponible
                      </div>

                      <h4
                        class="centered"
                        style="
                          font-size: 11px;
                          margin-bottom: 0px !important;
                          border-top-right-radius: 15px;
                          color: #fff;
                          background-color: rgba(34, 42, 66, 0.8);
                        "
                      >
                        {{ pack.nom_activite }}
                      </h4>
                    </div>
                  </router-link>
                  <!-- favorite mode connecter -->

                  <div v-if="loggedIn">
                    <div v-if="pack.Favorite == 1">
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
                    <!--  -->

                    <div v-if="pack.Favorite == 0">
                      <span>
                        <button
                          title=" Ajouter à vos favoris ?"
                          @click="
                            showEditModal(pack, i);
                            show = true;
                          "
                          v-on:click="submitAddFav"
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
                  </div>

                  <div>
                    <!--  -->

                    <div v-if="!loggedIn">
                      <span>
                        <button
                          title=" Ajouter à vos favoris ?"
                          @click="
                            showEditModal(pack, i);
                            show = true;
                          "
                          v-on:click="submitAddFav"
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
                  </div>

                  <div class="row" style="margin-top: 11px">
                    <div class="col-md-12">
                      <b style="margin-left: 7px; padding: 4px">
                        {{ pack.titre }}
                      </b>
                    </div>
                  </div>

                  <div class="card-block">
                    <div style="padding-top: 12px; padding-bottom: 12px">
                      <center>
                        <img loading="lazy" src="/date-deb-etnafes.png" width="6%" />&nbsp;
                        <span style="color: #5e6d77"
                          >{{ pack.date_deb }} - {{ pack.time }}</span
                        >
                        <br />
                      </center>
                    </div>
                    <hr style="margin-top: 0rem; margin-bottom: 0rem" />
                    <!-- moez responsive -->
                    <div class="row row_res_rech">
                      <div class="col-mx-4 offset-1">
                        <span>
                          <center>
                            <b>
                              <span
                                title="Prix total"
                                v-if="agestab != undefined"
                                style="font-size: 12px"
                              >
                                <img loading="lazy"
                                  src="/etnaffes-tn-dinar.png"
                                  class="image_resulatat_rech"
                                />
                                &nbsp;
                                <b v-if="agestab.length > 0">
                                  {{ pack.price }}
                                  DT
                                </b>

                                <!-- <b v-else>{{ (Number(nb_adulte) * p.prix_fix).toFixed(2) }} DT</b> -->
                                <b v-else
                                  >{{ Number(nb_adulte) * pack.prix_fix }} DT</b
                                >
                              </span>
                            </b>
                          </center>
                        </span>
                      </div>
                      <div class="col-mx-3">
                        <span>
                          <center>
                            <b>
                              <span
                                title="Nombres des personnes"
                                style="font-size: 12px"
                              >
                                <img loading="lazy"
                                  src="/etnaffes-tn-personne.png"
                                  class="image_resulatat_rech"
                                />
                                &nbsp;
                                <b>{{ pack.nb_place_max }}</b>
                              </span>
                            </b>
                          </center>
                        </span>
                      </div>

                      <div class="col-mx-4">
                        <span>
                          <center>
                            <b>
                              <span
                                title="Niveau d'activités physique"
                                style="font-size: 12px"
                              >
                                <img loading="lazy"
                                  class="image_resulatat_rech"
                                  src="/etnafess-tn-type-activite.png"
                                />&nbsp;
                                <b>{{ pack.adrenaline }}</b>
                              </span>
                            </b>
                          </center>
                        </span>
                      </div>
                    </div>

                    <!-- fin moez responsive -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- aucun pack web -->
      <div style="padding-top: 70px; padding-bottom: 40px" class="d-none d-lg-block" v-if="packs.length==0">
        <center>
          <h3 style="color: #333">
            Aucun pack ne correspond pour le moment à cette recherche, veuillez
            consultez les packs disponibles sur le lien ci-dessous
          </h3>
        </center>

        <center>
          <h3 style="color: #333">
            <a style="#000" href="/packs">
              __
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="12"
                height="12"
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
                  <g fill="#e67e22">
                    <path
                      d="M86,31.83008c7.11068,-15.95703 19.62435,-31.41015 37.45703,-31.41015c10.41406,0 20.01627,5.03906 28.80664,15.11719c8.37044,9.57422 12.56966,19.17643 12.56966,28.83463c0,14.47331 -4.00326,29.5905 -11.95378,45.40756c-6.85872,13.63347 -16.74088,28.02278 -29.64648,43.16797c-9.74219,11.44988 -22.28385,24.46745 -37.653,39.05274c-13.29752,-12.68164 -25.22331,-25.2793 -35.80533,-37.82097c-12.9056,-15.42512 -22.92774,-29.81445 -30.03842,-43.16797c-8.37044,-15.81706 -12.56966,-29.98242 -12.56966,-42.52409c0,-12.00976 3.69531,-22.84375 11.11393,-32.52994c8.0905,-10.63802 17.97266,-15.95703 29.64649,-15.95703c18.39258,0 31.07422,15.5931 38.07292,31.83008z"
                    />
                  </g>
                </g>
              </svg>
              Nos PACKS
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="12"
                height="12"
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
                  <g fill="#34495e">
                    <path
                      d="M86,31.83008c7.11068,-15.95703 19.62435,-31.41015 37.45703,-31.41015c10.41406,0 20.01627,5.03906 28.80664,15.11719c8.37044,9.57422 12.56966,19.17643 12.56966,28.83463c0,14.47331 -4.00326,29.5905 -11.95378,45.40756c-6.85872,13.63347 -16.74088,28.02278 -29.64648,43.16797c-9.74219,11.44988 -22.28385,24.46745 -37.653,39.05274c-13.29752,-12.68164 -25.22331,-25.2793 -35.80533,-37.82097c-12.9056,-15.42512 -22.92774,-29.81445 -30.03842,-43.16797c-8.37044,-15.81706 -12.56966,-29.98242 -12.56966,-42.52409c0,-12.00976 3.69531,-22.84375 11.11393,-32.52994c8.0905,-10.63802 17.97266,-15.95703 29.64649,-15.95703c18.39258,0 31.07422,15.5931 38.07292,31.83008z"
                    />
                  </g>
                </g>
              </svg>
              __
            </a>
          </h3>
        </center>
      </div>

      <!-- aucun pack responsive -->
       <div style="padding-top: 0px; padding-bottom: 40px" v-if="packs.length==0" class="d-lg-none">
        <center>
          <h3 style="color: #333;font-size: 16px;">
            Aucun pack ne correspond pour le moment à cette recherche, veuillez
            consultez les packs disponibles sur le lien ci-dessous
          </h3>
        </center>

        <center>
          <h3 style="color: #333">
            <a style="#000" href="/packs">
              __
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="12"
                height="12"
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
                  <g fill="#e67e22">
                    <path
                      d="M86,31.83008c7.11068,-15.95703 19.62435,-31.41015 37.45703,-31.41015c10.41406,0 20.01627,5.03906 28.80664,15.11719c8.37044,9.57422 12.56966,19.17643 12.56966,28.83463c0,14.47331 -4.00326,29.5905 -11.95378,45.40756c-6.85872,13.63347 -16.74088,28.02278 -29.64648,43.16797c-9.74219,11.44988 -22.28385,24.46745 -37.653,39.05274c-13.29752,-12.68164 -25.22331,-25.2793 -35.80533,-37.82097c-12.9056,-15.42512 -22.92774,-29.81445 -30.03842,-43.16797c-8.37044,-15.81706 -12.56966,-29.98242 -12.56966,-42.52409c0,-12.00976 3.69531,-22.84375 11.11393,-32.52994c8.0905,-10.63802 17.97266,-15.95703 29.64649,-15.95703c18.39258,0 31.07422,15.5931 38.07292,31.83008z"
                    />
                  </g>
                </g>
              </svg>
              Nos PACKS
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="12"
                height="12"
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
                  <g fill="#34495e">
                    <path
                      d="M86,31.83008c7.11068,-15.95703 19.62435,-31.41015 37.45703,-31.41015c10.41406,0 20.01627,5.03906 28.80664,15.11719c8.37044,9.57422 12.56966,19.17643 12.56966,28.83463c0,14.47331 -4.00326,29.5905 -11.95378,45.40756c-6.85872,13.63347 -16.74088,28.02278 -29.64648,43.16797c-9.74219,11.44988 -22.28385,24.46745 -37.653,39.05274c-13.29752,-12.68164 -25.22331,-25.2793 -35.80533,-37.82097c-12.9056,-15.42512 -22.92774,-29.81445 -30.03842,-43.16797c-8.37044,-15.81706 -12.56966,-29.98242 -12.56966,-42.52409c0,-12.00976 3.69531,-22.84375 11.11393,-32.52994c8.0905,-10.63802 17.97266,-15.95703 29.64649,-15.95703c18.39258,0 31.07422,15.5931 38.07292,31.83008z"
                    />
                  </g>
                </g>
              </svg>
              __
            </a>
          </h3>
        </center>
      </div>


    </div>

    <!-- moez -->
    <br />
    <Footer></Footer>
  </div>
</template>
<style>
.imaa1 {
  height: 180px;
}
.nav-tabs .nav-link.active,
.nav-tabs .nav-item.show .nav-link {
  color: #525f7f;
  background-color: #c0c0cb;
  border-color: #e3e3e3 #e3e3e3 #1e1e2f;
}
</style>
<script>
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";
/* moez */
import _ from "lodash";
import { FadeTransition } from "vue2-transitions";
import VueSimpleRangeSlider from "vue-simple-range-slider";
import "vue-simple-range-slider/dist/vueSimpleRangeSlider.css";
import "vue-range-component/dist/vue-range-slider.css";
import VueRangeSlider from "vue-range-component";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import { VueDatePicker } from "@mathieustan/vue-datepicker";
import "@mathieustan/vue-datepicker/dist/vue-datepicker.min.css";
import Vue from "vue";
import axios from "axios";
import TopNavbarHome from "./Layout/TopNavbarHome.vue";
import Footer from "./Layout/Footer.vue";
import { apiDomain } from "../config";
import NotificationTemplate from "./Notifications/NotificationTemplate";

export default {
  components: {
    FadeTransition,
    VueDatePicker,
    DatePicker,
    TopNavbarHome,
    Footer,
    VueSlider,
    /*  CustomSlider,
    RangeSlider, */
    VueRangeSlider,
    VueSimpleRangeSlider,
    icon: { template: '<svg><use :xlink:href="use"/></svg>', props: ["use"] },
  },
  data() {
    return {
      visible: false,
      visible2: false,
      visible3: false,
      /* favorite */
      show: false,
      showdetailleModale: false,
      detaille: {
        id: "",
      },
      index: -1,
      /* fin favorite */
      value: 0,
      marks: (val) => val % 30 === 0,
      /* moez */

      nom_activite: "",
      //nom_activite: {},
      adrenaline: "",
      value: 20,
      backgroundSize: "20% 100%",
      filteredD: [],
      loadCategorie: [],
      selected: {
        loadCategorie: [],
      },
      start: 0,
      end: 1,
      min: 0,
      max: 0,
      mini: 0,
      maxi: 0,
      test: "",
      moez: "2",

      /* vv3 */
      /* version 2 */
      modal: false,
      companies: [],
      dropdown: { height: 0 },
      rating: { min: 10, max: 0 },
      filters: { countries: {}, categories: {}, rating: 0 },
      menus: { countries: false, categories: false, rating: false },
      /* version 2 */

      value: [0, 100],
      prixchercher: [0, 0],

      prix_min_estimative: 0,
      prix_max_estimative: 0,
      slider2: "100",

      minValue: "500",
      /* moez */
      //agestab: [],
      somme: [],
      result: [],
      res: [],
      ages: [],
      //ages: this.$store.state.ages,
      toggle: false,
      villes: [],
      ville: {
        id: "",
        nom_ville: "",
      },
      nb_adulte: this.$route.query.nb_adulte,
      nb_enfant: this.$route.query.nb_enfant,
      //agestab: this.$route.query.ages,
      agestab: this.$route.query.ages ? this.$route.query.ages : [],
      s4: [],
      s15: [],
      som: [],
      packs: { price: "" },
      packsd: [],

      pack: {
        id: "",
        nom: "",
        date_deb: this.$route.query.date_deb,
        au: "",
        ville_id: this.$route.query.ville_id,
        description: "",
      },
    };
  },
  mounted() {
    /* new */
    this.loadCategories();
  },
  computed: {
    total() {
      const packs = this.packs;
      const agestab = this.agestab;
      var nbA = this.nb_adulte;
      var vm = this;
      const calcul = this.calcul;
      var result = [];

      var prixadulte = 0;
      var somme = 0;

      if (packs.length > 0) {
        for (var j = 0; j < packs.length; j++) {
          prixadulte = packs[j].prix_fix * nbA;

          for (var k = 0; k < calcul.length; k++) {
            somme = prixadulte + calcul[j];
          }
          result.push(somme);
        }
      } else {
        result.push(0);
      }

      return result;
    },
    valuesSlider() {
      const packs = this.total;
      const agestab = this.agestab;

      var nbA = this.nb_adulte;
      var vm = this;
      var calcul = this.calcul,
        maxMin = vm.total,
        min = _.minBy(maxMin),
        max = _.maxBy(maxMin);

      this.min = min;
      this.max = max;

      return [min, max];
    },
    rangeDate: {
      get: function () {
        return [this.min, this.max];
      },
      // setter
      set: function (newValue) {
        var vm = this;
        vm.min = newValue[0];
        vm.max = newValue[newValue.length - 1];
      },
    },
    filteredData() {
      // params: this.selected
      var vm = this;
      var min = vm.min;
      var max = vm.max;
      var nbA = this.nb_adulte;
      const packs = this.packs;
      const total = this.total;

      var filteredD = this.filteredD;
      var calcul = this.calcul;

      const agestab = this.agestab;
      return _.filter(vm.packs, function (data) {
        for (var a = 0; a < packs.length; a++) {
          var prix_total = total[a];
          packs[a].price = prix_total;
        }
        if (_.isNull(min) && _.isNull(max)) {
          return true;
        } else {
          var date = data.price;

          var result = [];
          if (packs.length > 0) {
            for (var a = 0; a < packs.length; a++) {
              var prix = date >= min && date <= max;
              var adrenaline = vm.adrenaline
                ? data.adrenaline == vm.adrenaline
                : true;

              var nom_activite = vm.nom_activite
                ? data.nom_activite == vm.nom_activite
                : true;
            }
          }
          // }
        } /* fin esle filter prix */

        return prix && adrenaline && nom_activite;
      });
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

    calcul() {
      const packs = this.packs;
      const agestab = this.agestab;
      var result = [];
      if (packs.length > 0) {
        for (var j = 0; j < packs.length; j++) {
          var somme = null;

          var sommeprixenfant4 = 0;
          var sommeprixenfant15 = 0;
          if (agestab != undefined) {
            for (var i = 0; i < agestab.length; i++) {
              if (agestab[i] <= 4) {
                sommeprixenfant4 += packs[j].prix_enfant4;
              }
              if (agestab[i] > 4) {
                sommeprixenfant15 += packs[j].prix_enfant15;
              }
            }
            somme += sommeprixenfant4 + sommeprixenfant15;
            result.push(somme);
          }
        }
      } else {
        result.push(0);
      }

      return result;
    },
    loggedIn() {
      return this.$store.getters.get_loggedIn;
    },

    user() {
      return this.$store.getters.get_user;
    },
  },
  created() {
    if (this.loggedIn) {
      this.fetchPacksSearch(
        this.$route.query.ville_id,
        this.$route.query.date_deb
      );
    }
    if (!this.loggedIn) {
      this.fetchPacksSearch_not_token(
        this.$route.query.ville_id,
        this.$route.query.date_deb
      );
    }

    this.fetchVilles();
    this.formatter = (prixchercher) => ` ${prixchercher} DT`;

    this.bgStyle = {
      backgroundColor: "#fff",
      boxShadow: "inset 0.5px 0.5px 3px 1px rgba(0,0,0,.36)",
    };

    this.tooltipStyle = {
      backgroundColor: "#666",
      borderColor: "#666",
    };
    this.processStyle = {
      backgroundColor: "#999",
    };
  },

  methods: {

    disabledBeforeToday(date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return date < today;
    },
    /* like & dislike */
    notifyVue(verticalAlign, horizontalAlign) {
      const color = Math.floor(Math.random());
      this.$notify({
        component: NotificationTemplate,
        //  icon: "tim-icons icon-bell-55",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        // type: this.type[color],
        timeout: 3000,
      });
    },

    notifyAimePAs(verticalAlign, horizontalAlign) {
      const color = Math.floor(Math.random());
      this.$notify({
        component: pasAimeContenu,
        //  icon: "tim-icons icon-bell-55",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        // type: this.type[color],
        timeout: 3000,
      });
    },

    deleteLike(id) {
      fetch(`${apiDomain}/api/deleteLike/${id}`, {
        method: "delete",
      })
        .then((res) => res.json())
        .then((data) => {
          this.fetchPacksSearch(
            this.$route.query.ville_id,
            this.$route.query.date_deb
          );
        })

        .catch((err) => console.log(err));
    },

    deleteDisLike(id) {
      fetch(`${apiDomain}/api/deleteDisLike/${id}`, {
        method: "delete",
      })
        .then((res) => res.json())

        .then((data) => {
          this.fetchPacksSearch(
            this.$route.query.ville_id,
            this.$route.query.date_deb
          );
        })

        .catch((err) => console.log(err));
    },

    updatedLikeVerifTo_1(id) {
      fetch(`${apiDomain}/api/UpdatedLike/${id}`, {
        method: "delete",
      })
        .then((res) => res.json())
        .then((data) => {
          this.fetchPacksSearch(
            this.$route.query.ville_id,
            this.$route.query.date_deb
          );
        })

        .catch((err) => console.log(err));
    },

    updatedDisLikeVerifTo_0(id) {
      fetch(`${apiDomain}/api/UpdatedDisLike/${id}`, {
        method: "delete",
      })
        .then((res) => res.json())

        .then((data) => {
          this.fetchPacksSearch(
            this.$route.query.ville_id,
            this.$route.query.date_deb
          );
        })

        .catch((err) => console.log(err));
    },

    submitLike() {
      let formData = new FormData();

      formData.append("client_id", this.$store.state.user.id);
      formData.append("pack_id", this.detaille.id);

      axios
        .post(
          `${apiDomain}/api/addLike`,

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

          this.fetchPacksSearch(
            this.$route.query.ville_id,
            this.$route.query.date_deb
          );
        })

        .catch((error) => {
          console.log(error.response.data);
        });
    },

    submitDisLike() {
      let formData = new FormData();

      formData.append("client_id", this.$store.state.user.id);
      formData.append("pack_id", this.detaille.id);

      axios
        .post(
          `${apiDomain}/api/addDisLike`,

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
          this.fetchPacksSearch(
            this.$route.query.ville_id,
            this.$route.query.date_deb
          );
        })

        .catch((error) => {
          console.log(error.response.data);
        });
    },

    /* fin like */
    /* favorite */
    showEditModal(pack, index) {
      let obj = {
        id: pack.id_packss,
      };
      this.detaille = obj;
      this.showdetailleModale = true;
      this.index = index;
    },

    showdetaille(pack) {
      this.detaille = pack;
      this.showdetailleModale = true;
    },

    submitAddFav() {
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
          this.fetchPacksSearch(
            this.$route.query.ville_id,
            this.$route.query.date_deb
          );
        })

        .catch((error) => {
          console.log(error.response.data);
        });
    },

    /* fin favorite */
    /* moez */

    remove1ENF() {
      // this.nb_enfant = this.nb_enfant - 1;
      if (this.nb_enfant > 0 && this.nb_enfant >= this.agestab.length) {
        this.nb_enfant = this.nb_enfant - 1;
      } else {
        this.nb_enfant = this.nb_enfant - 0;
      }
    },

    add1ENF: function () {
      this.nb_enfant++;
    },

    add1AD: function () {
      this.nb_adulte++;
    },

    remove1AD() {
      if (this.nb_adulte > 1) {
        this.nb_adulte = this.nb_adulte - 1;
      } else {
        this.nb_adulte = this.nb_adulte - 0;
      }
    },

    loadCategories() {
      axios
        .get(`${apiDomain}/api/loadCategorie`, {
          params: _.omit(this.selected, "loadCategorie"),
        })
        .then((response) => {
          this.loadCategorie = response.data.categories;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    /* version 2 */
    setFilter(filter, option) {
      if (filter === "countries") {
        this.filters[filter][option] = !this.filters[filter][option];
      } else {
        setTimeout(() => {
          this.clearFilter(filter, option, this.filters[filter][option]);
        }, 100);
      }
    },

    slider: function () {
      if (this.valuesSlider[0] > this.valuesSlider[1]) {
        var tmp = this.valuesSlider[1];
        this.valuesSlider[0] = this.valuesSlider[0];
        this.valuesSlider[1] = tmp;
      }
    },
    /* moez */
    removeAge: function (index) {
      Vue.delete(this.agestab, index);
      this.nb_enfant = this.nb_enfant - 1;
    },
    addNewAge: function () {
      this.ages.push(Vue.util.extend({}, this.age));
    },
    updateNbEnfant(e) {
      this.seen = true;
      this.$store.commit("updateNbEnfant", e.target.value);
    },

    updateNbAdulte(e) {
      this.seen = true;
      // this.toggle = !this.toggle;
      this.$store.commit("updateNbAdulte", e.target.value);
    },
    /* fetchVilles() {
      axios
        .get(`${apiDomain}/api/villes`)
        .then(({ data }) => (this.villes = data));
    }, */

    fetchVilles() {
      axios
        .get(`${apiDomain}/api/allvillesTun`)
        .then(({ data }) => (this.villes = data.villes));
    },
    fetchPacksSearch(ville_id, date_deb) {
      axios
        .get(
          `${apiDomain}/api/searchPacks?ville_id=${this.$route.query.ville_id}&date_deb=${date_deb}&token=${this.$store.state.token}`
        )
        .then(({ data }) => (this.packs = data.packs));
    },

    fetchPacksSearch_not_token(ville_id, date_deb) {
      axios
        .get(
          `${apiDomain}/api/searchPacks_notToken?ville_id=${this.$route.query.ville_id}&date_deb=${date_deb}`
        )
        .then(({ data }) => (this.packs = data.packs));
    },
    fetchPaginate(page) {
      if (typeof page === "undefined") {
        page = 1;
      }
      let vm = this;
      fetch(
        `${apiDomain}/api/searchPacks?ville_id=${this.$route.query.ville_id}&date_deb=${this.$route.query.date_deb}&page=` +
          page
      )
        .then((res) => res.json())
        .then((data) => {
          this.packs = data.packs;
        })
        .catch((err) => console.log(err));
    },
  },

  /* version 2 */
};
</script>


<style>
.simple-range-slider
  .simple-range-slider-bg-bar
  .simple-range-slider-anchor[data-v-06329002] {
}
.simple-range-slider .simple-range-slider-merged-popover[data-v-06329002] {
  min-width: 128px !important;
}
.simple-range-slider .simple-range-slider-popover input[data-v-06329002] {
  width: 38px !important;

  height: 20px;
  border: none;
  outline: none;
  vertical-align: top;
  direction: ltr;
  padding: 0;
}
.vue-slider-process {
  background-color: #f0ad4e !important;
  border-radius: 15px;
}

.vue-slider {
  padding: 7px 13px 10px 13px !important;
}

.vue-slider-dot-tooltip-inner {
  background-color: #f0ad4e !important;
  border-color: #f0ad4e !important;
}
.vue-slider-rail {
  position: relative !important;
  width: 92% !important;
  height: 8px !important;
  margin-left: 11px !important;
}
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  opacity: 1;
}
</style>
<style lang="scss" scoped>
table,
th,
td {
  border: 1px solid #bfbfbf;
  border-radius: 5px;
}

.text {
  max-width: 800px;
  border-radius: 24px 0px 24px 0px;
  padding: 12px;
  display: inline-block;
  background: #ffa282;
}

.app-content {
  padding: 1px 15px;
}

/* version 2 */
.content {
  position: relative;
  font-family: "Nunito", sans-serif;
  font-weight: 300;
  color: #222a42;
  max-width: 780px;
  margin: 0 auto;

  &__list {
    position: relative;
    margin-top: 1rem;
    padding-right: 1rem;
    padding-bottom: 5rem;
    backface-visibility: hidden;
  }
}

.company__info[data-v-41a1917c] {
  /* padding: 0 0.75rem; */

  text-align: center;
}

.company__info[data-v-41a1917c] {
  padding: 0 0rem;
  text-align: center;
}

.company {
  position: relative;
  width: calc(326% / 2 - 1rem);
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 1rem;
  //padding: 0.5px 0.5px 0.5px 0.5px !important;
  margin-top: 1rem;
  padding-top: 0.7rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  border-radius: 10px 0px 10px 0px;
  background-color: white;
  box-shadow: 0 0 0 1px #222a42;
  backface-visibility: hidden;
  transform-origin: 10% 50%;
  z-index: 1;
}

.tab {
  margin-right: -15px;
  //box-shadow: 0 0 0 1px #222A42 !important;
}

.company[data-v-41a1917c] {
  width: calc(295% / 3 - 1rem);
}

/* .app-content[data-v-41a1917c] {
  padding: 10px 15px;
} */
.table {
  width: 100%;
  margin-bottom: 1rem;
  color: #dcdde1 !important;
  box-shadow: 0 0 0 0px #dcdde1 !important;
}

.company__details[data-v-41a1917c] {
  display: -webkit-box;
  display: -ms-flexbox;

  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  margin-top: 1.5rem;
  padding: 0.5rem 0.75rem;
  background-color: rgba(197, 208, 209, 0.1);
  border-top: 1px solid #c5d0d1;
} /* display: flex; */

.ty {
  background-color: #f97a52;
  border-radius: 0px 24px 2px 0px;
  /* padding-top: 0.5rem; */
  margin-top: -21px;
  color: white;
}

.typeAct {
  position: absolute;
  background: #222a42;
  opacity: 0.8;
  display: inline-block;
  padding: 0 10px;
  color: #fff;
  font-size: 13px;
  font-weight: 500;
  z-index: 1;
  margin-left: -0.9%;
  margin-top: 38.9%;
  height: 30px;
  line-height: 30px;
  border-top-right-radius: 15px;
}
.thumb-image img {
  display: block;
  padding: -80px;
  height: 41%;
  top: -198px;
  right: -6px;
  bottom: 0;
  left: -5px;
  position: absolute;
  margin: auto;
  min-width: 97%;
}
.typeActt {
  background: #f97a52;
  display: inline-block;
  opacity: 0.8;
  //padding: 0 10px;
  color: #fff;
  font-size: 13px;
  //font-weight: 500;
  z-index: 1;
  margin-left: -1.4% !important;
  margin-top: 38.5% !important;
  height: 30px;
  line-height: 30px;
  border-top-right-radius: 15px;
}

.typeAct[data-v-41a1917c] {
  position: absolute;
  background: #222a42;
  opacity: 0.8;
  display: inline-block;
  padding: 0 10px;
  color: #fff;
  font-size: 13px;
  font-weight: 500;
  z-index: 1;
  margin-left: -0.9%;
  margin-top: 36.5%;
  height: 30px;
  line-height: 30px;
  border-top-right-radius: 15px;
}
/* .bt {
  background: #e7653e;
  color: #ffffff;
} */

.bt {
  background: #e7653e;
  color: #ffffff;
  height: 38px;
  width: 113px;
  border-radius: 11px;
}
.bt:hover {
  background: #e7653e;
  color: #ffffff;
}

.company__name[data-v-41a1917c] {
  height: 3.5rem;
  margin: 0.75rem 0;
  font-size: 1rem;
  font-weight: 200;
  text-align: center;
}

a {
  color: #000;
}

.pluseAD {
  margin-top: 28px;
  left: -70px;
}

.moinsAD {
  margin-top: 46px;
  left: -180px;
}

.pluseENF {
  margin: -35px 78px -7px 38px;
  left: 188px;
}

.moinsENF {
  left: 190px;
  margin: 5px 66px 26px 37px;
}
.resFil {
  border-radius: 24px;
  padding: 12px;
  max-width: 800px;
  display: inline-block;
  background-color: #e4dfdb;
}

/* nz */
.feed {
  background: #f5f6fa;
  height: 100%;
  max-height: 864px;
  overflow: scroll;
}

.addLike_1 {
  margin-top: -3px;
  margin-left: -13px;
  font-size: 20px;
}

.addDisLike_1 {
  margin-top: -24px;
  margin-left: 24px;
  font-size: 20px;
}

.countLike {
  margin-top: -22px !important;
  margin-left: 24px !important;
  font-size: 15px;
}

.countDis {
  margin-top: -28px !important;
  margin-left: 24px;
  font-size: 15px;
}
</style>