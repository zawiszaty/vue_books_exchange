<template>
    <div class="google-map" :id="mapName"></div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'google-map',
        props: ['name', 'markers'],
        data: function () {
            return {
                mapName: this.name + "-map",
            }
        },
        mounted: function () {
            const element = document.getElementById(this.mapName)
            const options = {
                zoom: 7,
                center: new google.maps.LatLng(51.501527, 21.012229)
            }
            const map = new google.maps.Map(element, options);


            let infoWindow = new google.maps.InfoWindow;

            let userCategory = {};

            axios.get(`${this.$store.state.apiLink}panel/get/user/book`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                    userCategory = response.data;

                    this.markers.forEach(item => {
                        const position = new google.maps.LatLng(item['lat'], item['lng']);
                        let infowincontent = document.createElement('div');
                        infowincontent.className = "infowinContent"

                        let name = document.createElement('p');
                        name.textContent = item['name'];
                        infowincontent.appendChild(name);

                        let description = document.createElement('p');
                        description.textContent = item['description'];
                        infowincontent.appendChild(description);

                        let text = document.createElement('text');
                        text.textContent = item['address'];
                        infowincontent.appendChild(text);

                        let type = document.createElement('p');
                        type.textContent = item['type'];
                        infowincontent.appendChild(type);

                        let descriptionOffer = document.createElement('input');
                        infowincontent.appendChild(descriptionOffer);

                        let select = document.createElement('select');
                        infowincontent.appendChild(select);

                        userCategory.forEach(item => {
                            let option = document.createElement('option');
                            option.value = item.idbook;
                            option.text = item.name
                            select.appendChild(option);
                        });

                        let addOfferButton = document.createElement('button');
                        addOfferButton.textContent = "Send offer";
                        addOfferButton.className = "addOfferButton";
                        addOfferButton.addEventListener('click', (e) => {
                            e.preventDefault();
                            let offer = {
                                description: descriptionOffer.value,
                                offeredBook: select.value,
                                requiredBook: item.idbook,
                                requiredUser: item['user']['id']
                            }
                            axios.put(`${this.$store.state.apiLink}panel/add/offer`,offer, {
                                headers: {
                                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                                }
                            }).then(response => {
                                console.log('dziala')
                            })
                        });
                        infowincontent.appendChild(addOfferButton);


                        const marker = new google.maps.Marker({
                            position,
                            map
                        });

                        marker.addListener('click', function () {
                            infoWindow.setContent(infowincontent);
                            infoWindow.open(map, marker);
                        });
                    })
                }).catch(error => {
                this.markers.forEach(item => {
                    const position = new google.maps.LatLng(item['lat'], item['lng']);
                    let infowincontent = document.createElement('div');
                    infowincontent.className = "infowinContent"

                    let name = document.createElement('p');
                    name.textContent = item['name'];
                    infowincontent.appendChild(name);

                    let description = document.createElement('p');
                    description.textContent = item['description'];
                    infowincontent.appendChild(description);

                    let text = document.createElement('text');
                    text.textContent = item['address'];
                    infowincontent.appendChild(text);

                    let type = document.createElement('p');
                    type.textContent = item['type'];
                    infowincontent.appendChild(type);

                    let descriptionOffer = document.createElement('input');
                    infowincontent.appendChild(descriptionOffer);

                    let select = document.createElement('select');
                    infowincontent.appendChild(select);

                    let addOfferButton = document.createElement('button');
                    addOfferButton.textContent = "Send offer";
                    addOfferButton.className = "addOfferButton--disable";
                    infowincontent.appendChild(addOfferButton);


                    const marker = new google.maps.Marker({
                        position,
                        map
                    });

                    marker.addListener('click', function () {
                        infoWindow.setContent(infowincontent);
                        infoWindow.open(map, marker);
                    });
                })
            });


        }
    };
</script>
<style lang="sass">
    @import "google-map"
    .infowinContent
        text-align: center
        width: auto
        max-width: 300px
        font-size: 1rem
        & > p
            margin: 0.5em 0
            & > p:last-child
                margin-bottom: 0

    .google-map
        width: 100%
        height: 85vh
        background: gray

</style>