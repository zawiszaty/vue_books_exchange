<template>
    <header class="headerNav">
        <h1 class="headerNav__header">Books Exchange</h1>
        <nav class="headerNav__nav">
            <ul class="headerNav__nav__list">
                <li class="headerNav__nav__list__item">1</li>
                <li class="headerNav__nav__list__item">2</li>
                <li class="headerNav__nav__list__item">3</li>
                <li class="headerNav__nav__list__item">4</li>
                <li class="headerNav__nav__list__item">5</li>
            </ul>
        </nav>
        <div class="headerNav__nav__userPanel">
            <router-link to="/login" class="headerNav__nav__userPanel__item" v-if="loginGetters == 0">Login</router-link>
            <button v-else="" @click="logout">logout</button>

            <router-link to="home" class="headerNav__nav__userPanel__item">Register</router-link>
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
    .headerNav
        width: 100%
        height: 10vh
        background-color: white
        /*opacity: 0.7*/
        display: flex
        justify-content: space-between
        align-items: center
        font-size: 1rem

        .headerNav__header
            font-size: 1.4rem

        .headerNav__nav__list
            display: flex
            justify-content: flex-start
            list-style-type: none




</style>