<template>
  <div class="NowBadge">
    EN COURS
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "NowBadge",
})
</script>

<style lang="scss" scoped>
.NowBadge {

  box-sizing: border-box;
  background: red;
  margin: 5px 0;
  color: white;
  width: fit-content;
  font-size: 12px;
  font-weight: 500;
  padding: 2px 5px;
  border-radius: 3px;
}
</style>