<template>
  <div class="EventCard">
    <div class="EventCard__time">
      {{ formatDates }}
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import moment from "moment";
import {IEvent} from "~/types/Event.interface";

export default defineComponent({
  name: "EventCard",
  props: {
    event: {
      type: Object as PropType<IEvent>,
      required: true
    }
  },
  computed: {
    formatDates() {
      const start = moment(this.event.start);
      const end = moment(this.event.end);
      const totalEventTime = end.diff(start, 'minutes');
      const hours = Math.floor(totalEventTime / 60);
      const minutes = totalEventTime % 60;
      const formattedHours = hours > 0 ? `${hours}h` : '';
      const formattedMinutes = minutes > 0 ? `${minutes}m` : '';
      const formatTotalEventTime = `${formattedHours}${formattedMinutes}`;
      return `${start.format('HH:mm')} - ${end.format('HH:mm')} (${formatTotalEventTime}) ${start.format('DD/MM/YYYY')}`
    }
  }
})
</script>

<style lang="scss" scoped>
.EventCard {
  background: #575BC7;
  border: 1px solid #575BC7;
  border-radius: 4px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  margin-bottom: 10px;
  transition: all 0.2s ease-in-out;

  &__time {
    font-size: 12px;
  }

}
</style>