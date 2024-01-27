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
      sbOrderNo: "",
      sbCustomeName: "",
      sbCustomeCode: "",
      sbWorkTime: null,
      sbSendCode: "",
      sbOrderWt: 0,
      listItemRoots: [
        {
          orderNo: "Rolex",
          customeID: "RW5269310185",
          customeName: "1123",
          carCode: "",
          orderWt: 0,
          laiyuan: "",
          yuanyin: "",
          status: 0,
          note: "",
          note1: "",
          orderTime: "2024-01-12 11:43:39",
        },
      ],
      listItems: [
        {
          orderNo: "Rolex",
          customeID: "RW5269310185",
          customeName: "1123",
          carCode: "",
          orderWt: 0,
          laiyuan: "",
          yuanyin: "",
          status: 0,
          note: "",
          note1: "",
          orderTime: "2024-01-12 11:43:39",
        },
      ],
    };
  },
  methods: {
    fiterListItem() {
      this.listItems = this.listItemRoots.filter((item) => {
        console.log(this.sbOrderWt);
        console.log(this.sbWorkTime[0]);
        if (this.sbWorkTime != null) {
          if (this.sbOrderWt == 0) {
            return (
              item.orderNo.includes(this.sbOrderNo) &&
              item.customeID.includes(this.sbCustomeCode) &&
              item.customeName.includes(this.sbCustomeName) &&
              new Date(item.orderTime) >= new Date(this.sbWorkTime[0]) &&
              new Date(item.orderTime) <= new Date(this.sbWorkTime[1]) &&
              item.carCode.includes(this.sbSendCode) 
            );
          }
          else{
              item.orderNo.includes(this.sbOrderNo) &&
              item.customeID.includes(this.sbCustomeCode) &&
              item.customeName.includes(this.sbCustomeName) &&
              item.carCode.includes(this.sbSendCode)&&
              new Date(item.orderTime) >= new Date(this.sbWorkTime[0]) &&
              new Date(item.orderTime) <= new Date(this.sbWorkTime[1]) &&
              item.orderWt == this.sbOrderWt
          }
        } else {
            if (this.sbOrderWt == 0) {
            return (
              item.orderNo.includes(this.sbOrderNo) &&
              item.customeID.includes(this.sbCustomeCode) &&
              item.customeName.includes(this.sbCustomeName) &&
              item.carCode.includes(this.sbSendCode) 
            );
          }
          else{
              item.orderNo.includes(this.sbOrderNo) &&
              item.customeID.includes(this.sbCustomeCode) &&
              item.customeName.includes(this.sbCustomeName) &&
              item.carCode.includes(this.sbSendCode) &&
              item.orderWt == this.sbOrderWt
          }
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
    <PageHeader title="Drop Order List" pageTitle="Merchant" />
    <div class="base-pages-content">
      <div class="card-customer-content">
        <BRow>
          <BCol lg="12">
            <div class="search-bar-content">
              <div class="search-bar-label with-4"><span>搜索: </span></div>
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
                <input
                  type="text"
                  class="form-control pay-bank-search-bar-input"
                  placeholder="商户订单号"
                  v-model="sbCustomeCode"
                  style="font-size: 14px"
                />
              </div>
              <div class="search-bar-item with-12">
                <input
                  type="text"
                  class="form-control pay-bank-search-bar-input"
                  placeholder="商户名称"
                  v-model="sbCustomeName"
                  style="font-size: 14px"
                />
              </div>
              <div class="search-bar-item with-12">
                <input
                  type="text"
                  class="form-control pay-bank-search-bar-input"
                  placeholder="收款卡号"
                  v-model="sbSendCode"
                  style="font-size: 14px"
                />
              </div>
              <div class="search-bar-item with-12">
                <input
                  type="number"
                  class="form-control pay-bank-search-bar-input"
                  placeholder="订单金额"
                  v-model="sbOrderWt"
                  style="font-size: 14px"
                />
              </div>
              <div class="search-bar-item with-16">
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
            </div>
          </BCol>
        </BRow>
        <BRow style="margin-top: 10px">
          <BCol lg="12">
            <div class="pay-table pay-table-title" style="text-align: center">
              <div class="with-9 pay-table-row no-boder-left">订单号</div>
              <div class="with-9 pay-table-row no-boder-left">商户名称</div>
              <div class="with-9 pay-table-row no-boder-left">商户订单号</div>
              <div class="with-9 pay-table-row no-boder-left">收款卡号</div>
              <div class="with-8 pay-table-row no-boder-left">订单金额</div>
              <div class="with-6 pay-table-row no-boder-left">来源</div>
              <div class="with-8 pay-table-row no-boder-left">原因</div>
              <div class="with-6 pay-table-row no-boder-left">状态</div>
              <div class="with-7 pay-table-row no-boder-left">备注</div>
              <div class="with-8 pay-table-row no-boder-left">备注码</div>
              <div class="with-8 pay-table-row no-boder-left">订单时间</div>
              <div class="with-13 pay-table-row no-boder-left">操作</div>
            </div>
            <div v-if="listItems.length > 0">
              <div
                class="pay-table pay-table-content"
                v-for="(item, index) in listItems"
                v-bind:key="index"
              >
                <div class="with-9 pay-table-row no-boder-left">
                  {{ item.orderNo }}
                </div>
                <div class="with-9 pay-table-row no-boder-left">
                  {{ item.customeName }}
                </div>
                <div class="with-9 pay-table-row no-boder-left">
                  {{ item.customeID }}
                </div>
                <div class="with-9 pay-table-row no-boder-left">
                  {{ item.carCode }}
                </div>
                <div class="with-8 pay-table-row no-boder-left">
                  {{ item.orderWt }}
                </div>
                <div class="with-6 pay-table-row no-boder-left">
                  {{ item.laiyuan }}
                </div>
                <div class="with-8 pay-table-row no-boder-left">
                  {{ item.yuanyin }}
                </div>
                <div class="with-6 pay-table-row no-boder-left">
                  <button
                    type="button"
                    :class="
                      item.status == 1
                        ? 'btn-customer-green'
                        : 'btn-customer-ok'
                    "
                    v-on:click.prevent="ConfigItem(event, item)"
                  >
                    {{ item.status == 1 ? "已开启" : "停用" }}
                  </button>
                </div>
                <div class="with-7 pay-table-row no-boder-left">
                  {{ item.note }}
                </div>
                <div class="with-8 pay-table-row no-boder-left">
                  {{ item.note1 }}
                </div>
                <div class="with-8 pay-table-row no-boder-left">
                  {{ item.orderTime }}
                </div>
                <div class="with-13 pay-table-row no-boder-left">
                  <div class="group-button">
                    <button
                      type="button"
                      :class="
                        item.status == 0
                          ? 'btn-customer-blue'
                          : 'btn-customer-ok'
                      "
                      v-on:click.prevent="UpdateItem(event, item)"
                    >
                      {{ item.status == 0 ? "开启" : "停用" }}
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
          :visible="showDialog"
          @configEvent="config"
          @close="closeDialog"
          title="编辑银行信息"
        >
          <div
            class="model-content-custome"
            style="padding-top: 2px; overflow: auto"
          >
            <div class="modal-content-item">
              <div class="text">
                <span>银行卡名称：</span>
              </div>
              <div class="item">
                <input
                  type="text"
                  class="form-control"
                  placeholder="银行卡名称"
                  v-model="dialogCardCode"
                  style="font-size: 12px"
                />
              </div>
            </div>
            <div class="modal-content-item">
              <div class="text">
                <span>银行名称:</span>
              </div>
              <div class="item">
                <select
                  class="form-select"
                  v-model="dialogBankCode"
                  style="font-size: 12px"
                >
                  <option value="" disabled>银行类型</option>
                  <option
                    v-for="(item, index) in bankCodes"
                    v-bind:key="index"
                    v-bind:value="item.value"
                  >
                    {{ item.title }}
                  </option>
                </select>
              </div>
            </div>
            <div class="modal-content-item">
              <div class="text">
                <span>银行卡账户：</span>
              </div>
              <div class="item">
                <input
                  type="text"
                  class="form-control"
                  placeholder="银行卡账户"
                  v-model="dialogPersonCode"
                  style="font-size: 12px"
                />
              </div>
            </div>
            <div class="modal-content-item">
              <div class="text">
                <span>银行卡用户名：</span>
              </div>
              <div class="item">
                <input
                  type="text"
                  class="form-control"
                  placeholder="银行卡用户名"
                  v-model="dialogPersonName"
                  style="font-size: 12px"
                />
              </div>
            </div>
            <div class="modal-content-item">
              <div class="text">
                <span>卡类型：</span>
              </div>
              <div class="item">
                <select
                  class="form-select"
                  v-model="dialogCardType"
                  style="font-size: 12px"
                >
                  <option value="" disabled>卡类型</option>
                  <option value="系统卡">系统卡</option>
                  <option value="代理卡">代理卡</option>
                </select>
              </div>
            </div>
            <div class="modal-content-item">
              <div class="text">
                <span>代理名称：</span>
              </div>
              <div class="item">
                <input
                  type="text"
                  class="form-control"
                  placeholder="代理名称"
                  v-model="dialogDaiName"
                  style="font-size: 12px"
                />
              </div>
            </div>
            <div class="modal-content-item">
              <div class="text">
                <span>状态：</span>
              </div>
              <div class="item">
                <select
                  class="form-select"
                  v-model="dialogStatus"
                  style="font-size: 12px"
                >
                  <option value="2" disabled>状态</option>
                  <option value="1">启用</option>
                  <option value="0">停止</option>
                </select>
              </div>
            </div>
            <div class="modal-content-item">
              <div class="text">
                <span>脚本执行状态：</span>
              </div>
              <div class="item">
                <select
                  class="form-select"
                  v-model="dialogPayStatus"
                  style="font-size: 12px"
                >
                  <option value="2" disabled>脚本执行状态</option>
                  <option value="1">启用</option>
                  <option value="0">停止</option>
                </select>
              </div>
            </div>
            <div class="modal-content-item">
              <div class="text">
                <span>实时余额：</span>
              </div>
              <div class="item">
                <input
                  type="number"
                  class="form-control"
                  placeholder="实时余额"
                  v-model="dialogNowNum"
                  style="font-size: 12px"
                />
              </div>
            </div>
            <div class="modal-content-item">
              <div class="text">
                <span>每日收款上限：</span>
              </div>
              <div class="item">
                <input
                  type="text"
                  class="form-control"
                  placeholder="每日收款上限"
                  v-model="dialogPayLiang"
                  style="font-size: 12px"
                />
              </div>
            </div>
            <div class="modal-content-item">
              <div class="text">
                <span>每日收款笔数上限：</span>
              </div>
              <div class="item">
                <input
                  type="text"
                  class="form-control"
                  placeholder="每日收款笔数上限"
                  v-model="dialogPayWeiLiang"
                  style="font-size: 12px"
                />
              </div>
            </div>
            <div class="modal-content-item">
              <div class="text">
                <span>收款金额范围：</span>
              </div>
              <div class="item">
                <input
                  type="text"
                  class="form-control"
                  placeholder="收款金额范围"
                  v-model="dialogPayGui"
                  style="font-size: 12px"
                />
              </div>
            </div>
            <div class="modal-content-item">
              <div class="text">
                <span>余额上限：</span>
              </div>
              <div class="item">
                <input
                  type="number"
                  class="form-control"
                  placeholder="余额上限"
                  v-model="dialogYuKe"
                  style="font-size: 12px"
                />
              </div>
            </div>
            <div class="modal-content-item">
              <div class="text">
                <span>备注：</span>
              </div>
              <div class="item">
                <input
                  type="text"
                  class="form-control"
                  placeholder="备注"
                  v-model="dialogBeiZhu"
                  style="font-size: 12px"
                />
              </div>
            </div>
          </div>
        </Modal>
        <Modal
          :visible="showZonghe"
          @configEvent="showZonghe = false"
          @close="showZonghe = false"
          title="总计"
          :showFooter="false"
        >
          <div
            class="model-content-custome"
            style="padding-top: 2px; overflow: auto"
          >
            <i class="layui-icon layui-timeline-axis"></i>
            <modal-item title="订单金额:">
              <span>23,002</span>
            </modal-item>
            <modal-item title="实付金额:">
              <span>0</span>
            </modal-item>
            <modal-item title="实付笔数:">
              <span>0</span>
            </modal-item>
            <modal-item title="实付手续费:">
              <span>0</span>
            </modal-item>
            <modal-item title="回调金额:">
              <span>0</span>
            </modal-item>
            <modal-item title="回调笔数:">
              <span>0</span>
            </modal-item>
            <modal-item title="掉单金额:">
              <span>0</span>
            </modal-item>
            <modal-item title="掉单笔数:">
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