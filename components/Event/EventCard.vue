<template>
  <div class="EventCard">
    <div class="EventCard__title">
      {{ event.title }}
    </div>
    <div class="EventCard__time">
      {{ formatDates }}
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import moment from "moment";

export default defineComponent({
  name: "EventCard",
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  computed: {
    formatDates() {
      const start = moment(this.event.start);
      const end = moment(this.event.end);
      const totalEventTime = end.diff(start, 'minutes');
      const formatTotalEventTime = moment.utc(totalEventTime * 60000).format('HH:mm');
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
  transition: all 0.2s ease-in-out;

  &__title {
    font-weight: bold;
  }

  &__time {
    font-size: 12px;
  }

}
</style>