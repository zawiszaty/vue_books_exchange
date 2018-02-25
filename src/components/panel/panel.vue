<template>
    <div class="panel">
        <div class="user-books">
            <ul v-for="item in books">
                <li>{{item.name}}</li>
                <li>{{item.address}}</li>
                <li>
                    <button @click="deleteBook(item.idbook)">delete</button>
                </li>
                <li>
                    <button @click="getSingleBook(item.idbook); showModal = true">edit</button>
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
        <div class="user-books__map">
            <google-maps :markers="books" v-if="mapsShowGetter == 1"></google-maps>
        </div>
    </div>
</template>

<script>

    import axios from 'axios';
    import modal from './../modal/modal.vue';
    import googleMaps from './../google-maps/google-maps.vue'

    export default {
        name: 'panel',
        components: {
            'modal': modal,
            'google-maps': googleMaps
        },
        data() {
            return {
                books: {},
                editBook: {},
                showModal: false,
                mapsShowGetter: 0
            }
        },
        methods: {
            getAllUserBooks() {
                axios.get(`${this.$store.state.apiLink}get/user/${localStorage.getItem('userId')}/book`)
                    .then(response => {
                        this.books = response.data;
                        this.mapsShowGetter = 1;
                    })
            },
            deleteBook(id) {
                axios.delete(`${this.$store.state.apiLink}delete/${id}/book`)
                    .then(response => {
                        this.getAllUserBooks()
                    })
            },
            getSingleBook(id) {
                axios.get(`${this.$store.state.apiLink}panel/get/${id}/book`, {
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
            }
        }, created() {
            this.getAllUserBooks()
        }
    }
</script>
<style lang="sass">
    @import "panel"
</style>