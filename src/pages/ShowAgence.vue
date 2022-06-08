<template>
  <div class="content">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb" style="background-color: #a6bfe6 !important">
        <li class="breadcrumb-item">
          <router-link :to="{ name: 'mes_agences_active' }"
            >Prestataire de Services</router-link
          >
        </li>
        <li
          class="breadcrumb-item active"
          style="color: #000"
          aria-current="page"
        >
          Détails Agence
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
    <div class="container" v-if="adagence.id == propagence[0].id && loaded==true">
      <div class="row">
        <div class="col-md-12">
          <div class="card mb-3" style="max-width: 540px">
            <div class="row g-0">
              <div class="col-md-4">
                <!-- <img loading="lazy"
                  :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_agence/${adagence.photo}`"
                  alt="Profile Photo"
                />&nbsp;-->
                <img loading="lazy"
                  style="padding: 10px"
                  :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_agence/${agence.logo}`"
                  alt="Profile Photo"
                />&nbsp;
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">{{ agence.nom_agence }}</h5>
                  <p class="card-text">Email: {{ agence.email }}</p>
                  <p class="card-text">Telephone: {{ agence.telephone }}</p>
                  <hr />
                  <p class="card-text">
                    <small class="text-muted">{{ agence.adresse }}</small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="col-md-12">
          <b-card no-body>
            <h2 style="margin-left:20px;margin-top:30px;color:#000">
              {{agence.nom_agence}}
              <router-link :to="{name:'edit_agence', params: { id:agence.id} }">
                <i class="fa fa-xs fa-edit text-info mr-3" title="Modifier l'agence"></i>
              </router-link>
            </h2>
            <div style="padding:20px">
              <p>{{agence.adresse}}</p>
              <p>{{agence.telephone}}</p>
              <p>{{agence.email}}</p>
            </div>
          </b-card>
        </div>-->
      </div>
    </div>
    <div class="container" v-if="adagence.id != propagence[0].id && loaded==true">
      <card>
        <p>Vous n'avez pas le droit de consulter cette agence</p>
      </card>
    </div>
  </div>
</template>
<script>
import { apiDomain } from "../config";
import { Card, BaseInput } from "@/components/index";
export default {
  components: {
    Card,
    BaseInput,
  },
  data() {
    return {
      loaded :false,

      index: null,
      index1: null,
      apiDomain: "https://etnafesapi20212018.etnafes.com",
      agence: {},
      adagence: {},
      agences: [],
    };
  },

  computed: {
    loggedIn() {
      return this.$store.getters.get_loggedIn;
    },
    propagence() {
      return this.$store.getters.get_propagence;
    },

    user() {
      return this.$store.getters.get_user;
    },
  },
  created() {
    this.fetchAgence(this.$route.params.id);
  },
  methods: {
    fetchAgence(id) {
      fetch(`${apiDomain}/api/agences/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.loaded = true;

          this.agence = res.agencedetail;
          this.adagence = res.agencedetail.admin_agence;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

