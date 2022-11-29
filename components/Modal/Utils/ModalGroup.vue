<template>
  <div class="ModalGroup">
    <slot/>
  </div>
</template>

<script lang="ts">

export default {
  name: 'ModalGroup',
}
</script>

<style lang="scss" scoped>
.ModalGroup {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  gap: 4px;
  padding: 0 10px;
  scroll-behavior: smooth;

}
</style>