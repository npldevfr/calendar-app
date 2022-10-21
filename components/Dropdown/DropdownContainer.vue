<template>
  <div class="DropdownContainer">
    <slot />
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "DropdownContainer",
  props: {}
})
</script>

<style lang="scss" scoped>
.DropdownContainer {
  z-index: 2000;
}
</style>