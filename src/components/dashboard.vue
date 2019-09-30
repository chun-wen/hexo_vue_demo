<template>
  <div>
    <navbar></navbar>
    <div class="container-fluid">
      <div class="row">
        <sidebar></sidebar>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
        <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import sidebar from "./dashboardPages/sidebar";
import navbar from "./dashboardPages/navbar";

export default {
  components: {
    sidebar,
    navbar
  }
};
</script>