<script>
import PageHeader from "@/components/page-header";
import Layout from "@/layouts/main.vue";
import { BCol } from "bootstrap-vue-next";
export default {
  components: {
    Layout,
    PageHeader,
    BCol,
  },
  data() {
    return {
      listItems: [
        {
          bank_full_name: "Ngân hàng TMCP công thương Việt Nam",
          bank_code: "ICB",
          status: true,
          btnEvent: false,
          time: "0:34:19",
        },
        {
          bank_full_name: "Ngân hàng TMCP Á Châu",
          bank_code: "ACB",
          status: true,
          btnEvent: false,
          time: "0:34:19",
        },
        {
          bank_full_name: "Ngân hàng TMCP Ngoại thương Việt Nam",
          bank_code: "VCB",
          status: false,
          btnEvent: true,
          time: "0:34:19",
        },
      ],
    };
  },
  methods: {
    onclickButton(item, event) {
      this.$swal({
        title: "确定停止运行该银行脚本？",
        icon: "question",
        iconHtml: "?",
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
  },
};
</script>
<template>
  <Layout>
    <PageHeader title="Bank Script" pageTitle="Pay" />
    <div class="base-pages-content">
      <BRow>
        <BCol lg="6">
          <div class="pay-send-alex">
            <div class="send-alex-icon">
              <i class="bi bi-brightness-high-fill"></i>
            </div>
            <div class="send-alex-text">
              请注意：银行脚本的开关直接影响，整个项目的首付款功能，请谨慎操作！
            </div>
          </div>
        </BCol>
      </BRow>
      <BRow>
        <BCol lg="6">
          <div class="card-customer-content">
            <div class="bank-script-table-title">
              <div class="title-row-fist">银行名称</div>
              <div class="title-row-content">通道Code</div>
              <div class="title-row-content">脚本运行状态</div>
              <div class="title-row-content">运行时间</div>
              <div class="title-row-content">操作</div>
            </div>
            <div
              class="bank-script-table-content"
              v-for="(item, index) in listItems"
              v-bind:key="index"
            >
              <div class="title-row-fist">{{ item.bank_full_name }}</div>
              <div class="title-row-content">{{ item.bank_code }}</div>
              <div class="title-row-content" v-if="item.status">
                <span style="color: #00a854"
                  ><i
                    class="bi bi-check-circle-fill"
                    style="margin-right: 4px"
                  ></i
                  >运行中</span
                >
              </div>
              <div class="title-row-content" v-else>
                <span style="color: red"
                  ><i
                    class="bi bi-exclamation-circle-fill"
                    style="margin-right: 4px"
                  ></i
                  >已停止</span
                >
              </div>
              <div class="title-row-content">{{ item.time }}</div>
              <div class="title-row-content" v-if="item.btnEvent">
                <button
                  type="button"
                  class="btn-customer-no"
                  v-on:click.prevent="onclickButton(item, $event)"
                >
                  开放
                </button>
              </div>
              <div class="title-row-content" v-else>
                <button
                  type="button"
                  class="btn-customer-ok"
                  v-on:click.prevent="onclickButton(item, $event)"
                >
                  停止
                </button>
              </div>
            </div>
          </div>
        </BCol>
      </BRow>
    </div>
  </Layout>
</template>