<template>
        <div class="container-fuild margin-0 padding-0">
       <div class="row">
           <div class="col-sm-2 col-md-2 text-center">
  <a id ="btn-request-type" class='dropdown-trigger btn white-btn' data-target='method-type'>Get</a>

  <ul id='method-type' class='dropdown-content'>
    <li><a class="emerald-btn active-method" @click="changRequestType" >Get</a></li>
    <li><a class="emerald-btn" @click="changRequestType" >Post</a></li>
  </ul>
           </div>
           <div class="col-sm-7 col-md-7 input-field text-center">
          <input id="url" type="text">
          <label for="url">URL</label>
          <span class="helper-text" data-error="wrong" data-success="right">Enter URL</span>
           </div>
           <div class="col-sm-3 col-md-3 text-center">
  <a class='waves-effect waves-light white-btn btn'>Send</a>
    <a class='waves-effect waves-light white-btn btn'>Save</a>
           </div>
       </div>
                  <div class="divider"></div>
       </div>
</template>

<script>
export default {
  data: function() {
    return {
      methodsTypes: {}
    };
  },
  mounted() {
    $(".dropdown-trigger").dropdown();
  },
  methods: {
    changRequestType: function(event) {
      let el = event.target;
      $("#btn-request-type").text($(el).text());
      this.$emit("changRequestType", $(el).text());
    }
  }
};
</script>