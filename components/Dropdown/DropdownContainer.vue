<template>
  <div class="DropdownContainer">
    <OnClickOutside @trigger="$emit('close')">
      <slot/>
    </OnClickOutside>
  </div>


</template>

<script lang="ts">
import {defineComponent} from "vue";
import {OnClickOutside} from '@vueuse/components'

export default defineComponent({
  name: "DropdownContainer",
  components: {OnClickOutside},

  props: {}
})
</script>

<style lang="scss" scoped>
.DropdownContainer {
  z-index: 2000;
}
</style>
