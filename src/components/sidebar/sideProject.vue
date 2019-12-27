<template>
    <tr id="collection-project-1">
        <td>
            <p>
                <strong>
                    <a @click="showDetails" class="emerald-link-hover margin-project">Project1</a>
                </strong>
                <a class="btn btn-primary pull-right" @click="toggleRightArrow" data-toggle="collapse"
                   href="#project1" role="button" aria-expanded="false" aria-controls="project1">
                    <i :class="['fa', rightArrow? 'fa-arrow-right' : 'fa-arrow-down']"/>
                </a>
            </p>
            <div class="collapse multi-collapse" id="project1">
                <table class="highlight">
                    <tbody id="collection-project-1-requests">
                    <app-get-request/>
                    <app-get-request/>
                    <app-post-request/>
                    <app-post-request/>
                    <app-get-request/>
                    <app-get-request/>
                    <app-get-request/>
                    <app-get-request/>
                    <app-get-request/>
                    </tbody>
                </table>
            </div>
        </td>
    </tr>
</template>

<script>
    import GetRequest from "./sideGetRequest.vue";
    import PostRequest from "./sidePostRequest.vue";

    export default {
        data: function () {
            return {
                rightArrow: true
            };
        },
        mounted() {
        },
        methods: {
            toggleRightArrow: function () {
                this.rightArrow = !this.rightArrow;
            },
            showDetails: function () {
                document.getElementById("project-details").modal("show");
            }
        },
        components: {
            "app-get-request": GetRequest,
            "app-post-request": PostRequest
        }
    };
</script>