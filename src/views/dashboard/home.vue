<script>
import { VueEcharts } from "vue3-echarts";
import PageHeader from "@/components/page-header";
import Layout from "@/layouts/main.vue";
import { BCol } from "bootstrap-vue-next";
import Card from "@/components/card.vue";

export default {
  components: {
    Layout,
    PageHeader,
    BCol,
    Card,
    VueEcharts,
  },
  data() {
    return {
      chart_options: {
        color: ["#5470C6", "#91CC75", "#EE6666"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
        },
        grid: {
          right: "20%",
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        legend: {
          data: ["Evaporation", "Precipitation", "Temperature"],
        },
        xAxis: [
          {
            type: "category",
            axisTick: {
              alignWithLabel: true,
            },
            // prettier-ignore
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "Precipitation",
            position: "right",
            alignTicks: true,
            min: 0,
            max: 210,
            interval: 30,
            axisLine: {
              show: true,
              lineStyle: {
                color: "#91CC75",
              },
            },
            axisLabel: {
              formatter: "{value} ml",
            },
          },
          {
            type: "value",
            name: "订单量",
            position: "left",
            alignTicks: true,
            min: 0,
            max: 25,
            interval: 5,
            axisLine: {
              show: true,
              lineStyle: {
                color: "#EE6666",
              },
            },
            axisLabel: {
              formatter: "{value}",
            },
          },
        ],
        series: [
        {
            name: "Evaporation",
            type: "bar",
            data: [
              2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4,
              3.3,
            ],
          },
          {
            name: "Precipitation",
            type: "bar",
            yAxisIndex: 0,
            data: [
              2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0,
              2.3,
            ],
          },
          {
            name: "Temperature",
            type: "line",
            yAxisIndex: 1,
            data: [
              2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2,
            ],
          },
        ],
      },
    };
  },
};
</script>

<template>
  <Layout>
    <PageHeader title="Ecommerce" pageTitle="Dashboard" />
    <div class="base-pages-content">
      <BRow>
        <BCol lg="3">
          <card
            headerTitle="商户总厨"
            headerBtnName="总"
            footerLeft="今日增长"
            footerRight="+0.00%"
            headerBtnBackroug="#fdd8e7"
            boderColor="#f5317f"
          >
            <span>9999999.99</span>
          </card>
        </BCol>
        <BCol lg="3">
          <card
            headerTitle="商户总厨"
            headerBtnName="总"
            footerLeft="今日增长"
            footerRight="+0.00%"
            v-on:=""
          >
            <span>9999999.99</span>
          </card>
        </BCol>
        <BCol lg="3">
          <card
            headerTitle="商户总厨"
            headerBtnName="总"
            footerLeft="今日增长"
            footerRight="+0.00%"
            v-on:=""
          >
            <span>9999999.99</span>
          </card>
        </BCol>
        <BCol lg="3">
          <card
            headerTitle="商户总厨"
            headerBtnName="总"
            footerLeft="今日增长"
            footerRight="+0.00%"
            v-on:=""
          >
            <span>9999999.99</span>
          </card>
        </BCol>
      </BRow>
      <BRow>
        <BCol lg="12">
          <card
            headerTitle="商户总厨"
            headerBtnName="更新"
            :footerShow="false"
            headerBtnBackroug="#e6f4ff"
            boderColor="#91caff"
            headerTextColor="#0958d9"
          >
            <VueEcharts
              :option="chart_options"
              style="height: 450px"
              ref="chart"
            />
          </card>
        </BCol>
      </BRow>
    </div>
  </Layout>
</template>