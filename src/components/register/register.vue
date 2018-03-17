<template>
    <div class="register">
        <form class="register__panel__form">
            <h2 class="register__panel__form__header">Register</h2>
            <div class="form-group">
                <label for="username">UserName</label>
                <input type="text" id="username" v-model="userData['username']" class="register__panel__form__item">
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" v-model="userData['email']" class="register__panel__form__item">
            </div>
            <div class="form-group">
                <label for="password_first">Password</label>
                <input type="password" id="password_first" v-model="userData['plainPassword']['first']"
                       class="register__panel__form__item">
            </div>
            <div class="form-group">
                <label for="password_two">Password Confirm</label>
                <input type="password" id="password_two" v-model="userData['plainPassword']['second']"
                       class="register__panel__form__item">
            </div>
            <button type="submit" class="register__panel__form__button" @click="registerNewUser">Register</button>
        </form>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import {mapGetters} from 'vuex'
    import {mapMutations} from 'vuex'
    import axios from 'axios'
    import swal from 'sweetalert';

    export default {
        name: 'login',
        components: {},
        data() {
            return {
                userData: {
                    username: '',
                    password: '',
                    email: '',
                    plainPassword: {
                        first: '',
                        second: ''
                    }
                }
            }
        },
        computed: {},
        methods: {
            registerNewUser(e) {
                e.preventDefault();
                axios.post(`${this.$store.state.apiLink}register`, this.userData)
                    .then(response => {
                        this.$router.push('/login');
                    })
                    .catch(e => {
                        swal({
                            title: "error",
                            icon: "error",
                            button: "Close",
                        });
                    })
            }
        },
        created() {

        }

    }
</script>

<style lang="sass">
    @import "register"
</style>
