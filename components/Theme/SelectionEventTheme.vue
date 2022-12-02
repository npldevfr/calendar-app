<template>
  <div class="SelectionEventTheme">
    <EventTheme v-for="(color, idx) in colors" :color="color" key="idx"/>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import EventTheme from "~/components/Theme/EventTheme.vue";

export default defineComponent({
  name: "SelectionEventTheme",
  components: {EventTheme},
  data() {
    return {
      colors: ['#162f9d', '#1a6b4d', '#c58511', '#c45d25',
        '#7846b5', '#9b1a28', '#147a76', '#912549']
    }
  }
})
</script>

<style lang="scss" scoped>
.SelectionEventTheme {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 5px;
  width: 100%;
}
</style>