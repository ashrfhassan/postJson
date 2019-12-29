<template>
    <div id="project-details" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
         aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Project details</h5>
                </div>
                <div class="modal-body">
                        <b-row>
                            <b-col sm="6" md="6" class="text-center">
                                <a class="waves-effect waves-light pink lighten-1 white-btn pulse btn">Generate
                                    Document</a>
                            </b-col>
                            <b-col sm="6" md="6" class="text-center">
                                <a class="waves-effect waves-light white-btn btn">Export</a>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="6" md="6" class="text-center">
                                <h5>Project Name</h5>
                            </b-col>
                            <b-col sm="6" md="6" class="text-center">
                                <h6>url</h6>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="6" md="6" class="text-center">
                                <h5>Project main url</h5>
                            </b-col>
                            <b-col sm="6" md="6" class="text-center">
                                <h6>url</h6>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="12" md="12" class="text-center">
                                <h5>Comments</h5>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="12" md="12" class="text-center">
                                <p id="project-comments" class="flow-text"></p>
                            </b-col>
                        </b-row>
                </div>
                <div class="modal-footer">
                    <b-row>
                        <b-col sm="6" md="6">
                            <a class="waves-effect waves-light white-btn pink-back-btn btn">Delete</a>
                        </b-col>
                        <b-col sm="6" md="6">
                            <a @click="closeModal" class="waves-effect waves-light white-btn btn">Close</a>
                        </b-col>
                    </b-row>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data: function () {
            return {};
        },
        mounted() {
        },
        methods: {
            closeModal: function () {
                document.getElementById("project-details").modal("hide");
            }
        }
    };
</script>