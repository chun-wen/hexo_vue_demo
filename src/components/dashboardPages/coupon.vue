<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <div class="text-right mt-4">
        <button class="btn-primary" @click="modalShow(true)">建立新的優換券</button>
        </div>
        <table class="table mt-4">
        <thead>
            <th width="120">名稱</th>
            <th>折扣百分比</th>
            <th width="120">到期日</th>
            <th width="100">是否啟用</th>
            <th width="120">編輯</th>
        </thead>
        <tbody>
            <tr v-for="item in coupon" :key="item.title">
            <td>{{item.title}}</td>
            <td>{{item.code}}</td>
            <td>{{item.percent}}</td>
            <td>{{item.due_date | timestampToData}}</td>
            <td>
                <span v-if="item.is_enabled" class="text-success">啟用</span>
                <span v-else>未啟用</span>
            </td>
            <td>
                <button class="btn-outline-primary" >編輯</button>
                <button class="btn-outline-danger">刪除</button>
            </td>
            </tr>
        </tbody>
        </table>
        <!-- Modal -->
         <div class="modal fade" id="couponModal" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="title">標題</label>
              <input type="text" class="form-control" id="title" v-model="tempCoupon.title"
                placeholder="請輸入標題">
            </div>
            <div class="form-group">
              <label for="coupon_code">優惠碼</label>
              <input type="text" class="form-control" id="coupon_code" v-model="tempCoupon.code"
                placeholder="請輸入優惠碼">
            </div>
            <div class="form-group">
              <label for="due_date">到期日</label>
              <input type="date" class="form-control" id="due_date"
                v-model="due_date">
            </div>
            <div class="form-group">
              <label for="price">折扣百分比</label>
              <input type="number" class="form-control" id="price"
                v-model="tempCoupon.percent" placeholder="請輸入折扣百分比">
            </div>
            <div class="form-group">
              <div class="form-check">
                <input class="form-check-input" type="checkbox"
                  :true-value="1"
                  :false-value="0"
                  v-model="tempCoupon.is_enabled" id="is_enabled">
                <label class="form-check-label" for="is_enabled">
                  是否啟用
                </label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="addCoupon">更新優惠券</button>
          </div>
        </div>
      </div>
    </div>
    </div>
</template>


<script>

import pagination from "../productPage/pagination"

export default {
    components:{
        pagination
    },
    data(){
        return{
            isLoading:false,
            coupon:{},
            tempCoupon:{},
            isNew:false,
        }
    },
    // watch:{
    //     due_date(){
    //         const vm =this;
    //         const timestamp =Math.floor(new Date(vm.due_date) / 1000);
    //         vm.tempCoupon.due_date =timestamp;
    //     }
    // },
    methods:{
        modalShow(isNew,item) {
        $("#couponModal").modal("show");
        const vm =this;
        vm.isNew =isNew;
        if(vm.isNew){
            this.tempCoupon={};
        }
        else{
            this.coupon = Object.assign({}, item); // 物件船參考的特性，因此加上assign
            // 轉換時間格式  1567987200 --> 2019-09-09
            const timestamp = this.coupon.due_date;
            const month = new Date(timestamp * 1000).getMonth() < 10 ?
            0 + (new Date(timestamp * 1000).getMonth() + 1) :
            new Date(timestamp * 1000).getMonth() + 1;
            const date = new Date(timestamp * 1000).getDate() < 10 ?
            0 + new Date(timestamp * 1000).getDate() :
            new Date(timestamp * 1000).getDate();
            const formatTime = `${new Date(timestamp * 1000).getFullYear()}-${month}-${date}`;
            this.coupon.due_date = formatTime;
            this.isNew = false;
        }
        },
        // addCoupon(){
        //     const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon`;
        //     const vm = this;
        //     // console.log(process.env.APIPATH, process.env.CUSTOMPATH);
        //     vm.isLoading = true;
        //     this.$http.post(api, vm.tempCoupon).then(response => {
        //     console.log(response.data);
        //     vm.isLoading = false;
        //     // vm.coupon = response.data.coupons; //開啟console.log確認是否成功
        //     // vm.pagination = response.data.pagination; //將變數存入
        //   });
        // },
        getCoupon(page=1){
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons?page=${page}`;
            const vm = this;
            // console.log(process.env.APIPATH, process.env.CUSTOMPATH);
            vm.isLoading = true;
            this.$http.get(api).then(response => {
            console.log(response.data);
            vm.isLoading = false;
            vm.coupon = response.data.coupons; //開啟console.log確認是否成功
            vm.pagination = response.data.pagination; //將變數存入
          });
        }
    },
    created(){
        // this.getCoupon();
    }
}
</script>