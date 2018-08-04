<template>
    <div :id="'header-row-'+ count" class="row">
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
            <input :id="'value-'+ count" type="text">
            <label :for="'value-'+ count">Value</label>
            <span class="helper-text" data-error="wrong" data-success="right">Enter Value</span>
        </div>
        <div class="col-sm-2 col-md-2 text-center">
            <label>
                <input :id="'required-check-'+ count" type="checkbox" checked="checked"/>
                <span>Required</span>
            </label>
        </div>
        <div class="col-sm-5 col-md-5 input-field text-center">
            <textarea :id="'desc-'+ count" class="materialize-textarea"></textarea>
            <label :for="'desc-'+ count">Description</label>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['count'],
        data: function () {
            return {};
        },
        mounted() {
        },
        methods: {
            addNewRow: function (e) {
                this.$emit('addrow');
            }
        }
    };
</script>