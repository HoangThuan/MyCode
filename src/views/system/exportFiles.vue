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
      searchName:"",
      sbWorkTime:"",
      listItemRoots: [
        {
          fileName:"1233",
          url:"../../assets/file/test.xlsx",
          size:1,
          number:1,
          exportNum:"",
          exportStatus:1,
          exportTime:"2023-12-29 02:29:19",
          note:"订单数据-20240123105627"
        },
      ],
      listItems: [
      {
          fileName:"1233",
          url:"../../assets/file/test.xlsx",
          size:1,
          number:1,
          exportNum:"",
          exportStatus:1,
          exportTime:"2023-12-29 02:29:19",
          note:"订单数据-20240123105627"
        },
      ],
    };
  },
  methods: {
    fiterListItem() {
      this.listItems = this.listItemRoots.filter((item) => {
        if(this.sbWorkTime != null){
          return (
          item.fileName.includes(this.searchName) &&
          new Date(item.exportTime) >= new Date(this.sbWorkTime[0]) &&
          new Date(item.exportTime) <= new Date(this.sbWorkTime[1])
        );
        }
        else{
          return (
          item.fileName.includes(this.searchName)
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
    <PageHeader title="ExportFile" pageTitle="System" />
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
                  placeholder="文件名"
                  v-model="searchName"
                  style="font-size: 14px"
                />
              </div>
              <div class="search-bar-item with-15">
                <VueDatePicker
                  v-model="sbWorkTime"
                  placeholder="导出时间"
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
                <button
                  type="button"
                  class="btn-customer-yellow"
                  style="margin-left: 8px"
                  v-on:click.prevent="CheckVPN"
                >
                  批量删除
                </button>
              </div>
            </div>
          </BCol>
        </BRow>
        <BRow style="margin-top: 10px">
          <BCol lg="12">
            <div class="pay-table pay-table-title" style="text-align: center">
              <div class="with-12 pay-table-row">文件名</div>
              <div class="with-22 pay-table-row no-boder-left">文件路径</div>
              <div class="with-8 pay-table-row no-boder-left">文件大小(KB)</div>
              <div class="with-8 pay-table-row no-boder-left">数据量</div>
              <div class="with-8 pay-table-row no-boder-left">已导出</div>
              <div class="with-6 pay-table-row no-boder-left">导出状态</div>
              <div class="with-12 pay-table-row no-boder-left">导出时间</div>
              <div class="with-13 pay-table-row no-boder-left">备注</div>
              <div class="with-12 pay-table-row no-boder-left">操作</div>
            </div>
            <div v-if="listItems.length > 0">
              <div
              class="pay-table pay-table-content"
              v-for="(item, index) in listItems"
              v-bind:key="index"
            >
              <div class="with-12 pay-table-row">{{item.fileName}}</div>
              <div class="with-22 pay-table-row no-boder-left">{{item.url}}</div>
              <div class="with-8 pay-table-row no-boder-left">{{item.size}}(KB)</div>
              <div class="with-8 pay-table-row no-boder-left">{{item.number}}</div>
              <div class="with-8 pay-table-row no-boder-left">{{item.exportNum}}</div>
              <div class="with-6 pay-table-row no-boder-left">
                <button
                      style="margin-left: 2px"
                      type="button"
                      :class="item.exportStatus == 1? 'btn-customer-green':'btn-customer-ok'"
                      v-on:click.prevent=""
                    >
                     {{ item.exportStatus == 1?"导出成功":"导出失败" }}
                    </button>
              </div>
              <div class="with-12 pay-table-row no-boder-left">{{item.exportTime}}</div>
              <div class="with-13 pay-table-row no-boder-left">{{item.note}}</div>
              <div class="with-12 pay-table-row no-boder-left">
                <div>
                  <div class="group-button">
                    
                    <a :href="item.url" class="btn-customer-no" download type="button" style="text-decoration: none;">下载</a>
                    <button
                      style="margin-left: 2px"
                      type="button"
                      class="btn-customer-red"
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