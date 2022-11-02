<template>
  <div class="TimeSpanText">
    <svg width="12" height="12" viewBox="0 0 12 12" fill="fillCurrent" xmlns="http://www.w3.org/2000/svg">
      <path
          d="M5.4375 2.8125C5.4375 2.50078 5.68828 2.25 6 2.25C6.31172 2.25 6.5625 2.50078 6.5625 2.8125V5.7L8.56172 7.03125C8.81953 7.20469 8.88984 7.55391 8.69766 7.81172C8.54531 8.06953 8.19609 8.13984 7.93828 7.94766L5.68828 6.44766C5.53125 6.36328 5.4375 6.1875 5.4375 5.97891V2.8125ZM6 0C9.31406 0 12 2.68594 12 6C12 9.31406 9.31406 12 6 12C2.68594 12 0 9.31406 0 6C0 2.68594 2.68594 0 6 0ZM1.125 6C1.125 8.69297 3.30703 10.875 6 10.875C8.69297 10.875 10.875 8.69297 10.875 6C10.875 3.30703 8.69297 1.125 6 1.125C3.30703 1.125 1.125 3.30703 1.125 6Z"
          fill="fillCurrent"/>
    </svg>
    {{ getFormatTime }}
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import moment from "moment";

export default defineComponent({
  name: "TimeSpanText",
  props: {
    hour: {
      type: String,
      required: true
    }
  },
  computed: {
    getFormatTime(): string {
      return moment(this.hour).format('H:mm');
    },
  }
})
</script>

<style lang="scss" scoped>
.TimeSpanText {

  color: #A0A0A0;
  fill: #A0A0A0;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 500;
}
</style>