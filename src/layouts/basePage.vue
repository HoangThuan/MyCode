<script>
import getChartColorsArray from "@/common/getChartColorsArray";


import PageHeader from "@/components/page-header";
import Layout from "@/layouts/main.vue";


export default {
  components: {
    Layout,
    PageHeader
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    pageTitle: {
      type: String,
      default: "",
    }
  }
};
</script>

<template>
  <Layout>
    <PageHeader title="Ecommerce" pageTitle="Dashboard" />
    <div class="base-pages-content">
      <slot/>
    </div>
  </Layout>
</template>