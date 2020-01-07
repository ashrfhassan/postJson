<template>
    <b-row>
        <b-col sm="12" md="12" class="text-center">
            <input id="project-new-name" type="text">
            <label for="project-new-name">Project name</label>
            <span class="helper-text" data-error="wrong" data-success="right">Enter project name</span>
        </b-col>
        <b-col sm="12" md="12" class="text-center">
            <textarea></textarea>
            <label>Comments</label>
        </b-col>
    </b-row>
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