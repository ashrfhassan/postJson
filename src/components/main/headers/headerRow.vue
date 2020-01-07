<template>
    <b-row :id="'header-row-'+ count">
        <b-col sm="1" md="1" class="text-center">
            <label>
                <input :id="'send-check-'+ count" type="checkbox" checked="checked"/>
                <span></span>
            </label>
        </b-col>
        <b-col sm="2" md="2" class="text-center">
            <input :id="'key-'+ count" type="text" @keyup="addNewRow">
            <label :for="'key-'+ count">Key</label>
            <span class="helper-text" data-error="wrong" data-success="right">Enter key</span>
        </b-col>
        <b-col sm="2" md="2" class="text-center">
            <input :id="'value-'+ count" type="text">
            <label :for="'value-'+ count">Value</label>
            <span class="helper-text" data-error="wrong" data-success="right">Enter Value</span>
        </b-col>
        <b-col sm="2" md="2" class="text-center">
            <label>
                <input :id="'required-check-'+ count" type="checkbox" checked="checked"/>
                <span>Required</span>
            </label>
        </b-col>
        <b-col sm="5" md="5" class="text-center">
            <textarea :id="'desc-'+ count"></textarea>
            <label :for="'desc-'+ count">Description</label>
        </b-col>
    </b-row>
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
            addNewRow: function () {
                this.$emit('addrow');
            }
        }
    };
</script>