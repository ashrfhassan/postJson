<template>
    <div>
        <post-para-details-item></post-para-details-item>
        <post-para-details-item></post-para-details-item>
        <post-para-details-item></post-para-details-item>
        <post-para-details-item></post-para-details-item>
    </div>
</template>

<script>
    import postParaDetailsItem from './items/postParaDetailItem.vue';

    export default {
        data: function () {
            return {};
        },
        mounted() {
        },
        methods: {},
        components: {
            'post-para-details-item': postParaDetailsItem
        }
    };
</script>