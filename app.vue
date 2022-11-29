<template>
  <ClientOnly>
    <div class="app">
      <Head>
        <Html lang="fr"/>
        <title></title>
      </Head>

<!--      <ColorScheme placeholder="..." tag="span">-->
<!--        <select v-model="$colorMode.preference" style="position: fixed; z-index: 9999">-->
<!--          <option value="light">Light</option>-->
<!--          <option value="dark">Dark</option>-->
<!--          <option value="system">System</option>-->
<!--        </select>-->
<!--      </ColorScheme>-->
      <NuxtPage/>
      <NotificationGroup v-if="getNotifications.length">
        <Notification v-for="(notification, idx) in getNotifications" :key="idx" :label="notification"/>
      </NotificationGroup>
    </div>
  </ClientOnly>
</template>

<script lang="ts">

import {useNotificationStore} from "~/store/notificationStore";
import {mapActions, mapState} from "pinia";
import NotificationGroup from "~/components/Notifications/NotificationGroup.vue";
import Notification from "~/components/Notifications/Notification.vue";
import {usePersonaStore} from "~/store/personaStore";
import useFavoritesPersonas from "~/composables/Personas/useFavoritesPersonas";
import useCurrentPersona from "~/composables/Personas/useCurrentPersona";

export default {
  name: "app",
  components: {Notification, NotificationGroup},
  computed: {
    ...mapState(useNotificationStore, ['getNotifications'])
  },
  mounted() {
    this.FETCH_PERSONAS();
    useFavoritesPersonas('initialize')
    useCurrentPersona('initialize')
  },
  methods: {
    ...mapActions(usePersonaStore, ['FETCH_PERSONAS'])
  }
}
</script>

<style lang="scss" scoped>
.app {

}
</style>