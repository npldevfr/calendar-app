<template>
  <button class="Button" :class="getButtonType">
    {{ label }}
    <slot />
  </button>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";

export default defineComponent({
  name: "Button",
  props: {
    label: {
      type: String,
      required: true
    },
    type: {
      type: String as PropType<"Primary" | "Secondary">,
      default: "Primary",
      required: false
    }
  },
  computed: {
    getButtonType() {
      return `ButtonType${this.type}`;
    }
  }
})
</script>

<style lang="scss">
.Button {
  transition: all 0.2s ease-in-out;
  user-select: none;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 14px;
  gap: 10px;
  height: 32px;

  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;

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
      background: #292A35;
      border: 1px solid #313248;
      color: #858699;

      &:hover {
        background: #1f202a;
        border: 1px solid #36373f;
      }
    }
  }
}


@media screen and (max-width: 1200px) {

  .Button {
    padding: 20px 20px !important;
    width: 100% !important;
  }

}

</style>
