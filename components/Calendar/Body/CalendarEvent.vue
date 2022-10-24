<template>
  <div class="CalendarEvent" :class="[isOutdated, isBlacklisted]" :style="{top: getTop, bottom: getBottom }">
    <div class="CalendarEventNow" v-if="isNow">EN COURS</div>
    <div class="CalendarEventContent">
      <div class="CalendarEventBody">
        {{ event.title }}
        <br/>
        ({{ formatHour(event.start) }} - {{ formatHour(event.end) }})
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import moment, {Moment} from "moment";

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
    /**
     * Get if event is currently running
     * @returns {boolean}
     */
    isNow(): boolean {
      return moment().isBetween(this.event.start, this.event.end);
    },
    /**
     * Get the top position of the event in px
     * @returns {string}
     */
    getTop(): string {
      const timestamp = moment(this.event.start).format('HH:mm');
      const startHour: any = timestamp.split(':')[0];
      const startMinutes: any = timestamp.split(':')[1];

      if (startHour === '08' && startMinutes === '00') return '5px';
      return `${(startHour - 8) * this.cellHeight + (startMinutes / 60) * this.cellHeight}px`;
    },
    /**
     * Get the bottom position of the event in px
     * @returns {string}
     */
    getBottom(): string {
      const timestamp = moment(this.event.end).format('HH:mm');
      const endHour: any = timestamp.split(':')[0];
      const endMinutes: any = timestamp.split(':')[1];

      if (endHour >= '21') return '5px';
      return `${((20 - endHour) * this.cellHeight - (endMinutes / 60) * this.cellHeight) + this.cellHeight}px`;
    },
    /**
     * Check if the event is outdated and return the class name if it is
     * @returns {string}
     */
    isOutdated(): string {
      const now = moment();
      const end = moment(this.event.end);
      return now.isAfter(end) ? 'CalendarEventOutdated' : '';
    },
    /**
     * Check if the event is blacklisted and return the class name if it is
     * @returns {string}
     */
    isBlacklisted(): string {
      const blacklist = ['Jour Férié', 'Fermeture IUT']
      return blacklist.some(word => this.event.title.includes(word)) ? 'CalendarEventBlacklisted' : '';
    },
  },
  methods: {
    /**
     * Format the hour to display it to XX:XX (15:30)
     * @param {Moment|string|Date} timestamp
     * @returns {string}
     */
    formatHour(timestamp: Date | Moment | string): string {
      return moment(timestamp).format('HH:mm')
    },
  }
}
</script>

<style lang="scss" scoped>
.CalendarEvent {
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  position: absolute;
  right: 5px;
  z-index: 30;
  left: 5px;
  background: #3e2c80;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  &:hover {
    background: #4e3c90;
  }

  &Now {
    position: absolute;
    top: 5px;
    right: 5px;
    background: red;
    color: white;
    font-size: 12px;
    font-weight: 500;
    padding: 2px 5px;
    border-radius: 3px;

  }

  &Content {
    position: relative;
  }

  &Body {
    text-align: center;
    padding: 0 10px;
    height: 100%;
    color: white;
    font-size: 12px;
  }

  &Blacklisted,
  &Outdated {
    background: #292A35;
    border: 1px solid #313248;
    color: #D2D3E0;

    &:hover {
      background: #2f2f3d;
    }

  }
}
</style>
