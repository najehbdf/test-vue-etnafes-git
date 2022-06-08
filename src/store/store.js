import Vue from "vue";
import Vuex from "vuex";
import {
    apiDomain
} from "../config";

import VuexPersistence from 'vuex-persist'

import mutations from './mutations'
import {
    mapState
} from 'vuex';
//then you use Vuex
Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    state: {
        femme: null,

        loggedIn: false,
        user: null,
        prop: null,
        proprestau: null,
        propagence: null,
        guide: null,
        token: null,
        prenom: "",
        ages: [],
        code: '',
        hebergement_id: "",
        ville_id: "",
        nb_enfant: "",
        nb_adulte: "",
        nb_produit:"",
        hebergement: "",
        id: "",
        saveClients: {
            nom: '',
            prenom: ''
        }
    },
    plugins: [new VuexPersistence().plugin],
    mutations: {

        pushAge(state, age) {
            state.ages.push(age);
        },

        SET_user(state, payload) {
            state.user = payload;
        },

        SET_prop(state, payload) {
            state.prop = payload;
        },
        SET_proprestau(state, payload) {
            state.proprestau = payload;
        },
        SET_femme(state, payload) {
            state.femme = payload;
        },
        SET_propagence(state, payload) {
            state.propagence = payload;
        },

        SET_guide(state, payload) {
            state.guide = payload;
        },

        SET_token(state, payload) {
            state.token = payload;
        },
        SET_loggedIn(state, payload) {
            state.loggedIn = payload;
        },

        updatePrenom(state, prenom) {
            state.prenom = prenom

        },

        updateCode(state, code) {
            state.code = code

        },

        /* updateAge(state, age) {
            state.age = age

        }, */


        updateNom(state, nom) {

            state.nom = nom
        },

        updateHebergementid(state, hebergement_id) {
            state.hebergement_id = hebergement_id
        },

        updateVilleid(state, ville_id) {
            state.ville_id = ville_id
        },

        updateAgence(state, id) {
            state.id = id
        },

        updateNbEnfant(state, nb_enfant) {
            state.nb_enfant = nb_enfant
        },

        updateNbAdulte(state, nb_adulte) {
            state.nb_adulte = nb_adulte
        },

        updateNbProduit(state, nb_produit) {
            state.nb_adulte = nb_produit
        },
        updateSaveClient(state, data) {
            state.saveClients = data
        },
        resetSaveClient(state) {
            Object.keys(state.saveClients).forEach(function (key) {
                state.saveClients[key] = ''
            });
        }
    },


    actions: {

        addAge({
            commit,
            state
        }, age) {
            commit('pushAge', age);
        },


        performLoginAction({
            commit
        }, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .post(`${apiDomain}/api/auth/login`, {
                        email: payload.email,
                        password: payload.password
                    })
                    .then(res => {
                        commit("SET_token", res.data.access_token);
                        commit("SET_user", res.data.user);
                        commit("SET_loggedIn", true)

                        resolve(res);
                    })
                    .catch(err => {
                        reject(err);
                    });

            })
        },

        performLoginPropAction({
            commit
        }, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .post(`${apiDomain}/api/login/prop`, {
                        email: payload.email,
                        password: payload.password
                    })
                    .then(res => {
                        commit("SET_token", res.data.access_token);
                        commit("SET_user", res.data.user);
                        commit("SET_loggedIn", true)

                        resolve(res);
                    })
                    .catch(err => {
                        reject(err);
                    });

            })
        },

        //login femme



performLoginFemmeAction({
    commit
}, payload) {
    return new Promise((resolve, reject) => {
        axios
            .post(`${apiDomain}/api/login/femme`, {
                telephone: payload.telephone,
                password: payload.password
            })
            .then(res => {
                commit("SET_token", res.data.access_token);
                commit("SET_user", res.data.user);
                commit("SET_femme", res.data.Femme);
                commit("SET_loggedIn", true)
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });

    })
},

//insvrire femme
performRegisterFemmeAction({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${apiDomain}/api/register/femme`, {
          nom: payload.nom,
          prenom: payload.prenom,
   /*        email: payload.email, */
          telephone: payload.telephone,


          ville_id: payload.ville_id,
          civilité: payload.civilité,
          password: payload.password,

          gouvernorat: payload.gouvernorat,
          zone_id: payload.zone_id,
          



          adresse: payload.adresse,
          latitude: payload.latitude,

          longitude: payload.longitude,
          
     

          /* ---------------- */


        })
        .then(res => {
            commit("SET_token", res.data.access_token);
            commit("SET_user", res.data.user);
            commit("SET_femme", res.data.Femme);
       
            commit("SET_loggedIn", true)
            resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

        performLoginPropRestauAction({
            commit
        }, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .post(`${apiDomain}/api/login/prop_restau`, {
                        email: payload.email,
                        password: payload.password
                    })
                    .then(res => {
                        commit("SET_token", res.data.access_token);
                        commit("SET_user", res.data.user);
                        commit("SET_loggedIn", true)

                        resolve(res);
                    })
                    .catch(err => {
                        reject(err);
                    });

            })
        },

        performLoginGuideAction({
            commit
        }, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .post(`${apiDomain}/api/login/guide`, {
                        email: payload.email,
                        password: payload.password
                    })
                    .then(res => {
                        commit("SET_token", res.data.access_token);
                        commit("SET_user", res.data.user);
                        commit("SET_loggedIn", true)

                        resolve(res);
                    })
                    .catch(err => {
                        reject(err);
                    });

            })
        },

        performLoginAgenceAction({
            commit
        }, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .post(`${apiDomain}/api/login/agence`, {
                        email: payload.email,
                        password: payload.password
                    })
                    .then(res => {
                        commit("SET_token", res.data.access_token);
                        commit("SET_user", res.data.user);
                        commit("SET_loggedIn", true)

                        resolve(res);
                    })
                    .catch(err => {
                        reject(err);
                    });

            })
        },

        /* *********** inscire direct dahsbord ****************** */
        updateVerifAction({ commit, state }, payload) {
            return new Promise((resolve, reject) => {
              axios
                .patch("https://etnafesapi20212018.etnafes.com/api/updateVerif", {
                 /*  active: payload.active, */
                 
                  token: state.token
                })
                .then(res => {
                
                    commit("SET_user", res.data.user);
                    commit("SET_prop", res.data.prop);
                    commit("SET_proprestau", res.data.proprestau);
                    commit("SET_propagence", res.data.propagence);
                    commit("SET_guide", res.data.guide);
                   
                    resolve(res);
                })
                .catch(err => {
                  reject(err);
                });
            });
          },

        performRegisterClientAction({ commit }, payload) {
            return new Promise((resolve, reject) => {
              axios
                .post(`${apiDomain}/api/register/client`, {
                  nom: payload.nom,
                  prenom: payload.prenom,
                  email: payload.email,
                  telephone: payload.telephone,


                  ville_id: payload.ville_id,
                  civilité: payload.civilité,
                  password: payload.password,

                  gouvernorat: payload.gouvernorat,
                  email: payload.email,
                  
                  agence_id: payload.agence_id,
             

                  /* ---------------- */


                })
                .then(res => {
                    commit("SET_token", res.data.access_token);
                    commit("SET_user", res.data.user);
                    commit("SET_prop", res.data.prop);
                    commit("SET_proprestau", res.data.proprestau);
                    commit("SET_propagence", res.data.propagence);
                    commit("SET_guide", res.data.guide);
                    commit("SET_loggedIn", true)
                    resolve(res);
                })
                .catch(err => {
                  reject(err);
                });
            });
          },

        performLoginClientAction({
            commit
        }, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .post(`${apiDomain}/api/login/client`, {
                        email: payload.email,
                        password: payload.password
                    })
                    .then(res => {
                        commit("SET_token", res.data.access_token);
                        commit("SET_user", res.data.user);
                        commit("SET_prop", res.data.prop);
                        commit("SET_proprestau", res.data.proprestau);
                        commit("SET_propagence", res.data.propagence);
                        commit("SET_guide", res.data.guide);
                        commit("SET_loggedIn", true)
                        resolve(res);
                    })
                    .catch(err => {
                        reject(err);
                    });

            })
        },
        //login facebook
        loginFacebooktAction({
            commit
        }) {
            return new Promise((resolve, reject) => {
                axios
                    .get(`${apiDomain}/api/login_fcb`)
                    .then(res => {
                        if (res.data.access_token) {
                            commit("SET_token", res.data.access_token);
                            commit("SET_user", res.data.appUser);

                            commit("SET_loggedIn", true);
                        } else {
                            commit("SET_loggedIn", false);
                        }

                        resolve(res);
                    })
                    .catch(err => {
                        reject(err);
                    });

            })
        },

        loginFacebookCallbackAction({
            commit
        }, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .get('https://etnafesapi20212018.etnafes.com/api/login/facebook/callback',

                        {
                            params: payload

                        }

                    )
                    .then(res => {
                        if (res.data.access_token) {
                            commit("SET_token", res.data.access_token);
                            commit("SET_user", res.data.appUser);

                            commit("SET_loggedIn", true);
                        } else {
                            reject(res);
                        }

                        resolve(res);
                    })
                    .catch(err => {
                        reject(err);
                    });

            })
        },

        performLogoutAction({
            commit,
            state
        }) {
            return new Promise((resolve, reject) => {
                axios
                    .post(`${apiDomain}/api/logout/prop`, {
                        token: state.token
                    })
                    .then(res => {
                        window.localStorage.clear(); //clear all localstorage
                        commit("SET_token", null);
                        commit("SET_loggedIn", false);
                        commit("SET_user", null);
                        resolve(res);
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
        },

        performLogoutActionAdmin({
            commit,
            state
        }) {
            return new Promise((resolve, reject) => {
                axios
                    .post(`${apiDomain}/api/auth/logout`, {
                        token: state.token
                    })
                    .then(res => {
                        commit("SET_token", null);
                        commit("SET_loggedIn", false);
                        commit("SET_user", null);
                        resolve(res);
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
        },

        performSaveAction({
            commit
        }, payload) {
            return new Promise((resolve, reject) => {
                axios
                    .post(`${apiDomain}/api/storeClient`, {
                        id: payload.id,
                        nom: payload.nom
                    })
                    .then(res => {
                        commit("SET_user", res.data.user);
                        resolve(res);
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
        },
    },

    getters: {

        ageList: (state) => {
            return state.ages;
        },
        get_user(state) {
            return state.user;
        },
        get_femme(state) {
            return state.femme;
        },

        get_prop(state) {
            return state.prop;
        },

        get_proprestau(state) {
            return state.proprestau;
        },

        get_propagence(state) {
            return state.propagence;
        },

        get_guide(state) {
            return state.guide;
        },

        get_loggedIn(state) {
            return state.loggedIn;
        },
    }
})