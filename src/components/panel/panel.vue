<template>
    <div class="panel">

        <spinner class="user-books__spinner" v-if="check == 0"></spinner>
        <div class="new-offer" v-if="check == 1">
            <h1 class="new-offer__header">Offers Send</h1>
            <spinner class="user-books__spinner" v-if="send_offer == 0"></spinner>
            <div v-for="item in sendedOfferGetters" class="new-offer__wraper" v-else="">
                <ul class="accepted new-offer__list" v-if="item['accepted'] == 1">
                    <li>Offered Book: <b>{{item['offered_book']['name']}}</b></li>
                    <li>Offered User: <b>{{item['offered_book']['user']['username']}}</b></li>
                    <li>Required Book: <b>{{item['required_book']['name']}}</b></li>
                    <li>Required User: <b>{{item['required_book']['user']['username']}}</b></li>
                    <li v-if="item['seen'] == 1">Seen: <b>Yes</b></li>
                    <li v-else=""><b>Seen: No</b></li>
                    <li>Please contact him by email: <b>{{item['required_book']['user']['email']}}</b></li>
                </ul>
                <ul class="rejected new-offer__list" v-else-if="item['rejected'] == 1">
                    <li>Offered Book: <b>{{item['offered_book']['name']}}</b></li>
                    <li>Offered User: <b>{{item['offered_book']['user']['username']}}</b></li>
                    <li>Required Book: <b>{{item['required_book']['name']}}</b></li>
                    <li>Required User: <b>{{item['required_book']['user']['username']}}</b></li>
                    <li v-if="item['seen'] == 1">Seen: <b>Yes</b></li>
                    <li v-else="">Seen: No</li>
                </ul>
                <ul v-else="" class="new-offer__list">
                    <li>Offered Book: <b>{{item['offered_book']['name']}}</b></li>
                    <li>Offered User: <b>{{item['offered_book']['user']['username']}}</b></li>
                    <li>Required Book: <b>{{item['required_book']['name']}}</b></li>
                    <li>Required User: <b>{{item['required_book']['user']['username']}}</b></li>
                    <li v-if="item['seen'] == 1">Seen: <b>Yes</b></li>
                    <li v-else="">Seen: <b>No</b>></li>
                </ul>
            </div>
        </div>
        <div class="accepted-offer" v-if="check == 1">
            <h1 class="accepted-offer__header">New Offer</h1>
            <spinner class="user-books__spinner" v-if="new_offer == 0"></spinner>
            <div v-for="item in newOfferGetters" class="new-offer__wraper" v-else="">
                <ul class="accepted accepted-offer__list" v-if="item['accepted'] == 1">
                    <li>Offered Book: <b>{{item['offered_book']['name']}}</b></li>
                    <li>Offered User: <b>{{item['offered_book']['user']['username']}}</b></li>
                    <li>Required Book: <b>{{item['required_book']['name']}}</b></li>
                    <li>Required User: <b>{{item['required_book']['user']['username']}}</b></li>

                </ul>
                <ul class="rejected accepted-offer__list" v-else-if="item['rejected'] == 1">
                    <li>Offered Book: <b>{{item['offered_book']['name']}}</b></li>
                    <li>Offered User: <b>{{item['offered_book']['user']['username']}}</b></li>
                    <li>Required Book: <b>{{item['required_book']['name']}}</b></li>
                    <li>Required User: <b>{{item['required_book']['user']['username']}}</b></li>

                </ul>
                <ul v-else="" class="accepted-offer__list">
                    <li>Offered Book: <b>{{item['offered_book']['name']}}</b></li>
                    <li>Offered User: <b>{{item['offered_book']['user']['username']}}</b></li>
                    <li>Required Book: <b>{{item['required_book']['name']}}</b></li>
                    <li>Required User: <b>{{item['required_book']['user']['username']}}</b></li>
                    <li>
                        <button @click="acceptedOffer(item['idoffer'])" class="btn-user">Accepted</button>
                        <button class="btn-user" @click="rejectedOffer(item['idoffer'])">Rejected</button>
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
                    <button @click="getSingleBook(item.idbook); showModal = true ;google_map()" class="btn-user">Edit
                    </button>
                </li>
            </ul>
            <modal v-if="showModal" @close="showModal = false">
                <h1 slot="header" class="modal-header">Edit Book</h1>
                <form slot="body" class="modal__form">
                    <label for="name">name</label>
                    <input type="text" id="name" v-model="editBook['name']" class="modal__input">
                    <label for="description">description</label>
                    <input type="text" id="description" v-model="editBook['description']" class="modal__input">
                    <label for="type">House type</label>
                    <input type="text" id="type" v-model="editBook['type']" class="modal__input">
                    <div class="form-group">
                        <label for="edit-address">address</label>
                        <input id="edit-address" type="text" v-model="editBook['address']"
                               placeholder="Search your books address. Start from the street">
                    </div>
                    <button v-on:click="sendEditBook" type="submit" class="btn-edit">Edit</button>
                    <div class="map-editBook">
                        <div id="map-editBook">23</div>
                    </div>
                </form>
            </modal>
        </div>

    </div>
</template>

<script>
    let bookLat = 0;
    let bookLng = 0;

    import axios from 'axios';
    import modal from './../modal/modal.vue';
    import googleMaps from './../google-maps/google-maps.vue';
    import spinner from './../spinner/spinner.vue';
    import {mapMutations} from 'vuex';
    import {mapGetters} from 'vuex';
    import swal from 'sweetalert';


    export default {
        name: 'panel',
        components: {
            'modal': modal,
            'google-maps': googleMaps,
            'spinner': spinner
        },
        computed: {
            ...mapGetters([
                'sendedOfferGetters',
                'newOfferGetters',
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
                send_offer: 0,
                check: 0,
            }
        },
        methods: {
            ...mapMutations([
                'sendedOffer',
                'newOfferMutations',
                'loginMutations',
            ]),
            getAcceptedOffer() {
                axios.get(`${this.$store.state.apiLink}panel/get/accepted/offer`, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                    .then(response => {
                        // this.$store.state.sendedOffer = response.data;
                        this.sendedOffer(response.data);
                        this.send_offer = 1;
                        this.getNewOffer();

                    })
            },
            seenNewOffer() {
                let data = {
                    idoffer: []
                };
                let offers = this.newOfferGetters;
                offers.forEach(item => {
                    if (item['seen'] == 0) {
                        data['idoffer'].push(item['idoffer'])
                    }
                });
                if (data.idoffer.length > 0) {
                    axios.post(`${this.$store.state.apiLink}panel/seen/offer`, data, {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    })
                        .then(response => {
                            console.log('dziala');
                        })
                }
            },
            getNewOffer() {
                axios.get(`${this.$store.state.apiLink}panel/get/new/user/offer`, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    this.newOfferMutations(response.data);
                    this.new_offer = 1;
                    this.seenNewOffer();

                })
            },
            getAllUserBooks() {
                axios.get(`${this.$store.state.apiLink}panel/get/user/book`, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
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
                        swal({
                            title: "The book was removed",
                            icon: "success",
                            button: "Close",
                        });
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
                let input = document.querySelector('#edit-address');
                if (bookLat != 0) {
                    this.editBook['lat'] = bookLat;
                }
                if (bookLng != 0) {
                    this.editBook['lng'] = bookLng;a
                }


                this.editBook['address'] = input.value;

                axios.post(`${this.$store.state.apiLink}panel/edit/book`, this.editBook, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    this.getAllUserBooks();
                    swal({
                        title: "The book was edited",
                        icon: "success",
                        button: "Close",
                    });
                }).catch(e => {
                    swal({
                        title: "error",
                        icon: "error",
                        button: "Close",
                    });
                })
            },
            checkAuth() {
                    axios.post(`${this.$store.state.apiLink}panel/auth`, {}, {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    }).then(response => {
                        this.check = 1;
                        this.getAllUserBooks();
                        this.getAcceptedOffer();
                        this.loginMutations();
                    }).catch(error => {
                        this.$router.push('/login');
                    })

            },
            acceptedOffer(id) {
                let data = {
                    idoffer: id
                }
                axios.post(`${this.$store.state.apiLink}panel/accepted/offer`, data, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    this.getNewOffer()
                    swal({
                        title: "The offer was accepted",
                        icon: "success",
                        button: "Close",
                    });
                })
            },
            rejectedOffer(id) {
                let data = {
                    idoffer: id
                };
                console.log(data);
                axios.post(`${this.$store.state.apiLink}panel/rejected/offer`, data, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    this.getNewOffer();
                    swal({
                        title: "The offer was rejected",
                        icon: "success",
                        button: "Close",
                    });
                })
            },
            google_map() {
                setTimeout(() => {
                    console.log("dziala");
                    var map = new google.maps.Map(document.getElementById('map-editBook'), {
                        center: {lat: 52.229676, lng: 21.012229},
                        zoom: 7,
                        mapTypeId: 'roadmap'
                    });

                    // Create the search box and link it to the UI element.
                    var input = document.getElementById('edit-address');
                    var searchBox = new google.maps.places.SearchBox(input);
//                map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

                    // Bias the SearchBox results towards current map's viewport.
                    map.addListener('bounds_changed', function () {
                        searchBox.setBounds(map.getBounds());
                    });

                    var markers = [];
                    // Listen for the event fired when the user selects a prediction and retrieve
                    // more details for that place.
                    searchBox.addListener('places_changed', function () {
                        var places = searchBox.getPlaces();

                        if (places.length == 0) {
                            return;
                        }

                        // Clear out the old markers.
                        markers.forEach(function (marker) {
                            marker.setMap(null);
                        });
                        markers = [];

                        // For each place, get the icon, name and location.
                        var bounds = new google.maps.LatLngBounds();
                        places.forEach(function (place) {
                            if (!place.geometry) {
                                console.log("Returned place contains no geometry");
                                return;
                            }
                            var icon = {
                                url: place.icon,
                                size: new google.maps.Size(71, 71),
                                origin: new google.maps.Point(0, 0),
                                anchor: new google.maps.Point(17, 34),
                                scaledSize: new google.maps.Size(25, 25)
                            };

                            // Create a marker for each place.
                            markers.push(new google.maps.Marker({
                                map: map,
                                icon: icon,
                                title: place.name,
                                position: place.geometry.location
                            }));

                            bookLat = place.geometry.location.lat();
                            bookLng = place.geometry.location.lng();
                            if (place.geometry.viewport) {
                                // Only geocodes have viewport.
                                bounds.union(place.geometry.viewport);
                            } else {
                                bounds.extend(place.geometry.location);
                            }
                        });
                        map.fitBounds(bounds);
                    });
                }, 2000);
            }
        },
        created() {
            this.checkAuth();
        }, mounted: function () {
//            this.google_map()
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