import { type RouteLocationNormalized, createRouter, createWebHistory } from 'vue-router'
import CreateView from '@/views/CreateView.vue'
import SearchView from '@/views/SearchView.vue'
import PurchasesView from '@/views/PurchasesView.vue'
import ImagesView from '@/views/ImagesView.vue'
import PageNotFoundView from '@/views/PageNotFoundView.vue'
import ImageNotFoundView from '@/views/ImageNotFoundView.vue'
import AuthHomeView from '@/views/AuthHomeView.vue'
import UnauthHomeView from '@/views/UnauthHomeView.vue'
import { useAuthStore } from '@/stores/auth.store'
import { useToastStore } from '@/stores/toast.store'
import { useImageStore } from '@/stores/image.store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'unauthenticated-home',
      component: UnauthHomeView,
      meta: { requiresAuth: false },
      async beforeEnter() {
        if (isUserAuthenticated()) {
          await router.push({
            name: 'authenticated-home',
          })
        }
      },
    },
    {
      path: '/home',
      name: 'authenticated-home',
      component: AuthHomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/create',
      name: 'create',
      component: CreateView,
      meta: { requiresAuth: true },
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView,
      meta: { requiresAuth: true },
      async beforeEnter(to) {
        const imageUuid = to.query.item as string
        if (imageUuid) {
          if (imageUuid.length !== 36)
            return { name: 'image-not-found' }

          const imageStore = useImageStore()
          const exists = await imageStore.checkImageExists(imageUuid)
          if (!exists)
            return { name: 'image-not-found' }
        }
      },
    },
    {
      path: '/purchases',
      name: 'purchases',
      component: PurchasesView,
      meta: { requiresAuth: true },
    },
    {
      path: '/images',
      name: 'images',
      component: ImagesView,
      meta: { requiresAuth: true },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'page-not-found',
      component: PageNotFoundView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'image-not-found',
      component: ImageNotFoundView,
    },
  ],
})

function isUserAuthenticated(): boolean {
  const authStore = useAuthStore()
  return authStore.isAuthenticated
}

async function fetchUserDataIfTokenExists(): Promise<void> {
  const authStore = useAuthStore()
  if (authStore.authenticatedUser || !authStore.isAuthenticated)
    return

  await authStore.getUserInfo()
}

async function checkIfUserIsAuthenticatedWhenAuthRequired(to: RouteLocationNormalized): Promise<void> {
  if (to.meta.requiresAuth) {
    if (!isUserAuthenticated()) {
      if (to.name === 'authenticated-home') {
        await router.push({
          name: 'unauthenticated-home',
        })
      }
      else {
        const toastStore = useToastStore()
        await router.push({
          name: 'unauthenticated-home',
        })
        toastStore.pushErrorMessage('Not logged in!')
      }
    }
  }
}

router.beforeEach(async (to: RouteLocationNormalized) => {
  await fetchUserDataIfTokenExists()
  await checkIfUserIsAuthenticatedWhenAuthRequired(to)
})

export default router
