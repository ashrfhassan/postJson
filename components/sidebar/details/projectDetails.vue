<template>
    <div id="project-details" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
         aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Project details</h5>
                </div>
                <div class="modal-body">
                    <div class="container-fluid margin-0 padding-0">
                        <div class="row">
                            <div class="col-md-6 col-sm-6 text-center">
                                <a class="waves-effect waves-light pink lighten-1 white-btn pulse btn">Generate
                                    Document</a>
                            </div>
                            <div class="col-md-6 col-sm-6 text-center">
                                <a class="waves-effect waves-light white-btn btn">Export</a>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 col-sm-6 text-center">
                                <h5>Project Name</h5>
                            </div>
                            <div class="col-md-6 col-sm-6 text-center">
                                <h6>url</h6>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 col-sm-6 text-center">
                                <h5>Project main url</h5>
                            </div>
                            <div class="col-md-6 col-sm-6 text-center">
                                <h6>url</h6>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 col-sm-12 text-center">
                                <h5>Comments</h5>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 col-sm-12 text-center">
                                <p id="project-comments" class="flow-text"></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="row">
                        <div class="col-sm-6 col-md-6">
                    <a class="waves-effect waves-light white-btn pink-back-btn btn">Delete</a>
                        </div>
                                                <div class="col-sm-6 col-md-6">
                    <a @click="closeModal" class="waves-effect waves-light white-btn btn">Close</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data: function() {
    return {};
  },
  mounted() {},
  methods: {
    closeModal: function() {
      $("#project-details").modal("hide");
    }
  }
};
</script>