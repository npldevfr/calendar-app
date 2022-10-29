<template>
  <div class="CalendarColumn">
    <slot />
  </div>
</template>

<script lang="ts">

export default {
  name: 'CalendarColumn',
}
</script>

<style lang="scss" scoped>
.CalendarBodyEvents .CalendarColumn {
  width: 100%;
}

.CalendarColumn {
  position: relative;
  grid-column: span 1 / span 1;
  height: 100%;

}
</style>
