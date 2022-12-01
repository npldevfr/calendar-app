<template>
  <div class="ModalTitle">
    {{ label }}
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "ModalTitle",
  props: {
    label: {
      type: String,
      required: true,
      default: ''
    }
  }
})
</script>

<style lang="scss" scoped>
.ModalTitle {
  font-size: 1.2rem;
  padding: 0 15px;
  font-weight: 500;
  color: var(--secondary-color);
}
</style>