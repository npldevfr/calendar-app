<template>
  <div class="CalendarEvent" :class="isOutdated" :style="{top: getTop, bottom: getBottom }">
    {{ event.title }}
    <br />
    ({{ formatHour(event.start) }} - {{ formatHour(event.end) }})
  </div>
</template>

<script lang="ts">

import moment from "moment";

export default {
  name: 'CalendarEvent',
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      cellHeight: 60,
    }
  },
  computed: {
    getTop() {
      const timestamp = moment(this.event.start).format('HH:mm');
      const startHour: any = timestamp.split(':')[0];
      const startMinutes: any = timestamp.split(':')[1];
      return `${(startHour - 8) * this.cellHeight + (startMinutes / 60) * this.cellHeight}px`;
    },
    getBottom() {
      const timestamp = moment(this.event.end).format('HH:mm');
      const endHour: any = timestamp.split(':')[0];
      const endMinutes: any = timestamp.split(':')[1];
      return `${((20 - endHour) * this.cellHeight - (endMinutes / 60) * this.cellHeight) + this.cellHeight}px`;
    },
    getBackground() {
      return '#3e2c80'
    },
    isOutdated() {
      const now = moment();
      const end = moment(this.event.end);
      return now.isAfter(end) ? 'CalendarEventOutdated' : '';
    }
  },
  methods: {
    formatHour(timestamp) {
      return moment(timestamp).format('HH:mm')
    },
  }
}
</script>

<style lang="scss" scoped>

//.CalendarColumn .CalendarEvent:first-child {
  //top: 5px !important;
//}
.CalendarEvent {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 10px;
  color: white;
  font-size: 12px;
  justify-content: center;
  position: absolute;
  right: 5px;
  z-index: 30;
  left: 5px;
  background: #3e2c80;
  border-radius: 3px;

  &Outdated {
    background: #292A35;
    border: 1px solid #313248;
    color: #D2D3E0;
  }
}

</style>
