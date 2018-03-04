<template>
    <div class="spinner">

    </div>
</template>

<script>
    export default {
        name: 'spinner',
        props: ['width', 'color'],
        data: function () {
            return {}
        },

    };
</script>
<style lang="sass">
    .spinner
        border: 1em solid black
        border-top: 1em solid #fcfcfc
        border-radius: 50%
        animation-name: spinnerRotate
        animation-duration: 2s
        animation-iteration-count: infinite
        @keyframes spinnerRotate
            0%
                transform: rotate(0deg)
            100%
                transform: rotate(360deg)


</style>
