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
      searchStatus:2,
      searchBankCardPersonName:"",
      searchBeiZhu:"",
      dgBankName:"",
      dgFormCode:"",
      dgdeviceId:"",
      dgPassword:"",
      dgCardID:"",
      dgPersonName:"",
      dgMony:0,
      dialogStatus:0,
      dialogPayStatus:0,
      dgBeiZhu:"",
      isAdd:true,
      selectIndex:0,
      listItemRoots: [
        {
          bankName: "卡008",
          formCode: "ICB",
          deviceId: "0000092",
          password: "niko0917",
          cardID: "NGO KIM THI",
          personName: "系统卡",
          mony: "",
          status: 0,
          pay_status: 0,
          beizhu: ""
        },
      ],
      listItems: [
      {
          bankName: "卡008",
          formCode: "ICB",
          deviceId: "0000092",
          password: "niko0917",
          cardID: "NGO KIM THI",
          personName: "系统卡",
          mony: "",
          status: 0,
          pay_status: 0,
          beizhu: ""
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
          item.cardID.includes(this.searchBankCardPersonName) &&
          item.beizhu.includes(this.searchBeiZhu) &&
          item.status == this.searchStatus
        );
        }
        else{
          return (
          item.cardID.includes(this.searchBankCardPersonName) &&
          item.beizhu.includes(this.searchBeiZhu) 
        );
        }
      });
    },
    config() {
      if(this.isAdd){
        this.listItemRoots.push({ 
            bankName: this.dgBankName,
            formCode: this.dgFormCode,
            deviceId: this.dgdeviceId,
            password:  this.dgPassword,
            cardID: this.dgCardID,
            personName: this.dgPersonName,
            mony: this.dgMony,
            status: this.dialogStatus,
            pay_status:  this.dialogPayStatus,
            beizhu: this.dialogBeiZhu = this.dgBeiZhu})

            this.listItems.push({ 
            bankName: this.dgBankName,
            formCode: this.dgFormCode,
            deviceId: this.dgdeviceId,
            password:  this.dgPassword,
            cardID: this.dgCardID,
            personName: this.dgPersonName,
            mony: this.dgMony,
            status: this.dialogStatus,
            pay_status:  this.dialogPayStatus,
            beizhu: this.dialogBeiZhu = this.dgBeiZhu})
          
      }
      else{
        this.listItems[this.selectIndex].bankName = this.dgBankName,
        this.listItems[this.selectIndex].formCode = this.dgFormCode,
        this.listItems[this.selectIndex].deviceId = this.dgdeviceId,
        this.listItems[this.selectIndex].password =  this.dgPassword,
        this.listItems[this.selectIndex].cardID = this.dgCardID,
        this.listItems[this.selectIndex].personName = this.dgPersonName,
        this.listItems[this.selectIndex].mony = this.dgMony,
        this.listItems[this.selectIndex].status = this.dialogStatus,
        this.listItems[this.selectIndex].pay_status =  this.dialogPayStatus,
        this.listItems[this.selectIndex].beizhu = this.dialogBeiZhu = this.dgBeiZhu
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
      this.dgBankName = "";
      this.dgFormCode = "";
      this.dgdeviceId = "";
      this.dgPassword = "";
      this.dgCardID = "";
      this.dgPersonName = "";
      this.dgMony = 0;
      this.dialogStatus = "false";
      this.dialogPayStatus = "false";
      this.dgBeiZhu = "";
    },
    updateItem(event,item,index){
      this.isAdd =false;
      this.selectIndex = index;
      this.dgBankName = item.bankName;
      this.dgFormCode = item.formCode;
      this.dgdeviceId = item.deviceId;
      this.dgPassword = item.password;
      this.dgCardID = item.cardID;
      this.dgPersonName = item.personName;
      this.dgMony = item.mony;
      this.dialogStatus = item.status;
      this.dialogPayStatus = item.pay_status;
      this.dgBeiZhu = item.beizhu;
      this.showDialog = true;
    },
    deleteItem(event,index){
        this.$swal({
        title: "提醒",
        icon: "question",
        iconHtml: "!",
        text:"进行删除卡号？",
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        showCancelButton: true,
        showCloseButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.listItems.splice(index,1)
          this.listItemRoots = this.listItems
          this.$swal({
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        }
      });
    },
    updatePayStatus(event,item) {
        this.$swal({
        title: "提醒",
        icon: "question",
        iconHtml: "?",
        text:"更新脚本状态？",
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        showCancelButton: true,
        showCloseButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
            if(item.pay_status == 0) item.pay_status = 1;
            else item.pay_status=0;
          this.$swal({
          icon: "success",
          title: "更新完毕",
          showConfirmButton: false,
          timer: 1500,
        });
        }
      });
    }

  },
};
</script>
<template>
  <Layout>
    <PageHeader title="AutomaticScript" pageTitle="PayManagement" />
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
                  <option value=2>账户状态</option>
                  <option value=1>开放</option>
                  <option value=0>关闭</option>
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
                  placeholder="备注"
                  v-model="searchBeiZhu"
                  style="font-size: 14px"
                />
              </div>
              <div class="search-bar-btn with-8" style="padding-left: 0px;height: 40px;">
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
              <div class="search-bar-btn with-8" style="padding-left: 0px;height: 40px;">
                <button
                  type="button"
                  class="btn-customer-no"
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
              <div class="with-8 pay-table-row no-boder-left">桌面编号</div>
              <div class="with-8 pay-table-row no-boder-left">设备Id</div>
              <div class="with-20 pay-table-row no-boder-left">密钥</div>
              <div class="with-10 pay-table-row no-boder-left">银行卡号</div>
              <div class="with-10 pay-table-row no-boder-left">银行卡人姓名</div>
              <div class="with-6 pay-table-row no-boder-left">银行卡余额</div>
              <div class="with-6 pay-table-row no-boder-left">状态</div>
              <div class="with-6 pay-table-row no-boder-left">脚本状态</div>
              <div class="with-8 pay-table-row no-boder-left">备注</div>
              <div class="with-12 pay-table-row no-boder-left">操作</div>
            </div>
            <div v-if="listItems.length > 0">
              <div
              class="pay-table pay-table-content"
              v-for="(item, index) in listItems"
              v-bind:key="index"
            >
              <div class="with-7 pay-table-row">{{item.bankName}}</div>
              <div class="with-8 pay-table-row no-boder-left">{{item.formCode}}</div>
              <div class="with-8 pay-table-row no-boder-left">{{item.deviceId}}</div>
              <div class="with-20 pay-table-row no-boder-left">{{item.password}}</div>
              <div class="with-10 pay-table-row no-boder-left">{{item.cardID}}</div>
              <div class="with-10 pay-table-row no-boder-left">{{item.personName}}</div>
              <div class="with-6 pay-table-row no-boder-left">{{item.mony}}</div>
              <div class="with-6 pay-table-row no-boder-left">
                <button
                      style="margin-left: 2px"
                      type="button"
                      :class="item.status == 1?'btn-customer-green':'btn-customer-ok'"
                      v-on:click.prevent=""
                    >
                     {{item.status == 1? "已启用":"已关闭"}}
                </button>
              </div>
              <div class="with-6 pay-table-row no-boder-left">
                <button
                      style="margin-left: 2px"
                      type="button"
                      :class="item.pay_status == 1?'btn-customer-green':'btn-customer-ok'"
                      v-on:click.prevent=""
                    >
                     {{item.pay_status == 1? "已启用":"已停用"}}
                </button>
              </div>
              <div class="with-8 pay-table-row no-boder-left">{{item.beizhu}}</div>
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
                      class="btn-customer-ok"
                      v-on:click.prevent="deleteItem(event,index)"
                    >
                     删除
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
                </div>
              </div>
            </div>
            </div>
            <div v-else class="not_content">
              <img src="@/assets/images/nocontent/no_data.png"/>
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
          <div class="model-content-custome" style="padding-top: 2px; overflow:auto">
            <div class="modal-content-item">
            <div class="text">
              <span>名称：</span>
            </div>
            <div class="item">
              <input
                type="text"
                class="form-control"
                placeholder="名称"
                v-model="dgBankName"
                style="font-size: 12px"
              />
            </div>
          </div>
            <div class="modal-content-item">
              <div class="text">
                <span>桌面编号:</span>
              </div>
              <div class="item">
                <input
                type="text"
                class="form-control"
                placeholder="桌面编号"
                v-model="dgFormCode"
                style="font-size: 12px"
              />
              </div>
            </div>
            <div class="modal-content-item">
              <div class="text">
                <span>设备Id：</span>
              </div>
              <div class="item">
                <input
                  type="text"
                  class="form-control"
                  placeholder="设备Id"
                  v-model="dgdeviceId"
                  style="font-size: 12px"
                />
              </div>
            </div>
            <div class="modal-content-item">
              <div class="text">
                <span>密钥：</span>
              </div>
              <div class="item">
                <input
                  type="text"
                  class="form-control"
                  placeholder="密钥"
                  v-model="dgPassword"
                  style="font-size: 12px"
                />
              </div>
            </div>
            <div class="modal-content-item">
              <div class="text">
                <span>银行卡号：</span>
              </div>
              <div class="item">
                <input
                  type="text"
                  class="form-control"
                  placeholder="银行卡号"
                  v-model="dgCardID"
                  style="font-size: 12px"
                />
              </div>
            </div>
            <div class="modal-content-item">
              <div class="text">
                <span>银行卡人姓名：</span>
              </div>
              <div class="item">
                <input
                  type="text"
                  class="form-control"
                  placeholder="银行卡人姓名"
                  v-model="dgPersonName"
                  style="font-size: 12px"
                />
              </div>
            </div>
            <div class="modal-content-item">
              <div class="text">
                <span>银行卡余额：</span>
              </div>
              <div class="item">
                <input
                  type="number"
                  class="form-control"
                  placeholder="银行卡余额"
                  v-model="dgMony"
                  style="font-size: 12px"
                />
              </div>
            </div>
            <div class="modal-content-item">
              <div class="text">
                <span>账户状态：</span>
              </div>
              <div class="item">
                <select
                  class="form-select"
                  v-model="dialogStatus"
                  style="font-size: 12px"
                ><option value=2 disabled>账户状态</option>
                  <option value=1>启用 </option>
                  <option value=0>停止</option>
                </select>
              </div>
            </div>
            <div class="modal-content-item">
              <div class="text">
                <span>脚本状态：</span>
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
                <span>备注：</span>
              </div>
              <div class="item">
                <input
                  type="text"
                  class="form-control"
                  placeholder="备注"
                  v-model="dgBeiZhu"
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