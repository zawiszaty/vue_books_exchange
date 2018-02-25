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
        acceptedOffer: {},
        requestedOffer: {}
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
        acceptedOfferGetters: state => {
            return state.acceptedOffer
        },
        requestedOfferGetters: state => {
            return state.requestedOffer
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
            if (state.login === 0) {
                state.login = 1
            } else {
                state.login = 0
            }
        },
        acceptedOfferMutations(state, payload) {
            state.acceptedOffer = payload
        },
        requestedOfferMutations(state, payload) {
            state.requestedOffer = payload
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