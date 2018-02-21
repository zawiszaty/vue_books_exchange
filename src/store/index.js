import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        apiLink: "http://localhost:8080/api/",
        mapsShow: 0,
        markers: [],
        login: 0
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
        }
    },
    mutations: {
        mapsShowMutations(state){
            state.mapsShow = 1
        },
        markersMutations(state, payload) {
            state.markers = payload
        },
        loginMutations(state){
            if (state.login === 0)
            {
                state.login = 1
            } else {
                state.login = 0
            }

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