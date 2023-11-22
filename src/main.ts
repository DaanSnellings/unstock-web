import { createApp } from 'vue'
import { createPinia } from 'pinia'
import MasonryWall from '@yeger/vue-masonry-wall'
import { MotionPlugin } from '@vueuse/motion'
import ToastService from 'primevue/toastservice'
import Toast from 'primevue/toast'
import PrimeVue from 'primevue/config'
import { ObserveVisibility } from 'vue-observe-visibility'
import App from './App.vue'
import router from './router'

import ToastMessage from '@/components/ToastMessage.vue'

import 'primevue/resources/themes/lara-light-indigo/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

import './assets/main.css'

const app = createApp(App)

app
  .use(router)
  .use(createPinia())
  .use(MasonryWall)
  .use(MotionPlugin)
  .use(PrimeVue)
  .use(ToastService)

app
  .component('ToastMessage', ToastMessage)
  .component('Toast', Toast)
app
  .directive('observe-visibility', {
    beforeMount: (el, binding, vnode) => {
      (vnode as any).context = binding.instance
      ObserveVisibility.bind(el, binding, vnode)
    },
    updated: ObserveVisibility.update,
    unmounted: ObserveVisibility.unbind,
  })

app.mount('#app')
