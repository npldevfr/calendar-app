<template>
  <OnClickOutside class="Sidebar" @trigger="close">
    {{ getSelectedEvent.title }}
    <hr/>
    Événements à venir : <br/>
    <div v-if="getFollowingEvents(getSelectedEvent.id).length === 0">
      Aucun événement à venir
    </div>
    <div v-else>
      <div v-for="event in getFollowingEvents(getSelectedEvent.id)" :key="event.id">
        {{ event.start }} - {{ event.end }}
      </div>
    </div>
  </OnClickOutside>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {OnClickOutside} from '@vueuse/components'
import moment from "moment";
import useIsNow from "~/composables/useIsNow";
import {mapState} from "pinia";
import {useCalendarStore} from "~/store/calendarStore";

export default defineComponent({
  name: "Sidebar",
  components: {OnClickOutside},
  mounted() {
    document.addEventListener('keydown', this.handleEsc);
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.handleEsc);
  },
  computed: {
    ...mapState(useCalendarStore, ['getSelectedEvent', 'getFollowingEvents']),
  },
  methods: {
    handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        this.close();
      }
    },
    useIsNow,
    close() {
      this.$emit('close')
    }
  }
})
</script>

<style lang="scss" scoped>
.Sidebar {
  z-index: 9000;
  background: #181922;
  border-left: 1px solid #2C2D3C;
  position: fixed;
  top: 0;
  right: 0;
  padding: 20px;
  width: 286px;
  bottom: 0;

  .Sidebar__event {
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 10px;
    background: #575BC7;
    border: 1px solid #575BC7;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }

  &__isnow {
    background: red;
    font-weight: bold;
  }

  &IncomingEvents {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
}
</style>
