<template>
  <div class="Home" id="calendar">
    <Transition>
      <LoadingScreen v-if="getCalendar.length === 0 && havePersona"/>
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
import useCurrentPersona from "~/composables/Personas/useCurrentPersona";

export default {
  name: "edt",
  components: {Notification, NotificationGroup, LoadingScreen, Calendar, Button},
  mounted() {
    this.FETCH_CALENDAR();
  },
  methods: {
    ...mapActions(useCalendarStore, ['FETCH_CALENDAR'])
  },
  computed: {
    ...mapState(useCalendarStore, ['getCalendar']),
    havePersona(){
      return useCurrentPersona('get') === {}
    }
  },
};
</script>

<style lang="scss">


.Home {
  width: 100%;
  color: var(--primary-color);
}
</style>
