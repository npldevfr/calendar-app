<template>
  <SidebarBackdrop @click="close"/>
  <OnClickOutside class="Sidebar" @trigger="close">
    <SidebarContent sticky>
      <div class="SidebarHeader">
        <div class="SidebarTitle">Détail</div>
        <SmallButton type="Secondary" label="Fermer" @click="close"/>
      </div>

      <div class="SidebarLiveStatus" v-if="useIsNow(getEvent.start, getEvent.end)">
        <NowBadge/>
        <p>{{ getTimeLeft }} restantes</p>
      </div>
      <div class="SidebarEventTitle">
        {{
          getEvent.extendedProps.props['Matière'] ? getEvent.extendedProps.props['Matière'] : getEvent.title.replace('-', ' ')
        }}
      </div>
      <div class="SidebarEventTime">
        <TimeSpanText :hour="getEvent.start.toString()"/>
        ➔
        <TimeSpanText :hour="getEvent.end.toString()"/>
      </div>
    </SidebarContent>
    <SidebarDivider/>
    <SidebarContent>
      <div class="SidebarTitle">Prochains événements</div>


      <div v-if="getFollowingEvents(getEvent.id).length === 0">
        Aucun événement à venir
      </div>
      <div class="SidebarFollowingEvents" v-else>
        <div v-for="(eventsForDay, idx) in getFollowingEvents(getEvent.id)" :key="idx">
          <EventCard v-for="event in eventsForDay.events" :key="event.id" :event="event"/>
        </div>
      </div>
    </SidebarContent>

  </OnClickOutside>
</template>

<script lang="ts">
import {OnClickOutside} from '@vueuse/components'
import moment from "moment";
import useIsNow from "~/composables/useIsNow";
import {mapActions, mapState} from "pinia";
import {useCalendarStore} from "~/store/calendarStore";
import {IEvent} from "~/types/Event.interface";
import Button from "~/components/Buttons/Button.vue";
import SmallButton from "~/components/Buttons/SmallButton.vue";
import SidebarDivider from "~/components/Calendar/Sidebar/SidebarDivider.vue";
import NowBadge from "~/components/Utils/NowBadge.vue";
import SidebarContent from "~/components/Calendar/Sidebar/SidebarContent.vue";
import TimeSpanText from "~/components/Utils/TimeSpanText.vue";
import SidebarBackdrop from "~/components/Calendar/Sidebar/SidebarBackdrop.vue";

export default {
  name: "Sidebar",
  components: {
    SidebarBackdrop,
    TimeSpanText, SidebarContent, NowBadge, SidebarDivider, SmallButton, Button, OnClickOutside},
  mounted() {
    document.addEventListener('keydown', this.handleEsc);
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.handleEsc);
  },
  computed: {
    ...mapState(useCalendarStore, ['getSelectedEvent', 'getFollowingEvents']),
    getEvent(): IEvent {
      return this.getSelectedEvent;
    },
    getTimeLeft(): string {
      const end = moment(this.getEvent.end);
      const now = moment();
      const duration = moment.duration(end.diff(now));
      const hours = duration.hours();
      const minutes = duration.minutes();
      return hours > 0 ? `${hours}h${minutes}min` : `${minutes}min`;
    },
  },
  methods: {
    ...mapActions(useCalendarStore, ['SET_SELECTED_EVENT']),
    handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        this.close();
      }
    },
    useIsNow,
    close() {
      this.$emit('close');
      this.SET_SELECTED_EVENT();
    }
  }
}
</script>

<style lang="scss" scoped>

.Sidebar {
  overflow-y: auto;
  z-index: 800;
  background: #181922;
  border-left: 1px solid #2C2D3C;
  position: fixed;
  top: 73px;
  right: 0;
  width: 326px;
  bottom: 0;

  &Header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  &FollowingEvents {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    gap: 5px;
  }

  &Event {
    &Title {

      font-size: 16px;
      font-weight: 500;
      width: 100%;
    }

    &Time {

      margin-top: 10px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      font-size: 15px;
      color: #A0A0A0;
      gap: 10px;
      width: 100%;
    }
  }

  &LiveStatus {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
      font-style: normal;
      font-weight: 500;
      font-size: 13px;
      line-height: 10px;
      color: #858699;
    }
  }


  &Title {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 10px;
    display: flex;
    align-items: center;
    color: #858699;
  }

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


@media screen and (max-width: 1200px) {
  .Sidebar {
    border-top: 1px solid #2C2D3C;
    border-left: none;
    position: fixed;
    top: unset;
    left: 0;
    right: 0;
    bottom: 0;
    height: 500px !important;
    width: 100% !important;
    box-sizing: border-box;
  }
}

</style>
