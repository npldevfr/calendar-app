<template>
  <OnClickOutside class="Sidebar" @trigger="close">
    Cours :
    <div class="Sidebar__event">
      <div class="Sidebar__isnow" v-if="useIsNow(clickedEvent.start, clickedEvent.end)">NOW</div>
      Cours en cours
      {{ clickedEvent.title }}
      {{ clickedEvent.start }}
      {{ clickedEvent.end }}
    </div>
    <hr/>
    Cours à venir : <br/>
    <div class="SidebarIncomingEvents" v-if="events.length">
      <EventCard :event="event" v-for="(event, idx) in events" :key="idx"/>
    </div>
    <div v-else>
      Aucun cours à venir
    </div>
  </OnClickOutside>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {OnClickOutside} from '@vueuse/components'
import moment from "moment";
import useIsNow from "~/composables/useIsNow";

export default defineComponent({
  name: "Sidebar",
  components: {OnClickOutside},
  props: {
    clickedEvent: {
      type: Object,
      required: true
    },
    events: {
      type: Array,
      required: true,
    },
  },
  mounted(){
    document.addEventListener('keydown', this.handleEsc);
  },
  beforeUnmount(){
    document.removeEventListener('keydown', this.handleEsc);
  },
  methods: {
    handleEsc(e: KeyboardEvent){
      if(e.key === 'Escape'){
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
  width: 400px;
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