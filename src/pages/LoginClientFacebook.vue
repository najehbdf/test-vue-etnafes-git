<template>
  <div>
    <TopNavbarHome />
    <div style="height:466px;margin-top: -100px;    background-color: #fff;">
      <center>
        <PulseLoader v-show="error==''" loading="loading" color="#B5D88C" size="35px"></PulseLoader>
        <div v-show="error!=''">
          <div class="errPage-container">
            <!-- <el-button icon="el-icon-arrow-left" class="pan-back-btn"></el-button> -->
            <el-row>
              <el-col :span="12">
                <p class="text-jumbo">
                  Oops!
                  {{error}}
                </p>
                <h3>
                  <a href="https://etnafes.com/" target="_blank">Etnafes</a>
                </h3>

                <ul class="list-unstyled">
                  <li class="link-type">
                    <router-link to="/dashboard"></router-link>
                  </li>
                  <li class="link-type">
                    <a href="https://www.taobao.com/"></a>
                  </li>
                  <!-- <li>
                    <a href="#" @click.prevent="dialogVisible=true">点我看图</a>
                  </li>-->
                </ul>
              </el-col>
              <el-col :span="12">
                <img loading="lazy" :src="errGif" width="313" height="428" alt="Girl has dropped her ice cream." />
              </el-col>
            </el-row>
            <el-dialog :visible.sync="dialogVisible" title="随便看">
              <img loading="lazy" :src="ewizardClap" class="pan-img" />
            </el-dialog>
          </div>
        </div>
      </center>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import VuePassword from "vue-password";
import TopNavbarHome from "./Layout/TopNavbarHome.vue";
import Footer from "./Layout/Footer.vue";
import { apiDomain } from "../config";
import axios from "axios";
import { mapActions } from "vuex";
import Spinner from "vue-simple-spinner";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
/* import { PulseLoader2 } from "vue-spinner/dist/vue-spinner.min.js"; */
import errGif from "../assets/401_images/401.gif";

export default {
  components: {
    VuePassword,
    Spinner,
    PulseLoader,
    TopNavbarHome,
    Footer
  },
  data() {
    return {
      code: this.$route.query.code,
      message: "loading",
      loading: "loading",
      error: "",
      /* *********** */

      errGif: errGif + "?" + +new Date(),
      ewizardClap:
        "https://wpimg.wallstcn.com/007ef517-bafd-4066-aae4-6883632d9646",
      dialogVisible: false
    };
  },

  computed: {},
  created() {
    this.performLoginFB_client();
    // this.performLoginFB_guide();
  },
  methods: {
    //FB_guide
    performLoginFB_guide() {
      this.$store
        .dispatch(`loginFacebookCallback_guideAction`, {
          code: this.code
        })
        .then(res => {
          console.log(res);
          if (res.data.access_token) {
            this.$router.push("/");
          } else {
            this.$router.push("/");
          }
        });
    },
    //fb_client
    performLoginFB_client() {
      this.$store
        .dispatch(`loginFacebookCallbackAction`, {
          code: this.code
        })
        .then(res => {
          console.log(res);
          if (res.data.access_token) {
            this.$router.push("/dashboard_client");
          } else {
            this.$router.push("/");
          }
        })
        .catch(error => {
          if (error.response && error.response.status == 500) {
            this.error =
              "Votre compte facebook n'est pas connecté à une adresse email";
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.errPage-container {
  width: 800px;
  max-width: 100%;
  margin: 100px auto;
  .pan-back-btn {
    background: #008489;
    color: #fff;
    border: none !important;
  }
  .pan-gif {
    margin: 0 auto;
    display: block;
  }
  .pan-img {
    display: block;
    margin: 0 auto;
    width: 100%;
  }
  .text-jumbo {
    margin-top: 120px;
    font-size: 27px;
    font-weight: 700;
    color: #484848;
  }
  .list-unstyled {
    font-size: 14px;
    li {
      padding-bottom: 5px;
    }
    a {
      color: #008489;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>