<template>
  <div id="request-details" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Request details</h5>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <a @click="closeModal" class="float-right waves-effect waves-light white-btn btn">Close</a>
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
      $("#request-details").modal("hide");
    }
  }
};
</script>