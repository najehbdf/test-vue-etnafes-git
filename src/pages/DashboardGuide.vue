<template>
  <div class="content">
    <div class="row">
      <div class="card mb-3" style="max-width: 540px">
        <div class="row g-0">
          <div class="col-md-4">
            <img loading="lazy"
              style="padding: 10px"
              :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_client/${client.photo}`"
              alt="Profile Photo"
            />&nbsp;
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">
                {{ client.nom }} {{ client.prenom }}, {{ client.civilité }}
              </h5>
              <p class="card-text">Email: {{ client.email }}</p>
              <p class="card-text">Telephone: {{ client.telephone }}</p>
              <hr />
              <p class="card-text">
                <small class="text-muted">{{ guide.présentation }}</small>
              </p>
            </div>
          </div>
        </div>
      </div>
      &nbsp;&nbsp;
      <div class="card mb-3" style="max-width: 540px">
        <div class="row g-0">
          <div class="col-md-4">
            <img loading="lazy"
              style="padding: 10px"
              :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_guide/${guide.carte_professionnel}`"
              alt="Profile Photo"
            />&nbsp;
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">Carte identité: {{ guide.cin }}</h5>
              <p class="card-text">
                Langue de visite: {{ guide.langue_de_visite }}
              </p>
              <p class="card-text">
                Langue maternelle: {{ guide.langue_maternelle }}
              </p>
              <hr />
              <p class="card-text">
                <small class="text-muted"
                  >A joint Etnafes le {{ guide.created_at }}</small
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Card } from "@/components/index";
import LineChart from "@/components/Charts/LineChart";
import BarChart from "@/components/Charts/BarChart";
import * as chartConfigs from "@/components/Charts/config";
import TaskList from "./Dashboard/TaskList";
import UserTable from "./Dashboard/UserTable";
import config from "@/config";
import { apiDomain } from "../config";
export default {
  components: {
    Card,
    LineChart,
    BarChart,
    TaskList,
    UserTable,
  },
  data() {
    return {
      guide: [],
      client: [],
    };
  },

  created() {
    this.fetchguide(this.$store.state.user.id);
  },

  computed: {
    loggedIn() {
      return this.$store.getters.get_loggedIn;
    },

    user() {
      return this.$store.getters.get_user;
    },
  },
  methods: {
    fetchguide(id) {
      fetch(`${apiDomain}/api/guide/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.guide = res.guide[0];
          this.client = res.client;
          this.ville = res.guide.ville;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
