<template>
  <div class="content">
    <div class="row">
      <div class="col-12">
        <div>
          <b-card-group deck>
            <b-card header="Packs" header-tag="header" footer-tag="footer">
              <b-card-text>
                Nombre des Packs :
                <b>{{packs.length}} packs</b>
              </b-card-text>
              <router-link :to="{ name: 'Packs'}">
                <b-button variant="primary" style="margin-top:15px">Liste des Packs</b-button>
              </router-link>
            </b-card>

            <b-card header="Clients" header-tag="header" footer-tag="footer">
              <b-card-text>
                Nombre des Clients :
                <b>{{clients.length}} clients</b>
              </b-card-text>
              <router-link :to="{ name: 'Clients'}">
                <b-button variant="primary" style="margin-top:15px">Liste des Clients</b-button>
              </router-link>
            </b-card>
          </b-card-group>
          <br />

          <b-card-group deck>
            <b-card header="Zones Touristiques" header-tag="header" footer-tag="footer">
              <b-card-text>
                Nombre des Zones :
                <b>{{zones.length}} zones touristiques</b>
              </b-card-text>
              <router-link to="/allzones">
                <b-button variant="primary" style="margin-top:15px">Liste des Zones</b-button>
              </router-link>
            </b-card>

            <b-card header="Hebergements" header-tag="header" footer-tag="footer">
              <b-card-text>
                Nombre des Hebergements :
                <b>{{hebergements.length}} Maisons d'hotes</b>
              </b-card-text>
              <router-link to="/allhebergements">
                <b-button variant="primary" style="margin-top:15px">Liste des Hebergements</b-button>
              </router-link>
            </b-card>
          </b-card-group>

          <br />

          <b-card-group deck>
            <b-card header="Reservations" header-tag="header" footer-tag="footer">
              <b-card-text>
                <b>{{reservations.length}} Réservations (Packs) -- {{reservations.length}} Réservations (Etnafes Libre)</b>
              </b-card-text>
              <router-link to="/allreservations">
                <b-button variant="primary" style="margin-top:15px">Liste des Réservations</b-button>
              </router-link>
            </b-card>
          </b-card-group>
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
    UserTable
  },
  data() {
    return {
      packs: [],
      zones: [],
      clients: [],
      reservations: [],
      hebergements: [],
      notifications: {}
    };
  },

  created() {
    this.fetchNotifications();
    this.fetchPacks();
    this.fetchClients();
    this.fetchZones();
    this.fetchHebergements();
    this.fetchReservations();
  },

  methods: {
    fetchReservations() {
      fetch(`${apiDomain}/api/allreservations?token=${this.$store.state.token}`)
        .then(res => res.json())
        .then(res => {
          this.reservations = res.reservations;
        })
        .catch(err => console.log(err));
    },
    fetchHebergements() {
      fetch(`${apiDomain}/api/allhebergements`)
        .then(res => res.json())
        .then(res => {
          this.hebergements = res.hebergements;
        })
        .catch(err => console.log(err));
    },
    fetchZones() {
      fetch(`${apiDomain}/api/allzones`)
        .then(res => res.json())
        .then(res => {
          this.zones = res.zones;
        })
        .catch(err => console.log(err));
    },
    fetchClients() {
      fetch(`${apiDomain}/api/allclients?token=${this.$store.state.token}`)
        .then(res => res.json())
        .then(res => {
          this.clients = res.clients;
        })
        .catch(err => console.log(err));
    },
    fetchPacks() {
      fetch(`${apiDomain}/api/allpacks?token=${this.$store.state.token}`)
        .then(res => res.json())
        .then(res => {
          this.packs = res.packs.data;
        })
        .catch(err => console.log(err));
    },
    fetchNotifications() {
      fetch(`${apiDomain}/api/notifications`)
        .then(res => res.json())
        .then(res => {
          this.notifications = res.notifications;
        })
        .catch(err => console.log(err));
    }
  }
};
</script>
