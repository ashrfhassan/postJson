<template>
    <div class="card-panel full-height-98 padding-0 scroll">
        <app-urlsection @changRequestType="changRequestType"></app-urlsection>
        <div class="container-fuild margin-0 padding-0">
            <div class="row">
                <div class="col-sm-12 col-md-12 text-center">
                    <ul id="header-body-swipe" class="tabs">
                        <li class="tab col" :class="[swaper.isFullROW ? 's12' : 's6']">
                            <a id="headers-tab"
                               :class="{'active-tab':swaper.isActiveHeaders}"
                               @click="toggleHeaderBody"
                               href="#"
                               data-toggle="headers">Headers</a>
                        </li>
                        <li class="tab col" :class="[swaper.isFullROW ? 'd-none' : 's6']">
                            <a id="body-tab"
                               :class="{'active-tab':swaper.isActiveBody}"
                               @click="toggleHeaderBody"
                               href="#"
                               data-toggle="body">Body</a>
                        </li>
                    </ul>
                </div>
            </div>
            <keep-alive>
                <component :is="swaper.currentView">

                </component>
            </keep-alive>
        </div>
        <div class="container-fuild margin-0 padding-0">
            <div class="row">
                <div class="col-sm-1 offset-sm-5 col-md-1 offset-md-5 text-center">
                    <h5>Response</h5>
                </div>
                <div class="col-sm-3 offset-sm-3 col-md-3 offset-md-3 text-center">
                    <div class="switch">
                    <label>
                        Raw
                        <input type="checkbox">
                        <span @click="swapResponseView" class="lever"></span>
                        Preview
                    </label>
                </div>
                </div>
                <div class="col-sm-12 col-md-12 raw-input text-center">
                    <keep-alive>
                    <component :is="this.swaper.responseView"></component>
                    </keep-alive>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import URLSection from "./../main/urlSection.vue";
import Headers from "./../main/headers/requestHeaders.vue";
import Body from "./../main/body/requestBody.vue";
import ResponseRaw from "./../main/body/responseRaw.vue";
import ResponsePreview from "./../main/body/responsePreview.vue";

export default {
  data: function() {
    return {
      swaper: {
        isActiveHeaders: true,
        isActiveBody: false,
        currentView: "Headers",
        isFullROW: true,
        responseView: "ResponseRaw",
        isRawResponse: true
      }
    };
  },
  mounted() {},
  methods: {
    toggleHeaderBody: function(el) {
      let elementID = el.target.id;
      if (elementID == "headers-tab") {
        this.$set(this.swaper, "isActiveHeaders", true);
        this.$set(this.swaper, "isActiveBody", false);
        this.$set(this.swaper, "currentView", "Headers");
      } else {
        this.$set(this.swaper, "isActiveHeaders", false);
        this.$set(this.swaper, "isActiveBody", true);
        this.$set(this.swaper, "currentView", "Body");
      }
    },
    swapResponseView: function(el) {
      this.swaper.isRawResponse = !this.swaper.isRawResponse;
      if (this.swaper.isRawResponse) {
        this.$set(this.swaper, "responseView", "ResponseRaw");
      } else {
        this.$set(this.swaper, "responseView", "ResponsePreview");
      }
    },
    changRequestType: function(type) {
      if (type == "Get") {
        this.$set(this.swaper, "isActiveHeaders", true);
        this.$set(this.swaper, "isActiveBody", false);
        this.$set(this.swaper, "currentView", "Headers");
        this.$set(this.swaper, "isFullROW", true);
      } else {
        this.$set(this.swaper, "isFullROW", false);
      }
    }
  },
  components: {
    "app-urlsection": URLSection,
    Headers: Headers,
    Body: Body,
    ResponseRaw: ResponseRaw,
    ResponsePreview: ResponsePreview
  }
};
</script>