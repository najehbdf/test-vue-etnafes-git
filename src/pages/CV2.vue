<template>
  <div class="content">
    <div class="wrapper">
      <div class="container">
        <div class="wraper">
          <div class="row">
            <div class="col-sm-12">
              <div class="bg-picture text-center">
                <div class="bg-picture-overlay"></div>
                <div class="profile-info-name">
                  <img loading="lazy"
                    :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_client/${client.photo}`"
                    class="photo style_img_cvGuide"
                    alt="profile-image"
                  />
                  <h3 class="text-white">{{ guide.nom }} {{ guide.prenom }}</h3>
                </div>
              </div>
            </div>
          </div>
          <div class="row user-tabs">
          
            <div class="col-lg-8">
             <div class="d-none d-lg-block">
              <ul class="nav" style="width: 100%">
                <li class="active tab" style="width: 24%">
                  <a
                    href="#home-2"
                    data-toggle="tab"
                    aria-expanded="false"
                    class="active"
                  >
                    <span class="visible-xs">
                      <i class="fa fa-home"></i>&nbsp;
                    </span>
                    <span class="hidden-xs styleTabCVAP">A_Propos</span>
                  </a>
                </li>
                <li class="tab" style="width: 21%">
                  <a href="#profile-2" data-toggle="tab" aria-expanded="false">
                    <span class="visible-xs"> <i class="fa fa-user"></i> </span
                    >&nbsp;
                    <span class="hidden-xs styleTabCVP">Profil</span>
                  </a>
                </li>
                <li class="tab" style="width: 28%">
                  <a href="#messages-2" data-toggle="tab" aria-expanded="true">
                    <!-- <span class="visible-xs">
                      <i class="fa fa-envelope-o"></i>
                    </span>-->
                    <span class="visible-xs"> <i class="fa fa-cog"></i> </span
                    >&nbsp;
                    <span class="hidden-xs styleTabCVF">Formations</span>
                  </a>
                </li>
                <li class="tab" style="width: 27%">
                  <a href="#settings-2" data-toggle="tab" aria-expanded="false">
                    <span class="visible-xs"> <i class="fa fa-cog"></i> </span
                    >&nbsp;
                    <span class="hidden-xs styleTabCVE">Expériences</span>
                  </a>
                </li>
                <div class="indicator" style="right: 476px; left: 0px"></div>
                <div class="indicator" style="right: 476px; left: 0px"></div>
              </ul>
              </div>

<!-- MOBILE -->
 <div class="d-lg-none">
              <ul class="nav nav-tabs tabs" style="width: 100%">
                <li class="active tab" style="width: 24%">
                  <a
                    href="#home-2"
                    data-toggle="tab"
                    aria-expanded="false"
                    class="active"
                  >
                    <span class="visible-xs">
                      <i class="fa fa-home"></i>&nbsp;
                    </span>
                    <span class="hidden-xs styleTabCVAP">A_Propos</span>
                  </a>
                </li>
                <li class="tab" style="width: 21%">
                  <a href="#profile-2" data-toggle="tab" aria-expanded="false">
                    <span class="visible-xs"> <i class="fa fa-user"></i> </span
                    >&nbsp;
                    <span class="hidden-xs styleTabCVP">Profil</span>
                  </a>
                </li>
                <li class="tab" style="width: 28%">
                  <a href="#messages-2" data-toggle="tab" aria-expanded="true">
                    <!-- <span class="visible-xs">
                      <i class="fa fa-envelope-o"></i>
                    </span>-->
                    <span class="visible-xs"> <i class="fa fa-cog"></i> </span
                    >&nbsp;
                    <span class="hidden-xs styleTabCVF">Formations</span>
                  </a>
                </li>
                <li class="tab" style="width: 27%">
                  <a href="#settings-2" data-toggle="tab" aria-expanded="false">
                    <span class="visible-xs"> <i class="fa fa-cog"></i> </span
                    >&nbsp;
                    <span class="hidden-xs styleTabCVE">Expériences</span>
                  </a>
                </li>
                <div class="indicator" style="right: 476px; left: 0px"></div>
                <div class="indicator" style="right: 476px; left: 0px"></div>
              </ul>
              </div>

            </div>
           
          </div>
          <div class="row">
            <div class="col-lg-12">
              <div class="tab-content profile-tab-content">
                <div class="tab-pane active" id="home-2">
                  <div class="row">
                    <div class="col-md-4">
                      <!-- Personal-Information -->
                      <div
                        class="panel panel-default panel-fill"
                        style="background-color: #fff"
                      >
                        <div class="panel-heading">
                          <h3 class="panel-title" style="color: #000">
                            Information Personnel
                          </h3>
                        </div>
                        <div class="panel-body">
                          <div class="about-info-p">
                            <strong>Nom et Prénom</strong>
                            <br />
                            <p class="text-muted">
                              {{ client.nom }} {{ client.nom }}
                            </p>
                          </div>
                          <div class="about-info-p">
                            <strong>Teléphone</strong>
                            <br />
                            <p class="text-muted">{{ client.telephone }}</p>
                          </div>
                          <div class="about-info-p">
                            <strong>Email</strong>
                            <br />
                            <p class="text-muted">{{ client.email }}</p>
                          </div>
                          <div class="about-info-p m-b-0">
                            <strong>Adresse</strong>
                            <br />
                            <p class="text-muted">{{ ville.nom }}</p>
                          </div>
                        </div>
                      </div>
                      <!-- Personal-Information -->

                      <!-- Languages -->
                      <div
                        class="panel panel-default panel-fill"
                        style="background-color: #fff"
                      >
                        <div class="panel-heading">
                          <h3 class="panel-title" style="color: #000">
                            Languages &nbsp;
                            <i
                              v-b-modal.modal-langues
                              class="tim-icons icon-pencil"
                              style="color: #62b062"
                              title="Modifier les langues"
                            ></i>
                          </h3>
                        </div>
                        <div class="panel-body">
                          <ul>
                            <li v-if="guide.langue_maternelle">
                              Langue maternelle : {{ guide.langue_maternelle }}
                            </li>
                            <li v-if="guide.langue_de_visite">
                              Langue de visite : {{ guide.langue_de_visite }}
                            </li>
                          </ul>
                        </div>
                      </div>
                      <!-- Languages -->
                    </div>

                    <div class="col-md-8">
                      <!-- Personal-Information -->
                      <div
                        class="panel panel-default panel-fill"
                        style="background-color: #fff"
                      >
                        <div class="panel-heading">
                          <h3 class="panel-title" style="color: #000">
                            Présentation&nbsp;
                            <i
                              v-b-modal.modal-presentation
                              class="tim-icons icon-pencil"
                              style="color: #62b062"
                              title="Modifier la présentation"
                            ></i
                            >&nbsp;
                          </h3>
                        </div>
                        <div class="panel-body" style="color: #000">
                          <p>{{ guide.présentation }}</p>
                        </div>
                      </div>
                      <!-- Personal-Information -->

                      <div
                        class="panel panel-default panel-fill"
                        style="background-color: #fff"
                      >
                        <div class="panel-heading">
                          <h3 class="panel-title" style="color: #000">
                            Formations et diplomes
                          </h3>
                        </div>
                        <div class="panel-body">
                          <div v-for="formation in forma" :key="formation.id">
                            <div class="row" style="padding-bottom: 15px">
                              <div class="col-md-2">
                                <h5 style="color: #666; font-size: 14px">
                                  <span class="pull-left">
                                    {{ formation.date_deb.slice(0, 4) }}-{{
                                      formation.date_fin.slice(0, 4)
                                    }}
                                  </span>
                                </h5>
                              </div>
                              <div class="col-md-10">
                                <strong>
                                  {{ formation.diplome }}&nbsp;
                                  <i
                                    @click="fetchFormation(formation.id)"
                                    v-b-modal.modal-formation
                                    class="tim-icons icon-pencil"
                                    style="color: #62b062"
                                    title="Modifier la formation"
                                  ></i
                                  >&nbsp;
                                  <i
                                    style="color: #fd5d93"
                                    title="Delete pack"
                                    class="tim-icons icon-simple-remove"
                                    @click="deleteFormation(formation.id)"
                                  ></i>
                                </strong>
                                <br />
                                {{ formation.etablissement }}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        class="panel panel-default panel-fill"
                        style="background-color: #fff"
                      >
                        <div class="panel-heading">
                          <h3 class="panel-title" style="color: #000">
                            Expériences Professionnels
                          </h3>
                        </div>
                        <div class="panel-body">
                          <div v-for="experience in exp" :key="experience.id">
                            <div class="row" style="padding-bottom: 15px">
                              <div class="col-md-2">
                                <h5 style="color: #666; font-size: 14px">
                                  <span class="pull-left">
                                    {{ experience.date_deb.slice(0, 4) }}-{{
                                      experience.date_fin.slice(0, 4)
                                    }}
                                  </span>
                                </h5>
                              </div>
                              <div class="col-md-10">
                                <strong>
                                  {{ experience.poste }}&nbsp;
                                  <i
                                    @click="fetchExperience(experience.id)"
                                    v-b-modal.modal-experience
                                    class="tim-icons icon-pencil"
                                    style="color: #62b062"
                                    title="Modifier l'experience"
                                  ></i>
                                  &nbsp;
                                  <i
                                    style="color: #fd5d93"
                                    title="Delete pack"
                                    class="tim-icons icon-simple-remove"
                                    @click="deleteExperience(experience.id)"
                                  ></i>
                                </strong>
                                <br />
                                {{ experience.entreprise }}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <b-modal
                        id="modal-langues"
                        :title="client.nom"
                        :guide="guide"
                      >
                        <card style="margin-top: 30px" class="container">
                          <form
                            @submit.prevent="updateLangues(guide.id, guide)"
                          >
                            <div class="row">
                              <div class="form-group col-md-12">
                                <input
                                  aria-label="label"
                                  type="text"
                                  required
                                  class="form-control"
                                  v-model="guide.langue_maternelle"
                                  placeholder="Langue maternelle"
                                />
                              </div>

                              <div class="form-group col-md-12">
                                <input
                                  aria-label="label"
                                  type="text"
                                  required
                                  class="form-control"
                                  v-model="guide.langue_de_visite"
                                  placeholder="Langue de visite"
                                />
                              </div>
                            </div>
                            <button
                              style="margin-top: 20px"
                              class="btn btn-success"
                              type="submit"
                              fill
                            >
                              Modifier
                            </button>
                          </form>
                        </card>
                      </b-modal>

                      <b-modal
                        id="modal-presentation"
                        :title="client.nom"
                        :guide="guide"
                      >
                        <!--   <card style="margin-top: 30px" class="container"> -->
                        <form
                          @submit.prevent="updatePresentation(guide.id, guide)"
                        >
                          <div class="row">
                            <div class="form-group col-md-12">
                              <textarea
                                required
                                class="form-control"
                                v-model="guide.présentation"
                                type="text"
                                placeholder="Présentez vous en quelques lignes"
                              ></textarea>
                            </div>
                          </div>
                          <button
                            style="margin-top: 20px"
                            class="btn btn-success"
                            type="submit"
                            fill
                          >
                            Modifier
                          </button>
                        </form>
                        <!--  </card> -->
                      </b-modal>

                      <b-modal
                        id="modal-experience"
                        :title="experience.poste"
                        :experience="experience"
                      >
                        <card class="container">
                          <form
                            @submit.prevent="
                              updateExperience(experience.id, experience)
                            "
                          >
                            <div class="row">
                              <div class="form-group col-md-12">
                                <input
                                  aria-label="label"
                                  v-model="experience.entreprise"
                                  type="text"
                                  class="form-control"
                                  placeholder="Entreprise"
                                />
                              </div>
                              <div class="form-group col-md-12">
                                <input
                                  aria-label="label"
                                  v-model="experience.poste"
                                  type="text"
                                  class="form-control"
                                  placeholder="Poste"
                                />
                              </div>
                            </div>
                            <div class="row">
                              <div class="form-group col-md-12">
                                <textarea
                                  class="form-control"
                                  v-model="experience.description"
                                  type="text"
                                  placeholder="Description de votre activité pendant cette expérience"
                                ></textarea>
                              </div>

                              <div class="row">
                                <div class="col-md-6">
                                  <div class="form-group">
                                    <span
                                      style="
                                        line-height: 45px;
                                        font-size: 12px;
                                        letter-spacing: 0.7px;
                                      "
                                    >
                                      <b>De</b>
                                    </span>
                                    <!-- <VueDatePicker
                                      v-model="experience.date_deb"
                                      placeholder="Ajoutez une date"
                                    />-->
                                    <input
                                      aria-label="label"
                                      v-model="experience.date_deb"
                                      placeholder="Ajoutez une date"
                                      type="date"
                                      class="form-control"
                                    />
                                  </div>
                                </div>

                                <div class="col-md-6">
                                  <div class="form-group">
                                    <span
                                      style="
                                        line-height: 45px;
                                        font-size: 12px;
                                        letter-spacing: 0.7px;
                                      "
                                    >
                                      <b>à</b>
                                    </span>
                                    <!-- <VueDatePicker
                                      style="z-index: 1000"
                                      :minDate="new Date(experience.date_deb)"
                                      v-model="experience.date_fin"
                                      placeholder="Ajoutez une date"
                                    />-->

                                    <input
                                      aria-label="label"
                                      v-model="experience.date_fin"
                                      placeholder="Ajoutez une date"
                                      type="date"
                                      class="form-control"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <button
                              style="margin-top: 20px"
                              class="btn btn-success"
                              type="submit"
                              fill
                            >
                              Modifier
                            </button>
                          </form>
                        </card>
                      </b-modal>

                      <b-modal
                        id="modal-formation"
                        :title="formation.diplome"
                        :formation="formation"
                      >
                        <card class="container">
                          <form
                            @submit.prevent="
                              updateFormation(formation.id, formation)
                            "
                          >
                            <div class="row">
                              <div class="form-group col-md-12">
                                <input
                                  aria-label="label"
                                  v-model="formation.etablissement"
                                  type="text"
                                  class="form-control"
                                  placeholder="Etablissement"
                                />
                              </div>
                              <div class="form-group col-md-12">
                                <input
                                  aria-label="label"
                                  v-model="formation.diplome"
                                  type="text"
                                  class="form-control"
                                  placeholder="Diplome"
                                />
                              </div>
                            </div>
                            <div class="row">
                              <div class="form-group col-md-12">
                                <textarea
                                  class="form-control"
                                  v-model="formation.description"
                                  type="text"
                                  placeholder="Description de votre activité pendant cette expérience"
                                ></textarea>
                              </div>

                              <div class="row">
                                <div class="col-md-6">
                                  <div class="form-group">
                                    <span
                                      style="
                                        line-height: 45px;
                                        font-size: 12px;
                                        letter-spacing: 0.7px;
                                      "
                                    >
                                      <b>De</b>
                                    </span>
                                    <!--  <VueDatePicker
                                      v-model="formation.date_deb"
                                      placeholder="Ajoutez une date"
                                    />-->

                                    <input
                                      aria-label="label"
                                      v-model="formation.date_deb"
                                      placeholder="Ajoutez une date"
                                      type="date"
                                      class="form-control"
                                    />
                                  </div>
                                </div>

                                <div class="col-md-6">
                                  <div class="form-group">
                                    <span
                                      style="
                                        line-height: 45px;
                                        font-size: 12px;
                                        letter-spacing: 0.7px;
                                      "
                                    >
                                      <b>à</b>
                                    </span>
                                    <!--  <VueDatePicker
                                      :minDate="new Date(formation.date_deb)"
                                      v-model="formation.date_fin"
                                      placeholder="Ajoutez une date"
                                    />-->

                                    <input
                                      aria-label="label"
                                      v-model="formation.date_fin"
                                      placeholder="Ajoutez une date"
                                      type="date"
                                      class="form-control"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <button
                              style="margin-top: 20px"
                              class="btn btn-success"
                              type="submit"
                              fill
                            >
                              Modifier
                            </button>
                          </form>
                        </card>
                      </b-modal>
                      <!-- <div class="panel panel-default panel-fill" style="background-color:#fff">
                        <div class="panel-heading">
                          <h3 class="panel-title" style="color:#000">Compétences</h3>
                        </div>
                        <div class="panel-body">
                          <div class="m-b-15 mt-3">
                            <h5 style="color:#666  ;  font-size: 14px;">
                              Angular Js
                              <span class="pull-right">60%</span>
                            </h5>
                            <div class="progress">
                              <div
                                class="progress-bar progress-bar-primary wow animated progress-animated"
                                role="progressbar"
                                aria-valuenow="60"
                                aria-valuemin="0"
                                aria-valuemax="100"
                                style="width: 60%; visibility: hidden; animation-name: none;"
                              >
                                <span class="sr-only">60% Complete</span>
                              </div>
                            </div>
                          </div>

                          <div class="m-b-15 mt-3">
                            <h5 style="color:#666;    font-size: 14px;">
                              Javascript
                              <span class="pull-right">90%</span>
                            </h5>
                            <div class="progress">
                              <div
                                class="progress-bar progress-bar-pink wow animated progress-animated"
                                role="progressbar"
                                aria-valuenow="90"
                                aria-valuemin="0"
                                aria-valuemax="100"
                                style="width: 90%; visibility: hidden; animation-name: none;"
                              >
                                <span class="sr-only">90% Complete</span>
                              </div>
                            </div>
                          </div>

                          <div class="m-b-15 mt-3">
                            <h5 style="color:#666;    font-size: 14px;">
                              Wordpress
                              <span class="pull-right">80%</span>
                            </h5>
                            <div class="progress">
                              <div
                                class="progress-bar progress-bar-purple wow animated progress-animated"
                                role="progressbar"
                                aria-valuenow="80"
                                aria-valuemin="0"
                                aria-valuemax="100"
                                style="width: 80%; visibility: hidden; animation-name: none;"
                              >
                                <span class="sr-only">80% Complete</span>
                              </div>
                            </div>
                          </div>

                          <div class="m-b-0 mt-3">
                            <h5 style="color:#666;    font-size: 14px;">
                              HTML5 &amp; CSS3
                              <span class="pull-right">95%</span>
                            </h5>
                            <div class="progress">
                              <div
                                class="progress-bar progress-bar-info wow animated progress-animated"
                                role="progressbar"
                                aria-valuenow="95"
                                aria-valuemin="0"
                                aria-valuemax="100"
                                style="width: 95%; visibility: hidden; animation-name: none;"
                              >
                                <span class="sr-only">95% Complete</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>-->
                    </div>
                  </div>
                </div>
                <b-modal id="modal-edit-image" :user="'user'">
                  <form
                    v-on:submit.prevent="updateImage(user.id, user)"
                    class="mb-3"
                  >
                    <div class="row" style="padding: 10px">
                      <div>
                        <center>
                          <img loading="lazy"
                            alt="photo"
                            class="rounded-circle"
                            v-bind:src="imagePreview"
                            v-show="showPreview"
                            style="width: 200%"
                          />
                          <img loading="lazy"
                            alt="photo"
                            v-if="!showPreview"
                            class="rounded-circle"
                            :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_guide/${guide.carte_professionnel}`"
                            width="70%"
                          />
                        </center>
                        <br />

                        <input
                          aria-label="label"
                          type="file"
                          ref="carte_professionnel"
                          v-on:change="onChangeFileUpload()"
                          id="carte_professionnel"
                          class="upload-button"
                        />
                      </div>
                    </div>
                    <div>
                      <center>
                        <button type="submit" class="btn btn-info">
                          Modifier
                        </button>
                      </center>
                    </div>
                  </form>
                </b-modal>
                <div class="tab-pane" id="profile-2">
                  <!-- Personal-Information -->
                  <div
                    class="panel panel-default panel-fill"
                    style="background-color: #fff"
                  >
                    <div class="panel-body">
                      <div class="timeline-2">
                        <card>
                          <form
                            v-on:submit.prevent="
                              updateGuideWithoutPhoto(guide.id, guide)
                            "
                            v-if="guide.carte_professionnel != null"
                          >
                            <div class="row">
                              <!--Profile Card 3-->
                              <div class="col-md-12">
                                <div>
                                  <label>Votre Carte professionnel*</label>
                                  <div class="profile-thumb-block">
                                    <img loading="lazy"
                                      width="20%"
                                      v-b-modal.modal-edit-image
                                      :src="`https://etnafesapi20212018.etnafes.com/myapp/public/uploads/files_guide/${guide.carte_professionnel}`"
                                      alt="profile-image"
                                      class="profile"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <button
                              type="submit"
                              class="btn btn-info"
                              fill
                              style="border-radius: 18px 0px 18px 0px"
                            >
                              Enregistrer
                            </button>
                          </form>
                        </card>
                      </div>
                    </div>
                  </div>
                  <!-- Personal-Information -->
                </div>

                <div class="tab-pane" id="messages-2">
                  <form @submit.prevent="createFormation">
                    <!-- Personal-Information -->
                    <div
                      class="panel panel-default panel-fill"
                      style="background-color: #fff"
                    >
                      <div class="panel-heading">
                        <h3 class="panel-title" style="color: #000">
                          Edit Profile
                        </h3>
                      </div>
                      <div class="col-md-3">
                        <p
                          style="margin-top: 20px"
                          v-on:click="addNewFormation"
                          onmouseover="this.style.cursor='pointer'"
                        >
                          <i class="fas fa-plus-circle"></i> Ajouter une
                          formation
                        </p>
                      </div>
                      <div
                        class="panel-body"
                        style="padding: 0px 20px 0px 20px"
                      >
                        <card>
                          <div class="row">
                            <div
                              class="col-md-6"
                              v-for="(formation, index) in formations"
                              :key="index"
                            >
                              <div
                                class="row"
                                style="border-bottom: solid 1px #7a7979"
                              >
                                <a
                                  class="
                                    button-edit
                                    remove-list-item
                                    col-md-1
                                    offset-md-11
                                  "
                                  v-on:click="removeFormation(index)"
                                >
                                  <i
                                    class="fas fa-times"
                                    style="color: #fff"
                                  ></i>
                                </a>
                              </div>
                              <div
                                class="row"
                                style="
                                  padding: 15px;
                                  border-right: solid 1px #7a7979;
                                  border-left: solid 1px #7a7979;
                                  border-bottom: solid 1px #7a7979;
                                "
                              >
                                <div class="row">
                                  <div class="form-group col-md-12">
                                    <input
                                      aria-label="label"
                                      v-model="formation.etablissement"
                                      type="text"
                                      class="form-control"
                                      placeholder="Etablissement"
                                      :name="`formations[${index}][etablissement]`"
                                    />
                                  </div>
                                  <div class="form-group col-md-12">
                                    <input
                                      aria-label="label"
                                      v-model="formation.diplome"
                                      type="text"
                                      class="form-control"
                                      placeholder="Diplome"
                                      :name="`formations[${index}][diplome]`"
                                    />
                                  </div>
                                </div>

                                <div class="row">
                                  <div class="form-group col-md-12">
                                    <textarea
                                      class="form-control"
                                      v-model="formation.description"
                                      type="text"
                                      :name="`formations[${index}][description]`"
                                      placeholder="Description de votre activité pendant cette expérience"
                                    ></textarea>
                                  </div>
                                </div>

                                <div class="row">
                                  <div class="col-md-6">
                                    <div class="form-group">
                                      <span
                                        style="
                                          line-height: 45px;
                                          font-size: 12px;
                                          letter-spacing: 0.7px;
                                        "
                                      >
                                        <b>De</b>
                                      </span>
                                      <VueDatePicker
                                        v-model="formation.date_deb"
                                        placeholder="Ajoutez une date"
                                      />
                                    </div>
                                  </div>

                                  <div class="col-md-6">
                                    <div class="form-group">
                                      <span
                                        style="
                                          line-height: 45px;
                                          font-size: 12px;
                                          letter-spacing: 0.7px;
                                        "
                                      >
                                        <b>à</b>
                                      </span>
                                      <VueDatePicker
                                        :minDate="new Date(formation.date_deb)"
                                        v-model="formation.date_fin"
                                        placeholder="Ajoutez une date"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <button
                            style="margin-top: 20px"
                            class="btn btn-success"
                            type="submit"
                            fill
                          >
                            Enregistrer
                          </button>
                        </card>
                        <!-- <form role="form">
                        <div class="form-group">
                          <label for="FullName">Full Name</label>
                          <input type="text" value="John Doe" id="FullName" class="form-control" />
                        </div>
                        <div class="form-group">
                          <label for="Email">Email</label>
                          <input
                            type="email"
                            value="first.last@example.com"
                            id="Email"
                            class="form-control"
                          />
                        </div>
                        <div class="form-group">
                          <label for="Username">Username</label>
                          <input type="text" value="john" id="Username" class="form-control" />
                        </div>
                        <div class="form-group">
                          <label for="Password">Password</label>
                          <input
                            type="password"
                            placeholder="6 - 15 Characters"
                            id="Password"
                            class="form-control"
                          />
                        </div>
                        <div class="form-group">
                          <label for="RePassword">Re-Password</label>
                          <input
                            type="password"
                            placeholder="6 - 15 Characters"
                            id="RePassword"
                            class="form-control"
                          />
                        </div>
                        <div class="form-group">
                          <label for="AboutMe">About Me</label>
                          <textarea style="height: 125px" id="AboutMe" class="form-control">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</textarea>
                        </div>
                        <button
                          class="btn btn-primary waves-effect waves-light w-md"
                          type="submit"
                        >Save</button>
                        </form>-->
                      </div>
                    </div>
                  </form>
                  <!-- Personal-Information -->
                  <!-- <div class="panel panel-default panel-fill" style="background-color:#fff">
                    <div class="panel-heading">
                      <h3 class="panel-title" style="color:#000">My Projects</h3>
                    </div>
                    <div class="panel-body">
                      <div class="table-responsive">
                        <table class="table">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Project Name</th>
                              <th>Start Date</th>
                              <th>Due Date</th>
                              <th>Status</th>
                              <th>Assign</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>Moltran Admin</td>
                              <td>01/01/2015</td>
                              <td>07/05/2015</td>
                              <td>
                                <span class="label label-info">Work in Progress</span>
                              </td>
                              <td>Coderthemes</td>
                            </tr>
                            <tr>
                              <td>2</td>
                              <td>Moltran Frontend</td>
                              <td>01/01/2015</td>
                              <td>07/05/2015</td>
                              <td>
                                <span class="label label-success">Pending</span>
                              </td>
                              <td>Coderthemes</td>
                            </tr>
                            <tr>
                              <td>3</td>
                              <td>Moltran Admin</td>
                              <td>01/01/2015</td>
                              <td>07/05/2015</td>
                              <td>
                                <span class="label label-pink">Done</span>
                              </td>
                              <td>Coderthemes</td>
                            </tr>
                            <tr>
                              <td>4</td>
                              <td>Moltran Frontend</td>
                              <td>01/01/2015</td>
                              <td>07/05/2015</td>
                              <td>
                                <span class="label label-purple">Work in Progress</span>
                              </td>
                              <td>Coderthemes</td>
                            </tr>
                            <tr>
                              <td>5</td>
                              <td>Moltran Admin</td>
                              <td>01/01/2015</td>
                              <td>07/05/2015</td>
                              <td>
                                <span class="label label-warning">Coming soon</span>
                              </td>
                              <td>Coderthemes</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>-->
                  <!-- Personal-Information -->
                </div>

                <div class="tab-pane" id="settings-2">
                  <form @submit.prevent="createExperience">
                    <!-- Personal-Information -->
                    <div
                      class="panel panel-default panel-fill"
                      style="background-color: #fff"
                    >
                      <div class="panel-heading">
                        <h3 class="panel-title" style="color: #000">
                          Edit Profile
                        </h3>
                      </div>
                      <div class="col-md-3">
                        <p
                          style="margin-top: 20px"
                          v-on:click="addNewEmploi"
                          onmouseover="this.style.cursor='pointer'"
                        >
                          <i class="fas fa-plus-circle"></i> Ajouter un emploi
                        </p>
                        <!-- <button
                        type="button"
                        v-on:click="addNewEmploi"
                        class="btn btn-block btn-outline-success orange"
                        >+ Emploi</button>-->
                      </div>
                      <div
                        class="panel-body"
                        style="padding: 0px 20px 0px 20px"
                      >
                        <card>
                          <div class="row">
                            <div
                              class="col-md-6"
                              v-for="(experience, index) in experiences"
                              :key="index"
                            >
                              <div
                                class="row"
                                style="border-bottom: solid 1px #7a7979"
                              >
                                <a
                                  class="
                                    button-edit
                                    remove-list-item
                                    col-md-1
                                    offset-md-11
                                  "
                                  v-on:click="removeEmploi(index)"
                                >
                                  <i
                                    class="fas fa-times"
                                    style="color: #fff"
                                  ></i>
                                </a>
                              </div>
                              <div
                                class="row"
                                style="
                                  padding: 15px;
                                  border-right: solid 1px #7a7979;
                                  border-left: solid 1px #7a7979;
                                  border-bottom: solid 1px #7a7979;
                                "
                              >
                                <div class="row">
                                  <div class="form-group col-md-12">
                                    <input
                                      aria-label="label"
                                      v-model="experience.entreprise"
                                      type="text"
                                      class="form-control"
                                      placeholder="Entreprise"
                                      :name="`experiences[${index}][entreprise]`"
                                    />
                                  </div>
                                  <div class="form-group col-md-12">
                                    <input
                                      aria-label="label"
                                      v-model="experience.poste"
                                      type="text"
                                      class="form-control"
                                      placeholder="Poste occupé"
                                      :name="`experiences[${index}][poste]`"
                                    />
                                  </div>
                                </div>

                                <div class="row">
                                  <div class="form-group col-md-12">
                                    <textarea
                                      class="form-control"
                                      v-model="experience.description"
                                      type="text"
                                      :name="`experiences[${index}][description]`"
                                      placeholder="Description de votre activité pendant cette expérience"
                                    ></textarea>
                                  </div>
                                </div>

                                <div class="row">
                                  <div class="col-md-6">
                                    <div class="form-group">
                                      <span
                                        style="
                                          line-height: 45px;
                                          font-size: 12px;
                                          letter-spacing: 0.7px;
                                        "
                                      >
                                        <b>De</b>
                                      </span>
                                      <VueDatePicker
                                        v-model="experience.date_deb"
                                        placeholder="Ajoutez une date"
                                      />
                                    </div>
                                  </div>

                                  <div class="col-md-6">
                                    <div class="form-group">
                                      <span
                                        style="
                                          line-height: 45px;
                                          font-size: 12px;
                                          letter-spacing: 0.7px;
                                        "
                                      >
                                        <b>à</b>
                                      </span>
                                      <VueDatePicker
                                        :minDate="new Date(experience.date_deb)"
                                        v-model="experience.date_fin"
                                        placeholder="Ajoutez une date"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <!-- <div class="row">
                              <div class="col-md-1 offset-md-11" style="background-color:black">
                                <div class="top-right" style="background-color:black">
                                  <i
                                    v-on:click="removeEmploi(index)"
                                    class="fas fa-times"
                                    onmouseover="this.style.cursor='pointer'"
                                    style="color:red"
                                  ></i>
                                </div>
                              </div>
                              </div>-->
                            </div>
                          </div>
                          <button
                            style="margin-top: 20px"
                            class="btn btn-success"
                            type="submit"
                            fill
                          >
                            Enregistrer
                          </button>
                        </card>
                        <!-- <form role="form">
                        <div class="form-group">
                          <label for="FullName">Full Name</label>
                          <input type="text" value="John Doe" id="FullName" class="form-control" />
                        </div>
                        <div class="form-group">
                          <label for="Email">Email</label>
                          <input
                            type="email"
                            value="first.last@example.com"
                            id="Email"
                            class="form-control"
                          />
                        </div>
                        <div class="form-group">
                          <label for="Username">Username</label>
                          <input type="text" value="john" id="Username" class="form-control" />
                        </div>
                        <div class="form-group">
                          <label for="Password">Password</label>
                          <input
                            type="password"
                            placeholder="6 - 15 Characters"
                            id="Password"
                            class="form-control"
                          />
                        </div>
                        <div class="form-group">
                          <label for="RePassword">Re-Password</label>
                          <input
                            type="password"
                            placeholder="6 - 15 Characters"
                            id="RePassword"
                            class="form-control"
                          />
                        </div>
                        <div class="form-group">
                          <label for="AboutMe">About Me</label>
                          <textarea style="height: 125px" id="AboutMe" class="form-control">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</textarea>
                        </div>
                        <button
                          class="btn btn-primary waves-effect waves-light w-md"
                          type="submit"
                        >Save</button>
                        </form>-->
                      </div>
                    </div>
                  </form>
                  <!-- Personal-Information -->
                </div>
                <!-- 123 -->

                <!-- 123 -->
              </div>
            </div>
          </div>
        </div>
      
      </div>
     
    </div>
  </div>
</template>
<script>
import VuePassword from "vue-password";
import { apiDomain } from "../config";
import { Card, BaseInput } from "@/components/index";
import EditProfileForm from "./Profile/EditProfileProp.vue";
import UserCard from "./Profile/UserCard.vue";
import BaseButton from "@/components/BaseButton";
import Vue from "vue";
import { VueDatePicker } from "@mathieustan/vue-datepicker";

export default {
  components: {
    VueDatePicker,

    VuePassword,
    EditProfileForm,
    UserCard,
    Card,
    BaseInput,
    BaseButton,
  },

  computed: {
    loggedIn() {
      return this.$store.getters.get_loggedIn;
    },

    guide() {
      return this.$store.getters.get_guide;
    },

    user() {
      return this.$store.getters.get_user;
    },
    isPasswordMatching() {
      if (
        this.password == "" ||
        this.password_confirmation == "" ||
        this.password != this.password_confirmation
      )
        return true;
      return false;
    },
  },
  data() {
    return {
      carte_prof: "",
      carte_professionnel: "",
      experiences: [],
      formations: [],
      formation: { etablissement: "" },
      experience: {},
      exp: {},

      client: [],

      validationErrors: [],
      errors: [],
      forma: [],
      pays: [],
      villespays: [],
      pays_id: "",
      paysshow: false,
      ville: {},
      contains_eight_characters: false,
      contains_number: false,
      contains_uppercase: false,
      contains_special_character: false,
      valid_password: false,
      passwordAncien: "",
      password: "",
      password_confirmation: "",
      isCreatingPassword: false,
      isCreatingPasswordVerif: false,
      isCreating: false,
      isCorrect: false,
      modalContacterClient: false,
      guide: {},
      photo: "",
      file: null,
      showPreview: false,
      imagePreview: "",
      apiDomain: "https://etnafesapi20212018.etnafes.com",
    };
  },
  created() {
    this.fetchguide(this.$store.state.user.id);
    this.fetchPays();
  },

  methods: {
    updateGuideWithoutPhoto(e) {
      let formData = new FormData();
      formData.append("présentation", this.guide.présentation);
      axios
        .post(
          `${apiDomain}/api/guide/non/update/${this.$store.state.guide[0].id}?token=${this.$store.state.token}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          if (res.status == 200) {
            this.$fire({
              text: "Votre profil a été modifié avec succés",
              type: "success",
              timer: 90000,
            }).then((r) => {
              window.location.reload();
            });
          }
        })
        .catch((error) => {
          console.log(error.response.data);
          if (error.response.status == 422) {
            this.validationErrors = error.response.data;
          }
        });
    },

    deleteExperience(id) {
      if (confirm("Are You Sure?")) {
        fetch(`${apiDomain}/api/experience/delete/${id}`, {
          method: "delete",
        })
          .then((res) => res.json())
          .then((data) => {
            alert("Experience Supprimée");
            window.location.reload();
          })
          .catch((err) => console.log(err));
      }
    },

    deleteFormation(id) {
      if (confirm("Are You Sure?")) {
        fetch(`${apiDomain}/api/formation/delete/${id}`, {
          method: "delete",
        })
          .then((res) => res.json())
          .then((data) => {
            alert("Formation Supprimée");
            window.location.reload();
          })
          .catch((err) => console.log(err));
      }
    },
    updateFormation(id, formation) {
      this.formation.etablissement = formation.etablissement;
      this.formation.date_deb = formation.date_deb;
      this.formation.date_fin = formation.date_fin;
      this.formation.description = formation.description;
      this.formation.diplome = formation.diplome;
      this.formation.guide_id = formation.guide_id;

      fetch(`${apiDomain}/api/formation/${id}`, {
        method: "put",
        body: JSON.stringify(this.formation),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())

        .then((data) => {
          if (confirm("Formation bien modifié")) {
            window.location.reload();
          }
        })
        .catch((err) => console.log(err));
    },

    updatePresentation(id, guide) {
      this.guide.presentation = guide.presentation;

      fetch(`${apiDomain}/api/guide/presentation/${id}`, {
        method: "put",
        body: JSON.stringify(this.guide),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())

        .then((data) => {
          if (confirm("Présenation bien modifiée")) {
            window.location.reload();
          }
        })
        .catch((err) => console.log(err));
    },

    updateExperience(id, experience) {
      this.experience.entreprise = experience.entreprise;
      this.experience.date_deb = experience.date_deb;
      this.experience.date_fin = experience.date_fin;
      this.experience.description = experience.description;
      this.experience.poste = experience.poste;
      this.experience.guide_id = experience.guide_id;

      //fetch(${apiDomain}/api/experience/${id}, {
      fetch(`${apiDomain}/api/experience/${id}`, {
        method: "put",
        body: JSON.stringify(this.experience),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())

        .then((data) => {
          if (confirm("Experience bien modifié")) {
            window.location.reload();
          }
        })
        .catch((err) => console.log(err));
    },

    updateLangues(id, guide) {
      this.guide.langue_maternelle = guide.langue_maternelle;
      this.guide.langue_de_visite = guide.langue_de_visite;
      fetch(`${apiDomain}/api/guide/langues/${id}`, {
        method: "put",
        body: JSON.stringify(this.guide),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())

        .then((data) => {
          if (confirm("Langues bien modifiée")) {
            window.location.reload();
          }
        })
        .catch((err) => console.log(err));
    },
    createFormation(e) {
      var formData = new FormData(e.target);
      for (var i = 0; i < this.formations.length; i++) {
        formData.append(
          "formations[" + i + "][etablissement]",
          this.formations[i].etablissement
        );
        formData.append(
          "formations[" + i + "][date_deb]",
          this.formations[i].date_deb
        );
        formData.append(
          "formations[" + i + "][date_fin]",
          this.formations[i].date_fin
        );
        formData.append(
          "formations[" + i + "][guide_id]",
          this.$store.state.guide[0].id
        );
      }
      axios
        .post(
          `${apiDomain}/api/create/formations/${this.$store.state.guide[0].id}`,
          formData
        )
        .then(function (response) {
          if (response.status == 200) {
            if (confirm("formation Ajoutée")) {
              window.location.reload();
            }
          }
        })
        .catch((error) => {
          if (error.response && error.response.status == 400) {
            this.validationErrors = error.response.data;
          }
        });
    },
    createExperience(e) {
      var formData = new FormData(e.target);
      for (var i = 0; i < this.experiences.length; i++) {
        formData.append(
          "experiences[" + i + "][entreprise]",
          this.experiences[i].entreprise
        );
        formData.append(
          "experiences[" + i + "][date_deb]",
          this.experiences[i].date_deb
        );
        formData.append(
          "experiences[" + i + "][date_fin]",
          this.experiences[i].date_fin
        );
        formData.append(
          "experiences[" + i + "][guide_id]",
          this.$store.state.guide[0].id
        );
      }
      axios
        .post(
          `${apiDomain}/api/create/experiences/${this.$store.state.guide[0].id}`,
          formData
        )
        .then(function (response) {
          if (response.status == 200) {
            if (confirm("experience Ajoutée")) {
              window.location.reload();
            }
          }
        })
        .catch((error) => {
          if (error.response && error.response.status == 400) {
            this.validationErrors = error.response.data;
          }
        });
    },
    removeEmploi: function (index) {
      Vue.delete(this.experiences, index);
    },
    addNewEmploi: function () {
      this.experiences.push(Vue.util.extend({}, this.experience));
    },

    removeFormation: function (index) {
      Vue.delete(this.formations, index);
    },
    addNewFormation: function () {
      this.formations.push(Vue.util.extend({}, this.formation));
    },
    fetchPays() {
      axios.get(`${apiDomain}/api/pays`).then(({ data }) => (this.pays = data));
    },
    fetchVillesPays(id) {
      axios
        .get(`${apiDomain}/api/pays/villes/${id}`)
        .then(({ data }) => (this.villespays = data.villes));
    },

    updateGuide(e) {
      let formData = new FormData();
      formData.append("nom", this.guide.nom);
      formData.append("prenom", this.guide.prenom);
      formData.append("email", this.guide.email);
      formData.append("telephone", this.guide.telephone);
      formData.append("présentation", this.guide.présentation);
      formData.append("civilité", this.guide.civilité);
      formData.append("cin", this.guide.cin);
      formData.append("langue_maternelle", this.guide.langue_maternelle);
      formData.append("langue_de_visite", this.guide.langue_de_visite);
      formData.append("login", this.guide.login);
      formData.append("ville_id", this.guide.ville_id);
      axios
        .post(
          `${apiDomain}/api/guide/update/${this.$store.state.user.id}?token=${this.$store.state.token}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )

        .then((res) => {
          if (res.status == 200) {
            this.$fire({
              text: "Votre profil a été modifié avec succés",
              type: "success",
              timer: 90000,
            }).then((r) => {
              window.location.reload();
            });
          }
        })
        .catch((error) => {
          this.updateIn = false;
          console.log(error.response.data);
          if (error.response.status == 422) {
            this.validationErrors = error.response.data;
          }
        });
    },

    updateImage(id, user) {
      var formData = new FormData();
      formData.append("carte_professionnel", this.carte_professionnel);
      axios
        .post(
          `${apiDomain}/api/userphoto/${this.$store.state.guide[0].id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          if (res.status == 200) {
            if (confirm("photo modifiée avec succés")) {
              window.location.reload();
            }
          }
        })
        .catch(function () {
          console.log("FAILURE!!");
        });
    },

    //show user by id
    fetchguide(id) {
      fetch(`${apiDomain}/api/guide/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.guide = res.guide[0];
          this.forma = res.guide[0].formations;
          this.exp = res.guide[0].experiences;
          this.client = res.client;
          this.ville = res.client.ville;
        })
        .catch((err) => console.log(err));
    },

    fetchFormation(id) {
      fetch(`${apiDomain}/api/formation/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.formation = res.formation;
        })
        .catch((err) => console.log(err));
    },

    fetchExperience(id) {
      fetch(`${apiDomain}/api/experience/${id}`)
        .then((res) => res.json())
        .then((res) => {
          this.experience = res.experience;
        })
        .catch((err) => console.log(err));
    },
    onChangeFileUpload() {
      this.carte_professionnel = this.$refs.carte_professionnel.files[0];
      let reader = new FileReader();
      reader.addEventListener(
        "load",
        function () {
          this.showPreview = true;
          this.imagePreview = reader.result;
        }.bind(this),
        false
      );

      if (this.carte_professionnel) {
        if (/\.(jpe?g|png|gif)$/i.test(this.carte_professionnel.name)) {
          reader.readAsDataURL(this.carte_professionnel);
        }
      }
    },
  },
};
</script>

<style>
a.remove-list-item {
  color: white;
  min-width: 34px;
  text-align: center;
  border-radius: 0px 7px 0 0;
  cursor: pointer;
  right: 0;
  font-size: 15px;
  text-transform: initial;
  background: #e00e0e;
  border-left: solid 2px white;
}
/* Top left text */
.top-right {
  position: absolute;
  top: 3px;
  right: 7px;
}
text-white {
  color: #ffffff;
}
h3 {
  line-height: 30px;
}
/* ==============
  Panels
===================*/
.panel {
  -moz-box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1);
  border-radius: 0px;
  border: none;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}
.panel .panel-body {
  padding: 20px;
}
.panel .panel-body p {
  margin: 0px;
}
.panel .panel-body p + p {
  margin-top: 15px;
}
.panel-heading {
  border-radius: 0;
  border: none !important;
  padding: 10px 20px;
}
.panel-default > .panel-heading {
  background-color: #fafafa;
  border-bottom: none;
  color: #797979;
}
.panel-title {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 0;
  margin-top: 0;
  text-transform: uppercase;
}
.panel-footer {
  background: #fafafa;
  border-top: 0px;
}
.panel-color .panel-title {
  color: #ffffff;
}
.panel-primary > .panel-heading {
  background-color: #6e8cd7;
}
.panel-success > .panel-heading {
  background-color: #33b86c;
}
.panel-info > .panel-heading {
  background-color: #29b6f6;
}
.panel-warning > .panel-heading {
  background-color: #ffd740;
}
.panel-danger > .panel-heading {
  background-color: #ef5350;
}
.panel-purple > .panel-heading {
  background-color: #7e57c2;
}
.panel-pink > .panel-heading {
  background-color: #ec407a;
}
.panel-inverse > .panel-heading {
  background-color: #212121;
}
.panel-border {
  border-radius: 3px;
}
.panel-border .panel-heading {
  background-color: #ffffff;
  border-top: 3px solid #ccc !important;
  border-radius: 3px;
  /* padding: 10px 20px 0px; */
}
.panel-border .panel-body {
  /* padding: 15px 20px 20px 20px; */
}
.panel-border.panel-primary .panel-heading {
  border-color: #6e8cd7 !important;
  color: #6e8cd7 !important;
}
.panel-border.panel-success .panel-heading {
  border-color: #33b86c !important;
  color: #33b86c !important;
}
.panel-border.panel-info .panel-heading {
  border-color: #29b6f6 !important;
  color: #29b6f6 !important;
}
.panel-border.panel-warning .panel-heading {
  border-color: #ffd740 !important;
  color: #ffd740 !important;
}
.panel-border.panel-danger .panel-heading {
  border-color: #ef5350 !important;
  color: #ef5350 !important;
}
.panel-border.panel-purple .panel-heading {
  border-color: #7e57c2 !important;
  color: #7e57c2 !important;
}
.panel-border.panel-pink .panel-heading {
  border-color: #ec407a !important;
  color: #ec407a !important;
}
.panel-border.panel-inverse .panel-heading {
  border-color: #212121 !important;
  color: #212121 !important;
}
.panel-fill {
  border-radius: 3px;
}
.panel-fill .panel-heading {
  background-color: transparent;
  color: #ffffff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5) !important;
}
.panel-fill .panel-body {
  color: rgba(255, 255, 255, 0.85);
}
.panel-fill.panel-default .panel-body {
  color: #666;
}
.panel-fill.panel-default .panel-heading {
  background-color: transparent;
  color: #333333;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;
}
.panel-fill.panel-primary {
  background-color: #489ce7;
}
.panel-fill.panel-success {
  background-color: #58c386;
}
.panel-fill.panel-info {
  background-color: #50c1f4;
}
.panel-fill.panel-warning {
  background-color: #fcdc63;
}
.panel-fill.panel-danger {
  background-color: #ef7270;
}
.panel-fill.panel-purple {
  background-color: #9475cb;
}
.panel-fill.panel-pink {
  background-color: #ec6391;
}
.panel-fill.panel-inverse {
  background-color: #4a4a4a;
}
.panel-group .panel .panel-heading a[data-toggle="collapse"].collapsed:before {
  content: "\f067";
}
.panel-group .panel .panel-heading .accordion-toggle.collapsed:before {
  content: "\f067";
}
.panel-group .panel .panel-heading a[data-toggle="collapse"] {
  display: block;
}
.panel-group .panel .panel-heading a[data-toggle="collapse"]:before {
  content: "\f068";
  display: block;
  float: right;
  font-family: "FontAwesome";
  font-size: 14px;
  text-align: right;
  width: 25px;
}
.panel-group .panel .panel-heading .accordion-toggle {
  display: block;
}
.panel-group .panel .panel-heading .accordion-toggle:before {
  content: "\f068";
  display: block;
  float: right;
  font-family: "FontAwesome";
  font-size: 14px;
  text-align: right;
  width: 25px;
}
.panel-group .panel .panel-heading + .panel-collapse .panel-body {
  border-top: none;
}
.panel-group .panel-heading {
  padding: 12px 26px;
}
.panel-group.panel-group-joined .panel + .panel {
  border-top: 1px solid #eeeeee;
  margin-top: 0;
}
.panel-group-joined .panel-group .panel + .panel {
  border-top: 1px solid #eeeeee;
  margin-top: 0;
}
/* ==============
  Profile
===================*/
.bg-overlay {
  -moz-border-radius: 6px 6px 0px 0px;
  -webkit-border-radius: 6px 6px 0px 0px;
  background-color: rgba(49, 126, 235, 0.4);
  border-radius: 6px 6px 0px 0px;
  height: 100%;
  left: 0px;
  position: absolute;
  top: 0px;
  width: 100%;
}
.bg-picture {
  -webkit-background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background: #00b5ec;
  margin-top: -22px;
  padding: 1px 0px;
  position: relative;
}
.bg-picture > .bg-picture-overlay {
  background-color: #f0ffdf;
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}
.profile-info-name {
  position: relative;
}
.profile-tab-content {
  background-color: transparent !important;
  box-shadow: none !important;
  margin-top: 35px;
}
.user-tabs {
  background-color: #ffffff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  margin-left: 0;
  margin-right: 0px;
}
.user-tabs .nav.nav-tabs {
  box-shadow: none !important;
}
.user-tabs .nav.nav-tabs a {
  text-transform: uppercase;
}
.user-tabs .pull-right .btn {
  margin-top: 8px;
}
.about-info-p {
  margin-bottom: 20px;
}
.about-info-p p {
  font-size: 16px;
}
.tabs {
  background-color: #ffffff;
  margin: 0 auto;
  padding: 0px;
  /* position: relative; */
  /* white-space: nowrap; */
  width: 100%;
}

.tabs li.tab a {
  -moz-transition: color 0.28s ease;
  -ms-transition: color 0.28s ease;
  -o-transition: color 0.28s ease;
  -webkit-transition: color 0.28s ease;
  color: #ee6e73;
  display: block;
  height: 100%;
  text-decoration: none;
  transition: color 0.28s ease;
  width: 100%;
}
.tabs li.tab a.active {
  color: #6e8cd7 !important;
}
.tabs .indicator {
  background-color: #6e8cd7;
  bottom: 0;
  height: 2px;
  position: absolute;
  will-change: left, right;
}
.tabs-top .indicator {
  top: 0;
}
.nav.nav-tabs + .tab-content {
  background: #ffffff;
  margin-bottom: 30px;
  padding: 30px;
}
.tabs-vertical-env {
  background-color: #eeeeee;
  margin-bottom: 30px;
}
.tabs-vertical-env .tab-content {
  background: #ffffff;
  display: table-cell;
  margin-bottom: 30px;
  padding: 30px;
  vertical-align: top;
}
.tabs-vertical-env .nav.tabs-vertical {
  display: table-cell;
  min-width: 120px;
  vertical-align: top;
  width: 150px;
}
.tabs-vertical-env .nav.tabs-vertical li.active > a {
  background-color: #ffffff;
  border: 0;
}
.tabs-vertical-env .nav.tabs-vertical li > a {
  color: #333333;
  text-align: center;
  white-space: nowrap;
}
.nav.nav-tabs > li.active > a {
  background-color: #ffffff;
  border: 0;
}
.nav.nav-tabs > li > a,
.nav.tabs-vertical > li > a {
  background-color: transparent;
  border-radius: 0;
  border: none;
  color: #333333 !important;
  cursor: pointer;
  line-height: 50px;
  font-weight: 700;
  padding: 0px 20px;
}
.nav.nav-tabs > li > a:hover,
.nav.tabs-vertical > li > a:hover {
  color: #6e8cd7 !important;
}
.tab-content {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  color: #777777;
}
.nav.nav-tabs > li:last-of-type a {
  margin-right: 0px;
}
.nav.nav-tabs {
  border-bottom: 0;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
}
.navtab-bg {
  background-color: #eeeeee;
}
.nav-tabs.nav-justified > .active > a,
.nav-tabs.nav-justified > .active > a:hover,
.nav-tabs.nav-justified > .active > a:focus,
.tabs-vertical-env .nav.tabs-vertical li.active > a {
  border: none;
}
</style>
