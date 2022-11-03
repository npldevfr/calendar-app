<template>
  <div class="CalendarHeader">
    <slot />
    <div class="CalendarHeaderHours">
      <slot name="hours" />
    </div>
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
  position: sticky;
  top: 0;
  z-index: 30;
  background: #181922;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  //display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 72px;
  width: 100%;
  margin: 0 auto;
  border-width: 0 1px 1px 1px;
  border-style: solid;
  border-color: #2C2D3C;
  box-sizing: border-box;

  &Hours {
    grid-column: span 6 / span 6;
    display: flex;
    height: 100%;
  }
}
</style>
