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
        </main>
</template>
<script>
import SideBar from "./sidebar.vue";
import Main from "./../pages/main.vue";
export default {
  components:{
  "app-sidebar": SideBar,
  "app-main": Main
  }
};
</script>

