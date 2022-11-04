<template>
  <div class="Login">
    <EDTLogo />
<!--    <div class="LoginActions">-->
<!--      test-->
<!--    </div>-->
  </div>
</template>

<script lang="ts">

import EDTLogo from "~/components/Logo/EDTLogo.vue";
export default {
  name: "index",
  components: {EDTLogo},
}
</script>

<style lang="scss">

html {
  background: #181922;
}

.Login {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(ellipse at 50% 80%, rgba(0, 102, 255, 0.15),rgba(255,255,255,0));


  &Actions {
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    padding: 50px 35px;
    height: 300px;
    left: 0;
    right: 0;
    background: red;
  }
}
</style>
