<script>
import PageHeader from "@/components/page-header";
import Layout from "@/layouts/main.vue";
import { BCol } from "bootstrap-vue-next";
import Modal from "@/components/modal.vue";
import ModalItem from "@/components/modalItem.vue";
import Pagination  from "@/components/pagination.vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
export default {
  components: {
    Layout,
    PageHeader,
    BCol,
    Modal,
    Pagination,
    ModalItem,
    VueDatePicker
  },
  data() {
    return {
      searchFuction:"",
      sbWorkTime:"",
      sbApi:"",
      listItemRoots: [
        {
          ip:"113.61.48.67",
          method:"post",
          url:"/api/behalfPay/bill",
          code:"406",
          note:"mchId：参数错误！",
          workTime:"2023-12-29 02:29:19"
        },
      ],
      listItems: [
      {
          ip:"113.61.48.67",
          method:"post",
          url:"/api/behalfPay/bill",
          code:"406",
          note:"mchId：参数错误！",
          workTime:"2023-12-29 02:29:19"
        },
      ],
    };
  },
  methods: {
    fiterListItem() {
      this.listItems = this.listItemRoots.filter((item) => {
        if(this.sbWorkTime != null){
          return (
          item.ip.includes(this.sbApi) &&
          item.method.includes(this.searchFuction) &&
          new Date(item.workTime) >= new Date(this.sbWorkTime[0]) &&
          new Date(item.workTime) <= new Date(this.sbWorkTime[1])
        );
        }
        else{
          return (
          item.ip.includes(this.sbApi)&&
          item.method.includes(this.searchFuction)
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
        text:"进行批量删除？",
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
  },
};
</script>
<template>
  <Layout>
    <PageHeader title="ApiLog" pageTitle="System" />
    <div class="base-pages-content">
      <div class="card-customer-content">
        <BRow>
          <BCol lg="12">
            <div class="search-bar-content">
              <div class="search-bar-label with-4"><span>搜索: </span></div>

              <div class="search-bar-item with-8">
                <select
                  class="form-select pay-bank-search-bar-input"
                  v-model="searchFuction"
                  style="font-size: 14px"
                >
                  <option value="">请求模式</option>
                  <option value="post">POST</option>
                  <option value="get">GET</option>
                </select>
              </div>
              
              <div class="search-bar-item with-12">
                <input
                  type="text"
                  class="form-control pay-bank-search-bar-input"
                  placeholder="请求ip"
                  v-model="sbApi"
                  style="font-size: 14px"
                />
              </div>
              <div class="search-bar-item with-15">
                <VueDatePicker
                  v-model="sbWorkTime"
                  placeholder="请求时间"
                  class="datapicker"
                ></VueDatePicker>
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
              </div>
            </div>
          </BCol>
        </BRow>
        <BRow style="margin-top: 10px">
          <BCol lg="12">
            <div class="pay-table pay-table-title" style="text-align: center">
              <div class="with-10 pay-table-row">请求IP</div>
              <div class="with-6 pay-table-row no-boder-left">请求模式</div>
              <div class="with-16 pay-table-row no-boder-left">请求地址</div>
              <div class="with-6 pay-table-row no-boder-left">响应Code</div>
              <div class="with-50 pay-table-row no-boder-left">响应备注</div>
              <div class="with-12 pay-table-row no-boder-left">请求时间</div>
            </div>
            <div v-if="listItems.length > 0">
              <div
              class="pay-table pay-table-content"
              v-for="(item, index) in listItems"
              v-bind:key="index"
            >
            <div class="with-10 pay-table-row">{{ item.ip }}</div>
              <div class="with-6 pay-table-row no-boder-left">{{ item.method }}</div>
              <div class="with-16 pay-table-row no-boder-left">{{ item.url }}</div>
              <div class="with-6 pay-table-row no-boder-left">{{ item.code }}</div>
              <div class="with-50 pay-table-row no-boder-left">{{ item.note }}</div>
              <div class="with-12 pay-table-row no-boder-left">{{ item.workTime }}</div>
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