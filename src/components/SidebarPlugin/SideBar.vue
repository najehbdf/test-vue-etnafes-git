<template>
  <div
    class="sidebar"
    :data="backgroundColor"
    style="
      margin-top: 56px;
      margin-left: 0px;
      background: #0d4057 !important;
      border-radius: 0px;
      height: calc(117vh - 90px);
    "
  >
    <div class="sidebar-wrapper text-left">
      <p style="color: #fff; margin-top: 15px">
        <center>
          <img loading="lazy"
            style="
              max-width: 25% !important;
              border: 2px solid rgba(255, 255, 255, 1);
              border-radius: 50%;
            "
            v-if="loggedIn && user.provider != null"
            :src="`${user.photo}`"
            alt="Profile Photo"
            class="photo"
          />
          <img loading="lazy"
            style="
              max-width: 25% !important;
              border: 2px solid rgba(255, 255, 255, 1);
              border-radius: 50%;
            "
            v-if="loggedIn && user.provider == null"
            :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_client/${user.photo}`"
            alt="Profile Photo"
            class="photo"
          />
          <br />

          <span style="line-height: 30px" v-if="loggedIn"
            >{{ user.nom }} {{ user.prenom }}</span
          >
          <span style="line-height: 30px" v-if="loggedIn && user.role == 1">{{
            user.name
          }}</span>

          <br />
          <!-- <span v-if="user.role==2" style="line-height:35px;letter-spacing:1px">* Voyageur *</span>
          <span v-if="user.role==3" style="line-height:35px;letter-spacing:1px">* Prestataire de Services *</span>
          <span v-if="user.role==4" style="line-height:35px;letter-spacing:1px">* Guide *</span>
          <span
            v-if="user.role==5"
            style="line-height:35px;letter-spacing:1px"
          >* Proprietaire Restaurant *</span>
          <span
            v-if="user.role==6"
            style="line-height:35px;letter-spacing:1px"
          >* Proprietaire Hébergement*</span>
          <span v-if="user.role==1" style="line-height:35px;letter-spacing:1px">* Admin *</span>-->
        </center>
      </p>
      <div class="row">
        <div class="col-md-12">
          <p style="padding: 2px; color: #fff">
            <center>
              <!-- <span style="line-height:30px">{{user.nom}} {{user.prenom}}</span>
              <br />-->
              <!-- <span v-if="loggedIn" style="line-height:24px;letter-spacing:1px">* {{user.email}} *</span> -->
              <!-- <span
                v-if="loggedIn && user.role==3"
                style="line-height:24px;letter-spacing:1px"
              >* Proprietaire Agence *</span>
              <span
                v-if="loggedIn && user.role==4"
                style="line-height:24px;letter-spacing:1px"
              >* Guide *</span>
              <span
                v-if="loggedIn && user.role==5"
                style="line-height:24px;letter-spacing:1px"
              >* Proprietaire Restaurant *</span>
              <span
                v-if="loggedIn && user.role==6"
                style="line-height:24px;letter-spacing:1px"
              >* Hébergeur*</span>
              <span
                v-if="loggedIn && user.role==1"
                style="line-height:24px;letter-spacing:1px"
              >* Admin *</span>-->
            </center>
          </p>
        </div>
      </div>
      <div class="logo" style="padding: 0rem">
        <!-- <a href="javascript:void(0)" class="simple-text logo-mini">{{ abv }}</a> -->

        <!-- <a
          href="javascript:void(0)"
          class="simple-text logo-normal"
          :class="$rtl.isRTL ? '' : 'text-left'"
        >{{ title }}</a>-->
      </div>
      <ul class="nav">
        <slot>
          <sidebar-link></sidebar-link>
        </slot>
      </ul>
    </div>
  </div>
</template>
<script>
import SidebarLink from "./SidebarLink.vue";
import { apiDomain } from "../../config";

export default {
  name: "side-bar",
  components: {
    SidebarLink,
  },
  props: {
    abv: {
      type: String,
      default: "CT",
    },
    backgroundColor: {
      type: String,
      default: "green",
    },
    sidebarLinks: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      client: {},
      activeLinkIndex: 0,
    };
  },

  created() {
    // this.fetchclient(this.$store.state.user.id);
  },
  computed: {
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
  methods: {
    fetchclient(id) {
      fetch(`${apiDomain}/api/client/${id}?token=${this.$store.state.token}`)
        .then((res) => res.json())
        .then((res) => {
          this.client = res;
        })
        .catch((err) => console.log(err));
    },
    findActiveLink() {
      this.links.forEach((link, index) => {
        if (link.isActive()) {
          this.activeLinkIndex = index;
        }
      });
    },
  },
};
</script>
<style>
</style>
