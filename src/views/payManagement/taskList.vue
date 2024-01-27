<script>
import PageHeader from "@/components/page-header";
import Layout from "@/layouts/main.vue";
import { BCol } from "bootstrap-vue-next";
import Modal from "@/components/modal.vue";
import Pagination  from "@/components/pagination.vue";
export default {
  components: {
    Layout,
    PageHeader,
    BCol,
    Modal,
    Pagination
  },
  data() {
    return {
      showDialog: false,
      searchStatus:3,
      searchBankCardPersonName:"",
      searchBeiZhu:"",
      listItemRoots: [
        {
          orderName: "YS5263256150",
          payName: "ICB",
          payForm: "0000092",
          payDevice: "niko0917",
          bankName: "VCB",
          bankCard: "1234585245",
          personName: "DO TRUNG PHONG",
          status: 0,
          startTime:"2024-01-23 12:00:00",
          endTime:"2024-01-23 12:20:00",
          beizhu: ""
        },
      ],
      listItems: [
      {
          orderName: "YS5263256150",
          payName: "ICB",
          payForm: "0000092",
          payDevice: "niko0917",
          bankName: "VCB",
          bankCard: "1234585245",
          personName: "DO TRUNG PHONG",
          status: 0,
          startTime:"2024-01-23 12:00:00",
          endTime:"2024-01-23 12:20:00",
          beizhu: ""
        },
      ],
    };
  },
  methods: {
    fiterListItem() {
      this.listItems = this.listItemRoots.filter((item) => {
        if(this.searchStatus <= 2){
          return (
          item.bankCard.includes(this.searchBankCardPersonName) &&
          item.beizhu.includes(this.searchBeiZhu) &&
          item.status == this.searchStatus
        );
        }
        else{
          return (
          item.bankCard.includes(this.searchBankCardPersonName) &&
          item.beizhu.includes(this.searchBeiZhu) 
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

  },
};
</script>
<template>
  <Layout>
    <PageHeader title="TaskList" pageTitle="PayManagement" />
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
                  <option value=3>任务状态</option>
                  <option value=0>成功</option>
                  <option value=1>进行中</option>
                  <option value=2>失败</option>
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
            </div>
          </BCol>
        </BRow>
        <BRow style="margin-top: 10px">
          <BCol lg="12">
            <div class="pay-table pay-table-title" style="text-align: center">
              <div class="with-8 pay-table-row">订单ID</div>
              <div class="with-8 pay-table-row no-boder-left">执行脚本名称</div>
              <div class="with-8 pay-table-row no-boder-left">执行桌面编号</div>
              <div class="with-8 pay-table-row no-boder-left">执行设备Id</div>
              <div class="with-8 pay-table-row no-boder-left">付款银行</div>
              <div class="with-8 pay-table-row no-boder-left">付款银行卡</div>
              <div class="with-10 pay-table-row no-boder-left">收款人</div>
              <div class="with-6 pay-table-row no-boder-left">任务状态</div>
              <div class="with-8 pay-table-row no-boder-left">开始时间</div>
              <div class="with-8 pay-table-row no-boder-left">结束时间</div>
              <div class="with-8 pay-table-row no-boder-left">备注</div>
              <div class="with-12 pay-table-row no-boder-left">操作</div>
            </div>
            <div v-if="listItems.length > 0">
              <div
              class="pay-table pay-table-content"
              v-for="(item, index) in listItems"
              v-bind:key="index"
            >
             <div class="with-8 pay-table-row">{{item.orderName}}</div>
              <div class="with-8 pay-table-row no-boder-left">{{item.payName}}</div>
              <div class="with-8 pay-table-row no-boder-left">{{item.payForm}}</div>
              <div class="with-8 pay-table-row no-boder-left">{{item.payDevice}}</div>
              <div class="with-8 pay-table-row no-boder-left">{{item.bankName}}</div>
              <div class="with-8 pay-table-row no-boder-left">{{item.bankCard}}</div>
              <div class="with-10 pay-table-row no-boder-left">{{item.personName}}</div>
              <div class="with-6 pay-table-row no-boder-left">
                <button
                      style="margin-left: 2px"
                      type="button"
                      :class="item.status == 0?'btn-customer-green':item.status == 2? 'btn-customer-xam':'btn-customer-ok'"
                      v-on:click.prevent="deleteItem(event,index)"
                    >
                     {{ item.status == 0?"成功":item.status == 1?"进行中":"失败" }}
                    </button>
              </div>
              <div class="with-8 pay-table-row no-boder-left">{{item.startTime}}</div>
              <div class="with-8 pay-table-row no-boder-left">{{item.endTime}}</div>
              <div class="with-8 pay-table-row no-boder-left">{{item.beizhu}}</div>
              <div class="with-12 pay-table-row no-boder-left no-boder-top">
                <div>
                  <div class="group-button">
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
            <Pagination></Pagination>
            </div>
            <div v-else class="not_content">
              <img src="@/assets/images/nocontent/no_data.png"/>
              <span>暂无数据</span>

            </div>
            
          </BCol>
        </BRow>
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