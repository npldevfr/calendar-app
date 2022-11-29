<template>
  <Teleport to="body">
    <Transition appear>
      <template v-if="show || forceShow">
        <div class="ModalBackdrop">
          <Transition appear name="bounce">
            <OnClickOutside class="Modal" @trigger="close">
              <div class="ModalHeader" v-if="$slots.header">
                <slot name="header"/>
              </div>
              <ModalSeparator v-if="$slots.header && $slots.body"/>
              <div class="ModalContent" v-if="$slots.body">
                <slot name="body"/>
              </div>
              <ModalSeparator v-if="$slots.body && $slots.footer"/>
              <div class="ModalFooter" v-if="$slots.footer">
                <slot name="footer" />
              </div>
            </OnClickOutside>
          </Transition>
        </div>
      </template>
    </Transition>
  </Teleport>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {OnClickOutside} from '@vueuse/components'

export default defineComponent({
  name: "Modal",
  components: {OnClickOutside},
  emits: ["close", "validate", "opened"],
  props: {
    show: {
      type: Boolean,
      required: true,
      default: false
    },
    title: {
      type: String,
      required: true,
      default: ''
    },
    keyboardKey: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      forceShow: false
    }
  },
  mounted() {
    document.addEventListener('keydown', this.handleKeyEscape)
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.handleKeyEscape)
  },
  watch: {
    show: function (state: boolean) {
      state ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'auto';
    },
    forceShow: function (state: boolean) {
      state ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'auto';
    }
  },
  methods: {
    handleKeyEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        this.close();
      }

      if (this.keyboardKey && event.ctrlKey && event.key === this.keyboardKey) {
        this.forceShow ? this.close() : this.forceShow = true;
      }
    },
    close() {
      this.forceShow = false;
      this.$emit('close')
    },
    validate() {
      this.forceShow = false;
      this.$emit('validate')
    }
  }
})
</script>

<style lang="scss" scoped>

.Modal {
  background: var(--bg-color);
  height: auto;
  border: 1px solid var(--secondary-border);
  z-index: 1000;
  border-radius: 8px;
  max-width: 700px;
  width: 700px;

  .ModalPadding {
    padding: 20px 30px;
  }

  &Content {
    overflow-y: auto;
    max-height: 500px;
    margin: 15px 0;


  }


  /* width */
  ::-webkit-scrollbar {

    width: 14px;
    transition: all 0.5s;
    border-radius: 50px;

  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: var(--bg-primary);
    box-shadow: inset 0 0 10px 10px rgba(227, 227, 227, 0.10);
    border: solid 5px transparent;
    border-radius: 50px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    transition: all 0.5s;
    background: var(--bg-primary);
    box-shadow: inset 0 0 10px 10px rgba(255, 255, 255, 0.5);
    border: solid 5px transparent;
    border-radius: 50px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    cursor: pointer;
    transition: all 0.5s;
    background: var(--bg-primary);
    box-shadow: inset 0 0 10px 10px var(--primary);
    border: solid 5px transparent;
    border-radius: 50px;

  }

  &Footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    gap: 10px;
  }

  &Header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px 10px;
  }

  &Backdrop {
    position: absolute;
    display: flex;
    padding: 5% 0;
    align-items: self-start;
    justify-content: center;
    inset: 0;
    z-index: 500;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.40);
    backdrop-filter: blur(2px);
  }
}

@media screen and (max-width: 500px) {
  .Modal {
    border-radius: 0;
    inset: 0;
    height: 100%;
  }
}

.bounce-enter-active {
  animation: bounce-in 0.25s;
}

.bounce-leave-active {
  animation: bounce-in 0.10s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0.9);
  }
  50% {
    transform: scale(1.009);
  }
  100% {
    transform: scale(1);
  }
}
</style>