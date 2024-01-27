<script>
import PageHeader from "@/components/page-header";
import Layout from "@/layouts/main.vue";
import { BCol } from "bootstrap-vue-next";
import Modal from "@/components/modal.vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import ModalItem from "@/components/modalItem.vue";
export default {
  components: {
    Layout,
    PageHeader,
    BCol,
    Modal,
    VueDatePicker,
    ModalItem,
  },
  data() {
    return {
      showDialog: false,
      bankCodes:[{value:'ICB',title:'ICB'},{value:'VCB',title:'VCB'},{value:'BIDV',title:'BIDV'},{value:'MB',title:'MB'},{value:'ACB',title:'ACB'},{value:'TPB',title:'TPB'}],
      sbBankID: "",
      sbSystemType:"",
      sbBankType:"",
      sbWorkTime: null,
      listItemRoots: [{
        bankCardID:"VBC123",
        bankCardName:"VCB",
        bankName:"VCB",
        bankCode:"VCB",
        systemType:"系统卡",
        orderNum:0,
        successNum:0,
        fukuanlv:0,
        workTime:"2024-01-12 11:43:39",
        orderSuccesNum:0,
        zhifu:0,
        huidiao:0,
        diaodan:0,
        shoukuan:0,
        chukuan:0
      }],
      listItems: [{
        bankCardID:"VBC123",
        bankCardName:"VCB",
        bankName:"VCB",
        bankCode:"VCB",
        systemType:"系统卡",
        orderNum:0,
        successNum:0,
        fukuanlv:0,
        workTime:"2024-01-12 11:43:39",
        orderSuccesNum:0,
        zhifu:0,
        huidiao:0,
        diaodan:0,
        shoukuan:0,
        chukuan:0
      }],
    };
  },
  methods: {
    fiterListItem() {
        console.log
      this.listItems = this.listItemRoots.filter((item) => {
        if (this.sbWorkTime != null) {
            return (
               item.bankCode.includes(this.sbBankType) &&
               item.systemType.includes(this.sbSystemType) &&
               item.bankCardID.includes(this.sbBankID) &&
              new Date(item.workTime) >= new Date(this.sbWorkTime[0]) &&
              new Date(item.workTime) <= new Date(this.sbWorkTime[1]) 
            );
        } else {
            return (
                item.bankCode.includes(this.sbBankType) &&
               item.systemType.includes(this.sbSystemType) &&
               item.bankCardID.includes(this.sbBankID)
            );
        }
      });
    },
    converToString(date) {
      let data = new Date(date);
      return data.getFullYear() + "-" + data.getMonth() + "-" + data.getDay();
    },
    config() {
      if (this.isAdd) {
      } else {
      }
      this.showDialog = false;
    },
    UpdateItem(event, item) {
      this.$swal({
        title: "确定更新订单状态？",
        icon: "question",
        iconHtml: "?",
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        showCancelButton: true,
        showCloseButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          if (item.status == 0) item.status = 1;
          else item.status = 0;
          this.$swal({
            icon: "success",
            title: "订单状态已更新",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    },
    ConfigItem(event, item) {
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
          item.status = !item.status;
          item.btnEvent = !item.btnEvent;
          this.$swal({
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    },
    closeDialog() {
      this.showDialog = false;
    },
  },
};
</script>
<template>
  <Layout>
    <PageHeader title="BankCardForm" pageTitle="Export" />
    <div class="base-pages-content">
      <div class="card-customer-content">
        <BRow>
          <BCol lg="12">
            <div class="search-bar-content">
              <div class="search-bar-label with-4"><span>搜索: </span></div>
              <div class="search-bar-item with-12">
                <select
                  class="form-select pay-bank-search-bar-input"
                  v-model="sbBankType"
                  style="font-size: 14px"
                >
                  <option value="">银行类型</option>
                  <option  v-for="(item,index) in bankCodes"
                  v-bind:key="index" v-bind:value="item.value">{{item.title}}</option>
                </select>
              </div>
              <div class="search-bar-item with-12">
                <select
                  class="form-select pay-bank-search-bar-input"
                  v-model="sbSystemType"
                  style="font-size: 14px"
                >
                  <option value="">卡类型</option>
                  <option value="系统卡">系统卡</option>
                  <option value="代理卡">代理卡</option>
                </select>
              </div>
              <div class="search-bar-item with-12">
                <input
                  type="text"
                  class="form-control pay-bank-search-bar-input"
                  placeholder="银行卡"
                  v-model="sbBankID"
                  style="font-size: 14px"
                />
              </div>
              <div class="search-bar-item with-16">
                <VueDatePicker
                  v-model="sbWorkTime"
                  class="datapicker"
                  placeholder="日期"
                  range
                ></VueDatePicker>
              </div>
              <div class="search-bar-btn with-8">
                <button
                  type="button"
                  class="btn-customer-no"
                  style="margin-left: 4px"
                  v-on:click.prevent="fiterListItem"
                >
                  搜索
                </button>
                <button
                  type="button"
                  class="btn-customer-no-back"
                  style="margin-left: 4px; height: 35px"
                  v-on:click.prevent="window.location.reload()"
                >
                  重置
                </button>
              </div>
            </div>
          </BCol>
        </BRow>
        <BRow style="margin-top: 10px">
          <BCol lg="12">
            <div class="pay-table pay-table-title" style="text-align: center">
              <div class="with-7 pay-table-row no-boder-left">银行卡号</div>
              <div class="with-7 pay-table-row no-boder-left">银行卡姓名</div>
              <div class="with-6 pay-table-row no-boder-left">银行简称</div>
              <div class="with-6 pay-table-row no-boder-left">银行Code</div>
              <div class="with-7 pay-table-row no-boder-left">卡类别</div>
              <div class="with-6 pay-table-row no-boder-left">
                订单总数
              </div>
              <div class="with-5 pay-table-row no-boder-left">成功数</div>
              <div class="with-5 pay-table-row no-boder-left">
                付款率
              </div>
              <div class="with-8 pay-table-row no-boder-left">订单到支付时间</div>
              <div class="with-8 pay-table-row no-boder-left">成功订单金额</div>
              <div class="with-8 pay-table-row no-boder-left">成功支付金额</div>
              <div class="with-8 pay-table-row no-boder-left">成功回调金额</div>
              <div class="with-5 pay-table-row no-boder-left">掉单金额</div>
              <div class="with-7 pay-table-row no-boder-left">爬虫收款金额</div>
              <div class="with-7 pay-table-row no-boder-left">爬虫出款金额</div>
            </div>
            <div
              class="pay-table pay-table-content"
              v-for="(item, index) in listItems"
              v-bind:key="index"
            >
            <div class="with-7 pay-table-row no-boder-left">{{item.bankCardID}}</div>
              <div class="with-7 pay-table-row no-boder-left">{{item.bankCardName}}</div>
              <div class="with-6 pay-table-row no-boder-left">{{item.bankName}}</div>
              <div class="with-6 pay-table-row no-boder-left">{{item.bankCode}}</div>
              <div class="with-7 pay-table-row no-boder-left">{{item.systemType}}</div>
              <div class="with-6 pay-table-row no-boder-left">
                {{item.orderNum}}
              </div>
              <div class="with-5 pay-table-row no-boder-left">{{item.successNum}}</div>
              <div class="with-5 pay-table-row no-boder-left">
                {{item.fukuanlv}}
              </div>
              <div class="with-8 pay-table-row no-boder-left">{{item.workTime}}</div>
              <div class="with-8 pay-table-row no-boder-left">{{item.orderSuccesNum}}</div>
              <div class="with-8 pay-table-row no-boder-left">{{item.zhifu}}</div>
              <div class="with-8 pay-table-row no-boder-left">{{item.huidiao}}</div>
              <div class="with-5 pay-table-row no-boder-left">{{item.diaodan}}</div>
              <div class="with-7 pay-table-row no-boder-left">{{item.shoukuan}}</div>
              <div class="with-7 pay-table-row no-boder-left">{{item.chukuan}}</div>
            </div>
            <div v-if="listItems.length > 0"></div>
            <div v-else class="not_content">
              <img src="@/assets/images/nocontent/no_data.png" />
              <span>暂无数据</span>
            </div>
          </BCol>
        </BRow>
      </div>
    </div>
  </Layout>
</template>
