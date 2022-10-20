<template>
  <div class="Home">
    <div style="display: flex">
      <!--      <Button label="Semaine précédente" @click="currentWeek&#45;&#45;"/>-->
      <!--      <Button label="Semaine suivante" @click="currentWeek++"/>-->
    </div>
    current week : {{ currentWeek }}
    <Calendar/>
    <!--    <pre> {{ getCurrentWeekOfEDT }}</pre>-->
  </div>
</template>

<script lang="ts">

import moment from "moment";
import Button from "~/components/Buttons/Button.vue";
import Calendar from "~/components/Calendar/Calendar.vue";

export default {
  name: "Home",
  components: {Calendar, Button},
  props: {},
};
</script>

<style lang="scss" scoped>
.Home {
  color: white;
}
</style>
