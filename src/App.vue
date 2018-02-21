<template>
    <div id="app">
        <headerNav/>
        <router-view/>
        <pageFooter></pageFooter>
    </div>
</template>

<script>
    import headerNav from './components/headerNav/headerNav.vue'
    import pageFooter from './components/pageFooter/pageFooter.vue'

    export default {
        name: 'App',
        components: {
            'headerNav': headerNav,
            'pageFooter': pageFooter,
        },
    }
</script>

