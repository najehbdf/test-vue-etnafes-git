<template>
  <div>
    <TopNavbarHome />

    <b-modal id="modal-zone" :title="zone.nom" :zone="zone">
     <div class="d-none d-lg-block">
                <div class="row">
                   
                  <div class="col">
                     <carousel style="height:220px;margin-top:-12px"
                
                :per-page="1"
                :navigate-to="someLocalProperty"
                :mouse-drag="false"
                 navigationPrevLabel
                navigationNextLabel
              >
                    <slide
                  onmouseover="this.style.cursor='pointer'"
                  class="MyCustomClasszone"
                  v-for="(image, km) in zone.image"
                  v-bind:key="km"
                >
                     <img loading="lazy"
                  class="previewmoez"
                    @click="fetchZone(zone.id)"
                    width="100%" 
                    
                    :src="`${apiDomain}/myapp/public/uploads/files_zones/${image.url_image}`"
                  />
                   </slide>
                   </carousel>
                  </div>
                  <div class="col">
                    <p style="margin-top: 10px">{{ zone.description }}</p>
                    
                   <div class="row">
                      <div style="margin-top: 2px !important;" class="col-4">
                        {{ nbcomz }} commentaires 
                        </div>
                        <div class="col-8">
                     <rate v-if="nbcomz>0" disabled :length="5" v-model="sumAvis" ></rate>

                        </div>
                     </div> 
                     
                  </div>
                </div>
      <div class="container12" v-if="loggedIn">
        <h4 style="color: #000; margin-top: -12px">Donnez votre Avis</h4>
        <ValidationObserver>
          <form v-on:submit.prevent="addAvisZone()" class="mb-3">
            <rate style="margin-top: -23px;
    margin-left: -14px;" :length="5" v-model="avisz.nbr_etoile"></rate>
    <br>
            
            <ValidationProvider
              name="commentaire"
              rules="required"
              v-slot="{ errors }"
            >
              <div class="form-group">
                <textarea
                style="margin-top: -24px !important;"
                  rows="4"
                  class="form-control personalise"
                  v-model="avisz.commentaire"
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
            <b-alert v-if="validationErrors.client_id"
             show variant="danger">Vous avez déja envoyer un avis</b-alert>


            <div class="row">
              <div class="col-md-3">
                <button style="margin-top: 3px !important;" class="btn btn-outline-success mt-3" type="submit" fill>
                  Envoyer
                </button>
              </div>
            </div>
          </form>
        </ValidationObserver>
      </div>
      <div class="container123" style="margin-top: 15px" v-if="nbcomz > 0">
      

        <div class="row">
          <div class="col-md-6" v-for="avisz in aviszone" :key="avisz.id">
            <div class="row">
              <div class="col-md-12">
                
                <img loading="lazy"
                  :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_client/${avisz.client.photo}`"
                  alt="Profile Photo"
                  width="20%"
                />
                {{ avisz.client.nom }} {{ avisz.client.prenom }}
                <div class="row">
                      <div style="margin-top: -7px !important;" class="col-8">
                        <rate :length="5" v-model="avisz.nbr_etoile"></rate>
                        </div>
                        <div style="margin-top: -5px;
    margin-left: -141px;" class="col-4">
                     {{ avisz.created_at.substr(0, 10) }}

                        </div>
                     </div> 

              <div>
                {{ avisz.commentaire }}
              </div>
              
              </div>

             
            </div>
            <!-- hr -->
          </div>
          
          <br />
        </div>
        <br />

        <br />

        <button
          v-if="nbcomz > 3"
          @click="fetchAllAvisZone(zone.id)"
          class="btn btn-outline-success mt-3 btnout"
          fill
        >
          Afficher tous les {{ nbcomz }} commentaires >>
          <pulse-loader
            v-if="loadz == true"
            :loading="loading"
            :color="color"
            :size="size"
          ></pulse-loader>
        </button>
      </div>
      </div>
      <!-- MOBILE -->

      <div class="d-lg-none">
                <div class="row">
                   
                  <div class="col">
                     <carousel style="height:220px;margin-top:-12px"
                
                :per-page="1"
                :navigate-to="someLocalProperty"
                :mouse-drag="false"
                 navigationPrevLabel
                navigationNextLabel
              >
                    <slide
                  onmouseover="this.style.cursor='pointer'"
                  class="MyCustomClasszone"
                  v-for="(image, km) in zone.image"
                  v-bind:key="km"
                >
                     <img loading="lazy"
                  class="previewmoez"
                    @click="fetchZone(zone.id)"
                    width="100%" 
                    
                    :src="`${apiDomain}/myapp/public/uploads/files_zones/${image.url_image}`"
                  />
                   </slide>
                   </carousel>
                  </div>
                  
                </div>
                
       <div class="col">
                    <p style="margin-top: 10px">{{ zone.description }}</p>
                    
                   <div class="row">
                      {{ nbcomz }} commentaires  &nbsp;&nbsp;
                     <rate v-if="nbcomz>0" disabled :length="5" v-model="sumAvis" ></rate>
<!-- 
                      <div style="margin-top: 2px !important;" class="col-3">
                        {{ nbcomz }} commentaires 
                        </div>
                        <div class="col-9">
                     <rate v-if="nbcomz>0" disabled :length="5" v-model="sumAvis" ></rate>

                        </div> -->
                     </div> 
                     
                  </div>
                  <br>
      <div class="container12" v-if="loggedIn">
        <h4 style="color: #000; margin-top: -23px">Donnez votre Avis</h4>
        <ValidationObserver>
          <form v-on:submit.prevent="addAvisZone()" class="mb-3">
            <rate style="margin-top: -23px;
    margin-left: -14px;" :length="5" v-model="avisz.nbr_etoile"></rate>
    <br>
            
            <ValidationProvider
              name="commentaire"
              rules="required"
              v-slot="{ errors }"
            >
              <div class="form-group">
                <textarea
                style="margin-top: -24px !important;"
                  rows="4"
                  class="form-control personalise"
                  v-model="avisz.commentaire"
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
            
            <b-alert v-if="validationErrors.client_id" show variant="danger">Vous avez déja envoyer un avis</b-alert>


            <div class="row">
              <div class="col-md-3">
                <button style="margin-top: 3px !important;" class="btn btn-outline-success mt-3" type="submit" fill>
                  Envoyer
                </button>
              </div>
            </div>
          </form>
        </ValidationObserver>
      </div>

      <div class="container123" style="margin-top: 15px" v-if="nbcomz > 0">
      

        <div class="row">
          <div class="col-md-6" v-for="avisz in aviszone" :key="avisz.id">
            <div class="row">
              <div class="col-md-12">
                
                <img loading="lazy"
                  :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_client/${avisz.client.photo}`"
                  alt="Profile Photo"
                  width="20%"
                />
                {{ avisz.client.nom }} {{ avisz.client.prenom }}
                <div class="row">
                      <div style="margin-top: -7px !important;" class="col-8">
                        <rate :length="5" v-model="avisz.nbr_etoile"></rate>
                        </div>
                        <div style="margin-top: -5px;
    margin-left: -81px;" class="col-4">
                     {{ avisz.created_at.substr(0, 10) }}

                        </div>
                     </div> 

              <div>
                {{ avisz.commentaire }}
              </div>
              
              </div>

             
            </div>
            <!-- hr -->
          </div>
          
          <br />
        </div>
        <br />

        <br />

        <button
          v-if="nbcomz > 3"
          @click="fetchAllAvisZone(zone.id)"
          class="btn btn-outline-success mt-3 btnout"
          fill
        >
          Afficher tous les {{ nbcomz }} commentaires >>
          <pulse-loader
            v-if="loadz == true"
            :loading="loading"
            :color="color"
            :size="size"
          ></pulse-loader>
        </button>
      </div>
      </div>
    </b-modal>

    <b-modal
      class="modal-dialog modal-lg"
      id="modal-hebergement"
      :title="hebergement.nom"
      :hebergement="hebergement"
    >
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
        style="text-shadow: 1px 1px 2px #333; margin-top: 30px"
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
      >
        <b-carousel-slide
          id="carousel2"
          v-for="(image, k) in hebergement.images_hebergement"
          v-bind:key="k"
          :img-src="`${apiDomain}/myapp/public/uploads/files_hebergement/${image.url_image}`"
        ></b-carousel-slide>
      </b-carousel> 

      <div class="col-md-12">
        <h3 style="margin-top: 10px; color: #000">Equipements</h3>
        <div class="row">
          <div v-if="hebergement.wifi == 1" class="col-md-3">
            <img loading="lazy" src="/wifi-etnafes.png" /> Wi-Fi
            <br />
          </div>
          <div v-if="hebergement.television == 1" class="col-md-3">
            <img loading="lazy" src="/tv-etnafes.png" /> Télévision
            <br />
          </div>

          <div v-if="hebergement.chauffage == 1" class="col-md-3">
            <img loading="lazy" src="/heating-etnafes.png" /> Chauffage
            <br />
          </div>

          <div v-if="hebergement.cuisine == 1" class="col-md-3">
            <img loading="lazy" src="/kitchen-etnafes.png" /> Cuisine
            <br />
          </div>

          <div v-if="hebergement.lave_linge == 1" class="col-md-3">
            <img loading="lazy" src="/tumble-dry-etnafes.png" /> Lave-linge
            <br />
          </div>
          <div v-if="hebergement.climatisation == 1" class="col-md-3">
            <img loading="lazy" src="/air-conditioner-etnafes.png" /> Climatisation
            <br />
          </div>

          <div v-if="hebergement.eau_chaude == 1" class="col-md-3">
            <img loading="lazy" src="/water-heater-etnafes.png" /> Eau Chaude
            <br />
          </div>

          <div v-if="hebergement.salle_de_bain == 1" class="col-md-3">
            <img loading="lazy" src="/bath-etnafes.png" /> Salle de bain
            <br />
          </div>

          <div
            v-if="hebergement.espace_travail_ordinateur == 1"
            class="col-md-5"
          >
            <img loading="lazy" src="/computer-etnafes.png" />
            &nbsp;Espace de travail pour ordinateur
            <br />
          </div>

          <div v-if="hebergement.espace_enfant == 1" class="col-md-3">
            <img loading="lazy" src="/computer-etnafes.png" />
            &nbsp;Espace pour enfant
            <br />
          </div>
        </div>
      </div>

      <div class="container" v-if="loggedIn">
        <h4 style="color: #000">Donnez votre Avis</h4>
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

      <div class="container" v-if="nbcomheb > 0">
        <h5 style="color: blue">{{ nbcomheb }} commentaires</h5>
        <br />

        <div class="row">
          <div
            class="col-md-12"
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

    <div class="container">
      <center style=" margin-top: 20px">
        <h1 class="d-none d-lg-block" style="color: #333; margin-top: 10px">Etnafes Libre</h1>
        <h1 class="d-lg-none" style="color: #333; margin-top: 10px;
        font-size:20px;margin-bottom: 5px !important;">Etnafes Libre</h1>

        <h3 class="d-none d-lg-block"  style="color: #ff931f; letter-spacing: 2px" >
          Veuillez choisir votre destination
        </h3>

        <h3 class="d-lg-none" style="color: #ff931f; letter-spacing: 2px;
        font-size:14px;margin-bottom: 15px !important;">
          Veuillez choisir votre destination
        </h3>
      </center>

      <div class="row" style="margin-top: 15px; margin-bottom: 40px">
        <div class="col-sm-12 col-xs-3">
          <div class="row" v-if="verif_id_ville == ''">
            <div class="col-md-2"></div>
            <div class="col-md-1">
              <div>
                <label class="d-none d-lg-block"
                  style="
                    color: #000;
                    font-size: 14px;
                    margin-top: 12px;
                    margin-top: 10px;
                    margin-left: 56px;
                  "
                  >Pays</label
                >

                <label class="d-lg-none"
                  style="
                    color: #000;
                    font-size: 14px;
                    margin-top: 12px;
                    margin-top: 10px;
                  "
                  >Pays</label
                >
              </div>
            </div>

            <div class="col-md-3">
              <div class="form-group">
                <select
                  class="form-control"
                  id="SelectRegion"
                  required
                  v-model="pays_id"
                  @change="fetchVillesPays(pays_id)"
                >
                  <option value disabled selected>choisissez votre pays</option>
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

            <div class="col-md-1">
              <div>
                <label style="color: #000; font-size: 14px; margin-top: 12px"
                  >Gouvernorat</label
                >
              </div>
            </div>

            <div class="col-md-3">
              <div class="form-group">
                <select
                  v-model="id_ville"
                  class="form-control"
                  id="SelectRegion"
                  @change="updateVilleid"
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

            <!--   <div class="col-md-4">
              <b-button @click.prevent="updateVilleid" variant="success"
                >Rechercher</b-button
              >
            </div> -->
          </div>

          <div class="row" v-else>
            <div class="col-md-2"></div>
            <div class="col-md-1">
              <div>
                <label
                  style="
                    color: #000;
                    font-size: 14px;
                    margin-top: 12px;
                    margin-top: 10px;
                    margin-left: 56px;
                  "
                  >Pays</label
                >
              </div>
            </div>

            <div class="col-md-3">
              <div class="form-group">
                <select
                  class="form-control"
                  id="SelectRegion"
                  required
                  v-model="pays_id"
                  @change="fetchVillesPays(pays_id)"
                >
                  <option value disabled selected>choisissez votre pays</option>
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

            <div class="col-md-1">
              <div>
                <label style="color: #000; font-size: 14px; margin-top: 12px"
                  >Gouvernorat</label
                >
              </div>
            </div>

            <div class="col-md-3">
              <div class="form-group">
                <select
                  v-model="id_ville"
                  class="form-control"
                  id="SelectRegion"
                  @change="updateVilleid"
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
              <b-button @click="clearlocalStorage" variant="success"
                >Vider ma rechrehce
              </b-button>
            </div>
            <!--   <div class="col-md-4">
              <b-button @click.prevent="updateVilleid" variant="success"
                >Rechercher</b-button
              >
            </div> -->
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-6">
          <center class="style_centerèheb_libre">
            <h1
              class="style_h1èheb_lib d-none d-lg-block"
              style="margin-bottom: 15px !important"
            >
              Logements : Tunisie
            </h1>
            <h1
              style="
                font-size: 19px;
                margin-top: -15px;
                margin-bottom: 15px !important;
              "
              class="style_h1èheb_lib d-lg-none"
            >
              Logements : Tunisie
            </h1>
            <span style="margin-top: -10px">Veuillez choisir un logement</span>
          </center>
          <h3
            style="color: #333; margin-top: 20px; margin-bottom: 10px"
            v-if="nomville.length != 0"
          >
            >> {{ nomville }}
          </h3>
          <div
            class="card mb-3 cardheb"
            v-for="hebergement in hebergementsville.data"
            :key="hebergement.id"
            v-show="hebergement.valide == 1"
          >
            <div class="row no-gutters">
            
              <div class="col-md-4">
                <carousel
                  class="d-none d-lg-block"
                  :per-page="1"
                  :navigate-to="someLocalProperty"
                  :mouse-drag="false"
                  navigationPrevLabel
                  navigationNextLabel
                >
                  <!-- web -->
                  <slide
                    onmouseover="this.style.cursor='pointer'"
                    class="MyCustomClass1"
                    id="carousel3"
                    v-b-modal.modal-hebergement
                    v-for="(image, k) in hebergement.images_hebergement"
                    v-bind:key="k"
                    :img-src="`${apiDomain}/myapp/public/uploads/files_hebergement/${image.url_image}`"
                    link="#"
                  >
                    <img loading="lazy"
                      @click="fetchHebergement(hebergement.id)"
                      width="100%"
                      :src="`${apiDomain}/myapp/public/uploads/files_hebergement/${image.url_image}`"
                    />
                  </slide>
                </carousel>

                <carousel
                  class="d-lg-none"
                  :per-page="1"
                  :navigate-to="someLocalProperty"
                  :mouse-drag="false"
                  navigationPrevLabel
                  navigationNextLabel
                >
                  <!-- web -->
                  <slide
                    class="MyCustomClass1"
                    id="carousel05"
                    v-b-modal.modal-hebergement
                    v-for="(image, k) in hebergement.images_hebergement"
                    v-bind:key="k"
                    :img-src="`${apiDomain}/myapp/public/uploads/files_hebergement/${image.url_image}`"
                    link="#"
                  >
                    <img loading="lazy"
                      @click="fetchHebergement(hebergement.id)"
                      width="100%"
                      :src="`${apiDomain}/myapp/public/uploads/files_hebergement/${image.url_image}`"
                    />
                  </slide>
                </carousel>
              </div>
              <div class="col-md-8 col-sm-12">
                <div class="card-body">
                  <p
                    class="card-title d-none d-lg-block"
                    style="font-weight: bold; letter-spacing: 1px"
                  >
                    &nbsp;{{ hebergement.nom }}
                    

                    <router-link
                      class="d-none d-lg-block"
                      :to="`/reservationhebergement/${hebergement.id}`"
                      style="float: right; margin-top: -13px"
                    >
                      <button type="button" class="btn btn-warning btn1">
                        + De détails
                      </button>
                    </router-link>
                  </p>

                  <p
                    class="card-title d-lg-none"
                    style="font-weight: bold; letter-spacing: 1px;margin-top: -16px !important;"
                  >
                    &nbsp;{{ hebergement.nom }}
                  </p>
                  <hr />
                  <p class="card-text" >
                    <span style="text-align: justify;" class="d-none d-lg-block">{{ hebergement.description }}</span>
                    <span style="text-align: justify;" class="d-lg-none">{{ hebergement.description.substr(0, 200) + "..." }}</span>

                    <br />
                    <hr />
                    <small
                      class="text-muted"
                      style="color: #717171; font-size: 13px; font-weight: 400"
                    >
                      {{ hebergement.nbr_voyageurs }} voyageurs
                      <span>.</span>
                      <span v-if="hebergement.nbr_chambre_dispo>0">{{ hebergement.nbr_chambre_dispo }} chambre(s)</span>
                      <span>  
                     <i class="tim-icons icon-bank"></i>
                       {{ hebergement.type }}</span>&nbsp;&nbsp;

                       <span>  
                        <i class="tim-icons icon-tag"></i>
                       {{ hebergement.prix_adulte }} dt</span>
                    </small>
                    <br />
                    <span>
                      <img loading="lazy" src="/Etnafes-icon3.png" style="width: 12px" />
                      &nbsp;{{ hebergement.ville.nom }}</span
                    >
                  </p>
                  <hr />
                  <p class="card-text">
                    <small>
                      <span v-if="hebergement.salle_de_bain == 1">
                        &nbsp;
                        <img loading="lazy"
                          v-b-tooltip.hover
                          title="Salle de bain"
                          src="/bath-etnafes.png"
                        />
                        &nbsp;
                      </span>

                      <span v-if="hebergement.lave_linge == 1">
                        &nbsp;
                        <img loading="lazy"
                          v-b-tooltip.hover
                          title="Lave linge"
                          src="/tumble-dry-etnafes.png"
                        />&nbsp;
                      </span>

                      <span v-if="hebergement.chauffage == 1">
                        &nbsp;
                        <img loading="lazy"
                          v-b-tooltip.hover
                          title="Chauffage"
                          src="/heating-etnafes.png"
                        />&nbsp;
                      </span>
                      <span v-if="hebergement.television == 1">
                        &nbsp;
                        <img loading="lazy"
                          v-b-tooltip.hover
                          title="Television"
                          src="/tv-etnafes.png"
                        />&nbsp;
                      </span>

                      <span v-if="hebergement.climatisation == 1">
                        &nbsp;
                        <img loading="lazy"
                          v-b-tooltip.hover
                          title="Climatisation"
                          src="/air-conditioner-etnafes.png"
                        />&nbsp;
                      </span>

                      <span v-if="hebergement.eau_chaude == 1">
                        &nbsp;
                        <img loading="lazy"
                          v-b-tooltip.hover
                          title="Eau chaude"
                          src="/water-heater-etnafes.png"
                        />&nbsp;
                      </span>

                      <span v-if="hebergement.espace_travail_ordinateur == 1">
                        &nbsp;
                        <img loading="lazy"
                          v-b-tooltip.hover
                          title="Espace de travail"
                          src="/computer-etnafes.png"
                        />&nbsp;
                      </span>

                      <span v-if="hebergement.espace_enfant == 1">
                        &nbsp;
                        <img loading="lazy"
                          v-b-tooltip.hover
                          title="Espace enfant"
                          src="/espace-enfant-etnafes.png"
                        />&nbsp;
                      </span>

                      <span v-if="hebergement.wifi == 1">
                        &nbsp;
                        <img loading="lazy"
                          v-b-tooltip.hover
                          title="WiFi"
                          src="/wifi-etnafes.png"
                        />&nbsp;
                      </span>

                      <span v-if="hebergement.cuisine == 1">
                        &nbsp;
                        <img loading="lazy"
                          v-b-tooltip.hover
                          title="Cuisine"
                          src="/kitchen-etnafes.png"
                        />&nbsp;
                      </span>
                       <span>
                        <img loading="lazy"
                          width="8%"
                          src="https://img.icons8.com/color/50/000000/visible--v1.png"
                        />
                        <span style="font-weight: bold">{{
                          hebergement.nb_vus
                        }}</span>
                      </span>
                    </small>
                  </p>
                </div>
              </div>
              <div class="col-md-12 d-lg-none">
                <router-link :to="`/mreservation/${hebergement.id}`">
                  <button type="button" class="btn btn-warning btn1">
                    + De détails
                  </button>
                </router-link>
              </div>

              <!-- <div class="col-md-12">
                <router-link :to="`/reservationhebergement/${hebergement.id}`">
                  <button type="button" class="btn btn-warning btn1">+ De détails</button>
                </router-link>
              </div>-->
            </div>
          </div>

          <!-- all hebergements -->
          <h3
            v-show="pays_id == ''"
            style="color: #333; margin-top: 20px; margin-bottom: 10px"
          >
            >> Tunisie
          </h3>
          <div
            class="card mb-3 cardheb"
            v-for="hebergement in hebergements.data"
            :key="hebergement.id"
            v-show="pays_id == '' && hebergement.valide == 1"
          >
            <div class="row no-gutters">
              <div class="col-md-4">
                <carousel
                  class="d-none d-lg-block"
                  :per-page="1"
                  :navigate-to="someLocalProperty"
                  :mouse-drag="false"
                  navigationPrevLabel
                  navigationNextLabel
                >
                  <!-- web -->
                  <slide
                    onmouseover="this.style.cursor='pointer'"
                    class="MyCustomClass1"
                    id="carousel3"
                    v-b-modal.modal-hebergement
                    v-for="(image, k) in hebergement.images_hebergement"
                    v-bind:key="k"
                    :img-src="`${apiDomain}/myapp/public/uploads/files_hebergement/${image.url_image}`"
                    link="#"
                  >
                    <img loading="lazy"
                      @click="fetchHebergement(hebergement.id)"
                      width="100%"
                      :src="`${apiDomain}/myapp/public/uploads/files_hebergement/${image.url_image}`"
                    />
                  </slide>
                </carousel>

                <carousel
                  class="d-lg-none"
                  :per-page="1"
                  :navigate-to="someLocalProperty"
                  :mouse-drag="false"
                  navigationPrevLabel
                  navigationNextLabel
                >
                  <!-- web -->
                  <slide
                    class="MyCustomClass1"
                    id="carousel05"
                    v-b-modal.modal-hebergement
                    v-for="(image, k) in hebergement.images_hebergement"
                    v-bind:key="k"
                    :img-src="`${apiDomain}/myapp/public/uploads/files_hebergement/${image.url_image}`"
                    link="#"
                  >
                    <img loading="lazy"
                      @click="fetchHebergement(hebergement.id)"
                      width="100%"
                      :src="`${apiDomain}/myapp/public/uploads/files_hebergement/${image.url_image}`"
                    />
                  </slide>
                </carousel>
              </div>
              <div class="col-md-8 col-sm-12">
                <div class="card-body">
                  <p
                    class="card-title d-none d-lg-block"
                    
                  >
                    &nbsp;<span style="font-weight: bold; letter-spacing: 1px">{{ hebergement.nom }}</span>&nbsp;
                    <router-link
                      class="d-none d-lg-block"
                      :to="`/reservationhebergement/${hebergement.id}`"
                      style="float: right; margin-top: -13px"
                    >
                      <button type="button" class="btn btn-warning btn1">
                        + De détails
                      </button>
                    </router-link>
                  </p>

                  <p
                    class="card-title d-lg-none"
                    style="font-weight: bold; letter-spacing: 1px;margin-top: -16px !important;"
                  >
                    &nbsp;{{ hebergement.nom }}
                  </p>

                  
                  <hr />
                  <p class="card-text" style="color:#000">
                   <span style="text-align: justify;" class="d-none d-lg-block">{{ hebergement.description }}</span>
                    <span style="text-align: justify;" class="d-lg-none">{{ hebergement.description.substr(0, 130) + "..." }}</span>
                    <hr />
                    <small
                      class="text-muted"
                      style="color: #717171; font-size: 13px; font-weight: 400"
                    >
                     <i class="tim-icons icon-single-02"></i>
                      {{ hebergement.nbr_voyageurs }} voyageurs&nbsp;&nbsp;
                     <span v-if="hebergement.nbr_chambre_dispo>0"> 
                     <i class="tim-icons icon-bulb-63"></i>

                      {{ hebergement.nbr_chambre_dispo }} chambre(s)&nbsp;&nbsp;</span>
                    
                     <span>  
                     <i class="tim-icons icon-bank"></i>
                       {{ hebergement.type }}</span>&nbsp;&nbsp;

                       <span>  
                        <i class="tim-icons icon-tag"></i>
                       {{ hebergement.prix_adulte }} dt</span>
                    </small>

                    <!-- modification -->
                    <br />
                    <span>
                      <img loading="lazy" src="/Etnafes-icon3.png" style="width: 12px" />
                      &nbsp;{{ hebergement.ville.nom }}</span
                    >
                    <!-- modification -->
                    
                  </p>
                  <hr />
                  <p class="card-text">
                    <small>
                      <span v-if="hebergement.salle_de_bain == 1">
                        &nbsp;
                        <img loading="lazy"
                          v-b-tooltip.hover
                          title="Salle de bain"
                          src="/bath-etnafes.png"
                        />
                        &nbsp;
                      </span>

                      <span v-if="hebergement.lave_linge == 1">
                        &nbsp;
                        <img loading="lazy"
                          v-b-tooltip.hover
                          title="Lave linge"
                          src="/tumble-dry-etnafes.png"
                        />&nbsp;
                      </span>

                      <span v-if="hebergement.chauffage == 1">
                        &nbsp;
                        <img loading="lazy"
                          v-b-tooltip.hover
                          title="Chauffage"
                          src="/heating-etnafes.png"
                        />&nbsp;
                      </span>
                      <span v-if="hebergement.television == 1">
                        &nbsp;
                        <img loading="lazy"
                          v-b-tooltip.hover
                          title="Television"
                          src="/tv-etnafes.png"
                        />&nbsp;
                      </span>

                      <span v-if="hebergement.climatisation == 1">
                        &nbsp;
                        <img loading="lazy"
                          v-b-tooltip.hover
                          title="Climatisation"
                          src="/air-conditioner-etnafes.png"
                        />&nbsp;
                      </span>

                      <span v-if="hebergement.eau_chaude == 1">
                        &nbsp;
                        <img loading="lazy"
                          v-b-tooltip.hover
                          title="Eau chaude"
                          src="/water-heater-etnafes.png"
                        />&nbsp;
                      </span>

                      <span v-if="hebergement.espace_travail_ordinateur == 1">
                        &nbsp;
                        <img loading="lazy"
                          v-b-tooltip.hover
                          title="Espace de travail"
                          src="/computer-etnafes.png"
                        />&nbsp;
                      </span>

                      <span v-if="hebergement.espace_enfant == 1">
                        &nbsp;
                        <img loading="lazy"
                          v-b-tooltip.hover
                          title="Espace enfant"
                          src="/espace-enfant-etnafes.png"
                        />&nbsp;
                      </span>

                      <span v-if="hebergement.wifi == 1">
                        &nbsp;
                        <img loading="lazy"
                          v-b-tooltip.hover
                          title="WiFi"
                          src="/wifi-etnafes.png"
                        />&nbsp;
                      </span>

                      <span v-if="hebergement.cuisine == 1">
                        &nbsp;
                        <img loading="lazy"
                          v-b-tooltip.hover
                          title="Cuisine"
                          src="/kitchen-etnafes.png"
                        />&nbsp;
                      </span>
                       <span>
                        <img loading="lazy"
                          width="8%"
                          src="https://img.icons8.com/color/50/000000/visible--v1.png"
                        />
                        <span style="font-weight: bold">{{
                          hebergement.nb_vus
                        }}</span>
                      </span>
                    </small>
                  </p>
                </div>
              </div>
              <div class="col-md-12 d-lg-none">
                <router-link :to="`/mreservation/${hebergement.id}`">
                  <button type="button" class="btn btn-warning btn1">
                    + De détails
                  </button>
                </router-link>
              </div>
            </div>
          </div>

         <pagination
         v-show="pays_id == ''"
            :limit="4"
            :data="hebergements"
            @pagination-change-page="fetchAllHebergementsPaginate"
          ></pagination>

          <pagination
            :limit="4"
            :data="hebergementsville"
            @pagination-change-page="fetchHebergementsPaginate"
          ></pagination>
        </div>

        <div class="col-md-6">
          <center class="style_centerèheb_libre">
            <h1
              class="style_h1èheb_lib d-none d-lg-block"
              style="margin-bottom: 15px !important"
            >
              Zones Touristiques : Tunisie
            </h1>
           
            <h1
              style="
                font-size: 19px;
                margin-top: 32px;
                margin-bottom: 15px !important;
              "
              class="style_h1èheb_lib d-lg-none"
            >
              Zones Touristiques : Tunisie
            </h1>
            Voyagez et Découvrez de nouveaux endroits
          </center>
          <div class="row style_row_heb_libre">
            <!--  -->


    


<!--  -->


            <div 
              class="col-md-6"
              style="
                margin-bottom: 30px;
                margin-top: 10px;
                border: solid 1px #b6b6b6;
                padding: 10px;
              "
              v-for="zone in zonesville.data"
              :key="zone.id"
            >

            <b-carousel
      id="carousel-1"
       class="carousel-item_moez"
      :interval="60000"
      controls
      indicators
      background="#ababab"
      img-width="30"
      img-height="20"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
    <b-carousel-slide
          id="carousel2"
          class="carousel-item_moez"
          
          v-for="(image, km) in zone.image"
          v-bind:key="km"
          v-b-modal.modal-zone
           
          :img-src="`${apiDomain}/myapp/public/uploads/files_zones/${image.url_image}`"
          
        >
        
        
         
        </b-carousel-slide>
  
    </b-carousel>
    <br>
<center>
                <span @click="fetchZone(zone.id)">{{ zone.nom }} </span>  <img loading="lazy" v-b-modal.modal-zone  @click="fetchZone(zone.id)"
                 style="width:20px !important;" src="https://img.icons8.com/color/50/000000/visible--v1.png"/>   
              </center>
            </div>

            
            <div
              class="col-md-6"
              v-show="pays_id == ''"
              style="
                margin-bottom: 30px;
                margin-top: 10px;
                border: solid 1px #b6b6b6;
                padding: 10px;
              "
              v-for="zone in zones.data"
              :key="zone.id"
            >
             

              



                <b-carousel
      id="carousel-1"
      class="carousel-item_moez"
      :interval="60000"
      controls
      indicators
      background="#ababab"
      img-width="30"
      img-height="20"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
    <b-carousel-slide
          id="carousel2"
         class="carousel-item_moez"
          v-for="(image, kmm) in zone.image"
          v-bind:key="kmm"
          
           
            
          :img-src="`${apiDomain}/myapp/public/uploads/files_zones/${image.url_image}`"
          
        >
        
    </b-carousel-slide>
  
    </b-carousel>
<br>
              <center>
                <span @click="fetchZone(zone.id)">{{ zone.nom }} </span>  <img loading="lazy" v-b-modal.modal-zone  @click="fetchZone(zone.id)"
                 style="width:20px !important;" src="https://img.icons8.com/color/50/000000/visible--v1.png"/>   
              </center>
            </div>
          </div>
          <pagination
            v-show="pays_id == ''"
            :limit="4"
            :data="zones"
            @pagination-change-page="fetchAllZonesPaginate"
          ></pagination>
          <pagination
            :limit="4"
            :data="zonesville"
            @pagination-change-page="fetchZonesPaginate"
          ></pagination>
<div v-if="id_ville==''" >


<center
            style="margin-bottom: 30px"
            
          >
            <hr />
            <h1 class="d-none d-lg-block" style="color: #333; margin-top: 20px">Contactez les guides</h1>
            <h1 class="d-lg-none" style="color: #333; margin-top: 20px;font-size: 19px;">Contactez les guides</h1>

          </center>
          <div class="row">
            <div
              class="col-md-4"
              v-for="(guide, i) in guidesALL.data"
              :key="guide.id"
            >
              <center>
                <img loading="lazy"
                  alt="guide"
                  :src="`${apiDomain}/myapp/public/uploads/files_client/${guide.client.photo}`"
                  @mouseover="fetchAllAvisGuide(guide.id)"
                  width="40%"
                  :id="'tooltip-target-1' + i"
                />

               <!--  <img loading="lazy" class="d-lg-none"
                  alt="guide"
                  :src="`${apiDomain}/myapp/public/uploads/files_client/${guide.client.photo}`"
                  @mouseover="fetchAllAvisGuide(guide.id)"
                  width="30%"
                  :id="'tooltip-target-1' + i"
                /> -->

                <b-tooltip :target="'tooltip-target-1' + i" triggers="hover">
                  <div class="toolsguide">
                    <b>{{ guide.client.nom }} {{ guide.client.prenom }}</b>
                    <br />
                    <b>Email:</b>
                    {{ guide.client.email }}
                    <br />
                    <b>Telephone:</b>
                    {{ guide.client.telephone }}
                    <br />
                    <div v-if="moyenne == 0">
                      <span style="color: #c37600">Pas d'avis encore</span>
                    </div>

                    <div v-if="moyenne == 1">
                      <img loading="lazy" src="star-heb.png" />
                    </div>

                    <div v-if="moyenne == 2">
                      <img loading="lazy" src="star-heb.png" />
                      <img loading="lazy" src="star-heb.png" />
                    </div>

                    <div v-if="moyenne == 3">
                      <img loading="lazy" src="star-heb.png" />
                      <img loading="lazy" src="star-heb.png" />
                      <img loading="lazy" src="star-heb.png" />
                    </div>
                    <div v-if="moyenne == 4">
                      <img loading="lazy" src="star-heb.png" />
                      <img loading="lazy" src="star-heb.png" />
                      <img loading="lazy" src="star-heb.png" />
                      <img loading="lazy" src="star-heb.png" />
                    </div>
                    <div v-if="moyenne == 5">
                      <img loading="lazy" src="star-heb.png" />
                      <img loading="lazy" src="star-heb.png" />
                      <img loading="lazy" src="star-heb.png" />
                      <img loading="lazy" src="star-heb.png" />
                      <img loading="lazy" src="star-heb.png" />
                    </div>
                    <br />
                  </div>
                </b-tooltip>

                <p style="color: #000; margin-top: 15px; margin-bottom: 15px">
                  {{ guide.nom }} {{ guide.prenom }}
                </p>
              </center>
            </div>
          </div>
          <pagination
            :limit="4"
            :data="guidesALL"
            @pagination-change-page="fetchAllGUIDEPaginate"
          ></pagination>

 </div>
          <center
            style="margin-bottom: 30px"
            v-if="
              Object.keys(guidesville).length != 0 &&
              guidesville.data.length != 0
            "
          >
            <hr />
            <h1 style="color: #333; margin-top: 20px">Contactez un guide</h1>
          </center>
          <div class="row">
            <div
              class="col-md-4"
              v-for="(guide, i) in guidesville.data"
              :key="guide.id"
            >
              <center>
                <img loading="lazy"
                  alt="guide"
                  :src="`${apiDomain}/myapp/public/uploads/files_client/${guide.client.photo}`"
                  @mouseover="fetchAllAvisGuide(guide.id)"
                  width="50%"
                  :id="'tooltip-target-1' + i"
                />

                <b-tooltip :target="'tooltip-target-1' + i" triggers="hover">
                  <div class="toolsguide">
                    <b>{{ guide.client.nom }} {{ guide.client.prenom }}</b>
                    <br />
                    <b>Email:</b>
                    {{ guide.client.email }}
                    <br />
                    <b>Telephone:</b>
                    {{ guide.client.telephone }}
                    <br />
                    <div v-if="moyenne == 0">
                      <span style="color: #c37600">Pas d'avis encore</span>
                    </div>

                    <div v-if="moyenne == 1">
                      <img loading="lazy" src="star-heb.png" />
                    </div>

                    <div v-if="moyenne == 2">
                      <img loading="lazy" src="star-heb.png" />
                      <img loading="lazy" src="star-heb.png" />
                    </div>

                    <div v-if="moyenne == 3">
                      <img loading="lazy" src="star-heb.png" />
                      <img loading="lazy" src="star-heb.png" />
                      <img loading="lazy" src="star-heb.png" />
                    </div>
                    <div v-if="moyenne == 4">
                      <img loading="lazy" src="star-heb.png" />
                      <img loading="lazy" src="star-heb.png" />
                      <img loading="lazy" src="star-heb.png" />
                      <img loading="lazy" src="star-heb.png" />
                    </div>
                    <div v-if="moyenne == 5">
                      <img loading="lazy" src="star-heb.png" />
                      <img loading="lazy" src="star-heb.png" />
                      <img loading="lazy" src="star-heb.png" />
                      <img loading="lazy" src="star-heb.png" />
                      <img loading="lazy" src="star-heb.png" />
                    </div>
                    <br />
                  </div>
                </b-tooltip>

                <p style="color: #000; margin-top: 15px; margin-bottom: 15px">
                  {{ guide.nom }} {{ guide.prenom }}
                </p>
              </center>
            </div>
          </div>
          <pagination
            :limit="4"
            :data="guidesville"
            @pagination-change-page="fetchGuidesPaginate"
          ></pagination>

          <div class="row" v-if="markersh.length != 0 || markers.length != 0">
            <div class="col-md-12" id="map" ref="map">
              <br />

              <gmap-map
                :center="center"
                :zoom="8"
                style="width: 100%; height: 500px"
              >
                <GmapMarker
                  icon="/Etnafes-icon01.png"
                  v-for="(m, index) in markersh"
                  :key="index"
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
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import MapMarker from "../components/MapMarker";
import MapInfoWindow from "../components/MapInfoWindow";
import TopNavbarHome from "./Layout/TopNavbarHome.vue";
import Footer from "./Layout/Footer.vue";
import { VueperSlides, VueperSlide } from "vueperslides";

import "vueperslides/dist/vueperslides.css";
import BaseTable from "@/components/BaseTable";
import { Card } from "@/components/index";
import { apiDomain } from "../config";
import InfoDepanneur from "./InfoDepanneur.vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
const tableColumns = ["Titre", "Date_deb", "Date_fin", "Prix_fix"];
import { Facebook } from "vue-socialmedia-share";
import axios from "axios";
import Lingallery from "lingallery";

export default {
  components: {
    Lingallery,

    Facebook,
    Card,
    BaseTable,
    TopNavbarHome,
    Footer,
    VueperSlides,
    VueperSlide,
    "info-content": InfoDepanneur,
    MapMarker,
    MapInfoWindow,
    PulseLoader,
  },
  data() {
    return {
      url: "https://etnafes.com/",
      someLocalProperty: [],
      client: [],
      guide: [],
      adagence: [],
      hebergementid: "",

      proprietaire: [],
      proprestau: [],
      scrollPosition: null,
      token: null,
      aviszone: {},
      avisheb: {},
      avishebergement: {},
      nbcomheb: "",
      moyenne: "",
      zones: [],
      zoneid: "",
      loadz: false,
      loadheb: false,

      validationErrors: "",
      avisz: {},
      villespays: {},
      infoContent: "",
      hebergement: {},
      zone: {},
      nbcomz: "",
      somme: "",

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
      //libre with moez
      data_pays_id: localStorage.getItem("pays_id"),
      pays_id: localStorage.getItem("pays_id")
        ? localStorage.getItem("pays_id")
        : "",
      nomville: "",
      /*     pays_id: 1,
      nomville: 'kairouan', */
      id_ville: "",
      /* id_ville: 121, */
      pays: {},
      map: null,
      center: { lat: 36.81897, lng: 10.16579 },
      markers: [],
      InfoDepanneur: [],
      markersh: [],
      places: [],
      currentPlace: null,
      slide: 0,
      slideZoneHebLib: 0,
      sliding: null,
      villes: [],

      apiDomain: "https://etnafesapi20212018.etnafes.com",
      table1: {
        title: "Simple Table",
        columns: [...tableColumns],
      },
      packs: {},
      hebergements: {},
      hebergementsville: {},
      zonesville: {},
      guidesville: {},
      guidesALL: {},
      guide: {},
    };
  },

  mounted() {
    if (this.id_ville != "") {
      axios.get(`${apiDomain}/api/pays`).then(({ data }) => (this.pays = data));

      axios
        .get(`${apiDomain}/api/pays/villes/${localStorage.getItem("pays_id")}`)
        .then(({ data }) => (this.villespays = data.villes));
      axios
        .get(`${apiDomain}/api/hebergements/ville/${this.id_ville}`)
        .then(({ data }) => (this.hebergementsville = data.hebergements));
      axios
        .get(`${apiDomain}/api/zones/${this.id_ville}/villep`)
        .then(({ data }) => (this.zonesville = data.zones));
      axios
        .get(`${apiDomain}/api/ville/${this.id_ville}`)
        .then(
          ({ data }) => (
            (this.ville = data.ville), (this.nomville = data.ville.nom)
          )
        );
      axios
        .get(`${apiDomain}/api/guides/villep/${this.id_ville}`)
        .then(({ data }) => (this.guidesville = data.guides));

      axios
        .post(`${apiDomain}/api/findh/${this.id_ville}`, {
          center: this.center,
        })

        .then((response) => {
          localStorage.setItem("pays_id", this.pays_id);
          localStorage.setItem("nomville", this.nomville);
          localStorage.setItem("id_ville", this.id_ville);
          let data = response.data;
          Bus.$emit("markers_fetched", data);
        });
    }
  },
  computed: {

   /*  get_image_url() {
      var result = [];
      var moyenne = "";

      const res = this.hebergements.data;
      for (var i = 0; i < res.length; i++) {
        for (var m = 0; m < res[i].images_hebergement.length; m++) {
          moyenne =
            "https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_hebergement/" +
            res[i].images_hebergement[m].url_image;
          // result.push(moyenne);
          result.push({ src: moyenne, thumbnail: moyenne });
        }
      }

      return result;
    }, */

    sumAvis() {
      return Number(this.somme) / Number(this.nbcomz);
    },
    /*   verif_pays_id() {
      if (localStorage.getItem("pays_id") === null) {
        return (this.pays_id = this.pays_id);
      } else {
        return (this.pays_id = localStorage.getItem("pays_id"));
      }
    }, */

    verif_nomville() {
      if (localStorage.getItem("nomville") === null) {
        return (this.nomville = this.nomville);
      } else {
        return (this.nomville = localStorage.getItem("nomville"));
      }
    },

    verif_id_ville() {
      if (localStorage.getItem("id_ville") === null) {
        return (this.id_ville = this.id_ville);
      } else {
        return (this.id_ville = localStorage.getItem("id_ville"));
      }
    },

    loggedIn() {
      return this.$store.getters.get_loggedIn;
    },

    user() {
      return this.$store.getters.get_user;
    },

    ville_id: {
      get() {
        return this.id_ville;
      },
      set(value) {
        this.$store.commit("updateVilleid", value);
      },
    },
  },

  created() {
    this.scrollToTop();

    if (this.id_ville == "") {
      this.fetchHebergements();
      this.fetchZones();
      this.fetchAllGuide();
    }

    if (this.loggedIn == true) {
      this.fetchclient(this.$store.state.user.id);

      this.fetchproprietaire(this.$store.state.user.id);
      this.fetchproprestau(this.$store.state.user.id);
      this.fetchguide(this.$store.state.user.id);
      this.fetchagenceadmin(this.$store.state.user.id);
    }
    this.fetchPays();

    Bus.$on("markers_fetched", (data) => {
      this.markersh = data.markersh;
      if (this.markersh.length > 0) {
        this.center = data.markersh[0].position;
      }
      console.log("event data", data);
    });

    Bus.$on("marker_result_clicked", (index) => {
      let targetMarker = this.markersh[index];
      this.center = targetMarker.position;
      this.toggleInfoWindow(targetMarker, index);
    });

    /* created the search automtically */
  },
  methods: {
    scrollToTop() {
    window.scrollTo(0,0);
  },
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
    clearlocalStorage() {
      localStorage.removeItem("pays_id", this.pays_id);
      localStorage.removeItem("nomville", this.nomville);
      localStorage.removeItem("id_ville", this.id_ville);

      this.fetchHebergements();
      window.location.reload();
    },
    updateVilleid(e) {
      axios
        .get(`${apiDomain}/api/hebergements/ville/${this.id_ville}`)
        .then(({ data }) => (this.hebergementsville = data.hebergements));

      axios
        .get(`${apiDomain}/api/zones/${this.id_ville}/villep`)
        .then(({ data }) => (this.zonesville = data.zones));
      axios
        .get(`${apiDomain}/api/ville/${this.id_ville}`)
        .then(
          ({ data }) => (
            (this.ville = data.ville), (this.nomville = data.ville.nom)
          )
        );
      axios
        .get(`${apiDomain}/api/guides/villep/${this.id_ville}`)
        .then(({ data }) => (this.guidesville = data.guides));

      axios
        .post(`${apiDomain}/api/findh/${this.id_ville}`, {
          center: this.center,
        })

        .then((response) => {
          localStorage.setItem("pays_id", this.pays_id);
          localStorage.setItem("nomville", this.nomville);
          localStorage.setItem("id_ville", this.id_ville);
          let data = response.data;
          Bus.$emit("markers_fetched", data);
        });
    },

    fetchZones() {
      fetch(`${apiDomain}/api/allzones`)
        .then((res) => res.json())
        .then((res) => {
          this.zones = res.zonespaginate;
          this.zonescorbeille = res.zonescorbeille;
        })
        .catch((err) => console.log(err));
    },
    fetchAllGuide() {
      fetch(`${apiDomain}/api/AllGuideVillePaginate`)
        .then((res) => res.json())
        .then((res) => {
          this.guidesALL = res.guides;
        })
        .catch((err) => console.log(err));
    },

    fetchAllZonesPaginate(page) {
      if (typeof page === "undefined") {
        page = 1;
      }
      let vm = this;
      fetch(`${apiDomain}/api/allzones?page=` + page)
        .then((res) => res.json())
        .then((data) => {
          this.zones = data.zonespaginate;
        })
        .catch((err) => console.log(err));
    },
    fetchHebergements() {
      fetch(`${apiDomain}/api/all-hebergements`)
        .then((res) => res.json())
        .then((res) => {
          this.hebergements = res.hebergementspaginate;
        })
        .catch((err) => console.log(err));
    },

    fetchAllHebergementsPaginate(page) {
      if (typeof page === "undefined") {
        page = 1;
      }
      let vm = this;
      fetch(`${apiDomain}/api/all-hebergements?page=` + page)
        .then((res) => res.json())
        .then((data) => {
          this.hebergements = data.hebergementspaginate;
        })
        .catch((err) => console.log(err));
    },
    fetchagenceadmin(id) {
      fetch(`${apiDomain}/api/agencead/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.adagence = res.adagence;
        })
        .catch((err) => console.log(err));
    },
    fetchguide(id) {
      fetch(`${apiDomain}/api/guide/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.guide = res.guide;
        })
        .catch((err) => console.log(err));
    },
    fetchproprestau(id) {
      fetch(`${apiDomain}/api/proprietaire_restau/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.proprestau = res.proprietaire;
        })
        .catch((err) => console.log(err));
    },
    fetchproprietaire(id) {
      fetch(`${apiDomain}/api/prop/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.proprietaire = res.proprietaire;
        })
        .catch((err) => console.log(err));
    },
    //show user by id
    fetchclient(id) {
      fetch(`${apiDomain}/api/client/${id}?token=${this.$store.state.token}`)
        .then((res) => res.json())
        .then((res) => {
          this.client = res;
        })
        .catch((err) => console.log(err));
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
    fetchAllAvisZone(id) {
      this.loadz = true;
      axios
        .get(`${apiDomain}/api/aviszone/all/${id}`)
        .then(
          ({ data }) => ((this.aviszone = data.zone), (this.loadz = false))
        );
    },

    fetchAllAvisGuide(id) {
      axios
        .get(`${apiDomain}/api/avisguide/all/${id}`)
        .then(
          ({ data }) => (
            (this.avisguide = data.guide), (this.moyenne = data.moyenne)
          )
        );
    },

    addAvisZone() {
      axios
        .post(`${apiDomain}/api/avis/zone`, {
          email: this.$store.state.user.email,
          commentaire: this.avisz.commentaire,
          nbr_etoile: this.avisz.nbr_etoile,
          zone_touristique_id: this.zoneid,
          client_id: this.$store.state.user.id,
          headers: {
            "content-type": "application/json",
          },
        })
        .then((response) => {
          this.$noty.success("Votre avis bien reçu!");

          this.fetchZone(this.zone.id);
          /*   if (response.status == 200) { */
          /* if (confirm("avis bien reçu")) { */
          //window.location.reload();
          // this.fetchZone(this.zone.id);
          /* } */
          /*  } */
        })
        .catch((error) => {
          if (error.response && error.response.status == 400) {
            this.validationErrors = error.response.data;
          } else {
            this.$noty.error("Vous avez déja envoyer un avis!");
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

      axios
        .get(`${apiDomain}/api/avishebergement/${id}`)
        .then(
          ({ data }) => (
            (this.avishebergement = data.hebergement),
            (this.nbcomheb = data.nbcomheb)
          )
        );
    },

    fetchZone(id) {
      fetch(`${apiDomain}/api/zone/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.zone = res.zonetouristique;
          this.zoneid = res.zonetouristique.id;
          this.imagezones = res.zonetouristique.image;
        })
        .catch((err) => console.log(err));

      axios
        .get(`${apiDomain}/api/aviszone/${id}`)
        .then(
          ({ data }) => (
            (this.aviszone = data.zone),
            (this.nbcomz = data.nbcomz),
            (this.somme = data.somme)
          )
        );
    },

    fetchGuide(id) {
      fetch(`${apiDomain}/api/guide/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.guide = res.guide;
        })
        .catch((err) => console.log(err));
    },

    fetchVillesPays(id) {
      axios
        .get(`${apiDomain}/api/pays/villes/${id}`)
        .then(({ data }) => (this.villespays = data.villes));
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
    hasHistory() {
      return window.history.length > 2;
    },
    updateHebergementid(e) {
      this.$store.commit("updateHebergementid", e.target.value);
    },
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },

    fetchLocations(idv) {
      axios
        .post(`${apiDomain}/api/findh/${idv}`, { center: this.center })
        .then((response) => {
          let data = response.data;
          Bus.$emit("markers_fetched", data);
        });
    },

    fetchHebergementsPaginate(page) {
      if (typeof page === "undefined") {
        page = 1;
      }
      let vm = this;
      fetch(`${apiDomain}/api/hebergements/ville/${this.id_ville}?page=` + page)
        .then((res) => res.json())
        .then((data) => {
          this.hebergementsville = data.hebergements;
        })
        .catch((err) => console.log(err));
    },
    fetchZonesPaginate(page) {
      if (typeof page === "undefined") {
        page = 1;
      }
      let vm = this;
      fetch(`${apiDomain}/api/zones/${this.id_ville}/villep?page=` + page)
        .then((res) => res.json())
        .then((data) => {
          this.zonesville = data.zones;
        })
        .catch((err) => console.log(err));
    },

    fetchGuidesPaginate(page) {
      if (typeof page === "undefined") {
        page = 1;
      }
      let vm = this;
      fetch(`${apiDomain}/api/guides/villep/${this.id_ville}?page=` + page)
        .then((res) => res.json())
        .then((data) => {
          this.guidesville = data.guides;
        })
        .catch((err) => console.log(err));
    },

    fetchAllGUIDEPaginate(page) {
      if (typeof page === "undefined") {
        page = 1;
      }
      let vm = this;
      fetch(`${apiDomain}/api/AllGuideVillePaginate?page=` + page)
        .then((res) => res.json())
        .then((data) => {
          this.guidesALL = data.guides;
        })
        .catch((err) => console.log(err));
    },

    fetchHebergementsVille(id) {
      axios
        .get(`${apiDomain}/api/hebergements/ville/${id}`)
        .then(({ data }) => (this.hebergementsville = data.hebergements));
    },

    fetchZonesVille(id) {
      axios
        .get(`${apiDomain}/api/zones/${id}/ville`)
        .then(({ data }) => (this.zonesville = data.zones));
    },

    fetchVille(id) {
      axios
        .get(`${apiDomain}/api/ville/${id}`)
        .then(
          ({ data }) => (
            (this.ville = data.ville), (this.nomville = data.ville.nom)
          )
        );
    },

    fetchVilles() {
      axios
        .get(`${apiDomain}/api/villes`)
        .then(({ data }) => (this.villes = data));
    },
  },
};
</script>

<style>
.toolsguide {
  padding: 10px !important;
  color: #333 !important;
  text-align: center;
  background-color: #eeeeee !important;
  border-radius: 0.25rem;
}
.MyCustomClass {
  width: 100%;
  height: 140px !important;
  object-fit: cover;
}

.MyCustomClass1 {
  width: 100%;
  height: 170px !important;
  -o-object-fit: cover;
  object-fit: cover;
  padding: 10px;
}

.VueCarousel-dot-container {
  display: inline-block;
  margin: 0 auto;
  padding: 0;
  margin-top: -21px !important;
}

.VueCarousel-dot {
  display: inline-block;
  cursor: pointer;
  appearance: none;
  border: none;
  background-clip: content-box;
  box-sizing: content-box;
  padding: 0;
  border-radius: 100%;
  outline: none;
  background-color: #525669 !important;
  width: 5px !important;
  height: 5px !important;
}

#carousel05 {
  width: 100%;
  height: 210px !important;
}

.VueCarousel-pagination {
  width: 100%;
  z-index: 9000;
  margin-top: -5px;
  text-align: center;
}
/* .Rate__star.filled,
.Rate__star.hover {
  color: #efc20f !important;
  margin-left: -13px !important;
} */

.Rate__star {
  color: #dedbdb;

  display: inline-block;
  padding: 0px !important;
  text-decoration: none;
  cursor: pointer;
  background: transparent none;
  border: 0;
}
</style>
