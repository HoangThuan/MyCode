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
      sbCustomeName: "",
      sbSendFuncition:"",
      sbWorkTime: null,
      listItemRoots: [{
        customeID:"",
        customeName:"",
        workTime:"2024-01-12 11:43:39",
        payType:"越南网银扫码",
        daishoulv:"",
        daishouSuccess:"",
        row1:0,
        row2:0,
        row3:0,
        row4:0
      }],
      listItems: [{
        customeID:"",
        customeName:"",
        workTime:"2024-01-12 11:43:39",
        payType:"越南网银扫码",
        daishoulv:"",
        daishouSuccess:"",
        row1:0,
        row2:0,
        row3:0,
        row4:0
      }],
    };
  },
  methods: {
    fiterListItem() {
        console.log
      this.listItems = this.listItemRoots.filter((item) => {
        if (this.sbWorkTime != null) {
            console.log("hoang thuan co thoi gian "+this.sbSendFuncition)
            return (
               item.payType.includes(this.sbSendFuncition) &&
              (item.customeID.includes(this.sbCustomeName) ||
              item.customeName.includes(this.sbCustomeName)) &&
              new Date(item.workTime) >= new Date(this.sbWorkTime[0]) &&
              new Date(item.workTime) <= new Date(this.sbWorkTime[1]) 
            );
        } else {
            console.log("hoang thuan "+this.sbSendFuncition)
            return (
               item.payType.includes(this.sbSendFuncition) &&
              (item.customeID.includes(this.sbCustomeName) ||
              item.customeName.includes(this.sbCustomeName)) 
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
    <PageHeader title="Merchant Tunnle Total" pageTitle="Export" />
    <div class="base-pages-content">
      <div class="card-customer-content">
        <BRow>
          <BCol lg="12">
            <div class="search-bar-content">
              <div class="search-bar-label with-4"><span>搜索: </span></div>
              <div class="search-bar-item with-9">
                <select
                  class="form-select pay-bank-search-bar-input"
                  v-model="sbSendFuncition"
                  style="font-size: 14px"
                >
                  <option value="">通知类型</option>
                  <option value="越南网银扫码">越南网银扫码</option>
                  <option value="越南Zalo Pay">越南Zalo Pay</option>
                  <option value="越南Viettel Pay">越南Viettel Pay</option>
                  <option value="越南Momo Pay">越南Momo Pay</option>
                </select>
              </div>
              <div class="search-bar-item with-12">
                <input
                  type="text"
                  class="form-control pay-bank-search-bar-input"
                  placeholder="商户名或商户ID"
                  v-model="sbCustomeName"
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
                  v-on:click.prevent="location.reload()"
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
              <div class="with-11 pay-table-row no-boder-left">商户ID</div>
              <div class="with-11 pay-table-row no-boder-left">商户名称</div>
              <div class="with-11 pay-table-row no-boder-left">通道</div>
              <div class="with-11 pay-table-row no-boder-left">代收费率%</div>
              <div class="with-12 pay-table-row no-boder-left">代收成功率</div>
              <div class="with-12 pay-table-row no-boder-left">
                代收申请单数
              </div>
              <div class="with-12 pay-table-row no-boder-left">代收成功单数</div>
              <div class="with-12 pay-table-row no-boder-left">
                代收成功金额
              </div>
              <div class="with-12 pay-table-row no-boder-left">代收成功手续费</div>
            </div>
            <div
              class="pay-table pay-table-content"
              v-for="(item, index) in listItems"
              v-bind:key="index"
            >
              <div class="with-11 pay-table-row no-boder-left">{{item.customeID}}</div>
              <div class="with-11 pay-table-row no-boder-left">{{item.customeName}}</div>
              <div class="with-11 pay-table-row no-boder-left">{{item.payType}}</div>
              <div class="with-11 pay-table-row no-boder-left">{{item.daishoulv}}%</div>
              <div class="with-12 pay-table-row no-boder-left">{{item.daishouSuccess}}</div>
              <div class="with-12 pay-table-row no-boder-left">
                {{item.row1}}
              </div>
              <div class="with-12 pay-table-row no-boder-left">{{item.row2}}</div>
              <div class="with-12 pay-table-row no-boder-left">
                {{item.row3}}
              </div>
              <div class="with-12 pay-table-row no-boder-left">{{item.row4}}</div>
            </div>
            <div class="pay-table pay-table-title" style="text-align: center">
              <div class="with-11 pay-table-row no-boder-left">统计：</div>
              <div class="with-11 pay-table-row no-boder-left"></div>
              <div class="with-11 pay-table-row no-boder-left"></div>
              <div class="with-11 pay-table-row no-boder-left"></div>
              <div class="with-12 pay-table-row no-boder-left"></div>
              <div class="with-12 pay-table-row no-boder-left">
                0
              </div>
              <div class="with-12 pay-table-row no-boder-left">0</div>
              <div class="with-12 pay-table-row no-boder-left">
                0
              </div>
              <div class="with-12 pay-table-row no-boder-left">0</div>
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
