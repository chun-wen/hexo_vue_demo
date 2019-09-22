<template>
  <div>
  <a href="#" v-on:click.prevent="signout">登出</a>
    <!-- <router-link to="/login">登出</router-link> -->
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    signout(){
      const api = `${process.env.APIPATH}/logout`;
      this.$http.post(api).then(response => {
        console.log(response.data);
        if (response.data.success) {
          this.$router.push("/login");
        }
      });
    }
  }
}
</script>

