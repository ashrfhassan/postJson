<template>
  <div id="save-request" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Save request</h5>
      </div>
      <div class="modal-body">
              <div class="container-fluid margin-0 padding-0">
<div class="row">
  <div class="col-md-12 col-sm-12 text-center">
<h5>project</h5>
  </div>
   <div class="col-md-12 col-sm-12 text-center">
  <div class="switch">
    <label>
      New
      <input  type="checkbox">
      <span @click="toggleView" class="lever"></span>
      Exist
    </label>
  </div>
  </div>
    <div class="col-md-12 col-sm-12">
     <component :is="data.currentView"></component>
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
import newProject from './save/newproject.vue';
import selectProject from './save/selectproject.vue';

export default {
  data: function() {
    return {
      data:{
        currentView:'newProject',
        currentViewToggle:false
      }
    };
  },
  mounted() {},
  methods: {
    closeModal: function() {
      $("#save-request").modal("hide");
    },
    toggleView:function(){
      this.data.toggleView = !this.data.toggleView;
      if(this.data.toggleView)
              this.$set(this.data, "currentView", "selectProject");
      else
              this.$set(this.data, "currentView", "newProject");
    }
  },
  components:{
    newProject,
    selectProject
  }
};
</script>