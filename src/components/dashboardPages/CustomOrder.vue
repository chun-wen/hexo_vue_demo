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
          <td>
            {{item.product.title}}
            <div class="text-success" v-if="item.coupon">已套用優惠券</div>
          </td>
          <td>{{item.qty}}/{{ item.product.unit }}</td>
          <td class="text-right">{{item.qty*item.product.price | currency}}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" class="text-right">總計</td>
          <td class="text-right">{{ cart.total | currency }}</td>
        </tr>
        <tr v-if="cart.final_total !== cart.total ">
          <td colspan="3" class="text-right text-success">折扣價</td>
          <td class="text-right text-success">{{ cart.final_total | currency }}</td>
        </tr>
      </tfoot>
    </table>
    <div class="input-group mb-3 w-50">
          <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優換券" aria-label="請輸入優換券" aria-describedby="button-addon2">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="addCouponCode">套用優換券</button>
          </div>
    </div>
    <!-- 送出訂單表格 -->
    <div class="my-5 row justify-content-center">
      <form class="col-md-6" @submit.prevent="sendOrder">
        <div class="form-group">
          <label for="useremail">Email</label>
          <input type="email" class="form-control" name="email" id="useremail"
            :class="{'is-invalid':errors.has('email')}"
            v-model="form.user.email" placeholder="請輸入 Email" v-validate="'required|email'">
          <span class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</span>
        </div>
      
        <div class="form-group">
          <label for="username">收件人姓名</label>
          <input type="text" class="form-control" name="name" id="username"
            :class="{'is-invalid':errors.has('name')}"
            v-model="form.user.name" placeholder="輸入姓名" v-validate="'required'">
          <span class="text-danger" v-if="errors.has('name')">姓名欄位不得為空</span>
        </div>
      
        <div class="form-group">
          <label for="usertel">收件人電話</label>
          <input type="tel" class="form-control" id="usertel" name="number"
          :class="{'is-invalid':errors.has('number')}"
          v-model="form.user.tel" placeholder="請輸入電話" v-validate="'required'">
          <span class="text-danger" v-if="errors.has('number')">電話欄位不得為空</span>
        </div>
      
        <div class="form-group">
          <label for="useraddress">收件人地址</label>
          <input type="text" class="form-control" name="address" id="useraddress" v-model="form.user.address"
            :class="{'is-invalid':errors.has('address')}"
            placeholder="請輸入地址" v-validate="'required'">
          <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
        </div>
      
        <div class="form-group">
          <label for="comment">留言</label>
          <textarea name="" id="comment" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
        </div>
        <div class="text-right">
          <button class="btn btn-danger">送出訂單</button>
        </div>
      </form>
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
      cart:{}, //為何資料結構是物件？因為我們console出來都是response.data.carts
      isLoading: false,
      pagination: {},
      status: {
        loadingItem: ""
      },
      coupon_code:'',
      form:{
        user:{
          name:'',
          email:'',
          tel:'',
          address:'',
        },
        message:''
      }
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
    //套用優惠碼
    addCouponCode(){
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
      const coupon= {
        code: vm.coupon_code
      }
      this.$http.post(api,{data:coupon}).then(response => {
        console.log(response.data);
        if(response.data.success){
          vm.coupon_code ='';
          vm.getCart();
        }else{
          vm.getCart();
          console.log('找不到優惠券')
        }
      });
    },
    // 送出表單
    sendOrder(){
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
      const order = vm.form;
      this.$validator.validate().then(valid => {
        if (valid) {
          this.$http.post(api,{data:order}).then(response => {
          console.log("訂單已建立", response);
        });
        }else{
          console.log('欄位不完整')
        }
      });
    },
  },
  created() {
    this.getProducts();
    this.getCart();
  },
};
</script>