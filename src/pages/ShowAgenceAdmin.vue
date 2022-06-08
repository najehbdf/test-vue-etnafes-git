<template>
  <div class="content">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb" style="background-color: #a6bfe6 !important">
        <li class="breadcrumb-item">
          <a href="/allagences">Les agences</a>
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
    <div class="container">
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
                  <h5 class="card-title">
                    {{ agence.nom_agence }}
                    <i
                      v-if="adagence.adagence == 0"
                      onmouseover="this.style.cursor='pointer'"
                      title="Valider le proprietaire de l'agence"
                      style="color: red; float: right"
                      class="fas fa-user-check mr-3 fa-xs"
                      @click.once="
                        validateAdAgence(agence.adagence_id, adagence)
                      "
                    ></i>

                    <i
                      title="Valider l'agence"
                      v-if="agence.valide == 0"
                      onmouseover="this.style.cursor='pointer'"
                      style="color: red"
                      class="fas fa-check-square mr-3 fa-xs"
                      @click.once="validateAgence(agence.id, agence)"
                    ></i>
                  </h5>
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
  </div>
</template>
<script>
import { apiDomain } from "../config";
export default {
  data() {
    return {
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
    validateAdAgence(id, adagence) {
      fetch(`${apiDomain}/api/adagence-validate/${id}`, {
        method: "put",
        body: JSON.stringify(this.adagence),
        headers: {
          "content-type": "application/json",
        },
      }).then((res) => {
        if (res.status == 200) {
          this.$fire({
            text: "Admin agence validé",
            type: "success",
            timer: 90000,
          }).then((r) => {
            window.location.reload();
          });
        }
      });
    },

    validateAgence(id, agence) {
      fetch(`${apiDomain}/api/agence-validate/${id}`, {
        method: "put",
        body: JSON.stringify(this.agence),
        headers: {
          "content-type": "application/json",
        },
      }).then((res) => {
        if (res.status == 200) {
          this.$fire({
            text: "Agence validé",
            type: "success",
            timer: 90000,
          }).then((r) => {
            window.location.reload();
          });
        }
      });
    },
    fetchAgence(id) {
      fetch(`${apiDomain}/api/agencesad/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.agence = res.agencedetail;
          this.adagence = res.agencedetail.admin_agence;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

