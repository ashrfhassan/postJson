<template>
    <div>
        <table class="highlight">
            <tbody id="projects-collection">
            <component v-for="(collectionProject, index) in collectionProjects" :key="index" :is="app-side-project"/>
            </tbody>
        </table>
    </div>
</template>

<script>
    import SideProject from "./sideProject.vue";
    import {mapGetters} from "vuex";

    export default {
        data: function () {
            return {};
        },
        mounted() {
        },
        methods: {},
        computed: {
            ...mapGetters(["collectionProjects"])
        },
        components: {
            "app-side-project": SideProject
        }
    };
</script>