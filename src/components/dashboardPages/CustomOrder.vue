<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
        <div class="card border-0 shadow-sm">
          <div 
            style="height: 150px; background-size: cover; background-position: center"
            :style="{ backgroundImage: `url(${item.imageUrl})` }"
          ></div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{item.category}}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{item.title}}</a>
            </h5>
            <p class="card-text">{{item.description}}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <del class="h6">原價 {{item.origin_price}}</del>
              <div class="h5">現在只要 {{item.price}}</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button type="button" class="btn btn-outline-secondary btn-sm"
              @click="productDetail(item.id)">
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
              查看更多
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click="addCart(item.id)">
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- 產品列表卡片modal -->
    <div class="modal fade" id="productModal"
      tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{product.title}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="product.imageUrl" class="img-fluid" alt />
            <blockquote class="blockquote mt-3">
              <p class="mb-0">{{ product.content }}</p>
              <footer class="blockquote-footer text-right">{{ product.description }}</footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <del class="h6">原價 {{product.origin_price}}</del>
              <div class="h5">現在只要 {{product.price}}</div>
            </div>
            <select class="form-control mt-3" v-model="product.num">
              <option :value="num" v-for="num in 10" :key="num">
                選購 {{num}} {{product.unit}}
              </option>
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計
              <strong>{{ product.num * product.price }}</strong> 元
            </div>
            <button type="button" class="btn btn-primary" @click="addCart(product.id, product.num)">加到購物車</button>
          </div>
        </div>
      </div>
    </div>
    <!--  訂購列表-->
    <table class="table w-50 mt-4">
      <thead>
        <tr>
          <td colspan="2" class="text-center">品名</td>
          <td>數量</td>
          <td>單價</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cart.carts" :key="item.id">
          <td>
            <button class="btn-outline-danger" @click="removeCartItem(item.id)">
              <i class="far fa-trash-alt"></i>
            </button>
          </td>
          <td>{{item.product.title}}</td>
          <td>{{item.qty}}/{{ item.product.unit }}</td>
          <td class="text-right">{{item.qty*item.product.price}}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" class="text-right">總計</td>
          <td class="text-right">{{ cart.total }}</td>
        </tr>
      </tfoot>
    </table>
    <div class="input-group mb-3 w-50">
          <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優換券" aria-label="請輸入優換券" aria-describedby="button-addon2">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="addCouponCode">套用優換券</button>
          </div>
    </div>
  </div>
</template>

<script>
import pagination from "../productPage/pagination";

export default {
  components: {
    pagination
  },
  data() {
    return {
      products: [],
      product: {},
      cart:{},
      isLoading: false,
      pagination: {},
      status: {
        loadingItem: ""
      },
      coupon_code:'',
    };
  },
  methods: {
    getProducts(page = 1) {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=${page}`;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        console.log(response.data);
        vm.isLoading = false;
        vm.products = response.data.products; //開啟console.log確認是否成功
        vm.pagination = response.data.pagination; //將變數存入
      });
    },
    productDetail(id) {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
      // vm.isLoading = true;
      vm.status.loadingItem = id;
      this.$http.get(api).then(response => {
        response.data.product.num=1;
        vm.product = response.data.product; //將資料傳進實體內
        $("#productModal").modal("show");
        console.log(response.data);
        vm.status.loadingItem = "";
      });
    },
    //加入購物車
    addCart(id, qty=1 ){
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.status.loadingItem = id;
      const cart ={
         product_id:id,
         qty,
      }
      this.$http.post(api,{data:cart}).then(response => {
        console.log(response.data);
        $("#productModal").modal("hide");
        vm.status.loadingItem = "";
        vm.getCart();
      });
    },
    // 取得購物車
    getCart(){
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      this.$http.get(api).then(response => {
        vm.cart = response.data.data;
        console.log(response.data);
        vm.status.loadingItem = "";
      });
    },
    // 刪除購物車
    removeCartItem(id){
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
      this.$http.delete(api).then(response => {
        console.log(response.data);
        vm.getCart();
        vm.isLoading = false;
      });
    },
    addCouponCode(){
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
      const coupon= {
        code: vm.coupon_code
      }
      this.$http.post(api,{data:coupon}).then(response => {
        console.log(response.data);
      });
    },
  },
  created() {
    this.getProducts();
    this.getCart();
  }
};
</script>