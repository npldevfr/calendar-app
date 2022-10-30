<template>
  <div class="CalendarBody">
    <slot />
    <div class="CalendarBodyEvents">
      <slot name="events" />
    </div>
  </div>
</template>

<script lang="ts">

export default {
  name: 'CalendarBody',
}
</script>

<style lang="scss" scoped>
.CalendarBody {
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));

  &Events {
    grid-column: span 6 / span 6;
    display: flex;
    height: 100%;
  }
}
</style>
