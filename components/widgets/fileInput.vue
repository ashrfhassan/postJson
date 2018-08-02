<template>
    <div class="file-field input-field text-center">
      <div class="btn" @click="fireFile">
        <span>File</span>
        <input :id="'form-file-' + count" type="file" multiple>
      </div>
      <div class="file-path-wrapper d-none">
        <input class="file-path validate" type="text" placeholder="Upload one or more files">
      </div>
    </div>
</template>

<script>
export default {
    props: ["count"],
  data: function() {
    return {};
  },
  mounted() {
  },
  methods: {
fireFile: function(){
$('#form-file-' + this.count).click();
}
    }
};
</script>