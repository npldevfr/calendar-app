<template>
  <button class="SmallButton" :class="getButtonType">
    <slot/>
    {{ label }}
    <svg v-if="dropdown" width="7" height="4" viewBox="0 0 7 4" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.8225 0L3.5 2.47439L6.1775 0L7 0.765499L3.5 4L0 0.765499L0.8225 0Z" fill="#858699"/>
    </svg>
    <slot name="right"/>

  </button>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";

export default defineComponent({
  name: "SmallButton",
  props: {
    label: {
      type: String,
      required: false,
    },
    type: {
      type: String as PropType<"Secondary" | "Transparent" | "Primary">,
      default: "Secondary",
      required: false,
    },
    dropdown: {
      type: Boolean,
      required: false,
      default: false
    },
  },
  computed: {
    getButtonType() {
      return `SmallButtonType${this.type}`;
    }
  }
})
</script>

<style lang="scss" scoped>
.SmallButton {
  transition: all 0.2s ease-in-out;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 8px;
  gap: 5px;
  user-select: none;
  cursor: pointer;
  height: 24px;
  font-weight: 500;
  font-size: 12px;
  line-height: 12px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  border-radius: 4px;

  &:focus {
    outline: none;
  }


  &Type {

    &Primary {

      background: var(--primary);
      border: 1px solid var(--primary);
      color: var(--primary-color);

      &:hover {
        background: var(--primary-hover);
        border: 1px solid var(--primary-hover);
      }
    }

    &Secondary {
      background: var(--secondary);
      border: 1px solid var(--secondary-border);
      color: var(--secondary-text);

      &:hover {
        background: var(--secondary-hover);
        border: 1px solid var(--secondary-border);
      }
    }

    &Transparent {
      border: 1px dashed var(--secondary-border);
      background: transparent;
      color: var(--secondary-text);
    }
  }
}
</style>
