<template>
  <div class="content">
    <div>
      <!-- debut nouveau travail notification -->

      <div>
        <b-tabs content-class="mt-3" fill>
          <b-tab :title="'voyageurs' + '(' + clientsUnread.length + ')'" active>
            <b-card-text>
              <span style="margin-left: 10px"
                >Liste des voyageurs inscrits</span
              >
              <li
                style="
                  margin: 8px;
                  border: 1px solid #d1d1d1;
                  border-radius: 2px;
                  text-align: left;
                  background-color: #e7f1fd;
                "
                class="nav-link tt"
                v-for="notification in clientsUnread"
                :key="notification.id"
              >
                <router-link
                  class="a"
                  @click="makeread"
                  :to="{
                    name: 'show_client',
                    params: { id: notification.id },
                  }"
                >
                  <div class="row">
                    <a href="#" class="nav-item dropdown-item">
                      <img loading="lazy"
                        class="photo"
                        width="7%"
                        :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_client/${notification.photo}`"
                        alt="Profile Photo"
                      />
                      &nbsp;
                      <span style="font-weight: bold"
                        >{{ notification.nom }} {{ notification.prenom }}</span
                      >
                      &nbsp;s'est inscrit à etnafes
                      <b>{{ notification.human_created_at }}</b>
                    </a>
                  </div>
                </router-link>
              </li>
              <div v-if="clientsUnread.length == 0">
                <p style="padding: 20px">
                  Pas de notification pour le moment
                  <img loading="lazy" src="/not-disturb-etnafes.png" />
                </p>
              </div> </b-card-text
          ></b-tab>
          <b-tab :title="'Hébergeurs' + '(' + propsUnread.length + ')'"
            ><b-card-text>
              <span style="margin-left: 10px"
                >Liste des Hébergeurs inscrits</span
              >
              <li
                class="nav-link tt"
                v-for="notification in propsUnread"
                :key="notification.id"
                style="
                  margin: 8px;
                  border: 1px solid #d1d1d1;
                  border-radius: 2px;
                  text-align: left;
                  background-color: #e7f1fd;
                "
              >
                <router-link
                  class="a"
                  @click="makeread"
                  :to="{
                    name: 'show_hebergeur',
                    params: { id: notification.id },
                  }"
                >
                  <div class="row">
                    <a href="#" class="nav-item dropdown-item">
                      <img loading="lazy"
                        class="photo"
                        width="7%"
                        :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_prop/${notification.client.photo}`"
                        alt="Profile Photo"
                      />
                      &nbsp;
                      <span style="font-weight: bold"
                        >{{ notification.client.nom }}
                        {{ notification.client.prenom }}</span
                      >
                      &nbsp;s'est inscrit
                      <b>{{ notification.human_created_at }}</b>
                    </a>
                  </div>
                </router-link>
              </li>
              <div v-if="propsUnread.length == 0">
                <p style="padding: 20px">
                  Pas de notification pour le moment
                  <img loading="lazy" src="/not-disturb-etnafes.png" />
                </p>
              </div> </b-card-text
          ></b-tab>

          <b-tab :title="'Guides' + '(' + guidesUnread.length + ')'"
            ><b-card-text>
              <span style="margin-left: 10px">Liste des guides inscrits</span>
              <li
                class="nav-link tt"
                v-for="notification in guidesUnread"
                :key="notification.id"
                style="
                  margin: 8px;
                  border: 1px solid #d1d1d1;
                  border-radius: 2px;
                  text-align: left;
                  background-color: #e7f1fd;
                "
              >
                <router-link
                  class="a"
                  @click="makeread"
                  :to="{
                    name: 'show_guide',
                    params: { id: notification.id },
                  }"
                >
                  <div class="row">
                    <a href="#" class="nav-item dropdown-item">
                      <img loading="lazy"
                        width="7%"
                        class="photo"
                        :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_client/${notification.client.photo}`"
                        alt="Profile Photo"
                      />
                      &nbsp;
                      <span style="font-weight: bold"
                        >{{ notification.client.nom }}
                        {{ notification.client.prenom }}</span
                      >
                      &nbsp;s'est inscrit à Etnafes
                      <b>{{ notification.human_created_at }}</b>
                    </a>
                  </div>
                </router-link>
              </li>
              <div v-if="guidesUnread.length == 0">
                <p style="padding: 20px">
                  Pas de notification pour le moment
                  <img loading="lazy" src="/not-disturb-etnafes.png" />
                </p>
              </div> </b-card-text
          ></b-tab>

          <b-tab :title="'Agences' + '(' + adagenceUnread.length + ')'"
            ><b-card-text>
              <span style="margin-left: 10px"
                >Liste des proprietaires agences inscrits</span
              >
              <li
                class="nav-link tt"
                v-for="notification in adagenceUnread"
                :key="notification.id"
                style="
                  margin: 8px;
                  border: 1px solid #d1d1d1;
                  border-radius: 2px;
                  text-align: left;
                  background-color: #e7f1fd;
                "
              >
                <router-link
                  class="a"
                  @click="makeread"
                  :to="{
                    name: 'show_adagence',
                    params: { id: notification.id },
                  }"
                >
                  <div class="row">
                    <a href="#" class="nav-item dropdown-item">
                      <img loading="lazy"
                        width="7%"
                        class="photo"
                        :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_agence/${notification.client.photo}`"
                        alt="Profile Photo"
                      />
                      &nbsp;
                      <span style="font-weight: bold"
                        >{{ notification.client.nom }}
                        {{ notification.client.prenom }}</span
                      >
                      &nbsp;s'est inscrit à Etnafes
                      <b>{{ notification.human_created_at }}</b>
                    </a>
                  </div>
                </router-link>
              </li>
              <div v-if="adagenceUnread.length == 0">
                <p style="padding: 20px">
                  Pas de notification pour le moment
                  <img loading="lazy" src="/not-disturb-etnafes.png" />
                </p>
              </div> </b-card-text
          ></b-tab>

          <!-- ---------- -->

          <b-tab :title="' Restaurants ' + '(' + propsresUnread.length + ')'"
            ><b-card-text>
              <span style="margin-left: 10px"
                >Liste des proprietaires restaurants inscrits</span
              >
              <li
                class="nav-link tt"
                v-for="notification in propsresUnread"
                :key="notification.id"
                style="
                  margin: 8px;
                  border: 1px solid #d1d1d1;
                  border-radius: 2px;
                  text-align: left;
                  background-color: #e7f1fd;
                "
              >
                <router-link
                  class="a"
                  @click="makeread"
                  :to="{
                    name: 'show_proprietaire_restau',
                    params: { id: notification.id },
                  }"
                >
                  <div class="row">
                    <a href="#" class="nav-item dropdown-item">
                      <img loading="lazy"
                        width="7%"
                        class="photo"
                        :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_prop_restau/${notification.client.photo}`"
                        alt="Profile Photo"
                      />
                      &nbsp;
                      <span style="font-weight: bold"
                        >{{ notification.client.nom }}
                        {{ notification.client.prenom }}</span
                      >
                      &nbsp;s'est inscrit à Etnafes
                      <b>{{ notification.human_created_at }}</b>
                    </a>
                  </div>
                </router-link>
              </li>
              <div v-if="propsresUnread.length == 0">
                <p style="padding: 20px">
                  Pas de notification pour le moment
                  <img loading="lazy" src="/not-disturb-etnafes.png" />
                </p>
              </div> </b-card-text
          ></b-tab>

          <b-tab
            :title="'Hébérgements +' + '(' + hebergementsUnread.length + ')'"
            ><b-card-text>
              <span style="margin-left: 10px">
                Liste des hébérgements ajoutés</span
              >
              <li
                class="nav-link tt"
                v-for="notification in hebergementsUnread"
                :key="notification.id"
                style="
                  margin: 8px;
                  border: 1px solid #d1d1d1;
                  border-radius: 2px;
                  text-align: left;
                  background-color: #e7f1fd;
                "
              >
                <router-link
                  class="a"
                  @click="makeread"
                  :to="{
                    name: 'show_hebergement_admin',
                    params: { id: notification.id },
                  }"
                >
                  <div class="row">
                    <a href="#" class="nav-item dropdown-item">
                      <img loading="lazy"
                        width="7%"
                        class="photo"
                        :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_client/${notification.photo}`"
                        alt="Profile Photo"
                      />
                      &nbsp;
                      <span style="font-weight: bold"
                        >{{ notification.nom }} {{ notification.prenom }}</span
                      >
                      &nbsp;a ajouté l'hébergement
                      <b style="color: #ff6e89">{{ notification.hebnom }}</b
                      >&nbsp;
                      <b>{{ notification.created_at }}</b>
                    </a>
                  </div>
                </router-link>
              </li>
              <div v-if="hebergementsUnread.length == 0">
                <p style="padding: 20px">
                  Pas de notification pour le moment
                  <img loading="lazy" src="/not-disturb-etnafes.png" />
                </p>
              </div> </b-card-text
          ></b-tab>

          <b-tab :title="'Agences +' + '(' + agencesUnread.length + ')'"
            ><b-card-text>
              <span style="margin-left: 10px">
                Liste des agences ajoutées
              </span>
              <li
                class="nav-link tt"
                v-for="notification in agencesUnread"
                :key="notification.id"
                style="
                  margin: 8px;
                  border: 1px solid #d1d1d1;
                  border-radius: 2px;
                  text-align: left;
                  background-color: #e7f1fd;
                "
              >
                <router-link
                  class="a"
                  @click="makeread"
                  :to="{
                    name: 'show_agence_admin',
                    params: { id: notification.id },
                  }"
                >
                  <div class="row">
                    <a href="#" class="nav-item dropdown-item">
                      <img loading="lazy"
                        width="7%"
                        class="photo"
                        :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_client/${notification.photo}`"
                        alt="Profile Photo"
                      />
                      &nbsp;
                      <span style="font-weight: bold"
                        >{{ notification.nom }} {{ notification.prenom }}</span
                      >
                      &nbsp;a ajouté l'agence
                      <b style="color: #ff6e89">{{ notification.nom_agence }}</b
                      >&nbsp;
                      <b>{{ notification.created_at }}</b>
                    </a>
                  </div>
                </router-link>
              </li>
              <div v-if="agencesUnread.length == 0">
                <p style="padding: 20px">
                  Pas de notification pour le moment
                  <img loading="lazy" src="/not-disturb-etnafes.png" />
                </p>
              </div> </b-card-text
          ></b-tab>

          <b-tab :title="'Restaurants +' + '(' + restaurantsUnread.length + ')'"
            ><b-card-text>
              <span style="margin-left: 10px">
                Liste des restaurants ajoutés
              </span>
              <li
                class="nav-link tt"
                v-for="notification in restaurantsUnread"
                :key="notification.id"
                style="
                  margin: 8px;
                  border: 1px solid #d1d1d1;
                  border-radius: 2px;
                  text-align: left;
                  background-color: #e7f1fd;
                "
              >
                <router-link
                  class="a"
                  @click="makeread"
                  :to="{
                    name: 'show_restaurant_admin',
                    params: { id: notification.id },
                  }"
                >
                  <div class="row">
                    <a href="#" class="nav-item dropdown-item">
                      <img loading="lazy"
                        width="7%"
                        class="photo"
                        :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_client/${notification.photo}`"
                        alt="Profile Photo"
                      />
                      &nbsp;
                      <span style="font-weight: bold"
                        >{{ notification.nom }} {{ notification.prenom }}</span
                      >
                      &nbsp;a ajouté le restaurant
                      <b style="color: #ff6e89">{{ notification.nomrestau }}</b
                      >&nbsp;
                      <b>{{ notification.created_at }}</b>
                    </a>
                  </div>
                </router-link>
              </li>
              <div v-if="restaurantsUnread.length == 0">
                <p style="padding: 20px">
                  Pas de notification pour le moment
                  <img loading="lazy" src="/not-disturb-etnafes.png" />
                </p>
              </div> </b-card-text
          ></b-tab>

          <b-tab :title="'Packs +' + '(' + packsUnread.length + ')'"
            ><b-card-text>
              <span style="margin-left: 10px">
                Liste des packs ajoutés par les agences
              </span>
              <li
                class="nav-link tt"
                v-for="notification in packsUnread"
                :key="notification.id"
                style="
                  margin: 8px;
                  border: 1px solid #d1d1d1;
                  border-radius: 2px;
                  text-align: left;
                  background-color: #e7f1fd;
                "
              >
                <router-link
                  class="a"
                  @click="makeread"
                  :to="{ name: 'show_pack', params: { id: notification.id } }"
                >
                  <div class="row">
                    <a href="#" class="nav-item dropdown-item">
                      <img loading="lazy"
                        width="7%"
                        class="photo"
                        :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_client/${notification.photo}`"
                        alt="Profile Photo"
                      />
                      &nbsp;
                      <span style="font-weight: bold"
                        >{{ notification.nom }} {{ notification.prenom }}</span
                      >
                      &nbsp;a ajouté le pack
                      <b style="color: #ff6e89">{{ notification.titre }}</b
                      >&nbsp;
                      <b>{{ notification.created_at }}</b>
                    </a>
                  </div>
                </router-link>
              </li>
              <div v-if="packsUnread.length == 0">
                <p style="padding: 20px">
                  Pas de notification pour le moment
                  <img loading="lazy" src="/not-disturb-etnafes.png" />
                </p>
              </div> </b-card-text
          ></b-tab>

          <b-tab
            :title="
              'Réservations aux hébérgements' +
              '(' +
              reservationslUnread.length +
              ')'
            "
            ><b-card-text>
              <span style="margin-left: 10px">
                Liste des réservations aux hébérgements
              </span>
              <li
                class="nav-link tt"
                v-for="notification in reservationslUnread"
                :key="notification.id"
                style="
                  margin: 8px;
                  border: 1px solid #d1d1d1;
                  border-radius: 2px;
                  text-align: left;
                  background-color: #e7f1fd;
                "
              >
                <router-link
                  class="a"
                  @click="makeread"
                  :to="{
                    name: 'ShowReservationMaisonHoteAdmin',
                    params: { id: notification.id },
                  }"
                >
                  <div class="row">
                    <a href="#" class="nav-item dropdown-item">
                      <img loading="lazy"
                        width="7%"
                        class="photo"
                        :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_client/${notification.client.photo}`"
                        alt="Profile Photo"
                      />
                      &nbsp;
                      <span style="font-weight: bold"
                        >{{ notification.client.nom }}
                        {{ notification.client.nom }}</span
                      >
                      &nbsp; a réservé {{ notification.nbr_place }} place(s)
                      dans l'hébergement {{ notification.hebergementres.nom }}
                      <b>le {{ notification.created_at }}</b>
                    </a>
                  </div>
                </router-link>
              </li>
              <div v-if="reservationslUnread.length == 0">
                <p style="padding: 20px">
                  Pas de notification pour le moment
                  <img loading="lazy" src="/not-disturb-etnafes.png" />
                </p>
              </div> </b-card-text
          ></b-tab>

          <b-tab
            :title="
              'Réservations aux packs' + '(' + reservationsUnread.length + ')'
            "
            ><b-card-text>
              <span style="margin-left: 10px">
                Liste des réservations aux packs
              </span>
              <li
                class="nav-link tt"
                v-for="notification in reservationsUnread"
                :key="notification.id"
                style="
                  margin: 8px;
                  border: 1px solid #d1d1d1;
                  border-radius: 2px;
                  text-align: left;
                  background-color: #e7f1fd;
                "
              >
                <router-link
                  class="a"
                  @click="makeread"
                  :to="{
                    name: 'show_reservation',
                    params: { id: notification.id },
                  }"
                >
                  <div class="row">
                    <a href="#" class="nav-item dropdown-item">
                      <img loading="lazy"
                        class="photo"
                        width="7%"
                        :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_client/${notification.client.photo}`"
                        alt="Profile Photo"
                      />
                      &nbsp;
                      <span style="font-weight: bold"
                        >{{ notification.client.nom }}
                        {{ notification.client.prenom }}</span
                      >
                      &nbsp;a réservé {{ notification.nbr_place }} place(s) dans
                      le pack {{ notification.pack_res.titre }}
                      <b>{{ notification.human_created_at }}</b>
                    </a>
                  </div>
                </router-link>
              </li>
              <div v-if="reservationsUnread.length == 0">
                <p style="padding: 20px">
                  Pas de notification pour le moment
                  <img loading="lazy" src="/not-disturb-etnafes.png" />
                </p>
              </div> </b-card-text
          ></b-tab>
        </b-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import {
  globe,
  zap,
  beaker,
  flame,
  star,
  Octicon,
  home,
  contact,
  sync,
  repo,
  play,
  project,
  shield,
  graph,
  bell,
  tag,
} from "octicons-vue";
import { Tabs, Tab } from "@hiendv/vue-tabs";
import DropDown from "@/components/Dropdown.vue";
import Modal from "@/components/Modal.vue";
import { SidebarPlugin } from "@/components/index";
import { apiDomain } from "../config";
export default {
  components: {
    DropDown,
    Modal,
    SidebarPlugin,
    Tabs,
    Tab,
  },
  data() {
    return {
      globe,
      home,
      contact,
      reservations: [],
      reservationsUnread: [],
      agences: [],
      packs: [],
      packsUnread: [],
      agencesUnread: [],
      reservationslUnread: [],
      restaurants: [],
      restaurantsUnread: [],
      hebergements: [],
      hebergementsUnread: [],
      clients: [],
      proprietaires: [],
      guides: [],
      adagences: [],
      proprietairesrest: [],
      clientsUnread: [],
      propsUnread: [],
      propsresUnread: [],
      guidesUnread: [],
      adagenceUnread: [],
      reservations: [],
      reservationsPack: [],
      notifications: [],
      searchModalVisible: false,
      searchQuery: "",
      showMenu: false,
    };
  },

  created() {
    this.fetchProprietaires();
    this.fetchGuides();
    this.fetchAdagences();
    this.fetchProprietairesRestau();
    this.fetchClients();
    this.fetchHebergements();
    this.fetchRests();
    this.fetchAgences();
    this.fetchPacks();
    this.fetchReservations();
  },
  sockets: {
    hebergementNotif(data) {
      let hebergementNotif = JSON.parse(data);
      console.log(hebergementNotif);
    },
  },
  methods: {
    fetchReservations() {
      fetch(`${apiDomain}/api/allreservations?token=${this.$store.state.token}`)
        .then((res) => res.json())
        .then((res) => {
          this.reservations = res.reservations;
          this.reservationsl = res.reservationsl;
          this.reservationsUnread = res.reservationsUnread;
          this.reservationslUnread = res.reservationslUnread;
        })
        .catch((err) => console.log(err));
    },
    fetchRests() {
      fetch(`${apiDomain}/api/allrestaurants`)
        .then((res) => res.json())
        .then((res) => {
          this.restaurants = res.rest;
          this.restaurantsUnread = res.restaurantsUnread;
        })
        .catch((err) => console.log(err));
    },

    fetchHebergements() {
      fetch(`${apiDomain}/api/allhebergements`)
        .then((res) => res.json())
        .then((res) => {
          this.hebergements = res.hebergements;
          this.hebergementsUnread = res.hebergementsUnread;
        })
        .catch((err) => console.log(err));
    },

    fetchPacks() {
      fetch(`${apiDomain}/api/allpacks?token=${this.$store.state.token}`)
        .then((res) => res.json())
        .then((res) => {
          this.packs = res.packs;
          this.packsUnread = res.packsUnread;
        })
        .catch((err) => console.log(err));
    },

    fetchAgences() {
      fetch(`${apiDomain}/api/allagences`)
        .then((res) => res.json())
        .then((res) => {
          this.agences = res.agences;
          this.agencesUnread = res.agencesUnread;
        })
        .catch((err) => console.log(err));
    },
    fetchProprietaires() {
      fetch(
        `${apiDomain}/api/allproprietaires?token=${this.$store.state.token}`
      )
        .then((res) => res.json())
        .then((res) => {
          this.proprietaires = res.proprietaires;
          this.propsUnread = res.propsUnread;
        })
        .catch((err) => console.log(err));
    },

    fetchProprietairesRestau() {
      fetch(
        `${apiDomain}/api/proprietaires/restaurants?token=${this.$store.state.token}`
      )
        .then((res) => res.json())
        .then((res) => {
          this.proprietairesrest = res.proprietaires;
          this.propsresUnread = res.propsresUnread;
        })
        .catch((err) => console.log(err));
    },

    fetchGuides() {
      fetch(`${apiDomain}/api/allguides?token=${this.$store.state.token}`)
        .then((res) => res.json())
        .then((res) => {
          this.guides = res.guides;
          this.guidesUnread = res.guidesUnread;
        })
        .catch((err) => console.log(err));
    },

    fetchAdagences() {
      fetch(`${apiDomain}/api/alladagences?token=${this.$store.state.token}`)
        .then((res) => res.json())
        .then((res) => {
          this.adagences = res.adagences;
          this.adagenceUnread = res.adagenceUnread;
        })
        .catch((err) => console.log(err));
    },
    makeread(id, client) {
      fetch(`${apiDomain}/api/client-read/${id}`, {
        method: "put",
        body: JSON.stringify(this.client),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())

        .then((data) => {
          if (confirm("Read notification")) {
            window.location.reload();
          }
        })
        .catch((err) => console.log(err));
    },
    resetNotification: function () {
      if (this.reservations.length > 0) {
        this.reservations.length = 0;
      }
      if (this.reservationsPack.length > 0) {
        this.reservationsPack.length = 0;
      }
    },
    fetchClients() {
      fetch(`${apiDomain}/api/allclients?token=${this.$store.state.token}`)
        .then((res) => res.json())
        .then((res) => {
          this.clients = res.clients;
          this.clientsUnread = res.clientsUnread;
        })
        .catch((err) => console.log(err));
    },

    markAsRead() {
      axios
        .get(`${apiDomain}/api/mark-all-read/${this.user.id}`)
        .then((response) => {
          this.unreadNotifications = [];
        });
    },
    fetchNotifications() {
      fetch(`${apiDomain}/api/notifications`)
        .then((res) => res.json())
        .then((res) => {
          this.notifications = res.notifications;
        })
        .catch((err) => console.log(err));
    },
    performLogout() {
      this.$store
        .dispatch("performLogoutAction")
        .then((res) => {
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
  },
  computed: {
    unreadNotifications() {
      return this.notifications.filter((notification) => {
        return notification.read_at == null;
      });
    },
    isRTL() {
      return this.$rtl.isRTL;
    },
    loggedIn() {
      return this.$store.getters.get_loggedIn;
    },

    user() {
      return this.$store.getters.get_user;
    },
  },
};
</script>

<style>
li .tt {
  padding: 0 5px;
}
#feed1 {
  background: white;
  height: 350px;
  max-height: 670px;
  overflow: scroll;
  width: 650px;
}

.navbar-nav li {
  padding: 0 5px;
}

.notifadmin .nav-tabs .nav-item {
  margin-bottom: -0.0625rem;
  width: 100px;
}

#no-gutters > {
  padding-right: 0px;
  padding-left: 0px;
  width: 20% !important;
}
</style>

