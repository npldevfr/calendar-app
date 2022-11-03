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
  mounted() {
    document.addEventListener('keydown', this.handleKeydown);
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.handleKeydown);
  },
  methods: {
    handleKeydown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        this.$emit('close')
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.DropdownContainer {
  z-index: 200;
}
</style>
