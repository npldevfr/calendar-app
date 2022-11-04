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
import NotificationGroup from "~/components/Notifications/NotificationGroup.vue";
import Notification from "~/components/Notifications/Notification.vue";

export default {
  name: "Home",
  components: {Notification, NotificationGroup, LoadingScreen, Calendar, Button},
  computed: {
    ...mapState(useCalendarStore, ['getCalendar'])
  },
};
</script>

<style lang="scss">
html {
  background: #181922;
}

.Home {
  width: 100%;
  color: white;
}
</style>
