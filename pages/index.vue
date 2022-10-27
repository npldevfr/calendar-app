<template>
  <div class="Home">
    <Calendar/>
  </div>
</template>

<script lang="ts">

import Button from "~/components/Buttons/Button.vue";
import Calendar from "~/components/Calendar/Calendar.vue";
import {mapActions, mapState} from "pinia";
import {useCalendarStore} from "~/store/calendarStore";

export default {
  name: "Home",
  components: {Calendar, Button},
  methods: {
    ...mapActions(useCalendarStore,  ['FETCH_CALENDAR']),
  },
  mounted() {
    this.FETCH_CALENDAR('2021-01-01', '2021-12-31');
  }
};
</script>

<style lang="scss" scoped>
.Home {
  color: white;
}
</style>
