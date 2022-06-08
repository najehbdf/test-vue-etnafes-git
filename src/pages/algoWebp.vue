<template>
  <div class="content">
    <div class="row">
      <div class="col-md-12">
        <card>
          <template slot="header">
            <h5 class="title" style="padding-top: 15px">
              Ajouter image en webp
            </h5>
          </template>
          <form @submit.prevent="create">
            <card style="border: solid 1px #7a7979; padding: 15px">
              <div class="row">
                <div class="col-md-12 px-md-1 text-left">
                  <label class="custom-file-upload">
                    NB:obligatoirement de sélectionner votre fichier dans les
                    deux inputs !
                    <br />
                    <br />
                    <input
                      aria-label="label"
                      name="logo"
                      required
                      type="file"
                      @change="convertImage"
                      class="input-file nn"
                      accept="image/x-png, image/gif, image/jpeg"
                    /><!-- @change="previewImageRio" -->
                    <img loading="lazy"
                      class="hideWeb"
                      src="https://img.icons8.com/color/48/000000/add-image.png"
                    />

                    <span v-if="Uimage == ''"> ( 2 )</span>

                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;

                    <input
                      @change="processFileMoez"
                      type="file"
                      multiple
                      accept="image/*"
                      v-if="Uimage == ''"
                    />
                    <span v-if="Uimage == ''"> ( 1 )</span>
                  </label>
                </div>
              </div>
              <br />
              <br />
              <br />
              <div class="row">
                <div class="col-md-6">
                  <img loading="lazy" width="20%" :src="Uimage" id="Uimage" />
                </div>
                <div class="col-md-6">
                  <div class="layout">
                    <div>
                      <!--  <input
                        @change="processFileMoez"
                        type="file"
                        multiple
                        accept="image/*"
                      /> -->
                    </div>
                    <div width="5%" id="previews"></div>
                  </div>
                </div>
              </div>
            </card>
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
      img1: "logo-entreprise-etnafes.jpg",
      Uimage: "",
      Wimage: "",
      Wimage2: "",
      imgCanvas: "",
      userImage: "",
      previews: "",
    };
  },

  created() {
    this.loadCategories();
    this.fetchVilles();
    this.fetchZones();
    this.fetchSousVilles();

    this.fetchAllHebergements();
  },

  computed: {
    villeValue() {
      return this.zones.map((zone) => zone.ville_id);
    },
    ZonesArray() {
      return _.map(this.zones, function (num, key) {
        return num.name;
      });
    },
    getAllvilleidselected() {
      var result = [];
      const villepack = this.villepack;
      for (var i = 0; i < villepack.length; i++) {
        var t = villepack[i].ville_id;
        result.push(villepack[i].ville_id);
      }
      return result;
    },
  },

  methods: {
    webp: function () {
      const image = new Image();
      this.image = image;
      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        canvas.getContext("2d").drawImage(image, 0, 0);
        canvas.toBlob((blob) => {
          // Now we have a `blob` containing webp data

          // Use the file rename trick to turn it back into a file
          const myImage = new File([blob], "my-new-name.webp", {
            type: blob.type,
          });
        }, "image/webp");
        this.image_webp = myImage;
      };

      image.src = URL.createObjectURL(myFile);
    },
    /* ------------- */

    processFileMoez: function () {
      let refs = {};
      refs.imagePreviews = document.querySelector("#previews");
      refs.fileSelector = document.querySelector("input[type=file]");
      function addImageBox(container) {
        let imageBox = document.createElement("div");
        let progressBox = document.createElement("progress");
        imageBox.appendChild(progressBox);
        container.appendChild(imageBox);

        return imageBox;
      }
      function processFile(file) {
        if (!file) {
          return;
        }
        console.log(file);
        let imageBox = addImageBox(refs.imagePreviews);

        // Load the data into an image
        new Promise(function (resolve, reject) {
          let rawImage = new Image();

          rawImage.addEventListener("load", function () {
            resolve(rawImage);
          });

          rawImage.src = URL.createObjectURL(file);
        })
          .then(function (rawImage) {
            // Convert image to webp ObjectURL via a canvas blob
            return new Promise(function (resolve, reject) {
              let canvas = document.createElement("canvas");
              let ctx = canvas.getContext("2d");

              canvas.width = rawImage.width;
              canvas.height = rawImage.height;
              ctx.drawImage(rawImage, 0, 0);

              canvas.toBlob(function (blob) {
                resolve(URL.createObjectURL(blob));
              }, "image/webp");
            });
          })
          .then(function (imageURL) {
            // Load image for display on the page
            return new Promise(function (resolve, reject) {
              let scaledImg = new Image();

              scaledImg.addEventListener("load", function () {
                resolve({ imageURL, scaledImg });
              });

              scaledImg.setAttribute("src", imageURL);
            });
          })
          .then(function (data) {
            // Inject into the DOM
            let imageLink = document.createElement("a");
            imageLink.setAttribute("href", data.imageURL);
            // this.Wimage = imageLink.setAttribute("href", data.imageURL);
            imageLink.setAttribute("download", `${file.name}.webp`);
            imageLink.appendChild(data.scaledImg);

            imageBox.innerHTML = "";

            this.previews = imageBox.appendChild(imageLink);
          });
      }
      function processFiles(files) {
        for (let file of files) {
          processFile(file);
        }
      }

      function fileSelectorChanged() {
        processFiles(refs.fileSelector.files);
        refs.fileSelector.value = "";
      }

      refs.fileSelector.addEventListener("change", fileSelectorChanged);

      // Set up Drag and Drop
      function dragenter(e) {
        e.stopPropagation();
        e.preventDefault();
      }

      function dragover(e) {
        e.stopPropagation();
        e.preventDefault();
      }

      function drop(callback, e) {
        e.stopPropagation();
        e.preventDefault();
        callback(e.dataTransfer.files);
      }

      function setDragDrop(area, callback) {
        area.addEventListener("dragenter", dragenter, false);
        area.addEventListener("dragover", dragover, false);
        area.addEventListener(
          "drop",
          function (e) {
            drop(callback, e);
          },
          false
        );
      }
      setDragDrop(document.documentElement, processFiles);
    },

    /* ------ */
    convertImage: function (event, resolve) {
      const Uimage = document.querySelector("#Uimage");
      const Wimage = document.querySelector("#Wimage");
      /* function convertImage(event) { */
      var input = event.target;
      // Ensure that you have a file before attempting to read it
      /*   if (input.files && input.files[0]) { */
      if (event.target.files[0]) {
        //saow user to canvas
        let src = URL.createObjectURL(event.target.files[0]);
        Uimage.src = src;
        this.Uimage = Uimage.src = src;
        //convert user to canvas
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        let userImage = new Image();
        userImage.src = src;
        this.userImage = userImage.src = src;
        this.imgCanvas = userImage.src = src;
        userImage.onload = function () {
          canvas.width = userImage.width;
          canvas.height = userImage.height;
          ctx.drawImage(userImage, 0, 0);
          //document.body.appendChlid(canvas);
          // convert canvas to webp
          /*   let webpImage = canvas.toDataURL("image/webp", 1);
          Wimage.src = webpImage;
          this.Wimage = Wimage.src; */
          let webpImage = canvas.toBlob(function (blob) {
            resolve(URL.createObjectURL(blob));
          }, "image/webp");
          Wimage.src = webpImage;
          this.Wimage = Wimage.src;
        };
      }
      /* } */
    },
    previewImageRio: function (event) {
      // Reference to the DOM input element
      var input = event.target;
      // Ensure that you have a file before attempting to read it
      if (input.files && input.files[0]) {
        // create a new FileReader to read this image and convert to base64 format
        var reader = new FileReader();
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = (e) => {
          // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
          // Read image as base64 and set to imageData
          this.img1 = e.target.result;
        };
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsDataURL(input.files[0]);
      }
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

