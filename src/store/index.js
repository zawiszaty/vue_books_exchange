import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        apiLink: "http://localhost:8080/api/",
        mapsShow: 0,
        markers: [],
        login: 0,
        sendedOffer: {},
        newOffer: {}
    },
    getters: {
        testGetter: state => {
            return state.test
        },
        mapsShowGetter: state => {
            return state.mapsShow
        },
        markersGetter: state => {
            return state.markers
        },
        loginGetters: state => {
            return state.login
        },
        sendedOfferGetters: state => {
            return state.sendedOffer
        },
        newOfferGetters: state => {
            return state.newOffer
        }
    },
    mutations: {
        mapsShowMutations(state) {
            state.mapsShow = 1
        },
        markersMutations(state, payload) {
            state.markers = payload
        },
        loginMutations(state) {
           state.login = 1
        },
        logoutMutations(state) {
            state.login = 0
        },
        sendedOffer(state, payload) {
            state.sendedOffer = payload
        },
        newOfferMutations(state, payload) {
            state.newOffer = payload
        }
    },
    actions: {
        getMarkers(context) {
            axios.get('http://localhost:8080/api/get/all/books')
                .then(function (response) {
                    context.commit('markersMutations', response.data)
                    context.commit('mapsShowMutations')
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
})