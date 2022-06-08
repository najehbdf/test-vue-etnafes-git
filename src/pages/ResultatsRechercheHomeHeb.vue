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
        <div class="container container_home1">
          <!--Grid row-->
          <div class="row d-none d-lg-block" v-if="!toggle">
            <div class="col-md-10 offset-md-1">
              <!--Grid column-->

              <!--Grid column-->

              <!--Card-->
              <div class="card style_card_rechereche">
                <!--Card content-->
                <div class="card-body" style="padding:6px !important">
                  <!-- Form -->
                  <form name>
                        <div class="row">
                          <div class="col-md-2 mr-5">
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
                                v-model="hebergement.ville_id"
                                name="ville_id"
                                style="background-color: #fff !important;    padding: 3px;font-size: 12px !important;
                                margin-left: 23px;"
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

                          <div class="col-md-2 mr-5">
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
                              v-model="hebergement.du"
                              required
                              valueType="format"
                              placeholder=" Quelle est votre date ?"
                              :disabled-date="disabledBeforeToday"
                            ></date-picker>
                            </div>

                            <!-- <div class="form-group">
                              <VueDatePicker
                                role="datepicker"
                                class="topAllinput"
                                :minDate="new Date()"
                                v-model="hebergement.du"
                                placeholder="Ajoutez une date"
                              />
                            </div> -->
                          </div>

                          <div class="col-md-2 mr-5">
                            <label
                              style="
                                color: #000;
                                font-size: 12px !important;
    
    font-weight: 800 !important;
    letter-spacing: 0.04em !important;
                              "
                              >Date de départ</label
                            >
                             <div style="margin-top: -11px !important;margin-left: -11px;">
                            <date-picker
                              :minDate="new Date(du)"
                                v-model="hebergement.au"
                              required
                              valueType="format"
                              placeholder=" Quelle est votre date ?"
                              :disabled-date="disabledBeforeToday"
                            ></date-picker>
                            </div>
                            <!-- <div class="form-group">
                              <VueDatePicker
                                role="datepicker"
                                class="topAllinput"
                                :minDate="new Date(du)"
                                v-model="hebergement.au"
                                placeholder="Ajoutez une date"
                              />
                            </div> -->
                          </div>
                          &nbsp; &nbsp; &nbsp;
                          <div class="col-mx-1">
                            <label
                            style="
                                color: #000;
                                font-size: 12px !important;
    
    font-weight: 800 !important;
    letter-spacing: 0.04em !important;"
                              >Adultes</label
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
                          &nbsp; &nbsp; &nbsp;
                          <div class="col-mx-1">
                            <label
                             style="
                                color: #000;
                                font-size: 12px !important;
    
    font-weight: 800 !important;
    letter-spacing: 0.04em !important;"
                              >Enfants</label
                            >
                             <vue-numeric-input
                                  style="
                                    position: relative !important;
                                    -webkit-box-sizing: border-box !important;
                                    box-sizing: border-box !important;
                                   
                                    width: 81px !important;
                                    margin-top: 1px !important;
                                  "
                                 v-model="nb_enfant"
                                  v-on:input="updateNbEnfant"
                                  :min="agestab != undefined ? agestab.length : 0"
                                  :step="1"
                                  name="nb_enfant"
                                  required
                                  size="small"
                                ></vue-numeric-input>
                          </div>
                          &nbsp; &nbsp; &nbsp;
                          <!-- <div class="col-mx-1" v-if="nb_enfant != 0">
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
                          </div> -->
                          &nbsp; &nbsp; &nbsp;
                          <div class="col-md-1">
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
          <div class="row d-none d-lg-block" v-if="toggle">
            <div class="col-md-10 offset-md-1">
              <div class="card style_card_rechereche">
                <div class="card-body" style="padding:6px !important">
                  <!-- Form -->
                  <form name>
                    <div class="row">             
                          <div class="col-md-2 mr-5">
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
                                class="v-select vs--single vs--searchable"
                                v-model="hebergement.ville_id"
                                name="ville_id"
                                style="background-color: #fff !important;    padding: 3px;font-size: 12px !important;
                                margin-left: 23px;"
                              >
                                <option value disabled selected>
                                  choisissez votre destination
                                </option>
                                <option
                                  v-for="ville in villes"
                                  v-bind:key="'vv' + ville.id"
                                  v-bind:value="ville.id"
                                >
                                  {{ ville.nom }}
                                </option>
                              </select>
                            </div>
                          </div>

                          <div class="col-md-2 mr-5">
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
                              v-model="hebergement.du"
                              required
                              valueType="format"
                              placeholder=" Quelle est votre date ?"
                              :disabled-date="disabledBeforeToday"
                            ></date-picker>
                            </div>
                          </div>

                          <div class="col-md-2 mr-5">
                            <label
                             style="
                                color: #000;
                                font-size: 12px !important;
 
    font-weight: 800 !important;
    letter-spacing: 0.04em !important;"
                              >Date de départ</label
                            >

                             <div style="margin-top: -11px !important;margin-left: -11px;">
                            <date-picker
                               v-model="hebergement.au"
                              required
                              :minDate="new Date(du)"
                              valueType="format"
                              placeholder=" Quelle est votre date ?"
                              :disabled-date="disabledBeforeToday"
                            ></date-picker>
                            </div>
                            <!-- <div class="form-group">
                              <VueDatePicker
                                role="datepicker"
                                class="topAllinput"
                                :minDate="new Date(du)"
                                v-model="hebergement.au"
                                placeholder="Ajoutez une date"
                              />
                            </div> -->
                          </div>
                          &nbsp; &nbsp; &nbsp;
                          <div class="col-mx-1">
                            <label
                             style="
                             color: #000;
                                font-size: 12px !important;
    font-weight: 800 !important;
                                   
                                    width: 81px !important;
                                    margin-top: 1px !important;
                                  "
                              >Adultes</label
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
                          &nbsp; &nbsp; &nbsp;
                          <div class="col-mx-1">
                            <label
                              style="
                              color: #000;
                                font-size: 12px !important;
    font-weight: 800 !important;
                                   
                                    width: 81px !important;
                                    margin-top: 1px !important;
                                  "
                              >Enfants</label
                            >
                             <vue-numeric-input
                                  style="
                                    position: relative !important;
                                    -webkit-box-sizing: border-box !important;
                                    box-sizing: border-box !important;
                                   
                                    width: 81px !important;
                                    margin-top: 1px !important;
                                  "
                                  v-on:input="updateNbEnfant"
:min="agestab != undefined ? agestab.length : 0" name="nb_enfant"
  required
v-model="nb_enfant"
                                  :step="1"
                                  size="small"
                                ></vue-numeric-input>
                          </div>
                          &nbsp; &nbsp; &nbsp;
                         
                          <div class="col-md-1">
                            <label></label>
                            <router-link
                              :to="{
                                name: 'ResultatsRechercheHebergement',
                                query: {
                                  ville_id: hebergement.ville_id,
                                  du: hebergement.date_deb,
                                  au: hebergement.au,

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
                                Rechercher >
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

          <!-- mobile responsive -->
          <div class="row d-lg-none" v-show="!toggle">
            <div class="col-md-12">
              
              <div class="card"  style="margin-bottom: 12px;">
                <!--Card content-->
                <div class="card-body" style="padding:11px !important">
                  <!-- Form -->
                  <form name>
                    <div class="row">            
                          <div class="col">
                            <label
                             style="color: #000;font-size: 12px !important;
    
    font-weight: 800 !important;
    letter-spacing: 0.04em !important;
                              "
                              >Destination</label
                            >
                            <div class="form-group">
                              <select
                                @change="toggle = !toggle"
                               class="v-select vs--single vs--searchable"
                                v-model="hebergement.ville_id"
                                name="ville_id"
                                style="background-color: #fff !important;    padding: 3px;font-size: 12px !important;"
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
                                font-size: 12px !important;
   margin-left: 30px;
    font-weight: 800 !important;
    letter-spacing: 0.04em !important;
                              "
                              >Date d'arrivée</label
                            >
                           
                            <div style="margin-top: -11px !important;margin-left: 20px;">
                            <date-picker
                              v-model="hebergement.date_deb"
                              required
                              valueType="format"
                              @input="toggle = !toggle"
                              placeholder="votre date ?"
                              :disabled-date="disabledBeforeToday"
                            ></date-picker>
                            </div>
                          </div> 

                               
                    </div>

                <div class="row">

                  <div class="col">
                            <label
                             style="
                                color: #000;
                                font-size: 12px !important;
   
    font-weight: 800 !important;
    letter-spacing: 0.04em !important;
                              "
                              >Date de départ</label
                            >

                            <div style="margin-top: -11px !important;margin-left: -11px;">
                            <date-picker
                              v-model="hebergement.au"
                              required
                              valueType="format"
                              @input="toggle = !toggle"
                              placeholder="votre date ?"
                              :disabled-date="disabledBeforeToday"
                            ></date-picker>
                            </div>
                          </div>   
                  
                  <div class="col">
                            <label
                              style="
                                color: #000;
                                font-size: 12px !important;
margin-left:30px;
    font-weight: 800 !important;
    letter-spacing: 0.04em !important;"
                              >Adultes</label
                            >
                            <vue-numeric-input
                                  style="
                                    position: relative !important;
                                    -webkit-box-sizing: border-box !important;
                                    box-sizing: border-box !important;
                                   margin-left:30px;
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
                         
                </div>

               <div class="row">
                  <div class="col">
                            <label
                              style="
                                color: #000;
                                font-size: 12px !important;
   
    font-weight: 800 !important;
    letter-spacing: 0.04em !important;"
                              >Enfants</label
                            >
                            <vue-numeric-input
                                  style="
                                    position: relative !important;
                                    -webkit-box-sizing: border-box !important;
                                    box-sizing: border-box !important;
                                   
                                    width: 81px !important;
                                    margin-top: 1px !important;
                                  "
                                 v-model="nb_enfant"
                                  v-on:input="updateNbEnfant"
                                  :min="agestab != undefined ? agestab.length : 0"
                                  :step="1"
                                  name="nb_enfant"
                                  required
                                  size="small"
                                ></vue-numeric-input>
                          </div>
                          <div class="col">
                            <label></label>
                            <button
                              @click="toggle = !toggle"
                              type="button"
                              class="btn"
                              style="
                                background-color: #222a42;
                                color: #fff;margin-left: 30px;
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
          <div class="row d-lg-none" v-show="toggle">
            <div class="col-md-12">
              <div class="card"  style="margin-bottom: 12px;">
                <div class="card-body" style="padding:11px !important">
                  <!-- Form -->
                  <form name>
                    <div class="row">
                       
                          <div class="col">
                            <label
                             style="
                                color: #000;font-size: 12px !important;
   
    font-weight: 800 !important;
    letter-spacing: 0.04em !important;
                              "
                              >Destination</label
                            >
                            <div class="form-group">
                              <select
                               class="v-select vs--single vs--searchable"
                                v-model="hebergement.ville_id"
                                name="ville_id"
                                 style="background-color: #fff !important;    padding: 3px;font-size: 12px !important;
                                "
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
                                font-size: 12px !important;
     margin-left: 30px;
    font-weight: 800 !important;
    letter-spacing: 0.04em !important;
                              "
                              >Date d'arrivée</label
                            >

                            <div style="margin-top: -11px !important;margin-left: 20px;">
                            <date-picker
                              v-model="hebergement.date_deb"
                              required
                              valueType="format"
                              @input="toggle = !toggle"
                              placeholder="votre date ?"
                              :disabled-date="disabledBeforeToday"
                            ></date-picker>
                            </div>
                            
                          </div>
                    </div>

                    <div class="row">
                      <div class="col">
                            <label
                              style="
                                color: #000;
                                font-size: 12px !important;

    font-weight: 800 !important;
    letter-spacing: 0.04em !important;"
                              >Date de départ</label
                            >

                             <div style="margin-top: -11px !important;margin-left: -11px;">
                            <date-picker
                               v-model="hebergement.au"
                              required
                              valueType="format"
                              @input="toggle = !toggle"
                              placeholder="votre date ?"
                              :disabled-date="disabledBeforeToday"
                            ></date-picker>
                            </div>
                          </div>
                          <div class="col">
                            <label
                              style="
                               color: #000;
                                font-size: 12px !important;
   
    font-weight: 800 !important;
    letter-spacing: 0.04em !important;
                                   margin-left:30px;
                                    width: 81px !important;
                                    margin-top: 1px !important;
                                  "
                              >Adultes</label
                            >
                          <vue-numeric-input
                                  style="
                                    position: relative !important;
                                    -webkit-box-sizing: border-box !important;
                                    box-sizing: border-box !important;
                                   margin-left:30px;
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
                    </div>

                   <div class="row">
                     <div class="col">
                            <label
                              style="
                              color: #000;
                                font-size: 12px !important;
   
    font-weight: 800 !important;
    letter-spacing: 0.04em !important;
                                   
                                    width: 81px !important;
                                    margin-top: 1px !important;
                                  "
                              >Enfants</label
                            >

                            <vue-numeric-input
                                  style="
                                    position: relative !important;
                                    -webkit-box-sizing: border-box !important;
                                    box-sizing: border-box !important;
                                   
                                    width: 81px !important;
                                    margin-top: 1px !important;
                                  "
                                  v-on:input="updateNbEnfant"
:min="agestab != undefined ? agestab.length : 0" name="nb_enfant"
  required
v-model="nb_enfant"
                                  :step="1"
                                  size="small"
                                ></vue-numeric-input>
                            
                          </div>
                          <div class="col">
                            <label></label>
                            <router-link
                              :to="{
                                name: 'ResultatsRechercheHebergement',
                                query: {
                                  ville_id: hebergement.ville_id,
                                  du: hebergement.date_deb,
                                  au: hebergement.au,
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
                                  margin-left:0px
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
      </div>
    </div>
    <br />

    <!-- new new -->
    <!-- moez -->

    <div class="container">
      <div class="row" v-if="hebergements.length > 0">
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
                class="app-contentt typeActivite mx-3 style_totADRL_rech_home"
              >
                <label style="color: #1a2b48">Catégorie</label>

                <div>
                  <p-radio
                    value="Cabanes"
                    v-model="categorie"
                    class="p-default p-curve"
                    name="color"
                    color="primary-o"
                    >Cabanes</p-radio
                  >
                  <br />
                  <p-radio
                    value="Centre de camping"
                    v-model="categorie"
                    class="p-default p-curve"
                    name="color"
                    color="success-o"
                    >Centre de camping</p-radio
                  >

                  <br />

                  <p-radio
                    value="Châteaux"
                    v-model="categorie"
                    class="p-default p-curve"
                    name="color"
                    color="danger-o"
                    >Châteaux</p-radio
                  >
                  <br />

                  <p-radio
                    value="Dômes"
                    v-model="categorie"
                    class="p-default p-curve"
                    name="color"
                    color="danger-o"
                    >Dômes</p-radio
                  >
                  <br />

                  <p-radio
                    value="Gite rural"
                    v-model="categorie"
                    class="p-default p-curve"
                    name="color"
                    color="danger-o"
                    >Gite rural</p-radio
                  >
                  <br />
                  <p-radio
                    value="Maison d'hôtes"
                    v-model="categorie"
                    class="p-default p-curve"
                    name="color"
                    color="danger-o"
                    >Maison d'hôtes</p-radio
                  >
                  <br />

                  <p-radio
                    value="Yourte"
                    v-model="categorie"
                    class="p-default p-curve"
                    name="color"
                    color="danger-o"
                    >Yourte</p-radio
                  >
                  <br />
                  <p-radio
                    value
                    v-model="categorie"
                    class="p-default p-curve"
                    name="color"
                    color="warning-o"
                    >Tous</p-radio
                  >
                  <br />
                </div>
              </div>

              <hr />
              <br />
              <div
                class="app-contentt typeActivite mx-3 style_totADRL_rech_home"
              >
                <label style="color: #1a2b48">Type de resérvation</label>

                <div>
                  <p-radio
                    value="Logement entier"
                    v-model="type"
                    class="p-default p-curve"
                    name="color"
                    color="primary-o"
                    >Logement entier</p-radio
                  >
                  <br />
                  <p-radio
                    value="par chambre"
                    v-model="type"
                    class="p-default p-curve"
                    name="color"
                    color="success-o"
                    >Par chambre</p-radio
                  >

                  <br />

                  <p-radio
                    value="par personne"
                    v-model="type"
                    class="p-default p-curve"
                    name="color"
                    color="danger-o"
                    >Par personne</p-radio
                  >
                  <br />

                  <p-radio
                    value
                    v-model="type"
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
                          style="
                            font-size: 13px;
                            color: #1a2b48;
                            margin-left: 7px !important;
                          "
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
                class="app-contentt typeActivite mx-3 style_totADRL_rech_home"
              >
                <div class="row">
                  <div class="col">
                    <label style="color: #1a2b48; font-size: 13px"
                      >Catégorie</label
                    >
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
                  <p-radio
                    value="Cabanes"
                    v-model="categorie"
                    class="p-default p-curve"
                    name="color1"
                    color="primary-o"
                    >Cabanes</p-radio
                  >
                  <br />
                  <p-radio
                    value="Centre de camping"
                    v-model="categorie"
                    class="p-default p-curve"
                    name="color1"
                    color="success-o"
                    >Centre de camping</p-radio
                  >

                  <br />

                  <p-radio
                    value="Châteaux"
                    v-model="categorie"
                    class="p-default p-curve"
                    name="color1"
                    color="danger-o"
                    >Châteaux</p-radio
                  >
                  <br />

                  <p-radio
                    value="Dômes"
                    v-model="categorie"
                    class="p-default p-curve"
                    name="color1"
                    color="danger-o"
                    >Dômes</p-radio
                  >
                  <br />

                  <p-radio
                    value="Gite rural"
                    v-model="categorie"
                    class="p-default p-curve"
                    name="color1"
                    color="danger-o"
                    >Gite rural</p-radio
                  >
                  <br />
                  <p-radio
                    value="Maison d'hôtes"
                    v-model="categorie"
                    class="p-default p-curve"
                    name="color1"
                    color="danger-o"
                    >Maison d'hôtes</p-radio
                  >
                  <br />

                  <p-radio
                    value="Yourte"
                    v-model="categorie"
                    class="p-default p-curve"
                    name="color1"
                    color="danger-o"
                    >Yourte</p-radio
                  >
                  <br />
                  <p-radio
                    value
                    v-model="categorie"
                    class="p-default p-curve"
                    name="color1"
                    color="warning-o"
                    >Tous</p-radio
                  >
                  <br />
                </b-collapse>
              </div>

              <hr />
              <br />
              <div
                class="app-contentt typeActivite mx-3 style_totADRL_rech_home"
              >
                <div class="row">
                  <div class="col">
                    <label style="color: #1a2b48; font-size: 13px"
                      >Type de resérvation</label
                    >
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
                  <p-radio
                    value="Logement entier"
                    v-model="type"
                    class="p-default p-curve"
                    name="color22"
                    color="primary-o"
                    >Logement entier</p-radio
                  >
                  <br />
                  <p-radio
                    value="par chambre"
                    v-model="type"
                    class="p-default p-curve"
                    name="color22"
                    color="success-o"
                    >Par chambre</p-radio
                  >

                  <br />

                  <p-radio
                    value="par personne"
                    v-model="type"
                    class="p-default p-curve"
                    name="color22"
                    color="danger-o"
                    >Par personne</p-radio
                  >
                  <br />

                  <p-radio
                    value
                    v-model="type"
                    class="p-default p-curve"
                    name="color22"
                    color="warning-o"
                    >Tous</p-radio
                  >
                  <br />
                </b-collapse>
              </div>
              <br />
            </tbody>
          </table>
        </div>

        <div class="col-md-9">
          <div>
            <b>
              Vous avez {{ filteredData.length }} hébergements trouvées de votre
              recherche.
            </b>
          </div>
          <hr />
          <div class="container feed" ref="feed">
            <!--  <div class="container feed" ref="feed"> -->

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
                    target="_blank"
                    :to="`/reservationhebergement/${pack.id}`"
                  >
                    <div class="card-img-wrap">
                      <img loading="lazy"
                        class="card-img imaa1"
                        :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_hebergement/${pack.image_couverture}`"
                        alt="Card image cap"
                      />

                      <div
                        class="top-left badge"
                        style="background-color: rgb(40, 179, 81)"
                      >
                        Disponible
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
                        {{ pack.categorie }}
                      </h4>
                    </div>
                  </router-link>
                  <!-- favorite mode connecter -->

                  <div v-if="loggedIn">
                    <div v-if="pack.Favoris_hebergement == 1">
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

                    <div v-if="pack.Favoris_hebergement == 0">
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
                    <div class="col-md-9">
                      <b style="margin-left: 7px; padding: 4px">
                        {{ pack.nom }}
                      </b>
                    </div>
                    <div class="col-md-3">
                      <div class="rowww" v-if="loggedIn">
                        <!-- 1) #creation v if mech 3aml hata haja la like la dislike -->
                        <!-- original like & dislik -->
                        <div v-if="pack.Like.length == 0">
                          <div class="addLike_111">
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
                            <div class="countLike11">
                              {{ pack.countlike.length }}
                            </div>
                          </div>
                          <!--  -->

                          <div class="addDisLike_11">
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
                              @click="
                                showEditModal(pack, i);
                                show = true;
                              "
                              onmouseover="this.style.cursor='pointer'"
                              v-on:click="submitDisLike"
                              src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-dislike-feedback-those-icons-lineal-those-icons.png"
                            />
                            <!-- </button> -->
                            <div class="countDis1">
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

                            <div class="addLike_111">
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
                              <div class="countLike11">
                                {{ Object.keys(pack.countlike).length }}
                              </div>
                            </div>
                            <!--  -->

                            <div class="addDisLike_11">
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
                                @click="
                                  showEditModal(pack, index);
                                  show = true;
                                "
                                v-on:click="updatedLikeVerifTo_1(like.id)"
                                onmouseover="this.style.cursor='pointer'"
                                src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-dislike-feedback-those-icons-lineal-those-icons.png"
                              />
                              <!--  </button> -->
                              <div class="countDis1">
                                {{ Object.keys(pack.countdislike).length }}
                              </div>
                            </div>
                          </div>

                          <!-- if gouwa deja 3aml dislike -->
                          <div v-if="like.verif == 1">
                            <!--if verif :0 yaa3ni 3aml deja j'aime  -->

                            <div class="addLike_111">
                              <!-- <i
                                @click="
                                  showEditModal(pack, i);
                                  show = true;
                                "
                                v-on:click="updatedDisLikeVerifTo_0(like.id)"
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
                                v-on:click="updatedDisLikeVerifTo_0(like.id)"
                                title="J'aime ce contenu"
                                onmouseover="this.style.cursor='pointer'"
                                src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-like-feedback-those-icons-lineal-those-icons.png"
                              />
                              <!--   </button> -->
                              <div class="countLike11">
                                {{ Object.keys(pack.countlike).length }}
                              </div>
                            </div>
                            <!--  -->

                            <div class="addDisLike_11">
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
                                @click="
                                  showEditModal(pack, i);
                                  show = true;
                                "
                                v-on:click="
                                  deleteDisLike(like.id);
                                  notifyAimePAs('bottom', 'center');
                                "
                                onmouseover="this.style.cursor='pointer'"
                                src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-dislike-feedback-those-icons-lineal-those-icons.png"
                              />
                              <!--  </button> -->
                              <div class="countDis1">
                                {{ Object.keys(pack.countdislike).length }}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="rowww" v-if="!loggedIn">
                        <!-- 1) #creation v if mech 3aml hata haja la like la dislike -->
                        <!-- original like & dislik -->
                        <div>
                          <div class="addLike_111">
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
                            <div
                              class="countLike11"
                              v-if="pack.countlike.length == 0"
                            >
                              {{ pack.countlike.length }}
                            </div>

                            <div
                              class="countLike11"
                              v-if="Object.keys(pack.countlike).length > 0"
                            >
                              {{ Object.keys(pack.countlike).length }}
                            </div>
                          </div>
                          <!--  -->

                          <div class="addDisLike_11">
                            <!--  <i
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
                              @click="
                                showEditModal(pack, i);
                                show = true;
                              "
                              v-on:click="submitDisLike"
                              onmouseover="this.style.cursor='pointer'"
                              src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-dislike-feedback-those-icons-lineal-those-icons.png"
                            />
                            <!-- </button> -->

                            <div
                              class="countDis1"
                              v-if="pack.countdislike.length == 0"
                            >
                              {{ pack.countdislike.length }}
                            </div>

                            <div
                              class="countDis1"
                              v-if="Object.keys(pack.countdislike).length > 0"
                            >
                              {{ Object.keys(pack.countdislike).length }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-12">
                      <p class="card-text">
                        <small
                          class="text-muted"
                          style="
                            color: #717171;
                            font-size: 13px;
                            font-weight: 400;
                          "
                        >
                          {{ pack.nbr_voyageurs }} voyageurs
                          <span>.</span>
                          <span v-if="pack.type == 'par chambre'">
                            {{ pack.nbr_chambre_dispo }} chambre(s)</span
                          >
                          <span>{{ pack.type }}</span>
                        </small>
                      </p>
                      <hr />
                      <p class="card-text">
                        <small>
                          <span v-if="pack.salle_de_bain == 1">
                            &nbsp;
                            <img loading="lazy"
                              v-b-tooltip.hover
                              title="Salle de bain"
                              src="bath-etnafes.png"
                            />
                            &nbsp;
                          </span>

                          <span v-if="pack.lave_linge == 1">
                            &nbsp;
                            <img loading="lazy"
                              v-b-tooltip.hover
                              title="Lave linge"
                              src="tumble-dry-etnafes.png"
                            />&nbsp;
                          </span>

                          <span v-if="pack.chauffage == 1">
                            &nbsp;
                            <img loading="lazy"
                              v-b-tooltip.hover
                              title="Chauffage"
                              src="heating-etnafes.png"
                            />&nbsp;
                          </span>
                          <span v-if="pack.television == 1">
                            &nbsp;
                            <img loading="lazy"
                              v-b-tooltip.hover
                              title="Television"
                              src="tv-etnafes.png"
                            />&nbsp;
                          </span>

                          <span v-if="pack.climatisation == 1">
                            &nbsp;
                            <img loading="lazy"
                              v-b-tooltip.hover
                              title="Climatisation"
                              src="air-conditioner-etnafes.png"
                            />&nbsp;
                          </span>

                          <span v-if="pack.eau_chaude == 1">
                            &nbsp;
                            <img loading="lazy"
                              v-b-tooltip.hover
                              title="Eau chaude"
                              src="water-heater-etnafes.png"
                            />&nbsp;
                          </span>

                          <span v-if="pack.espace_travail_ordinateur == 1">
                            &nbsp;
                            <img loading="lazy"
                              v-b-tooltip.hover
                              title="Espace de travail"
                              src="computer-etnafes.png"
                            />&nbsp;
                          </span>

                          <span v-if="pack.espace_enfant == 1">
                            &nbsp;
                            <img loading="lazy"
                              v-b-tooltip.hover
                              title="Espace enfant"
                              src="espace-enfant-etnafes.png"
                            />&nbsp;
                          </span>

                          <span v-if="pack.wifi == 1">
                            &nbsp;
                            <img loading="lazy"
                              v-b-tooltip.hover
                              title="WiFi"
                              src="wifi-etnafes.png"
                            />&nbsp;
                          </span>

                          <span v-if="pack.cuisine == 1">
                            &nbsp;
                            <img loading="lazy"
                              v-b-tooltip.hover
                              title="Cuisine"
                              src="kitchen-etnafes.png"
                            />&nbsp;
                          </span>
                        </small>
                      </p>
                    </div>
                  </div>

                  <div class="card-block">
                    <hr style="margin-top: 0rem; margin-bottom: 0rem" />
                    <!-- moez responsive -->
                    <div class="row row_res_rech">
                      <div class="col-mx-3 offset-1">
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
                                  >{{ Number(nb_adulte) * pack.prix_adulte }} DT
                                </b>
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
                                title="Nombres des personnes"
                                style="font-size: 12px"
                              >
                                <img loading="lazy"
                                  src="/etnaffes-tn-personne.png"
                                  class="image_resulatat_rech"
                                />
                                &nbsp;
                                <b>{{ pack.nbr_voyageurs }}</b>
                              </span>
                            </b>
                          </center>
                        </span>
                      </div>

                      <div class="col-mx-4">
                        <span>
                          <center>
                            <b>
                              <span title="Ville " style="font-size: 12px">
                                <img loading="lazy"
                                  src="/Etnafes-icon3.png"
                                  style="width: 12px"
                                />
                                &nbsp;
                                <b>{{ pack.ville.nom }}</b>
                              </span>
                            </b>
                          </center>
                        </span>
                      </div>
                    </div>

                    <!-- fin moez responsive  icon-square-pin -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="padding-top: 40px; padding-bottom: 40px" v-else>
        <center>
          <h3 style="color: #333">
            Aucun hébergement ne correspond pour le moment à cette recherche,
            veuillez consultez les hébergements disponibles sur le lien
            ci-dessous
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

              Nos Hébergements
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
    VueDatePicker,
    TopNavbarHome,
    VueSlider,
    Footer,
    DatePicker,

  },
  data() {
    return {
      /* favorite */
      visible: false,
      visible1: false,
      visible2: false,
      visible3: false,

      du: null,
      au: null,
      hebergement: {
        id: "",
        date_deb: this.$route.query.du,

        du: this.$route.query.du,
        au: this.$route.query.au,
        ville_id: this.$route.query.ville_id,
      },
      hebergements: { price: "", disponi: [] },

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
      categorie: "",
      type: "",

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
      const hebergements = this.hebergements;
      const agestab = this.agestab;
      var nbA = this.nb_adulte;
      var vm = this;
      const calcul = this.calcul;
      var result = [];
      var prixadulte = 0;
      var somme = 0;
      if (hebergements.length > 0) {
        for (var j = 0; j < hebergements.length; j++) {
          prixadulte = hebergements[j].prix_adulte * nbA;

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
      const hebergements = this.hebergements;
      const total = this.total;
      var filteredD = this.filteredD;
      var calcul = this.calcul;
      const agestab = this.agestab;
      return _.filter(vm.hebergements, function (data) {
        for (var a = 0; a < hebergements.length; a++) {
          var prix_total = total[a];
          hebergements[a].price = prix_total;
        }
        if (_.isNull(min) && _.isNull(max)) {
          return true;
        } else {
          var date = data.price;

          var result = [];
          if (hebergements.length > 0) {
            for (var a = 0; a < hebergements.length; a++) {
              var prix = date >= min && date <= max;
              var categorie = vm.categorie
                ? data.categorie == vm.categorie
                : true;
              var type = vm.type ? data.type == vm.type : true;
            }
          }
          // }
        } /* fin esle filter prix */

        return prix && categorie && type;
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
      const hebergements = this.hebergements;
      const agestab = this.agestab;
      var result = [];
      if (hebergements.length > 0) {
        for (var j = 0; j < hebergements.length; j++) {
          var somme = null;
          var sommeprixenfant4 = 0;
          var sommeprixenfant15 = 0;
          if (agestab != undefined) {
            for (var i = 0; i < agestab.length; i++) {
              if (agestab[i] <= 4) {
                sommeprixenfant4 += hebergements[j].prix_enfant;
              }
              if (agestab[i] > 4) {
                sommeprixenfant15 += hebergements[j].prix_enfant15;
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
      this.fetchHebergementSearch(this.$route.query.search);
    }
    if (!this.loggedIn) {
      this.fetchHebergementsSearch_not_token(this.$route.query.search);
    }

    this.scrollToTop();

    this.fetchVilles();
  },

  methods: {

    disabledBeforeToday(date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return date < today;
    },
    scrollToTop() {
      window.scrollTo(0, 0);
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
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        timeout: 3000,
      });
    },

    deleteLike(id) {
      fetch(`${apiDomain}/api/deleteLike/${id}`, {
        method: "delete",
      })
        .then((res) => res.json())
        .then((data) => {
          this.fetchHebergementSearch(this.$route.query.search);
        })

        .catch((err) => console.log(err));
    },

    deleteDisLike(id) {
      fetch(`${apiDomain}/api/deleteDisLike/${id}`, {
        method: "delete",
      })
        .then((res) => res.json())

        .then((data) => {
          this.fetchHebergementSearch(this.$route.query.search);
        })

        .catch((err) => console.log(err));
    },

    updatedLikeVerifTo_1(id) {
      fetch(`${apiDomain}/api/UpdatedLikeHebergement/${id}`, {
        method: "delete",
      })
        .then((res) => res.json())
        .then((data) => {
          this.fetchHebergementSearch(this.$route.query.ville_id);
        })
        .catch((err) => console.log(err));
    },

    updatedDisLikeVerifTo_0(id) {
      fetch(`${apiDomain}/api/UpdatedDisLikeHebergement/${id}`, {
        method: "delete",
      })
        .then((res) => res.json())
        .then((data) => {
          this.fetchHebergementSearch(this.$route.query.ville_id);
        })
        .catch((err) => console.log(err));
    },
    submitLike() {
      let formData = new FormData();
      formData.append("client_id", this.$store.state.user.id);
      formData.append("hebergement_id", this.detaille.id);
      axios
        .post(`${apiDomain}/api/addLikeHebergement`, formData, {
          body: JSON.stringify(this.annonce),
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          this.show = false;
          this.fetchHebergementSearch(this.$route.query.search);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },

    submitDisLike() {
      let formData = new FormData();
      formData.append("client_id", this.$store.state.user.id);
      formData.append("hebergement_id", this.detaille.id);
      axios
        .post(`${apiDomain}/api/addDisLikeHebergement`, formData, {
          body: JSON.stringify(this.annonce),
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          this.show = false;
          this.fetchHebergementSearch(this.$route.query.search);
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
      formData.append("hebergement_id", this.detaille.id);
      axios
        .post(`${apiDomain}/api/favoriteHebergement`, formData, {
          body: JSON.stringify(this.annonce),
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          this.show = false;
          this.fetchHebergementSearch(this.$route.query.search);
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

    fetchVilles() {
      axios
        .get(`${apiDomain}/api/allvillesTun`)
        .then(({ data }) => (this.villes = data.villes));
    },

    fetchHebergementSearch(search) {
      axios
        .get(
          `${apiDomain}/api/searchH?search=${this.$route.query.search}&token=${this.$store.state.token}`
        )
        .then(({ data }) => (this.hebergements = data.hebergements));
    },

    fetchHebergementsSearch_not_token(search) {
      axios
        .get(
          `${apiDomain}/api/searchHNotToken?search=${this.$route.query.search}`
        )
        .then(({ data }) => (this.hebergements = data.hebergements));
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
  // height: 100%;
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

.addLike_22 {
  margin-top: -27px;
  margin-left: 121px;
  font-size: 20px;
}

/* .addDisLike_11 {
  margin-top: -31px;
  margin-left: 18px;
  font-size: 20px;
} */

.countLike11 {
  margin-top: -22px !important;
  margin-left: 25px !important;
  font-size: 15px;
}

.countDis1 {
  margin-top: -22px !important;
  margin-left: 25px;
  font-size: 15px;
}

/* .addLike_111 {
  margin-top: -3px;
  margin-left: -18px;
  font-size: 20px;
} */
</style>