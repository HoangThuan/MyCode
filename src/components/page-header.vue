<script>
export default {
  components: {},
  props: {
    title: {
      type: String,
      default: "",
    },
    pageTitle: {
      type: String,
      default: "",
    }
  },
};
</script>



<template>
  <BRow>
    <BCol cols="12">
      <div class="page-title-box d-sm-flex align-items-center justify-content-between">
        <span class="mb-sm-0"><span style="color: #007bff;"><i class="bi bi-stack" style="margin-right: 2px;"></i>{{ pageTitle }}</span>/ {{ title }}</span>
        <div class="page-title-right">
          
        </div>
      </div>
    </BCol>
  </BRow>
</template>
