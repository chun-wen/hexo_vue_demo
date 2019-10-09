<template>
  <div class="modal fade" id="productModal" tabindex="-1"
      role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
              <span>新增產品</span>
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
          </button>
          </div>
          <div class="modal-body">
          <div class="row">
              <div class="col-sm-4">
              <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input type="text" class="form-control" id="image" placeholder="請輸入圖片連結" v-model="editmodal.imageUrl" />
              </div>
              <div class="form-group">
                  <label for="customFile">
                  或 上傳圖片
                  <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                  </label>
                  <input type="file" id="customFile" class="form-control" ref="files" @change="uploadFile"/>
                  <img :src="editmodal.imageUrl" class="img-fluid" alt="">
              </div>
              </div>
              <div class="col-sm-8">
              <div class="form-group">
                  <label for="title">標題</label>
                  <input type="text" class="form-control" id="title" placeholder="請輸入標題" v-model="editmodal.title"/>
              </div>

              <div class="form-row">
                  <div class="form-group col-md-6">
                  <label for="category">分類</label>
                  <input type="text" class="form-control" id="category" placeholder="請輸入分類" v-model="editmodal.category" />
                  </div>
                  <div class="form-group col-md-6">
                  <label for="price">單位</label>
                  <input type="unit" class="form-control" id="unit" placeholder="請輸入單位" v-model="editmodal.unit" />
                  </div>
              </div>

              <div class="form-row">
                  <div class="form-group col-md-6">
                  <label for="origin_price">原價</label>
                  <input type="number" class="form-control" id="origin_price" placeholder="請輸入原價" v-model="editmodal.origin_price" />
                  </div>
                  <div class="form-group col-md-6">
                  <label for="price">售價</label>
                  <input type="number" class="form-control" id="price" placeholder="請輸入售價" v-model="editmodal.price"/>
                  </div>
              </div>
              <hr/>

              <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea type="text" class="form-control" id="description" placeholder="請輸入產品描述" v-model="editmodal.description"></textarea>
              </div>
              <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea type="text" class="form-control" id="content" placeholder="請輸入產品說明內容" v-model="editmodal.content"></textarea>
              </div>
              <div class="form-group">
                  <div class="form-check">
                  <input class="form-check-input" type="checkbox" 
                  id="is_enabled" 
                  v-model="editmodal.is_enabled"
                  :true-value="1" :false-value="0" />
                  <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
              </div>
              </div>
          </div>
          </div>
          <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
          </div>
      </div>
      </div>
  </div>
</template>    
<script>
export default {
  name: "editmodal",
  // data(){
  //     return{
  //       tempProduct:{}
  //     }
  // },
  props:{
    editmodal:{  //傳進tempProduct
      type:Object,
      default:{}
    },
    status:{
      type:Object,
      default:{} 
    }
  },
  methods: {
    updateProduct() { //內層click事件
      this.$emit("update");
    },
    uploadFile(){
      // this.$emit("change");
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
          vm.$set(vm.editmodal,'imageUrl',response.data.imageUrl);
          vm.status.fileUploading= false;
        }else{
          this.$bus.$emit('message:push',response.data.message,'danger');
          vm.status.fileUploading= false;
        }
      })
    }
  },
};
</script>

