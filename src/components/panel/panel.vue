<template>
    <div class="panel">
        <spinner class="user-books__spinner" v-if="check == 0"></spinner>
            <div class="new-offer" v-if="check == 1">
                <h1 class="new-offer__header">Offers Received</h1>
                <spinner class="user-books__spinner" v-if="new_offer == 0"></spinner>
                <div v-for="item in acceptedOfferGetters" class="new-offer__wraper" v-else="">
                    <ul class="accepted new-offer__list" v-if="item['accepted'] == 1">
                        <li>{{item['offered_book']['name']}}</li>
                        <li>{{item['offered_book']['user']['username']}}</li>
                        <li>{{item['required_book']['name']}}</li>
                        <li>{{item['required_book']['user']['username']}}</li>
                        <li v-if="item['seen'] == 1">Seen: Yes</li>
                        <li v-else="">Seen: No</li>
                    </ul>
                    <ul class="rejected new-offer__list" v-else-if="item['rejected'] == 1">
                        <li>{{item['offered_book']['name']}}</li>
                        <li>{{item['offered_book']['user']['username']}}</li>
                        <li>{{item['required_book']['name']}}</li>
                        <li>{{item['required_book']['user']['username']}}</li>
                        <li v-if="item['seen'] == 1">Seen: Yes</li>
                        <li v-else="">Seen: No</li>
                    </ul>
                    <ul v-else="" class="new-offer__list">
                        <li>{{item['offered_book']['name']}}</li>
                        <li>{{item['offered_book']['user']['username']}}</li>
                        <li>{{item['required_book']['name']}}</li>
                        <li>{{item['required_book']['user']['username']}}</li>
                        <li v-if="item['seen'] == 1">Seen: Yes</li>
                        <li v-else="">Seen: No</li>
                    </ul>
                </div>
            </div>
            <div class="accepted-offer" v-if="check == 1">
                <h1 class="accepted-offer__header">New Offer</h1>
                <spinner class="user-books__spinner" v-if="new_offer == 0"></spinner>
                <div v-for="item in acceptedOfferGetters" class="new-offer__wraper" v-else="">
                    <ul class="accepted accepted-offer__list" v-if="item['accepted'] == 1">
                        <li>{{item['offered_book']['name']}}</li>
                        <li>{{item['offered_book']['user']['username']}}</li>
                        <li>{{item['required_book']['name']}}</li>
                        <li>{{item['required_book']['user']['username']}}</li>

                    </ul>
                    <ul class="rejected accepted-offer__list" v-else-if="item['rejected'] == 1">
                        <li>{{item['offered_book']['name']}}</li>
                        <li>{{item['offered_book']['user']['username']}}</li>
                        <li>{{item['required_book']['name']}}</li>
                        <li>{{item['required_book']['user']['username']}}</li>

                    </ul>
                    <ul v-else="" class="accepted-offer__list">
                        <li>{{item['offered_book']['name']}}</li>
                        <li>{{item['offered_book']['user']['username']}}</li>
                        <li>{{item['required_book']['name']}}</li>
                        <li>{{item['required_book']['user']['username']}}</li>
                        <li>
                            <button @click="acceptedOffer(item['idoffer'])" class="btn-user">Accepted</button>
                            <button class="btn-user">Rejected </button>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="user-books" v-if="check == 1">
                <h1 class="user-books__header">Edit or Delete your Books</h1>
                <spinner class="user-books__spinner" v-if="user_books == 0"></spinner>
                <ul v-for="item in books" class="user-books__list" v-else="">
                    <li>{{item.name}}</li>
                    <li>{{item.address}}</li>
                    <li>
                        <button @click="deleteBook(item.idbook)" class="btn-user">Delete</button>
                        <button @click="getSingleBook(item.idbook); showModal = true" class="btn-user">Edit</button>
                    </li>
                </ul>
                <modal v-if="showModal" @close="showModal = false">
                    <form slot="body">
                        <label for="name">name</label>
                        <input type="text" id="name" v-model="editBook['name']">
                        <label for="description">description</label>
                        <input type="text" id="description" v-model="editBook['description']">
                        <label for="type">type</label>
                        <input type="text" id="type" v-model="editBook['type']">
                        <label for="address">address</label>
                        <input id="address" v-model="editBook['address']" class="controls" type="text"
                               placeholder="Search your books address. Start from the street">
                        <label for="category"></label>
                        <select id="category" v-model="editBook['categorycategory']"
                                :value="editBook['categorycategory']['idcategory']">
                            <option value="1">1</option>
                        </select>
                        <button v-on:click="sendEditBook" type="submit">Add</button>
                    </form>
                </modal>
            </div>
        </div>
    </div>
    <!--<div class="user-books__map">-->
    <!--<google-maps :markers="books" v-if="mapsShowGetter == 1"></google-maps>-->
    <!--</div>-->
</template>

<script>

    import axios from 'axios';
    import modal from './../modal/modal.vue';
    import googleMaps from './../google-maps/google-maps.vue'
    import spinner from './../spinner/spinner.vue'
    import {mapMutations} from 'vuex'
    import {mapGetters} from 'vuex'

    export default {
        name: 'panel',
        components: {
            'modal': modal,
            'google-maps': googleMaps,
            'spinner': spinner
        },
        computed: {
            ...mapGetters([
                'acceptedOfferGetters',
                'requestedOfferGetters',
            ])
        },
        data() {
            return {
                books: {},
                editBook: {},
                showModal: false,
                mapsShowGetter: 0,
                user_books: 0,
                new_offer: 0,
                check: 0
            }
        },
        methods: {
            ...mapMutations([
                'acceptedOfferMutations',
                'requestedOfferMutations',
                'loginMutations',
            ]),
            getAcceptedOffer() {
                let id = localStorage.getItem('userId');
                axios.get(`${this.$store.state.apiLink}get/accepted/offer/${id}`)
                    .then(response => {
                        this.acceptedOfferMutations(response.data);
                        this.new_offer = 1

                    })
            },
            getAllUserBooks() {
                axios.get(`${this.$store.state.apiLink}get/user/${localStorage.getItem('userId')}/book`)
                    .then(response => {
                        this.books = response.data;
                        this.mapsShowGetter = 1;
                        this.user_books = 1
                    })
            },
            deleteBook(id) {
                axios.delete(`${this.$store.state.apiLink}delete/${id}/book`)
                    .then(response => {
                        this.getAllUserBooks()
                    })
            },
            getSingleBook(id) {
                axios.get(`${this.$store.state.apiLink}panel/get/book/${id}`, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                    .then(response => {
                        this.editBook = response.data
                    })
            },
            sendEditBook(e) {
                e.preventDefault();
                axios.post(`${this.$store.state.apiLink}edit/book`, this.editBook, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    this.getAllUserBooks();
                })
            },
            checkAuth() {
                axios.post(`${this.$store.state.apiLink}panel/auth`, {}, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    this.getAllUserBooks();
                    this.getAcceptedOffer();
                    this.check = 1;
                    this.loginMutations();
                }).catch(error => {
                    this.$router.push('/login');
                })

            }
        }, created() {
            this.checkAuth();
        }
    }
</script>
<style lang="sass">
    @import "panel"
    .user-books__spinner
        width: 200px
        height: 200px
        margin: auto
</style>