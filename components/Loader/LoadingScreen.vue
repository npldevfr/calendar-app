<template>
  <div class="LoadingScreen">
    Chargement...
  </div>
</template>

<script lang="ts">

export default {
  name: "LoadingScreen",
  props: {}
}
</script>

<style lang="scss" scoped>
.LoadingScreen {
  position: fixed;
  inset: 0;
  background-color: #1f1f1f;
  z-index: 9999;
  color: white;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>