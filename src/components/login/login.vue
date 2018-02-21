<template>
    <div class="login">
        <div class="panel">
            <form class="login__panel__form">
                {{userData}}
                <input type="email" v-model="userData['_username']">
                <input type="password" v-model="userData['_password']">
                <button type="submit" @click="login">Login</button>
            </form>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import {mapGetters} from 'vuex'
    import {mapMutations} from 'vuex'
    import axios from 'axios'

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
                        console.log(error)
                    })
            }
        },
        created() {

        }

    }
</script>

<style lang="sass">

    .login
        width: 100vw
        height: 100vh
        display: flex
        justify-content: center
        align-items: center

        .panel
            width: 80%
            height: 60%
            background-color: red
            display: flex
            justify-content: center
            align-items: center

        .login__panel__form
            width: 100%
            display: flex
            flex-direction: column
            justify-content: center
            align-items: center
            & > input
                display: block
                width: 80%
</style>
