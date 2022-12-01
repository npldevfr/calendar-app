<template>
  <div class="ModalContainer">
    <slot />
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "ModalContainer",
  props: {}
})
</script>

<style lang="scss" scoped>
.ModalContainer {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>