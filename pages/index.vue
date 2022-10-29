<template>
  <div class="Home">
    <Calendar/>
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
    // ...mapState(useCalendarStore, ['getEventsForWeek', 'getWeekInterval', 'getFollowingEvents', 'getTotalHoursForWeek'])
  },
  methods: {
    // ...mapActions(useCalendarStore, ['FETCH_CALENDAR', 'NEXT_WEEK', 'PREVIOUS_WEEK', 'GO_BACK_TO_TODAY']),
  },
  mounted() {
    // this.FETCH_CALENDAR();
  }
};
</script>

<style lang="scss" scoped>
.Home {
  color: white;
}
</style>
