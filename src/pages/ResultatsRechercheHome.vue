<template>
  <div>
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
        <div class="container container_home1 d-none d-lg-block">
          <!--Grid row-->
          <div class="row d-none d-lg-block" v-if="!toggle">
            <div class="col-md-8 offset-md-2"> 
              <!--Grid column-->

              <!--Grid column-->

              <!--web-->
              <div class="card style_card_rechereche d-none d-lg-block">
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
                              >Date d'arrivée
                            </label>
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
                          <div class="col-mx-1 mr-2">
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
                </div>
              </div>
              <!-- mobile -->
              <div
                style="margin-top: -20px !important"
                class="card style_card_rechereche d-lg-none"
              >
                <!--Card content-->
                <div class="card-body">
                  <!-- Form -->
                  <form name>
                    <div class="row">
                      <div class="col-sm-12 col-xs-3">
                        <div class="row">
                          <div class="col">
                            <label
                              style="
                                color: #000;
                                font-size: 13px;
                                font-weight: bold;
                              "
                              >Destination</label
                            >
                            <div class="form-group">
                              <select 
                                @change="toggle = !toggle"
                                class="form-control personalise1"
                                v-model="pack.ville_id"
                                name="ville_id"
                                style="background-color: #fff !important"
                              >
                                <option value disabled selected>
                                  choisissez votre destination
                                </option>
                                <option
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
                                font-size: 13px;
                                font-weight: bold;
                              "
                              >Date d'arrivée</label
                            >
                            <div class="form-group">
                              <VueDatePicker
                                class="form-control personalisedate"
                                @input="toggle = !toggle"
                                :minDate="new Date()"
                                v-model="pack.date_deb"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="row">
                          &nbsp; &nbsp; &nbsp;
                          <div class="col">
                            <label
                              style="
                                color: #000;
                                font-size: 13px;
                                font-weight: bold;
                              "
                              >Personnes</label
                            >
                            <div class="form-group">
                              <input
                                style="
                                  height: 44px !important;
                                  width: 100% !important;
                                "
                                aria-label="label"
                                class="personalise1"
                                v-on:input="updateNbAdulte"
                                type="number"
                                min="1"
                                name="nb_adulte"
                                required
                                v-model="nb_adulte"
                              />

                              
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col">
                            <label></label>
                            <button
                              @click="toggle = !toggle"
                              type="button"
                              class="btn btn-success"
                              style="
                                background-color: #17a2b8;
                                color: #fff;
                                margin-top: 15px !important;
                                left: 88px;
                              "
                            >
                              Modifier >
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                  <!-- Form -->
                </div>
              </div>
              <!-- fin mobile rechearche -->
            </div>
          </div>

          <div class="row d-none d-lg-block" v-if="toggle">
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
                          </div> -->
                          &nbsp; &nbsp; &nbsp;
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

    <!-- new new -->
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
                    <label style="color: #1a2b48; margin-left: 24px !important"
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
                      <div class="col">
                        <label
                          style="color: #1a2b48; margin-left: 24px !important;font-size: 13px;"
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
            <div>
              <center>
                <b class="resFil d-none d-lg-block">
                  Vous avez {{ filteredData.length }} packs trouvées de votre
                  recherche.
                </b>

                <b class="resFil d-lg-none">
                  {{ filteredData.length }} packs trouvées
                </b>
              </center>
            </div>

            <div class="row" v-if="packs && packs.length > 0">
              <div
                class="col-md-4 image-flip"
                v-for="(pack, k) in filteredData"
                :key="pack.id"
              >
                <div>
                  <main id="app" class="content">
                    <div name="company2" tag="ul" class="content__list">
                      <li class="company2">
                        <router-link
                          :to="{
                            name: 'DetailsPack',
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
                          <div class="thumb2-image company2__info">
                            <img loading="lazy"
                              class="img-fluid"
                              :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_packs/${pack.image_couverture}`"
                              alt="card image"
                            />
                          </div>
                        </router-link>
                        <div class="typeAct2">{{ pack.nom_activite }}</div>
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <!-- favorite mode connecter -->
                        <div v-if="loggedIn">
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
                          <!--  -->

                          <div v-if="pack.Favorite.length == 0">
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

                        <!-- fin fav mode connecter -->

                        <!-- favorite mode non connecter -->
                        <div v-if="!loggedIn">
                          <div>
                            <span>
                              <button
                                title=" Ajouter à vos favoris ?"
                                @click="
                                  showEditModal(pack, i);
                                  show = true;
                                "
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

                        <!-- fin fav mode non connecter -->
                        <b class="titre company2__name" style="color: black">
                          <div style="margin-left: -143px; margin-top: -5px">
                            <span
                              class="card-title"
                              style="color: #c37600"
                              v-if="
                                pack.date_deb <
                                new Date().toISOString().split('T')[0]
                              "
                            >
                              <span
                                class="badge badge-warning"
                                style="background-color: #ff4012"
                                >Pack expiré</span
                              >
                            </span>

                            <span
                              class="card-title"
                              style="color: #c37600"
                              v-else
                            >
                              <span
                                class="badge badge-success"
                                style="background-color: #28b351"
                                >Pack disponible</span
                              >
                            </span>
                          </div>
                          <!--   <br /> -->
                          <div v-if="loggedIn" class="row">
                            <!-- 1) #creation v if mech 3aml hata haja la like la dislike -->
                            <!-- original like & dislik -->
                            <div v-if="pack.Like.length == 0">
                              <div class="addLike_1">
                                <!-- <button
                                  @click="
                                    showEditModal(pack, i);
                                    show = true;
                                  "
                                  title="J'aime ce contenu"
                                  v-on:click="submitLike"
                                >-->
                                <!-- <i
                                  @click="
                                    showEditModal(pack, i);
                                    show = true;
                                  "
                                  title="J'aime ce contenu"
                                  v-on:click="submitLike"
                                  onmouseover="this.style.cursor='pointer'"
                                  style="color: #909090"
                                  class="fas fa-thumbs-up"
                                ></i> -->

                                <img loading="lazy"
                                  @click="
                                    showEditModal(pack, i);
                                    show = true;
                                  "
                                  title="J'aime ce contenu"
                                  v-on:click="submitLike"
                                  onmouseover="this.style.cursor='pointer'"
                                  src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-like-feedback-those-icons-lineal-those-icons.png"
                                />

                                <!--  </button> -->
                                <div class="countLike">
                                  {{ pack.countlike.length }}
                                </div>
                              </div>
                              <!--  -->

                              <div class="addDisLike_1">
                                <!-- <button
                                  title="Je n'aime pas ce contenu"
                                  @click="
                                    showEditModal(pack, i);
                                    show = true;
                                  "
                                  v-on:click="submitDisLike"
                                >-->
                                <!-- <i
                                  title="Je n'aime pas ce contenu"
                                  @click="
                                    showEditModal(pack, i);
                                    show = true;
                                  "
                                  onmouseover="this.style.cursor='pointer'"
                                  v-on:click="submitDisLike"
                                  style="color: #909090"
                                  class="fa fa-thumbs-down"
                                  aria-hidden="true"
                                ></i> -->

                                <img loading="lazy"
                                  title="Je n'aime pas ce contenu"
                                  style="margin-top: -10px"
                                  @click="
                                    showEditModal(pack, i);
                                    show = true;
                                  "
                                  onmouseover="this.style.cursor='pointer'"
                                  v-on:click="submitDisLike"
                                  aria-hidden="true"
                                  src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-dislike-feedback-those-icons-lineal-those-icons.png"
                                />
                                <!-- </button> -->
                                <div class="countDis">
                                  {{ pack.countdislike.length }}
                                </div>
                              </div>
                            </div>
                            <!-- 2) #update v if  3aml  like  -->
                            <!-- original like & dislik -->
                            <div
                              v-show="Object.keys(pack.Like).length > 0"
                              v-for="(like, index) in pack.Like"
                              :key="like.id"
                            >
                              <div v-if="like.verif == 0">
                                <!--if verif :0 yaa3ni 3aml deja j'aime  -->

                                <div class="addLike_1">
                                  <!--  <button
                                    @click="
                                      deleteLike(like.id);
                                      notifyVue('bottom', 'center');
                                    "
                                    title="je n'aime plus"
                                  >-->
                                  <!-- dislike -->
                                  <!-- <i
                                    @click="
                                      deleteLike(like.id);
                                      notifyVue('bottom', 'center');
                                    "
                                    title="je n'aime plus"
                                    onmouseover="this.style.cursor='pointer'"
                                    style="color: #2b60de"
                                    class="fas fa-thumbs-up"
                                  ></i> -->

                                  <img loading="lazy"
                                    @click="
                                      deleteLike(like.id);
                                      notifyVue('bottom', 'center');
                                    "
                                    title="je n'aime plus"
                                    v-on:click="submitLike"
                                    onmouseover="this.style.cursor='pointer'"
                                    src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-like-feedback-those-icons-lineal-those-icons.png"
                                  />
                                  <!--  </button> -->
                                  <div class="countLike">
                                    {{ pack.countlike.length }}
                                  </div>
                                </div>
                                <!--  -->

                                <div class="addDisLike_1">
                                  <!-- <button
                                    title="Je n'aime pas ce contenu"
                                    @click="
                                      showEditModal(pack, index);
                                      show = true;
                                    "
                                    v-on:click="updatedLikeVerifTo_1(like.id)"
                                  >-->
                                  <!-- <i
                                    title="Je n'aime pas ce contenu"
                                    @click="
                                      showEditModal(pack, index);
                                      show = true;
                                    "
                                    v-on:click="updatedLikeVerifTo_1(like.id)"
                                    onmouseover="this.style.cursor='pointer'"
                                    style="color: #909090"
                                    class="fa fa-thumbs-down"
                                    aria-hidden="true"
                                  ></i> -->

                                  <img loading="lazy"
                                    title="Je n'aime pas ce contenu"
                                    style="margin-top: -10px"
                                    @click="
                                      showEditModal(pack, index);
                                      show = true;
                                    "
                                    v-on:click="updatedLikeVerifTo_1(like.id)"
                                    onmouseover="this.style.cursor='pointer'"
                                    aria-hidden="true"
                                    src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-dislike-feedback-those-icons-lineal-those-icons.png"
                                  />
                                  <!--  </button> -->
                                  <div class="countDis">
                                    {{ pack.countdislike.length }}
                                  </div>
                                </div>
                              </div>

                              <!-- if gouwa deja 3aml dislike -->
                              <div v-if="like.verif == 1">
                                <!--if verif :0 yaa3ni 3aml deja j'aime  -->

                                <div class="addLike_1">
                                  <!--   <button
                                    @click="
                                      showEditModal(pack, i);
                                      show = true;
                                    "
                                    v-on:click="
                                      updatedDisLikeVerifTo_0(like.id)
                                    "
                                    title="J'aime ce contenu"
                                  >-->
                                  <!--  <i
                                    @click="
                                      showEditModal(pack, i);
                                      show = true;
                                    "
                                    v-on:click="
                                      updatedDisLikeVerifTo_0(like.id)
                                    "
                                    title="J'aime ce contenu"
                                    onmouseover="this.style.cursor='pointer'"
                                    style="color: #909090"
                                    class="fas fa-thumbs-up"
                                  ></i> -->

                                  <img loading="lazy"
                                    @click="
                                      showEditModal(pack, i);
                                      show = true;
                                    "
                                    v-on:click="
                                      updatedDisLikeVerifTo_0(like.id)
                                    "
                                    title="J'aime ce contenu"
                                    onmouseover="this.style.cursor='pointer'"
                                    src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-like-feedback-those-icons-lineal-those-icons.png"
                                  />
                                  <!--   </button> -->
                                  <div class="countLike">
                                    {{ pack.countlike.length }}
                                  </div>
                                </div>
                                <!--  -->

                                <div class="addDisLike_1">
                                  <!--    <button
                                    title="Je n'aime pas ce contenu"
                                    @click="
                                      showEditModal(pack, i);
                                      show = true;
                                    "
                                    v-on:click="
                                      deleteDisLike(like.id);
                                      notifyAimePAs('bottom', 'center');
                                    "
                                  >-->
                                  <!-- <i
                                    title="Je n'aime pas ce contenu"
                                    @click="
                                      showEditModal(pack, i);
                                      show = true;
                                    "
                                    v-on:click="
                                      deleteDisLike(like.id);
                                      notifyAimePAs('bottom', 'center');
                                    "
                                    onmouseover="this.style.cursor='pointer'"
                                    style="color: #2b60de"
                                    class="fa fa-thumbs-down"
                                    aria-hidden="true"
                                  ></i> -->

                                  <img loading="lazy"
                                    title="Je n'aime pas ce contenu"
                                    style="margin-top: -10px"
                                    @click="
                                      showEditModal(pack, i);
                                      show = true;
                                    "
                                    v-on:click="
                                      deleteDisLike(like.id);
                                      notifyAimePAs('bottom', 'center');
                                    "
                                    onmouseover="this.style.cursor='pointer'"
                                    aria-hidden="true"
                                    src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-dislike-feedback-those-icons-lineal-those-icons.png"
                                  />
                                  <!--  </button> -->
                                  <div class="countDis">
                                    {{ pack.countdislike.length }}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="row" v-if="!loggedIn">
                            <!-- 1) #creation v if mech 3aml hata haja la like la dislike -->
                            <!-- original like & dislik -->
                            <div>
                              <div class="addLike_1">
                                <!-- <button
                                  @click="
                                    showEditModal(pack, i);
                                    show = true;
                                  "
                                  title="J'aime ce contenu"
                                  v-on:click="submitLike"
                                >-->
                                <!-- <i
                                  @click="
                                    showEditModal(pack, i);
                                    show = true;
                                  "
                                  title="J'aime ce contenu"
                                  v-on:click="submitLike"
                                  onmouseover="this.style.cursor='pointer'"
                                  style="color: #909090"
                                  class="fas fa-thumbs-up"
                                ></i> -->

                                <img loading="lazy"
                                  @click="
                                    showEditModal(pack, i);
                                    show = true;
                                  "
                                  title="J'aime ce contenu"
                                  v-on:click="submitLike"
                                  onmouseover="this.style.cursor='pointer'"
                                  src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-like-feedback-those-icons-lineal-those-icons.png"
                                />

                                <!--  </button> -->
                                <div class="countLike">
                                  {{ pack.countlike.length }}
                                </div>
                              </div>
                              <!--  -->

                              <div class="addDisLike_1">
                                <!-- <button
                                  title="Je n'aime pas ce contenu"
                                  @click="
                                    showEditModal(pack, i);
                                    show = true;
                                  "
                                  v-on:click="submitDisLike"
                                >-->
                                <!-- <i
                                  title="Je n'aime pas ce contenu"
                                  @click="
                                    showEditModal(pack, i);
                                    show = true;
                                  "
                                  onmouseover="this.style.cursor='pointer'"
                                  v-on:click="submitDisLike"
                                  style="color: #909090"
                                  class="fa fa-thumbs-down"
                                  aria-hidden="true"
                                ></i> -->

                                <img loading="lazy"
                                  title="Je n'aime pas ce contenu"
                                  style="margin-top: -10px"
                                  @click="
                                    showEditModal(pack, i);
                                    show = true;
                                  "
                                  v-on:click="submitDisLike"
                                  onmouseover="this.style.cursor='pointer'"
                                  aria-hidden="true"
                                  src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-dislike-feedback-those-icons-lineal-those-icons.png"
                                />
                                <!-- </button> -->
                                <div class="countDis">
                                  {{ pack.countdislike.length }}
                                </div>
                              </div>
                            </div>
                            <!-- 2) #update v if  3aml  like  -->
                            <!-- original like & dislik -->
                            <div
                              v-show="Object.keys(pack.Like).length > 0"
                              v-for="(like, index) in pack.Like"
                              :key="like.id"
                            >
                              <div v-if="like.verif == 0">
                                <!--if verif :0 yaa3ni 3aml deja j'aime  -->

                                <div class="addLike_1">
                                  <!--  <button
                                    @click="
                                      deleteLike(like.id);
                                      notifyVue('bottom', 'center');
                                    "
                                    title="je n'aime plus"
                                  >-->
                                  <!-- dislike -->
                                  <!-- <i
                                    @click="
                                      deleteLike(like.id);
                                      notifyVue('bottom', 'center');
                                    "
                                    title="je n'aime plus"
                                    onmouseover="this.style.cursor='pointer'"
                                    style="color: #2b60de"
                                    class="fas fa-thumbs-up"
                                  ></i> -->

                                  <img loading="lazy"
                                    @click="
                                      deleteLike(like.id);
                                      notifyVue('bottom', 'center');
                                    "
                                    title="je n'aime plus"
                                    onmouseover="this.style.cursor='pointer'"
                                    src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-like-feedback-those-icons-lineal-those-icons.png"
                                  />
                                  <!--  </button> -->
                                  <div class="countLike">
                                    {{ pack.countlike.length }}
                                  </div>
                                </div>
                                <!--  -->

                                <div class="addDisLike_1">
                                  <!-- <button
                                    title="Je n'aime pas ce contenu"
                                    @click="
                                      showEditModal(pack, index);
                                      show = true;
                                    "
                                    v-on:click="updatedLikeVerifTo_1(like.id)"
                                  >-->
                                  <!-- <i
                                    title="Je n'aime pas ce contenu"
                                    @click="
                                      showEditModal(pack, index);
                                      show = true;
                                    "
                                    v-on:click="updatedLikeVerifTo_1(like.id)"
                                    onmouseover="this.style.cursor='pointer'"
                                    style="color: #909090"
                                    class="fa fa-thumbs-down"
                                    aria-hidden="true"
                                  ></i> -->

                                  <img loading="lazy"
                                    title="Je n'aime pas ce contenu"
                                    style="margin-top: -10px"
                                    @click="
                                      showEditModal(pack, index);
                                      show = true;
                                    "
                                    v-on:click="updatedLikeVerifTo_1(like.id)"
                                    onmouseover="this.style.cursor='pointer'"
                                    aria-hidden="true"
                                    src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-dislike-feedback-those-icons-lineal-those-icons.png"
                                  />
                                  <!--  </button> -->
                                  <div class="countDis">
                                    {{ pack.countdislike.length }}
                                  </div>
                                </div>
                              </div>

                              <!-- if gouwa deja 3aml dislike -->
                              <div v-if="like.verif == 1">
                                <!--if verif :0 yaa3ni 3aml deja j'aime  -->

                                <div class="addLike_1">
                                  <!--   <button
                                    @click="
                                      showEditModal(pack, i);
                                      show = true;
                                    "
                                    v-on:click="
                                      updatedDisLikeVerifTo_0(like.id)
                                    "
                                    title="J'aime ce contenu"
                                  >-->
                                  <!-- <i
                                    @click="
                                      showEditModal(pack, i);
                                      show = true;
                                    "
                                    v-on:click="
                                      updatedDisLikeVerifTo_0(like.id)
                                    "
                                    title="J'aime ce contenu"
                                    onmouseover="this.style.cursor='pointer'"
                                    style="color: #909090"
                                    class="fas fa-thumbs-up"
                                  ></i> -->

                                  <img loading="lazy"
                                    @click="
                                      showEditModal(pack, i);
                                      show = true;
                                    "
                                    v-on:click="
                                      updatedDisLikeVerifTo_0(like.id)
                                    "
                                    title="J'aime ce contenu"
                                    onmouseover="this.style.cursor='pointer'"
                                    src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-like-feedback-those-icons-lineal-those-icons.png"
                                  />
                                  <!--   </button> -->
                                  <div class="countLike">
                                    {{ pack.countlike.length }}
                                  </div>
                                </div>
                                <!--  -->

                                <div class="addDisLike_1">
                                  <!--    <button
                                    title="Je n'aime pas ce contenu"
                                    @click="
                                      showEditModal(pack, i);
                                      show = true;
                                    "
                                    v-on:click="
                                      deleteDisLike(like.id);
                                      notifyAimePAs('bottom', 'center');
                                    "
                                  >-->
                                  <!-- <i
                                    title="Je n'aime pas ce contenu"
                                    @click="
                                      showEditModal(pack, i);
                                      show = true;
                                    "
                                    v-on:click="
                                      deleteDisLike(like.id);
                                      notifyAimePAs('bottom', 'center');
                                    "
                                    onmouseover="this.style.cursor='pointer'"
                                    style="color: #2b60de"
                                    class="fa fa-thumbs-down"
                                    aria-hidden="true"
                                  ></i> -->

                                  <img loading="lazy"
                                    title="Je n'aime pas ce contenu"
                                    style="margin-top: -10px"
                                    @click="
                                      showEditModal(pack, i);
                                      show = true;
                                    "
                                    v-on:click="
                                      deleteDisLike(like.id);
                                      notifyAimePAs('bottom', 'center');
                                    "
                                    onmouseover="this.style.cursor='pointer'"
                                    aria-hidden="true"
                                    src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-dislike-feedback-those-icons-lineal-those-icons.png"
                                  />
                                  <!--  </button> -->
                                  <div class="countDis">
                                    {{ pack.countdislike.length }}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <!-- <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="24"
                            height="24"
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
                                  d="M148.70833,43c-4.94755,0 -8.95833,4.01078 -8.95833,8.95833c0,4.94755 4.01078,8.95833 8.95833,8.95833c4.94755,0 8.95833,-4.01078 8.95833,-8.95833c0,-4.94755 -4.01078,-8.95833 -8.95833,-8.95833zM19.70833,46.58333c-1.93842,-0.02741 -3.74144,0.99102 -4.71865,2.66532c-0.97721,1.6743 -0.97721,3.74507 0,5.41937c0.97721,1.6743 2.78023,2.69273 4.71865,2.66532h103.91667c1.93842,0.02741 3.74144,-0.99102 4.71865,-2.66532c0.97721,-1.6743 0.97721,-3.74507 0,-5.41937c-0.97721,-1.6743 -2.78023,-2.69273 -4.71865,-2.66532zM148.70833,78.83333c-4.94755,0 -8.95833,4.01078 -8.95833,8.95833c0,4.94755 4.01078,8.95833 8.95833,8.95833c4.94755,0 8.95833,-4.01078 8.95833,-8.95833c0,-4.94755 -4.01078,-8.95833 -8.95833,-8.95833zM19.70833,82.41667c-1.93842,-0.02741 -3.74144,0.99102 -4.71865,2.66532c-0.97721,1.6743 -0.97721,3.74507 0,5.41937c0.97721,1.6743 2.78023,2.69273 4.71865,2.66532h103.91667c1.93842,0.02741 3.74144,-0.99102 4.71865,-2.66532c0.97721,-1.6743 0.97721,-3.74507 0,-5.41937c-0.97721,-1.6743 -2.78023,-2.69273 -4.71865,-2.66532zM148.70833,114.66667c-4.94755,0 -8.95833,4.01078 -8.95833,8.95833c0,4.94755 4.01078,8.95833 8.95833,8.95833c4.94755,0 8.95833,-4.01078 8.95833,-8.95833c0,-4.94755 -4.01078,-8.95833 -8.95833,-8.95833zM19.70833,118.25c-1.93842,-0.02741 -3.74144,0.99102 -4.71865,2.66532c-0.97721,1.6743 -0.97721,3.74507 0,5.41937c0.97721,1.6743 2.78023,2.69273 4.71865,2.66532h103.91667c1.93842,0.02741 3.74144,-0.99102 4.71865,-2.66532c0.97721,-1.6743 0.97721,-3.74507 0,-5.41937c-0.97721,-1.6743 -2.78023,-2.69273 -4.71865,-2.66532z"
                                />
                              </g>
                            </g>
                          </svg> 

                          <!-- titre & like & dislike -->
                          <span style="font-weight: 600; line-height: 25px">
                            {{ pack.titre }}</span
                          >
                          <div>
                            <img loading="lazy"
                              src="date-deb-etnafes.png"
                              class="image_date_debu_a_date_fin"
                            />
                            {{ pack.date_deb }} - {{ pack.time }}
                          </div>
                        </b>
                        <center>
                          <router-link
                            class="btn btn-warning style_btn"
                            :to="{
                              name: 'DetailsPack',
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
                            <span>+Détails</span>
                          </router-link>

                          <!-- like -->
                        </center>

                        <center>
                          <span>
                            <b>
                              <span
                                class="
                                  prix_person_res_rech_home
                                  company2__details
                                "
                              >
                                <span
                                  class="company2__data"
                                  title="Prix total"
                                  v-if="agestab != undefined"
                                >
                                  <img loading="lazy"
                                    src="https://img.icons8.com/ios-filled/20/000000/flash-on.png"
                                  />

                                  <span v-if="agestab.length > 0">
                                    {{
                                      (
                                        Number(nb_adulte) * pack.prix_fix +
                                        calcul[k]
                                      ).toFixed(2)
                                    }}
                                    DT
                                  </span>

                                  <span v-else>
                                    {{
                                      (
                                        Number(nb_adulte) * pack.prix_fix
                                      ).toFixed(2)
                                    }}
                                    DT
                                  </span>
                                </span>
                                &nbsp;
                                <span
                                  class="company2__data"
                                  title="Nombres des personnes"
                                >
                                  <!-- <img loading="lazy"
                                    src="/etnaffes-tn-personne.png"
                                    width="11%"
                                  /> -->
                                  <img loading="lazy"
                                    src="https://img.icons8.com/ios-filled/20/000000/group-foreground-selected.png"
                                  />

                                  {{ pack.nb_place_max }}
                                </span>
                                &nbsp;
                                <span title="Niveau d'activités physique">
                                  <!-- <img loading="lazy"
                                    src="/etnafess-tn-type-activite.png"
                                    width="10%"
                                  /> -->
                                  <img loading="lazy"
                                    src="https://img.icons8.com/ios-filled/20/000000/activity.png"
                                  />
                                  &nbsp;{{ pack.adrenaline }}
                                </span>
                              </span>
                            </b>
                          </span>
                        </center>
                      </li>
                    </div>
                  </main>
                </div>
              </div>
            </div>
          </div>
          <pagination
            :data="packs"
            @pagination-change-page="fetchPaginate"
          ></pagination>
        </div>
      </div>
      <div style="padding-top: 70px; padding-bottom: 40px" v-else>
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
    </div>

    <!-- moez -->
    <!-- new new -->

    <Footer></Footer>
  </div>
</template>
<style>
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
import Vue from "vue";
import { VueDatePicker } from "@mathieustan/vue-datepicker";
import axios from "axios";
import TopNavbarHome from "./Layout/TopNavbarHome.vue";
import Footer from "./Layout/Footer.vue";
import { apiDomain } from "../config";
import NotificationTemplate from "./Notifications/NotificationTemplate";
import DatePicker from "vue2-datepicker";
export default {
  components: {
    DatePicker,
    VueDatePicker,
    TopNavbarHome,
    VueSlider,
    Footer,
  },
  data() {
    return {
      visible: false,
      visible2: false,
      visible3: false,

      myItems: [
        {
          title: "How long is a day and year on Venus?",
          value:
            "Venus takes 224.7 Earth days to complete one orbit around the Sun.",
          category: "Tab-2",
        },
        {
          title: "What animal smells like popcorn?",
          value: "Binturongs smell like popcorn.",
          category: "Tab-2",
        },
      ],
      text: `
          moez,
        `,
      /* favorite */
      show: false,
      showdetailleModale: false,
      detaille: {
        id: "",
      },
      index: -1,
      /* fin favorite */
      min: 0,
      max: 0,
      pagination: {},
      nom_activite: "",
      //nom_activite: {},
      adrenaline: "",
      //agestab: [],
      loadCategorie: [],
      selected: {
        loadCategorie: [],
      },

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
      nb_adulte: 1,
      nb_enfant: "0",
      agestab: this.$route.query.ages ? this.$route.query.ages : [],

      packs: { price: "" },
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
    loggedIn() {
      return this.$store.getters.get_loggedIn;
    },

    user() {
      return this.$store.getters.get_user;
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
      // return [min.prix_fix * nbA + result, max.prix_fix * nbA];
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
  },
  created() {
    if (this.loggedIn) {
      this.fetchPacksSearchWithToken(this.$route.query.search);
    }
    if (!this.loggedIn) {
      this.fetchPacksSearch(this.$route.query.search);
    }
    this.scrollToTop();

    this.fetchVilles();
    // this.convert();
  },

  methods: {
    scrollToTop() {
    window.scrollTo(0,0);
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
          this.fetchPacksSearchWithToken(this.$route.query.search);
        })

        .catch((err) => console.log(err));
    },

    deleteDisLike(id) {
      fetch(`${apiDomain}/api/deleteDisLike/${id}`, {
        method: "delete",
      })
        .then((res) => res.json())

        .then((data) => {
          this.fetchPacksSearchWithToken(this.$route.query.search);
        })

        .catch((err) => console.log(err));
    },

    updatedLikeVerifTo_1(id) {
      fetch(`${apiDomain}/api/UpdatedLike/${id}`, {
        method: "delete",
      })
        .then((res) => res.json())
        .then((data) => {
          this.fetchPacksSearchWithToken(this.$route.query.search);
        })

        .catch((err) => console.log(err));
    },

    updatedDisLikeVerifTo_0(id) {
      fetch(`${apiDomain}/api/UpdatedDisLike/${id}`, {
        method: "delete",
      })
        .then((res) => res.json())

        .then((data) => {
          this.fetchPacksSearchWithToken(this.$route.query.search);
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
          this.fetchPacksSearchWithToken(this.$route.query.search);
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
          this.fetchPacksSearchWithToken(this.$route.query.search);
        })

        .catch((error) => {
          console.log(error.response.data);
        });
    },

    /* fin like */
    /* favorite */
    showEditModal(pack, index) {
      let obj = {
        id: pack.id,
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
          this.fetchPacksSearchWithToken(this.$route.query.search);
        })

        .catch((error) => {
          console.log(error.response.data);
        });
    },

    /* fin favorite */

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
    removeAge: function (index) {
      Vue.delete(this.agestab, index);
      this.nb_enfant = this.nb_enfant - 1;
    },
    /* convert: function() {
      this.agestab = this.ages.split(",");
    }, */
    addNewAge: function () {
      this.ages.push(Vue.util.extend({}, this.age));
    },
    updateNbEnfant(e) {
      this.seen = true;
      v;
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

    makePagination(data) {
      let pagination = {
        current_page: data.packs.current_page,
        last_page: data.packs.last_page,
        next_page_url: data.packs.next_page_url,
        prev_page_url: data.packs.prev_page_url,
        from_page: data.packs.from,
        to_page: data.packs.to,
      };
      this.pagination = pagination;
    },

    fetchPacksSearchWithToken(search) {
      axios
        .get(
          `${apiDomain}/api/searchP?search=${this.$route.query.search}&token=${this.$store.state.token}`
        )
        .then(({ data }) => (this.packs = data.packs));
    },

    fetchPacksSearch(search) {
      axios
        .get(
          `${apiDomain}/api/searchPNotToken?search=${this.$route.query.search}`
        )
        .then(({ data }) => (this.packs = data.packs));
    },

    fetchPaginate(page) {
      if (typeof page === "undefined") {
        page = 1;
      }
      let vm = this;
      fetch(
        `${apiDomain}/api/searchPacksHome?search=${this.$route.query.search}&page=` +
          page
      )
        .then((res) => res.json())
        .then((data) => {
          this.packs = data.packs;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
<style lang="scss" scoped>
table,
th,
td {
  border: 1px solid #bfbfbf;
}

.text {
  max-width: 800px;
  border-radius: 24px 0px 24px 0px;
  padding: 12px;
  display: inline-block;
  background: #ffa282;
}

.app-content2 {
  padding: 40px 15px;
}

/* version 2 */
.content2 {
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

.company2__info[data-v-41a1917c] {
  /* padding: 0 0.75rem; */

  text-align: center;
}

.company2__info[data-v-41a1917c] {
  padding: 0 0rem;
  text-align: center;
}

.company2 {
  position: relative;
  width: calc(195% / 2 - 1rem);
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

.res {
  margin-left: 168px;
}
.tab {
  margin-right: -15px;
  //box-shadow: 0 0 0 1px #222A42 !important;
}

.app-content2[data-v-41a1917c] {
  padding: 10px 15px;
}
.table {
  width: 100%;
  margin-bottom: 1rem;
  color: #dcdde1 !important;
  box-shadow: 0 0 0 0px #dcdde1 !important;
}

.ty {
  background-color: #f97a52;
  border-radius: 0px 24px 2px 0px;
  /* padding-top: 0.5rem; */
  margin-top: -21px;
  color: white;
}

.thumb2-image img {
  display: block;
  padding: -80px;
  height: 43%;
  top: -192px;
  right: -4px;
  bottom: 0;
  left: -5px;
  position: absolute;
  margin: auto;
  min-width: 97%;
}
/* mooez responsive */
.typeAct2 {
  position: absolute;
  background: #222a42;
  opacity: 0.8;
  display: inline-block;
  padding: 0 10px;
  color: #fff;
  font-size: 13px;
  font-weight: 500;
  z-index: 1;
  margin-left: -1.4%;
  margin-top: 38.4%;
  height: 30px;
  line-height: 30px;
  border-top-right-radius: 15px;
  @media (min-width: 480px) and(max-width:768px) {
    position: absolute;
    background: #222a42;
    opacity: 0.8;
    display: inline-block;
    padding: 0 10px;
    color: #fff;
    font-size: 13px;
    font-weight: 500;
    z-index: 1;
    margin-left: -0%;
    margin-top: 25.7%;
    height: 30px;
    line-height: 30px;
    border-top-right-radius: 15px;
  }
}

.company2__details {
  display: -webkit-box;
  display: -ms-flexbox;

  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  margin-top: 1.5rem;
  padding: 0.5rem 0.75rem;
  background-color: rgba(197, 208, 209, 0.1);
  border-top: 1px solid #c5d0d1;

  @media (min-width: 480px) and(max-width:768px) {
    display: -webkit-box;
    display: -ms-flexbox;

    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    margin-top: 1.5rem;
    padding: 0.5rem 0.75rem;
    background-color: #fff;
    border-top: 1px solid #c5d0d1;
  }
}

/* fin  mooez responsive */

.style_btn {
  background: #e7653e;
  color: #ffffff;
  height: 38px;
  width: 113px;
  border-radius: 11px;
  /* new 06/3/06/2021 */

  /*   background: #e7653e;
  color: #ffffff;
  height: 38px;
  width: 81px;
  margin-left: -116px;
  border-radius: 11px; */
}
.style_btn:hover {
  background: #e7653e;
  color: #ffffff;
}

.company2__name {
  height: 3.5rem;
  margin: 0.75rem 0;
  font-size: 0.9rem;
  font-weight: 400;
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

.feed {
  background: #f5f6fa;
  height: 100%;
  max-height: 864px;
  overflow: scroll;
}

//ali

.btn.btn-icon2,
.navbar .navbar-nav > a.btn.btn-icon2 {
  height: 1.8rem;
  min-width: 1.8rem;
  width: 2.375rem;
  padding: 0;
  font-size: 0.9375rem;
  overflow: hidden;
  position: relative;
  line-height: normal;
}

.addDisLikeGrey {
  border-radius: 50% !important;
  position: absolute !important;
  font-size: 1em !important;
  top: 6% !important;

  -webkit-transform: translate(-12px, -12px) !important;
  transform: translate(-12px, -12px) !important;
  line-height: 1.5626rem !important;
  width: 24px !important;
  background: #fff !important;
}

.addDisLikeGrey:hover {
  border-radius: 50% !important;
  position: absolute !important;
  font-size: 1em !important;
  top: 6% !important;

  -webkit-transform: translate(-12px, -12px) !important;
  transform: translate(-12px, -12px) !important;
  line-height: 1.5626rem !important;
  width: 24px !important;
  background: #fff !important;
}

.addLike_1 {
  margin-top: -27px;
  margin-left: 78px;
  font-size: 20px;
}

.addDisLike_1 {
  margin-top: -24px;
  margin-left: 172px;
  font-size: 20px;
}

.countLike {
  margin-top: -22px !important;
  margin-left: 46px !important;
  font-size: 15px;
}

.countDis {
  margin-top: -28px !important;
  margin-left: 42px;
  font-size: 15px;
}
</style>