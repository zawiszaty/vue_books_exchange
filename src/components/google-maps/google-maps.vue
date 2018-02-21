<template>
        <div class="google-map" :id="mapName"></div>
</template>

<script>
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

                let addOfferButton = document.createElement('button');
                addOfferButton.textContent = "Send offer";
                addOfferButton.className = "addOfferButton";
                infowincontent.appendChild(addOfferButton);

                const marker = new google.maps.Marker({
                    position,
                    map
                });

                marker.addListener('click', function() {
                    infoWindow.setContent(infowincontent);
                    infoWindow.open(map, marker);
                });
            })
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
        width: 100vw
        height: 85vh
        margin: 0 auto
        background: gray

</style>