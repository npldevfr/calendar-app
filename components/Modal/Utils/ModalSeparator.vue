<template>
  <div class="ModalSeparator" />
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "ModalSeparator",
  props: {}
})
</script>

<style lang="scss" scoped>
.ModalSeparator {
  width: 100%;
  height: 2px;
  border-bottom: 1px solid var(--secondary-border);
}
</style>