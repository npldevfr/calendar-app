<template>
  <div class="Input">
    <input type="text" :maxlength="maxLength"
           :autocomplete="autocomplete"
           :placeholder="placeholder"
           :name="name"
           :type="type"
           :value="modelValue"
           @keydown.enter="$emit('enter')"
           @input="updateInput" />
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "Input",
  props: {
    modelValue: {
      type: String,
      required: true
    },
    maxLength: {
      type: Number,
      required: false,
      default: 100
    },
    autocomplete: {
      type: String,
      required: false,
      default: "off"
    },
    placeholder: {
      type: String,
      required: false,
      default: ""
    },
    name: {
      type: String,
      required: false,
      default: ""
    },
    type: {
      type: String,
      required: false,
      default: "text"
    }
  },
  methods: {
    updateInput(event: any) {
      // if (this.maxLength > 0 && event.target.value.length > this.maxLength) {
      //   event.target.value = event.target.value.substring(0, this.maxLength);
      // }
      this.$emit("update:modelValue", event.target.value);
    },
    deleteInput() {
      this.$emit("update:modelValue", "");
    }
  }
})
</script>

<style lang="scss" scoped>
.Input {

  width: 100%;

  input {

    transition: all 0.2s ease-in-out;
    padding: 10px;
    border: 1px solid #313248;
    border-radius: 4px;
    background: #1b1c25;
    color: #D2D3E0;

    &:focus {
      outline: none;
      border: 1px solid #575BC7;
    }
  }
}
</style>