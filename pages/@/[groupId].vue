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
import {usePersonaStore} from "~/store/personaStore";

export default {
  name: "edt",
  components: {Notification, NotificationGroup, LoadingScreen, Calendar, Button},
  mounted() {
    if (this.$route.params.groupId) {
      this.FETCH_CALENDAR(this.$route.params.groupId);
    } else {
      this.$router.push({name: 'index'});
    }
  },
  methods: {
    ...mapActions(useCalendarStore, ['FETCH_CALENDAR']),
  },
  computed: {
    ...mapState(useCalendarStore, ['getCalendar']),
    ...mapState(usePersonaStore, ['getPersonaById']),
    havePersona(){
      return useCurrentPersona('get') !== null;
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
