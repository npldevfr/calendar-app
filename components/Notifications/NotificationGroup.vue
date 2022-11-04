<template>
  <div class="NotificationGroup">
    <TransitionGroup name="slide-top">
      <slot/>
    </TransitionGroup>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "NotificationGroup",
  props: {}
})
</script>

<style lang="scss" scoped>
.NotificationGroup {
  width: 100%;
  box-sizing: border-box;
  position: fixed;
  padding: 15px;
  display: flex;
  z-index: 1000;
  flex-direction: column;
  gap: 5px;
  bottom: 20px;

}
</style>