<script>
import PageHeader from "@/components/page-header";
import Layout from "@/layouts/main.vue";
import { BCol } from "bootstrap-vue-next";
import Modal from "@/components/modal.vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import ModalItem from "@/components/modalItem.vue";
import Pagination  from "@/components/pagination.vue";
export default {
  components: {
    Layout,
    PageHeader,
    BCol,
    Modal,
    VueDatePicker,
    ModalItem,
    Pagination,
  },
  data() {
    return {
      showDialog: false,
      sbOrderNo: "",
      sbStatus: 3,
      sbWorkTime: null,
      listItemRoots: [
        {
          orderNo: "RS5263379354",
          customeID: "1123",
          customeName: "W21183022465455136776",
          url: "https://baidu.com",
          content:
            "{'mchId': '1665526', 'mchOrderId': 'W21183022465455136776', 'amount': 30000, 'payAmount': 30000, 'isPaid': 1, 'payMethod': 7, 'sign': '967e715b10f228157bda8f0a5 7fabe69'}",
          status: 0,
          code: "200",
          reContent:
            "<!DOCTYPE html> <!--STATUS OK--><html> <head><meta http-equiv=content-type content=text/html;charset=utf-8><meta http-equiv=X-UA -Compatible content=IE=Edge><meta content=always name=referrer><link rel=stylesheet type=text/css href=http://s1.bdstatic.com/r/www/cache/bdorz/baidu.min .css><title>ç™¾åº¦",
          note: "Forced deposi",
          workTime: "2024-01-17 19:31:59",
        },
      ],
      listItems: [
        {
          orderNo: "RS5263379354",
          customeID: "1123",
          customeName: "W21183022465455136776",
          url: "https://baidu.com",
          content:
            "{'mchId': '1665526', 'mchOrderId': 'W21183022465455136776', 'amount': 30000, 'payAmount': 30000, 'isPaid': 1, 'payMethod': 7, 'sign': '967e715b10f228157bda8f0a5 7fabe69'}",
          status: 0,
          code: "200",
          reContent:
            "<!DOCTYPE html> <!--STATUS OK--><html> <head><meta http-equiv=content-type content=text/html;charset=utf-8><meta http-equiv=X-UA -Compatible content=IE=Edge><meta content=always name=referrer><link rel=stylesheet type=text/css href=http://s1.bdstatic.com/r/www/cache/bdorz/baidu.min .css><title>ç™¾åº¦",
          note: "Forced deposi",
          workTime: "2024-01-17 19:31:59",
        },
      ],
    };
  },
  methods: {
    fiterListItem() {
      this.listItems = this.listItemRoots.filter((item) => {
        if (this.sbWorkTime != null) {
          if (this.sbStatus < 2) {
            return (
              item.orderNo.includes(this.sbOrderNo) &&
              item.status == this.sbStatus &&
              new Date(item.workTime) >= new Date(this.sbWorkTime[0]) &&
              new Date(item.workTime) <= new Date(this.sbWorkTime[1])
            );
          } else {
            item.orderNo.includes(this.sbOrderNo) &&
              new Date(item.workTime) >= new Date(this.sbWorkTime[0]) &&
              new Date(item.workTime) <= new Date(this.sbWorkTime[1]);
          }
        } else {
          if (this.sbStatus < 2) {
            return (
              item.orderNo.includes(this.sbOrderNo) &&
              item.status == this.sbStatus
            );
          } else {
            item.orderNo.includes(this.sbOrderNo);
          }
        }
      });
    },
    config() {
      if (this.isAdd) {
      } else {
      }
      this.showDialog = false;
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
    <PageHeader title="CallbackLog" pageTitle="PayManagement" />
    <div class="base-pages-content">
      <div class="card-customer-content">
        <BRow>
          <BCol lg="12">
            <div class="search-bar-content">
              <div class="search-bar-label with-4"><span>搜索: </span></div>
              <div class="search-bar-item with-8">
                <select
                  class="form-select pay-bank-search-bar-input"
                  v-model="sbStatus"
                  style="font-size: 14px"
                >
                  <option value="3">回调状态</option>
                  <option value="1">成功</option>
                  <option value="0">失败</option>
                </select>
              </div>
              <div class="search-bar-item with-12">
                <input
                  type="text"
                  class="form-control pay-bank-search-bar-input"
                  placeholder="订单号"
                  v-model="sbOrderNo"
                  style="font-size: 14px"
                />
              </div>
              <div class="search-bar-item with-12">
                <VueDatePicker
                  v-model="sbWorkTime"
                  class="datapicker"
                  placeholder="操作时间"
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
              <div class="with-8 pay-table-row">订单ID</div>
              <div class="with-10 pay-table-row no-boder-left">商户名称</div>
              <div class="with-6 pay-table-row no-boder-left">商家订单ID</div>
              <div class="with-8 pay-table-row no-boder-left">回调地址</div>
              <div class="with-18 pay-table-row no-boder-left">回调内容</div>
              <div class="with-4 pay-table-row no-boder-left">状态</div>
              <div class="with-4 pay-table-row no-boder-left">响应CODE</div>
              <div class="with-26 pay-table-row no-boder-left">响应内容</div>
              <div class="with-6 pay-table-row no-boder-left">备注</div>
              <div class="with-10 pay-table-row no-boder-left">时间</div>
            </div>
            <div v-if="listItems.length > 0">
              <div
                class="pay-table pay-table-content"
                v-for="(item, index) in listItems"
                v-bind:key="index"
              >
                <div class="with-8 pay-table-row">{{ item.orderNo }}</div>
                <div class="with-10 pay-table-row no-boder-left">
                  {{ item.customeName }}
                </div>
                <div class="with-6 pay-table-row no-boder-left">
                  {{ item.customeID }}
                </div>
                <div class="with-8 pay-table-row no-boder-left">
                  {{ item.url }}
                </div>
                <div class="with-18 pay-table-row no-boder-left">
                  {{ item.content }}
                </div>
                <div class="with-4 pay-table-row no-boder-left">
                  <button
                    type="button"
                    :class="
                      item.status == 1
                        ? 'btn-customer-green'
                        : 'btn-customer-ok'
                    "
                    v-on:click.prevent=""
                  >
                    {{ item.status == 1 ? "成功" : "失败" }}
                  </button>
                </div>
                <div class="with-4 pay-table-row no-boder-left">
                  <button
                    type="button"
                    :class="
                      item.code == 200
                        ? 'btn-customer-green'
                        : 'btn-customer-ok'
                    "
                    v-on:click.prevent=""
                  >
                    {{ item.code }}
                  </button>
                </div>
                <div class="with-26 pay-table-row no-boder-left">
                  {{ item.reContent }}
                </div>
                <div class="with-6 pay-table-row no-boder-left">
                  {{ item.note }}
                </div>
                <div class="with-10 pay-table-row no-boder-left">
                  {{ item.workTime }}
                </div>
              </div>
              <Pagination></Pagination>
            </div>
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
<style>
.cardbuton .btn {
  display: inline-block;
  cursor: pointer;
  line-height: 20px;
  height: 22px;
  padding: 0 8px;
  border-radius: 4px;
  border: 1px solid #e9e9e9;
  background: #f3f3f3;
  font-size: 12px;
  transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
  opacity: 1;
  margin-right: 5px;
  cursor: pointer;
  white-space: nowrap;
  color: rgba(0, 0, 0, 0.65);
}
</style>