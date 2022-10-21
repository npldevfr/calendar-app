<template>
  <div class="CalendarHeader">
    <slot />
  </div>
</template>

<script lang="ts">

export default {
  name: 'CalendarHeader',
}
</script>

<style lang="scss" scoped>
.CalendarHeader {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  //display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 72px;
  width: 1200px;
  margin: 0 auto;
  border-width: 0 1px 1px 1px;
  border-style: solid;
  border-color: #2C2D3C;
}
</style>
