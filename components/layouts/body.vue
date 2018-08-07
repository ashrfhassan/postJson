<template>
    <main class="full-height">
        <div class="container-fluid full-height margin-0 padding-0">
            <div class="row full-height">
                <div class="col-sm-3 col-md-3 full-height">
                    <app-sidebar></app-sidebar>
                </div>

                <div class="col-sm-9 col-md-9">
                    <app-main></app-main>
                </div>

            </div>
        </div>
        <app-request-details></app-request-details>
        <app-project-details></app-project-details>
        <app-save-request></app-save-request>
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

