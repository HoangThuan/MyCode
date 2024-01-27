<script>
import PageHeader from "@/components/page-header";
import Layout from "@/layouts/main.vue";
import { BCol } from "bootstrap-vue-next";
import Modal from "@/components/modal.vue";
export default {
  components: {
    Layout,
    PageHeader,
    BCol,
    Modal,
  },
  data() {
    return {
      showDialog: false,
      selectStatus: "",
      searchStatus:3,
      searchBankType:"",
      searchCardType:"",
      searchBankCardPersonName:"",
      searchDaiName:"",
      searchPersonName:"",
      searchBeiZhu:"",
      dialogCardCode:"",
      dialogBankCode:"",
      dialogPersonCardCode:"",
      dialogPersonCode:"",
      dialogPersonName:"",
      dialogCardType:"",
      dialogDaiName:"",
      dialogStatus:0,
      dialogPayStatus:0,
      dialogNowNum:0,
      dialogPayLiang:"",
      dialogPayWeiLiang:"",
      dialogPayGui:"",
      dialogYuKe:0,
      dialogBeiZhu:"",
      isAdd:true,
      selectIndex:0,
      bankCodes:[{value:'ICB',title:'ICB'},{value:'VCB',title:'VCB'},{value:'BIDV',title:'BIDV'},{value:'MB',title:'MB'},{value:'ACB',title:'ACB'},{value:'TPB',title:'TPB'}],
      listItemRoots: [
        {
          card_code: "卡008",
          bank_code: "ICB",
          bank_number: "0000092",
          person_code: "niko0917",
          person_name: "NGO KIM THI",
          type: "系统卡",
          fei_person: "",
          status: 0,
          pay_status: 0,
          now_num: 0,
          pay_liang: "无限",
          pay_wei_liang: "无限",
          pay_gui: "0~无限",
          yu_ke: 0,
          beizhu: "",
          btnEvent: false,
        },
      ],
      listItems: [
        {
          card_code: "卡008",
          bank_code: "ICB",
          bank_number: "0000092",
          person_code: "niko0917",
          person_name: "NGO KIM THI",
          type: "系统卡",
          fei_person: "",
          status: 0,
          pay_status: 0,
          now_num: 0,
          pay_liang: "无限",
          pay_wei_liang: "无限",
          pay_gui: "0~无限",
          yu_ke: 0,
          beizhu: "",
          btnEvent: false,
        },
      ],
    };
  },
  methods: {
    fiterListItem() {
      console.log("hoang thuan " + this.searchStatus.toString());
      this.listItems = this.listItemRoots.filter((item) => {
        if(this.searchStatus <= 1){
          return (
          item.bank_code.includes(this.searchBankType) &&
          item.type.includes(this.searchCardType) &&
          item.fei_person.includes(this.searchDaiName) &&
          item.person_name.includes(this.searchPersonName) &&
          item.person_code.includes(this.searchBankCardPersonName) &&
          item.beizhu.includes(this.searchBeiZhu) &&
          item.status == this.searchStatus
        );
        }
        else{
          return (
          item.bank_code.includes(this.searchBankType) &&
          item.type.includes(this.searchCardType) &&
          item.fei_person.includes(this.searchDaiName) &&
          item.person_name.includes(this.searchPersonName) &&
          item.person_code.includes(this.searchBankCardPersonName) &&
          item.beizhu.includes(this.searchBeiZhu)
        );
        }
      });
    },
    config() {
      if(this.isAdd){

        this.listItemRoots.push({ card_code: this.dialogCardCode,
          bank_code: this.dialogBankCode,
          bank_number: this.dialogPersonCardCode,
          person_code:  this.dialogPersonCode,
          person_name: this.dialogPersonName,
          type: this.dialogCardType,
          fei_person: this.dialogDaiName,
          status: this.dialogStatus,
          pay_status:  this.dialogPayStatus,
          now_num: this.dialogNowNum,
          pay_liang:  this.dialogPayLiang,
          pay_wei_liang:  this.dialogPayWeiLiang,
          pay_gui: this.dialogPayGui,
          yu_ke:  this.dialogYuKe,
          beizhu: this.dialogBeiZhu = "",
          btnEvent: false})

          this.listItems.push({ card_code: this.dialogCardCode,
          bank_code: this.dialogBankCode,
          bank_number: this.dialogPersonCardCode,
          person_code:  this.dialogPersonCode,
          person_name: this.dialogPersonName,
          type: this.dialogCardType,
          fei_person: this.dialogDaiName,
          status: this.dialogStatus,
          pay_status:  this.dialogPayStatus,
          now_num: this.dialogNowNum,
          pay_liang:  this.dialogPayLiang,
          pay_wei_liang:  this.dialogPayWeiLiang,
          pay_gui: this.dialogPayGui,
          yu_ke:  this.dialogYuKe,
          beizhu: this.dialogBeiZhu = "",
          btnEvent: false})
          
      }
      else{
        this.listItems[this.selectIndex].card_code = this.dialogCardCode;
        this.listItems[this.selectIndex].bank_code = this.dialogBankCode;
        this.listItems[this.selectIndex].bank_number = this.dialogPersonCardCode;
        this.listItems[this.selectIndex].person_code =  this.dialogPersonCode;
        this.listItems[this.selectIndex].person_name = this.dialogPersonName;
        this.listItems[this.selectIndex].type = this.dialogCardType;
        this.listItems[this.selectIndex].fei_person = this.dialogDaiName;
        this.listItems[this.selectIndex].status = this.dialogStatus;
        this.listItems[this.selectIndex].pay_status =  this.dialogPayStatus;
        this.listItems[this.selectIndex].now_num = this.dialogNowNum;
        this.listItems[this.selectIndex].pay_liang =  this.dialogPayLiang;
        this.listItems[this.selectIndex].pay_wei_liang =  this.dialogPayWeiLiang;
        this.listItems[this.selectIndex].pay_gui = this.dialogPayGui;
        this.listItems[this.selectIndex].yu_ke =  this.dialogYuKe;
        this.listItems[this.selectIndex].beizhu = this.dialogBeiZhu = "";
        this.listItems[this.selectIndex].btnEvent = false;
        this.listItemRoots = this.listItems;
      }
      this.showDialog = false;
    },
    closeDialog() {
      this.showDialog = false;
    },
    addNewItem() {
      this.isAdd =true;
      this.showDialog = true;
      this.dialogCardCode = "";
      this.dialogBankCode = "";
      this.dialogPersonCardCode = "";
      this.dialogPersonCode = "";
      this.dialogPersonName = "";
      this.dialogCardType = "";
      this.dialogDaiName = "";
      this.dialogStatus = "false";
      this.dialogPayStatus = "false";
      this.dialogNowNum = 0;
      this.dialogPayLiang = "";
      this.dialogPayWeiLiang = "";
      this.dialogPayGui = "";
      this.dialogYuKe = 0;
      this.dialogBeiZhu = "";
    },
    updateItem(event,item,index){
      this.isAdd =false;
      this.selectIndex = index;
      this.dialogCardCode = item.card_code;
      this.dialogBankCode = item.bank_code;
      this.dialogPersonCardCode = item.bank_number;
      this.dialogPersonCode = item.person_code;
      this.dialogPersonName = item.person_name;
      this.dialogCardType = item.type;
      this.dialogDaiName = item.fei_person;
      this.dialogStatus = item.status;
      this.dialogPayStatus = item.pay_status;
      this.dialogNowNum = item.now_num;
      this.dialogPayLiang = item.pay_liang;
      this.dialogPayWeiLiang = item.pay_wei_liang;
      this.dialogPayGui = item.pay_gui;
      this.dialogYuKe = item.yu_ke;
      this.dialogBeiZhu = item.beizhu;
      this.showDialog = true;
    },
    updateStatus(event,item) {
      if(item.status == 0) item.status = 1
      else item.status = 0
      this.$swal({
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
    },
    updatePayStatus(event,item) {
      if(item.pay_status == 0) item.pay_status = 1;
      else item.pay_status=0;
      this.$swal({
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
    }

  },
};
</script>
<template>
  <Layout>
    <PageHeader title="Zalo" pageTitle="Pay" />
    <div class="base-pages-content">
      <div class="card-customer-content">
        <BRow>
          <BCol lg="12">
            <div class="search-bar-content">
              <div class="search-bar-label with-4"><span>搜索: </span></div>
              <div class="search-bar-item with-8">
                <select
                  class="form-select pay-bank-search-bar-input"
                  v-model="searchStatus"
                  style="font-size: 14px"
                >
                  <option value=3>开放状态</option>
                  <option value=1>开放</option>
                  <option value=0>关闭</option>
                </select>
              </div>
              <div class="search-bar-item with-12">
                <select
                  class="form-select pay-bank-search-bar-input"
                  v-model="searchBankType"
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
                  v-model="searchCardType"
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
                  placeholder="银行卡账户"
                  v-model="searchBankCardPersonName"
                  style="font-size: 14px"
                />
              </div>
              <div class="search-bar-item with-12">
                <input
                  type="text"
                  class="form-control pay-bank-search-bar-input"
                  placeholder="代理账户"
                  v-model="searchDaiName"
                  style="font-size: 14px"
                />
              </div>
              <div class="search-bar-item with-12">
                <input
                  type="text"
                  class="form-control pay-bank-search-bar-input"
                  placeholder="账户人名称"
                  v-model="searchPersonName"
                  style="font-size: 14px"
                />
              </div>
              <div class="search-bar-item with-12">
                <input
                  type="text"
                  class="form-control pay-bank-search-bar-input"
                  placeholder="备注"
                  v-model="searchBeiZhu"
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
                  style="margin-left: 4px"
                  v-on:click.prevent="location.reload()"
                >
                  重置
                </button>
              </div>
              <div class="search-bar-btn with-8" style="padding-left: 0px">
                <button
                  type="button"
                  class="btn-customer-yellow"
                  v-on:click.prevent="addNewItem()"
                >
                  添加银行卡
                </button>
              </div>
            </div>
          </BCol>
        </BRow>
        <BRow style="margin-top: 10px">
          <BCol lg="12">
            <div class="pay-table pay-table-title" style="text-align: center">
              <div class="with-7 pay-table-row">名称</div>
              <div class="with-4 pay-table-row no-boder-left">银行</div>
              <div class="with-6 pay-table-row no-boder-left">银行卡账户</div>
              <div class="with-6 pay-table-row no-boder-left">银行卡用户名</div>
              <div class="with-8 pay-table-row no-boder-left">账户人名称</div>
              <div class="with-5 pay-table-row no-boder-left">卡类型</div>
              <div class="with-4 pay-table-row no-boder-left">代理名称</div>
              <div class="with-5 pay-table-row no-boder-left">状态</div>
              <div class="with-6 pay-table-row no-boder-left">脚本执行状态</div>
              <div class="with-5 pay-table-row no-boder-left">实时余额</div>
              <div class="with-6 pay-table-row no-boder-left">每日收款上限</div>
              <div class="with-9 pay-table-row no-boder-left">
                每日收款笔数上限
              </div>
              <div class="with-7 pay-table-row no-boder-left">收款金额范围</div>
              <div class="with-6 pay-table-row no-boder-left">余额上限</div>
              <div class="with-4 pay-table-row no-boder-left">备注</div>
              <div class="with-12 pay-table-row no-boder-left">通道Code</div>
            </div>
            <div
              class="pay-table pay-table-content"
              v-for="(item, index) in listItems"
              v-bind:key="index"
            >
              <div class="with-7 pay-table-row no-boder-top">
                {{ item.card_code }}
              </div>
              <div class="with-4 pay-table-row no-boder-left no-boder-top">
                {{ item.bank_code }}
              </div>
              <div class="with-6 pay-table-row no-boder-left no-boder-top">
                {{ item.bank_number }}
              </div>
              <div class="with-6 pay-table-row no-boder-left no-boder-top">
                {{ item.person_code }}
              </div>
              <div class="with-8 pay-table-row no-boder-left no-boder-top">
                {{ item.person_name }}
              </div>
              <div class="with-5 pay-table-row no-boder-left no-boder-top">
                {{ item.type }}
              </div>
              <div class="with-4 pay-table-row no-boder-left no-boder-top">
                {{ item.fei_person }}
              </div>
              <div
                class="with-5 pay-table-row no-boder-left no-boder-top"
                v-if="item.status != 1"
              >
                <button
                  style="margin-left: 2px"
                  type="button"
                  class="btn-customer-ok"
                  v-on:click.prevent=""
                >
                  停用
                </button>
              </div>
              <div
                class="with-5 pay-table-row no-boder-left no-boder-top"
                v-else
              >
                <button
                  style="margin-left: 2px"
                  type="button"
                  class="btn-customer-green"
                  v-on:click.prevent=""
                >
                  启用
                </button>
              </div>
              <div
                class="with-6 pay-table-row no-boder-left no-boder-top"
                v-if="item.pay_status != 1"
              >
                <button
                  style="margin-left: 2px"
                  type="button"
                  class="btn-customer-ok"
                  v-on:click.prevent=""
                >
                  停用
                </button>
              </div>
              <div
                class="with-6 pay-table-row no-boder-left no-boder-top"
                v-else
              >
                <button
                  style="margin-left: 2px"
                  type="button"
                  class="btn-customer-green"
                  v-on:click.prevent=""
                >
                  启用
                </button>
              </div>
              <div class="with-5 pay-table-row no-boder-left no-boder-top">
                {{ item.now_num }}
              </div>
              <div class="with-6 pay-table-row no-boder-left no-boder-top">
                {{ item.pay_liang }}
              </div>
              <div class="with-9 pay-table-row no-boder-left no-boder-top">
                {{ item.pay_wei_liang }}
              </div>
              <div class="with-7 pay-table-row no-boder-left no-boder-top">
                {{ item.pay_gui }}
              </div>
              <div class="with-6 pay-table-row no-boder-left no-boder-top">
                {{ item.yu_ke }}
              </div>
              <div class="with-4 pay-table-row no-boder-left no-boder-top">
                {{ item.beizhu }}
              </div>
              <div class="with-12 pay-table-row no-boder-left no-boder-top">
                <div>
                  <div class="group-button">
                    <button
                      type="button"
                      class="btn-customer-blue"
                      v-on:click.prevent="updateItem(event,item,index)"
                    >
                      编辑
                    </button>
                    <button
                      style="margin-left: 2px"
                      type="button"
                      :class="
                        item.status !=1 ? 'btn-customer-green' : 'btn-customer-ok'
                      "
                      v-on:click.prevent="updateStatus(event,item)"
                    >
                      {{ item.status !=1 ? "启用" : "停用" }}
                    </button>
                    <button
                      style="margin-left: 2px"
                      type="button"
                      :class="
                        item.pay_status !=1
                          ? 'btn-customer-green'
                          : 'btn-customer-ok'
                      "
                      v-on:click.prevent="updatePayStatus(event,item)"
                    >
                      {{ item.pay_status != 1 ? "启用脚本" : "停用" }}
                    </button>
                  </div>
                  <div class="group-button" style="margin-top: 2px">
                    <BDropdown class="cardbuton" text="更多">
                      <BDropdownItem
                        ><span class="dropdow_item_font_size"
                          >删除银行卡</span
                        ></BDropdownItem
                      >
                      <BDropdownItem
                        ><span class="dropdow_item_font_size"
                          >账户测试</span
                        ></BDropdownItem
                      >
                      <BDropdownItem
                        ><span class="dropdow_item_font_size"
                          >余额更新</span
                        ></BDropdownItem
                      >
                      <BDropdownItem
                        ><span class="dropdow_item_font_size"
                          >执行脚本</span
                        ></BDropdownItem
                      >
                      <BDropdownItem
                        ><span class="dropdow_item_font_size"
                          >脚本日志</span
                        ></BDropdownItem
                      >
                      <BDropdownItem
                        ><span class="dropdow_item_font_size"
                          >查看VPN</span
                        ></BDropdownItem
                      >
                      <BDropdownItem
                        ><span class="dropdow_item_font_size"
                          >爬虫明细</span
                        ></BDropdownItem
                      >
                    </BDropdown>
                  </div>
                </div>
              </div>
            </div>
          </BCol>
        </BRow>
        <Modal
          :visible="showDialog"
          @configEvent="config"
          @close="closeDialog"
          title="编辑银行信息"
        >
          <div class="model-content-custome" style="padding-top: 2px; overflow:auto">
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
                  <option  v-for="(item,index) in bankCodes"
                   v-bind:key="index" v-bind:value="item.value">{{item.title}}</option>
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
                ><option value=2 disabled>状态</option>
                  <option value=1>启用 </option>
                  <option value=0>停止</option>
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
                <option value=2 disabled>脚本执行状态</option>
                  <option value=1>启用 </option>
                  <option value=0>停止</option>
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