<template>
  <div class="EventCard">
    <div class="EventCardTime">
      <TimeSpanText :hour="event.start"/>
      ➔
      <TimeSpanText :hour="event.end"/>
    </div>
    <div class="EventCardTotalTime">
      {{ calcTotalTime }}
    </div>
  </div>
</template>

<script lang="ts">
import {PropType} from "vue";
import moment from "moment";
import {IEvent} from "~/types/Event.interface";
import TimeSpanText from "~/components/Utils/TimeSpanText.vue";
import {DATE_FORMAT} from "~/global.config";

export default {
  name: "EventCard",
  components: {TimeSpanText},
  props: {
    event: {
      type: Object as PropType<IEvent>,
      required: true
    }
  },
  computed: {
    calcTotalTime() {
      // return total time in hours and minutes between start and end and if not minutes return "1h"
      const start = moment(this.event.start, DATE_FORMAT);
      const end = moment(this.event.end, DATE_FORMAT);
      const diff = moment.duration(end.diff(start));
      const hours = diff.hours();
      const minutes = diff.minutes();
      if (minutes === 0) {
        return `${hours}h`;
      }
      return `${hours}h${minutes}min`;
    }
  }
}
</script>

<style lang="scss" scoped>
.EventCard {

  background: #323448;
  border: 1px solid #4C4F6B;
  color: var(--primary-color);
  border-radius: 4px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 5px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &Time {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    font-size: 15px;
    color: white;
    gap: 10px;

    > * {
      color: white;
      fill: white;
    }
  }

  &TotalTime {
    font-size: 13px;
    color: white;

  }

}
</style>