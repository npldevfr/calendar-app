<template>
  <div class="ModalCategory">
    {{ label }}
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
export default defineComponent({
  name: "ModalCategory",
  props: {
    label: {
      type: String,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.ModalCategory {
  transition: all 0.2s ease-in-out;
  font-size: 14px;
  width: 100%;
  letter-spacing: -0.10px;
  margin: 10px 0;
  color: white;
}
</style>