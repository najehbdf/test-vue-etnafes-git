<template>
  <div class="content">
    <div class="row">
      <div class="col-md-12">
        <card>
          <template slot="header">
            <h5 class="title" style="padding-top: 15px">
              Ajouter une actualité
            </h5>
          </template>
          <form @submit.prevent="createActu">
            <card style="border: solid 1px #7a7979; padding: 15px">
              <div class="row">
                <div class="col-md-6 pr-md-1 text-left">
                  <base-input
                    label="Titre"
                    placeholder="Titre"
                    v-model="actu[0].titre"
                  ></base-input>
                </div>
                <div class="col-md-6 pr-md-1 text-left">
                  <base-input
                    label="ID "
                    placeholder="ID de pack ou hébérgement"
                    v-model="actu[0].id_act"
                  ></base-input>
                </div>
              </div>
              <div class="row">
                <div>
                  <b-form-group
                    label="Ajout de lien"
                    v-slot="{ ariaDescribedby }"
                  >
                    <b-form-radio
                      v-model="actu[0].lien"
                      :aria-describedby="ariaDescribedby"
                      name="some-radios"
                      value="pack"
                      >https://etnafes.com/pack</b-form-radio
                    >
                    <b-form-radio
                      v-model="actu[0].lien"
                      :aria-describedby="ariaDescribedby"
                      name="some-radios"
                      value="reservationhebergement"
                      >https://etnafes.com/reservationhebergement</b-form-radio
                    >
                  </b-form-group>

                  <div class="mt-3">
                    Lien :
                    <strong>{{ actu[0].lien }}/{{ actu[0].id_act }}</strong>
                  </div>
                </div>
              </div>
              <hr />
              <div class="row">
                <div class="col-md-6 text-left">
                  <base-input>
                    <label>Description</label>
                    <span
                      style="float: right; color: red"
                      v-if="actu[0].description.length < 50"
                      >{{ actu[0].description.length }}/50</span
                    >
                    <span style="float: right; color: green" v-if="length > 50"
                      >{{ actu[0].description.length }}/238</span
                    >
                    <b-form-textarea
                      id="textarea-state"
                      :state="actu[0].description.length >= 50"
                      rows="6"
                      maxlength="238"
                      cols="80"
                      class="form-control"
                      placeholder="Entrez ici la description du pack"
                      name="description"
                      v-model="actu[0].description"
                    ></b-form-textarea>
                  </base-input>
                </div>
                <div class="col-md-6">
                  <img loading="lazy"
                    alt="zone"
                    :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_actualite/${actu[0].image}`"
                    class="img"
                    width="40%"
                  />
                </div>
              </div>

              <div class="row">
                <div class="col-md-12 pr-md-1 text-left">
                  <label>Image </label>
                  <br />
                  <input
                    aria-label="label"
                    name="image"
                    type="file"
                    @change="ActuialitePhoto"
                    class="input-file"
                    accept="image/x-png, image/gif, image/jpeg"
                  />
                </div>
              </div>
              <div class="row">
                <button
                  class="btn btn-success"
                  type="submit"
                  fill
                  style="
                    margin-left: 10px;
                    border-radius: 18px 0px 18px 0px;
                    margin-top: 20px;
                  "
                >
                  Ajouter
                </button>
              </div>
            </card>
            <br />
          </form>
        </card>
      </div>
    </div>
  </div>
</template>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<script>
import StepProgress from "vue-step-progress";
import { VueDatePicker } from "@mathieustan/vue-datepicker";
// import the css (OPTIONAL - you can provide your own design)
import "vue-step-progress/dist/main.css";
import Vue from "vue";
import { Card, BaseInput } from "@/components/index";
import BaseButton from "@/components/BaseButton";
import { apiDomain } from "../config";

export default {
  components: {
    VueDatePicker,
    Card,
    BaseInput,
    BaseButton,

    "step-progress": StepProgress,
  },
  data() {
    return {
      titre: "",

      description: "",
      lien: "",

      id_act: "",
      image: "",

      actu: {},
    };
  },

  created() {
    this.fetchActu();
  },

  computed: {},

  methods: {
    fetchActu() {
      fetch(`${apiDomain}/api/get_actualite/1`)
        .then((res) => res.json())
        .then((res) => {
          this.actu = res;
        })
        .catch((err) => console.log(err));
    },

    ActuialitePhoto: function (event) {
      var input = event.target;
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        var vm = this;
        reader.onload = function (e) {
          vm.pack.image = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
      console.log(input.files[0]);
    },

    createActu(e) {
      var formData = new FormData(e.target);
      formData.append("titre", this.actu[0].titre);
      formData.append("lien", this.actu[0].lien);
      formData.append("id_act", this.actu[0].id_act);
      formData.append("description", this.actu[0].description);

      axios
        .post(`${apiDomain}/api/Updatet_actualite/1`, formData)
        .then(function (response) {
          if (response.status == 200) {
            if (confirm("actualité  modifiée")) {
              this.fetchActu();
            }
          }
        })
        .catch((error) => {
          if (error.response && error.response.status == 400) {
            this.validationErrors = error.response.data;
          }
        });
    },
  },
};
</script>

<style>
.feed {
  background: #fff;
  height: 106px;
  overflow: scroll;
}
.btdelete {
  padding: 11px 27px !important;
  margin-top: 38px;
  border-radius: 5px;
}
</style>

