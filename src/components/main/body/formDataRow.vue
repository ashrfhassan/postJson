<template>
    <div :id="'form-data-row-'+ count" class="row">
        <div class="col-sm-1 col-md-1 text-center">
            <label>
                <input :id="'send-check-'+ count" type="checkbox" checked="checked"/>
                <span></span>
            </label>
        </div>
        <div class="col-sm-2 col-md-2 input-field text-center">
            <input :id="'key-'+ count" type="text" @keyup="addNewRow">
            <label :for="'key-'+ count">Key</label>
            <span class="helper-text" data-error="wrong" data-success="right">Enter key</span>
        </div>
        <div class="col-sm-2 col-md-2 input-field text-center">
            <div class="switch">
                <label>
                    Text
                    <input :id="'btn-input-type'+ count" @click="changeInputType" type="checkbox">
                    <span class="lever"></span>
                    File
                </label>
            </div>
        </div>
        <div class="col-sm-2 col-md-2 text-center">
            <component :is="data.currentInput" :count="count">

            </component>
        </div>
        <div class="col-sm-2 col-md-2 text-center">
            <label>
                <input :id="'required-check-'+ count" type="checkbox" checked="checked"/>
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
    import TextInput from "./../../widgets/textInput.vue";
    import FileInput from "./../../widgets/fileInput.vue";

    export default {
        props: ["count"],
        data: function () {
            return {
                data: {
                    currentInput: "app-input-text",
                    checked: false
                }
            };
        },
        mounted() {
        },
        methods: {
            addNewRow: function () {
                this.$emit("addrow");
            },
            changeInputType: function () {
                this.data.checked = !this.data.checked;
                if (this.data.checked) {
                    this.$set(this.data, "currentInput", "app-input-file");
                } else {
                    this.$set(this.data, "currentInput", "app-input-text");
                }
            }
        },
        components: {
            "app-input-text": TextInput,
            "app-input-file": FileInput
        }
    };
</script>