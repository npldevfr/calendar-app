<template>
  <div class="CalendarBody">
    <slot />
  </div>
</template>

<script lang="ts">

export default {
  name: 'CalendarBody',
}
</script>

<style lang="scss" scoped>
.CalendarBody {
  width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));

}
</style>
