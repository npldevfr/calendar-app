<template>
  <div class="KeyboardKey">{{ label }}</div>
</template>

<script lang="ts">

export default {
  name: 'KeyboardKey',
  props: {
    label: {
      type: String,
      default: '',
      required: true,
    },
  }
}
</script>

<style lang="scss" scoped>
.KeyboardKey {
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-transform: uppercase;
  align-items: center;
  width: fit-content;
  padding: 2px 7px;
  gap: 5px;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  user-select: none;
  color: #A0A3A6;
  background: #1b1c25;
  border: 1px solid #313248;
  border-radius: 4px;
}
</style>
