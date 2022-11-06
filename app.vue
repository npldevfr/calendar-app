<template>
  <ClientOnly>
    <div class="app">
      <Head>
        <Html lang="fr"/>
        <title></title>
      </Head>
      <NuxtPage/>
      <NotificationGroup>
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

export default {
  name: "app",
  components: {Notification, NotificationGroup},
  computed: {
    ...mapState(useNotificationStore, ['getNotifications'])
  },
  mounted() {
    this.FETCH_PERSONAS();
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