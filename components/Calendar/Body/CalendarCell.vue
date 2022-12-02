<template>
  <div class="CalendarCell">
    <slot/>
  </div>
</template>

<script lang="ts">

export default {
  name: 'CalendarCell',
}
</script>

<style lang="scss" scoped>
.CalendarBody .CalendarColumn:first-child .CalendarCell {
  border-left: 1px dashed var(--secondary-border);
}



.CalendarCell {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  display: flex;
  padding: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  color: #858699;
  border-width: 0 1px 1px 0px;
  border-style: dashed;
  border-color: var(--secondary-border);
}
</style>
