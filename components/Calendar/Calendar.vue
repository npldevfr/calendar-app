<template>
  <MainHeader v-if="weekStartDay && weekEndDay">
    <template #left>
      <Button @click="previousWeek" label="Semaine précédente"/>
      <Button @click="nextWeek" label="Semaine suivante"/>
      <Button @click="goToday" type="Secondary" label="Revenir à aujourd'hui" v-if="!isTodayIsInThisWeek"/>
    </template>

    <template #right>
      <!--      <SmallButton label="LP Miar Groupe 1" dropdown/>-->
      <DropdownContainer @close="dropdownState = false">
        <SmallButton label="{{ GROUP || PERSON }}" @click="dropdownState = !dropdownState" dropdown>
          <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M10.5625 5.78125C10.5625 6.94668 10.1842 8.02324 9.54687 8.89668L12.7613 12.1137C13.0787 12.4311 13.0787 12.9465 12.7613 13.2639C12.4439 13.5813 11.9285 13.5813 11.6111 13.2639L8.39668 10.0469C7.52324 10.6867 6.44668 11.0625 5.28125 11.0625C2.36387 11.0625 0 8.69863 0 5.78125C0 2.86387 2.36387 0.5 5.28125 0.5C8.19863 0.5 10.5625 2.86387 10.5625 5.78125ZM5.28125 9.4375C7.2998 9.4375 8.9375 7.7998 8.9375 5.78125C8.9375 3.7627 7.2998 2.125 5.28125 2.125C3.2627 2.125 1.625 3.7627 1.625 5.78125C1.625 7.7998 3.2627 9.4375 5.28125 9.4375Z"
                fill="#858699"/>
          </svg>

        </SmallButton>
        <Dropdown :state="dropdownState">

          <DropdownContent>
            <Input ref="input" v-model:model-value="searchEngine" placeholder="Chercher par personne, groupe"/>
            <template v-for="(list, idx) in getSearchResults" :key="idx">
              <DropdownHeader :title="list.category" v-if="list.data.length > 0"/>
              <DropdownItem v-for="(item, idx) in list.data" :match-value="searchEngine" :key="idx" :label="item.name"/>
            </template>
          </DropdownContent>


          <DropdownSeparator/>
          <DropdownContent>
            <KbdList>
              <KbdGroup>
                <Kbd label="⇧"/>
                <Kbd label="⇩"/>
                Selection
              </KbdGroup>

              <KbdGroup>
                <Kbd label="ESC"/>
                Quitter
              </KbdGroup>
            </KbdList>
          </DropdownContent>
        </Dropdown>
      </DropdownContainer>
      <!--      <SmallButton label="Test" type="Transparent" dropdown/>-->
    </template>
  </MainHeader>
  <div class="Calendar" v-if="weekStartDay && weekEndDay">
    <CalendarHeader>
      <CalendarDayHeader>
        {{ calcEventTotalHours }}
      </CalendarDayHeader>
      <CalendarDayHeader v-for="dateInWeek in datesInWeek"
                         :key="dateInWeek"
                         :day-name="getDayName(dateInWeek)"
                         :day-number="dateInWeek"
      />
    </CalendarHeader>

    <CalendarBody>
      <CalendarColumn>
        <CalendarCell v-for="hour in hours" :key="hour">
          {{ hour }}h
        </CalendarCell>
      </CalendarColumn>
      <!--      <CalendarColumn v-for="(dateInWeek, idx) in datesInWeek" :key="idx">-->
      <!--        <CalendarCell v-for="hour in hours" :key="hour">-->
      <!--        </CalendarCell>-->
      <!--      </CalendarColumn>-->
      <CalendarColumn v-for="(day, idx) in filterEventsByDay" :key="idx">
        <CalendarEvent v-for="(event, idx) in day" :key="event.id" :event="event"/>
        <CalendarCell v-for="hour in hours" :key="hour">
          <!--          <CalendarEvent v-for="event in filterEventsByDay[day][hour]" :key="event.id" :event="event"/>-->
        </CalendarCell>
      </CalendarColumn>
    </CalendarBody>

    <!--    <div v-for="(events, idx) in getEventsInThisWeek" :key="idx">-->
    <!--      <div v-for="event in events.event" @click="currentEventShowing = event; sidebarEventState = true;">-->
    <!--        <div :class="isActiveCell(event)">-->
    <!--          {{ event.title }}-->
    <!--          {{ event.start }}-->
    <!--          {{ event.end }}-->

    <!--        </div>-->
    <!--      </div>-->


    <!--    </div>-->

    <!--    <Transition appear>-->
    <Sidebar :clicked-event="currentEventShowing" :events="getIncomingEvents"
             v-if="sidebarEventState"
             @close="tryCloseSidebar"/>
    <!--    </Transition>-->


  </div>
</template>

<script lang="ts">

import moment from "moment";
import Button from "~/components/Buttons/Button.vue";
import useEDT from "~/composables/useEDT";
import Sidebar from "~/components/Calendar/Sidebar/Sidebar.vue";
import useIsNow from "~/composables/useIsNow";
import SmallButton from "~/components/Buttons/SmallButton.vue";
import MainHeader from "~/components/Header/MainHeader.vue";
import {ref} from "@vue/runtime-core";
import {useFocus} from "@vueuse/core";
import CalendarBody from "~/components/Calendar/Body/CalendarBody.vue";
import CalendarColumn from "~/components/Calendar/Body/CalendarColumn.vue";
import CalendarCell from "~/components/Calendar/Body/CalendarCell.vue";

export default {
  name: 'Calendar',
  components: {CalendarCell, CalendarColumn, CalendarBody, MainHeader, SmallButton, Sidebar, Button},
  data() {
    return {
      weekStartDay: moment().startOf('isoWeek'),
      weekEndDay: moment().endOf('isoWeek'),

      dropdownState: false,

      hours: ['8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],

      searchEngine: '',
      sidebarEventState: false,
      currentEventShowing: {},

      dropdownData: [
        {
          "category": "Personnes",
          "data": [
            {
              "id": 1,
              "name": "Jean Dupont"
            },
            {
              "id": 2,
              "name": "Marie Durand"
            },
            {
              "id": 3,
              "name": "Pierre Martin"
            },
          ]
        },
        {
          "category": "Groupes",
          "data": [
            {
              "id": 4,
              "name": "LP MiAR Groupe 1"
            },
            {
              "id": 5,
              "name": "LP MiAR Groupe 2"
            },
            {
              "id": 6,
              "name": "Groupe Duran"
            }
          ]
        }
      ]


    }
  },
  computed: {
    filterEventsByDay() {
      const eventsThisWeek = this.getEventsInThisWeek[0].event
      const datesInWeek = this.datesInWeek
      const eventsByDay = []

      // for (let i = 0; i < datesInWeek.length; i++) {
      //   const events = []
      //   for (let j = 0; j < eventsThisWeek.length; j++) {
      //     if (moment(eventsThisWeek[j].start).format('DD/MM/YYYY') === datesInWeek[i]) {
      //       events.push(eventsThisWeek[j])
      //     }
      //   }
      //   eventsByDay.push(events)
      // }

      // if events in same day have same name, they will be merged
      for (let i = 0; i < datesInWeek.length; i++) {
        const events = []
        for (let j = 0; j < eventsThisWeek.length; j++) {
          if (moment(eventsThisWeek[j].start).format('DD/MM/YYYY') === datesInWeek[i]) {
            if (events.length === 0) {
              events.push(eventsThisWeek[j])
            } else {
              if (events[events.length - 1].title === eventsThisWeek[j].title) {
                events[events.length - 1].end = eventsThisWeek[j].end
              } else {
                events.push(eventsThisWeek[j])
              }
            }
          }
        }
        eventsByDay.push(events)
      }

      return eventsByDay
    },
    getSearchResults() {
      return this.dropdownData.map((category) => {
        return {
          category: category.category,
          data: category.data.filter((item) => {
            return item.name.toLowerCase().includes(this.searchEngine.toLowerCase())
          })
        }
      })
    },
    getIncomingEvents() {
      const events = useEDT();
      const eventNameToFind = this.currentEventShowing;
      //get event where id = currentEventShowingTitle
      const incomingEvents = [];
      events.forEach((event) => {
        event.event.forEach((event) => {
          if (event.title === eventNameToFind.title && moment(event.start).isAfter(moment())) {
            incomingEvents.push(event);
          }
        })
      });

      return incomingEvents;

    },
    isTodayIsInThisWeek() {
      return this.weekStartDay.isBefore(moment()) && this.weekEndDay.isAfter(moment())
    },
    /**
     * @return [...moment]
     * Retourne un tableau de moment contenant les dates de la semaine en cours (du lundi au samedi)
     */
    datesInWeek(): moment.Moment[] {
      const dates = [];
      let current = this.weekStartDay;
      while (current <= this.weekEndDay) {
        if (current.day() !== 0) {
          dates.push(current.format('DD/MM/YYYY'));
        }
        current = current.clone().add(1, 'd');
      }
      return dates;
    },
    getEventsInThisWeek(): any {
      const events = useEDT();
      return events.filter(event => {
        return moment(event.firstDayOfWeek).isBetween(this.weekStartDay, this.weekEndDay, null, '[]')
      })
    },
    /**
     * Calcule le nombre d'heures de cours de la semaine
     * [!] Possède un bug, si un cours dure plus d'une journée, il ne sera pas compté
     * [!] Ajouter des mots dans blacklist pour ne pas compter les heures
     */
    calcEventTotalHours() {
      const events = this.getEventsInThisWeek;
      let totalHours = 0;
      let totalMinutes = 0;
      const blacklist = ['Jour Férié', 'Fermeture IUT']

      events.forEach(event => {
        event.event.forEach(event => {
          if (!blacklist.some(word => event.title.includes(word))) {
            totalHours += moment(event.end).diff(moment(event.start), 'hours');
            totalMinutes += moment(event.end).diff(moment(event.start), 'minutes');
          }
        })
      })
      return `${totalHours}h${totalMinutes % 60 === 0 ? '' : totalMinutes % 60}`
    },
  }
  ,
  mounted() {
    // this.initCalendar();
    document.addEventListener('keydown', this.handleKeyDown);
  }
  ,
  beforeDestroy() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }
  ,
  methods: {
    initCalendar() {
      // if today is sunday, set weekStartDay to monday of this week and weekEndDay to saturday of this week in isoWeek$
      if (moment().day() === 0) {
        this.weekStartDay = moment().isoWeekday(1);
        this.weekEndDay = moment().isoWeekday(6);
      } else {
        this.weekStartDay = moment().isoWeekday(1).subtract(1, 'week');
        this.weekEndDay = moment().isoWeekday(6).subtract(1, 'week');
      }


      // this.weekStartDay = moment().startOf('isoWeek');
      // this.weekEndDay = moment().endOf('isoWeek');
    },
    isActiveCell(cell) {
      const ces = this.currentEventShowing;
      if (ces.start === cell.start && ces.end === cell.end) {
        return 'CalendarCellActive'
      }
    }
    ,
    tryCloseSidebar() {
      this.sidebarEventState = false;
    }
    ,
    goToday() {
      this.weekStartDay = moment().startOf('isoWeek');
      this.weekEndDay = moment().endOf('isoWeek');
    }
    ,
    handleKeyDown(event: KeyboardEvent) {
      // this.defaultSelectedEvent();
      // const events = this.getEventsInThisWeek[0].event;
      // const currentEventShowingIndex = events.findIndex(event => event.title === this.currentEventShowing.title);

      // if ctrl + key is pressed
      if (event.ctrlKey) {
        event.preventDefault();
        switch (event.key) {
          case KEY.LETTER_K:
            this.dropdownState = !this.dropdownState;
            break;
        }
      }
      switch (event.key) {
        case KEY.ARROW_LEFT:
          this.previousWeek();
          break;
        case KEY.ARROW_RIGHT:
          this.nextWeek();
          break;
        case KEY.BACKSPACE:
          this.goToday();
          break;
        case KEY.ARROW_UP:
          break;
        case KEY.ARROW_DOWN:
          break;
        case KEY.ENTER:
          this.sidebarEventState = true;
          break;
      }
    },
    defaultSelectedEvent() {
      if (this.getEventsInThisWeek.length > 0) {
        return this.currentEventShowing = this.getEventsInThisWeek[0].event[0]
      }
    },
    previousWeek() {
      this.weekStartDay = moment(this.weekStartDay).subtract(1, 'week');
      this.weekEndDay = moment(this.weekEndDay).subtract(1, 'week');
      this.weekNumber--;
    },
    nextWeek() {
      this.weekStartDay = moment(this.weekStartDay).add(1, 'week');
      this.weekEndDay = moment(this.weekEndDay).add(1, 'week');
      this.weekNumber++;
    },
    getDayName(day) {
      const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
      return days[moment(day, 'DD/MM/YYYY').day()];
    },
    useIsNow
  }
  ,

}
</script>

<style lang="scss" scoped>
.Calendar {

  &CellActive {
    color: red;
  }
}
</style>
