<template>
  <div class="Calendar">
    <div style="display: flex; gap: 5px; padding: 10px;">
      <Button @click="previousWeek" label="Semaine précédente"/>
      <Button @click="nextWeek" label="Semaine suivante"/>
      <Button @click="goToday" type="Secondary" label="Revenir à aujourd'hui" v-if="!isTodayIsInThisWeek"/>
    </div>
    <div class="Calendar__days">
      <CalendarHeader>
        <CalendarDayHeader v-for="dateInWeek in datesInWeek"
                           :key="dateInWeek"
                           :day-name="getDayName(dateInWeek)"
                           :day-number="dateInWeek"
        />
      </CalendarHeader>

    </div>
    total hours : {{ calcEventTotalHours }}
    <div v-for="(events, idx) in getEventsInThisWeek" :key="idx">
      <div v-for="event in events.event" @click="currentEventShowing = event; sidebarEventState = true;">
        <div :class="isActiveCell(event)">
          {{ event.title }}
          {{ event.start }}
          {{ event.end }}

          <div v-if="useIsNow(event.start, event.end)">NOW</div>
        </div>
      </div>


    </div>

    <!--    <Transition appear>-->
    <Sidebar :clicked-event="currentEventShowing" :events="getIncomingEvents"
             v-if="sidebarEventState"
             @close="tryCloseSidebar"/>
    <!--    </Transition>-->


  </div>
</template>

<script lang="ts">

import moment from "moment";
import Button from "~/components/Buttons/Button.vue";
import useEDT from "~/composables/useEDT";
import Sidebar from "~/components/Calendar/Sidebar/Sidebar.vue";
import useIsNow from "~/composables/useIsNow";

export default {
  name: 'Calendar',
  components: {Sidebar, Button},
  props: {},
  data() {
    return {
      weekStartDay: moment().startOf('isoWeek'),
      weekEndDay: moment().endOf('isoWeek'),

      sidebarEventState: false,
      currentEventShowing: {},
    }
  },
  computed: {
    getIncomingEvents() {
      const events = useEDT();
      const eventNameToFind = this.currentEventShowing;
      //get event where id = currentEventShowingTitle
      const incomingEvents = [];
      events.forEach((event) => {
        event.event.forEach((event) => {
          if (event.title === eventNameToFind.title && moment(event.start).isAfter(moment())) {
            incomingEvents.push(event);
          }
        })
      });

      return incomingEvents;

    },
    isTodayIsInThisWeek() {
      return this.weekStartDay.isBefore(moment()) && this.weekEndDay.isAfter(moment())
    },
    /**
     * @return [...moment]
     * Retourne un tableau de moment contenant les dates de la semaine en cours (du lundi au samedi)
     */
    datesInWeek() {
      const dates = [];
      let current = this.weekStartDay;
      while (current <= this.weekEndDay) {
        if (current.day() !== 0) {
          dates.push(current.format('DD/MM/YYYY'));
        }
        current = current.clone().add(1, 'd');
      }
      return dates;
    },
    getEventsInThisWeek() {
      const events = useEDT();
      return events.filter(event => {
        return moment(event.firstDayOfWeek).isBetween(this.weekStartDay, this.weekEndDay, null, '[]')
      })
    },
    /**
     * Calcule le nombre d'heures de cours de la semaine
     * [!] Possède un bug, si un cours dure plus d'une journée, il ne sera pas compté
     * [!] Ajouter des mots dans blacklist pour ne pas compter les heures
     */
    calcEventTotalHours() {
      const events = this.getEventsInThisWeek;
      let totalHours = 0;
      let totalMinutes = 0;
      const blacklist = ['Jour Férié', 'Fermeture IUT']

      events.forEach(event => {
        event.event.forEach(event => {
          if (!blacklist.some(word => event.title.includes(word))) {
            totalHours += moment(event.end).diff(moment(event.start), 'hours');
            totalMinutes += moment(event.end).diff(moment(event.start), 'minutes');
          }
        })
      })
      return `${totalHours}h${totalMinutes % 60 === 0 ? '' : totalMinutes % 60}`
    },
  },
  mounted() {
    document.addEventListener('keydown', this.handleKeyDown);
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.handleKeyDown);
  },
  methods: {
    isActiveCell(cell) {
      const ces = this.currentEventShowing;
      if (ces.start === cell.start && ces.end === cell.end) {
        return 'CalendarCellActive'
      }
    },
    tryCloseSidebar() {
      this.sidebarEventState = false;
    },
    goToday() {
      this.weekStartDay = moment().startOf('isoWeek');
      this.weekEndDay = moment().endOf('isoWeek');
    },
    handleKeyDown({key}) {
      // this.defaultSelectedEvent();
      // const events = this.getEventsInThisWeek[0].event;
      // const currentEventShowingIndex = events.findIndex(event => event.title === this.currentEventShowing.title);

      switch (key) {
        case 'ArrowLeft':
          this.previousWeek();
          break;
        case 'ArrowRight':
          this.nextWeek();
          break;
        case 'Backspace':
          this.goToday();
          break;
        case 'ArrowUp':
          break;
        case 'ArrowDown':
          break;
        case 'Enter':
          this.sidebarEventState = true;
          break;
      }
    },
    defaultSelectedEvent() {
      if (this.getEventsInThisWeek.length > 0) {
        return this.currentEventShowing = this.getEventsInThisWeek[0].event[0]
      }
    },
    previousWeek() {
      this.weekStartDay = moment(this.weekStartDay).subtract(1, 'week');
      this.weekEndDay = moment(this.weekEndDay).subtract(1, 'week');
      this.weekNumber--;
    },
    nextWeek() {
      this.weekStartDay = moment(this.weekStartDay).add(1, 'week');
      this.weekEndDay = moment(this.weekEndDay).add(1, 'week');
      this.weekNumber++;
    },
    getDayName(day) {
      const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
      return days[moment(day, 'DD/MM/YYYY').day()];
    },
    useIsNow
  },

}
</script>

<style lang="scss" scoped>
.Calendar {

  &CellActive {
    border: 4px solid red;
  }
}
</style>
