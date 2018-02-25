<template>
    <div class="offers">
        <div class="rejected-offer">rejected</div>
        <div class="new-offer">
            <div v-for="item in acceptedOfferGetters">
                <ul class="accepted" v-if="item['accepted'] == 1">
                    <li>{{item['offered_book']['name']}}</li>
                    <li>{{item['offered_book']['user']['username']}}</li>
                    <li>{{item['required_book']['name']}}</li>
                    <li>{{item['required_book']['user']['username']}}</li>
                    <li v-if="item['seen'] == 1">Seen: Yes</li>
                    <li v-else="">Seen: No</li>
                </ul>
                <ul class="rejected" v-else-if="item['rejected'] == 1">
                    <li>{{item['offered_book']['name']}}</li>
                    <li>{{item['offered_book']['user']['username']}}</li>
                    <li>{{item['required_book']['name']}}</li>
                    <li>{{item['required_book']['user']['username']}}</li>
                    <li v-if="item['seen'] == 1">Seen: Yes</li>
                    <li v-else="">Seen: No</li>
                </ul>
                <ul v-else="">
                    <li>{{item['offered_book']['name']}}</li>
                    <li>{{item['offered_book']['user']['username']}}</li>
                    <li>{{item['required_book']['name']}}</li>
                    <li>{{item['required_book']['user']['username']}}</li>
                    <li v-if="item['seen'] == 1">Seen: Yes</li>
                    <li v-else="">Seen: No</li>
                </ul>
            </div>
        </div>
        <div class="accepted-offer">
            <div v-for="item in acceptedOfferGetters">
                <ul class="accepted" v-if="item['accepted'] == 1">
                    <li>{{item['offered_book']['name']}}</li>
                    <li>{{item['offered_book']['user']['username']}}</li>
                    <li>{{item['required_book']['name']}}</li>
                    <li>{{item['required_book']['user']['username']}}</li>

                </ul>
                <ul class="rejected" v-else-if="item['rejected'] == 1">
                    <li>{{item['offered_book']['name']}}</li>
                    <li>{{item['offered_book']['user']['username']}}</li>
                    <li>{{item['required_book']['name']}}</li>
                    <li>{{item['required_book']['user']['username']}}</li>

                </ul>
                <ul v-else="">
                    <li>{{item['offered_book']['name']}}</li>
                    <li>{{item['offered_book']['user']['username']}}</li>
                    <li>{{item['required_book']['name']}}</li>
                    <li>{{item['required_book']['user']['username']}}</li>
                    <li><button>Accepted</button><button>Rejectedgit </button></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import {mapMutations} from 'vuex'
    import {mapGetters} from 'vuex'

    export default {
        name: 'offers',
        computed: {
            ...mapGetters([
                'acceptedOfferGetters',
                'requestedOfferGetters',
            ])
        },
        methods: {
            ...mapMutations([
                'acceptedOfferMutations',
                'requestedOfferMutations',
            ]),
            getAcceptedOffer() {
                let id = localStorage.getItem('userId');
                axios.get(`${this.$store.state.apiLink}get/accepted/offer/${id}`)
                    .then(response => {
                        this.acceptedOfferMutations(response.data)
                    })
            },
            getRequireOffer() {
                let id = localStorage.getItem('userId');
                axios.get(`${this.$store.state.apiLink}get/requested/offer/${id}`)
                    .then(response => {
                        this.requestedOfferMutations(response.data)
                    })
            },
        }, created() {
            this.getAcceptedOffer();
            this.getRequireOffer();
        }
    }
</script>
<style lang="sass">
    @import "offers"
</style>
