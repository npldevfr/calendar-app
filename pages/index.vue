<template>
  <div>
    <div class="Login">
      <EDTLogo/>
      <div class="LoginActions">
        <Button type="Secondary" label="{{ SELECT GROUP }}" @click="$router.push({name: 'edt'})"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import EDTLogo from "~/components/Logo/EDTLogo.vue";
import Button from "~/components/Buttons/Button.vue";

export default {
  name: "index",
  components: {Button, EDTLogo},
  mounted() {
    if (window !== undefined) window.addEventListener("resize", this.onResize);
  },
  beforeUnmount() {
    if (window !== undefined) window.removeEventListener("resize", this.onResize);
  },
  methods: {
    onResize() {
      if (window.innerWidth > 1200) {
        this.$router.push({name: "edt"});
      }
    }
  }
}
</script>

<style lang="scss">

html {
  background: #181922;
}

.Login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  inset: 0;
  gap: 100px;
  width: 100%;
  height: 100%;
  //background: radial-gradient(ellipse at 50% 80%, rgba(0, 102, 255, 0.15),rgba(255,255,255,0));
  //background: linear-gradient(#181922 0%, rgba(49, 50, 72, 0.34) 100%);


  &Actions {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 50px 35px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    box-sizing: border-box;
    width: 100%;

    > .Button {
      width: 100% !important;
    }
  }
}
</style>
