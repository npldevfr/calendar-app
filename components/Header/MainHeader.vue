<template>
  <div class="MainHeader">
    <div class="MainHeaderContent">
      <div class="MainHeaderList">
        <slot name="left"/>
      </div>
      <div class="MainHeaderList">
        <slot name="right"/>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "MainHeader",
})
</script>

<style lang="scss" scoped>
.MainHeader {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 20px 30px;
  gap: 10px;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #2C2D3C;

  &Content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    gap: 10px;
    width: 1200px;
  }

  &List {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0;
    gap: 5px;
  }
}
</style>