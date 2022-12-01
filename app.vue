<template>
  <ClientOnly>
    <div class="app">
      <Head>
        <Html lang="fr"/>
        <title></title>
      </Head>

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
import {useFavoritePersonaStore} from "~/store/favoritePersonaStore";
import {IPersona} from "~/types/Persona.interface";

export default {
  name: "app",
  components: {Notification, NotificationGroup},
  computed: {
    ...mapState(useNotificationStore, ['getNotifications'])
  },
  mounted() {
    useFavoritesPersonas('initialize')
    useCurrentPersona('initialize')

    const persona: IPersona = useCurrentPersona('get');
    if (persona.group_id) this.$router.push({name: '@-groupId', params: {groupId: persona.group_id}})
  },
  setup() {
    const favoritePersonaStore = useFavoritePersonaStore();
    const personaStore = usePersonaStore();
    onMounted(() => {
      favoritePersonaStore.REFRESH_FAVORITE_PERSONAS();
      personaStore.FETCH_PERSONAS();
    });
  }
}
</script>

<style lang="scss" scoped>
.app {

}
</style>