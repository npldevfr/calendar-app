<template>
  <div>

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

    <div class="LoginHeader">
      <EDTLogo/>


      <a href="https://github.com/npldevfr/iut-nantes-calendar-front" target="_blank">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
                d="M10.0258 0C4.51676 0 0.0517578 4.465 0.0517578 9.974C0.0517578 14.38 2.90876 18.119 6.87276 19.439C7.37176 19.529 7.55176 19.222 7.55176 18.958C7.55176 18.721 7.54376 18.093 7.54076 17.262C4.76576 17.864 4.17976 15.924 4.17976 15.924C3.72776 14.772 3.07276 14.465 3.07276 14.465C2.16776 13.846 3.14176 13.86 3.14176 13.86C4.14376 13.93 4.66876 14.888 4.66876 14.888C5.55876 16.412 7.00476 15.972 7.57076 15.717C7.66176 15.072 7.92176 14.632 8.20576 14.383C5.99176 14.132 3.66376 13.276 3.66376 9.453C3.66376 8.366 4.05276 7.474 4.68776 6.778C4.58676 6.525 4.24176 5.51 4.78676 4.138C4.78676 4.138 5.62376 3.869 7.52876 5.159C8.34235 4.93767 9.1816 4.8247 10.0248 4.823C10.8679 4.82437 11.7072 4.93735 12.5208 5.159C14.4268 3.868 15.2628 4.138 15.2628 4.138C15.8078 5.51 15.4658 6.525 15.3618 6.778C16.0018 7.474 16.3858 8.365 16.3858 9.453C16.3858 13.286 14.0558 14.128 11.8338 14.375C12.1888 14.683 12.5088 15.291 12.5088 16.221C12.5088 17.555 12.4968 18.631 12.4968 18.958C12.4968 19.225 12.6748 19.535 13.1838 19.437C17.1458 18.115 19.9998 14.379 19.9998 9.974C19.9998 4.465 15.5348 0 10.0258 0Z"
                style="fill: var(--text-heading-color)"/>
        </svg>
      </a>

    </div>
    <div class="Login">
      <h1>Bienvenue</h1>
      <h3>Sélectionnez votre groupe pour accéder à l'emploi du temps</h3>
      <div class="LoginContent">
        <Button type="Secondary" label="Sélectionner mon groupe" @click="modalPersonaState = true">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="fillCurrent" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M1.55556 0C1.143 0 0.747335 0.163889 0.455612 0.455612C0.163889 0.747335 0 1.143 0 1.55556V12.4444C0 12.857 0.163889 13.2527 0.455612 13.5444C0.747335 13.8361 1.143 14 1.55556 14H12.4444C12.857 14 13.2527 13.8361 13.5444 13.5444C13.8361 13.2527 14 12.857 14 12.4444V1.55556C14 1.143 13.8361 0.747335 13.5444 0.455612C13.2527 0.163889 12.857 0 12.4444 0H1.55556ZM7 10.8889V7.77778L3.11111 7.77778V6.22222L7 6.22222L7 3.11111L10.8889 7L7 10.8889Z"
                fill="fillCurrent"/>
          </svg>

          <SmallButton label="BETA" type="Secondary"/>
        </Button>

      </div>
      <div class="LoginActions">
        v{{ version }}-{{ getYear }} &mdash; BETA TEST &mdash; Made by <a href="https://instagram.com/n.gllt__"
                                                                          target="_blank">@n.gllt__</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import EDTLogo from "~/components/Logo/EDTLogo.vue";
import Button from "~/components/Buttons/Button.vue";
import {version} from '../package.json'
import SmallButton from "~/components/Buttons/SmallButton.vue";
import useCurrentPersona from "~/composables/Personas/useCurrentPersona";
import {IPersona} from "~/types/Persona.interface";
import {mapState} from "pinia";
import {usePersonaStore} from "~/store/personaStore";
import {IGroupe} from "~/types/Group.interface";
import {useFavoritePersonaStore} from "~/store/favoritePersonaStore";

export default {
  name: "index",
  components: {SmallButton, Button, EDTLogo},
  data() {
    return {
      modalPersonaState: false,
      searchEngine: '',
    }
  },
  computed: {
    ...mapState(usePersonaStore, ["getPersonas"]),
    getSearchResults() {
      let personas = this.getPersonas;

      return personas.map((category: IGroupe) => {
        return {
          category: category.category,
          data: category.data.filter((item) => {
            return item.name.toLowerCase().includes(this.searchEngine.toLowerCase())
          })
        }
      })
    },
    version() {
      return version;
    },
    getYear() {
      return new Date().getFullYear();
    },
  },
  setup() {
    const favoritesPersonas = useFavoritePersonaStore()

    const hasFavorites = computed(() => favoritesPersonas.getFavoritePersona.length > 0)
    const getFavorites = computed(() => favoritesPersonas.getFavoritePersona)

    return {
      hasFavorites,
      getFavorites,
    }
  },
  methods: {
    // onResize() {
    //   if (window.innerWidth > 800) {
    //     // this.$router.push({name: ''});
    //   }
    // },
    setCurrentPersona(persona: IPersona) {
      useCurrentPersona("set", persona);
      this.$router.push({name: '@-groupId', params: {groupId: persona.group_id}});
    },
  }
}
</script>

<style lang="scss">


.Login {
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  padding: 100px 35px;
  inset: 0;
  gap: 10px;
  width: 100%;
  height: 100%;
  //background: radial-gradient(ellipse at 50% 80%, rgba(0, 102, 255, 0.15),rgba(255,255,255,0));
  //background: linear-gradient(#181922 0%, rgba(49, 50, 72, 0.34) 100%);

  &Content {
    width: 100%;
    display: flex;
    margin: 20px 0;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  a {
    color: var(--text-heading-color);
    text-decoration: none;
  }

  h1 {
    margin: 0;
    font-size: 30px;
    font-weight: 600;
    color: var(--text-heading-color);
  }

  h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 400;
    color: var(--text-subtitle-color);
  }


  &Header {

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 20;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 20px 25px;
  }


  &Actions {
    position: fixed;
    bottom: 0;
    font-size: 12px;
    font-weight: 500;
    color: #858699;
    left: 0;
    gap: 4px;
    text-align: center;
    justify-content: center;
    right: 0;
    z-index: 40;
    padding: 35px 25px;
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    width: 100%;
  }
}
</style>
