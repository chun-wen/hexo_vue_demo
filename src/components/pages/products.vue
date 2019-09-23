<template>
  <div>
    <div class="text-right mt-4">
      <button class="btn-primary">建立新的產品</button>
    </div>
    <table class="table mt-4">
      <thead>
          <th width="120">分類</th>
          <th>名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="120">編輯</th>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{item.category}}</td>
          <td>{{item.title}}</td>
          <td class="text-right">{{item.origin_price}}</td>
          <td class="text-right">{{item.price}}</td>
          <td>
              <span v-if="item.is_enabled" class="text-success">啟用</span>
              <span v-else>未啟用</span>
          </td>
          <td>
          <button class="btn-outline-primary">編輯</button>
          <button class="btn-outline-danger">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: []
    };
  },
  methods: {
    getProducts() {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/products`;
      //‘https://vue-course-api.hexschool.io/api/chunwen/admin/products’
      const vm = this;
      console.log(process.env.APIPATH, process.env.CUSTOMPATH);
      this.$http.get(api).then(response => {
        console.log(response.data);
        vm.products = response.data.products; //開啟console.log確認是否成功
      });
    }
  },
  created() {
    this.getProducts();
  }
};
</script>
