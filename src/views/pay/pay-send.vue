<script>
import PageHeader from "@/components/page-header";
import Layout from "@/layouts/main.vue";
import { BCol } from "bootstrap-vue-next";
export default {
  components: {
    Layout,
    PageHeader,
    BCol,
  },
  data(){
    return{
      listItems:[{name:'越南网银扫码',code:'VNBANKQR',status:true,btnEvent:false},
      {name:'越南ZALO pay',code:'VNZALO',status:true,btnEvent:false},
      {name:'越南MOMO pay',code:'VNMOMO',status:false,btnEvent:true},
      {name:'越南ViettelPay',code:'	VNVTPAY',status:false,btnEvent:true}
    ]
    }
  }
};
</script>
<template>
  <Layout>
    <PageHeader title="Send" pageTitle="Pay" />
    <div class="base-pages-content">
      <BRow>
        <BCol lg="6">
          <div class="pay-send-alex">
            <div class="send-alex-icon"><i class="bi bi-brightness-high-fill"></i></div>
            <div class="send-alex-text">平台收款通道总开关，控制平台的全部收款方式！</div>
          </div>
        </BCol>
      </BRow>
      <BRow>
        <BCol lg="6">
          <div class="card-customer-content">
            <div class="pay-table-title">
              <div class="title-row-fist">通道名称</div>
              <div class="title-row-content">通道Code</div>
              <div class="title-row-content">通道状态</div>
              <div class="title-row-content">操作</div>
            </div>
            <div class="pay-table-content" v-for="(item, index) in listItems " v-bind:key="index">
              <div class="title-row-fist"> {{item.name}}</div>
              <div class="title-row-content"> {{item.code}}</div>
              <div class="title-row-content" v-if="item.status"> <span style="color: #00a854;"><i class="bi bi-check-circle-fill" style="margin-right: 4px;"></i>已开放</span></div>
              <div class="title-row-content" v-else> <span style="color: red;"><i class="bi bi-exclamation-circle-fill"  style="margin-right: 4px;"></i>已关闭</span></div>
              <div class="title-row-content" v-if="item.btnEvent"><button type="button" class="btn-customer-no" v-on:click.prevent="item.status = !item.status;item.btnEvent = !item.btnEvent">开放</button></div>
              <div class="title-row-content" v-else><button type="button" class="btn-customer-ok" v-on:click.prevent="item.status = !item.status;item.btnEvent = !item.btnEvent">关闭</button></div>
            </div>
          </div>
        </BCol>
      </BRow>
    </div>
  </Layout>
</template>