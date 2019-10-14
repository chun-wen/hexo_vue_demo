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
          <td class="text-right">{{item.origin_price | currency}}</td>
          <td class="text-right">{{item.price | currency}}</td>
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
    <editmodal :editmodal="tempProduct" :status="status" @update="updateProduct" @change="uploadFile"></editmodal>
    <!-- 刪除產品 -->
    <deletemodal :deletemodal="tempProduct" @delete="deleteProduct"></deletemodal>
  </div>
</template>

<script>
// import $ from "jquery";
import pagination from "../productPage/pagination"
import editmodal from "../productPage/editmodal"
import deletemodal from "../productPage/deletemodal"

export default {
  components:{
   pagination,
   editmodal,
   deletemodal,
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
      console.log(process.env.APIisLoadingPATH, process.env.CUSTOMPATH);
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        console.log(response.data);
        vm.isLoading = false;
        vm.products = response.data.products; //開啟console.log確認是否成功
        vm.pagination = response.data.pagination; //將變數存入
      });
    },
    modalShow(isNew, item){
      if(isNew){
        this.tempProduct={};
        this.isNew =true;
      }else{
        this.tempProduct=Object.assign({},item); //避免物件傳參考，目的：讓我們對點擊欄位時會出現對應內容
        this.isNew=false;
      }
      $('#productModal').modal('show')  //點擊建立新產品，開啟modal
    },
    updateProduct(){
      let api =`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product`;
      let httpMethod='post'
      const vm =this;
      if(!vm.isNew){
        api =`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
        httpMethod ="put"
      }
      this.$http[httpMethod](api,{ data:vm.tempProduct}).then((response) =>{
        // console.log(response.data)
        if(response.data.success){
          $('#productModal').modal('hide')
          vm.getProducts();  //將資料傳入資料庫後，需要再重新一次取得所有資料，否則畫面不會更新
        }else{
          $('#productModal').modal('hide')
          console.log('建立產品失敗')
        }
      })

    },
    deleteModal(item){
      console.log(item);
      this.tempProduct =item;   //透過傳進item，可以刪除指定id
      $('#delProductModal').modal('show')
    },
    deleteProduct(){
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
      vm.isLoading = true;
      this.$http.delete(api).then(response => {
        // console.log(response.data);
        if(response.data.success){
          vm.isLoading = false;
          vm.getProducts();
          $('#delProductModal').modal('hide')
        }else{
          console.log('找不到產品')
          vm.isLoading = false;
           $('#delProductModal').modal('hide')
        }
      });
    },
    uploadFile(){
      console.log(this);  //確認圖片位置
      const uploadedFile = this.$refs.files.files[0];
      const vm =this;
      const formData = new FormData();
      formData.append('file-to-upload',uploadedFile) ;
      vm.status.fileUploading= true;
      const url =`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/upload`;
      this.$http.post(url,formData,{
        headers:{
          'Content-Type':'multipart/form-data'
        }
      }).then(response =>{
        // console.log(response.data)
        if(response.data.success){
          // vm.tempProduct.imageUrl = response.data.imageUrl;
          vm.$set(vm.tempProduct,'imageUrl',response.data.imageUrl);
          vm.status.fileUploading= false;
        }else{
          this.$bus.$emit('message:push',response.data.message,'danger');
          vm.status.fileUploading= false;
        }
      })
    }
  },
  created() {
    this.getProducts();
  }
};
</script>
