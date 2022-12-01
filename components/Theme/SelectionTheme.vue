<template>
  <div class="SelectionTheme">
    <CardTheme v-for="(theme, index) in themes" :theme="theme" key="index" />
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import CardTheme from "~/components/Theme/CardTheme.vue";

export default defineComponent({
  name: "SelectionTheme",
  components: {CardTheme},
  data() {
    return {
      themes: ['light', 'dark']
    }
  }
})
</script>

<style lang="scss" scoped>
.SelectionTheme {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 5px;
  align-items: center;
}
</style>