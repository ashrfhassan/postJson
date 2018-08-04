<template>
    <div id="main" class="full-height">
        <app-header></app-header>
        <app-body></app-body>
        <app-footer></app-footer>
    </div>
</template>

<script>
    //import your components here
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
