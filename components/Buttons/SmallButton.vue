<template>
  <div class="SmallButton">
    {{ text }}
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "SmallButton",
  props: {
    text: {
      type: String,
      required: false,
    }
  }
})
</script>

<style lang="scss" scoped>
.SmallButton {

}
</style>