<template>
  <div class="DropdownContent">
    <slot />
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "DropdownContent",
  props: {}
})
</script>

<style lang="scss" scoped>
.DropdownContent {
  padding: 9px;
}
</style>