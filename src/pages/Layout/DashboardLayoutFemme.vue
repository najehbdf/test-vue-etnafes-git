<template>
  <div class="wrapper">
    <!-- <div class="wrapper" :class="{'nav-open': $sidebar.showSidebar}"> -->

    <side-bar :background-color="backgroundColor">
      <sidebar-link class="menuAdmin" to="/dashboard_femme">
        <i class="tim-icons icon-chart-pie-36"></i>
        <template v-if="!isRTL">
          <p style="color: #fff">Dashboard</p>
        </template>
        <template v-else>
          <p>لوحة القيادة</p>
        </template>
      </sidebar-link>

      <!-- <sidebar-link class="menuAdmin" to="/notifications/admin">
        <i class="tim-icons icon-bell-55"></i>
        <template v-if="!isRTL ">
          <p style="color: #fff">
            Notifications&nbsp;
            <span
              class="badge badge-danger image-clignote"
              style="background-color: red"
              >Nouveau</span
            >
          </p>
        </template>
        <template v-else>
          <p>طباعة</p>
        </template>
      </sidebar-link> -->

      <sidebar-link class="menuAdmin" to="/femme">
        <i class="tim-icons icon-single-02"></i>
        <template v-if="!isRTL">
          <p style="color: #fff">Profile</p>
        </template>
        <template v-else>
          <p>ملف تعريفي للمستخدم</p>
        </template>
      </sidebar-link>
      <sidebar-link class="menuAdmin" to="/ajouter_produit_femme">
        <i class="tim-icons icon-chart-pie-36"></i>
        <template v-if="!isRTL">
          <p style="color: #fff">Ajouter produit</p>
        </template>
        <template v-else>
          <p>لوحة القيادة</p>
        </template>
      </sidebar-link>
      <sidebar-link class="menuAdmin" :to="{ name: 'listes_mes_produit' }">
        <i class="tim-icons icon-single-copy-04"></i>
        <template v-if="!isRTL">
          <p style="color: #fff">
            Mes produits
            <!-- &nbsp;
            <span
              style="background-color:red"
              class="badge badge-pill badge-warning"
            >{{packsUnread.length}}</span>-->
          </p>
        </template>
        <template v-else>
          <p>طباعة</p>
        </template>
      </sidebar-link>

      <li class="nav-item menuAdmin">
        <a
          href
          style="color: #fff"
          @click.prevent="
            performLogout();
            scrollToTop();
          "
        >
          <i class="tim-icons icon-button-power"></i> Se déconnecter
        </a>
      </li>
    </side-bar>
    <sidebar-share :background-color.sync="backgroundColor"></sidebar-share>

    <div class="main-panel" :data="backgroundColor">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar"></dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style>
.menuAdmin {
  margin-bottom: -8px;
}
</style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./DashboardContent.vue";
import SidebarShare from "./SidebarSharePlugin.vue";
import MobileMenu from "./MobileMenu.vue";
import SideBar from "@/components/SidebarPlugin/SideBar.vue";
import SidebarLink from "@/components/SidebarPlugin/SidebarLink.vue";
import { apiDomain } from "../../config";

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    MobileMenu,
    SideBar,
    SidebarLink,
    SidebarShare,
  },
  data() {
    return {
      reservations: [],
      reservationsl: [],

      reservationsUnread: [],
      reservationslUnread: [],
      packs: [],
      packsUnread: [],
      clientsUnread: [],
      propsUnread: [],
      propsresUnread: [],
      guidesUnread: [],

      hebergementsUnread: [],
      restaurantsUnread: [],

      adagenceUnread: [],
      backgroundColor: "green",
    };
  },
  computed: {
    isRTL() {
      return this.$rtl.isRTL;
    },
  },

  created() {
    /* this.fetchProprietaires();
    this.fetchGuides();
    this.fetchAdagences();
    this.fetchProprietairesRestau();
    this.fetchClients();
    this.fetchHebergements();
    this.fetchRests();
    this.fetchPacks();
    this.fetchReservations(); */
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
    fetchPacks() {
      fetch(`${apiDomain}/api/allpacks?token=${this.$store.state.token}`)
        .then((res) => res.json())
        .then((res) => {
          this.packs = res.packs;
          this.packsUnread = res.packsUnread;
        })
        .catch((err) => console.log(err));
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

    fetchHebergements() {
      fetch(`${apiDomain}/api/allhebergements`)
        .then((res) => res.json())
        .then((res) => {
          this.hebergements = res.hebergements;
          this.hebergementsUnread = res.hebergementsUnread;
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
    scrollToTop() {
      window.scrollTo(0, 0);
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
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
  },
};
</script>
