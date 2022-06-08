<template>
  <div class="content">
    <div class="row">
      <div class="col-md-12">
        <card>
          <template slot="header">
            <h5 class="title" style="margin-top:15px">Modifier Voyageur</h5>
          </template>
          <div class="row">
            <div class="col-md-5 pr-md-1 text-left">
              <base-input label="Nom" placeholder="Nom" v-model="client.nom"></base-input>
            </div>
            <div class="col-md-3 px-md-1 text-left">
              <base-input label="Prenom" placeholder="Prenom" v-model="client.prenom"></base-input>
            </div>
            <div class="col-md-4 pl-md-1 text-left">
              <base-input label="Adresse Email" type="email" v-model="client.email"></base-input>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 pr-md-1 text-left">
              <base-input label="Telephone" v-model="client.telephone" placeholder="Telephone"></base-input>
            </div>
            <div class="col-md-6 pl-md-1 text-left">
              <base-input
                label="Gouvernorat"
                v-model="client.gouvernorat"
                placeholder="Gouvernorat"
              ></base-input>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12 text-left">
              <select
                class="form-control"
                name="civilité"
                id="civilité"
                v-model="client.civilité"
                required
              >
                <option value="mr">Mr</option>
                <option value="mme">Mme</option>
                <option value="mlle">Mlle</option>
              </select>
            </div>
          </div>
          <br />

          <template slot="footer">
            <base-button
              type="success"
              @click.prevent="updateClient(client.id,client)"
              fill
            >Modifier</base-button>
          </template>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
import UserCard from "./Profile/UserCard.vue";
import { apiDomain } from "../config";
import { Card, BaseInput } from "@/components/index";

import BaseButton from "@/components/BaseButton";
export default {
  components: {
    UserCard,
    Card,
    BaseInput,
    BaseButton
  },
  data() {
    return {
      client: {},
      agences: {},
      paiements: {}
    };
  },

  created() {
    this.fetchClient(this.$route.params.id);
    this.fetchAgences();
    this.fetchPaiements();
  },
  methods: {
    updateClient(id, client) {
      this.client.id = client.id;
      this.client.nom = client.nom;
      this.client.prenom = client.prenom;
      this.client.email = client.email;
      this.client.telephone = client.telephone;
      this.client.gouvernorat = client.gouvernorat;
      this.client.civilité = client.civilité;
      this.client.agence_id = client.agence_id;
      this.client.paiement_id = client.paiement_id;

      fetch(
        `${apiDomain}/api/client/update/${id}?token=${this.$store.state.token}`,
        {
          method: "post",
          body: JSON.stringify(this.client),
          headers: {
            "content-type": "application/json"
          }
        }
      )
        .then(res => res.json())

        .then(data => {
          if (confirm("compte voyageur bien modifié")) {
            window.location.reload();
          }
        })
        .catch(err => console.log(err));
    },
    fetchPaiements() {
      axios
        .get(`${apiDomain}/api/paiements`)
        .then(({ data }) => (this.paiements = data));
    },
    fetchClient(id) {
      fetch(`${apiDomain}/api/client/${id}?token=${this.$store.state.token}`)
        .then(res => res.json())
        .then(res => {
          this.client = res;
        })
        .catch(err => console.log(err));
    },

    fetchAgences() {
      axios
        .get(`${apiDomain}/api/agences`)
        .then(({ data }) => (this.agences = data));
    }
  }
};
</script>
