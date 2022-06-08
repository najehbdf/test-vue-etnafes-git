<template>
  <div class="content">
    <div>
      <ul class="nav nav-tabs nav-justified">
        <li class="nav-item">
          <a
            class="nav-link"
            @click.prevent="setActive('contact')"
            :class="{ active: isActive('contact') }"
            href="#contact"
          >Réservations à mes Packs</a>
        </li>
      </ul>
      <div class="tab-content py-3" id="myTabContent">
        <div class="tab-pane fade" :class="{ 'active show': isActive('contact') }" id="contact">
          <card type="chart">
            <div class="progress-group-bars" v-for="hebergement in hebres" :key="hebergement.id">
              <p>
                {{hebergement.titre}}
                <span
                  style="float: right;font-weight:bold"
                >{{hebergement.reservation_count}}</span>
              </p>

              <progress-bar
                size="7"
                bar-color="#5cb85c"
                :val="hebergement.reservation_count"
                text-position="top"
                :title="hebergement.reservation_count"
              ></progress-bar>
              <br />
            </div>
          </card>
        </div>
      </div>

      <ul class="nav nav-tabs nav-justified">
        <li class="nav-item">
          <a
            class="nav-link"
            @click.prevent="setActive('contact')"
            :class="{ active: isActive('contact') }"
            href="#contact"
          >Réservations Agences</a>
        </li>
      </ul>
      <div class="tab-content py-3" id="myTabContent">
        <div class="tab-pane fade" :class="{ 'active show': isActive('contact') }" id="contact">
          <card type="chart">
            <div class="progress-group-bars" v-for="hebergement in agenceres" :key="hebergement.id">
              <p>
                {{hebergement.nom_agence}}
                <span
                  style="float: right;font-weight:bold"
                >{{hebergement.reservation_count}}</span>
              </p>

              <progress-bar
                size="7"
                bar-color="#5cb85c"
                :val="hebergement.reservation_count"
                text-position="top"
                :title="hebergement.reservation_count"
              ></progress-bar>
              <br />
            </div>
          </card>
        </div>
      </div>
    </div>

    <div></div>
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
      agenceres: [],
      activeItem: "contact",
      hebres: []
    };
  },
  computed: {
    user() {
      return this.$store.getters.get_user;
    },
    propagence() {
      return this.$store.getters.get_propagence;
    }
  },

  created() {
    this.fetchHebReseration(this.$store.state.propagence[0].id);
    this.fetchAgenceReseration(this.$store.state.propagence[0].id);
  },
  methods: {
    fetchAgenceReseration(id) {
      fetch(`${apiDomain}/api/agences_reservation/${id}`)
        .then(res => res.json())
        .then(res => {
          this.agenceres = res.agences;
        })
        .catch(err => console.log(err));
    },
    fetchHebReseration(id) {
      fetch(`${apiDomain}/api/packs_reservation/${id}`)
        .then(res => res.json())
        .then(res => {
          this.hebres = res.packs;
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

