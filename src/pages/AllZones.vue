<template>
  <div class="content">
    <router-link :to="{ name: 'nouvelle_zone' }">
      <button
        type="button"
        class="btn btn-outline-success mt-3"
        style="
          color: #fff;
          margin-bottom: 20px;
          border-radius: 18px 0px 18px 0px;
        "
      >
        <i class="fa fa-plus"></i>
        &nbsp;&nbsp;Nouvelle zone
      </button>
    </router-link>
    <div class="col-md-4">
      <div class="form-group">
        <input
          v-model="search"
          class="form-control"
          aria-label="label"
          type="text"
          placeholder="Chercher ... "
        />
      </div>
    </div>
    <b-tabs card>
      <b-tab :title="filtered.length + ' ' + 'Les Zones'" active>
        <div class="row">
          <div class="col-12">
            <!-- <template slot="header">
                <h4 class="card-title">Liste des zones touristiques</h4>
            </template>-->
            <div
              class="table-responsive text-left"
              style="border: solid 1px #9b9b9b"
            >
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col" style="text-transform: none">Nom</th>
                    <th scope="col" style="text-transform: none">
                      Description
                    </th>
                    <th scope="col" style="text-transform: none">Ville</th>
                    <th scope="col" style="text-transform: none">
                      <center>Actions</center>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="zone in filtered" v-bind:key="zone.id">
                    <td>{{ zone.nom }}</td>
                    <td>
                      {{ zone.description }}
                      <br />
                      <p>
                        <b style="color: #ff931f">Vidéo:&nbsp;</b>
                        <a :href="zone.url_video">{{ zone.url_video }}</a>
                      </p>
                    </td>
                    <td>{{ zone.ville.nom }}</td>
                    <td>
                      <center>
                        <router-link
                          :to="{ name: 'show_zone', params: { id: zone.id } }"
                        >
                          <i
                            style="color: blue"
                            title="Détails du client"
                            class="tim-icons icon-send"
                          ></i>
                          &nbsp;
                        </router-link>

                        <router-link
                          :to="{ name: 'edit_zone', params: { id: zone.id } }"
                        >
                          <i
                            style="color: #62b062"
                            title="Modifier la zone"
                            class="tim-icons icon-pencil"
                          ></i
                          >&nbsp;
                        </router-link>
                        <i
                          style="color: #fd5d93"
                          class="tim-icons icon-simple-remove"
                          title="Delete zone"
                          @click="deleteZone(zone.id)"
                        ></i>
                      </center>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </b-tab>
      <b-tab title="Corbeille">
        <template #title>
          {{ filteredCorbeil.length }} Corbeille
          <i
            style="color: red !important"
            class="fa fa-trash text-danger fa-lg"
            title="Clients"
          ></i>
        </template>
        <div class="row">
          <div class="col-12">
            <div
              class="table-responsive text-left"
              style="border: solid 1px #9b9b9b"
            >
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col" style="text-transform: none">Nom</th>
                    <th scope="col" style="text-transform: none">
                      Description
                    </th>
                    <th scope="col" style="text-transform: none">Ville</th>
                    <th scope="col" style="text-transform: none">
                      <center>Actions</center>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="zone in filteredCorbeil" v-bind:key="zone.id">
                    <td>{{ zone.nom }}</td>
                    <td>
                      {{ zone.description }}
                      <br />
                      <p>
                        <b style="color: #ff931f">Vidéo:&nbsp;</b>
                        <a :href="zone.url_video">{{ zone.url_video }}</a>
                      </p>
                    </td>
                    <td>{{ zone.ville.nom }}</td>
                    <td>
                      <center>
                        <i
                          onmouseover="this.style.cursor='pointer'"
                          style="color: green"
                          class="fas fa-trash-restore"
                          @click="restoreZone(zone.id)"
                        ></i>
                        &nbsp;
                        <i
                          onmouseover="this.style.cursor='pointer'"
                          style="color: #fd5d93"
                          class="fas fa-trash-alt"
                          @click="ForcedeleteZone(zone.id)"
                        ></i>
                      </center>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </b-tab>
    </b-tabs>
  </div>
</template>
<script>
import BaseTable from "@/components/BaseTable";
import { Card } from "@/components/index";
import { apiDomain } from "../config";
const tableColumns = ["Titre", "Date_deb", "Date_fin", "Prix_fix"];

export default {
  components: {
    Card,
    BaseTable,
  },
  data() {
    return {
      search: "",
      table1: {
        title: "Simple Table",
        columns: [...tableColumns],
      },
      zones: [],
      zonescorbeille: [],
    };
  },

  computed: {
    filtered: function () {
      if (Array.isArray(this.zones)) {
        return this.zones.filter((pack) => {
          return (
            pack.nom.toLowerCase().match(this.search.toLowerCase()) ||
            pack.ville.nom.toLowerCase().match(this.search.toLowerCase())
          );
        });
      }
    },

    filteredCorbeil: function () {
      if (Array.isArray(this.zonescorbeille)) {
        return this.zonescorbeille.filter((pack) => {
          return (
            pack.nom.toLowerCase().match(this.search.toLowerCase()) ||
            pack.description.toLowerCase().match(this.search.toLowerCase())
          );
        });
      }
    },
    loggedIn() {
      return this.$store.getters.get_loggedIn;
    },

    user() {
      return this.$store.getters.get_user;
    },
  },
  created() {
    this.fetchZones();
  },
  methods: {
    fetchZones() {
      fetch(`${apiDomain}/api/allzones`)
        .then((res) => res.json())
        .then((res) => {
          this.zones = res.zones;
          this.zonescorbeille = res.zonescorbeille;
        })
        .catch((err) => console.log(err));
    },
    restoreZone(id) {
      axios.post(`${apiDomain}/api/restore/zone/${id}`).then((response) => {
        if (response.status == 200) {
          this.$noty.success("Bien restaurée.");
          this.fetchZones();
        }
      });
    },
    ForcedeleteZone(id) {
      if (confirm("Are You Sure?")) {
        fetch(`${apiDomain}/api/force/zone/${id}`, {
          method: "delete",
        })
          .then((res) => res.json())
          .then((data) => {
            this.$noty.success("La zone touristique a été bien supprimé...", {
              killer: true,
              timeout: 6000,
              layout: "topRight",
            });
            this.fetchZones();
          })
          .catch((err) => console.log(err));
      }
    },
    deleteZone(id) {
      if (confirm("Are You Sure?")) {
        fetch(`${apiDomain}/api/zone/delete/${id}`, {
          method: "delete",
        })
          .then((res) => res.json())
          .then((data) => {
            alert("Zone touristique Supprimée");
            window.location.reload();
          })
          .catch((err) => console.log(err));
      }
    },
  },
};
</script>