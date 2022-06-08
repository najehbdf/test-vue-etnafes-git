<template>
  <div class="content">
    <div class="container card">
      <div class="col-md-4">
        <div class="form-group">
          <input
            v-model="search"
            class="form-control"
            aria-label="label"
            type="text"
            placeholder="Chercher ... "
          />
        </div>
      </div>
      <ul class="nav nav-tabs nav-justified">
        <li class="nav-item">
          <a
            class="nav-link"
            @click.prevent="setActive('client')"
            :class="{ active: isActive('client') }"
            href="#client"
          >
           <span style="font-size:12px"> {{ filtered_V.length }} Voyageurs &nbsp;</span>
            <span class="badge badge-pill badge-danger">{{
              clientsUnread.length
            }}</span>
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            @click.prevent="setActive('proprietaire')"
            :class="{ active: isActive('proprietaire') }"
            href="#proprietaire"
          >
           <span style="font-size:12px">  {{ filtered_H.length }} Hébergeurs&nbsp;</span>
            <span class="badge badge-pill badge-primary">{{
              propsUnread.length
            }}</span>
          </a>
        </li>

        <li class="nav-item">
          <a
            class="nav-link"
            @click.prevent="setActive('proprietairerest')"
            :class="{ active: isActive('proprietairerest') }"
            href="#proprietairerest"
          >
           <span style="font-size:12px">  {{ filtered_R.length }} Restaurants &nbsp;</span>
            <span class="badge badge-pill badge-info">{{
              propsresUnread.length
            }}</span>
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            @click.prevent="setActive('guide')"
            :class="{ active: isActive('guide') }"
            href="#guide"
          >
            <span style="font-size:12px"> {{ filtered_G.length }} Guides&nbsp;</span>
            <span class="badge badge-pill badge-warning">{{
              guidesUnread.length
            }}</span>
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            @click.prevent="setActive('agence')"
            :class="{ active: isActive('agence') }"
            href="#agence"
          >
          <span style="font-size:12px">   {{ filtered_Ag.length }} Agences&nbsp;</span>
            <span class="badge badge-pill badge-dark">{{
              adagenceUnread.length
            }}</span>
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            @click.prevent="setActive('corbeille')"
            :class="{ active: isActive('corbeille') }"
            href="#corbeille"
          >
           <span style="font-size:12px">  Corbeille &nbsp;</span>
            <i
              style="color: red !important"
              class="fa fa-trash text-danger fa-lg"
              title="Clients"
            ></i>
          </a>
        </li>
      </ul>

      <div class="tab-content py-3" id="myTabContent">
        <div
          class="tab-pane fade"
          :class="{ 'active show': isActive('client') }"
          id="client"
        >
          <div class="row">
            <card>
              <div
                class="table-responsive text-left"
                style="border: solid 1px #9b9b9b"
              >
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col" style="text-transform: none">
                        Nom et Prénom
                      </th>
                      <th scope="col" style="text-transform: none">Email</th>
                      <th scope="col" style="text-transform: none">
                        Telephone
                      </th>
                      <th scope="col" style="text-transform: none">Crée le</th>
                      <th scope="col" style="text-transform: none">
                        <center>Actions</center>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="client in filtered_V"
                      v-bind:key="client.id"
                      :style="[
                        client.read == 0
                          ? { 'background-color': '#e7f1fd' }
                          : { 'background-color': 'none' },
                      ]"
                    >
                      <td>
                        {{ client.nom }} {{ client.prenom }}
                        <sup v-if="client.read == 0" style="color: red">
                          <span
                            class="badge badge-danger"
                            style="background-color: red"
                            >New</span
                          >
                        </sup>
                      </td>
                      <td>{{ client.email }}</td>
                      <td>{{ client.telephone }}</td>
                      <td>
                        <span>{{ client.human_created_at }}</span>
                      </td>
                      <td>
                        <center>
                          <router-link
                            :to="{
                              name: 'show_client',
                              params: { id: client.id },
                            }"
                          >
                            <i
                              style="color: blue"
                              title="Détails du client"
                              class="tim-icons icon-send"
                            ></i
                            >&nbsp;
                          </router-link>

                          <router-link
                            :to="{
                              name: 'edit_client',
                              params: { id: client.id },
                            }"
                          >
                            <i
                              style="color: #62b062"
                              title="Modifier le client"
                              class="tim-icons icon-pencil"
                            ></i
                            >&nbsp;
                          </router-link>

                          <i
                            style="color: #fd5d93"
                            title="Delete client"
                            @click="deleteClient(client.id)"
                            class="tim-icons icon-simple-remove"
                          ></i>
                        </center>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </card>
          </div>
        </div>

        <div
          class="tab-pane fade"
          :class="{ 'active show': isActive('proprietaire') }"
          id="proprietaire"
        >
          <div class="row">
            <card>
              <div
                class="table-responsive text-left"
                style="border: solid 1px #9b9b9b"
              >
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col" style="text-transform: none">
                        Nom et Prénom
                      </th>
                      <th scope="col" style="text-transform: none">Email</th>
                      <th scope="col" style="text-transform: none">
                        Telephone
                      </th>
                      <th scope="col" style="text-transform: none">Crée le</th>
                      <th scope="col" style="text-transform: none">
                        <center>Actions</center>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="prop in filtered_H"
                      v-bind:key="prop.id"
                      :style="[
                        prop.read == 0
                          ? { 'background-color': '#e7f1fd' }
                          : { 'background-color': 'none' },
                      ]"
                    >
                      <td>{{ prop.client.nom }} {{ prop.client.prenom }}</td>
                      <td>{{ prop.client.email }}</td>
                      <td>{{ prop.client.telephone }}</td>
                      <td>
                        <span>{{ prop.client.human_created_at }}</span>
                      </td>
                      <td>
                        <center>
                          <router-link
                            :to="{
                              name: 'show_hebergeur',
                              params: { id: prop.id },
                            }"
                          >
                            <i
                              style="color: blue"
                              title="Détails du client"
                              class="tim-icons icon-send"
                            ></i
                            >&nbsp;
                          </router-link>

                          <router-link
                            :to="{
                              name: 'edit_client',
                              params: { id: prop.id },
                            }"
                          >
                            <i
                              style="color: #62b062"
                              title="Modifier le client"
                              class="tim-icons icon-pencil"
                            ></i
                            >&nbsp;
                          </router-link>
                          <i
                            style="color: #fd5d93"
                            title="Delete client"
                            class="tim-icons icon-simple-remove"
                            @click="deleteHebergeur(prop.id)"
                          ></i>
                        </center>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </card>
          </div>
        </div>

        <div
          class="tab-pane fade"
          :class="{ 'active show': isActive('proprietairerest') }"
          id="proprietairerest"
        >
          <div class="row">
            <card>
              <div
                class="table-responsive text-left"
                style="border: solid 1px #9b9b9b"
              >
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col" style="text-transform: none">
                        Nom et Prénom
                      </th>
                      <th scope="col" style="text-transform: none">Email</th>
                      <th scope="col" style="text-transform: none">
                        Telephone
                      </th>
                      <th scope="col" style="text-transform: none">Crée le</th>
                      <th scope="col" style="text-transform: none">
                        <center>Actions</center>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="prop in filtered_R"
                      v-bind:key="prop.id"
                      :style="[
                        prop.read == 0
                          ? { 'background-color': '#e7f1fd' }
                          : { 'background-color': 'none' },
                      ]"
                    >
                      <td>{{ prop.client.nom }} {{ prop.client.prenom }}</td>
                      <td>{{ prop.client.email }}</td>
                      <td>{{ prop.client.telephone }}</td>
                      <td>
                        <span>{{ prop.client.human_created_at }}</span>
                      </td>
                      <td>
                        <center>
                          <router-link
                            :to="{
                              name: 'show_proprietaire_restau',
                              params: { id: prop.id },
                            }"
                          >
                            <i
                              style="color: blue"
                              title="Détails du client"
                              class="tim-icons icon-send"
                            ></i
                            >&nbsp;
                          </router-link>

                          <router-link
                            :to="{
                              name: 'edit_client',
                              params: { id: prop.id },
                            }"
                          >
                            <i
                              style="color: #62b062"
                              title="Modifier le client"
                              class="tim-icons icon-pencil"
                            ></i
                            >&nbsp;
                          </router-link>
                          <i
                            style="color: #fd5d93"
                            title="Delete client"
                            class="tim-icons icon-simple-remove"
                            @click="deleteProprestau(prop.id)"
                          ></i>
                        </center>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </card>
          </div>
        </div>
        <div
          class="tab-pane fade"
          :class="{ 'active show': isActive('guide') }"
          id="guide"
        >
          <div class="row">
            <card>
              <div
                class="table-responsive text-left"
                style="border: solid 1px #9b9b9b"
              >
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col" style="text-transform: none">
                        Nom et Prénom
                      </th>
                      <th scope="col" style="text-transform: none">Email</th>
                      <th scope="col" style="text-transform: none">
                        Telephone
                      </th>
                      <th scope="col" style="text-transform: none">Crée le</th>
                      <th scope="col" style="text-transform: none">
                        <center>Actions</center>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="guide in filtered_G"
                      v-bind:key="guide.id"
                      :style="[
                        guide.read == 0
                          ? { 'background-color': '#e7f1fd' }
                          : { 'background-color': 'none' },
                      ]"
                    >
                      <td>{{ guide.client.nom }} {{ guide.client.prenom }}</td>
                      <td>{{ guide.client.email }}</td>
                      <td>{{ guide.client.telephone }}</td>
                      <td>
                        <span>{{ guide.human_created_at }}</span>
                      </td>
                      <td>
                        <center>
                          <router-link
                            :to="{
                              name: 'show_guide',
                              params: { id: guide.id },
                            }"
                          >
                            <i
                              style="color: blue"
                              title="Détails du client"
                              class="tim-icons icon-send"
                            ></i
                            >&nbsp;
                          </router-link>

                          <router-link
                            :to="{
                              name: 'edit_client',
                              params: { id: guide.id },
                            }"
                          >
                            <i
                              style="color: #62b062"
                              title="Modifier le client"
                              class="tim-icons icon-pencil"
                            ></i
                            >&nbsp;
                          </router-link>
                          <i
                            style="color: #fd5d93"
                            title="Delete client"
                            class="tim-icons icon-simple-remove"
                            @click="deleteGuide(guide.id)"
                          ></i>
                        </center>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </card>
          </div>
        </div>
        <div
          class="tab-pane fade"
          :class="{ 'active show': isActive('agence') }"
          id="agence"
        >
          <div class="row">
            <card>
              <div
                class="table-responsive text-left"
                style="border: solid 1px #9b9b9b"
              >
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col" style="text-transform: none">
                        Nom et Prénom
                      </th>
                      <th scope="col" style="text-transform: none">Email</th>
                      <th scope="col" style="text-transform: none">
                        Telephone
                      </th>
                      <th scope="col" style="text-transform: none">Crée le</th>
                      <th scope="col" style="text-transform: none">
                        <center>Actions</center>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="adagence in filtered_Ag"
                      v-bind:key="adagence.id"
                      :style="[
                        adagence.read == 0
                          ? { 'background-color': '#e7f1fd' }
                          : { 'background-color': 'none' },
                      ]"
                    >
                      <td>
                        {{ adagence.client.nom }} {{ adagence.client.prenom }}
                      </td>
                      <td>{{ adagence.client.email }}</td>
                      <td>{{ adagence.client.telephone }}</td>
                      <td>
                        <span>{{ adagence.human_created_at }}</span>
                      </td>
                      <td>
                        <center>
                          <router-link
                            :to="{
                              name: 'show_adagence',
                              params: { id: adagence.id },
                            }"
                          >
                            <i
                              style="color: blue"
                              title="Détails du client"
                              class="tim-icons icon-send"
                            ></i
                            >&nbsp;
                          </router-link>

                          <router-link
                            :to="{
                              name: 'edit_client',
                              params: { id: adagence.id },
                            }"
                          >
                            <i
                              style="color: #62b062"
                              title="Modifier le client"
                              class="tim-icons icon-pencil"
                            ></i
                            >&nbsp;
                          </router-link>
                          <i
                            style="color: #fd5d93"
                            title="Delete client"
                            class="tim-icons icon-simple-remove"
                            @click="deleteAdagence(adagence.id)"
                          ></i>
                        </center>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </card>
          </div>
        </div>

        <div
          class="tab-pane fade"
          :class="{ 'active show': isActive('corbeille') }"
          id="corbeille"
        >
          <div class="row">
            <card>
              <div
                class="table-responsive text-left"
                style="border: solid 1px #9b9b9b"
              >
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col" style="text-transform: none">
                        Nom et Prénom
                      </th>
                      <th scope="col" style="text-transform: none">Email</th>
                      <th scope="col" style="text-transform: none">
                        Telephone
                      </th>
                      <th scope="col" style="text-transform: none">Crée le</th>
                      <th scope="col" style="text-transform: none">
                        <center>Actions</center>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="client in clientscorbeille"
                      v-bind:key="client.id"
                      :style="[
                        client.read == 0
                          ? { 'background-color': '#e7f1fd' }
                          : { 'background-color': 'none' },
                      ]"
                    >
                      <td>
                        {{ client.nom }} {{ client.prenom }}
                        <sup v-if="client.read == 0" style="color: red">
                          <span
                            class="badge badge-danger"
                            style="background-color: red"
                            >New</span
                          >
                        </sup>
                      </td>
                      <td>{{ client.email }}</td>
                      <td>{{ client.telephone }}</td>
                      <td>
                        <span>{{ client.human_created_at }}</span>
                      </td>
                      <td>
                        <center>
                          <!--  <router-link :to="{name:'show_client', params: { id:client.id} }">
                            <i
                              style="color:blue"
                              title="Détails du client"
                              class="tim-icons icon-send"
                            ></i>&nbsp;
                          </router-link>

                          <router-link :to="{name:'edit_client', params: { id:client.id} }">
                            <i
                              style="color:#62b062"
                              title="Modifier le client"
                              class="tim-icons icon-pencil"
                            ></i>&nbsp;
                          </router-link>-->
                          <i
                            onmouseover="this.style.cursor='pointer'"
                            style="color: green"
                            class="fas fa-trash-restore"
                            @click="restore(client.id)"
                          ></i>
                          &nbsp;
                          <i
                            style="color: #fd5d93"
                            title="Delete client"
                            @click="ForcedeleteClient(client.id)"
                            class="fas fa-trash-alt"
                          ></i>
                        </center>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </card>
          </div>

          <div class="row">
            <card>
              <div
                class="table-responsive text-left"
                style="border: solid 1px #9b9b9b"
              >
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col" style="text-transform: none">
                        Nom et Prénom
                      </th>
                      <th scope="col" style="text-transform: none">Email</th>
                      <th scope="col" style="text-transform: none">
                        Telephone
                      </th>
                      <th scope="col" style="text-transform: none">Crée le</th>
                      <th scope="col" style="text-transform: none">
                        <center>Actions</center>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-show="prop.client"
                      v-for="prop in proprietairescorbeille"
                      v-bind:key="prop.id"
                      :style="[
                        prop.read == 0
                          ? { 'background-color': '#e7f1fd' }
                          : { 'background-color': 'none' },
                      ]"
                    >
                      <td>
                        <span v-if="prop.client"
                          >{{ prop.client.nom }} {{ prop.client.prenom }}</span
                        >
                      </td>
                      <td>
                        <span v-if="prop.client">{{ prop.client.email }}</span>
                      </td>
                      <td>
                        <span v-if="prop.client">{{
                          prop.client.telephone
                        }}</span>
                      </td>
                      <td>
                        <span v-if="prop.client">{{
                          prop.client.human_created_at
                        }}</span>
                      </td>
                      <td>
                        <center>
                          <i
                            onmouseover="this.style.cursor='pointer'"
                            style="color: green"
                            class="fas fa-trash-restore"
                            @click="restoreHebergeur(prop.id)"
                          ></i>
                          &nbsp;
                          <i
                            style="color: #fd5d93"
                            title="Delete client"
                            @click="ForcedeleteHebergeur(prop.id)"
                            class="fas fa-trash-alt"
                          ></i>
                        </center>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </card>
          </div>

          <div class="row">
            <card>
              <div
                class="table-responsive text-left"
                style="border: solid 1px #9b9b9b"
              >
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col" style="text-transform: none">
                        Nom et Prénom
                      </th>
                      <th scope="col" style="text-transform: none">Email</th>
                      <th scope="col" style="text-transform: none">
                        Telephone
                      </th>
                      <th scope="col" style="text-transform: none">Crée le</th>
                      <th scope="col" style="text-transform: none">
                        <center>Actions</center>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="prop in proprietairesrestcorbeille"
                      v-bind:key="prop.id"
                      :style="[
                        prop.read == 0
                          ? { 'background-color': '#e7f1fd' }
                          : { 'background-color': 'none' },
                      ]"
                    >
                      <td>{{ prop.client.nom }} {{ prop.client.prenom }}</td>
                      <td>{{ prop.client.email }}</td>
                      <td>{{ prop.client.telephone }}</td>
                      <td>
                        <span>{{ prop.client.human_created_at }}</span>
                      </td>
                      <td>
                        <center>
                          <i
                            onmouseover="this.style.cursor='pointer'"
                            style="color: green"
                            class="fas fa-trash-restore"
                            @click="restoreProprestau(prop.id)"
                          ></i>
                          &nbsp;
                          <i
                            style="color: #fd5d93"
                            title="Delete client"
                            @click="ForcedeletePrprestau(prop.id)"
                            class="fas fa-trash-alt"
                          ></i>
                        </center>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </card>
          </div>

          <div class="row">
            <card>
              <div
                class="table-responsive text-left"
                style="border: solid 1px #9b9b9b"
              >
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col" style="text-transform: none">
                        Nom et Prénom
                      </th>
                      <th scope="col" style="text-transform: none">Email</th>
                      <th scope="col" style="text-transform: none">
                        Telephone
                      </th>
                      <th scope="col" style="text-transform: none">Crée le</th>
                      <th scope="col" style="text-transform: none">
                        <center>Actions</center>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="guide in guidescorbeille"
                      v-bind:key="guide.id"
                      :style="[
                        guide.read == 0
                          ? { 'background-color': '#e7f1fd' }
                          : { 'background-color': 'none' },
                      ]"
                    >
                      <td>{{ guide.client.nom }} {{ guide.client.prenom }}</td>
                      <td>{{ guide.client.email }}</td>
                      <td>{{ guide.client.telephone }}</td>
                      <td>
                        <span>{{ guide.human_created_at }}</span>
                      </td>
                      <td>
                        <center>
                          <i
                            onmouseover="this.style.cursor='pointer'"
                            style="color: green"
                            class="fas fa-trash-restore"
                            @click="restoreGuide(guide.id)"
                          ></i>
                          &nbsp;
                          <i
                            style="color: #fd5d93"
                            title="Delete client"
                            @click="ForcedeleteGuide(guide.id)"
                            class="fas fa-trash-alt"
                          ></i>
                        </center>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </card>
          </div>

          <div class="row">
            <card>
              <div
                class="table-responsive text-left"
                style="border: solid 1px #9b9b9b"
              >
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col" style="text-transform: none">
                        Nom et Prénom
                      </th>
                      <th scope="col" style="text-transform: none">Email</th>
                      <th scope="col" style="text-transform: none">
                        Telephone
                      </th>
                      <th scope="col" style="text-transform: none">Crée le</th>
                      <th scope="col" style="text-transform: none">
                        <center>Actions</center>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="adagence in adagencescorbeille"
                      v-bind:key="adagence.id"
                      :style="[
                        adagence.read == 0
                          ? { 'background-color': '#e7f1fd' }
                          : { 'background-color': 'none' },
                      ]"
                    >
                      <td>
                        {{ adagence.client.nom }} {{ adagence.client.prenom }}
                      </td>
                      <td>{{ adagence.client.email }}</td>
                      <td>{{ adagence.client.telephone }}</td>
                      <td>
                        <span>{{ adagence.human_created_at }}</span>
                      </td>
                      <td>
                        <center>
                          <i
                            onmouseover="this.style.cursor='pointer'"
                            style="color: green"
                            class="fas fa-trash-restore"
                            @click="restoreAdagence(adagence.id)"
                          ></i>
                          &nbsp;
                          <i
                            style="color: #fd5d93"
                            title="Delete client"
                            @click="ForcedeleteAdagence(adagence.id)"
                            class="fas fa-trash-alt"
                          ></i>
                        </center>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BaseTable from "@/components/BaseTable";
import TopNavbar from "./Layout/TopNavbar";

import { Card } from "@/components/index";
import { apiDomain } from "../config";
const tableColumns = ["Titre", "Date_deb", "Date_fin", "Prix_fix"];

export default {
  components: {
    Card,
    BaseTable,
    TopNavbar,
  },

  data() {
    return {
      search: "",
      clientsUnread: [],
      propsUnread: [],
      proprietairescorbeille: [],
      propsresUnread: [],
      guidesUnread: [],
      adagenceUnread: [],
      activeItem: "client",
      table1: {
        title: "Simple Table",
        columns: [...tableColumns],
      },
      guidescorbeille: [],
      proprietairesrestcorbeille: [],
      clients: [],
      adagencescorbeille: [],
      clientscorbeille: [],
      proprietaires: [],
      guides: [],
      adagences: [],
      proprietairesrest: [],
    };
  },

  computed: {
    filtered_V: function () {
      if (Array.isArray(this.clients)) {
        return this.clients.filter((pack) => {
          return (
            pack.prenom.toLowerCase().match(this.search.toLowerCase()) ||
            pack.nom.toLowerCase().match(this.search.toLowerCase())
          );
        });
      }
    },
    filtered_H: function () {
      if (Array.isArray(this.proprietaires)) {
        return this.proprietaires.filter((pack) => {
          return (
            pack.client.nom.toLowerCase().match(this.search.toLowerCase()) ||
            pack.client.prenom.toLowerCase().match(this.search.toLowerCase())
          );
        });
      }
    },

    filtered_R: function () {
      if (Array.isArray(this.proprietairesrest)) {
        return this.proprietairesrest.filter((pack) => {
          return (
            pack.client.nom.toLowerCase().match(this.search.toLowerCase()) ||
            pack.client.prenom.toLowerCase().match(this.search.toLowerCase()) ||
            pack.client.telephone.match(this.search)
          );
        });
      }
    },
    filtered_G: function () {
      if (Array.isArray(this.guides)) {
        return this.guides.filter((pack) => {
          return (
            pack.client.nom.toLowerCase().match(this.search.toLowerCase()) ||
            pack.client.prenom.toLowerCase().match(this.search.toLowerCase()) ||
            pack.client.telephone.match(this.search)
          );
        });
      }
    },
    filtered_Ag: function () {
      if (Array.isArray(this.adagences)) {
        return this.adagences.filter((pack) => {
          return (
            pack.client.nom.toLowerCase().match(this.search.toLowerCase()) ||
            pack.client.prenom.toLowerCase().match(this.search.toLowerCase())
          );
        });
      }
    },

    loggedIn() {
      return this.$store.getters.get_loggedIn;
    },

    user() {
      return this.$store.getters.get_user;
    },
  },
  created() {
    this.fetchClients();
    this.fetchProprietaires();
    this.fetchGuides();
    this.fetchAdagences();
    this.fetchProprietairesRestau();
  },
  methods: {
    restore(id) {
      axios.post(`${apiDomain}/api/restore/client/${id}`).then((response) => {
        if (response.status == 200) {
          this.$noty.success("Bien restaurée.");
          this.fetchClients();
        }
      });
    },
    restoreHebergeur(id) {
      axios
        .post(`${apiDomain}/api/restore/proprietaire/${id}`)
        .then((response) => {
          if (response.status == 200) {
            this.$noty.success("Bien restaurée.");
            this.fetchProprietaires();
          }
        });
    },

    restoreProprestau(id) {
      axios
        .post(`${apiDomain}/api/restore/proprietairerestau/${id}`)
        .then((response) => {
          if (response.status == 200) {
            this.$noty.success("Bien restaurée.");
            this.fetchProprietairesRestau();
          }
        });
    },

    restoreGuide(id) {
      axios.post(`${apiDomain}/api/restore/guide/${id}`).then((response) => {
        if (response.status == 200) {
          this.$noty.success("Bien restaurée.");
          this.fetchGuides();
        }
      });
    },

    restoreAdagence(id) {
      axios.post(`${apiDomain}/api/restore/adagence/${id}`).then((response) => {
        if (response.status == 200) {
          this.$noty.success("Bien restaurée.");
          this.fetchAdagences();
        }
      });
    },
    isActive(menuItem) {
      return this.activeItem === menuItem;
    },
    setActive(menuItem) {
      this.activeItem = menuItem;
    },
    fetchClients() {
      fetch(`${apiDomain}/api/allclients?token=${this.$store.state.token}`)
        .then((res) => res.json())
        .then((res) => {
          this.clients = res.clients;
          this.clientscorbeille = res.clientscorbeille;
          this.clientsUnread = res.clientsUnread;
        })
        .catch((err) => console.log(err));
    },

    fetchProprietaires() {
      fetch(
        `${apiDomain}/api/allproprietaires?token=${this.$store.state.token}`
      )
        .then((res) => res.json())
        .then((res) => {
          this.proprietaires = res.proprietaires;
          this.proprietairescorbeille = res.proprietairescorbeille;
          this.propsUnread = res.propsUnread;
        })
        .catch((err) => console.log(err));
    },

    fetchProprietairesRestau() {
      fetch(
        `${apiDomain}/api/proprietaires/restaurants?token=${this.$store.state.token}`
      )
        .then((res) => res.json())
        .then((res) => {
          this.proprietairesrest = res.proprietaires;
          this.proprietairesrestcorbeille = res.proprietairesrestcorbeille;
          this.propsresUnread = res.propsresUnread;
        })
        .catch((err) => console.log(err));
    },

    fetchGuides() {
      fetch(`${apiDomain}/api/allguides?token=${this.$store.state.token}`)
        .then((res) => res.json())
        .then((res) => {
          this.guides = res.guides;
          this.guidescorbeille = res.guidescorbeille;

          this.guidesUnread = res.guidesUnread;
        })
        .catch((err) => console.log(err));
    },

    fetchAdagences() {
      fetch(`${apiDomain}/api/alladagences?token=${this.$store.state.token}`)
        .then((res) => res.json())
        .then((res) => {
          this.adagences = res.adagences;
          this.adagencescorbeille = res.adagencescorbeille;

          this.adagenceUnread = res.adagenceUnread;
        })
        .catch((err) => console.log(err));
    },

    deleteClient(id) {
      if (confirm("Are You Sure?")) {
        fetch(`${apiDomain}/api/client/delete/${id}`, {
          method: "delete",
        })
          .then((res) => res.json())
          .then((data) => {
            alert("Voyageur Supprimée");
            window.location.reload();
          })
          .catch((err) => console.log(err));
      }
    },
    deleteGuide(id) {
      if (confirm("Are You Sure?")) {
        fetch(`${apiDomain}/api/guide/delete/${id}`, {
          method: "delete",
        })
          .then((res) => res.json())
          .then((data) => {
            alert("Guide Supprimée");
            window.location.reload();
          })
          .catch((err) => console.log(err));
      }
    },

    deleteHebergeur(id) {
      if (confirm("Are You Sure?")) {
        fetch(`${apiDomain}/api/proprietaire/delete/${id}`, {
          method: "delete",
        })
          .then((res) => res.json())
          .then((data) => {
            alert("Hébergeur Supprimée");
            window.location.reload();
          })
          .catch((err) => console.log(err));
      }
    },
    deleteAdagence(id) {
      if (confirm("Are You Sure?")) {
        fetch(`${apiDomain}/api/adagence/delete/${id}`, {
          method: "delete",
        })
          .then((res) => res.json())
          .then((data) => {
            alert("Proprietaire agence Supprimée");
            window.location.reload();
          })
          .catch((err) => console.log(err));
      }
    },

    deleteProprestau(id) {
      if (confirm("Are You Sure?")) {
        fetch(`${apiDomain}/api/proprietairerestau/delete/${id}`, {
          method: "delete",
        })
          .then((res) => res.json())
          .then((data) => {
            alert("Proprietaire Restaurant Supprimée");
            window.location.reload();
          })
          .catch((err) => console.log(err));
      }
    },
    ForcedeleteClient(id) {
      if (confirm("Ce client sera supprimé définitivement?")) {
        fetch(`${apiDomain}/api/client/force/delete/${id}`, {
          method: "delete",
        })
          .then((res) => res.json())
          .then((data) => {
            alert("Voyageur Supprimée");
            window.location.reload();
          })
          .catch((err) => console.log(err));
      }
    },

    ForcedeleteAdagence(id) {
      if (confirm("Ce proprietaire sera supprimé définitivement?")) {
        fetch(`${apiDomain}/api/adagence/force/delete/${id}`, {
          method: "delete",
        })
          .then((res) => res.json())
          .then((data) => {
            alert("Proprietaire agence Supprimée");
            window.location.reload();
          })
          .catch((err) => console.log(err));
      }
    },

    ForcedeleteHebergeur(id) {
      if (confirm("Cet hébergeur sera supprimé définitivement?")) {
        fetch(`${apiDomain}/api/proprietaire/force/delete/${id}`, {
          method: "delete",
        })
          .then((res) => res.json())
          .then((data) => {
            alert("Hébergeur Supprimée");
            window.location.reload();
          })
          .catch((err) => console.log(err));
      }
    },

    ForcedeleteGuide(id) {
      if (confirm("Ce guide sera supprimé définitivement?")) {
        fetch(`${apiDomain}/api/guide/force/delete/${id}`, {
          method: "delete",
        })
          .then((res) => res.json())
          .then((data) => {
            alert("Guide Supprimée");
            window.location.reload();
          })
          .catch((err) => console.log(err));
      }
    },

    ForcedeleteProprestau(id) {
      if (confirm("Ce proprietaire sera supprimé définitivement?")) {
        fetch(`${apiDomain}/api/proprietairerestau/force/delete/${id}`, {
          method: "delete",
        })
          .then((res) => res.json())
          .then((data) => {
            alert("Proprietaire restaurant Supprimée");
            window.location.reload();
          })
          .catch((err) => console.log(err));
      }
    },
  },
};
</script>
