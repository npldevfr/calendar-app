<template>
  <div class="DropdownHeader" v-text="title" />
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "DropdownHeader",
  props: {
    title: {
      type: String,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.DropdownHeader {
  width: 100%;
  padding: 2px 0;
  margin-top: 20px;
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  color: #D2D3E0;
  margin-bottom: 5px;
}
</style>