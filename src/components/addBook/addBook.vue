<template>
    <div class="panel">
        <div class="sidePanel">
            <div class="addBook">
                <h1 class="addBook__header">
                    Add new Book
                </h1>
                <form>
                    <label for="name">name</label>
                    <input type="text" id="name" class="addBook__form__input" v-model="newBook['name']">
                    <label for="description">description</label>
                    <input type="text" id="description" class="addBook__form__input" v-model="newBook['description']">
                    <label for="type">type</label>
                    <input type="text" id="type" class="addBook__form__input" v-model="newBook['type']">
                    <label for="address">address</label>
                    <input id="address" v-model="newBook['address']"  class="addBook__form__input controls" type="text"
                           placeholder="Search your books address. Start from the street">
                    <label for="category"></label>
                    <select id="category" class="addBook__form__input" v-model="newBook['categorycategory']">
                        <option value="1">1</option>
                    </select>
                    <button v-on:click="addNewBook" class="btn-submit" type="submit">Add</button>
                </form>
            </div>

        </div>
        <!--<div class="map">-->
            <!--<div id="map"></div>-->
        <!--</div>-->

    </div>
</template>

<script>
    import userMap from './../userMap/userMap.vue'
    import axios from 'axios';

    let bookLat = 0;
    let bookLng = 0;
    export default {
        name: 'addBook',
        data() {
            return {
                newBook: {
                    name: '',
                    description: '',
                    type: '',
                    address: '',
                    lat: 0,
                    lng: 0,
                    categorycategory: '',
                    user: ''
                },
            }
        },
        methods: {
            addNewBook(e) {
                e.preventDefault();
                this.newBook['lat'] = bookLat;
                this.newBook['lng'] = bookLng;
                axios.put(this.$store.state.apiLink + 'add/book', this.newBook, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                        console.log('dziala');
                    }
                )
            }
        },
        created() {
            axios.post(this.$store.state.apiLink + 'panel/auth', [], {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                localStorage.setItem('userId', response.data.userId);
                this.newBook['user'] = response.data.userId;
            })
        },
        mounted: function () {

                var map = new google.maps.Map(document.getElementById('map'), {
                    center: {lat: 52.229676, lng: 21.012229},
                    zoom: 7,
                    mapTypeId: 'roadmap'
                });

                // Create the search box and link it to the UI element.
                var input = document.getElementById('address');
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
            }
    }
</script>

<style lang="sass">
    @import "panel"
</style>
