<template>
  <div class="content">
    <div class="container" style="margin-bottom: 70px; margin-top: 20px">
      <div class="row">
        <div class="col-md-12">
          <b-card no-body>
            <h2 style="margin-left: 20px; margin-top: 30px; color: #000">
              {{ agencenotif.nom_agence }}
              <router-link
                :to="{ name: 'edit_agence', params: { id: agencenotif.id } }"
              >
                <i
                  class="fa fa-xs fa-edit text-info mr-3"
                  title="Modifier l'agence"
                ></i>
              </router-link>
            </h2>
            <div style="padding: 20px">
              <p>{{ agencenotif.adresse }}</p>
              <p>{{ agencenotif.telephone }}</p>
              <p>{{ agencenotif.email }}</p>
            </div>
          </b-card>
        </div>
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
      agencenotif: {},
      agences: [],
    };
  },

  computed: {
    loggedIn() {
      return this.$store.getters.get_loggedIn;
    },

    user() {
      return this.$store.getters.get_user;
    },
  },
  created() {
    this.fetchAgence(this.$route.params.id);
  },

  mounted() {
    if (localStorage.getItem("reloaded")) {
      localStorage.removeItem("reloaded");
    } else {
      localStorage.setItem("reloaded", "1");
      location.reload();
    }
  },
  methods: {
    fetchAgence(id) {
      fetch(`${apiDomain}/api/agences-read/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.agencenotif = res.agencenotif;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

