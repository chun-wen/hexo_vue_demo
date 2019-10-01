import Vue from 'vue'

Vue.prototype.$bus = new Vue();
// Message
// vm.$bus.$emit('message:push',message,status);
// message(String): 傳入訊息內容
// status(String): Alert樣式，預設值為 warning