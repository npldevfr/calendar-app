<template>
  <div class="MobileHeader">
    <div class="MobileHeaderSide">
      <slot name="left"/>
    </div>
    <div class="MobileHeaderSide">
      <slot name="right"/>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "MobileHeader",
})
</script>

<style lang="scss" scoped>
.MobileHeader {
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  gap: 10px;
  width: 100%;
  border-bottom: 1px solid #2C2D3C;
}

@media screen and (min-width: 1200px) {
  .MobileHeader {
    display: none;
  }
}

</style>