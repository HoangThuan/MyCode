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
      bankName: "",
      bankCode: "",
      note: "",
      workTime:6000,
      shuto:1500,
      listItemRoots: [
        {
          logo: require("@/assets/images/bank/ICB.png"),
          bank_full_name: "Ngân hàng TMCP công thương Việt Nam",
          bank_name: "Vietinbank",
          bank_code: "ICB",
          bank_number: "970415",
          status: true,
          btnEvent: false,
          bank_card_number: 0,
        },
        {
          logo: require("@/assets/images/bank/ACB.png"),
          bank_full_name: "Ngân hàng TMCP Á Châu",
          bank_name: "ACB",
          bank_code: "ACB",
          bank_number: "970416",
          status: true,
          btnEvent: false,
          bank_card_number: 3,
        },
        {
          logo: require("@/assets/images/bank/VCB.png"),
          bank_full_name: "Ngân hàng TMCP Ngoại thương Việt Nam",
          bank_name: "Vietcombank",
          bank_code: "VCB",
          bank_number: "970436",
          status: false,
          btnEvent: true,
          bank_card_number: 3,
        },
      ],
      listItems: [
        {
          logo: require("@/assets/images/bank/ICB.png"),
          bank_full_name: "Ngân hàng TMCP công thương Việt Nam",
          bank_name: "Vietinbank",
          bank_code: "ICB",
          bank_number: "970415",
          status: true,
          btnEvent: false,
          bank_card_number: 0,
        },
        {
          logo: require("@/assets/images/bank/ACB.png"),
          bank_full_name: "Ngân hàng TMCP Á Châu",
          bank_name: "ACB",
          bank_code: "ACB",
          bank_number: "970416",
          status: true,
          btnEvent: false,
          bank_card_number: 3,
        },
        {
          logo: require("@/assets/images/bank/VCB.png"),
          bank_full_name: "Ngân hàng TMCP Ngoại thương Việt Nam",
          bank_name: "Vietcombank",
          bank_code: "VCB",
          bank_number: "970436",
          status: false,
          btnEvent: true,
          bank_card_number: 3,
        },
      ],
    };
  },
  methods: {
    fiterListItem() {
      console.log("hoang thuan " + this.selectStatus.toString());
      this.listItems = this.listItemRoots.filter((item) => {
        return (
          item.bank_code.includes(this.bankCode) &&
          item.bank_name.includes(this.bankName) &&
          item.status.toString().includes(this.selectStatus.toString())
        );
      });
    },
    config() {
      this.showDialog = false;
    },
    closeDialog() {
      this.showDialog = false;
    },
  },
};
</script>
<template>
  <Layout>
    <PageHeader title="Bank" pageTitle="Pay" />
    <div class="base-pages-content">
      <div class="card-customer-content">
        <BRow>
          <BCol lg="12">
            <div class="pay-bank-search-bar">
              <div class="search-bar-label"><span>搜索: </span></div>
              <div class="search-bar-select">
                <select
                  class="form-select pay-bank-search-bar-input"
                  v-model="selectStatus"
                  style="font-size: 14px"
                >
                  <option value="">开放状态</option>
                  <option value="true">开放</option>
                  <option value="flase">关闭</option>
                </select>
              </div>
              <div class="search-bar-input">
                <input
                  type="text"
                  class="form-control pay-bank-search-bar-input"
                  placeholder="银行名称"
                  v-model="bankName"
                  style="font-size: 14px"
                />
              </div>
              <div class="search-bar-input">
                <input
                  type="text"
                  class="form-control pay-bank-search-bar-input"
                  placeholder="银行代码"
                  v-model="workTime"
                  style="font-size: 14px"
                />
              </div>
              <div class="search-bar-input">
                <input
                  type="text"
                  class="form-control pay-bank-search-bar-input"
                  placeholder="备注"
                  v-model="note"
                  style="font-size: 14px"
                />
              </div>
              <div class="search-bar-btn">
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
            </div>
          </BCol>
        </BRow>
        <BRow style="margin-top: 10px">
          <BCol lg="12">
            <div class="pay-table pay-table-title" style="text-align: center">
              <div class="table-row-12 pay-table-row">通道名称</div>
              <div class="table-row-30 pay-table-row no-boder-left">
                通道名称
              </div>
              <div class="table-row-10 pay-table-row no-boder-left">
                通道Code
              </div>
              <div class="table-row-85 pay-table-row no-boder-left">
                通道状态
              </div>
              <div class="table-row-85 pay-table-row no-boder-left">操作</div>
              <div class="table-row-10 pay-table-row no-boder-left">
                通道Code
              </div>
              <div class="table-row-10 pay-table-row no-boder-left">
                通道Code
              </div>
              <div class="table-row-11 pay-table-row no-boder-left">
                通道Code
              </div>
            </div>
            <div
              class="pay-table pay-table-content"
              v-for="(item, index) in listItems"
              v-bind:key="index"
            >
              <div class="table-row-12 pay-table-row no-boder-top">
                <div>
                  <img style="width: 93.5px; height: 35px" :src="item.logo" />
                </div>
              </div>
              <div
                class="table-row-30 pay-table-row no-boder-left no-boder-top"
              >
                {{ item.bank_full_name }}
              </div>
              <div
                class="table-row-10 pay-table-row no-boder-left no-boder-top"
              >
                {{ item.bank_name }}
              </div>
              <div
                class="table-row-85 pay-table-row no-boder-left no-boder-top"
              >
                {{ item.bank_code }}
              </div>
              <div
                class="table-row-85 pay-table-row no-boder-left no-boder-top"
              >
                {{ item.bank_number }}
              </div>
              <div
                class="table-row-10 pay-table-row no-boder-left no-boder-top"
                v-if="item.status"
              >
                <span style="color: #00a854"
                  ><i
                    class="bi bi-check-circle-fill"
                    style="margin-right: 4px"
                  ></i
                  >已开放</span
                >
              </div>
              <div
                class="table-row-10 pay-table-row no-boder-left no-boder-top"
                v-else
              >
                <span style="color: red"
                  ><i
                    class="bi bi-check-circle-fill"
                    style="margin-right: 4px"
                  ></i
                  >已关闭</span
                >
              </div>
              <div
                class="table-row-10 pay-table-row no-boder-left no-boder-top"
              >
                {{ item.bank_card_number }}
              </div>
              <div
                class="table-row-11 pay-table-row no-boder-left no-boder-top"
                v-if="item.btnEvent"
              >
                <div class="group-button">
                  <button
                    type="button"
                    class="btn-customer-blue"
                    v-on:click.prevent="showDialog = true"
                  >
                    编辑
                  </button>
                  <button
                    style="margin-left: 2px"
                    type="button"
                    class="btn-customer-blue"
                    v-on:click.prevent="
                      item.status = !item.status;
                      item.btnEvent = !item.btnEvent;
                    "
                  >
                    开放
                  </button>
                </div>
              </div>
              <div
                class="table-row-11 pay-table-row no-boder-left no-boder-top"
                v-else
              >
                <div class="group-button">
                  <button
                    type="button"
                    class="btn-customer-blue"
                    v-on:click.prevent="showDialog = true"
                  >
                    编辑
                  </button>
                  <button
                    style="margin-left: 2px"
                    type="button"
                    class="btn-customer-ok"
                    v-on:click.prevent="
                      item.status = !item.status;
                      item.btnEvent = !item.btnEvent;
                    "
                  >
                    关闭
                  </button>
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
          <div class="model-content-custome">
            <div class="modal-content-item">
              <div class="text">
                <span>是否使用IP池:</span>
              </div>
              <div class="item">
                <div class="form-check form-switch">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="flexSwitchCheckChecked"
                    style="height: 20px; width: 40px;"
            
                  />
                </div>
              </div>
            </div>
            <div class="modal-content-item">
              <div class="text">
                <span>多久时间切换ip/秒：</span>
              </div>
              <div class="item">
                <input
                  type="number"
                  class="form-control"
                  placeholder="银行名称"
                  v-model="workTime"
                  style="font-size: 12px"
                />
              </div>
            </div>
            <div class="modal-content-item">
              <div class="text">
                <span>ip使用间隔时间/秒：</span>
              </div>
              <div class="item">
                <input
                  type="number"
                  class="form-control"
                  placeholder="银行名称"
                  v-model="shuto"
                  style="font-size: 12px"
                />
              </div>
            </div>
            <div class="modal-content-item" style="margin-bottom: 10%">
              <div class="text">
                <span>IP池/一行一个：</span>
              </div>
              <div class="item">
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  placeholder="IP池/一行一个"
                  style="font-size: 12px"
                  rows="3"
                ></textarea>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  </Layout>
</template>