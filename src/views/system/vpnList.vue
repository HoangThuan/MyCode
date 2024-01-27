<script>
import PageHeader from "@/components/page-header";
import Layout from "@/layouts/main.vue";
import { BCol } from "bootstrap-vue-next";
import Modal from "@/components/modal.vue";
import ModalItem from "@/components/modalItem.vue";
import Pagination  from "@/components/pagination.vue";
export default {
  components: {
    Layout,
    PageHeader,
    BCol,
    Modal,
    Pagination,
    ModalItem
  },
  data() {
    return {
      showDialog: false,
      showFormAdd:true,
      isAdd:true,
      searchStatus:2,
      searchVPN:"",
      searchName:"",
      dgName:"",
      dgVPN:"",
      dgBangDing:"",
      dgNote:"",
      selectIndex:0,
      listItemRoots: [
        {
          name:"1233",
          vpn:"103.188.164.56:866:linhvudieu329:l0Ks3Jp",
          status:1,
          bankNum:1,
          bankNumCard:1,
          createTime:"2023-12-29 02:29:19",
          note:"12"
        },
      ],
      listItems: [
      {
          name:"1233",
          vpn:"103.188.164.56:866:linhvudieu329:l0Ks3Jp",
          status:1,
          bankNum:"1",
          bankNumCard:"1",
          createTime:"2023-12-29 02:29:19",
          note:"12"
        },
      ],
    };
  },
  methods: {
    fiterListItem() {
      this.listItems = this.listItemRoots.filter((item) => {
        if(this.searchStatus <= 1){
          return (
          item.name.includes(this.searchName) &&
          item.vpn.includes(this.searchVPN) &&
          item.status == this.searchStatus
        );
        }
        else{
          return (
          item.name.includes(this.searchName) &&
          item.vpn.includes(this.searchVPN) 
        );
        }
      });
    },
    closeDialog() {
      this.showDialog = false;
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
    CheckVPN(){
        this.$swal({
        title: "提醒",
        icon: "question",
        iconHtml: "!",
        text:"进行VPN批量检测？",
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        showCancelButton: true,
        showCloseButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.$swal({
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        }
      });
    },
    updateStatus(event,item){
        this.$swal({
        title: "提醒",
        icon: "question",
        iconHtml: "!",
        text:"进行更新卡号的状态？",
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        showCancelButton: true,
        showCloseButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          if(item.status == 1) item.status = 0;
          else item.status = 1
          this.$swal({
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        }
      });
    },
    addItem(){
     this.showDialog = true;
     this.showFormAdd = true;
     this.isAdd = true;
     this.dgName = "";
     this.dgVPN = "";
     this.dgBangDing = "";
     this.dgNote = "";
    },
    UpdateItem(event,item,index){
     this.selectIndex = index;
     this.showDialog = true;
     this.showFormAdd = true;
     this.isAdd = false;
     this.dgName = item.name;
     this.dgVPN = item.vpn;
     this.dgBangDing = "dl001(dl001)";
     this.dgNote = item.note;
    },
    config(){
     if(this.isAdd){
        this.$swal({
        title: "提醒",
        icon: "question",
        iconHtml: "!",
        text:"进行新增VPN？",
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        showCancelButton: true,
        showCloseButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.listItems.push({
            name:this.dgName,
            vpn:this.dgVPN,
            bankNum:this.dgBangDing,
            status:1,
            bankNumCard:this.dgBangDing,
            createTime:new Date().toString(),
            note:this.dgNote
          })
          this.listItemRoots = this.listItems;
          this.$swal({
          icon: "success",
          title: "建立完毕",
          showConfirmButton: false,
          timer: 1500,
        });
        }
      });
     }
     else{
        this.$swal({
        title: "提醒",
        icon: "question",
        iconHtml: "!",
        text:"进行更新VPN？",
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        showCancelButton: true,
        showCloseButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
        this.listItems[this.selectIndex].name = this.dgName;
        this.listItems[this.selectIndex].vpn = this.dgVPN;
        this.listItems[this.selectIndex].bankNum = this.dgBangDing;
        this.listItems[this.selectIndex].bankNumCard = this.dgBangDing;
        this.listItems[this.selectIndex].note = this.dgNote;
        this.listItemRoots = this.listItems;
        this.$swal({
        icon: "success",
        title: "更新完毕",
        showConfirmButton: false,
        timer: 1500,
        });
        }
      });
     }
     this.showDialog = false;
    },



  },
};
</script>
<template>
  <Layout>
    <PageHeader title="VpnList" pageTitle="System" />
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
                  <option value=1>正常</option>
                  <option value=0>停用</option>
                </select>
              </div>
              
              <div class="search-bar-item with-12">
                <input
                  type="text"
                  class="form-control pay-bank-search-bar-input"
                  placeholder="VPN"
                  v-model="searchVPN"
                  style="font-size: 14px"
                />
              </div>
              <div class="search-bar-item with-12">
                <input
                  type="text"
                  class="form-control pay-bank-search-bar-input"
                  placeholder="姓名"
                  v-model="searchName"
                  style="font-size: 14px"
                />
              </div>
              <div class="search-bar-btn with-26" style="padding-left: 0px;height: 40px;">
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
                <button
                  type="button"
                  class="btn-customer-no"
                  style="margin-left: 8px"
                  v-on:click.prevent="addItem()"
                >
                添加VPN
                </button>
                <button
                  type="button"
                  class="btn-customer-no"
                  style="margin-left: 8px"
                  v-on:click.prevent="CheckVPN()"
                >
                  VPN批量检测
                </button>
              </div>
            </div>
          </BCol>
        </BRow>
        <BRow style="margin-top: 10px">
          <BCol lg="12">
            <div class="pay-table pay-table-title" style="text-align: center">
              <div class="with-8 pay-table-row">名称</div>
              <div class="with-26 pay-table-row no-boder-left">VPN</div>
              <div class="with-8 pay-table-row no-boder-left">状态</div>
              <div class="with-8 pay-table-row no-boder-left">绑定数量</div>
              <div class="with-8 pay-table-row no-boder-left">绑定银行数量</div>
              <div class="with-12 pay-table-row no-boder-left">添加时间</div>
              <div class="with-10 pay-table-row no-boder-left">备注</div>
              <div class="with-20 pay-table-row no-boder-left">操作</div>
            </div>
            <div v-if="listItems.length > 0">
              <div
              class="pay-table pay-table-content"
              v-for="(item, index) in listItems"
              v-bind:key="index"
            >
              <div class="with-8 pay-table-row">{{item.name}}</div>
              <div class="with-26 pay-table-row no-boder-left">{{item.vpn}}</div>
              <div class="with-8 pay-table-row no-boder-left">
                <button
                      style="margin-left: 2px"
                      type="button"
                      :class="item.status==1? 'btn-customer-green':'btn-customer-ok'"
                      v-on:click.prevent=""
                    >
                     {{ item.status == 1? "正常":"停用" }}
                    </button>
              </div>
              <div class="with-8 pay-table-row no-boder-left">{{item.bankNum}}</div>
              <div class="with-8 pay-table-row no-boder-left">{{item.bankNumCard}}</div>
              <div class="with-12 pay-table-row no-boder-left">{{item.createTime}}</div>
              <div class="with-10 pay-table-row no-boder-left">{{item.note}}</div>
              <div class="with-20 pay-table-row no-boder-left">
                <div>
                  <div class="group-button">
                    <button
                        type="button"
                        class="btn-customer-blue"
                        v-on:click.prevent="updateItem(event, item, index)"
                        style="margin-left: 2px"
                      >
                        银行列表
                      </button>
                      <button
                        type="button"
                        class="btn-customer-blue"
                        v-on:click.prevent="UpdateItem(event, item, index)"
                        style="margin-left: 2px"
                      >
                        编辑
                      </button>
                      <button
                        type="button"
                        class="btn-customer-blue"
                        v-on:click.prevent="updateStatus(event,item)"
                        style="margin-left: 2px"
                      >
                        测试
                      </button>
                      <button
                        type="button"
                        class="btn-customer-blue"
                        v-on:click.prevent="updateStatus(event,item)"
                        style="margin-left: 2px"
                      >
                        状态
                      </button>
                    <button
                      style="margin-left: 2px"
                      type="button"
                      class="btn-customer-ok"
                      v-on:click.prevent="deleteItem(event,index)"
                    >
                     删除
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
          title="添加账户"
          :showFooter="showFormAdd"
        >
          <div
            class="model-content-custome"
            style="padding-top: 2px; overflow: auto"
            v-if="showFormAdd"
          >
           <modal-item title="姓名:" :isRed="true">
            <input type="text" class="form-control" placeholder="姓名" v-model="dgName" style="font-size: 12px"/>
           </modal-item>
           <modal-item title="VPN链接:" :isRed="true">
            <input type="text" class="form-control" placeholder="VPN链接" v-model="dgVPN" style="font-size: 12px"/>
           </modal-item>

           <modal-item title="绑定代理：">
            <select class="form-select" v-model="dgBangDing" style="font-size: 14px" >
                <option value="">选择代理</option>
                <option value="dl001(dl001)">dl001(dl001)</option>
            </select>
           </modal-item>
           <modal-item title="备注：">
            <input type="text" class="form-control" placeholder="备注" v-model="dgNote" style="font-size: 12px"/>
           </modal-item>
          </div>
        <div
        class="model-content-custome"
        style="padding: 2px;"
        v-else
        >
           
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