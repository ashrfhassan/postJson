<template>
    <div>
        <table class="highlight">
            <tbody>
<app-side-project></app-side-project>
<app-side-project></app-side-project>
<app-side-project></app-side-project>
<app-side-project></app-side-project>
            </tbody>
        </table>
    </div>
</template>

<script>
import SideProject from "./sideProject.vue";

export default {
  data: function() {
    return {};
  },
  mounted() {},
  methods: {
    toggleProject: function(event) {
      let el = event.target;
      let elI = $(el).closest("i");
      if ($(elI).hasClass("fa-arrow-right")) {
        $(elI).removeClass("fa-arrow-right");
        $(elI).addClass("fa-arrow-down");
      } else {
        $(elI).removeClass("fa-arrow-down");
        $(elI).addClass("fa-arrow-right");
      }
    }
  },
  components: {
    "app-side-project": SideProject
  }
};
</script>