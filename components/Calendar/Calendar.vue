<template>
  <div class="Calendar">
    <div style="display: flex; gap: 5px;">
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
    <div v-for="(event, idx) in getEventsInThisWeek" :key="idx">
      <div v-for="event in event.event">
        {{ event.title }}
        {{ event.start }}
        {{ event.end }}
      </div>


    </div>


  </div>
</template>

<script lang="ts">

import moment from "moment";
import Button from "~/components/Buttons/Button.vue";
import useEDT from "~/composables/useEDT";

export default {
  name: 'Calendar',
  components: {Button},
  props: {},
  data() {
    return {
      weekStartDay: moment().startOf('isoWeek'),
      weekEndDay: moment().endOf('isoWeek'),
    }
  },
  computed: {
    isTodayIsInThisWeek() {
      return this.weekStartDay.isBefore(moment()) && this.weekEndDay.isAfter(moment())
    },
    datesInWeek() {
      const dates = [];
      let current = this.weekStartDay;
      while (current <= this.weekEndDay) {
        dates.push(current.format('DD/MM/YYYY'));
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
    calcEventTotalHours() {
      const events = this.getEventsInThisWeek;
      let totalHours = 0;
      let totalMinutes = 0;
      const blacklist = ['Jour Férié']

      events.forEach(event => {
        event.event.forEach(event => {
          if (!blacklist.some(word => event.title.includes(word))) {
            totalHours += moment(event.end).diff(moment(event.start), 'hours');
            totalMinutes += moment(event.end).diff(moment(event.start), 'minutes');
          }
        })
      })
      return `${totalHours}h${totalMinutes % 60 === 0 ? '' : totalMinutes % 60}`
    }
  },
  mounted() {
    document.addEventListener('keydown', this.handleKeyDown);
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.handleKeyDown);
  },
  methods: {
    goToday(){
      this.weekStartDay = moment().startOf('isoWeek');
      this.weekEndDay = moment().endOf('isoWeek');
    },
    handleKeyDown(e) {
      if (e.key === 'ArrowLeft') {
        this.previousWeek();
      } else if (e.key === 'ArrowRight') {
        this.nextWeek();
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
    }
  },

}
</script>

<style lang="scss" scoped>
.Calendar {
}
</style>
