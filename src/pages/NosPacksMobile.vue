<template>
  <div>
    <TopNavbarHome />

    <div>
      <div></div>
      <div class="container" style="padding-bottom: 20px">
        <center>
          <h3
            style="
              line-height: 20px;
              color: #000;
              padding-top: 30px;
              margin-bottom: 30px;
            "
          >
            Nos Circuits
            <hr style="border-top: 2px solid #ff931f; width: 10%" />
          </h3>
        </center>
        <div class="row">
          <div class="col-md-12">
            <form class="d-flex">
              <input
                class="form-control"
                type="text"
                v-model="searchQuery"
                placeholder="Search"
              />
            </form>
          </div>
        </div>

        <!--    <div class="row" v-if="!loggedIn">
          <div class="col-md-12">
            <form class="d-flex">
              <input
                aria-label="label"
                type="text"
                class="form-control"
                @keyup="fetchsearchNoToken"
                v-model="q"
                placeholder="Chercher un pack : exemple par date 2020-10-01"
              />
            </form>
          </div>
        </div>-->
        <br />
        <div>
          <div class="row">
            <div
              class="col-lg-4"
              v-for="(pack, i) in resultQuery"
              :key="pack.id"
            >
              <div
                class="card"
                style="
                  margin-bottom: 30px;
                  margin-top: 10px;
                  border: solid 1px #b6b6b6;
                  padding: 10px;
                "
              >
                <router-link
                  :to="{
                    name: 'DetailsPack',
                    params: { id: pack.id },
                    query: { nb_adulte: 1 },
                  }"
                >
                  <div class="card-img-wrap">
                    <img loading="lazy"
                      class="card-img-top"
                      id="imagepack"
                      :src="`${apiDomain}/myapp/public/uploads/files_packs/${pack.image_couverture}`"
                      alt="Card image cap"
                    />
                  </div>
                </router-link>
                <div class="card-block" style="height: 170px">
                  <h4 class="card-title" style="color: #c37600">
                    {{ pack.titre }}
                  </h4>
                  <div>
                    <!-- v-if="q == ''" -->
                    <!-- divvvvvv -->

                    <div>
                      <span>
                        <button class="top-left">
                          <!--           :title="pack.titre"
           
                          :image="`${apiDomain}/myapp/public/uploads/files_packs/${pack.image_couverture}`"-->

                          <iframe
                            :src="`https://www.facebook.com/plugins/share_button.php?
                href=https://etnafes.com/detailspack/${pack.id}
                &layout=button_count&size=large&appId=763428000992015&width=104&height=28`"
                            width="104"
                            height="28"
                            style="border: none; overflow: hidden"
                            scrolling="no"
                            frameborder="0"
                            allowfullscreen="true"
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                          ></iframe>
                        </button>
                      </span>
                    </div>

                    <div v-if="pack.Favorite.length == 0">
                      <span>
                        <button
                          title=" Ajouter à vos favoris ?"
                          @click="
                            showEditModal(pack, i);
                            show = true;
                          "
                          v-on:click="submit"
                          class="
                            top-right
                            btn btn-primary btn-round btn-icon
                            NotFav
                          "
                        >
                          <i
                            class="tim-icons icon-heart-2"
                            style="vertical-align: middle"
                          ></i>
                        </button>
                      </span>
                    </div>

                    <div v-if="Object.keys(pack.Favorite).length > 0">
                      <span>
                        <span>
                          <button
                            title="Déja à vos favoris"
                            class="
                              top-right
                              btn btn-danger btn-round btn-icon
                              addFav
                            "
                          >
                            <i
                              class="tim-icons icon-heart-2"
                              style="vertical-align: middle"
                            ></i>
                          </button>
                        </span>
                      </span>
                    </div>
                  </div>
                  <!-- fin diiiiv -->
                  <div class="row" style="margin-top: -21px">
                    <div class="col-md-3">
                      <h4
                        class="card-title"
                        style="color: #c37600"
                        v-if="
                          pack.date_deb < new Date().toISOString().split('T')[0]
                        "
                      >
                        <span
                          class="badge badge-warning"
                          style="background-color: #ff4012"
                          >Circuit expiré</span
                        >
                      </h4>

                      <h4 class="card-title" style="color: #c37600" v-else>
                        <span
                          class="badge badge-success"
                          style="background-color: #28b351"
                          >Nouveau circuit</span
                        >
                      </h4>
                    </div>

                    <!--  -->

                    <div class="rowww d-none d-lg-block">
                      <!-- 1) #creation v if mech 3aml hata haja la like la dislike -->
                      <!-- original like & dislik -->
                      <div v-if="pack.Like.length == 0">
                        <div class="addLike_1">
                          <!-- <button
                                  @click="
                                    showEditModal(pack, i);
                                    show = true;
                                  "
                                  title="J'aime ce contenu"
                                  v-on:click="submitLike"
                          >-->
                          <!--  <i
                            @click="
                              showEditModal(pack, i);
                              show = true;
                            "
                            title="J'aime ce contenu"
                            v-on:click="submitLike"
                            onmouseover="this.style.cursor='pointer'"
                            style="color: #909090"
                            class="fas fa-thumbs-up"
                          ></i> -->

                          <img loading="lazy"
                            @click="
                              showEditModal(pack, i);
                              show = true;
                            "
                            title="J'aime ce contenu"
                            v-on:click="submitLike"
                            onmouseover="this.style.cursor='pointer'"
                            src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-like-feedback-those-icons-lineal-those-icons.png"
                          />

                          <!--  </button> -->
                          <div class="countLike">
                            {{ pack.countlike.length }}
                          </div>
                        </div>
                        <!--  -->

                        <div class="addDisLike_1">
                          <!-- <button
                                  title="Je n'aime pas ce contenu"
                                  @click="
                                    showEditModal(pack, i);
                                    show = true;
                                  "
                                  v-on:click="submitDisLike"
                          >-->
                          <!-- <i
                            title="Je n'aime pas ce contenu"
                            @click="
                              showEditModal(pack, i);
                              show = true;
                            "
                            onmouseover="this.style.cursor='pointer'"
                            v-on:click="submitDisLike"
                            style="color: #909090"
                            class="fa fa-thumbs-down"
                            aria-hidden="true"
                          ></i> -->

                          <img loading="lazy"
                            title="Je n'aime pas ce contenu"
                            style="margin-top: -10px"
                            @click="
                              showEditModal(pack, i);
                              show = true;
                            "
                            onmouseover="this.style.cursor='pointer'"
                            v-on:click="submitDisLike"
                            aria-hidden="true"
                            src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-dislike-feedback-those-icons-lineal-those-icons.png"
                          />
                          <!-- </button> -->
                          <div class="countDis">
                            {{ pack.countdislike.length }}
                          </div>
                        </div>
                      </div>
                      <!-- 2) #update v if  3aml  like  -->
                      <!-- original like & dislik -->
                      <div
                        v-show="Object.keys(pack.Like).length > 0"
                        v-for="(like, index) in pack.Like"
                        :key="like.id"
                      >
                        <div v-if="like.verif == 0">
                          <!--if verif :0 yaa3ni 3aml deja j'aime  -->

                          <div class="addLike_1">
                            <!--  <button
                                    @click="
                                      deleteLike(like.id);
                                      notifyVue('bottom', 'center');
                                    "
                                    title="je n'aime plus"
                            >-->
                            <!-- dislike -->
                            <!-- <i
                              @click="
                                deleteLike(like.id);
                                notifyVue('bottom', 'center');
                              "
                              title="je n'aime plus"
                              onmouseover="this.style.cursor='pointer'"
                              style="color: #2b60de"
                              class="fas fa-thumbs-up"
                            ></i> -->

                            <img loading="lazy"
                              @click="
                                deleteLike(like.id);
                                notifyVue('bottom', 'center');
                              "
                              title="je n'aime plus"
                              onmouseover="this.style.cursor='pointer'"
                              src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-like-feedback-those-icons-lineal-those-icons.png"
                            />
                            <!--  </button> -->
                            <div class="countLike">
                              {{ pack.countlike.length }}
                            </div>
                          </div>
                          <!--  -->

                          <div class="addDisLike_1">
                            <!-- <button
                                    title="Je n'aime pas ce contenu"
                                    @click="
                                      showEditModal(pack, index);
                                      show = true;
                                    "
                                    v-on:click="updatedLikeVerifTo_1(like.id)"
                            >-->
                            <!-- <i
                              title="Je n'aime pas ce contenu"
                              @click="
                                showEditModal(pack, index);
                                show = true;
                              "
                              v-on:click="updatedLikeVerifTo_1(like.id)"
                              onmouseover="this.style.cursor='pointer'"
                              style="color: #909090"
                              class="fa fa-thumbs-down"
                              aria-hidden="true"
                            ></i> -->

                            <img loading="lazy"
                              title="Je n'aime pas ce contenu"
                              style="margin-top: -10px"
                              @click="
                                showEditModal(pack, index);
                                show = true;
                              "
                              v-on:click="updatedLikeVerifTo_1(like.id)"
                              onmouseover="this.style.cursor='pointer'"
                              aria-hidden="true"
                              src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-dislike-feedback-those-icons-lineal-those-icons.png"
                            />
                            <!--  </button> -->
                            <div class="countDis">
                              {{ pack.countdislike.length }}
                            </div>
                          </div>
                        </div>

                        <!-- if gouwa deja 3aml dislike -->
                        <div v-if="like.verif == 1">
                          <!--if verif :0 yaa3ni 3aml deja j'aime  -->

                          <div class="addLike_1">
                            <!--   <button
                                    @click="
                                      showEditModal(pack, i);
                                      show = true;
                                    "
                                    v-on:click="
                                      updatedDisLikeVerifTo_0(like.id)
                                    "
                                    title="J'aime ce contenu"
                            >-->
                            <!-- <i
                              @click="
                                showEditModal(pack, i);
                                show = true;
                              "
                              v-on:click="updatedDisLikeVerifTo_0(like.id)"
                              title="J'aime ce contenu"
                              onmouseover="this.style.cursor='pointer'"
                              style="color: #909090"
                              class="fas fa-thumbs-up"
                            ></i> -->

                            <img loading="lazy"
                              @click="
                                showEditModal(pack, i);
                                show = true;
                              "
                              v-on:click="updatedDisLikeVerifTo_0(like.id)"
                              title="je n'aime plus"
                              onmouseover="this.style.cursor='pointer'"
                              src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-like-feedback-those-icons-lineal-those-icons.png"
                            />
                            <!--   </button> -->
                            <div class="countLike">
                              {{ pack.countlike.length }}
                            </div>
                          </div>
                          <!--  -->

                          <div class="addDisLike_1">
                            <!--    <button
                                    title="Je n'aime pas ce contenu"
                                    @click="
                                      showEditModal(pack, i);
                                      show = true;
                                    "
                                    v-on:click="
                                      deleteDisLike(like.id);
                                      notifyAimePAs('bottom', 'center');
                                    "
                            >-->
                            <!-- <i
                              title="Je n'aime pas ce contenu"
                              @click="
                                showEditModal(pack, i);
                                show = true;
                              "
                              v-on:click="
                                deleteDisLike(like.id);
                                notifyAimePAs('bottom', 'center');
                              "
                              onmouseover="this.style.cursor='pointer'"
                              style="color: #2b60de"
                              class="fa fa-thumbs-down"
                              aria-hidden="true"
                            ></i> -->

                            <img loading="lazy"
                              title="Je n'aime pas ce contenu"
                              style="margin-top: -10px"
                              @click="
                                showEditModal(pack, i);
                                show = true;
                              "
                              v-on:click="
                                deleteDisLike(like.id);
                                notifyAimePAs('bottom', 'center');
                              "
                              onmouseover="this.style.cursor='pointer'"
                              aria-hidden="true"
                              src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-dislike-feedback-those-icons-lineal-those-icons.png"
                            />
                            <!--  </button> -->
                            <div class="countDis">
                              {{ pack.countdislike.length }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!--  -->
                    <div
                      class="col-md-9 d-none d-lg-block"
                      style="margin-top: -34px; margin-left: 113px"
                    >
                      <img loading="lazy"
                        width="7%"
                        src="https://img.icons8.com/color/50/000000/visible--v1.png"
                      />
                      {{ pack.nb_vus }}
                    </div>

                    <div
                      class="col-md-9 d-lg-none"
                      style="margin-top: -33px; margin-left: 112px"
                    >
                      <img loading="lazy"
                        width="9%"
                        src="https://img.icons8.com/color/50/000000/visible--v1.png"
                      />
                      {{ pack.nb_vus }}
                      <span>
                        <!-- 1) #creation v if mech 3aml hata haja la like la dislike -->
                        <!-- original like & dislik -->
                        <div v-if="pack.Like.length == 0">
                          <div class="addLike_1_m">
                            <!-- <i
                            @click="
                              showEditModal(pack, i);
                              show = true;
                            "
                            title="J'aime ce contenu"
                            v-on:click="submitLike"
                            onmouseover="this.style.cursor='pointer'"
                            style="color: #909090"
                            class="fas fa-thumbs-up"
                          ></i> -->

                            <img loading="lazy"
                              @click="
                                showEditModal(pack, i);
                                show = true;
                              "
                              title="J'aime ce contenu"
                              v-on:click="submitLike"
                              onmouseover="this.style.cursor='pointer'"
                              src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-like-feedback-those-icons-lineal-those-icons.png"
                            />

                            <!--  </button> -->
                            <div class="countLike">
                              {{ pack.countlike.length }}
                            </div>
                          </div>
                          <!--  -->

                          <div class="addDisLike_1_m">
                            <!-- <i
                            title="Je n'aime pas ce contenu"
                            @click="
                              showEditModal(pack, i);
                              show = true;
                            "
                            onmouseover="this.style.cursor='pointer'"
                            v-on:click="submitDisLike"
                            style="color: #909090"
                            class="fa fa-thumbs-down"
                            aria-hidden="true"
                          ></i> -->

                            <img loading="lazy"
                              title="Je n'aime pas ce contenu"
                              style="margin-top: -10px"
                              @click="
                                showEditModal(pack, i);
                                show = true;
                              "
                              onmouseover="this.style.cursor='pointer'"
                              v-on:click="submitDisLike"
                              aria-hidden="true"
                              src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-dislike-feedback-those-icons-lineal-those-icons.png"
                            />
                            <!-- </button> -->
                            <div class="countDis">
                              {{ pack.countdislike.length }}
                            </div>
                          </div>
                        </div>
                        <!-- 2) #update v if  3aml  like  -->
                        <!-- original like & dislik -->
                        <div
                          v-show="Object.keys(pack.Like).length > 0"
                          v-for="(like, index) in pack.Like"
                          :key="like.id"
                        >
                          <div v-if="like.verif == 0">
                            <!--if verif :0 yaa3ni 3aml deja j'aime  -->

                            <div class="addLike_1_m">
                              <!-- <i
                              @click="
                                deleteLike(like.id);
                                notifyVue('bottom', 'center');
                              "
                              title="je n'aime plus"
                              onmouseover="this.style.cursor='pointer'"
                              style="color: #2b60de"
                              class="fas fa-thumbs-up"
                            ></i> -->

                              <img loading="lazy"
                                @click="
                                  deleteLike(like.id);
                                  notifyVue('bottom', 'center');
                                "
                                title="je n'aime plus"
                                onmouseover="this.style.cursor='pointer'"
                                src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-like-feedback-those-icons-lineal-those-icons.png"
                              />
                              <!--  </button> -->
                              <div class="countLike">
                                {{ pack.countlike.length }}
                              </div>
                            </div>
                            <!--  -->

                            <div class="addDisLike_1_m">
                              <!-- <i
                              title="Je n'aime pas ce contenu"
                              @click="
                                showEditModal(pack, index);
                                show = true;
                              "
                              v-on:click="updatedLikeVerifTo_1(like.id)"
                              onmouseover="this.style.cursor='pointer'"
                              style="color: #909090"
                              class="fa fa-thumbs-down"
                              aria-hidden="true"
                            ></i> -->
                              <img loading="lazy"
                                title="Je n'aime pas ce contenu"
                                style="margin-top: -10px"
                                @click="
                                  showEditModal(pack, index);
                                  show = true;
                                "
                                v-on:click="updatedLikeVerifTo_1(like.id)"
                                onmouseover="this.style.cursor='pointer'"
                                aria-hidden="true"
                                src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-dislike-feedback-those-icons-lineal-those-icons.png"
                              />
                              <!--  </button> -->
                              <div class="countDis">
                                {{ pack.countdislike.length }}
                              </div>
                            </div>
                          </div>

                          <!-- if gouwa deja 3aml dislike -->
                          <div v-if="like.verif == 1">
                            <!--if verif :0 yaa3ni 3aml deja j'aime  -->

                            <div class="addLike_1_m">
                              <!-- <i
                              @click="
                                showEditModal(pack, i);
                                show = true;
                              "
                              v-on:click="updatedDisLikeVerifTo_0(like.id)"
                              title="J'aime ce contenu"
                              onmouseover="this.style.cursor='pointer'"
                              style="color: #909090"
                              class="fas fa-thumbs-up"
                            ></i> -->

                              <img loading="lazy"
                                @click="
                                  showEditModal(pack, i);
                                  show = true;
                                "
                                v-on:click="updatedDisLikeVerifTo_0(like.id)"
                                title="J'aime ce contenu"
                                onmouseover="this.style.cursor='pointer'"
                                src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-like-feedback-those-icons-lineal-those-icons.png"
                              />
                              <div class="countLike">
                                {{ pack.countlike.length }}
                              </div>
                            </div>

                            <div class="addDisLike_1_m">
                              <!-- <i
                              title="Je n'aime pas ce contenu"
                              @click="
                                showEditModal(pack, i);
                                show = true;
                              "
                              v-on:click="
                                deleteDisLike(like.id);
                                notifyAimePAs('bottom', 'center');
                              "
                              onmouseover="this.style.cursor='pointer'"
                              style="color: #2b60de"
                              class="fa fa-thumbs-down"
                              aria-hidden="true"
                            ></i> -->
                              <img loading="lazy"
                                title="Je n'aime pas ce contenu"
                                style="margin-top: -10px"
                                @click="
                                  showEditModal(pack, i);
                                  show = true;
                                "
                                v-on:click="
                                  deleteDisLike(like.id);
                                  notifyAimePAs('bottom', 'center');
                                "
                                onmouseover="this.style.cursor='pointer'"
                                aria-hidden="true"
                                src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-dislike-feedback-those-icons-lineal-those-icons.png"
                              />
                              <!--  </button> -->
                              <div class="countDis">
                                {{ pack.countdislike.length }}
                              </div>
                            </div>
                          </div>
                        </div>
                      </span>
                    </div>
                  </div>

                  <!--  <div class="output" style="margin-top: 5px">
                    <p style="padding: 10px">
                      <HighlightWords
                        class="wrapper"
                        highlightClassName="highlight"
                        highlightTag="i"
                        :searchWords="keywords"
                        :autoEscape="true"
                        :textToHighlight="pack.description"
                      ></HighlightWords>
                    </p>                   
                  </div> -->

                  <div>
                    <div v-if="pack.description.length < 180">
                      {{ pack.description }}
                    </div>
                    <div v-else>
                      {{ pack.description.substr(0, 200) + "..." }}
                    </div>
                  </div>

                  <!-- 
                    <div
                            v-if="contact.lasTmsg.text.length < 18"
                            class="lastMsg"
                          >
                            {{ contact.lasTmsg.text }}
                          </div>
                          <div class="lastMsg" v-else>
                            {{ contact.lasTmsg.text.substr(0, 18) + "..." }}
                          </div>
                   -->
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- </div> -->
        <pagination
          :limit="4"
          :data="packsWithSearch"
          @pagination-change-page="getResults"
          class="mt-5"
        ></pagination>
      </div>
    </div>

    <Footer></Footer>
  </div>
</template>



  <script>
import headful from "headful";
import HighlightWords from "vue-highlight-words";
import StrongProps from "../components/StrongProps";
import StrongSlot from "../components/StrongSlot";
import axios from "axios";
import TopNavbarHome from "./Layout/TopNavbarHome.vue";
import Footer from "./Layout/Footer.vue";
import { required, minLength, between } from "vuelidate/lib/validators";
import { apiDomain } from "../config";
// import favorite from "./favorite";
import NotificationTemplate from "./Notifications/NotificationTemplate";
import pasAimeContenu from "./Notifications/pasAimeContenu";

import Modal from "@melmacaluso/vue-modal";
import { Facebook } from "vue-socialmedia-share";
export default {
  components: {
    TopNavbarHome,
    Footer,
    Facebook,
    HighlightWords,
    // favorite,
    Modal,
  },

  props: ["favorited"],
  data() {
    return {
      title: "Etnafes | Nos packs",

      /* favorite */
      show: false,
      showdetailleModale: false,
      detaille: {
        id: "",
      },
      index: -1,
      /* fin favorite */

      isFavorited: "",
      IDpacks: "",
      q: "",
      client: [],
      guide: [],
      admin: [],

      adagence: [],

      proprietaire: [],
      proprestau: [],
      scrollPosition: null,
      token: null,
      pagination: {},
      strongProps: StrongProps,
      strongSlot: StrongSlot,
      search: "",
      apiDomain: "https://etnafesapi20212018.etnafes.com",
      packs: [],
      packsWithSearch: {},
      me: {},
      /* searchQuery: null, */
      searchQuery: "",
    };
  },

  created() {
    if (this.loggedIn == true) {
      //client
      if (this.user.role == 2) this.fetchclient(this.$store.state.user.id);
      //proprietaire hébergement
      if (this.user.role == 6)
        this.fetchproprietaire(this.$store.state.user.id);
      //proprietaire restaurant
      if (this.user.role == 5) this.fetchproprestau(this.$store.state.user.id);
      //agence admin
      if (this.user.role == 3) this.fetchagenceadmin(this.$store.state.user.id);
      //guide
      if (this.user.role == 4) this.fetchguide(this.$store.state.user.id);
      //admin
      if (this.user.role == 1) this.fetchadmin(this.$store.state.user.id);
    }
    if (this.loggedIn == true) {
      this.fetchsearch();
    }
    if (this.loggedIn == false) {
      this.fetchsearchNoToken();
    }
    // this.fetchMyFav(this.$store.state.user.id);
    this.fetchMe();
  },

  /*  mounted() {
     
            setTimeout(() => {
                this.title = 'Etnafes | Nos packs';
            }, 3000);
  }, */

  computed: {
    url_p() {
      /*   if ((this.detaille.id = "")) {
        return (this.url_pack = `https://etnafes.com/detailspack/avis/1`);
      }

      if (this.detaille.id != "") {
        return (this.url_pack = `https://etnafes.com/detailspack/avis/${this.detaille.id}`);
      } */

      if (this.detaille.id != "") {
        return (this.url_pack = `https://etnafes.com/detailspack/avis/${this.detaille.id}`);
      }
      return (this.url_pack = `https://etnafes.com/detailspack/avis/1`);
    },

    resultQuery: function () {
      if (Array.isArray(this.packsWithSearch)) {
        return this.packsWithSearch.filter((pack) => {
          return (
            pack.titre.toLowerCase().match(this.searchQuery) ||
            pack.description
              .toLowerCase()
              .match(this.searchQuery.toLowerCase()) ||
            pack.date_fin.match(this.searchQuery) ||
            pack.date_deb.match(this.searchQuery)
          );
        });
      }
    },
    resultQuery____() {
      if (this.searchQuery) {
        return this.packsWithSearch.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every(
              (v) => item.titre.toLowerCase().includes(v),
              (vv) => item.description.toLowerCase().includes(vv)
            );
        });
      } else {
        return this.packsWithSearch;
      }
    },

    isFavorite() {
      return this.favorited;
    },

    isFavoritePack() {
      return this.packsWithSearch;
    },
    loggedIn() {
      return this.$store.getters.get_loggedIn;
    },

    user() {
      return this.$store.getters.get_user;
    },
    keywords() {
      return this.search.split(" ");
    },
    filteredPacks: function () {
      if (Array.isArray(this.packs)) {
        return this.packs.filter((pack) => {
          return (
            pack.titre.match(this.search) ||
            pack.date_deb.match(this.search) ||
            pack.date_fin.match(this.search) ||
            pack.description.match(this.search)
          );
        });
      }
    },
  },

  methods: {
    /* like */

    notifyVue(verticalAlign, horizontalAlign) {
      const color = Math.floor(Math.random());
      this.$notify({
        component: NotificationTemplate,
        //  icon: "tim-icons icon-bell-55",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        // type: this.type[color],
        timeout: 3000,
      });
    },

    notifyAimePAs(verticalAlign, horizontalAlign) {
      const color = Math.floor(Math.random());
      this.$notify({
        component: pasAimeContenu,
        //  icon: "tim-icons icon-bell-55",
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        // type: this.type[color],
        timeout: 3000,
      });
    },

    deleteLike(id) {
      fetch(`${apiDomain}/api/deleteLike/${id}`, {
        method: "delete",
      })
        .then((res) => res.json())
        .then((data) => {
          this.fetchsearch();
        })

        .catch((err) => console.log(err));
    },

    deleteDisLike(id) {
      fetch(`${apiDomain}/api/deleteDisLike/${id}`, {
        method: "delete",
      })
        .then((res) => res.json())

        .then((data) => {
          this.fetchsearch();
        })

        .catch((err) => console.log(err));
    },

    updatedLikeVerifTo_1(id) {
      fetch(`${apiDomain}/api/UpdatedLike/${id}`, {
        method: "delete",
      })
        .then((res) => res.json())
        .then((data) => {
          this.fetchsearch();
        })

        .catch((err) => console.log(err));
    },

    updatedDisLikeVerifTo_0(id) {
      fetch(`${apiDomain}/api/UpdatedDisLike/${id}`, {
        method: "delete",
      })
        .then((res) => res.json())

        .then((data) => {
          this.fetchsearch();
        })

        .catch((err) => console.log(err));
    },

    /* likes */
    /* favorite */
    showEditModal(pack, index) {
      let obj = {
        id: pack.id,
      };
      this.detaille = obj;
      this.showdetailleModale = true;
      this.index = index;
    },

    showdetaille(pack) {
      this.detaille = pack;
      this.showdetailleModale = true;
    },

    submitLike() {
      let formData = new FormData();

      formData.append("client_id", this.$store.state.user.id);
      formData.append("pack_id", this.detaille.id);

      axios
        .post(
          `${apiDomain}/api/addLike`,

          formData,
          {
            body: JSON.stringify(this.annonce),
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )

        .then((res) => {
          this.show = false;
          //this.$noty.success("ajouter avec Succès ! ");
          this.fetchsearch();
        })

        .catch((error) => {
          console.log(error.response.data);
        });
    },

    submitDisLike() {
      let formData = new FormData();

      formData.append("client_id", this.$store.state.user.id);
      formData.append("pack_id", this.detaille.id);

      axios
        .post(
          `${apiDomain}/api/addDisLike`,

          formData,
          {
            body: JSON.stringify(this.annonce),
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )

        .then((res) => {
          this.show = false;
          //this.$noty.success("ajouter avec Succès ! ");
          this.fetchsearch();
        })

        .catch((error) => {
          console.log(error.response.data);
        });
    },

    submit() {
      let formData = new FormData();

      formData.append("client_id", this.$store.state.user.id);
      formData.append("pack_id", this.detaille.id);

      axios
        .post(
          `${apiDomain}/api/favoritePack2`,

          formData,
          {
            body: JSON.stringify(this.annonce),
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )

        .then((res) => {
          this.show = false;
          //this.$noty.success("ajouter avec Succès ! ");
          this.fetchsearch();
        })

        .catch((error) => {
          console.log(error.response.data);
        });
    },

    /* fin favorite */

    fetchPack(id) {
      fetch(`${apiDomain}/api/showSinglPack/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.singlPack = res;
        })
        .catch((err) => console.log(err));
    },

    fetchMe() {
      fetch(`${apiDomain}/api/user` + "?token=" + this.$store.state.token)
        .then((res) => res.json())
        .then((res) => {
          this.me = res;
        })
        .catch((err) => console.log(err));
    },

    /*  fetchMyFav(id) {
      fetch(`${apiDomain}/api/my_favorites/${this.$store.state.user.id}`)
        .then((res) => res.json())
        .then((res) => {
          this.favorited = res.Fav;
        })
        .catch((err) => console.log(err));
    }, */

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
    fetchadmin(id) {
      fetch(`${apiDomain}/api/admin/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.admin = res;
        })
        .catch((err) => console.log(err));
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
    fetchguide(id) {
      fetch(`${apiDomain}/api/guide/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.guide = res.guide;
        })
        .catch((err) => console.log(err));
    },
    fetchproprestau(id) {
      fetch(`${apiDomain}/api/proprietaire_restau/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.proprestau = res.proprietaire;
        })
        .catch((err) => console.log(err));
    },
    fetchproprietaire(id) {
      fetch(`${apiDomain}/api/prop/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.proprietaire = res.proprietaire;
        })
        .catch((err) => console.log(err));
    },
    //show user by id
    fetchclient(id) {
      fetch(`${apiDomain}/api/client/${id}?token=${this.$store.state.token}`)
        .then((res) => res.json())
        .then((res) => {
          this.client = res;
        })
        .catch((err) => console.log(err));
    },

    fetchsearch() {
      axios
        .get(
          `${apiDomain}/api/allpacks/search` +
            "?token=" +
            this.$store.state.token
        )
        .then((response) => (this.packsWithSearch = response.data))
        .catch((error) => console.log(error));
    },

    fetchsearch____() {
      if (this.q.length > 1) {
        axios
          .get(
            `${apiDomain}/api/allpacks/search/` +
              this.q +
              "?token=" +
              this.$store.state.token
          )
          .then((response) => (this.packsWithSearch = response.data))
          .catch((error) => console.log(error));
      } else {
        axios
          .get(
            `${apiDomain}/api/allpacks/search` +
              "?token=" +
              this.$store.state.token
          )
          .then((response) => (this.packsWithSearch = response.data))
          .catch((error) => console.log(error));
      }
    },

    fetchsearchNoToken() {
      axios
        .get(`${apiDomain}/api/allpacks/search/nottoken`)
        .then((response) => (this.packsWithSearch = response.data))
        .catch((error) => console.log(error));
    },
    getResults(page = 1) {
      axios
        .get(
          `${apiDomain}/api/allpacks/search?token=${this.$store.state.token}&page=` +
            page
        )
        .then((response) => {
          this.packsWithSearch = response.data;
        });
    },
  },
};
</script>


<style>
.favoriting {
  display: inline-block;
}
.favorite__heart {
  display: inline-block;
  padding: 3px;
  vertical-align: middle;
  line-height: 1;
  font-size: 40px;
  color: #ababab;
  cursor: pointer;
  -webkit-transition: color 0.2s ease-out;
  transition: color 0.2s ease-out;
}
.favorite__heart.is-disabled:hover {
  cursor: default;
}
.favorite__checkbox {
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
}
.favorite__heart__selected {
  color: #df470b;
}

.big-oui {
  border: none;
  border-radius: 14px;
  margin-top: -17px !important;
  width: 98px;
  height: 50px;
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(268.39deg, #e3519d -137.3%, #ec5e05 98.63%);
}

.big-non {
  margin-top: -14px !important;
  border: none;
  border-radius: 14px;
  width: 95px;
  height: 42px;
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 600;
  color: #fff;
  background: #929dcedc;

  /*  background: linear-gradient(268.39deg, #a92268 -137.3%, #da4dd8 98.63%); */
}

/* .btn {
  display: inline-block;
  margin-bottom: 0;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  white-space: nowrap;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857;
  border-radius: 4px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
} */

.btn,
.wpcf7-submit,
.gform_wrapper .button,
.gform_button {
  font-weight: 700;
  line-height: 40px;
  padding: 0 30px;
  text-align: center;
}

/*  */
/* //27/05/2021 */

/*  */

.countDisLike {
  margin-top: -22px;
  margin-left: 334px !important;
}

.countLikeMobile {
  margin-left: 319px !important;
  margin-top: -28px;
}
.countDisLikeMobile {
  margin-top: -21px;
  margin-left: 260px !important;
}

.addDisLike_1NP {
  margin-top: -23px;
  margin-left: 348px;
  font-size: 20px;
}

.addLike_1NP {
  margin-top: -41px;
  margin-left: 295px;
  font-size: 20px;
}

.countLikeNP {
  margin-left: 22px !important;
  margin-top: -24px !important;
  font-size: 15px;
}
.countDisNP {
  margin-top: -28px !important;
  margin-left: 25px;
  font-size: 15px;
}

.style_button {
  position: relative;

  border: #fff;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  text-decoration: none;
  overflow: hidden;
  cursor: pointer;
}
.style_button:after {
  content: "";
  background: #2b60de;
  display: block;
  position: absolute;

  opacity: 0;
  transition: all 0.8s;
}
</style>


<style>
.button {
  position: relative;
  background: #49546d;
  border: 2px solid none;

  font-size: 28px;
  padding: 20px;
  width: 200px;
  text-align: center;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  text-decoration: none;
  overflow: hidden;
  cursor: pointer;
}

.button:after {
  content: "";
  background: #2b60de;
  display: block;
  position: absolute;
  padding-top: 300%;
  padding-left: 350%;
  margin-left: -20px !important;
  margin-top: -120%;
  opacity: 0;
  transition: all 0.9s;
}

.button:active:after {
  padding: 0;
  margin: 0;
  opacity: 1;
  transition: 0s;
}

.btn22 {
  border: 2px solid none;
  background-color: white;
  color: rgb(216, 208, 208);
  padding: 14px 28px;
  font-size: 16px;
  cursor: pointer;
}

/* Gray */
/* .default {
  border-color: #e7e7e7;
  color: #fff;
}

.default:hover {
  background: #e7e7e7;
} */

.addLike_1 {
  margin-top: -42px;
  margin-left: 300px;
  font-size: 20px;
}

.addDisLike_1 {
  margin-top: -22px;
  margin-left: 358px;
  font-size: 20px;
}

.countLike {
  margin-top: -25px !important;
  margin-left: 33px !important;
  font-size: 15px;
}

.countDis {
  margin-top: -30px !important;
  margin-left: 34px;
  font-size: 15px;
}

.addLike_1_ {
  margin-top: -42px !important;
  margin-left: 300px !important;
  font-size: 20px;
}

.addDisLike_1_ {
  margin-top: -22px !important;
  margin-left: 368px !important;
  font-size: 20px;
}

/* web */

.addLike_1_w {
  margin-top: -42px;
  margin-left: 227px;
  font-size: 20px;
}

.addDisLike_1_w {
  margin-top: -19px;
  margin-left: 287px;
  font-size: 20px;
}

/* mobile */

.addLike_1_m {
  margin-top: -26px !important;
  margin-left: 78px !important;
  font-size: 20px;
}

.addDisLike_1_m {
  margin-top: -22px !important;
  margin-left: 134px !important;
  font-size: 20px;
}

.countLike_m {
  margin-top: -25px !important;
  margin-left: 33px !important;
  font-size: 15px;
}

.countDis_m {
  margin-top: -30px !important;
  margin-left: 34px;
  font-size: 15px;
}
/*  */

.add {
  border-radius: 50% !important;
  position: absolute !important;
  font-size: 1em !important;
  top: 6% !important;

  -webkit-transform: translate(-12px, -12px) !important;
  transform: translate(-12px, -12px) !important;
  line-height: 1.5626rem !important;
  width: 24px !important;
  background: #fff !important;
}

.add:hover {
  border-radius: 50% !important;
  position: absolute !important;
  font-size: 1em !important;
  top: 6% !important;

  -webkit-transform: translate(-12px, -12px) !important;
  transform: translate(-12px, -12px) !important;
  line-height: 1.5626rem !important;
  width: 24px !important;
  background: #fff !important;
}
</style>



