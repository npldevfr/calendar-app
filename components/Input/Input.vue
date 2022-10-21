<template>
  <div class="Input">
    <input />
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "Input",
  props: {}
})
</script>

<style lang="scss" scoped>
.Input {

  width: 100%;

  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #313248;
    border-radius: 4px;
    background: #1b1c25;
    color: #D2D3E0;
    &:focus {
      outline: none;
      border: 1px solid #575BC7;
    }
  }
}
</style>