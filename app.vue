<template>
  <Head>
    <Html lang="fr" />
    <title></title>
    <Link rel="apple-touch-icon" href="@/assets/icons/apple-touch-icon.png" />
    <Link rel="shortcut icon" href="@/assets/icons/apple-touch-icon.png" />
  </Head>
  <div class="app">
    <NuxtPage/>
    <NotificationGroup>
      <Notification v-for="(notification, idx) in getNotifications" :key="idx" :label="notification" />
    </NotificationGroup>
  </div>
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