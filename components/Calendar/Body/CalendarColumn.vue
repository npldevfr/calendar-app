<template>
  <div class="CalendarColumn" :class="{'CalendarColumnFW': view === 'day'}">
    <slot />
  </div>
</template>

<script lang="ts">

export default {
  name: 'CalendarColumn',
  props: {
    view: {
      type: String,
      required: true,
      default: 'day'
    }
  }
}
</script>

<style lang="scss" scoped>

.CalendarColumn {
  position: relative;
  overflow: hidden;
  grid-column: span 1 / span 1;
  height: 100%;

  &FW {
    grid-column: span 5 / span 5;
  }

}
</style>
