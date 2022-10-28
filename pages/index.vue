<template>
  <div class="Home">
    {{ getWeekInterval }}
    <div style="display: flex">
      <Button label="Semaine précédente" @click="PREVIOUS_WEEK"/>
      <Button label="Semaine suivante" @click="NEXT_WEEK"/>
    </div>
    <!--    <Calendar/>-->
  </div>
</template>

<script lang="ts">

import Button from "~/components/Buttons/Button.vue";
import Calendar from "~/components/Calendar/Calendar.vue";
import {mapActions, mapState, mapStores} from "pinia";
import {useCalendarStore} from "~/store/calendarStore";

export default {
  name: "Home",
  components: {Calendar, Button},
  computed: {
    ...mapState(useCalendarStore, ['getEventsForWeek', 'getWeekInterval'])
  },
  methods: {
    ...mapActions(useCalendarStore, ['FETCH_CALENDAR', 'NEXT_WEEK', 'PREVIOUS_WEEK']),
  },
  mounted() {
    this.FETCH_CALENDAR();
  }
};
</script>

<style lang="scss" scoped>
.Home {
  color: white;
}
</style>
