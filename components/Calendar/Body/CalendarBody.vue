<template>
  <div class="CalendarBody" >
    <slot/>
  </div>
</template>

<script lang="ts">

export default {
  name: 'CalendarBody',
}
</script>

<style lang="scss" scoped>



.CalendarBody {
  overflow: hidden;
  width: 100%;
  margin: 0 auto;
  display: grid;
  //grid-template-columns: 0.5fr repeat(6, minmax(0, 1fr));
  grid-template-columns: repeat(6, minmax(0, 1fr));

  &Events {
    grid-column: span 6 / span 6;
    display: flex;
    height: 100%;
  }
}

/** If .CalendarBody has 2 children make the first child 0.5fr and the second child 5.5fr **/


</style>
