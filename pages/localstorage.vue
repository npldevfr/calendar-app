<template>
  <div class="localstorage">
    <br/>
    <br/>
    <br/>
    <input type="text" v-model="state.name" placeholder="Enter your name">

    <pre>
      {{ state }}
    </pre>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useStorage} from "@vueuse/core";
import {IPersona} from "~/types/Persona.interface";

export default defineComponent({
  name: "localstorage",
  setup() {
    const defaultValue: IPersona = JSON.parse(window.localStorage.getItem("edtCurrentPersona")) || {};
    const state = useStorage<IPersona>('edtCurrentPersona', defaultValue);
    const save = () : void => {
      window.localStorage.setItem("edtCurrentPersona", JSON.stringify(state.value));
    }

    return {
      state,
      save
    }
  }
})
</script>

<style lang="scss" scoped>
.localstorage {

}
</style>