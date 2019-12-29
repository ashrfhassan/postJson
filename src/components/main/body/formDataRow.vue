<template>
    <b-row :id="'form-data-row-'+ count">
        <b-col sm="1" md="1" class="text-center">
            <label>
                <input :id="'send-check-'+ count" type="checkbox" checked="checked"/>
                <span></span>
            </label>
        </b-col>
        <b-col sm="2" md="2" class="input-field text-center">
            <input :id="'key-'+ count" type="text" @keyup="addNewRow">
            <label :for="'key-'+ count">Key</label>
            <span class="helper-text" data-error="wrong" data-success="right">Enter key</span>
        </b-col>
        <b-col sm="2" md="2" class="input-field text-center">
            <div class="switch">
                <label>
                    Text
                    <input :id="'btn-input-type'+ count" @click="changeInputType" type="checkbox">
                    <span class="lever"></span>
                    File
                </label>
            </div>
        </b-col>
        <b-col sm="2" md="2" class="text-center">
            <component :is="data.currentInput" :count="count">

            </component>
        </b-col>
        <b-col sm="2" md="2" class="text-center">
            <label>
                <input :id="'required-check-'+ count" type="checkbox" checked="checked"/>
                <span>Required</span>
            </label>
        </b-col>
        <b-col sm="3" md="3" class="input-field text-center">
            <textarea :id="'desc-'+ count" class="materialize-textarea"></textarea>
            <label :for="'desc-'+ count">Description</label>
        </b-col>
    </b-row>
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