<template>
  <div class="SidebarDivider" />
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "SidebarDivider",
})
</script>

<style lang="scss" scoped>
.SidebarDivider {
  height: 1px;
  width: 100%;
  border-bottom: 1px dashed #2C2D3C ;
}
</style>