<script>
export default {
  props: {
    totalPage: {
      type: Number,
      default: 0,
    },
  },
};
</script>
<template>
  <div class="pagination-content">
    <span>{{ "共" + totalPage + "页," }}</span>
    <BDropdown
      class="paginationDropdown"
      text="30条/页"
      style="margin-left: 1%"
      dropup
    >
      <BDropdownItem
        ><span class="dropdow_item_font_size">30条/页</span></BDropdownItem
      >
      <BDropdownItem
        ><span class="dropdow_item_font_size">50条/页</span></BDropdownItem
      >
      <BDropdownItem
        ><span class="dropdow_item_font_size">100条/页</span></BDropdownItem
      >
      <BDropdownItem
        ><span class="dropdow_item_font_size">500条/页</span></BDropdownItem
      >
    </BDropdown>
    <nav aria-label="Page navigation example" style="margin-left: 1%">
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </a>
        </li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
    <label style="margin-left: 1%">跳转至</label>
    <input
      type="text"
      class="form-control pay-bank-search-bar-input"
      v-model="sbSearchText"
      style="font-size: 14px; width: 60px;height: 38px;"
    />
    <label style="margin-left: 1%">页</label>
    <button
      type="button"
      class="btn-customer-white"
      style="margin-left: 4px; height: 38px ;margin-left: 1%"
      v-on:click.prevent=""
    >
     确定
    </button>
  </div>
</template>
