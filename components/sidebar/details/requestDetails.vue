<template>
  <div id="request-details" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Request details</h5>
      </div>
      <div class="modal-body">
      <div class="container-fluid margin-0 padding-0">
<div class="row">
  <div class="col-md-6 col-sm-6 text-center">
<a class="waves-effect waves-light pink lighten-1 white-btn pulse btn">Generate Document</a>
  </div>
    <div class="col-md-6 col-sm-6 text-center">
<a class="waves-effect waves-light white-btn btn">Try it</a>
  </div>
</div>
<div class="row">
  <div class="col-md-6 col-sm-6 text-center">
<h5>API Name</h5>
  </div>
    <div class="col-md-6 col-sm-6 text-center">
<h6>Sent at <i id="api-sent-date">0000-00-00 00:00:00</i></h6>
  </div>
</div>
<div class="row">
  <div class="col-md-6 col-sm-6 text-center">
    <div class="row">
      <div class="col-md-12 col-sm-12 text-center">
<h6>Headers</h6>
<br><br>
      </div>
    </div>
        <div class="row">
      <div class="col-md-12 col-sm-12 text-center">
  <div class="switch">
    <label>
      View
      <input id="" type="checkbox">
      <span @click="toggleHeadersParameters" class="lever"></span>
      Details
    </label>
  </div>
        </div>
    </div>
  </div>
    <div class="col-md-6 col-sm-6 text-center raw-input">
      <component :is="data.headersParameters"></component>
  </div>
</div>
<div class="row">
  <div class="col-md-6 col-sm-6 text-center">
    <div class="row">
      <div class="col-md-12 col-sm-12 text-center">
<h6>Post Parameters</h6>
<br><br>
      </div>
    </div>
        <div class="row">
      <div class="col-md-12 col-sm-12 text-center">
  <div class="switch">
    <label>
      View
      <input type="checkbox">
      <span @click="togglePostParameters" class="lever"></span>
      Details
    </label>
  </div>
        </div>
    </div>
  </div>
    <div class="col-md-6 col-sm-6 text-center raw-input">
      <component :is="data.postParameters"></component>
  </div>
</div>
<div class="row">
  <div class="col-md-6 col-sm-6 text-center">
<h6>Output Structure</h6>
  </div>
    <div class="col-md-6 col-sm-6 text-center raw-input">
    <pre id="api-output-structure">{"accesstoken":String,"verificationcode":String}</pre>
  </div>
</div>
          <div class="divider"></div>
<div class="row">
  <div class="col-md-12 col-sm-12 text-center">
<h5>Example</h5>
  </div>
</div>
<div class="row">
  <div class="col-md-6 col-sm-6 text-center">
<h6>Url</h6>
  </div>
    <div class="col-md-6 col-sm-6 text-center">
    <h6>{"accesstoken":String,"verificationcode":String}</h6>
  </div>
</div>
<div class="row">
  <div class="col-md-6 col-sm-6 text-center">
<h6>Input</h6>
  </div>
    <div class="col-md-6 col-sm-6 text-center raw-input">
    <pre id="api-input-structure">{"accesstoken":String,"verificationcode":String}</pre>
  </div>
</div>
      </div>
      </div>
      <div class="modal-footer">
        <a @click="closeModal" class="float-right waves-effect waves-light white-btn btn">Close</a>
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
  data: function() {
    return {
      data: {
        headersParameters: 'headersParametersView',
        headersParametersToggle:false,
        postParameters: 'postParametersView',
        postParametersToggle:false,
      }
    };
  },
  mounted() {},
  methods: {
    closeModal: function() {
      $("#request-details").modal("hide");
    },
    toggleHeadersParameters: function (){
      this.data.headersParametersToggle = !this.data.headersParametersToggle;
      if(this.data.headersParametersToggle)
        this.$set(this.data, "headersParameters", "headersParametersDetails");
      else
        this.$set(this.data, "headersParameters", "headersParametersView");
    },
    togglePostParameters: function (){
      this.data.postParametersToggle = !this.data.postParametersToggle;
      if(this.data.postParametersToggle)
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