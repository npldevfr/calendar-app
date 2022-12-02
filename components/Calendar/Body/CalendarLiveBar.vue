<template>
  <div class="CalendarLiveBar" :style="{top: topValue}  ">
    <div class="CalendarLiveBarTriangleRight" />
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useThemeStore} from "~/store/themeStore";

export default defineComponent({
  name: "CalendarLiveBar",
  setup(){


    const themeStore = useThemeStore();
    const cellHeight = 60;
    const startHour = 8;
    const topValue = ref('0px');

    // const getTop = computed(() => {
    //   const now = new Date();
    //   now.setHours(19);
    //   const hour = now.getHours();
    //   const minutes = now.getMinutes();
    //   const top = (hour - startHour) * cellHeight + (minutes / 60) * cellHeight;
    //   return top + 'px';
    // });

    const getTop = () => {
      const now = new Date();
      const hour = now.getHours();
      const minutes = now.getMinutes();
      const top = (hour - startHour) * cellHeight + (minutes / 60) * cellHeight;
      topValue.value = top + 'px';
    };

    onMounted(() => {
      setInterval(getTop, 1000 * 60);
      getTop();
    });

    onUnmounted(() => {
      clearInterval(getTop);
    });

    const getTheme = computed(() => {
      return themeStore.getEventColor;
    });

    return {
      topValue,
      getTheme,
    }

  }
})
</script>

<style lang="scss" scoped>
.CalendarLiveBar {
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  height: 2px;
  background: v-bind(getTheme);

  &TriangleRight {
    position: absolute;
    top: -6px;
    left: 0;
    width: 0;
    height: 0;
    border-top: 7px solid transparent;
    border-bottom: 7px solid transparent;
    border-left: 7px solid v-bind(getTheme);
  }
}
</style>