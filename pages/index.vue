<template>
  <div class="Home">
    <div style="display: flex">
      <Button label="Semaine précédente" @click="currentWeek -= 1"/>
      <Button label="Semaine suivante" @click="currentWeek += 1"/>
    </div>
    current week : {{ currentWeek }}
    <pre> {{ getCurrentWeekOfEDT }}</pre>
  </div>
</template>

<script lang="ts">

import useEDT from "~/composables/useEDT";
import moment from "moment";
import Button from "~/components/Buttons/Button.vue";

export default {
  name: "Home",
  components: {Button},
  props: {},
  data() {
    return {
      currentWeek: moment().isoWeek()
    };
  },
  computed: {
    getCurrentWeekOfEDT() {
      const data = useEDT();
      const currentWeek = data.find((week) => week.week === this.currentWeek);
      if (currentWeek) {
        return currentWeek;
      } else {
        return "Pas d'emploi du temps pour cette semaine";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.Home {
  color: var(--color-tertiary);
}
</style>