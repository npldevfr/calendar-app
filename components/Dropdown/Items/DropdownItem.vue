<template>
  <div class="DropdownItem">
    <div v-html="isMatchingValue"/>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "DropdownItem",
  props: {
    label: {
      type: String,
      required: true
    },
    matchValue: {
      type: String,
      required: false,
      default: ""
    },
    choosen: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    isMatchingValue() {
      if (this.matchValue.length > 0) {
        const regex = new RegExp(this.matchValue, "gi");
        return this.label.replace(regex, (match) => {
          return `<span style="font-weight: 700">${match}</span>`;
        });
      } else {
        return this.label;
      }
    }
  }
})
</script>

<style lang="scss" scoped>

.DropdownItem {
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  transition: all 0.2s ease-in-out;


  &:hover {
    background: var(--primary);
    color: var(--primary-color);
  }

  &Choosen {
    background: var(--primary);
  }
}
</style>
