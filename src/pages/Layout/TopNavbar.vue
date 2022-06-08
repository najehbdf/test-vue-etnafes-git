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
      <!-- continiez comme facebook -->
      <!-- <div class="fb-customerchat" page_id="<PAGE_ID>"></div>
      <div>
        <div
          class="fb-login-button"
          data-width="310"
          data-size="large"
          data-button-type="continue_with"
          data-layout="default"
          data-auto-logout-link="true"
          data-use-continue-as="true"
        ></div>
      </div> -->

      <!-- fin  -->
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

          <!--  <drop-down>
            <a href="javascript:void(0)" data-toggle="dropdown" class="dropdown-toggle nav-link">
              <i class="tim-icons icon-sound-wave"></i>
              <p class="d-lg-none text-left">Notifications</p>
              <span class="badge badge-danger" @click="resetNotification">
                {{clientsUnread.length +adagenceUnread.length
                +guidesUnread.length+propsUnread.length+propsresUnread.length
                +hebergementsUnread.length+restaurantsUnread.length
                +reservationsUnread.length+reservationslUnread.length}}
              </span>
            </a>
            <div>
              <ul
                class="not dropdown-menu dropdown-menu-right dropdown-navbar"
                id="feed1"
                ref="feed1"
              >
                <div>
                  <b-tabs content-class="mt-3">
                    <b-tab title="Clients">
                      <template #title>
                        <i class="fas fa-hiking fa-xs" title="Clients" style="color:#5cb85c"></i>
                      </template>
                      Liste des voyageurs inscrits
                      <li
                        class="nav-link tt"
                        v-for="notification in clientsUnread"
                        :key="notification.id"
                        style="
  margin: 8px;
  border: 1px solid #d1d1d1;
  border-radius: 2px;
  text-align: left;"
                      >
                        <router-link
                          class="a"
                          @click="makeread"
                          :to="{name: 'show_client', params: { id: notification.id }}"
                        >
                          <div class="row">
                            <a href="#" class="nav-item dropdown-item">
                              <img loading="lazy"
                                class="photo"
                                :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_client/${notification.photo}`"
                                alt="Profile Photo"
                              />
                              &nbsp;
                              <span
                                style="font-weight:bold"
                              >{{notification.nom}} {{notification.prenom}}</span>
                              &nbsp;s'est inscrit
                              <b>{{notification.human_created_at}}</b>
                            </a>
                          </div>
                        </router-link>
                      </li>
                      <div v-if="clientsUnread.length==0">
                        <p style="padding:20px">
                          Pas de notification pour le moment
                          <img loading="lazy" src="/not-disturb-etnafes.png" />
                        </p>
                      </div>
                    </b-tab>
                    <b-tab title="Hébergeurs">
                      <template #title>
                        <i class="fas fa-hotel fa-xs" title="Hébergeurs" style="color:#5cb85c"></i>
                      </template>
                      Liste des hébergeurs inscrits
                      <li
                        class="nav-link tt"
                        v-for="notification in propsUnread"
                        :key="notification.id"
                        style="
  margin: 8px;
  border: 1px solid #d1d1d1;
  border-radius: 2px;
  text-align: left;"
                      >
                        <router-link
                          class="a"
                          @click="makeread"
                          :to="{name: 'show_hebergeur', params: { id: notification.id }}"
                        >
                          <div class="row">
                            <a href="#" class="nav-item dropdown-item">
                              <img loading="lazy"
                                class="photo"
                                :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_prop/${notification.image}`"
                                alt="Profile Photo"
                              />
                              &nbsp;
                              <span
                                style="font-weight:bold"
                              >{{notification.nom}} {{notification.prenom}}</span>
                              &nbsp;s'est inscrit
                              <b>{{notification.human_created_at}}</b>
                            </a>
                          </div>
                        </router-link>
                      </li>
                      <div v-if="propsUnread.length==0">
                        <p style="padding:20px">
                          Pas de notification pour le moment
                          <img loading="lazy" src="/not-disturb-etnafes.png" />
                        </p>
                      </div>
                    </b-tab>
                    <b-tab title="Guides">
                      <template #title>
                        <i class="fas fa-route fa-xs" title="Guides" style="color:#5cb85c"></i>
                      </template>
                      Liste des guides inscrits
                      <li
                        class="nav-link tt"
                        v-for="notification in guidesUnread"
                        :key="notification.id"
                        style="
  margin: 8px;
  border: 1px solid #d1d1d1;
  border-radius: 2px;
  text-align: left;"
                      >
                        <router-link
                          class="a"
                          @click="makeread"
                          :to="{name: 'show_guide', params: { id: notification.id }}"
                        >
                          <div class="row">
                            <a href="#" class="nav-item dropdown-item">
                              <img loading="lazy"
                                class="photo"
                                :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_guide/${notification.photo}`"
                                alt="Profile Photo"
                              />
                              &nbsp;
                              <span
                                style="font-weight:bold"
                              >{{notification.nom}} {{notification.prenom}}</span>
                              &nbsp;s'est inscrit
                              <b>{{notification.human_created_at}}</b>
                            </a>
                          </div>
                        </router-link>
                      </li>
                      <div v-if="guidesUnread.length==0">
                        <p style="padding:20px">
                          Pas de notification pour le moment
                          <img loading="lazy" src="/not-disturb-etnafes.png" />
                        </p>
                      </div>
                    </b-tab>
                    <b-tab title="Agences">
                      <template #title>
                        <i
                          class="fas fa-plane fa-xs"
                          title="Proprietaires agences"
                          style="color:#5cb85c"
                        ></i>
                      </template>
                      Liste des proprietaires agences inscrits
                      <li
                        class="nav-link tt"
                        v-for="notification in adagenceUnread"
                        :key="notification.id"
                        style="
  margin: 8px;
  border: 1px solid #d1d1d1;
  border-radius: 2px;
  text-align: left;"
                      >
                        <router-link
                          class="a"
                          @click="makeread"
                          :to="{name: 'show_adagence', params: { id: notification.id }}"
                        >
                          <div class="row">
                            <a href="#" class="nav-item dropdown-item">
                              <img loading="lazy"
                                class="photo"
                                :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_agence/${notification.photo}`"
                                alt="Profile Photo"
                              />
                              &nbsp;
                              <span
                                style="font-weight:bold"
                              >{{notification.nom}} {{notification.prenom}}</span>
                              &nbsp;s'est inscrit
                              <b>{{notification.human_created_at}}</b>
                            </a>
                          </div>
                        </router-link>
                      </li>
                      <div v-if="adagenceUnread.length==0">
                        <p style="padding:20px">
                          Pas de notification pour le moment
                          <img loading="lazy" src="/not-disturb-etnafes.png" />
                        </p>
                      </div>
                    </b-tab>

                    <b-tab title="Proprietaires Restaurants">
                      <template #title>
                        <i
                          class="fas fa-utensils fa-xs"
                          title="Proprietaires Restaurants"
                          style="color:#5cb85c"
                        ></i>
                      </template>
                      Liste des proprietaires restaurants inscrits
                      <li
                        class="nav-link tt"
                        v-for="notification in propsresUnread"
                        :key="notification.id"
                        style="margin: 8px;border: 1px solid #d1d1d1;border-radius: 2px;text-align: left;"
                      >
                        <router-link
                          class="a"
                          @click="makeread"
                          :to="{name: 'show_proprietaire_restau', params: { id: notification.id }}"
                        >
                          <div class="row">
                            <a href="#" class="nav-item dropdown-item">
                              <img loading="lazy"
                                class="photo"
                                :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_prop_restau/${notification.image}`"
                                alt="Profile Photo"
                              />
                              &nbsp;
                              <span
                                style="font-weight:bold"
                              >{{notification.nom}} {{notification.prenom}}</span>
                              &nbsp;s'est inscrit
                              <b>{{notification.human_created_at}}</b>
                            </a>
                          </div>
                        </router-link>
                      </li>
                      <div v-if="propsresUnread.length==0">
                        <p style="padding:20px">
                          Pas de notification pour le moment
                          <img loading="lazy" src="/not-disturb-etnafes.png" />
                        </p>
                      </div>
                    </b-tab>

                    <b-tab title="Hébérgements">
                      <template #title>
                        <i class="fas fa-hotel fa-xs" title="Hébérgements" style="color:#356aac"></i>
                      </template>
                      Liste des hébérgements ajoutés
                      <li
                        class="nav-link tt"
                        v-for="notification in hebergementsUnread"
                        :key="notification.id"
                        style="margin: 8px;border: 1px solid #d1d1d1;border-radius: 2px;text-align: left;"
                      >
                        <router-link
                          class="a"
                          @click="makeread"
                          :to="{name: 'show_proprietaire_restau', params: { id: notification.id }}"
                        >
                          <div class="row">
                            <a href="#" class="nav-item dropdown-item">
                              <img loading="lazy"
                                class="photo"
                                :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_prop/${notification.proprietaire.image}`"
                                alt="Profile Photo"
                              />
                              &nbsp;
                              <span
                                style="font-weight:bold"
                              >{{notification.proprietaire.nom}} {{notification.proprietaire.prenom}}</span>
                              &nbsp;a ajouté l'hébergement
                              <b
                                style="color:#ff6e89"
                              >{{notification.nom}}</b>&nbsp;
                              <b>{{notification.human_created_at}}</b>
                            </a>
                          </div>
                        </router-link>
                      </li>
                      <div v-if="propsresUnread.length==0">
                        <p style="padding:20px">
                          Pas de notification pour le moment
                          <img loading="lazy" src="/not-disturb-etnafes.png" />
                        </p>
                      </div>
                    </b-tab>

                    <b-tab title="Agences">
                      <template #title>
                        <i class="fas fa-plane fa-xs" title="Agences" style="color:#356aac"></i>
                      </template>
                      Liste des agences ajoutées
                      <li
                        class="nav-link tt"
                        v-for="notification in agencesUnread"
                        :key="notification.id"
                        style="
  margin: 8px;
  border: 1px solid #d1d1d1;
  border-radius: 2px;
  text-align: left;"
                      >
                        <router-link
                          class="a"
                          @click="makeread"
                          :to="{name: 'show_adagence', params: { id: notification.id }}"
                        >
                          <div class="row">
                            <a href="#" class="nav-item dropdown-item">
                              <img loading="lazy"
                                class="photo"
                                :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_agence/${notification.admin_agence.photo}`"
                                alt="Profile Photo"
                              />
                              &nbsp;
                              <span
                                style="font-weight:bold"
                              >{{notification.admin_agence.nom}} {{notification.admin_agence.prenom}}</span>
                              &nbsp;a ajouté l'agence
                              <b
                                style="color:#ff6e89"
                              >{{notification.nom_agence}}</b>&nbsp;
                              <b>{{notification.human_created_at}}</b>
                            </a>
                          </div>
                        </router-link>
                      </li>
                      <div v-if="adagenceUnread.length==0">
                        <p style="padding:20px">
                          Pas de notification pour le moment
                          <img loading="lazy" src="/not-disturb-etnafes.png" />
                        </p>
                      </div>
                    </b-tab>

                    <b-tab title="Proprietaires Restaurants">
                      <template #title>
                        <i class="fas fa-utensils fa-xs" title="Restaurants" style="color:#356aac"></i>
                      </template>
                      Liste des restaurants ajoutés
                      <li
                        class="nav-link tt"
                        v-for="notification in restaurantsUnread"
                        :key="notification.id"
                        style="margin: 8px;border: 1px solid #d1d1d1;border-radius: 2px;text-align: left;"
                      >
                        <router-link
                          class="a"
                          @click="makeread"
                          :to="{name: 'show_proprietaire_restau', params: { id: notification.id }}"
                        >
                          <div class="row">
                            <a href="#" class="nav-item dropdown-item">
                              <img loading="lazy"
                                class="photo"
                                :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_prop_restau/${notification.proprietairerestau.image}`"
                                alt="Profile Photo"
                              />
                              &nbsp;
                              <span
                                style="font-weight:bold"
                              >{{notification.proprietairerestau.nom}} {{notification.proprietairerestau.prenom}}</span>
                              &nbsp;a ajouté le restaurant
                              <b
                                style="color:#ff6e89"
                              >{{notification.nom}}</b>&nbsp;
                              <b>{{notification.human_created_at}}</b>
                            </a>
                          </div>
                        </router-link>
                      </li>
                      <div v-if="propsresUnread.length==0">
                        <p style="padding:20px">
                          Pas de notification pour le moment
                          <img loading="lazy" src="/not-disturb-etnafes.png" />
                        </p>
                      </div>
                    </b-tab>
                    <b-tab title="Proprietaires Restaurants">
                      <template #title>
                        <i
                          class="fas fa-archive fa-xs"
                          title="Liste des packs"
                          style="color:#356aac"
                        ></i>
                      </template>
                      Liste des packs ajoutés par les agences
                      <li
                        class="nav-link tt"
                        v-for="notification in packsUnread"
                        :key="notification.id"
                        style="margin: 8px;border: 1px solid #d1d1d1;border-radius: 2px;text-align: left;"
                      >
                        <router-link
                          class="a"
                          @click="makeread"
                          :to="{name: 'show_proprietaire_restau', params: { id: notification.id }}"
                        >
                          <div class="row">
                            <a href="#" class="nav-item dropdown-item">
                              <img loading="lazy"
                                class="photo"
                                :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_agence/${notification.agence.photo}`"
                                alt="Profile Photo"
                              />
                              &nbsp;
                              <span
                                style="font-weight:bold"
                              >{{notification.agence.nom}} {{notification.agence.prenom}}</span>
                              &nbsp;a ajouté le pack
                              <b
                                style="color:#ff6e89"
                              >{{notification.titre}}</b>&nbsp;
                              <b>{{notification.human_created_at}}</b>
                            </a>
                          </div>
                        </router-link>
                      </li>
                      <div v-if="propsresUnread.length==0">
                        <p style="padding:20px">
                          Pas de notification pour le moment
                          <img loading="lazy" src="/not-disturb-etnafes.png" />
                        </p>
                      </div>
                    </b-tab>
                    <b-tab title="Hébérgements">
                      <template #title>
                        <i
                          class="fas fa-hotel fa-xs"
                          title="Liste des réservations aux hébérgements"
                          style="color:#23abdd"
                        ></i>
                      </template>
                      Liste des réservations aux hébérgements
                      <li
                        class="nav-link tt"
                        v-for="notification in reservationslUnread"
                        :key="notification.id"
                        style="margin: 8px;border: 1px solid #d1d1d1;border-radius: 2px;text-align: left;"
                      >
                        <router-link
                          class="a"
                          @click="makeread"
                          :to="{name: 'show_proprietaire_restau', params: { id: notification.id }}"
                        >
                          <div class="row">
                            <a href="#" class="nav-item dropdown-item">
                              <img loading="lazy"
                                class="photo"
                                :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_client/${notification.client.photo}`"
                                alt="Profile Photo"
                              />
                              &nbsp;
                              <span
                                style="font-weight:bold"
                              >{{notification.client.nom}} {{notification.client.nom}}</span>
                              &nbsp;a réservé {{notification.nbr_place}} place(s) dans l'hébergement {{notification.hebergement.nom}}
                              <b>{{notification.human_created_at}}</b>
                            </a>
                          </div>
                        </router-link>
                      </li>
                      <div v-if="propsresUnread.length==0">
                        <p style="padding:20px">
                          Pas de notification pour le moment
                          <img loading="lazy" src="/not-disturb-etnafes.png" />
                        </p>
                      </div>
                    </b-tab>

                    <b-tab title="Agences">
                      <template #title>
                        <i
                          class="fas fa-archive fa-xs"
                          title="Liste des réservations aux packs"
                          style="color:#23abdd"
                        ></i>
                      </template>
                      Liste des réservations aux packs
                      <li
                        class="nav-link tt"
                        v-for="notification in reservationsUnread"
                        :key="notification.id"
                        style="
  margin: 8px;
  border: 1px solid #d1d1d1;
  border-radius: 2px;
  text-align: left;"
                      >
                        <router-link
                          class="a"
                          @click="makeread"
                          :to="{name: 'show_adagence', params: { id: notification.id }}"
                        >
                          <div class="row">
                            <a href="#" class="nav-item dropdown-item">
                              <img loading="lazy"
                                class="photo"
                                :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_client/${notification.client.photo}`"
                                alt="Profile Photo"
                              />
                              &nbsp;
                              <span
                                style="font-weight:bold"
                              >{{notification.client.nom}} {{notification.client.prenom}}</span>
                              &nbsp;a réservé {{notification.nbr_place}} place(s) dans le {{notification.pack.titre}}
                              <b>{{notification.human_created_at}}</b>
                            </a>
                          </div>
                        </router-link>
                      </li>
                      <div v-if="adagenceUnread.length==0">
                        <p style="padding:20px">
                          Pas de notification pour le moment
                          <img loading="lazy" src="/not-disturb-etnafes.png" />
                        </p>
                      </div>
                    </b-tab>
                  </b-tabs>
                </div>
              </ul>
            </div>
          </drop-down>-->
          <div v-if="!loggedIn">
            <div id="fb-root"></div>
            <div
              async
              defer
              crossorigin="anonymous"
              src="https://connect.facebook.net/fr_FR/sdk.js#xfbml=1&version=v11.0&appId=283287456919492&autoLogAppEvents=1"
              nonce="j2GaPHAw"
            ></div>
          </div>

          <drop-down>
            <a href="#" class="dropdown-toggle nav-link" data-toggle="dropdown">
              <div class="photo">
                <!-- <img loading="lazy" src="@/assets/img/anime3.png" alt="Profile Photo" /> -->
                <img loading="lazy"
                  :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_client/${user.photo}`"
                  alt="Profile Photo"
                />
              </div>
              <b class="caret d-none d-lg-block d-xl-block"></b>
              <p class="d-lg-none">Log out</p>
            </a>
            <ul class="dropdown-menu dropdown-navbar">
              <li class="nav-link">
                <a href="/user" class="nav-item dropdown-item">Profile</a>
              </li>
              <li class="nav-link">
                <a href="/statistiques" class="nav-item dropdown-item"
                  >Dashboard</a
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
import AllClients from "../AllClients.vue";
import { SidebarPlugin } from "@/components/index";
import { apiDomain } from "../../config";
export default {
  components: {
    DropDown,
    Modal,
    SidebarPlugin,
    Tabs,
    Tab,
    AllClients,
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
    /* this.fetchProprietaires();
    this.fetchGuides();
    this.fetchAdagences();
    this.fetchProprietairesRestau();
    this.fetchClients();
    this.fetchHebergements();
    this.fetchRests();
    this.fetchAgences();
    this.fetchPacks();
    this.fetchReservations(); */
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
</style>

