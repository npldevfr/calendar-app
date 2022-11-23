<template>
  <Head>
    <Title>EDT ({{ currentPersona }})</Title>
  </Head>
  <ClientOnly>
    <MobileHeader>
      <template #left>
        <SmallButton type="Transparent" :label="currentPersona"/>
      </template>
      <template #right>
        <SmallButton label="Paramètres">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M0.0820232 7.9626L1.30773 10.0386C1.3891 10.1763 1.523 10.2767 1.67999 10.3178C1.83698 10.3589 2.0042 10.3372 2.14488 10.2576L3.00042 9.774C3.35587 10.0482 3.74871 10.2732 4.16177 10.4412V11.4C4.16177 11.5591 4.22634 11.7117 4.34127 11.8243C4.45621 11.9368 4.61209 12 4.77463 12H7.22603C7.38857 12 7.54445 11.9368 7.65938 11.8243C7.77431 11.7117 7.83888 11.5591 7.83888 11.4V10.4412C8.25518 10.2715 8.64589 10.047 9.00023 9.774L9.85577 10.2576C10.1481 10.4226 10.5244 10.3236 10.6929 10.0386L11.9186 7.9626C11.9993 7.82472 12.021 7.66122 11.9791 7.50771C11.9372 7.3542 11.8351 7.22312 11.6949 7.143L10.8541 6.6672C10.9198 6.2247 10.9194 5.77519 10.8529 5.3328L11.6937 4.857C11.9854 4.692 12.0866 4.323 11.9174 4.0374L10.6917 1.9614C10.6103 1.8237 10.4764 1.72327 10.3194 1.6822C10.1625 1.64114 9.99524 1.66279 9.85455 1.7424L8.99901 2.226C8.64512 1.95263 8.25455 1.72813 7.83827 1.5588V0.6C7.83827 0.44087 7.7737 0.288258 7.65877 0.175736C7.54384 0.0632141 7.38796 0 7.22542 0H4.77401C4.61147 0 4.45559 0.0632141 4.34066 0.175736C4.22573 0.288258 4.16116 0.44087 4.16116 0.6V1.5588C3.74487 1.72849 3.35415 1.95295 2.99981 2.226L2.14488 1.7424C2.07524 1.7029 1.99833 1.67723 1.91855 1.66686C1.83877 1.65649 1.75768 1.66162 1.67992 1.68196C1.60217 1.7023 1.52927 1.73745 1.46541 1.7854C1.40154 1.83335 1.34796 1.89316 1.30773 1.9614L0.0820232 4.0374C0.00136453 4.17528 -0.0203846 4.33878 0.0215119 4.49229C0.0634085 4.6458 0.165557 4.77688 0.305714 4.857L1.14655 5.3328C1.08044 5.77525 1.08044 6.22475 1.14655 6.6672L0.305714 7.143C0.0139967 7.308 -0.0871238 7.677 0.0820232 7.9626ZM5.99971 3.6C7.35166 3.6 8.45112 4.6764 8.45112 6C8.45112 7.3236 7.35166 8.4 5.99971 8.4C4.64776 8.4 3.54831 7.3236 3.54831 6C3.54831 4.6764 4.64776 3.6 5.99971 3.6Z"
                fill="#858699"/>
          </svg>
        </SmallButton>
        <!--        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">-->
        <!--          <path fill-rule="evenodd" clip-rule="evenodd"-->
        <!--                d="M10.0258 0C4.51676 0 0.0517578 4.465 0.0517578 9.974C0.0517578 14.38 2.90876 18.119 6.87276 19.439C7.37176 19.529 7.55176 19.222 7.55176 18.958C7.55176 18.721 7.54376 18.093 7.54076 17.262C4.76576 17.864 4.17976 15.924 4.17976 15.924C3.72776 14.772 3.07276 14.465 3.07276 14.465C2.16776 13.846 3.14176 13.86 3.14176 13.86C4.14376 13.93 4.66876 14.888 4.66876 14.888C5.55876 16.412 7.00476 15.972 7.57076 15.717C7.66176 15.072 7.92176 14.632 8.20576 14.383C5.99176 14.132 3.66376 13.276 3.66376 9.453C3.66376 8.366 4.05276 7.474 4.68776 6.778C4.58676 6.525 4.24176 5.51 4.78676 4.138C4.78676 4.138 5.62376 3.869 7.52876 5.159C8.34235 4.93767 9.1816 4.8247 10.0248 4.823C10.8679 4.82437 11.7072 4.93735 12.5208 5.159C14.4268 3.868 15.2628 4.138 15.2628 4.138C15.8078 5.51 15.4658 6.525 15.3618 6.778C16.0018 7.474 16.3858 8.365 16.3858 9.453C16.3858 13.286 14.0558 14.128 11.8338 14.375C12.1888 14.683 12.5088 15.291 12.5088 16.221C12.5088 17.555 12.4968 18.631 12.4968 18.958C12.4968 19.225 12.6748 19.535 13.1838 19.437C17.1458 18.115 19.9998 14.379 19.9998 9.974C19.9998 4.465 15.5348 0 10.0258 0Z"-->
        <!--                fill="white"/>-->
        <!--        </svg>-->
      </template>
    </MobileHeader>
    <MainHeader>
      <template #left>
        <Button @click="PREVIOUS_WEEK(); this.showDayIndex = 0" label="Semaine précédente"/>
        <Button @click="GO_BACK_TO_TODAY(); this.initDayIndex()" v-if="!isTodayIsInInterval" type="Secondary"
                label="Semaine actuelle"/>
        <Button @click="NEXT_WEEK(); this.showDayIndex = 0" label="Semaine suivante"/>
      </template>

      <template #right>
        <DropdownContainer @close="dropdownState = false">
          <SmallButton :label="currentPersona" @click="dropdownState = !dropdownState" dropdown>
            <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M10.5625 5.78125C10.5625 6.94668 10.1842 8.02324 9.54687 8.89668L12.7613 12.1137C13.0787 12.4311 13.0787 12.9465 12.7613 13.2639C12.4439 13.5813 11.9285 13.5813 11.6111 13.2639L8.39668 10.0469C7.52324 10.6867 6.44668 11.0625 5.28125 11.0625C2.36387 11.0625 0 8.69863 0 5.78125C0 2.86387 2.36387 0.5 5.28125 0.5C8.19863 0.5 10.5625 2.86387 10.5625 5.78125ZM5.28125 9.4375C7.2998 9.4375 8.9375 7.7998 8.9375 5.78125C8.9375 3.7627 7.2998 2.125 5.28125 2.125C3.2627 2.125 1.625 3.7627 1.625 5.78125C1.625 7.7998 3.2627 9.4375 5.28125 9.4375Z"
                  fill="#858699"/>
            </svg>

          </SmallButton>
          <Dropdown :state="dropdownState">

            <DropdownContent>
              <Input ref="input" v-model:model-value="searchEngine" placeholder="Chercher par personne, groupe"/>
              <DropdownHeader title="Favoris"/>
              <template v-for="(list, idx) in getSearchResults" :key="idx">
                <DropdownHeader :title="list.category" v-if="list.data.length > 0"/>
                <DropdownItem v-for="(item, idx) in list.data.slice(0, 5)" :match-value="searchEngine" :key="idx"
                              :persona="item"
                              @click="setCurrentPersona(item)"
                              :label="item.name"/>
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
      </template>
    </MainHeader>
    <div class="Calendar" v-touch:swipe.left="SHOW_NEXT_DAY" v-touch:swipe.right="SHOW_PREVIOUS_DAY">
      <CalendarHeader>
        <CalendarDayHeader :is-a-day="false">
          {{ getTotalHoursForWeek }}
        </CalendarDayHeader>
        <template #hours>
          <CalendarDayHeader v-for="date in limitShowDaysCpt"
                             :key="date"
                             :day-number="date"
          />
        </template>
      </CalendarHeader>

      <CalendarBody>
        <CalendarColumn>
          <CalendarCell v-for="hour in getCalendarHours" :key="hour">
            {{ hour }}h
          </CalendarCell>
        </CalendarColumn>

        <template #events>
          <CalendarColumn v-for="(day, idx) in limitShowDaysEvents" :key="idx">
            <TransitionGroup :name="computedTransition" mode="out-in">
              <CalendarEvent v-for="event in day.events" :key="event.id" :event="event"
                             @click="sidebarEventState = true; SET_SELECTED_EVENT(event)"/>
            </TransitionGroup>
            <CalendarCell v-for="hour in getCalendarHours" :key="hour"/>
          </CalendarColumn>
        </template>
      </CalendarBody>

      <!--    <div class="CalendarBottomActions">-->
      <!--      <Button @click="SHOW_PREVIOUS_DAY" v-if="mobileView" type="Secondary" label="Jour précédent"/>-->
      <!--      <Button @click="SHOW_NEXT_DAY" v-if="mobileView" type="Secondary" label="Jour suivant"/>-->
      <!--    </div>-->
      <TransitionGroup>
        <SidebarBackdrop @click="tryCloseSidebar" v-if="sidebarEventState"/>
        <Sidebar @dayIndex="showDayIndex = $event - 1" @close="tryCloseSidebar" v-if="sidebarEventState"/>
      </TransitionGroup>
    </div>
  </ClientOnly>
</template>

<script lang="ts">

import KEY from "~/composables/useCalendarKeyboard";
import {mapActions, mapState} from "pinia";
import {useCalendarStore} from "~/store/calendarStore";
import Sidebar from "~/components/Calendar/Sidebar/Sidebar.vue";
import SmallButton from "~/components/Buttons/SmallButton.vue";
import MainHeader from "~/components/Header/MainHeader.vue";
import Button from "~/components/Buttons/Button.vue";
import SidebarBackdrop from "~/components/Calendar/Sidebar/SidebarBackdrop.vue";
import {usePersonaStore} from "~/store/personaStore";
import {IGroupe} from "~/types/Group.interface";
import useCurrentPersona from "~/composables/Personas/useCurrentPersona";
import {IPersona} from "~/types/Persona.interface";
import useFavoritesPersonas from "~/composables/Personas/useFavoritesPersonas";

export default {
  name: 'Calendar',
  components: {SidebarBackdrop, Button, MainHeader, SmallButton, Sidebar},
  data() {
    return {
      dropdownState: false,

      mobileView: false,
      limitShowDays: 1,
      showDayIndex: 0,

      searchEngine: '',
      sidebarEventState: false,
      currentEventShowing: {},

      currentPersona: useCurrentPersona('get').name || 'Aucune',
    }
  },
  computed: {
    ...mapState(useCalendarStore, [
      'getDatesInWeek', 'getEventsForWeek', 'getWeekInterval',
      'getFollowingEvents', 'getTotalHoursForWeek', 'getCalendarHours',
      'getFormatEventByWeek',
    ]),
    ...mapState(usePersonaStore, ['getPersonas']),
    isTodayIsInInterval(): any {
      return this.getDatesInWeek.includes(new Date().toISOString().split('T')[0]);
    },
    limitShowDaysCpt(): any[] {
      if (!this.mobileView) {
        return this.getDatesInWeek.slice(0, 5);
      }
      return this.getDatesInWeek.slice(this.showDayIndex, this.showDayIndex + 1);
    },
    limitShowDaysEvents(): any {
      if (!this.mobileView) {
        return this.getFormatEventByWeek.slice(0, 5);
      }
      return this.getFormatEventByWeek.slice(this.showDayIndex, this.showDayIndex + 1);
    },
    getFavoritesResults() {
      const favoritePersonas = useFavoritesPersonas('get');
      const currentPersona = useCurrentPersona('get');
      return favoritePersonas.map((persona: IPersona) => {
        return {
          group_id: persona.group_id,
          name: persona.name,
          id: persona.id,
        }
      })
    },
    getSearchResults() {
      const currentPersona = useCurrentPersona('get');
      let personas = this.getPersonas;
      // if (currentPersona) {
      //   personas = personas.map((group: IGroupe) => {
      //     group.data = group.data.filter((persona: IPersona) => persona.id !== currentPersona.id);
      //     return group;
      //   });
      // }


      return personas.map((category: IGroupe) => {
        return {
          category: category.category,
          data: category.data.filter((item) => {
            return item.name.toLowerCase().includes(this.searchEngine.toLowerCase())
          })
        }
      })
    },
    computedTransition() {
      return this.mobileView ? 'slide-fade' : 'fade';
    },
  },
  mounted() {
    this.$nextTick(() => {
      document.addEventListener('keydown', this.handleKeyDown);
      if (typeof window !== 'undefined') window.addEventListener('resize', this.handleResize);
      this.handleResize();
      this.initDayIndex();
      this.GO_BACK_TO_TODAY();
    });
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.handleKeyDown);
    if (typeof window !== 'undefined') window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    setCurrentPersona(persona: IPersona) {
      this.currentPersona = persona.name;
      useCurrentPersona('set', persona);
      this.FETCH_CALENDAR();
    },
    SHOW_NEXT_DAY() {
      if (this.showDayIndex < 4) {
        this.showDayIndex++;
      } else {
        this.showDayIndex = 0;
        this.NEXT_WEEK();
      }
    },
    SHOW_PREVIOUS_DAY() {
      if (this.showDayIndex > 0) {
        this.showDayIndex--;
      } else {
        this.showDayIndex = 4;
        this.PREVIOUS_WEEK();
      }
    },
    ...mapActions(useCalendarStore, [
      'FETCH_CALENDAR', 'NEXT_WEEK', 'PREVIOUS_WEEK',
      'GO_BACK_TO_TODAY', 'SET_SELECTED_EVENT'
    ]),
    tryCloseSidebar() {
      this.sidebarEventState = false;
    },
    initDayIndex() {
      if (this.isTodayIsInInterval) {
        this.showDayIndex = this.getDatesInWeek.indexOf(new Date().toISOString().split('T')[0]);
      }
    },
    /**
     * Handle keyboard events (arrow keys) to navigate in @
     * **/
    handleKeyDown(event: KeyboardEvent): void {
      if (event.ctrlKey) {
        switch (event.key) {
          case KEY.LETTER_K:
            event.preventDefault();
            this.dropdownState = !this.dropdownState;
            break;
        }
      }
      switch (event.key) {
        case KEY.ARROW_LEFT:
          if (this.mobileView) {
            this.SHOW_PREVIOUS_DAY();
          } else {
            this.PREVIOUS_WEEK();
          }
          break;
        case KEY.ARROW_RIGHT:
          if (this.mobileView) {
            this.SHOW_NEXT_DAY();
          } else {
            this.NEXT_WEEK();
          }
          break;
        case KEY.BACKSPACE:
          this.GO_BACK_TO_TODAY();
          this.initDayIndex();
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
    handleResize() {
      this.mobileView = window.innerWidth < 800;
    },
  },
}
</script>

<style lang="scss" scoped>
.Calendar {
  width: 1200px;
  margin: auto;

  &BottomActions {
    position: fixed;
    bottom: 10px;
    z-index: 500;
    left: 10px;
    right: 10px;
    display: flex;
    gap: 5px;
    align-items: center;
  }

  &CellActive {
    color: red;
  }
}

@media (max-width: 1250px) {
  .Calendar {
    width: 100%;

  }

}

</style>
