<template>
            <tr>
                <p><strong><a class="emerald-link-hover margin-project">Project1</a></strong><a
                        class="btn btn-primary pull-right" @click="toggleProject" data-toggle="collapse"
                        href="#project1" role="button" aria-expanded="false" aria-controls="project1"><i
                        class="fa fa-arrow-right"></i></a></p>
                <div class="collapse multi-collapse" id="project1">
                    <table class="highlight">
                        <tbody>
  <app-get-request></app-get-request>
  <app-get-request></app-get-request>
  <app-post-request></app-post-request>
    <app-post-request></app-post-request>
     <app-get-request></app-get-request>
  <app-get-request></app-get-request>
   <app-get-request></app-get-request>
  <app-get-request></app-get-request>
  <app-get-request></app-get-request>
                        </tbody>
                    </table>
                </div>
            </tr>
</template>

<script>
import GetRequest from "./sideGetRequest.vue";
import PostRequest from "./sidePostRequest.vue";
export default {
  data: function() {
    return {};
  },
  mounted() {},
  methods: {},
  components: {
    "app-get-request": GetRequest,
    "app-post-request": PostRequest
  }
};
</script>