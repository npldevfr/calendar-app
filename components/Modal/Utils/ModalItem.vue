<template>
  <div class="ModalItem" @mouseover="isMouseOver = true" @mouseleave="isMouseOver = false">
    <div class="ModalItemTitle" v-html="isNameMatchingValue"/>
    <div class="ModalItemTitleFavorite" @click.stop>
      <template v-if="isFavorite">
        <Icon name="material-symbols:favorite" class="ModalItemTitleFavoriteIcon" @click="removeFavorite"/>
      </template>
      <template v-else>
        <Icon name="material-symbols:favorite-outline" @click="addFavorite"/>
      </template>

    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {IPersona} from "~/types/Persona.interface";
import {useFavoritePersonaStore} from "~/store/favoritePersonaStore";
import {computed} from "#imports";

export default defineComponent({
  name: "ModalItem",
  props: {
    persona: {
      type: Object as () => IPersona,
      required: true
    },
    matchValue: {
      type: String,
      required: false,
      default: ""
    },
    label: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isMouseOver: false
    }
  },
  computed: {
    isNameMatchingValue() {
      return this.label;
      // if (this.matchValue.length > 0) {
      //   const regex = new RegExp(this.matchValue, "gi");
      //   return this.label.replace(regex, (match) => {
      //     return `<span style="font-weight: 700; color: cyan">${match}</span>`;
      //   });
      // } else {
      //   return this.label;
      // }
    },
  },
  setup(props){
    const favoritePersonaStore = useFavoritePersonaStore();

    const addFavorite = () => {
      favoritePersonaStore.ADD_FAVORITE_PERSONA(props.persona);
    }

    const removeFavorite = () => {
      favoritePersonaStore.REMOVE_FAVORITE_PERSONA(props.persona);
    }

    const isFavorite = computed(() => {
      return favoritePersonaStore.getIsFavorite(props.persona);
    });

    return {
      isFavorite,
      addFavorite,
      removeFavorite
    }


  }
})
</script>

<style lang="scss" scoped>
.ModalItem {
  user-select: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  transition: all 0.2s ease-in-out;
  background: var(--secondary-hover);
  border: 1px solid var(--secondary-hover);
  color: var(--secondary-text);
  border-radius: 4px;
  padding: 12px 10px;
  width: 100%;

  &Symbol {
    margin-left: 5px;
    text-transform: uppercase;
    color: #626264;
  }

  &Title {
    display: flex;
    align-items: center;
    font-size: 15px;
    font-weight: 500;
    letter-spacing: -0.10px;
    color: var(--secondary-text);

    &Favorite {
      width: 35px;
      height: 35px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;

      &Icon {
        color: #b92323;
        transition: all 0.2s ease-in-out;
      }
    }

    img {
      margin-right: 10px;
    }
  }

  &Action {
    font-size: 18px;
    color: var(--primary);
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;

    &Danger {
      color: #ab1a1a;
    }
  }

  &:hover {
    background: var(--secondary-hover);
    cursor: pointer;
    border: 1px solid var(--primary);
  }

  &Danger {
    &:hover {
      border: 1px solid #ab1a1a;
    }
  }
}
</style>