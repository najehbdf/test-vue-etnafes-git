window.axios = require('axios')
import Vue from "vue";
import VueThreeSixty from 'vue-360'
import MetaInfo from 'vue-meta-info';

　　　　Vue.use(MetaInfo)
import 'vue-360/dist/css/style.css'

import VTab from 'v-tab'
 
// You need a specific loader for CSS files like https://github.com/webpack/css-loader
import 'v-tab/dist/v-tab.css'


Vue.use(VTab)

import Tabs from "vue-material-tabs";

Vue.use(Tabs);



import VueDatepickerUi from 'vue-datepicker-ui'
import 'vue-datepicker-ui/lib/vuedatepickerui.css';
import VueEasyCarousel from 'vue-easy-carousel';
import EasySlider from 'vue-easy-slider'

Vue.use(EasySlider)
Vue.use(VueEasyCarousel);
Vue.component('Date', VueDatepickerUi)

import FunctionalCalendar from 'vue-functional-calendar';
Vue.use(FunctionalCalendar, {
    dayNames: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
});
import VueNumericInput from 'vue-numeric-input';

Vue.use(VueNumericInput);

import VueGeolocation from 'vue-browser-geolocation';
Vue.use(VueGeolocation);
import VueGallerySlideshow from 'vue-gallery-slideshow';
Vue.use(VueGallerySlideshow);
Vue.use(VueThreeSixty)
import vueHeadful from 'vue-headful';

Vue.component('vue-headful', vueHeadful);

import VueTabs from 'vue-nav-tabs'
import 'vue-nav-tabs/themes/vue-tabs.css'
Vue.use(VueTabs)
import vuetify from './plugins/vuetify';
import VueRouter from "vue-router";
//vue social sharing
import SocialSharing from 'vue-social-sharing';
/* import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js' */

const VueSelect = {
  install(Vue, options) {
    Vue.component('SocialSharing', SocialSharing)
  }
};
Vue.use(VueSelect)


import VueGitHubButtons from "vue-github-buttons"
import "vue-github-buttons/dist/vue-github-buttons.css"
import App from "./App.vue";
import '@/assets/scss/white-dashboard.scss';
import '@/assets/css/nucleo-icons.css';
import "@/assets/demo/demo.css";
import "@/assets/css/style.css";
import VueTableDynamic from 'vue-table-dynamic'
Vue.use(VueTableDynamic)
import multipleselectMoez from 'multiple-select-js';
Vue.component('multiple-select-js', multipleselectMoez)
import VueSimpleAlert from "vue-simple-alert";
Vue.use(VueSimpleAlert);
import Multiselect from 'vue-multiselect'

// register globally
Vue.component('multiselect', Multiselect)


import ImageUploader from 'vue-image-upload-resize'
Vue.use(ImageUploader);
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2);

import VueCarousel from 'vue-carousel';

Vue.use(VueCarousel);
import vuescroll from 'vue-scroll'

Vue.use(vuescroll)
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import RTLPlugin from "./RTLPlugin";
import Notify from "@/components/NotificationPlugin";
import i18n from "./i18n"
import SideBar from "@/components/SidebarPlugin";
import store from "./store/store.js";
import Print from 'vue-print-nb'

import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';


/* moez */

import VueTransitionGroupX from 'vue-transition-group-x'

Vue.use(VueTransitionGroupX)

import PrettyCheckbox from 'pretty-checkbox-vue';
Vue.use(PrettyCheckbox);
/* moez */
import CoreuiVue from '@coreui/vue';
Vue.use(CoreuiVue);

import VueSocketIO from 'vue-socket.io'
Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:8890',
  // connection: 'https://www.node01.etnafes.shop',


}))




Vue.component('vue-phone-number-input', VuePhoneNumberInput);
import rate from 'vue-rate'
import 'vue-rate/dist/vue-rate.css'
import vSelect from 'vue-select'

Vue.component('v-select', vSelect)
import "vue-select/src/scss/vue-select.scss";
Vue.use(rate)
Vue.component('pagination', require('laravel-vue-pagination'));
import VuexPersistence from 'vuex-persist'
Vue.use(Print);
Vue.config.productionTip = false;

import VideoBg from 'vue-videobg'

Vue.component('video-bg', VideoBg)
import VueLocalStorage from 'vue-localstorage'
import ScrollFixedHeader from 'vuejs-scroll-fixed-header';
Vue.use(ScrollFixedHeader);
/* import Vuelidate from "vuelidate";
Vue.use(Vuelidate); */
Vue.use(VueLocalStorage)
// router setup
import routes from "./router";
import * as VueGoogleMaps from "vue2-google-maps";
import VueNoty from 'vuejs-noty'
import 'vuejs-noty/dist/vuejs-noty.css'

/* import * as VeeValidate from 'vee-validate';
Vue.use(VeeValidate); */
import {
  ValidationProvider
} from 'vee-validate/dist/vee-validate.full.esm';
Vue.component('ValidationProvider', ValidationProvider);
import {
  ValidationObserver
} from 'vee-validate';
Vue.component('ValidationObserver', ValidationObserver);

Vue.use(VueNoty)

// tinymce
import tinymce from 'vue-tinymce-editor'
Vue.component('tinymce', tinymce)

import VueApexCharts from 'vue-apexcharts'
import VueGtag from "vue-gtag";
Vue.use(VueGtag, {
  config: { id: "G-Q0HYGP7SY8" }
}); 
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCidD4GBkYXMcyDIRWWUhfkZHT9noeXXzE",
    libraries: "places" // necessary for places input
  }
});
// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  mode: 'history',
  linkExactActiveClass: "active"
});

window.Bus = new Vue;

Vue.use(VueRouter);
// Vue.use(SocialSharing);
Vue.use(VueGitHubButtons, {
  useCache: true
});
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);
Vue.use(RTLPlugin);
Vue.use(SideBar);
Vue.use(Notify);

new Vue({
  vuetify,
  router,
  i18n,
  store: store,
  render: h => h(App),
   mounted () {
    document. DispatchEvent (new event ('render event ')) // triggered
}  
}).$mount("#app");

