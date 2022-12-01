<template>
  <div class="ModalContainer" :style="{flexDirection: alignement}">
    <slot />
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "ModalContainer",
  props: {
    alignement: {
      type: String as () => 'column' | 'row',
      required: false,
      default: 'column'
    }
  }
})
</script>

<style lang="scss" scoped>
.ModalContainer {
  padding: 1rem;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
</style>