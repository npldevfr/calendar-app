<template>
  <div class="Home">
    <Transition>
      <LoadingScreen v-if="getCalendar.length === 0"/>
    </Transition>
    <Calendar/>
  </div>
</template>

<script lang="ts">

import Button from "~/components/Buttons/Button.vue";
import Calendar from "~/components/Calendar/Calendar.vue";
import {mapActions, mapState, mapStores} from "pinia";
import {useCalendarStore} from "~/store/calendarStore";
import LoadingScreen from "~/components/Loader/LoadingScreen.vue";

export default {
  name: "Home",
  components: {LoadingScreen, Calendar, Button},
  computed: {
    ...mapState(useCalendarStore, ['getCalendar'])
  },
};
</script>

<style lang="scss" scoped>
.Home {
  color: white;
}
</style>
