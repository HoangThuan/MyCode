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
  data() {
    return {
      listItems: [
        { name: "VietinBank", status: false },
        { name: "Vietcombank", status: false },
        { name: "BIDV", status: false },
        { name: "Agribank", status: false },
        { name: "OCB", status: false },
        { name: "MBBank", status: false },
        { name: "Techcombank", status: false },
        { name: "ACB", status: false },
        { name: "VPBank", status: false },
        { name: "TPBank", status: false },
        { name: "Sacombank", status: false },
        { name: "HDBank", status: false },
        { name: "VietCapitalBank", status: false },
        { name: "SCB", status: false },
        { name: " VIB", status: false },
        { name: "SHB", status: false },
        { name: "Eximbank", status: false },
        { name: "MSB", status: false },
        { name: "CAKE", status: false },
        { name: "Ubank", status: false },
        { name: "Timo", status: false },
        { name: "ViettelMoney", status: false },
        { name: "VNPTMoney", status: false },
        { name: "SaigonBank", status: false },
        { name: "BacABank", status: false },
        { name: "PVcomBank", status: false },
        { name: "Oceanbank", status: false },
        { name: "NCB", status: false },
        { name: "ShinhanBank", status: false },
      ],
    };
  },
  methods:{
    ConfigItem() {
      this.$swal({
        title: "提醒",
        icon: "question",
        iconHtml: "!",
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        showCancelButton: true,
        showCloseButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.$swal({
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    },
    reload(event){
    },
  },
};
</script>
<template>
  <Layout>
    <PageHeader title="BehalfPayConfig" pageTitle="PayManagement" />
    <div class="base-pages-content">
      <BRow>
        <BCol lg="12">
          <div class="pay-send-alex">
            <div class="send-alex-icon">
              <i class="bi bi-brightness-high-fill"></i>
            </div>
            <div class="send-alex-text">部分设置保存后，需刷新页面后起效！</div>
          </div>
        </BCol>
      </BRow>
      <BRow>
        <BCol lg="12">
          <div class="card-customer" style="padding: 0">
            <div
              class="card-customer-header"
              style="
                padding-left: 2%;
                padding-right: 2%;
                padding-top: 10px;
                backgroundcolor: #fafafa;
                border-bottom: none;
              "
            >
              <div class="title"><span>代付配置</span></div>
              <div class="header-btn-customer">
                <button
                  type="button"
                  class="btn-customer-no"
                  style="margin-left: 4px"
                  v-on:click.prevent="ConfigItem()"
                >
                  提交
                </button>
                <button
                  type="button"
                  class="btn-customer-no-back"
                  style="margin-left: 4px"
                  v-on:click.prevent="reload(event)"
                >
                  重置
                </button>
              </div>
            </div>
            <div class="card-customer-body" style="padding: 2%; padding-top: 0">
              <div style="padding: 10px; font-size: 14px">
                <div style="font-weight: 900">代付银行维护限制</div>
                <div>选择配置维护停用的银行Code</div>
              </div>
              <BCol lg="10">
                <button
                  v-for="(item, index) in listItems"
                  v-bind:key="index"
                  type="button"
                  :class="item.status ? 'btn-customer-ok' : 'btn-customer-xam'"
                  style="
                    margin-left: 10px;
                    margin-top: 10px;
                    font-size: 12px;
                    height: 35px;
                  "
                  v-on:click.prevent="item.status = !item.status"
                >
                  {{ item.name }}
                </button>
              </BCol>
            </div>
          </div>
        </BCol>
        <BCol lg="12">
          <div class="card-customer-content" style="padding: 2%; padding-top: 1%;font-size:14px">
            <div>项目代付业务总开关，控制整个项目代付功能的运行</div>
            <div class="behalfPayConfig_checkbox"> 
                <div class="text">代付业务总开关</div>
                <div class="content">
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox"  style="height:25px;width:45px">
                    </div>
                </div>
            </div>
          </div>
        </BCol>
        <BCol lg="12">
          <div class="card-customer-content" style="padding: 2%; padding-top: 1%;font-size:14px">
            <div>自动代付功能总开关，控制自动代付脚本的运行</div>
            <div class="behalfPayConfig_checkbox"> 
                <div class="text">代付业务总开关</div>
                <div class="content">
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox"  style="height:25px;width:45px">
                    </div>
                </div>
            </div>
          </div>
        </BCol>
      </BRow>
    </div>
  </Layout>
</template>