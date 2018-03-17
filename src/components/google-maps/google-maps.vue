<template>
    <div class="google-map" :id="mapName"></div>
</template>

<script>
    import axios from 'axios';
    import swal from 'sweetalert';

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

                    let label_name = document.createElement('label');
                    label_name.innerHTML = '<b>Books Name:</b> ';
                    infowincontent.appendChild(label_name);

                    let name = document.createElement('p');
                    name.textContent = item['name'];
                    infowincontent.appendChild(name);

                    let label_description = document.createElement('label');
                    label_description.innerHTML = '<b>Book Description:</b> ';
                    infowincontent.appendChild(label_description);

                    let description = document.createElement('p');
                    description.textContent = item['description'];
                    infowincontent.appendChild(description);

                    let label_address = document.createElement('label');
                    label_address.innerHTML = '<b>Book Address:</b> ';
                    infowincontent.appendChild(label_address);

                    let text = document.createElement('text');
                    text.textContent = item['address'];
                    infowincontent.appendChild(text);

                    let label_type = document.createElement('label');
                    label_type.innerHTML = '</br><b>Book Type:</b> ';
                    infowincontent.appendChild(label_type);

                    let type = document.createElement('p');
                    type.textContent = item['type'];
                    infowincontent.appendChild(type);

                    let label_input = document.createElement('label');
                    label_input.htmlFor = 'descriptionOffer';
                    label_input.innerHTML = '<b>Description</b> *The field is required';
                    infowincontent.appendChild(label_input);

                    let descriptionOffer = document.createElement('input');
                    descriptionOffer.setAttribute('id', 'descriptionOffer');
                    infowincontent.appendChild(descriptionOffer);

                    let label_select = document.createElement('label');
                    label_select.innerHTML = '<b>Your Books:</b> ';
                    infowincontent.appendChild(label_select);

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
                        axios.put(`${this.$store.state.apiLink}panel/add/offer`, offer, {
                            headers: {
                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                            }
                        }).then(response => {
                            swal({
                                title: "The offer was sended",
                                icon: "success",
                                button: "Close",
                            });
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