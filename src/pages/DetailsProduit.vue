<template>
  <div>
    <TopNavbarHome />
     <!-- <b-modal id="modal-post" title="paiement en ligne">
      <form  class="mb-3">
     <div class="row">
       <div class="col-12">
         <img loading="lazy" style="margin-left: 102px;
    margin-top: 14px;
    border: 1px solid #c3bfbf;" src="/Capture_post.png" />
       </div>
     </div>
        
      </form>
    </b-modal>  -->
 <b-modal id="modal-inscription" class="modal-dialog modal-sm">
      <div>
        <b-tabs content-class="mt-3">
          <b-tab title="Inscription" active>
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
    <div class="container" >
      
      <div class="row">
        
        <div class="col-md-6" style="background: #fff;" >
          <div >

            <!-- <carousel
    :starting-image="2"
    :images="get_image_url"
></carousel> -->
<lingallery :iid.sync="currentId" style="margin-top: 30px;" :width="600" :height="400" responsive="true" :items="get_image_url"/>
          
            
             <!-- <vue-gallery-slideshow 
                    
                    :images="get_image_url"
                    index="0"
                    @close="index = null"
                  >
                  </vue-gallery-slideshow>  -->

            </div>
          
          <!-- <img loading="lazy" :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_produits_zones/${produit.image_couverture}`"/>  -->

          
        </div>
        <div class="col-md-6">
          <b-card no-body>
            <h2 style="margin-left: 20px;margin-top: 30px;">
              {{ produit.titre }}
            </h2>

            <p style="margin-left: 20px">
              {{ produit.description }}

            </p>
            <p style="margin-left: 20px;font-weight:bold">
              Référence:

            </p>
            

            <!-- <p style="margin-left: 20px;font-weight: 400;
    line-height: 30px;    color: #555555;margin-top: 20px;
    font-size: 22px;"> {{ (produit.prix).toFixed(3) }} TND 
    </p> -->

    <p style="margin-left: 20px;font-weight: 400;
    line-height: 30px;    color: #555555;margin-top: 20px;
    font-size: 22px;">  
    {{ (Number(nb_produit) * produit.prix).toFixed(3) }} TND
    </p>
                            <p style="margin-left: 20px;margin-top: 20px"> Quantité: {{ produit.qts }} </p> 
<div id="product-description-short-22" class="product-description-short" itemprop="description"></div>
          <div class="row" style="margin-top: 30px">
            <div class="col-md-3">

            <input style="margin-left: 20px;margin-top: 2px;height: calc(2.25rem + 7px);
    width: 65px;" type="number" v-model="nb_produit" min="1" max="10" step="1" v-on:input="updateNbProduit"/>
            </div>

            <div class="col-md-4">
              <button  v-if=" !loggedIn "
            style="background: #ff931f !important;border-radius:20px"
            class="btn style_commander" v-b-modal.modal-inscription
          >
                    + Commander ce produit
                  </button>

                
            </div>
            
           
          </div>
          <div class="row" style="margin-left:20px;margin-bottom:30px">
            <img loading="lazy" src="https://img.icons8.com/ios/25/000000/like--v1.png"/>&nbsp; Ajouter aux favoris
          </div>
          </b-card>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script src="path-to-the-file/splide.min.js"></script>
<script>
// import { Splide, SplideSlide } from '@splidejs/splide';
import axios from "axios";
import TopNavbarHome from "./Layout/TopNavbarHome.vue";
import Carousel from './Carousel.vue'
import Footer from "./Layout/Footer.vue";
import { apiDomain } from "../config";
import VueGallerySlideshow from "vue-gallery-slideshow";
import Lingallery from 'lingallery';
import VuePassword from "vue-password";
import VuePhoneNumberInput from "vue-phone-number-input";

/* import '@splidejs/splide/dist/css/themes/splide-skyblue.min.css';
import '@splidejs/splide/dist/js/splide.esm.js'; */



export default {
  components: {
    VuePhoneNumberInput,

    Lingallery,
    VuePassword,

    // Splide, SplideSlide,
    Carousel,
    TopNavbarHome,
    Footer,
    VueGallerySlideshow,

  },
  data() {
    return {
      client: {},
      password: null,
      password_length: 0,
      contains_eight_characters: false,
      contains_number: false,
      contains_uppercase: false,
      contains_special_character: false,
      valid_password: false,
      validationErrors: "",
      index: null,
     items:[
       {
          src: 'https://picsum.photos/600/400/?image=0',
          thumbnail: 'https://picsum.photos/64/64/?image=0',
          caption: 'Some Caption',
          id: 'someid1',
        },
        {
          src: 'https://picsum.photos/600/400/?image=10',
          thumbnail: 'https://picsum.photos/64/64/?image=10',
        }
        
        ],
currentId: null,
      nb_produit: 1,
      apiDomain: "https://etnafesapi20212018.etnafes.com",   
      produit: {},
      image_produit:{},
      client: {},
    };
  },

  created() {
    this.fetchProduit(this.$route.params.id);
    
  },

  computed:{
    loggedIn() {
      return this.$store.getters.get_loggedIn;
    },

 get_image_url() {
      var result = [];
      var moyenne = "";

      const res = this.image_produit;
      for (var i = 0; i < res.length; i++) {
           moyenne =
            "https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_produits_zones/" +
            res[i].image; 
            // moyenne =res[i].image;
          // result.push(moyenne);
          result.push({ src: moyenne, thumbnail:moyenne });
 
      }

      return result;
    },
  },
  methods: {

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
              name: "CommandeProduit",
              params: { id: this.$route.params.id },
            });
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

    updateNbProduit(e) {
      this.$store.commit("updateNbProduit", e.target.value);
    },
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },

    fetchLocations(id) {
      axios
        .post(`${apiDomain}/api/findheb/${id}`, { center: this.center })
        .then((response) => {
          let data = response.data;
          Bus.$emit("markers_fetched", data);
        });
    },

    fetchProduit(id) {
      fetch(`${apiDomain}/api/get_produit/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.produit = res.produit;
          this.image_produit = res.produit.image_produit;

        })
        .catch((err) => console.log(err));
    },
    
  },
};
</script>

<style>

.product-description-short {
    padding: 0 0 15px 0;
    margin: 15px 0;
    border-bottom: 1px solid #ebebeb;
    display: inline-block;
    width: 100%;
    color: #888888;
}
.style_commander{
    /* margin-left: 20px; */
    margin-bottom: 34px !important;
    background: rgb(255, 147, 31) !important;
}
.post{
  width: 43%;
    margin-top: -2px;
    margin-left: 55px;
}
</style>
