
import { onUpdated } from 'vue';
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
      sbSendFuncition: 0,
      sbWorkTime: null,
      listItemRoots: [
        {
          customeID: "000卡00",
          customeName: "luckey",
          workTime: "2024-01-12 11:43:39",
          row1: 0,
          row2: 0,
          row3: 0,
          row4: 0,
          row5: 0,
          row6: 0,
          row7: 0,
          row8: 0,
          row9: 0,
          row10: 0,
          row11: 0,
        },
      ],
      listItemRoots2: [
        {
          dailiID: "000卡001",
          dailiName: "luckeyFor",
          workTime: "2024-01-12 11:43:39",
          row1: 0,
          row2: 0,
          row3: 0,
          row4: 0,
          row5: 0,
          row6: 0,
          row7: 0,
          row8: 0,
          row9: 0,
        },
      ],
      listItems: [
        {
          customeID: "000卡00",
          customeName: "luckey",
          workTime: "2024-01-12 11:43:39",
          row1: 0,
          row2: 0,
          row3: 0,
          row4: 0,
          row5: 0,
          row6: 0,
          row7: 0,
          row8: 0,
          row9: 0,
          row10: 0,
          row11: 0,
        },
      ],
    };
  },
  methods: {
    fiterListItem() {
      if (this.sbSendFuncition == 0) {
        this.listItems = this.listItemRoots.filter((item) => {
          if (this.sbWorkTime != null) {
            return (
              (item.customeID.includes(this.sbCustomeName) ||
                item.customeName.includes(this.sbCustomeName)) &&
              new Date(item.workTime) >= new Date(this.sbWorkTime[0]) &&
              new Date(item.workTime) <= new Date(this.sbWorkTime[1])
            );
          } else {
            return (
              item.customeID.includes(this.sbCustomeName) ||
              item.customeName.includes(this.sbCustomeName)
            );
          }
        });
      }
      else{
        this.listItems = this.listItemRoots2.filter((item) => {
          if (this.sbWorkTime != null) {
            return (
              (item.dailiID.includes(this.sbCustomeName) ||
                item.dailiName.includes(this.sbCustomeName)) &&
              new Date(item.workTime) >= new Date(this.sbWorkTime[0]) &&
              new Date(item.workTime) <= new Date(this.sbWorkTime[1])
            );
          } else {
            return (
              item.dailiID.includes(this.sbCustomeName) ||
              item.dailiName.includes(this.sbCustomeName)
            );
          }
        });
      }
    },
    onChange($event) {
      console.log("hoang thuan " + this.sbSendFuncition);
      this.sbWorkTime = null;
      this.sbCustomeName = "";
      if (this.sbSendFuncition == 0) {
        this.listItems = this.listItemRoots;
      } else {
        this.listItems = this.listItemRoots2;
      }
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
    <PageHeader title="MerchantForm" pageTitle="Export" />
    <div class="base-pages-content">
      <div class="card-customer-content">
        <BRow>
          <BCol lg="12">
            <div class="search-bar-content">
              <div class="search-bar-label with-4"><span>搜索: </span></div>
              <div class="search-bar-item with-12">
                <select
                  class="form-select pay-bank-search-bar-input"
                  v-model="sbSendFuncition"
                  style="font-size: 14px"
                  @change="onChange($event)"
                >
                  <option value="0">商户搜索</option>
                  <option value="1">代理搜索</option>
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
            <div
              class="pay-table pay-table-title"
              style="text-align: center"
              v-if="sbSendFuncition == 0"
            >
              <div class="with-8 pay-table-row no-boder-left">商户ID</div>
              <div class="with-8 pay-table-row no-boder-left">商户名称</div>
              <div class="with-7 pay-table-row no-boder-left">代收金额</div>
              <div class="with-8 pay-table-row no-boder-left">代收手续费</div>
              <div class="with-8 pay-table-row no-boder-left">代付金额</div>
              <div class="with-8 pay-table-row no-boder-left">代付手续费</div>
              <div class="with-7 pay-table-row no-boder-left">手动下发</div>
              <div class="with-8 pay-table-row no-boder-left">
                手动下发手续费
              </div>
              <div class="with-8 pay-table-row no-boder-left">内部费用金额</div>
              <div class="with-7 pay-table-row no-boder-left">内部收费</div>
              <div class="with-8 pay-table-row no-boder-left">起始商户余额</div>
              <div class="with-8 pay-table-row no-boder-left">结尾商户余额</div>
              <div class="with-7 pay-table-row no-boder-left">误差值</div>
            </div>
            <div
              class="pay-table pay-table-title"
              style="text-align: center"
              v-else
            >
              <div class="with-9 pay-table-row no-boder-left">代理账号</div>
              <div class="with-9 pay-table-row no-boder-left">代理名称</div>
              <div class="with-8 pay-table-row no-boder-left">代收金额</div>
              <div class="with-9 pay-table-row no-boder-left">代收手续费</div>
              <div class="with-9 pay-table-row no-boder-left">代付金额</div>
              <div class="with-9 pay-table-row no-boder-left">代付手续费</div>
              <div class="with-10 pay-table-row no-boder-left">
                手动下发金额
              </div>
              <div class="with-11 pay-table-row no-boder-left">
                手动下发手续费
              </div>
              <div class="with-9 pay-table-row no-boder-left">初始余额</div>
              <div class="with-9 pay-table-row no-boder-left">结束余额</div>
              <div class="with-9 pay-table-row no-boder-left">代理利润</div>
            </div>
            <div v-for="(item, index) in listItems" v-bind:key="index">
              <div
                class="pay-table pay-table-content"
                v-if="sbSendFuncition == 0"
              >
                <div class="with-8 pay-table-row no-boder-left">
                  {{ item.customeID }}
                </div>
                <div class="with-8 pay-table-row no-boder-left">
                  {{ item.customeName }}
                </div>
                <div class="with-7 pay-table-row no-boder-left">
                  {{ item.row1 }}
                </div>
                <div class="with-8 pay-table-row no-boder-left">
                  {{ item.row2 }}
                </div>
                <div class="with-8 pay-table-row no-boder-left">
                  {{ item.row3 }}
                </div>
                <div class="with-8 pay-table-row no-boder-left">
                  {{ item.row4 }}
                </div>
                <div class="with-7 pay-table-row no-boder-left">
                  {{ item.row5 }}
                </div>
                <div class="with-8 pay-table-row no-boder-left">
                  {{ item.row6 }}
                </div>
                <div class="with-8 pay-table-row no-boder-left">
                  {{ item.row7 }}
                </div>
                <div class="with-7 pay-table-row no-boder-left">
                  {{ item.row8 }}
                </div>
                <div class="with-8 pay-table-row no-boder-left">
                  {{ item.row9 }}
                </div>
                <div class="with-8 pay-table-row no-boder-left">
                  {{ item.row10 }}
                </div>
                <div class="with-7 pay-table-row no-boder-left">
                  {{ item.row11 }}
                </div>
              </div>
              <div class="pay-table pay-table-content" v-else>
                <div class="with-9 pay-table-row no-boder-left">
                  {{ item.dailiID }}
                </div>
                <div class="with-9 pay-table-row no-boder-left">
                  {{ item.dailiName }}
                </div>
                <div class="with-8 pay-table-row no-boder-left">
                  {{ item.row1 }}
                </div>
                <div class="with-9 pay-table-row no-boder-left">
                  {{ item.row2 }}
                </div>
                <div class="with-9 pay-table-row no-boder-left">
                  {{ item.row3 }}
                </div>
                <div class="with-9 pay-table-row no-boder-left">
                  {{ item.row4 }}
                </div>
                <div class="with-10 pay-table-row no-boder-left">
                  {{ item.row5 }}
                </div>
                <div class="with-11 pay-table-row no-boder-left">
                  {{ item.row6 }}
                </div>
                <div class="with-9 pay-table-row no-boder-left">
                  {{ item.row7 }}
                </div>
                <div class="with-9 pay-table-row no-boder-left">
                  {{ item.row8 }}
                </div>
                <div class="with-9 pay-table-row no-boder-left">
                  {{ item.row9 }}
                </div>
              </div>
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
