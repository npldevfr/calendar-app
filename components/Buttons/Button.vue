<template>
  <div class="Button">
    {{ label }}
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "Button",
  props: {
    label: {
      type: String,
      required: true
    },

  }
})
</script>

<style lang="scss" scoped>
.Button {
  box-sizing: border-box;

  /* Auto layout */

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 16px;
  gap: 8px;
  width: fit-content;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: white;
  background: #2C666E;
  border: 1px solid #2C666E;
  border-radius: 8px;
}
</style>