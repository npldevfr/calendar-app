<template>
  <div class="SidebarBackdrop">

  </div>
</template>

<script lang="ts">

export default {
  name: 'SidebarBackdrop',
}
</script>

<style lang="scss" scoped>
.SidebarBackdrop {
  background-color: rgba(24, 25, 34, 0.70);
  backdrop-filter: blur(8px);
  position: fixed;
  inset: 0;
  z-index: 300;
}
</style>