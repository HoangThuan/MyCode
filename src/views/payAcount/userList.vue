<script>
import PageHeader from "@/components/page-header";
import Layout from "@/layouts/main.vue";
import { BCol } from "bootstrap-vue-next";
import Modal from "@/components/modal.vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import ModalItem from "@/components/modalItem.vue";
import VueQRCodeComponent from 'vue-qrcode-component'
export default {
  components: {
    Layout,
    PageHeader,
    BCol,
    Modal,
    VueDatePicker,
    ModalItem,
    VueQRCodeComponent
  },
  data() {
    return {
      showQrCode:false,
      showDialog: false,
      isAddItem:true,
      showFormAdd:false,
      sbStatus:2,
      sbJiaoCe:"",
      sbUser:"",
      sbUserName:"",
      sbGuoji:"",
      sbBeizhu:"",
      dgName:"",
      dgUserName:"",
      dgPassword:"",
      dgConfigPassword:"",
      dgJiaoCe:"",
      dgPhoneNumber:"",
      dgNote:"",
      dgSaoma:"",
      dgMinMony:0,
      dgSendMony:"",
      dgMaxMony:0,
      dgneiChong:"",
      dgBankInfo:"",
      listItemRoots: [{
        name: "3333",
          userName: "3333",
          jiaoCe: "出款人员",
          daiUserName: "",
          guoJi: "",
          status:1,
          onlineStatus:1,
          orderWt:0,
          createTime:"2024-01-12 11:43:39",
          lastTime:"2024-01-12 11:43:39",
          mony:22355,
          url:"https://pay2world.me/merchant/login/nqE7sXLvDEBtUdm68hmo7U",
          note:"333"
        },],
      listItems: [
        {
          name: "3333",
          userName: "3333",
          jiaoCe: "出款人员",
          daiUserName: "",
          guoJi: "",
          status:1,
          onlineStatus:1,
          orderWt:0,
          createTime:"2024-01-12 11:43:39",
          lastTime:"2024-01-12 11:43:39",
          mony:22355,
          url:"https://pay2world.me/merchant/login/nqE7sXLvDEBtUdm68hmo7U",
          note:"333"
        },
      ],
      roles:[
        {title:"收款管理",roleItems:[
          {name:"银行卡管理权限",status:false},
          {name:"Zalo账户管理权限",status:false},
          {name:"ViettelPay管理权限",status:false},
          {name:"Momo管理权限",status:false},
          {name:"收款银行管理",status:false},
          {name:"总计管理",status:false},
          {name:"银行脚本管理",status:false},
        ]},
        {title:"收款管理",roleItems:[
          {name:"银行卡管理权限",status:false},
          {name:"Zalo账户管理权限",status:false},
          {name:"ViettelPay管理权限",status:false},
          {name:"Momo管理权限",status:false},
          {name:"收款银行管理",status:false},
          {name:"总计管理",status:false},
          {name:"银行脚本管理",status:false},
        ]}
      ]
    };
  },
  methods: {
    fiterListItem() {
      this.listItems = this.listItemRoots.filter((item) => {
        if(this.sbStatus <2){
            return(
                item.status == this.sbStatus &&
                item.jiaoCe.includes(this.sbJiaoCe) &&
                item.name.includes(this.sbUser) &&
                item.userName.includes(this.sbUserName) &&
                item.guoJi.includes(this.sbGuoji) &&
                item.note.includes(this.sbBeizhu)
            )
        }
        else{
            return(
                item.jiaoCe.includes(this.sbJiaoCe) &&
                item.name.includes(this.sbUser) &&
                item.userName.includes(this.sbUserName) &&
                item.guoJi.includes(this.sbGuoji) &&
                item.note.includes(this.sbBeizhu)
            )
        }
      });
    },
    addNewItem(){
      this.showDialog = true;
      this.showFormAdd = true;
      this.isAddItem = true;
      this.dgName = "";
      this.dgUserName = "";
      this.dgPassword = "";
      this.dgConfigPassword = "";
      this.dgJiaoCe = "";
      this.dgPhoneNumber = "";
      this.dgNote = "";
      this.dgSaoma = "";
      this.dgSendMony = "";
      this.dgneiChong = "";

    },
    UpdateItem(event, item){
      this.showDialog = true;
      this.showFormAdd = true;
      this.isAddItem = false;
      this.dgName = item.name;
      this.dgUserName = item.userName;
      this.dgPassword = "";
      this.dgConfigPassword = "";
      this.dgPhoneNumber = "25251325";
      this.dgNote = item.note;
      this.dgMinMony = 0;
      this.dgMaxMony = 0;
      this.dgBankInfo = "";
    },
    RoleUpdate(event, item){
      this.showDialog = true;
      this.showFormAdd = false;
    },
    config() {
      if (this.isAddItem) {
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
          this.$swal({
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        }
      });
      } else 
      {
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
          this.$swal({
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        }
      });
      }
      this.showDialog = false;
    },
    deleteItem(event, index){
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
    closeDialog() {
      this.showDialog = false;
    },
  },
};
</script>
<template>
  <Layout>
    <PageHeader title="Pay Account" pageTitle="Dashboards" />
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
                  <option value=2>状态</option>
                  <option value=1>正常</option>
                  <option value=0>禁用</option>
                </select>
              </div>
              <div class="search-bar-item with-8">
                <select
                  class="form-select pay-bank-search-bar-input"
                  v-model="sbJiaoCe"
                  style="font-size: 14px"
                >
                  <option value="">角色</option>
                  <option value="Root管理员">Root管理员</option>
                  <option value="代理商">代理商</option>
                  <option value="代理子账户">代理子账户</option>
                  <option value="普通管理员">普通管理员</option>
                  <option value="出款人员">出款人员</option>
                </select>
              </div>
              
              <div class="search-bar-item with-12">
                <input
                  type="text"
                  class="form-control pay-bank-search-bar-input"
                  placeholder="登录账户"
                  v-model="sbUser"
                  style="font-size: 14px"
                />
              </div>
              <div class="search-bar-item with-12">
                <input
                  type="text"
                  class="form-control pay-bank-search-bar-input"
                  placeholder="姓名"
                  v-model="sbUserName"
                  style="font-size: 14px"
                />
              </div>
              <div class="search-bar-item with-12">
                <input
                  type="text"
                  class="form-control pay-bank-search-bar-input"
                  placeholder="邮箱"
                  v-model="sbGuoji"
                  style="font-size: 14px"
                />
              </div>
              <div class="search-bar-item with-12">
                <input
                  type="text"
                  class="form-control pay-bank-search-bar-input"
                  placeholder="备注"
                  v-model="sbBeizhu"
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
              <div class="search-bar-btn with-8" style="padding-left: 0px;height: 40px;">
                <button
                  type="button"
                  class="btn-customer-no"
                  v-on:click.prevent="addNewItem()"
                >
                  添加账户
                </button>
              </div>
            </div>
          </BCol>
        </BRow>
        <BRow style="margin-top: 10px">
          <BCol lg="12">
            <div class="pay-table pay-table-title" style="text-align: center">
              <div class="with-5 pay-table-row">姓名</div>
              <div class="with-5 pay-table-row no-boder-left">登录账名</div>
              <div class="with-6 pay-table-row no-boder-left">角色</div>
              <div class="with-4 pay-table-row no-boder-left">代理商账户</div>
              <div class="with-4 pay-table-row no-boder-left">邮箱</div>
              <div class="with-4 pay-table-row no-boder-left">状态</div>
              <div class="with-4 pay-table-row no-boder-left">在线状态</div>
              <div class="with-4 pay-table-row no-boder-left">未处理订单数量</div>
              <div class="with-8 pay-table-row no-boder-left">创建时间</div>
              <div class="with-8 pay-table-row no-boder-left">最近登录时间</div>
              <div class="with-5 pay-table-row no-boder-left">余额</div>
              <div class="with-23 pay-table-row no-boder-left">商户登录地址</div>
              <div class="with-5 pay-table-row no-boder-left">备注</div>
              <div class="with-15 pay-table-row no-boder-left">操作</div>
            </div>
            <div v-if="listItems.length > 0">
              <div
                class="pay-table pay-table-content"
                v-for="(item, index) in listItems"
                v-bind:key="index"
              >
              <div class="with-5 pay-table-row">{{item.name}}</div>
              <div class="with-5 pay-table-row no-boder-left">{{item.userName}}</div>
              <div class="with-6 pay-table-row no-boder-left">{{item.jiaoCe}}</div>
              <div class="with-4 pay-table-row no-boder-left">{{item.daiUserName}}</div>
              <div class="with-4 pay-table-row no-boder-left">{{item.guoJi}}</div>
              <div class="with-4 pay-table-row no-boder-left">
                <button
                        type="button"
                        :class="item.status ==1?'btn-customer-green':'btn-customer-ok'"
                        v-on:click.prevent="ConfigItem(event, item)"
                      >
                        {{item.status == 1?"正常":"禁用"}}
                      </button>
              </div>
              <div class="with-4 pay-table-row no-boder-left">
                <button
                        type="button"
                        :class="item.onlineStatus ==1?'btn-customer-green':'btn-customer-ok'"
                        v-on:click.prevent="ConfigItem(event, item)"
                      >
                        {{item.onlineStatus == 1?"在线":"离线"}}
                      </button>
              </div>
              <div class="with-4 pay-table-row no-boder-left">{{item.orderWt}}</div>
              <div class="with-8 pay-table-row no-boder-left">{{item.createTime}}</div>
              <div class="with-8 pay-table-row no-boder-left">{{item.lastTime}}</div>
              <div class="with-5 pay-table-row no-boder-left">{{item.mony}}</div>
              <div class="with-23 pay-table-row no-boder-left">{{item.url}}</div>
              <div class="with-5 pay-table-row no-boder-left">{{item.note}}</div>
                <div class="with-15 pay-table-row no-boder-left">
                    <div class="group-button">
                      <button
                        type="button"
                        class="btn-customer-blue"
                        v-on:click.prevent="UpdateItem(event, item)"
                      >
                        编辑
                      </button>
                      <button
                        type="button"
                        class="btn-customer-blue"
                        v-on:click.prevent="RoleUpdate(event, item)"
                        style="margin-left:2px"
                      >
                        权限
                      </button>
                      <button
                        type="button"
                        class="btn-customer-ok"
                        v-on:click.prevent="deleteItem(event, index)"
                        style="margin-left:2px"
                      >
                        删除
                      </button>
                      <BDropdown class="cardbuton" text="更多" style="margin-left:2px">
                          <BDropdownItem v-on:click="showQrCode = true"
                            ><span class="dropdow_item_font_size"
                              >Google验证码</span
                            ></BDropdownItem
                          >
                          <BDropdownItem
                            ><span class="dropdow_item_font_size"
                              >出款卡记录</span
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
           <modal-item title="账户:" :isRed="true">
            <input type="text" class="form-control" placeholder="账户" v-model="dgUserName" style="font-size: 12px"/>
           </modal-item>
           <modal-item title="密码：" :isRed="true">
            <input type="text" class="form-control" placeholder="密码" v-model="dgPassword" style="font-size: 12px"/>
           </modal-item>
           <modal-item title="确认密码：" :isRed="true">
            <input type="text" class="form-control" placeholder="确认密码" v-model="dgConfigPassword" style="font-size: 12px"/>
           </modal-item>

           <modal-item title="用户角色：" :isRed="true" v-if="isAddItem">
            <select class="form-select" v-model="dgJiaoCe" style="font-size: 14px" >
                <option value="">角色</option>
                <option value="Root管理员">Root管理员</option>
                <option value="代理商">代理商</option>
                <option value="代理子账户">代理子账户</option>
                <option value="普通管理员">普通管理员</option>
                <option value="出款人员">出款人员</option>
            </select>
           </modal-item>

           <modal-item title="电话：">
            <input type="text" class="form-control" placeholder="电话" v-model="dgPhoneNumber" style="font-size: 12px"/>
           </modal-item>
           <modal-item title="备注：">
            <input type="text" class="form-control" placeholder="备注" v-model="dgNote" style="font-size: 12px"/>
           </modal-item>
           <modal-item title="入款-银行扫码费率% :" v-if="isAddItem">
            <input type="text" class="form-control" placeholder="入款-银行扫码费率" v-model="dgSaoma" style="font-size: 12px"/>
           </modal-item>
           <modal-item title="出款最小值：" v-else>
            <input type="number" class="form-control" placeholder="出款最小值" v-model="dgMinMony" style="font-size: 12px"/>
           </modal-item>
           <modal-item title="代付费率%:" v-if="isAddItem">
            <input type="text" class="form-control" placeholder="代付费率" v-model="dgSendMony" style="font-size: 12px"/>
           </modal-item>
           <modal-item title="出款最大值：" v-else>
            <input type="number" class="form-control" placeholder="出款最大值" v-model="dgMaxMony" style="font-size: 12px"/>
           </modal-item>
           <modal-item title="内充利率%:" v-if="isAddItem">
            <input type="text" class="form-control" placeholder="内充利率" v-model="dgneiChong" style="font-size: 12px"/>
           </modal-item>
           <modal-item title="出款银行卡信息:" v-else>
            <input type="text" class="form-control" placeholder="出款银行卡信息" v-model="dgBankInfo" style="font-size: 12px"/>
           </modal-item>
           
          </div>
          <div
            class="model-content-custome"
            style="padding: 2px;"
            v-else
          >
           <div class="role-dialog-title">
            <div class="row1">
              菜单名
            </div>
            <div class="row2">
              拥有权重
            </div>
          </div>
          <div class="role-dialog-content" v-for="(item,index) in roles" v-bind:key="index">
            <div class="row1">
              {{item.title}}
            </div>
            <div class="row2">
              <BCol lg="12">
                <button
                style="margin-left: 2px;margin-top: 2px;"
                type="button"
                v-for="(itemRole,index1) in item.roleItems"
                v-bind:key="index1"
                :class="itemRole.status?'btn-customer-ok':'btn-customer-no-back'"
                v-on:click.prevent="itemRole.status = !itemRole.status"
              >
                {{ itemRole.name }}
              </button>
              </BCol>
            </div>
          </div>
          <div class="role-dialog-content">
            <div class="row1">
              代付管理
            </div>
            <div class="row2">
              <BCol lg="12">
                <button
                style="margin-left: 2px;margin-top: 2px;"
                type="button"
                class="btn-customer-success"
                v-on:click.prevent=""
              >
                <span><i class="bi bi-check-circle-fill" style="margin-right: 4px;"></i>已开放</span>
              </button>
              </BCol>
            </div>
          </div>
        </div>
        </Modal>
        <Modal
          :visible="showQrCode"
          @configEvent="config"
          @close="showQrCode = false"
          title=""
          :showFooter="false"
          size=" "
        >
          <div
            class="model-content-custome"
            style="padding: 0px; overflow: auto"
          >
          <VueQRCodeComponent
            text="https://goo.gl/9eIWP9"
            size="450"
            error-level="L">
        </VueQRCodeComponent>

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