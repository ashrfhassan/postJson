<template>
    <div>
        <headers-para-details-item></headers-para-details-item>
        <headers-para-details-item></headers-para-details-item>
        <headers-para-details-item></headers-para-details-item>
    </div>
</template>

<script>
    import headersParaDetailsItem from './items/headersParaDetailItem.vue';

    export default {
        data: function () {
            return {};
        },
        mounted() {
        },
        methods: {},
        components: {
            'headers-para-details-item': headersParaDetailsItem
        }
    };
</script>