<template>
  <div class="ModalMoreResult">
    + {{ moreResults }} résultat<template v-if="moreResults > 1">s</template>
  </div>
</template>

<script lang="ts">

export default {
  name: 'ModalMoreResult',
  props: {
    moreResults: {
      type: Number,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.ModalMoreResult {
  transition: all 0.2s ease-in-out;
  font-size: 12px;
  text-align: right;
  width: 100%;
  letter-spacing: -0.10px;
  margin-top: 5px;
  color: white;
}
</style>