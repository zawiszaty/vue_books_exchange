<template>
    <div class="login">
        <form class="login__panel__form">
            <label for="login" class="login__form__label">Login</label>
            <input type="email" id="login" v-model="userData['_username']" class="login__panel__form__item">
            <label for="password" class="login__form__label">Password</label>
            <input type="password" id="password" v-model="userData['_password']" class="login__panel__form__item">
            <button type="submit" @click="login" class="login__panel__form__button">Login</button>
        </form>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import {mapGetters} from 'vuex'
    import {mapMutations} from 'vuex'
    import axios from 'axios'
    import swal from 'sweetalert'

    export default {
        name: 'login',
        components: {},
        data() {
            return {
                userData: {
                    _username: '',
                    _password: ''
                }
            }
        },
        computed: {
            ...mapGetters([])
        },
        methods: {
            ...mapMutations([
                'loginMutations'
            ]),
            login(e) {
                e.preventDefault();
                axios.post(this.$store.state.apiLink + 'login_check', this.userData)
                    .then(response => {
                        localStorage.setItem('token', response.data['token']);
                        this.loginMutations();
                        this.$router.push('/panel');
                    })
                    .catch(error => {
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
                    this.$router.push('/panel');
                })
            }
        },
        created() {
            this.checkAuth()
        }

    }
</script>

<style lang="sass">
    @import "login"
</style>
