<template>
  <div class="KbdList">
      <slot />
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "KbdList",
  props: {}
})
</script>

<style lang="scss" scoped>
.KbdList {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 15px;
}
</style>