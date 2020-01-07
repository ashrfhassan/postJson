<template>
    <div id="request-details" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
         aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Request details</h5>
                </div>
                <div class="modal-body">
                    <b-container fluid class="margin-0 padding-0">
                        <b-row>
                            <b-col sm="6" md="6" class="text-center">
                                <a class="white-btn pulse btn">Generate
                                    Document</a>
                            </b-col>
                            <b-col sm="6" md="6" class="text-center">
                                <a class="white-btn btn">Try it</a>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="6" md="6" class="text-center">
                                <h5>API Name</h5>
                            </b-col>
                            <b-col sm="6" md="6" class="text-center">
                                <h6>Sent at <i id="api-sent-date">0000-00-00 00:00:00</i></h6>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="6" md="6" class="text-center">
                                <b-row>
                                    <b-col sm="12" md="12" class="text-center">
                                        <h6>Headers</h6>
                                        <br><br>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col sm="12" md="12" class="text-center">
                                        <div class="switch">
                                            <label>
                                                View
                                                <input id="" type="checkbox">
                                                <span @click="toggleHeadersParameters" class="lever"></span>
                                                Details
                                            </label>
                                        </div>
                                    </b-col>
                                </b-row>
                            </b-col>
                            <b-col sm="6" md="6" class="text-center raw-input">
                                <component :is="data.headersParameters"></component>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="6" md="6" class="text-center">
                                <b-row>
                                    <b-col sm="12" md="12" class="text-center">
                                        <h6>Post Parameters</h6>
                                        <br><br>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col sm="12" md="12" class="text-center">
                                        <div class="switch">
                                            <label>
                                                View
                                                <input type="checkbox">
                                                <span @click="togglePostParameters" class="lever"></span>
                                                Details
                                            </label>
                                        </div>
                                    </b-col>
                                </b-row>
                            </b-col>
                            <b-col sm="6" md="6" class="text-center raw-input">
                                <component :is="data.postParameters"></component>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="6" md="6" class="text-center">
                                <h6>Output Structure</h6>
                            </b-col>
                            <b-col sm="6" md="6" class="text-center raw-input">
                                <pre id="api-output-structure"></pre>
                            </b-col>
                        </b-row>
                        <div class="divider"></div>
                        <b-row>
                            <b-col sm="12" md="12" class="text-center">
                                <h5>Example</h5>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="6" md="6" class="text-center">
                                <h6>Url</h6>
                            </b-col>
                            <b-col sm="6" md="6" class="text-center">
                                <h6>url</h6>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="6" md="6" class="text-center">
                                <h6>Input</h6>
                            </b-col>
                            <b-col sm="6" md="6" class="text-center raw-input">
                                <pre id="api-input-structure"></pre>
                            </b-col>
                        </b-row>
                    </b-container>
                </div>
                <div class="modal-footer">
                    <a @click="closeModal" class="float-right white-btn btn">Close</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import headersParametersView from "./headersParametersView.vue";
    import headersParametersDetails from "./headersParametersDetails.vue";
    import postParametersView from "./postParametersView.vue";
    import postParametersDetails from "./postParametersDetails.vue";

    export default {
        data: function () {
            return {
                data: {
                    headersParameters: 'headersParametersView',
                    headersParametersToggle: false,
                    postParameters: 'postParametersView',
                    postParametersToggle: false,
                }
            };
        },
        mounted() {
        },
        methods: {
            closeModal: function () {
                document.getElementById("request-details").modal("hide");
            },
            toggleHeadersParameters: function () {
                this.data.headersParametersToggle = !this.data.headersParametersToggle;
                if (this.data.headersParametersToggle)
                    this.$set(this.data, "headersParameters", "headersParametersDetails");
                else
                    this.$set(this.data, "headersParameters", "headersParametersView");
            },
            togglePostParameters: function () {
                this.data.postParametersToggle = !this.data.postParametersToggle;
                if (this.data.postParametersToggle)
                    this.$set(this.data, "postParameters", "postParametersDetails");
                else
                    this.$set(this.data, "postParameters", "postParametersView");
            },
        },
        components: {
            headersParametersView: headersParametersView,
            headersParametersDetails: headersParametersDetails,
            postParametersView: postParametersView,
            postParametersDetails: postParametersDetails
        }
    };
</script>