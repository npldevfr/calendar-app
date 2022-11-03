<template>
  <div class="CalendarDayHeader" :class="[isToday, isNotADay]">
    <slot v-if="$slots.default"/>
    <span class="CalendarDayHeaderDayName" v-if="dayNumber">
      {{ formatDayName }}
    </span>
    <span class="CalendarDayHeaderDayNumber" v-if="dayNumber">
      {{ formatDay }} <span class="CalendarDayHeaderSmall">{{ formatMonthAndYear }}</span>
    </span>
  </div>
</template>

<script lang="ts">

import moment from "moment";

export default {
  name: 'CalendarDayHeader',
  props: {
    dayNumber: {
      type: String,
      required: false
    },
    isADay: {
      type: Boolean,
      required: false,
      default: true,
    }
  },
  computed: {
    formatDayName() {
      const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
      return days[moment(this.dayNumber, 'YYYY-MM-DD').day()];
    },
    isToday() {
      if (this.dayNumber === moment().format('YYYY-MM-DD')) return 'CalendarDayHeaderToday CalendarDayHeaderActive'
    },
    isNotADay() {
      if (!this.isADay) return 'CalendarDayHeaderNot'
    },
    formatDay() {
      return moment(this.dayNumber, 'YYYY-MM-DD').format('D')
    },
    formatMonthAndYear() {
      const abbreviateMonth = moment(this.dayNumber, 'YYYY-MM-DD').format('MMM')
      const frenchAbbreviateMonth = abbreviateMonth.replace('Jan', 'Janv').replace('Feb', 'Févr').replace('Mar', 'Mars').replace('Apr', 'Avr').replace('May', 'Mai').replace('Jun', 'Juin').replace('Jul', 'Juil').replace('Aug', 'Août').replace('Sep', 'Sept').replace('Oct', 'Oct').replace('Nov', 'Nov').replace('Dec', 'Déc')
      return frenchAbbreviateMonth + ' ' + moment(this.dayNumber, 'YYYY-MM-DD').format('YYYY')
    }
  }
}
</script>

<style lang="scss" scoped>
.CalendarHeaderHours .CalendarDayHeader {
  width: 100%;
}

.CalendarDayHeader {
  user-select: none;
  transition: all 0.2s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  gap: 10px;
  height: 100%;
  //width: 150px;
  grid-column: span 1 / span 1;

  &:hover {
      cursor: pointer;
  }

  &Active {
    border-bottom: 1px solid var(--primary);
  }

  &Today > span,
  &Today > span > span {
    color: var(--primary);
  }

  &Day {
    &Name {
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 10px;
      display: flex;
      align-items: center;
      color: #858699;
    }

    &Number {
      font-style: normal;
      font-weight: 500;
      font-size: 15px;
      gap: 3px;
      line-height: 10px;
      display: flex;
      align-items: center;
      color: #4C4F6B;
    }
  }

  &Small {
    font-style: normal;
    font-weight: normal;
    font-size: 10px;
    line-height: 10px;
    display: flex;
    align-items: center;
    color: #5c5d7c;
  }
}
</style>
