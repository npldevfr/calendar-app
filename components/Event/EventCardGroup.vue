<template>
  <div class="EventCardGroup">
    <div class="EventCardGroupTitle">{{ title }}</div>
    <div class="EventCardGroupBody">
      <slot/>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "EventCardGroup",
  props: {
    title: {
      type: String,
      required: true,
      default: ""
    }
  }
})
</script>

<style lang="scss" scoped>
.EventCardGroup {

  box-sizing: border-box;
  width: 100%;
  border: 1px solid #323448;
  padding: 10px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;

  &Title {
    font-size: 16px;
    font-weight: 500;
    color: #858699;
    margin-bottom: 20px;
  }

  &Body {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

}
</style>