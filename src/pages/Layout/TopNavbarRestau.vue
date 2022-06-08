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
              @click="markAsRead"
            >
              <i class="tim-icons icon-sound-wave"></i>
              <p class="d-lg-none text-left">Notifications</p>
              <span class="badge badge-danger">{{
                unreadNotifications.length
              }}</span>
            </a>
            <ul class="dropdown-menu dropdown-menu-right dropdown-navbar">
              <li
                class="nav-link"
                v-for="(notification, i) in notifications"
                :key="i"
              >
                <a
                  v-if="notification.notifiable_id == user.id"
                  href="#"
                  class="nav-item dropdown-item"
                  >{{ notification.data }} has just registered on
                  {{ notification.created_at }}</a
                >
              </li>
            </ul>
          </drop-down>
          <drop-down>
            <a href="#" class="dropdown-toggle nav-link" data-toggle="dropdown">
              <div class="photo">
                <!-- <img loading="lazy" src="@/assets/img/anime3.png" alt="Profile Photo" /> -->
                <img loading="lazy"
                  :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_prop_restau/${proprietaire.image}`"
                  alt="Profile Photo"
                />
              </div>
              <b class="caret d-none d-lg-block d-xl-block"></b>
              <!-- <p class="d-lg-none">Log out</p> -->
            </a>
            <ul class="dropdown-menu dropdown-navbar">
              <li class="nav-link">
                <a
                  href="/dashboard_proprietaire_restau"
                  class="nav-item dropdown-item"
                  >Dashboard</a
                >
              </li>
              <li class="nav-link">
                <a
                  href="/proprietaire/restaurant"
                  class="nav-item dropdown-item"
                  >Profile</a
                >
              </li>
              <li class="nav-link">
                <a href="/allrestaurants" class="nav-item dropdown-item"
                  >Restaurants</a
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
      proprietaire: {},
      notifications: [],
      searchModalVisible: false,
      searchQuery: "",
      showMenu: false,
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
    this.fetchproprietaire(this.$store.state.user.id);
    this.fetchNotifications();
  },

  methods: {
    fetchproprietaire(id) {
      fetch(`${apiDomain}/api/proprietaire_restau/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.proprietaire = res.proprietaire;
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
