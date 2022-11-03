<template>
  <div class="SidebarContent" :class="isSticky">
    <slot/>
  </div>
</template>

<script lang="ts">


export default {
  name: "SidebarContent",
  props: {
    sticky: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isSticky() {
      return this.sticky ? "SidebarContentSticky" : "";
    },
  }
}
</script>

<style lang="scss" scoped>
.SidebarContent {
  width: 100%;
  box-sizing: border-box;
  padding: 20px;

  &Sticky {
    position: sticky;
    top: 0;
    background: #181922;
    z-index: 1;
  }
}
</style>