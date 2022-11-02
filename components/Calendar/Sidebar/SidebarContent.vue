<template>
  <div class="SidebarContent">
    <slot />
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "SidebarContent",
  props: {}
})
</script>

<style lang="scss" scoped>
.SidebarContent {
  width: 100%;
  box-sizing: border-box;
  padding: 20px;

}
</style>