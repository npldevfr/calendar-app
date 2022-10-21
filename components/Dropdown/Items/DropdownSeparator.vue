<template>
  <div class="DropdownSeparator" />
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "DropdownSeparator",
  props: {}
})
</script>

<style lang="scss" scoped>
.DropdownSeparator {
  width: 100%;
  height: 1px;
  border-bottom: 1px solid #313248;
}
</style>