<template>
  <div class="CardThemeContainer" @click="$colorMode.preference = theme">
    <div class="CardTheme" :class="[getTheme, isSelected]">
      <div class="CardThemeBar" v-for="(_, idx) in 7" :key="idx"/>
    </div>
    <div class="CardThemeTitle" :class="{'CardThemeSelectedTitle': isSelected}">
      {{ getThemeName }}
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "CardTheme",
  props: {
    theme: {
      type: String as () => 'light' | 'dark' | 'system',
      required: true,
      default: 'light'
    },
  },
  data() {
    return {
      translations: [
        {key: 'light', value: 'Clair'},
        {key: 'dark', value: 'Sombre'},
      ]
    }
  },
  methods: {
    upperFirstLetter(string: string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  },
  computed: {
    getThemeName() {
      return this.translations.find((translation) => translation.key === this.theme)?.value || this.upperFirstLetter(this.theme);
    },
    getTheme() {
      return `CardTheme${this.upperFirstLetter(this.theme)}`
    },
    isSelected() {
      return this.theme === this.$colorMode.value ? 'CardThemeSelected' : ''
    }
  }
})
</script>

<style lang="scss" scoped>



.CardTheme {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2px;
  padding: 10px;
  border: 2px solid transparent;
  border-radius: 4px;
  background: var(--bg-color);

  &Title  {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 5px;
    font-size: 1rem;
    font-weight: 500;
    color: var(--secondary-color);
  }

  &Selected {
    border: 2px solid #1468e8;

    &Title {
      color: #227aff;
    }
  }

  &Light {
    background: #eae9ed;

    > .CardThemeBar {
      background: #dcdde2;
    }
  }

  &Dark {
    background: #1f202a;

    > .CardThemeBar {
      background: #5c5d7c;
    }
  }

  &Bar {
    width: 100%;
    height: 60px;
    background: var(--primary-color);
    border-radius: 2px;
  }
}

.CardThemeContainer {

  cursor: pointer;
  width: 160px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 5px;
  padding: 0.5rem;
}
</style>