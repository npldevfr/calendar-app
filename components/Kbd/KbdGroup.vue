<template>
  <div class="KbdGroup">
    <slot />
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "KbdGroup",
  props: {}
})
</script>

<style lang="scss" scoped>
.KbdGroup {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  padding: 0;
  line-height: 14px;
  gap: 5px;
  font-weight: 500;
  font-size: 14px;
  color: #A0A3A6;
}
</style>