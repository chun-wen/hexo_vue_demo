<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <!-- <Loading :active.sync="isLoading"></Loading> -->
    <div class="text-right mt-4">
      <button class="btn-primary" @click="modalShow(true)">建立新的產品</button>
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
            <button class="btn-outline-primary" @click="modalShow(false,item)">編輯</button>
            <button class="btn-outline-danger" @click="deleteModal(item)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination :pagination="pagination" @emitPage="getProducts"></pagination>
    <!-- Modal -->
    <!-- 新增產品/編輯產品 -->
    <editmodal :editmodal="tempProduct" :status="status" @update="updateProduct"></editmodal>
    <!-- 刪除產品 -->
    <div class="modal fade" id="delProductModal" tabindex="-1"
      role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="deleteProduct">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import $ from "jquery";
import pagination from "../productPage/pagination"
import editmodal from "../productPage/editmodal"

export default {
  components:{
   pagination,
   editmodal,
  },
  data() {
    return {
      products: [],
      pagination:{},
      tempProduct:{},
      isNew:false,
      isLoading: false,
      status: {
        fileUploading: false,
      },
    };
  },
  methods: {
    getProducts(page =1) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/products?page=${page}`;
      //‘https://vue-course-api.hexschool.io/api/chunwen/admin/products’
      const vm = this;
      // console.log(process.env.APIPATH, process.env.CUSTOMPATH);
      console.log(process.env.APIisLoadingPATH, process.env.CUSTOMPATH);
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        console.log(response.data);
        vm.isLoading = false;
        vm.products = response.data.products; //開啟console.log確認是否成功
        vm.pagination = response.data.pagination; //將變數存入
      });
    },
    modalShow(isNew,item) {
      if(isNew){
          this.tempProduct={};
          this.isNew =true;
      }else{
          this.tempProduct=Object.assign({},item); //避免物件傳參考
          this.isNew =false;
      }
      $("#productModal").modal("show");
      // window.$('#productModal').modal('show') $ is not defined
    },
    deleteModal(item){
        const vm =this;
        vm.tempProduct = Object.assign({},item);
        $("#delProductModal").modal("show");
    },
    updateProduct(){
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product`;
      const vm = this;
      let httpMethod ="post";
      if(!vm.isNew){
          api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`
          httpMethod='put'
     }
      console.log(process.env.APIPATH, process.env.CUSTOMPATH);
      // 將資料送入資料庫
      this.$http[httpMethod](api, {'data':vm.tempProduct}).then(response => {
        console.log(response.data);
        if(response.data.success){
            $("#productModal").modal("hide");
            vm.getProducts();
        }else{
          $('#productModal').modal('hide');
          vm.getProducts();
          console.log('新增失敗');
        }
      });
    },
    deleteProduct(){
      const vm = this;
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
      console.log(process.env.APIPATH, process.env.CUSTOMPATH);
        this.$http.delete(api).then(response => {
          console.log(response.data);
          if(response.data.success){
              $("#delProductModal").modal("hide");
              vm.getProducts();
          }else{
            $('#delProductModal').modal('hide');
            vm.getProducts();
            console.log('新增失敗');
          }
        });
    },
  },
  created() {
    this.getProducts();
  }
};
</script>
