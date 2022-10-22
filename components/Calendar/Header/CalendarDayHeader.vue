<template>
  <div class="CalendarDayHeader" :class="isToday">
    <slot v-if="$slots.default" />
    <span class="CalendarDayHeaderDayName" v-if="dayName">
      {{ dayName }}
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
    dayName: {
      type: String,
      required: true
    },
    dayNumber: {
      type: String,
      required: true
    }
  },
  computed: {
    isToday() {
      if (this.dayNumber === moment().format('DD/MM/YYYY')) return 'CalendarDayHeaderToday CalendarDayHeaderActive'
    },
    formatDay() {
      return moment(this.dayNumber, 'DD/MM/YYYY').format('D')
    },
    formatMonthAndYear() {
      const abbreviateMonth = moment(this.dayNumber, 'DD/MM/YYYY').format('MMM')
      const frenchAbbreviateMonth = abbreviateMonth.replace('Jan', 'Janv').replace('Feb', 'Févr').replace('Mar', 'Mars').replace('Apr', 'Avr').replace('May', 'Mai').replace('Jun', 'Juin').replace('Jul', 'Juil').replace('Aug', 'Août').replace('Sep', 'Sept').replace('Oct', 'Oct').replace('Nov', 'Nov').replace('Dec', 'Déc')
      return frenchAbbreviateMonth + ' ' + moment(this.dayNumber, 'DD/MM/YYYY').format('YYYY')

    }
  }
}
</script>

<style lang="scss" scoped>
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
    background-color: rgba(133, 102, 244, 0.05);
    cursor: pointer;
  }

  &Active {
    border-bottom: 1px solid #8566f4;
  }

  &Today > span,
  &Today > span > span {
    color: #8566f4;
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
