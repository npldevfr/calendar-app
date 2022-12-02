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

<style lang="scss" >
.CalendarHeader {
  transition: background, color, background-color .3s linear;
  display: grid;
  position: sticky;
  top: 0;
  z-index: 150;
  background: var(--bg-color);
  //grid-template-columns: 0.5fr repeat(6, minmax(0, 1fr));
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
  border-color: var(--secondary-border);
  box-sizing: border-box;

  &Hours {
    z-index: 150;
    grid-column: span 6 / span 6;
    display: flex;
    height: 100%;
  }
}
</style>
