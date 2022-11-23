<template>
  <div class="DropdownItem">
    <div v-html="isMatchingValue"/>
    <div @click.stop="setFavorite" v-if="!isFavorite">
      <Favorite />
    </div>
    <div @click.stop="removeFavorite" v-else>
      <Favorite is-favorite/>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import useFavoritesPersonas from "~/composables/Personas/useFavoritesPersonas";
import {IPersona} from "~/types/Persona.interface";
import Favorite from "~/components/Dropdown/Icons/Favorite.vue";

export default defineComponent({
  name: "DropdownItem",
  components: {Favorite},
  props: {
    persona: {
      type: Object as () => IPersona,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    matchValue: {
      type: String,
      required: false,
      default: ""
    },
    choosen: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    isMatchingValue() {
      if (this.matchValue.length > 0) {
        const regex = new RegExp(this.matchValue, "gi");
        return this.label.replace(regex, (match) => {
          return `<span style="font-weight: 700">${match}</span>`;
        });
      } else {
        return this.label;
      }
    },
    isFavorite() : boolean {
      const favorites = useFavoritesPersonas('get');
      return favorites.some((favorite) => favorite.id === this.persona.id);
    }
  },
  methods: {
    setFavorite() {
      useFavoritesPersonas('add', this.persona);
    },
    removeFavorite() {
      useFavoritesPersonas('remove', this.persona);
    }
  }
})
</script>

<style lang="scss" >

.DropdownItem:hover > * {
  fill: var(--primary-color);
}

.DropdownItem {
  padding: 10px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  user-select: none;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: var(--primary);
    color: var(--primary-color);
  }

  &Choosen {
    background: var(--primary);
  }
}
</style>
