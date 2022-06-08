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
        <a href="/">
          <img loading="lazy" src="/images/logo-etnafes-couleur.png" width="10%" />
        </a>
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
                reservations.length
              }}</span>
            </a>
            <div>
              <ul
                class="not dropdown-menu dropdown-menu-right dropdown-navbar"
                id="feed"
                ref="feed"
              >
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
                    :to="{
                      name: 'show_agence_read',
                      params: { id: notification.agence_id },
                    }"
                  >
                    <div class="row">
                      <a href="#" class="nav-item dropdown-item">
                        <img loading="lazy"
                          class="photo"
                          :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_client/${notification.dateres.photo}`"
                          alt="Profile Photo"
                        />&nbsp;
                        <!-- v-for="client in notification.client" :key="client.id" -->
                        <b>
                          {{ notification.client.nom }}
                          {{ notification.client.prenom }}
                          <span v-if="notification.clength.length > 1"
                            >et {{ notification.clength.length - 1 }} autres
                            personnes</span
                          >
                          <br />
                        </b>
                        <span v-if="notification.clength.length > 1"
                          >ont reservé via votre agence</span
                        >

                        <span v-else>a reservé via votre agence</span>&nbsp;
                        <b>{{ notification.nom_agence }}</b>
                        <br />
                        le {{ notification.dateres.created_at }}
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
              </ul>
            </div>
          </drop-down>
          <drop-down>
            <a href="#" class="dropdown-toggle nav-link" data-toggle="dropdown">
              <div class="photo">
                <!-- <img loading="lazy" src="@/assets/img/anime3.png" alt="Profile Photo" /> -->
                <img loading="lazy"
                  :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_agence/${adagence.photo}`"
                  alt="Profile Photo"
                />
              </div>
              <b class="caret d-none d-lg-block d-xl-block"></b>
              <!-- <p class="d-lg-none">Log out</p> -->
            </a>
            <ul class="dropdown-menu dropdown-navbar">
              <li class="nav-link">
                <a href="/dashboard_agence" class="nav-item dropdown-item"
                  >Dashboard</a
                >
              </li>
              <li class="nav-link">
                <a href="/agence" class="nav-item dropdown-item">Profile</a>
              </li>
              <li class="nav-link">
                <a href="/packs/agence" class="nav-item dropdown-item">Packs</a>
              </li>

              <li class="nav-link">
                <a href="/agence-réservations" class="nav-item dropdown-item"
                  >Réservations</a
                >
              </li>
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
export default {
  components: {
    DropDown,
    Modal,
    SidebarPlugin,
  },
  data() {
    return {
      reservations: [],
      adagence: {},
      notifications: [],
      searchModalVisible: false,
      searchQuery: "",
      showMenu: false,
    };
  },

  sockets: {
    message1(data) {
      let message1 = JSON.parse(data);

      console.log(message1);
      if (message1.agence.adagence_id === this.$store.state.user.id) {
        this.fetchReservations(this.$store.state.user.id).push(message1);
      }
    },
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
    this.fetchReservations(this.$store.state.user.id);
    this.fetchagenceadmin(this.$store.state.user.id);
  },

  methods: {
    resetNotification: function () {
      if (this.reservations.length > 0) {
        this.reservations.length = 0;
      }
    },
    //show user by id
    fetchagenceadmin(id) {
      fetch(`${apiDomain}/api/agencead/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.adagence = res.adagence;
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
    fetchReservations(id) {
      fetch(`${apiDomain}/api/reservation-agence/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.reservations = res.reservations;
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
#feed {
  background: white;
  height: 350px;
  max-height: 670px;
  overflow: scroll;
  width: 100%;
}
</style>