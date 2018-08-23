<template>
    <div>
        <table>
            <tbody>
            <tr>
                <td><a class="simple-link">Clear</a></td>
            </tr>
            </tbody>
        </table>
        <table class="highlight">
            <tbody id="history-requests">
                <component v-for="(historyRequest, index) in historyRequests" :key="index" :is="historyRequest.typeComponent"></component>
            </tbody>
        </table>
    </div>
</template>

<script>
import GetRequest from "./sideGetRequest.vue";
import PostRequest from "./sidePostRequest.vue";
import { mapGetters } from "vuex";
export default {
  data: function() {
    return {};
  },
  mounted() {
    // on hover history row
    $(".h-row").on("mouseover", function() {
      $(this)
        .find("a")
        .removeClass("d-none");
    });
    // on out history row
    $(".h-row").on("mouseout", function() {
      $(this)
        .find("a")
        .addClass("d-none");
    });
  },
  methods: {},
  computed: {
    ...mapGetters(["historyRequests"])
  },
  components: {
    "app-get-request": GetRequest,
    "app-post-request": PostRequest
  }
};
</script>