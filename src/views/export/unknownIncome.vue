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
      showZonghe: false,
      sbStatus: 2,
      sbMony: 0,
      sbBankID: "",
      sbWorkTime: null,
      listItemRoots: [
        {
          bankID: "RW5269310185",
          oldOrder: "1123",
          mony: 0,
          workTime: "2024-01-12 11:43:39",
          dailiID: "",
          status: 0,
          processPerson: "Rolex",
          orderNote: "fdf",
          note: "fdf",
        },
      ],
      listItems: [
        {
          bankID: "RW5269310185",
          oldOrder: "1123",
          mony: 0,
          workTime: "2024-01-12 11:43:39",
          dailiID: "",
          status: 0,
          processPerson: "Rolex",
          orderNote: "fdf",
          note: "fdf",
        },
      ],
    };
  },
  methods: {
    fiterListItem() {
      this.listItems = this.listItemRoots.filter((item) => {
        if (this.sbStatus <= 1) {
          if (this.sbWorkTime != null) {
            return (
              item.bankID.includes(this.sbBankID) &&
              item.mony == this.sbMony &&
              new Date(item.workTime) >= new Date(this.sbWorkTime[0]) &&
              new Date(item.workTime) <= new Date(this.sbWorkTime[1]) &&
              item.status == this.sbStatus
            );
          } else {
            return (
              item.bankID.includes(this.sbBankID) &&
              item.mony == this.sbMony &&
              item.status == this.sbStatus
            );
          }
        } else {
          if (this.sbWorkTime != null) {
            return (
              item.bankID.includes(this.sbBankID) &&
              item.mony == this.sbMony &&
              new Date(item.workTime) >= new Date(this.sbWorkTime[0]) &&
              new Date(item.workTime) <= new Date(this.sbWorkTime[1])
            );
          } else {
            return (
              item.bankID.includes(this.sbBankID) && item.mony == this.sbMony
            );
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
    <PageHeader title="Unknown Income" pageTitle="Export" />
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
                  <option value="2">处理状态</option>
                  <option value="0">已处理</option>
                  <option value="1">未处理</option>
                </select>
              </div>
              <div class="search-bar-item with-12">
                <input
                  type="text"
                  class="form-control pay-bank-search-bar-input"
                  placeholder="金额"
                  v-model="sbMony"
                  style="font-size: 14px"
                />
              </div>
              <div class="search-bar-item with-12">
                <input
                  type="text"
                  class="form-control pay-bank-search-bar-input"
                  placeholder="收款银行卡号"
                  v-model="sbBankID"
                  style="font-size: 14px"
                />
              </div>
              <div class="search-bar-item with-15">
                <VueDatePicker
                  v-model="sbWorkTime"
                  class="datapicker"
                  placeholder="订单时间"
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
              <div class="search-bar-btn" style="padding-left: 0px">
                <button
                  type="button"
                  class="btn-customer-yellow"
                  v-on:click.prevent="showZonghe = true"
                  style="height: 35px"
                >
                  统计
                </button>
              </div>
            </div>
          </BCol>
        </BRow>
        <BRow style="margin-top: 10px">
          <BCol lg="12">
            <div class="pay-table pay-table-title" style="text-align: center">
              <div class="with-12 pay-table-row">收款银行卡号【0】</div>
              <div class="with-10 pay-table-row no-boder-left">原订单ID</div>
              <div class="with-8 pay-table-row no-boder-left">金额</div>
              <div class="with-12 pay-table-row no-boder-left">记录时间</div>
              <div class="with-10 pay-table-row no-boder-left">代理商</div>
              <div class="with-7 pay-table-row no-boder-left">处理状态</div>
              <div class="with-9 pay-table-row no-boder-left">处理人</div>
              <div class="with-12 pay-table-row no-boder-left">订单备注</div>
              <div class="with-8 pay-table-row no-boder-left">备注</div>
              <div class="with-12 pay-table-row no-boder-left">操作</div>
            </div>
            <div v-if="listItems.length > 0">
              <div
                class="pay-table pay-table-content"
                v-for="(item, index) in listItems"
                v-bind:key="index"
              >
                <div class="with-12 pay-table-row">{{ item.bankID }}</div>
                <div class="with-10 pay-table-row no-boder-left">
                  {{ item.oldOrder }}
                </div>
                <div class="with-8 pay-table-row no-boder-left">
                  {{ item.mony }}
                </div>
                <div class="with-12 pay-table-row no-boder-left">
                  {{ item.workTime }}
                </div>
                <div class="with-10 pay-table-row no-boder-left">
                  {{ item.dailiID }}
                </div>
                <div class="with-7 pay-table-row no-boder-left">
                  <button
                    type="button"
                    :class="
                      item.status == 0
                        ? 'btn-customer-green'
                        : 'btn-customer-ok'
                    "
                    v-on:click.prevent=""
                  >
                    {{ item.status == 0 ? "已处理" : "未处理" }}
                  </button>
                </div>
                <div class="with-9 pay-table-row no-boder-left">
                  {{ item.processPerson }}
                </div>
                <div class="with-12 pay-table-row no-boder-left">
                  {{ item.orderNote }}
                </div>
                <div class="with-8 pay-table-row no-boder-left">
                  {{ item.note }}
                </div>
                <div class="with-12 pay-table-row no-boder-left">
                  <div class="group-button">
                    <button
                      type="button"
                      class="btn-customer-blue"
                      v-on:click.prevent="ConfigItem(event, item)"
                    >
                      强制入款
                    </button>
                    <button
                      type="button"
                      class="btn-customer-blue"
                      v-on:click.prevent="ConfigItem(event, item)"
                      style="margin-left: 2px"
                    >
                      详细
                    </button>
                    <BDropdown
                      class="cardbuton"
                      text="更多"
                      style="margin-left: 2px"
                    >
                      <BDropdownItem
                        ><span class="dropdow_item_font_size"
                          >支付吗</span
                        ></BDropdownItem
                      >
                      <BDropdownItem
                        ><span class="dropdow_item_font_size"
                          >订单回调</span
                        ></BDropdownItem
                      >
                      <BDropdownItem
                        ><span class="dropdow_item_font_size"
                          >更新备注</span
                        ></BDropdownItem
                      >
                      <BDropdownItem
                        ><span class="dropdow_item_font_size"
                          >回调记录</span
                        ></BDropdownItem
                      >
                      <BDropdownItem
                        ><span class="dropdow_item_font_size"
                          >爬虫明细</span
                        ></BDropdownItem
                      >
                      <BDropdownItem
                        ><span class="dropdow_item_font_size"
                          >删除</span
                        ></BDropdownItem
                      >
                    </BDropdown>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="not_content">
              <img src="@/assets/images/nocontent/no_data.png" />
              <span>暂无数据</span>
            </div>
          </BCol>
        </BRow>
        <Modal
          :visible="showZonghe"
          @configEvent="showZonghe = false"
          @close="showZonghe = false"
          title="订单数据统计"
          :showFooter="false"
        >
          <div
            class="model-content-custome"
            style="padding-top: 2px; overflow: auto"
          >
            <modal-item title="总笔数:">
              <span>0</span>
            </modal-item>
            <modal-item title="总金额:">
              <span>0</span>
            </modal-item>
          </div>
        </Modal>
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