<template>
  <div>
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">一個人的背包客旅行</a>
      <input
        class="form-control form-control-dark w-100"
        type="text"
        placeholder="Search"
        aria-label="Search"
      />
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link" href="#" @click.prevent="signOut">Sign out</a>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>

export default {
  name:"navbar",
  methods: {
    signOut() {
      const api = `${process.env.APIPATH}/logout`;
      const self = this;
      this.$http.post(api).then(response => {
        console.log(response.data);
        if (response.data.success) {
          self.$router.push("/login");
        }else{
          console.log('請重新登入')
        }
      });
    }
  }
}
</script>