<template>
    <div class="row">
        <div class="col-md-12 col-sm-12 input-field text-center">
            <input id="project-new-name" type="text">
            <label for="project-new-name">Project name</label>
            <span class="helper-text" data-error="wrong" data-success="right">Enter project name</span>
        </div>
        <div class="col-md-12 col-sm-12 input-field text-center">
            <textarea class="materialize-textarea"></textarea>
            <label>Comments</label>
        </div>
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