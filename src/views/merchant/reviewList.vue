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
      sbCustomeName:"",
      sbCustomeCode:"",
      listItemRoots: [
      {
          customeID: "RW5269310185",
          customeName: "1123",
          customeCode: "12343535341",
          status: 0,
          note:"",
        },
      ],
      listItems: [
        {
          customeID: "RW5269310185",
          customeName: "1123",
          customeCode: "12343535341",
          status: 0,
          note:"",
        },
      ],
    };
  },
  methods: {
    fiterListItem() {
      this.listItems = this.listItemRoots.filter((item) => {
        return (
            item.customeCode.includes(this.sbCustomeCode) &&
            item.customeName.includes(this.sbCustomeName) 
          );
      });
    },
    config() {
      if (this.isAdd) {
      } else {
      }
      this.showDialog = false;
    },
    ConfigItem(event, item){
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
    <PageHeader title="Review List" pageTitle="Merchant" />
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
                  placeholder="账户"
                  v-model="sbCustomeCode"
                  style="font-size: 14px"
                />
              </div>
              <div class="search-bar-item with-12">
                <input
                  type="text"
                  class="form-control pay-bank-search-bar-input"
                  placeholder="名称"
                  v-model="sbCustomeName"
                  style="font-size: 14px"
                />
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
              <div class="with-17 pay-table-row">商户ID</div>
              <div class="with-17 pay-table-row no-boder-left">商户名称</div>
              <div class="with-17 pay-table-row no-boder-left">账户</div>
              <div class="with-16 pay-table-row no-boder-left">审核状态</div>
              <div class="with-16 pay-table-row no-boder-left">备注</div>
              <div class="with-17 pay-table-row no-boder-left">操作</div>
            </div>
            <div v-if="listItems.length > 0">
              <div
                class="pay-table pay-table-content"
                v-for="(item, index) in listItems"
                v-bind:key="index"
              >
              <div class="with-17 pay-table-row">{{item.customeID}}</div>
              <div class="with-17 pay-table-row no-boder-left">{{item.customeName}}</div>
              <div class="with-17 pay-table-row no-boder-left">{{item.customeCode}}</div>
              <div class="with-16 pay-table-row no-boder-left">
                <button
                        type="button"
                        :class="item.status == 1? 'btn-customer-green':'btn-customer-ok'"
                        v-on:click.prevent="ConfigItem(event, item)"
                      >
                        {{item.status == 1? '已审核':'未审核'}}
                      </button>
              </div>
              <div class="with-16 pay-table-row no-boder-left">{{item.note}}</div>
                <div class="with-17 pay-table-row no-boder-left">
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
                        style="margin-left:2px"
                      >
                        详细
                      </button>
                      <BDropdown class="cardbuton" text="更多" style="margin-left:2px">
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
          @configEvent="showZonghe= false"
          @close="showZonghe= false"
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