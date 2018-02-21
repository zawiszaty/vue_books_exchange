<template>
    <div class="home">
        <google-maps name="test" :markers="markersGetter" v-if="mapsShowGetter == 1"></google-maps>
        <div v-else="">
            <spinner></spinner>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import {mapGetters} from 'vuex'
    import googleMaps from './google-maps/google-maps.vue'
    import spinner from './spinner/spinner.vue'
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
        },
        created() {
            this.getMarkers()
        }

    }
</script>

<style lang="sass">
    @import 'main.sass'

    .map
        width: 100vw
        height: 100vh


</style>
