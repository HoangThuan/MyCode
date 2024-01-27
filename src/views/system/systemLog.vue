<script>
import PageHeader from "@/components/page-header";
import Layout from "@/layouts/main.vue";
import { BCol } from "bootstrap-vue-next";
import Modal from "@/components/modal.vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import ModalItem from "@/components/modalItem.vue";
import Pagination  from "@/components/pagination.vue";
export default {
  components: {
    Layout,
    PageHeader,
    BCol,
    Modal,
    VueDatePicker,
    ModalItem,
    Pagination,
  },
  data() {
    return {
      showDialog: false,
      sbSearch: "",
      sbIp: "",
      sbWorkTime: null,
      listItemRoots: [
        {
          userName:"admin01(Root管理员)",
          workTime: "2024-01-17 19:31:59",
          status:200,
          ip:"110.54.135.52",
          methods:"GET",
          url:"/pay2Admin/userList",
          note:"访问页面"
        },
      ],
      listItems: [
        {
          userName:"admin01(Root管理员)",
          workTime: "2024-01-17 19:31:59",
          status:200,
          ip:"110.54.135.52",
          methods:"GET",
          url:"/pay2Admin/userList",
          note:"访问页面"
        },
      ],
    };
  },
  methods: {
    fiterListItem() {
      this.listItems = this.listItemRoots.filter((item) => {
        if (this.sbWorkTime != null) {
            return(
             item.userName.includes(this.sbSearch) &&
             item.ip.includes(this.sbIp) &&
              new Date(item.workTime) >= new Date(this.sbWorkTime[0]) &&
              new Date(item.workTime) <= new Date(this.sbWorkTime[1]));
        } else {
            return(
             item.userName.includes(this.sbSearch) &&
             item.ip.includes(this.sbIp));
        }
      });
    },
    config() {
      if (this.isAdd) {
      } else {
      }
      this.showDialog = false;
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
    <PageHeader title="SystemLog" pageTitle="System" />
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
                  placeholder="IP"
                  v-model="sbIp"
                  style="font-size: 14px"
                />
              </div>
              <div class="search-bar-item with-12">
                <input
                  type="text"
                  class="form-control pay-bank-search-bar-input"
                  placeholder="用户账户或姓名"
                  v-model="sbSearch"
                  style="font-size: 14px"
                />
              </div>
              <div class="search-bar-item with-18">
                <VueDatePicker
                  v-model="sbWorkTime"
                  class="datapicker"
                  placeholder="操作时间"
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
              <div class="with-12 pay-table-row">操作人</div>
              <div class="with-15 pay-table-row no-boder-left">日期</div>
              <div class="with-8 pay-table-row no-boder-left">状态码</div>
              <div class="with-22 pay-table-row no-boder-left">请求IP</div>
              <div class="with-8 pay-table-row no-boder-left">请求方法</div>
              <div class="with-18 pay-table-row no-boder-left">请求路径</div>
              <div class="with-18 pay-table-row no-boder-left">说明</div>
            </div>
            <div v-if="listItems.length > 0">
              <div
                class="pay-table pay-table-content"
                v-for="(item, index) in listItems"
                v-bind:key="index"
              >
              <div class="with-12 pay-table-row">{{item.userName}}</div>
              <div class="with-15 pay-table-row no-boder-left">{{item.workTime}}</div>
              <div class="with-8 pay-table-row no-boder-left">
                <button
                    type="button"
                    :class="
                      item.status == 200
                        ? 'btn-customer-green'
                        : 'btn-customer-ok'
                    "
                    v-on:click.prevent=""
                  >
                    {{ item.status }}
                  </button>
              </div>
              <div class="with-22 pay-table-row no-boder-left">{{item.ip}}</div>
              <div class="with-8 pay-table-row no-boder-left">
                <button
                    type="button"
                    :class="
                      item.status == 200
                        ? 'btn-customer-green'
                        : 'btn-customer-ok'
                    "
                    v-on:click.prevent=""
                  >
                    {{ item.methods }}
                  </button>
              </div>
              <div class="with-18 pay-table-row no-boder-left">{{item.url}}</div>
              <div class="with-18 pay-table-row no-boder-left">{{item.note}}</div>
              </div>
              <Pagination></Pagination>
            </div>
            <div v-else class="not_content">
              <img src="@/assets/images/nocontent/no_data.png" />
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