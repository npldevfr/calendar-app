<template>
  <div class="SelectionEventTheme">
    <EventTheme v-for="(color, idx) in colors" :color="color" key="idx" />
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import EventTheme from "~/components/Theme/EventTheme.vue";

export default defineComponent({
  name: "SelectionEventTheme",
  components: {EventTheme},
  data(){
    return {
      colors: ['#305afe', '#00b578', '#ffaa01', '#fe7831', '#7846b5', '#fb3245', '#12bcb5', '#ff3d79']
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