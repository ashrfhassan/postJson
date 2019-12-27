<template>
    <b-card no-body>
        <b-tabs card content-class="mt-3" fill>
            <b-tab title="History" active>
                <app-history/>
            </b-tab>
            <b-tab title="Collection">
                <app-collection/>
            </b-tab>
        </b-tabs>
    </b-card>
</template>

<script>
    import HistoryTab from "./../sidebar/history.vue";
    import CollectionTab from "./../sidebar/collection.vue";

    export default {
        data: function () {
            return {};
        },
        mounted() {
        },
        methods: {},
        components: {
            "app-history": HistoryTab,
            "app-collection": CollectionTab
        }
    };
</script>
