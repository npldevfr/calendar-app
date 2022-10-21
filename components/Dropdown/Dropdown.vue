<template>
  <Transition name="bounce">
    <div class="DropdownRelative" v-if="state">
      <div class="Dropdown">
        <div class="DropdownContent">
          <slot/>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "Dropdown",
  props: {
    state: {
      type: Boolean,
      required: true,
    }
  }
})
</script>

<style lang="scss" scoped>
.Dropdown {
  position: absolute;
  top: 5px;
  border-radius: 4px;
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  right: 0;
  background: #292A35;
  border: 1px solid #313248;
  color: #D2D3E0;

  &Content {
    position: relative;
  }

  &Relative {
    position: relative;
    width: 100%;
  }
}
</style>