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
      if (this.dayNumber === moment().format('DD/MM/YYYY')) return 'CalendarDayHeaderToday CalendarDayHeaderActive'
    },
    formatDay() {
      return moment(this.dayNumber, 'DD/MM/YYYY').format('D')
    }
  }
}
</script>

<style lang="scss" scoped>
.CalendarDayHeader {
  transition: all 0.2s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  gap: 10px;
  height: 100%;
  width: 180px;

  &Active {
    border-bottom: 1px solid #8566f4;
  }

  &Today > span{
    color: #8566f4;
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
