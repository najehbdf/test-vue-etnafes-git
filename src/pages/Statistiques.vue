<template>
  <div class="content">
    <div class="container card" style="background-color: #ebebeb">
      <div class="row">
        <div class="col-md-7">
          <card type="chart" cardCol style="padding: 5px">
            <!-- <template slot="header"> -->
            <!-- <h5 class="card-category">
            Clients par mois |
            Année {{ selectedClient.year }}:
            {{ totalClientsAnnee }} Inscriptions
            </h5>-->

            <h5>Total des inscriptions</h5>

            <h3 class="card-title">
              <i class="tim-icons icon-bell-55 text-primary"></i>
              {{ totalClientsAnnee }} Inscriptions en {{ selectedClient.year }}
            </h3>
            <div
              class="form-check form-check-inline"
              v-for="(annUsers, index) in anneeUsers"
              :key="'i' + index"
            >
              <div v-if="annUsers <= yearSystem">
                <input
                  aria-label="label"
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  :value="annUsers"
                  :id="'annUsers' + index"
                  v-model="selectedClient.year"
                  @change="loadClientsMois(selectedClient.year)"
                />

                <label class="form-check-label" :for="'annUsers' + index">{{
                  annUsers
                }}</label>
              </div>
            </div>
            <!-- </template> -->
            <apexchart
              type="line"
              height="350"
              :options="chartOptionsChaqueMoisClient"
              :series="ClientsMois"
            ></apexchart>
          </card>
        </div>
        <div class="col-md-5">
          <card type="chart" cardCol style="padding: 5px">
            <h5>Acteurs Etnafes</h5>
            <h3 class="card-title">
              <i class="tim-icons icon-bell-55 text-primary"></i>
              {{ totalUsersCat }} Acteurs
            </h3>
            <apexchart
              height="auto"
              type="pie"
              width="480"
              :options="chartOptionsCategories"
              :series="Inscriptions[0].data"
            ></apexchart>
            <!-- <apexchart type="pie" height="350" :options="CategorieUsers" :series="series"></apexchart> -->
          </card>
        </div>
      </div>

      <div class="row" style="margin-top: 8px">
        <div class="col-md-7">
          <card type="chart" cardCol style="padding: 5px">
            <!-- <template slot="header"> -->
            <!-- <h5 class="card-category">
            Clients par mois |
            Année {{ selectedClient.year }}:
            {{ totalClientsAnnee }} Inscriptions
            </h5>-->

            <h5>Total des réservations aux packs</h5>

            <h3 class="card-title">
              <i class="tim-icons icon-bell-55 text-primary"></i>
              {{ totalResAnnee }} Réservations en {{ selectedRes.year }}
            </h3>
            <div
              class="form-check form-check-inline"
              v-for="(annUsers, index) in anneeRes"
              :key="'i' + index"
            >
              <div v-if="annUsers <= yearSystem">
                <input
                  aria-label="label"
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  :value="annUsers"
                  :id="'annUsers' + index"
                  v-model="selectedRes.year"
                  @change="loadReservationsMois(selectedRes.year)"
                />

                <label class="form-check-label" :for="'annUsers' + index">{{
                  annUsers
                }}</label>
              </div>
            </div>
            <!-- </template> -->
            <apexchart
              type="area"
              height="350"
              :options="chartOptionsChaqueMoisRes"
              :series="ReservationsMois"
            ></apexchart>
          </card>
        </div>
        <div class="col-md-5">
          <card type="chart" cardCol style="padding: 5px">
            <h5>Les packs les plus aimés</h5>
            <h3 class="card-title">
              <i class="tim-icons icon-bell-55 text-primary"></i>
              nos packs
            </h3>
            <apexchart
              height="auto"
              type="pie"
              width="480"
              :options="PacksExpire"
              :series="PacksAvis"
            ></apexchart>
            <!-- <apexchart type="pie" height="350" :options="CategorieUsers" :series="series"></apexchart> -->
          </card>
        </div>
      </div>
      <div class="row" style="margin-top: 8px">
        <div class="col-md-7">
          <card type="chart" cardCol style="padding: 5px">
            <h5>Statistiques guides par villes</h5>

            <h3 class="card-title">
              <i class="tim-icons icon-bell-55 text-primary"></i>
              {{ totalGuides }} Guides
            </h3>
            <apexchart
              type="bar"
              height="350"
              :options="chartOptions"
              :series="GuidesVilles"
            ></apexchart>
          </card>
        </div>
        <div class="col-md-5">
          <card type="chart" cardCol style="padding: 5px">
            <h5>Réservations aux packs</h5>
            <div class="form-group">
              <input
                aria-label="label"
                type="text"
                v-model="search"
                placeholder="Recherche par nom .."
                style="border:1px solid #ebebeb;width:100%;height:height: 2.65rem;"
              />
            </div>
            <div
              class="progress-group-bars"
              v-for="pack in filteredPacks"
              :key="pack.id"
            >
              <p>
                {{ pack.titre }}
                <span style="float: right; font-weight: bold">
                  {{ pack.reservation_count }}
                </span>
              </p>

              <progress-bar
                size="7"
                style="border-radius: 5px !important; margin-bottom: 4px"
                bar-color="#ff931f"
                :val="pack.reservation_count"
                text-position="top"
                :title="pack.reservation_count"
              ></progress-bar>
            </div>
            <div class="row">
              <pagination
                :limit="4"
                :data="packsres"
                @pagination-change-page="getResults"
                class="mt-3"
              ></pagination>
            </div>
          </card>
        </div>
      </div>

      <div class="row" style="margin-top: 8px">
        <div class="col-md-7">
          <card type="chart" cardCol style="padding: 5px">
            <h5>Statistiques hébergeurs par villes</h5>
            <h3 class="card-title">
              <i class="tim-icons icon-bell-55 text-primary"></i>
              {{ totalHebergeurs }} Hébergeurs
            </h3>
            <apexchart
              type="bar"
              height="350"
              :options="chartOptions"
              :series="HebergeursVilles"
            ></apexchart>
          </card>
        </div>
        <div class="col-md-5">
          <card type="chart" cardCol style="padding: 5px">
            <h5>Réservations aux hébergements</h5>
            <div class="row">
              <div class="col-md-5">
                <div class="form-group">
                  <select
                    class="form-control"
                    id="SelectRegion"
                    required
                    v-model="pays_id"
                    @change="fetchVillesPays(pays_id)"
                  >
                    <option value disabled selected>
                      choisissez votre pays
                    </option>
                    <option
                      v-for="pays in pays"
                      v-bind:key="pays.id"
                      v-bind:value="pays.id"
                    >
                      {{ pays.nom_fr_fr }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="col-md-5">
                <div class="form-group">
                  <select
                    class="form-control"
                    id="SelectRegion"
                    @change="updateVilleHeb"
                  >
                    <option value disabled selected>
                      choisissez votre destination
                    </option>
                    <option
                      v-for="ville in villespays"
                      v-bind:key="ville.id"
                      v-bind:value="ville.id"
                    >
                      {{ ville.nom }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="col-md-1">
                <i
                  onmouseover="this.style.cursor='pointer'"
                  style="color: red"
                  title="Vider la recherche"
                  class="tim-icons icon-simple-remove"
                  @click="
                    fetchHebReseration();
                    pays_id = '';
                    this.$store.state.ville_id = '';
                  "
                ></i>
                <!-- <button
                  type="submit"
                  style="float:right"
                  class="btn btn-info"
                  @click="fetchHebReseration();pays_id='';this.$store.state.ville_id=''"
                  fill
                >Vider</button>-->
              </div>
            </div>

            <div
              v-show="pays_id == ''"
              class="progress-group-bars"
              v-for="hebergement in hebres"
              :key="hebergement.id"
            >
              <p>
                {{ hebergement.nom }}
                <span style="float: right; font-weight: bold">{{
                  hebergement.reservation_hebergement_count
                }}</span>
              </p>

              <progress-bar
                size="7"
                style="margin-bottom: 4px"
                bar-color="#5cb85c"
                :val="hebergement.reservation_hebergement_count"
                text-position="top"
                :title="hebergement.reservation_hebergement_count"
              ></progress-bar>
            </div>

            <div
              v-show="pays_id != ''"
              class="progress-group-bars"
              v-for="hebergement in hebergementsville"
              :key="hebergement.id"
            >
              <p>
                {{ hebergement.nom }}
                <span style="float: right; font-weight: bold">{{
                  hebergement.reservation_hebergement_count
                }}</span>
              </p>

              <progress-bar
                size="7"
                style="margin-bottom: 4px"
                bar-color="#5cb85c"
                :val="hebergement.reservation_hebergement_count"
                text-position="top"
                :title="hebergement.reservation_hebergement_count"
              ></progress-bar>
            </div>
          </card>
        </div>
      </div>
      <div class="row" style="margin-top: 8px">
        <div class="col-md-7">
          <card type="chart" cardCol style="padding: 5px">
            <h5>Statistiques proprietaires agences par villes</h5>

            <h3 class="card-title">
              <i class="tim-icons icon-bell-55 text-primary"></i>
              {{ totalPropagences }} Proprietaires Agences
            </h3>
            <apexchart
              type="bar"
              height="350"
              :options="chartOptions"
              :series="PropagencesVilles"
            ></apexchart>
          </card>
        </div>

        <div class="col-md-5">
          <card type="chart" cardCol>
            <h5>Clients par genre</h5>

            <div class="col-md-12">
              <p>
                Hommes
                <span style="float: right; font-weight: bold">{{
                  HommeAll.length
                }}</span>
              </p>
              <div class="progress-group-bars">
                <progress-bar
                  bar-color="#dc720f"
                  :val="PHommeAll"
                  title="60%"
                ></progress-bar>
              </div>
              <p>
                Femmes
                <span style="float: right; font-weight: bold">{{
                  FemmeAll.length
                }}</span>
              </p>
              <div class="progress-group-bars">
                <progress-bar
                  bar-color="#fdc900"
                  :val="PFemmeAll"
                  title="60%"
                ></progress-bar>
              </div>
            </div>

            <div class="col-md-12">
              <card type="chart" cardCol>
                <apexchart
                  style="float: right"
                  type="bar"
                  height="250"
                  width="520"
                  :options="chartOptions2"
                  :series="HommeFemme"
                ></apexchart>
              </card>
            </div>
          </card>
        </div>
      </div>

      <!-- <card type="chart" cardCol>
        <h5>Répartition des proprietaires restaurants</h5>
        <h3 class="card-title">
          <i class="tim-icons icon-bell-55 text-primary"></i>
          {{totalProprestaus}} Proprietaires Restaurants
        </h3>
        <apexchart type="bar" height="350" :options="chartOptions" :series="ProprestausVilles"></apexchart>
      </card>-->
      <div class="row" style="margin-top: 8px">
        <div class="col-md-7">
          <card type="chart" cardCol style="padding: 5px">
            <h5>Statistiques zones touristiques par villes</h5>

            <h3 class="card-title">
              <i class="tim-icons icon-bell-55 text-primary"></i>
              {{ totalZones }} Zones
            </h3>

            <!-- <apexchart type="pie" width="680" :options="chartOptionsZones" :series="Zones[0].data"></apexchart> -->
            <!-- <apexchart ref="donut" width="350" type="donut" :options="chartOptions" :series="series"></apexchart> -->
            <apexchart
              type="bar"
              height="350"
              :options="chartOptions"
              :series="ZonesVilles"
            ></apexchart>
          </card>
        </div>
      </div>
      <div class="row" style="margin-top: 8px">
        <div class="col-md-7">
          <!-- moez pack par ville -->
          <card type="chart" cardCol style="padding: 5px">
            <h5>Statistiques packs par villes</h5>

            <h3 class="card-title">
              <i class="tim-icons icon-bell-55 text-primary"></i>
              {{ totalPacks }} Packs
            </h3>
            <!-- <apexchart ref="donut" width="350" type="donut" :options="chartOptions" :series="series"></apexchart> -->
            <apexchart
              type="bar"
              height="350"
              :options="chartOptions"
              :series="PacksVilles"
            ></apexchart>
          </card>
        </div>
      </div>

      <!--  -->
      <!-- <card type="chart" cardCol>
        <div class="row">
          <div class="col-md-12">
            <h5>Clients par genre</h5>
          </div>

          <div class="col-md-6">
            <p>
              Hommes
              <span style="float: right;font-weight:bold">{{HommeAll.length}}</span>
            </p>
            <div class="progress-group-bars">
              <progress-bar bar-color="#dc720f" :val="PHommeAll" title="60%"></progress-bar>
            </div>
            <p>
              Femmes
              <span style="float: right;font-weight:bold">{{FemmeAll.length}}</span>
            </p>
            <div class="progress-group-bars">
              <progress-bar bar-color="#fdc900" :val="PFemmeAll" title="60%"></progress-bar>
            </div>
          </div>

          <div class="col-md-6">
            <card type="chart" cardCol>
              <apexchart
                style="float:right"
                type="bar"
                height="250"
                width="520"
                :options="chartOptions2"
                :series="HommeFemme"
              ></apexchart>
            </card>
          </div>
        </div>
      </card>-->

      <!--  <card type="chart">
        <div class="row">
          <div class="col-md-12">
            <h5>Réservations aux packs</h5>
            <div class="form-group">
              <input
                aria-label="label"
                type="text"
                v-model="searchPack"
                placeholder="recherche par nom"
                style="border:1px solid #ebebeb;width:100%;height:height: 2.65rem;"
              />
            </div>
          </div>
        </div>
        <div class="progress-group-bars" v-for="pack in filteredBlogs" :key="pack.id">
          <p>
            {{ pack.titre }}
            <span style="float: right; font-weight: bold">
              {{
              pack.reservation_count
              }}
            </span>
          </p>

          <progress-bar
            size="7"
            style="border-radius: 5px !important;margin-bottom:4px"
            bar-color="#ff931f"
            :val="pack.reservation_count"
            text-position="top"
            :title="pack.reservation_count"
          ></progress-bar>
        </div>
        <div class="row">
          <pagination :limit="4" :data="packsres" @pagination-change-page="getResults" class="mt-3"></pagination>
        </div>
      </card>-->

      <!-- <card type="chart">
        <div class="row">
          <div class="col-md-12">
            <h5>Réservations aux hébergements</h5>
          </div>

          <div class="col-md-3">
            <div class="form-group">
              <select
                class="form-control"
                id="SelectRegion"
                required
                v-model="pays_id"
                @change="fetchVillesPays(pays_id)"
              >
                <option value disabled selected>choisissez votre pays</option>
                <option
                  v-for="pays in pays"
                  v-bind:key="pays.id"
                  v-bind:value="pays.id"
                >{{pays.nom_fr_fr}}</option>
              </select>
            </div>
          </div>

          <div class="col-md-3">
            <div class="form-group">
              <select class="form-control" id="SelectRegion" @change="updateVilleHeb">
                <option value disabled selected>choisissez votre destination</option>
                <option
                  v-for="ville in villespays"
                  v-bind:key="ville.id"
                  v-bind:value="ville.id"
                >{{ville.nom}}</option>
              </select>
            </div>
          </div>

          <div class="col-md-3 offset-md-3">
            <button
              type="submit"
              style="float:right"
              class="btn btn-info"
              @click="fetchHebReseration();pays_id='';this.$store.state.ville_id=''"
              fill
            >Vider</button>
          </div>
        </div>

        <div
          v-show="pays_id==''"
          class="progress-group-bars"
          v-for="hebergement in hebres"
          :key="hebergement.id"
        >
          <p>
            {{hebergement.nom}}
            <span
              style="float: right;font-weight:bold"
            >{{hebergement.reservation_hebergement_count}}</span>
          </p>

          <progress-bar
            size="7"
            style="margin-bottom:4px"
            bar-color="#5cb85c"
            :val="hebergement.reservation_hebergement_count"
            text-position="top"
            :title="hebergement.reservation_hebergement_count"
          ></progress-bar>
        </div>

        <div
          v-show="pays_id!=''"
          class="progress-group-bars"
          v-for="hebergement in hebergementsville"
          :key="hebergement.id"
        >
          <p>
            {{hebergement.nom}}
            <span
              style="float: right;font-weight:bold"
            >{{hebergement.reservation_hebergement_count}}</span>
          </p>

          <progress-bar
            size="7"
            style="margin-bottom:4px"
            bar-color="#5cb85c"
            :val="hebergement.reservation_hebergement_count"
            text-position="top"
            :title="hebergement.reservation_hebergement_count"
          ></progress-bar>
        </div>
      </card>-->
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
import { apiDomain } from "../config";
import config from "@/config";

export default {
  components: {
    Card,
    LineChart,
    BarChart,
    TaskList,
    UserTable,
    ProgressBar,
  },
  data() {
    return {
      series: [44, 55, 13, 43],
      Zones: [],
      totalUsersCat: "",

      chartOptionsZones: {
        chart: {
          width: 480,
          type: "pie",
        },
        legend: {
          position: "bottom",
        },
        labels: [
          "Ariana",
          "Béja",
          "Ben Arous",
          "Bizerte",
          "Gabès",
          "Gafsa",
          "Jendouba",
          "Kébili",
          "Kairouan",
          "Kasserine",
          "La Manouba",
          "Le Kef",
          "Médenine",
          "Mahdia",
          "Monastir",
          "Nabeul",
          "Sfax",
          "Sidi Bouzid",
          "Siliana",
          "Sousse",
          "Tataouine",
          "Tozeur",
          "Tunis",
          "Zaghouan",
        ],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
      PacksExpire: {
        chart: {
          width: 380,
          type: "pie",
        },
        legend: {
          position: "bottom",
        },
        labels: [],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
      chartOptionsCategories: {
        chart: {
          width: 380,
          type: "pie",
        },
        legend: {
          position: "bottom",
        },
        labels: [
          "Guides",
          "Hébergeurs",
          "Proprietaires restaurants",
          "Proprietaitres agences",
        ],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
      filterText: "",
      searchPack: "",
      hebergementsville: [],
      pays_id: "",
      pays: {},
      villespays: {},
      search: "",
      hebres: [],
      packsres: [],
      //femme + homme
      HommeFemme: [
        {
          name: "Genre",
        },
      ],
      PHommeAll: {},
      PFemmeAll: {},
      HommeAll: {},
      FemmeAll: {},
      anneeUsers: [2020, 2021, 2022, 2024],

      anneeRes: [2020, 2021, 2022, 2024],
      yearSystem: new Date().getFullYear(),
      totalClientsAnnee: "",
      totalZones: "",
      totalGuides: "",
      totalHebergeurs: "",
      totalPropagences: "",
      totalProprestaus: "",

      totalPacks: "",
      selectedClient: {
        year: new Date().getFullYear(),
      },

      selectedRes: {
        year: new Date().getFullYear(),
      },

      chartOptionsChaqueMoisRes: {
        colors: ["#546E7A"],
        chart: {
          height: 350,
          type: "line",
          stroke: {
            curve: "smooth",
          },
          events: {
            click: function (chart, w, e) {},
          },
        },
        //colors: colors,
        plotOptions: {
          bar: {
            columnWidth: "45%",
            distributed: true,
          },
        },
        dataLabels: {
          enabled: true,
        },
        legend: {
          show: false,
        },
        xaxis: {
          categories: [
            ["Janvier"],
            ["Février"],
            ["Mars"],
            ["Avril"],
            ["Mai"],
            ["Juin"],
            ["Juillet"],
            ["Aout"],
            ["Septembre"],
            ["Octobre"],
            ["Novembre"],
            ["Décembre"],
          ],
          labels: {
            style: {
              // colors: colors,
              fontSize: "12px",
            },
          },
        },
        yaxis: {
          minU: 0,
          maxU: 0,
        },
      },
      chartOptionsChaqueMoisClient: {
        colors: ["#546E7A"],
        chart: {
          height: 350,
          type: "line",
          stroke: {
            curve: "smooth",
          },
          events: {
            click: function (chart, w, e) {
              // console.log(chart, w, e)
            },
          },
        },
        // colors: colors,
        plotOptions: {
          bar: {
            columnWidth: "45%",
            distributed: true,
          },
        },

        legend: {
          position: "top",
          horizontalAlign: "right",
          floating: true,
          offsetY: -25,
          offsetX: -5,
        },
        dataLabels: {
          enabled: true,
        },
        // title: {
        //   text: "Average High & Low Temperature",
        //   align: "left"
        // },
        grid: {
          borderColor: "#e7e7e7",
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        markers: {
          size: 1,
        },
        xaxis: {
          categories: [
            ["Janvier"],
            ["Février"],
            ["Mars"],
            ["Avril"],
            ["Mai"],
            ["Juin"],
            ["Juiller"],
            ["Aout"],
            ["Septembre"],
            ["Octobre"],
            ["Novembre"],
            ["Décembre"],
          ],
          labels: {
            style: {
              // colors: colors,
              fontSize: "12px",
            },
          },
        },
        yaxis: {
          minU: 0,
          maxU: 0,
        },
      },
      ClientsMois: [
        {
          name: "Inscriptions",
        },
      ],
      ZonesVilles: [
        {
          name: "Zones",
        },
      ],

      GuidesVilles: [
        {
          name: "Guides",
        },
      ],

      HebergeursVilles: [
        {
          name: "Guides",
        },
      ],

      PropagencesVilles: [
        {
          name: "Prop agence",
        },
      ],
      ProprestausVilles: [
        {
          name: "Prop restau",
        },
      ],

      PacksVilles: [
        {
          name: "Packs",
        },
      ],

      activeItem: "home",

      chartOptions2: {
        chart: {
          height: 350,
          type: "bar",
          events: {
            click: function (chart, w, e) {
              // console.log(chart, w, e)
            },
          },
        },
        // colors: colors,
        plotOptions: {
          bar: {
            columnWidth: "45%",
            distributed: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
        },
        xaxis: {
          categories: [["Hommes"], ["Femmes"]],
          labels: {
            style: {
              // colors: colors,
              fontSize: "12px",
            },
          },
        },
        yaxis: {
          minHF: 0,
          maxHF: 0,
          /*  title: {
            text: "G"
          } */
        },
      },

      chartOptions: {
        /* plotOptions: {
          bar: {
            barHeight: "80%",
            distributed: true,
            horizontal: true,
            dataLabels: {
              position: "bottom"
            }
          }
        }, */
        colors: [
          function ({ value, seriesIndex, w }) {
            if (value < 3) {
              return "#7bb932";
            } else {
              return "#ec6b08";
            }
          },
        ],
        chart: {
          size: 900,
          width: 680,
          type: "bar",
        },
        labels: [
          "Ariana",
          "Béja",
          "Ben Arous",
          "Bizerte",
          "Gabès",
          "Gafsa",
          "Jendouba",
          "Kébili",
          "Kairouan",
          "Kasserine",
          "La Manouba",
          "Le Kef",
          "Médenine",
          "Mahdia",
          "Monastir",
          "Nabeul",
          "Sfax",
          "Sidi Bouzid",
          "Siliana",
          "Sousse",
          "Tataouine",
          "Tozeur",
          "Tunis",
          "Zaghouan",
        ],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
      Inscriptions: [],
      CategorieUsers: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: ["Guide", "Proprietaire", "Restau", "Agence"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
      PacksAvis: [],
      ReservationsMois: [
        {
          name: "Réservations",
        },
      ],
      totalResAnnee: "",
      chartOptions1: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: ["Hommes", "Femmes"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
  },
  computed: {
    filteredBlogs() {
      console.log(this.searchPack, this.filterText, this.packsres.data);
      return this.packsres.data.filter((apiRequest) => {
        let regexp = new RegExp(
          `(?=.*${this.filterText})(?=.*${this.searchPack})`,
          "g"
        );
        return apiRequest.titre.match(regexp);
      });
    },
    filteredPacks: function () {
      return this.packsres.data.filter((pack) => {
        return pack.titre.toLowerCase().match(this.search.toLowerCase());
      });
    },

    filteredHeb: function () {
      return this.hebres.filter((hebergement) => {
        return hebergement.nom.toLowerCase().match(this.search.toLowerCase());
      });
    },
    enableRTL() {
      return this.$route.query.enableRTL;
    },
    isRTL() {
      return this.$rtl.isRTL;
    },
  },

  created() {
    this.fetchPHomme();
    this.fetchHomme();
    this.fetchFemme();
    this.fetchPFemme();
    this.fetchPacksReseration();
    this.fetchHebReseration();

    this.fetchPackVille();
    this.loadClientsMois();
    this.loadReservationsMois();

    this.fetchChartHommeFemme();
    this.fetchPays();
    this.loadZonesVilles();
    this.loadGuidesVilles();
    this.loadHebergeursVilles();
    this.loadPropagencesVilles();
    this.loadProprestausVilles();
    this.loadPacksVilles();
    this.loadCategorieUsers();
    this.loadPacksExpire();
    this.loadPacksAvis();
  },
  methods: {
    loadPacksAvis() {
      fetch(`${apiDomain}/api/PacksAvis`)
        .then((res) => res.json())
        .then((res) => {
          this.PacksAvis = res;
        });
    },
    loadPacksExpire() {
      fetch(`${apiDomain}/api/PacksExipreAvis`)
        .then((res) => res.json())
        .then((res) => {
          this.PacksExpire.labels = res;
        });
    },
    loadCategorieUsers: function () {
      axios

        .get(`${apiDomain}/api/getallUsersCats`)
        .then((response) => {
          this.totalUsersCat = response.data.total;
          this.Inscriptions = [
            {
              data: [
                response.data.Guide,
                response.data.heb,
                response.data.p_resto,
                response.data.p_agence,
              ],
            },
          ];
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    filter(event) {
      this.filterText = event.target.selected ? event.target.value : "";
    },

    updateVilleHeb(e) {
      this.$store.commit("updateVilleid", e.target.value);

      axios
        .get(
          `${apiDomain}/api/hebergements/ville/${this.$store.state.ville_id}`
        )
        .then(({ data }) => (this.hebergementsville = data.hebergementsv));
    },

    fetchVillesPays(id) {
      axios
        .get(`${apiDomain}/api/pays/villes/${id}`)
        .then(({ data }) => (this.villespays = data.villes));
    },
    fetchPays() {
      axios.get(`${apiDomain}/api/pays`).then(({ data }) => (this.pays = data));
    },
    //statistique homme et femme
    //sattistique annonce par categorie
    fetchPHomme() {
      fetch(
        `${apiDomain}/api/percentageUserHomme?token=${this.$store.state.token}`
      )
        .then((res) => res.json())
        .then((res) => {
          this.PHommeAll = res.PourcentageUserHomme;
        })
        .catch((err) => console.log(err));
    },

    fetchPacksReseration() {
      fetch(`${apiDomain}/api/packs/reservation`)
        .then((res) => res.json())
        .then((res) => {
          this.packsres = res.packspaginate;
        })
        .catch((err) => console.log(err));
    },

    getResults(page = 1) {
      axios
        .get(`${apiDomain}/api/packs/reservation?page=` + page)
        .then((response) => {
          this.packsres = response.packspaginate;
        });
    },

    fetchHebReseration() {
      fetch(
        `${apiDomain}/api/hebergements_reservation?token=${this.$store.state.token}`
      )
        .then((res) => res.json())
        .then((res) => {
          this.hebres = res.hebergements;
        })
        .catch((err) => console.log(err));
    },

    fetchPFemme() {
      fetch(
        `${apiDomain}/api/percentageUserFemme?token=${this.$store.state.token}`
      )
        .then((res) => res.json())
        .then((res) => {
          this.PFemmeAll = res.PourcentageUserFemme;
        })
        .catch((err) => console.log(err));
    },
    //chart femme et homme
    fetchChartHommeFemme() {
      axios
        .get(
          `${apiDomain}/api/statChartFemmeHomme?token=${this.$store.state.token}`
        )
        .then((response) => {
          this.HommeFemme = [
            {
              data: [response.data.homme, response.data.femme],
            },
          ];
        })
        .catch((err) => console.log(err));
    },
    fetchHomme() {
      fetch(
        `${apiDomain}/api/statistiqueHomme?token=${this.$store.state.token}`
      )
        .then((res) => res.json())
        .then((res) => {
          this.HommeAll = res.Homme;
        })
        .catch((err) => console.log(err));
    },

    fetchFemme() {
      fetch(
        `${apiDomain}/api/statistiqueFemme?token=${this.$store.state.token}`
      )
        .then((res) => res.json())
        .then((res) => {
          this.FemmeAll = res.Femme;
        })
        .catch((err) => console.log(err));
    },
    /* client par mois et annee */
    loadClientsMois: function () {
      axios

        .get(
          `${apiDomain}/api/getallClientParAnnee/${this.selectedClient.year}?token=${this.$store.state.token}`
        )
        .then((response) => {
          this.totalClientsAnnee = response.data.total;
          this.ClientsMois = [
            {
              data: [
                response.data.Jan,
                response.data.Fév,
                response.data.Mar,

                response.data.Avr,
                response.data.Mai,

                response.data.Jui,
                response.data.Juil,
                /* 2eme */
                response.data.Aou,
                response.data.Sep,

                response.data.Oct,
                response.data.Nov,

                response.data.Déc,
              ],
            },
          ];
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    loadReservationsMois: function () {
      axios

        .get(
          `${apiDomain}/api/getallResParAnnee/${this.selectedRes.year}?token=${this.$store.state.token}`
        )
        .then((response) => {
          this.totalResAnnee = response.data.total;

          this.ReservationsMois = [
            {
              data: [
                response.data.Jan,
                response.data.Fév,
                response.data.Mar,

                response.data.Avr,
                response.data.Mai,

                response.data.Jui,
                response.data.Juil,
                /* 2eme */
                response.data.Aou,
                response.data.Sep,

                response.data.Oct,
                response.data.Nov,

                response.data.Déc,
              ],
            },
          ];
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    loadPacksVilles: function () {
      axios

        .get(
          `${apiDomain}/api/getallPACKParVille?token=${this.$store.state.token}`
        )
        .then((response) => {
          this.totalPacks = response.data.total;
          this.PacksVilles = [
            {
              data: [
                response.data.Ariana,
                response.data.Béja,
                response.data.BenArous,
                response.data.Bizerte,
                response.data.Gabès,
                response.data.Gafsa,
                response.data.Jendouba,
                response.data.Kébili,
                response.data.Kairouan,
                response.data.Kasserine,
                response.data.LaManouba,
                response.data.LeKef,
                response.data.Médenine,
                response.data.Mahdia,
                response.data.Monastir,
                response.data.Nabeul,
                response.data.Sfax,
                response.data.SidiBouzid,
                response.data.Siliana,
                response.data.Sousse,
                response.data.Tataouine,
                response.data.Tozeur,
                response.data.Tunis,
                response.data.Zaghouan,
              ],
            },
          ];
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    /* zones par ville */
    loadZonesVilles: function () {
      axios

        .get(
          `${apiDomain}/api/getallZoneParVille?token=${this.$store.state.token}`
        )
        .then((response) => {
          this.totalZones = response.data.total;
          this.ZonesVilles = [
            {
              data: [
                response.data.Ariana,
                response.data.Béja,
                response.data.BenArous,
                response.data.Bizerte,
                response.data.Gabès,
                response.data.Gafsa,
                response.data.Jendouba,
                response.data.Kébili,
                response.data.Kairouan,
                response.data.Kasserine,
                response.data.LaManouba,
                response.data.LeKef,
                response.data.Médenine,
                response.data.Mahdia,
                response.data.Monastir,
                response.data.Nabeul,
                response.data.Sfax,
                response.data.SidiBouzid,
                response.data.Siliana,
                response.data.Sousse,
                response.data.Tataouine,
                response.data.Tozeur,
                response.data.Tunis,
                response.data.Zaghouan,
              ],
            },
          ];
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    loadGuidesVilles: function () {
      axios
        .get(
          `${apiDomain}/api/getallGuideParVille?token=${this.$store.state.token}`
        )
        .then((response) => {
          this.totalGuides = response.data.total;
          this.Zones = [
            {
              data: [
                response.data.Ariana,
                response.data.Béja,
                response.data.BenArous,
                response.data.Bizerte,
                response.data.Gabès,
                response.data.Gafsa,
                response.data.Jendouba,
                response.data.Kébili,
                response.data.Kairouan,
                response.data.Kasserine,
                response.data.LaManouba,
                response.data.LeKef,
                response.data.Médenine,
                response.data.Mahdia,
                response.data.Monastir,
                response.data.Nabeul,
                response.data.Sfax,
                response.data.SidiBouzid,
                response.data.Siliana,
                response.data.Sousse,
                response.data.Tataouine,
                response.data.Tozeur,
                response.data.Tunis,
                response.data.Zaghouan,
              ],
            },
          ];

          this.GuidesVilles = [
            {
              data: [
                response.data.Ariana,
                response.data.Béja,
                response.data.BenArous,
                response.data.Bizerte,
                response.data.Gabès,
                response.data.Gafsa,
                response.data.Jendouba,
                response.data.Kébili,
                response.data.Kairouan,
                response.data.Kasserine,
                response.data.LaManouba,
                response.data.LeKef,
                response.data.Médenine,
                response.data.Mahdia,
                response.data.Monastir,
                response.data.Nabeul,
                response.data.Sfax,
                response.data.SidiBouzid,
                response.data.Siliana,
                response.data.Sousse,
                response.data.Tataouine,
                response.data.Tozeur,
                response.data.Tunis,
                response.data.Zaghouan,
              ],
            },
          ];
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    loadHebergeursVilles: function () {
      axios

        .get(
          `${apiDomain}/api/getallHebergeurParVille?token=${this.$store.state.token}`
        )
        .then((response) => {
          this.totalHebergeurs = response.data.total;
          this.HebergeursVilles = [
            {
              data: [
                response.data.Ariana,
                response.data.Béja,
                response.data.BenArous,
                response.data.Bizerte,
                response.data.Gabès,
                response.data.Gafsa,
                response.data.Jendouba,
                response.data.Kébili,
                response.data.Kairouan,
                response.data.Kasserine,
                response.data.LaManouba,
                response.data.LeKef,
                response.data.Médenine,
                response.data.Mahdia,
                response.data.Monastir,
                response.data.Nabeul,
                response.data.Sfax,
                response.data.SidiBouzid,
                response.data.Siliana,
                response.data.Sousse,
                response.data.Tataouine,
                response.data.Tozeur,
                response.data.Tunis,
                response.data.Zaghouan,
              ],
            },
          ];
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    loadPropagencesVilles: function () {
      axios

        .get(
          `${apiDomain}/api/getallPropagenceParVille?token=${this.$store.state.token}`
        )
        .then((response) => {
          this.totalPropagences = response.data.total;
          this.PropagencesVilles = [
            {
              data: [
                response.data.Ariana,
                response.data.Béja,
                response.data.BenArous,
                response.data.Bizerte,
                response.data.Gabès,
                response.data.Gafsa,
                response.data.Jendouba,
                response.data.Kébili,
                response.data.Kairouan,
                response.data.Kasserine,
                response.data.LaManouba,
                response.data.LeKef,
                response.data.Médenine,
                response.data.Mahdia,
                response.data.Monastir,
                response.data.Nabeul,
                response.data.Sfax,
                response.data.SidiBouzid,
                response.data.Siliana,
                response.data.Sousse,
                response.data.Tataouine,
                response.data.Tozeur,
                response.data.Tunis,
                response.data.Zaghouan,
              ],
            },
          ];
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    loadProprestausVilles: function () {
      axios

        .get(
          `${apiDomain}/api/getallProprestauParVille?token=${this.$store.state.token}`
        )
        .then((response) => {
          this.totalProprestaus = response.data.total;
          this.ProprestausVilles = [
            {
              data: [
                response.data.Ariana,
                response.data.Béja,
                response.data.BenArous,
                response.data.Bizerte,
                response.data.Gabès,
                response.data.Gafsa,
                response.data.Jendouba,
                response.data.Kébili,
                response.data.Kairouan,
                response.data.Kasserine,
                response.data.LaManouba,
                response.data.LeKef,
                response.data.Médenine,
                response.data.Mahdia,
                response.data.Monastir,
                response.data.Nabeul,
                response.data.Sfax,
                response.data.SidiBouzid,
                response.data.Siliana,
                response.data.Sousse,
                response.data.Tataouine,
                response.data.Tozeur,
                response.data.Tunis,
                response.data.Zaghouan,
              ],
            },
          ];
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    isActive(menuItem) {
      return this.activeItem === menuItem;
    },
    setActive(menuItem) {
      this.activeItem = menuItem;
    },
    fetchPackVille() {
      axios
        .get(`${apiDomain}/api/stat/pack?token=${this.$store.state.token}`)
        .then((response) => {
          this.series4 = [
            {
              name: "Packs",
              data: [
                response.data.kairouan,
                response.data.Tataouine,
                response.data.Kasserine,
                response.data.Zaghouan,
              ],
            },
          ];
        })
        .catch((err) => console.log(err));
    },
    initBigChart(index) {
      let chartData = {
        datasets: [
          {
            fill: true,
            // borderColor: config.colors.primary,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            // pointBackgroundColor: config.colors.primary,
            pointBorderColor: "rgba(255,255,255,0)",
            // pointHoverBackgroundColor: config.colors.primary,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.bigLineChart.allData[index],
          },
        ],
        labels: [
          "JAN",
          "FEB",
          "MAR",
          "APR",
          "MAY",
          "JUN",
          "JUL",
          "AUG",
          "SEP",
          "OCT",
          "NOV",
          "DEC",
        ],
      };
      // this.$refs.bigChart.updateGradients(chartData);
      this.bigLineChart.chartData = chartData;
      this.bigLineChart.activeIndex = index;
    },
  },
  mounted() {
    this.i18n = this.$i18n;
    if (this.enableRTL) {
      this.i18n.locale = "ar";
      this.$rtl.enableRTL();
    }
    this.initBigChart(0);
  },
  beforeDestroy() {
    if (this.$rtl.isRTL) {
      this.i18n.locale = "en";
      this.$rtl.disableRTL();
    }
  },
};
</script>
<style>
.page-item.active .page-link {
  z-index: 1;
  color: #ffffff;
  background-color: #cfcfcf;
  border-color: #cfcfcf;
}
</style>
