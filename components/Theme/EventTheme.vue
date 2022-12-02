<template>
  <div class="EventTheme" :style="{background: color}" @click="setColor()">
    <Icon name="ic:baseline-check" v-if="isSelected" />
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useThemeStore} from "~/store/themeStore";

export default defineComponent({
  name: "EventTheme",
  props: {
    color: {
      type: String as () => string,
      required: true,
    }
  },
  setup(props){
    const theme = useThemeStore();

    const setColor = () => {
      theme.SET_EVENT_COLOR(props.color);
    }

    const isSelected = computed(() => {
      return theme.eventColor === props.color;
    })

    return {
      isSelected,
      setColor
    }
  }
})
</script>

<style lang="scss" scoped>
.EventTheme {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2px;
  height: 35px;
  padding: 10px;
  color: white;
  border: 2px solid transparent;
  border-radius: 4px;
  transition: all 0.2s ease-in-out;

  &Selected {
    border: 2px solid #1468e8;

    &Title {
      color: #227aff;
    }
  }

  &:hover {
    cursor: pointer;
  }
}
</style>