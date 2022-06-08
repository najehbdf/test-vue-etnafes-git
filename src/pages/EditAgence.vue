<template>
  <div class="content">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb" style="background-color:#a6bfe6 !important">
        <li class="breadcrumb-item">
          <router-link :to="{name:'mes_agences_active'}">Prestataire de Services</router-link>
        </li>
        <li class="breadcrumb-item active" style="color:#000" aria-current="page">Edit Agence</li>
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
    <div v-if="adagence.id==propagence[0].id && loaded==true">
      <h4>
        <span style="color:#333">Prestataire de Services&nbsp;</span>
        <i class="fa fa-trash" style="color:#de524d" v-on:click="deleteAgence(agence.id)"></i>
        &nbsp;
      </h4>
      <card style="border:solid 1px;padding:15px">
        <form v-on:submit.prevent="updateAgence(agence.id,agence)" class="mb-3">
          <div class="row">
            <div class="col-md-4 pr-md-1 text-left">
              <base-input
                disabled
                label="Nom agence"
                placeholder="Nom agence"
                v-model="agence.nom_agence"
              ></base-input>
            </div>
            <div class="col-md-4 px-md-1 text-left">
              <base-input
                type="text"
                label="Adresse"
                placeholder="Adresse"
                v-model="agence.adresse"
              ></base-input>
            </div>

            <div class="col-md-4 pl-md-1 text-left">
              <base-input
                type="text"
                label="Telephone"
                placeholder="Telephone"
                v-model="agence.telephone"
              ></base-input>
            </div>
          </div>

          <div class="row">
            <div class="col-md-4 text-left">
              <base-input placeholder="Email" label="Email" v-model="agence.email" type="email"></base-input>
            </div>
            <div class="col-md-5 text-left">
              <label>Ville</label>
              <select class="form-control" v-model="agence.ville_id" name="ville">
                <option
                  v-for="ville in villes"
                  v-bind:key="ville.id"
                  v-bind:value="ville.id"
                >{{ville.nom}}</option>
              </select>
            </div>
          </div>

          <button
            class="btn btn-success"
            type="submit"
            fill
            style="margin-left:10px;color:#fff;margin-bottom:20px;border-radius: 18px 0px 18px 0px;"
          >Modifier</button>
        </form>
      </card>

      <br />
    </div>
    <div class="container" v-if="adagence.id!=propagence[0].id && loaded==true">
      <card>
        <p>Vous n'avez pas le droit de consulter cette agence</p>
      </card>
    </div>
  </div>
</template>
<script>
import { Card, BaseInput } from "@/components/index";
import { apiDomain } from "../config";
export default {
  components: {
    Card,
    BaseInput
  },
  data() {
    return {
      loaded :false,
      villes: {},
      formstate: {},
      agence: {},
      adagence: {},

      packs: []
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
    }
  },
  created() {
    this.fetchVilles();
    this.fetchAgence(this.$route.params.id);
  },
  methods: {
    fetchVilles() {
      fetch(`${apiDomain}/api/villes`)
        .then(res => res.json())
        .then(res => {
          this.villes = res;
        })
        .catch(err => console.log(err));
    },

    fetchAgence(id) {
      fetch(`${apiDomain}/api/agences/${id}`)
        .then(res => res.json())
        .then(res => {
          this.loaded = true;
          this.agence = res.agencedetail;
          this.adagence = res.agencedetail.admin_agence;
        })
        .catch(err => console.log(err));
    },

    updateAgence(id, agence) {
      this.agence.nom_agence = agence.nom_agence;
      this.agence.email = agence.email;
      this.agence.telephone = agence.telephone;
      this.agence.adresse = agence.adresse;
      this.agence.ville_id = agence.ville_id;
      this.agence.adagence_id = agence.adagence_id;

      fetch(`${apiDomain}/api/agence/${id}`, {
        method: "put",
        body: JSON.stringify(this.agence),
        headers: {
          "content-type": "application/json"
        }
      })
        .then(res => {
          if (res.status == 200) {
            this.$fire({
              text: "Votre agence a été modifié avec succés",
              type: "success",
              timer: 90000
            }).then(r => {
              window.location.reload();
            });
          }
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

