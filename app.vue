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
import {mapState} from "pinia";
import NotificationGroup from "~/components/Notifications/NotificationGroup.vue";
import Notification from "~/components/Notifications/Notification.vue";

export default {
  name: "app",
  components: {Notification, NotificationGroup},
  computed: {
    ...mapState(useNotificationStore, ['getNotifications'])
  }
}
</script>

<style lang="scss" scoped>
.app {

}
</style>