<template>
  <div class="content">
    <!-- <div class="container card"> -->

    <div>
      <ul class="nav nav-tabs nav-justified">
        <li class="nav-item">
          <a
            class="nav-link"
            @click.prevent="setActive('contact')"
            :class="{ active: isActive('contact') }"
            href="#contact"
          >Réservations Hebergements</a>
        </li>
      </ul>
      <div class="tab-content py-3" id="myTabContent">
        <div class="tab-pane fade" :class="{ 'active show': isActive('contact') }" id="contact">
          <card type="chart">
            <div class="progress-group-bars" v-for="hebergement in hebres" :key="hebergement.id">
              <p>
                {{hebergement.nom}}
                <span
                  style="float: right;font-weight:bold"
                >{{hebergement.reservation_hebergement_count}}</span>
              </p>

              <progress-bar
                size="7"
                bar-color="#5cb85c"
                :val="hebergement.reservation_hebergement_count"
                text-position="top"
                :title="hebergement.reservation_hebergement_count"
              ></progress-bar>
              <br />
            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ProgressBar from "vue-simple-progress";
import { Card } from "@/components/index";
import LineChart from "@/components/Charts/LineChart";
import BarChart from "@/components/Charts/BarChart";
import * as chartConfigs from "@/components/Charts/config";
import TaskList from "./Dashboard/TaskList";
import UserTable from "./Dashboard/UserTable";
import config from "@/config";
import { apiDomain } from "../config";
export default {
  components: {
    Card,
    LineChart,
    BarChart,
    TaskList,
    UserTable,
    ProgressBar
  },
  data() {
    return {
      activeItem: "contact",
      hebres: []
    };
  },
  computed: {
    enableRTL() {
      return this.$route.query.enableRTL;
    },
    isRTL() {
      return this.$rtl.isRTL;
    }
  },
  computed: {
    user() {
      return this.$store.getters.get_user;
    },
    prop() {
      return this.$store.getters.get_prop;
    }
  },
  created() {
    this.fetchHebReseration(this.$store.state.prop[0].id);
  },
  methods: {
    fetchHebReseration(id) {
      fetch(`${apiDomain}/api/hebergements_reservation/${id}`)
        .then(res => res.json())
        .then(res => {
          this.hebres = res.hebergements;
        })
        .catch(err => console.log(err));
    },
    isActive(menuItem) {
      return this.activeItem === menuItem;
    },
    setActive(menuItem) {
      this.activeItem = menuItem;
    }
  }
};
</script>
