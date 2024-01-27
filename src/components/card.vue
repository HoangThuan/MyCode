<script>

export default {
    props: {
    headerTitle: {
      type: String,
      default: "",
    },
    headerBtnName: {
      type: String,
      default: "",
    },
    headerBtnBackroug: {
        type: String,
        default: "#f3f3f3",
    },
    boderColor:{
        type: String,
        default: "#e9e9e9",
    },
    headerTextColor:{
        type: String,
        default: "#e9e9e9",
    },
    textSize:{
        type: String,
        default: "14px",
    },
    headerBtnEvent:{
        type:Boolean,
        default:false,
    },
    footerShow:{
        type:Boolean,
        default:true,
    },
    footerLeft:{
      type: String,
      default: "",
    },
    footerRight:{
      type: String,
       default: "",
    }
  }
}
</script>
<template>
    <div class="card-customer">
        <div class="card-customer-header">
            <div class="title"><span>{{ headerTitle }}</span> </div>
            <div class="header-btn-customer"> <div  class="custom-btn" :style="{ backgroundColor:headerBtnBackroug,border: '1px',borderStyle:'solid',borderColor:boderColor,borderRadius:'5px',color:headerTextColor,fontSize:textSize }">{{headerBtnName}}</div>
            </div>
        </div>
        <div class="card-customer-body">
              <slot />
        </div>
        <div class="card-customer-footer" v-if="footerShow">
            <div class="title"> <span>{{ footerLeft }}</span> </div>
            <div class="footer-btn-customer"> <span> {{ footerRight }}</span> </div>
        </div>
    </div>
</template>
