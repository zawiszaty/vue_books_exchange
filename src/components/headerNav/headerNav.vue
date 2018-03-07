<template>
    <header class="headerNav">
        <h1 class="headerNav__header">Books Exchange</h1>
        <div class="headerNav__nav__userPanel">
            <router-link to="/login" class="headerNav__nav__userPanel__item" v-if="loginGetters == 0">Login</router-link>
            <button v-else="" @click="logout" class="headerNav__nav__userPanel__item">logout</button>
            <router-link to="/panel/addbook" class="headerNav__nav__userPanel__item" v-if="loginGetters == 1">Add Book</router-link>
            <router-link to="/register" class="headerNav__nav__userPanel__item"  v-if="loginGetters == 0">Register</router-link>
        </div>
    </header>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {mapMutations} from 'vuex'

    export default {
        name: 'headerNav',
        data() {
            return {}
        },
        computed: {
            ...mapGetters([
                'loginGetters'
            ])
        },
        methods: {
            ...mapMutations([
                'loginMutations'
            ]),
            logout() {
                localStorage.removeItem('token');
                this.loginMutations();
                this.$router.push('/');
            }
        },
        created() {
            if (localStorage.getItem('token')) {

            }
        }
    }
    ;
</script>

<style lang="sass">
    @import "headerNav"


</style>
