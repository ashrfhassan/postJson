<template>
<div :id="'form-data-row-'+ count" class="row">
  <div class="col-sm-1 col-md-1 text-center">
      <label>
        <input :id="'send-check-'+ count" type="checkbox" checked="checked" />
        <span></span>
              </label>
  </div>
    <div class="col-sm-2 col-md-2 input-field text-center">
          <input :id="'key-'+ count" type="text" @keyup="addNewRow">
          <label :for="'key-'+ count">Key</label>
          <span class="helper-text" data-error="wrong" data-success="right">Enter key</span>
  </div>
        <div class="col-sm-2 col-md-2 input-field text-center">
    <select :id="'input-type-select'+ count">
      <option value="0" selected>Text</option>
      <option value="1">File</option>
    </select>
    <label :for="'input-type-select'+ count">Input type</label>
  </div>
      <div class="col-sm-2 col-md-2 text-center">
                 <component :is="data.currentInput" :count="count">
         
</component>
  </div>
    <div class="col-sm-2 col-md-2 text-center">
      <label>
        <input :id="'required-check-'+ count" type="checkbox" checked="checked" />
        <span>Required</span>
              </label>
  </div>
        <div class="col-sm-3 col-md-3 input-field text-center">
          <textarea :id="'desc-'+ count" class="materialize-textarea"></textarea>
          <label :for="'desc-'+ count">Description</label>
  </div>
</div>
</template>

<script>
import TextInput from "./textInput.vue";
import FileInput from "./fileInput.vue";
export default {
  props: ["count"],
  data: function() {
    return {
      data: {
        currentInput: "app-input-text"
      }
    };
  },
  mounted() {
    let vueThis = this;
    $("select").formSelect();
    $('select').on('change', function() {
      if(this.value == 0)
      vueThis.$set(vueThis.data, "currentInput", "app-input-text");
      else
      vueThis.$set(vueThis.data, "currentInput", "app-input-file");
})
  },
  methods: {
    addNewRow: function(e) {
      this.$emit("addrow");
    }
  },
  components: {
    "app-input-text": TextInput,
    "app-input-file": FileInput
  }
};
</script>