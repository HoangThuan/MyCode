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
      sbWorkTime: null,
      listItemRoots: [],
      listItems: [],
    };
  },
  methods: {
    fiterListItem() {
      this.listItems = this.listItemRoots.filter((item) => {
        console.log(this.sbOrderWt);
        console.log(this.sbWorkTime[0]);
        if (this.sbWorkTime != null) {
            return (
              item.customeID.includes(this.sbCustomeName) ||
              item.customeName.includes(this.sbCustomeName) 
            );
        } else {
            return (
              item.customeID.includes(this.sbCustomeName) ||
              item.customeName.includes(this.sbCustomeName) 
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
    <PageHeader title="Reconciliation From" pageTitle="Export" />
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
              <div class="with-5 pay-table-row no-boder-left">商户ID</div>
              <div class="with-5 pay-table-row no-boder-left">商户名称</div>
              <div class="with-6 pay-table-row no-boder-left">代收申请单数</div>
              <div class="with-7 pay-table-row no-boder-left">代收成功单数</div>
              <div class="with-7 pay-table-row no-boder-left">代收成功金额</div>
              <div class="with-7 pay-table-row no-boder-left">
                代收成功手续费
              </div>
              <div class="with-7 pay-table-row no-boder-left">代付成功单数</div>
              <div class="with-7 pay-table-row no-boder-left">
                代付成功总金额
              </div>
              <div class="with-7 pay-table-row no-boder-left">代付总手续费</div>
              <div class="with-7 pay-table-row no-boder-left">下发申请单数</div>
              <div class="with-7 pay-table-row no-boder-left">下发申请金额</div>
              <div class="with-7 pay-table-row no-boder-left">下发成功金额</div>
              <div class="with-7 pay-table-row no-boder-left">下发总手续费</div>
              <div class="with-7 pay-table-row no-boder-left">内充增加金额</div>
              <div class="with-7 pay-table-row no-boder-left">内充总手续费</div>
            </div>
            <div
              class="pay-table pay-table-content"
              v-for="(item, index) in listItems"
              v-bind:key="index"
            >
              <div class="with-5 pay-table-row no-boder-left">{{item.customeID}}</div>
              <div class="with-5 pay-table-row no-boder-left">{{item.customeName}}</div>
              <div class="with-6 pay-table-row no-boder-left">{{item.row1}}</div>
              <div class="with-7 pay-table-row no-boder-left">{{item.row2}}</div>
              <div class="with-7 pay-table-row no-boder-left">{{item.row3}}</div>
              <div class="with-7 pay-table-row no-boder-left">
                {{item.row4}}
              </div>
              <div class="with-7 pay-table-row no-boder-left">{{item.row5}}</div>
              <div class="with-7 pay-table-row no-boder-left">
                {{item.row6}}
              </div>
              <div class="with-7 pay-table-row no-boder-left">{{item.row7}}</div>
              <div class="with-7 pay-table-row no-boder-left">{{item.row8}}</div>
              <div class="with-7 pay-table-row no-boder-left">{{item.row9}}</div>
              <div class="with-7 pay-table-row no-boder-left">{{item.row10}}</div>
              <div class="with-7 pay-table-row no-boder-left">{{item.row11}}</div>
              <div class="with-7 pay-table-row no-boder-left">{{item.row12}}</div>
              <div class="with-7 pay-table-row no-boder-left">{{item.row13}}</div>
            </div>
            <div class="pay-table pay-table-title" style="text-align: center">
              <div class="with-5 pay-table-row no-boder-left">总计：</div>
              <div class="with-5 pay-table-row no-boder-left"></div>
              <div class="with-6 pay-table-row no-boder-left">0</div>
              <div class="with-7 pay-table-row no-boder-left">0</div>
              <div class="with-7 pay-table-row no-boder-left">0</div>
              <div class="with-7 pay-table-row no-boder-left">0</div>
              <div class="with-7 pay-table-row no-boder-left">0</div>
              <div class="with-7 pay-table-row no-boder-left">0</div>
              <div class="with-7 pay-table-row no-boder-left">0</div>
              <div class="with-7 pay-table-row no-boder-left">0</div>
              <div class="with-7 pay-table-row no-boder-left">0</div>
              <div class="with-7 pay-table-row no-boder-left">0</div>
              <div class="with-7 pay-table-row no-boder-left">0</div>
              <div class="with-7 pay-table-row no-boder-left">0</div>
              <div class="with-7 pay-table-row no-boder-left">0</div>
            </div>
            <div v-if="listItems.length > 0"></div>
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