<template>
  <div class="Calendar">
    <div style="display: flex; gap: 5px;">
      <Button @click="previousWeek" label="Semaine précédente"/>
      <Button @click="nextWeek" label="Semaine suivante"/>
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
    }
  },
  mounted() {
    document.addEventListener('keydown', this.handleKeyDown);
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.handleKeyDown);
  },
  methods: {
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
