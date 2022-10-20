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
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 72px;
  border-width: 0 1px 1px 0;
  border-style: solid;
  border-color: #2C2D3C;
}
</style>
