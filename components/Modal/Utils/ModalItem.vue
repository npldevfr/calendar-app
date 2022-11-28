<template>
  <div class="ModalItem" @mouseover="isMouseOver = true" @mouseleave="isMouseOver = false">
    <div class="ModalItemTitle" v-html="isNameMatchingValue"/>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {IPersona} from "~/types/Persona.interface";

export default defineComponent({
  name: "ModalItem",
  props: {
    persona: {
      type: Object as () => IPersona,
      required: true
    },
    matchValue: {
      type: String,
      required: false,
      default: ""
    },
    label: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isMouseOver: false
    }
  },
  computed: {
    isNameMatchingValue() {
      if (this.matchValue.length > 0) {
        const regex = new RegExp(this.matchValue, "gi");
        return this.label.replace(regex, (match) => {
          return `<span style="font-weight: 700; color: cyan">${match}</span>`;
        });
      } else {
        return this.label;
      }
    },
  }
})
</script>

<style lang="scss" scoped>
.ModalItem {
  user-select: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  transition: all 0.2s ease-in-out;
  background: var(--secondary-hover);
  border: 1px solid var(--secondary-hover);
  color: #D2D3E0;
  border-radius: 4px;
  padding: 12px 10px;
  width: 100%;

  &Symbol {
    margin-left: 5px;
    text-transform: uppercase;
    color: #626264;
  }

  &Title {
    display: flex;
    align-items: center;
    font-size: 15px;
    font-weight: 500;
    letter-spacing: -0.10px;
    color: #D2D3E0;

    img {
      margin-right: 10px;
    }
  }

  &Action {
    font-size: 18px;
    color: var(--primary);
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;

    &Danger {
      color: #ab1a1a;
    }
  }

  &:hover {
    background: var(--secondary-hover);
    cursor: pointer;
    border: 1px solid var(--primary);
  }

  &Danger {
    &:hover {
      border: 1px solid #ab1a1a;
    }
  }
}
</style>