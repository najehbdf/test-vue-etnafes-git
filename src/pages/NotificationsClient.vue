<template>
  <div class="content">
    <div>
      <div>
        <b-tabs content-class="mt-3">
          <b-tab title="Clients">
            <template #title>
              <!-- <i class="fas fa-hiking fa-lg" title="Clients" style="color:#5cb85c"></i>&nbsp; -->
              Nouvelles agences &nbsp;
              <span
                v-if="agencesprox.length > 0"
                class="badge badge-warning"
                style="background-color: red"
                >{{ agencesprox.length }}</span
              >
            </template>
            <span style="margin-left: 10px"
              >Nouvelles Agences à proximité de chez vous</span
            >
            <li
              class="nav-link"
              v-for="notification in agencesprox"
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
                :to="{
                  name: 'show_agence',
                  params: { id: notification.id },
                }"
              >
                <div class="row d-none d-lg-block">
                  <a href="#" class="nav-item dropdown-item">
                    Agence
                    <b>{{ notification.nom_agence }}</b> a été ajouté le
                    <b>{{ notification.created_at }}</b> à proximité de chez
                    vous.
                  </a>
                </div>
                <!-- respnsive on web ( d-none d-lg-block ) -->
                <div class="row d-lg-none">
                  <a href="#" class="nav-item dropdown-item">
                    Agence
                    <b>{{ notification.nom_agence }}</b> a été ajouté le
                    <br />
                    <b>{{ notification.created_at }}</b> à proximité de chez
                    <br />vous .
                  </a>
                </div>
                <!-- fin responsive -->
              </router-link>
            </li>
            <div v-if="agencesprox.length == 0">
              <p style="padding: 20px">
                Pas de notification pour le moment
                <img loading="lazy" src="/not-disturb-etnafes.png" />
              </p>
            </div>
          </b-tab>

          <b-tab title="Clients">
            <template #title>
              <!-- <i class="fas fa-hiking fa-lg" title="Clients" style="color:#5cb85c"></i>&nbsp; -->
              Nouveaux hébergements &nbsp;
              <span
                v-if="hebergementsprox.length > 0"
                class="badge badge-warning"
                style="background-color: red"
                >{{ hebergementsprox.length }}</span
              >
            </template>
            <span style="margin-left: 10px"
              >Nouveaux Hebergements à proximité de chez vous</span
            >
            <li
              class="nav-link"
              v-for="notification in hebergementsprox"
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
                :to="{
                  name: 'DetailsHebergementRes',
                  params: { id: notification.id },
                }"
              >
                <div class="row d-none d-lg-block">
                  <a href="#" class="nav-item dropdown-item">
                    Hebergement
                    <b>{{ notification.nom }}</b> a été ajouté le
                    <b>{{ notification.created_at }}</b> à proximité de chez
                    vous.
                  </a>
                </div>

                <!-- respnsive on web ( d-none d-lg-block ) -->
                <div class="row d-lg-none">
                  <a href="#" class="nav-item dropdown-item">
                    Hebergement
                    <b>{{ notification.nom }}</b> a été ajouté le
                    <br />
                    <b>{{ notification.created_at }}</b> à proximité de chez
                    <br />vous .
                  </a>
                </div>
                <!-- fin responsive -->
              </router-link>
            </li>
            <div v-if="hebergementsprox.length == 0">
              <p style="padding: 20px">
                Pas de notification pour le moment
                <img loading="lazy" src="/not-disturb-etnafes.png" />
              </p>
            </div>
          </b-tab>

          <b-tab title="Clients">
            <template #title>
              <!-- <i class="fas fa-hiking fa-lg" title="Clients" style="color:#5cb85c"></i>&nbsp; -->
              Nouveaux packs &nbsp;
              <span
                v-if="packsnotif"
                class="badge badge-warning"
                style="background-color: red"
                >{{ Object.keys(packsnotif).length }}</span
              >
            </template>
            <span style="margin-left: 10px">Nouveaux Packs à ne pas rater</span>
            <li
              class="nav-link"
              v-for="notification in packsnotif"
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
                :to="{
                  name: 'Pack',
                  params: { id: notification.id },
                }"
              >
                <div class="row d-none d-lg-block">
                  <a href="#" class="nav-item dropdown-item">
                    Pack
                    <b>{{ notification.titre }}</b> a été ajouté le
                    <b>{{ notification.created_at }}</b> à proximité de chez
                    vous .
                  </a>
                </div>

                <!-- respnsive on web ( d-none d-lg-block ) -->
                <div class="row d-lg-none">
                  <a href="#" class="nav-item dropdown-item">
                    Pack
                    <b>{{ notification.titre }}</b> a été ajouté le
                    <br />
                    <b>{{ notification.created_at }}</b> à proximité de chez
                    <br />vous .
                  </a>
                </div>
                <!-- fin responsive -->
              </router-link>
            </li>
            <div v-if="packsnotif.length == 0">
              <p style="padding: 20px">
                Pas de notification pour le moment
                <img loading="lazy" src="/not-disturb-etnafes.png" />
              </p>
            </div>
          </b-tab>
          <b-tab title="Clients">
            <template #title>
              Réservations aux packs&nbsp;
              <span class="badge badge-warning" style="background-color: red">{{
                reservationsp.length
              }}</span>

              <!-- <i class="fas fa-hiking fa-lg" title="Clients" style="color:#5cb85c"></i>&nbsp; -->
            </template>
            <span style="margin-left: 10px"
              >Liste de vos réservations aux packs disponibles</span
            >
            <li
              class="nav-link"
              v-for="notification in reservationsp"
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
                :to="{
                  name: 'show_reservation_client_validate',
                  params: { id: notification.id },
                }"
              >
                <div
                  class="row d-none d-lg-block"
                  v-if="notification.paye == 0"
                >
                  <a href="#" class="nav-item dropdown-item">
                    Votre réservation au pack {{ notification.titre }} le
                    <b>{{ notification.updated_at }}</b> a été validée
                  </a>
                </div>

                <!-- respnsive on web ( d-none d-lg-block ) -->

                <div class="row d-lg-none" v-if="notification.paye == 0">
                  <a href="#" class="nav-item dropdown-item">
                    Votre réservation au pack {{ notification.titre }} <br />le
                    <b>{{ notification.updated_at }}</b> a été validée .
                  </a>
                </div>
                <!-- fin responsive -->

                <div
                  class="row d-none d-lg-block"
                  v-if="notification.paye == 1"
                >
                  <a href="#" class="nav-item dropdown-item">
                    Votre réservation au pack
                    <b>{{ notification.titre }}</b>
                    le
                    <b>{{ notification.created_at }}</b> est en attente de
                    paiement
                  </a>
                </div>

                <!-- respnsive on web ( d-none d-lg-block ) -->

                <div class="row d-lg-none" v-if="notification.paye == 1">
                  <a
                    href="#"
                    class="nav-item dropdown-item"
                    style="font-size: 13px"
                  >
                    Votre réservation au pack
                    <br />
                    <b>{{ notification.titre }}</b>

                    <br />le <b>{{ notification.created_at }}</b> est en attente
                    <br />de paiement .
                  </a>
                </div>
                <!-- fin responsive -->
              </router-link>
            </li>
            <div v-if="reservationsp.length == 0">
              <p style="padding: 20px">
                Pas de notification pour le moment
                <img loading="lazy" src="/not-disturb-etnafes.png" />
              </p>
            </div>
          </b-tab>
          <b-tab title="Clients">
            <template #title>
              <!-- <i class="fas fa-hiking fa-lg" title="Clients" style="color:#5cb85c"></i>&nbsp; -->
              Réservations aux hébergements &nbsp;
              <span class="badge badge-warning" style="background-color: red">{{
                reservationsh.length
              }}</span>
            </template>
            <span style="margin-left: 10px"
              >Liste de vos réservations aux hébergements disponibles</span
            >
            <li
              class="nav-link"
              v-for="notification in reservationsh"
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
                :to="{
                  name: 'ShowReservationClientClinet',
                  params: { id: notification.id },
                }"
              >
                <div
                  class="row d-none d-lg-block"
                  v-if="notification.paye == 0"
                >
                  <a href="#" class="nav-item dropdown-item">
                    Votre réservation à l'hébergement
                    <b>{{ notification.nom }}</b>
                    le
                    <b>{{ notification.updated_at }}</b> a été validée
                  </a>
                </div>

                <!-- respnsive on web ( d-none d-lg-block ) -->

                <div class="row d-lg-none" v-if="notification.paye == 0">
                  <a href="#" class="nav-item dropdown-item">
                    Votre réservation à l'hébergement
                    <br />
                    <b>{{ notification.nom }}</b>
                    <br />le <b>{{ notification.updated_at }}</b> a été validée
                    .
                  </a>
                </div>

                <!-- fin responsive -->

                <div
                  class="row d-none d-lg-block"
                  v-if="notification.paye == 1"
                >
                  <a href="#" class="nav-item dropdown-item">
                    Votre réservation à l'hébergement
                    <b>{{ notification.nom }}</b>
                    le
                    <b>{{ notification.created_at }}</b> est en attente de
                    paiement
                  </a>
                </div>

                <!-- respnsive on web ( d-none d-lg-block ) -->

                <div class="row d-lg-none" v-if="notification.paye == 1">
                  <a
                    href="#"
                    class="nav-item dropdown-item"
                    style="font-size: 13px"
                  >
                    Votre réservation à l'hébergement
                    <br />
                    <b>{{ notification.nom }}</b>
                    <br />le <b>{{ notification.created_at }}</b> est en attente
                    <br />de paiement .
                  </a>
                </div>

                <!-- fin responsive -->
              </router-link>
            </li>
            <div v-if="reservationsh.length == 0">
              <p style="padding: 20px">
                Pas de notification pour le moment
                <img loading="lazy" src="/not-disturb-etnafes.png" />
              </p>
            </div>
          </b-tab>
        </b-tabs>
      </div>
    </div>
  </div>
</template>
<script>
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
      reservationsp: [],
      packsnotif: [],
      agencesprox: [],
      hebergementsprox: [],
      reservationsh: [],
      notifications: [],
      searchModalVisible: false,
      searchQuery: "",
      showMenu: false,
    };
  },

  created() {
    this.fetchReservations(this.$store.state.user.id);
    this.fetchAgenceProximite(this.$store.state.user.id);
    this.fetchHebProximite(this.$store.state.user.id);
    this.fetchPacksNotif();
  },
  sockets: {
    hebergementNotif(data) {
      let hebergementNotif = JSON.parse(data);
      console.log(hebergementNotif);
    },
  },
  methods: {
    fetchReservations(id) {
      fetch(
        `${apiDomain}/api/reservation-client-notif/${id}?token=${this.$store.state.token}`
      )
        .then((res) => res.json())
        .then((res) => {
          this.reservationsp = res.reservationsp;
          this.reservationsh = res.reservationsh;
        })
        .catch((err) => console.log(err));
    },

    fetchAgenceProximite(id) {
      fetch(`${apiDomain}/api/agence-proximite/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.agencesprox = res.agences;
        })
        .catch((err) => console.log(err));
    },

    fetchHebProximite(id) {
      fetch(`${apiDomain}/api/hebergement-proximite/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.hebergementsprox = res.hebergements;
        })
        .catch((err) => console.log(err));
    },

    fetchPacksNotif(id) {
      fetch(`${apiDomain}/api/packs-notif`)
        .then((res) => res.json())
        .then((res) => {
          this.packsnotif = res.packs;
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
</style>

