<template>
    <b-container fluid class="full-height">
        <app-header/>
        <app-body/>
        <app-footer/>
    </b-container>
</template>

<script>
    import Header from './layouts/header.vue';
    import Body from './layouts/body.vue';
    import Footer from './layouts/footer.vue';

    export default {
        components: {
            'app-header': Header,
            'app-body': Body,
            'app-footer': Footer
        }
    }
</script>
