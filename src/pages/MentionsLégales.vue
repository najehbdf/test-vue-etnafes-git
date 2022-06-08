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
            Conditions générales d’utilisation
            <hr style="border-top: 2px solid #ff931f; width: 10%" />
          </h3>
        </center>
        <div class="row">
          <div class="col-md-12">
            <h4 style="color: #333">
              PRIÈRE DE LIRE ATTENTIVEMENT CES CONDITIONS GÉNÉRALES AVANT TOUTE
              UTILISATION DE CE SITE
            </h4>
            <p style="text-align: justify; line-height: 25px">
              Par l’utilisation de ce Site, vous vous engagez de manière
              explicite à vous conformer aux présentes Conditions Générales,
              auxquelles vous acceptez d’être tenu et que Etnafes peut modifier
              à tout moment conformément aux termes des présentes. Nous vous
              invitons à vérifier périodiquement si des modifications ont été
              apportées aux présentes Conditions Générales. A défaut d’accord de
              votre part sur les présentes Conditions Générales, vous n’êtes pas
              autorisé à utiliser le présent Site.
            </p>
            <br />
            <h4 style="color: #333">Propriété et droits d’auteur</h4>
            <p style="text-align: justify; line-height: 25px">
              Sauf dispositions contraires, le présent Site, ainsi que tous les
              textes, les images, les marques, les logos et autres contenus (le
              tout désigné ci-après « Contenu du Site») sont protégés par des
              droits d’auteur de Etnafes, tous droits réservés. Etnafes, le logo
              « épingle » ainsi que toutes les autres marques exposées sur ce
              Site (les «Marques») sont des marques déposées par ou propriété de
              Etnafes. Aucun élément contenu sur le Site ne peut être considéré
              comme conférant sur les Marques un quelconque droit d’utilisation
              ni une quelconque licence, sur quelque fondement juridique que ce
              soit, sans l’accord préalable écrit de Etnafes. Les photos
              utilisées à titre d’illustrations des articles, pages et tous
              contenus présents sur le site Etnafes sont, sauf mention
              contraire, libres de droit. Etnafes utilise notamment les
              plateformes de photographies libres de droits telles que Pixabay,
              Flickr, Wikimedia, Pexels, Pxhere et Unsplash.
            </p>
            <br />
            <h4 style="color: #333">Utilisation du Site</h4>
            <p style="text-align: justify; line-height: 25px">
              Etnafes vous concède le droit de visualiser, télécharger et
              imprimer le Contenu du Site, sous les réserves et conditions
              suivantes :
              <br />1. Ce droit ne vous est concédé que pour votre usage
              personnel et non commercial, <br />2. Vous n’avez pas le droit de
              modifier le Contenu du Site, <br />3. Tout affichage ou impression
              de Contenu du Site doit porter la mention « © 2014, Etnafes Tous
              droits réservés », <br />4. Vous n’avez pas le droit de retirer ni
              de modifier les mentions de droits d’auteur, de marque ou autre
              indication de propriété que Etnafes a placé sur le Contenu du
              site, <br />5. Vous n’avez pas le droit, si ce n’est conformément
              à ces Conditions Générales, de reproduire, de distribuer ou
              d’afficher le Contenu du Site, ni de préparer des œuvres dérivées
              à partir de celui-ci. Sont également strictement interdits, sauf
              lorsqu’ils font l’objet d’une autorisation expresse donnée
              ci-dessus, toute reproduction, transmission, copie, ré-édition,
              redistribution ou tout envoi du Contenu du Site, en totalité ou en
              partie, sans l’autorisation préalable écrite de Etnafes. Pour
              effectuer une telle demande d’autorisation, vous pouvez contacter
              Etnafes à l’adresse suivante :
              <br />
              <span style="font-weight: 600">
                Etnafes 20, rue al Azhar Ben Nounafedh 3100, Mansoura Kairouan
                <br />Tunisie <br />Email: etnafes@contact.com
              </span>
              <br />
              <br />Vous déclarez et garantissez que l’utilisation que vous
              ferez du Site sera conforme aux dispositions de la présente
              licence, qu’elle n’enfreindra ni ne contrefera les droits d’un
              tiers, qu’elle ne constituera pas un manquement à des devoirs
              contractuels ou légaux à l’égard de tiers et qu’elle n’enfreindra
              pas des lois applicables. Vous vous engagez expressément à
              indemniser Etnafes de toute responsabilité envers tous tiers
              résultant de toute utilisation que vous feriez du Contenu du Site
              d’une manière non-conforme aux présentes Conditions Générales.
              Vous garantissez que vous êtes âgé de plus de 18 ans et que vous
              disposez de la capacité juridique pour conclure le présent accord
              et pour utiliser ce Site conformément à toutes les dispositions
              des présentes.
              <br />
              <br />L’utilisation du Site conformément aux présentes Conditions
              Générales est gratuite pour ses utilisateurs. Le Site contient
              toutefois des liens vers des sites internet de tiers, lesquels
              sont détenus et exploités par des revendeurs ou des prestataires
              de services indépendants. Il se peut que ces tiers réclament le
              paiement d’une redevance pour l’utilisation de certains contenus
              ou certains services fournis sur le site internet. Il vous
              appartient donc d’effectuer, avant de poursuivre une transaction
              avec un tiers, toutes vérifications que vous jugeriez nécessaires
              ou opportunes pour vérifier si une rémunération sera due. Lorsque
              Etnafes fournit sur le Site des détails concernant des prix, ces
              informations ne sont fournies qu’à titre indicatif et par souci de
              commodité. En aucun cas Etnafes ne garantit l’exactitude de telles
              informations et en aucun cas, Etnafes ne saurait être associé aux
              sites internet des tiers en question.
            </p>
          </div>
        </div>
        <div></div>
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
            pack.titre.match(this.searchQuery) ||
            pack.description.match(this.searchQuery.toLowerCase()) ||
            pack.description.match(this.searchQuery.toUpperCase()) ||
            pack.date_fin.match(this.searchQuery.toUpperCase()) ||
            pack.date_deb.match(this.searchQuery.toUpperCase())
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
  margin-left: 368px;
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

/* mobile */

.addLike_1_m {
  margin-top: -42px;
  margin-left: 227px;
  font-size: 20px;
}

.addDisLike_1_m {
  margin-top: -19px;
  margin-left: 287px;
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



