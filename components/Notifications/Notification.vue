<template>
  <div class="Notification">
    {{ label }}
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "Notification",
  props: {
    label: {
      type: String,
      required: true,
    }
  }
})
</script>

<style lang="scss" scoped>
.Notification {

  width: 100%;
  background: #1f202a;
  border: 1px solid #2C2D3C;
  color: white;
  padding: 14px 12px;
  border-radius: 6px;
  box-sizing: border-box;
  font-size: 15px;
  font-weight: 400;
}
</style>