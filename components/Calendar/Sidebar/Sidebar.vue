<template>

  <OnClickOutside class="Sidebar" @trigger="close">
    <SidebarContent sticky>
      <div class="SidebarHeader">
        <div class="SidebarTitle">Détail</div>
        <div class="SidebarTitleActions">
          <SmallButton type="Secondary" label="Fermer" @click="close"/>
          <Kbd label="ESC"/>
        </div>
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


      <div class="SidebarEmptyEvents" v-if="getFollowingEvents(getEvent.id).length === 0">

        <svg width="48" height="64" viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M24 0C18.775 0 14.325 3.3375 12.6875 8H8C3.5875 8 0 11.5875 0 16V56C0 60.4125 3.5875 64 8 64H40C44.4125 64 48 60.4125 48 56V16C48 11.5875 44.4125 8 40 8H35.3125C33.675 3.3375 29.225 0 24 0ZM24 16C21.7875 16 20 14.2125 20 12C20 9.7875 21.7875 8 24 8C26.2125 8 28 9.7875 28 12C28 14.2125 26.2125 16 24 16ZM13.225 28.6625C14.2125 25.875 16.8625 24 19.825 24H27.1125C31.475 24 35 27.5375 35 31.8875C35 34.7125 33.4875 37.325 31.0375 38.7375L27 41.05C26.975 42.675 25.6375 44 24 44C22.3375 44 21 42.6625 21 41V39.3125C21 38.2375 21.575 37.25 22.5125 36.7125L28.05 33.5375C28.6375 33.2 29 32.575 29 31.9C29 30.85 28.15 30.0125 27.1125 30.0125H19.825C19.4 30.0125 19.025 30.275 18.8875 30.675L18.8375 30.825C18.2875 32.3875 16.5625 33.2 15.0125 32.65C13.4625 32.1 12.6375 30.375 13.1875 28.825L13.2375 28.675L13.225 28.6625ZM28 52C28 54.2125 26.2125 56 24 56C21.7875 56 20 54.2125 20 52C20 49.7875 21.7875 48 24 48C26.2125 48 28 49.7875 28 52Z"
              fill="#858699" fill-opacity="0.25"/>
        </svg>

        Aucun événement à venir..


      </div>
      <template v-else>
        <div class="SidebarTitle">Prochains événements</div>
        <div class="SidebarFollowingEvents">
          <EventCardGroup :title="formatDayName(eventsByDay.date)" :key="eventsByDay.date.toString()"
                          @click="REDIRECT_TO_DAY(eventsByDay.date)"
                          v-for="eventsByDay in getFollowingEvents(getEvent.id)">
            <EventCard v-for="event in  eventsByDay.events" :key="event.id" :event="event"/>
          </EventCardGroup>
        </div>
      </template>
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
import {IWeekInterval} from "~/types/WeekInterval.interface";
import {useFindWeekInterval} from "~/composables/useFindWeekInterval";
import {DATE_FORMAT} from "~/global.config";

export default {
  name: "Sidebar",
  components: {
    SidebarBackdrop,
    TimeSpanText, SidebarContent, NowBadge, SidebarDivider, SmallButton, Button, OnClickOutside
  },
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
    ...mapActions(useCalendarStore, ['SET_SELECTED_EVENT', 'SET_WEEK_INTERVAL']),
    REDIRECT_TO_DAY(date): void {
      const weekInterval: IWeekInterval = useFindWeekInterval(moment(date, 'YYYY-MM-DD'));
      // emit the dayIndex to the parent
      this.$emit('dayIndex', moment(date, 'YYYY-MM-DD').day());
      this.SET_WEEK_INTERVAL(weekInterval);
      this.close();
    },
    formatDayName(date: any): string {
      const frenchDays = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
      const frenchMonths = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
      return moment(date).format('dddd DD MMMM YYYY').replace(/\b\w/g, l => l.toUpperCase()).replace(/(January|February|March|April|May|June|July|August|September|October|November|December)/g, (match) => frenchMonths[moment().month(match).month()]).replace(/(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)/g, (match) => frenchDays[moment().day(match).day()]);
    },
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
  top: 0;
  right: 0;
  width: 326px;
  bottom: 0;

  &Body {
    z-index: 600;
  }

  &EmptyEvents {
    box-sizing: border-box;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 50px;
    flex-direction: column;
    gap: 20px;
    color: rgba(133, 134, 153, 0.5);
    font-size: 16px;
    font-weight: 500;
  }

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

    &Actions {
      display: flex;
      align-items: center;
      gap: 5px;
    }
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
