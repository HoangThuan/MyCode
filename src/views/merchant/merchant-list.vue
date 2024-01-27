<script>
import PageHeader from "@/components/page-header";
import Layout from "@/layouts/main.vue";
import { BCol } from "bootstrap-vue-next";
import Modal from "@/components/modal.vue";
import ModalItem from "@/components/modalItem.vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
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
      date: null,
      showDialog: false,
      neiChongDialog:false,
      selectStatus: "",
      searchStatus: 3,
      searchBankType: "",
      searchCardType: "",
      searchBankCardPersonName: "",
      searchDaiName: "",
      searchPersonName: "",
      searchBeiZhu: "",
      dialogId:"",
      dialogkehu_mingcheng: "",
      dialogkehu_zhuanghu: "",
      dialogdaili_zhuanghu: "",
      dialogliu_shui: 0,
      dialoglv_li: 0,
      dialogbeizhu: "",
      dialogPassWord:"",
      dialogConfigPassWord:"",
      dialogIp:"",
      dialogNeibu:0,
      isAdd: true,
      selectIndex: 0,
      bankCodes: [
        { value: "按注册时间倒序", title: "按注册时间倒序" },
        { value: "按注册时间顺序", title: "按注册时间顺序" },
        { value: "按金额顺序", title: "按金额顺序" },
        { value: "按金额倒序", title: "按金额倒序" },
        { value: "按今日流水倒序", title: "按今日流水倒序" },
      ],
      listItemRoots: [],
      listItems: [
        {
          kehu_id: "卡008",
          kehu_mingcheng: "ICB",
          kehu_zhuanghu: "0000092",
          daili_zhuanghu: "niko0917",
          daili_mingcheng: "fdf",
          keyong_yujin: "",
          shenqing_status: 1,
          zhuanghu_status: 1,
          liu_shui: 0,
          lv_li: "20%",
          beizhu: "无限",
          zhu_she: "0~无限",
          yu_ke: 0,
        },
      ],
    };
  },
  methods: {
    fiterListItem() {
      this.listItems = this.listItemRoots.filter((item) => {
        if (this.searchStatus <= 1) {
          return (
            item.bank_code.includes(this.searchBankType) &&
            item.type.includes(this.searchCardType) &&
            item.fei_person.includes(this.searchDaiName) &&
            item.person_name.includes(this.searchPersonName) &&
            item.person_code.includes(this.searchBankCardPersonName) &&
            item.beizhu.includes(this.searchBeiZhu) &&
            item.status == this.searchStatus
          );
        } else {
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
      if (this.isAdd) {
      
      } else {
        
      }
      this.showDialog = false;
    },
    configNeiChong(){

    },
    closeDialog() {
      this.showDialog = false;
    },
    closeNeiChongDialog() {
      this.neiChongDialog = false;
    },
    addNewItem() {
      this.isAdd = true;
      this.dialogkehu_mingcheng = ""
      this.dialogkehu_zhuanghu = ""
      this.showDialog = true;
    },
    updateItem(event, item, index) {
      this.isAdd = false;
      this.dialogkehu_mingcheng = item.kehu_mingcheng
      this.dialogkehu_zhuanghu = item.kehu_zhuanghu
      this.showDialog = true;
    },
    updateNeiChong(event,item){

       this.neiChongDialog =true;
       this.dialogId = item.kehu_id;
       this.dialogkehu_mingcheng = item.kehu_mingcheng;
    }
  },
};
</script>
<template>
  <Layout>
    <PageHeader title="Merchant List" pageTitle="Merchant" />
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
                  <option value="3">开放状态</option>
                  <option value="1">开放</option>
                  <option value="0">关闭</option>
                </select>
              </div>
              <div class="search-bar-item with-10">
                <input
                  type="text"
                  class="form-control pay-bank-search-bar-input"
                  placeholder="备注"
                  v-model="searchBeiZhu"
                  style="font-size: 14px"
                />
              </div>
              <div class="search-bar-item with-10">
                <input
                  type="text"
                  class="form-control pay-bank-search-bar-input"
                  placeholder="银行卡账户"
                  v-model="searchBankCardPersonName"
                  style="font-size: 14px"
                />
              </div>
              <div class="search-bar-item with-10">
                <input
                  type="text"
                  class="form-control pay-bank-search-bar-input"
                  placeholder="代理账户"
                  v-model="searchDaiName"
                  style="font-size: 14px"
                />
              </div>
              <div class="search-bar-item with-10">
                <input
                  type="text"
                  class="form-control pay-bank-search-bar-input"
                  placeholder="账户人名称"
                  v-model="searchPersonName"
                  style="font-size: 14px"
                />
              </div>
              <div class="search-bar-item with-10">
                <input
                  type="text"
                  class="form-control pay-bank-search-bar-input"
                  placeholder="备注"
                  v-model="searchBeiZhu"
                  style="font-size: 14px"
                />
              </div>
              <div class="search-bar-item with-12">
                <VueDatePicker
                  v-model="date"
                  class="datapicker"
                ></VueDatePicker>
              </div>
              <div class="search-bar-item with-10">
                <select
                  class="form-select pay-bank-search-bar-input"
                  v-model="searchBankType"
                  style="font-size: 14px"
                >
                  <option value="">排序方式</option>
                  <option
                    v-for="(item, index) in bankCodes"
                    v-bind:key="index"
                    v-bind:value="item.value"
                  >
                    {{ item.title }}
                  </option>
                </select>
              </div>

              <div class="search-bar-btn with-8">
                <div class="item">
                  <button
                    type="button"
                    class="btn-customer-no"
                    style="margin-left: 4px"
                    v-on:click.prevent="fiterListItem"
                  >
                    搜索
                  </button>
                </div>
                <div class="item">
                  <button
                    type="button"
                    class="btn-customer-no-back"
                    style="margin-left: 4px"
                    v-on:click.prevent="location.reload()"
                  >
                    重置
                  </button>
                </div>
              </div>
              <div class="search-bar-btn with-8" style="padding-left: 0px">
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
              <div class="with-8 pay-table-row">名称</div>
              <div class="with-8 pay-table-row no-boder-left">商户名称</div>
              <div class="with-8 pay-table-row no-boder-left">商户账户</div>
              <div class="with-8 pay-table-row no-boder-left">代理账户</div>
              <div class="with-8 pay-table-row no-boder-left">代理名称</div>
              <div class="with-9 pay-table-row no-boder-left">可用余额</div>
              <div class="with-6 pay-table-row no-boder-left">审核状态</div>
              <div class="with-6 pay-table-row no-boder-left">账户状态</div>
              <div class="with-6 pay-table-row no-boder-left">今日总流水</div>
              <div class="with-5 pay-table-row no-boder-left">今日成功率</div>
              <div class="with-6 pay-table-row no-boder-left">备注</div>
              <div class="with-10 pay-table-row no-boder-left">注册时间</div>
              <div class="with-12 pay-table-row no-boder-left">通道Code</div>
            </div>
            <div v-if="listItems.length > 0">
              <div
                class="pay-table pay-table-content"
                v-for="(item, index) in listItems"
                v-bind:key="index"
              >
                <div class="with-8 pay-table-row">{{ item.kehu_id }}</div>
                <div class="with-8 pay-table-row no-boder-left">
                  {{ item.kehu_mingcheng }}
                </div>
                <div class="with-8 pay-table-row no-boder-left">
                  {{ item.kehu_zhuanghu }}
                </div>
                <div class="with-8 pay-table-row no-boder-left">
                  {{ item.daili_zhuanghu }}
                </div>
                <div class="with-8 pay-table-row no-boder-left">
                  {{ item.daili_mingcheng }}
                </div>
                <div class="with-9 pay-table-row no-boder-left">
                  {{ item.keyong_yujin }}
                </div>
                <div
                  class="with-6 pay-table-row no-boder-left no-boder-top"
                  v-if="item.shenqing_status != 1"
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
                    已审核
                  </button>
                </div>
                <div
                  class="with-6 pay-table-row no-boder-left no-boder-top"
                  v-if="item.zhuanghu_status != 1"
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
                    正常
                  </button>
                </div>
                <div class="with-6 pay-table-row no-boder-left">
                  {{ item.liu_shui }}
                </div>
                <div class="with-5 pay-table-row no-boder-left">
                  {{ item.lv_li }}
                </div>
                <div class="with-6 pay-table-row no-boder-left">
                  {{ item.beizhu }}
                </div>
                <div class="with-10 pay-table-row no-boder-left">
                  {{ item.zhu_she }}
                </div>
                <div class="with-12 pay-table-row no-boder-left no-boder-top">
                  <div>
                    <div class="group-button">
                    <button
                        type="button"
                        class="btn-customer-blue"
                        v-on:click.prevent="updateNeiChong(event, item, index)"
                      >
                       内充
                      </button>
                      <button
                        type="button"
                        class="btn-customer-blue"
                        v-on:click.prevent="updateItem(event, item, index)"
                        style="margin-left: 2px"
                      >
                        编辑
                      </button>
                      <button
                        type="button"
                        class="btn-customer-ok"
                        v-on:click.prevent="updateItem(event, item, index)"
                        style="margin-left: 2px"
                      >
                        删除
                      </button>
                     
                     
                    </div>
                    <div class="group-button" style="margin-top: 2px">
                      <BDropdown class="cardbuton" text="更多">
                        <BDropdownItem
                          ><span class="dropdow_item_font_size"
                            >连接账号</span
                          ></BDropdownItem
                        >
                        <BDropdownItem
                          ><span class="dropdow_item_font_size"
                            >查看订单</span
                          ></BDropdownItem
                        >
                        <BDropdownItem
                          ><span class="dropdow_item_font_size"
                            >资金流水</span
                          ></BDropdownItem
                        >
                        <BDropdownItem
                          ><span class="dropdow_item_font_size"
                            >Google验证码</span
                          ></BDropdownItem
                        >
                        <BDropdownItem
                          ><span class="dropdow_item_font_size"
                            >减金额</span
                          ></BDropdownItem
                        >
                        <BDropdownItem
                          ><span class="dropdow_item_font_size"
                            >详细信息</span
                          ></BDropdownItem
                        >
                      </BDropdown>
                    </div>
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
            <modal-item title="选择绑定代理:" v-if="isAdd">
              <select
                class="form-select"
                v-model="dialogdaili_zhuanghu"
                style="font-size: 12px"
              >
                <option value="" disabled>银行类型</option>
                <option value="dl001-dl001">dl001-dl001</option>
              </select>
            </modal-item>
            <modal-item title="商户名称:">
              <input
                type="text"
                class="form-control"
                placeholder="银行卡账户"
                v-model="dialogkehu_mingcheng"
                style="font-size: 12px"
              />
            </modal-item>
            <modal-item title="账户：">
              <input
                type="text"
                class="form-control"
                placeholder="银行卡账户"
                v-model="dialogkehu_zhuanghu"
                style="font-size: 12px"
              />
            </modal-item>
            <modal-item title="密码:">
              <input
                type="password"
                class="form-control"
                placeholder="银行卡账户"
                v-model="dialogPassWord"
                style="font-size: 12px"
              />
            </modal-item> 
            <modal-item title="确认密码:">
              <input
                type="password"
                class="form-control"
                placeholder="银行卡账户"
                v-model="dialogConfigPassWord"
                style="font-size: 12px"
              />
            </modal-item>
            <modal-item title="代付默认利率%:">
              <input
                type="number"
                class="form-control"
                placeholder="银行卡账户"
                v-model="dialoglv_li"
                style="font-size: 12px"
              />
            </modal-item>
            <modal-item title="下发默认利率%:">
              <input
                type="number"
                class="form-control"
                placeholder="银行卡账户"
                v-model="dialogliu_shui"
                style="font-size: 12px"
              />
            </modal-item>
            <modal-item title="内充默认利率%:">
              <input
                type="number"
                class="form-control"
                placeholder="银行卡账户"
                v-model="dialogNeibu"
                style="font-size: 12px"
              />
            </modal-item>
            <modal-item title="备注:">
              <input
                type="text"
                class="form-control"
                placeholder="银行卡账户"
                v-model="dialogBeiZhu"
                style="font-size: 12px"
              />
            </modal-item>
            <modal-item title="代付IP白名单:">
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  placeholder="IP白名单/一行一个"
                  style="font-size: 12px"
                  rows="3"
                  v-model="dialogIp"
                ></textarea>
            </modal-item>

          </div>
        </Modal>
        <Modal
          :visible="neiChongDialog"
          @configEvent="configNeiChong"
          @close="closeNeiChongDialog"
          title="编辑银行信息"
        >
          <div
            class="model-content-custome"
            style="padding-top: 2px; overflow: auto"
          >
            <modal-item title="商户Id:">
             <span>{{ dialogId }}</span>
            </modal-item>
            <modal-item title="商户名称:">
             <span>{{ dialogkehu_mingcheng }}</span>
            </modal-item>
            <modal-item title="充值金额:">
              <input
                type="number"
                class="form-control"
                placeholder="充值金额"
                v-model="chongJiner"
                style="font-size: 12px"
              />
            </modal-item>
            <modal-item title="内充利率%:">
              <input
                type="number"
                class="form-control"
                placeholder="内充利率"
                v-model="dialogliu_shui"
                style="font-size: 12px"
              />
            </modal-item>
            <modal-item title="手续费:">
            <span>0元</span>
            </modal-item>
            <modal-item title="备注:">
              <input
                type="text"
                class="form-control"
                placeholder="备注"
                v-model="dialogBeiZhu"
                style="font-size: 12px"
              />
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