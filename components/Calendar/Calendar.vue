<template>
  <Head>
    <Title>EDT ({{ currentPersona }})</Title>
  </Head>
  <ClientOnly>

    <!-- Partage -->
    <Modal title="Partager" :show="modalShareState" @close="modalShareState = false">
      <template v-slot:header>
        <ModalTitle label="Partager"/>
      </template>
      <template v-slot:body>
        <ModalContainer>
          <img :src="qrcode" alt="qrcode" style="border-radius: 10px;"/>
        </ModalContainer>
      </template>
      <template v-slot:footer>
        <Button type="Secondary" label="Fermer" @click="modalShareState = false"/>
      </template>
    </Modal>

    <!-- Paramètres -->
    <Modal title="Paramètres" :show="modalSettingsState" @close="modalSettingsState = false">
      <template v-slot:header>
        <ModalTitle label="Paramètres de l'application"/>
      </template>
      <template v-slot:body>
        paramètres
      </template>
      <template v-slot:footer>
        <Button type="Secondary" label="Fermer" @click="modalSettingsState = false"/>
      </template>
    </Modal>

    <!-- Personnes -->
    <Modal :show="modalPersonaState"
           keyboard-key="k"
           title="title"
           @close="modalPersonaState = false">
      <template v-slot:header>
        <Input ref="input" v-model:model-value="searchEngine" placeholder="Chercher par personne, groupe"/>
      </template>

      <template v-slot:body>
        <ModalGroup v-if="hasFavorites">
          <ModalCategory label="Favoris"/>
          <ModalItem v-for="(persona, idx) in getFavorites" :key="idx"
                     :persona="persona"
                     :label="persona.name"
                     @click="setCurrentPersona(persona)"/>
        </ModalGroup>
        <ModalGroup v-for="(list, idx) in getSearchResults" :key="idx" v-if="getSearchResults.length">
          <ModalCategory :label="list.category" v-if="list.data.length > 0"/>
          <ModalItem v-for="(item, idx) in list.data.slice(0, 5)"
                     :match-value="searchEngine"
                     :key="idx"
                     :label="item.name"
                     :persona="item"
                     @click="setCurrentPersona(item)"/>
          <ModalMoreResult :more-results="list.data.length - 5" v-if="list.data.length > 5"/>
        </ModalGroup>
        <template v-else>
          <ModalCategory label="Aucun résultat"/>
        </template>
      </template>

      <template v-slot:footer>
        <Button type="Secondary" label="Fermer" @click="modalPersonaState = false"/>
      </template>
    </Modal>
    <MobileHeader>
      <template #left>
        <SmallButton type="Secondary" :label="currentPersona" dropdown
                     @click="modalPersonaState = !modalPersonaState"/>
      </template>
      <template #right>

        <SmallButton type="Transparent" label="Paramètres" dropdown @click="modalSettingsState = !modalSettingsState">
          <Icon name="ph:sliders-bold"/>
        </SmallButton>

        <SmallButton type="Transparent" @click="modalShareState = !modalShareState">
          <Icon name="ri:share-fill"/>
        </SmallButton>

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
        <!--        <DropdownContainer @close="dropdownState = false">-->
        <SmallButton :label="currentPersona" @click="modalPersonaState = !modalPersonaState" dropdown>
          <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M10.5625 5.78125C10.5625 6.94668 10.1842 8.02324 9.54687 8.89668L12.7613 12.1137C13.0787 12.4311 13.0787 12.9465 12.7613 13.2639C12.4439 13.5813 11.9285 13.5813 11.6111 13.2639L8.39668 10.0469C7.52324 10.6867 6.44668 11.0625 5.28125 11.0625C2.36387 11.0625 0 8.69863 0 5.78125C0 2.86387 2.36387 0.5 5.28125 0.5C8.19863 0.5 10.5625 2.86387 10.5625 5.78125ZM5.28125 9.4375C7.2998 9.4375 8.9375 7.7998 8.9375 5.78125C8.9375 3.7627 7.2998 2.125 5.28125 2.125C3.2627 2.125 1.625 3.7627 1.625 5.78125C1.625 7.7998 3.2627 9.4375 5.28125 9.4375Z"
                fill="#858699"/>
          </svg>

        </SmallButton>

        <SmallButton type="Transparent" label="Paramètres" dropdown @click="modalSettingsState = !modalSettingsState">
          <Icon name="ph:sliders-bold"/>
        </SmallButton>

        <SmallButton type="Transparent" @click="modalShareState = !modalShareState">
          <Icon name="ri:share-fill"/>
        </SmallButton>
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
import {defineComponent} from "#imports";
import {useFavoritePersonaStore} from "~/store/favoritePersonaStore";
import {useQRCode} from '@vueuse/integrations/useQRCode'

export default defineComponent({
  name: 'Calendar',
  components: {SidebarBackdrop, Button, MainHeader, SmallButton, Sidebar},
  data() {
    return {
      modalSettingsState: false,
      modalPersonaState: false,
      modalShareState: false,

      mobileView: false,
      limitShowDays: 1,
      showDayIndex: 0,

      searchEngine: '',
      sidebarEventState: false,
      currentEventShowing: {},

      currentPersona: useCurrentPersona('get').name || 'Aucune',
    }
  },
  setup() {
    const favoritesPersonas = useFavoritePersonaStore()

    const hasFavorites = computed(() => favoritesPersonas.getFavoritePersona.length > 0)
    const getFavorites = computed(() => favoritesPersonas.getFavoritePersona)


    const windowUrl = window.location.href
    const qrcode = useQRCode(windowUrl)


    return {
      qrcode,
      hasFavorites,
      getFavorites,
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
      let personas: IGroupe[] = this.getPersonas;

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
    setCurrentPersona(persona: IPersona): void {
      this.currentPersona = persona.name;
      this.modalPersonaState = false;
      useCurrentPersona('set', persona);
      this.$router.push({name: '@-groupId', params: {groupId: persona.group_id}});
    },
    SHOW_NEXT_DAY(): void {
      if (this.showDayIndex < 4) {
        this.showDayIndex++;
      } else {
        this.showDayIndex = 0;
        this.NEXT_WEEK();
      }
    },
    SHOW_PREVIOUS_DAY(): void {
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
    tryCloseSidebar(): void {
      this.sidebarEventState = false;
    },
    initDayIndex(): void {
      if (this.isTodayIsInInterval) {
        this.showDayIndex = this.getDatesInWeek.indexOf(new Date().toISOString().split('T')[0]);
      }
    },
    /**
     * Handle keyboard events (arrow keys) to navigate in @
     * **/
    handleKeyDown(event: KeyboardEvent): void {
      // if (event.ctrlKey) {
      //   switch (event.key) {
      //     case KEY.LETTER_K:
      //       event.preventDefault();
      //       this.dropdownState = !this.dropdownState;
      //       break;
      //   }
      // }
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
    handleResize(): void {
      this.mobileView = window.innerWidth < 800;
    },
  },
});
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
