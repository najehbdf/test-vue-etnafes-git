<template>
  <nav
    class="navbar navbar-expand-lg navbar-absolute"
    style="
      position: fixed;
      background-color: #fff !important;
      box-shadow: 0 0 10px #ccc;
    "
    :class="{ 'bg-white': showMenu, 'navbar-transparent': !showMenu }"
  >
    <div class="container-fluid">
      <div class="navbar-wrapper">
        <div
          class="navbar-toggle d-inline"
          :class="{ toggled: $sidebar.showSidebar }"
        >
          <button type="button" class="navbar-toggler" @click="toggleSidebar">
            <span class="navbar-toggler-bar bar1"></span>
            <span class="navbar-toggler-bar bar2"></span>
            <span class="navbar-toggler-bar bar3"></span>
          </button>
        </div>
        <!-- <a class="navbar-brand" href="javascript:void(0)">{{ $route.name }}</a> -->
        <div>
          <a href="/">
            <img loading="lazy" src="/images/logo-etnafes-couleur.png" width="10%" />
          </a>
        </div>
      </div>
      <button
        class="navbar-toggler"
        type="button"
        @click="toggleMenu"
        data-toggle="collapse"
        data-target="#navigation"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-bar navbar-kebab"></span>
        <span class="navbar-toggler-bar navbar-kebab"></span>
        <span class="navbar-toggler-bar navbar-kebab"></span>
      </button>
      <div class="collapse navbar-collapse show text-left" v-show="showMenu">
        <ul class="navbar-nav" :class="$rtl.isRTL ? 'mr-auto' : 'ml-auto'">
          <li class="search-bar input-group" @click="searchModalVisible = true">
            <button
              class="btn btn-link"
              id="search-button"
              data-toggle="modal"
              data-target="#searchModal"
            >
              <i class="tim-icons icon-zoom-split"></i>
              <span class="d-lg-none d-md-block">Search</span>
            </button>
          </li>
          <modal
            :show.sync="searchModalVisible"
            class="modal-search"
            id="searchModal"
            :centered="false"
            :show-close="true"
          >
            <input
              aria-label="label"
              slot="header"
              v-model="searchQuery"
              type="text"
              class="form-control"
              id="inlineFormInputGroup"
              placeholder="SEARCH"
            />
          </modal>

          <drop-down>
            <a
              href="javascript:void(0)"
              data-toggle="dropdown"
              class="dropdown-toggle nav-link"
            >
              <i class="tim-icons icon-sound-wave"></i>
              <p class="d-lg-none text-left">Notifications</p>
              <span class="badge badge-danger" @click="resetNotification">{{
                reservations.length + reservationsPack.length
              }}</span>
            </a>
            <div>
              <ul class="not dropdown-menu dropdown-menu-right dropdown-navbar">
                <div>
                  <b-tabs content-class="mt-3">
                    <b-tab title="Réservations libres" active>
                      <li
                        class="nav-link"
                        v-for="notification in reservations"
                        :key="notification.id"
                        style="
                          margin: 8px;
                          border: 1px solid #d1d1d1;
                          border-radius: 2px;
                          text-align: left;
                        "
                      >
                        <router-link
                          class="a"
                          @click="makeread"
                          :to="{
                            name: 'show_hebergement_read',
                            params: { id: notification.id },
                          }"
                        >
                          <div class="row">
                            <a href="#" class="nav-item dropdown-item">
                              <img loading="lazy"
                                class="photo"
                                :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_client/${notification.date.photo}`"
                                alt="Profile Photo"
                              />&nbsp;
                              <span
                                v-if="notification.clength.length > 1"
                                style="text-align: justify"
                              >
                                <span style="font-weight: bold"
                                  >{{ notification.client.nom }}
                                  {{ notification.client.prenom }}</span
                                >
                                &nbsp;
                                <span
                                  >et
                                  {{ notification.clength.length - 1 }} autres
                                  personnes</span
                                >
                                <br />
                                <span
                                  >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ont
                                  reservé votre hébergement</span
                                >
                                <br />
                              </span>

                              <span v-else>
                                <span style="font-weight: bold"
                                  >{{ notification.client.nom }}
                                  {{ notification.client.prenom }}</span
                                >
                                a reservé votre hébergement
                              </span>
                              &nbsp;
                              <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              <span style="font-weight: bold">{{
                                notification.nom
                              }}</span>
                              le
                              <b>{{ notification.date.created_at }}</b>
                            </a>
                          </div>
                        </router-link>
                      </li>
                      <div v-if="reservations.length == 0">
                        <p style="padding: 20px">
                          Pas de notification pour le moment
                          <img loading="lazy" src="not-disturb-etnafes.png" />
                        </p>
                      </div>
                    </b-tab>
                    <b-tab title="Réservations pack">
                      <li
                        class="nav-link"
                        v-for="notification in reservationsPack"
                        :key="notification.id"
                        style="
                          margin: 8px;
                          border: 1px solid #d1d1d1;
                          border-radius: 2px;
                          text-align: left;
                        "
                      >
                        <router-link
                          class="a"
                          @click="makeread"
                          :to="{
                            name: 'show_hebergement_read',
                            params: { id: notification.id },
                          }"
                        >
                          <div class="row">
                            <a href="#" class="nav-item dropdown-item">
                              <img loading="lazy"
                                class="photo"
                                :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_client/${notification.date.photo}`"
                                alt="Profile Photo"
                              />&nbsp;
                              <span
                                v-if="notification.clength.length > 1"
                                style="text-align: justify"
                              >
                                <span style="font-weight: bold"
                                  >{{ notification.client.nom }}
                                  {{ notification.client.prenom }}</span
                                >
                                &nbsp;
                                <span
                                  >et
                                  {{ notification.clength.length - 1 }} autres
                                  personnes</span
                                >
                                <br />
                                <span
                                  >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ont
                                  reservé votre hébergement</span
                                >
                                <br />
                              </span>

                              <span v-else>
                                <span style="font-weight: bold"
                                  >{{ notification.client.nom }}
                                  {{ notification.client.prenom }}</span
                                >
                                a reservé votre hébergement
                              </span>
                              &nbsp;
                              <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              <span style="font-weight: bold">{{
                                notification.nom
                              }}</span>
                              le
                              <b>{{ notification.date.created_at }}</b>
                            </a>
                          </div>
                        </router-link>
                      </li>
                      <div v-if="reservationsPack.length == 0">
                        <p style="padding: 20px">
                          Pas de notification pour le moment
                          <img loading="lazy" src="not-disturb-etnafes.png" />
                        </p>
                      </div>
                    </b-tab>
                  </b-tabs>
                </div>
              </ul>
            </div>
          </drop-down>
          <drop-down>
            <a
              href="#"
              class="dropdown-toggle nav-link"
              data-toggle="dropdown"
              v-if="loggedIn"
            >
              <div class="photo">
                <!-- <img loading="lazy" src="@/assets/img/anime3.png" alt="Profile Photo" /> -->
                <img loading="lazy"
                  :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_prop/${user.image}`"
                  alt="Profile Photo"
                />
              </div>
              <b class="caret d-none d-lg-block d-xl-block"></b>
              <!-- <p class="d-lg-none">Log out</p> -->
            </a>
            <ul class="dropdown-menu dropdown-navbar">
              <li class="nav-link">
                <a href="/dashboard_proprietaire" class="nav-item dropdown-item"
                  >Dashboard</a
                >
              </li>

              <li class="nav-link">
                <a href="/proprietaire" class="nav-item dropdown-item"
                  >Profile</a
                >
              </li>
              <li class="nav-link">
                <a href="/allhebergements" class="nav-item dropdown-item"
                  >Hebergements</a
                >
              </li>

              <li class="nav-link">
                <a
                  href="/reservations-hebergement"
                  class="nav-item dropdown-item"
                  >Réservations</a
                >
              </li>
              <!-- <li class="nav-link">
                <a href="javascript:void(0)" class="nav-item dropdown-item">Settings</a>
              </li>-->
              <li class="dropdown-divider"></li>
              <li class="nav-link">
                <a
                  href="javascript:void(0)"
                  class="nav-item dropdown-item"
                  @click.prevent="performLogout"
                  >Se déconnecter</a
                >
              </li>
            </ul>
          </drop-down>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import DropDown from "@/components/Dropdown.vue";
import Modal from "@/components/Modal.vue";
import { SidebarPlugin } from "@/components/index";
import { apiDomain } from "../../config";
import Vue from "vue";

export default {
  components: {
    DropDown,
    Modal,
    SidebarPlugin,
  },
  data() {
    return {
      position: { scrollTop: 0, scrollLeft: 0 },
      heberg: [],
      msg: "",
      reservations: [],
      reservationsPack: [],

      notifications: [],
      unreadNotif: [],
      readNotif: [],

      searchModalVisible: false,
      searchQuery: "",
      showMenu: false,
    };
  },

  created() {
    this.fetchReservations(this.$store.state.user.id);
    this.fetchUnreadNotifications(this.$store.state.user.id);
    this.fetchReadNotifications(this.$store.state.user.id);

    this.fetchNotifications();
  },

  methods: {
    makeread(id, reservation) {
      fetch(`${apiDomain}/api/reservation-read/${id}`, {
        method: "put",
        body: JSON.stringify(this.reservation),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())

        .then((data) => {
          if (confirm("Reservation validée")) {
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

    fetchReservations(id) {
      fetch(`${apiDomain}/api/reservation-proprietaire/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.reservations = res.reservations;
          this.reservationsPack = res.reservationsPack;
        })
        .catch((err) => console.log(err));
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

    fetchUnreadNotifications(id) {
      fetch(`${apiDomain}/api/reservation-proprietaire/unread/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.unreadNotif = res.reservationsUnread;
        })
        .catch((err) => console.log(err));
    },

    fetchReadNotifications(id) {
      fetch(`${apiDomain}/api/reservation-proprietaire/read/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.readNotif = res.reservationsRead;
        })
        .catch((err) => console.log(err));
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
  sockets: {
    message(data) {
      let message = JSON.parse(data);
      console.log(message);
      if (message.hebergement.proprietaire_id === this.$store.state.user.id) {
        this.fetchReservations(this.$store.state.user.id).push(message);
      }
    },
  },
};
</script>

<style>
.not {
  text-align: center;
  min-width: 23rem;
  width: 100%;
  border: 1px solid rgb(189, 189, 189);
  margin: 20px;
  font-size: 10px;
  font-size: 13px;
}
</style>
