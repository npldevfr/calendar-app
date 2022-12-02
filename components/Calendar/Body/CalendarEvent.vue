<template>
  <div class="CalendarEvent" :class="[isBlacklisted, isSpecial, isOutdated, isSelected]"
       :style="{top: getTop, bottom: getBottom, background: getColor, borderColor: getColor}">
    <div class="CalendarEventNow" v-if="isNow && !isMobile">EN COURS</div>
    <div class="CalendarEventContent">
      <div class="CalendarEventBody" v-if="!isMobile">
        {{ formatEventTitle(event.title) }}
        <br/>
        ({{ formatHour(event.start) }} - {{ formatHour(event.end) }})
      </div>
      <div class="CalendarEventBody" v-else style="font-size: 10px">
        {{ formatEventTitle(event.title, true) }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import moment, {Moment} from "moment";
import {PropType} from "vue";
import {IEvent} from "~/types/Event.interface";
import {EVENT_BLACKLIST_WORDS, EVENT_SPECIAL_WORDS} from "~/global.config";
import {mapState} from "pinia";
import {useCalendarStore} from "~/store/calendarStore";
import {useThemeStore} from "~/store/themeStore";
import {useIsMobile} from "~/composables/useIsMobile";

export default {
  name: 'CalendarEvent',
  props: {
    event: {
      type: Object as PropType<IEvent>,
      required: true
    }
  },
  data() {
    return {
      cellHeight: 60,
    }
  },
  computed: {
    ...mapState(useCalendarStore, ['getSelectedEvent']),
    getTimeRemaining() {

      // get remaining time in minutes from now to event end
      const now = moment();
      const end = moment(this.event.end);
      const duration = moment.duration(end.diff(now));
      const minutes = duration.asMinutes();

      return minutes;
    },
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
      return EVENT_BLACKLIST_WORDS.some(word => this.event.title.toLowerCase().includes(word)) ? 'CalendarEventBlacklisted' : '';
    },
    isSpecial(): string {
      return EVENT_SPECIAL_WORDS.some(word => this.event.title.toLowerCase().includes(word)) ? 'CalendarEventSpecial' : '';
    },
    isSelected() {
      return this.getSelectedEvent?.id === this.event.id ? 'CalendarEventSelected' : '';
    }
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
    formatEventTitle(title: string, isMobile: boolean = false): string {
      if (isMobile) {
        return title.length > 30 ? title.substring(0, 20) + '...' : title;
      }

      const STR_LENGTH = 70;
      if (title.length > STR_LENGTH) {
        return title.substring(0, STR_LENGTH) + '...';
      }
      return title;
    }
  },
  setup(){
    const theme = useThemeStore();

    const getColor = computed(() => {
      return theme.getEventColor;
    });

    const isMobile = useIsMobile();

    return {
      isMobile,
      getColor
    }

  }
}
</script>

<style lang="scss" scoped>
.CalendarEvent {
  user-select: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  position: absolute;
  right: 5px;
  z-index: 30;
  left: 5px;
  border-radius: 3px;
  display: flex;
  color: var(--primary-color);
  justify-content: center;
  flex-direction: column;
  align-items: center;


  &Now {
    position: absolute;
    top: 5px;
    right: 5px;
    z-index: 500;
    background: red;
    color: white;
    font-size: 12px;
    font-weight: 500;
    padding: 2px 5px;
    border-radius: 3px;

  }

  &Content {
    position: relative;
    width: 100%;
    word-break: break-all;
  }

  &Body {
    text-align: center;
    padding: 0 10px;
    height: 100%;
    font-size: 12px;
  }


  &Selected {
    //border: 10px solid white;
  }

  &Special {
    background: #11382f !important;
    border: 1px solid #144439 !important;
    color: #D2D3E0 !important;

    &:hover {
      background: #144439 !important;
    }
  }


  &Blacklisted,
  &Outdated {
    background: var(--secondary) !important;
    border: 1px solid var(--secondary-border) !important;
    color: var(--secondary-text);

    &:hover {
      background: var(--secondary-hover) !important;
    }

  }
}
</style>
