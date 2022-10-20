<template>
  <div class="CalendarDayHeader" :class="isToday">
    <span class="CalendarDayHeaderDayName">
      {{ dayName }}
    </span>
    <span class="CalendarDayHeaderDayNumber">
      {{ formatDay }}
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
      if (this.dayNumber === moment().format('DD/MM/YYYY')) return 'CalendarDayHeaderToday'
    },
    formatDay() {
      return moment(this.dayNumber, 'DD/MM/YYYY').format('D')
    }
  }
}
</script>

<style lang="scss" scoped>
.CalendarDayHeader {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px 10px;
  gap: 10px;
  width: 180px;


  &Today > span{
    color: #8566f4;
    font-weight: 800;
  }

  &Day {
    &Name {
      font-style: normal;
      font-weight: 500;
      font-size: 13px;
      line-height: 10px;
      display: flex;
      align-items: center;
      color: #858699;
    }

    &Number {
      font-style: normal;
      font-weight: 500;
      font-size: 13px;
      line-height: 10px;
      display: flex;
      align-items: center;
      color: #4C4F6B;
    }
  }
}
</style>
