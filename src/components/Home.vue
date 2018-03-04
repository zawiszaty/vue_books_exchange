<template>
    <div class="home">
        <spinner v-if="check == 0 && mapsShowGetter == 0"></spinner>
        <google-maps name="test" :markers="markersGetter" v-else=""></google-maps>

    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import {mapGetters} from 'vuex'
    import {mapMutations} from 'vuex'
    import googleMaps from './google-maps/google-maps.vue'
    import spinner from './spinner/spinner.vue'
    import axios from 'axios'
    //    import * as VueGoogleMaps from 'vue2-google-maps';

    export default {
        name: 'Home',
        components: {
            'google-maps': googleMaps,
            'spinner': spinner
            // <my-component> will only be available in parent's template

        },
        data() {
            return {
                center: {lat: 52.242526, lng: 21.042648},
                check: 0,

            }
        },
        computed: {
            ...mapGetters([
                'markersGetter',
                'mapsShowGetter'
            ])
        },
        methods: {
            ...mapActions([
                'getMarkers', // map `this.increment()` to `this.$store.dispatch('increment')`
            ]),
            ...mapMutations([
                'loginMutations',
            ]),
            checkAuth() {
                axios.post(`${this.$store.state.apiLink}panel/auth`, {}, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    this.loginMutations();
                    this.check = 1
                }).catch(error => {
                    this.check = 1
                })
            }
        },
        created() {
            this.checkAuth();
            this.getMarkers()
        }

    }
</script>

<style lang="sass">
    @import 'main.sass'
    body
        overflow: auto hidden

    .home
        display: flex
        justify-content: center
        align-items: center

    .spinner
        width: 200px
        height: 200px
        margin: 50px 0


</style>
