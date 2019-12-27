<template>
    <div class="scroll">
        <b-row>
            <b-col align-self="center">
                <app-urlsection/>
            </b-col>
        </b-row>
        <b-row>
            <b-col align-self="center">
                <b-card no-body>
                    <b-tabs card content-class="mt-3" fill>
                        <b-tab title="Headers" active>
                            <Headers/>
                        </b-tab>
                        <b-tab title="Body">
                            <Body/>
                        </b-tab>
                    </b-tabs>
                </b-card>
            </b-col>
        </b-row>
        <b-row>
            <b-col align-self="center">
                <h5>Response</h5>
            </b-col>
        </b-row>
        <b-row>
            <b-col align-self="center">
                <b-card no-body>
                    <b-tabs card content-class="mt-3" fill>
                        <b-tab title="Raw" active>
                            <ResponseRaw/>
                        </b-tab>
                        <b-tab title="Preview">
                            <ResponsePreview/>
                        </b-tab>
                    </b-tabs>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import URLSection from "./../main/urlSection.vue";
    import Headers from "./../main/headers/requestHeaders.vue";
    import Body from "./../main/body/requestBody.vue";
    import ResponseRaw from "./../main/body/responseRaw.vue";
    import ResponsePreview from "./../main/body/responsePreview.vue";

    export default {
        data: function () {
            return {};
        },
        mounted() {
        },
        methods: {},
        components: {
            "app-urlsection": URLSection,
            Headers: Headers,
            Body: Body,
            ResponseRaw: ResponseRaw,
            ResponsePreview: ResponsePreview
        }
    };
</script>