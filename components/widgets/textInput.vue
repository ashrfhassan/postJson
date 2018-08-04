<template>
    <div class="input-field">
        <input :id="'value-'+ count" type="text">
        <label :for="'value-'+ count">Value</label>
        <span class="helper-text" data-error="wrong" data-success="right">Enter Value</span>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {};
        },
        mounted() {
        },
        methods: {}
    };
</script>