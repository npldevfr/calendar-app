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
  transition: all 0.2s ease-in-out;
  user-select: none;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 14px;
  gap: 10px;
  height: 32px;
  background: #575BC7;
  border: 1px solid #575BC7;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  color: #FFFFFF;

  &:hover {
    background: #474baf;
    border: 1px solid #474baf;
  }
}
</style>
