//define nuxt plugin

import { defineNuxtPlugin } from '#app'
import Vue3TouchEvents from "vue3-touch-events";

export default defineNuxtPlugin((nuxt) => {
    nuxt.vueApp.use(Vue3TouchEvents, {
        swipeTolerance: 10,
    });


})