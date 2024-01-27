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
            item.orderNo.includes(this.sbOrderNo) 
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
    <PageHeader title="Callback Reconrd" pageTitle="Merchant" />
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
              <div class="with-12 pay-table-row no-boder-left">回调内容</div>
              <div class="with-4 pay-table-row no-boder-left">状态</div>
              <div class="with-4 pay-table-row no-boder-left">响应CODE</div>
              <div class="with-20 pay-table-row no-boder-left">响应内容</div>
              <div class="with-6 pay-table-row no-boder-left">备注</div>
              <div class="with-10 pay-table-row no-boder-left">时间</div>
              <div class="with-12 pay-table-row no-boder-left">操作</div>
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
                <div class="with-12 pay-table-row no-boder-left">
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
                <div class="with-20 pay-table-row no-boder-left">
                  {{ item.reContent }}
                </div>
                <div class="with-6 pay-table-row no-boder-left">
                  {{ item.note }}
                </div>
                <div class="with-10 pay-table-row no-boder-left">
                  {{ item.workTime }}
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