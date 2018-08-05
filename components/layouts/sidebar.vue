<template>
    <div class="card-panel full-height-98 padding-0">
        <ul id="tabs-swipe" class="tabs">
            <li class="tab col s6">
                <a id="history-tab" class="pointer" :class="{'active-tab':tabs.isActiveHistory}"
                   @click="toggleTabs" data-toggle="history">History</a></li>
            <li class="tab col s6">
                <a id="collection-tab" class="pointer"
                   :class="{'active-tab':tabs.isActiveCollection}" @click="toggleTabs"
                   data-toggle="collection">Collection</a></li>
        </ul>
        <div id="history" class="col s12 scroll-sideBar margin-0 padding-0" :class="{'d-none':!tabs.isActiveHistory}">
            <app-history></app-history>
        </div>
        <div id="collection" class="col s12 scroll-sideBar margin-0 padding-0"
             :class="{'d-none':!tabs.isActiveCollection}">
            <app-collection></app-collection>
        </div>
    </div>
</template>

<script>
import HistoryTab from "./../sidebar/history.vue";
import CollectionTab from "./../sidebar/collection.vue";

export default {
  data: function() {
    return {
      tabs: {
        isActiveHistory: true,
        isActiveCollection: false
      }
    };
  },
  mounted() {},
  methods: {
    toggleTabs: function(el) {
      let elementID = el.target.id;
      if (elementID == "history-tab") {
        this.$set(this.tabs, "isActiveHistory", true);
        this.$set(this.tabs, "isActiveCollection", false);
      } else {
        this.$set(this.tabs, "isActiveHistory", false);
        this.$set(this.tabs, "isActiveCollection", true);
      }
    }
  },
  components: {
    "app-history": HistoryTab,
    "app-collection": CollectionTab
  }
};
</script>
