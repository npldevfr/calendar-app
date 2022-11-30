<template>
  <div class="Input">
    <input type="text" :maxlength="maxLength"
           :autocomplete="autocomplete"
           :placeholder="placeholder"
           :name="name"
           :ref="ref"
           :type="type"
           :value="modelValue"
           @keydown.enter="$emit('enter')"
           @input="updateInput" />

    <Icon name="material-symbols:close" @click="resetInput" v-if="modelValue.length > 0" />
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "Input",
  props: {
    ref: {
      type: String,
      required: false,
    },
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
    resetInput() {
      this.$emit("update:modelValue", "");
    },
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

  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: var(--secondary-border);
  color: #D2D3E0;
  border: 1px solid transparent;
  border-radius: 4px;
  padding: 0 10px 0 0;


  input {
    color: #D2D3E0;

    background: var(--secondary-border);
    transition: all 0.2s ease-in-out;
    border: 1px solid transparent;
    margin-right: 10px;
    border-radius: 4px;
    padding: 10px;
    width: 100%;
    &::placeholder {
      color: #D2D3E0;
    }

    &:focus {
      outline: none;
      border: 1px solid #575BC7;
    }
  }
}
</style>
