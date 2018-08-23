<template>
    <div>
        <table class="highlight">
            <tbody id="projects-collection">
                <component v-for="(collectionProject, index) in collectionProjects" :key="index" :is="app-side-project"></component>
            </tbody>
        </table>
    </div>
</template>

<script>
import SideProject from "./sideProject.vue";
import { mapGetters } from "vuex";
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
  computed: {
    ...mapGetters(["collectionProjects"])
  },
  components: {
    "app-side-project": SideProject
  }
};
</script>