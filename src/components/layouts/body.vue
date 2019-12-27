<template>
    <main class="full-height">
        <b-row class="full-height">
            <b-col sm="3">
                <app-sidebar/>
            </b-col>

            <b-col sm="9">
                <app-main/>
            </b-col>
        </b-row>
        <app-request-details/>
        <app-project-details/>
        <app-save-request/>
    </main>
</template>
<script>
    import SideBar from "./sidebar.vue";
    import Main from "./main.vue";
    import RequestDetails from "./../sidebar/details/requestDetails.vue";
    import ProjectDetails from "./../sidebar/details/projectDetails.vue";
    import SaveRequest from "./../main/saveRequest.vue";

    export default {
        components: {
            "app-sidebar": SideBar,
            "app-main": Main,
            "app-request-details": RequestDetails,
            "app-project-details": ProjectDetails,
            "app-save-request": SaveRequest
        }
    };
</script>

